import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

// Get all godowns
export const getAllGodowns = async (req: Request, res: Response) => {
	try {
		const godowns = await prisma.godown.findMany({
			include: {
				subGodowns: true,
				items: true,
			},
		});
		res.status(200).json(godowns);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
};

// Get all parent godowns
export const getParentGodowns = async (req: Request, res: Response) => {
	try {
		const godowns = await prisma.godown.findMany({
			where: {
				parentId: null,
			},
		});
		res.status(200).json(godowns);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
};

// Get godown by ID, and retrieve sub-godowns and items under it
export const getGodownById = async (req: Request, res: Response) => {
	try {
		const godownId = req.query.id as string;

		const godowns = await prisma.godown.findMany({
			where: {
				parentId: godownId,
			},
		});
		const items = await prisma.item.findMany({
			where: {
				godownId: godownId,
			},
		});
		res.status(200).json({ godowns, items });
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
};

// Search godowns by name(Location)
export const searchGodowns = async (req: Request, res: Response) => {
	try {
		const search = req.query.query as string;

		const godowns = await prisma.godown.findMany({
			where: {
				name: {
					contains: search,
				},
			},
		});

		res.status(200).json(godowns);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
};
