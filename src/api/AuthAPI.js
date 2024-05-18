const AUTH_URL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/auth`

const signIn = async (credentials) => {
    const url = `${AUTH_URL}/login`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: credentials
    });

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("Invalid login or password");
        } else {
            throw new Error("500 Internal Server Error");
        }
    }

    return await response.json();
}

const signUp = async (credentials) => {
    const url = `${AUTH_URL}/signup`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: credentials
    })

    if (!response.ok) {
        if (response.status === 409) {
            throw new Error("A user with this username or email already exists");
        } else {
            throw new Error("500 Internal Server Error");
        }
    }

    return await response.json();
}


export { signIn, signUp };