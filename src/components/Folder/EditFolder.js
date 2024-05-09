import {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getFolderById, updateFolderById} from "../../api/FolderAPI";
import Loading from "../Loading";
import NotFound from "../NotFound";

function EditFolder() {
    const navigate = useNavigate();

    const { folderId } = useParams();

    const [folderData, setFolderData] = useState({
        title: '',
        description: '',
        posts: []
    });

    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getFolderById(folderId)
            .then((data) => {
                setFolderData({
                    title: data.title || '',
                    description: data.description || '',
                    posts: data.posts.map((post) => post.id) || []
                })
            })
            .catch((error) => {
                setIsError(true);
                console.log("Error getting folder: ", error);
            })
    }, [folderId]);

    if (isError) return <NotFound />
    if (!folderData) return <Loading />

    const handleChange = (e) => {
        setFolderData({
            ...folderData,
            [e.target.name]: e.target.value
        })
    }

    const handleEdit = async () => {
        try {
            const updatedFolder = await updateFolderById(folderId, folderData);
            console.log("Successfully updated folder");
            navigate(`/folder/${folderId}`);
        } catch (error) {
            console.log("Failed to update folder: ", error);
        }
    }

    return (
        <div>
            <div>
                <button className="m-3 bg-my-purple hover:bg-my-purple-light py-2 px-6 rounded-large text-base active:bg-my-purple-dark"
                        style={{fontSize: '16px'}}
                        onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="m-10 kanit-bold text-base" style={{fontSize: '48px'}}>
                    Edit Folder
                </h1>
                <div>
                    <input type="text"
                           className="m-2 bg-my-light-grey h-10 w-72 py-2 px-4 rounded-large focus:outline-my-purple-light"
                           placeholder="Title"
                           name="title"
                           value={folderData.title}
                           onChange={handleChange}
                           style={{ width: '400px', height: '40px' }}/>
                </div>
                <div>
                    <textarea className="m-4 bg-my-light-grey h-40 w-96 py-2 px-4 rounded-large resize-none focus:outline-my-purple-light"
                              placeholder="Description"
                              name="description"
                              value={folderData.description}
                              onChange={handleChange}
                              style={{width: '400px'}}/>
                </div>
                <div className="flex">
                    <button className="my-1 mx-4 bg-red-500 hover:bg-red-400 active:bg-red-700 py-3 px-5 rounded-large text-base" style={{fontSize: '24px'}}>
                        Delete
                    </button>
                    <button className="my-1 mx-4 bg-my-purple hover:bg-my-purple-light py-3 px-5 rounded-large text-base active:bg-my-purple-dark"
                            style={{fontSize: '24px'}}
                            onClick={handleEdit}>
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditFolder;