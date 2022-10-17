import { Backdrop, Alert, CircularProgress } from "@mui/material";
import error from "next/error";

export default function LoadingIndicator({ open }: LoadingIndicatorProps) {

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

interface LoadingIndicatorProps {
    open: boolean;
}