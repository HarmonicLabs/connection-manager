import { Connection, ConnectionState, ConnectionType } from "../types/Connection";
import { ConnectionManager } from "../ConnectionManager/ConnectionManager";

export class OutboundGovernor
{
    private connections: Map<string, Connection> = new Map();
    private connectionManager: ConnectionManager;

    constructor( cm: ConnectionManager ) 
    {
        this.connectionManager = cm;
    }

    private async fetchConnections(): Promise<void> 
    {
        await this.connectionManager.getConnections();
    }

    private async setConnection( state: ConnectionState, type: ConnectionType, peerAddress: string ): Promise<void>
    {
        await this.connectionManager.setConnection({
            state,
            type,
            peerAddress
        });
    }

    async acquireConnection( peerAddress: string ): Promise<Connection | Error> 
    {
        return new Promise(( resolve ) => {});
    }

    async releaseConnection( peerAddress: string ): Promise<Connection | Error> 
    {
        return new Promise(( resolve ) => {});
    }
}