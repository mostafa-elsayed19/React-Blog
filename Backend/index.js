// const express = require("express");
// const cors = require("cors");
// const app = express();
// const { MongoClient } = require("mongodb");
// const PORT = process.env.PORT || 5095;
// const MONGO_URI = process.env.MONGO_URI;
// // const MONGO_URI =
// // 	"mongodb+srv://mostafaqaraman:Gpjoyp2NreEEfxXY@react-blog.4xv45xr.mongodb.net/";

// // Initialize middlewares

// app.use(express.json({ extended: false }));

// app.use(
// 	cors({
// 		origin: "*",
// 	})
// );

// const withDB = async (operations, res) => {
// 	try {
// 		const client = await MongoClient.connect(MONGO_URI, {
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 		});
// 		const db = client.db("blog");
// 		await operations(db);
// 		client.close();
// 	} catch (error) {
// 		res.status(500).json({ message: `Error ${error}` });
// 	}
// };

// // Requests
// app.get("/api/articles", async (req, res) => {
// 	withDB(async (db) => {
// 		const articles = await db.collection("articles").find({}).toArray();
// 		res.status(200).json(articles);
// 	}, res);
// });

// app.get("/api/articles/:name", async (req, res) => {
// 	withDB(async (db) => {
// 		const articleName = req.params.name;
// 		const articleInfo = await db
// 			.collection("articles")
// 			.findOne({ name: articleName });
// 		res.status(200).json(articleInfo);
// 	}, res);
// });

// app.post("/api/articles/:name/add-comments", async (req, res) => {
// 	const { username, text } = req.body;
// 	const articleName = req.params.name;
// 	withDB(async (db) => {
// 		const article = await db
// 			.collection("articles")
// 			.findOne({ name: articleName });

// 		await db.collection("articles").updateOne(
// 			{ name: articleName },
// 			{
// 				$set: {
// 					comments: article.comments.concat({ username, text }),
// 				},
// 			}
// 		);
// 		const updatedArticle = await db
// 			.collection("articles")
// 			.findOne({ name: articleName });
// 		res.status(200).json(updatedArticle);
// 	}, res);
// });

// app.listen(PORT, () => {
// 	console.log(`server started at port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 5095;
const MONGO_URI =
	"mongodb+srv://mostafaqaraman:Gpjoyp2NreEEfxXY@react-blog.4xv45xr.mongodb.net/?retryWrites=true&w=majority&appName=React-Blog";

console.log("Mongo URI:", MONGO_URI);

// Initialize middlewares
app.use(express.json());
app.use(cors());

// Logging middleware
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next();
});

let cachedClient = null;

const connectToDB = async () => {
	try {
		if (cachedClient && cachedClient.isConnected()) {
			return cachedClient;
		}
		const client = await MongoClient.connect(MONGO_URI);
		cachedClient = client;
		return client;
	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
		cachedClient = null; // Clear cachedClient on error
		throw error;
	}
};

const withDB = async (operations, res) => {
	try {
		const client = await MongoClient.connect(MONGO_URI);
		const db = client.db("blog");
		await operations(db);
	} catch (error) {
		console.error("Database operation failed:", error);
		res.status(500).json({ message: `Error: ${error.message}` });
	}
};

// Requests
app.get("/api/articles", async (req, res) => {
	withDB(async (db) => {
		const articles = await db.collection("articles").find({}).toArray();
		res.status(200).json(articles);
	}, res);
});

app.get("/api/articles/:name", async (req, res) => {
	withDB(async (db) => {
		const articleName = req.params.name;
		const articleInfo = await db
			.collection("articles")
			.findOne({ name: articleName });
		res.status(200).json(articleInfo);
	}, res);
});

app.post("/api/articles/:name/add-comments", async (req, res) => {
	const { username, text } = req.body;
	const articleName = req.params.name;
	withDB(async (db) => {
		const article = await db
			.collection("articles")
			.findOne({ name: articleName });

		await db.collection("articles").updateOne(
			{ name: articleName },
			{
				$set: {
					comments: article.comments.concat({ username, text }),
				},
			}
		);
		const updatedArticle = await db
			.collection("articles")
			.findOne({ name: articleName });
		res.status(200).json(updatedArticle);
	}, res);
});

app.listen(PORT, () => {
	console.log(`Server started at port ${PORT}`);
});
