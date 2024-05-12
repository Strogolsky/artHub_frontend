import {useLocation, useNavigate} from "react-router-dom";
import MainPage from "../Main/MainPage";
import {searchPostsByPrompt} from "../../api/SearchAPI";


const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParam = new URLSearchParams(location.search).get('s');

    if (searchParam === '') {
        navigate('/');
    }

    return (
        <MainPage search={searchParam} fetchFunc={() => searchPostsByPrompt(searchParam)} />
    )
}

export default SearchPage;