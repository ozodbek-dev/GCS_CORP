export const authEndpoints = {
	SIGN_UP: "/signup",
	GET_MYSELF: "/myself",
};

export const bookEndpoints = {
	LIST: "/books",
	DETAIL: (id: number) => `/books/${id}`,
	CREATE: "/books",
	UPDATE: (id: number) => `/books/${id}`,
	DELETE: (id: number) => `/books/${id}`,
};

export default {
	authEndpoints,
};
