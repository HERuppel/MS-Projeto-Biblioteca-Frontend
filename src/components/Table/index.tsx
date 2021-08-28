import React, { lazy, Suspense, useState } from 'react';
import useStyles from './styles';
import { TableRow, TableCell, IconButton, TableContainer, Paper, Table as UITable, TableHead, TableBody, MenuItem, Menu, Typography, Button } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { MoreHoriz } from '@material-ui/icons';

import { IBook, IBookList, IResponse } from '../../interfaces';
import { api } from '../../services/api';
import { useBook } from '../../hooks/bookApi';
import { Loading } from '../../common';

const loadFormModal = () => import('../BookForm');

const BookForm = lazy(loadFormModal);

interface ITable {
  bookList: IBookList[];
  updateList: () => void;
}

interface IRow {
  book: IBook;
}

const Table = ({ bookList, updateList }: ITable): JSX.Element => {
  const classes = useStyles();
  const { currentPage, setCurrentPage, pageCount } = useBook();
  const [formOpen, setFormOpen] = useState<boolean>(false);

  const Row = ({ book }: IRow): JSX.Element => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleEdit = async (book: IBook): Promise<void> => {
      console.log('editar')
    }

    const handleDelete = async (book: IBook): Promise<void> => {
      try {
        const res: IResponse = await api.delete(`livro/deletar/${book.id}`)

        console.log(res)
        updateList();
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <>
        <TableRow className={classes.root}>
          <TableCell component="th" scope="row">{book.nome}</TableCell>
          <TableCell align="center">{book.autor}</TableCell>
          <TableCell align="center">{book.paginas}</TableCell>
          <TableCell align="center">{book.editora}</TableCell>
          <TableCell align="center">{book.edicao}</TableCell>
          <TableCell align="center">{book.cdd}</TableCell>
          <TableCell align="center">{book.qtdAtual}/{book.qtdEstoque}</TableCell>
          <TableCell align="center">
            <IconButton aria-label="expand row" size="small" onClick={handleClick}>
              <MoreHoriz />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleEdit(book)}>Editar</MenuItem>
              <MenuItem onClick={() => handleDelete(book)}>Excluir</MenuItem>
            </Menu>
          </TableCell>
        </TableRow>
      </>
    );
  };


  return (
    <div>
      <div className={classes.header}>
        <Typography color="primary" variant="h2">Livros</Typography>
        <Button className={classes.addButton} onMouseOver={loadFormModal} onClick={() => setFormOpen(true)}>Adicionar Livro</Button>
      </div>
      <TableContainer component={Paper} className={classes.container}>
        <UITable aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Autor</TableCell>
              <TableCell align="center">Páginas</TableCell>
              <TableCell align="center">Editora</TableCell>
              <TableCell align="center">Edição</TableCell>
              <TableCell align="center">Classificação (CDD)</TableCell>
              <TableCell align="center">Quantidade</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
              bookList
              .filter((item: IBookList) => (
                  item.page === currentPage ? item : null
              ))[0]?.values.map((book: IBook) => (
                  <Row key={book.id} book={book} />
              ))
          }
          </TableBody>
        </UITable>
        <Pagination
            count={pageCount}
            page={currentPage + 1}
            onChange={(e: any, value: number) => setCurrentPage(value - 1)}
        />
      </TableContainer>
      <Suspense fallback={<Loading loadingSize={30} />}>
        {formOpen && <BookForm open={formOpen} onClose={() => setFormOpen(false)} />}
      </Suspense>
    </div>
  );
};

export default Table;
