import { Button, Card, CardBody, CardFooter, Dialog, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import CrossIcon from "../Icons/CrossIcon";
import Cookies from "js-cookie";
import { signUp } from "../../api/AuthAPI";
import { signIn } from "../../api/AuthAPI";
import { useNavigate } from "react-router-dom";

const SignUp = ({ isOpen, setIsOpen, swapOpen, setIsAuthorised }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const [isUsernameError, setIsUsernameError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleIsOpen = () => setIsOpen((cur) => !cur);

    const handleSignUp = () => {

        if (username.trim().length === 0) {
            setIsUsernameError(true);
            return;
        }

        if (email.trim().length === 0 || !emailRegex.test(email)) {
            setIsEmailError(true);
            return;
        }

        if (password.length === 0) {
            setIsPasswordError(true);
            return;
        }

        signUp(JSON.stringify({ email, username, password }))
            .then(() => signIn(JSON.stringify({ username, password })))
            .then(loginData => {
                const jwt = loginData.token;
                const expiresIn = loginData.expiresIn;
                Cookies.set('jwt', jwt, { expires: new Date(Date.now() + expiresIn) });
                handleCloseDialog();
                setIsAuthorised(true);
                navigate('/account/edit/tags');
            }).catch((error) => {
                setErrorMessage(error.message);
                console.log("Failed to sign up: ", error);
                setIsError(true);
            })
    }

    const handleCloseDialog = () => {
        setIsError(false);
        setErrorMessage("");
        handleIsOpen();
    };

    const handleUsernameInput = (event) => {
        if (isError) {
            setIsError(false);
            setErrorMessage("");
        }

        if (isUsernameError) {
            setIsUsernameError(false);
        }

        setUsername(event.target.value);
    }

    const handleEmailInput = (event) => {
        if (isError) {
            setIsError(false);
            setErrorMessage("");
        }

        if (isEmailError) {
            setIsEmailError(false);
        }

        setEmail(event.target.value);
    }

    const handlePasswordInput = (event) => {
        if (isError) {
            setIsError(false);
            setErrorMessage("");
        }

        if (isPasswordError) {
            setIsPasswordError(false);
        }

        setPassword(event.target.value);
    }

    return (
        <div>
            <Button className="kanit-regular bg-my-purple hover:bg-my-purple-light text-black"
                style={{
                    textTransform: 'initial',
                    fontSize: '16px',
                    borderRadius: '15px'
                }}
                onClick={handleIsOpen}
            >Sign Up</Button>
            <Dialog size="xs" open={isOpen} handler={handleCloseDialog} className="bg-transparent shadow-none">
                <Card className="flex flex-col gap-4">
                    <CardBody>
                        <div className="flex flex-col">
                            <CrossIcon className="mr-3 h-5 w-5" onClick={handleCloseDialog} />
                            <Typography className="kanit-bold flex justify-center mb-7" variant="h2" color="blue-gray">
                                Create account
                            </Typography>
                        </div>

                        {isError && (
                            <div>
                                <div className="flex text-center justify-center bg-red-500 text-white p-2 rounded-md">
                                    {errorMessage}
                                </div>
                                <div className="m-5"></div>
                            </div>
                        )}

                        <Input value={username}
                            label="Username"
                            size="lg"
                            onChange={(e) => handleUsernameInput(e)}
                            error={isUsernameError}
                        />

                        <div className="m-5"></div>

                        <Input value={email}
                            type="email"
                            label="Email"
                            size="lg"
                            onChange={(e) => handleEmailInput(e)}
                            error={isEmailError}
                        />

                        <div className="m-5"></div>

                        <Input value={password}
                            type="password"
                            label="Password"
                            size="lg"
                            error={isPasswordError}
                            onChange={(e) => handlePasswordInput(e)} />
                    </CardBody>

                    <CardFooter>
                        <div className="flex justify-center">
                            <Button className="kanit-regular bg-my-purple text-black" size="lg"
                                onClick={handleSignUp}
                                style={{
                                    borderRadius: '15px',
                                    textTransform: 'initial'
                                }}>
                                Sign up
                            </Button>
                        </div>

                        <Typography variant="small" className="mt-4 flex justify-center kanit-regular">
                            Do you already have an account?
                            <Typography as="button" variant="small" color="blue-gray" className="ml-1 kanit-bold" onClick={swapOpen}>
                                Sign in
                            </Typography>
                        </Typography>
                    </CardFooter>
                </Card>
            </Dialog>
        </div>
    )
}

export default SignUp;
