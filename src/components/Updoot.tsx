import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootProps {
    post: PostSnippetFragment
}

const Updoot: React.FC<UpdootProps> = ({ post }) => {

    const [ loading, setLoading] = useState<"upvote-loading" | "downvote-loading" | "not-loading">();
    const [, vote] = useVoteMutation();

    async function upVote () {
        console.log("up vote");
        setLoading("upvote-loading");
        await vote({
            postId: post.id,
            value: 1
        });
        setLoading("not-loading");
    }

    async function downVote () {
        console.log("down vote");
        setLoading("downvote-loading");
        vote({
            postId: post.id,
            value: -1
        });
        setLoading("not-loading");
    }

    return (
        <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
            <IconButton
                colorScheme='gray'
                aria-label='Call Segun'
                bgColor={post.voteStatus === 1 ? "green" : undefined}
                size='sm'
                icon={<ChevronUpIcon onClick={upVote} aria-label="Up Vote" />}
                isLoading={loading === "upvote-loading"}
                color="white"
            />
            {post.points}
            <IconButton
                colorScheme='gray'
                aria-label='Call Segun'
                bgColor={post.voteStatus === -1 ? "red" : undefined}
                size='sm'
                icon={<ChevronDownIcon onClick={downVote} aria-label="Down Vote" />}
                isLoading={loading === "downvote-loading"}
                color="white"
            />
        </Flex>
    );
};

export default Updoot;
