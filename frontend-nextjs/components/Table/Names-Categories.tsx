import { Box, Paper, Typography } from '@mui/material'
import {IRecruitmentData, TracksType} from '../../utils/types/RecruitmentDataTypes'
import NamesItem from './Names-item'

export default function NamesCategories({ data, selectedObj }: NamesCategoriesProps) {

    const pendingApps = data.filter( app => app.status === "pending")
    const acceptedApps = data.filter( app => app.status === "accepted")
    const rejectedApps = data.filter( app => app.status === "rejected")

    const categories = [
        {name: "Pending", data: pendingApps, color: "primary"},
        {name: "Accepted", data: acceptedApps, color: "secondary"},
        {name: "Rejected", data: rejectedApps, color: "error"}
    ]

    return (
        <Box paddingBottom={2} marginBottom={2} borderBottom="1px solid grey">
            <Box component="section" maxHeight={600} overflow={"auto"}>
                {
                    categories.map( (category) => (
                        category.data.length > 0 ? 
                        (
                            <>
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
                            </>
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