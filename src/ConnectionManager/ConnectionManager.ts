import { Connection, ConnectionState } from "../types/Connection";

export class ConnectionManager 
{
    private connections: Map<string, Connection> = new Map();
  
    constructor() {}

    async getConnections(): Promise< Map<string, Connection> > 
    {
        return this.connections;
    }

    async setConnection( connection: Connection ): Promise<void> 
    {
        this.connections.set( connection.peerAddress, connection );
    }

    async updateConnection( connection: Connection ): Promise<void> 
    {
        this.connections.set( connection.peerAddress, connection );
    }

    async removeConnection( connection: Connection ): Promise<void> 
    {
        this.connections.delete( connection.peerAddress );
    }
}