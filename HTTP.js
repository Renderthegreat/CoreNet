export default class HTTP {
	constructor(content, contentType, code, message){
		let codeMessage = message || ""
		if(!message){
			switch(code){
				case 200:
					codeMessage = "OK";
					break;
				case 400:
					codeMessage = "Bad Request";
					break;
				case 404:
					codeMessage = "Not Found";
					break;
				default:
					codeMessage = "Unknown Error";
					break;
			}
		}
		this.code = code;
		this.message = codeMessage;
		this.contentType = contentType;
		if(typeof content === "string"){
			this.content = content;
		}
		else if(typeof content === "object"){
			this.content = JSON.stringify(content);
		}
		else{
			this.content = content;
		}
		this.length = this.content.length;
	}
}