import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { createContext, useEffect, useState } from 'react'
import {IRecruitmentData} from '../utils/types/RecruitmentDataTypes'
import RecruitmentDataAPI from '../utils/apis/RecruitmentDataAPI'
import { Alert, Backdrop, CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import { clearUserData, getStoredAuthToken } from '../utils/services/auth'
import { AxiosError } from 'axios'
import LoadingIndicator from '../components/LoadingIndicator'

export const DataContext = createContext<DataContextType>({data: null, changeData: () => {}})
export const AuthContext = createContext<AuthContextType>({changeAuth: () => {}})

function MyApp({ Component, pageProps }: AppProps) {

  const [data, setData] = useState<IRecruitmentData[] | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const router = useRouter()

  function changeData(changedData: IRecruitmentData[]) {
    setData(changedData)
  }

  function changeAuth(authed: boolean) {
    setAuthenticated(authed)
  }

  useEffect( () => {
    // self-invoking function
    if(!authenticated) {
      if(getStoredAuthToken()) {
        setAuthenticated(true)
      } else {
        router.push('/login')
        return;
      }
    }

    (async () => {
      try{
        const getData = await RecruitmentDataAPI.getAllData()
        setData(getData);
      } catch (err: any) {
        if(err?.response?.status === 401) {
          setAuthenticated(false)
          clearUserData()
        } else {
          setError(err as Error)
        }
      }
    })()
  }, [authenticated])

  return (
    <DataContext.Provider value={{data, changeData}}>
      <AuthContext.Provider value={{changeAuth: changeAuth}}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <title>Recruitment Tracker</title>
          <meta name="description" content="Dashboard for tracking member registrations for SemiColon student activity." />
          <meta property="og:title" content="Recruitment Tracker" />
          <meta property="og:description" content="Dashboard for tracking member registrations for SemiColon student activity." />
        </Head>
        <Component {...pageProps} />
        {!data && authenticated && (
          <>
          {error? 
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open
            >
              <Alert severity="error">A server error has occurred: {error.message}</Alert>
            </Backdrop>
            :
            <LoadingIndicator open={true} />
          }
          </>
        )}
      </AuthContext.Provider>
    </DataContext.Provider>
  )
}

type DataContextType = {data: IRecruitmentData[] | null, changeData: (changedData: IRecruitmentData[]) => void}
type AuthContextType = {changeAuth: (authed: boolean) => void}

export default MyApp
