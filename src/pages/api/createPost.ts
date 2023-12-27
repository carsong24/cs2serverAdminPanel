import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../prismaclient/dbtypes';
import prisma from '../../../prismaclient/prismamain'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

type dberror = {
    code: string
    type: {modelName: string, target: string[]}
    response: any
}

export default async function CreatePost(req: NextApiRequest, res: NextApiResponse) {

    const data: User = req.body

    try {

        return res.status(200).json({success: true})

    } catch (err) {

        console.log("Error creating post", err)

        return res.status(500).json({success: false, response: err})

    }
    

} 