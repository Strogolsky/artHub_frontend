import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";
import NotFound from "../NotFound";
import {getFolderById, updateFolderById} from "../../api/FolderAPI";
import SearchInput from "../Search/SearchInput";
import Authorisation from "../Authorisation";
import Logo from "../ImageViews/Logo";
import ImageWithCross from "./ImageWithCross";
import {getUserAccount} from "../../api/AccountAPI";

const ViewFolder = () => {
    const navigate = useNavigate();

    const { folderId } = useParams();

    const [folderData, setFolderData] = useState();
    const [isError, setIsError] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    const [userId, setUserId] = useState(-1);

    useEffect(() => {
        getFolderById(folderId)
            .then(data => setFolderData(data))
            .catch(error => {
                console.error("Error fetching data:", error);
                setIsError(true);
            })

        getUserAccount()
            .then(data => setUserId(data.id))
            .catch(error => {
                console.error("Error fetching data: ", error);
                setIsError(true);
            })
    }, [folderId, isUpdated]);

    const handleDeletePostFromFolder = async (postIdToDelete) => {
        const newPostIds = folderData.posts.map(post => post.id).filter(id => id !== postIdToDelete)

        const newFolderData = {
            title: folderData.title,
            description: folderData.description,
            postIds: newPostIds
        }

        await updateFolderById(folderId, newFolderData);
        setIsUpdated((curr) => !curr);
    }

    if (isError) return <NotFound />
    if (!folderData) return <Loading />;

    return (
        <div>
            <div className="flex justify-between items-center">
                <Logo />

                <SearchInput />

                <Authorisation />
            </div>

            <div className="container text-center mx-auto mt-10" style={{ maxWidth: '30%' }}>
                <h1 style={{ fontWeight: 700, fontSize: '48px' }}>{folderData.title}</h1>
                <p className="text-center" style={{ fontWeight: 400, fontSize: '14px' }}>
                    {folderData.description}
                </p>

                {userId === folderData.patron.id &&
                    <button className="mt-5 bg-my-purple p-3 rounded-large"
                        style={{ fontSize: '16px' }}
                        onClick={() => navigate('edit')}>
                        Edit folder
                    </button>
                }
            </div>

            <div className="mt-14 mb-10 flex justify-center">
                <div className="text-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center">

                    {userId === folderData.patron.id &&
                        <div className="m-6" style={{ width: '210px', height: '200px' }}>
                            <button className="bg-my-light-grey hover:bg-my-purple-light hover:border-my-purple-dark hover:border-2 rounded-large flex justify-center items-center"
                                style={{ width: '200px', height: '150px' }}
                                onClick={() => navigate('/post/create', { state: { folderId } })}>
                                Add new post
                            </button>
                        </div>
                    }

                    {folderData.posts.map((post) => (
                        <div key={post.id} className="m-6" style={{ width: '210px', height: '200px' }}>
                            <div className="rounded-large flex justify-center items-center" style={{ width: '200px', height: '150px' }}>
                                <ImageWithCross block={userId !== folderData.patron.id} post={post} handleDeletePostFromFolder={() => handleDeletePostFromFolder(post.id)} />
                            </div>

                            <p className="mt-1">{post.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ViewFolder