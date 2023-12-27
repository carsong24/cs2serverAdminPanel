'use client'

import { useState, useEffect } from "react"
import { DisplayUser } from "../../prismaclient/dbtypes"
//@ts-ignore
import Cookies from 'js-cookie'
import { Button, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import Head from "next/head"

export default function Profile() {
    const router = useRouter()
    const [user, setUser] = useState<DisplayUser>()
    const {data: session, status } = useSession()

    return (
        <>
        <Head>
            <title>{session?.user?.name}</title>
        </Head>
            <Typography>
                {session?.user?.email}
            </Typography>
            <Typography>
                {session?.user?.name}
            </Typography>
            <Button sx={{position: "fixed", bottom: 10, right: 15}} variant="contained" onClick={() => router.push('/')}>Home</Button>
        </>
    )
}