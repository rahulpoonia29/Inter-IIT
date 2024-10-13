import { useState } from "react";
import { Input } from "./ui/input";
import { Item } from "./item-details";

export const SearchFilterComponent = ({ items }: { items: Item[] }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const filteredItems = items.filter(
		(item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.godownId.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<Input
				type="text"
				placeholder="Search for items or locations"
				value={searchTerm}
				onChange={handleSearch}
				className="border p-2 mb-4 w-full"
			/>

			<ul>
				{filteredItems.map((item) => (
					<li key={item.id} className="p-2 border-b">
						{item.name} - {item.godownId}
					</li>
				))}
			</ul>
		</div>
	);
};
