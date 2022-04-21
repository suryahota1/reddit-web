import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { usePostsQuery } from "../generated/graphql";

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
    console.log("Posts data", data);
    return (
        <div>
            {!data && fetching ? <div>Loading...</div> : <div>
                <Stack spacing={8} direction='column'>
                    {!data ? (<div>Loading...</div>) : (
                        data.posts.map(( p ) => <Box key={p.id} p={5} shadow='md' borderWidth='1px'>
                        <Heading fontSize='xl'>{p.title}</Heading>
                        <Text>{p.creator.username}</Text>
                        <Text mt={4}>{p.text}</Text>
                    </Box>)
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
