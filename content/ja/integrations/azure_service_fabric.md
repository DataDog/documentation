---
"categories":
- cloud
- azure
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track metrics from Azure Service Fabric"
"doc_link": "https://docs.datadoghq.com/integrations/azure_service_fabric/"
"draft": false
"git_integration_title": "azure_service_fabric"
"has_logo": true
"integration_id": "azure-service-fabric"
"integration_title": "Microsoft Azure Service Fabric"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_service_fabric"
"public_title": "Datadog-Microsoft Azure Service Fabric Integration"
"short_description": "Track metrics from Azure Service Fabric"
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Service Fabric is a distributed systems platform used to package, deploy, and manage scalable and reliable microservices and containers.

## セットアップ
### インストール

If you haven't already, set up the [Microsoft Azure integration][1] first.

Monitor the health of your Azure Service Fabric cluster in Datadog by running a command in the [Azure command line interface][2].

To run the install command, make note of the following:

- The OS your cluster is using (Windows or Linux)
- The resource group for your cluster
- The name of the Virtual Machine Scale Set (VMSS) managing the underlying nodes in the cluster
- Your [Datadog API key][3]

Update the following command based on the information you gathered:

{{< tabs >}}
{{% tab "Windows" %}}

```shell
az vmss extension set --name DatadogWindowsAgent --publisher Datadog.Agent --resource-group <RESOURCE_GROUP_NAME> --vmss-name <VMSS_NAME> --protected-settings "{'api_key':'<YOUR_API_KEY>'}"
```

{{% /tab %}}
{{% tab "Linux" %}}

```shell
az vmss extension set --name DatadogLinuxAgent --publisher Datadog.Agent --resource-group <RESOURCE_GROUP_NAME> --vmss-name <VMSS_NAME> --protected-settings "{'api_key':'<YOUR_API_KEY>'}"
```

{{% /tab %}}
{{< /tabs >}}

Login to the Azure CLI and run the updated command to deploy the Datadog Agent on the nodes in your cluster.

### VM extension

An alternative installation method is adding the Datadog Azure Virtual Machine extension directly to the [ARM template][4] of your Service Fabric cluster.

## 収集データ
### メトリクス

Because the Datadog Agent is installed on the nodes in your Service Fabric cluster, metrics are reported to Datadog from the Agent's [core checks][5].

If you are running containerized apps on Service Fabric, the Agent reports [Service Fabric Mesh metrics][6].

### イベント
The Azure Service Fabric integration does not include any events.

### サービスチェック
The Azure Service Fabric integration does not include any service checks.

## トラブルシューティング
Need help? Contact [Datadog support][7].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://github.com/DataDog/service-fabric-datadog
[5]: https://docs.datadoghq.com/getting_started/agent/#checks
[6]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftservicefabricmeshapplications
[7]: https://docs.datadoghq.com/help/

