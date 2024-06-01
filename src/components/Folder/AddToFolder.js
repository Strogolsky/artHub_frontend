import { useEffect, useState } from 'react';
import { Button, Card, CardBody, Dialog, Typography } from "@material-tailwind/react";
import CrossIcon from "../Icons/CrossIcon";
import { getFolderById, getUserFolders, updateFolderById } from "../../api/FolderAPI";
import {useNavigate} from "react-router-dom";

const AddToFolder = ({ postId, isOpenDefault }) => {
    const [isOpen, setIsOpen] = useState(isOpenDefault);
    const [selectedFolders, setSelectedFolders] = useState([]);
    const [folders, setFolders] = useState([]);
    const navigate = useNavigate();

    const [isError, setIsError] = useState(false);

    const handleIsOpen = () => setIsOpen(curr => !curr);

    const addPostToFolder = async (folderId) => {
        const folder = await getFolderById(folderId);

        const folderData = {
            title: folder.title,
            description: folder.description,
            postIds: [...folder.posts.map(post => parseInt(post.id)), parseInt(postId)]
        };

        await updateFolderById(folderId, folderData);
    }

    const handleAddToFolders = () => {
        selectedFolders.forEach(folderId => {
            addPostToFolder(folderId)
                .catch(() => setIsError(true));
        })

        handleIsOpen();
    }

    const handleSelectFolder = (folder) => {
        if (selectedFolders.includes(folder)) {
            setSelectedFolders(selectedFolders.filter(f => f !== folder));
        } else {
            setSelectedFolders([...selectedFolders, folder]);
        }
    };

    useEffect(() => {
        getUserFolders()
            .then(data => setFolders(data))
            .catch(() => {
                setIsError(false);
            })

        setSelectedFolders([]);
    }, [isOpen]);

    const handleCreateFolder = () => {
        navigate('/folder/create', {state: {postId}});
    }

    return (
        <div>
            <Button
                className="my-1 bg-my-purple hover:bg-my-purple-light kanit-regular py-3 px-5 rounded-large text-base text-black"
                onClick={handleIsOpen}
                style={{
                    textTransform: 'none',
                    borderRadius: '15px'
                }}
            >
                Save
            </Button>

            <Dialog size="sm" open={isOpen} handler={handleIsOpen} className="bg-transparent shadow-none">
                <Card className="flex flex-col">
                    <CardBody className="relative">
                        <CrossIcon className="absolute top-2 left-2 h-5 w-5 cursor-pointer" onClick={handleIsOpen} />

                        <Typography className="kanit-bold text-center mb-4" variant="h2" color="blue-gray">
                            Add to Folder
                        </Typography>

                        <div className="overflow-y-auto max-h-96 py-2 flex flex-col items-center">

                            <button className={`kanit-regular py-2 px-4 mb-3 rounded-large bg-my-purple text-black hover:bg-my-purple-light active:bg-my-purple-dark`}
                                    onClick={handleCreateFolder}
                                    style={{textTransform: 'initial'}}>
                                Create folder
                            </button>

                            {isError ?
                                <h1 className="text-center text-black" style={{fontWeight: 700, fontSize: '32px'}}>
                                    Error loading folders
                                </h1>
                                :
                                folders.map(folder => (
                                    <div key={folder.id} className="w-full md:w-3/4 lg:w-2/3 bg-gray-200 m-1 p-2 flex justify-between items-center rounded-lg">
                                        <Typography className="text-black kanit-regular">
                                            {folder.title}
                                        </Typography>

                                        <Button className={`kanit-regular py-2 px-4 rounded-lg ${selectedFolders.includes(folder.id) ? 'bg-my-purple-light' : 'bg-my-purple'}`} onClick={() => handleSelectFolder(folder.id)} style={{
                                            textTransform: 'initial'
                                        }}>
                                            {selectedFolders.includes(folder.id) ? 'Added' : 'Add'}
                                        </Button>
                                    </div>
                                ))
                            }
                        </div>
                    </CardBody>
                    <div className="flex justify-center p-4">
                        <Button
                            className="bg-my-purple kanit-regular text-black"
                            onClick={handleAddToFolders}
                            style={{
                                textTransform: 'initial',
                                fontSize: '16px',
                                borderRadius: "15px"
                            }}
                        >
                            Save changes
                        </Button>
                    </div>
                </Card>
            </Dialog>
        </div >
    );
};

export default AddToFolder;
