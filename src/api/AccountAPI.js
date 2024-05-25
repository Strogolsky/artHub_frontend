import Cookies from "js-cookie";

const ACCOUNT_URL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/users`

const getUserAccount = async () => {
    const url = `${ACCOUNT_URL}/account`;
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

const deleteUserAccount = async () => {
    const url = `${ACCOUNT_URL}/delete`;
    const jwt = Cookies.get('jwt');

    if (!jwt)
        throw new Error("403 Forbidden");

    const response = await fetch(url, {
        headers: {'Authorization': `Bearer ${jwt}`},
        method: 'DELETE'
    });

    if (!response.ok) {
        if (response.status === 403) {
            throw new Error("403 Forbidden");
        }
        throw new Error("500 Internal Server Error");
    }

    Cookies.remove('jwt');
    return "Successful";
}

const addPreferredTags = async (preferredTags) => {
    const url = `${ACCOUNT_URL}/tags`;
    const jwt = Cookies.get('jwt');

    if (!jwt)
        throw new Error("403 Forbidden");

    const response = await fetch(url, {
        method: 'POST',
        body: preferredTags,
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        },
    })

    if (!response.ok) {
        throw new Error("500 Internal Server Error");
    }

    return await response.json();
}

const updateUserAccount = async (username, email) => {
    const url = `${ACCOUNT_URL}`;
    const jwt = Cookies.get('jwt');

    if (!jwt)
        throw new Error("403 Forbidden");

    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({username, email}),
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        if (response.status === 409) {
            const responseText = await response.text();

            if (responseText.includes("username")) {
                throw new Error("A user with this username already exists");
            } else if (responseText.includes("email")) {
                throw new Error("A user with this email already exists");
            }
        }
        throw new Error("500 Internal Server Error");
    }

    return await response.json();
}

export { getUserAccount, deleteUserAccount, addPreferredTags, updateUserAccount };