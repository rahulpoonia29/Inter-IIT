import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Props = {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
};

const CategoryFilter = ({
    categories,
    selectedCategory,
    setSelectedCategory,
}: Props) => {
    return (
        <Select
            onValueChange={setSelectedCategory}
            defaultValue={selectedCategory}
        >
            <SelectTrigger className="mb-4">
                <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                        {category}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default CategoryFilter;
