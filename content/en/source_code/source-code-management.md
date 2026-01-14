---
title: Source Code Management
description: "Connect your Git repositories to Datadog through source code management (SCM) provider integrations."
further_reading:
- link: "/integrations/github/"
  tag: "Documentation"
  text: "Learn about the GitHub Integration"
- link: "/integrations/gitlab-source-code/"
  tag: "Documentation"
  text: "Learn about the GitLab Source Code Integration"
- link: "/integrations/azure-devops-source-code/"
  tag: "Documentation"
  text: "Learn about the Azure DevOps Source Code Integration"
---

## Overview

To use most source code-related features, you must connect your Git repositories to Datadog through Datadog's first-party source code management (SCM) provider integrations. After connecting your repositories, Datadog may store the contents of your repositories for up to 7 days to reduce repeated requests to the repository and support feature performance.

## Source code management providers

Datadog supports the following features for the SCM providers listed below. See [Features][1] for more details about each feature:

| Feature | GitHub | GitLab | Azure DevOps | Bitbucket |
|---|---|---|---|---|
| **Connect SaaS Instance** | Yes <br />(GitHub.com and GitHub Enterprise Cloud) | Yes <br />(GitLab.com) | Yes <br />(Azure DevOps Services) | No <br />(Bitbucket.org) |
| **Connect On-Prem Instance** | Yes <br />(GitHub Enterprise Server) | Yes <br />(GitLab Self-Managed or Dedicated) | No <br />(Azure DevOps Server) | No <br />(Bitbucket Data Center or Server)|
| **Context Links** | Yes | Yes | Yes | Yes |
| **Code Snippets** | Yes | Yes | Yes | No |
| **PR Comments** | Yes | Yes | Yes | No |

{{< tabs >}}
{{% tab "GitHub (SaaS & On-Prem)" %}}

<div class="alert alert-info">
Repositories from GitHub instances are supported for GitHub.com, GitHub Enterprise Cloud (SaaS), and GitHub Enterprise Server (On-Prem). For GitHub Enterprise Server, your instance must be accessible from the internet. If needed, you can allowlist <a href="https://docs.datadoghq.com/api/latest/ip-ranges/">Datadog's <code>webhooks</code> IP addresses</a> to allow Datadog to connect to your instance.
</div>

Install Datadog's [GitHub integration][101] using the [integration tile][102] or while onboarding other Datadog products to connect to your GitHub repositories.

[101]: https://docs.datadoghq.com/integrations/github/
[102]: https://app.datadoghq.com/integrations/github/

{{% /tab %}}
{{% tab "GitLab (SaaS & On-Prem)" %}}

<div class="alert alert-info">
Repositories from GitLab instances are supported for both GitLab.com (SaaS) and GitLab Self-Managed/Dedicated (On-Prem). For GitLab Self-Managed, your instance must be accessible from the internet. If needed, you can allowlist <a href="https://docs.datadoghq.com/api/latest/ip-ranges/">Datadog's <code>webhooks</code> IP addresses</a> to allow Datadog to connect to your instance.
</div>

Install Datadog's [GitLab Source Code integration][101] using the [integration tile][102] or while onboarding other Datadog products to connect to your GitLab repositories.

[101]: https://docs.datadoghq.com/integrations/gitlab-source-code/
[102]: https://app.datadoghq.com/integrations/gitlab-source-code/

{{% /tab %}}
{{% tab "Azure DevOps (SaaS Only)" %}}

<div class="alert alert-warning">
Repositories from Azure DevOps instances are supported for Azure DevOps Services (SaaS). Azure DevOps Server (On-Prem) is <strong>not</strong> supported.
</div>

Install Datadog's Azure DevOps Source Code integration using the [integration tile][101] or while onboarding other Datadog products to connect to your Azure DevOps repositories.

[101]: https://app.datadoghq.com/integrations/azure-devops-source-code/

{{% /tab %}}
{{% tab "Other SCM Providers" %}}

<div class="alert alert-danger">
Repositories on self-hosted instances or private URLs are not supported out-of-the-box. To enable this feature, <a href="/help">contact Support</a>.
</div>

If you are using any other SCM provider, you can still manually link telemetry with your source code. To do so, upload your repository metadata with the [`datadog-ci git-metadata upload`][1] command. `datadog-ci v2.10.0` or later is required.

When you run `datadog-ci git-metadata upload` within a Git repository, Datadog receives the repository URL, the commit SHA of the current branch, and a list of tracked file paths.

Run this command for every commit that you need to be synchronized with Datadog.

### Validation

To ensure the data is being collected, run `datadog-ci git-metadata upload` in your CI pipeline.

You can expect to see the following output:

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@my-git-server.com:my-org/my-repository.git.
180 tracked file paths will be reported.
Successfully uploaded tracked files in 1.358 seconds.
Syncing GitDB...
Successfully synced git DB in 3.579 seconds.
✅ Uploaded in 5.207 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /source_code/features/
