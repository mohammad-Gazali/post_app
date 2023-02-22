import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../prisma/client"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {

        try {
            
            const posts = await prisma.post.findMany({
                include: {
                    user: true,
                    comment: true
                },
                orderBy: {
                    createdAt: "desc",
                }
            });
            
            return res.status(200).json(posts);
    
        } catch (error) {
            
            return res.status(400).json({
                message: "There Is Something Wrong Happend While Fetching The Post."
            })
    
        }

    }
}

export default handler