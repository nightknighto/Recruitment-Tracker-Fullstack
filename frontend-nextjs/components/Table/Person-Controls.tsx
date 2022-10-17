import React, { MouseEventHandler, useEffect, useState } from 'react'
import styles from '../../styles/PersonControls.module.css'
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Menu, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem'
import { statuses, StatusType } from '../../utils/types/RecruitmentDataTypes';
import capitalizeFirstLetter from '../../utils/services/capitalizeFirstLetter';

export default function PersonControls({ status }: PersonControlsProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <>
        <Box sx={{
            position: {
            md: "absolute"
            },
            float: {
                xs: "right",
                md: "none"
            }
        }} 
        right="0" top="0">
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Box display="block">
                    <SettingsIcon sx={{ fontSize: 60}} />
                    <Box marginTop={-1} display="block">
                        <Typography>
                            controls
                        </Typography>
                    </Box>
                </Box>
            </Button>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'lock-button',
                role: 'listbox',
                }}
            >
                <MenuItem
                    disabled
                >
                    Status
                </MenuItem>
                {statuses.map((newStatus) => (
                <MenuItem
                    key={newStatus}
                    value={newStatus}
                    selected={newStatus === status}
                    sx={newStatus === status? { color: "primary.dark" } : {}}
                >
                    {capitalizeFirstLetter(newStatus)}
                </MenuItem>
                ))}
            </Menu>
        </Box>
        </>
    )
}

interface PersonControlsProps {
    status: StatusType
}