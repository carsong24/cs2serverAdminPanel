'use client'

import { Flex, Grid, GridItem, Icon, SimpleGrid, Skeleton, Text, useDisclosure } from "@chakra-ui/react"
import Image from "next/image"
import { useEffect } from "react"
import useSWR, { Fetcher } from "swr"
import ServerCard from "../../components/serverCard"
import { servers } from "@prisma/client"
import { FaCopy } from "react-icons/fa"
import { AnimatePresence, motion } from "framer-motion"

export type ServerType = {
    server: servers,
    status: {
      map: string,
      serverName: string,
      vacEnabled: boolean
    }
}

export default function Home() {
  

  const fetcher: Fetcher<ServerType[], string> = (...args) => fetch(...args).then(res => res.json())
  const { data, error, isLoading } = useSWR('/api/getServers', fetcher, { refreshInterval: 5000 })
  const mainData = {data: data, loading: isLoading, err: error}

  const servers = mainData?.data?.map((server) => {
    return (
      <GridItem key={server?.server?.server_id} colSpan={1} justifyItems={"center"} alignItems={"center"}>
        <ServerCard server={server}/>
      </GridItem>
    )
  })

  const skeletonGridItem = () => {
    return (
      <GridItem minHeight={"380px"} colSpan={1} width={"100%"} height={"100%"} borderRadius={"4px"} border={"4px solid #ECDFCC"}>
          <Skeleton isLoaded={!mainData?.loading} height={"100%"} borderRadius={"4px"}>
          <Flex position={"relative"} borderRadius={"4px"} justifyContent={"center"} alignItems={"center"}>
         <Flex flexDirection={"column"} zIndex={1}>
           <Flex flexDirection={"column"} padding={5} position={"absolute"} top={1} left={1}>
             <Text fontWeight={"bold"}></Text>
             <Flex alignItems={"center"} gap={2}>
              <Text ></Text>
             </Flex>
           </Flex>
           <Flex flexDirection={"column"} padding={5} position={"absolute"} bottom={1} left={1}>
             <Text ></Text>
             <Text fontWeight={"bold"}></Text> 
           </Flex>
           <Flex padding={5} position={"absolute"} top={1} right={1} justifyContent={"center"} alignItems={"center"} gap={2}>
             <Text fontWeight={"bold"}></Text>
             <Text fontWeight={"bold"} paddingTop={1}></Text>
           </Flex>
         </Flex>
         
         <Flex opacity={.6}>
           <Image
               style={{objectFit: "cover"}}
               src={'/mapImages/unknown.png'}
               sizes="1000px"
               height={380}
               width={680}
               alt={`Picture of '/mapImages/unknown'}`}
             />
         </Flex>
       </Flex>
          </Skeleton>   
        </GridItem>
    )

  }


  return (
   <Flex padding={2} justifyContent={"space-evenly"} width={"100%"} overflowX={"hidden"}>
    {!mainData?.loading ? (
      <SimpleGrid columns={{md: 1, xl: 2, xxl: 3}} gap={4} justifyContent={"center"}>
        {servers}
        <GridItem colSpan={1} width={"100%"} height={"100%"} justifyItems={"center"} alignItems={"center"}>
              <ServerCard blank={true}/>
        </GridItem>
      </SimpleGrid>
    ) : (
      <Flex justifyContent={"center"} alignItems={"center"} flexDirection={"column"} gap={6}>
        <SimpleGrid columns={{md: 1, xl: 2, xxl: 3}} gap={1} justifyContent={"center"}>
          {skeletonGridItem()}
          {skeletonGridItem()}
          {skeletonGridItem()}
        </SimpleGrid>
      </Flex>
      
    )}
   </Flex>
  )
}
