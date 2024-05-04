import Cookies from "js-cookie";
export const saveCredentialsToCoockies = (secret: string, key: string) => {
	const date = new Date();
  date.setTime(+date + 86400000);
	Cookies.set("secret", secret, { expires: date, secure: true });
	Cookies.set("key", key, { expires: date, secure: true });
};
export const getCredentialsFromCoockies = (): { key?: string; secret?: string } => {
	return {
		key: Cookies.get("key"),
		secret: Cookies.get("secret"),
	};
};

export const removeCredentialsFromCoockies = () => {
	Cookies.remove("secret");
	Cookies.remove("key");
};
