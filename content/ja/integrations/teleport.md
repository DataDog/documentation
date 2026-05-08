---
app_id: teleport
app_uuid: e47d5541-de7d-4ce6-8105-03c6dac5852a
assets:
  dashboards:
    Teleport Overview: assets/dashboards/teleport_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - teleport.common.process_state
      - teleport.common.rx
      - teleport.common.tx
      - teleport.common.teleport_build_info
      metadata_path: metadata.csv
      prefix: teleport.
    process_signatures:
    - teleport
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 7291105
    source_type_name: Teleport
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- クラウド
- security
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/teleport/README.md
display_on_public_website: true
draft: false
git_integration_title: teleport
integration_id: teleport
integration_title: Teleport
integration_version: 2.3.0
is_public: true
manifest_version: 2.0.0
name: teleport
public_title: Teleport
short_description: Teleport インスタンスの正常性を監視するための主要なメトリクスを収集します。
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
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Teleport インスタンスの正常性を監視するための主要なメトリクスを収集します。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: documentation
    url: https://docs.datadoghq.com/integrations/teleport/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/teleport-integration/
  support: README.md#Support
  title: Teleport
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このインテグレーションは、Datadog Agent を介して [Teleport][1] の正常性とパフォーマンスを監視します。このインテグレーションを有効にすると、次のことができます:

- Auth、Proxy、SSH、データベース、Kubernetes サービスを含む Teleport クラスターの運用状況を迅速に把握します。
- Kubernetes およびデータベース サービスに接続するユーザー セッションをクエリおよび監査して、組織内の不正または侵害されたユーザーを特定します。
- ログをパターンにクラスタリングして、短時間に失敗したログインが大量に発生している、または短時間にできる限り多くのリソースへアクセスしようとする、といったインフラストラクチャ アクセスの異常の調査を迅速化します。


## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Teleport インテグレーションは Datadog Agent パッケージに含まれています。サーバーに追加のインストールは不要です。

### 前提条件

Teleport チェックは、Teleport のメトリクスとパフォーマンス データを 2 つの異なるエンド ポイントを使って収集します:

- [ヘルス エンド ポイント][3]: Teleport インスタンスの全体的な正常性ステータスを提供します。
- [OpenMetrics エンド ポイント][4]: Teleport インスタンスおよびその内部で動作する各種サービスに関するメトリクスを抽出します。

これらのエンド ポイントは既定では有効化されていません。Teleport インスタンスで診断用 HTTP エンド ポイントを有効にするには、Teleport の公開 [ドキュメント][5] を参照してください。

### 構成

##### メトリクスの収集

1. Teleport のパフォーマンス データの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダー内の `teleport.d/conf.yaml` ファイルを編集します。利用可能なすべての構成オプションについては、[サンプル teleport.d/conf.yaml][6] を参照してください。

2. [Agent を再起動します][7]。

##### ログ収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. Teleport のログ収集を開始するには、`teleport.d/conf.yaml` ファイルの `logs` セクションを編集します。

   ```yaml
   logs:
     - type: file
       path: /var/log/teleport/teleport.log
       source: teleport
       service: teleport-service
       log_processing_rules:
         - type: multi_line
         name: logs_start_with_date
         pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   ```

3. [Agent を再起動します][8]。

### 検証

[Agent の status サブ コマンドを実行][9] し、Checks セクションの下に `teleport` が表示されていることを確認します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "teleport" >}}


### イベント

Teleport インテグレーションにはイベントは含まれません。

### サービスチェック

Teleport インテグレーションにはサービス チェックは含まれません。

## 参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog で Teleport を監視する][11]

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://goteleport.com/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://goteleport.com/docs/management/diagnostics/monitoring/#healthz
[4]: https://goteleport.com/docs/reference/metrics/#auth-service-and-backends
[5]: https://goteleport.com/docs/admin-guides/management/diagnostics/monitoring/
[6]: https://github.com/DataDog/integrations-core/blob/master/teleport/datadog_checks/teleport/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://github.com/DataDog/integrations-core/blob/master/teleport/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/teleport/metadata.csv
[11]: https://www.datadoghq.com/blog/teleport-integration/
[12]: https://docs.datadoghq.com/ja/help/