import { useState } from "react";
import { Item } from "./item-details";

export const FilterComponent = ({ items }: { items: Item[] }) => {
	const [selectedCategory, setSelectedCategory] = useState("");

	const handleCategoryChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedCategory(event.target.value);
	};

	const filteredItems = selectedCategory
		? items.filter((item) => item.category === selectedCategory)
		: items;

	return (
		<div>
			<select
				value={selectedCategory}
				onChange={handleCategoryChange}
				className="border p-2 mb-4"
			>
				<option value="">All Categories</option>
				<option value="Toys">Toys</option>
				<option value="Electronics">Electronics</option>
				<option value="Furniture">Furniture</option>
				{/* Add more categories as needed */}
			</select>

			<ul>
				{filteredItems.map((item) => (
					<li key={item.id} className="p-2 border-b">
						{item.name} - {item.category}
					</li>
				))}
			</ul>
		</div>
	);
};
