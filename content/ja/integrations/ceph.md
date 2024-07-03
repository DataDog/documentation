---
app_id: ceph
app_uuid: 485341cc-3dee-4136-b147-dda76171701a
assets:
  dashboards:
    ceph: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ceph.write_bytes_sec
      metadata_path: metadata.csv
      prefix: ceph.
    process_signatures:
    - ceph-mon
    - ceph-mgr
    - ceph-osd
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 138
    source_type_name: Ceph
  saved_views:
    ceph_processes: assets/saved_views/ceph_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- os & system
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ceph/README.md
display_on_public_website: true
draft: false
git_integration_title: ceph
integration_id: ceph
integration_title: Ceph
integration_version: 2.10.0
is_public: true
manifest_version: 2.0.0
name: ceph
public_title: Ceph
short_description: プールごとのパフォーマンスメトリクスを収集し、クラスター状態全体を監視。
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Data Stores
  - Category::OS とシステム
  - Category::ログの収集
  configuration: README.md#Setup
  description: プールごとのパフォーマンスメトリクスを収集し、クラスター状態全体を監視。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Ceph
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Ceph ダッシュボード][1]

## 概要

Datadog-Ceph インテグレーションを有効にすると、以下のことができます。

- ストレージプール全体のディスク使用状況を追跡できます。
- 問題が発生した場合にサービスチェックを受信できます。
- I/O パフォーマンスメトリクスを監視できます。

## セットアップ

### インストール

Ceph チェックは [Datadog Agent][2] パッケージに含まれています。Ceph サーバーに追加でインストールする必要はありません。

### 構成

[Agent のコンフィギュレーションディレクトリ][3]のルートにある `conf.d/` フォルダーの `ceph.d/conf.yaml` ファイルを編集します。
使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル ceph.d/conf.yaml][4] を参照してください。

```yaml
init_config:

instances:
  - ceph_cmd: /path/to/your/ceph # default is /usr/bin/ceph
    use_sudo: true # ご利用のノードで ceph バイナリが sudo を必要とする場合のみ
```

`use_sudo` を有効にした場合は、`sudoers` ファイルに以下のような行を追加します。

```text
dd-agent ALL=(ALL) NOPASSWD:/path/to/your/ceph
```

#### ログ収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. 次に、下部にある `logs` 行のコメントを解除して、`ceph.d/conf.yaml` を編集します。ログの `path` を Ceph ログファイルの正しいパスで更新してください。

   ```yaml
   logs:
     - type: file
       path: /var/log/ceph/*.log
       source: ceph
       service: "<APPLICATION_NAME>"
   ```

3. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `ceph` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "ceph" >}}


**注**: Ceph luminous またはそれ以降を実行している場合、`ceph.osd.pct_used` メトリクスは含まれません。

### イベント

Ceph チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "ceph" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## その他の参考資料

- [Ceph の監視: ノードステータスからクラスター全体のパフォーマンスまで][10]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/ceph/images/ceph_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/ceph/datadog_checks/ceph/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/ceph/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/ceph/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/help/
[10]: https://www.datadoghq.com/blog/monitor-ceph-datadog