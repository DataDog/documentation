---
assets:
  dashboards:
    Systemd Overview: assets/dashboards/overview.json
  logs: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - OS & システム
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/systemd/README.md'
display_name: Systemd
git_integration_title: systemd
guid: acd470e7-5413-4deb-95fc-4b034d904691
integration_id: systemd
integration_title: Systemd
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: systemd.
metric_to_check: systemd.units_by_state
name: systemd
public_title: Datadog-Systemd インテグレーション
short_description: Systemd および Systemd によって管理されるユニットに関するメトリクスを取得
support: コア
supported_os:
  - linux
---
## 概要

このチェックは、[Systemd][1] と、Systemd が Datadog Agent を介して管理するユニットを監視します。

- Systemd の状態と健全性を追跡できます。
- Systemd が管理するユニット、サービス、ソケットを監視できます。

## セットアップ

### インストール

#### ホスト

Systemd チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

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

### コンフィギュレーション

1. Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `systemd.d/conf.yaml` ファイルを編集して、
   Systemd パフォーマンスデータの収集を開始します。
   使用可能なすべての構成オプションの詳細については、[サンプル systemd.d/conf.yaml][3] を参照してください。

2. [Agent を再起動します][4]。

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションの `systemd` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "systemd" >}}


以下は、対応する構成が有効な場合にのみ報告されるメトリクスです。

- `systemd.service.cpu_time_consumed`: Systemd 構成 `CPUAccounting` を有効にする必要があります。
- `systemd.service.memory_usage`: Systemd 構成 `MemoryAccounting` を有効にする必要があります。
- `systemd.service.task_count`: Systemd 構成 `TasksAccounting` を有効にする必要があります。

以下は、特定バージョンの Systemd でのみ使用できるメトリクスです。

- `systemd.service.cpu_time_consumed`: Systemd v220 が必要です。
- `systemd.service.restart_count`: Systemd v235 が必要です。
- `systemd.socket.connection_refused_count`: Systemd v239 が必要です。

### サービスのチェック

**systemd.can_connect**:<br>
Systemd が到達可能な場合は `OK`、それ以外の場合は `CRITICAL` を返します。

**systemd.system.state**:<br>
Systemd のシステム状態が running の場合は、`OK` を返します。状態が degraded、maintenance、stopping の場合は、`CRITICAL` を返します。状態が initializing、starting、またはその他の場合は、`UNKNOWN` を返します。

**systemd.unit.state**:<br>
ユニットのアクティブ状態が active の場合は、`OK` を返します。状態が inactive、deactivating、failed の場合は、`CRITICAL` を返します。状態が activating またはその他の場合は、`UNKNOWN` を返します。

### イベント

Systemd チェックには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: https://www.freedesktop.org/wiki/Software/systemd/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/systemd.d/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/systemd/metadata.csv
[7]: https://docs.datadoghq.com/ja/help/