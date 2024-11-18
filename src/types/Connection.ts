import { WebSocket } from "ws";

export enum ConnectionType 
{
    Inbound = "inbound",
    Outbound = "outbound",
    Duplex = "duplex",
};

export enum ConnectionState 
{
    Cold = "Cold",
    Warm = "Warm",
    Hot = "Hot",
};

export type Connection = {
    state: ConnectionState;
    type: ConnectionType;
    webSocket: WebSocket;
};