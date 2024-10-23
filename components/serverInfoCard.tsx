'use client'

import { Button, Flex, Icon, Select, Skeleton, Text, Tooltip, useColorMode, useMediaQuery, useToast } from "@chakra-ui/react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect } from "react"
import { FaCopy, FaPlus } from "react-icons/fa"
import useSWR, { Fetcher } from "swr"
import { IoIosSettings } from "react-icons/io"
import { useRouter } from "next/router"
import { ServerType } from "@/pages"
import { servers } from "@prisma/client"
import { sendCommand } from "../utils/utils"
import { HiOutlineSelector } from "react-icons/hi"
import { GoSingleSelect } from "react-icons/go"

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

export default function ServerInfoCard({server}: {server?: ServerTypeSingle}) {

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
    const name = server?.status?.serverName

  return (
        <Flex flexDirection={"column"}>
            <Skeleton isLoaded={hasConnection ? true : false}>
            <Flex background={"#697565"} borderRadius={4} padding={2} justifyContent={"space-evenly"} flexDirection={"column"} width={"fit-content"} minHeight={"400px"} border={"4px solid #ECDFCC"} fontSize={fontSize4} gap={6}>
                <Flex gap={2} alignItems={"center"}>
                    <Text fontSize={fontSize3} fontWeight={"bold"} whiteSpace={"nowrap"}>Server Name:</Text>
                    <Text fontSize={fontSize2} color={"white"}>{name}</Text>
                </Flex>

                <Flex gap={2} alignItems={"center"}>
                    <Text fontSize={fontSize3} fontWeight={"bold"} whiteSpace={"nowrap"}>Server Address: </Text>
                    <Flex justifyContent={"center"} alignItems={"center"}>
                    <Text fontSize={fontSize2} color={"white"}>{`${server?.server?.ip_address}:${server?.server?.port}`}</Text>
                        {hasConnection && (
                            <Button variant={"plain"} onClick={() => {
                                try {
                                    navigator.clipboard.writeText(`connect ${server?.server?.ip_address}:${server?.server?.port}`)
                                    toast({
                                    title: 'Ip Copy.',
                                    description: "Ip successfully copied to clipboard.",
                                    status: 'success',
                                    duration: 3000,
                                    isClosable: true,
                                    variant: 'left-accent'
                                    })
                                } catch {
                                    toast({
                                    title: 'Ip Copy.',
                                    description: "Error copying Ip to clipboard.",
                                    status: 'error',
                                    duration: 3000,
                                    isClosable: true,
                                    variant: 'left-accent'
                                    })
                                }
                                }}>
                                <Icon style={{cursor: "pointer"}} as={FaCopy} boxSize={4} fill={"white"}/> 
                            </Button>
                        )}
                    </Flex>
                </Flex>

                <Flex gap={2} alignItems={"center"}>
                    <Text fontSize={fontSize3} fontWeight={"bold"} whiteSpace={"nowrap"}>Gamemode: </Text>
                    <Text fontSize={fontSize2} color={"white"}>{gameModeMap({mode: server?.currentGame?.mode, type: server?.currentGame?.type})}</Text>
                </Flex>
                <Flex justifyContent={"center"} alignItems={"center"} gap={4}>
                    <Text fontSize={fontSize3} fontWeight={"bold"} whiteSpace={"nowrap"}>Change Map:</Text>
                    <Select focusBorderColor="#ECDFCC" icon={<GoSingleSelect />} color={"white"} value={defaultMapNames.some(map => map.id === server?.status?.map) ? server?.status?.map : "Workshop"} onChange={(e) => sendCommand(`changelevel ${e.target.value}`, server)}>
                        {defaultMapNames?.map((item) => {
                            return (
                                <option style={{background: "#181C14"}} value={item.id}>{item.name}</option>
                            )
                        })}
                    </Select>
                </Flex>
                <Flex justifyContent={"center"} alignItems={"center"} gap={4}>
                    <Text fontSize={fontSize3} fontWeight={"bold"} whiteSpace={"nowrap"}>Change Config:</Text>
                    <Select focusBorderColor="#ECDFCC" icon={<GoSingleSelect />} color={"white"} onChange={(e) => sendCommand(`exec ${e.target.value}`, server)}>
                        {['prac', 'comp', 'onevone', 'live']?.map((item) => {
                            return (
                                <option style={{background: "#181C14"}} value={item}>{item}</option>
                            )
                        })}
                    </Select>
                </Flex>
                <Flex>
                    <Flex pos={"relative"} opacity={1} borderRadius={"4px"} border={"2px solid white"} alignSelf={"center"}>
                        <Image
                            style={{objectFit: "cover", minHeight: "380px", opacity: .7}}
                            src={getImage()}
                            sizes="1000px"
                            height={380}
                            width={680}
                            alt={`Picture of ${getImage()}`}
                        />
                        <Flex direction={"column"} position={"absolute"} bottom={2} left={2}>
                            <Text fontSize={fontSize2}>
                                {server?.status?.map}
                            </Text>
                            <Text fontWeight={"bold"} fontSize={fontSize3}>
                                Current Map
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            </Skeleton>
        </Flex>
  )
}
