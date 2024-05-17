import {useNavigate} from "react-router-dom";
import {Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {createTags, getAllTags} from "../../api/TagAPI";
import NotFound from "../NotFound";
import {addPreferredTags, getUserAccount} from "../../api/AccountAPI";


const PreferredTags = () => {
    const navigate = useNavigate();

    const [userPreferredTags, setUserPreferredTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [searchTagText, setSearchTagText] = useState("");

    const [isError, setIsError] = useState(false);

    const handlePressKey = (event) => {
        if (event.key === 'Enter') {
            handleChosenTags(searchTagText)
        }
    }

    const handleChosenTags = (newTag) => {
        if (newTag.trim().length !== 0) {
            !selectedTags.includes(newTag) && setSelectedTags((curr) => [...curr, newTag.trim()]);
            setSearchTagText('');
        }
    }

    const removeSelectedTag = (tagToRemove) => {
        setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
    };

    const addSelectedTag = (tagToAdd) => {
        setSelectedTags((curr) => [...curr, tagToAdd]);
    }

    useEffect(() => {
        getAllTags()
            .then(data => setAllTags(data))
            .catch(error => {
                console.error("Error fetching tags: ", error);
                setIsError(true);
            })

        getUserAccount()
            .then(data => setUserPreferredTags(data.preferredTags))
            .catch(error => {
                console.error("Error fetching account: ", error);
                setIsError(true);
            })
    }, []);


    const savePreferredTags = async () => {
        const tagIds = allTags
            .filter(tag => selectedTags.includes(tag.name))
            .map(tag => tag.id);

        const tagsToCreate = selectedTags.filter((tag) => {
            const found = allTags.find(checkTag => checkTag.name === tag);
            return !found;
        });

        const tagsJSON = tagsToCreate.map(name => ({name}));
        const createdTags = await createTags(JSON.stringify(tagsJSON));

        createdTags.map(tag => tagIds.push(tag.id));

        try {
            await addPreferredTags(JSON.stringify(tagIds));
            navigate('/');
        } catch (error) {
            console.error("Error saving preferred tags: ", error);
            setIsError(true);
        }
    }

    if (isError) return <NotFound />

    return (
        <div>
            <div>
                <button className="m-3 bg-my-purple hover:bg-my-purple-light py-2 px-6 rounded-large text-base active:bg-my-purple-dark"
                        style={{fontSize: '16px'}}
                        onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>

            <Typography className="kanit-bold flex -ml-3 justify-center mb-3" variant="h1" color="blue-gray">
                Choose preferred tags
            </Typography>

            <div className="flex justify-center pb-8">
                <input type="text" className="bg-my-light-grey py-2 px-4 rounded-large focus:outline-my-purple-light text-center" placeholder="Search for tag"
                    value={searchTagText}
                    onChange={(e) => setSearchTagText(e.target.value)}
                    style={{width: '30%'}}
                    onKeyDown={handlePressKey}
                />

                <button className="kanit-regular ml-7 bg-my-purple-light rounded-large p-2 text-black"
                        onClick={() => handleChosenTags(searchTagText)}>
                    Add tag
                </button>
            </div>

            <div className="flex justify-center">
                <div className="items-center bg-my-light-grey rounded-large h-96" style={{width: "25%"}}>
                    <h3 className="text-center text-2xl m-1 mb-2">Selected tags</h3>
                    <div className="rounded-large flex flex-wrap overflow-auto pb-3" style={{}}>

                        {userPreferredTags.map((tag) =>
                            <div key={tag.id}
                                 className="kanit-regular text-black p-3 rounded-large ml-3 mt-3 bg-my-purple-dark text-center w-auto"
                                 style={{height: 'fit-content'}}>
                                    {tag.name}
                            </div>
                        )}

                        {selectedTags.map((tag, idx) =>
                            <div key={idx}
                                 className="hover:cursor-pointer kanit-regular text-black p-3 rounded-large ml-3 mt-3 bg-my-pink-dark text-center w-auto"
                                 style={{height: 'fit-content'}}
                                 onClick={() => removeSelectedTag(tag)}>
                                {tag}
                            </div>
                        )}

                    </div>
                </div>

                <div className="ml-7 items-center bg-my-light-grey rounded-large h-96" style={{width: "25%"}}>
                    <h3 className="text-center text-2xl m-1 mb-2">Tags to select</h3>
                    <div className="rounded-large flex flex-wrap overflow-auto pb-3">
                        {allTags.map((tag) =>
                            (!selectedTags.includes(tag.name) && !userPreferredTags.map(tag => tag.name).includes(tag.name) &&
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

            </div>


            <div className="flex flex-col items-center justify-center">
                <button className="my-1 mx-4 bg-my-purple-light py-3 mt-6 px-5 rounded-large text-base"
                        style={{fontSize: '24px'}}
                        onClick={savePreferredTags}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default PreferredTags;