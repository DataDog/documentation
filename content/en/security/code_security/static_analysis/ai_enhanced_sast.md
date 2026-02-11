---
title: AI-Enhanced Static Code Analysis
description: Automate security decision-making across the entire static analysis lifecycle
disable_toc: false
aliases:
- /security/code_security/static_analysis/malicious_pr_protection/
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
- link: "https://www.datadoghq.com/blog/using-llms-to-filter-out-false-positives"
  tag: "Blog"
  text: "Using LLMs to filter out false positives from static code analysis"
---

Static Code Analysis (SAST) uses AI to help automate detection, validation, and remediation across the vulnerability management lifecycle.
This page provides an overview of these features.

## Summary of AI features in SAST

| Step of vulnerability management lifecycle                                 | Feature                                                  | Trigger Point                           | Impact                                               |
| --------------------------------------- | -------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------- |
| [Detection](#detection)                 | Malicious PR protection: Detect potentially malicious changes or suspicious diffs | At PR time                | Flags PRs introducing novel risky code          |
| [Validation](#validation-and-triage) | False positive filtering: Deprioritize low-likelihood findings         | After scan                  | Reduce noise, allow focus on actual issues                |
| [Remediation](#remediation)                    | Batched remediation: Generate suggested fixes (and optionally PRs) for one or multiple vulnerabilities                 | After scan | Reduces developer effort, accelerates fix cycle           |

## Detection


{{< callout url="https://www.datadoghq.com/product-preview/malicious-pr-protection/" >}}
Malicious PR protection is in Preview and supports GitHub repositories only. Click <strong>Request Access</strong> and complete the form.
{{< /callout >}}

Malicious PR protection uses LLMs to detect and prevent malicious code changes at scale. By scanning pull requests (PRs) submitted to the default branches of your repositories to detect potentially malicious intent, this functionality helps you:

- Secure code changes from both internal and external contributors
- Scale your code reviews as the volume of AI-assisted code changes increases
- Embed code security into your security incident response workflows

### Detection coverage

Malicious code changes come in many different forms. Datadog SAST covers attack vectors such as:

- Malicious code injection
- Attempted secret exfiltration
- Pushing of malicious packages
- CI workflow compromise

Examples include the [tj-actions/changed-files breach (March 2025)][2] and [obfuscation of malicious code in npm packages (September 2025)][3]. Read more in the blog post [here][1].

### Search and filter results

Detections from Datadog SAST on potentially malicious PRs can be found in [Security Signals][4] from the rule ID `def-000-wnp`.

There are two potential verdicts: `malicious` and `benign`. They can be filtered for using:
- `@malicious_pr_protection.scan.verdict:malicious`
- `@malicious_pr_protection.scan.verdict:benign`.

Signals can be triaged directly in Datadog (assign, create a case, or declare an incident), or routed externally using [Datadog Workflow Automation][5].


<!-- ## AI-powered detection

Code Security SAST provides AI-powered detection for vulnerabilities in source code. AI-powered detection is built on top of Datadog's default static analyzer tool, `datadog-static-analyzer`. The AI-powered layer enhances detection for semantically complex or cross-file vulnerabilities

AI-powered detection is provided in [Vulernabilities][6] and [Repositories][7]. Use the query `@static_analysis.tool.name:datadog-saist` to use AI-powered detection.

### How the AI layer works

Instead of relying on hardcoded rules or regex patterns like a traditional static analysis tool, AI-powered detection does the following:

1. Analyzes function call graphs to see how data moves through functions and across files.
2. Collects context by extracting relevant snippets, dependencies, and known vulnerability details.
3. A large language model (LLM) is given the code and its context, then asked whether the behavior matches a vulnerability pattern.
4. The LLM determines whether a security issue exists.

This analysis doesn't depend on any external LLM integration. Datadog's AI-powered detection leverages a secure, internal service to interface with LLMs. This service manages communication with multiple AI providers through a consistent, monitored channel. It ensures that all model interactions are auditable, observable, and protected, while keeping customer data within Datadog's controlled environment.

### Relationship between static and AI analysis

The AI-powered detection engine is designed to augment, not replace, Datadog's default static analyzer tool, `datadog-static-analyzer`.

The `datadog-static-analyzer` serves as the default analysis engine, using queries to parse code at the syntax tree level and apply deterministic rules that detect security issues such as the use of insecure functions, hardcoded secrets, or missing input validation.

AI-powered detection extends beyond static rule execution, using LLMs to analyze function call graphs and contextual code behavior. This method improves coverage for complex code paths, including cases involving data flow, taint propagation, or interprocedural dependencies, where traditional rule-based detection has limited visibility.

Both methods operate as complementary components. The static analyzer continues to deliver high-precision results for deterministic findings, while the AI-assisted layer enhances detection for semantically complex or cross-file vulnerabilities.  -->

## Validation and triage

### False positive filtering

For a subset of SAST vulnerabilities, [Bits AI][9] reviews the context of the finding and assesses whether it is more likely to be a true or false positive, along with a short explanation of the reasoning.

To narrow down your initial list for triage, in [Vulnerabilities][6], select **Filter out false positives**. This option uses the `-bitsAssessment:"False Positive"` query.

Each finding includes a section with an explanation of the assessment. You can provide Bits AI with feedback on its assessment using a thumbs up &#128077; or thumbs down &#128078;.
{{< img src="/code_security/static_analysis/false_positive_filtering_sast_side_panel_higher_res_png.png" alt="Visual indicator of a false positive assessment in SAST side panel" style="width:100%;">}}

{{% collapse-content title="Supported CWEs" level="h4" expanded=true id="id-for-anchoring" %}}
False positive filtering is supported for the following CWEs:
- [CWE-89: SQL Injection](https://cwe.mitre.org/data/definitions/89.html)
- [CWE-78: OS Command Injection](https://cwe.mitre.org/data/definitions/78.html)
- [CWE-90: LDAP Injection](https://cwe.mitre.org/data/definitions/90.html)
- [CWE-22: Path Traversal](https://cwe.mitre.org/data/definitions/22.html)
- [CWE-501: Trust Boundary Violation](https://cwe.mitre.org/data/definitions/501.html)
- [CWE-79: Cross-site Scripting](https://cwe.mitre.org/data/definitions/79.html)
- [CWE-614: Insecure Cookie](https://cwe.mitre.org/data/definitions/614.html)
- [CWE-327: Broken or Risky Cryptographic Algorithm](https://cwe.mitre.org/data/definitions/327.html)
- [CWE-643: XPath Injection](https://cwe.mitre.org/data/definitions/643.html)
- [CWE-94: Code Injection](https://cwe.mitre.org/data/definitions/94.html)
- [CWE-284: Improper Access Control](https://cwe.mitre.org/data/definitions/284.html)
- [CWE-502: Deserialization of Untrusted Data](https://cwe.mitre.org/data/definitions/502.html)
{{% /collapse-content %}}


## Remediation

{{< callout url="http://datadoghq.com/product-preview/bits-ai-dev-agent" >}}
AI-suggested remediation for SAST is powered by the Bits AI Dev Agent and is in Preview. To sign up, click <strong>Request Access</strong> and complete the form.
{{< /callout >}}

Datadog SAST uses the [Bits AI Dev Agent][10] to generate code fixes for vulnerabilities. You can remediate individual vulnerabilities or fix multiple vulnerabilities using bulk remediation campaigns.

To view and remediate vulnerabilities:

1. In Datadog, navigate to [**Security** > **Code Security** > **Vulnerabilities**][6], and select **Static Code (SAST)** on the left-hand side.
1. Select a vulnerability to open a side panel with details about the finding and the affected code.
1. In the **Next Steps** > **Remediation** section, click **Fix with Bits**.

   - To generate a fix, select [**Single fix**](#single-fix) or [**Bulk fix**](#bulk-fix-campaigns).
   - If a fix has already been generated, select **View fix and create PR** to view the existing [remediation session](#remediation-session-details).

### Single fix

Use **Single fix** to open a code session where you can review the proposed diff, ask follow-up questions, edit the patch, and create a pull request to apply the remediation to your source code repository.

**Note:** Single vulnerability fixes operate independently from batch remediation campaigns. If you generate a single fix and then create a campaign, Bits AI may duplicate the fix because campaigns do not track fixes created outside the campaign.

### Bulk fix (campaigns)

Use **Bulk fix** to create a remediation campaign that fixes multiple vulnerabilities at the same time.

Selecting this option opens a **Create a new Bits AI Bulk Fix Campaign** modal. Configure the following:

- **Campaign title**: A descriptive title for your campaign.
- **Repositories**: The repositories and paths you want Bits AI to scan.
- **PR grouping options**: How Bits AI groups findings into pull requests (for example, one PR per repository, file, or finding). You can also limit the number of open PRs and the number of findings per PR.
- **Custom instructions** (optional): Additional guidance for how Bits AI should generate fixes, such as changelog requirements or pull request title formatting.

After you create a campaign, Bits AI Dev Agent loads the findings in scope, generates patches according to your grouping rules, and (if enabled) creates pull requests. You can review and edit each session before merging changes.

**Note**: Automatic PR creation is opt-in through [Settings][11].

#### View campaign progress

To view all campaigns, navigate to **Bits AI** > **Dev Agent** > **Code Sessions** > [**Campaigns**][12]. Click a campaign to view details including session status, pull requests by repository, and remediated findings. You can review, edit, and merge fixes by chatting with the [Bits AI Dev Agent][10].

{{< img src="/code_security/static_analysis/campaigner-hero-image.png" alt="Campaigns page in Bits AI Dev Agent" style="width:100%;">}}

### Remediation session details

Each code session shows the full lifecycle of an AI-generated fix so you can review and validate changes before merging. It includes:

- The original security finding and proposed code change
- An explanation of how and why the AI generated the fix
- CI results (if enabled) to validate the patch is safe to deploy
- Options to refine the fix or **Create PR** to apply the changes to your source code repository

To open the remediation session for a vulnerability, select the vulnerability from the [**Vulnerabilities**][6] to open the detailed side panel, scroll to the **Remediation** section, and select **Expand & Chat**. 

You can also navigate to remediation sessions through the [**Campaigns**][12] and [**Code Sessions**][7] views.

{{< img src="/code_security/static_analysis/single-session-sql-injection-fix-light-png.png" alt="Concluded remediation session in Bits AI Dev Agent showing generated fixes and pull request options" style="width:100%;">}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/engineering/malicious-pull-requests/
[2]: https://www.cisa.gov/news-events/alerts/2025/03/18/supply-chain-compromise-third-party-tj-actionschanged-files-cve-2025-30066-and-reviewdogaction
[3]: https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem
[4]: https://app.datadoghq.com/security
[5]: /actions/workflows/
[6]: https://app.datadoghq.com/security/code-security/sast
[7]: https://app.datadoghq.com/code
[9]: /bits_ai/
[10]: /bits_ai/bits_ai_dev_agent
[11]: https://app.datadoghq.com/code/settings
[12]: https://app.datadoghq.com/code/campaigns
