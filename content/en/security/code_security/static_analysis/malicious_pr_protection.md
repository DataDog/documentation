---
title: Malicious PR Protection
description: Learn about how Datadog Static Code Analysis can scan your PRs at scale to prevent malicious code changes.
is_beta: false
algolia:
  tags: ['static analysis', 'datadog static analysis', 'code quality', 'SAST']
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Security is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}


Datadog Static Code Analysis (SAST) Malicious PR protection uses LLMs to detect and prevent malicious code changes at scale. By scanning code for known vulnerabilities and detecting potentially malicious intent in the pull requests (PRs) submitted to your repositories, this functionality helps you to:

- Scale your code reviews as the volume of AI-assisted code changes increases
- Secure code changes from both internal and external contributors
- Embed code security into your security incident response workflows

Malicious PR protection is supported for default branches and GitHub repositories only.

{{< callout url="https://www.datadoghq.com/product-preview/malicious-pr-protection/" >}}
Malicious PR protection is in Preview. Click <strong>Request Access</strong> and complete the form to request access.
{{< /callout >}}  

## Detection coverage

Malicious code changes come in many different forms. Datadog SAST covers attack vectors such as: 

- Malicious code injection
- Attempted secret exfiltration
- Pushing of malicious packages
- CI workflow compromise  

Examples include the [tj-actions/changed-files breach (March 2025)][2] and [obfuscation of malicious code in npm packages (September 2025)][3]. Read more in the blog post [here][1].

## Search and filter results

Detections from Datadog SAST on potentially malicious PRs can be found in [Security Signals][4] from the rule ID `def-000-wnp`.  

There are two potential verdicts: `malicious` and `benign`. They can be filtered for using:
- `@malicious_pr_protection.scan.verdict:malicious`
- `@malicious_pr_protection.scan.verdict:benign`. 

Signals can be triaged directly in Datadog (assign, create a case, or declare an incident), or routed externally via [Datadog Workflow Automation][5].

[1]: https://www.datadoghq.com/blog/engineering/malicious-pull-requests/
[2]: https://www.cisa.gov/news-events/alerts/2025/03/18/supply-chain-compromise-third-party-tj-actionschanged-files-cve-2025-30066-and-reviewdogaction
[3]: https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem
[4]: https://app.datadoghq.com/security
[5]: /actions/workflows/
