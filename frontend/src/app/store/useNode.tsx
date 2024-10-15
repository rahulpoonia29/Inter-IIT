import API from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { Godown } from "../types/Godown";
import { Item } from "../types/Item";

export type Node = Godown | Item;

interface NodeState {
    nodes: Node[];
    isLoading: boolean;
    updatingNodeID: string | null;
    setNodes: (nodes: Node[]) => void;
    updateNodes: (parentID: string) => Promise<void>;
    setUpdatingNodeID: (id: string | null) => void;
    fetchParentNodes: () => void;
}

const useNodeStore = create<NodeState>((set, get) => ({
    nodes: [],
    isLoading: true,
    updatingNodeID: null,
    setNodes: (nodes) => set({ nodes }),
    setUpdatingNodeID: (id) => set({ updatingNodeID: id }),

    updateNodes: async (parentID: string) => {
        set({ updatingNodeID: parentID });
        const data = await API.get<Godown[]>("/godowns/id", {
            params: { id: parentID },
        })
            .then((response) => response.data)
            .finally(() => set({ updatingNodeID: null }));

        const updatedNodes = updateNode(get().nodes, parentID, data);
        set({ nodes: updatedNodes });
    },

    fetchParentNodes: async () => {
        try {
            const response = await API.get<Godown[]>("/godowns/parent");
            set({ nodes: response.data, isLoading: false });
        } catch (error) {
            console.error("Error fetching parent nodes:", error);
            set({ isLoading: false });
            throw error;
        }
    },
}));

export default useNodeStore;

// Fetch parent nodes on the client side
if (typeof window !== "undefined") {
    useNodeStore.getState().fetchParentNodes();
}

// Recursive function to update nodes
const updateNode = (nodes: Node[], parentID: string, data: Node[]): Node[] => {
    return nodes.map((node) => {
        if (node.id === parentID) {
            return {
                ...node,
                // Add subGodowns and items to the parent node
                // @ts-ignore
                subGodowns: data.godowns,
                // @ts-ignore
                items: data.items,
            };
        }
        if ("subGodowns" in node) {
            return {
                ...node,
                subGodowns: updateNode(node.subGodowns, parentID, data),
            };
        }
        return node;
    });
};
