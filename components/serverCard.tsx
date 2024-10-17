'use client'

import { Flex, Icon, Skeleton, Text, Tooltip } from "@chakra-ui/react"
import Image from "next/image"
import { useEffect } from "react"
import { FaCopy } from "react-icons/fa"
import useSWR, { Fetcher } from "swr"

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

export default function ServerCard({server}: {server: any}) {

    const getImageString = () => {
        const fetcher: Fetcher<string, string> = (...args) => fetch(...args).then(res => res.json())
        const { data, error, isLoading } = useSWR('/api/getImage', fetcher, { refreshInterval: 10000 })
        const url = data as unknown
        return {data: url, loading: isLoading, err: error}
      }

    const imageUrl = getImageString() as {data: string, loading: boolean, err: any}

    useEffect(() => {
        console.log(server)
        console.log(imageUrl?.data)
    }, [server, imageUrl?.data])

    const getImage = () => {
        if (server?.status?.map == "aim_map") {
            return imageUrl?.data
        }
        if (hasConnection && defaultMapNames.map(obj => obj.id).includes(server?.status?.map)) {
            return `/mapImages/${server?.status?.map}.png`
        } else if (hasConnection && !defaultMapNames.map(obj => obj.id).includes(server?.status?.map)) {
            return `/mapImages/workshop.png`
        } else {
            return `/mapImages/unknown.png`
        }
    }

    const hasConnection = server?.status?.map

  return (
    <Flex position={"relative"} margin={2} width={"fit-content"} height={"full"} opacity={1}>
      <Flex border={"3px solid white"} borderRadius={4}>
       <Skeleton isLoaded={hasConnection}>
           <Flex opacity={.4} height={"393px"} width={"700px"}>
                <Image
                    style={{objectFit: "cover"}}
                    src={getImage()}
                    sizes="1000px"
                    fill
                    alt={`Picture of ${getImage()}`}
                />
            </Flex> 
        </Skeleton> 
      </Flex>
        
      <Flex position={"absolute"} top={3} right={3} gap={2}>
        <Text fontSize={"2xl"} fontWeight={"bold"}>Player Count: {server?.players?.length}</Text>
      </Flex>
      <Flex direction={"column"} position={"absolute"} top={3} left={3}>
        <Text fontSize={"2xl"} fontWeight={"bold"}>Server: {hasConnection ? server?.status?.serverName : server?.server?.server_name}</Text>
            <Flex justifyContent={"center"} alignItems={"center"} gap={2}>
                <Text fontSize={"xl"} cursor={"default"}>{server?.server?.ip_address}:{server?.server?.port}</Text>
                <Icon cursor={"pointer"} as={FaCopy} boxSize={4} />
            </Flex>
        <Text fontSize={"xl"}>Status: {hasConnection ? "Online" : "Offline"}</Text>
      </Flex>
      <Flex direction={"column"} position={"absolute"} bottom={3} left={3}>
        <Text fontSize={"xl"}>{hasConnection ? server?.status?.map : ""}</Text>
        <Text fontSize={"2xl"} fontWeight={"bold"}>{hasConnection ? "Current Map" : ""}</Text>
      </Flex>
      
    </Flex>
  )
}
