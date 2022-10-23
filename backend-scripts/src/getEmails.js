import { config } from "dotenv";
import { default as fetch } from "node-fetch";
import fs from "fs"

const track = "(AC) Desktop C++ Applications"
const status = "pending"

config()
const phone = process.env.PHONE
const pass = process.env.PASS

const exportEmails = async () => {
    const signInData = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify({
            phone: phone,
            password: pass
        }),
        headers: {'Content-Type': 'application/json'}
    })

    const signInBody = await signInData.json()
    console.log("Sign In Status", signInBody)
    const token = signInBody.jwtToken.token

    const data = await fetch("http://localhost:4000/memberApplications", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    console.log("Fetch Data Status: ", data.status)
    const body = await data.json()

    if(data.status === 200) {
        const users = body.filter((user) => user.status === status && user.track === track)
        const emails = users.map((item) => item.email.trim())
        const file = fs.createWriteStream("emails.txt")
        emails.forEach((email) => file.write(email + "\n"))
        console.log(emails)
    } else {
        console.log("failed to fetch", body)
    }
    // const emails = body.map(item => item.email)
    // console.log(emails)
}

exportEmails()
