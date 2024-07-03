---
app_id: nfsstat
app_uuid: 423f4b03-ce99-4ffc-a553-e522ebd451be
assets:
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: system.nfs.ops
      metadata_path: metadata.csv
      prefix: system.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 9164582
    source_type_name: Nfsstat
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/nfsstat/README.md
display_on_public_website: true
draft: false
git_integration_title: nfsstat
integration_id: nfsstat
integration_title: Nfsstat
integration_version: 1.13.0
is_public: true
manifest_version: 2.0.0
name: nfsstat
public_title: Nfsstat
short_description: nfsstat は nfsiostat-sysstat メトリクスを取得します。
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::OS とシステム
  - Category::ログの収集
  configuration: README.md#Setup
  description: nfsstat は nfsiostat-sysstat メトリクスを取得します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nfsstat
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

NFS インテグレーションは、マウントごとの NFS クライアント[統計][1]を表示する `nfsiostat` ツールを使用して、NFS クライアント上のマウントポイントに関するメトリクスを収集します。

## セットアップ

以下の手順に従って、このチェックをインストールし、ホストで実行中の Agent に対して構成します。

### インストール

NFSstat チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### 構成

[Agent のコンフィギュレーションディレクトリ][3]のルートにある `conf.d/` フォルダーの `nfsstat.d/conf.yaml` ファイルを編集します。nfsiostat バイナリスクリプトを指定するか、バイナリインストーラーに含まれているスクリプトを使用します。使用可能なすべてのコンフィギュレーションオプションについては、[nfsstat.d/conf.yaml のサンプル][4]を参照してください。

### ログ収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。`datadog.yaml` ファイルでこれを有効にするには、以下の設定を更新します。

   ```yaml
   logs_enabled: true
   ```

2. NFSstat のログの収集を開始するには、次のコンフィギュレーションブロックを `nfsstat.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /var/log/messages
       source: nfsstat
   ```

   `path` のパラメーター値を変更し、環境に合わせて構成してください。
   使用可能なすべての構成オプションの詳細については、[サンプル nfsstat.d/conf.yaml][4] を参照してください。

3. [Agent を再起動します][5]。


### 検証

[Agent の `status` サブコマンドを実行][6]し、Checks セクションで `nfsstat` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "nfsstat" >}}


### イベント
Nfsstat チェックには、イベントは含まれません。

### サービスチェック
Nfsstat チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

- [HTTP チェックでネットワークモニターを構築][9]

[1]: http://man7.org/linux/man-pages/man8/nfsiostat.8.html
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/nfsstat/datadog_checks/nfsstat/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/nfsstat/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/
[9]: https://docs.datadoghq.com/ja/monitors/monitor_types/network/