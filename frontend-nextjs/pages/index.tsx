import { AccessAlarm, Home as Hm } from '@mui/icons-material'
import { Box, Button, Card, Container, Grid, Paper, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Layout from '../components/Layout'
import { useEffect, useState } from 'react';
import RecruitmentDataAPI from '../utils/apis/RecruitmentDataAPI';



ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# per Track',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
const Home: NextPage = () => {

  const [doughnutData, setDoughnutData] = useState(data);
  const [numOfApplicants, setNumOfApplicants] = useState(0);

  useEffect( () => {
    async function fetchData() {
      const allData = await RecruitmentDataAPI.getAllData()
      setNumOfApplicants(allData.length)

      const labels: string[] = []
      allData.forEach( (data) => {
        if(!labels.includes(data.track)) labels.push(data.track);
      })

      const data: number[] = []
      labels.forEach( (label) => {
        const count = allData.filter( (data) => data.track === label).length
        data.push(count)
      });

      const newObj = {
        labels: labels,
        datasets: [{
          label: '# per Track',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,

        }]
      }
      
      setDoughnutData(newObj)

    }


    fetchData();
  }, [])


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
            <Paper elevation={3}>
              <Box paddingLeft={3}>
                <Typography variant="h5" component="h2">
                  Number of Applications
                </Typography>
                <Typography variant="h3" component="p">
                  {numOfApplicants}
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3}>
              <Box padding={2}>
                {doughnutData && <Doughnut data={doughnutData}/>}
              </Box>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Layout>
  )
}

export default Home
