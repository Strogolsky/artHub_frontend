import SearchInput from "../Search/SearchInput";
import InfiniteFeed from "./InfiniteFeed";
import Authorisation from "../Authorisation";
import Logo from "../ImageViews/Logo";
import {useState} from "react";
import Loading from "../Loading";
import AllPosts from "./AllPosts";


const MainPage = () => {
    const [isAuthed, setIsAuthed] = useState(undefined);

    return (
        <div>
            <div className="flex justify-between items-center">
                <Logo />

                <SearchInput />

                <Authorisation setIsAuthedParent={setIsAuthed} />
            </div>

            {isAuthed === undefined
                ? <Loading />
                : (isAuthed === true
                    ? <InfiniteFeed />
                    : <AllPosts />)
            }
        </div>
    )
}

export default MainPage;
