'use client'

import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import Head from "next/head";
import { useState } from "react";




export default function Home() {

  const [cmd, setCmd] = useState('')
  const [customMap, setCustomMap] = useState('')

  const matches = useMediaQuery('(max-width:600px)')

  const startServer = (cmd: string) => {
    const run = fetch('api/valve?' + new URLSearchParams({command: cmd}))
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
        <>
        <Box display={"flex"} gap={2} mb={2} m={4}>
          <Button variant="contained" onClick={() => startServer('exec prac')}>                                                                                  
            Start Prac
          </Button>
          <Button variant="contained" onClick={() => startServer('exec comp')}>
            Start Comp
          </Button>
          <Button variant="contained" onClick={() => startServer('exec live')}>
            Go Live
          </Button>
          <Button variant="contained" onClick={() => startServer('exec onevone')}>
            1v1
          </Button>
        </Box>
    
    <Box display={"flex"} gap={2} width={matches ? "100%" : "50%"} m={4}>
      <TextField fullWidth label="Command" variant="filled" sx={{backgroundColor: "#1976d2"}} onChange={(e) => setCmd(e.target.value)}/>
      <Button variant="contained" onClick={() => {
        if (cmd != '') {
        startServer(cmd) 
        } else {
          return
        }
        }}>
        Send cmd
      </Button>
    </Box>

    <Box display={"flex"} flexDirection={matches ? "column" : "row"} gap={2} m={4}>
    <Button variant="contained" onClick={() => startServer('changelevel cs_italy')}>                                                                                  
        Italy
      </Button>
      <Button variant="contained" onClick={() => startServer('changelevel cs_office')}>
        Office
      </Button>
      <Button variant="contained" onClick={() => startServer('changelevel de_ancient')}>
        Ancient
      </Button>
      <Button variant="contained" onClick={() => startServer('changelevel de_anubis')}>                                                                                  
        Anubis
      </Button>
      <Button variant="contained" onClick={() => startServer('changelevel de_dust2')}>
        Dust 2
      </Button>
      <Button variant="contained" onClick={() => startServer('changelevel de_inferno')}>
        Inferno
      </Button>
      <Button variant="contained" onClick={() => startServer('changelevel de_mirage')}>                                                                                  
        Mirage
      </Button>
      <Button variant="contained" onClick={() => startServer('changelevel de_nuke')}>
        Nuke
      </Button>
      <Button variant="contained" onClick={() => startServer('changelevel de_overpass')}>
        Overpass
      </Button>
      <Button variant="contained" onClick={() => startServer('changelevel de_vertigo')}>                                                                                  
        Vertigo
      </Button>
      <Button variant="contained" onClick={() => startServer('host_workshop_map 3084291314')}>
        Aim W map
      </Button>
      <Button variant="contained" onClick={() => startServer('host_workshop_map 3073892687')}>
        Season
      </Button>
      <Button variant="contained" onClick={() => startServer('host_workshop_map 3070284539')}>
        Train
      </Button>
    </Box>
    <Box display={"flex"} gap={2} width={matches ? "100%" : "50%"} mt={2} m={4}>
        <TextField fullWidth label="workshop map id" variant="filled" sx={{backgroundColor: "#1976d2"}} onChange={(e) => setCustomMap(e.target.value)}/>
        <Button variant="contained" onClick={() => {
          if (customMap != '') {
          startServer(`host_workshop_map ${customMap}`) 
          } else {
            return
          }
          }}>
          Start Custom Map
        </Button>
    </Box>
        </>
    
    
    </>
  )
}
