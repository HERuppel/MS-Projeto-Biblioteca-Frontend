import React, { useState } from 'react';
import { Modal, TextField, Button, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { useForm, SubmitHandler } from 'react-hook-form';
import { IBook } from '../../interfaces';
import useStyles from './styles';
import { Loading } from '../../common';
import { useBook } from '../../hooks/bookApi';

interface IBookForm {
  open: boolean;
  onClose: () => void;
  bookToEdit: IBook;
}

const BookForm: React.FC<IBookForm> = ({ open, onClose, bookToEdit }: IBookForm) => {
  const classes = useStyles();
  const { create, update } = useBook();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<IBook>({ defaultValues: bookToEdit ? { ...bookToEdit } : { } as IBook });
  const edit = Object.values(bookToEdit).length !== 0 ? true : false;

  const onSubmit: SubmitHandler<IBook> = async (data, e): Promise<void> => {
    e?.preventDefault();
    if (!data.nome) { setError('Insira o nome'); return; }
    if (!data.autor) { setError('Insira o autor'); return; }
    if (!data.edicao) { setError('Insira a edição'); return; }
    if (!data.editora) { setError('Insira a editora'); return; }
    if (!data.cdd) { setError('Insira o CDD'); return; }
    if (!data.paginas) { setError('Insira a quantidade de páginas'); return; }
    if (!data.qtdEstoque) { setError('Insira a quantidade do estoque'); return; }

    try {
      setLoading(true);
      edit
        ? await update({ id: bookToEdit?.id, data})
        : await create(data);
    } catch (e) {
      setError(e);
    } finally {
      reset({} as IBook);
      setLoading(false);
    }
  }

  const handleClose = () => {
    reset({} as IBook);
    onClose();
  }

  const body = (
    <div className={classes.container}>
      <div className={classes.header}>
        <Close style={{ color: 'transparent' }} />
        <Typography color="primary" style={{ padding: '20px 0 20px 0' }} variant="h4">{bookToEdit ? 'Editar' : 'Adicionar'} Livro</Typography>
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
            label="Autor"
            variant="outlined"
            size="small"
            error={error === 'Insira o autor'}
            helperText={error === 'Insira o autor' && error}
            InputProps={{
              autoComplete: 'off'
            }}
            className={classes.input}
            {...register('autor' )}
          />
          <TextField
            type="text"
            id="outlined-basic"
            label="Edição"
            variant="outlined"
            size="small"
            error={error === 'Insira a edição'}
            helperText={error === 'Insira a edição' && error}
            InputProps={{
              autoComplete: 'off'
            }}
            className={classes.input}
            {...register('edicao' )}
          />
          <TextField
            type="text"
            id="outlined-basic"
            label="Editora"
            variant="outlined"
            size="small"
            error={error === 'Insira a editora'}
            helperText={error === 'Insira a editora' && error}
            InputProps={{
              autoComplete: 'off'
            }}
            className={classes.input}
            {...register('editora' )}
          />
          <TextField
            type="text"
            id="outlined-basic"
            label="CDD"
            variant="outlined"
            size="small"
            error={error === 'Insira o CDD'}
            helperText={error === 'Insira o CDD' && error}
            InputProps={{
              autoComplete: 'off'
            }}
            className={classes.input}
            {...register('cdd' )}
          />
          <TextField
            type="text"
            id="outlined-basic"
            label="Páginas"
            variant="outlined"
            size="small"
            error={error === 'Insira a quantidade de páginas'}
            helperText={error === 'Insira a quantidade de páginas' && error}
            InputProps={{
              autoComplete: 'off'
            }}
            className={classes.input}
            {...register('paginas' )}
          />
          <TextField
            type="text"
            id="outlined-basic"
            label="Quantidade do estoque"
            variant="outlined"
            size="small"
            error={error === 'Insira quantidade do estoque'}
            helperText={error === 'Insira quantidade do estoque' && error}
            InputProps={{
              autoComplete: 'off'
            }}
            className={classes.input}
            {...register('qtdEstoque' )}
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

export default BookForm;
