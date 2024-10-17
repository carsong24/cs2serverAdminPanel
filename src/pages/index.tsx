'use client'

import { Flex, Grid, GridItem, SimpleGrid, Text } from "@chakra-ui/react"
import Image from "next/image"
import { useEffect } from "react"
import useSWR, { Fetcher } from "swr"
import ServerCard from "../../components/serverCard"
import { servers } from "@prisma/client"

export type Server = {
    server: servers,
    status: {
      map: string,
      serverName: string,
      vacEnabled: boolean
    }
}

export default function Home() {

  const getServerData = () => {
    const fetcher: Fetcher<Server, string> = (...args) => fetch(...args).then(res => res.json())
    const { data, error, isLoading } = useSWR('/api/getServers', fetcher, { refreshInterval: 5000 })
    return {data: data, loading: isLoading, err: error}
  }


  const mainData = getServerData()

  useEffect(() => {
    console.log(mainData)
  }, [mainData])

  const configNames = [
    "prac",
    "comp",
    "live",
    "onevone"
  ]

  const playerTest = [
    {name: "test", time: "10:45"},
    {name: "test", time: "10:45"},
    {name: "test", time: "10:45"},
    {name: "test", time: "10:45"},
    {name: "test", time: "10:45"},
    {name: "test", time: "10:45"},
    {name: "test", time: "10:45"},
    {name: "test", time: "10:45"},
    {name: "test", time: "10:45"},
    {name: "test", time: "10:45"}
  ]

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

  //@ts-ignore
  const servers = mainData?.data?.map((server) => {
    return (
      <GridItem colSpan={1}>
        <ServerCard server={server}/>
      </GridItem>
    )
  })


  return (
   <Flex>

    <SimpleGrid columns={2}>
      {servers}
    </SimpleGrid>

   </Flex>
  )
}
