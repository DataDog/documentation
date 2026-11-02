// TODO: localize these strings once `shared/i18n` has keys for them.

export const STRINGS = {
  /** Floating entry button and panel title. */
  askAi: "Ask AI",
  close: "Close",
  newQuestion: "New Question",
  changeView: "Change view",
  switchTo: "Switch to",
  send: "Send",
  inputPlaceholder: "Ask a question...",
  info: "Info",
  disclaimerTooltip:
    "AI-generated responses may be inaccurate. Verify important info.",

  resizeWidth: "Resize width",
  resizeHeight: "Resize height",
  resizeBoth: "Resize width and height",

  modeFloating: "Floating",
  modeSidebar: "Sidebar",
  modeFullscreen: "Full screen",

  emptyTitle: "How can I help you today?",
  emptySubtitle: "Ask me anything about Datadog documentation",

  sourcesTitle: "Sources",

  goodResponse: "Good response",
  badResponse: "Bad response",
  copyResponse: "Copy response",
  copyCode: "Copy code",
  feedbackThanks: "Thanks for your feedback!",
  copySucceeded: "Copied to clipboard!",
  copyFailed: "Copy failed",

  requestCancelled: "Request cancelled.",
  requestFailed: "Sorry, something went wrong. Please try again.",
  emptyResponse: "No response received. Please try again.",

  privacyPolicyUrl: "https://www.datadoghq.com/legal/privacy/",
  disclaimerBefore: "Your use of this AI-powered assistant is subject to our ",
  disclaimerLinkText: "Privacy Policy",
  disclaimerAfter: ". Please do not submit sensitive or personal information.",
} as const;

/**
 * Rotated client-side while waiting for the first server `thinking` event.
 * Worded the same as the mapped server messages below, so the copy reads
 * consistently whichever arrives first.
 */
export const LOADING_MESSAGES = [
  "Understanding your question…",
  "Searching the docs…",
  "Reading the most relevant pages…",
  "Drafting your response…",
] as const;

/**
 * Maps a backend `thinking` event to user-facing copy. Unknown keys fall
 * through to the server's own message, so a new backend stage still surfaces
 * something.
 */
export const THINKING_MESSAGES: Record<string, string> = {
  "Rewriting query...": "Understanding your question…",
  "Searching documentation...": "Searching the docs…",
  "Reviewing relevant pages": "Reading the most relevant pages…",
  "Generating answer...": "Drafting your response…",
  "Something went wrong. Please try again.":
    "Something went wrong. Try asking again.",
};

export const SUGGESTED_QUESTIONS = [
  "What is the Datadog Agent?",
  "How to define a Datadog monitor in Terraform (example)?",
  "Which OpenTelemetry semantic conventions should I use for LLM traces in Datadog?",
  "How do I install the Datadog Agent on a Linux host?",
  "What are Datadog API and application keys, and how do I create them?",
  "How do I tag my infrastructure in Datadog?",
  "How do I set up APM tracing for a Python application?",
  "What is the difference between a service, a resource, and a trace in Datadog APM?",
  "How do I send logs from a Docker container to Datadog?",
  "How do I create a log processing pipeline to parse custom logs?",
  "How do I monitor Kubernetes clusters with Datadog?",
  "How do I set up the AWS integration with Datadog?",
  "How do I create a metric monitor with alert conditions in Datadog?",
  "What monitor types are available in Datadog?",
  "How do I build a custom dashboard with template variables?",
  "How do I create a Synthetic API test to monitor an endpoint?",
  "How do I set up Real User Monitoring (RUM) for a web application?",
  "How do I monitor AWS Lambda functions with Datadog?",
  "How do I enable Continuous Profiler for a Java service?",
  "How do I trace LLM application calls with Datadog Agent Observability?",
  "How do I create a Service Level Objective (SLO) in Datadog?",
  "How do I send OpenTelemetry traces to Datadog?",
  "How do I track AWS cloud costs in Datadog?",
] as const;
