import { useHooks } from "hooks/useHooks";
import usePost from "hooks/usePost";
import { toast } from "react-toastify";
import { authEndpoints } from "services/endpoints";
import { logIn } from "store/auth";

function useSignUpHook() {
	const { navigate, dispatch, get } = useHooks();
	const { mutate, ...otherProps } = usePost();

	const onSubmit = (formData: { name: string; email: string; key: string; secret: string }) => {
		mutate(
			{
				url: authEndpoints.SIGN_UP,
				data: formData,
			},
			{
				onSuccess: data => {
					if (!get(data, "data.data.key", "")) {
						toast.error(`Something Went wrong! Please Try again`);
						return navigate("/auth");
					}

					dispatch(
						logIn({
							data: {
								email: get(data, "data.data.email", ""),
								id: +get(data, "data.data.id", ""),
								name: get(data, "data.data.name", ""),
							},
							isLoggedIn: true,
						})
					);
					toast.success("Success!!!");
					navigate("/");
				},
				onError: error => {
					toast.error(`Something Went wrong! Please Try again`);
					console.log(error);
				},
			}
		);
	};

	return {
		onSubmit,
		...otherProps,
	};
}

export default useSignUpHook;
