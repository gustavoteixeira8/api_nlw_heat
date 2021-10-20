import { serverHttp } from "./app";

const SERVER_PORT = process.env.SERVER_PORT || 3000

serverHttp.listen(4000, () => console.log(`Server is running on port ${SERVER_PORT}`));
