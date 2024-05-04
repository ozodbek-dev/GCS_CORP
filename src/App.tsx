import useGetMyself from "pages/auth/hooks/useGetMyself";
import Routes from "routes/routes";
export default function App() {
	const { isFetched } = useGetMyself();
	return isFetched && <Routes />;
}
