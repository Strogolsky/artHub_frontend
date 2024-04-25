import { useState } from 'react';
import ChooseTags from "./ChooseTags";
import { useNavigate } from "react-router-dom";

function CreatePost() {
    const navigate = useNavigate();

    const [postDescription, setPostDescription] = useState("");

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
                            className="opacity-0 absolute h-full w-full z-10"
                            onChange={(e) => {
                                if (e.target.files.length > 0) {
                                    console.log('Файл выбран:', e.target.files[0].name);
                                }
                            }}
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
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CreatePost;
