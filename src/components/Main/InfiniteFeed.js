import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import { getRecommendedPosts } from "../../api/RecommendationAPI"
import NotFound from "../NotFound";


const InfiniteFeed = () => {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const size = 10;
    const navigate = useNavigate();

    // that shit is for "not fetching data twice"
    const isFetchingRef = useRef(false);

    const [isError, setIsError] = useState(false);

    const fetchPosts = async (pageToFetch) => {
        try {
            const data = await getRecommendedPosts(pageToFetch, size);

            setPosts(prevPosts => [...prevPosts, ...data.content]);

            if (data.last)
                setHasMore(false);
        } catch (error) {
            console.error("Error fetching posts: ", error);
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
    }, []);

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

            <div className="mt-14 mb-10 flex justify-center">
                <div className="text-center grid grid-cols-1 items-center justify-center md:grid-cols-2 lg:grid-cols-3">

                    {posts.map((post, idx) => (
                        <div key={idx} className="m-6" style={{ width: '310px', height: '400px' }}>
                            <div className="rounded-large flex justify-center items-center" style={{
                                width: '300px',
                                height: '385px'
                            }}>
                                <img key={post.id}
                                    className="hover:border-my-purple hover:cursor-pointer hover:border-4 object-cover rounded-large"
                                    alt={post.title}
                                    src={`data:image;base64,${post.image.data}`}
                                    onClick={() => navigate(`/post/${post.id}`)} />
                            </div>
                            <p className="m-1">{post.title}</p>
                        </div>
                    ))}

                </div>
            </div>
        </InfiniteScroll>
    )
}

export default InfiniteFeed;