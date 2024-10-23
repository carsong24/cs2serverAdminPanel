'use client'

import { Button, Flex, Grid, GridItem, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Skeleton, Text, Tooltip, useDisclosure, useToast } from "@chakra-ui/react"
import Image from "next/image"
import { useEffect } from "react"
import useSWR, { Fetcher } from "swr"
import { servers } from "@prisma/client"
import { useRouter } from "next/router"
import { TiArrowBack } from "react-icons/ti"
import { TiDelete } from "react-icons/ti"
import ServerInfoCard, { ServerTypeSingle } from "../../../components/serverInfoCard"
import ServerCommandCard from "../../../components/serverCommandCard"
import PlayersCard from "../../../components/playersCard"
import { FaQuestionCircle } from "react-icons/fa"

export default function ServerPage() {

  const deleteModal = useDisclosure()

  const toast = useToast()
  const router = useRouter()
  const {serverid} = router?.query
    
  const fetcher: Fetcher<ServerTypeSingle, string> = (...args) => fetch(...args).then(res => res.json())
  const { data, error, isLoading } = useSWR(`/api/getSingleServer?id=${serverid}`, fetcher, { refreshInterval: 5000 })
  const mainData = {data: data, loading: isLoading, err: error}

  const onDelete = async () => {
    await fetch("/api/deleteServer", {
      method: "POST",
      body: JSON.stringify({ id: mainData?.data?.server?.server_id }),
  }).then(async (res)=> {
      const data = await res.json()

      if (data?.success) {
          toast({
              title: 'Delete Server.',
              description: "Server Deleted Successfully.",
              status: 'success',
              duration: 3000,
              isClosable: true,
              variant: 'left-accent'
            })
            deleteModal.onClose()
            router.push({
              pathname: `/`
            })
      } else {
          toast({
              title: 'Delete Server.',
              description: "Error Deleting Server.",
              status: 'error',
              duration: 3000,
              isClosable: true,
              variant: 'left-accent'
            }) 
      }
  })
  }

  return (
    <Flex>
      <Flex position={"fixed"} bottom={2} right={2}>
      <Tooltip label="Delete Server" placement="left">
        <Button variant={"plain"} onClick={deleteModal.onOpen}>
            <Icon as={TiDelete} boxSize={8}/>
        </Button>
        </Tooltip> 
        <Tooltip label="Return to Servers" placement="left">
        <Button variant={"plain"} onClick={() => {
                router.push({
                  pathname: `/`
                })
              }}>
            <Icon as={TiArrowBack} boxSize={8}/>
        </Button>
        </Tooltip>
      </Flex>
      
      <Flex padding={2} height={"fit-content"} width={"100%"} overflowX={"hidden"} gap={2}>
          <ServerInfoCard server={mainData?.data} />
          <Flex direction={"column"} width={"100%"}>
              <ServerCommandCard server={mainData?.data}/>
              <PlayersCard server={mainData?.data}/>
          </Flex>
      </Flex>
      <Modal isOpen={deleteModal.isOpen} onClose={deleteModal.onClose}>
          <ModalOverlay />
          <ModalContent background={"#697565"}>
            <ModalHeader>Delete Server</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Flex direction={"column"} gap={2}>
                    <Text>Are you sure?</Text>
                    <Text>This action can not be reverted.</Text>
                </Flex>
              
            </ModalBody>
  
            <ModalFooter>
              <Button mr={3} onClick={onDelete}>
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </Flex>
   
  )
}
