import { Item } from "./Item";

export type Godown = {
    id: string;
    name: string;
    parentID: string;
    subGodowns: (Godown | Item)[];
    items: Item[];
};
