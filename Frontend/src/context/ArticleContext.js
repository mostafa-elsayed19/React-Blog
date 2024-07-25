import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useReducer,
} from "react";

const BASE_URL = "https://react-blog-ujg2.vercel.app/api";
const ArticleContext = createContext();

const initialState = {
	articles: [],
	comments: [],
	isLoading: false,
	isLoadingComments: false,
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case "articles/loading":
			return { ...state, isLoading: true };
		case "articles/loaded":
			return {
				...state,
				isLoading: false,
				articles: action.payload,
			};
		case "comments/loading":
			return { ...state, isLoadingComments: true };
		case "comments/loaded":
			return {
				...state,
				isLoadingComments: false,
				comments: action.payload,
			};
		case "comments/set":
			return {
				...state,
				comments: action.payload,
			};
		default:
			throw new Error("No action of this type");
	}
}

function ArticlesProvider({ children }) {
	const [{ articles, comments, isLoading }, dispatch] = useReducer(
		reducer,
		initialState
	);

	useEffect(() => {
		async function fetchArticles() {
			dispatch({ type: "articles/loading" });
			try {
				const res = await fetch(`${BASE_URL}/articles`);
				const articles = await res.json();
				dispatch({ type: "articles/loaded", payload: articles });
			} catch (err) {
				console.log(err);
			}
		}
		fetchArticles();
	}, []);

	const getComments = useCallback(async (name) => {
		dispatch({ type: "comments/loading" });
		try {
			const result = await fetch(`${BASE_URL}/articles/${name}`);
			const body = await result.json();
			dispatch({ type: "comments/loaded", payload: body.comments });
		} catch (err) {
			console.log(err);
		}
	}, []);

	const setComments = useCallback((newComments) => {
		dispatch({ type: "comments/set", payload: newComments });
	}, []);

	return (
		<ArticleContext.Provider
			value={{
				articles,
				comments,
				isLoading,
				getComments,
				setComments,
			}}
		>
			{children}
		</ArticleContext.Provider>
	);
}

function useArticles() {
	const context = useContext(ArticleContext);
	if (context === undefined) throw new Error("Context is not found");
	return context;
}

export { ArticlesProvider, useArticles };
