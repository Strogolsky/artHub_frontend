import Cookies from "js-cookie";

const FOLDER_URL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/folders`

const getUserFolders = async () => {
    const url = `${FOLDER_URL}/user`;
    const jwt = Cookies.get('jwt');

    if (!jwt)
        throw new Error("403 Forbidden");

    const response = await fetch(url, {headers: {'Authorization': `Bearer ${jwt}`}});
    if (!response.ok) {
        if (response.status === 403) {
            throw new Error("403 Forbidden");
        }
        throw new Error("505 Internal Server Error");
    }
    return await response.json();
}

const getFolderById = async(folderId) => {
    const url = `${FOLDER_URL}/${folderId}`;
    const jwt = Cookies.get('jwt');

    if (!jwt)
        throw new Error("403 Forbidden");

    const response = await fetch(url, {headers: {'Authorization': `Bearer ${jwt}`}});
    if (!response.ok) {
        if (response.status === 403) {
            throw new Error("403 Forbidden");
        }
        throw new Error("505 Internal Server Error");
    }
    return await response.json();
}

export { getUserFolders, getFolderById };