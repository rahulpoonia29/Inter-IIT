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
	array.push(new URL(item.image_url).protocol);
});

export const uniqueAttributes = [...new Set(array)];

// console.log(uniqueAttributes);
