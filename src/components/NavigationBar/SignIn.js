import { Button, Card, CardBody, CardFooter, Dialog, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import CrossIcon from "../Icons/CrossIcon";
import Cookies from 'js-cookie';
import { signIn } from "../../api/AuthAPI";

const SignIn = ({ isOpen, setIsOpen, swapOpen, setIsAuthorised }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isUsernameError, setIsUsernameError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);

    const handleIsOpen = () => setIsOpen((cur) => !cur);

    const handleSignIn = () => {
        if (username.trim().length === 0) {
            setIsUsernameError(true);
            return;
        }

        if (password.length === 0) {
            setIsPasswordError(true);
            return;
        }

        signIn(JSON.stringify({ username, password }))
            .then(data => {
                const jwt = data.token;
                const expiresIn = data.expiresIn;
                Cookies.set('jwt', jwt, { expires: new Date(Date.now() + expiresIn) });
                handleIsOpen();
                setIsAuthorised(true);
                window.location.reload();
            }).catch((error) => {
                setErrorMessage(error.message);
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

        setUsername(event.target.value)
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
                }} onClick={handleIsOpen}>Sign In</Button>
            <Dialog size="xs" open={isOpen} handler={handleCloseDialog} className="bg-transparent shadow-none">
                <Card className="flex flex-col gap-4">
                    <CardBody>
                        <div className="flex flex-col">
                            <CrossIcon className="mr-3 h-5 w-5" onClick={handleCloseDialog} />
                            <Typography className="kanit-bold flex justify-center mb-7" variant="h2" color="blue-gray">
                                Sign In
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
                            type="username"
                            label="Username"
                            size="lg"
                            onChange={(e) => handleUsernameInput(e)}
                            error={isUsernameError}
                        />

                        <div className="m-5"></div>

                        <Input value={password}
                            type="password"
                            label="Password"
                            size="lg"
                            onChange={(e) => handlePasswordInput(e)}
                            error={isPasswordError}
                        />
                    </CardBody>

                    <CardFooter>
                        <div className="flex justify-center">
                            <Button className="kanit-regular bg-my-purple text-black" size="lg"
                                onClick={handleSignIn}
                                style={{
                                    borderRadius: '15px',
                                    textTransform: 'initial'
                                }}>
                                Sign in
                            </Button>
                        </div>

                        <Typography variant="small" className="mt-4 flex justify-center kanit-regular">
                            Don&apos;t have an account?
                            <Typography as="button" variant="small" color="blue-gray" className="ml-1 kanit-bold" onClick={swapOpen}>
                                Sign up
                            </Typography>
                        </Typography>
                    </CardFooter>
                </Card>
            </Dialog>
        </div>
    )
}

export default SignIn;
