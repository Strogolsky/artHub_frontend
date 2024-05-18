import { useLocation, useNavigate } from "react-router-dom";
import { searchPostsByPrompt } from "../../api/SearchAPI";
import { useEffect, useState } from "react";
import NotFound from "../NotFound";
import SearchInput from "./SearchInput";
import Authorisation from "../Authorisation"
import Logo from "../ImageViews/Logo";
import Loading from "../Loading";


const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParam = new URLSearchParams(location.search).get('s');
    const [posts, setPosts] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    if (searchParam === '') {
        navigate('/');
    }

    useEffect(() => {
        searchPostsByPrompt(searchParam)
            .then(data => {
                setPosts(data);
                setIsFinished(true);
            })
            .catch(error => {
                console.error("Error searching posts: ", error);
                setIsError(true);
            })
    }, [searchParam]);

    if (isError) return <NotFound />
    if (!isFinished) return <Loading />

    return (
        <div>
            <div className="flex justify-between items-center">
                <Logo />

                <SearchInput initSearchText={searchParam} />

                <Authorisation />
            </div>

            {posts.length === 0 ? (
                <div className="mt-14 mb-10 flex justify-center">
                    <p style={{ fontWeight: 700, fontSize: '32px' }}>We didn't find anything on this query :(</p>
                </div>
            ) : (
                <div className="mt-14 mb-10 flex justify-center">
                    <div className="text-center grid grid-cols-1 items-center justify-center md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post, idx) => (
                            <div key={idx} className="m-6" style={{ width: '310px', height: '400px' }}>
                                <div className="rounded-large flex justify-center items-center" style={{
                                    width: '300px',
                                    height: '385px'
                                }}>
                                    <img key={post.id} className="hover:border-my-purple hover:cursor-pointer hover:border-4 object-cover rounded-large" alt={post.title} src={`data:image;base64,${post.image.data}`} onClick={() => navigate(`/post/${post.id}`)} />
                                </div>
                                <p className="m-1">{post.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}

export default SearchPage;