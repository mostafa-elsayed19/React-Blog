import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import articleContent from "./article-content";
import Articles from "../components/Articles";
import NotFound from "./NotFound";
import Comments from "../components/Comments";
import AddCommentForm from "../components/AddCommentForm";

const BASE_URL = "https://react-blog-ujg2.vercel.app/api";
function Article({ articles }) {
	const { name } = useParams();
	const article = articles.find((article) => article.name === name);
	const [articleInfo, setArticleInfo] = useState({ comments: [] });

	useEffect(() => {
		const fetchData = async () => {
			const result = await fetch(`${BASE_URL}/articles/${name}`);
			const body = await result.json();
			setArticleInfo(body);
		};
		fetchData();
	}, [name, setArticleInfo]);
	if (!article) return <NotFound />;

	const OTHER_ARTICLES = articles.filter((article) => article.name !== name);
	return (
		<>
			<h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-90">
				{article.title}
			</h1>
			{article.content.map((paragraph, index) => (
				<p
					className="mx-auto leading-relaxed text-base mb-4"
					key={index}
				>
					{paragraph}
				</p>
			))}
			<Comments comments={articleInfo.comments} />
			<AddCommentForm
				articleName={name}
				setArticleInfo={setArticleInfo}
			/>
			<h1 className="sm:text-2xl text-xl font-bold my-4 text-gray-900">
				Other Articles
			</h1>
			<div className="flex flex-wrap -m-4">
				<Articles articles={OTHER_ARTICLES} />
			</div>
		</>
	);
}

export default Article;
