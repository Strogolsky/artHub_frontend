const POST_URL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/posts`

const getPostById = async (postId) => {
    const url = `${POST_URL}/${postId}`;
    try {
        const response = await fetch(url, {headers: {'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`}});
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

    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('description', postData.description);
    formData.append('tagsId', postData.tagsId.join(','));
    formData.append('file', b64toBlob(postData.file));

    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: formData
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

export { getPostById, updatePostById };
