import { data } from "./data/final";
import { items } from "./data/items";
import prisma from "./prisma/prismaClient";

export default function upload() {
	data.forEach((node: any) => {
		// console.log(data[0]);

		uploadSubAndItem(node[0]);
	});
}

async function uploadSubAndItem(node: any) {
	if (!node || !node.nodes) {
		console.error("Node or its 'nodes' property is undefined:", node);
		return;
	}
	node.nodes.forEach(async (subNode: any) => {
		// console.log(subNode.name);
		if (subNode.nodes) {
			console.log("Making an godown");
			// Check if parent Godown exists
			const parentGodown = await prisma.godown.findUnique({
				where: { id: node.id },
			});

			// If parentGodown exists, create with parentId, otherwise treat it as top-level (no parentId)
			await prisma.godown.upsert({
				where: {
					id: subNode.id,
				},
				create: {
					id: subNode.id,
					name: subNode.name,
					parentId: parentGodown ? node.id : null, // If parent exists, use parentId, otherwise null
				},
				update: {
					id: subNode.id,
					name: subNode.name,
					parentId: parentGodown ? node.id : null,
				},
			});
			console.log("Godown creation completed");

			uploadSubAndItem(subNode);
		} else {
			console.log("Searching an item");
			// @ts-ignore
			const item = getItemById(items, subNode.id);
			if (item) {
				console.log("Making an item");
				const { item_id, godown_id, ...rest } = item;
				await prisma.item.upsert({
					where: {
						id: item_id,
					},
					// @ts-ignore
					create: {
						...rest,
						godownId: item.godown_id,
						id: item_id,
					},
					// @ts-ignore
					update: {
						...rest,
						godownId: item.godown_id,
						id: item_id,
					},
				});
				console.log("Item creation completesd");
			}
		}
	});
}

type Item = {
	item_id: string;
	name: string;
	quantity: number;
	category: string;
	price: number;
	status: string;
	godown_id: string;
	brand: string;
	attributes: Record<string, string>;
	image_url: string;
};

function getItemById(items: Item[], id: string): Item | undefined {
	return items.find((item) => item.item_id === id);
}
