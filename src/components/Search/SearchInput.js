import {useState} from "react";
import {useNavigate} from "react-router-dom";

const SearchInput = ({initSearchText}) => {
    const [searchText, setSearchText] = useState(initSearchText || "");
    const navigate = useNavigate();

    const handlePressKey = (event) => {
        if (event.key === 'Enter') {
            navigate(`/search?s=${encodeURIComponent(searchText)}`, {state: {searchText}});
        }
    }

    return (
        <div className="flex-grow text-center mx-auto">
            <input type="text"
                   className="m-2 bg-my-light-grey h-10 w-72 py-2 px-4 rounded-large focus:outline-my-purple-light text-center"
                   placeholder="Search"
                   value={searchText}
                   onChange={(e) => setSearchText(e.target.value)}
                   onKeyDown={handlePressKey}
                   style={{ width: '700px', height: '44px'}}/>
        </div>
    )
}

export default SearchInput;