import React, { useState } from 'react';
import useStyles from './styles';
import { TableRow, TableCell, IconButton, TableContainer, Paper, Table as UITable, TableHead, TableBody, MenuItem, Menu, Typography, Button, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { MoreHoriz } from '@material-ui/icons';

import { IBook, IBookList } from '../../interfaces';
import { useBook } from '../../hooks/bookApi';

import BookForm from '../BookForm';
import { theme } from '../../global/theme';

import Swal from 'sweetalert2';

interface IBookTable {
  bookList: IBookList[];
}

interface IRow {
  book: IBook;
}

const buttonStyle = makeStyles({
  add: {
    width: '20%',
    background: theme.palette.primary.main,
    color: theme.palette.common.white,

    '&:hover': {
      background: theme.palette.primary.dark
    }
  }
})

const BookTable = ({ bookList }: IBookTable): JSX.Element => {
  const classes = useStyles();
  const button = buttonStyle();
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

    const areYouSure = (toCheckBook: IBook) => {
      Swal.fire({
        title: 'Tem certeza que deseja deletar?',
        text: 'Isso não poderá ser desfeito!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: theme.palette.primary.main,
        cancelButtonColor: theme.palette.error.main,
        confirmButtonText: 'Deletar',
        cancelButtonText: 'Cancelar',
        customClass: {
          container: classes.swal
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          await handleDelete(toCheckBook);
          Swal.fire({
            title: 'Livro deletado!',
            icon: 'success',
            confirmButtonColor: theme.palette.primary.main,
            customClass: {
              container: classes.swal
            }
          });
        }
        handleClose();
      });
    };

    return (
      <>
        <TableRow className={classes.root}>
          <TableCell component="th" scope="row" align="left">{book.nome}</TableCell>
          <TableCell align="left">{book.autor}</TableCell>
          <TableCell align="left">{book.paginas}</TableCell>
          <TableCell align="left">{book.editora}</TableCell>
          <TableCell align="left">{book.edicao}</TableCell>
          <TableCell align="left">{book.cdd}</TableCell>
          <TableCell align="left">{book.qtdAtual} de {book.qtdEstoque}</TableCell>
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
              <MenuItem onClick={() => areYouSure(book)}>Excluir</MenuItem>
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
        <Button className={button.add} onClick={() => setFormOpen(true)}>Adicionar Livro</Button>
      </div>
      <TableContainer component={Paper} className={classes.container}>
        <UITable>
          <TableHead>
            <TableRow>
              <TableCell align="left">Nome</TableCell>
              <TableCell align="left">Autor</TableCell>
              <TableCell align="left">Páginas</TableCell>
              <TableCell align="left">Editora</TableCell>
              <TableCell align="left">Edição</TableCell>
              <TableCell align="left">Classificação (CDD)</TableCell>
              <TableCell align="left">Quantidade</TableCell>
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

export default BookTable;
