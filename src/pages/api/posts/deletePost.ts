import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../prisma/client"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {

        const id = JSON.parse(req.body).id

        try {
            
            await prisma.post.delete({
                where: {
                    id
                }
            })
            
            return res.status(200).json({
                message: "The Post Has Been Deleted Successfully."
            });
    
        } catch (error) {
            
            return res.status(400).json({
                message: "There Is Something Wrong Happend While Deleting The Post."
            })
    
        }

    }
}

export default handler