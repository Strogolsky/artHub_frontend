import React, { useState } from 'react';

function CreateFolder() {
    const [folderName, setFolderName] = useState("");
    const [folderDescription, setFolderDescription] = useState("");

    return (
        <div>
            <div>
                <button
                    className='m-3 bg-my-purple hover:bg-my-purple-light font-regular py-2 px-6 
                    rounded-large text-base active:bg-my-purple-dark' style={{ fontSize: '16px' }}>Back</button>
            </div>
            <div className='flex flex-col items-center justify-center h-screen mt-n10'>
                <h1
                    className='m-10 font-bold text-base' style={{ fontSize: '48px' }}>
                    New folder
                </h1>
                <div>
                    <input
                        type="text"
                        className='m-2 bg-my-light-grey font-regular h-10 w-72 py-2 px-4 rounded-large focus:outline-my-purple-light'
                        placeholder="Title"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        style={{ width: '400px', height: '40px' }}
                    />
                </div>
                <div>
                    <textarea
                        className='m-4 bg-my-light-grey font-regular h-40 w-96 py-2 px-4 rounded-large resize-none focus:outline-my-purple-light'
                        placeholder="Description"
                        value={folderDescription}
                        onChange={(e) => setFolderDescription(e.target.value)}
                        style={{ width: '400px' }}
                    />
                </div>

                <button
                    className='m-1 bg-my-purple hover:bg-my-purple-light 
                    font-regular py-3 px-5 rounded-large text-base active:bg-my-purple-dark' style={{ fontSize: '24px' }}
                >
                    Create
                </button>
            </div>
        </div>
    );
}

export default CreateFolder;
