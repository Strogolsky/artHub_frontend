import {useLocation, useNavigate} from "react-router-dom";
import {searchPostsByPrompt} from "../../api/SearchAPI";
import {useEffect, useState} from "react";
import NotFound from "../NotFound";
import SearchInput from "./SearchInput";
import SignUp from "../Main/SignUp";
import SignIn from "../Main/SignIn";


const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParam = new URLSearchParams(location.search).get('s');
    const [posts, setPosts] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isAuthorised, setIsAuthorised] = useState(false);

    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isSignInOpen, setIsSignInOpen] = useState(false);

    const swapOpen = () => {
        setIsSignUpOpen((curr) => !curr);
        setIsSignInOpen((curr) => !curr);
    }

    if (searchParam === '') {
        navigate('/');
    }

    useEffect(() => {
        searchPostsByPrompt(searchParam)
            .then(data => setPosts(data))
            .catch(error => {
                console.error("Error searching posts: ", error);
                setIsError(true);
            })
    }, [searchParam]);

    if (isError) return <NotFound />

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="pl-2 flex-none">
                    <img alt="ArtHub logo"/>
                </div>

                <SearchInput initSearchText={searchParam}/>

                {isAuthorised ? (
                    <div className="mr-3 relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                ) : (
                    <div className="pr-2 flex">

                        <div className="mr-5">
                            <SignUp isOpen={isSignUpOpen} setIsOpen={setIsSignUpOpen} swapOpen={swapOpen} setIsAuthorised={setIsAuthorised}/>
                        </div>

                        <SignIn isOpen={isSignInOpen} setIsOpen={setIsSignInOpen} swapOpen={swapOpen} setIsAuthorised={setIsAuthorised}/>
                    </div>
                )}
            </div>

            <div className="mt-14 mb-10 flex justify-center">
                <div className="text-center grid grid-cols-1 items-center justify-center md:grid-cols-2 lg:grid-cols-3">

                    {posts.map((post, idx) => (
                        <div key={idx} className="m-6" style={{width: '310px', height: '400px'}}>
                            <div className="rounded-large flex justify-center items-center" style={{
                                width: '300px',
                                height: '385px'
                            }}>
                                <img key={post.id} className="hover:border-my-purple hover:cursor-pointer hover:border-4 object-cover rounded-large" alt={post.title} src={`data:image;base64,${post.image.data}`} onClick={() => navigate(`/post/${post.id}`)}/>
                            </div>
                            <p className="m-1">{post.title}</p>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    )
}

export default SearchPage;