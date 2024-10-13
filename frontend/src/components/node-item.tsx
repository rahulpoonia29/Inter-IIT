import { ChevronDown, ChevronRight, Loader, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Godown, Item } from "../App";
import { useNodeContext } from "../context/treeContext";
import { useItemContext } from "../context/itemContext";

type Node = Godown | Item;

function NodeItem({ node }: { node: Node }) {
	const [expanded, setExpanded] = useState(false);
	const { updateNodes, updatingNodeID } = useNodeContext();
	const { updateCurrentItem } = useItemContext();

	const isGodown = !("price" in node);

	return (
		<div>
			<div
				className="flex items-center cursor-pointer hover:bg-gray-100 rounded-md p-2"
				onClick={() => {
					setExpanded(!expanded);
					// Only fetch when its an godown and do not contain any children nodes
					if (!("price" in node) && !("subGodowns" in node)) {
						updateNodes((node as Godown).id);
					}
					if (!isGodown) {
						console.log(node);

						updateCurrentItem(node as Item);
					}
				}}
			>
				{isGodown ? (
					<span
						onClick={() => {
							setExpanded(!expanded);
							if (isGodown) {
								updateNodes(node.id);
							}
						}}
					>
						{updatingNodeID === node.id ? (
							<Loader className="size-4 mr-2 animate-spin" />
						) : expanded ? (
							<ChevronDown className="size-4 mr-2" />
						) : (
							<ChevronRight className="size-4 mr-2" />
						)}
					</span>
				) : (
					<ShoppingBag className="size-4 mx-2 " />
				)}
				<span>{node.name}</span>
			</div>
			{isGodown && expanded && (
				<div className="ml-4">
					{/* Render subGodowns */}
					{(node as Godown).subGodowns?.map((subGodown) => (
						<NodeItem key={subGodown.id} node={subGodown} />
					))}

					{/* Render items */}
					{(node as Godown).items?.map((item) => (
						<NodeItem key={item.id} node={item} />
					))}
				</div>
			)}
		</div>
	);
}

export default function Tree({ nodes }: { nodes: Node[] }) {
	return (
		<div className="text-left">
			{nodes.map((node) => (
				<NodeItem key={node.id} node={node} />
			))}
		</div>
	);
}
