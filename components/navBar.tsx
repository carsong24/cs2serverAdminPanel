import { Button, Flex, Icon, Skeleton, Text, Tooltip, useColorMode, useMediaQuery, useToast } from "@chakra-ui/react"
import { MdLightMode } from "react-icons/md"

export default function Navbar() {

    const [isLargerThan2000] = useMediaQuery('(min-width: 2100px)')
    const toast = useToast()

  return (
    <Flex padding={2} margin={1} marginBottom={4} borderBottom={"2px solid #ECDFCC"} justifyContent={isLargerThan2000 ? "center" : "space-between"}>
      <Text fontSize={"4xl"}>Welcome, {process.env.NEXT_PUBLIC_AUTH_USER}</Text>
    </Flex>
  )
}
