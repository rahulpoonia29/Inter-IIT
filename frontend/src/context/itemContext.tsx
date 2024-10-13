import { createContext, ReactNode, useContext, useState } from "react";
import { Item } from "../App";

interface ItemContextType {
	item: Item;
	updateCurrentItem: (item: Item | null) => void;

}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const ItemProvider = ({ children }: { children: ReactNode }) => {
	const [item, setItem] = useState<Item>({} as Item);

	const updateCurrentItem = (item: Item | null) => {
		if (item === null) {
			setItem({} as Item);
			return;
		}
		setItem(item);
	};

	return (
		<ItemContext.Provider value={{ item, updateCurrentItem }}>
			{children}
		</ItemContext.Provider>
	);
};

export const useItemContext = () => {
	const context = useContext(ItemContext);
	if (context === undefined) {
		throw new Error("useItemContext must be used within an ItemProvider");
	}
	return context;
};
