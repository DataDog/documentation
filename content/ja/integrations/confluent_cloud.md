---
"app_id": "confluent-cloud"
"app_uuid": "406c781b-842d-4e0c-84dc-4b13b8e93fb6"
"assets":
  "dashboards":
    "confluent-cloud": assets/dashboards/confluent_cloud_overview.json
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "metrics":
      "check":
      - confluent_cloud.kafka.received_bytes
      - confluent_cloud.connect.sent_records
      - confluent_cloud.ksql.streaming_unit_count
      - confluent_cloud.schema_registry.schema_count
      "metadata_path": metadata.csv
      "prefix": confluent_cloud.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "609"
    "source_type_name": Confluent Cloud
  "monitors":
    "[Confluent Cloud] Mirror topic lag is increasing": assets/monitors/cluster_link_lag_rate_change_percent.json
    "[Confluent Cloud] Topic lag is Increasing": assets/monitors/consumer_lag_monitor_rate_change_percent.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- コスト管理
- モニター
- メッセージキュー
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "confluent_cloud"
"integration_id": "confluent-cloud"
"integration_title": "Confluent Cloud"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "confluent_cloud"
"public_title": "Confluent Cloud"
"short_description": "Collect various Kafka metrics and related cost data from Confluent Cloud."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Cost Management"
  - "Category::Metrics"
  - "Category::Message Queues"
  "configuration": "README.md#Setup"
  "description": Collect various Kafka metrics and related cost data from Confluent Cloud.
  "media":
  - "caption": Confluent Cloud Dashboard Overview
    "image_url": images/confluent_dashboard.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": その他
    "url": "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_confluent_account"
  - "resource_type": その他
    "url": "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_confluent_resource"
  "support": "README.md#Support"
  "title": Confluent Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要


{{< site-region region="gov" >}}
**Datadog {{< region-param key="dd_site_name" >}} サイトでは Confluent Cloud インテグレーションはサポートされていません**。
{{< /site-region >}}


Confluent Cloud はフルマネージドの、クラウドホスティングのストリーミングデータサービスです。Datadog と Confluent Cloud を接続することで、Confluent Cloud リソースの主要メトリクスを視覚化し、アラートを発します。

Datadog のすぐに使える Confluent Cloud ダッシュボードには、アクティブな接続の変化率や、平均消費レコードと生成レコードの比率などの情報を含め、環境の健全性とパフォーマンスをモニタリングするための主要なクラスターメトリクスが表示されます。

推奨モニターを使用して、トピックのラグが大きくなりすぎた場合にチームに通知してアラートを出すことも、これらのメトリクスを使用して独自のメトリクスを作成することもできます。

ストリーミングデータパイプラインのトポロジーを視覚化したり、データストリームセットアップ内の局所的なボトルネックを調査したりすることが有益な場合は、[Data Streams Monitoring][1] をご覧ください。

## セットアップ

### インストール

[Datadog の Confluent Cloud インテグレーションタイル][2]を使用して、インテグレーションをインストールします。

### 構成

1. インテグレーションタイルで、**Configuration** タブに移動します。
2. [Confluent Cloud API Key と API Secret](#api-key-and-secret) を入力し、**+ Add API Key** をクリックします。
3. **Save** をクリックします。Datadog は、これらの資格情報に関連するアカウントを検索します。
4. Confluent Cloud の [Cluster ID](#cluster-id) または [Connector ID](#connector-id) を追加します。Datadog は Confluent Cloud のメトリクスをクロールし、数分以内にメトリクスをロードします。
5. If you use Cloud Cost Management and enable collecting cost data
   - Please ensure that the API key has the [BillingAdmin role][3] enabled.
   - It will be visible in [Cloud Cost Management][4] within 24 hours. ([collected data][5])

#### API Key と Secret

To create your Confluent Cloud API Key and Secret, see [Add the MetricsViewer role to a new service account in the UI][6].

#### Cluster ID

Confluent Cloud Cluster ID を検索するには

1. Confluent Cloud で、**Environment Overview** に移動し、監視したいクラスターを選択します。
2. 左側のナビゲーションで、**Cluster overview** > **Cluster settings** をクリックします。
3. Under **Identification**, copy the Cluster ID beginning with `lkc`.

#### Connector ID

To find your Confluent Cloud Connector ID:

1. Confluent Cloud で、**Environment Overview** に移動し、監視したいクラスターを選択します。
2. 左側のナビゲーションで、**Data integration** > **Connectors** をクリックします。
3. Under **Connectors**, copy the Connector ID beginning with `lcc`.

## ダッシュボード

インテグレーションの構成後、すぐに使える Confluent Cloud ダッシュボードで Kafka クラスターとコネクタのメトリクスの概要をご覧ください。

By default, all metrics collected across Confluent Cloud are displayed.

## 収集データ

### メトリクス
{{< get-metrics-from-git "confluent_cloud" >}}


### イベント

Confluent Cloud インテグレーションには、イベントは含まれません。

### サービスチェック

Confluent Cloud インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## 参考資料

- [Create and manage Confluent accounts with Terraform][9]
- [Create and manage Confluent resources with Terraform][10]

[1]: https://www.datadoghq.com/product/data-streams-monitoring/
[2]: https://app.datadoghq.com/integrations/confluent-cloud
[3]: https://docs.confluent.io/cloud/current/access-management/access-control/rbac/predefined-rbac-roles.html#billingadmin-role
[4]: https://app.datadoghq.com/cost
[5]: https://docs.datadoghq.com/cloud_cost_management/saas_costs/?tab=confluentcloud#data-collected
[6]: https://docs.confluent.io/cloud/current/monitoring/metrics-api.html#add-the-metricsviewer-role-to-a-new-service-account-in-the-ui
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/confluent_cloud/confluent_cloud_metadata.csv
[8]: https://docs.datadoghq.com/help/
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_confluent_account
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_confluent_resource

