import { Connection, ConnectionState, ConnectionType } from "../types/Connection";
import { ConnectionManager } from "../ConnectionManager/ConnectionManager";
import { getClientIp as getClientIpFromReq } from "request-ip";
import { RawData, WebSocket, WebSocketServer } from "ws";
import { getWsClientIp } from "../utils/clientProps";
import express, { Express } from "express";
import { Logger } from "../utils/Logger";
import http from "http";

export class OutboundGovernor
{
    private connectionManager: ConnectionManager;

    logger: Logger;

    private app: Express;
    private http_server: http.Server;
    private wsServer: WebSocketServer;

    constructor( cm: ConnectionManager ) 
    {
        this.connectionManager = cm;

        this.logger = cm.logger;

        this.app = express();
        this.app.use( express.json() );
        this.app.set( "trust proxy", 1 );

        this.http_server = http.createServer( this.app );
        this.wsServer = new WebSocketServer({ server: this.http_server, path: "/connection-manager", maxPayload: 512 });

        this.http_server.listen((3001), () => {
            this.logger.debug("!- THE CONNECTION MANAGER IS LISTENING ON PORT 3001 -!\n")
        });

        this.wsServer.on( "close", async () => {
            const connections = await this.fetchConnections();
            await this.terminateAllConnections( connections);
        });

        this.wsServer.on( "error", console.error );

        this.wsServer.on( "connection", async ( client, req ) => {
            const ip = getClientIpFromReq( req );

            if( !ip )
            {
                this.logger.error("!- NO IP ADDRESS FOUND -!\n");
                return client.close(/*TODO*/);
            }

            await this.acquireConnection( client, ip );
        } );
    }

    private async fetchConnections(): Promise<Map<string, Connection>> 
    {
        return await this.connectionManager.getConnections();
    }

    private async acquireConnection( client: WebSocket, ip: string ): Promise<void>
    {
        /*TODO*/

        client.on( "error", console.error );
        client.on( "message", this.handleClientMessage.bind( client ) );

        const connections = await this.fetchConnections();
        
        await connections.set( ip, {
            state: ConnectionState.Cold,
            type: ConnectionType.Outbound,
            webSocket: client
        });
    }

    private async handleClientMessage( this: WebSocket, data: RawData ): Promise<void>
    {
        /*TODO*/
    }

    private async removeConnection( ws: WebSocket, connections: Map<string, Connection> ): Promise<void> 
    {
        const ip = getWsClientIp( ws );
        if( !ip ) return;

        await connections.delete( ip );
    }

    async terminateConnection( address: string, connections: Map<string, Connection> ) 
    {
        this.logger.debug("!- TERMINATING THE CONNECTION -!\n");

        const connection = connections.get( address );
        if( !connection ) return;

        const clientWs = connection.webSocket;
        await clientWs.close(/*TODO*/);
        await this.removeConnection( clientWs, connections );
    }

    async terminateAllConnections( connections: Map<string, Connection> )
    {
        this.logger.debug("!- TERMINATING ALL THE CONNECTIONS -!\n");

        for( const address of connections.keys() )
        {
            await this.terminateConnection( address, connections );
        }
    }
}