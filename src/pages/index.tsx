'use client'

import { Box, Grid } from "@mui/material";
import Today from "./renderPost";
import { useSession } from "next-auth/react";
import Head from "next/head";




export default function Home() {

  const {data: session, status} = useSession()

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
    <Grid container width={"100%"}>
      <Today/>
    </Grid>
    </>
  )
}
