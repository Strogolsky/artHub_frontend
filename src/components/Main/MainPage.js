import SearchInput from "../Search/SearchInput";
import InfiniteFeed from "./InfiniteFeed";
import Authorisation from "../Authorisation";


const MainPage = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="pl-2 flex-none">
                    <img alt="ArtHub logo" />
                </div>

                <SearchInput />

                <Authorisation />
            </div>

            <InfiniteFeed />
        </div>
    )
}

export default MainPage;
