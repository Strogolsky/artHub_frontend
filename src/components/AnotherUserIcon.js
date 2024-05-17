import Alien from "../resources/Alien.svg"
import { useNavigate } from "react-router-dom";

const Logo = () => {
    const navigate = useNavigate();

    return (
        <div className="relative overflow-hidden cursor-pointer"
            onClick={() => navigate('/')}
            style={{
                width: '80px',
                height: '50px',
                borderRadius: '15%'
            }}>

            <img className="object-cover absolute"
                src={Alien}
                alt="Another user icon"
                style={{
                    top: '55%',
                    left: '23%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                }} />
        </div>
    )
}

export default Logo;