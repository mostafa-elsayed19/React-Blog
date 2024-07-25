import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import ArticlesList from "./pages/ArticlesList";
import Article from "./pages/Article";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import { ArticlesProvider } from "./context/ArticleContext";

function App() {
	return (
		<>
			<ArticlesProvider>
				<BrowserRouter>
					<Navbar />
					<div className="max-w-screen-md mx-auto pt-20">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route
								path="/articles-list"
								element={<ArticlesList />}
							/>
							<Route
								path="/article/:name"
								element={<Article />}
							/>
							<Route path="*" element={<NotFound />} />
						</Routes>
					</div>
				</BrowserRouter>
			</ArticlesProvider>
		</>
	);
}

export default App;
