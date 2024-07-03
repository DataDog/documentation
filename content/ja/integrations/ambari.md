---
app_id: ambari
app_uuid: 081f9cd9-a86a-4cea-ae5b-b4f7e163f413
assets:
  dashboards:
    Ambari base dashboard: assets/dashboards/base_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ambari.cpu.cpu_user
      metadata_path: metadata.csv
      prefix: ambari.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10064
    source_type_name: Ambari
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- network
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ambari/README.md
display_on_public_website: true
draft: false
git_integration_title: ambari
integration_id: ambari
integration_title: Ambari
integration_version: 4.2.1
is_public: true
manifest_version: 2.0.0
name: ambari
public_title: Ambari
short_description: Get metrics by host or service for all your ambari managed clusters
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Network
  - Supported OS::Linux
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Get metrics by host or service for all your ambari managed clusters
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Ambari
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [Ambari][1] を監視します。

## セットアップ

### インストール

Ambari チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### 構成

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

##### メトリクスの収集

1. Ambari のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `ambari.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル ambari.d/conf.yaml][1] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## The URL of the Ambari Server, include http:// or https://
     #
     - url: localhost
   ```

2. [Agent を再起動します][2]。

##### ログ収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. 下部にある `logs` 行のコメントを解除して、`ambari.d/conf.yaml` を編集します。ログの `path` を Ambari ログファイルの正しいパスで更新してください。

    ```yaml
      logs:
        - type: file
          path: /var/log/ambari-server/ambari-alerts.log
          source: ambari
          service: ambari
          log_processing_rules:
              - type: multi_line
                name: new_log_start_with_date
                # 2019-04-22 15:47:00,999
                pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
      ...
    ```

3. [Agent を再起動します][2]。

[1]: https://github.com/DataDog/integrations-core/blob/master/ambari/datadog_checks/ambari/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                        |
| -------------------- | ---------------------------- |
| `<INTEGRATION_NAME>` | `ambari`                     |
| `<INIT_CONFIG>`      | 空白または `{}`                |
| `<INSTANCE_CONFIG>`  | `{"url": "http://%%host%%"}` |

##### ログ収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                                                                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ambari", "service": "<サービス名>", "log_processing_rules":{"type":"multi_line","name":"new_log_start_with_date","pattern":"\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])"}}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `ambari` を探します。

## 収集データ

このインテグレーションは、以下のシステムメトリクスをすべてのクラスター内のホストごとに収集します。

- boottime
- cpu
- disk
- memory
- load
- ネットワーク
- process

`collect_service_metrics` を使用してサービスメトリクスの収集が有効にされている場合、このインテグレーションは、含まれるサービスコンポーネントごとに、インクルードリスト内のヘッダーを持つメトリクスを収集します。

### メトリクス
{{< get-metrics-from-git "ambari" >}}


### イベント

Ambari には、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "ambari" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。



[1]: https://ambari.apache.org
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/