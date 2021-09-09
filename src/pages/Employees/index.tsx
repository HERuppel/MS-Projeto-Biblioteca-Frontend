import React, { useEffect, useState } from 'react'

import EmployeeTable from '../../components/EmployeeTable';
import LottieLoading from '../../components/LottieLoading';
import { useEmployee } from '../../hooks/employeeApi';
import useStyles from './styles'

const Employees: React.FC = () => {
  const classes = useStyles();
  const { load, employeeList, currentPage } = useEmployee();
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className={classes.container}>
      {
        loading
          ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
              <LottieLoading />
            </div>
          : <div className={classes.content}>
              <EmployeeTable employeeList={employeeList} />
            </div>
      }
    </div>
  )
}

export default Employees
