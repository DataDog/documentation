---
title: Send Azure Logs with the Datadog Resource
kind: documentation
further_reading:
- link: /logs/explorer/
  tag: Documentation
  text: Learn how to explore your logs
---

{{< site-region region="us3" >}}

## Overview

Use this guide to set up and manage logging directly from your Azure subscriptions to Datadog through the [Datadog resource in Azure][7]. You can manage the collection of three kinds of Azure logs. Find instructions and additional details in the sections below:

   - [Activity logs](#activity-logs)
   - [Azure resource logs](#azure-resource-logs)
   - [Azure Active Directory (Azure AD) logs](#azure-active-directory-azure-ad-logs)

**Note**: The Datadog resource in Azure is only available to Datadog organizations on the Datadog US3 site. If you are using any other [Datadog site][5], see the [Send Azure Logs to Datadog][6] guide for configuration options.

## Activity logs 

Provide insight into the operations on your resources at the [control plane][1]. Updates on service health events are also included. Use the activity log to determine the what, who, and when for any write operations (`PUT`, `POST`, `DELETE`).

To send activity logs to Datadog, select **Send subscription activity logs**. If this option is left unchecked, none of the activity logs are sent to Datadog.

<div class="alert alert-warning">When log collection is enabled, the Datadog resource automatically modifies the logging configurations of <a href="https://learn.microsoft.com/azure/app-service/">App Services</a>. Azure triggers a <strong>restart</strong> for App Services when their logging configurations change.</div>

## Azure resource logs 

Provide insight into operations taken on Azure resources at the [data plane][1]. For example, getting a secret from a key vault or making a request to a database are data plane operations. The content of resource logs varies by the Azure service and resource type.

To send Azure resource logs to Datadog, select **Send Azure resource logs for all defined resources**. The types of Azure resource logs are listed in the [Azure Monitor Resource Log categories][2]. When this option is selected, all resource logs are sent to Datadog, including any new resources created in the subscription.

オプションで、Azure リソースタグを使用して Datadog にログを送信する Azure リソースを絞り込むことができます。

### ログ送信のタグルール

- `include` タグのある Azure リソースは Datadog にログを送信します。
- `exclude` タグのある Azure リソースは Datadog にログを送信しません。
- 包含および除外ルールの間で競合がある場合は、除外が優先されます。

たとえば、下記のスクリーンショットは、`Datadog = True` とタグ付けされた仮想マシン、仮想マシンスケールセット、アプリサービスプランのみがメトリクスおよびログを Datadog に送信するというタグルールを示したものです。

{{< img src="integrations/azure/azure-us3-create-dd-resource3.png" alt="Azure US3 Datadog リソースログの作成" responsive="true" style="width:90%;">}}

## Azure Active Directory (Azure AD) logs 

Azure AD logs contain the history of sign-in activity and an audit trail of changes made in Azure AD for a particular tenant. To send these logs to Datadog, first complete the process to create a Datadog resource. Once you have a Datadog resource in Azure, follow the setup steps in the [Datadog in the Azure Portal][3] guide.

[1]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/control-plane-and-data-plane
[2]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories
[3]: https://docs.datadoghq.com/integrations/guide/azure-portal/#azure-active-directory-logs
[4]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors
[5]: /getting_started/site/
[6]: /logs/guide/azure-logging-guide
[7]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/
{{< /site-region >}}

{{< site-region region="us,eu,us5,gov,ap1" >}}

<div class="alert alert-info">The Datadog resource in Azure is only available for organizations on Datadog's US3 site. If you're using a different Datadog site, see the <a href="https://docs.datadoghq.com/logs/guide/azure-logging-guide/" target="_blank">Send Azure Logs to Datadog</a> guide for configuration options. If you're using the Datadog US3 site, <a href="?site=us3" target="_blank">change the site selector</a> on the right of this page.</div>

{{< /site-region >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
