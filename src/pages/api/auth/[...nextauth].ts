import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../prismaclient/prismamain";
import handleLogin from "../login";
import { NextApiRequest } from "next";
import { loginUser } from "../../../../prismaclient/dbtypes";

export const authOptions: NextAuthOptions = {
    //@ts-ignore
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
          name: "credentials",
          credentials: {
            username: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
            password: { label: "Password", type: "password" }
          },
          //@ts-ignore
          async authorize(credentials, req) {
      
            const data: loginUser = {
                //@ts-ignore
                email: credentials.username,
                //@ts-ignore
                password: credentials.password
            }
        
            const findUser = async (user: loginUser) => {
                const findUser = await prisma.user.findUnique({
                    where: {
                        email: user.email.toLowerCase()
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
                return null
            }

            const user = await checkHash()

            console.log(user)

            if (user) {

              return newUser
            } else {

              return null
            }
          }
        })
      ],
      session: {
        strategy: 'jwt',
      },
      secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)