---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- os & system
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/disk/README.md
display_name: Disk
draft: false
git_integration_title: disk
guid: 94588b23-111e-4ed2-a2af-fd6e4caeea04
integration_id: システム
integration_title: Disk
integration_version: 4.7.0
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.disk.free
monitors:
  disk-space-forecast: assets/monitors/disk_monitor.json
name: disk
public_title: Datadog-Disk インテグレーション
short_description: ディスクチェックで、マウントされたディスクのメトリクスを収集。
support: コア
supported_os:
- linux
- mac_os
- windows
---



## 概要

ディスクの使用状況および IO に関連したメトリクスを収集します。

## セットアップ

### インストール

ディスクチェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

ディスクチェックはデフォルトで有効になっています。Agent は、すべてのローカルパーティションに関するメトリクスを収集します。カスタムオプション付きでチェックを構成する場合は、[Agent のコンフィギュレーションディレクトリ][2]のルートにある `conf.d/` フォルダーの `disk.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル disk.d/conf.yaml][3] を参照してください。

#### Windows ホストに関する注意事項
ディスクチェックの利用シーンは 3 つあります。

1. 物理ドライブの監視

  ディスクレターで表される物理ドライブ (例: C:\、D:\ など) の監視は、ディスクチェックで特に考慮することなくそのままサポートされています。

2. ネストされたマウントポイントの監視

  ファイルシステム内のマウントされたフォルダーを監視するには、Administrator 権限が必要です。これは、基盤となる Windows の関数呼び出し [FindFirstVolumeMountPoint][4] が管理者権限を必要とするためです。
  Agent に Administrator 権限を付与せずにこれらのメトリクスを収集するには、[PDH チェック][5]を使用して対応する perf カウンターからマウントポイントメトリクスを収集するようにします。

3. ファイル共有の監視

  Windows 上のファイル共有のマウントポイントメトリクスの収集は、コンフィギュレーションで `create_mounts` オプションを使用した場合のみサポートされます。
  Windows では、マウントされた各フォルダーは、その共有をマウントしたユーザーにのみ表示されます。
  そのため、`create_mounts` オプションは、Agent のユーザーのコンテキストで監視するマウントポイントを作成することができます。

### 検証

[Agent の `status` サブコマンドを実行][6]し、Checks セクションで `disk` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "disk" >}}


### イベント

Disk チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "disk" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/disk/datadog_checks/disk/data/conf.yaml.default
[4]: https://docs.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-findfirstvolumemountpointw
[5]: https://docs.datadoghq.com/ja/integrations/pdh_check/#pagetitle
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/disk/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/disk/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/help/