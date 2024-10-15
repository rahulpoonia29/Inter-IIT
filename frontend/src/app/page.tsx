"use client";

import ItemDetails from "@/components/item-details";
import Tree from "@/components/node-item";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Loader, Menu, Search } from "lucide-react";
import Link from "next/link";
import useNodeStore from "./store/useNode";

export default function Page() {
    // useFetchParentNodes();

    const { isLoading, nodes } = useNodeStore();
    console.log("Nodes", nodes);

    return (
        <div className="flex h-screen font-mono">
            {/* Sidebar for larger screens */}
            <aside className="hidden lg:block w-[400px] border-r">
                <ScrollArea className="h-full">
                    <div className="p-4 grid grid-cols-1 items-center justify-center">
                        <h2 className="text-lg pl-10 font-semibold mb-4">
                            Inventory
                        </h2>
                        {isLoading ? (
                            <div className="text-center">Loading</div>
                        ) : (
                            nodes && <Tree nodes={nodes} />
                        )}
                    </div>
                </ScrollArea>
            </aside>

            <main className="flex-1 overflow-auto">
                {/* Hamburger menu for mobile */}
                <div className="lg:hidden p-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-2/3">
                            <ScrollArea className="h-full">
                                <div className="">
                                    <h2 className="text-lg font-semibold mb-4">
                                        Inventory
                                    </h2>
                                    {isLoading ? (
                                        <div>
                                            <Loader className="size-4 animate-spin text-black" />{" "}
                                            Loading
                                        </div>
                                    ) : (
                                        nodes && <Tree nodes={nodes} />
                                    )}
                                </div>
                            </ScrollArea>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Render item or godown details */}
                <nav className="bg-zinc-100 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <Link
                            href={"/search"}
                            className="flex items-center gap-2"
                        >
                            <Search className="size-4" />
                            Search
                        </Link>
                        {/* <FilterComponent  /> */}
                    </div>
                </nav>
                
                <ItemDetails />
            </main>
        </div>
    );
}
