import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../Loading";
import NotFound from "../NotFound";
import Cookies from "js-cookie";

const ViewFolder = () => {
    const navigate = useNavigate();

    const { folderId } = useParams();
    const jwt = Cookies.get('jwt');

    const getFolderById = async(folderId) => {
        const URL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/folders/${folderId}`
        try {
            const response = await fetch(URL, {headers: {'Authorization': `Bearer ${jwt}`}});
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('404 Not Found');
                }
                throw new Error('505 Internal Server Error')
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }

    const [folderData, setFolderData] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        getFolderById(folderId)
            .then(data => setFolderData(data))
            .catch(error => {
                console.error("Error fetching data:", error);
                setError(error.message);
            })
    }, [folderId]);

    const [searchText, setSearchText] = useState("");

    if (error === '404 Not Found') return <NotFound />
    if (!folderData) return <Loading />;

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="pl-2 flex-none">
                    <img alt="ArtHub logo"/>
                </div>

                <div className="flex-grow text-center mx-auto">
                    <input type="text" className="m-2 bg-my-light-grey h-10 w-72 py-2 px-4 rounded-large focus:outline-my-purple-light text-center" placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} style={{
                        width: '700px',
                        height: '44px'
                    }}/>
                </div>

                <div className="mr-5 relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                </div>
            </div>

            <div className="container text-center mx-auto mt-10" style={{maxWidth: '30%'}}>
                <h1 style={{fontWeight: 700, fontSize: '48px'}}>{folderData.title}</h1>
                <p className="text-center" style={{fontWeight: 400, fontSize: '14px'}}>
                    {folderData.description}
                </p>

                <button className="mt-5 bg-my-purple p-3 rounded-large"
                        style={{fontSize: '16px'}}
                        onClick={() => navigate('edit')}>
                    Edit folder
                </button>
            </div>

            <div className="mt-14 mb-10 flex justify-center">
                <div className="text-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center">

                    <div className="m-6" style={{width: '210px', height: '200px'}}>
                        <button className="bg-my-light-grey hover:bg-my-purple-light hover:border-my-purple-dark hover:border-2 rounded-large flex justify-center items-center"
                                style={{width: '200px', height: '150px'}}
                                onClick={() => navigate('/post/create')}>
                            Add new post
                        </button>
                    </div>

                    {folderData.posts.map((post) => (
                        <div key={post.id} className="m-6" style={{width: '210px', height: '200px'}}>
                            <div className="rounded-large flex justify-center items-center" style={{width: '200px', height: '150px'}}>
                                <img style={{width: '200px', height: '150px'}}
                                     className="object-cover hover:border-my-purple hover:border-4 hover:cursor-pointer rounded-large"
                                     alt={post.title}
                                     src={`data:image;base64,${post.image.data}`}
                                     onClick={() => navigate(`/post/${post.id}`)}/>
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