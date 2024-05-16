import { useState, useEffect } from 'react';
import SignIn from "../Main/SignIn";
import SignUp from "../Main/SignUp";
import AddToFolder from "../Folder/AddToFolder";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../../api/PostAPI";
import NotFound from '../NotFound';
import Loading from '../Loading';
import SearchInput from "../Search/SearchInput";
import Authorisation from "../Authorisation";
import Logo from "../Logo";

const ViewPost = () => {
    const navigate = useNavigate();

    const { postId } = useParams();
    const [searchText, setSearchText] = useState("");
    const [isAuthorised, setIsAuthorised] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isAddToFolderOpen, setAddToFolderOpen] = useState(false);
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    const toggleAddToFolder = () => setAddToFolderOpen(!isAddToFolderOpen);

    const swapOpen = () => {
        setIsSignUpOpen((curr) => !curr);
        setIsSignInOpen((curr) => !curr);
    }

    useEffect(() => {
        getPostById(postId)
            .then(data => {
                setPost(data);
            })
            .catch(error => {
                console.error('Failed to load post:', error.message);
                setError(error.message);
            });
    }, [postId]);

    if (error === '404 Not Found') return <NotFound />;
    if (!post) return <Loading />;

    const userId = post.patron.id;

    const imageAuthor = "https://images.unsplash.com/photo-1576174464184-fb78fe882bfd?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const postTitle = post.title || 'No title available';
    const postAuthor = post.patron ? post.patron.username : 'Unknown Author';
    const description = post.description || 'No description available';
    const postTags = post.tags ? post.tags.map(tag => tag.name) : [];
    const imageData = post.image.data;

    return (
        <div>
            <div className="flex justify-between items-center">
                <Logo />

                <SearchInput />

                <Authorisation />
            </div>

            <div className="flex justify-center items-center h-screen">
                <div className="w-1/2 flex justify-end">
                    <img src={`data:image;base64,${imageData}`}
                         className="object-cover rounded-large"
                         alt="Selected Post"
                         style={{ maxWidth: '90%', maxHeight: '85vh' }} />
                </div>
                <div className="w-1/2 flex justify-start flex-col items-left">
                    <div className="mx-12">
                        <div className="flex items-center space-x-4">
                            <AddToFolder isOpen={isAddToFolderOpen} onClose={toggleAddToFolder} />
                            <button
                                className="bg-my-purple hover:bg-my-purple-light font-regular py-3 px-5 rounded-large text-base active:bg-my-purple-dark"
                                style={{ fontSize: '16px' }}
                                onClick={() => navigate('edit')}
                            >
                                Edit
                            </button>
                        </div>
                        <p className="my-5 text-xl text-left font-bold" style={{ fontSize: '36px' }}>{postTitle}</p>
                        <div className="flex items-center">
                            <button className="px-2 bg-my-light-grey hover:bg-my-purple-light active:bg-my-purple-dark rounded-large flex items-center"
                                style={{ width: '320px', height: '60px' }}
                                onClick={() => navigate(`/account`)}>
                                <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                                    <img src={imageAuthor} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <p className="ml-4 text-xl text-left font-bold" style={{ fontSize: '14px' }}>
                                    {postAuthor}
                                </p>
                            </button>
                            <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden ml-2">
                                <button className="w-full h-full object-cover bg-my-purple hover:bg-my-purple-light active:bg-my-purple-dark" />
                            </div>
                        </div>
                        <div className="my-4 rounded-large bg-my-light-grey" style={{ width: '380px', height: '195px' }}>
                            <p className="p-2 kanit" style={{ fontSize: '12px' }}>{description}</p>
                        </div>
                        <div className="my-4 rounded-large bg-my-light-grey" style={{ width: '380px', height: '195px' }}>
                            <div className="rounded-large flex flex-wrap overflow-auto pb-3" style={{ maxHeight: '380px' }}>
                                {postTags.map((tag, idx) =>
                                    <div key={idx}
                                        className="kanit-regular text-black p-3 rounded-large ml-3 mt-3 bg-my-pink text-center w-auto"
                                        style={{ height: 'fit-content' }}>
                                        {tag}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewPost;
