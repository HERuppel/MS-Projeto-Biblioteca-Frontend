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
      const res = await api.post('funcionario/manter', { ...employee })

      const newEmployee: IEmployee = res.data.data;

      console.log(currentPage, pageCount);

      if (employeeList[pageCount - 1].values.length === 10) {
        const newValues: IEmployee[] = [newEmployee]

        const data: IEmployeeList[] = [
          ...employeeList,
          { page: currentPage + 1, values: newValues }
        ]

        setEmployeeList(data);
        setPageCount(pageCount + 1);
        return;
      };

      const listCopy: IEmployeeList[] = { ...employeeList }

      const newValues: IEmployee[] = listCopy[pageCount - 1].values;

      newValues.push(newEmployee);


      const data: IEmployeeList[] = [
        ...employeeList,
        { page: currentPage, values: newValues }
      ]

      setEmployeeList(data);
    }

    const load = async (): Promise<void> => {

        const exists = employeeList.filter((item: IEmployeeList) => (
            item.page === currentPage? item : null
        ));
        if (exists.length !== 0) return;

        const url = 'funcionario/recuperar'

        const response = await api.get(url);

        const data: IEmployeeList[] = [
            ...employeeList,
            { page: currentPage, values: response.data.data }
        ];

        setEmployeeList(data);
        data.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
        setPageCount(Math.ceil(response.data.data.length/offset));
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

        setEmployeeList([{ page: currentPage, values: response.data.data }]);
        setPageCount(Math.ceil(response.data.data.length / offset));
    }

    const update = async ({ id, data }: IUpdate): Promise<void> => {

        const response = await api.post(`funcionario/manter`, { ...data, id });

        const currentPageList = employeeList.filter((item: IEmployeeList) =>
            item.page === currentPage ? item : null
        );

        const indexToUse = currentPageList[0]?.values?.findIndex(
            (item: IEmployee) => item.usuario.id === response.data.data.id
        );

        currentPageList[0].values[indexToUse] = { ...response.data.data };

        const newList = employeeList.filter((item: IEmployeeList) =>
            item.page !== currentPage ? item : null
        );

        newList.push(currentPageList[0]);

        setEmployeeList(newList);
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
