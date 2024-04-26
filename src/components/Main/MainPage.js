import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";


const MainPage = () => {
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState("");
    const [isAuthorised, setIsAuthorised] = useState(false);

    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isSignInOpen, setIsSignInOpen] = useState(false);

    const swapOpen = () => {
        setIsSignUpOpen((curr) => !curr)
        setIsSignInOpen((curr) => !curr)
    }

    const [posts, setPosts] = useState([
        {
            "id": 0,
            "image": "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80",
        },
        {
            "id": 1,
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg",
        },
        {
            "id": 2,
            "image": "https://st2.depositphotos.com/2001755/5408/i/450/depositphotos_54081723-stock-photo-beautiful-nature-landscape.jpg",
        },
        {
            "id": 3,
            "image": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
        },
        {
            "id": 4,
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFBa3G11OUBYADP7ouSBgwiiRzSYorF4dfg&usqp=CAU",
        },
        {
            "id": 5,
            "image": "https://media.wired.com/photos/5fb70f2ce7b75db783b7012c/master/pass/Gear-Photos-597589287.jpg",
        }
    ])

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="pl-2 flex-none">
                    <img alt="ArtHub logo" />
                </div>

                <div className="flex-grow text-center mx-auto">
                    <input type="text"
                        className="m-2 bg-my-light-grey h-10 w-72 py-2 px-4 rounded-large focus:outline-my-purple-light text-center"
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: '700px', height: '44px' }} />
                </div>

                {isAuthorised ? (
                    <div className="mr-3 relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg className="absolute w-12 h-12 text-gray-400 -left-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                ) : (
                    <div className="pr-2 flex">

                        <div className="mr-5">
                            <SignUp isOpen={isSignUpOpen} setIsOpen={setIsSignUpOpen} swapOpen={swapOpen} />
                        </div>

                        <SignIn isOpen={isSignInOpen} setIsOpen={setIsSignInOpen} swapOpen={swapOpen} />
                    </div>
                )}


            </div>

            <div className="mt-14 mb-10 flex justify-center">
                <div className="text-center grid grid-cols-1 items-center justify-center md:grid-cols-2 lg:grid-cols-3">

                    {posts.map((post) => (
                        <div className="m-6" style={{ width: '310px', height: '400px' }}>
                            <div className="rounded-large flex justify-center items-center"
                                    style={{ width: '300px', height: '385px' }}>
                                <img key={post.id}
                                    className="hover:border-my-purple hover:cursor-pointer hover:border-4 object-cover rounded-large"
                                    alt="postName"
                                    src={post.image}
                                    onClick={() => navigate(`/post/${post.id}`)}/>
                            </div>
                            <p className="m-1">postName</p>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default MainPage;
