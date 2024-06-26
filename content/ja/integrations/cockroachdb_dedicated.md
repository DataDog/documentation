---
app_id: cockroach-cloud
app_uuid: e0ab9a47-da5b-4008-8571-3842ac318f74
assets:
  dashboards:
    cockroach_cloud_overview: assets/dashboards/cockroach_cloud_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: crdb_dedicated.sys.rss
      metadata_path: metadata.csv
      prefix: crdb_dedicated.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10274
    source_type_name: CockroachDB Dedicated
  logs:
    source: cockroach-cloud
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Datadog
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cockroachdb_dedicated/README.md
display_on_public_website: true
draft: false
git_integration_title: cockroachdb_dedicated
integration_id: cockroach-cloud
integration_title: CockroachDB Dedicated
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: cockroachdb_dedicated
public_title: CockroachDB Dedicated
short_description: Cockroach Cloud のメトリクスを DataDog に送信します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Cockroach Cloud のメトリクスを DataDog に送信します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: CockroachDB Dedicated
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Datadog の Cockroach Cloud インテグレーションは、Datadog プラットフォームを利用して、[Prometheus エンドポイント][1]で利用できる CockroachDB メトリックのサブセットに関するデータ収集とアラートを可能にします。

## 計画と使用

### インフラストラクチャーリスト

Cockroach Cloud クラスターに対して Datadog のモニタリングを有効にするには

1. クラスターの **Monitoring** ページで、**Datadog** パネルの **Setup** をクリックします。

2. **API key** と **Datadog Site** のフィールドに、対応する値を入力します。
    - **API key** は、Datadog の組織と関連付けられています。Cockroach Cloud クラスターで使用する API キーをお持ちでない場合は、作成する必要があります。手順については、[Datadog のドキュメント][2]を参照してください。
    - **Datadog Site** は、Datadog Site URL に対応します。詳細は、[Datadog のドキュメント][3]を参照してください。

3. **Create** をクリックします。クラスターのサイズとシステムの現在の負荷によって、インテグレーションが有効になるまでに時間がかかる場合があります。

4. Datadog に登録されると、Datadog の[インフラストラクチャーリスト][4]にクラスターが表示されます。これには最大で数分かかることがあります。

### ブラウザトラブルシューティング

Datadog [Dashboard List][5] を開き、`CockroachDB Dedicated Overview` をクリックします。このダッシュボードには、CockroachDB Dedicated Overview のメトリクスが表示されます。

独自の Cockroach Cloud ダッシュボードを作成するには、デフォルトの `CockroachDB Dedicated Overview` ダッシュボードを[複製][6]してウィジェットを編集するか、または[新しいダッシュボードを作成][7]します。

[利用可能なメトリクス][8]は、CockroachDB [Prometheus エンドポイント][1]から直接取得したもので、独自のグラフの構成要素として使用することを想定しています。

収集されるメトリクスをプレビューするには、以下の方法があります。

- [インフラストラクチャーリスト][4]のクラスターのエントリーをクリックすると、利用可能な各メトリクスの時系列グラフが表示されます。
- [メトリクスエクスプローラー][9]を使って `crdb_dedicated` メトリクスを検索・表示します。

### 検証

有効化されると、**Monitoring** ページの **Datadog** パネルにある **Integration status** は、`Active` と表示されるようになります。

インテグレーション中に問題が発生した場合、代わりに以下のステータスのいずれかが表示されることがあります。
- `Active` は、インテグレーションが正常にデプロイされたことを示します。
- `Inactive` は、インテグレーションが正常にデプロイされていないことを示します。セットアップが行われていないか、エラーが発生したことを示します。
- `Unhealthy` は、インテグレーション API キーが無効で、[更新](#update-integration)する必要があることを示します。
- `Unknown` は、不明なエラーが発生したことを示します。このステータスが表示された場合は、[サポートチームにお問い合わせください][10]。

CockroachDB からのメトリクスエクスポートは、以下のような場合に中断されることがあります。

- API キーが古くなっている。この場合、インテグレーションのステータスは `Unhealthy` になります。この問題を解決するには、新しい API キーを使って[インテグレーションを更新](#update-integration)してください。
- CockroachDB が一時的に使用できない。この場合、インテグレーションのステータスは `Active` のままです。この問題を解決するには、**Datadog** パネルからインテグレーションを[非アクティブ化](#deactivate-integration)して再アクティブ化してみてください。それでも問題が解決しない場合は、[サポートチームにご連絡ください][10]。

メトリクスエクスポートの健全性を監視するには、Datadog で[カスタムモニターを作成する](#monitor-health-of-metrics-export)ことができます。

### インテグレーションの更新

インテグレーションに関連するメタデータを更新するには (例えば、API キーをローテーションする)

1. **Datadog** パネルで、省略記号をクリックし、**Update** を選択します。

1. **API key** と **Datadog Site** フィールドを更新し、**Create** をクリックします。インテグレーションが再デプロイされます。

### インテグレーションの非アクティブ化

インテグレーションを非アクティブにするには

1. **Datadog** パネルで、省略記号をクリックし、**Deactivate integration** を選択します。

1. 無効になると、パネル内の **Integration status** が、`Inactive` と表示されます。

インテグレーションを非アクティブにした後も、メトリクスデータは Datadog にデフォルトの[保持期間][11]の間残ります。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "cockroachdb_dedicated" >}}


### ヘルプ

CockroachDB Dedicated インテグレーションには、サービスのチェック機能は含まれません。

### ヘルプ

CockroachDB Dedicated インテグレーションには、イベントは含まれません。

## Agent

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。


[1]: https://www.cockroachlabs.com/docs/stable/monitoring-and-alerting.html#prometheus-endpoint
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: https://docs.datadoghq.com/ja/getting_started/site/
[4]: https://docs.datadoghq.com/ja/infrastructure/list/
[5]: https://docs.datadoghq.com/ja/dashboards/#dashboard-list
[6]: https://docs.datadoghq.com/ja/dashboards/#clone-dashboard
[7]: https://docs.datadoghq.com/ja/dashboards/#new-dashboard
[8]: https://docs.datadoghq.com/ja/integrations/cockroachdb_dedicated
[9]: https://docs.datadoghq.com/ja/metrics/explorer/
[10]: https://support.cockroachlabs.com/
[11]: https://docs.datadoghq.com/ja/developers/guide/data-collection-resolution-retention/
[12]: https://github.com/DataDog/integrations-extras/blob/master/cockroachdb_dedicated/metadata.csv
[13]: https://docs.datadoghq.com/ja/help/