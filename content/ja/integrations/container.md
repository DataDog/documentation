---
app_id: コンテナ
app_uuid: ac3cc203-5b28-457d-8737-bbe32fa7c3b9
assets:
  dashboards:
    Containers: assets/dashboards/containers.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: container.uptime
      metadata_path: metadata.csv
      prefix: container.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10242
    source_type_name: コンテナ
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- containers
- kubernetes
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/container/README.md
display_on_public_website: true
draft: false
git_integration_title: コンテナ
integration_id: コンテナ
integration_title: コンテナ
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: コンテナ
public_title: コンテナ
short_description: コンテナのメトリクスを Datadog で追跡
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Supported OS::Linux
  - Supported OS::Windows
  configuration: README.md#Setup
  description: コンテナのメトリクスを Datadog で追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: コンテナ
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックでは、開始に使用されるランタイムにかかわらず、実行中のコンテナに関するメトリクスが報告されます。

**注**: `container` チェックは `containerd` チェックとは異なります。`container` チェックでは、コンテナのランタイムにかかわらず、システムにあるすべてのコンテナの標準メトリクスが報告されます。
`containerd` は、`containerd` ランタイムについて実行され、`containerd.*` ネームスペースでメトリクスを公開します。

## 計画と使用

### インフラストラクチャーリスト

コンテナは、Datadog Agent チェックの核であり、対応するコンテナランタイムが検出されると自動的にアクティベートされます。
ご使用の環境により、対応するコンテナランタイム (Docker、containerd) へのアクセスの構成が必要になる場合があります。

#### コンテナへのインストール

`container` チェックには、自動アクティベーションのためフォルダーのマウントが必要です。これは公式 Helm Chart および Datadog Operator により管理され、セットアップは Kubernetes、Docker、ECS、ECS Fargate 用に文書化されています。

### ブラウザトラブルシューティング

`container` チェックにより公開されるコンフィギュレーション設定はありません。共通フィールドをカスタマイズまたは `container` チェックのアクティベーションを強制するには、以下の手順に従います。

1. Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーに `container.d/conf.yaml` ファイルを作成します。

2. [Agent を再起動します][1]

`container` チェックで CPU、メモリ、ネットワーク、ディスク IO に関するメトリクスを収集できます。
ご使用の環境によって、一部のメトリクスは使用できない場合があります (Linux / Windows など)。

### 検証

[Agent の `status` サブコマンドを実行][1]し、**Checks** セクションで `container` を探します。

## リアルユーザーモニタリング

### データセキュリティ

このインテグレーションによって提供されるメトリクスのリストについては、[metadata.csv][12] を参照してください。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[2]: https://github.com/DataDog/integrations-core/blob/master/container/metadata.csv
[3]: https://docs.datadoghq.com/ja/help/