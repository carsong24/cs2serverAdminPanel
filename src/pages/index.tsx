'use client'

import { Box, Grid } from "@mui/material";
import Today from "./renderPost";
import { useSession } from "next-auth/react";




export default function Home() {

  const {data: session, status} = useSession()
  console.log(session, status)
  return (
    
    <Grid container width={"100%"}>
      <Today/>
    </Grid>
      
  )
}
