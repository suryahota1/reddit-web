import React from "react";
import { usePostsQuery } from "../generated/graphql";

interface PostsProps {

}

const Posts: React.FC<PostsProps> = () => {

    const [{ data }] = usePostsQuery();

    return (
        <div>
            {!data ? (<div>Loading...</div>) : (
                data.posts.map(( p ) => <div key={p.id}>{p.title}{p.text}</div>)
            )}
        </div>
    );
}

export default Posts;
