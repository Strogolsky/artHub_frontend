import {useEffect, useState} from 'react';
import { Button, Card, CardBody, Dialog, Typography } from "@material-tailwind/react";
import CrossIcon from "../Icons/CrossIcon";
import {getFolderById, getUserFolders, updateFolderById} from "../../api/FolderAPI";

const AddToFolder = ({postId}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFolders, setSelectedFolders] = useState([]);
    const [folders, setFolders] = useState([]);

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
        selectedFolders.map(folderId => {
            addPostToFolder(folderId)
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
            .catch(error => {
                console.error("Error fetching folders ", error);
            })

        setSelectedFolders([]);
    }, [isOpen]);

    return (
        <div>
            <Button
                className="my-1 bg-my-purple hover:bg-my-purple-light kanit-regular py-3 px-5 rounded-large text-base text-black"
                onClick={handleIsOpen}
                style={{ textTransform: 'none' }}
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

                            {folders.map(folder => (
                                <div key={folder.id} className="w-full md:w-3/4 lg:w-2/3 bg-gray-200 m-1 p-2 flex justify-between items-center rounded-lg">
                                    <Typography className="text-black kanit-regular">
                                        {folder.title}
                                    </Typography>

                                    <Button
                                        className={`kanit-regular py-2 px-4 rounded-lg ${selectedFolders.includes(folder.id) ? 'bg-my-purple-light' : 'bg-my-purple-dark'}`}
                                        onClick={() => handleSelectFolder(folder.id)}
                                    >
                                        {selectedFolders.includes(folder.id) ? 'Added' : 'Add'}
                                    </Button>
                                </div>
                            ))}

                        </div>
                    </CardBody>
                    <div className="flex justify-center p-4">
                        <Button
                            className="bg-my-purple kanit-regular text-black py-2 px-5 rounded-lg"
                            onClick={handleAddToFolders}
                        >
                            Save Changes
                        </Button>
                    </div>
                </Card>
            </Dialog>
        </div>
    );
};

export default AddToFolder;
