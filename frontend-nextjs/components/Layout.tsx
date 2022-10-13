import { ReactNode } from "react";
import AppBar from "./AppBar";

export default function Layout({ children }: LayoutProps) {
    
    return (
        <>
            <AppBar />
            {children}
        </>
    )
}

interface LayoutProps {
    children: ReactNode | ReactNode[]
}