---
app_id: yugabytedb-managed
app_uuid: c5cf1ad4-fa3f-4835-9f3b-f467288b382a
assets:
  dashboards:
    yugabytedb_managed_overview: assets/dashboards/yugabytedb_managed_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: ybdb.up
      metadata_path: metadata.csv
      prefix: ybdb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10408
    source_type_name: YugabyteDB Managed
author:
  homepage: https://yugabyte.com/
  name: YugabyteDB
  sales_email: sales@yugabyte.com
  support_email: support@yugabyte.com
categories:
- data stores
- クラウド
- AWS
- Azure
- Google Cloud
- モニター
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/yugabytedb_managed/README.md
display_on_public_website: true
draft: false
git_integration_title: yugabytedb_managed
integration_id: yugabytedb-managed
integration_title: YugabyteDB Managed
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: yugabytedb_managed
public_title: YugabyteDB Managed
short_description: YugabyteDB Managed クラスターのメトリクスを Datadog にエクスポートする
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Supported OS::Linux
  - Category::Cloud
  - Category::AWS
  - Category::Azure
  - Category::Google Cloud
  - Category::Metrics
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: YugabyteDB Managed クラスターのメトリクスを Datadog にエクスポートする
  media:
  - caption: YugabyteDB Managed 概要ダッシュボード
    image_url: images/overview.png
    media_type: image
  - caption: YSQL メトリクスを監視するグラフ
    image_url: images/ysql.png
    media_type: image
  - caption: YCQL メトリクスを監視するグラフ
    image_url: images/ycql.png
    media_type: image
  - caption: ノード/インフラストラクチャーのメトリクスを監視するグラフ
    image_url: images/infrastructure.png
    media_type: image
  - caption: マスターサーバーのメトリクスを監視するグラフ
    image_url: images/master.png
    media_type: image
  - caption: タブレットサーバーのメトリクスを監視するグラフ
    image_url: images/tserver.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: YugabyteDB Managed
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[YugabyteDB][1] は、PostgreSQL と API 互換性のあるクラウドネイティブな分散データベースです。

[YugabyteDB Managed][2] は、YugabyteDB のフルマネージド DBaaS (Database-as-a-service) です。このインテグレーションを使用すると、クラスターのメトリクスを Datadog に送信して、YugabyteDB Managed クラスターの健全性とパフォーマンスを視覚化することができます。このインテグレーションには、すぐに使えるダッシュボードが付属しており、以下のような YugabyteDB Managed クラスターの健全性とパフォーマンスの監視に必要な最も重要なメトリクスをすべて視覚化します。
- ノードのリソース使用状況 (ディスク、メモリ、CPU、ネットワークなど)。
- 読み取り/書き込み操作のスループットとレイテンシー (YSQL と YCQL の両方)。
- 高度なマスターとタブレットサーバーのテレメトリー (例えば、内部 RPC スループット/レイテンシー、WAL 読み取り/書き込みスループット)。

## 計画と使用
**注**: この機能は [Sandbox Clusters][3] では使用できません。

### インフラストラクチャーリスト

YugabyteDB Managed と Datadog のインテグレーションを有効にするには

#### 構成の作成
1. YugabyteDB Managedで 、**Integrations > Metrics** タブに移動します。
2. **Create Export Configuration** または **Add Export Configuration** をクリックします。
3. **Datadog** プロバイダーを選択します。
4. **API key** と **Site** フィールドに対応する値を入力します。詳細は、[Datadog API とアプリケーションキー][4]および [Datadog サイト URL][5] のドキュメントを参照してください。
5. 構成を確認するには、**Test Configuration** をクリックします。
6. **Create Configuration** をクリックします。

#### クラスターへの構成の関連付け
1. YugabyteDB Managedで 、**Integrations > Metrics** タブに移動します。
2. **Export Metrics by Cluster** テーブルでクラスターを見つけます。
3. **Export Configuration** ドロップダウンメニューから必要な構成を選択します。
4. **Export Status** が `Active` と表示されるのを待ちます。

**注**: クラスターは、一時停止中または別の操作が進行中の場合、構成を関連付けることはできません。

セットアップの詳細については、[YugabyteDB ドキュメント][6]を参照してください。

## アンインストール

Datadog にエクスポートされるメトリクスを無効にするには
1. YugabyteDB Managedで 、**Integrations > Metrics** タブに移動します。
2. **Export Metrics by Cluster** テーブルでクラスターを見つけます。
3. **Export Configuration** ドロップダウンでクラスターのドロップダウンを開き、`None` を選択します。
4. **Export Status** が `-` と表示されるのを待ちます。

**注**: クラスターは、一時停止中または別の操作が進行中の場合、構成を関連付けることはできません。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "yugabytedb_managed" >}}


### ヘルプ

YugabyteDB Managed には、サービスのチェック機能は含まれません。

### ヘルプ

YugabyteDB Managed には、イベントは含まれません。

## Agent

ご不明な点は、[YugabyteDB のサポートチーム][8]までお問い合わせください。


[1]: https://yugabyte.com/
[2]: https://www.yugabyte.com/managed/
[3]: https://docs.yugabyte.com/preview/yugabyte-cloud/cloud-basics/create-clusters/create-clusters-free/
[4]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#add-an-api-key-or-client-token
[5]: https://docs.datadoghq.com/ja/getting_started/site/
[6]: https://docs.yugabyte.com/preview/yugabyte-cloud/cloud-monitor/metrics-export/#datadog
[7]: https://github.com/DataDog/integrations-extras/blob/master/yugabytedb_managed/metadata.csv
[8]: https://support.yugabyte.com/hc/en-us/requests/new