import { Godown } from "@/app/types/Godown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader, Package, ShoppingBag } from "lucide-react";
import { Item } from "./item-details";

type Props = {
	isLoading: boolean;
	searchResults: (Item | Godown)[];
	searchType: "items" | "locations";
	updateCurrentItem: (item: Item) => void;
};

const SearchResults = ({
	isLoading,
	searchResults,
	searchType,
	updateCurrentItem,
}: Props) => {
	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-full">
				<Loader className="h-8 w-8 animate-spin" />
			</div>
		);
	}

	if (searchResults.length === 0) {
		return (
			<div className="flex items-center justify-center h-full text-gray-500">
				No {searchType} found
			</div>
		);
	}

	return (
		<ScrollArea className="">
			{searchResults.map((result, key) => (
				<div
					key={key}
					className="flex items-center cursor-pointer hover:bg-gray-100 rounded-md p-2"
					onClick={() => {
						if ("price" in result) {
							updateCurrentItem(result as Item);
						}
					}}
				>
					{!("price" in result) ? (
						<Package className="size-4 mr-2" />
					) : (
						<ShoppingBag className="size-4 mx-2 " />
					)}
					<span>{result.name}</span>
				</div>
			))}
		</ScrollArea>
	);
};

export default SearchResults;
