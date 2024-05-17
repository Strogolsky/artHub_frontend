import {useEffect, useState} from "react";
import {Dialog, DialogBody, DialogFooter, DialogHeader, select, Typography} from "@material-tailwind/react";
import CrossIcon from "../Icons/CrossIcon";
import {createTags, getAllTags} from "../../api/TagAPI";

const ChooseTags = ({tags, setTags, buttonText, buttonClasses, buttonSize}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTags, setSelectedTags] = useState([])
    const [searchTagText, setSearchTagText] = useState('');
    const [allTags, setAllTags] = useState([]);
    const [isError, setIsError] = useState(false);

    const handleIsOpen = () => setIsOpen(curr => !curr);
    const handleChosenTags = (newTag) => {
        if (newTag.trim().length !== 0) {
            setSelectedTags((curr) => [...curr, newTag.trim()]);
            setSearchTagText('');
        }
    }

    useEffect(() => {
        getAllTags()
            .then((data) => setAllTags(data))
            .catch((error) => {
                console.log("Error fetching tags: ", error);
                setIsError(true);
            });

        allTags
            .filter(tag => tags.includes(tag.id))
            .map(tag =>
                !selectedTags.includes(tag.name) &&
                setSelectedTags(curr => [...curr, tag.name]));

    }, [isOpen]);

    const removeSelectedTag = (tagToRemove) => {
        setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
    };

    const addSelectedTag = (tagToAdd) => {
        setSelectedTags((curr) => [...curr, tagToAdd]);
    }

    const handleSavingTags = async () => {
        const tagsIds = allTags
            .filter(tag => selectedTags.includes(tag.name))
            .map(tag => tag.id);

        const tagsToCreate = selectedTags.filter((tag) => {
            const found = allTags.find(checkTag => checkTag.name === tag);
            return !found;
        });

        const tagsJSON = tagsToCreate.map(name => ({name}));
        const createdTags = await createTags(JSON.stringify(tagsJSON));

        createdTags.map(tag => tagsIds.push(tag.id));

        setTags(tagsIds);
        handleIsOpen();
    }


    const btnClasses = buttonClasses || "m-2 bg-my-pink hover:bg-my-pink-light active:bg-my-pink-dark font-regular py-2 px-4 rounded-large";
    const btnSize = buttonSize || {width: '384px', height: '40px'};

    const handlePressKey = (event) => {
        if (event.key === 'Enter') {
            handleChosenTags(searchTagText)
        }
    }

    return (
        <>
            <button className={btnClasses} style={btnSize} onClick={handleIsOpen}>
                {buttonText}
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
                               style={{ width: '60%', }}
                               onKeyDown={handlePressKey}
                        />

                        <button onClick={() => handleChosenTags(searchTagText)}
                                className="kanit-regular ml-7 bg-my-purple-light rounded-large p-2 text-black">
                            Add tag
                        </button>
                    </div>

                    <div className="bg-my-light-grey rounded-large ml-6 mr-6" style={{height: '380px'}}>
                        <div className="rounded-large flex flex-wrap overflow-auto pb-3" style={{maxHeight: '380px'}}>

                            {selectedTags.map((tag, idx) =>
                                <div key={idx}
                                     className="hover:cursor-pointer kanit-regular text-black p-3 rounded-large ml-3 mt-3 bg-my-pink-dark text-center w-auto"
                                     style={{height: 'fit-content'}}
                                     onClick={() => removeSelectedTag(tag)}>
                                    {tag}
                                </div>
                            )}

                            {allTags.map((tag) =>
                                (!selectedTags.includes(tag.name) &&
                                    <div key={tag.id}
                                         className="hover:cursor-pointer kanit-regular text-black p-3 rounded-large ml-3 mt-3 bg-my-pink text-center w-auto"
                                         style={{height: 'fit-content'}}
                                         onClick={() => addSelectedTag(tag.name)}>
                                        {tag.name}
                                    </div>
                                )
                            )}

                        </div>
                    </div>
                </DialogBody>

                <DialogFooter className="flex justify-center">
                    <button className="kanit-regular bg-my-purple-light rounded-large p-3 w-20 text-black"
                            onClick={handleSavingTags}>
                        Save
                    </button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default ChooseTags;