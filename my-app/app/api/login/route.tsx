import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../lib/getUser";
import { User } from "../../lib/types";
import bcrypt from "bcryptjs"
import jwt, { Secret } from 'jsonwebtoken'

async function checkUser(userEmail: string, password: string) {
    console.log("Checking user in database.")
        const userReq: User = await getUser(userEmail)

        if (!bcrypt.compare(password, userReq.password)) throw new Error("Incorrect password.")

        return userReq
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    let { username, password} = body
    const user: User = await checkUser(username, password)
    console.log(process.env.JWT_SECRET)
    const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1m"
    })
    return NextResponse.json({ token })
}