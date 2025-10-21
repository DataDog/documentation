---
app_id: aws-neuron
app_uuid: fff4d15b-0953-41c9-8139-ef0a8d718d93
assets:
  dashboards:
    AWS Neuron Overview: assets/dashboards/aws_neuron_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: aws_neuron.neuron_runtime.memory_used_bytes
      metadata_path: metadata.csv
      prefix: aws_neuron.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 21046822
    source_type_name: AWS Neuron
  monitors:
    Execution errors: assets/monitors/execution_errors.json
    Execution latency: assets/monitors/execution_latency.json
    Neuron Runtime vCPU usage: assets/monitors/neuron_runtime_vcpu.json
  saved_views:
    AWS Neuron Error Logs Overview: assets/saved_views/error_logs_overview.json
    AWS Neuron Logs Overview: assets/saved_views/logs_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ai/ml
- aws
- クラウド
- ログの収集
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/aws_neuron/README.md
display_on_public_website: true
draft: false
git_integration_title: aws_neuron
integration_id: aws-neuron
integration_title: AWS Inferentia および AWS Trainium のモニタリング
integration_version: 2.1.0
is_public: true
manifest_version: 2.0.0
name: aws_neuron
public_title: AWS Inferentia および AWS Trainium のモニタリング
short_description: AWS Inferentia/Trainium インスタンスおよび Neuron SDK のパフォーマンスと使用状況を監視します。
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
  - Category::AI/ML
  - Category::AWS
  - Category::Cloud
  - Category::Log Collection
  - Offering::Integration
  - Queried Data Type::Metrics
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: AWS Inferentia/Trainium インスタンスと Neuron SDK のパフォーマンスと使用状況を監視する
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: AWS Inferentia および AWS Trainium のモニタリング
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは Datadog Agent を通じて [AWS Neuron][1] を監視します。Inferentia および Trainium デバイスのモニタリングを可能にし、機械学習モデルのパフォーマンスに関するインサイトを提供します。

## セットアップ

EC2 インスタンスで実行されている Agent 用にこのチェックをインストールおよび構成するには、以下の手順に従ってください。コンテナ化された環境では、これらの手順の適用方法について [オートディスカバリーのインテグレーションテンプレート][2] を参照してください。

### インストール

AWS Neuron チェックは [Datadog Agent][3] パッケージに含まれています。

また、[AWS Neuron Tools][4] パッケージもインストールする必要があります。

サーバーに追加でインストールする必要はありません。

### 構成

#### メトリクス

1. Prometheus エンドポイントを公開するために [Neuron Monitor][5] を使用していることを確認します。

2. AWS Neuron のパフォーマンスデータの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][6]のルートにある `conf.d/` フォルダーの `aws_neuron.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル aws_neuron.d/conf.yaml][7] を参照してください。

3. [Agent を再起動します][8]。

#### Logs

AWS Neuron インテグレーションは、Neuron コンテナからログを収集し、Datadog に転送することができます。

{{< tabs >}}
{{% tab "ホスト" %}}

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. `aws_neuron.d/conf.yaml` ファイルのログ構成ブロックのコメントを解除して編集します。以下はその一例です。

   ```yaml
   logs:
     - type: docker
       source: aws_neuron
       service: aws_neuron
   ```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][1]を参照してください。

次に、Log Integrations を Pod のアノテーションとして設定します。これは、ファイル、ConfigMap、または key-value ストアでも構成できます。詳細については、[Kubernetes ログ収集][2] の構成セクションを参照してください。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/log/#setup
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/#configuration
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `aws_neuron` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "aws_neuron" >}}


### イベント

AWS Neuron インテグレーションには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "aws_neuron" >}}


## トラブルシューティング

コンテナ化された環境では、Agent が `aws_neuron.d/conf.yaml` ファイルで指定されたエンドポイントにネットワーク経由でアクセスできることを確認してください。

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。



[1]: https://awsdocs-neuron.readthedocs-hosted.com/en/latest/index.html
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://awsdocs-neuron.readthedocs-hosted.com/en/latest/tools/index.html
[5]: https://awsdocs-neuron.readthedocs-hosted.com/en/latest/tools/neuron-sys-tools/neuron-monitor-user-guide.html#using-neuron-monitor-prometheus-py
[6]: https://docs.datadoghq.com/ja/agent/configuration/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-core/blob/master/aws_neuron/datadog_checks/aws_neuron/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/ja/help/