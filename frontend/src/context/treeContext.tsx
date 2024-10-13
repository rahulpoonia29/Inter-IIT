import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { BACKEND_URL, Godown, Item } from "../App";

export type Node = Godown | Item;

interface NodeContextType {
	isLoading: boolean;
	updatingNodeID: string | null;
	nodes: Node[];
	setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
	updateNodes: (parentID: string) => void;
}

const NodeContext = createContext<NodeContextType | undefined>(undefined);

export const useNodeContext = () => {
	const context = useContext(NodeContext);
	if (!context) {
		throw new Error("useNodeContext must be used within a NodeProvider");
	}
	return context;
};

export const NodeProvider = ({ children }: { children: React.ReactNode }) => {
	const [nodes, setNodes] = useState<Node[]>([]);
	const [updatingNodeID, setUpdatingNodeID] = useState<string | null>(null);

	// Fetch parent nodes and cache
	const { isLoading } = useQuery({
		queryKey: ["parentNodes"],
		queryFn: () =>
			axios
				.get<Godown[]>(`${BACKEND_URL}/godowns/parent`)
				.then((response) => {
					setNodes(response.data);
					return response.data;
				}),
	});

	const updateNodes = async (parentID: string) => {
		setUpdatingNodeID(parentID);
		const data = await axios
			.get<Godown[]>(`${BACKEND_URL}/godowns/${parentID}`)
			.then((response) => response.data)
			.finally(() => setUpdatingNodeID(null));

		updateNode(nodes, parentID, data);
	};

	return (
		<NodeContext.Provider
			value={{
				nodes,
				setNodes,
				updateNodes,
				isLoading,
				updatingNodeID,
			}}
		>
			{children}
		</NodeContext.Provider>
	);
};

const updateNode = (nodes: Node[], parentID: string, data: Node[]) => {
	nodes.forEach((node) => {
		if (node.id === parentID) {
			// Add subGodowns and items to the parent node
			// @ts-ignore
			node.subGodowns = data.godowns;
			// @ts-ignore
			node.items = data.items;
			return;
		} else {
			"subGodowns" in node && updateNode(node.subGodowns, parentID, data);
			return;
		}
	});
};
