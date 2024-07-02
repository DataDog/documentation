---
"categories":
- "azure"
- "cloud"
- "configuration & deployment"
- "os & system"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Azure VM のリソース使用状況、ネットワーク統計などを追跡。"
"doc_link": "https://docs.datadoghq.com/integrations/azure_vm/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/video-streaming-performance-monitoring-conviva/"
  "tag": "ブログ"
  "text": "Datadog で Conviva を監視する"
"git_integration_title": "azure_vm"
"has_logo": true
"integration_id": "azure-vm"
"integration_title": "Microsoft Azure VM"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_vm"
"public_title": "Datadog-Microsoft Azure VM Integration"
"short_description": "Track Azure VM resource usage, network statistics, and more."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Virtual Machine allows you to flexibly run virtualized environments with the ability to scale on-demand.

Get metrics from Azure VM to:

- Visualize the performance of your VMs.
- Correlate the performance of your VMs with your applications.

## セットアップ

### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first.

For **ARM** deployed virtual machines, you must turn on Diagnostics and select the VM metrics to collect. See [Enable Diagnostics][2] for instructions.

### Automuting monitors

Datadog can proactively mute monitors related to the shutdown or termination of Azure VMs, whether the shutdown was triggered manually or by Azure autoscaling, based on health statuses available through the [Azure Resource Health API][3]. By silencing monitors for expected Azure VM shutdowns, you can reduce noise from unnecessary alerts. 

Automatically muted virtual machines are listed on the [Manage Downtime][4] page by enabling **Show automatically muted hosts**. The Azure integration must be installed for automuting to take effect. 

To silence monitors for shutdown or terminated Azure VMs, check the **Azure automuting** box in the Azure integration tile.

To create metric monitors that can be automatically muted, ensure that you trigger based on the `host` tag. Metric monitors that do not include the `host` tag in the monitored group are not automatically muted.

{{< img src="integrations/azure_vm/azure_vm_automute2.png" alt="A Monitor alerting on a query that includes host tag" >}}

**Note:** If you are not running the Datadog Agent, the `host` tag on your Azure VM is a GUID. Use the message template variable `{{host.name_tag}}` in the notification response to include the human readable name as well. 

## 収集データ

<div class="alert alert-warning">The <code>azure.vm.status</code> metric is deprecated and is no longer populated for newly created Datadog organizations. For existing users, this metric was disabled on June 1, 2023.

For any questions, contact <a href="https://docs.datadoghq.com/help/" target="_blank">Datadog Support</a>.</div>

### メトリクス
{{< get-metrics-from-git "azure_vm" >}}


### イベント

The Azure Virtual Machine integration does not include any events.

### サービスチェック

The Azure Virtual Machine integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][6].

## Further Reading

- [How to monitor Microsoft Azure VMs][7]
- [How to collect Azure metrics][8]
- [Monitor Azure VMs using Datadog][9]
- [Strategize your Azure migration for SQL workloads with Datadog][10]

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://docs.datadoghq.com/integrations/guide/azure-troubleshooting/#enable-diagnostics
[3]: https://docs.microsoft.com/en-us/rest/api/resourcehealth/
[4]: https://app.datadoghq.com/monitors/downtimes
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_vm/azure_vm_metadata.csv
[6]: https://docs.datadoghq.com/help/
[7]: https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms
[8]: https://www.datadoghq.com/blog/how-to-collect-azure-metrics
[9]: https://www.datadoghq.com/blog/monitor-azure-vms-using-datadog
[10]: https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/

