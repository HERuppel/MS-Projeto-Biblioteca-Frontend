import React, { useState } from 'react';
import { Modal, TextField, Button, Typography } from '@material-ui/core';

import { useForm, SubmitHandler } from 'react-hook-form';
import { IBook } from '../../interfaces';
import useStyles from './styles';
import { Loading } from '../../common';
import { useBook } from '../../hooks/bookApi';

interface IBookForm {
  open: boolean;
  onClose: () => void;
}

const BookForm: React.FC<IBookForm> = ({ open, onClose }: IBookForm) => {
  const classes = useStyles();
  const { create } = useBook();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<IBook>();

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
      await create(data);
    } catch (e) {
      setError(e);
    } finally {
      reset({} as IBook);
      setLoading(false);
    }
  }

  const body = (
    <div className={classes.container}>
      <Typography style={{ padding: '20px 0 20px 0' }} variant="h3">Adicionar Livro</Typography>
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
          error={error === 'Insira o nome'}
          helperText={error === 'Insira o nome' && error}
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
          error={error === 'Insira o nome'}
          helperText={error === 'Insira o nome' && error}
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
          error={error === 'Insira o nome'}
          helperText={error === 'Insira o nome' && error}
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
          error={error === 'Insira o nome'}
          helperText={error === 'Insira o nome' && error}
          InputProps={{
            autoComplete: 'off'
          }}
          className={classes.input}
          {...register('cdd' )}
        />
        <div className={classes.pageNQtd}>
          <TextField
            type="text"
            id="outlined-basic"
            label="Páginas"
            variant="outlined"
            size="small"
            error={error === 'Insira o nome'}
            helperText={error === 'Insira o nome' && error}
            InputProps={{
              autoComplete: 'off'
            }}
            className={classes.input}
            {...register('paginas' )}
          />
          <TextField
            type="text"
            id="outlined-basic"
            label="Quantidade no estoque"
            variant="outlined"
            size="small"
            error={error === 'Insira o nome'}
            helperText={error === 'Insira o nome' && error}
            InputProps={{
              autoComplete: 'off'
            }}
            className={classes.input}
            {...register('qtdEstoque' )}
          />
        </div>
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
