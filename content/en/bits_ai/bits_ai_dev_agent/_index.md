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

## Supported Datadog products

Bits AI Dev Agent is available for the following Datadog products:

| Product                   | Availability         | Capabilities                                                       |
|---------------------------|----------------------|--------------------------------------------------------------------|
| [Error Tracking][1]       | Preview              | Diagnoses issues and generates code fixes on-demand or autonomously|
| [Trace Explorer][11]      | Preview              | Analyzes traces and provides remediations for errors and latency bottlenecks |
| [Code Security][2]        | Preview              | Remediates code vulnerabilities individually or in bulk    |
| [Test Optimization][4]    | Preview              | Provides code fixes for flaky tests and verifies that tests won't flake again.                                                         |
| [Continuous Profiler][3]  | Preview              | Provides code changes for [Automated Analysis][10] insights                  |
| [Containers][12  ]        | Preview              | Provides code changes for Container Recommendations                  |

## Key capabilities 

The following details how Bits AI Dev Agent integrates with Datadog products to generate contextual code fixes.

### Error tracking

Bits AI Dev Agent diagnoses and remediates code issues with context and unit-tested fixes:
- Determines whether an error can be fixed through code and generates unit tests.
- Provides links to relevant files and methods for streamlined navigation.
- Analyzes errors asynchronously as they arrive.
- Marks errors with a **Fix available** status and enables filtering to surface those issues.

### Test optimization: Flaky test management 

Bits AI Dev Agent fixes flaky tests that are detected through Flaky Test Management in Test Optimization and attempts to  verifies that tests remain stable.

Auto-Push is available for this feature. 

### Trace investigation

Bits AI Dev Agent debugs errors and latency directly from traces using natural language queries:
- Analyzes and summarizes large traces.
- Determines likely root causes for errors and latency.
- Generates code fixes when prompted.

### Product recommendations

Bits AI Dev Agent applies automated code changes based on Datadog insights such as CCM Recommendations, APM Recommendations, and Profiling Insights.

### Code security

Bits AI Dev Agent remediates vulnerabilities at scale, from single issues to large backlogs. You can:
- Create PR batches to fix multiple vulnerabilities at once.
- Use the Campaign tool to push PRs incrementally and manage review workload across teams.

### Pull request assistance

Bits AI Dev Agent integrates with GitHub to create pull requests, respond to comments, update commits, and fix CI failures. 

- Generates PR titles and descriptions based on your PR template.
- Opens PRs as drafts, iterates using CI logs, and marks them ready for review when checks pass.
- Continues iterating in response to chat messages and review feedback.
  **Note**: Comment `@Datadog` to prompt Bits for updates to the PR. Bits Dev will never auto-merge PRs.

Go to **Bits AI** > **Dev Agent** > **[Code sessions][7]** to see all Dev Agent code sessions and generated PRs. You can search sessions and filter by service, product source, and status.

Learn more about [PR automation and CI iteration][9].

### Bits AI SRE integration 

Bits AI Dev Agent generates fixes from SRE-led investigations. Learn more about [Bits AI SRE][8].

## Get started

To enable Bits AI Dev Agent:

1. Install the [GitHub integration][5].  
2. Grant the required permissions.  
3. Send CI logs to Datadog if you want the Dev Agent to iterate on PRs using build feedback.  

For full installation and configuration instructions, see [Setup][6].

## Limitations

- Bits Dev is an AI product, which means it can make mistakes. Use best practices when reviewing and testing agent-generated code.  
- Bits AI Dev Agent does not support multi-repository investigations.

## Security considerations

Observability data (such as traces, logs, and metrics) can include content from untrusted sources. Attackers might attempt to inject this data to influence agent behavior (for example, by injecting prompts that cause unintended code changes).

Datadog applies automated security and quality checks on agent output, but safeguards are limited and may not detect all malicious or unsafe code. Review and test all changes generated by the Dev Agent before merging them into production.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /error_tracking
[2]: /security/code_security
[3]: /profiler/
[4]: /tests/
[5]: https://app.datadoghq.com/integrations/github
[6]: /bits_ai_dev_agent/setup/
[7]: https://app.datadoghq.com/code?tab=my-sessions
[8]: /bits_ai/bits_ai_sre/
[9]: /bits_ai/bits_ai_dev_agent/pr_automation_and_ci_repair/
[10]: /profiler/automated_analysis/
[11]: /tracing/trace_explorer/
[12]: /containers/
