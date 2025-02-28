---
title: Secrets Scanning
description: Learn about Datadog Secrets Scanning to find secrets in source code.
is_beta: true
algolia:
  tags: ['secrets scanning', 'datadog static analysis', 'SAST']
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Secrets Scanning is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}


## Overview

Datadog Secrets Scanning scans code and finds secrets. When possible, Datadog attempts to validate secrets and
surface their status (valid, invalid) so that you can prioritize secrets remediation.

## Set up Static Code Analysis

Scans can run via your CI/CD pipelines or directly in Datadog with hosted scanning (GitHub-only).
To get started, go to the [**Code Security** setup page][1] or learn how to set-up secrets scanning
using [GitHub actions][5] or with [other CI providers][6].

## Rules

Datadog Secrets Scanning is powered by [Sensitive Data Scanner (SDS)][3] and includes all rules in the
[Secrets and credentials category of SDS][4].


[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: /security/code_security/static_analysis/setup
[3]: /sensitive_data_scanner/
[4]: /scanning_rules/library_rules/#secrets-and-credentials
[5]: /security/secret_scanning/github_actions
[6]: /security/secret_scanning/generic_ci_providers
