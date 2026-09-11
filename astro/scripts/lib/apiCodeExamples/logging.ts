const LOG_PREFIX = "fetch:examples";

export function logProgress(message: string): void {
  console.log(`${LOG_PREFIX}: ${message}`);
}

export function logWarning(message: string): void {
  console.warn(`${LOG_PREFIX}: ${message}`);
}

export function logError(message: string): void {
  console.error(`${LOG_PREFIX}: ${message}`);
}
