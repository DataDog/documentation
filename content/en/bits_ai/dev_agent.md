---
title: Bits AI Dev Agent
---

The Bits AI Dev Agent is a generative AI coding assistant that uses observability data to detect issues and suggest code changes. Integrated with Datadog products such as Error Tracking and APM, the Dev Agent surfaces high-impact problems, creates pull requests with test coverage, and automatically updates code in response to developer comments.

## Supported Datadog products

| Product        | Availability         | Types of issues detected                              |
| -------------- | -------------------- | ----------------------------------------------------- |
| Error Tracking | placeholder          | Crashes, panics, exceptions, unhandled errors         |
| APM (Tracing)  | placeholder          | Latency bottlenecks, slow spans in distributed traces |
| Code Security  | placeholder          | Security vulnerabilities in source code               |

## Requirements

To use the Dev Agent, your environment must be integrated with GitHub. The Agent uses this connection to create pull requests, apply code updates, and track changes as it responds to developer feedback.

## Key capabilities

- **Creates pull requests with proposed fixes**  
  When the Dev Agent detects an issue such as a crash, exception, or security vulnerability, it opens a GitHub pull request with a description of the problem and a proposed fix that follows your team’s PR template.
- **Adds test coverage for proposed changes**  
  Each PR includes unit tests to validate the fix and prevent regressions. If developers suggest changes, the agent updates the tests accordingly.
- **Responds to PR feedback**  
  Developers can leave comments requesting alternate logic, logging, or status codes. The agent updates the code in response and commits the changes automatically.
- **Surfaces root causes in distributed traces**  
  For performance issues, the Dev Agent analyzes traces to identify high-latency spans and recommends specific fixes, such as caching repeated GitHub auth calls.
- **Tracks all activity in a central dashboard**  
  A dedicated interface shows every agent-generated PR, including status, service, triggering signal, and whether it’s under review, updated, or merged.

## How it works

The Dev Agent monitors supported Datadog products for high-impact issues such as runtime errors, security vulnerabilities, and trace-based performance bottlenecks. When it detects an issue, it follows a standard workflow:

1. **Proposes a fix**  
   The Agent creates a GitHub pull request that includes a description of the issue, a proposed code change, and test coverage to validate the fix.
2. **Listens for feedback**  
   If reviewers leave comments or request updates, the Agent modifies the code and re-commits changes as needed.
3. **Validates the update**  
   Each proposed change is tested to ensure correctness and prevent regressions. Test results are reflected in the PR status.
4. **Surfaces trace insights (when applicable)**
   If the issue is performance-related, the Agent identifies the root-cause span in the trace and explains its impact on latency. It then suggests code-level optimizations.
5. **Provides visibility through a dashboard**  
   Teams can view, filter, and track all Dev Agent activity from a centralized interface. This makes it easy to see what’s been fixed and what’s still in progress.