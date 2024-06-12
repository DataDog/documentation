---
app_id: singlestoredb-cloud
app_uuid: c7638089-0864-4ddc-bd32-b731c58fe567
assets:
  dashboards:
    singlestoredb_cloud_overview: assets/dashboards/singlestoredb_cloud_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: singlestoredb_cloud.cpu_resource_limits
      metadata_path: metadata.csv
      prefix: singlestoredb_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10373
    source_type_name: SinglestoreDB Cloud
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.singlestore.com
  name: Singlestore
  sales_email: info@singlestore.com
  support_email: support@singlestore.com
categories:
- data stores
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/singlestoredb_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: singlestoredb_cloud
integration_id: singlestoredb-cloud
integration_title: SingleStoreDB Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: singlestoredb_cloud
public_title: SingleStoreDB Cloud
short_description: SinglestoreDB Cloud のメトリクスを Datadog に送信
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
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: SinglestoreDB Cloud のメトリクスを Datadog に送信
  media:
  - caption: SinglestoreDB Cloud - ダッシュボード
    image_url: images/singlestoredb-cloud-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SingleStoreDB Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 概要

SingleStoreDB Cloud は、データ集約的でリアルタイムなアプリケーションをサポートするために最適化されたスピードとスケーラビリティを持つ分散リレーショナルデータベースです。このインテグレーションを使用すると、SingleStoreDB Cloud のワークスペースグループ/クラスターの全体的な健全性とパフォーマンスを監視できます。Datadog と SingleStoreDB Cloud を統合するには、Datadog SingleStore インテグレーションをインストールし、[Cloud Portal][1] で構成します。

SinglestoreDB Cloud を Datadog に接続すると、以下のことができます。

- SinglestoreDB Cloud のキーメトリクスを視覚化する
- リソースの利用効率を高める
- クエリレートとパフォーマンスを観測する
- SinglestoreDB のパフォーマンスをアプリケーションの他の部分と相関付ける

## 計画と使用

### Datadog に SingleStoreDB Cloud インテグレーションをインストールする

1. Datadog の [SingleStoreDB Cloud][2] インテグレーションタイルに移動します。
3. **Install Integration** を選択し、インストールが完了するまで待ちます。
4. **Configure** タブで、**Connect Accounts** を選択します。このアクションにより [Cloud Portal][1] に移動し、OAuth を通じてインテグレーションを認可します。

上記の手順は、最初のワークスペースグループを Datadog に接続するために 1 回だけ実行する必要があります。インテグレーションがインストールされ、アカウントが接続されたら、[Cloud Portal で Datadog インテグレーションを構成する](#configure-the-datadog-integration-in-the-cloud-portal)で指定された手順に従って、連続するワークスペースグループを接続します。

### Cloud Portal で Datadog インテグレーションを構成する

SingleStoreDB Cloud のワークスペースグループを Datadog と接続するには

1. Cloud Portal にサインインします。サインインすると、** Integration** ページが表示されます。左側のナビゲーションペインで **Monitoring > Integration** を選択して、このページにアクセスすることもできます。
2. 利用可能なインテグレーションのリストから、Datadog の **+ Integration** を選択します。
3. **Create Datadog Integration** ダイアログの **Workspace Group** リストから、ワークスペースグループを選択します。
4. **Create** を選択します。このアクションにより、Datadog のサインインページが表示されます。Datadog にサインインしたら、次のステップに進みます。
5. **Authorize access** 画面で、**Authorize** ボタンを選択します。認可に成功すると、クラウドポータルの ** Integration** ページが表示されます。

Datadog を使用して SingleStoreDB Cloud データベースを監視できるようになりました。

### Datadog インテグレーションをアンインストールする

以下の手順に従って、Datadog インテグレーションをアンインストールします。

1. **Datadog 上の SingleStoreDB Cloud インテグレーションをアンインストールします**: Datadog の [SingleStore DB Cloud インテグレーションタイル][2]に移動し、**Uninstall Integration** をクリックします。このインテグレーションがアンインストールされると、以前の認可はすべて取り消されます。
2. **SingleStore Cloud Portal の Datadog インテグレーションを削除します**: Cloud Portal で、**Monitoring > Integration** に進みます。削除したい各 Datadog 構成の **Delete** を選択します。

さらに、このインテグレーションに関連付けられているすべての API キーを削除します。

特定のワークスペースグループの監視を停止する (インテグレーションは保持する) には、SingleStore DB Cloud Portal に移動し、**Delete** (**Cloud Portal > Monitoring > Integration**) を選択して、このワークスペースグループの Datadog 構成を削除します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "singlestoredb_cloud" >}}


### ヘルプ

SingleStoreDB Cloud には、サービスのチェック機能は含まれません。

### ヘルプ

SingleStoreDB Cloud には、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。


[1]: https://portal.singlestore.com
[2]: https://app.datadoghq.com/integrations/singlestoredb-cloud
[3]: https://github.com/DataDog/integrations-extras/blob/master/singlestoredb_cloud/metadata.csv
[4]: https://docs.datadoghq.com/ja/help/