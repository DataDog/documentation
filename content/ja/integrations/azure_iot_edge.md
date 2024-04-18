---
app_id: azure-iot-edge
app_uuid: 9c4d7121-eed1-429c-bd86-18952b11d3f5
assets:
  dashboards:
    azure_iot_edge: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: azure.iot_edge.edge_agent.iotedged_uptime_seconds
      metadata_path: metadata.csv
      prefix: azure.iot_edge.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10125
    source_type_name: Azure IoT Edge
  logs:
    source: azure.iot_edge
  monitors:
    Disk usage: assets/monitors/disk_usage.json
    Edge Hub retries: assets/monitors/edgehub_retries.json
    IoT Hub syncs: assets/monitors/iothub_syncs.json
    Memory usage: assets/monitors/memory_usage.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- azure
- iot
- ログの収集
- ネットワーク
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/azure_iot_edge/README.md
display_on_public_website: true
draft: false
git_integration_title: azure_iot_edge
integration_id: azure-iot-edge
integration_title: Azure IoT Edge
integration_version: 4.2.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: azure_iot_edge
public_title: Azure IoT Edge
short_description: Azure IoT Edge デバイスとモジュールの健全性とパフォーマンスを監視。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::IoT
  - Category::Log Collection
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Azure IoT Edge デバイスとモジュールの健全性とパフォーマンスを監視。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure IoT Edge
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

[Azure IoT Edge][1] は、クラウドのワークロードをデプロイして、標準コンテナを使って Internet of Things (IoT) Edge デバイスで実行するためのフルマネージド型サービスです。

Datadog-Azure IoT Edge インテグレーションを使用すると IoT Edge デバイスからメトリクスや健全性の状態を収集できます。

**注**: このインテグレーションには、IoT Edge ランタイムバージョン 1.0.10 以降が必要です。

## 計画と使用

以下の手順に従って、このチェックをデバイスホストで実行中の IoT Edge デバイスにインストール、構成します。

### インフラストラクチャーリスト

Azure IoT Edge チェックは [Datadog Agent][2] パッケージに含まれています。

デバイスに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

Agent がカスタムモジュールとして実行するよう、IoT Edge デバイスを構成します。Azure IoT Edge のインストール方法およびカスタムモジュールの利用方法について、詳しくは Microsoft のドキュメントで [Azure IoT Edge モジュールの実装][3]をご確認ください。

IoT Edge メトリクスの収集を開始するには、下記の手順で IoT Edge デバイス、ランタイムモジュール、そして Datadog Agent を構成します。

1. **Edge Agent** ランタイムモジュールを以下のように構成します。
    - イメージバージョンは `1.0.10` 以上である必要があります。
    - "Create Options" で、次の `Labels` を追加します。`com.datadoghq.ad.instances` ラベルを適宜編集します。使用可能なすべてのコンフィギュレーションオプションについては、[azure_iot_edge.d/conf.yaml のサンプル conf.yaml][4] を参照してください。ラベルベースのインテグレーションコンフィギュレーションに関する詳細は、[Docker インテグレーションオートディスカバリー][5]のドキュメントをご参照ください。

        ```json
        "Labels": {
            "com.datadoghq.ad.check_names": "[\"azure_iot_edge\"]",
            "com.datadoghq.ad.init_configs": "[{}]",
            "com.datadoghq.ad.instances": "[{\"edge_hub_prometheus_url\": \"http://edgeHub:9600/metrics\", \"edge_agent_prometheus_url\": \"http://edgeAgent:9600/metrics\"}]"
        }
        ```

2. **Edge Hub** ランタイムモジュールを以下のように構成します。
    - イメージバージョンは `1.0.10` 以上である必要があります。

3. Datadog Agent を**カスタムモジュール**としてインストールし、構成します。
    - モジュール名を設定します。(例: `datadog-agent`)
    - Agent のイメージ URI を設定します。(例: `datadog/agent:7`)
    - "Environment Variables" で `DD_API_KEY` を構成します。ここで、追加の Agent コンフィギュレーションを設定することも可能です ([Agent の環境変数][6]参照)。
    - "Container Create Options" で、デバイスの OS に基づき以下のコンフィギュレーションを入力します。**注**: `NetworkId` は、デバイスの `config.yaml` ファイルに設定されたネットワーク名と一致する必要があります。

        - Linux:
            ```json
            {
                "HostConfig": {
                    "NetworkMode": "default",
                    "Env": ["NetworkId=azure-iot-edge"],
                    "Binds": ["/var/run/docker.sock:/var/run/docker.sock"]
                }
            }
            ```
        - Windows:
            ```json
            {
                "HostConfig": {
                    "NetworkMode": "default",
                    "Env": ["NetworkId=nat"],
                    "Binds": ["//./pipe/iotedge_moby_engine:/./pipe/docker_engine"]
                }
            }
            ```

    - Datadog Agent カスタムモジュールを保存します。

4. 変更を保存しデバイスのコンフィギュレーションにデプロイします。

#### 収集データ

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。Datadog Agent カスタムモジュールを構成することで、これを有効にします。
    - "Environment Variables" で、`DD_LOGS_ENABLED` 環境変数を設定します。

        ```yaml
        DD_LOGS_ENABLED: true
        ```

2. "Create Options" で **Edge Agent** および **Edge Hub** モジュールを構成し、以下のラベルを追加します。

    ```json
    "Labels": {
        "com.datadoghq.ad.logs": "[{\"source\": \"azure.iot_edge\", \"service\": \"<SERVICE>\"}]",
        "...": "..."
    }
    ```

    環境に合わせて `service` を変更します。

    ログを収集するカスタムモジュールに、この操作を繰り返します。

3. 変更を保存しデバイスのコンフィギュレーションにデプロイします。

### 検証

Agent がデバイスにデプロイされたら、[Agent の status サブコマンドを実行][7]し、Checks セクションで `azure_iot_edge` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "azure_iot_edge" >}}


### ヘルプ

Azure IoT Edge には、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "azure_iot_edge" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

- [Datadog を使用した Azure IoT Edge の監視][11]

[1]: https://azure.microsoft.com/en-us/services/iot-edge/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.microsoft.com/en-us/azure/iot-edge/how-to-deploy-modules-portal
[4]: https://github.com/DataDog/integrations-core/blob/master/azure_iot_edge/datadog_checks/azure_iot_edge/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/docker/integrations/
[6]: https://docs.datadoghq.com/ja/agent/guide/environment-variables/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/azure_iot_edge/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/azure_iot_edge/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://www.datadoghq.com/blog/monitor-azure-iot-edge-with-datadog/