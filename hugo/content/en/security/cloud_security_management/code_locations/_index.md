---
title: Code Locations
description: Connect Cloud Security misconfiguration findings to the infrastructure as code (IaC) that defines the affected resource so you can remediate at the source.
further_reading:
- link: "/security/cloud_security_management/misconfigurations/"
  tag: "Documentation"
  text: "Cloud Security Misconfigurations"
- link: "/integrations/guide/source-code-integration/"
  tag: "Documentation"
  text: "Set up Source Code Integration"
- link: "/security/cloud_security_management/review_remediate/workflows/"
  tag: "Documentation"
  text: "Automate remediation with Workflow Automation"
products:
  - name: Cloud Security Misconfigurations
    url: /security/cloud_security_management/misconfigurations/
    icon: cloud-security-management
---

{{< product-availability >}}

## Overview

A Cloud Security misconfiguration finding starts from a live cloud resource, such as an S3 bucket. The next question is usually where that bucket is defined in your codebase, so you can fix it at the source. Code location answers that by connecting the finding to the infrastructure as code (IaC) that created the resource, so the fix holds instead of being reverted the next time your IaC is applied.

Code location applies only to resources defined in IaC. A resource created at runtime (through the CLI, the cloud console, or an SDK) has no code to link to.

### Supported IaC formats

- Terraform

### What a code location shows

When Datadog resolves a code location for a finding, the finding side panel shows the repository, file, and line that define the resource, a link to those lines in your source control provider, and the code owners responsible for the file.

{{< img src="security/csm/code_location_misconfiguration.png" alt="A misconfiguration finding side panel showing the repository, file, line, and code owners that define the resource" style="width:100%;" >}}

## Prerequisites

To see code locations on your misconfiguration findings, you need:

- [Cloud Security Misconfigurations][1] enabled for the cloud accounts you want to scan, so that findings are generated.
- [{{< prodname >}}Source Code Integration{{< /prodname >}}][2] connected to the repositories that contain your IaC. Datadog indexes supported IaC files in your connected repositories to determine where each resource is defined.

After both are configured, Datadog resolves code locations for supported resources automatically. Coverage increases as you connect more of the repositories that manage your cloud infrastructure.

## Improve code location coverage

Datadog resolves code locations most reliably when it can read the state your IaC tool maintains. States map each resource in your cloud account to the block of code that declares it, which gives Datadog a definitive match. Without it, Datadog infers the match from resource names and attributes, and resolves code locations for fewer findings.

### Terraform state files

If you store Terraform states in Amazon S3, enable [Agentless Scanning][9]. Agentless Scanning already has the read access needed to locate state files in your S3 buckets, so no additional configuration is required. Datadog reads only the fields needed to resolve code locations from each state file.

## View the code location for a finding

1. Navigate to the [Misconfigurations findings][3] page.
2. Select a finding to open its side panel.
3. In the **Where (IAC)** section, review the repository, file, and line where the resource is defined.
4. Click the file to open the exact lines in your source control provider, or review the listed code owners to identify the team that owns the file.

## Filter findings by code location

To focus on findings that Datadog can trace to source code, search the Misconfigurations findings page for `@code_location.filename:*`. This returns every misconfiguration for which a code location is resolved—effectively a view of what you can remediate in code.

You can narrow the results further. For example:

- `@code_location.filename:*.tf` returns findings whose code locations are in Terraform files.
- `@code_location.filename:*network*` returns findings defined in your network modules.

## Remediate in source code

After you locate the code that defines a misconfigured resource, you can remediate it in several ways:

- **Remediate with AI**: Click **Remediate with AI** on the finding to hand off the fix to [{{< prodname >}}Bits Code{{< /prodname >}}][7], or to copy a fix prompt into the coding agent you already use. See [Remediate with AI][8].
- **Route to the right team**: Use the code owners shown on the finding to assign the fix to the team that owns the file, or [create a ticket][4] in your ticketing tool.
- **Automate remediation**: Use [{{< prodname >}}Workflow Automation{{< /prodname >}}][5] to build automated remediation workflows, with or without human approval.

If a misconfiguration doesn't apply to your environment or is an accepted risk, you can [mute it][6] instead.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/misconfigurations/
[2]: /integrations/guide/source-code-integration/
[3]: https://app.datadoghq.com/security/csm/misconfigurations-and-attack-paths
[4]: /security/ticketing_integrations/
[5]: /security/cloud_security_management/review_remediate/workflows/
[6]: /security/cloud_security_management/review_remediate/mute_issues/
[7]: /bits_ai/bits_code/
[8]: /security/cloud_security_management/review_remediate/remediate_with_ai/
[9]: /security/cloud_security_management/setup/agentless_scanning/
