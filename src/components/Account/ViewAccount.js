import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getUserAccount} from "../../api/UserAPI";
import NotFound from "../NotFound";
import {getUserFolders} from "../../api/FolderAPI";
import Loading from "../Loading";

const ViewAccount = () => {
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState("");

    const [accountData, setAccountData] = useState();
    const [userFolders, setUserFolders] = useState();

    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getUserAccount()
            .then(data => setAccountData(data))
            .catch(() => setIsError(true));

        getUserFolders()
            .then(data => setUserFolders(data))
            .catch(() => setIsError(true));
    }, []);

    if (isError) return <NotFound />
    if (!accountData || !userFolders) return <Loading />

    const username = accountData.username;
    const email = accountData.email;

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="pl-2 flex-none">
                    <img alt="ArtHub logo"/>
                </div>

                <div className="flex-grow text-center mx-auto">
                    <input type="text"
                           className="m-2 bg-my-light-grey h-10 w-72 py-2 px-4 rounded-large focus:outline-my-purple-light text-center"
                           placeholder="Search"
                           value={searchText}
                           onChange={(e) => setSearchText(e.target.value)}
                           style={{width: '700px', height: '44px'}}/>
                </div>

                <div className="mr-5 relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                </div>
            </div>

            <div className="container flex flex-col items-center justify-center mx-auto mt-10">
                <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                    {/* todo: add icon */}
                </div>

                <h1 className="mt-4" style={{fontWeight: 700, fontSize: '48px'}}>{username}</h1>
                <p className="-mt-2" style={{color: '#8A8A8A', fontWeight: 400, fontSize: '16px'}}>{email}</p>

                <div>
                    <button className="mt-5 bg-my-purple p-2.5 pl-6 pr-6 rounded-large"
                            style={{fontSize: '16px'}}
                            onClick={() => navigate('edit')}>
                        Edit profile
                    </button>
                    <button className="ml-8 mt-5 bg-my-purple p-2.5 pl-5 pr-5 rounded-large"
                            style={{fontSize: '16px'}}
                            onClick={() => navigate('/post/create')}>
                        Create post
                    </button>
                </div>
            </div>

            <div className="mt-14 mb-10 flex justify-center">
                <div className="text-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center">

                    <div className="m-6" style={{width: '210px', height: '200px'}}>
                        <button className="bg-my-light-grey hover:bg-my-purple-light hover:border-my-purple-dark hover:border-2 rounded-large flex justify-center items-center"
                                style={{width: '200px', height: '150px'}}
                                onClick={() => navigate('/folder/create')}>
                            Add new folder
                        </button>
                    </div>

                    {userFolders.map((folder) => (
                        <div key={folder.id} className="m-6" style={{width: '200px', height: '200px'}}>
                            <button className="bg-my-light-grey hover:border-my-purple hover:border-4 rounded-large flex justify-center items-center"
                                 style={{width: '200px', height: '150px'}}
                                 onClick={() => navigate(`/folder/${folder.id}`)}/>
                            <p className="mt-2">{folder.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ViewAccount;