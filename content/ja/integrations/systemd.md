---
app_id: systemd
app_uuid: a18dccd2-35c0-40e2-9c0a-7a01a5daf5f3
assets:
  dashboards:
    Systemd Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: systemd.units_by_state
      metadata_path: metadata.csv
      prefix: systemd.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10066
    source_type_name: Systemd
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- OS & システム
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/systemd/README.md
display_on_public_website: true
draft: false
git_integration_title: systemd
integration_id: systemd
integration_title: Systemd
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: systemd
public_title: Systemd
short_description: Systemd および Systemd によって管理されるユニットに関するメトリクスを取得
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::OS & System
  configuration: README.md#Setup
  description: Systemd および Systemd によって管理されるユニットに関するメトリクスを取得
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Systemd
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、[Systemd][1] と、Systemd が Datadog Agent を介して管理するユニットを監視します。

- Systemd の状態と健全性を追跡できます。
- Systemd が管理するユニット、サービス、ソケットを監視できます。

## 計画と使用

### インフラストラクチャーリスト

Systemd チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

1. Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `systemd.d/conf.yaml` ファイルを編集して、
   Systemd パフォーマンスデータの収集を開始します。
   使用可能なすべての構成オプションの詳細については、[サンプル systemd.d/conf.yaml][1] を参照してください。

2. [Agent を再起動します][2]。

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/systemd.d/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、Systemd データの取得に必要なソケット `/run/systemd/private` を含む `/run/systemd/` フォルダーをマウントする必要があります。たとえば、以下のとおりです。

```bash
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup/:ro \
              -v /run/systemd/:/host/run/systemd/:ro \
              -e DD_API_KEY=<YOUR_API_KEY> \
              datadog/agent:latest
```

{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションの `systemd` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "systemd" >}}


以下は、対応する構成が有効な場合にのみ報告されるメトリクスです。

- `systemd.service.cpu_time_consumed`: Systemd 構成 `CPUAccounting` を有効にする必要があります。
- `systemd.service.memory_usage`: Systemd 構成 `MemoryAccounting` を有効にする必要があります。
- `systemd.service.task_count`: Systemd 構成 `TasksAccounting` を有効にする必要があります。

以下は、特定バージョンの Systemd でのみ使用できるメトリクスです。

- `systemd.service.cpu_time_consumed`: Systemd v220 が必要です。
- `systemd.service.restart_count`: Systemd v235 が必要です。
- `systemd.socket.connection_refused_count`: Systemd v239 が必要です。

### ヘルプ

Systemd チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "systemd" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。



[1]: https://www.freedesktop.org/wiki/Software/systemd/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/