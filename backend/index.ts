import cors from "cors";
import express, { Request, Response } from "express";
import prisma from "./prisma/prismaClient";
import upload from "./upload";

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/", (req, res) => {
	res.send("API is running...");
});

app.get("/upload", async (req: Request, res: Response) => {
	try {
		await upload();
		res.status(200).send("Data uploaded successfully");
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
});

app.get("/godowns/all", async (req: Request, res: Response) => {
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
});

app.get("/godowns/parent", async (req: Request, res: Response) => {
	try {
		const godowns = await prisma.godown.findMany({
			where: {
				parentId: null,
			},
			// include: {
			// 	subGodowns: true,
			// 	items: true,
			// },
		});
		res.json(godowns);
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal server error");
	}
});

app.get("/godowns/:id", async (req: Request, res: Response) => {
	try {
		const godownId = req.params.id;
		const godowns = await prisma.godown.findMany({
			where: {
				parentId: godownId,
			},
			// include: {
			// 	subGodowns: true,
			// 	items: true,
			// },
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
});

app.listen(PORT, () => {
	console.log(`Server running on port https://localhost:${PORT}`);
});
