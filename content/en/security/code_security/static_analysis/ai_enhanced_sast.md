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

AI-enhanced Static Code Analysis (SAST) features help automate security decision-making across the entire static analysis lifecycle, from identifying malicious intent, to improving detection, reducing noise, and accelerating response.

This document describes each of the AI-enhanced SAST features.

## Summary of AI features

| Feature                                 | AI Role                                                  | Trigger Point                           | User Impact                                               |
| --------------------------------------- | -------------------------------------------------------- | --------------------------------------- | --------------------------------------------------------- |
| Malicious PR protection                 | Detect potentially malicious changes or suspicious diffs | At PR time or diff level                | Blocks or flags PRs introducing novel risky code          |
| Validation and false-positive filtering | Suppress or deprioritize low-likelihood findings         | After scan or analysis                  | Reduce noise, allow focus on actual issues                |
| AI-powered remediation                    | Generate suggested fixes or code changes                 | When the issue is validated or accepted | Reduces developer effort, accelerates fix cycle           |

## Malicious PR protection

{{< callout url="https://www.datadoghq.com/product-preview/malicious-pr-protection/" >}}
Malicious PR protection is in Preview. Click <strong>Request Access</strong> and complete the form to request access.
{{< /callout >}}

Datadog Static Code Analysis (SAST) Malicious PR protection uses LLMs to detect and prevent malicious code changes at scale. By scanning code for known vulnerabilities and detecting potentially malicious intent in the pull requests (PRs) submitted to your repositories, this functionality helps you to:

- Scale your code reviews as the volume of AI-assisted code changes increases
- Secure code changes from both internal and external contributors
- Embed code security into your security incident response workflows

### Repository support

Malicious PR protection is supported for default branches and GitHub repositories only.

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

## Validation and false-positive filtering

For a subset of SAST vulnerabilities, [Bits AI][9] can review the context of the finding and assess whether it is more likely to be a true or false positive, along with a short explanation of the reasoning. 

To narrow down your initial list for triage, in [Vulnerabilities][6], select **Filter out false positives**. This option uses the `-bitsAssessment:"False Positive"` query.

Each finding includes a **This vulnerability was assessed by Bits AI** section with an explanation of the assessment.

For each finding, you can provide Bits AI with feedback on its assessment using &#128077; or &#128078;.

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


## AI-powered remediation

{{< callout >}}
AI-powered remediation is in Preview.
{{< /callout >}}

AI-powered remediation saves time by replacing the filing of individual pull requests to fix vulnerabilities with bulk-remediation campaigns that can fix multiple vulnerabilities at once.

AI-powered remediation uses the [Bits AI Dev Agent][10] to power single and multiple vulnerability fixes in Code Security. You create campaigns to fix a subset of vulnerabilities, and each campaign can automatically create pull requests to fix those vulnerabilities.

### Bulk remediation: Campaigns

The **Campaign** is how you operationalize AI-powered remediation in Datadog.
It connects SAST findings to automated fixes through customizable PR workflows with human-tunable AI behavior.

When you create a campaign, the Bits AI Dev Campaign tool initiates a batched remediation to fix a subset of matching vulnerabilities. 

A campaign defines the following:

| Section                | Description                                  | Options                                                                                                                                                                                                                                                                                          |
| ---------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Repository**         | Define which repo and paths to scan         | - Set the GitHub repo URL.<br>- Use **Paths** to limit rule scanning to certain directories or files.                                                                                                                                                                                                      |
| **Rule**               | Choose which SAST rule to apply          | - Select a rule from the dropdown.<br>- View description, code example, and number of matches.<br>- Click **Show More** to see remediation steps.                                                                                                                                                           |
| **Session Management** | Controls how PRs are grouped and submitted  | - **Create one PR per**:<br>      • `Repository`: One PR for all findings in the repo<br>      • `File`: One PR per file with findings<br>      • `Finding`: One PR per finding (most granular)<br>- **Allow [n] open PRs at a time**: Prevents too many PRs at once<br>- **Limit [n] findings per PR**: Prevents creating too-large PRs |
| **Prompt Tuning**      | Customizes how the AI proposes remediations | - **Custom Instructions**: Guide the AI on how to tweak fixes (for example, `Update CHANGELOG.md with a summary of changes`, `Start all PR titles with [autofix]`).                                                                                                    |
### Campaign in progress

When you click **Create Campaign**, [Bits AI Dev Agent][10] does the following:

1. Loads SAST findings for the selected repo(s), path(s), and rule.
2. Generates patches for each group of findings.
3. Creates PRs according to your session rules.
4. If Bits AI Dev notifications are turned on, PRs are automatically sent through Slack to relevant stakeholders.
5. Lets you review, edit, and merge fixes using GitHub.

The campaign page shows whether the AI is actively remediating real findings, and how many have been remediated or pending.

You can click a session to view the code changes in more detail and chat with the [Bits AI Dev Agent][10] to ask for changes.

### Session details

A remediation session shows the full lifecycle of an AI-generated fix. It includes the original security finding, a proposed code change, an explanation of how and why the AI made the fix, and if enabled, CI results from applying the patch. 

Session details make each remediation transparent, reviewable, and auditable, helping you safely adopt AI in your secure development workflow.

Session details include the following:

- Header: Identifies the campaign, time of session creation, and affected branch, file, or PR.
- Title: Summarizes the remediation goal based on the vulnerability being fixed.
- **Dev Agent Campaign, Model name, PR ID**: Indicates the AI model used, campaign source, and related PR metadata.
- Right panel:
  - **Suggested code change**: Displays a side-by-side comparison of the vulnerable code and the AI-generated patch.
  - **View Pull Request**: Opens the linked GitHub PR to review or merge the proposed changes.
- Left panel displays the chat message history, for example:
  - **Fix the following static analysis violation**: Explains the triggered rule, the security risk, and why the original code is unsafe.
  - **Fixing process recap**: Shows exactly how the AI read the code, understood the context, chose its approach, and applied the fix. This is helpful for auditability, compliance, and trust. You can confirm that the AI isn't rewriting code blindly, but applying defensible and explainable patterns.
  - **CI via GitHub**: Describes whether the AI-generated patch breaks anything downstream, and includes full error logs. This helps you validate that a fix is not only secure but also safe to deploy, without needing to leave the platform.
  - **Summary**: Recaps the impact of the fix and provides next steps or guidance if tests failed or PR needs to be rebased.
  - Bits AI chat field: Lets you interactively refine the fix or ask the AI follow-up questions. This makes remediation collaborative and tunable, giving security engineers control without needing to write the patch themselves.

### Scope

AI-powered remediation is limited to SAST only for vulnerabilities within the OWASP Top 10 across all languages. It only applies to findings on the default branch.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/engineering/malicious-pull-requests/
[2]: https://www.cisa.gov/news-events/alerts/2025/03/18/supply-chain-compromise-third-party-tj-actionschanged-files-cve-2025-30066-and-reviewdogaction
[3]: https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem
[4]: https://app.datadoghq.com/security
[5]: /actions/workflows/
[6]: https://app.datadoghq.com/security/code-security/sast
[7]: https://app.datadoghq.com/security/code-security/repositories
[8]: https://github.com/tree-sitter/tree-sitter
[9]: /bits_ai/
[10]: /bits_ai/bits_ai_dev_agent