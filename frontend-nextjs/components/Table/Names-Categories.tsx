import { Box, Paper, Typography } from '@mui/material'
import {IRecruitmentData, TracksType} from '../../utils/types/RecruitmentDataTypes'
import NamesItem from './Names-item'

export default function NamesCategories({ data, selectedObj }: NamesCategoriesProps) {

    const pendingApps = data.filter( app => app.status === "pending")
    const emailedApps = data.filter( app => app.status === "emailed")
    const scheduledApps = data.filter( app => app.status === "scheduled")
    const recommendedApps = data.filter( app => app.status === "recommended")
    const onholdApps = data.filter( app => app.status === "on hold")
    const acceptedApps = data.filter( app => app.status === "accepted")
    const rejectedApps = data.filter( app => app.status === "rejected")
    const secondprefApps = data.filter( app => app.status === "second pref")
    const filteredApps = data.filter( app => app.status === "filtered")

    const categories = [
        {name: "Pending", data: pendingApps, color: "primary"},
        {name: "Emailed", data: emailedApps, color: "secondary"},
        {name: "Scheduled", data: scheduledApps, color: "secondary"},
        {name: "Recommended", data: recommendedApps, color: "green"},
        {name: "On Hold", data: onholdApps, color: "green"},
        {name: "Accepted", data: acceptedApps, color: "green"},
        {name: "Rejected", data: rejectedApps, color: "error"},
        {name: "Filtered", data: filteredApps, color: "error"},
        {name: "Second Pref", data: secondprefApps, color: "primary"}
    ]

    return (
        <Box paddingBottom={2} marginBottom={2} borderBottom="1px solid grey">
            <Box component="section" maxHeight={600} overflow={"auto"}>
                {
                    categories.map( (category) => (
                        category.data.length > 0 ? 
                        (
                            <Box key={category.name}>
                                <Box sx={{marginBottom: "0.5rem", background: "linear-gradient(to bottom right, white, silver 74%)"}} paddingLeft={1}>
                                    <Typography color={category.color} variant="h4">{category.name}</Typography>
                                </Box>
                                <Box paddingLeft={1} maxHeight={300} overflow={"auto"}>
                                {
                                    category.data.map( obj => (
                                        <NamesItem key={obj._id} object={obj} selected={selectedObj === obj}/>
                                    ))
                                }
                                </Box>
                            </Box>
                        )
                        : null
                    ))
                }
            </Box>
        </Box>
    )
}

interface NamesCategoriesProps {
    data: IRecruitmentData[]
    selectedObj: IRecruitmentData | null
}