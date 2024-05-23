import { useState, useEffect } from 'react';
import AddToFolder from "../Folder/AddToFolder";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../../api/PostAPI";
import NotFound from '../NotFound';
import Loading from '../Loading';
import SearchInput from "../Search/SearchInput";
import Authorisation from "../Authorisation";
import {getUserAccount} from "../../api/AccountAPI";
import AnotherUserIcon from '../ImageViews/AnotherUserIcon';
import Logo from "../ImageViews/Logo";
import UserIcon from "../ImageViews/UserIcon";

const ViewPost = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [isError, setIsError] = useState(false);
    const [userId, setUserId] = useState(-1);

    useEffect(() => {
        getPostById(postId)
            .then(data => {
                setPost(data);
            })
            .catch(error => {
                console.error('Failed to load post:', error.message);
                setIsError(true);
            });

        getUserAccount()
            .then(data => {
                setUserId(data.id)
            })
            .catch(_ => {
                setUserId(-2);
            })
    }, [postId]);

    if (isError) return <NotFound />;
    if (!post) return <Loading />;

    const postTitle = post.title || 'No title available';
    const postAuthor = post.patron ? post.patron.username : 'Unknown Author';
    const description = post.description || 'No description available';
    const postTags = post.tags ? post.tags.map(tag => tag.name) : [];
    const imageData = post.image.data;

    return (
        <div>
            <div className="flex justify-between items-center">
                <Logo />

                {userId !== -1 && userId !== -2 && <SearchInput />}

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

                            {userId !== -2 && <AddToFolder postId={postId} />}

                            {userId === post.patron.id &&
                                <button
                                    className="bg-my-purple hover:bg-my-purple-light font-regular py-3 px-5 rounded-large text-base active:bg-my-purple-dark"
                                    style={{ fontSize: '16px' }}
                                    onClick={() => navigate('edit')}>
                                    Edit
                                </button>
                            }

                        </div>
                        <p className="my-5 text-xl text-left font-bold" style={{ fontSize: '36px' }}>{postTitle}</p>
                        <div className="flex items-center">


                            <div className={`${userId === post.patron.id ? "hover:bg-my-purple-light active:bg-my-purple-dark cursor-pointer" : ""} px-2 bg-my-light-grey rounded-large flex items-center`}
                                style={{ width: '380px', height: '60px' }}
                                onClick={() => {if (userId === post.patron.id) navigate(`/account`)}}>
                                <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden relative">
                                    {userId === post.patron.id ? <UserIcon /> : <AnotherUserIcon />}
                                </div>
                                <p className="ml-4 text-xl text-left font-bold" style={{ fontSize: '14px' }}>
                                    {postAuthor}
                                </p>
                            </div>


                            {/*<div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden ml-2">*/}
                            {/*    <button className="w-full h-full object-cover bg-my-purple hover:bg-my-purple-light active:bg-my-purple-dark" />*/}
                            {/*</div>*/}
                        </div>
                        <div className="my-4 rounded-large bg-my-light-grey" style={{ width: '380px', height: '195px' }}>
                            <p className="p-2 kanit" style={{ fontSize: '12px' }}>{description}</p>
                        </div>

                        <div className="my-4 rounded-large bg-my-light-grey overflow-auto" style={{ width: '380px', height: '195px' }}>
                            <div className="rounded-large flex flex-wrap pb-3" style={{ maxHeight: '380px' }}>
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
