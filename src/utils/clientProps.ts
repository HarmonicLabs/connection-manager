import { TxOutRefStr, AddressStr } from "@harmoniclabs/cardano-ledger-ts";
import type { WebSocket } from "ws";

export function getWsClientIp( client: WebSocket ): string
{
    return (client as any).REMOTE_IP as AddressStr;
}

export function setWsClientIp( client: WebSocket, ip: string ): void
{
    (client as any).REMOTE_IP = ip as AddressStr;
}