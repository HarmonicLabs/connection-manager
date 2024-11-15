import { getWsClientIp, setWsClientIp } from "../utils/clientProps";
import { OutboundGovernor } from "../Governors/OutboundGovernor";
import { InboundGovernor } from "../Governors/InboundGovernor";
import { Connection, ConnectionState } from "../types/Connection";
import { Logger } from "../utils/Logger";
import { WebSocket } from "ws";


export class ConnectionManager 
{
    private connections: Map<string, Connection>;
    private outboundGovernor: OutboundGovernor;
    private inboundGovernor: InboundGovernor;

    logger: Logger;

    constructor( logger: Logger ) 
    {
        this.connections = new Map();
        this.outboundGovernor = new OutboundGovernor( this );
        this.inboundGovernor = new InboundGovernor( this );
        this.logger = logger;
    }

    async getConnections(): Promise< Map<string, Connection> > 
    {
        return this.connections;
    }

    async setConnection( client: WebSocket, ip: string ): Promise<void> 
    {
        const connection: Connection = {
            state: ConnectionState.Cold,
            type: "outbound",
            webSocket: client
        };
        
        this.connections.set( ip, connection );
    }

    async updateConnection( connection: Connection ): Promise<void> 
    {
        const ip = getWsClientIp( connection.webSocket );
        this.connections.set( ip, connection );
    }

    async removeConnection( connection: Connection ): Promise<void> 
    {
        const ip = getWsClientIp( connection.webSocket );
        this.connections.delete( ip );
    }

    async terminateConnection( address: string ) 
    {
        this.logger.debug("!- TERMINATING THE CONNECTION -!\n");

        const connection = this.connections.get( address );

        if( !connection ) return;
        this.removeConnection( connection );
    }

    async terminateAllConnections()
    {
        this.logger.debug("!- TERMINATING ALL THE CONNECTIONS -!\n");

        for( const address of this.connections.keys() )
        {
            // client.send( closeMsg );
            this.terminateConnection( address );
        }
    }
}