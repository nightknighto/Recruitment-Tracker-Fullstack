import React, { MouseEventHandler, useContext, useEffect, useState } from 'react'
import styles from '../../styles/PersonControls.module.css'
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Menu, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem'
import { statuses, StatusType } from '../../utils/types/RecruitmentDataTypes';
import capitalizeFirstLetter from '../../utils/services/capitalizeFirstLetter';
import { getUserRole } from '../../utils/services/auth';
import { DataContext } from '../../pages/_app';

export default function PersonControls({ status, handleChange }: PersonControlsProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const role = getUserRole() || 'basic';

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleStatusChange = (newStatus: StatusType) => {
        handleChange(newStatus);
        handleClose();
    }

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
                disabled={role === 'basic'}
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
                    onClick={() => handleStatusChange(newStatus)}
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
    handleChange: (newStatus: StatusType) => void
}