import { useState } from 'react';
import ChooseTags from "./ChooseTags";
import { useNavigate } from "react-router-dom";
import {createPost} from "../../api/PostAPI";

function CreatePost() {
    const navigate = useNavigate();

    const [postTitle, setPostTitle] = useState("");
    const [postDescription, setPostDescription] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleCreatePost = async () => {
        try {
            const createdPost = await createPost({postTitle, postDescription, selectedTags, selectedFile});
            console.log("Post successfully created", createdPost);
            navigate(`/post/${createdPost.id}`);
        } catch (error) {
            console.log("Error creating post: ", error);
        //  todo handle errors
        }
    }

    return (
        <div>
            <div>
                <button className="m-3 bg-my-purple hover:bg-my-purple-light font-regular py-2 px-6 rounded-large text-base active:bg-my-purple-dark"
                    style={{ fontSize: '16px' }}
                    onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center justify-center mx-10">
                    <div className="relative">
                        <input
                            type="file"
                            accept="image/*"
                            className="hover:cursor-pointer opacity-0 absolute h-full w-full z-10"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                        <div className="m-2 bg-my-light-grey font-regular h-96 w-96 py-2 px-4 rounded-large flex items-center justify-center cursor-pointer"
                            style={{ height: '500px' }}>
                            <span className=" font-color-my-light-grey">Select file</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <h1 className="m-10 font-bold text-4xl">
                        Create post
                    </h1>
                    <div>
                        <input type="text"
                            className="m-2 bg-my-light-grey h-10 w-96 py-2 px-4 rounded-large focus:outline-my-purple-light"
                            placeholder="Title"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)} />
                    </div>
                    <div>
                        <textarea
                            className="m-4 bg-my-light-grey font-regular h-40 w-96 py-2 px-4 rounded-large resize-none focus:outline-my-purple-light"
                            placeholder="Description"
                            value={postDescription}
                            onChange={(e) => setPostDescription(e.target.value)}
                        />
                    </div>
                    <ChooseTags />
                    <div>
                        <button
                            className="my-1 mx-4 bg-my-purple hover:bg-my-purple-light font-regular py-3 px-5 rounded-large text-base active:bg-my-purple-dark"
                            style={{ fontSize: '24px' }}
                            onClick={handleCreatePost}>
                            Create
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CreatePost;
