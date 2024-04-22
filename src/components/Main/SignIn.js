import {Button, Card, CardBody, CardFooter, Dialog, Input, Typography} from "@material-tailwind/react";
import {useState} from "react";

const SignIn = ({isOpen, setIsOpen, swapOpen}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleIsOpen = () => setIsOpen((cur) => !cur);

    return (
        <div>
            <Button className="kanit-regular bg-my-purple-dark hover:bg-my-purple-light text-black" style={{textTransform: 'initial', fontSize: '16px'}} onClick={handleIsOpen}>Sign In</Button>
            <Dialog size="xs" open={isOpen} handler={handleIsOpen} className="bg-transparent shadow-none">
                <Card className="flex flex-col gap-4">
                    <CardBody>
                        <div className="flex flex-col">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-3 h-5 w-5" onClick={handleIsOpen}>
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd"/>
                            </svg>
                            <Typography className="kanit-bold flex justify-center mb-7" variant="h2" color="blue-gray">
                                Sign In
                            </Typography>
                        </div>

                        <Input value={email} type="email" label="Email" size="lg" onChange={(e) => setEmail(e.target.value)}/>

                        <div className="m-5"></div>

                        <Input value={password} type="password" label="Password" size="lg" onChange={(e) => setPassword(e.target.value)}/>
                    </CardBody>

                    <CardFooter>
                        <div className="flex justify-center">
                            <Button className="kanit-regular bg-my-purple-light text-black" size="lg" onClick={handleIsOpen}>
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