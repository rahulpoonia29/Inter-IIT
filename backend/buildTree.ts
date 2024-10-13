import prisma from "./prisma/prismaClient";

// Helper function to build the godown tree
export default async function buildGodownTree(
	godowns: any[],
	parentId: string | null
) {
	return godowns
		.filter((godown) => godown.parentId === parentId)
		.map((godown) => ({
			...godown,
			subGodowns: buildGodownTree(godowns, godown.id), // Recursively build sub-godowns
		}));
}
