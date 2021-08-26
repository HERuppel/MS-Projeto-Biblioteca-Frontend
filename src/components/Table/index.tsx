import React, { useState } from 'react';
import useStyles from './styles';
import { TableRow, TableCell, IconButton, TableContainer, Paper, Table as UITable, TableHead, TableBody, MenuItem, Menu } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';

import { IBook } from '../../interfaces';
import { Loading } from '../../common';

interface ITable {
  books: IBook[];
}

interface IRow {
  book: IBook;
}

const Table = ({ books }: ITable): JSX.Element => {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);

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
        setLoading(true);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
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
      {
        loading
          ? <Loading loadingSize={30} />
          : <UITable aria-label="collapsible table">
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
                {books.map((book: IBook) => (
                    <Row key={book.id} book={book} />
                  ))
                }
              </TableBody>
            </UITable>
      }

      {/* <TablePagination
        component="div"
        count={100}
        page={currentPage.pageNumber}
        onPageChange={() => setCurrentPage({ ...currentPage, })}
        labelRowsPerPage=''
        rowsPerPage={3}

      /> */}
    </TableContainer>
  );
};

export default Table;
