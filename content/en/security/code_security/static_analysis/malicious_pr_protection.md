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


## Overview
Datadog Static Code Analysis (SAST) uses LLMs to detect and prevent malicious code changes at scale. This allows Datadog to not only scan code for known vulnerabilities, but also detect potentially malicious intent in pull requests (PRs) submitted to your repositories. This helps you:

- Scale up your code reviews as the volume of code changes increases with AI-assisted development
- Secure code changes from both internal and external contributors
- Embed code security into your security incident response workflows

Malicious PR protection is supported for default branches and GitHub repositories only.

{{< callout url="https://www.datadoghq.com/product-preview/malicious-pr-protection/" >}}
Malicious PR protection is in Preview. Click <strong>Request Access</strong> and complete the form to request access.
{{< /callout >}}  

## How it works
### Detection coverage
Malicious code changes come in many different forms. Datadog SAST covers attack vectors such as malicious code injection, attempted secret exfiltration, the pushing of malicious packages, and CI workflow compromise, among others. Examples include the [tj-actions/changed-files breach (March 2025)][2] and [obfuscation of malicious code in npm packages (September 2025)][3].  

<!-- Read more in the blog post [here][1].   -->
<!-- ^^ This line above should be added back in once the eng blog is published -->

### Search and filter results
Detections from Datadog SAST on potentially malicious PRs can be found in [Security Signals][4] by filtering for `malicious_PR`.  

There are two potential verdicts: `malicious` and `benign`. Signals can be triaged directly in Datadog (assign, create a case, or declare an incident), or routed externally via Datadog Workflows.

[1]: https://www.datadoghq.com/blog/engineering/malicious-pull-requests/
[2]: https://www.cisa.gov/news-events/alerts/2025/03/18/supply-chain-compromise-third-party-tj-actionschanged-files-cve-2025-30066-and-reviewdogaction
[3]: https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem
[4]: https://app.datadoghq.com/security
