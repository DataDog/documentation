---
title: Bits Code
aliases:
- /bits_ai/bits_ai_dev_agent/
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

Bits Code is a generative AI coding assistant that uses Datadog observability data to automatically diagnose and fix issues in your code. It integrates with [source code providers](#supported-source-code-providers) to create production-ready pull or merge requests, then iterates on changes using CI logs and developer feedback.

{{< img src="bits_ai/dev_agent/sessions_overview.png" alt="A tab titled 'Sessions' shows a text field with suggestions underneath" style="width:100%;" >}}

Each time Bits Code investigates an issue or generates a fix, it creates a [session](#sessions), which captures the agent's analysis, actions, and any resulting code changes across supported Datadog products. Set up [automations][28] to have Bits Code run sessions on a schedule or in response to signals from other Datadog products, such as a new APM Recommendation or flaky test.

To get started with Bits Code, [set up a source code integration][6] and complete any additional configuration. Then, [start your first session](#start-a-session).

Learn how your Bits Code usage is billed on [AI Credits][27].

## Sessions
A session captures a segment of work with Bits Code, including its analysis and code changes. Start, view, and manage your sessions at **Bits AI** > **Bits Code** > [**Sessions**][7].

{{< img src="bits_ai/dev_agent/code_fix.png" alt="A session showing a Bits AI summary and task list on the left and a code diff on the right" style="width:100%;" >}}

### Start a session
After [completing setup][6], do one of the following to start a Bits Code session:
- Enter a freeform prompt at [**Sessions**][7]: enter a custom prompt or generate one by clicking a suggested prompt card
- Invoke Bits Code in a [supported Datadog product](#supported-datadog-products)
- Set up a Bits Code [automation][28]

A session can also be created when another Bits AI agent (like [Bits Chat][16] or [Bits Investigation][17]) hands off a coding task to Bits Code.

### View and manage sessions
On **[Sessions][7]**, view your past sessions in the **My Sessions** panel. A session appears here if you initiated it or interacted with it in some way, like participating in the conversation or creating an associated PR or MR.

Click a session to view its details and continue working with Bits Code. To remove a session from your **My Sessions** list, click <i class="icon-archive-wui"></i> (**Archive for everyone**) or <i class="icon-eye-slashed-wui"></i> (**Unwatch session**).

## Supported source code providers
Bits Code supports the following source code providers:
- **GitHub**: GitHub.com and [GitHub Enterprise Cloud][30]
- **GitLab**: GitLab.com

The following plans are not supported:
- **Self-hosted plans**, such as GitHub Enterprise Server and GitLab Self-Managed.
- **Cloud-hosted plans on dedicated domains**, such as [GitHub Enterprise Cloud with data residency][31] and [GitLab Dedicated][32]. Bits Code supports only providers on the standard GitHub.com and GitLab.com domains.

## Supported Datadog products

Bits Code can suggest code improvements within several Datadog products, including the following:

| Product                   | Capabilities                                                       |
|---------------------------|--------------------------------------------------------------------|
| [APM][20]                 | Proposes code changes for relevant [APM Recommendations][21]|
| [Bits Investigation][17]         | Generates code remediations based on Bits Investigations |
| [Bits Chat][16]   | Suggests code changes arising from Bits Chat conversations |
| [Cloud Cost][22]          | Generates code changes for [Cloud Cost Recommendations][23] |
| [Error Tracking][1]       | Diagnoses issues and generates code fixes on-demand or autonomously |
| [Code Security][2]        | Remediates [SAST vulnerabilities][15], [IaC vulnerabilities][25], and [SCA vulnerabilities][26] (individually or in bulk)  |
| [Test Optimization][4]    | Provides code fixes for [flaky tests][24] and verifies that tests remain stable  |
| [Continuous Profiler][3]  | Provides code changes for [Automated Analysis][10] insights   |
| [Containers][12]          | Provides code changes for [Kubernetes Remediations][13]  |

## Key capabilities 

### Code fixes and optimizations surfaced by Datadog products

Across [supported Datadog products](#supported-datadog-products), use Bits Code to implement optimizations and fixes—for example, [Cloud Cost Recommendations][23], [Error Tracking][1] issues, and [SAST vulnerabilities][15]. In certain products, [Bits Chat][16] explores and investigates issues, then hands off its findings to Bits Code to implement a code change.

{{< img src="bits_ai/dev_agent/fix_with_bits.png" alt="A button labeled with the text 'Fix with Bits.'" style="width:25%" >}}

You can manually prompt Bits Code to implement changes for a certain finding, or configure an [automation][28] so that it does so autonomously. 

### General coding tasks

Use the freeform prompt field at [**Sessions**][7] to work with Bits Code on general coding tasks.

### Automations

[Automations][28] run Bits Code sessions automatically, on a schedule or in response to signals from Datadog products like Error Tracking, APM, or Code Security. After a session completes, Bits Code delivers the results as a pull or merge request (optionally in draft mode) or a Slack notification.

You can build automations from triggers (a product finding, a custom prompt, a schedule, or a combination) and configure one or more outputs. Datadog-provided templates are also available to help you get started. Create and manage automations at **Bits AI** > **Bits Code** > [**Automations**][29].

### Custom agent skills and instructions

Bits Code can use custom skills defined in your repository. It discovers skills formatted like `<skill-name>/SKILL.md` in `.claude/skills/`, `.codex/skills/`, and `.gemini/skills/` directories. Skills should contain YAML `name` and `description` frontmatter keys.

Bits Code automatically invokes appropriate skills based on their `name` and `description` values, and you can encourage use by mentioning skills in your [custom instructions file][33]. You can also prompt Bits Code to use a certain skill directly.

Bits Code also [ingests custom instructions][33] defined in your repository and Bits Code settings.

### Pull or merge request collaboration

Bits Code integrates with [source code providers](#supported-source-code-providers) to:
- Create pull or merge requests, generating titles and descriptions based on your repository's pull or merge request template
- Iterate on pull requests in response to comments (GitHub only); mention `@Datadog` in a comment to prompt Bits for updates
- Monitor CI logs and fix failures

Bits Code never auto-merges PRs or MRs. See all the PRs or MRs that Bits Code is working on in **Bits AI** > **Bits Code** > **[Sessions][7]**.

## Limitations

- Bits Code is an AI product, which means it can make mistakes. Use best practices when reviewing and testing agent-generated code.  
- Bits Code does not support multi-repository investigations.
- When using GitLab, mentioning `@Datadog` in a comment to prompt Bits for updates is not supported.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /error_tracking
[2]: /security/code_security
[3]: /profiler/
[4]: /tests/
[5]: https://app.datadoghq.com/integrations/github
[6]: /bits_ai/bits_code/setup/
[7]: https://app.datadoghq.com/code
[8]: /bits_ai/bits_investigation/
[10]: /profiler/automated_analysis/
[12]: /containers/
[13]: /containers/bits_ai_kubernetes_remediation
[15]: /security/code_security/static_analysis/ai_enhanced_sast/#remediation
[16]: /bits_ai/bits_chat/
[17]: /bits_ai/bits_investigation/
[20]: /tracing/
[21]: /tracing/recommendations/
[22]: /cloud_cost_management/
[23]: /cloud_cost_management/recommendations
[24]: /tests/flaky_management#bits-ai-powered-flaky-test-fixes
[25]: /security/code_security/iac_security/
[26]: /security/code_security/software_composition_analysis/
[27]: /account_management/billing/ai_credits/
[28]: /bits_ai/bits_code/automations/
[29]: https://app.datadoghq.com/code/automations
[30]: https://docs.github.com/en/enterprise-cloud@latest/admin/overview/about-github-enterprise-cloud
[31]: https://docs.github.com/en/enterprise-cloud@latest/admin/overview/about-github-enterprise-cloud#about-data-residency
[32]: https://docs.gitlab.com/subscriptions/gitlab_dedicated/
[33]: /bits_ai/bits_code/setup/#configure-custom-instructions
