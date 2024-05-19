import Cookies from "js-cookie";

const POST_URL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/posts`

const getAllPosts = async () => {
    const response = await fetch(POST_URL);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("404 Not Found");
        }
        throw new Error("500 Internal Server Error");
    }

    return await response.json();
}

const getPostById = async (postId) => {
    const url = `${POST_URL}/${postId}`;
    const jwt = Cookies.get('jwt');

    try {
        const response = await fetch(url, { headers: { 'Authorization': `Bearer ${jwt}` } });
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

const getPostsByPatronId = async (userId) => {
    const url = `${POST_URL}/user/${userId}`;
    const jwt = Cookies.get('jwt');

    try {
        const response = await fetch(url, { headers: { 'Authorization': `Bearer ${jwt}` } });
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

const b64toBlob = (b64Data) => {
    const byteChars = atob(b64Data);
    const byteNums = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
        byteNums[i] = byteChars.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNums);
    return new Blob([byteArray]);
}

const updatePostById = async (postId, postData) => {
    const url = `${POST_URL}/${postId}`;
    const jwt = Cookies.get('jwt');

    if (!jwt)
        throw new Error("403 Forbidden");

    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('description', postData.description);
    formData.append('tagsId', postData.tagsId.join(','));
    formData.append('file', b64toBlob(postData.file));

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${jwt}`,
            },
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
}

const deletePostById = async (postId) => {
    const url = `${POST_URL}/${postId}`;
    const jwt = Cookies.get('jwt');

    if (!jwt)
        throw new Error("403 Forbidden");

    const response = await fetch(url, { method: 'DELETE', headers: { 'Authorization': `Bearer ${jwt}` } });
    if (!response.ok) {
        if (response.status === 403) {
            throw new Error("403 Forbidden");
        }
        throw new Error("505 Internal Server Error");
    }

    return "Successful";
}

const createPost = async (postData) => {
    const jwt = Cookies.get('jwt');

    if (!jwt)
        throw new Error("403 Forbidden");

    const tags = (postData ? postData.selectedTags.join(',') : '');

    const formData = new FormData();
    formData.append('title', postData.postTitle);
    formData.append('description', postData.postDescription);
    formData.append('tagsId', tags);
    formData.append('file', postData.selectedFile);

    const response = await fetch(POST_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwt}`
        },
        body: formData,
    });

    if (!response.ok) {
        if (response.status === 403)
            throw new Error("403 Forbidden");
        throw new Error("505 Internal Server Error");
    }

    return await response.json();
}

export { getPostById, updatePostById, deletePostById, createPost, getAllPosts, getPostsByPatronId };
