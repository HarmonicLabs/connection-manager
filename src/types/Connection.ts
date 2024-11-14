export enum ConnectionState 
{
    Reserved = "Reserved",
    NegotiatedOutbound = "NegotiatedOutbound",
    NegotiatedInbound = "NegotiatedInbound",
    PromotedToWarmDuplexLocal = "PromotedToWarmDuplexLocal",
    AwakeDuplexLocal = "AwakeDuplexLocal",
    Accepted = "Accepted",
    Overwritten = "Overwritten",
};
  
export type Connection = {
    id: string;
    state: ConnectionState;
    type: "inbound" | "outbound" | "duplex";
    peerAddress: string;
};