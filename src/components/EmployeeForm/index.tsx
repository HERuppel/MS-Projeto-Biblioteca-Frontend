import React, { useState } from 'react';
import { Modal, TextField, Button, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { useForm, SubmitHandler } from 'react-hook-form';
import { IEmployee } from '../../interfaces';
import useStyles from './styles';
import { Loading } from '../../common';
import { useEmployee } from '../../hooks/employeeApi';

interface IEmployeeForm {
  open: boolean;
  onClose: () => void;
  employeeToEdit: IEmployee;
  clearEmployee: () => void;
}

const initialState = {
  id: '',
  nome: '',
  email: '',
  telefone: '',
  cpf: '',
  nascimento: '',
  grupousuario: '',
  situacao: 0,
}

const EmployeeForm: React.FC<IEmployeeForm> = ({ open, onClose, employeeToEdit, clearEmployee }: IEmployeeForm) => {
  const classes = useStyles();
  const { create, update } = useEmployee();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<IEmployee>({ defaultValues: employeeToEdit ? { ...employeeToEdit } : {} as IEmployee });
  const edit = Object.values(employeeToEdit).length !== 0 ? true : false;

  const onSubmit: SubmitHandler<IEmployee> = async (data, e): Promise<void> => {
    e?.preventDefault();
    if (!data.nome) { setError('Insira o nome'); return; }
    if (!data.email) { setError('Insira o autor'); return; }
    if (!data.telefone) { setError('Insira a edição'); return; }
    if (!data.cpf) { setError('Insira a editora'); return; }
    if (!data.nascimento) { setError('Insira o CDD'); return; }
    if (!data.grupousuario) { setError('Insira a quantidade de páginas'); return; }

    try {
      setLoading(true);
      edit
        ? await update({ id: employeeToEdit?.id, data})
        : await create(data);
    } catch (e) {
      setError(e);
    } finally {
      resetForm();
      setLoading(false);
    }
  }


  const handleClose = () => {
    resetForm();
    onClose();
  }

  const resetForm = () => {
    reset({ ...initialState });
    clearEmployee();
  }

  const body = (
    <div className={classes.container}>
      <div className={classes.header}>
        <Close style={{ color: 'transparent' }} />
        <Typography color="primary" style={{ padding: '20px 0 20px 0' }} variant="h4">{employeeToEdit ? 'Editar' : 'Adicionar'} Livro</Typography>
        <button className={classes.close} onClick={handleClose}>
          <Close style={{ fontSize: 40 }} />
        </button>
      </div>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            type="text"
            id="outlined-basic"
            label="Nome"
            variant="outlined"
            size="small"
            error={error === 'Insira o nome'}
            helperText={error === 'Insira o nome' && error}
            InputProps={{
              autoComplete: 'off'
            }}
            className={classes.input}
            {...register('nome' )}
          />
          <TextField
            type="text"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            size="small"
            error={error === 'Insira o email'}
            helperText={error === 'Insira o email' && error}
            InputProps={{
              autoComplete: 'off'
            }}
            className={classes.input}
            {...register('email' )}
          />
          <TextField
            type="text"
            id="outlined-basic"
            label="Telefone"
            variant="outlined"
            size="small"
            error={error === 'Insira o telefone'}
            helperText={error === 'Insira o telefone' && error}
            InputProps={{
              autoComplete: 'off'
            }}
            className={classes.input}
            {...register('telefone')}
          />
          <TextField
            type="text"
            id="outlined-basic"
            label="CPF"
            variant="outlined"
            size="small"
            error={error === 'Insira o CPF'}
            helperText={error === 'Insira o CPF' && error}
            InputProps={{
              autoComplete: 'off'
            }}
            className={classes.input}
            {...register('cpf')}
          />
          <TextField
            type="text"
            id="outlined-basic"
            label="Data de nascimento"
            variant="outlined"
            size="small"
            error={error === 'Insira a data de nascimento'}
            helperText={error === 'Insira a data de nascimento' && error}
            InputProps={{
              autoComplete: 'off'
            }}
            className={classes.input}
            {...register('nascimento')}
          />
          <TextField
            type="text"
            id="outlined-basic"
            label="Grupo de usuário"
            variant="outlined"
            size="small"
            error={error === 'Insira o grupo de usuário'}
            helperText={error === 'Insira o grupo de usuário' && error}
            InputProps={{
              autoComplete: 'off'
            }}
            className={classes.input}
            {...register('grupousuario' )}
          />
          <TextField
            type="text"
            id="outlined-basic"
            label="Situação"
            variant="outlined"
            size="small"
            error={error === 'Insira a situação'}
            helperText={error === 'Insira a situação' && error}
            InputProps={{
              autoComplete: 'off'
            }}
            className={classes.input}
            {...register('situacao' )}
          />
          <Button className={classes.button} type="submit">
            {loading ? <Loading loadingSize={16} /> : 'Salvar'}
          </Button>
      </form>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        {body}
      </Modal>
    </div>
  )
}

export default EmployeeForm;
