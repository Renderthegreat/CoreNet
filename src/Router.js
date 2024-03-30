import HTTP from "../HTTP.js";
import Routes from "./Routes.js";
export default class {
	static get = async (req, res) => {
		const { method, path, query, body } = req;
		const result = await this.Routers.$(method, path, query, body)
		return result(req, res);
	}
	static post = async (req, res) => {
		
	}
	static put = async (req, res) => {
		
	}
	static patch = async (req, res) => {
		
	}
	static delete = async (req, res) => {
		
	}
	static Routers = {
		...Routes,
		"$": async(method, path, query, body) => {
			if (!this.Routers[method]) {
				return new HTTP("Method Not Allowed", "text/plain", 405, "Method Not Allowed")
			}
			let subRoutes = ["/"]
			let exoticPath
			for(let subRoute in path.split("/")){
				subRoutes[subRoute] = (subRoutes.join("/")+path.split("/")[subRoute])
			}
			for(let route in this.Routers[method]){
				if(subRoutes.includes(route)){
					exoticPath = route
				}
			}
			if(exoticPath){
				const exoticRoute = this.Routers[method][exoticPath];
				let usableRoute = exoticRoute.use(path)
				if(usableRoute){
					if(usableRoute!=="~"){
						console.log(usableRoute)
						return exoticRoute[usableRoute];
					}
					else {
						return this.Routers[method]["*"];
					}
				}
				else{
					return exoticRoute["*"];
				}
			}
			else if(this.Routers[method][path]){
				return this.Routers[method][path];
			}
			else {
				return this.Routers[method]["*"]
			}
			
		}
	}
}