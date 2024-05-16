import {getUserAccount} from "../api/AccountAPI";
import {useEffect, useState} from "react";
import SignUp from "./Main/SignUp";
import SignIn from "./Main/SignIn";
import UserAvatar from "./Main/UserAvatar";

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
            <UserAvatar />
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