import { motion } from "framer-motion";
import { Edit, Loader, Package } from "lucide-react";
import { useMemo, useState } from "react";
import { useItemContext } from "../context/itemContext";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

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

const possibleAttributes = [
	"type",
	"material",
	"warranty_years",
	"size",
	"color",
	"age_range",
	"battery_required",
	"dimensions",
	"wattage",
	"voltage",
];

export default function ItemDetails() {
	const { item } = useItemContext();
	const [imageLoaded, setImageLoaded] = useState(false);

	const formatAttribute = (
		key: string,
		value: string | number | undefined
	) => {
		if (value === undefined) return null;
		if (key === "warranty_years")
			return `${value} year${value !== 1 ? "s" : ""}`;
		if (key === "battery_required") return value ? "Yes" : "No";
		if (key === "wattage") return `${value}W`;
		if (key === "voltage") return `${value}V`;
		return value.toString();
	};

	const formattedAttributes = useMemo(() => {
		if (!item?.attributes) return [];
		return Object.entries(item.attributes)
			.map(([key, value]) => ({
				key,
				value: formatAttribute(key, value),
			}))
			.filter((attr) => attr.value !== null);
	}, [item]);

	if (!item || !item.id)
		return (
			<div className="w-full h-full flex items-center justify-center text-lg text-muted-foreground">
				Please select an item to view details
			</div>
		);

	return (
		<div className="w-full mx-auto overflow-hidden p-6 pt-8">
			<div className="space-y-6 pt-6">
				<div className="grid lg:grid-cols-2 gap-8">
					<motion.div
						key={item.id}
						className="relative overflow-hidden p-2"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4 }}
					>
						{/* Show loader when image has not loaded */}
						{!imageLoaded && (
							<div className="w-full h-full flex items-center justify-center bg-muted">
								<Loader
									className="animate-spin text-muted-foreground"
									size={48}
								/>
							</div>
						)}
						{item.image_url && (
							<img
								key={item.image_url}
								src={item.image_url}
								alt={item.name}
								className={`w-full h-full object-contain transition-opacity duration-400 ${
									imageLoaded ? "opacity-100" : "opacity-0"
								}`}
								onLoad={() => setImageLoaded(true)}
							/>
						)}
						{!item.image_url && (
							<div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
								<Package size={48} />
								<span className="ml-2">
									Image not available
								</span>
							</div>
						)}
					</motion.div>
					<div className="space-y-6">
						<motion.div
							key={`${item.id}-title`}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.4, delay: 0.05 }}
						>
							<div className="flex flex-col gap-2 justify-start items-start">
								<div className="flex flex-col gap-1">
									<span className="text-3xl font-bold">
										{item.name}
									</span>
									<span className="text-sm text-muted-foreground mt-1">
										ID: {item.id}
									</span>
								</div>
							</div>
							<div className="mt-6 flex gap-6">
								<p className="text-3xl font-bold text-primary">
									${item?.price?.toFixed(2)}
								</p>
								<Badge
									className={`text-sm px-2 py-1 ${
										item.status === "in_stock"
											? "bg-emerald-500 hover:bg-emerald-500"
											: item.status === "out_of_stock"
											? "bg-red-500 hover:bg-red-500"
											: ""
									}`}
								>
									{item.status === "in_stock"
										? "In Stock"
										: item.status === "out_of_stock"
										? "Out of Stock"
										: "Discontinued"}
								</Badge>
							</div>
						</motion.div>
						<Separator className="my-6" />
						<div className="space-y-2">
							<motion.div
								key={`${item.id}-quantity`}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.4, delay: 0.1 }}
							>
								<Label className="text-lg font-semibold mt-6">
									Quantity available:{" "}
									<span className="font-medium">
										{item.quantity}
									</span>
								</Label>
							</motion.div>
							<motion.div
								key={`${item.id}-category`}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.4, delay: 0.15 }}
							>
								<Label className="text-lg font-semibold">
									Category:{" "}
									<span className="font-medium">
										{item.category}
									</span>
								</Label>
							</motion.div>
							<motion.div
								key={`${item.id}-brand`}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.4, delay: 0.2 }}
							>
								<Label className="text-lg font-semibold">
									Brand:{" "}
									<span className="font-medium">
										{item.brand}
									</span>
								</Label>
							</motion.div>
							<motion.div
								key={`${item.id}-godown`}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.4, delay: 0.25 }}
							>
								<Label className="text-lg font-semibold">
									Godown ID:{" "}
									<span className="font-medium">
										{item.godownId}
									</span>
								</Label>
							</motion.div>
						</div>
						<Separator className="my-6" />

						<motion.div
							key={`${item.id}-actions`}
							className="flex gap-4 mt-6"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.4,
								delay: 0.3,
							}}
						>
							<Button
								variant="outline"
								className="w-full sm:w-auto"
							>
								<Edit className="w-4 h-4 mr-2" />
								Edit Item
							</Button>
							<Button className="w-full sm:w-auto ml-0 sm:ml-4 mt-4 sm:mt-0">
								<Package className="w-4 h-4 mr-2" />
								Update Stock
							</Button>
						</motion.div>
					</div>
				</div>
				<Separator className="my-6" />
				<div>
					<h3 className="text-xl font-semibold mb-4">
						Item Attributes
					</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{formattedAttributes.map(({ key, value }, index) => (
							<motion.div
								key={key}
								className="flex justify-between items-center p-3 bg-muted rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.4,
									delay: index * 0.05,
								}}
							>
								<span className="font-medium capitalize text-sm">
									{key.replace("_", " ")}
								</span>
								<span className="text-sm font-medium">
									{value !== "N/A" ? value : "Not Available"}
								</span>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
