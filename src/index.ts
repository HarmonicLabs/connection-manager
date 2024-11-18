import { ConnectionManager } from "./ConnectionManager/ConnectionManager";
import { Logger, LogLevel } from "./utils/Logger";

const logger = new Logger({ logLevel: LogLevel.DEBUG });
const connectionManager = new ConnectionManager( logger );

process.on( "beforeExit", () => connectionManager.terminateAllConnections() );