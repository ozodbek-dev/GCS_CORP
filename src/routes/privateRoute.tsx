import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store";
interface IProps {
	children: JSX.Element;
}

function Private({ children }: IProps) {
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
	if (!isLoggedIn) return <Navigate to='/auth' />;
	return children;
}

export default Private;
