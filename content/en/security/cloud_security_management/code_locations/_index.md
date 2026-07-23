---
title: Code Locations
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

A Cloud Security misconfiguration finding starts from a live cloud resource—for example, a Google Kubernetes Engine node pool that fails the rule *Secure Boot for Shielded GKE Nodes should be enabled*. Code location connects that finding to the Terraform that defines the resource, so you can fix the problem where it originates instead of in the cloud console, where a manual change is reverted the next time your infrastructure-as-code is applied.

When Datadog resolves a code location for a finding, the finding side panel shows the repository, file, and line that define the resource, a link to those lines in your source control provider, and the code owners responsible for the file.

{{< img src="security/csm/code_location_misconfiguration.png" alt="A misconfiguration finding side panel showing the repository, file, line, and code owners that define the resource" style="width:100%;" >}}

## Prerequisites

To see code locations on your misconfiguration findings, you need:

- [Cloud Security Misconfigurations][1] enabled for the cloud accounts you want to scan, so that findings are generated.
- [Source Code Integration][2] connected to the repositories that contain the Terraform for those resources. Datadog indexes the Terraform in your connected repositories to determine where each resource is defined.

After both are configured, Datadog resolves code locations for supported resources automatically. Coverage increases as you connect more of the repositories that manage your cloud infrastructure.

## View the code location for a finding

1. Navigate to the [Misconfigurations findings][3] page.
2. Select a finding to open its side panel.
3. In the **Where (IAC)** section, review the repository, file, and line where the resource is defined.
4. Click the file to open the exact lines in your source control provider, or review the listed code owners to identify the team that owns the file.

## Filter findings by code location

To focus on findings that Datadog can trace to source code, search the Misconfigurations findings page for `@code_location.filename:*`. This returns every misconfiguration for which a code location is resolved—effectively a view of what you can currently remediate in code.

Narrow the results further, for example:

- `@code_location.filename:*.tf` returns findings whose code location is in a Terraform file.
- `@code_location.filename:*network*` returns findings defined in your network modules.

## Remediate in source code

After you locate the code that defines a misconfigured resource, you can remediate it in several ways:

- **Open a pull request.** For supported Terraform resources, Datadog can generate a pull request in your source control provider with the code changes that fix the underlying misconfiguration. Review and merge the pull request to remediate at the source.
- **Route to the right team.** Use the code owners shown on the finding to assign the fix to the team that owns the file, or [create a ticket][4] in your ticketing tool.
- **Automate remediation.** Use [Workflow Automation][5] to build automated remediation workflows, with or without human approval.

If a misconfiguration doesn't apply to your environment or is an accepted risk, you can [mute it][6] instead.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/misconfigurations/
[2]: /integrations/guide/source-code-integration/
[3]: /security/cloud_security_management/misconfigurations/findings/
[4]: /security/ticketing_integrations/
[5]: /security/cloud_security_management/review_remediate/workflows/
[6]: /security/cloud_security_management/review_remediate/mute_issues/
