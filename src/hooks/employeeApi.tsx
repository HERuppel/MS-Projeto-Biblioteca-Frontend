import React, { createContext, useState, useContext } from 'react';
import { IEmployee, IEmployeeList } from '../interfaces';
import { api } from '../services/api';

interface ContextData {
    isEmpty: boolean;
    pageCount: number;
    currentPage: number;
    employeeList: IEmployeeList[];

    reset(): void;
    create(employee: IEmployee): void;
    remove(id: string): Promise<void>;
    setCurrentPage(page: number): void;
    load(): Promise<void>;
    update({ id, data }: IUpdate): Promise<void>;
}

interface IUpdate {
  data: IEmployee;
  id?: string;
}

const employeeContext = createContext<ContextData>({} as ContextData);

export const EmployeeListProvider: React.FC = ({ children }) => {

    const offset: number = 10;
    const [pageCount, setPageCount] = useState<number>(0);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [employeeList, setEmployeeList] = useState<IEmployeeList[]>([]);

    const reset = () => { setEmployeeList([]); }

    const create = async (employee: IEmployee): Promise<void> => {
      await api.post('funcionario/manter', { ...employee })

      await load();
    }

    const load = async (): Promise<void> => {
      const response = await api.get('funcionario/recuperar');

      const data: IEmployeeList[] = [
          { page: currentPage, values: response.data.data.itens }
      ];

      setEmployeeList(data);
      data.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
      setPageCount(Math.ceil(response.data.data.count/offset));
    }

    const remove = async (id: string): Promise<void> => {

        await api.delete(`funcionario/deletar/${id}`);

        const isLastPage = employeeList.filter((item: IEmployeeList) =>
            item.page === pageCount-1 ? item : null
        );

        if (isLastPage[0]?.values?.length === 1) {
            setPageCount(pageCount - 1);
            setCurrentPage(currentPage -1);
            return;
        }

        const url = 'funcionario/recuperar';
        const response = await api.get(url);

        setEmployeeList([{ page: currentPage, values: response.data.data.itens }]);
        setPageCount(Math.ceil(response.data.data.count / offset));
    }

    const update = async ({ id, data }: IUpdate): Promise<void> => {

        await api.post(`funcionario/manter`, { ...data, id });

        await load();
        // const currentPageList = employeeList.filter((item: IEmployeeList) =>
        //     item.page === currentPage ? item : null
        // );

        // const indexToUse = currentPageList[0]?.values?.findIndex(
        //     (item: IEmployee) => item.id === response.data.data.id
        // );

        // currentPageList[0].values[indexToUse] = { ...response.data.data };

        // const newList = employeeList.filter((item: IEmployeeList) =>
        //     item.page !== currentPage ? item : null
        // );

        // newList.push(currentPageList[0]);

        // setEmployeeList(newList);
    }

    return (
        <employeeContext.Provider
            value={{
                isEmpty,
                pageCount,
                employeeList,
                currentPage,
                create,
                load,
                reset,
                update,
                remove,
                setCurrentPage,
            }}
        >
            {children}
        </employeeContext.Provider>
    );
};

export function useEmployee() {
    const context = useContext(employeeContext);

    if (!context) {
        throw new Error('useEmployee must be used within an EmployeeListProvider');
    }

    return context;
}
