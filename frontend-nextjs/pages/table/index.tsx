import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import AdvancedControls from '../../components/Table/AdvancedControls'
import NamesCategories from '../../components/Table/Names-Categories'
import NamesSearchbar from '../../components/Table/Names-Searchbar'
import PersonDetails from '../../components/Table/Person-Details'
import {IRecruitmentData, TracksType} from '../../utils/types/RecruitmentDataTypes'
import { DataContext } from '../_app'
import Grid from '@mui/material/Grid'
import { Box, Container, Paper } from '@mui/material'

export const changeSelectionContext = React.createContext<((targ: IRecruitmentData) => void)>(() => {alert('error')})

export default function Table() {
    const {data, changeData} = useContext(DataContext)
    const [filteredData, setFilteredData] = useState<IRecruitmentData[] | null>(null)
    const [selectedObj, setSelectedObj] = useState<IRecruitmentData | null>(null)
    const [filterByName, setFilterByName] = useState<string>("")
    const [filterByTrack, setFilterByTrack] = useState<TracksType | 'all'>("all")

    function changeSelection(target: IRecruitmentData) {
        if(selectedObj !== target) {
            setSelectedObj(target)
        } else {
            setSelectedObj(null)
        }
    }

    function changeNameFilter(target: string) {
        setFilterByName(target)
    }

    function changeTrackFilter(target: TracksType | 'all') {
        setFilterByTrack(target)
    }

    // Data filteration
    useEffect( () => {
        if(data) {
            let filtered = data
            if(filterByName !== "") {
                filtered = filtered.filter( obj => obj.name.toLowerCase().includes(filterByName.toLowerCase()))
            }
            if(filterByTrack !== "all") {
                filtered = filtered.filter( obj => obj.track === filterByTrack)
            }
            setFilteredData(filtered)
        }
    }, [filterByName, filterByTrack, data])

    if(!filteredData) return;
    
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
                                            <NamesSearchbar changeNameFilter={changeNameFilter} changeTrackFilter={changeTrackFilter} />
                                        </Box>
                                        <NamesCategories data={filteredData} selectedObj={selectedObj}/>
                                        <Box padding={2} paddingTop={0} marginBottom={2} borderBottom="1px solid grey">
                                            <AdvancedControls />  
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