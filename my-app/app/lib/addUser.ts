import { getUser } from "./getUser"
import bcrypt from "bcryptjs"
import { dbUser } from "./types"
import { addNewUser } from "./addNewUser"

export async function addUser(userEmail: string, password: string) {
    const hashPass = await bcrypt.hash(password, 10)
    const user: dbUser = {
        username: "username",
        email: userEmail,
        password: hashPass,
        enabled: false,
    }

    try {
        const existingUser = await getUser(userEmail)

        throw new Error("Email already in use.")
    } catch (error) {

    }

    try {
        return await addNewUser(user)
    } catch (error) {
    console.log(error)
    throw new Error("error") 
    }
}