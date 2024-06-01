import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="container text-center mx-auto mt-24">
            <h1 style={{ fontWeight: 900, fontSize: '128px' }}>404</h1>
            <p style={{ fontWeight: 700, fontSize: '32px' }}>Oops... You've lost in space</p>
            <button className="mt-3 kanit-regular bg-my-purple hover:bg-my-purple-light active:bg-my-purple-dark rounded-large p-3"
                onClick={() => navigate('/')}>
                Go home
            </button>
        </div>
    )
}

export default NotFound;