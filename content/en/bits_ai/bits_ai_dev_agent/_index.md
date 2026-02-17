---
title: Bits AI Dev Agent
further_reading:
  - link: "https://www.datadoghq.com/blog/bits-ai-dev-agent/"
    tag: "Blog"
    text: "Automatically identify issues and generate fixes with the Bits AI Dev Agent"
---

{{< callout url="http://datadoghq.com/product-preview/bits-ai-dev-agent" >}}
Bits AI Dev Agent is in Preview. To sign up, click <strong>Request Access</strong> and complete the form.
{{< /callout >}}

## Overview

{{< img src="bits_ai/dev_agent/error_tracking_assistant.png" alt="Bits AI Dev Agent suggesting a fix for an IndexError in a Django app" style="width:100%;">}}

Bits AI Dev Agent is a generative AI coding assistant that uses observability data from Datadog to automatically diagnose and fix issues in your code. It integrates with GitHub to create production-ready pull requests, iterates on fixes using CI logs and developer feedback, and draws on multiple Datadog products to generate contextual fixes.

Each time the Dev Agent investigates an issue or generates a fix, it creates a [**code session**][7], which captures the agent's analysis, actions, and any resulting code changes across supported Datadog products.

## Supported Datadog products

Bits AI Dev Agent is available for the following Datadog products:

| Product                   | Availability         | Capabilities                                                       |
|---------------------------|----------------------|--------------------------------------------------------------------|
| [Error Tracking][1]       | Preview              | Diagnoses issues and generates code fixes on-demand or autonomously|
| [Trace Explorer][11]      | Preview              | Analyzes traces and provides remediations for errors and latency bottlenecks |
| [Code Security][2]        | Preview              | Remediates code vulnerabilities individually or in bulk    |
| [Test Optimization][4]    | Preview              | Provides code fixes for flaky tests and verifies that tests remain stable                                                         |
| [Continuous Profiler][3]  | Preview              | Provides code changes for [Automated Analysis][10] insights                  |
| [Containers][12]          | Preview              | Provides code changes for [Kubernetes Remediations][13]                  |

**Note**: Enabling Bits AI Dev Agent is product-specific. Even if it's active for one Datadog product, it must be separately enabled for each additional product you use.

## Key capabilities 

The following sections detail how Bits AI Dev Agent integrates with Datadog products to generate contextual code fixes.

### Pull request assistance

Bits AI Dev Agent integrates with GitHub to create pull requests, respond to comments, update commits, and fix CI failures. 

- Generates PR titles and descriptions based on your PR template.
- Opens PRs as drafts, iterates using CI logs, and marks the PRs as ready for review when checks pass.
- Continues iterating in response to chat messages and review feedback.
  
  **Note**: Comment `@Datadog` to prompt Bits for updates to the PR. Bits Dev never auto-merges PRs.

Go to **Bits AI** > **Dev Agent** > **[Code sessions][7]** to see all Dev Agent code sessions and generated PRs. You can search sessions and filter by service, product source, and status.

### Auto-push

Auto-push allows the Dev Agent to create branches, push code, and open PRs when it detects something it can help you with. For example, the Dev Agent can:
- Auto-create PRs for high-impact errors (such as 500s or crashes).
- Update PRs in response to your comments in GitHub.
- Update PRs to address CI failures.

Auto-push only opens PRs and pushes changes; it never merges code. When auto-push is disabled, you must review code in Datadog before it gets pushed.

Auto-push is available for Error Tracking and Test Optimization. 

#### Security considerations

Allowing any AI-based tool to read untrusted data can let attackers influence its output. Auto-push behavior depends on the type of data the Dev Agent works with: code-only workflows operate on source code the Agent can inspect directly, while telemetry-based workflows (such as errors or traces) may include untrusted runtime inputs.

To balance safety and automation, you can configure auto-push behavior in [Datadog][14] (for example, limiting auto-push to code-only workflows or requiring review when telemetry is involved). Datadog scans all Agent-generated code before pushing changes, but these safeguards are not foolproof.

### Error tracking

In [Error Tracking][1], Bits AI Dev Agent diagnoses and remediates code issues with context and unit-tested fixes:
- Determines whether an error can be fixed through code and generates a fix with unit tests.
- Provides links within the chat to relevant files and methods for streamlined navigation.
- Analyzes errors asynchronously as they arrive.
- Marks errors with a **Fix available** status and enables filtering to surface those issues.

[Auto-push](#auto-push) is available for this feature. 

### Flaky test management 

Bits AI Dev Agent fixes flaky tests that are detected through Flaky Test Management in [Test Optimization][4] and attempts to verify that tests remain stable.

[Auto-push](#auto-push) is available for this feature. 

### Trace investigation

Bits AI Dev Agent debugs errors and latency directly from [traces][11] using natural language queries:
- Analyzes and summarizes large traces.
- Determines likely root causes for errors and latency.
- Generates code fixes when prompted.

### Product recommendations

Bits AI Dev Agent applies automated code changes based on Datadog insights such as CCM Recommendations, APM Recommendations, and Profiling Insights.

### Code security

Bits AI Dev Agent remediates vulnerabilities at scale, from single issues to large backlogs. You can:
- Create PR batches to fix multiple vulnerabilities at once.
- Use the Campaign tool to push PRs incrementally and manage review workload across teams.

Datadog Code Security uses Bits AI to enhance static analysis and generate remediation suggestions, which can be reviewed and applied through the Bits AI Dev Agent. Learn more about [AI-Enhanced Static Code Analysis][15].

## Get started

To enable Bits AI Dev Agent, see [Setup][6].

## Limitations

- Bits Dev is an AI product, which means it can make mistakes. Use best practices when reviewing and testing agent-generated code.  
- Bits AI Dev Agent does not support multi-repository investigations.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /error_tracking
[2]: /security/code_security
[3]: /profiler/
[4]: /tests/
[5]: https://app.datadoghq.com/integrations/github
[6]: /bits_ai/bits_ai_dev_agent/setup/
[7]: https://app.datadoghq.com/code
[8]: /bits_ai/bits_ai_sre/
[10]: /profiler/automated_analysis/
[11]: /tracing/trace_explorer/
[12]: /containers/
[13]: /containers/bits_ai_kubernetes_remediation
[14]: https://app.datadoghq.com/code/settings
[15]: /security/code_security/static_analysis/ai_enhanced_sast/