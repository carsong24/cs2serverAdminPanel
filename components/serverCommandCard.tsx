'use client'

import { Button, Flex, Icon, Input, Skeleton, Text, Textarea, Tooltip, useColorMode, useMediaQuery, useToast } from "@chakra-ui/react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FaCopy, FaPlus } from "react-icons/fa"
import useSWR, { Fetcher } from "swr"
import { IoIosSettings } from "react-icons/io"
import { useRouter } from "next/router"
import { ServerType } from "@/pages"
import { servers } from "@prisma/client"
import { sendCommand } from "../utils/utils"

export type Player = {
    adr: string,
    id: string,
    loss: string,
    name: string,
    ping: string,
    rate: string,
    state: string,
    time: string
}

export type Server = {
    map: string,
    serverName: string,
    vacEnabled: boolean
}

export type ServerTypeSingle = {
    server: servers,
    status: {
      map: string,
      serverName: string,
      vacEnabled: boolean
    }
    currentGame: {
      mode: string, 
      type: string
    }
}

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

  const workShopMaps = [
    {id: "3084291314", name: "Aim Map", image: "de_aimmap"},
    {id: "3073892687", name: "Season", image: "de_season"},
    {id: "3070284539", name: "Train", image: "de_train"},
  ]

  const gameModeMap = (id: {mode: any, type: any}) => {

    const mode = +id.mode?.replace("/n", "")
    const type = +id.type?.replace("/n", "")

    console.log(+mode, +type)

    if (type === 0 && mode === 0) return "Casual"
    if (type === 0 && mode === 1) return "Competitive"
    if (type === 0 && mode === 2) return "Scrim Competitive"
    if (type === 0 && mode === 2) return "Scrim Competitive"
  
    if (type === 1 && mode === 0) return "Arms Race"
    if (type === 1 && mode === 1) return "Demolition"
    if (type === 1 && mode === 2) return "Deathmatch"
  
    if (type === 2 && mode === 0) return "Training"
    if (type === 3 && mode === 0) return "Custom"
    if (type === 4 && mode === 0) return "Coop"
    if (type === 5 && mode === 0) return "Skirmish"
    else return "Unknown"
  
  }

export default function ServerCommandCard({server}: {server?: ServerTypeSingle}) {

    const router = useRouter()
    const toast = useToast()
    const [isMobile] = useMediaQuery('(max-width: 680px)')
    const [map, setMap] = useState('')
    const [cmd, setCmd] = useState('')

    const fontSize2 = isMobile ? "lg" : "xl"
    const fontSize3 = isMobile ? "xl" : "2xl"
    const fontSize4 = isMobile ? "2xl" : "3xl"

    const getImage = () => {
        if (hasConnection && defaultMapNames.map(obj => obj.id).includes(server?.status?.map)) {
            return `/mapImages/${server?.status?.map}.png`
        } else if (hasConnection && !defaultMapNames.map(obj => obj.id).includes(server?.status?.map)) {
            return `/mapImages/workshop.png`
        } else {
            return `/mapImages/unknown.png`
        }
    }

    const hasConnection = server?.status?.map
    const name = server?.status?.serverName

  return (
    <>
        <Flex flexDirection={"column"} width={"100%"} height={"100%"}>
            <Skeleton isLoaded={hasConnection ? true : false}>
                <Flex background={"#697565"} borderRadius={4} padding={2} gap={2} flexDirection={"column"} width={"100%"} minHeight={"350px"} height={"100%"} border={"4px solid #ECDFCC"} fontSize={fontSize4}>
                    <Flex direction={"column"} gap={2}>
                        <Text fontSize={fontSize2} fontWeight={"bold"}>Send Command</Text>
                        <Input type="text" placeholder="any cs2 command" onChange={(e) => setCmd(e.target.value)}></Input>
                        <Button width={"20%"} onClick={() => sendCommand(cmd, server)}>Send Command</Button>
                    </Flex>
                    <Flex direction={"column"} gap={2}>
                        <Text fontSize={fontSize2} fontWeight={"bold"}>Host Custom Map</Text>
                        <Input type="text" placeholder="workshop map id" onChange={(e) => setMap(e.target.value)}></Input>
                        <Button width={"20%"} onClick={() => sendCommand(`host_workshop_map ${map}`, server)}>Change Map</Button>
                    </Flex>
                </Flex>
            </Skeleton>
        </Flex>
    </>
  )
}
