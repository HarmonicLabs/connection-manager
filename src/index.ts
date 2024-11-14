import { ConnectionManager } from "./ConnectionManager/ConnectionManager";
import { OutboundGovernor } from "./Governors/OutboundGovernor";
import { InboundGovernor } from "./Governors/InboundGovernor";
import { Logger, LogLevel } from "../utils/Logger";

const logger = new Logger({ logLevel: LogLevel.DEBUG });

const connectionManager = new ConnectionManager();

const outboundGovernor = new OutboundGovernor( connectionManager );

const inboundGovernor = new InboundGovernor( connectionManager );