import React, { useState } from 'react';
import useStyles from './styles';
import { TableRow, TableCell, IconButton, TableContainer, Paper, Table as UITable, TableHead, TableBody, MenuItem, Menu, Typography, Button } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { MoreHoriz } from '@material-ui/icons';

import { IBook, IBookList } from '../../interfaces';
import { useBook } from '../../hooks/bookApi';

import BookForm from '../BookForm';

interface ITable {
  bookList: IBookList[];
}

interface IRow {
  book: IBook;
}

const Table = ({ bookList }: ITable): JSX.Element => {
  const classes = useStyles();
  const { currentPage, setCurrentPage, pageCount, remove } = useBook();
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [bookToEdit, setBookToEdit] = useState<IBook>({} as IBook);

  const Row = ({ book }: IRow): JSX.Element => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleEdit = async (book: IBook): Promise<void> => {
      setBookToEdit(book);
      setFormOpen(true)
    }

    const handleDelete = async (book: IBook): Promise<void> => {
      try {
        await remove(book.id as string);

      } catch (e) {
        console.log(e?.message);
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
        <Button className={classes.addButton} onClick={() => setFormOpen(true)}>Adicionar Livro</Button>
      </div>
      <TableContainer component={Paper} className={classes.container}>
        <UITable>
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
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination
              count={pageCount}
              page={currentPage + 1}
              onChange={(e: any, value: number) => setCurrentPage(value - 1)}
          />
        </div>
      </TableContainer>
      {formOpen && <BookForm open={formOpen} onClose={() => setFormOpen(false)} bookToEdit={bookToEdit} clearBook={() => setBookToEdit({} as IBook)} />}
    </div>
  );
};

export default Table;
