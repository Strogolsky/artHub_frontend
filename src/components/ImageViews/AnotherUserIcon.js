import Alien from "../../resources/Alien.svg"
import { useNavigate } from "react-router-dom";

const AnotherUserIcon = () => {
    const navigate = useNavigate();

    return (
        <img className="object-cover absolute"
            src={Alien}
            alt="Another user icon"
            style={{
                top: '60%',
                left: '47%',
                transform: 'translate(-50%, -50%)',
                width: '200%',
                height: '200%',
            }} />
    )
}

export default AnotherUserIcon;