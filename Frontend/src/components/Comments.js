import { useEffect } from "react";
import { useArticles } from "../context/ArticleContext";

function Comments({ name }) {
	const { comments = [], getComments, isLoadingComments } = useArticles();
	useEffect(() => {
		getComments(name);
	}, [name, getComments]);
	// if (!comments || comments.length === 0) {
	// 	return <div>No comments yet.</div>;
	// }

	return (
		<>
			<h3 className="sm:text-2xl text-xl font-bold my-6 text-gray-900">
				Comments
			</h3>

			<>
				{isLoadingComments ? (
					<p>Loading...</p>
				) : (
					<>
						{comments?.length === 0 ? (
							<p>Be the first to comment</p>
						) : (
							comments.map((comment, index) => (
								<div key={index}>
									<h4 className="text-xl font-bold">
										{comment.username}
									</h4>
									<p className="mt-1 mb-4">{comment.text}</p>
								</div>
							))
						)}
					</>
				)}
			</>
		</>
	);
}
export default Comments;
