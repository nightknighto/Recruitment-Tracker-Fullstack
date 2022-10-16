import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { ReactNode } from "react";
import { TracksType } from "../../utils/types/RecruitmentDataTypes";

const trackSearchOptions: {title: string, value: TracksType | 'all'}[] = [
    { title: "All", value: "all" },
    { title: "Flutter", value: "(AC) Flutter Mobile Applications" },
    { title: "Web", value: "(AC) Web Development" },
    { title: "Kotlin", value: "(AC) Android (Kotlin) Mobile Applications"},
    { title: "Embedded", value: "(AC) Embedded Systems" },
    { title: "Desktop", value: "(AC) Desktop C++ Applications" },
    { title: "Competitive", value: "(AC) Competitive Programming" },
    { title: "HR", value: "HR" },
    { title: "PR", value: "PR" },
    { title: "Media", value: "Media" },
    { title: "Logistics", value: "Logistics" },
    { title: "FR", value: "FR" },
]

export default function NamesSearchbar({ changeNameFilter, changeTrackFilter }: NamesSearchbarProps) {

    function onNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        changeNameFilter(event.target.value.trim())
    }

    function onTrackChange(event: SelectChangeEvent<unknown>) {
        changeTrackFilter(event.target.value as TracksType | 'all')
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Box>
                        <TextField
                            label="Search"
                            fullWidth
                            onChange={onNameChange}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label-track">Track</InputLabel>
                            <Select
                                labelId="demo-simple-select-label-track"
                                label="Track"
                                onChange={onTrackChange}
                                defaultValue="all"
                                >
                                    {
                                        trackSearchOptions.map((option) => {
                                            return (
                                                <MenuItem key={option.value} value={option.value}>{option.title}</MenuItem>
                                            )
                                        })
                                    }
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

interface NamesSearchbarProps {
    changeNameFilter: (target: string) => void
    changeTrackFilter: (target: TracksType | 'all') => void
}