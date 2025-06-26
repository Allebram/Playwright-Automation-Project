import * as NodeFetch from "node-fetch"

export const getLoginToken = async (username, password) => {
    const response = await NodeFetch("http://localhost:2221/api/login", {
        method: "POST",
        body: JSON.stringify({ "username": username, "password": password }),
    })
    // For Debugging
    // console.log("Login body sent:", { username, password })
    console.log("Response status:", response.status)
    const responseText = await response.text()
    // For Debugging
    // console.log("Response body:", responseText)

    if (response.status !== 200) {
        throw new Error("An error occured trying to retrieve the login token")
    }

    const body = JSON.parse(responseText)
    return body.token
}