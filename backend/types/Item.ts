type Item = {
	item_id: string;
	name: string;
	quantity: number;
	category: string;
	price: number;
	status: string;
	godown_id: string;
	brand: string;
	attributes: Record<string, string | number | undefined>;
	image_url: string;
};

export default Item;
