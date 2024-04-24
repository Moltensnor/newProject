import { dbUser } from "./types";

export async function addNewUser(user: dbUser) {
    const newUserReq = await fetch(`http://localhost:8080/api/v1/users`, {
        method: "POST",
        cache: 'no-store',
        headers: new Headers({
            'Authorization': 'Basic '+btoa('admin:password'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user),
    })

    return await newUserReq.json()
}