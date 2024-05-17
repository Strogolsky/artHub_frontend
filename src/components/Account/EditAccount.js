import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import NotFound from "../NotFound";
import {deleteUserAccount, getUserAccount} from "../../api/AccountAPI";

function EditAccount() {
    const navigate = useNavigate();

    const [isResolved, setIsResolved] = useState(false);
    const [isError, setIsError] = useState(false);

    const [username, setUsername] = useState("");
    const [userEmail, setEmail] = useState("");
    const [userTags, setUserTags] = useState([]);

    const [userPassword, setPassword] = useState("");

    useEffect(() => {
        getUserAccount()
            .then(data => {
                setUsername(data.username);
                setEmail(data.email);
                data.preferredTags.map((tagId) => setUserTags((prev) => [...prev, tagId]));
                setIsResolved(true);
            })
            .catch(error => {
                console.error("Error getting user account: ", error);
                setIsError(true);
            })
    }, []);

    if (isError) return <NotFound />
    if (!isResolved) return <Loading />

    const handleDelete = async () => {
        try {
            await deleteUserAccount();
            console.log("Successfully deleted account");
            navigate('/');

        } catch (error) {
            console.error("Error deleting account: ", error);
        }
    }

    return (
        <div>
            <div>
                <button className="m-3 bg-my-purple hover:bg-my-purple-light py-2 px-6 rounded-large text-base active:bg-my-purple-dark"
                        style={{ fontSize: '16px' }}
                        onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>
            <div className="flex flex-col items-center justify-center pt-24">
                <h1 className="m-10 kanit-bold text-base" style={{ fontSize: '48px' }}>
                    Edit Account
                </h1>
                <div>
                    <input type="text"
                           disabled={true}
                        className="cursor-not-allowed m-3 bg-my-light-grey h-10 w-72 py-2 px-4 rounded-large focus:outline-my-purple-light"
                        placeholder="New nickname"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: '400px', height: '40px' }} />
                </div>
                <div>
                    <input type="text"
                           disabled={true}
                        className="cursor-not-allowed m-3 bg-my-light-grey h-10 w-72 py-2 px-4 rounded-large focus:outline-my-purple-light"
                        placeholder="New email"
                        value={userEmail}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '400px', height: '40px' }} />
                </div>
                <div>
                    <input type="text"
                           disabled={true}
                           className="cursor-not-allowed m-3 bg-my-light-grey h-10 w-72 py-2 px-4 rounded-large focus:outline-my-purple-light"
                           placeholder="New password"
                           value={userPassword}
                           onChange={(e) => setPassword(e.target.value)}
                           style={{ width: '400px', height: '40px' }} />
                </div>

                <div className="pb-5">
                    <button className="my-1 mx-4 bg-my-pink-dark py-2 px-5 rounded-large text-base"
                            style={{ fontSize: '18px', width: "400px" }}
                            onClick={() => navigate('tags')}
                    >
                        Choose preferred tags
                    </button>
                </div>

                <div className="flex">
                    <button className="my-1 mx-4 bg-red-500 hover:bg-red-400 active:bg-red-700 py-3 px-5 rounded-large text-base"
                            style={{ fontSize: '24px' }}
                            onClick={handleDelete}>
                        Delete
                    </button>
                    <button className="cursor-not-allowed my-1 mx-4 bg-my-purple-light py-3 px-5 rounded-large text-base"
                            style={{ fontSize: '24px' }}>
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditAccount;