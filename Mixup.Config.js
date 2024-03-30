import HTTP from "./HTTP.js";
import Router from "./src/Router.js";
export default async (req, res) => {
	if(req.method === "GET"){
		const result = await Router.get(req, res);
		if(result instanceof HTTP) return result
		return new HTTP(result.content, result.contentType, result.code, result.message||undefined)
	}
}