import { Loader, Menu } from "lucide-react";
import { FilterComponent } from "./components/filter";
import Showcase from "./components/item-details";
import Tree from "./components/node-item";
import { SearchFilterComponent } from "./components/search";
import { Button } from "./components/ui/button";
import { ScrollArea } from "./components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet";
import { useItemContext } from "./context/itemContext";
import { useNodeContext } from "./context/treeContext";

export const BACKEND_URL = "http://localhost:8000";

export type Godown = {
	id: string;
	name: string;
	parentID: string;
	subGodowns: (Godown | Item)[];
	items: Item[];
};

export type Item = {
	id: string;
	name: string;
	quantity: number;
	category: string;
	price: number;
	status: string;
	brand: string;
	image_url: string;
	attributes: Record<string, string | number | undefined>;
	godownId: string;
};

// console.log(uniqueAttributes);

function App() {
	const { isLoading, nodes } = useNodeContext();
	const { items } = useItemContext();
	return (
		<div className="flex h-screen font-mono">
			{/* Sidebar for larger screens */}
			<aside className="hidden md:block w-[400px] border-r">
				<ScrollArea className="h-full">
					<div className="p-4 grid grid-cols-1 items-center justify-center">
						<h2 className="text-lg pl-10 font-semibold mb-4">
							Inventory
						</h2>
						{isLoading ? (
							<div className="text-center">Loading...</div>
						) : (
							nodes && <Tree nodes={nodes} />
						)}
					</div>
				</ScrollArea>
			</aside>

			<main className="flex-1 overflow-auto">
				{/* Hamburger menu for mobile */}
				<div className="md:hidden p-4">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline" size="icon">
								<Menu className="h-6 w-6" />
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="w-2/3">
							<ScrollArea className="h-full">
								<div className="">
									<h2 className="text-lg font-semibold mb-4">
										Inventory
									</h2>
									{isLoading ? (
										<div>
											<Loader className="size-4 animate-spin" />{" "}
											Loading
										</div>
									) : (
										nodes && <Tree nodes={nodes} />
									)}
								</div>
							</ScrollArea>
						</SheetContent>
					</Sheet>
				</div>

				{/* Render item or godown details */}
				<nav className="bg-zinc-100 p-4">
					<div className="container mx-auto flex justify-between items-center">
						<SearchFilterComponent items={items ? items : []} />
						<FilterComponent items={items ? items : []} />
					</div>
				</nav>
				<Showcase />
			</main>
		</div>
	);
}

export default App;
