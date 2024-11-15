import { ConnectionManager } from "./ConnectionManager/ConnectionManager";
import { getClientIp as getClientIpFromReq } from "request-ip";
import { Logger, LogLevel } from "./utils/Logger";
import { WebSocketServer } from "ws";
import express from "express";
import http from "http";

// initializations

const logger = new Logger({ logLevel: LogLevel.DEBUG });
const connectionManager = new ConnectionManager( logger );

// wss initializations

const app = express();
app.use( express.json() );
app.set( "trust proxy", 1 );

const http_server = http.createServer( app );
const wsServer = new WebSocketServer({ server: http_server, path: "/connection-manager", maxPayload: 512 });

http_server.listen((3001), () => {    
    logger.debug("!- THE SERVER IS LISTENING ON PORT 3001 -!\n")
});

// wss events

process.on( "beforeExit", () => connectionManager.terminateAllConnections() );
wsServer.on( "close", () => connectionManager.terminateAllConnections() );

wsServer.on( "error", console.error );

wsServer.on( "connection", async ( client, req ) => {
    const ip = getClientIpFromReq( req );

    if( !ip )
    {
        logger.error("!- NO IP ADDRESS FOUND -!\n");
        return client.terminate();
    }

    connectionManager.setConnection( client, ip );

    client.on( "error", console.error );
    // client.on("message", handleClientMessage.bind( client ));
} );