import { create } from "zustand";
import { Item } from "../types/Item";

interface ItemState {
    item: Item;
    updateCurrentItem: (item: Item | null) => void;
}

const useItemStore = create<ItemState>((set) => ({
    item: {} as Item,

    updateCurrentItem: (newItem: Item | null) => {
        set({
            item: newItem === null ? ({} as Item) : newItem,
        });
    },
}));

export default useItemStore;
