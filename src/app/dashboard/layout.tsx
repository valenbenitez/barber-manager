'use client'
import withAuth from "@/components/WithAuth";

function DashboardLayout({ children }) {
    return (
        <div>{children}</div>
    )

}

export default withAuth(DashboardLayout)