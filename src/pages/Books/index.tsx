/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import BookTable from '../../components/BookTable';
import { useBook } from '../../hooks/bookApi';
import useStyles from './styles';
import LottieLoading from '../../components/LottieLoading';

const Books: React.FC = () => {
  const classes = useStyles();
  const { load, bookList, currentPage } = useBook();
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    (async(): Promise<void> => {
      try {
        setLoading(true);
        await load();
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentPage]);



  return (
    <div className={classes.container}>
      {
        loading
          ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
              <LottieLoading />
            </div>
          : <div className={classes.content}>
              <BookTable bookList={bookList} />
            </div>
      }
    </div>
  )
}

export default Books
