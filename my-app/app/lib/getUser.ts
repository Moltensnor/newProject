export async function getUser(userEmail: string) {
    console.log("Getting user with email: " + userEmail + " from the database")
    const existingUserReq = await fetch(`http://localhost:8080/api/v1/users/email/${userEmail}`, {
        method: "GET",
        cache: 'no-store',
        headers: new Headers({
            'Authorization': 'Basic '+btoa('admin:password'), 
        }),
    })

    console.log(existingUserReq)

    if(!existingUserReq.ok) return new Error("There is no user with this email.")

    const existingUser = await existingUserReq.json()
    console.log("USER: " + existingUser)
    return existingUser[0]
}