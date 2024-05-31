import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import NotFound from "../NotFound";
import { deleteUserAccount, getUserAccount, updateUserAccount } from "../../api/AccountAPI";
import outlined from "@material-tailwind/react/theme/components/timeline/timelineIconColors/outlined";
import { signIn } from "../../api/AuthAPI";
import Cookies from "js-cookie";

function EditAccount() {
    const navigate = useNavigate();

    const [isResolved, setIsResolved] = useState(false);
    const [isError, setIsError] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [userTags, setUserTags] = useState([]);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [isUsernameError, setIsUsernameError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


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

    const handleEdit = async () => {
        if (username.trim().length === 0) {
            setIsUsernameError(true);
            return;
        }

        if (email.trim().length === 0 || !emailRegex.test(email)) {
            setIsEmailError(true);
            return;
        }

        try {
            const accountData = await updateUserAccount(username, email);

            const jwt = accountData.token;
            const expiresIn = 3600000;
            Cookies.set('jwt', jwt, { expires: new Date(Date.now() + expiresIn) });
            navigate('/account');
        } catch (error) {
            console.error("Error updating account: ", error);
            setErrorMessage(error.message);
        }
    }

    const handleUsernameInput = (event) => {
        if (isError) {
            setIsError(false);
        }

        setErrorMessage("");

        if (isUsernameError) {
            setIsUsernameError(false);
        }

        setUsername(event.target.value);
    }

    const handleEmailInput = (event) => {
        if (isError) {
            setIsError(false);
        }

        setErrorMessage("");

        if (isEmailError) {
            setIsEmailError(false);
        }

        setEmail(event.target.value);
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

                {errorMessage && (
                    <div>
                        <div className="flex text-center justify-center bg-red-500 text-white p-2 pl-5 pr-6 rounded-md">
                            {errorMessage}
                        </div>
                        <div className="m-3"></div>
                    </div>
                )}

                <div>
                    <input type="text"
                        className={`${isUsernameError ? "border-red-400 border-2 bg-red-100 placeholder-gray-500" : ""} m-3 bg-my-light-grey h-10 w-72 py-2 px-4 rounded-large focus:outline-my-purple-light`}
                        placeholder="New username"
                        value={username}
                        onChange={(e) => handleUsernameInput(e)}
                        style={{ width: '400px', height: '40px' }} />
                </div>
                <div>
                    <input type="text"
                        className={`${isEmailError ? "border-red-400 border-2 bg-red-100 placeholder-gray-500" : ""} m-3 bg-my-light-grey h-10 w-72 py-2 px-4 rounded-large focus:outline-my-purple-light`}
                        placeholder="New email"
                        value={email}
                        onChange={(e) => handleEmailInput(e)}
                        style={{ width: '400px', height: '40px' }} />
                </div>
                <div>
                    <input type="text"
                        disabled={true}
                        className="cursor-not-allowed m-3 bg-my-light-grey h-10 w-72 py-2 px-4 rounded-large focus:outline-my-purple-light"
                        placeholder="New password"
                        style={{ width: '400px', height: '40px' }} />
                </div>

                <div className="pb-5">
                    <button className="my-1 mx-4 bg-my-pink hover:bg-my-pink-light active:bg-my-pink-dark py-2 px-5 rounded-large text-base"
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
                    <button className="my-1 mx-4 bg-my-purple hover:bg-my-purple-light active:bg-my-purple-dark py-3 px-5 rounded-large text-base"
                        style={{ fontSize: '24px' }}
                        onClick={handleEdit}>
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditAccount;