---
further_reading:
- link: /logs/explorer/
  tag: Documentation
  text: ログの調査方法
kind: documentation
title: Datadog リソースによる Azure ログの送信
---

{{< site-region region="us3" >}}

## 概要

このガイドを使用して、[Azure の Datadog リソース][7]を介して、Azure サブスクリプションから Datadog に直接ログを設定し、管理します。3 種類の Azure ログの収集を管理できます。以下のセクションで説明と詳細をご覧ください。

   - [アクティビティログ](#activity-logs)
   - [Azure リソースログ](#azure-resource-logs)
   - [Azure Active Directory (Azure AD) ログ](#azure-active-directory-azure-ad-logs)

**注**: Azure の Datadog リソースは、Datadog US3 サイトの Datadog 組織でのみ利用可能です。その他の [Datadog サイト][5]を使用している場合は、構成オプションについて [Azure ログを Datadog に送信][6]のガイドを参照してください。

## アクティビティログ

[コントロールプレーン][1]におけるリソースの運用に関するインサイトを提供します。アクティビティログを使用して、書き込み作業の何、誰、いつを決定します (`PUT`、`POST`、`DELETE`)。

アクティビティログを Datadog に送信するには、**Send subscription activity logs** を選択します。このオプションを有効にしない場合、アクティビティログは Datadog に送信されません。

<div class="alert alert-warning">When log collection is enabled, the Datadog resource automatically modifies the logging configurations of <a href="https://learn.microsoft.com/azure/app-service/">App Services</a>. Azure triggers a <strong>restart</strong> for App Services when their logging configurations change.</div>

## Azure resource logs 

Provide insight into operations taken on Azure resources at the [data plane][1]. For example, getting a secret from a key vault or making a request to a database are data plane operations. The content of resource logs varies by the Azure service and resource type.

To send Azure resource logs to Datadog, select **Send Azure resource logs for all defined resources**. The types of Azure resource logs are listed in the [Azure Monitor Resource Log categories][2]. When this option is selected, all resource logs are sent to Datadog, including any new resources created in the subscription.

You can optionally filter the set of Azure resources sending logs to Datadog using Azure resource tags.

### Tag rules for sending logs

- Azure resources with `include` tags send logs to Datadog.
- Azure resources with `exclude` tags don't send logs to Datadog.
- If there's a conflict between inclusion and exclusion rules, exclusion takes priority.

For example, the screenshot below shows a tag rule where only those virtual machines, virtual machine scale sets, and app service plans tagged as `Datadog = True` send metrics and logs to Datadog.

{{< img src="integrations/azure/azure-us3-create-dd-resource3.png" alt="Azure US3 create a Datadog resource logs" responsive="true" style="width:90%;">}}

## Azure Active Directory (Azure AD) logs 

Azure AD logs contain the history of sign-in activity and an audit trail of changes made in Azure AD for a particular tenant. To send these logs to Datadog, first complete the process to create a Datadog resource. Once you have a Datadog resource in Azure, follow the setup steps in the [Datadog in the Azure Portal][3] guide.

[1]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/control-plane-and-data-plane
[2]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs-categories
[3]: https://docs.datadoghq.com/ja/integrations/guide/azure-portal/#azure-active-directory-logs
[4]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors
[5]: /ja/getting_started/site/
[6]: /ja/logs/guide/azure-logging-guide
[7]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/
{{< /site-region >}}

{{< site-region region="us,eu,us5,gov,ap1" >}}

<div class="alert alert-info">The Datadog resource in Azure is only available for organizations on Datadog's US3 site. If you're using a different Datadog site, see the <a href="https://docs.datadoghq.com/logs/guide/azure-logging-guide/" target="_blank">Send Azure Logs to Datadog</a> guide for configuration options. If you're using the Datadog US3 site, <a href="?site=us3" target="_blank">change the site selector</a> on the right of this page.</div>

{{< /site-region >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}