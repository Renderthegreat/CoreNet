import ServerGenerator from "./Server.js";
import Config from "./Server.Config.js";
import Bake from "jsbakery";

const Mix = new Bake
let ColorPalette = Mix.ImportModule(["ColorPalette"], "*")
let { Colors } = new Mix.ColorPalette("Advanced")
Colors.Ansi = { }
const hexToAnsi = (hexColor) => {
	const hex = hexColor.replace(/^#/, ""); // Remove # if present
	const bigint = parseInt(hex, 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;
	return `\x1b[38;2;${r};${g};${b}m`;
};
for(let color in Colors.Hex){
	global[color] = hexToAnsi(Colors.Hex[color])
}
const Handler = Config.Handle;
const Server = new ServerGenerator(Handler);

Server.listen(Config.Port, Config.Host);