import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { createContext, useEffect, useState } from 'react'
import {IRecruitmentData} from '../utils/types/RecruitmentDataTypes'
import RecruitmentDataAPI from '../utils/apis/RecruitmentDataAPI'

export const DataContext = createContext<DataContextType>({data: null, changeData: () => {}})

function MyApp({ Component, pageProps }: AppProps) {

  const [data, setData] = useState<IRecruitmentData[] | null>(null)

  function changeData(changedData: IRecruitmentData[]) {
    setData(changedData)
  }

  useEffect( () => {
    // self-invoking function
    (async () => {
      const getData = await RecruitmentDataAPI.getAllData()
      setData(getData);
    })()
  }, [])

  return (
    <DataContext.Provider value={{data, changeData}}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </DataContext.Provider>
  )
}

type DataContextType = {data: IRecruitmentData[] | null, changeData: (changedData: IRecruitmentData[]) => void}

export default MyApp
