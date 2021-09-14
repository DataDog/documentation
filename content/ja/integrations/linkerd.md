---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Linkerd - Overview: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - autodiscovery
  - log collection
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/linkerd/README.md
display_name: Linkerd
draft: false
git_integration_title: linkerd
guid: 9aa60dff-4baf-4112-9177-f9c3814dd513
integration_id: linkerd
integration_title: Linkerd
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: linkerd.
metric_to_check: linkerd.prometheus.health
name: linkerd
public_title: Datadog-Linkerd インテグレーション
short_description: linkerd からメトリクスを取得してサービス健全性を監視
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、[Linkerd][1] から分散型システムの可観測性メトリクスを収集します。

## セットアップ

### インストール

Linkerd チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `linkerd.d/conf.yaml` ファイルを編集します。
   使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル linkerd.d/conf.yaml][7] を参照してください。
   **注**: これは新しいデフォルトの OpenMetrics チェックの例です。以前にこのインテグレーションを実装したことがある場合は、[レガシーの例][3]を参照してください。

2. [Agent を再起動します][4]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/linkerd/datadog_checks/linkerd/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/7.30.x/linkerd/datadog_checks/linkerd/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### Linkerd v1

| パラメーター            | 値                                                                       |
| -------------------- | --------------------------------------------------------------------------- |
| `<インテグレーション名>` | `linkerd`                                                                   |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                               |
| `<インスタンスコンフィギュレーション>`  | `{"openmetrics_endpoint": "http://%%host%%:9990/admin/metrics/prometheus"}` |

**注**: これは新しいデフォルトの OpenMetrics チェックの例です。以前にこのインテグレーションを実装したことがある場合は、[レガシーの例][2]を参照してください。

##### Linkerd v2

| パラメーター            | 値                                                                       |
| -------------------- | --------------------------------------------------------------------------- |
| `<インテグレーション名>` | `linkerd`                                                                   |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                               |
| `<インスタンスコンフィギュレーション>`  | `{"openmetrics_endpoint": "http://%%host%%:4191/metrics"}`                  |

**注**: これは新しいデフォルトの OpenMetrics チェックの例です。以前にこのインテグレーションを実装したことがある場合は、[レガシーの例][2]を参照してください。


##### ログの収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][3]を参照してください。

| パラメーター      | 値                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "linkerd", "service": "<SERVICE_NAME>"}` |

データプレーンログの詳細度を増加するには、[Linkerd 公式ドキュメント][4]を参照してください。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/integrations-core/blob/7.30.x/linkerd/datadog_checks/linkerd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[4]: https://linkerd.io/2/tasks/modifying-proxy-log-level/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `linkerd` を探します。

## 収集データ

### メトリクス

このインテグレーションによって提供されるデフォルトのメトリクスのリストについては、[metadata.csv][4] を参照してください。

linkerd v1 の場合、一部のメトリクスの詳細については、[finagle のメトリクスに関するドキュメント][5]を参照してください。linkerd によって公開されるメトリクスの例については、[こちらの gist][6] を参照してください。

注意: linkerd の構成によっては、公開されないメトリクスもあります。

現在の構成で公開されるメトリクスをリストするには、次のコマンドを実行します。

```bash
curl <linkerd_prometheus_endpoint>
```

ここで、`linkerd_prometheus_endpoint` は linkerd Prometheus エンドポイントです (`linkerd.yaml` 内の `prometheus_url` 構成キーと同じ値を使用する必要があります)。

デフォルトで提供されないメトリクスを使用する必要がある場合は、`linkerd.yaml` にエントリを追加します。

[デフォルトコンフィギュレーション][7]内の例に従ってください。

### サービスのチェック
{{< get-service-checks-from-git "linkerd" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。



[1]: https://linkerd.io
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://github.com/DataDog/integrations-core/blob/master/linkerd/metadata.csv
[5]: https://twitter.github.io/finagle/guide/Metrics.html
[6]: https://gist.githubusercontent.com/arbll/2f63a5375a4d6d5acface6ca8a51e2ab/raw/bc35ed4f0f4bac7e2643a6009f45f9068f4c1d12/gistfile1.txt
[7]: https://github.com/DataDog/integrations-core/blob/master/linkerd/datadog_checks/linkerd/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/help/