import md5 from "md5";
interface IMd5Types {
	url: string;
	method: string;
	body: any;
	secret: string;
}
export default function md5Handler({ url, method, body, secret }: IMd5Types) {
	if (!body) return md5(`${method.toUpperCase()}${url}${secret}`);
	return md5(`${method.toUpperCase()}${url}${JSON.stringify(body)}${secret}`);
}
