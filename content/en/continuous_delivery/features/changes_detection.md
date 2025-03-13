---
title: Changes Detection
description: Learn about how CD Visibility detects changes.
further_reading:
- link: "/continuous_delivery/deployments/"
  tag: "Documentation"
  text: "Learn about Deployment Visibility"
- link: "/continuous_delivery/explorer"
  tag: "Documentation"
  text: "Learn how to query and visualize deployments"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CD Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Join the Preview!" >}}
CD Visibility is in Preview. If you're interested in this feature, complete the form to request access.
{{< /callout >}}

## Overview

The Changes Detection feature allows Datadog to identify the commits introduced as part of a deployment. This is particularly valuable to:
1.	Understand where specific changes have been deployed, such as tracking when updates reach the `production` environment.
2.	Diagnose incidents related to a deployment by providing visibility into the exact changes introduced, helping teams quickly pinpoint potential root causes and accelerate troubleshooting.

To detect the changes deployed, Datadog runs the [Git Log][1] between the current deployment commit SHA and the previous deployment commit SHA. Merge commits are excluded from the computation.

The deployed changes are visible inside any deployment execution of the [**Deployment Executions** page][2]. The **Code Changes** tab shows the previous deployment taken into consideration, and the changes detected between the two.

{{< img src="continuous_delivery/features/code_changes_tab.png" alt="Code Changes tab for changes detection feature" style="width:100%;">}}

Additionally, the **Deployments** column of the [**Recent Code Changes** page][3] displays the service and environment details for all deployments that included a specific commit. This view provide a quick way to understand if and where your changes are deployed.
Hovering over the service value reveals whether the deployment has reached all expected environments, based on where the service is typically deployed.

{{< img src="continuous_delivery/features/recent_code_changes_deployments.png" alt="Showing deployments in Recent Code Changes page" style="width:100%;">}}

Changes are only detected for deployments that:
1. Have a service and an environment. Additionally, the service needs to have the file path specs defined in Service Catalog (see the setup below for more information).
2. Have a repository URL and a commit SHA defined.

## Setup

To allow Changes Detection on your deployments, two steps are required:
1. Synchronize your repository metadata to Datadog.
2. Specify the source code file path for your services.

### Synchronize repository metadata to Datadog

<!--
The Following tabs were mostly copied from the Source Code Integration docs until we find a way to document this in a shared page
https://docs.datadoghq.com/integrations/guide/source-code-integration/?tab=github#synchronize-your-repository-metadata
-->

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-warning">
GitHub workflows running on <a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request"> <code>pull_request</code> trigger </a> are not currently supported by the GitHub integration.
If you are using the <code>pull_request</code> trigger, use the alternative method.
</div>

If the [GitHub integration][1] is not already installed, install it on the [GitHub integration tile][2].

When configuring the GitHub application:
1. Select at least **Read** repository permissions for **Contents** and **Pull Requests**.
2. Subscribe at least to **Push**, **PullRequest** and **PullRequestReview** events.

To confirm that the setup is valid, select your GitHub application in the [GitHub integration tile][2] and verify that, in the **Datadog Features** table, the **Pull Request Information** feature is marked as valid.

[1]: https://docs.datadoghq.com/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}

{{% tab "Other Git Providers" %}}

You can upload your Git repository metadata with the [`datadog-ci git-metadata upload`][1] command.
When this command is executed, Datadog receives the repository URL, the commit SHA of the current branch, and a list of tracked file paths.

Run this command in CI for every new commit. When a deployment is executed for a specific commit SHA, ensure that the `datadog-ci git-metadata upload` command is run for that commit **before** the deployment event is sent.

<div class="alert alert-warning">
Do not provide the <code>--no-gitsync</code> option to the <code>datadog-ci git-metadata upload</code> command.
When that option is included, the commit information is not sent to Datadog and changes are not detected.
</div>

You can validate the correct setup of the command by checking the command output. An example of a correct output is:
```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@github.com:organization/example-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

### Specify service file path patterns

To correctly understand the changes that a deployment has introduced, only the commits affecting the specific service being deployed should be considered.

This can be done in [Software Catalog][5] by specifying, for the interested services, the source code glob file path patterns in the [service definition][4].

If the service definition contains a **full** GitHub URL to the application folder, a single path pattern is automatically used.

**Example (schema version v2.2):**

```yaml
links:
  - name: shopist
    type: repo
    provider: github
    url: https://github.com/organization/example-repository/tree/main/src/apps/shopist
```

Changes Detection for deployments of the `shopist` service will only consider the Git commits that include changes within the `src/apps/shopist/**` path. You can configure more granular control of the filtering with `extensions[datadoghq.com/cd-visibility]`.

**Example (schema version v2.2):**

```yaml
extensions:
  datadoghq.com/cd-visibility:
    source_patterns:
      - src/apps/shopist/**
      - src/libs/utils/**
```

Changes Detection for deployments of the `shopist` service will only consider the Git commits that include changes within the `src/apps/shopist/**` or the `src/libs/utils/**` paths.

If both entries are defined for a service, only `extensions[datadoghq.com/cd-visibility]` is considered when filtering the commits.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://git-scm.com/docs/git-log
[2]: https://app.datadoghq.com/ci/deployments/executions
[3]: https://app.datadoghq.com/ci/commits
[4]: /tracing/software_catalog/adding_metadata
[5]: /tracing/software_catalog

