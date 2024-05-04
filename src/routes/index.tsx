/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Private from "./privateRoute";
import Loader from "components/loader";
import Layout from "components/layout";

const Auth = lazy(() => import("pages/auth"));
const BooksList = lazy(() => import("pages/book/list"));

const router = () => {
	return createBrowserRouter([
		{
			path: "/auth",
			loader: Loader,
			children: [
				{
					index: true,
					element: <Auth />,
				},
			],
		},
		{
			path: "/",
			loader: Loader,
			element: <Layout />,
			errorElement: <div>Error</div>,
			children: [
				{
					index: true,
					element: (
						<Private>
							<BooksList />
						</Private>
					),
				},
			],
		},
	]);
};

export default router;
