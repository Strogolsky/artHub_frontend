import ArtHubLogo from "../../resources/ArtHubLogo.svg";
import { useNavigate } from "react-router-dom";

const Logo = () => {
    const navigate = useNavigate();

    return (
        <div className="relative overflow-hidden cursor-pointer"
            onClick={() => navigate('/')}
            style={{
                width: '100px',
                height: '50px',
                borderRadius: '15%'
            }}>

            <img className="object-cover absolute"
                src={ArtHubLogo}
                alt="ArtHub logo"
                style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                }} />
        </div>
    )
}

export default Logo;