import {getUserAccount} from "../api/AccountAPI";
import {useEffect, useState} from "react";
import SignUp from "./Main/SignUp";
import SignIn from "./Main/SignIn";

const Authorisation = () => {
    const [isAuthorised, setIsAuthorised] = useState(false);

    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isSignInOpen, setIsSignInOpen] = useState(false);

    const swapOpen = () => {
        setIsSignUpOpen((curr) => !curr);
        setIsSignInOpen((curr) => !curr);
    }

    const checkIsAuthorised = async () => {
        try {
            await getUserAccount();
            setIsAuthorised(true);
        } catch (_) {
            setIsAuthorised(false);
        }
    }

    useEffect(() => {
        checkIsAuthorised();
    }, []);


    return (isAuthorised ?
            (<div className="mr-3 relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg className="absolute w-12 h-12 text-gray-400 -left-1"
                     fill="currentColor"
                     viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                </svg>
            </div>)
            :
            (<div className="pr-2 flex">
                <div className="mr-5">
                    <SignUp isOpen={isSignUpOpen}
                            setIsOpen={setIsSignUpOpen}
                            swapOpen={swapOpen}
                            setIsAuthorised={setIsAuthorised} />
                </div>

                <SignIn isOpen={isSignInOpen}
                        setIsOpen={setIsSignInOpen}
                        swapOpen={swapOpen}
                        setIsAuthorised={setIsAuthorised} />
            </div>)
    )
}

export default Authorisation;