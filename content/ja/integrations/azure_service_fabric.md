---
categories:
  - cloud
  - azure
ddtype: check
dependencies: []
description: Azure Service Fabric からメトリクスを追跡する
doc_link: https://docs.datadoghq.com/integrations/azure_service_fabric/
draft: false
git_integration_title: azure_service_fabric
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Service Fabric
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_service_fabric
public_title: Datadog-Microsoft Azure Service Fabric インテグレーション
short_description: Azure Service Fabric からメトリクスを追跡する
version: '1.0'
---
## 概要

Azure Service Fabric は、スケーラブルで信頼性の高いマイクロサービスとコンテナをパッケージ化、デプロイ、管理するために使用される分散型システムプラットフォームです。

## セットアップ
### インストール

[Microsoft Azure インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

[Azure コマンドラインインターフェイス][2]でコマンドを実行して、Datadog で Azure Service Fabric クラスターの健全性を監視します。

インストールコマンドを実行するには、次をメモします。

- クラスターが使用している OS (Windows または Linux)
- クラスターのリソースグループ
- クラスター内の基底のノードを管理する Virtual Machine Scale Set (VMSS) の名前
- [Datadog API キー][3]

収集した情報に基づいて、次のコマンドを更新します。

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

Azure CLI にログインし、更新されたコマンドを実行して、クラスター内のノードに Datadog Agent をデプロイします。

### VM 拡張機能

別のインストール方法は、Datadog Azure 仮想マシン拡張機能を Service Fabric クラスターの [ARM テンプレート][4]に直接追加することです。

## 収集データ
### メトリクス

Datadog Agent は Service Fabric クラスター内のノードにインストールされているため、メトリクスは Agent の[コアチェック][5]から Datadog に報告されます。

Service Fabric でコンテナ化されたアプリを実行している場合、Agent は [Service Fabric Mesh メトリクス][6]を報告します。

### イベント
Azure Service Fabric インテグレーションには、イベントは含まれません。

### サービスのチェック
Azure Service Fabric インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/azure/
[2]: https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://github.com/DataDog/service-fabric-datadog
[5]: https://docs.datadoghq.com/ja/getting_started/agent/#checks
[6]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftservicefabricmeshapplications
[7]: https://docs.datadoghq.com/ja/help/