import { useNavigate } from "react-router-dom";

const Loading = () => {
    const navigate = useNavigate();

    return (
        <div className="container text-center mx-auto mt-24">
            <h1 style={{ fontWeight: 900, fontSize: '128px' }}>Loading...</h1>
            <p style={{ fontWeight: 700, fontSize: '32px' }}>Wait for the data to load.</p>
        </div>
    )
}

export default Loading;