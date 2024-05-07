import { Button, Card, CardBody, CardFooter, Dialog, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import CrossIcon from "../Icons/CrossIcon";
import Cookies from "js-cookie";

const SignUp = ({ isOpen, setIsOpen, swapOpen, setIsAuthorised }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleIsOpen = () => setIsOpen((cur) => !cur);

    const handleSignUp = () => {
        const URL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/auth/signup`;

        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error("505 Internal Server Error");
            }
            return response.json();
        }).then(data => {
            const loginURL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/auth/login`;

            fetch(loginURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then(response => {
                if (!response.ok) {
                    throw new Error("505 Internal Server Error");
                }
                return response.json();
            }).then(loginData => {
                const jwt = loginData.token;
                const expiresIn = loginData.expiresIn;
                Cookies.set('jwt', jwt, {expires: new Date(Date.now() + expiresIn)});
                handleIsOpen();
                setIsAuthorised(true);
            }).catch(error => console.error("Error: ", error));
        })

    }

    return (
        <div>
            <Button className="kanit-regular bg-my-purple hover:bg-my-purple-light text-black" style={{ textTransform: 'initial', fontSize: '16px' }} onClick={handleIsOpen}>Sign Up</Button>
            <Dialog size="xs" open={isOpen} handler={handleIsOpen} className="bg-transparent shadow-none">
                <Card className="flex flex-col gap-4">
                    <CardBody>
                        <div className="flex flex-col">
                            <CrossIcon className="mr-3 h-5 w-5" onClick={handleIsOpen} />
                            <Typography className="kanit-bold flex justify-center mb-7" variant="h2" color="blue-gray">
                                Create account
                            </Typography>
                        </div>

                        <Input value={username} label="Username" size="lg" onChange={(e) => setUsername(e.target.value)} />

                        <div className="m-5"></div>

                        <Input value={email} type="email" label="Email" size="lg" onChange={(e) => setEmail(e.target.value)} />

                        <div className="m-5"></div>

                        <Input value={password} type="password" label="Password" size="lg" onChange={(e) => setPassword(e.target.value)} />
                    </CardBody>

                    <CardFooter>
                        <div className="flex justify-center">
                            <Button className="kanit-regular bg-my-purple-light text-black" size="lg" onClick={handleSignUp}>
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