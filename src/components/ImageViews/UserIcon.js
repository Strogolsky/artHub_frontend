import Cosmonaut from "../../resources/Cosmonaut.svg"

const UserIcon = () => {
    return (

        <img className="object-cover absolute"
            src={Cosmonaut}
            alt="User icon"
            style={{
                top: '60%',
                left: '48%',
                transform: 'translate(-50%, -50%)',
                width: '220%',
                height: '220%',
            }} />
    )
}

export default UserIcon;