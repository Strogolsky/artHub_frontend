import React, {useState} from "react";
import {Dialog, DialogBody, DialogFooter, DialogHeader, Typography} from "@material-tailwind/react";
import CrossIcon from "../Icons/CrossIcon";

const ChooseTags = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [chosenTags, setChosenTags] = useState([])
    const [searchTagText, setSearchTagText] = useState('');

    const handleIsOpen = () => setIsOpen(curr => !curr);
    const handleChosenTags = (newTag) => {
        if (newTag.length !== 0) {
            setChosenTags((curr) => [...curr, newTag]);
            setSearchTagText('');
        }
    }

    return (
        <>
            <button className="m-2 bg-my-pink hover:bg-my-pink-light active:bg-my-pink-dark font-regular py-2 px-4 rounded-large"
                    style={{ width: '384px', height: '40px' }}
                    onClick={handleIsOpen}>
                Tags
            </button>
            <Dialog open={isOpen} handler={handleIsOpen} size="md">
                <CrossIcon className="justify-self-start ml-3 mt-3 h-5 w-5" onClick={handleIsOpen} />

                <DialogHeader className="flex justify-center">
                    <Typography className="kanit-bold flex -ml-3 justify-center mb-3" variant="h2" color="blue-gray">
                        Choose tags
                    </Typography>
                </DialogHeader>

                <DialogBody>
                    <div className="flex justify-center pb-8">
                        <input type="text"
                               className="bg-my-light-grey py-2 px-4 rounded-large focus:outline-my-purple-light text-center"
                               placeholder="Search for tag"
                               value={searchTagText}
                               onChange={(e) => setSearchTagText(e.target.value)}
                               style={{ width: '60%', }}/>

                        <button onClick={() => handleChosenTags(searchTagText)}
                                className="kanit-regular ml-7 bg-my-purple-light rounded-large p-2 text-black">
                            Add tag
                        </button>
                    </div>

                    <div className="bg-my-light-grey rounded-large ml-6 mr-6" style={{height: '380px'}}>
                        <div className="rounded-large flex flex-wrap overflow-auto pb-3" style={{maxHeight: '380px'}}>

                            {chosenTags.map((tag, idx) =>
                                <div key={idx}
                                     className="kanit-regular text-black p-3 rounded-large ml-3 mt-3 bg-my-pink text-center w-auto"
                                     style={{height: 'fit-content'}}>
                                    {tag}
                                </div>
                            )}

                        </div>
                    </div>
                </DialogBody>

                <DialogFooter className="flex justify-center">
                    <button onClick={() => handleIsOpen()}
                            className="kanit-regular bg-my-purple-light rounded-large p-3 w-20 text-black">
                        Save
                    </button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default ChooseTags;