/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Loading } from '../../common';
import Table from '../../components/Table';
import { useBook } from '../../hooks/bookApi';
import useStyles from './styles';

const Books: React.FC = () => {
  const classes = useStyles();
  const { load, bookList, currentPage } = useBook();
  const [loading, setLoading] = useState<boolean>(true)

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
    <div className={classes.container}>
      {
        loading
          ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
              <Loading loadingSize={50} />
            </div>
          : <div className={classes.content}>
              <Table bookList={bookList} />
            </div>
      }
    </div>
  )
}

export default Books
