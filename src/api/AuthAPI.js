const AUTH_URL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/auth`

const signIn = async (credentials) => {
    const url = `${AUTH_URL}/signin`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: credentials
    });

    if (!response.ok) {
        throw new Error("500 Internal Server Error");
    }

    return await response.json();
}


export { signIn };