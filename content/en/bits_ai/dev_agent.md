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

