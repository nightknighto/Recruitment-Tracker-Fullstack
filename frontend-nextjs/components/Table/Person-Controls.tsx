import React, { MouseEventHandler, useEffect, useState } from 'react'
import styles from '../../styles/PersonControls.module.css'
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Typography } from '@mui/material';

export default function PersonControls() {
    const [open, setOpen] = useState(false)

    useEffect( () => {
        document.body.style.overflow = open? "hidden" : "auto"
    }, [open])

    function toggleControls() {
        setOpen(!open)
    }
    
    function closeModal() {
        setOpen(false)
    }

    const innerModalPreventPropagation: MouseEventHandler = (e) => {
        e.stopPropagation()
    }


    return (
        <>
        <Box position="absolute" right="0" top="0">
            <Button onClick={toggleControls}>
                <Box display="block">
                    <SettingsIcon sx={{ fontSize: 60}} />
                    <Box marginTop={-1} display="block">
                        <Typography>
                            controls
                        </Typography>
                    </Box>
                </Box>
            </Button>
        </Box>
        { open && 
            <div className={styles.modalBackground} onClick={closeModal}>
                <div className={styles.modal} onClick={innerModalPreventPropagation}>
                    Status
                    <select defaultValue="">
                        <option value="accepted">Accepted</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>
        }
        </>
    )
}