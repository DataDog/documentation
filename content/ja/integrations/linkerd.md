---
app_id: linkerd
app_uuid: 971384a8-4745-4b31-89b5-b112507543e6
assets:
  dashboards:
    Linkerd - Overview: assets/dashboards/overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: linkerd.prometheus.health
      metadata_path: metadata.csv
      prefix: linkerd.
    process_signatures:
    - linkerd
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Linkerd
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuration & deployment
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/linkerd/README.md
display_on_public_website: true
draft: false
git_integration_title: linkerd
integration_id: linkerd
integration_title: Linkerd
integration_version: 4.0.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: linkerd
public_title: Linkerd
short_description: linkerd からメトリクスを取得してサービス健全性を監視
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::構成 & デプロイ
  - Category::ログの収集
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: linkerd からメトリクスを取得してサービス健全性を監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Linkerd
---



## 概要

[Linkerd][1] は、CNCF のステータスを持つ、軽量かつ強力なオープンソースのサービスメッシュです。Linkerd は、安全で信頼性が高く、観測可能なクラウドネイティブアプリケーションを作成するために必要なツールを提供します。最小限の構成で、アプリケーションを変更することなく、Linkerd は、
- 相互 TLS を使用して、すべてのクラスター上の TCP 通信を透過的に保護します。
- レイテンシーを考慮したロードバランシング、リクエストの再試行、タイムアウト、ブルーグリーンデプロイメントを追加し、アプリケーションの回復力を維持します。
- メッシュ化された各ワークロードの成功率、レイテンシー、リクエスト量を追跡することにより、プラットフォームの健全性を評価します。

このインテグレーションは、アプリケーションの成功率、レイテンシー、飽和状態など、Linkerd のメトリクスを Datadog に送信します。


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

データプレーンログの冗長性を高めるには、[プロキシログレベルの変更][4]を参照してください。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/integrations-core/blob/7.30.x/linkerd/datadog_checks/linkerd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[4]: https://linkerd.io/2/tasks/modifying-proxy-log-level/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンド][3]を実行し、Checks セクションで `linkerd` を探します。

## 収集データ

### メトリクス

このインテグレーションによって提供されるメトリクスのリストについては、[metadata.csv][4] を参照してください。

Linkerd v1 については、メトリクスの説明は [finagle メトリクスガイド][5]、Linkerd が公開するメトリクスの例は[こちらの gist][6] を参照してください。

**注**: Linkerd は Prometheus ベースのインテグレーションです。Linkerd の構成によっては、一部のメトリクスが Linkerd によって公開されない場合があります。curl の出力にメトリクスが存在しない場合、Datadog Agent はその特定のメトリクスを収集することができません。

現在の構成で公開されるメトリクスをリストするには、次のコマンドを実行します。

```bash
curl <linkerd_prometheus_endpoint>
```

ここで、`linkerd_prometheus_endpoint` は Linkerd Prometheus エンドポイントです (`linkerd.yaml` 内の `prometheus_url` 構成キーと同じ値を使用する必要があります)。

デフォルトで提供されないメトリクスを使用する必要がある場合は、`linkerd.yaml` にエントリを追加します。

[デフォルトコンフィギュレーション][7]内の例に従ってください。


### サービスのチェック
{{< get-service-checks-from-git "linkerd" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。



[1]: https://linkerd.io
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://github.com/DataDog/integrations-core/blob/master/linkerd/metadata.csv
[5]: https://twitter.github.io/finagle/guide/Metrics.html
[6]: https://gist.githubusercontent.com/arbll/2f63a5375a4d6d5acface6ca8a51e2ab/raw/bc35ed4f0f4bac7e2643a6009f45f9068f4c1d12/gistfile1.txt
[7]: https://github.com/DataDog/integrations-core/blob/master/linkerd/datadog_checks/linkerd/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/help/