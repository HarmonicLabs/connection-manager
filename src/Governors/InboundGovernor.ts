import { ConnectionManager } from "../ConnectionManager/ConnectionManager";
import { Connection } from "../types/Connection";

export class InboundGovernor
{
    private connections: Map<string, Connection> = new Map();
    private connectionManager: ConnectionManager;

    constructor( cm: ConnectionManager ) 
    {
        this.connectionManager = cm;
    }
}