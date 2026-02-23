---
app_id: velero
app_uuid: e4199d9b-74fe-4af2-9afb-bbcde0f729f6
assets:
  dashboards:
    Velero Overview: assets/dashboards/velero_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: velero.backup.attempt.count
      metadata_path: metadata.csv
      prefix: velero.
    process_signatures:
    - velero
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 38596867
    source_type_name: Velero
  monitors:
    Backup Failures: assets/monitors/backup_failures.json
    Backup Staleness: assets/monitors/backup_staleness.json
    Restore Failures: assets/monitors/restore_failures.json
  saved_views:
    Velero Error Logs Overview: assets/saved_views/error_logs_overview.json
    Velero Logs Overview: assets/saved_views/logs_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- クラウド
- kubernetes
- プロビジョニング
- log collection
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/velero/README.md
display_on_public_website: true
draft: false
git_integration_title: velero
integration_id: velero
integration_title: Velero
integration_version: 2.0.0
is_public: true
manifest_version: 2.0.0
name: velero
public_title: Velero
short_description: Velero デプロイメントのパフォーマンスと使用状況を監視します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Cloud
  - Category::Kubernetes
  - Category::Provisioning
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Velero デプロイメントのパフォーマンスと使用状況を監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Velero
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [Velero][1] を監視します。Velero のバックアップ、リストア、スナップショットの操作に関するデータを収集します。これにより、ユーザーは災害復旧プロセスの健全性、パフォーマンス、信頼性についての洞察を得られます。

## セットアップ

### インストール

Velero チェックは [Datadog Agent][2] パッケージに含まれています。
サーバー上での追加インストールは不要です。

### 設定

#### メトリクス

{{< tabs >}}
{{% tab "ホスト" %}}

ホスト上で実行中の Agent に対してこのチェックをインストールおよび構成するには、以下の手順に従ってください。

1. Agent の構成ディレクトリのルートにある `conf.d/` フォルダー内の `velero.d/conf.yaml` ファイルを編集して、Velero のパフォーマンス データの収集を開始します。利用可能なすべての構成オプションについては、[サンプル velero.d/conf.yaml][1] を参照してください。

2. [Agent を再起動します][2]。

[1]: https://github.com/DataDog/integrations-core/blob/master/velero/datadog_checks/velero/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Kubernetes" %}}

コンテナ化された環境でこのインテグレーションを構成する方法については、[Autodiscovery Integration テンプレート][1] を参照してください。

すべてのメトリクスを収集するには、2 種類の Pod、`velero` と `node-agent` をクエリする必要がある点に注意してください。
したがって、`velero` の Deployment と `node-agent` の DaemonSet のアノテーションを更新してください。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### ログ

Velero インテグレーションは、Velero Pod からログを収集できます。

{{< tabs >}}
{{% tab "ホスト" %}}

ホスト上の Velero コンテナからログを収集するには:

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. `velero.d/conf.yaml` ファイル内の logs 構成ブロックのコメントを解除して編集します。例:

   ```yaml
   logs:
     - type: docker
       source: velero
       service: velero
   ```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Velero の Kubernetes デプロイメントからログを収集するには:

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][1]を参照してください。

2. Pod アノテーションとして Log Integrations を設定します。これは、ファイル、ConfigMap、またはキー バリュー ストアでも構成できます。詳細は、[Kubernetes ログ収集][2] の構成セクションを参照してください。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/log/#setup
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/#configuration
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3] し、Checks セクションで `velero` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "velero" >}}


### イベント

この Velero インテグレーションには、イベントは含まれていません。

### サービスチェック

この Velero インテグレーションには、サービス チェックは含まれていません。

## トラブルシューティング

Deployment 構成でこの機能が有効になっていることを確認し、Velero サーバーがメトリクスを公開していることを確認してください:

```yaml
# Velero の Prometheus メトリクスの設定。デフォルトで有効です。
metrics:
  enabled: true
  scrapeInterval: 30s
  scrapeTimeout: 10s
```

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。



[1]: https://velero.io
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/