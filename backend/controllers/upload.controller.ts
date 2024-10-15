import { Request, Response } from "express";
import { ItemStatus } from "@prisma/client";
import prisma from "../prisma/prismaClient";
import { godowns } from "../data/godown"; // Assuming these are predefined arrays
import { items } from "../data/items";
import Godown from "../types/Godown";
import Item from "../types/Item";

const idleGodown: Godown[] = [];

export const uploadData = async (req: Request, res: Response) => {
	try {
		console.log(
			"Godown length",
			godowns.length,
			"Item length",
			items.length
		);

		// Upload Godowns
		for (const godown of godowns as Godown[]) {
			await uploadGodown(godown);
		}

		// Upload Items
		await uploadItems(items as Item[]);

		res.status(200).send("Data uploaded successfully");
	} catch (error) {
		console.error("Error uploading data:", error);
		res.status(500).send("Internal server error");
	}
};

async function uploadGodown(godown: Godown) {
	try {
		// No parent godown (make it a parent godown)
		if (!godown.parent_godown) {
			await prisma.godown.upsert({
				where: {
					id: godown.id,
				},
				create: {
					id: godown.id,
					name: godown.name,
					parentId: null,
				},
				update: {
					name: godown.name,
					parentId: null,
				},
			});
		} else {
			// Make sure the parent godown exists
			const parentGodown = await prisma.godown.findUnique({
				where: { id: godown.parent_godown },
			});

			if (parentGodown) {
				await prisma.godown.upsert({
					where: {
						id: godown.id,
					},
					create: {
						id: godown.id,
						name: godown.name,
						parentId: godown.parent_godown,
					},
					update: {
						name: godown.name,
						parentId: godown.parent_godown,
					},
				});
			} else {
				// Store the godown in idleGodown array for later processing
				idleGodown.push(godown);
			}
		}

		// Process idle godowns if any
		for (const idle of idleGodown) {
			await uploadGodown(idle);
		}
	} catch (error) {
		console.error(`Error uploading godown ${godown.name}:`, error);
	}
}

async function uploadItems(items: Item[]) {
	try {
		for (const item of items) {
			// Make sure the godown exists
			const godown = await prisma.godown.findUnique({
				where: { id: item.godown_id },
			});

			if (godown) {
				// Create and link the item to the godown
				await prisma.item.upsert({
					where: {
						id_godownId: {
							godownId: item.godown_id,
							id: item.item_id,
						},
					},
					create: {
						id: item.item_id,
						name: item.name,
						quantity: item.quantity,
						category: item.category,
						price: item.price,
						status: item.status as ItemStatus,
						godownId: item.godown_id,
						brand: item.brand,
						attributes: item.attributes,
						image_url: item.image_url,
					},
					update: {
						name: item.name,
						quantity: item.quantity,
						category: item.category,
						price: item.price,
						status: item.status as ItemStatus,
						godownId: item.godown_id,
						brand: item.brand,
						attributes: item.attributes,
						image_url: item.image_url,
					},
				});
			}
		}
	} catch (error) {
		console.error("Error uploading items:", error);
	}
}
