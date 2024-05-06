import Cookies from "js-cookie";

const POST_URL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/posts`
const getPostById = async (postId) => {
    const url = `${POST_URL}/${postId}`;
    const jwt = Cookies.get('jwt');

    try {
        const response = await fetch(url, {headers: {'Authorization': `Bearer ${jwt}`}});
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('404 Not Found');
            }
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default getPostById;