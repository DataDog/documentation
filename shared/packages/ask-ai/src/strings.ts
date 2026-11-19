// TODO: localize these strings once `shared/i18n` has keys for them.

export const STRINGS = {
  /** Floating entry button and panel title. */
  askAi: "Ask AI",
  close: "Close",
  newQuestion: "New Question",
  changeView: "Change view",
  switchTo: "Switch to",
  send: "Send",
  stopGenerating: "Stop generating",
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
  feedbackFailed: "Couldn't send feedback. Try again.",
  feedbackReasonsTitle: "What went wrong?",
  feedbackReasonsOptional: "(optional)",
  feedbackReasonsDismiss: "Not now",
  feedbackReasonsSend: "Send",
  feedbackReasonsSending: "Sending…",
  feedbackReasonsFailed: "Couldn't send your feedback. Try again.",
  feedbackReasonsThanks: "Thanks, this helps us improve!",
  copySucceeded: "Copied to clipboard!",
  copyFailed: "Copy failed",

  requestFailed: "Something went wrong while answering. Try again in a moment.",
  emptyResponse: "No response received. Try again.",
  // Retrying the same request can't help, so these must not invite a retry.
  requestNotRetryable:
    "Docs AI can't answer this request. Start a new question instead.",
  requestRejected:
    "Docs AI couldn't process this question. Try shortening or rephrasing it.",
  tryAgain: "Try again",

  privacyPolicyUrl: "https://www.datadoghq.com/legal/privacy/",
  disclaimerBefore: "Your use of this AI-powered assistant is subject to our ",
  disclaimerLinkText: "Privacy Policy",
  disclaimerAfter: ". Please do not submit sensitive or personal information.",
} as const;

/** The research timeline above an answer. See `activity.ts`. */
export const ACTIVITY_STRINGS = {
  starting: "Thinking...",
  reviewing: "Reviewing the documentation...",
  headlineError: "Something went wrong",
  stopped: "Stopped",
  answerReady: "Answer ready",

  understanding: "Understanding your question",
  understood: "Understood your question",
  understandFailed: "Couldn't finish understanding your question",
  finding: "Finding relevant pages",
  lookedFor: "Looked for relevant pages",
  noRelevantPages: "No relevant pages",
  findingMore: "Finding more pages",
  lookedForMore: "Looked for more pages",
  noNewPages: "No new pages",
  searchFailed: "Finding pages didn't finish",
  searchStopped: "Stopped finding pages",
  checkingMore: "Checking more of the page",
  checkedMore: "Checked more of the page",
  readFailed: "Checking didn't finish",
  readStopped: "Stopped checking pages",
  writing: "Writing the answer",
  wrote: "Wrote the answer",
  writeFailed: "Answer interrupted",
  writeStopped: "Writing stopped",
} as const;

/** Offered after a thumbs-down. The ids are the feedback API's reason values. */
export const FEEDBACK_REASONS = [
  { id: "incorrect", label: "Incorrect" },
  { id: "not_relevant", label: "Didn't answer my question" },
  { id: "incomplete", label: "Missing details" },
  { id: "refused", label: "Refused to answer" },
  { id: "sources", label: "Wrong or broken links" },
  { id: "other", label: "Other" },
] as const;

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
