---
title: Secret Scanning
description: Use Datadog Secret Scanning to find secrets exposed in source code.
is_beta: true
algolia:
  tags: ['secrets scanning', 'secret scanning', 'datadog static analysis', 'SAST']
---

{{< callout url="https://www.datadoghq.com/product-preview/secret-scanning/" btn_hidden="false" header="Join the Preview!" >}}
Secret Scanning is in Preview. Contact your Customer Success Manager to get access.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Secret Scanning is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

Datadog Secret Scanning scans code to find exposed secrets. Datadog also attempts to validate secrets and surface their status (valid, invalid) to help you prioritize secrets remediation.

## Set up Secret Scanning

Scans can run in your CI/CD pipelines or directly in Datadog with hosted scanning (GitHub-only). To get started, go to the [**Code Security Setup**][1] and click **Activate scanning for your repositories** or learn how to set up Secret Scanning using [GitHub actions][5] or with [other CI providers][6].

## Secret Scanning rules

Datadog Secret Scanning is powered by [Sensitive Data Scanner (SDS)][3] and includes all of the rules in the
[Secrets and credentials category of SDS][4].


[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: /security/code_security/static_analysis/setup
[3]: /security/sensitive_data_scanner/
[4]: /security/sensitive_data_scanner/scanning_rules/library_rules/#secrets-and-credentials
[5]: /security/code_security/secret_scanning/github_actions
[6]: /security/code_security/secret_scanning/generic_ci_providers
