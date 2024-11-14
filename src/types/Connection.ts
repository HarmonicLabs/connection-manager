export type ConnectionType = "inbound" | "outbound" | "duplex";

export enum ConnectionState 
{
    Cold = "Cold",
    Warm = "Warm",
    Hot = "Hot",
};

export type Connection = {
    state: ConnectionState;
    type: ConnectionType;
    peerAddress: string;
};