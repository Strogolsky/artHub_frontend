import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../Statuses/Loading";
import { getRecommendedPosts } from "../../api/RecommendationAPI"
import NotFound from "../Statuses/NotFound";
import PostsSection from "./PostsSection";


const InfiniteFeed = ({ isGuest }) => {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const size = 10;

    // that shit is for "not fetching data twice"
    const isFetchingRef = useRef(false);

    const [isError, setIsError] = useState(false);

    const fetchPosts = async (pageToFetch) => {
        try {
            const data = await getRecommendedPosts(pageToFetch, size, isGuest);

            setPosts(prevPosts => [...prevPosts, ...data.content]);

            if (data.last)
                setHasMore(false);
        } catch (error) {
            setHasMore(false);
            setIsError(true);
        } finally {
            isFetchingRef.current = false;
        }
    }

    useEffect(() => {
        if (!isFetchingRef.current) {
            isFetchingRef.current = true;
            fetchPosts(0);
        }
    });

    const fetchMoreData = () => {
        if (hasMore && !isFetchingRef.current) {
            isFetchingRef.current = true;
            const nextPage = page + 1;
            setPage(nextPage);
            fetchPosts(nextPage);
        }
    }

    if (isError) return <NotFound />

    return (
        <InfiniteScroll
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Loading />}
            dataLength={posts.length}>

            <PostsSection posts={posts} />

        </InfiniteScroll>
    )
}

export default InfiniteFeed;