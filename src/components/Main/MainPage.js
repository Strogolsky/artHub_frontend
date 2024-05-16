import SearchInput from "../Search/SearchInput";
import InfiniteFeed from "./InfiniteFeed";
import Authorisation from "../Authorisation";
import Logo from "../Logo";


const MainPage = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <Logo />

                <SearchInput />

                <Authorisation />
            </div>

            <InfiniteFeed />
        </div>
    )
}

export default MainPage;
