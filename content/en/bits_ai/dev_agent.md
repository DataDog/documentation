---
title: Bits AI Dev Agent
---

The Bits AI Dev Agent is a generative AI coding assistant that uses observability data to detect issues and suggest code changes. Integrated with Datadog products such as Error Tracking and Code Security, the Dev Agent surfaces high-impact problems, creates pull requests with test coverage, and automatically updates code in response to developer comments.

[Placeholder for screenshot]

## Supported Datadog products

| Product        | Availability         | Types of issues detected                              |
| -------------- | -------------------- | ----------------------------------------------------- |
| Error Tracking | placeholder          | Crashes, panics, exceptions, unhandled errors         |
| Code Security  | placeholder          | Security vulnerabilities in source code               |

## Requirements

To use the Dev Agent, you must enable the GitHub integration. The Agent uses this connection to create pull requests, apply code updates, and track changes as it responds to developer feedback.

### Key capabilities

| Capability                                       | Description                                                                                                                                                    |
|--------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Proposes GitHub pull requests with fixes         | Opens a PR with a fix when a high-impact issue is detected. The PR includes a description of the problem, a proposed change, and links to the original signal. |
| Adds unit tests to validate proposed changes     | Automatically generates tests to verify the correctness of the fix and prevent regressions.                                                                    |
| Responds to developer feedback in PRs            | Updates the code based on comments, such as changing logic, adding logging, or returning a different status code.                                              |
| Tracks Dev Agent activity in a central dashboard | Shows the status of each PR, including the affected service, source, and whether it's under review, updated, or merged.                                        |