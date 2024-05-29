---
app_id: システム
app_uuid: 52179e9d-9012-4478-b1db-08e4d21d1181
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: system.disk.free
      metadata_path: metadata.csv
      prefix: system.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Disk
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/disk/README.md
display_name: Disk
display_on_public_website: true
draft: false
git_integration_title: disk
guid: 94588b23-111e-4ed2-a2af-fd6e4caeea04
integration_id: システム
integration_title: Disk
integration_version: 5.3.0
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 2.0.0
metric_prefix: system.
metric_to_check: system.disk.free
monitors:
  disk-space-forecast: assets/monitors/disk_monitor.json
name: disk
public_title: Disk
short_description: ディスクチェックで、マウントされたディスクのメトリクスを収集。
support: コア
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
  - Category::OS とシステム
  configuration: README.md#Setup
  description: ディスクチェックで、マウントされたディスクのメトリクスを収集。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Disk
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

ディスクの使用状況および IO に関連したメトリクスを収集します。

## 計画と使用

### インフラストラクチャーリスト

ディスクチェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

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

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "disk" >}}


### ヘルプ

Disk チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "disk" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/disk/datadog_checks/disk/data/conf.yaml.default
[4]: https://docs.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-findfirstvolumemountpointw
[5]: https://docs.datadoghq.com/ja/integrations/pdh_check/#pagetitle
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/disk/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/disk/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/help/