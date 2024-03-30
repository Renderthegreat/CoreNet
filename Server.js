import net from "net";
import url from "url";
class Server {
    constructor(Handle) {
        this.Handle = Handle;
        this.Server = net.createServer((socket) => {
            socket.on("data", async (data) => {
                const request = this.genRequest(data);
                const response = {
                    send: (data) => {
                        socket.write(data);
                        socket.end();
                    },
                };
                await this.Handle(request, response);
            });
            socket.on("end", () => {});
        });

        this.Server.on("error", (err) => {
            console.error("Server error:", err);
        });
    }
    genRequest(data) {
        const lines = data.toString().trim().split("\n");
        const [method, urlString] = lines[0].split(" ");
        const { pathname, query } = url.parse(urlString, true);
        const bodyIndex = lines.findIndex(
            (line) => line === "\r" || line === "",
        );
        const body =
            bodyIndex !== -1 ? lines.slice(bodyIndex + 1).join("\n") : "";
        return {
            method,
            url: urlString,
            path: pathname,
            query,
            body,
        };
    }
    listen(port, host) {
        this.Server.listen(port, host, () => {
            console.log(`${Indigo}Server listening on port${Honeydew} ${port}`);
        });
    }
}
export default Server;
