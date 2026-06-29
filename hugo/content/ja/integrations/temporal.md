---
app_id: temporal
app_uuid: 6fbb6b85-e9f0-4d0e-af82-3c82871b857c
assets:
  dashboards:
    Temporal Server Overview: assets/dashboards/server_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: temporal.server.task.requests.count
      metadata_path: metadata.csv
      prefix: temporal.
    process_signatures:
    - temporal-server
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10337
    source_type_name: Temporal
  monitors:
    Frontend latency is elevated: assets/monitors/FrontendLatency.json
    History Service latency is elevated: assets/monitors/HistoryLatency.json
    Matching Service latency is elevated: assets/monitors/MatchingLatency.json
    Persistence latency is elevated: assets/monitors/PersistenceLatency.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- 開発ツール
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/temporal/README.md
display_on_public_website: true
draft: false
git_integration_title: temporal
integration_id: temporal
integration_title: Temporal
integration_version: 3.2.0
is_public: true
manifest_version: 2.0.0
name: temporal
public_title: Temporal
short_description: Temporal Cluster の健全性とパフォーマンスを監視します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Log Collection
  - Category::Developer Tools
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Temporal Cluster の健全性とパフォーマンスを監視します。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/temporal-server-integration/
  support: README.md#Support
  title: Temporal
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を介して [Temporal][1] を監視します。

**注**: このチェックは、Temporal をセルフホストしている場合にのみインストールできます。**Temporal Cloud インスタンスを監視するには**、[Datadog Temporal Cloud インテグレーション ドキュメント][2] に従ってください。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][3]のガイドを参照してこの手順を行ってください。

### インストール

Temporal チェックは、[Datadog Agent][4] パッケージに含まれています。
サーバー上での追加のインストールは不要です。

### 設定

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

##### メトリクスの収集

1. [公式 Temporal ドキュメント][1] に従って、Temporal サービスを `prometheus` エンド ポイント経由でメトリクスを公開するよう構成します。

2. Temporal のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートの `conf.d/` フォルダーにある `temporal.d/conf.yaml` ファイルを編集します。

   Temporal サーバー構成の `listenAddress` と `handlerPath` に一致するように、`openmetrics_endpoint` オプションを設定します。

   ```yaml
   init_config:
   instances:
     - openmetrics_endpoint: <LISTEN_ADDRESS>/<HANDLER_PATH>
   ```

   クラスター内の Temporal サービスが独立してデプロイされている場合、各サービスは独自のメトリクスを公開することに注意してください。そのため、監視したいサービスごとに `prometheus` エンドポイントを構成し、それぞれのサービスに対してインテグレーションの構成で別の `instance` を定義する必要があります。

##### ログ収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. [公式ドキュメント][2] に従って、Temporal クラスターがログをファイルに出力するよう構成します。

3. `temporal.d/conf.yaml` ファイルの logs 構成ブロックのコメントを解除して編集し、`path` が Temporal Cluster で構成したファイルを指すように設定します。

  ```yaml
  logs:
    - type: file
      path: /var/log/temporal/temporal-server.log
      source: temporal
  ```

4. [Agent を再起動します][3]。

[1]: https://docs.temporal.io/references/configuration#prometheus
[2]: https://docs.temporal.io/references/configuration#log
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}

{{% tab "Containerized" %}}

#### コンテナ化

##### メトリクスの収集

コンテナ化された環境では、以下のパラメーターの使用方法については [Kubernetes での Autodiscovery によるインテグレーションの構成][1] または [Docker での Autodiscovery によるインテグレーションの構成][2] を参照してください。設定オプションの完全な一覧については、[temporal.d/conf.yaml のサンプル][3] を参照してください。

| パラメーター            | 値                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `temporal`                          |
| `<INIT_CONFIG>`      | 空白または `{}`                        |
| `<INSTANCES_CONFIG>`  | `{"openmetrics_endpoint": "<LISTEN_ADDRESS>/<HANDLER_PATH>"}`。ここで `<LISTEN_ADDRESS>` と `<HANDLER_PATH>` は、Temporal サーバー構成の `listenAddress` と `handlerPath` に置き換えます。 |

クラスター内の Temporal サービスが独立してデプロイされている場合、各サービスは独自のメトリクスを公開することに注意してください。そのため、監視したいサービスごとに `prometheus` エンドポイントを構成し、それぞれのサービスに対してインテグレーションの構成で別の `instance` を定義する必要があります。

**例**

次の Kubernetes アノテーションは、`metadata` 配下にある pod に適用します。ここで `<CONTAINER_NAME>` は Temporal コンテナの名前 (または [カスタム識別子][4]) です:

```
ad.datadoghq.com/<CONTAINER_NAME>.checks: |
  {
    "temporal": {
      "init_config": {},
      "instances": [{"openmetrics_endpoint": "<LISTEN_ADDRESS>/<HANDLER_PATH>"}]
    }
  } 
```

##### ログ収集

ログ収集はデフォルトで Datadog Agent では無効になっています。有効にするには、[Docker のログ収集][5] または [Kubernetes のログ収集][6] を参照してください。

`logs` に次の構成パラメーターを適用します:

| パラメーター      | 値                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "temporal", "type": "file", "path": "/var/log/temporal/temporal-server.log"}` |

**例**

次の Kubernetes アノテーションは、`metadata` 配下にある pod に適用します。ここで `<CONTAINER_NAME>` は Temporal コンテナの名前 (または [カスタム識別子][4]) です:

```
ad.datadoghq.com/<CONTAINER_NAME>.logs: |
  [
    {
      "source": "temporal",
      "type": "file",
      "path": "/var/log/temporal/temporal-server.log"
    } 
  ]
```

[1]: https://docs.datadoghq.com/ja/containers/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/containers/docker/integrations/
[3]: https://github.com/DataDog/integrations-core/blob/master/temporal/datadog_checks/temporal/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/containers/guide/ad_identifiers/
[5]: https://docs.datadoghq.com/ja/containers/docker/log/
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}

{{< /tabs >}}


### 検証

[Agent の status サブ コマンドを実行][5] し、Checks セクションに `temporal` が表示されていることを確認します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "temporal" >}}


### イベント

Temporal インテグレーションには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "temporal" >}}


### ログ

Temporal インテグレーションは、Temporal Cluster からログを収集し、Datadog に転送することができます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog で Temporal Server のヘルスを監視する][7]



[1]: https://temporal.io/
[2]: https://docs.datadoghq.com/ja/integrations/temporal_cloud/
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://www.datadoghq.com/blog/temporal-server-integration/