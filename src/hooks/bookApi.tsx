import React, { createContext, useState, useContext } from 'react';
import { IBook, IBookList } from '../interfaces';
import { api } from '../services/api';

interface ILoadParams {
  search: string;
  searchByName: boolean;
}

interface ContextData {
    isEmpty: boolean;
    pageCount: number;
    currentPage: number;
    bookList: IBookList[];

    reset(): void;
    remove(id: string): Promise<void>;
    setCurrentPage(page: number): void;
    load(params?: ILoadParams): Promise<void>;
    update(id: string, data: Object): Promise<void>;
}

const bookListContext = createContext<ContextData>({} as ContextData);

export const BookListProvider: React.FC = ({ children }) => {

    const offset: number = 10;
    const [pageCount, setPageCount] = useState<number>(0);
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [bookList, setBookList] = useState<IBookList[]>([]);

    const reset = () => { setBookList([]); }

    const load = async (params: ILoadParams): Promise<void> => {

        const exists = bookList.filter((item: IBookList) => (
            item.page === currentPage? item : null
        ));
        if (exists.length !== 0) return;

        const url = '/livro/recuperar?' +
            `offset=${offset}&` +
            `page=${currentPage}&`

        const response = await api.get(url);

        const data: IBookList[] = [
            ...bookList,
            { page: currentPage, values: response.data.data.itens }
        ];

        setBookList(data);
        data.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
        setPageCount(Math.ceil(response.data.count/offset));
    }

    const remove = async (id: string): Promise<void> => {

        await api.delete(`/bovino/${id}`);

        const isLastPage = bookList.filter((item: IBookList) =>
            item.page === pageCount-1 ? item : null
        );

        if (isLastPage[0]?.values?.length === 1) {
            setPageCount(pageCount - 1);
            setCurrentPage(currentPage -1);
            return;
        }

        const url = `/bovino?page=${currentPage}&limite=${offset}`;
        const response = await api.get(url);

        setBookList([{ page: currentPage, values: response.data.list }]);
        setPageCount(Math.ceil(response.data.count / offset));
    }

    const update = async (id: string, data: Object): Promise<void> => {

        const response = await api.put(`/bovino/${id}`, data);

        const currentPageList = bookList.filter((item: IBookList) =>
            item.page === currentPage ? item : null
        );

        const indexToUse = currentPageList[0]?.values?.findIndex(
            (item: IBook) => item.id === response.data.id
        );

        currentPageList[0].values[indexToUse] = { ...response.data };

        const newList = bookList.filter((item: IBookList) =>
            item.page !== currentPage ? item : null
        );

        newList.push(currentPageList[0]);

        setBookList(newList);
    }

    return (
        <bookListContext.Provider
            value={{
                isEmpty,
                pageCount,
                bookList,
                currentPage,
                load,
                reset,
                update,
                remove,
                setCurrentPage,
            }}
        >
            {children}
        </bookListContext.Provider>
    );
};

export function useBook() {
    const context = useContext(bookListContext);

    if (!context) {
        throw new Error('useBook must be used within an bookListProvider');
    }

    return context;
}
