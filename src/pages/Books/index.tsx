/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Loading } from '../../common';
import Table from '../../components/Table';
import { useBook } from '../../hooks/bookApi';

const Books: React.FC = () => {
  const { load, bookList, currentPage } = useBook();
  const [loading, setLoading] = useState<boolean>(true)
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    (async(): Promise<void> => {
      try {
        await load();
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false)
      }
    })();
  }, [currentPage]);



  return (
    <div>
      <Typography variant="h2">Books</Typography>
      {
        loading
          ? <Loading loadingSize={50} />
          : <Table bookList={bookList} updateList={() => setUpdate(!update)} />
      }
    </div>
  )
}

export default Books
