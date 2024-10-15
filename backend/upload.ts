import { ItemStatus } from "@prisma/client";
import { godowns } from "./data/godown";
import prisma from "./prisma/prismaClient";
import { items } from "./data/items";
import Godown from "./types/Godown";
import Item from "./types/Item";

const idleGodown: Godown[] = [];

export default async function upload() {
	console.log("Godown length", godowns.length, "Item length", items.length);
	(godowns as Godown[]).forEach(async (godown) => {
		await uploadGodown(godown);
	});
	await uploadItem(items as Item[]);
}

async function uploadGodown(godown: Godown) {
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
				id: godown.id,
				name: godown.name,
				parentId: null,
			},
		});
	}

	if (godown.parent_godown) {
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
					id: godown.id,
					name: godown.name,
					parentId: godown.parent_godown,
				},
			});
		}
	} else {
		// Store all the remaining godowns until their parent godown is created
		idleGodown.push(godown);
	}

	// Loop over until all godowns are uploaded
	for (const godown of idleGodown) uploadGodown(godown);
}

async function uploadItem(items: Item[]) {
	items.forEach(async (item) => {
		// Make sure the godown exists
		const godown = await prisma.godown.findUnique({
			where: { id: item.godown_id },
		});
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
		});
	});
}
