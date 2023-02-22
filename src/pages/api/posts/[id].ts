import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../prisma/client"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {

        const id = req.query.id as string

        try {
            
            const post = await prisma.post.findUnique({
                where: {
                    id
                },
                include: {
                    user: true,
                    comment: {
                        include: {
                            user: true
                        }
                    },
                }
            })
            
            return res.status(200).json(post);
    
        } catch (error) {
            
            return res.status(400).json({
                message: "There Is Something Wrong Happend While Fetching The Post."
            })
    
        }

    }
}

export default handler