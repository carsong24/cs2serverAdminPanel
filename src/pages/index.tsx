'use client'

import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import '@fontsource-variable/sora';
import Image from "next/image";
import { TbRefresh } from "react-icons/tb"

export default function Home() {

  const [cmd, setCmd] = useState('')
  const [customMap, setCustomMap] = useState('')
  const [responseMessage, setResponseMessage] = useState('')
  const [serverData, setServerData] = useState<{map: string, players: {online: number, max: number, bots: number}, serverName: string, vacEnabled: boolean}>({map: "", players: {online: 0, max: 0, bots: 0}, serverName: "", vacEnabled: false})

  const matches = useMediaQuery('(max-width:600px)')

  const getServerInfo = async () => {
    await fetch('api/getStatus')
    .then(async (res) => {
      const data = await res.json()
      console.log(data)
      setServerData(data?.data)
    })
  }


  useEffect(() => {
    getServerInfo()
  }, [])

  useEffect(() => {
    console.log(serverData)
  }, [serverData])

  const startServer = async (cmd: string) => {
    await fetch('api/sendCmd?' + new URLSearchParams({command: cmd}))
    .then(async (res) => {
      const data = await res.json()
      console.log(data)
    })
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
    {id: "3084291314", name: "Aim Map", image: "de_aimmap"},
    {id: "3073892687", name: "Season", image: "de_season"},
    {id: "3070284539", name: "Train", image: "de_train"},
  ]

  return (
    <Box p={2} display={"flex"} flexDirection={"column"} gap={2}>
      <Head>
        <title>CS2 Server Panel</title>
      </Head>
        <Box display={"flex"} gap={4} justifyContent={"center"} alignItems={"center"}>
          <Box display={"flex"} alignItems={"center"}>
          <Typography style={{fontFamily: "'Sora Variable', sans-serif", fontWeight: "bold"}}>Server Name: {serverData?.serverName}</Typography>
          {serverData?.vacEnabled && (
            <Image
              src={`/vac.png`}
              width={40}
              height={40}
              alt={`Picture of vac logo`}
            />
          )}
          </Box>
          <Typography style={{fontFamily: "'Sora Variable', sans-serif", fontWeight: "bold", color: "green"}}>{serverData?.players?.online - serverData?.players?.bots} <span style={{color: "white", marginLeft: "6px"}}>Players Online</span></Typography>
          <Typography style={{fontFamily: "'Sora Variable', sans-serif", fontWeight: "bold"}}>Current Map: {serverData?.map}</Typography>
          <Button variant="text" onClick={() => getServerInfo()}><TbRefresh /></Button>
        </Box>
        <Box display={"flex"} gap={2} flexWrap={"wrap"} flexDirection={matches ? "column" : "row"} justifyContent={"center"}>
          {configNames.map((config) => {
            return (
              <Button style={{fontFamily: "'Sora Variable', sans-serif", fontWeight: "bold"}} key={config} variant="contained" onClick={() => startServer(`exec ${config}`)}>                                                                                  
                Start {config}
              </Button>
            )
          })}
        </Box>
    
        <Box display={"flex"} flexDirection={"column"} gap={2} pl={1} pr={1} justifyContent={"center"} alignItems={"center"} width={"100%"}>
          <Box display={"flex"} gap={2} justifyContent={"center"} alignItems={"center"} width={"100%"}>
              <TextField style={{ maxWidth: "800px", fontFamily: "'Sora Variable', sans-serif", border: "3px solid white", borderRadius: "6px"}} fullWidth label="Command" variant="filled" sx={{backgroundColor: "#1976d2"}} onChange={(e) => setCmd(e.target.value)}/>
              <Button style={{fontFamily: "'Sora Variable', sans-serif", fontWeight: "bold"}} variant="contained" onClick={() => {
                if (cmd != '') {
                startServer(cmd) 
                }}}>
                Send cmd
              </Button>
            </Box>

            <Box display={"flex"} gap={2} justifyContent={"center"} alignItems={"center"} width={"100%"}>
                <TextField style={{ maxWidth: "800px", fontFamily: "'Sora Variable', sans-serif", border: "3px solid white", borderRadius: "6px"}} fullWidth label="workshop map id" variant="filled" sx={{backgroundColor: "#1976d2"}} onChange={(e) => setCustomMap(e.target.value)}/>
                <Button style={{fontFamily: "'Sora Variable', sans-serif", fontWeight: "bold"}} variant="contained" onClick={() => {
                  if (customMap != '') {
                  startServer(`host_workshop_map ${customMap}`) 
                  }}}>
                  Start Custom Map
                </Button>
            </Box>
            <Box>
              <Typography style={{fontFamily: "'Sora Variable', sans-serif", fontWeight: "bold"}}>{responseMessage}</Typography>
            </Box>
        </Box>

        <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-evenly"} flexDirection={matches ? "column" : "row"} gap={2}>
          {defaultMapNames.map((map) => {
            return (
              <Box key={map.id} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={2}>
                <Image
                  style={{border: "3px solid white", borderRadius: "6px"}}
                  src={`/mapImages/${map.id}.png`}
                  width={matches ? 450 : 350}
                  height={matches ? 281 : 196}
                  alt={`Picture of ${map.name}`}
                />
                <Button style={{fontFamily: "'Sora Variable', sans-serif"}} key={map.id} variant="contained" onClick={() => startServer(`changelevel ${map.id}`)}>                                                                                  
                  {map.name}
                </Button>
              </Box>
            )
          })}
          {workShopMaps.map((map) => {
            return (
              <Box key={map.id} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={2}>
                <Image
                  style={{border: "3px solid white", borderRadius: "6px"}}
                  src={`/mapImages/${map.image}.png`}
                  width={matches ? 450 : 350}
                  height={matches ? 281 : 196}
                  alt={`Picture of ${map.name}`}
                />
              <Button style={{fontFamily: "'Sora Variable', sans-serif"}} key={map.id} variant="contained" onClick={() => startServer(`host_workshop_map ${map.id}`)}>                                                                             
                {map.name} (Workshop)
              </Button>
              </Box>
            )
          })}
        </Box>
    </Box>
  )
}
