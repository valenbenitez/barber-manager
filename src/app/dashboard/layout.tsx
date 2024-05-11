'use client'
import NavBar from "@/components/NavBar/NavBar";
import withAuth from "@/components/WithAuth";
import Link from "next/link";

function DashboardLayout({ children }) {
    return (
        <div style={{ paddingTop: "10px" }} >
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }} >
                <label style={{ color: '#4E4B64', fontWeight: '400', fontSize: '12px', fontFamily: 'Montserrat' }} >Diseñado y desarrollado por <Link href={'https://www.instagram.com/primebit.ar/'} target="_blank"><b><u>PrimeBit</u></b></Link></label>
            </div>
            {children}
            <br />
            <br />
            <br />
            <NavBar />
        </div>
    )

}

export default withAuth(DashboardLayout)