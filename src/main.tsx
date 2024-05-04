import "react-toastify/dist/ReactToastify.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "store/index.js";
import Loader from "components/loader/index.js";

import App from "./App";
import ExtraProviders from "components/extra-providers";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: true,
			retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
			retry: false,
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<React.Suspense fallback={<Loader />}>
					<ExtraProviders>
						<App />
					</ExtraProviders>
				</React.Suspense>
			</QueryClientProvider>
		</Provider>
	</React.StrictMode>
);
