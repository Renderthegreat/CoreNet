import HTTP from "../HTTP.js";
import { Document, Element } from "../HTML.js";
export default {
	GET: {
		"*": async (req, res) => {
			return new HTTP("Hello World", "text/plain", 200, "OK");
		},
		"/area": {
			use: (path) => {
				let subPath = path.split("/area")[1];
				console.log(subPath);
				switch (subPath) {
					case "/circle": {
						return "circle";
					}
					case "/square": {
						return "square";
					}
					default: {
						return "~";
					}
				}
			},
			circle: (req, res) => {
				return new HTTP("Hello circle", "text/plain", 200, "OK");
			},
			square: (req, res) => {
				let document = new Document();
				let SomeText = new Element("p");
				let SomeLink = new Element("a");
				let SomeTitle = new Element("title");
				SomeText.textContent = "Hello square";
				SomeLink.textContent = "Hello Link";
				SomeLink.setAttribute("href", "https://example.com");
				SomeTitle.textContent = "Hello Website";
				
				
				document.body.appendChild(SomeText)
				document.body.appendChild(SomeLink)
				document.head.appendChild(SomeTitle)
				const WebPage = document.innerHTML;
				return new HTTP(WebPage, "text/html", 200, "OK");
			},
		},
	},
	POST: {
		
	},
	PUT: {
		
	},
	PATCH: {
		
	},
	DELETE: {
		
	},
};