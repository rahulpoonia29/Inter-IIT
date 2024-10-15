import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";

type Props = {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    isSuggestionsLoading: boolean;
    isLoading: boolean;
    handleSearch: () => void;
};

const SearchInput = ({
    searchTerm,
    setSearchTerm,
    isSuggestionsLoading,
    isLoading,
    handleSearch,
}: Props) => {
    return (
        <div className="flex items-center space-x-2 my-4">
            <div className="relative flex-grow">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-8"
                />
                {isSuggestionsLoading && (
                    <Loader2 className="h-4 w-4 absolute right-2 top-1/2 transform -translate-y-1/2 animate-spin" />
                )}
            </div>
            <Button onClick={handleSearch} size="icon" disabled={isLoading}>
                {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Search className="h-4 w-4" />
                )}
            </Button>
        </div>
    );
};
export default SearchInput;
