---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - コンテナ
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/cri/README.md'
display_name: CRI
git_integration_title: cri
guid: 6eb96c6a-3e2d-4236-9387-fa3b0c455336
integration_id: cri
integration_title: CRI
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: cri.
metric_to_check: cri.cpu.usage
name: CRI
public_title: Datadog-CRI インテグレーション
short_description: CRI のすべてのメトリクスを Datadog で追跡
support: コア
supported_os:
  - linux
---
## 概要

このチェックは Container Runtime Interface を監視します

## セットアップ

### インストール

CRI はコア Agent 6 チェックです。`datadog.yaml` と `cri.d/conf.yaml` の両方で構成する必要があります。

`datadog.yaml` で、Agent が現在の CRI への問い合わせに使用する `cri_socket_path` を構成する必要があります (デフォルトのタイムアウトも構成できます)。CRI (`containerd` など) がディスク使用状況メトリクスを報告する場合は、`cri.d/conf.yaml` で、`collect_disk` などのチェックインスタンス設定を構成できます。

コンテナで Agent を使用している場合は、`DD_CRI_SOCKET_PATH` 環境変数を設定すると、デフォルト構成の `CRI` チェックが自動的に有効になります。

### コンフィグレーション

1. Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `cri.d/conf.yaml` ファイルを編集して、
   crio パフォーマンスデータの収集を開始します。
   使用可能なすべての構成オプションの詳細については、[サンプル cri.d/conf.yaml][1] を参照してください。

2. [Agent を再起動します][2]

### 検証

[Agent の `status` サブコマンドを実行][3]し、Checks セクションで `cri` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "cri" >}}


### サービスのチェック

CRI には、サービスのチェック機能は含まれません。

### イベント

CRI には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/cri.d/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-core/blob/master/cri/metadata.csv
[5]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}