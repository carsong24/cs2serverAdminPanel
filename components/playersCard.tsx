'use client'

import { Button, Flex, GridItem, Icon, Input, SimpleGrid, Skeleton, Text, Textarea, Tooltip, useColorMode, useMediaQuery, useToast } from "@chakra-ui/react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect } from "react"
import { FaCopy, FaPlus } from "react-icons/fa"
import useSWR, { Fetcher } from "swr"
import { IoIosSettings } from "react-icons/io"
import { useRouter } from "next/router"
import { ServerType } from "@/pages"
import { servers } from "@prisma/client"
import { FaBan } from "react-icons/fa"
import { GiWalkingBoot } from "react-icons/gi"
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
    players: Player[]
    server: servers
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

export default function PlayersCard({server}: {server?: ServerTypeSingle}) {

    const router = useRouter()
    const toast = useToast()
    const [isMobile] = useMediaQuery('(max-width: 680px)')

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
    console.log(server?.players)
    const players = server?.players

    const playerGrid = players?.map((item) => {

        return (
            <GridItem colSpan={1} key={item.id} border={"2px solid white"} width={"fit-content"} padding={2} borderRadius={2}>
                <Flex gap={2} direction={"column"}>
                    <Flex alignItems={"center"} gap={2}>
                        <Text fontWeight={"bold"} fontSize={fontSize3}>Name: </Text>
                        <Text fontSize={fontSize2}>{item.name}</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={2}>
                        <Text fontWeight={"bold"} fontSize={fontSize3}>Online Time: </Text>
                        <Text fontSize={fontSize2}>{item.time}</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={2}>
                        <Text fontWeight={"bold"} fontSize={fontSize3}>Address: </Text>
                        <Text fontSize={fontSize2}>{item.adr?.split(':')[0]}</Text>
                    </Flex>
                    <Flex alignItems={"center"} gap={4} width={"100%"} justifyContent={"center"}>
                        <Tooltip label={`Ban ${item.name}`} placement="top">
                            <Button>
                                <Icon as={FaBan}/>
                            </Button>   
                        </Tooltip>
                        
                        <Tooltip label={`Kick ${item.name}`} placement="top">
                            <Button onClick={() => sendCommand(`kick ${item.name}`, server)}>
                                <Icon as={GiWalkingBoot}/>
                            </Button>   
                        </Tooltip>
                    </Flex>
                </Flex>
            </GridItem>
        )

    })

  return (
    <>
        <Flex flexDirection={"column"} width={"100%"} height={"100%"}>
            <Skeleton isLoaded={hasConnection ? true : false} height={"100%"}>
                <Flex background={"#697565"} borderRadius={4} padding={2} flexDirection={"column"} width={"100%"} height={"100%"} border={"4px solid #ECDFCC"} fontSize={fontSize4}>
                    {players?.length ? (
                        <SimpleGrid columns={5}>
                            {playerGrid}
                        </SimpleGrid>
                    ) : (
                    <Flex width={"100%"} height={"100%"} justifyContent={"center"} alignItems={"center"}>
                        <Text> Currently no players online</Text>
                    </Flex>
                    )}
                    
                </Flex>
            </Skeleton>
        </Flex>
    </>
  )
}
