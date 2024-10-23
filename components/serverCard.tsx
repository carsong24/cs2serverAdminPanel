'use client'

import { Button, Flex, Icon, Skeleton, Text, Tooltip, useColorMode, useDisclosure, useMediaQuery, useToast } from "@chakra-ui/react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect } from "react"
import { FaCopy, FaPlus } from "react-icons/fa"
import useSWR, { Fetcher } from "swr"
import { IoIosSettings } from "react-icons/io"
import { useRouter } from "next/router"
import ServerModal from "./modals/addServerModal"

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

export default function ServerCard({server, blank}: {server?: any, blank?: boolean}) {

    const serverDisclosure = useDisclosure()
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
    <>
    {!blank ? (
        <Flex cursor={"pointer"} as={motion.div} whileHover={{scale: 1.02}} transition='0.1s linear' minHeight={"380px"} position={"relative"} borderRadius={"25px"} border={`4px solid #ECDFCC`} justifyContent={"center"} alignItems={"center"}>
         <Flex flexDirection={"column"} zIndex={1}>
           <Flex flexDirection={"column"} padding={5} position={"absolute"} top={1} left={1}>
             <Text textShadow={"2px 1px 1px black"} fontSize={fontSize4} fontWeight={"bold"}>{hasConnection ? name : ""}</Text>
             <Flex alignItems={"center"} justifyContent={"center"}>
              <Text textShadow={"2px 1px 1px black"} fontSize={fontSize2}>{hasConnection ? `${server?.server?.ip_address}:${server?.server?.port}` : ""}</Text>
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
                  <Icon style={{cursor: "pointer"}} as={FaCopy}/> 
                </Button>
              )}
             </Flex>
           </Flex>
           <Flex flexDirection={"column"} padding={5} position={"absolute"} bottom={1} left={1}>
             <Text textShadow={"2px 1px 1px black"} fontSize={fontSize2}>{hasConnection ? server?.status?.map : ""}</Text>
             <Text textShadow={"2px 1px 1px black"} fontSize={fontSize4} fontWeight={"bold"}>{hasConnection ? "Current Map" : ""}</Text> 
           </Flex>
           <Flex padding={5} position={"absolute"} top={1} right={1} justifyContent={"center"} alignItems={"center"} gap={2}>
             <Text textShadow={"2px 1px 1px black"} fontSize={fontSize3} fontWeight={"bold"}>{hasConnection ? "Players Online: " : ""}</Text>
             <Text textShadow={"2px 1px 1px black"} fontSize={fontSize3} fontWeight={"bold"} paddingTop={1}>{server?.players?.length}</Text>
           </Flex>
           <Flex padding={5} position={"absolute"} bottom={1} right={1} justifyContent={"center"} alignItems={"center"} gap={2}>
            <Button variant={"plain"} onClick={() => {
              router.push({
                pathname: `/server/[serverid]`,
                query: {serverid: server?.server?.server_id}
              })
            }}>
              <Icon cursor={"pointer"} as={IoIosSettings}  boxSize={8}/>
            </Button>
           </Flex>
         </Flex>
         
         <Flex opacity={.6} borderRadius={"4px"}>
           <Image
               style={{objectFit: "cover", minHeight: "380px", borderRadius: "20px"}}
               src={getImage()}
               sizes="1000px"
               height={380}
               width={680}
               alt={`Picture of ${getImage()}`}
             />
         </Flex>
       </Flex>
    ) : (
        <Flex as={motion.div} whileHover={{scale: 1.02}} transition='0.1s linear' cursor={"pointer"} minHeight={"380px"} position={"relative"} width={"100%"} height={"100%"} borderRadius={"25px"} border={`4px solid #ECDFCC`} justifyContent={"center"}>
          <Button variant={"solid"} justifyContent={"center"} alignItems={"center"} display={"flex"} width={"100%"} height={"100%"} borderRadius={"20px"} gap={4} onClick={serverDisclosure.onOpen}> 
              <Text fontSize={"4xl"} fontWeight={"bold"} color={"#ECDFCC"}>Add Server</Text>
              <Icon as={FaPlus} boxSize={7} fill={"#ECDFCC"}/>
          </Button>
        </Flex>
    )}
    <ServerModal isOpen={serverDisclosure.isOpen} onOpen={serverDisclosure.onOpen} onClose={serverDisclosure.onClose}/>
    </>
    
  )

}
