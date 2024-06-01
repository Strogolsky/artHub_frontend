import { useEffect, useState } from "react";
import { getAllPosts } from "../../api/PostAPI";
import NotFound from "../Statuses/NotFound";
import Loading from "../Statuses/Loading";
import PostsSection from "./PostsSection";

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        getAllPosts()
            .then(data => {
                setPosts(data);
                setIsFinished(true);
            })
            .catch(() => {
                setIsError(true);
                setIsFinished(true);
            })
    }, []);

    if (!isFinished) return <Loading />
    if (isError) return <NotFound />

    return (
        <PostsSection posts={posts} />
    )
}

export default AllPosts;