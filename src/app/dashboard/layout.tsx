'use client'
import withAuth from "@/components/WithAuth";

function DashboardLayout({ children }) {
    return (
        <div style={{ paddingTop: "10px" }} >{children}</div>
    )

}

export default withAuth(DashboardLayout)