import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Loading } from '../../common';
import Table from '../../components/Table';
import { IBook } from '../../interfaces';
import { api } from '../../services/api';

const Books: React.FC = () => {
  const [books, setBooks] = useState<IBook[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    (async(): Promise<void> => {
      try {
        setLoading(true);
        const res = await api.get('livro/recuperar');
        setBooks(res.data.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [update])

  return (
    <div>
      <Typography variant="h2">Books</Typography>
      {
        loading
          ? <Loading loadingSize={50} />
          : <Table books={books} updateList={() => setUpdate(!update)} />
      }
    </div>
  )
}

export default Books
