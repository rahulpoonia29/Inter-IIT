import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const searchItems = async (req: Request, res: Response) => {
	try {
		const { query, category } = req.query;
		const items = await prisma.item.findMany({
			where: {
				name: {
					contains: query as string,
				},
				category: category ? (category as string) : undefined,
			},
		});
		res.status(200).json(items);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
};
