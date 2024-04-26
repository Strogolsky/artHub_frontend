import { useState } from 'react';
import { Button, Card, CardBody, Dialog, Typography } from "@material-tailwind/react";
import CrossIcon from "../Icons/CrossIcon";

const AddToFolder = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFolders, setSelectedFolders] = useState([]);

    const folders = ['Folder 1', 'Folder 2', 'Folder 3', 'Folder 4', 'Folder 5', 'Folder 6', 'Folder 7', 'Folder 8'];

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => {
        setIsOpen(false);
        // Здесь можно добавить логику для сохранения выбранных папок
    };
    const handleSelectFolder = (folder) => {
        if (selectedFolders.includes(folder)) {
            setSelectedFolders(selectedFolders.filter(f => f !== folder));
        } else {
            setSelectedFolders([...selectedFolders, folder]);
        }
    };

    return (
        <div>
            <Button
                className="my-1 bg-my-purple hover:bg-my-purple-light kanit-regular py-3 px-5 rounded-large text-base text-black"
                onClick={handleOpenModal}
                style={{ textTransform: 'none' }}
            >
                Save
            </Button>
            <Dialog size="xs" open={isOpen} handler={handleCloseModal} className="bg-transparent shadow-none">
                <Card className="flex flex-col">
                    <CardBody className="relative">
                        <CrossIcon className="absolute top-2 left-2 h-5 w-5 cursor-pointer" onClick={handleCloseModal} />
                        <Typography className="kanit-bold text-center mb-4" variant="h2" color="blue-gray">
                            Add to Folder
                        </Typography>
                        <div className="overflow-y-auto max-h-96 py-2 flex flex-col items-center">
                            {folders.map((folder, index) => (
                                <div key={index} className="w-full md:w-3/4 lg:w-2/3 bg-gray-200 m-1 p-2 flex justify-between items-center rounded-lg">
                                    <Typography className="text-black kanit-regular">
                                        {folder}
                                    </Typography>
                                    <Button
                                        className={`kanit-regular py-2 px-4 rounded-lg ${selectedFolders.includes(folder) ? 'bg-my-purple-dark' : 'bg-my-purple-light'}`}
                                        onClick={() => handleSelectFolder(folder)}
                                    >
                                        {selectedFolders.includes(folder) ? 'Added' : 'Add'}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                    <div className="flex justify-center p-4">
                        <Button
                            className="bg-my-purple kanit-regular text-black py-2 px-5 rounded-lg"
                            onClick={handleCloseModal}
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
