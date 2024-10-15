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
