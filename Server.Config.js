import Mixup from "./Mixup.Config.js";



export default class {
	static Port = 80;
	static Host = "127.0.0.1";
	static Handle = async (req, res) => {
		const result = await this.Frame(req, res);
		let HTTPResponse = "";
		if (
			typeof result.code === "number" &&
			typeof result.message === "string" &&
			typeof result.contentType === "string"
		) {
			HTTPResponse +=
				"HTTP/1.1 " + result.code + " " + result.message + "\r\n";
			HTTPResponse += "Content-Type: " + result.contentType + "\r\n";
			HTTPResponse += "Content-Length: " + result.length + "\r\n";
			HTTPResponse += "\r\n";
			HTTPResponse += result.content + "\r\n";
			console.log(`${Honeydew}HTTP: ${(()=>{if(result.code>400){return Red} else if (result.code==200){return Emerald}})()}${result.message} ${result.code} ${Orange}${result.contentType} ${req.path}`);
		} else {
			throw new (class {
				constructor() {
					this.code = -1;
					this.message = message;
				}
			})();
		}

		res.send(HTTPResponse);
	};
	static Frame = async (req, res) => {
		const result = await Mixup(req, res);

		return result;
	};
}
