---
app_id: grpc-check
app_uuid: f0317cd5-e4b9-4147-998e-25c69fad94ed
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - grpc_check.healthy
      - grpc_check.unhealthy
      metadata_path: metadata.csv
      prefix: grpc_check.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10296
    source_type_name: gRPC Check
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: help@datadoghq.com
  support_email: keisuke.umegaki.630@gmail.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/grpc_check/README.md
display_on_public_website: true
draft: false
git_integration_title: grpc_check
integration_id: grpc-check
integration_title: gRPC Health
integration_version: 1.0.2
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: grpc_check
public_title: gRPC Health
short_description: gRPC Health Checking Protocol に基づく gRPC サーバーの監視
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
  configuration: README.md#Setup
  description: gRPC Health Checking Protocol に基づく gRPC サーバーの監視
  media: []
  overview: README.md#Overview
  support: README.md#Troubleshooting
  title: gRPC Health
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは、Datadog Agent を通じて [gRPC Health Checking Protocol][1] を実装しているエンドポイントを監視するものです。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インフラストラクチャーリスト

#### メトリクスベース SLO

grpc_check チェックをホストにインストールするには

```bash
sudo -u dd-agent datadog-agent integration install -t datadog-grpc-check==1.0.2
```

#### Dockerfile

この Dockerfile を使って Agent のイメージを構築します。

```Dockerfile
FROM datadog/agent:7
RUN agent integration install -r -t datadog-grpc-check==1.0.2 \
  && /opt/datadog-agent/embedded/bin/pip3 install grpcio grpcio-health-checking
```

### ブラウザトラブルシューティング

1. grpc_check のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `grpc_check.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル grpc_check.d/conf.yaml][3] を参照してください。

2. [Agent を再起動します][4]。

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `grpc_check` を検索します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "grpc_check" >}}


### ヘルプ

grpc_check インテグレーションには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "grpc_check" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://github.com/grpc/grpc/blob/master/doc/health-checking.md
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-extras/blob/master/grpc_check/datadog_checks/grpc_check/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-extras/blob/master/grpc_check/metadata.csv
[7]: https://github.com/DataDog/integrations-extras/blob/master/grpc_check/assets/service_checks.json
[8]: help@datadoghq.com