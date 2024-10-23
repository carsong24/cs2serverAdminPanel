import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, Flex, Text, Icon, Tooltip, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { FaQuestionCircle } from "react-icons/fa"

export default function ServerModal({isOpen, onOpen, onClose}: {isOpen: boolean, onOpen: () => void, onClose: () => void}) {
    
    const toast = useToast()

    const [name, setName] = useState("")
    const [ip, setIp] = useState("")
    const [port, setPort] = useState("")
    const [pass, setPass] = useState("")

    const onSubmit = async () => {
        
        const server = {
            name: name,
            ip: ip,
            port: port,
            pass: pass
        }

        await fetch("/api/addServer", {
            method: "POST",
            body: JSON.stringify({ server: server }),
        }).then(async (res)=> {
            const data = await res.json()

            if (data?.success) {
                toast({
                    title: 'Add Server.',
                    description: "Server Added Successfully.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    variant: 'left-accent'
                  })
                onClose()
            } else {
                toast({
                    title: 'Add Server.',
                    description: "Error Adding Server.",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    variant: 'left-accent'
                  }) 
            }
        })
         
    }



    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
          <ModalOverlay />
          <ModalContent background={"#697565"}>
            <ModalHeader>Add New Server</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Flex direction={"column"} gap={2}>
                    <Flex direction={"column"}>
                        <Text>Server Name</Text>
                        <Input placeholder="My Server Name" onChange={(e) => setName(e.target.value)}></Input>
                    </Flex>
                    <Flex direction={"column"}>
                        <Text>Server Ip</Text>
                        <Input placeholder="1.1.1.1" onChange={(e) => setIp(e.target.value)}></Input>
                    </Flex> 
                    <Flex direction={"column"}>
                        <Text>Server Port</Text>
                        <Input placeholder="27015" onChange={(e) => setPort(e.target.value)}></Input>
                    </Flex> 
                    <Flex direction={"column"}>
                        <Tooltip label="Note: this is required in order to make a connection to the server. This value is set in the server config by you.">
                            <Flex alignItems={"center"} gap={2} width={"fit-content"}>
                                <Text>Server Rcon Password</Text>
                                <Icon as={FaQuestionCircle}/>
                            </Flex>
                        </Tooltip>
                        <Input type="password" placeholder="mysecretpassword" onChange={(e) => setPass(e.target.value)}></Input>
                    </Flex>  
                </Flex>
              
            </ModalBody>
  
            <ModalFooter>
              <Button mr={3} onClick={onSubmit}>
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    )
  }