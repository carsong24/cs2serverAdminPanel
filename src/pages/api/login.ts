import { NextApiRequest, NextApiResponse } from 'next';
import { User, loginUser } from '../../../prismaclient/dbtypes';
import prisma from '../../../prismaclient/prismamain'



export default async function handleLogin(req: NextApiRequest, res: NextApiResponse) {

    const query = req.query as loginUser

    const data: loginUser = {
        email: query.email,
        password: query.password
    }

    const findUser = async (user: loginUser) => {
        console.log(user)
        const findUser = await prisma.user.findUnique({
            where: {
                email: user?.email.toLowerCase()
            }
        })
        return findUser
    }

    const newUser = await findUser(data)

    const checkHash = async () => {
        const bcrypt = require('bcrypt')
        return bcrypt.compare(data.password, newUser?.password).then(function(result: boolean) {
            return result
        })
    }

    if (!newUser) {
        return res.status(404).json({success: false, response: `Could not find an account with the email ${data.email}`})
    }

    try {

        let response = {}
    if (await checkHash()) {
        const user = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
        }
        response = {success: true, response: `Logged in as ${user.email}`, user: user}
    } else if (!await checkHash()) {
        response = {success: false, response: "Incorrect Password"}
    }

    return res.status(await checkHash() ? 200 : 404).json(response)

    } catch (err) {

        console.log("Error creating user", err)

        return res.status(500).json({success: false, response: err})

    }
    

} 