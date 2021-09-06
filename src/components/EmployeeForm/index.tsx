import React, { useState } from 'react';
import { Modal, TextField, Button, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
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
  const { register, handleSubmit, reset, control } = useForm<IEmployee>({ defaultValues: employeeToEdit ? { ...employeeToEdit } : {} as IEmployee });
  const edit = Object.values(employeeToEdit).length !== 0 ? true : false;

  const onSubmit: SubmitHandler<IEmployee> = async (data, e): Promise<void> => {
    e?.preventDefault();
    if (!data.nome) { setError('Insira o nome'); return; }
    if (!data.email) { setError('Insira o autor'); return; }
    if (!data.telefone) { setError('Insira a edição'); return; }
    if (!data.cpf) { setError('Insira a editora'); return; }
    if (!data.nascimento) { setError('Insira o CDD'); return; }

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

  const phoneMask = (value: string): string => {
    let r = value.replace(/\D/g, '');
    r = r.replace(/^0/, '');

    if (r.length > 11) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (r.length > 7) {
      r = r.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, '($1) $2-$3');
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
    } else if (value.trim() !== '') {
      r = r.replace(/^(\d*)/, '($1');
    }
    return r;
  };

  const cpfMask = (cpf: string): string =>{
    let r = cpf.replace(/\D/g, '');
    r = r.replace(/^0/, '');

    if (r.length > 10) {
      r = r.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    return r;
  }

  const newDate = (): string => {
    const date = new Date();

    const fmDate = date.toISOString().split('T')[0];

    return fmDate;
  }

  const body = (
    <div className={classes.container}>
      <div className={classes.header}>
        <Close style={{ color: 'transparent' }} />
        <Typography color="primary" style={{ padding: '20px 0 20px 0' }} variant="h4">{edit ? 'Editar' : 'Adicionar'} Funcionário</Typography>
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
            label="Senha"
            variant="outlined"
            size="small"
            error={error === 'Insira o senha'}
            helperText={error === 'Insira o senha' && error}
            InputProps={{
              autoComplete: 'off'
            }}
            className={classes.input}
            {...register('senha' )}
          />
          <Controller
            name="telefone"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                type="text"
                id="outlined-basic"
                label="Telefone"
                variant="outlined"
                size="small"
                inputProps={{
                  maxLength: 15, //11 numbers + special characters
                  autoComplete: 'off'
                }}
                error={error === 'Insira o telefone'}
                helperText={error === 'Insira o telefone' ? error : 'Somente números'}
                value={value ? phoneMask(value) : ''}
                onChange={onChange}
                className={classes.input}
              />
            )}
          />
          <Controller
            name="cpf"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                type="text"
                id="outlined-basic"
                label="CPF"
                value={value ? cpfMask(value) : ''}
                onChange={onChange}
                variant="outlined"
                size="small"
                error={error === 'Insira o CPF'}
                helperText={error === 'Insira o CPF' && error}
                inputProps={{
                  autoComplete: 'off',
                  maxLength: 14
                }}
                className={classes.input}
              />
            )}
          />
          <Controller
            control={control}
            name="nascimento"
            render={({ field: { onChange, value } }) => (
              <TextField
                type="date"
                id="outlined-basic"
                label="Data de nascimento"
                value={value ? value : newDate()}
                onChange={onChange}
                variant="outlined"
                size="small"
                error={error === 'Insira a data de nascimento'}
                helperText={error === 'Insira a data de nascimento' && error}
                InputProps={{
                  autoComplete: 'off',
                }}
                className={classes.input}
              />
            )}
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
