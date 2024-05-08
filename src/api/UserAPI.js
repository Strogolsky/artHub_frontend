import Cookies from "js-cookie";

const USER_URL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/users`

const getUserAccount = async () => {
    const url = `${USER_URL}/account`;
    const jwt = Cookies.get('jwt');

    if (jwt.empty())
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

export { getUserAccount };