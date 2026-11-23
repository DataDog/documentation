import { getCredentials, resolveEnv, type AskAiEnv } from "./config";
import { logAction, logError } from "./logger";
import { AskAiPanel } from "./panel";
import type { LogContext, TriggerSource } from "./types";

export { ASK_AI_ENVS } from "./config";
export type { AskAiEnv } from "./config";
export type { TriggerSource } from "./types";

export interface AskAiConfig {
  /** Overrides the `data-env` read off `<html>`. Hosts should not normally pass it. */
  env?: AskAiEnv;
  /** Absent → the package behaves as if the flag were true. */
  isEnabled?: () => Promise<boolean>;
  /** Absent → the `is_datadog_user` tag is omitted rather than sent as false. */
  getIsDatadogUser?: () => Promise<boolean>;
}

export interface AskAiHandle {
  /** Opens the panel, optionally prefilling and auto-submitting a query. */
  ask(query: string, options?: { source?: TriggerSource }): void;
  /** Removes every node the package added and aborts any in-flight request. */
  teardown(): void;
}

/** Before a conversation exists and before the host has reported anything. */
const EMPTY_LOG_CONTEXT: LogContext = {
  conversationId: null,
  isDatadogUser: undefined,
};

/**
 * One widget per document. Astro's searchbar islands each call `mountAskAi`
 * without knowing about each other, so idempotency is part of the contract
 * rather than a convenience.
 */
let mountedWidget: { handle: AskAiHandle; panel: AskAiPanel } | null = null;

/**
 * Mounts the Ask AI widget and returns a handle to it. Calling it again returns
 * the same handle; calling it after `teardown()` mounts afresh.
 *
 * The widget mounts before the host's capabilities resolve, on the assumption
 * that it is enabled — Hugo's tradeoff, kept: a brief flash during a rare
 * incident costs less than shifting the layout of every normal page load.
 */
export function mountAskAi(config: AskAiConfig = {}): AskAiHandle {
  if (mountedWidget) return mountedWidget.handle;

  // Filled in once the host reports, and read at log time rather than closed
  // over, so events sent before the answer arrives are simply untagged.
  let isDatadogUser: boolean | undefined;

  const panel = new AskAiPanel({
    credentials: getCredentials(resolveEnv(config.env)),
    getIsDatadogUser: () => isDatadogUser,
  });

  const handle: AskAiHandle = {
    ask: (query, options) => panel.ask(query, options),
    teardown: () => {
      panel.teardown();
      if (mountedWidget?.handle === handle) mountedWidget = null;
    },
  };
  mountedWidget = { handle, panel };

  void applyHostCapabilities(config, handle, (value) => {
    isDatadogUser = value;
  });

  return handle;
}

async function applyHostCapabilities(
  config: AskAiConfig,
  handle: AskAiHandle,
  setIsDatadogUser: (value: boolean | undefined) => void,
): Promise<void> {
  // Resolved before the flag, so the impression below carries the tag.
  const isDatadogUser = await resolveCapability(
    config.getIsDatadogUser,
    "getIsDatadogUser",
  );
  setIsDatadogUser(isDatadogUser);

  const isEnabled = await resolveCapability(config.isEnabled, "isEnabled");
  if (isEnabled === false) {
    handle.teardown();
    return;
  }

  logAction(
    "Conversational Search Impression",
    { action: "impression", page: window.location.pathname },
    { conversationId: null, isDatadogUser },
  );
}

/**
 * A capability that rejects is treated as absent, which for the flag means
 * enabled: a host service that is down must not take the widget with it.
 */
async function resolveCapability<T>(
  capability: (() => Promise<T>) | undefined,
  name: string,
): Promise<T | undefined> {
  if (!capability) return undefined;

  try {
    return await capability();
  } catch (error) {
    logError(`Ask AI ${name} failed`, error, EMPTY_LOG_CONTEXT);
    return undefined;
  }
}
