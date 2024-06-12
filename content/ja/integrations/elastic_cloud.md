---
app_id: elastic-cloud
app_uuid: f00a0b0b-b25f-4b9b-af4d-dda28f33609a
assets:
  dashboards:
    elastic_cloud: assets/dashboards/elastic_cloud_overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: elastic_cloud.docs.count
      metadata_path: metadata.csv
      prefix: elastic_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10315
    source_type_name: Elastic Cloud
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- モニター
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: elastic_cloud
integration_id: elastic-cloud
integration_title: Elastic Cloud
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: elastic_cloud
public_title: Elastic Cloud
short_description: Elastic Cloud でホストされている Elasticsearch サービスのメトリクスモニターです。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  configuration: README.md#Setup
  description: Elastic Cloud でホストされている Elasticsearch サービスのメトリクスモニターです。
  media: []
  overview: README.md#Overview
  support: README.md#Troubleshooting
  title: Elastic Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Elastic Cloud とインテグレーションすることで、ホスティングされた Elasticsearch のサービスを常に最新の状態に保つことができます。

このインテグレーションは、以下のような Elastic Cloud サービスのメトリクスを提供します。

- クラスター統計情報
- クラスターの健全性
- ノードとインデックスの統計情報
- リソース使用率メトリクス

## 計画と使用

### インフラストラクチャーリスト

必要なインストール手順はありません。

### ブラウザトラブルシューティング

#### メトリクスの収集

デプロイ用に読み取り専用の Elastic Cloud ユーザーを作成し、[Elastic Cloud インテグレーションタイル](https://app.datadoghq.com/account/settings#integrations/elastic-cloud)にユーザー資格情報を入力します。

1. すべての [Elastic Cloud デプロイ][1]にアクセスします。
2. デプロイ名を選択します。
3. **Management** の下にある **Manage permissions** をクリックします。
4. **Roles** タブで、**Create role** をクリックしてロールを作成します。
    1. **Role name** に **Datadog-Role** と入力します。
    2. **Elasticsearch Cluster privileges** に **monitor, read_slm** と入力します。
    3. **Indices** の下に、メトリクスが必要なインデックスを入力します。
    4. **privileges** に、**monitor** と入力します。
    5. **Create role** をクリックします。
5. **Users** タブを選択します。
    1. **Create user** をクリックします。
    2. ユーザー名、メールアドレス、パスワードをフォームに入力します。
    3. **Privileges** の下にある **Roles** ドロップダウンから、**Datadog-Role** を選択します。
    4. **create user** をクリックします。

次の手順で Elastic Cloud デプロイの URL を取得します。
1. すべての [Elastic Cloud デプロイ][1]にアクセスします。
2. デプロイを選択します。
3. **Applications** の中から **Elasticsearch** を探します。
4. **Copy Endpoint** をクリックして、デプロイの URL をコピーします。

デフォルトでは、インテグレーションはクラスター内のノードの統計情報 (ノード数や各ノードのドキュメント数など) を収集します。

以下は、特定のメトリクスを受け取るためにインテグレーションタイルに設定できる構成可能なフラグです。

Primary shard stats
: クラスターのプライマリシャードのみを対象としたメトリクス。

Primary shard graceful timeout
: クラスターのプライマリシャードのメトリクスは非常に大きくなる可能性があるため、リクエストがタイムアウトする可能性があります。このフラグを有効にすると 、タイムアウトが発生しても他のすべてのメトリクスを収集し続けることができます。

Detailed index stats
: インデックス固有のプライマリシャードの統計情報を取得できるようにします。

Pending tasks stats
: まだ実行されていないクラスターレベルの変更に関するメトリクス。

Shard allocation stats
: 各データノードに割り当てられたシャードの数およびそのディスク容量のメトリクス。

Snapshot life cycle management stats
: スナップショットライフサイクルマネジメントによるアクションに関するメトリクス。

Index stats
: 個々の指標のメトリクスを収集できるようにします。

### IP トラフィックフィルター

Elastic Cloud では、セキュリティ対策として、IP アドレスか CIDR ブロックによるトラフィックのフィルタリングが可能です。これにより、デプロイへのアクセス方法を制限できます。Datadog がデプロイからメトリクスを取得できるように、特定の IP アドレスプレフィックスを許可する必要があります。

トラフィックフィルターのルールセットを作成するには、こちらの[手順][2]に従ってください。ルールセットが作成できたら、ルールセットをデプロイと関連付けます。

Datadog の IP プレフィックスを含める方法

1. Datadog の IP 範囲を[こちら][3]で確認します。
2. **webhooks** の各プレフィックスを **source** としてトラフィックルールに入力します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "elastic_cloud" >}}


### ワークフローの自動化

Elastic Cloud インテグレーションには、ログは含まれません。

### ヘルプ

Elastic Cloud インテグレーションには、イベントは含まれません。

### ヘルプ

Elastic Cloud インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。






[1]: https://cloud.elastic.co/deployments
[2]: https://www.elastic.co/guide/en/cloud-enterprise/current/ece-traffic-filtering-ip.html
[3]: https://docs.datadoghq.com/ja/api/latest/ip-ranges/
[4]: https://github.com/DataDog/integrations-internal-core/blob/main/elastic_cloud/metadata.csv
[5]: https://docs.datadoghq.com/ja/help