import { ReactNode } from "react";

export default function Layout({ children }: LayoutProps) {
    
    return (
        <>
            <h1>Header</h1>
            {children}
        </>
    )
}

interface LayoutProps {
    children: ReactNode | ReactNode[]
}