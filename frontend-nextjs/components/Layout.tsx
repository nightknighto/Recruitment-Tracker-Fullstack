import { CssBaseline } from "@mui/material";
import { ReactNode } from "react";
import AppBar from "./AppBar";

export default function Layout({ children }: LayoutProps) {
    
    return (
        <CssBaseline>
            <AppBar />
            {children}
        </CssBaseline>
    )
}

interface LayoutProps {
    children: ReactNode | ReactNode[]
}