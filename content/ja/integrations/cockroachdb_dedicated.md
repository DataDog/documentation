---
app_id: cockroach-cloud
app_uuid: e0ab9a47-da5b-4008-8571-3842ac318f74
assets:
  dashboards:
    cockroach_cloud_dedicated_overview: assets/dashboards/cockroach_cloud_dedicated_overview.json
    cockroach_cloud_serverless_overview: assets/dashboards/cockroach_cloud_serverless_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - crdb_dedicated.sys.uptime
      - crdb_cloud.sys.uptime
      metadata_path: metadata.csv
      prefix: crdb_
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
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cockroachdb_dedicated/README.md
display_on_public_website: true
draft: false
git_integration_title: cockroachdb_dedicated
integration_id: cockroach-cloud
integration_title: Cockroach Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cockroachdb_dedicated
public_title: Cockroach Cloud
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
  - Offering::Integration
  configuration: README.md#Setup
  description: Cockroach Cloud のメトリクスを DataDog に送信します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Cockroach Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

The CockroachDB Cloud integration for Datadog enables data collection and alerting on a subset of CockroachDB metrics using the Datadog platform. 

## セットアップ

### インストール

Cockroach Cloud クラスターに対して Datadog のモニタリングを有効にするには

1. On the cluster's **Monitoring** > [**Tools** page][1].

2. **API key** と **Datadog Site** のフィールドに、対応する値を入力します。
    - **API key** は、Datadog の組織と関連付けられています。Cockroach Cloud クラスターで使用する API キーをお持ちでない場合は、作成する必要があります。手順については、[Datadog のドキュメント][2]を参照してください。
    - **Datadog Site** は、Datadog Site URL に対応します。詳細は、[Datadog のドキュメント][3]を参照してください。

3. **Create** をクリックします。クラスターのサイズとシステムの現在の負荷によって、インテグレーションが有効になるまでに時間がかかる場合があります。

4. Datadog に登録されると、Datadog の[インフラストラクチャーリスト][4]にクラスターが表示されます。これには最大で数分かかることがあります。

### 構成

Open your Datadog [Dashboard List][5]. There are two out of the box dashboards that present CockroachDB metrics
- CockroachDB Cloud Serverless (Limited Preview)
- CockroachDB Cloud Dedicated

To create your own Cockroach Cloud dashboard, you can either [clone][6] the default `CockroachDB Cloud Dedicated` dashboard and edit the widgets, or [create a new dashboard][7].

The [available metrics][8] are intended for use as building blocks for your own charts.

収集されるメトリクスをプレビューするには、以下の方法があります。

- [インフラストラクチャーリスト][4]のクラスターのエントリーをクリックすると、利用可能な各メトリクスの時系列グラフが表示されます。
- Use the [Metrics Explorer][9] to search for and view `crdb_cloud` or `crdb_dedicated` metrics.

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

To monitor the health of metrics export, you can create a custom Monitor in Datadog. 

### インテグレーションの更新

インテグレーションに関連するメタデータを更新するには (例えば、API キーをローテーションする)

1. **Datadog** パネルで、省略記号をクリックし、**Update** を選択します。

1. **API key** と **Datadog Site** フィールドを更新し、**Create** をクリックします。インテグレーションが再デプロイされます。

### インテグレーションの非アクティブ化

インテグレーションを非アクティブにするには

1. **Datadog** パネルで、省略記号をクリックし、**Deactivate integration** を選択します。

1. 無効になると、パネル内の **Integration status** が、`Inactive` と表示されます。

インテグレーションを非アクティブにした後も、メトリクスデータは Datadog にデフォルトの[保持期間][11]の間残ります。

## 収集データ

### メトリクス

- `crdb_cloud` & `crdb_dedicated` [Metrics][12]

### サービスチェック

The Cockroach Cloud integration does not include any service checks.

### イベント

The Cockroach Cloud integration does not include any events.

## サポート

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。


[1]: https://www.cockroachlabs.com/docs/cockroachcloud/tools-page
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: https://docs.datadoghq.com/ja/getting_started/site/
[4]: https://docs.datadoghq.com/ja/infrastructure/list/
[5]: https://app.datadoghq.com/dashboard/lists
[6]: https://docs.datadoghq.com/ja/dashboards/configure/#configuration-actions
[7]: https://docs.datadoghq.com/ja/dashboards/#new-dashboard
[8]: https://docs.datadoghq.com/ja/integrations/cockroachdb_dedicated/#data-collected
[9]: https://docs.datadoghq.com/ja/metrics/explorer/
[10]: https://support.cockroachlabs.com/
[11]: https://docs.datadoghq.com/ja/developers/guide/data-collection-resolution-retention/
[12]: https://github.com/DataDog/integrations-extras/blob/master/cockroachdb_dedicated/metadata.csv
[13]: https://docs.datadoghq.com/ja/help/