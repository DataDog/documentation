---
categories:
- web
dependencies: []
description: Confluent Cloud から Kafka クラスターとコネクタのメトリクスを収集します。
doc_link: https://docs.datadoghq.com/integrations/confluent_cloud/
draft: false
git_integration_title: confluent_cloud
has_logo: true
integration_id: ''
integration_title: Confluent Cloud
integration_version: ''
is_public: true
kind: integration
manifest_version: '1.0'
name: confluent_cloud
public_title: Datadog-Confluent Cloud インテグレーション
short_description: Confluent Cloud から Kafka クラスターとコネクタのメトリクスを収集します。
team: web-integrations
version: '1.0'
---

## 概要

{{< site-region region="gov" >}}
**Datadog {{< region-param key="dd_site_name" >}} サイトでは Confluent Cloud インテグレーションはサポートされていません**。
{{< /site-region >}}


Datadog と Confluent Cloud を接続すると、Kafka クラスターのトピック別メトリクスと Kafka コネクタのメトリクスを表示することができます。これらのメトリクスを使ってモニターやダッシュボードを作成することができます。

## セットアップ

### インストール

[Datadog の Confluent Cloud インテグレーションタイル][1]を使用して、インテグレーションをインストールします。

### コンフィギュレーション

1. インテグレーションタイルで、**Configuration** タブに移動します。
2. [Confluent Cloud API Key と API Secret](#api-key-and-secret) を入力し、**+ Add API Key** をクリックします。
3. **Save** をクリックします。Datadog は、これらの資格情報に関連するアカウントを検索します。
4. Confluent Cloud の [Cluster ID](#cluster-id) または [Connector ID](#connector-id) を追加します。Datadog は Confluent Cloud のメトリクスをクロールし、数分以内にメトリクスをロードします。

#### API Key と Secret

Confluent Cloud API Key と Secret を作成するには、[UI で MetricsViewer ロールを新しいサービスアカウントに追加する][2]を参照してください。

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
{{< get-metrics-from-git "confluent_cloud" >}}


### イベント

Confluent Cloud インテグレーションには、イベントは含まれません。

### サービスのチェック

Confluent Cloud インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。


[1]: https://app.datadoghq.com/account/settings#integrations/confluent-cloud
[2]: https://docs.confluent.io/cloud/current/monitoring/metrics-api.html#add-the-metricsviewer-role-to-a-new-service-account-in-the-ui
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/confluent_cloud/confluent_cloud_metadata.csv
[4]: https://docs.datadoghq.com/ja/help/