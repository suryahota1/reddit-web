import { Box, Button, Flex, Heading, Stack, Text, Link } from "@chakra-ui/react";
import React, { useState } from "react";
import { usePostsQuery } from "../generated/graphql";
import Updoot from "./Updoot";
import NextLink from "next/link";
import EditDeletePostButtons from "./EditDeletePostButtons";

interface PostsProps {

}

const Posts: React.FC<PostsProps> = () => {
    const [ variables, setVariables ] = useState({
        limit: 2,
        cursor: null as null | string
    })
    const [{ data, fetching }] = usePostsQuery({
        variables: variables
    });

    return (
        <div>
            {!data && fetching ? <div>Loading...</div> : <div>
                <Stack spacing={8} direction='column'>
                    {!data ? (<div>Loading...</div>) : (
                        data.posts.map(( p ) => <Flex key={p.id} p={5} shadow='md' borderWidth='1px'>
                        <Updoot post={p} />
                        <Box flex={1}>
                            <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                                <Link>
                                    <Heading fontSize='xl'>{p.title}</Heading>
                                </Link>
                            </NextLink>
                            <Text>Posted by {p.creator.username}</Text>
                            <Flex align="center">
                                <Text flex={1} mt={4}>{p.text}</Text>
                                <Box ml="auto">
                                    <EditDeletePostButtons id={p.id} creatorId={p.creator.id} />
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>)
                    )}
                </Stack>
            </div>}
            {data && data.posts && data.posts.length > 0 && <Flex>
                <Button onClick={() => {
                    setVariables({
                        limit: variables.limit,
                        cursor: data.posts[data.posts.length - 1].createdAt
                    })
                }} isLoading={fetching} m="auto" my={8}>
                    Load more
                </Button>
            </Flex>}
        </div>
    );
}

export default Posts;
