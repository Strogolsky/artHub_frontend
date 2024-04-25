import { Button, Card, CardBody, CardFooter, Dialog, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import CrossIcon from "../Icons/CrossIcon";

const SignIn = ({ isOpen, setIsOpen, swapOpen }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleIsOpen = () => setIsOpen((cur) => !cur);

    return (
        <div>
            <Button className="kanit-regular bg-my-purple hover:bg-my-purple-light text-black" style={{ textTransform: 'initial', fontSize: '16px' }} onClick={handleIsOpen}>Sign In</Button>
            <Dialog size="xs" open={isOpen} handler={handleIsOpen} className="bg-transparent shadow-none">
                <Card className="flex flex-col gap-4">
                    <CardBody>
                        <div className="flex flex-col">
                            <CrossIcon className="mr-3 h-5 w-5" onClick={handleIsOpen} />
                            <Typography className="kanit-bold flex justify-center mb-7" variant="h2" color="blue-gray">
                                Sign In
                            </Typography>
                        </div>

                        <Input value={email} type="email" label="Email" size="lg" onChange={(e) => setEmail(e.target.value)} />

                        <div className="m-5"></div>

                        <Input value={password} type="password" label="Password" size="lg" onChange={(e) => setPassword(e.target.value)} />
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
