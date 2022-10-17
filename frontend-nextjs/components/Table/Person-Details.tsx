import { Box, Grid, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import capitalizeFirstLetter from '../../utils/services/capitalizeFirstLetter';
import {IRecruitmentData} from '../../utils/types/RecruitmentDataTypes'
import PersonControls from './Person-Controls';

// fieldsMap: [displayed title, property name]
const fieldsMap: [string, string][] = [
    ["Knowledge", "knowledge"],
    ["Reason for choosing the track", "trackReason"],
    ["Second Track Interest", "otherTrackInterest"],
    ["Second Track Reason", "otherTrackInterestReason"],
    ["Past Student Activites", "otherStudentActivites"]
]

export default function PersonDetails({ object }: PersonDetailsProps) {

    if(!object) return null;

    const {
        collegeID,
        status,
        submissionTime,
        email,
        name,
        phone,
        track,
        year,
    } = object

    return (
        <Box>
            <Paper>
                <Box paddingY={3}>
                    <Box component="header" paddingX={3} position="relative">
                        <Box justifyContent={"center"} display="flex">
                            <h2>{name}</h2>
                        </Box>
                        <Box justifyContent={"space-around"} display="flex">
                            <Box>
                                <h3>Track: <Typography color="secondary" variant="h6" component="span">{track}</Typography></h3>
                            </Box>
                            <Box>
                                <h3>Status: <Typography color="secondary" variant="h6" component="span">{capitalizeFirstLetter(status)}</Typography></h3>
                            </Box>
                        </Box>
                        <PersonControls status={status} />
                    </Box>
                    <div>
                        <Box paddingX={3} marginTop={2}>
                            <Grid container rowSpacing={1}>
                                <Grid item component="section" xs={12} md={6}>
                                    <p><strong>Email:</strong> {email}</p>
                                </Grid>
                                <Grid item component="section" xs={12} md={6}>
                                    <p><strong>Phone:</strong> {phone}</p>
                                </Grid>
                                <Grid item component="section" xs={12} md={6}>
                                    <p><strong>Year:</strong> {year}</p>
                                </Grid>
                                <Grid item component="section" xs={12} md={6}>
                                    <p><strong>Submission Date:</strong> {submissionTime}</p>
                                </Grid>
                            </Grid>
                        </Box>
                        <section>
                            { 
                                fieldsMap.map(([title, prop]) => {
                                    {/* @ts-ignore */}
                                    return object[prop] && (
                                        <div key={prop}>
                                            <Box paddingY={1} paddingX={3} marginY={2} sx={{background: "linear-gradient(to bottom right, white, silver 74%)"}}>
                                                <Typography variant='h5' component="h3" color="primary.dark">{title}</Typography>
                                            </Box>
                                            <Box paddingX={3}>
                                            {/* @ts-ignore */}
                                            <p>{object[prop]}</p>
                                            </Box>
                                        </div>
                                    )
                                })
                            }
                        </section>
                    </div>
                </Box>
            </Paper>
        </Box>

    )
}

interface PersonDetailsProps {
    object: IRecruitmentData | null
}