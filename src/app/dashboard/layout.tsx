'use client'
import NavBar from "@/components/NavBar/NavBar";
import withAuth from "@/components/WithAuth";

function DashboardLayout({ children }) {
    return (
        <div style={{ paddingTop: "10px" }} >
            {children}
            <NavBar />
        </div>
    )

}

export default withAuth(DashboardLayout)