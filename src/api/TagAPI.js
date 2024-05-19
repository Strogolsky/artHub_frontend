import Cookies from "js-cookie";

const TAG_URL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/tags`

const getAllTags = async () => {
    const jwt = Cookies.get('jwt');

    const options = {};
    if (jwt)
        options.headers = {'Authorization': `Bearer ${jwt}`}

    const response = await fetch(TAG_URL, options);

    if (!response.ok) {
        if (response.status === 403) {
            throw new Error("403 Forbidden");
        }
        throw new Error("500 Internal Server Error");
    }

    return await response.json();
}

const createTags = async (tagsToCreate) => {
    const jwt = Cookies.get('jwt');

    if (!jwt)
        throw new Error("403 Forbidden");

    const response = await fetch(TAG_URL, {
        method: 'POST',
        body: tagsToCreate,
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        if (response.status === 403) {
            throw new Error("403 Forbidden");
        }
        throw new Error("500 Internal Server Error");
    }

    return await response.json();
}

export { getAllTags, createTags };