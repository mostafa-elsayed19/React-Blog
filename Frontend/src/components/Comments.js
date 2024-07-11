function Comments({ comments }) {
	// if (!comments || comments.length === 0) {
	// 	return <div>No comments yet.</div>;
	// }

	return (
		<>
			{comments?.length > 0 && (
				<>
					<h3 className="sm:text-2xl text-xl font-bold my-6 text-gray-900">
						Comments
					</h3>
					{comments.map((comment, index) => (
						<div key={index}>
							<h4 className="text-xl font-bold">
								{comment.username}
							</h4>
							<p className="mt-1 mb-4">{comment.text}</p>
						</div>
					))}
				</>
			)}
		</>
	);
}
export default Comments;
