import { NextResponse } from "next/server";
import { getUser } from "./getUser";
import { User } from "./types";
import bcrypt from "bcryptjs"
import jwt, { Secret } from 'jsonwebtoken'

async function checkUser(userEmail: string, password: string) {
    console.log("Checking user in database.")
        const userReq: User = await getUser(userEmail)

        if (!bcrypt.compare(password, userReq.password)) throw new Error("Incorrect password.")

        return userReq
}

export async function authUser(userEmail: string, password: string) {
    console.log(userEmail)
    const user: User = await checkUser(userEmail, password)
    const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1h"
    })
    return NextResponse.json({ token })
}