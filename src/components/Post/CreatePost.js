import {useEffect, useState} from 'react';
import ChooseTags from "./ChooseTags";
import { useLocation, useNavigate } from "react-router-dom";
import { createPost } from "../../api/PostAPI";
import { getFolderById, updateFolderById } from "../../api/FolderAPI";
import Modal from "../Modal.js";

function CreatePost() {
    const navigate = useNavigate();
    const location = useLocation();
    const [postTitle, setPostTitle] = useState("");
    const [postDescription, setPostDescription] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessages, setModalMessages] = useState([]);
    const { folderId } = location.state || "";

    const addPostToFolder = async (postId, folderId) => {
        const folder = await getFolderById(folderId);

        const folderData = {
            title: folder.title,
            description: folder.description,
            postIds: [...folder.posts.map(post => parseInt(post.id)), parseInt(postId)]
        };

        await updateFolderById(folderId, folderData);
    }

    const handleCreatePost = async () => {
        const errorMessages = [];
        if (!postTitle) errorMessages.push("Please fill in the title.");
        if (!selectedFile) errorMessages.push("Please upload an image.");

        if (errorMessages.length > 0) {
            setModalMessages(errorMessages);
            setModalIsOpen(true);
            return;
        }

        try {
            const createdPost = await createPost({ postTitle, postDescription, selectedTags, selectedFile });
            console.log("Post successfully created", createdPost);
            navigate(`/post/${createdPost.id}`);

            if (folderId) {
                await addPostToFolder(createdPost.id, folderId);
            }

        } catch (error) {
            console.log("Error creating post: ", error);
            errorMessages.push(error);
            setModalMessages(errorMessages);
            setModalIsOpen(true);
            return;
        }
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        if (selectedFile) {
          const url = URL.createObjectURL(selectedFile);
          setImageData(url);
          return () => URL.revokeObjectURL(url);
        }
    }, [selectedFile]);

    const handleSelectFile = (e) => {
        if (e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
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
                        <h1 className="text-center" style={{fontSize: "30px"}}>Select image</h1>
                        <div className={`m-2 ${!selectedFile ? "bg-my-light-grey" : ""} font-regular py-2 px-4 rounded-large flex items-center justify-center cursor-pointer`} style={{
                            height: '500px',
                            width: '400px'
                        }}>
                            <input type="file" accept="image/*" className="hover:cursor-pointer opacity-0 absolute h-full w-full z-10" title="Click here to select image" onChange={(e) => handleSelectFile(e)}/>

                            {selectedFile ? (
                                <>
                                    <img src={imageData} alt="Selected" className="object-cover h-full w-full rounded-large" style={{
                                        maxWidth: '400px',
                                        maxHeight: '500px'
                                    }}/>
                                </>
                            ) : (
                                <></>
                            )}
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
                            placeholder="*Title"
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

                    <ChooseTags buttonText="Tags" tags={selectedTags} setTags={(tags) => setSelectedTags(tags)} />

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

            <Modal
                isOpen={modalIsOpen}
                onClose={closeModal}
                messages={modalMessages}
            />
        </div>
    );
}

export default CreatePost;
