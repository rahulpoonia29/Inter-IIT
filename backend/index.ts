import cors from "cors";
import express, { Request, Response } from "express";
import godownRoutes from "./routes/godown.route";
import itemRoutes from "./routes/item.route";
import uploadRoutes from "./routes/upload.route";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Check if the server is running
app.get("/", (req: Request, res: Response) => {
	res.send("API is running...");
});

app.use("/api/v1/godowns", godownRoutes);
app.use("/api/v1/items", itemRoutes);
app.get("/api/v1/upload", uploadRoutes);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
