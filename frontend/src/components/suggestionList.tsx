import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
    suggestions: string[];
    handleSuggestionClick: (suggestion: string) => void;
};

const SuggestionsList = ({ suggestions, handleSuggestionClick }: Props) => {
    if (suggestions.length === 0) return null;

    return (
        <ScrollArea className="h-40 mb-4 bg-white rounded-md p-2">
            {suggestions.map((suggestion, index) => (
                <button
                    key={index}
                    className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
                    onClick={() => handleSuggestionClick(suggestion)}
                >
                    {suggestion}
                </button>
            ))}
        </ScrollArea>
    );
};

export default SuggestionsList;
