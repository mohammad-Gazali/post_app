import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {

        const session = await getServerSession(req, res, authOptions);

        if (!session) {

            return res.status(401).json({
                message: "You Should Sign In For Making Posts, Sign In Please."
            })

        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user?.email as string
            }
        })

        const { comment, postId }: { comment: string, postId: string } = req.body

        if (comment.length === 0) {

            return res.status(400).json({
                message: "Please Don't keep the comment empty."
            })
            
        }

        //? Create A Post
        try {
            
            const result = await prisma.comment.create({
                data: {
                    postId,
                    content: comment,
                    userId: user?.id as string,
                }
            })

            res.status(201).json({
                result
            })

        } catch (error) {
            
            res.status(400).json({
                error: "There is an Error Happend While Creating a Post."
            })

        }

    }
}


export default handler