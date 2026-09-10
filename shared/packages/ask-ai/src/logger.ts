import type { AskAiActionPayload, LogContext } from "./types";

/**
 * A structural minimum for the two SDK globals, rather than the SDKs' own
 * types. Importing `@datadog/browser-rum` to get its types would add the
 * dependency this package avoids: a Hugo page that loaded both would end up
 * with two RUM instances.
 */
type SdkContext = Record<string, unknown>;

interface RumGlobal {
  addAction(name: string, context?: SdkContext): void;
  addError(error: unknown, context?: SdkContext): void;
}

interface LogsGlobal {
  logger?: {
    info(message: string, context?: SdkContext, status?: string): void;
    error(message: string, context?: SdkContext, status?: string): void;
  };
}

declare global {
  interface Window {
    DD_RUM?: RumGlobal;
    DD_LOGS?: LogsGlobal;
  }
}

const RUM_ACTION_NAME = "conversational_search_action";

/** Fields every event carries, whatever the action. */
function withCommonFields(
  payload: AskAiActionPayload,
  { conversationId, isDatadogUser }: LogContext,
): Record<string, unknown> {
  return {
    docs_ai: true,
    // Both are omitted rather than sent as null or false when unknown, so an
    // absent key reads as "not measured" rather than as a measured negative.
    ...(isDatadogUser !== undefined && { is_datadog_user: isDatadogUser }),
    ...(conversationId && { conversation_id: conversationId }),
    ...payload,
  };
}

export function logAction(
  message: string,
  payload: AskAiActionPayload,
  context: LogContext,
): void {
  const event = withCommonFields(payload, context);

  window.DD_LOGS?.logger?.info(
    message,
    { conversational_search: event },
    "info",
  );
  window.DD_RUM?.addAction(RUM_ACTION_NAME, event);
}

export function logError(
  message: string,
  error: unknown,
  { conversationId, isDatadogUser }: LogContext,
): void {
  const event = {
    docs_ai: true,
    ...(isDatadogUser !== undefined && { is_datadog_user: isDatadogUser }),
    ...(conversationId && { conversation_id: conversationId }),
    error_message: error instanceof Error ? error.message : String(error),
    error_name: error instanceof Error ? error.name : "Error",
  };

  console.error("[Ask AI] Error:", message, event);

  window.DD_LOGS?.logger?.error(
    message,
    { conversational_search: event },
    "error",
  );
  window.DD_RUM?.addError(new Error(message), {
    conversational_search: event,
  });
}
