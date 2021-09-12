import React, { useState } from 'react';
import { TableRow, TableCell, IconButton, TableContainer, Paper, Table as UITable, TableHead, TableBody, MenuItem, Menu, Typography, Button } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { MoreHoriz } from '@material-ui/icons';

import { IEmployee, IEmployeeList } from '../../interfaces';
import useStyles from './styles';
import { useEmployee } from '../../hooks/employeeApi';
import EmployeeForm from '../EmployeeForm';
import { SituacaoFuncionario } from '../../utils/enums';

import Swal from 'sweetalert2';
import { theme } from '../../global/theme';

interface IEmployeeTable {
  employeeList: IEmployeeList[];
}

interface IRow {
  employee: IEmployee;
}

const EmployeeTable: React.FC<IEmployeeTable> = ({ employeeList }: IEmployeeTable) => {
  const classes = useStyles();
  const { currentPage, pageCount, setCurrentPage, remove } = useEmployee();
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<IEmployee>({} as IEmployee);

  const Row = ({ employee }: IRow): JSX.Element => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleEdit = async (employee: IEmployee): Promise<void> => {
      setEmployeeToEdit(employee);
      setFormOpen(true)
    }

    const handleDelete = async (employee: IEmployee): Promise<void> => {
      try {
        await remove(employee.id as string);

      } catch (e) {
        console.log(e?.message);
      }
    };

    const areYouSure = (toCheckEmployee: IEmployee) => {
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
          await handleDelete(toCheckEmployee);
          Swal.fire({
            title: 'Registro de funcionário deletado!',
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

    const maskToDate = (date: string) => date.split('-').reverse().join('/');

    return (
      <>
        <TableRow className={classes.root}>
          <TableCell component="th" scope="row" align="left">{employee.nome}</TableCell>
          <TableCell align="left">{employee.email}</TableCell>
          <TableCell align="left">{employee.telefone}</TableCell>
          <TableCell align="left">{employee.cpf}</TableCell>
          <TableCell align="left">{maskToDate(employee.nascimento)}</TableCell>
          <TableCell align="left">{SituacaoFuncionario[employee.situacao]}</TableCell>
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
              <MenuItem onClick={() => handleEdit(employee)}>Editar</MenuItem>
              <MenuItem onClick={() => areYouSure(employee)}>Excluir</MenuItem>
            </Menu>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <div>
    <div className={classes.header}>
      <Typography color="primary" variant="h2">Funcionários</Typography>
      <Button className={classes.addButton} onClick={() => setFormOpen(true)}>Adicionar Funcionário</Button>
    </div>
    <TableContainer component={Paper} className={classes.container}>
      <UITable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Nome</TableCell>
            <TableCell align="left">E-mail</TableCell>
            <TableCell align="left">Telefone</TableCell>
            <TableCell align="left">CPF</TableCell>
            <TableCell align="left">Data de nascimento</TableCell>
            <TableCell align="left">Situação</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
            employeeList
            .filter((item: IEmployeeList) => (
                item.page === currentPage ? item : null
            ))[0]?.values.map((employee: IEmployee) => (
                <Row key={employee.id} employee={employee} />
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
    {formOpen && <EmployeeForm open={formOpen} onClose={() => setFormOpen(false)} employeeToEdit={employeeToEdit} clearEmployee={() => setEmployeeToEdit({} as IEmployee)} />}
  </div>
  )
}

export default EmployeeTable;
