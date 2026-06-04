---
title: Bits Code
further_reading:
  - link: "https://www.datadoghq.com/blog/bits-ai-dev-agent/"
    tag: "Blog"
    text: "Automatically identify issues and generate fixes with Bits Code"
  - link: "https://www.datadoghq.com/blog/bitsai-dev-agent-code-security"
    tag: "Blog"
    text: "Introducing Bits Code for Code Security"
  - link: "/account_management/billing/ai_credits/"
    tag: "Documentation"
    text: "AI Credits"
---

## Overview

Bits Code is a generative AI coding assistant that uses Datadog observability data to automatically diagnose and fix issues in your code. It integrates with GitHub to create production-ready pull requests, then iterates on changes using CI logs and developer feedback.

{{< img src="bits_ai/dev_agent/sessions_overview.png" alt="A tab titled 'Sessions' shows a text field with suggestions underneath" style="width:100%;" >}}

Each time Bits Code investigates an issue or generates a fix, it creates a [session](#sessions), which captures the agent's analysis, actions, and any resulting code changes across supported Datadog products.

To get started with Bits Code, [set up the GitHub integration][6] and complete any additional configuration. Then, [start your first session](#start-a-session).

## Sessions
A session captures a segment of work with Bits Code, including its analysis and code changes. Start, view, and manage your sessions at **Bits AI** > **Code** > [**Sessions**][7].

{{< img src="bits_ai/dev_agent/code_fix.png" alt="A code session showing a Bits AI summary and task list on the left and a code diff on the right" style="width:100%;" >}}

### Start a session
After [completing setup][6], do one of the following to start a Bits Code session:
- Enter a freeform prompt at [**Sessions**][7]: enter a custom prompt or generate one by clicking a **Suggestions** or **Proactive Fixes** card
- Invoke Bits Code in a [supported Datadog product](#supported-datadog-products)

A session can also be created when another Bits AI agent (like [Bits Chat][16] or [Bits Investigation][17]) hands off a coding task to Bits Code.

### View and manage sessions
On **[Sessions][7]**, view your past sessions in the **My Sessions** panel. A session appears here if you initiated it or interacted with it in some way, like participating in the conversation or creating an associated PR.

Click a session to view its details and continue working with Bits Code. To remove a session from your **My Sessions** list, click <i class="icon-archive-wui"></i> (**Archive for everyone**) or <i class="icon-eye-slashed-wui"></i> (**Unwatch session**).

## Supported Datadog products

Bits Code can suggest code improvements in the following Datadog products:

| Product                   | Capabilities                                                       |
|---------------------------|--------------------------------------------------------------------|
| [APM][20]                 | Proposes code changes for relevant [APM Recommendations][21]|
| [Bits Investigation][17]         | Generates code remediations based on Bits Investigations |
| [Bits Chat][16]   | Suggests code changes arising from Bits Chat conversations |
| [Cloud Cost][22]          | Generates code changes for [Cloud Cost Recommendations][23] |
| [Error Tracking][1]       | Diagnoses issues and generates code fixes on-demand or autonomously |
| [Code Security][2]        | Remediates [SAST vulnerabilities][15] individually or in bulk  |
| [Test Optimization][4]    | Provides code fixes for [flaky tests][24] and verifies that tests remain stable  |
| [Continuous Profiler][3]  | Provides code changes for [Automated Analysis][10] insights   |
| [Containers][12]          | Provides code changes for [Kubernetes Remediations][13]  |

**Note**: Enabling Bits Code is product-specific. Even if it's active for one Datadog product, it must be separately enabled for each additional product you use.

## Key capabilities 

The following sections detail how Bits Code integrates with Datadog products to generate contextual code fixes.

### Pull request assistance

Bits Code integrates with GitHub to create pull requests, respond to comments, update commits, and fix CI failures. 

- Generates PR titles and descriptions based on your PR template.
- Opens PRs as drafts, iterates using CI logs, and marks the PRs as ready for review when checks pass.
- Continues iterating in response to chat messages and review feedback.
  
  **Note**: Comment `@Datadog` to prompt Bits for updates to the PR. Bits Code never auto-merges PRs.

See all PRs Bits Code is working on in **Bits AI** > **Code** > **[Sessions][7]**.

### Auto-push

Auto-push allows Bits Code to create branches, push code, and open PRs when it detects something it can help you with. For example, Bits Code can:
- Auto-create PRs for high-impact errors (such as 500s or crashes).
- Update PRs in response to your comments in GitHub.
- Update PRs to address CI failures.

Auto-push only opens PRs and pushes changes; it never merges code. When auto-push is disabled, you must review code in Datadog before it gets pushed.

Auto-push is available for Error Tracking and Test Optimization. 

#### Security considerations

Allowing any AI-based tool to read untrusted data can let attackers influence its output. Auto-push behavior depends on the type of data Bits Code works with: code-only workflows operate on source code the Agent can inspect directly, while telemetry-based workflows (such as errors or traces) may include untrusted runtime inputs.

To balance safety and automation, you can configure auto-push behavior in [Datadog][14] (for example, limiting auto-push to code-only workflows or requiring review when telemetry is involved). Datadog scans all Agent-generated code before pushing changes, but these safeguards are not foolproof.

### Error tracking

In [Error Tracking][1], Bits Code diagnoses and remediates code issues with context and unit-tested fixes:
- Determines whether an error can be fixed through code and generates a fix with unit tests.
- Provides links within the chat to relevant files and methods for streamlined navigation.
- Analyzes errors asynchronously as they arrive.
- Marks errors with a {{< ui >}}Fix available{{< /ui >}} status and enables filtering to surface those issues.

[Auto-push](#auto-push) is available for this feature. 

### Flaky test management 

Bits Code fixes flaky tests that are detected through Flaky Test Management in [Test Optimization][4] and attempts to verify that tests remain stable.

[Auto-push](#auto-push) is available for this feature. 

### In-product recommendations

Bits Code suggests code improvements and fixes in various Datadog products, such as CCM Recommendations, [APM Recommendations][21], and Profiling Insights. See [Supported Datadog products](#supported-datadog-products) for a full list.

### Code security

Bits Code remediates vulnerabilities at scale, from single issues to large backlogs. You can:
- Create PR batches to fix multiple vulnerabilities at once.
- Use the Campaign tool to push PRs incrementally and manage review workload across teams.

Datadog Code Security uses Bits AI to enhance static analysis and generate remediation suggestions, which can be reviewed and applied through Bits Code. Learn more about [AI-Enhanced Static Code Analysis][15].

## Limitations

- Bits Code is an AI product, which means it can make mistakes. Use best practices when reviewing and testing agent-generated code.  
- Bits Code does not support multi-repository investigations.

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
[12]: /containers/
[13]: /containers/bits_ai_kubernetes_remediation
[14]: https://app.datadoghq.com/code/settings
[15]: /security/code_security/static_analysis/ai_enhanced_sast/#remediation
[16]: /bits_ai/bits_chat/
[17]: /bits_ai/bits_ai_sre/
[20]: /tracing/
[21]: /tracing/recommendations/
[22]: /cloud_cost_management/
[23]: /cloud_cost_management/recommendations
[24]: /tests/flaky_management#bits-ai-powered-flaky-test-fixes
