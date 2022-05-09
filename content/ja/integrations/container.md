---
assets:
  dashboards:
    Containers: assets/dashboards/containers.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- containers
creates_events: true
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/container/README.md
display_name: コンテナ
draft: false
git_integration_title: コンテナ
guid: 39d40858-0d56-4623-bd1d-864790d0c894
integration_id: コンテナ
integration_title: コンテナ
integration_version: ''
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: container.
metric_to_check: container.uptime
name: コンテナ
public_title: Datadog-Container インテグレーション
short_description: コンテナのメトリクスを Datadog で追跡
support: コア
supported_os:
- linux
- windows
---



## 概要

このチェックでは、開始に使用されるランタイムにかかわらず、実行中のコンテナに関するメトリクスが報告されます。

**注**: `container` チェックは `containerd` チェックとは異なります。`container` チェックでは、コンテナのランタイムにかかわらず、システムにあるすべてのコンテナの標準メトリクスが報告されます。
`containerd` は、`containerd` ランタイムについて実行され、`containerd.*` ネームスペースでメトリクスを公開します。

## セットアップ

### インストール

コンテナは、Datadog Agent チェックの核であり、対応するコンテナランタイムが検出されると自動的にアクティベートされます。
ご使用の環境により、対応するコンテナランタイム (Docker、containerd) へのアクセスの構成が必要になる場合があります。

#### コンテナへのインストール

`container` チェックには、自動アクティベーションのためフォルダーのマウントが必要です。これは公式 Helm Chart および Datadog Operator により管理され、セットアップは Kubernetes、Docker、ECS、ECS Fargate 用に文書化されています。

### コンフィギュレーション

`container` チェックにより公開されるコンフィギュレーション設定はありません。共通フィールドをカスタマイズまたは `container` チェックのアクティベーションを強制するには、以下の手順に従います。

1. Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーに `container.d/conf.yaml` ファイルを作成します。

2. [Agent を再起動します][1]

`container` チェックで CPU、メモリ、ネットワーク、ディスク IO に関するメトリクスを収集できます。
ご使用の環境によって、一部のメトリクスは使用できない場合があります (Linux / Windows など)。

### 検証

[Agent の `status` サブコマンドを実行][1]し、**Checks** セクションで `container` を探します。

## 収集データ

### メトリクス

このインテグレーションによって提供されるメトリクスのリストについては、[metadata.csv][12] を参照してください。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[2]: https://github.com/DataDog/integrations-core/blob/master/container/metadata.csv
[3]: https://docs.datadoghq.com/ja/help/