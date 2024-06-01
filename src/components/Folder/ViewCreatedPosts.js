import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Statuses/Loading";
import NotFound from "../Statuses/NotFound";
import { getPostsByPatronId } from "../../api/PostAPI";
import SearchInput from "../Search/SearchInput";
import Authorisation from "../NavigationBar/Authorisation";
import Logo from "../ImageViews/Logo";
import PostsSection from "../Main/PostsSection";
import ImageWithCross from "./ImageWithCross";
import { getUserAccount } from "../../api/AccountAPI";

const ViewCreatedPosts = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [accountData, setAccountData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        getUserAccount()
            .then(data => {
                setAccountData(data);
            })
            .catch(() => setIsError(true));
    }, []);

    useEffect(() => {
        if (accountData && accountData.id) {
            getPostsByPatronId(accountData.id)
                .then(data => {
                    setPosts(data);
                    setIsFinished(true);
                })
                .catch(error => {
                    console.error("Error fetching all posts: ", error);
                    setIsError(true);
                    setIsFinished(true);
                });
        }
    }, [accountData]);

    if (isError) return <NotFound />;
    if (!isFinished) return <Loading />;

    return (
        <div>
            <div className="flex justify-between items-center">
                <Logo />

                <SearchInput />

                <Authorisation />
            </div>
            <div className="container text-center mx-auto mt-10" style={{ maxWidth: '30%' }}>
                <h1 style={{ fontWeight: 700, fontSize: '48px' }}>My posts</h1>
                <button className="mt-5 bg-my-purple p-3 rounded-large hover:bg-my-purple-light active:bg-my-purple-dark"
                    style={{ fontSize: '16px' }}
                    onClick={() => navigate('/post/create')}>
                    Add new post
                </button>
            </div>
            <div className="mt-14 mb-10 flex justify-center">
                <PostsSection posts={posts} />
            </div>
        </div>
    )
}

export default ViewCreatedPosts