import { useNavigate } from "react-router-dom";
import SearchInput from "../Search/SearchInput";
import InfiniteFeed from "./InfiniteFeed";
import Authorisation from "../Authorisation";
import ArtHubLogo from "../../resources/ArtHubLogo.svg"


const MainPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="">
                    <div className="relative"
                        style={{ width: '100px', height: '50px', borderRadius: '15%', overflow: 'hidden' }}
                        onClick={() => navigate('/')}>
                        <img
                            src={ArtHubLogo}
                            alt="ArtHub logo"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </div>

                </div>

                <SearchInput />

                <Authorisation />
            </div>

            <InfiniteFeed />
        </div>
    )
}

export default MainPage;
