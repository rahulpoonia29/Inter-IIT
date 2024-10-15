"use client";

import CategoryFilter from "@/components/categoryFilter";
import SearchInput from "@/components/searchInput";
import SearchResults from "@/components/searchResults";
import SuggestionsList from "@/components/suggestionList";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import API from "@/lib/axios";
import axios from "axios";
import { useEffect, useState } from "react";
import useItemStore from "../store/useItem";
import { Godown } from "../types/Godown";
import { Item } from "../types/Item";
import ItemDetails from "@/components/item-details";

const categories = ["Tools", "Clothing", "Toys", "Furniture", "Electronics"];

export default function SearchPage() {
	const { updateCurrentItem } = useItemStore();
	const [searchTerm, setSearchTerm] = useState("");
	const [searchType, setSearchType] = useState<"items" | "locations">(
		"items"
	);
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [searchResults, setSearchResults] = useState<(Item | Godown)[]>([]);
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);

	useEffect(() => {
		if (searchTerm.length > 1) {
			setIsSuggestionsLoading(true);
			const source = axios.CancelToken.source();
			const searchUrl =
				searchType === "items" ? "/items/search" : "/godowns/search";

			const params =
				searchType === "items"
					? {
							query: searchTerm,
							category:
								selectedCategory === "All"
									? undefined
									: selectedCategory,
					  }
					: { query: searchTerm };

			API.get(searchUrl, {
				params,
				cancelToken: source.token,
			})
				.then((res) => {
					const names = res.data.map(
						(entry: Item | Godown) => entry.name
					);
					setSuggestions(names);
					setIsSuggestionsLoading(false);
				})
				.catch((thrown) => {
					if (!axios.isCancel(thrown)) console.error(thrown);
					setIsSuggestionsLoading(false);
				});

			return () =>
				source.cancel("Operation canceled due to new request.");
		} else {
			setSuggestions([]);
		}
	}, [searchTerm, searchType, selectedCategory]);

	const handleSearch = () => {
		setIsLoading(true);
		const source = axios.CancelToken.source();
		const searchUrl =
			searchType === "items" ? `/items/search` : `/godowns/search`;

		const params =
			searchType === "items"
				? {
						query: searchTerm,
						category:
							selectedCategory === "All"
								? undefined
								: selectedCategory,
				  }
				: { query: searchTerm };

		API.get(searchUrl, { params, cancelToken: source.token })
			.then((res) => {
				setSearchResults(res.data);
				setIsLoading(false);
			})
			.catch((thrown) => {
				if (!axios.isCancel(thrown)) console.error(thrown);
				setIsLoading(false);
			});

		return () => source.cancel("Operation canceled due to new request.");
	};

	const handleTabChange = (value: "items" | "locations") => {
		setSearchType(value);
		setSearchTerm("");
		setSuggestions([]);
		setSearchResults([]);
	};

	const handleSuggestionClick = (suggestion: string) => {
		setSearchTerm(suggestion);
		setSuggestions([]);
	};

	return (
		<div className="flex h-screen">
			<aside className="w-[400px] bg-gray-50 p-4">
				<Tabs
					defaultValue="items"
					onValueChange={(value) =>
						handleTabChange(value as "items" | "locations")
					}
				>
					<TabsList className="grid grid-cols-2 mb-4">
						<TabsTrigger value="items">Items</TabsTrigger>
						<TabsTrigger value="locations">Locations</TabsTrigger>
					</TabsList>
				</Tabs>

				{/* Search Input and Suggestions */}
				<SearchInput
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					isSuggestionsLoading={isSuggestionsLoading}
					isLoading={isLoading}
					handleSearch={handleSearch}
				/>

				{/* Suggestions List */}
				<SuggestionsList
					suggestions={suggestions}
					handleSuggestionClick={handleSuggestionClick}
				/>

				{/* Category Filter */}
				{searchType === "items" && (
					<CategoryFilter
						categories={categories}
						selectedCategory={selectedCategory}
						setSelectedCategory={setSelectedCategory}
					/>
				)}
				<SearchResults
					isLoading={isLoading}
					searchResults={searchResults}
					searchType={searchType}
					updateCurrentItem={updateCurrentItem}
				/>
			</aside>

			{/* Search Results */}
			<main className="flex-grow bg-white p-4">
				<ItemDetails />
			</main>
		</div>
	);
}
