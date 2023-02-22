import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {

        const session = await getServerSession(req, res, authOptions);

        if (!session) {

            return res.status(401).json({
                message: "You Should Sign In For Making Posts, Sign In Please."
            })

        }


        try {
            
            const user = await prisma.user.findUnique({
                where: {
                    email: session.user?.email as string
                },
                include: {
                    Post: true,
                    Comment: true
                }
            })

            res.status(201).json({
                ...user
            })

        } catch (error) {
            
            res.status(400).json({
                error: "There is an Error Happend While Fetching The Posts."
            })

        }

    }
}


export default handler