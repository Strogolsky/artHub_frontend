import { useEffect, useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UserAvatar from "./UserAvatar";
import { useNavigate } from "react-router-dom";
import SearchInput from "../Search/SearchInput";


const MainPage = ({ search, fetchFunc }) => {
    const [posts, setPosts] = useState([]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchFunc()
            .then(data => setPosts(data))
            .catch(error => {
                console.error("Error fetching posts: ", error);
                setIsError(true);
            });
    }, [search]);


    const navigate = useNavigate();
    const [isAuthorised, setIsAuthorised] = useState(false);

    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isSignInOpen, setIsSignInOpen] = useState(false);

    const swapOpen = () => {
        setIsSignUpOpen((curr) => !curr);
        setIsSignInOpen((curr) => !curr);
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="pl-2 flex-none">
                    <img alt="ArtHub logo" />
                </div>

                <SearchInput initSearchText={search} />

                {isAuthorised ? (
                    <UserAvatar />
                ) : (
                    <div className="pr-2 flex">

                        <div className="mr-5">
                            <SignUp isOpen={isSignUpOpen} setIsOpen={setIsSignUpOpen} swapOpen={swapOpen} setIsAuthorised={setIsAuthorised} />
                        </div>

                        <SignIn isOpen={isSignInOpen} setIsOpen={setIsSignInOpen} swapOpen={swapOpen} setIsAuthorised={setIsAuthorised} />
                    </div>
                )}


            </div>

            <div className="mt-14 mb-10 flex justify-center">
                <div className="text-center grid grid-cols-1 items-center justify-center md:grid-cols-2 lg:grid-cols-3">

                    {posts.map((post) => (
                        <div key={post.id} className="m-6" style={{ width: '310px', height: '400px' }}>
                            <div className="rounded-large flex justify-center items-center"
                                style={{ width: '300px', height: '385px' }}>
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
        </div>
    )
}

export default MainPage;
