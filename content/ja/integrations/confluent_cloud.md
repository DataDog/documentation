---
app_id: fastly-integration-delete-fastly-account
app_uuid: 406c781b-842d-4e0c-84dc-4b13b8e93fb6
assets:
  dashboards:
    confluent-cloud: assets/dashboards/confluent_cloud_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - confluent_cloud.kafka.received_bytes
      - confluent_cloud.connect.sent_records
      - confluent_cloud.ksql.streaming_unit_count
      - confluent_cloud.schema_registry.schema_count
      metadata_path: metadata.csv
      prefix: confluent_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 609
    source_type_name: Confluent Cloud
  monitors:
    Connector incoming throughput dropped to 0: assets/monitors/connector_no_input_data.json
    Connector outgoing throughput dropped to 0: assets/monitors/connector_no_output_data.json
    Kafka Consumer lag is increasing: assets/monitors/consumer_lag_monitor_rate_change_percent.json
    Mirror Kafka Consumer lag is increasing: assets/monitors/cluster_link_lag_rate_change_percent.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- コスト管理
- モニター
- メッセージキュー
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: confluent_cloud
integration_id: fastly-integration-delete-fastly-account
integration_title: Confluent Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: confluent_cloud
public_title: Confluent Cloud
short_description: Confluent Cloud から様々な Kafka メトリクスと関連コストデータを収集します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cost Management
  - Category::Metrics
  - Category::Message Queues
  - Offering::Integration
  - 製品::Data Streams Monitoring
  configuration: README.md#Setup
  description: Confluent Cloud から様々な Kafka メトリクスと関連コストデータを収集します。
  media:
  - caption: Confluent Cloud ダッシュボード概要
    image_url: images/confluent_dashboard.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/confluent-cloud-monitoring-datadog/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/
  support: README.md#Support
  title: Confluent Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要


{{< site-region region="gov" >}}
**Datadog {{< region-param key="dd_site_name" >}} サイトでは Confluent Cloud インテグレーションはサポートされていません**。
{{< /site-region >}}


Confluent Cloud はフルマネージドの、クラウドホスティングのストリーミングデータサービスです。Datadog と Confluent Cloud を接続することで、Confluent Cloud リソースの主要メトリクスを視覚化し、アラートを発します。

Datadog のすぐに使える Confluent Cloud ダッシュボードには、アクティブな接続の変化率や、平均消費レコードと生成レコードの比率などの情報を含め、環境の健全性とパフォーマンスをモニタリングするための主要なクラスターメトリクスが表示されます。

推奨モニターを使用して、トピックのラグが大きくなりすぎた場合にチームに通知してアラートを出すことも、これらのメトリクスを使用して独自のメトリクスを作成することもできます。

## セットアップ

### インストール

[Datadog の Confluent Cloud インテグレーションタイル][1]を使用して、インテグレーションをインストールします。

### 構成

1. Confluent Cloud で **+ Add API Key** をクリックし、[Confluent Cloud API Key と API Secret](#api-key-and-secret) を入力します。
   - **Cloud Resource Management** API キーとシークレットを作成します。
   - **Save** をクリックします。Datadog は、これらの資格情報に関連するアカウントを検索します。
   - Datadog インテグレーション構成で、API キーとシークレットを **API Key and API Secret** フィールドに追加します。
2. Confluent Cloud の [Cluster ID](#cluster-id) または [Connector ID](#connector-id) を追加します。Datadog は Confluent Cloud のメトリクスをクロールし、数分以内にメトリクスをロードします。
3. Confluent Cloud で定義されたタグを収集するには (オプション)
   - **Schema Registry** API キーとシークレットを作成します。Confluent Cloud 上のスキーマ管理についてさらに詳しくは、[こちら][2]をご覧ください。
   - **Save** をクリックします。これにより、Datadog は Confluent Cloud で定義されたタグを収集します。
   - Datadog インテグレーション構成で、API キーとシークレットを **Schema Registry API Key and Secret** フィールドに追加します。
4. Cloud Cost Management を使用し、コストデータの収集を有効にする場合
   - API キーが [BillingAdmin ロール][3]を有効にしていることを確認してください。
   - 24 時間以内に [Cloud Cost Management][4] に表示されます。([収集データ][5])

クラスターやコネクターなどの構成リソースに関する詳細は、[Confluent Cloud インテグレーションのドキュメント][6]をご参照ください。

#### API Key と Secret

Confluent Cloud API Key と Secret を作成するには、[UI で MetricsViewer ロールを新しいサービスアカウントに追加する][7]を参照してください。

#### Cluster ID

Confluent Cloud Cluster ID を検索するには

1. Confluent Cloud で、**Environment Overview** に移動し、監視したいクラスターを選択します。
2. 左側のナビゲーションで、**Cluster overview** > **Cluster settings** をクリックします。
3. **Identification** の下にある、`lkc` で始まる Cluster ID をコピーします。

#### Connector ID

Confluent Cloud Connector ID を検索するには

1. Confluent Cloud で、**Environment Overview** に移動し、監視したいクラスターを選択します。
2. 左側のナビゲーションで、**Data integration** > **Connectors** をクリックします。
3. **Connectors** の下にある、`lcc` で始まる Connector ID をコピーします。

## ダッシュボード

インテグレーションの構成後、すぐに使える Confluent Cloud ダッシュボードで Kafka クラスターとコネクタのメトリクスの概要をご覧ください。

デフォルトでは、Confluent Cloud 全体で収集されたすべてのメトリクスが表示されます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "confluent-cloud" >}}


### イベント

Confluent Cloud インテグレーションには、イベントは含まれません。

### サービスチェック

Confluent Cloud インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## 参考資料

- [Terraform による Confluent アカウントの作成と管理][10]
- [Terraform による Confluent リソースの作成と管理][11]

[1]: https://app.datadoghq.com/integrations/confluent-cloud
[2]: https://docs.confluent.io/cloud/current/get-started/schema-registry.html#quick-start-for-schema-management-on-ccloud
[3]: https://docs.confluent.io/cloud/current/access-management/access-control/rbac/predefined-rbac-roles.html#billingadmin-role
[4]: https://app.datadoghq.com/cost
[5]: https://docs.datadoghq.com/ja/cloud_cost_management/saas_costs/?tab=confluentcloud#data-collected
[6]: https://docs.datadoghq.com/ja/integrations/confluent_cloud/
[7]: https://docs.confluent.io/cloud/current/monitoring/metrics-api.html#add-the-metricsviewer-role-to-a-new-service-account-in-the-ui
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/confluent_cloud/confluent_cloud_metadata.csv
[9]: https://docs.datadoghq.com/ja/help/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_confluent_account
[11]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_confluent_resource