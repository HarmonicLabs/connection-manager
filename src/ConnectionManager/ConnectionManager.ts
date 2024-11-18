import { OutboundGovernor } from "../Governors/OutboundGovernor";
import { InboundGovernor } from "../Governors/InboundGovernor";
import { Connection } from "../types/Connection";
import { Logger } from "../utils/Logger";

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

    async terminateAllConnections(): Promise<void>
    {
        this.outboundGovernor.terminateAllConnections( this.connections );
    }
}