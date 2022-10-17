---
app_id: kube-metrics-server
app_uuid: df9c9e3c-368a-4472-b0cb-b32f1066a2f5
assets:
  dashboards:
    Kubernetes Metrics Server - Overview: assets/dashboards/overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kube_metrics_server.process.open_fds
      metadata_path: metadata.csv
      prefix: kube_metrics_server.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Kube メトリクスサーバー
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- orchestration
- コンテナ
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kube_metrics_server/README.md
display_on_public_website: true
draft: false
git_integration_title: kube_metrics_server
integration_id: kube-metrics-server
integration_title: Kubernetes Metrics Server
integration_version: 2.3.0
is_public: true
kind: integration
manifest_version: 2.0.0
name: kube_metrics_server
oauth: {}
public_title: Kubernetes Metrics Server
short_description: Kubernetes Metrics Server の監視
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Orchestration
  - Category::Containers
  configuration: README.md#Setup
  description: Kubernetes Metrics Server の監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Kubernetes Metrics Server
---



## 概要

このチェックは、Kubernetes Control Plane によって使用されるコンポーネントである [Kube_metrics_server][1] v0.3.0+ を監視します。

## セットアップ

### インストール

Kube_metrics_server チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. kube_metrics_server のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `kube_metrics_server.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル kube_metrics_server.d/conf.yaml][1] を参照してください。

2. [Agent を再起動します][2]。

[1]: https://github.com/DataDog/integrations-core/blob/master/kube_metrics_server/datadog_checks/kube_metrics_server/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[Kubernetes オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                |
| -------------------- | ---------------------------------------------------- |
| `<インテグレーション名>` | `kube_metrics_server `                                         |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                        |
| `<インスタンスコンフィギュレーション>`  | `{"prometheus_url": "https://%%host%%:443/metrics"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### SSL

エンドポイントが保護されている場合、追加の構成が必要です。

1. メトリクスエンドポイントの保護に使用される証明書を特定します。

2. 関連する証明書ファイルを Agent ポッドにマウントします。

3. SSL 構成を適用します。詳細については、[デフォルトの構成ファイル][3]を参照してください。

### 検証

[Agent の status サブコマンドを実行][4]し、Checks セクションで `kube_metrics_server` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "kube_metrics_server" >}}


### イベント

kube_metrics_server には、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "kube_metrics_server" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。



[1]: https://github.com/kubernetes-incubator/metrics-server
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/help/