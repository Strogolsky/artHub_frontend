import { useState } from 'react';

function EditAccount() {
    const [userNickname, setNickname] = useState("");
    const [userEmail, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");

    return (
        <div>
            <div>
                <button className="m-3 bg-my-purple hover:bg-my-purple-light py-2 px-6 rounded-large text-base active:bg-my-purple-dark"
                    style={{ fontSize: '16px' }}>
                    Back
                </button>
            </div>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="m-10 kanit-bold text-base" style={{ fontSize: '48px' }}>
                    Edit Account
                </h1>
                <div>
                    <input type="text"
                        className="m-3 bg-my-light-grey h-10 w-72 py-2 px-4 rounded-large focus:outline-my-purple-light"
                        placeholder="New nickname"
                        value={userNickname}
                        onChange={(e) => setNickname(e.target.value)}
                        style={{ width: '400px', height: '40px' }} />
                </div>
                <div>
                    <input type="text"
                        className="m-3 bg-my-light-grey h-10 w-72 py-2 px-4 rounded-large focus:outline-my-purple-light"
                        placeholder="New email"
                        value={userEmail}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '400px', height: '40px' }} />
                </div>
                <div>
                    <input type="text"
                        className="m-3 bg-my-light-grey h-10 w-72 py-2 px-4 rounded-large focus:outline-my-purple-light"
                        placeholder="New password"
                        value={userPassword}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '400px', height: '40px' }} />
                </div>
                <div className="flex">
                    <button className="my-1 mx-4 bg-red-500 hover:bg-red-400 active:bg-red-700 py-3 px-5 rounded-large text-base" style={{ fontSize: '24px' }}>
                        Delete
                    </button>
                    <button className="my-1 mx-4 bg-my-purple hover:bg-my-purple-light py-3 px-5 rounded-large text-base active:bg-my-purple-dark"
                        style={{ fontSize: '24px' }}>
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditAccount;