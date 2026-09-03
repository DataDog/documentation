---
title: AI-Enhanced Static Code Analysis
description: Use AI to augment security decision-making across the entire static analysis life cycle
disable_toc: false
aliases:
    - /security/code_security/static_analysis/malicious_pr_protection/
further_reading:
    - link: "https://www.datadoghq.com/blog/open-source-ai-sast/"
      tag: "Blog"
      text: "Introducing our open source AI-native SAST"
    - link: 'https://www.datadoghq.com/blog/using-llms-to-filter-out-false-positives'
      tag: 'Blog'
      text: 'Using LLMs to filter out false positives from static code analysis'
    - link: "https://www.datadoghq.com/blog/sast-triage-agentic-evaluation-bits-memories/"
      tag: "Blog"
      text: "Reduce SAST false positives with agentic evaluation and Bits Memories"
    - link: "https://www.datadoghq.com/blog/bitsai-dev-agent-code-security"
      tag: "Blog"
      text: "Introducing Bits Code for Code Security"
---

Static Code Analysis (SAST) uses AI to automate detection, validation, and remediation across the vulnerability management life cycle.

| Life cycle phase | Feature                                                                                                                  | Trigger point                            | Impact                                                                        |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------ |
| Detection       | [Malicious PR protection](#malicious-pr-protection) detects potentially malicious changes or suspicious diffs.                                        | At PR time                                | Flags PRs introducing novel risky code.                                       |
| Detection               | [AI-native SAST](#ai-native-sast) uses LLM-based taint analysis to detect security vulnerabilities with higher accuracy.                          | At scan time (Datadog-hosted scans only)  | Identifies contextually complex vulnerabilities missed by rule-based analysis. |
| Validation     | [False positive filtering](#false-positive-filtering) deprioritizes low-likelihood findings.                                                            | After scan                                | Reduces noise, allows focus on actual issue.                                   |
| Validation | [Agentic false positive filtering](#agentic-false-positive-filtering) deprioritizes low-likelihood findings for a subset of injection-related rules using cross-file context. | After scan                        | Reduces false positives that depend on cross-file behavior, for supported rule categorie. |
| Remediation                  | [Remediation](#remediation) uses Bits Code to generate suggested fixes manually or automatically.        | After scan                                | Reduces developer effort, accelerates fix cycle.                              |

## Detection

Detection capabilities include identifying potentially malicious intent in pull requests, and using LLMs to scan for vulnerabilities in your codebase. 

### Malicious PR protection

{{< callout url="https://www.datadoghq.com/product-preview/malicious-pr-protection/" >}}
Malicious PR protection is in preview and supports GitHub repositories only.
{{< /callout >}}

Malicious PR protection uses LLMs to scan PRs submitted to your repositories' default branches for harmful code changes, including:

- Code injection
- Secret exfiltration attempts
- Malicious package pushes
- CI workflow compromise

For examples, see the [tj-actions/changed-files breach (March 2025)][2], [obfuscated malicious npm packages (September 2025)][3], and the [malicious PR protection announcement blog post][1].

In the [Security Signals Explorer][4], find malicious PR detections by narrowing the {{< ui >}}Source{{< /ui >}} or {{< ui >}}Scope{{< /ui >}} facet to `datadog-code-security`. Filter by malicious or benign verdicts using the {{< ui >}}Code Security{{< /ui >}} > {{< ui >}}Scan Verdict{{< /ui >}} facet, or search directly:

- `source:datadog-code-security`
- `@pr_security.scan.verdict:malicious`
- `@pr_security.scan.verdict:benign`

For any given vulnerability, you can assign signals for investigation, create a security case, declare an incident, or run a workflow.
  
### AI-native SAST

{{< callout btn_hidden="true" >}}
AI-Native SAST is in preview and is available only for Datadog-hosted scans.
{{< /callout >}}

AI-native SAST uses LLMs to detect security vulnerabilities by reasoning about how data flows through your code. Unlike rule-based static analysis, AI-native SAST can contextually identify vulnerabilities using a two-phase approach:

1. **Detection**: An LLM scans each file and reasons about whether user-controlled data can reach a dangerous operation without being sanitized.
2. **Verification**: A second LLM independently re-evaluates each candidate finding through taint analysis, confirming or dismissing each finding to reduce false positives.

To enable AI-native SAST, in your source code management integration settings, toggle {{< ui >}}Enable AI SAST{{< /ui >}}. You can enable it for all repositories or specific repositories.

If enabled, AI-native SAST runs in parallel with rule-based static analysis, and its findings take precedence for vulnerability types both methods cover.

AI-native SAST is supported for these languages:

- C#
- C++
- Dart
- Elixir
- Go
- Java
- JavaScript
- Kotlin
- PHP
- Python
- Ruby
- Rust
- Swift
- TypeScript

{{% collapse-content title="Supported CWEs" level="h4" expanded=false id="ai-native-sast-cwes" %}}
AI-native SAST detects these vulnerability types:

- [CWE-89: SQL Injection](https://cwe.mitre.org/data/definitions/89.html)
- [CWE-78: Command Injection](https://cwe.mitre.org/data/definitions/78.html)
- [CWE-79: Cross-Site Scripting (XSS)](https://cwe.mitre.org/data/definitions/79.html)
- [CWE-643: XPath Injection](https://cwe.mitre.org/data/definitions/643.html)
- [CWE-22: Path Traversal](https://cwe.mitre.org/data/definitions/22.html)
- [CWE-73: Zip Slip](https://cwe.mitre.org/data/definitions/73.html)
- [CWE-74: Improper Output Handling](https://cwe.mitre.org/data/definitions/74.html)
- [CWE-502: Insecure Deserialization](https://cwe.mitre.org/data/definitions/502.html)
- [CWE-327: Broken Cryptography](https://cwe.mitre.org/data/definitions/327.html)
- [CWE-328: Weak Hashing](https://cwe.mitre.org/data/definitions/328.html)
- [CWE-330: Weak Randomness](https://cwe.mitre.org/data/definitions/330.html)
- [CWE-614: Insecure Cookie](https://cwe.mitre.org/data/definitions/614.html)
- [CWE-90: LDAP Injection](https://cwe.mitre.org/data/definitions/90.html)
- [CWE-94: Code Injection](https://cwe.mitre.org/data/definitions/94.html)
- [CWE-117: Log Injection](https://cwe.mitre.org/data/definitions/117.html)
- [CWE-190: Integer Overflow or Wraparound](https://cwe.mitre.org/data/definitions/190.html)
- [CWE-200: Sensitive Information Disclosure](https://cwe.mitre.org/data/definitions/200.html)
- [CWE-209: Information Exposure Through an Error Message](https://cwe.mitre.org/data/definitions/209.html)
- [CWE-250: Excessive Agency](https://cwe.mitre.org/data/definitions/250.html)
- [CWE-501: Trust Boundary Violation](https://cwe.mitre.org/data/definitions/501.html)
- [CWE-284: Broken Access Control (IDOR)](https://cwe.mitre.org/data/definitions/284.html)
- [CWE-345: Data and Model Poisoning](https://cwe.mitre.org/data/definitions/345.html)
- [CWE-349: Vector and Embedding Weaknesses](https://cwe.mitre.org/data/definitions/349.html)
- [CWE-400: Unbounded Consumption](https://cwe.mitre.org/data/definitions/400.html)
- [CWE-540: System Prompt Leakage](https://cwe.mitre.org/data/definitions/540.html)
- [CWE-601: Open Redirect](https://cwe.mitre.org/data/definitions/601.html)
- [CWE-829: Supply Chain Vulnerability](https://cwe.mitre.org/data/definitions/829.html)
- [CWE-1321: Prototype Pollution](https://cwe.mitre.org/data/definitions/1321.html)
- [CWE-1426: Misinformation](https://cwe.mitre.org/data/definitions/1426.html)
- [CWE-1427: Prompt Injection](https://cwe.mitre.org/data/definitions/1427.html)
  {{% /collapse-content %}}

AI-native SAST uses language-specific rulesets (for example, `python-ai_sast`) in the Code Security `sast` configuration. For the full list of ruleset names and how to select or exclude them for Datadog-hosted scans, see [Static Code Analysis (SAST) Configuration][15].

## Validation

False positive filtering happens after a scan completes. Two layers of filtering are available: baseline false positive filtering, and agentic filtering that gathers cross-file context for a subset of rules.

### False positive filtering

[Bits AI][9] reviews SAST findings and assesses whether they're likely true or false positives, and includes a short explanation of its reasoning.

To narrow down your triage list in [Code Security SAST Vulnerabilities][6], enable {{< ui >}}Filter out false positives{{< /ui >}}, which applies the `-bitsAssessment:"False Positive"` query.

### Agentic false positive filtering

Agentic false positive filtering is an enhanced version of baseline false positive filtering. Instead of assessing findings using only the code directly in front of it, Bits AI gathers cross-file context, reading related files, searching for symbols, and inspecting nearby directory structure.

Agentic false positive filtering applies only for injection-related SAST rules, such as SQL injection and command injection. 

AI-native SAST validates only [CWE-89: SQL Injection](https://cwe.mitre.org/data/definitions/89.html).

### Custom context

*Custom context* lets you add rule-specific guidance that Bits AI uses when assessing findings. Use it to describe organization-specific frameworks, sanitizers, validation patterns, or codebase details.

Custom context applies at the organization and rule level, and only to security category SAST rules in Datadog's default rulesets, not to custom rules. Review or add custom context in the side panel for SAST rules.

<!-- QUESTION FOR PM: Does custom context feed into baseline false positive filtering, agentic false positive filtering, or both? Rework this content accordingly. -->

## Remediation

[Bits Code][10] generates code fixes for vulnerabilities, either as a single fix, or as an automation.

1. In [Code Security SAST Vulnerabilities][6], select a vulnerability to open a side panel with details about the finding and the affected code.
2. In the {{< ui >}}Next Steps{{< /ui >}} sidebar, click {{< ui >}}Remediate with AI{{< /ui >}}, then choose an option:
    - {{< ui >}}Single fix{{< /ui >}}: Review a proposed diff, ask follow-up questions, edit the patch, and create a pull request to remediate a single vulnerability. If a fix has already been generated, select {{< ui >}}View fix and create PR{{< /ui >}} to view the existing remediation session.
    - {{< ui >}}Create automation{{< /ui >}}: Generate fixes automatically as they're found or on a schedule. Selecting this option opens a modal with the {{< ui >}}Remediate SAST vulnerabilities{{< /ui >}} action pre-filled. Complete the form, including specifying a trigger and output, then click {{< ui >}}Create Automation{{< /ui >}}. 

For single fix remediations, you can review and validate changes before merging by viewing session details, including:

<!-- QUESTION FOR PM: Do vulnerabilities fixed via automation generate session details, or does this apply only to single fixes?-->

- The original security finding and proposed code change.
- An explanation of how and why Bits Code generated the fix.
- CI results (if enabled) to validate the patch is safe to deploy.
- Options to refine the fix or {{< ui >}}Create PR{{< /ui >}} to apply the changes to your source code repository.

<div class="alert alert-tip">View session details by drilling in to vulnerabilities, or view all Bits Code sessions at {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Sessions{{< /ui >}}. View all Bits Code automations at {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}.</div>


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/engineering/malicious-pull-requests/
[2]: https://www.cisa.gov/news-events/alerts/2025/03/18/supply-chain-compromise-third-party-tj-actionschanged-files-cve-2025-30066-and-reviewdogaction
[3]: https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem
[4]: https://app.datadoghq.com/security
[6]: https://app.datadoghq.com/security/code-security/sast
[9]: /bits_ai/
[10]: /bits_ai/bits_code
[15]: /security/code_security/static_analysis/configuration/#configure-ai-native-sast
