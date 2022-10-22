import { Backdrop, Alert, CircularProgress, Box } from "@mui/material";
import error from "next/error";
import { useEffect, useState } from "react";

export default function LoadingIndicator({ open }: LoadingIndicatorProps) {
    const [displayMsg, setDisplayMsg] = useState<boolean>(false)

    useEffect( () => {
        setDisplayMsg(false)
        if(!open) return;

        const timer = setTimeout(() => {
            setDisplayMsg(true)
        }, 5000)
        return () => clearTimeout(timer)
    }, [open])

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={open}
        >
            <Box display="flex" flexDirection="column" alignItems="center">
                <Box display="block">
                    <CircularProgress color="inherit" />
                </Box>
                {displayMsg && (
                    <Box>
                        <Alert severity="info">Hold tight, the server is waking up. This can take up to 30 seconds</Alert>
                    </Box>
                )}
            </Box>
        </Backdrop>
    )
}

interface LoadingIndicatorProps {
    open: boolean;
}