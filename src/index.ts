import { ConnectionManager } from "./ConnectionManager/ConnectionManager";
import { Logger, LogLevel } from "../utils/Logger";

const logger = new Logger({ logLevel: LogLevel.DEBUG });

const connectionManager = new ConnectionManager();

connectionManager.requestOutboundConnection("192.168.1.1").then(( connection ) => {
    if( connection instanceof Error ) 
    {
        console.error( "Outbound connection failed:", connection.message );
    } 
    else 
    {
        console.log( "Outbound connection established:", connection );
    }
});

connectionManager.includeInboundConnection("192.168.1.2").then(( connection ) => {
    if( connection instanceof Error ) 
    {
        console.error( "Inbound connection failed:", connection.message );
    } 
    else 
    {
        console.log( "Inbound connection established:", connection );
    }
});