import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NodeProvider } from "./context/treeContext.tsx";
import { ItemProvider } from "./context/itemContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<NodeProvider>
				<ItemProvider>
					<App />
				</ItemProvider>
			</NodeProvider>
		</QueryClientProvider>
	</StrictMode>
);
