import { Box, Button, Flex, Link } from "@chakra-ui/react"
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { isServer } from "../utils/isServer";

interface navBarProps {

}

const NavBar: React.FC<navBarProps> = () => {
    const [{data, fetching}] = useMeQuery({
        pause: isServer()
    });
    const [{fetching: logoutFetching}, logout] = useLogoutMutation();
    const router = useRouter();
    let body = null;
    console.log("data ===========", data);
    if ( fetching ) {

    } else if ( !data?.me ) {
        body = (
            <>
                <NextLink href={"/login"}>
                    <Link color={"white"} mr={4}>Login</Link>
                </NextLink>
                <NextLink href={"/register"}>
                    <Link color={"white"}>Register</Link>
                </NextLink>
            </>
        )
    } else {
        body = (
            <Flex>
                <Box>Hello {data.me.username}</Box>
                <Button isLoading={logoutFetching} onClick={() => {logout().then(() => {
                    router.push("/login");
                })}} variant="link" ml={4}>Logout</Button>
            </Flex>
        )
    }
    return (
        <Flex bg="tomato" p={4}>
            <Box ml={"auto"}>
                {body}
            </Box>
        </Flex>
    );
};

export default NavBar;
