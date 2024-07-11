// import articleContent from "./article-content";
import Articles from "../components/Articles";
function ArticlesList({ articles }) {
	return (
		<div>
			<h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-90">
				Articles
			</h1>
			<div className="conatiner py-4 mx-auto">
				<div className="flex flex-wrap -m-4">
					<Articles articles={articles} />
				</div>
			</div>
		</div>
	);
}

export default ArticlesList;
