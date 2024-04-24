import {useState} from "react";
import {ReactComponent as AvatarIcon} from "../Icons/avatar.svg";

const ViewUser = () => {
    const [searchText, setSearchText] = useState("");

    const [userFolders, setUserFolders] = useState([
        "Created posts",
        "Saved posts",
        "Some random name",
        "Another random name of folder",
    ]);


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

            <div className="container flex flex-col items-center justify-center mx-auto mt-10">
                <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                    {/* todo: add icon */}
                </div>

                <h1 className="mt-4" style={{fontWeight: 700, fontSize: '48px'}}>Nickname</h1>
                <p className="-mt-2" style={{color: '#8A8A8A', fontWeight: 400, fontSize: '16px'}}>email</p>

                <div>
                    <button className="mt-5 bg-my-purple p-2.5 pl-6 pr-6 rounded-large" style={{fontSize: '16px'}}>
                        Edit profile
                    </button>
                    <button className="ml-8 mt-5 bg-my-purple p-2.5 pl-5 pr-5 rounded-large" style={{fontSize: '16px'}}>
                        Create post
                    </button>
                </div>
            </div>

            <div className="mt-14 mb-10 flex justify-center">
                <div className="text-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center">

                    <div className="m-6" style={{width: '210px', height: '200px'}}>
                        <div className="bg-my-light-grey rounded-large flex justify-center items-center" style={{width: '200px', height: '150px'}}>
                            Add new folder
                        </div>
                    </div>

                    {userFolders.map((folderName, idx) => (
                        <div className="m-6" style={{width: '200px', height: '200px'}}>
                            <div className="bg-my-light-grey rounded-large flex justify-center items-center" style={{width: '200px', height: '150px'}}></div>
                            <p key={idx} className="mt-2">{folderName}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ViewUser;