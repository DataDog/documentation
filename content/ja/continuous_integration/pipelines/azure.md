---
aliases:
- /ja/continuous_integration/setup_pipelines/azure
further_reading:
- link: https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/
  tag: ブログ
  text: Datadog CI Visibility で Azure Pipelines を監視する
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: CI Visibility のトラブルシューティング
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: Documentation
  text: カスタムタグと測定値を追加してパイプラインの可視性を拡張する
title: Azure パイプラインでトレースを設定する
---

<div class="alert alert-warning">
Azure DevOps Server is not officially supported.
</div>

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

[Azure Pipelines][1] is a continuous integration and delivery service that supports any language, platform, or cloud.

Set up tracing on Azure Pipelines to gain real time insights into your CI/CD workflows, track pipeline performance, analyze inefficiencies, and manage your deployment operations.

### Compatibility

| Pipeline Visibility | Platform | Definition |
|---|---|---|
| [Custom tags][10] [and measures at runtime][11] | Custom tags and measures at runtime | Configure [custom tags and measures][6] at runtime. |
| [Custom spans][15] | Custom spans | Configure custom spans for your pipelines. |

## Configure the Datadog integration

The Datadog integration for [Azure Pipelines][1] works by using [service hooks][2] to send data to Datadog.

1. Install the [Datadog CI Visibility][8] extension from the Azure Marketplace. There are several extensions starting with **Datadog**, make sure that you are installing the [Datadog CI Visibility][8] extension.

2. For each project, go to **Project settings > Service hooks** in Azure DevOps and select the green plus (+) icon to create a subscription.

3. Create a new subscription to the `Datadog CI Visibility` service for each of the following webhook types:
    - **Run state changed**
    - **Run stage state changed**
    - **Run job state changed**
    - **Run stage approval completed**
    - **Run stage waiting for approval**

4. Click **Next** to continue to the next step and set the following:
    - **Datadog Site**: {{< region-param key="dd_site" >}}
    - **Datadog API Key**: your [Datadog API key][3].

5. Click **Finish**.

<div class="alert alert-info">
All 5 supported types of events are required and must be enabled individually.
Not enabling one or more events results in an an incomplete installation, leading to unexpected behavior in Datadog.
</div>

### 複数プロジェクトの一括構成


If you want to enable the hooks for many or all your Azure projects, Datadog provides a [script][12] to help you do it through the Azure API.

スクリプトを実行するには、以下が必要です。

- Azure DevOps のユーザー名
- An Azure DevOps [API Token][13]
- Azure DevOps の組織名

The script only needs python3 and the requests package. For more information, run:
```shell
./service_hooks.py --help
```

このスクリプトは環境変数 `DD_API_KEY` と `DD_SITE`、フラグパラメーター `--dd-api-key` と `--dd-site` をサポートします。

すべてのプロジェクトでフックを有効にする場合の例:
```
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    --threads 4
```

指定したプロジェクトでフックを有効にする場合の例:
```
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    projectName1 projectName2
```

### ジョブログ収集を有効にする

<div class="alert alert-info">Azure Log Collection is in private beta. To request access, fill out <a href="https://forms.gle/vXEQQcPLARdSDLd27">this form</a>.</div>

<div class="alert alert-info"><strong>Note</strong>: Job log collection is not available for <a href="https://docs.datadoghq.com/data_security/pci_compliance/?tab=logmanagement">PCI-compliant organizations</a>.</div>

Datadog supports log collection for your Azure DevOps pipelines. To enable it:

1. Install a Datadog app registration on your Azure console. Follow the steps within the [Azure integration][14].

2. Add the Datadog app registration to your Azure DevOps organization and to every project for which you want to enable Log Collection. You can do this by going to "Organization settings" in your DevOps console. You may select "Add to all projects" to configure all projects in bulk.

<div class="alert alert-info"><strong>Note</strong>: Logs are billed separately from CI Visibility. Log retention, exclusion, and indexes are configured in Logs Settings. Logs for Azure jobs can be identified by the <code>datadog.product:cipipeline</code> and <code>source:azurepipelines</code> tags.</div>

## Datadog でパイプラインデータを視覚化する

The [**CI Pipeline List**][4] and [**Executions**][5] pages populate with data after the workflows finish.

The **CI Pipeline List** page shows data for only the default branch of each repository.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://azure.microsoft.com/en-us/products/devops/pipelines
[2]: https://learn.microsoft.com/en-us/azure/devops/service-hooks/services/webhooks?view=azure-devops
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: /ja/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: https://marketplace.visualstudio.com/items?itemName=Datadog.ci-visibility
[9]: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops&tabs=check-pass#approvals
[10]: /ja/glossary/#custom-tag
[11]: /ja/glossary/#custom-measure
[12]: https://raw.githubusercontent.com/DataDog/ci-visibility-azure-pipelines/main/service_hooks.py
[13]: https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows#create-a-pat
[14]: https://app.datadoghq.com/integrations/azure
[15]: /ja/glossary/#custom-span