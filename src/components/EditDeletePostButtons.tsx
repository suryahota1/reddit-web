import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { PostSnippetFragment, useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
    id: number,
    creatorId: number
};

const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({ id, creatorId }) => {

    const [ , deletePost ] = useDeletePostMutation();
    const router = useRouter();
    const [{data: meData}] = useMeQuery();

    function delete1 ( id: number ) {
        deletePost({
            deletePostId: id
        });
    }

    function edit ( id: number ) {
        console.log("if");
        router.push(`/post/edit/${id}`);
    }

    if ( meData?.me?.id !== creatorId ) {
        return null;
    }

    return (
        <Box>
            <IconButton
                ml="auto"
                colorScheme='gray'
                aria-label='Delete post'
                // bgColor="red"
                size='sm'
                // color="white"
                icon={<DeleteIcon onClick={() => {
                    delete1(id);
                }} aria-label="Delete Post" />}
                mr={4}
                // isLoading={loading === "downvote-loading"}
            />
            <IconButton
                ml="auto"
                colorScheme='gray'
                aria-label='Edit post'
                // bgColor="green"
                size='sm'
                // color="white"
                icon={<EditIcon onClick={() => {
                    edit(id);
                }} aria-label="Edit Post" />}
                // isLoading={loading === "downvote-loading"}
            />
        </Box>
    );
};

export default EditDeletePostButtons;
