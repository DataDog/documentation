/** Where an `ask()` call came from. Reported as the `trigger` on first open. */
export type TriggerSource =
  "floating_button" | "home_hero" | "search_suggestion" | "entry_button";

export type ViewMode = "fullscreen" | "floating" | "sidebar";

/** The subset of view modes the user can drag to resize. Not `fullscreen`. */
export type ResizableMode = Extract<ViewMode, "sidebar" | "floating">;

export type Dimension = "width" | "height";

/** Which dimensions a given resize handle drives. */
export type ResizeAxis = "left" | "top" | "corner";

export interface SizeConfig {
  /** Custom property the clamped size is written to, on <html>. */
  cssVar: string;
  storageKey: string;
  default: number;
  min: number;
  maxPx: number;
  /** Upper bound as a fraction of the viewport, applied alongside `maxPx`. */
  maxViewportPct: number;
  /** Gap between the pointer and the viewport edge, in px. */
  viewportOffset: number;
}

/**
 * `floating` is resizable in both dimensions and `sidebar` only in width. The
 * `Partial` is what expresses that, so reading `sidebar.height` is a type error
 * rather than a runtime guard.
 */
export type ResizableModeTable = Record<
  ResizableMode,
  Partial<Record<Dimension, SizeConfig>>
>;

/** A citation parsed out of an answer, in either of the two source formats. */
export interface Source {
  number: number;
  href: string;
  label: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Every telemetry payload the widget emits, discriminated by `action`. Adding
 * an event means adding a member to this union.
 */
export type AskAiActionPayload =
  | { action: "impression"; page: string }
  | { action: "open_first_time"; trigger: TriggerSource }
  | { action: "view_mode_changed"; view_mode: ViewMode }
  | {
      action: "panel_resized";
      mode: ResizableMode;
      axes: Dimension[];
      width_px: number | undefined;
      height_px: number | undefined;
    }
  | {
      action: "source_ref_click";
      source_number: number | null;
      source_url: string | null;
      source_title: string | null;
    }
  | {
      action: "source_card_click";
      source_number: number | null;
      source_url: string | null;
      source_title: string | null;
    }
  | { action: "suggestion_clicked"; suggestion_query: string }
  | { action: "link_clicked"; link_url: string; link_text: string }
  | { action: "new_chat" }
  | {
      action: "conversation_close";
      messages_sent: number;
      responses_received: number;
    }
  | { action: "response_received"; response_length: number; latency_ms: number }
  | {
      action: "feedback";
      feedback: "positive" | "negative";
      response_content: string;
    }
  | {
      action: "copy";
      copy_type: "snippet" | "full_response";
      content_length: number;
    };

/** Context every log call carries, independent of the action. */
export interface LogContext {
  conversationId: string | null;
  /**
   * `undefined` rather than `false` when no `getIsDatadogUser` was supplied, so
   * the tag can be omitted. An absent key is queryable as "not measured"; a
   * `false` would be indistinguishable from a real signed-out visitor.
   */
  isDatadogUser: boolean | undefined;
}

/**
 * Read at log time, not at wire-up time. A button bound during one conversation
 * can be clicked after "New Question" has started another, and the event has to
 * carry the id current at the click.
 */
export type LogContextProvider = () => LogContext;
