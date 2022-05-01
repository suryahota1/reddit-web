import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react"
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
    console.log("router ===========", router);
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
            <Flex align="center">
                {router.pathname !== "/create-post" && <NextLink href="/create-post">
                    <Button as={Link} mr={4}>Create Post</Button>
                </NextLink>}
                <Box>Hello {data.me.username}</Box>
                <Button isLoading={logoutFetching} onClick={() => {logout().then(() => {
                    router.push("/login");
                })}} variant="link" ml={4}>Logout</Button>
            </Flex>
        )
    }
    return (
        <Flex bg="tan" p={4} position="sticky" zIndex={1} top={0}>
            <Flex flex={1} m="auto" align="center" maxWidth={800}>
                <NextLink href="/">
					<Link>
                        <Heading>
                            Reddit
                        </Heading>
                    </Link>
                </NextLink>
                <Box ml={"auto"}>
                    {body}
                </Box>
            </Flex>
        </Flex>
    );
};

export default NavBar;
