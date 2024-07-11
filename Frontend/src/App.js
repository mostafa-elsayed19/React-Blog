import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ArticlesList from "./pages/ArticlesList";
import Article from "./pages/Article";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

const BASE_URL = "https://react-blog-ujg2.vercel.app/api";

function App() {
	const [articles, setArticles] = useState([]);
	useEffect(() => {
		async function getArticles() {
			const res = await fetch(`${BASE_URL}/articles`);
			const data = await res.json();
			setArticles(data);
		}
		getArticles();
	}, [setArticles]);
	return (
		<>
			<Router>
				<Navbar />
				<div className="max-w-screen-md mx-auto pt-20">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route
							path="/articles-list"
							element={<ArticlesList articles={articles} />}
						/>
						<Route
							path="/article/:name"
							element={<Article articles={articles} />}
						/>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;
