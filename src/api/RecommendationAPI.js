import Cookies from "js-cookie";

const RECOMMENDATION_URL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/recommendations/posts`

const getRecommendedPosts = async (page, size) => {
    const url = `${RECOMMENDATION_URL}?page=${page}&size=${size}`;
    const jwt = Cookies.get('jwt');

    if (!jwt)
        throw new Error("403 Forbidden");

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    });

    if (!response.ok) {
        if (response.status === 403)
            throw new Error("403 Forbidden");

        throw new Error("500 Internal Server Error");
    }

    return await response.json();
}

export {getRecommendedPosts};