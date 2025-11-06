---
title: Set Up Code Coverage
description: "Configure Code Coverage by integrating with GitHub or GitLab, setting permissions, and creating PR Gates."
further_reading:
  - link: "/code_coverage"
    tag: "Documentation"
    text: "Code Coverage"
  - link: "/code_coverage/data_collected"
    tag: "Documentation"
    text: "Learn what data is collected for Code Coverage"
  - link: "/code_coverage/upload"
    tag: "Documentation"
    text: "Upload code coverage reports"
---

{{< callout url="http://datadoghq.com/product-preview/code-coverage/" >}}
Code Coverage is in Preview. This product replaces Test Optimization's <a href="https://docs.datadoghq.com/tests/code_coverage">code coverage</a> feature, which is being deprecated. Complete the form to request access for the new Code Coverage product.
{{< /callout >}}

Setting up Code Coverage involves the following steps:

1. Configure the integration with your [source code provider](#integrate-with-source-code-provider) in the Datadog UI.
2. Configure code coverage [data access permissions](#data-access-permissions) in Datadog.
3. Optionally, configure a [PR Gate](#pr-gates) to block pull requests based on coverage thresholds.
4. Update your CI pipeline to [upload code coverage reports][6] to Datadog.

## Integrate with source code provider

Code Coverage supports the following:

{{< tabs >}}
{{% tab "GitHub" %}}

Follow instructions in the [GitHub integration documentation][1] on how to connect your GitHub repositories to Datadog.

Code Coverage requires the following GitHub App permissions:
| Permission | Access Level | Purpose |
|---|---|---|
| Contents | Read | Show source code in the detailed coverage UI. |
| Pull Requests | Write | Show PR data in coverage UI and write PR comments. |
| Checks | Write | Create coverage PR Gates. |

The following webhooks are required:
| Webhook | Purpose |
|---|---|
| Pull request | Receive PR data updates. |
| Pull request review | Receive PR data updates. |
| Pull request review comment | Receive PR data updates. |
| Push | Receive Git commit metadata. |

If everything is configured correctly, a green check mark is displayed in Datadog's [GitHub Integration][2] page:
{{< img src="/code_coverage/github_app_success.png" alt="GitHub App integration success check" style="width:100%" >}}

<div class="alert alert-info">If you have a Datadog-managed Marketplace App or a custom app with default settings, the required permissions and webhooks are included.</div>

[1]: /integrations/github/#github-apps-1
[2]: https://app.datadoghq.com/integrations/github/configuration
{{% /tab %}}
{{% tab "Gitlab" %}}

Follow instructions in the [Gitlab Source Code integration documentation][1] on how to connect your Gitlab repositories to Datadog.

See [Datadog Source Code Integration Guide][2] for additional context.

[1]: /integrations/gitlab-source-code/
[2]: /integrations/guide/source-code-integration/?tab=gitlabsaasonprem#connect-your-git-repositories-to-datadog
[2]: https://app.datadoghq.com/integrations/gitlab-source-code

{{% /tab %}}
{{% tab "Azure DevOps" %}}

Follow instructions in the [Datadog Source Code Integration Guide][1] on how to connect your Azure DevOps repositories to Datadog
using [Azure DevOps Source Code integration][2].

[1]: /integrations/guide/source-code-integration/?tab=azuredevopssaasonly#connect-your-git-repositories-to-datadog
[2]: https://app.datadoghq.com/integrations/azure-devops-source-code/

{{% /tab %}}
{{< /tabs >}}

See [Data Collected][1] for details on what data is collected from your source code provider.

## Data access permissions

If you are using [custom roles][2] rather than [Datadog-managed roles][3], be sure to enable the `Code Coverage Read` permission for the roles that need to view code coverage data.

Navigate to [Roles settings][4], click `Edit` on the role you need, add the `Code Coverage Read` permission to the role, and save the changes.

## PR Gates

If you wish to gate on PR coverage, configure PR Gates rules in Datadog.

Navigate to [PR Gates rule creation][5] and configure a rule to gate on total or patch coverage.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /code_coverage/data_collected/#source-code-provider-integration
[2]: /account_management/rbac/permissions/#custom-roles
[3]: /account_management/rbac/permissions/#managed-roles
[4]: https://app.datadoghq.com/organization-settings/roles
[5]: https://app.datadoghq.com/ci/pr-gates/rule/create
[6]: /code_coverage/upload/
