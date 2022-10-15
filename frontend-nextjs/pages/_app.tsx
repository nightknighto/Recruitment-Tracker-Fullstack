import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { createContext, useEffect, useState } from 'react'
import {IRecruitmentData} from '../utils/types/RecruitmentDataTypes'
import RecruitmentDataAPI from '../utils/apis/RecruitmentDataAPI'
import { Alert, Backdrop, CircularProgress } from '@mui/material'

export const DataContext = createContext<DataContextType>({data: null, changeData: () => {}})

function MyApp({ Component, pageProps }: AppProps) {

  const [data, setData] = useState<IRecruitmentData[] | null>(null)
  const [error, setError] = useState<Error | null>(null)
  function changeData(changedData: IRecruitmentData[]) {
    setData(changedData)
  }

  useEffect( () => {
    // self-invoking function
    (async () => {
      try{
        const getData = await RecruitmentDataAPI.getAllData()
        setData(getData);
      } catch (err) {
        setError(err as Error)
      }
    })()
  }, [])

  return (
    <DataContext.Provider value={{data, changeData}}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
      {!data && (
          <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          {error? 
            <Alert severity="error">A server error has occurred: {error.message}</Alert>
            : <CircularProgress color="inherit" />
          }
        </Backdrop>
      )}
    </DataContext.Provider>
  )
}

type DataContextType = {data: IRecruitmentData[] | null, changeData: (changedData: IRecruitmentData[]) => void}

export default MyApp
