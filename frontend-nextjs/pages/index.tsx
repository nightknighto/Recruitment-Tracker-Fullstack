import { AccessAlarm, Home as Hm } from '@mui/icons-material'
import { Box, Button, Card, Container, Grid, Paper, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import Layout from '../components/Layout'
import { useContext, useEffect, useState } from 'react';
import { DataContext } from './_app';

ChartJS.register(ArcElement, Tooltip, Legend);

const chartBackgroundColors = [
  '#e25668',
  '#e28956',
  '#e2cf56',
  '#aee256',
  '#68e256',
  '#56e289',
  '#56e2cf',
  '#56aee2',
  '#5668e2',
  '#8956e2',
  '#cf56e2',
  '#e256ae',
  '#e25668',
  '#e28956',
]

const chartBorderColors = ['white']

const Home: NextPage = () => {

  const [track1DoughnutData, setTrack1DoughnutData] = useState<ChartData<"doughnut", number[]>>();
  const [track2DoughnutData, setTrack2DoughnutData] = useState<ChartData<"doughnut", number[]>>();
  const [yearDoughnutData, setYearDoughnutData] = useState<ChartData<"doughnut", number[]>>();
  const [numOfApplicants, setNumOfApplicants] = useState(0);
  const { data: APIdata } = useContext(DataContext)

  // Effect to get the number of applicants
  useEffect( () => {
    if(!APIdata) return;

    setNumOfApplicants(APIdata.length)
  }, [APIdata])

  // Effect to get the data for the *first preference* doughnut chart
  useEffect( () => {
    if(!APIdata) return;

    const labels: string[] = []
    APIdata.forEach( (data) => {
      if(!labels.includes(data.track)) labels.push(data.track);
    })

    const stats: number[] = []
    labels.forEach( (label) => {
      const count = APIdata.filter( (data) => data.track === label).length
      stats.push(count)
    });

    const newObj = {
      labels: labels,
      datasets: [{
        label: '# per Track',
        data: stats,
        backgroundColor: chartBackgroundColors,
        borderColor: chartBorderColors,
        borderWidth: 1,
      }]
    }
    
    setTrack1DoughnutData(newObj)

  }, [APIdata])

  // Effect to get the data for the *first preference* doughnut chart
  useEffect( () => {
    if(!APIdata) return;

    const labels: string[] = []
    APIdata.forEach( (data) => {
      if(!labels.includes(data.otherTrackInterest) && data.otherTrackInterest.length < 30) labels.push(data.otherTrackInterest);
    })

    const stats: number[] = []
    labels.forEach( (label) => {
      const count = APIdata.filter( (data) => data.otherTrackInterest === label).length
      stats.push(count)
    });

    const newObj = {
      labels: labels,
      datasets: [{
        label: '# per Track',
        data: stats,
        backgroundColor: chartBackgroundColors,
        borderColor: chartBorderColors,
        borderWidth: 1,
      }]
    }
    
    setTrack2DoughnutData(newObj)

  }, [APIdata])

  // Effect to get the data for the *year* doughnut chart
  useEffect( () => {
    if(!APIdata) return;

    const years = ["1st", "2nd", "3rd", "4th", "5th"]

    const stats: number[] = []
    years.forEach( (year) => {
      const count = APIdata.filter( (data) => data.year === year).length
      stats.push(count)
    });

    const newObj = {
      labels: years,
      datasets: [{
        label: '# per Year',
        data: stats,
        backgroundColor: chartBackgroundColors,
        borderColor: chartBorderColors,
        borderWidth: 1,
      }]
    }
    
    setYearDoughnutData(newObj)

  }, [APIdata])


  return (
    <Layout>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box marginTop={3}>
              <Paper elevation={10} sx={{backgroundColor: "#e0eeed"}}>
                <Typography variant="h4" component="h1" align="center">
                  Statistics
                </Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container>
              <Grid item xs={12}>
                <Paper elevation={3}>
                  <Box paddingLeft={3} marginBottom={2}>
                    <Typography variant="h5" component="h2">
                      Number of Applications
                    </Typography>
                    <Typography variant="h3" component="p">
                      {numOfApplicants}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={3}>
                  <Typography variant="h5" component="h2" textAlign="center">
                    Applicants Year
                  </Typography>
                  <Box padding={2} marginTop={-1}>
                    {yearDoughnutData && <Doughnut data={yearDoughnutData}/>}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container>
              <Grid item xs={12}>
                <Paper elevation={3}>
                  <Box marginTop={3}>
                    <Typography variant="h5" component="h2" textAlign="center">
                      First Preference
                    </Typography>
                    <Box padding={2} marginTop={-1}>
                      {track1DoughnutData && <Doughnut data={track1DoughnutData}/>}
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={3}>
                  <Box marginTop={3}>
                    <Typography variant="h5" component="h2" textAlign="center">
                      Second Preference
                    </Typography>
                    <Box padding={2} marginTop={-1}>
                      {track2DoughnutData && <Doughnut data={track2DoughnutData}/>}
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Container>
    </Layout>
  )
}

export default Home
