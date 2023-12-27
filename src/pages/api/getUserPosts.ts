import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prismaclient/prismamain";
import { getToken } from "next-auth/jwt";




export default async function getUserPosts(req: NextApiRequest, res: NextApiResponse) {

    try {

        const token = await getToken({ req })
        if (token) {
            console.log("JSON Web Token", token.email)
            const data = await prisma.user.findUnique({
                where: {
                    //@ts-ignore
                    email: token.email
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    posts: true
                }
            })
    
            return res.status(200).json({message: data})
        } else {
          // Not Signed in
          return res.status(401).json({message: "not authorized"})
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({message: "no", err: err})
    }
}