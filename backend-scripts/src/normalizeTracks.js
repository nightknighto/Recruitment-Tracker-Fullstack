import { config } from "dotenv";
import { default as fetch } from "node-fetch";

config()
const port = process.env.PORT
const url = `http://localhost:${port}/memberApplications`

main()

// Normalization
// each element represents [from, to]
const normalization = [
    ["Embedded", "(AC) Embedded Systems"],
    ["Embedded ", "(AC) Embedded Systems"],
    ["Web", "(AC) Web Development"],
    ["Desktop C++", "(AC) Desktop C++ Applications"]
]

async function main() {
    const data = await fetch(url)
    const body = await data.json()
    console.log("fetched")

    const parsed = body
    console.log("parsed")

    normalization.forEach(([from, to]) => {
        parsed.forEach(async (item) => {
            if (item.track === from) {
                const body = JSON.stringify({
                    _id: item._id,
                    data: {
                        track: to
                    }
                })
                console.log(body)
                const results = await fetch(url, {
                    method: "PUT",
                    body: body,
                    headers: {'Content-Type': 'application/json'}
                })
                console.log(await results.json())
            }
        })
    })
}

