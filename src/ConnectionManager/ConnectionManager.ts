import { Connection, ConnectionState } from "../types/Connection";

export class ConnectionManager {
    private connections: Map<string, Connection> = new Map();
  
    constructor() {}
  
    private async negotiateConnection( peerAddress: string ): Promise<ConnectionState> 
    {
        return new Promise(( resolve ) => {
            setTimeout(() => resolve( ConnectionState.NegotiatedOutbound), 1000 );
        });
    }
  
    async requestOutboundConnection( peerAddress: string ): Promise<Connection | Error> 
    {
        let connection = this.connections.get( peerAddress );
    
        if( connection && connection.type === "duplex" ) 
        {
            connection.state = ConnectionState.PromotedToWarmDuplexLocal;
            return connection;
        }
    
        connection = { id: peerAddress, state: ConnectionState.Reserved, type: "outbound", peerAddress };
        this.connections.set( peerAddress, connection );
    
        try 
        {
            connection.state = await this.negotiateConnection( peerAddress );
            connection.state = ConnectionState.AwakeDuplexLocal;
            connection.type = "duplex";
            return connection;
        } 
        catch( error ) 
        {
            return new Error("Failed to negotiate outbound connection.");
        }
    }
  
    async includeInboundConnection( peerAddress: string ): Promise<Connection | Error> 
    {
        let connection = this.connections.get( peerAddress );

        if( connection ) 
        {
            connection.state = ConnectionState.Overwritten;
        } 
        else 
        {
            connection = { id: peerAddress, state: ConnectionState.Accepted, type: "inbound", peerAddress };
            this.connections.set( peerAddress, connection );
        }
    
        try 
        {
            connection.state = await this.negotiateConnection( peerAddress );
            connection.state = ConnectionState.NegotiatedInbound;
            return connection;
        } 
        catch( error ) 
        {
            return new Error("Failed to negotiate inbound connection.");
        }
    }
}