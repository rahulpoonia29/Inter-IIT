import items from "./data/items.json";

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

const array = [];

items.forEach((item) => {
	Object.keys(item.attributes).forEach((key) => {
		array.push(key);
	});
});

export const uniqueAttributes = [...new Set(array)];

// console.log(uniqueAttributes);
