import Cookies from "js-cookie";

const RECOMMENDATION_URL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/recommendations`

const getRecommendedPosts = async (page, size, isGuest) => {
    const url = `${RECOMMENDATION_URL}/${isGuest ? 'guest' : 'posts'}?page=${page}&size=${size}`;

    const options = {};
    if (!isGuest) {
        const jwt = Cookies.get('jwt');
        options.headers = {
            'Authorization': `Bearer ${jwt}`
        };
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        if (response.status === 403)
            throw new Error("403 Forbidden");

        throw new Error("500 Internal Server Error");
    }

    return await response.json();
}

export {getRecommendedPosts};