---
app_id: gigamon
app_uuid: 041cf2fe-f391-4d8b-930c-b700c648c683
assets:
  dashboards:
    Gigamon Dashboard: assets/dashboards/gigamon_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 17453472
    source_type_name: gigamon
author:
  homepage: https://gigamon.com
  name: Gigamon
  sales_email: sales@gigamon.com
  support_email: alliances@gigamon.com
categories:
- aws
- azure
- network
- security
- kubernetes
- incident-teams
- google cloud
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/gigamon/README.md
display_on_public_website: true
draft: false
git_integration_title: gigamon
integration_id: gigamon
integration_title: Gigamon
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: gigamon
public_title: Gigamon
short_description: クラウド、仮想、物理インフラストラクチャーを横断するすべてのアプリケーション トラフィックに対する深い可観測性
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Azure
  - Category::Network
  - Category::Security
  - Category::Kubernetes
  - Category::Containers
  - Category::Google Cloud
  - Supported OS::Linux
  - Supported OS::Windows
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: クラウド、仮想、物理インフラストラクチャーを横断するすべてのアプリケーション トラフィックに対する深い可観測性
  media:
  - caption: Gigamon Dashboard for Datadog
    image_url: images/gd1.png
    media_type: image
  - caption: Gigamon Dashboard for Datadog
    image_url: images/gd2.png
    media_type: image
  - caption: Gigamon Dashboard for Datadog
    image_url: images/gd3.png
    media_type: image
  - caption: Gigamon Dashboard for Datadog
    image_url: images/gigamondashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Gigamon
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要
[Gigamon][1] の Application Metadata Intelligence (AMI) は、何千ものビジネス、コンシューマー、IT アプリケーションおよびサービスにわたる重要なメタデータ属性を Observability、Security Information and Event Management (SIEM)、Network Performance Monitoring ツールに提供します。これにより、アプリケーションの詳細な可視性が得られ、パフォーマンス ボトルネック、品質問題、潜在的なネットワーク セキュリティ リスクを迅速に特定できます。Gigamon の AMI は、デジタル トランスフォーメーション イニシアチブにおける複雑なデジタル アプリケーションの監視と管理を支援します。これらは AMI メタデータを Datadog に送信することで Gigamon ソリューション経由で実現できます。主なメリットとして、リッチでアクション可能なインサイト、セキュリティ体制の強化などが挙げられます。

## セットアップ
Gigamon は AMI メタデータ [AMX][2] を HTTP `POST` で Datadog API に送信します。

### インストール

GigaVUE V Series Node は、顧客インフラストラクチャー内で実行され、ネットワーク トラフィックを処理および分配する仮想マシンです。Gigamon Application Metadata Exporter (AMX) は、CEF 形式の AMI 出力を JSON に変換し、Datadog へ送信します。AMX アプリケーションは V Series Node 上でのみデプロイでき、物理ノードまたは仮想マシン上で動作する AMI に接続できます。AMX アプリケーションと AMI は GigaVUE-FM によって管理されます。

1. 環境に AMX をインストールしたら、[FM][3] でモニタリング セッションを作成します。
2. エクスポーターを編集し、次の必須フィールドを入力します:
    a. Alias: エクスポーターの名前 (文字列)
    b. Ingestor: Port に「514」、Type に「ami」を指定
    c. Cloud Tool Exports: 「+」を選択して新しいエクスポーター ツールを作成し、以下の図のように詳細を追加します:
    ![AMI exporter][4]
    ![Cloud Tools Exporter][5]


## 収集データ

### メタデータ属性
Gigamon のディープ パケット インスペクションは 7,500 以上のアプリケーション メタデータ属性を抽出し、Datadog へ転送します。Gigamon Application Metadata Protobook では、サポートされているプロトコルとその属性の完全な一覧を確認できます。これらのプロトコルは Tags、Family、Classification メソッドによってグループ化して表示することも可能です。

Gigamon AMX は CEF 形式の AMI 出力を JSON に変換し、Datadog へ送信します。

Application Metadata Protobook には [GigaVUE FM][6] からアクセスできます。

## トラブルシューティング
お困りの場合は [Gigamon Support][7] までお問い合わせください。


[1]: http://gigamon.com
[2]: https://docs.gigamon.com/doclib66/Content/GV-Cloud-V-Series-Applications/AMX_intro.html
[3]: https://docs.gigamon.com/doclib66/Content/GigaVUE_Cloud_Suites.html?tocpath=GigaVUE%20Cloud%20Suite%7C_____0
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/gigamon/images/gigamon1.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/gigamon/images/gigamon2.png
[6]: https://docs.gigamon.com/doclib66/Content/GV-GigaSMART/Application%20Protocol%20Bundle.html
[7]: https://www.gigamon.com/support/support-and-services/contact-support.html