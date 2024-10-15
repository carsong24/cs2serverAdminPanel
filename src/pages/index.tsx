'use client'

import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import Head from "next/head";
import { useState } from "react";




export default function Home() {

  const [cmd, setCmd] = useState('')
  const [customMap, setCustomMap] = useState('')

  const matches = useMediaQuery('(max-width:600px)')

  const startServer = (cmd: string) => {
    fetch('api/valve?' + new URLSearchParams({command: cmd}))
  }


  // cs2 server commands you probably want to know
  // Figured these are probably all anyone needs for this.

  // executing configs - "exec configname"
  // changing map - "changelevel de_dust2"
  // using workshop maps - "host_workshop_map mapid"

  //workshop mad ids can be found at the end of the link to a workshop item
  //                                                           \/\/\/\/\/
  //ie: https://steamcommunity.com/sharedfiles/filedetails/?id=3289507717


  //Config names are just single strings
  const configNames = [
    "prac",
    "comp",
    "live",
    "onevone"
  ]

  //make sure to keep {id: <id>, name: <display name>} format for maps
  //note: for the default map should only need to be changed when valve adds maps.
  //note: name can be literally anything
  const defaultMapNames = [
    {id: "cs_italy", name: "Italy"},
    {id: "cs_office", name: "Office"},
    {id: "de_ancient", name: "Ancient"},
    {id: "de_anubis", name: "Anubis"},
    {id: "de_dust2", name: "Dust 2"},
    {id: "de_inferno", name: "Inferno"},
    {id: "de_mirage", name: "Mirage"},
    {id: "de_nuke", name: "Nuke"},
    {id: "de_overpass", name: "Overpass"},
    {id: "de_vertigo", name: "Vertigo"},
  ]

  //make sure to keep {id: <id>, name: <display name>} format for maps
  //note: name can be literally anything
  const workShopMaps = [
    {id: "3084291314", name: "Aim Map"},
    {id: "3073892687", name: "Season"},
    {id: "3070284539", name: "Train"},
  ]

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
        <Box display={"flex"} gap={2} mb={2} m={4} flexWrap={"wrap"} flexDirection={matches ? "column" : "row"}>
          {configNames.map((config) => {
            return (
              <Button key={config} variant="contained" onClick={() => startServer(`exec ${config}`)}>                                                                                  
                Start {config}
              </Button>
            )
          })}
        </Box>
    
        <Box display={"flex"} gap={2} width={matches ? "90%" : "50%"} m={4}>
          <TextField fullWidth label="Command" variant="filled" sx={{backgroundColor: "#1976d2"}} onChange={(e) => setCmd(e.target.value)}/>
          <Button variant="contained" onClick={() => {
            if (cmd != '') {
            startServer(cmd) 
            }}}>
            Send cmd
          </Button>
        </Box>

        <Box display={"flex"} flexWrap={"wrap"} flexDirection={matches ? "column" : "row"} gap={2} m={4}>
          {defaultMapNames.map((map) => {
            return (
              <Button key={map.id} variant="contained" onClick={() => startServer(`changelevel ${map.id}`)}>                                                                                  
                {map.name}
              </Button>
            )
          })}
          {workShopMaps.map((map) => {
            return (
              <Button key={map.id} variant="contained" onClick={() => startServer(`host_workshop_map ${map.id}`)}>                                                                             
                {map.name}
              </Button>
            )
          })}
        </Box>

        <Box display={"flex"} gap={2} width={matches ? "90%" : "50%"} mt={2} m={4}>
            <TextField fullWidth label="workshop map id" variant="filled" sx={{backgroundColor: "#1976d2"}} onChange={(e) => setCustomMap(e.target.value)}/>
            <Button variant="contained" onClick={() => {
              if (customMap != '') {
              startServer(`host_workshop_map ${customMap}`) 
              }}}>
              Start Custom Map
            </Button>
        </Box>
    </>
  )
}
