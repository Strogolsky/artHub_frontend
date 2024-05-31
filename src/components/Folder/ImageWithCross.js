import CrossIcon from "../Icons/CrossIcon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ImageWithCross = ({ post, handleDeletePostFromFolder, block }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img style={{ width: '200px', height: '150px' }}
                className="object-cover rounded-large"
                alt={post.title}
                src={`data:image;base64,${post.image.data}`}
                onClick={() => navigate(`/post/${post.id}`)}
            />

            {isHovered && !block &&
                <CrossIcon className="absolute cursor-pointer top-2 right-2 w-6 h-6 bg-my-light-grey bg-opacity-70 hover:bg-opacity-100"
                    style={{ "borderRadius": "50%" }}
                    onClick={handleDeletePostFromFolder}
                />
            }
        </div>
    )
}

export default ImageWithCross;