import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../prismaclient/dbtypes';
import prisma from '../../../prismaclient/prismamain'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

type dberror = {
    code: string
    type: {modelName: string, target: string[]}
    response: any
}

export default async function CreateUser(req: NextApiRequest, res: NextApiResponse) {

    const data: User = req.body

    const addUser = async (user: any) => {
        console.log(user)
        try {
            const createUser = await prisma.user.create({data: {
                name: user.name,
                email: user.email,
                //@ts-ignore
                posts: [],
                password: user
            }})
            console.log(createUser)
            return {code: "", type: [""], response: createUser} as unknown
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
            return {code: e.code, type: e?.meta, response: "fail"} as unknown
            }
        }
        
    }

    const hash = async () => {
        const bcrypt = require('bcrypt')
        const saltRounds = 10
        let test
      return bcrypt.hash(data.password, saltRounds, async function(err: any, hash: string) {
            if (err) {
                console.log(err)
                return {success: false, message: "problem generating hash"}
            } else {
                const newUser = {
                    name: data.name,
                    email: data.email.toLowerCase(),
                    posts: [],
                    password: hash
                }
        
                test = await addUser(newUser) as dberror
                console.log(test, "HERE")
                if (test?.code == "P2002") {
                    console.log(test?.code)
                    return {success: false, message: "Email already in use."}
                }
            }
        })
    }


    try {

        const createUser = await hash()

        return res.status(200).json({success: true, response: createUser})

    } catch (err) {

        console.log("Error creating user", err)

        return res.status(500).json({success: false, response: err})

    }
    

} 