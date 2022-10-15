import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import NamesAdd from '../../components/Table/Names-Add'
import NamesCategories from '../../components/Table/Names-Categories'
import NamesSearchbar from '../../components/Table/Names-Searchbar'
import PersonDetails from '../../components/Table/Person-Details'
import RecruitmentDataAPI from '../../utils/apis/RecruitmentDataAPI'
import IRecruitmentData from '../../utils/interfaces/RecruitmentData'
import styles from '../../styles/Table.module.css'
import { DataContext } from '../_app'
import Grid from '@mui/material/Grid'
import { Box, Container, Paper } from '@mui/material'

export const changeSelectionContext = React.createContext<((targ: IRecruitmentData) => void)>(() => {alert('error')})

export default function Table() {
    const {data, changeData} = useContext(DataContext)
    const [selectedObj, setSelectedObj] = useState<IRecruitmentData | null>(null)

    function changeSelection(target: IRecruitmentData) {
        if(selectedObj !== target) {
            setSelectedObj(target)
        } else {
            setSelectedObj(null)
        }
    }

    if(!data) return;
    
    return (
        <Layout>
            <changeSelectionContext.Provider value={changeSelection}>
                <Box marginTop={3}>
                    <Container maxWidth="xl">
                        <Grid container component="main" spacing={3}>
                            <Grid item xs={12} md={4}>
                                <Paper elevation={10} sx={{backgroundColor: "light"}}>
                                    <Box>
                                        <Box padding={2} marginBottom={2} borderBottom="1px solid grey">
                                            <NamesSearchbar />
                                        </Box>
                                        <NamesCategories data={data} selectedObj={selectedObj}/>
                                        <Box padding={2} marginBottom={2} borderBottom="1px solid grey">
                                            <NamesAdd />  
                                        </Box>
                                    </Box>
                                </Paper>    
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Paper elevation={10}>
                                    <PersonDetails object={selectedObj} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </changeSelectionContext.Provider>
            <footer>
                
            </footer>
        </Layout>
    )
}