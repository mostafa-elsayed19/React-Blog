import { useParams } from "react-router-dom";
import Articles from "../components/Articles";
import NotFound from "./NotFound";
import Comments from "../components/Comments";
import AddCommentForm from "../components/AddCommentForm";
import { useArticles } from "../context/ArticleContext";

function Article() {
	const { articles, isLoading } = useArticles();
	const { name } = useParams();
	const article = articles.find((article) => article.name === name);

	if (isLoading)
		return (
			<>
				<p>Loading...</p>
			</>
		);
	if (!article) return <NotFound />;
	const OTHER_ARTICLES = articles.filter((article) => article.name !== name);
	return (
		<>
			<h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-90">
				{article?.title}
			</h1>
			{article?.content?.map((paragraph, index) => (
				<p
					className="mx-auto leading-relaxed text-base mb-4"
					key={index}
				>
					{paragraph}
				</p>
			))}
			<Comments name={name} />
			<AddCommentForm
				articleName={name}
				// setArticleInfo={setArticleInfo}
			/>
			<h1 className="sm:text-2xl text-xl font-bold my-4 text-gray-900">
				Other Articles
			</h1>
			<div className="flex flex-wrap -m-4">
				<Articles name={name} otherArticles={OTHER_ARTICLES} />
			</div>
		</>
	);
}

export default Article;
