import React from 'react';
import useStyles from './styles';
import { TableRow, TableCell, IconButton, TableContainer, Paper, Table as UITable, TableHead, TableBody, MenuItem, Menu } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { MoreHoriz } from '@material-ui/icons';

import { IBook, IBookList, IResponse } from '../../interfaces';
import { api } from '../../services/api';
import { useBook } from '../../hooks/bookApi';

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
          <TableCell align="left">{book.autor}</TableCell>
          <TableCell align="left">{book.paginas}</TableCell>
          <TableCell align="left">{book.editora}</TableCell>
          <TableCell align="left">{book.edicao}</TableCell>
          <TableCell align="left">{book.qtdAtual}/{book.qtdEstoque}</TableCell>
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
    <TableContainer component={Paper} className={classes.container}>
      <UITable aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Nome</TableCell>
            <TableCell align="left">Autor</TableCell>
            <TableCell align="left">Páginas</TableCell>
            <TableCell align="left">Editora</TableCell>
            <TableCell align="left">Edição</TableCell>
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
      <Pagination
          count={pageCount}
          page={currentPage + 1}
          onChange={(e: any, value: number) => setCurrentPage(value - 1)}
      />
    </TableContainer>
  );
};

export default Table;
