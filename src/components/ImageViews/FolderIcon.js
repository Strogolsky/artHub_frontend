import Icon from "../../resources/FolderIcon.svg"

const FolderIcon = () => {
    return (

        <img className="object-cover absolute"
            src={Icon}
            alt="User icon"
            style={{
                top: '55%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '220%',
                height: '220%',
            }} />
    )
}

export default FolderIcon;