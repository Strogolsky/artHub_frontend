import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import ChooseTags from './ChooseTags';
import { getPostById, updatePostById } from "../../api/Post";
import NotFound from "../NotFound";

function EditPost() {
    const navigate = useNavigate();
    const { postId } = useParams();

    const [postData, setPostData] = useState({
        title: '',
        description: '',
        tagsId: [],
        file: '',
        patronId: 0
    });
    
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (postId) {
            getPostById(postId).then(data => {
                setPostData({
                    title: data.title || '',
                    description: data.description || '',
                    tagsId: data.tags.map(tag => tag.id) || [],
                    file: data.file || '',
                    patronId: data.patronId || 0
                });
            }).catch(error => {
                console.error('Error fetching post data:', error);
                setIsError(true);
            });
        }
    }, [postId, navigate]);

    const handleChange = (e) => {
        setPostData({
            ...postData,
            [e.target.name]: e.target.value
        });
        console.log("Changed");
    };

    const handleEdit = async () => {
        try {
            const updatedPost = await updatePostById(postId, postData);
            console.log('Post updated successfully:', updatedPost);
            navigate(`/post/${postId}`);
        } catch (error) {
            console.error('Failed to update post:', error);
        }
    };

    if (isError) return <NotFound />

    return (
        <div>
            <div>
                <button className="m-3 bg-my-purple hover:bg-my-purple-light font-regular py-2 px-6
                        rounded-large text-base active:bg-my-purple-dark"
                    style={{ fontSize: '16px' }}
                    onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>
            <div className="flex flex-col items-center justify-center h-screen mt-n10">
                <h1 className="m-10 font-bold text-base" style={{ fontSize: '48px' }}>
                    Edit post
                </h1>
                <div>
                    <input type="text"
                        name="title"
                        className="m-2 bg-my-light-grey h-10 w-96 py-2 px-4 rounded-large focus:outline-my-purple-light"
                        placeholder="Title"
                        value={postData.title}
                        onChange={handleChange} />
                </div>
                <div>
                    <textarea
                        name="description"
                        className="m-4 bg-my-light-grey font-regular h-40 w-96 py-2 px-4 rounded-large resize-none focus:outline-my-purple-light"
                        placeholder="Description"
                        value={postData.description}
                        onChange={handleChange}
                        style={{ width: '400px' }}
                    />
                </div>
                <ChooseTags tags={postData.tagsId} setTags={(tags) => setPostData({ ...postData, tagsId: tags })} />
                <div className="flex">
                    <button
                        className="my-1 mx-4 bg-red-500 hover:bg-red-400 active:bg-red-700 font-regular py-3 px-5 rounded-large text-base" style={{ fontSize: '24px' }}
                    >
                        Delete
                    </button>
                    <button
                        className="my-1 mx-4 bg-my-purple hover:bg-my-purple-light font-regular py-3 px-5 rounded-large text-base active:bg-my-purple-dark"
                        style={{ fontSize: '24px' }}
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditPost;
