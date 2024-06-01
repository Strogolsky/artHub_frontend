import { useNavigate } from "react-router-dom";

const PostsSection = ({ posts }) => {
    const navigate = useNavigate();

    return (
        <div className="mt-14 mb-10 flex justify-center">
            <div className="text-center grid grid-cols-1 items-center justify-center md:grid-cols-2 lg:grid-cols-3">

                {posts.map((post, idx) => (
                    <div key={idx} className="m-6" style={{ width: '310px', height: '400px' }}>
                        <div className="rounded-large flex justify-center items-center" style={{
                            width: '300px',
                            height: '385px'
                        }}>
                            <img key={post.id}
                                className="object-cover rounded-large transition-transform duration-300 hover:scale-95"
                                alt={post.title} src={`data:image;base64,${post.image.data}`}
                                onClick={() => navigate(`/post/${post.id}`)} />
                        </div>
                        <p className="m-1">{post.title}</p>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default PostsSection;