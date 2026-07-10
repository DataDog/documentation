---
title: AI-Enhanced Static Code Analysis
description: Automate security decision-making across the entire static analysis lifecycle
disable_toc: false
aliases:
    - /security/code_security/static_analysis/malicious_pr_protection/
further_reading:
    - link: 'logs/processing/pipelines'
      tag: 'Documentation'
      text: 'Log processing pipelines'
    - link: 'https://www.datadoghq.com/blog/using-llms-to-filter-out-false-positives'
      tag: 'Blog'
      text: 'Using LLMs to filter out false positives from static code analysis'
    - link: "https://www.datadoghq.com/blog/bitsai-dev-agent-code-security"
      tag: "Blog"
      text: "Introducing Bits Code for Code Security"
---

Static Code Analysis (SAST) uses AI to help automate detection, validation, and remediation across the vulnerability management lifecycle.
This page provides an overview of these features.

## Summary of AI features in SAST

| Step of vulnerability management life cycle | Feature                                                                                                | Trigger Point                            | Impact                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ---------------------------------------- | ----------------------------------------------------------------------------- |
| [Detection](#detection)                    | Malicious PR protection: Detect potentially malicious changes or suspicious diffs                      | At PR time                               | Flags PRs introducing novel risky code                                        |
| [Detection](#ai-native-sast)               | AI-native SAST: LLM-based taint analysis to detect security vulnerabilities with higher accuracy       | At scan time (Datadog Hosted Scans only) | Identifies contextually complex vulnerabilities missed by rule-based analysis |
| [Validation](#validation-and-triage)       | False positive filtering: Deprioritize low-likelihood findings                                         | After scan                               | Reduce noise, allow focus on actual issues                                    |
| [Remediation](#remediation)                | Automated remediation: Generate suggested fixes (and optionally PRs) for vulnerabilities manually or automatically | After scan                               | Reduces developer effort, accelerates fix cycle                               |

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

## AI-native SAST

{{< callout btn_hidden="true" >}}
AI-Native SAST is in Preview and is only available for Datadog-hosted Scans.
{{< /callout >}}

Datadog's AI-native SAST engine uses large language models (LLMs) to detect security vulnerabilities by reasoning about how data flows through your code. Unlike rule-based static analysis, it can identify vulnerabilities that require contextual understanding of application logic.

AI-native SAST uses a two-phase approach:

1. **Detection**: An LLM scans each file and reasons about whether user-controlled data can reach a dangerous operation without being sanitized.
2. **Verification**: A second LLM independently re-evaluates each candidate finding through taint analysis, confirming or dismissing each finding to reduce false positives.

### Supported languages

| Language   | Status      |
| ---------- | ----------- |
| Java       | Available   |
| Python     | Available   |
| Go         | Available   |
| C#         | Available   |
| JavaScript | Available   |
| TypeScript | Available   |

### Detected vulnerability types

{{% collapse-content title="Supported CWEs" level="h4" expanded=true id="ai-native-sast-cwes" %}}
AI-native SAST detects the following vulnerability types:

- [CWE-89: SQL Injection](https://cwe.mitre.org/data/definitions/89.html)
- [CWE-77: Command Injection](https://cwe.mitre.org/data/definitions/77.html)
- [CWE-79: Cross-Site Scripting (XSS)](https://cwe.mitre.org/data/definitions/79.html)
- [CWE-643: XPath Injection](https://cwe.mitre.org/data/definitions/643.html)
- [CWE-22: Path Traversal](https://cwe.mitre.org/data/definitions/22.html)
- [CWE-502: Insecure Deserialization](https://cwe.mitre.org/data/definitions/502.html)
- [CWE-327: Broken Cryptography](https://cwe.mitre.org/data/definitions/327.html)
- [CWE-328: Weak Hashing](https://cwe.mitre.org/data/definitions/328.html)
- [CWE-330: Weak Randomness](https://cwe.mitre.org/data/definitions/330.html)
- [CWE-614: Insecure Cookie](https://cwe.mitre.org/data/definitions/614.html)
- [CWE-90: LDAP Injection](https://cwe.mitre.org/data/definitions/90.html)
- [CWE-94: Code Injection](https://cwe.mitre.org/data/definitions/94.html)
- [CWE-501: Trust Boundary Violation](https://cwe.mitre.org/data/definitions/501.html)
- [CWE-284: Broken Access Control (IDOR)](https://cwe.mitre.org/data/definitions/284.html)
- [CWE-1427: Prompt Injection](https://cwe.mitre.org/data/definitions/1427.html)
  {{% /collapse-content %}}

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

[Bits AI][9] reviews the context of each SAST finding and assesses whether it is more likely to be a true or false positive, along with a short explanation of the reasoning.

To narrow down your initial list for triage, in [Vulnerabilities][6], turn on the {{< ui >}}Filter out false positives{{< /ui >}} toggle. This option uses the `-bitsAssessment:"False Positive"` query.

Each finding includes a section with an explanation of the assessment. You can provide Bits AI with feedback on its assessment using a thumbs up &#128077; or thumbs down &#128078;.
{{< img src="/code_security/static_analysis/false_positive_filtering_sast_side_panel_higher_res_png.png" alt="Visual indicator of a false positive assessment in SAST side panel" style="width:100%;">}}

### Bits Memories

Bits Memories lets teams add rule-specific context that Bits AI uses when assessing SAST findings. Use memories to describe organization-specific frameworks, sanitizers, validation patterns, or codebase details that help Bits AI interpret findings for that rule.

In the SAST rule side panel, expand the false positive reports accordion to review reports shared by your organization for the selected rule. Use the custom context tab in the same section to add guidance for future Bits AI assessments. Memories apply at the organization and rule level for SAST. They apply only to security category SAST rules in Datadog's default rulesets and do not apply to custom rules.

### Agentic false positive filtering

Bits AI uses an agentic approach to gather repository context before classifying findings for injection-related SAST rules (for example, SQL injection and command injection). Support for additional rule categories is being rolled out over time.

Bits AI can read related files and search for symbols and patterns. It can also inspect nearby directory structure to verify definitions, call paths, sanitizers, and framework wiring that are not visible in a single file.

The additional repository context helps Bits AI distinguish true positives from false positives for findings that depend on cross-file behavior. Agentic false positive filtering applies only to SAST findings.

## Remediation

Datadog SAST uses [Bits Code][10] to generate code fixes for vulnerabilities. You can also create an [automation][13] to automatically generate fixes for vulnerabilities as they are found or on a schedule.

To view and remediate vulnerabilities:

1. In Datadog, navigate to [{{< ui >}}Security{{< /ui >}} > {{< ui >}}Code Security{{< /ui >}} > {{< ui >}}Vulnerabilities{{< /ui >}}][6], and select {{< ui >}}Static Code (SAST){{< /ui >}}.
1. Select a vulnerability to open a side panel with details about the finding and the affected code.
1. In the {{< ui >}}Next Steps{{< /ui >}} > {{< ui >}}Remediation{{< /ui >}} section, click {{< ui >}}Fix with Bits{{< /ui >}}, then one of the following options:
    - [{{< ui >}}Single fix{{< /ui >}}](#single-fix): Generates a code fix for this vulnerability
      - If a fix has already been generated, select {{< ui >}}View fix and create PR{{< /ui >}} to view the existing [remediation session](#remediation-session-details).
    - [{{< ui >}}Create automation{{< /ui >}}](#create-automation): Opens a pop-up modal where you can create a [Bits Code automation][13]

### Single fix

Use **Single fix** to open a Bits Code session to fix this single vulnerability. You can review the proposed diff, ask follow-up questions, edit the patch, and create a pull request to apply the remediation to your source code repository.

View all Bits Code sessions on {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Sessions{{< /ui >}}][7].

### Create automation

Use **Create automation** to create a [Bits Code automation][13] to generate fixes for SAST vulnerabilities automatically, either as they are found or on a schedule.

Selecting this option opens an {{< ui >}}Automate with Bits{{< /ui >}} modal with the {{< ui >}}Remediate SAST vulnerabilities{{< /ui >}} action pre-filled. Complete the form, including specifying a trigger and output, then click {{< ui >}}Create Automation{{< /ui >}}. See [Automations][13] to learn more about actions, triggers, and outputs.

View all Bits Code automations on {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Automations{{< /ui >}}][14].

### Remediation session details

Each Bits Code session shows the life cycle of an AI-generated fix so you can review and validate changes before merging. It includes:

- The original security finding and proposed code change
- An explanation of how and why Bits Code generated the fix
- CI results (if enabled) to validate the patch is safe to deploy
- Options to refine the fix or {{< ui >}}Create PR{{< /ui >}} to apply the changes to your source code repository

To open the remediation session, select the vulnerability from the [{{< ui >}}Vulnerabilities{{< /ui >}}][6] page to open the side panel, scroll to the {{< ui >}}Remediation{{< /ui >}} section, and select {{< ui >}}Expand & Chat{{< /ui >}}.

You can also view all remediation sessions on [**Sessions**][7].

{{< img src="/code_security/static_analysis/single-session-sql-injection-fix-light-png.png" alt="Concluded remediation session in Bits Code showing generated fixes and pull request options" style="width:100%;">}}

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
[10]: /bits_ai/bits_code
[11]: https://app.datadoghq.com/code/settings
[13]: /bits_ai/bits_code/automations
[14]: https://app.datadoghq.com/code/automations
