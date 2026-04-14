---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-splunk-to-datadog-migration
app_uuid: 47bde0bc-6e76-4307-afa3-9e382fffc211
assets: {}
author:
  contact_link: https://www.crestdata.ai/contact-us/
  homepage: https://www.crestdata.ai/
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: migrationapps@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_splunk_to_datadog_migration
integration_id: crest-data-systems-splunk-to-datadog-migration
integration_title: Splunk から Datadog へのマイグレーション アプリ
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: crest_data_systems_splunk_to_datadog_migration
pricing:
- includes_assets: true
  private_offer_only: true
  product_id: splunk-to-datadog-migration
  short_description: Splunk から Datadog へ数分で移行
  unit_price: null
public_title: Splunk から Datadog へのマイグレーション アプリ
short_description: 自動化ツールにより、Splunk から Datadog へのシームレスかつ迅速なマイグレーションを実現します。
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Marketplace
  - Offering::Professional Service
  configuration: README.md#Setup
  description: 自動化ツールにより、Splunk から Datadog へのシームレスかつ迅速なマイグレーションを実現します。
  media:
  - caption: 移行済みダッシュボード
    image_url: images/All-combined.png
    media_type: image
  - caption: Splunk から Datadog へのコンフィギュレーション
    image_url: images/SP-DD-Configuration.png
    media_type: image
  - caption: Splunk から Datadog へのデータモデル マッピング
    image_url: images/SP-DD-Datamodel-mapping.png
    media_type: image
  - caption: Splunk から Datadog へのリスト
    image_url: images/SP-DD-App-list.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Splunk から Datadog へのマイグレーション アプリ
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要
**Splunk から Datadog へのマイグレーション アプリ**は、Splunk のダッシュボードとクエリを Datadog 相当へ自動変換します。メタデータを自動的に Datadog 専用のダッシュボード、クエリ、モニターへ変換することで、マイグレーションを簡易化し、加速します。

- [こちらから登録][1]

### メリット
- **自動化されたマイグレーション**: 以前は数週間から数か月かかっていた作業を数分で完了でき、貴重な時間とリソースを解放します。
- **シームレスな移行**: Splunk から Datadog への移行による中断を最小限に抑え、監視・アラートの重要なワークフローを維持しながらスムーズに切り替えられます。
- **迅速な導入**: ほとんど手間をかけずに Datadog の強力な監視機能をすぐに統合・活用できます。

### 主な機能
- **自動変換:** Splunk 固有の可視化 (ダッシュボード、チャート、グラフ など) を Datadog と互換性のある形式へ自動的に変換します。
- **クエリ変換:** SPL クエリなど Splunk のクエリを Datadog の対応するクエリ言語に変換し、正確なデータ表現を保証します。
- **詳細なアセスメント レポート:** どのクエリやパネルが自動変換できるかを示す詳細な評価レポートを提供し、移行を進める前に範囲や効率性を把握できます。
- **簡単なフィールド マッピング:** Splunk のフィールド名を Datadog と整合させ、標準化と一貫性を確保します。
- **成功ベースの課金:** 成功裏に移行されたパネルとクエリに対してのみ料金が発生し、費用対効果を高めます。

このマイグレーション アプリは、アプリ ダッシュボードやパネル クエリなどのメタデータの移行を自動化します。本アプリを使用する前に、複数のソースから Datadog プラットフォームに関連するデータをオンボードしておいてください。Splunk にあるデータと似たデータが Datadog アカウントにすでに存在することで、シームレスな可視化移行を実現できます。

**データ プライバシーの保証:** Crest Data は、Splunk または Datadog 環境内のデータにアクセスすることはありません。私たちはお客様が接続したメタデータ情報のみを扱います。当プラットフォームは実際の環境からのデータを操作・処理することはなく、お客様のデータのプライバシーとセキュリティを確保します。

現在、リモート オプションではダッシュボード移行をサポートしています。オフライン オプションではダッシュボード移行のための `.json` ファイル、およびパネル クエリや検索クエリを含むあらゆる種類のクエリのための `.csv` ファイルをサポートしています。

すべての機能と制限事項については、ユーザー ガイドをご確認ください。マイグレーション アプリに関してご質問やご要望、あるいはご利用ケースがサポート対象外の場合は [migrationapps@crestdata.ai][3] までお問い合わせください。

### プラン & 価格タブ
Crest Data と今すぐ連絡を取り合い、Datadog へのストレス フリーな移行を実現しましょう！
プラットフォームに登録して移行を始めましょう。

## サポート
サポートまたは機能リクエストについては、以下の方法で Crest Data にお問い合わせください。
- **サポート メール:** [migrationapps@crestdata.ai][3]
- **セールス メール:** [datadog-sales@crestdata.ai][5]
- **ウェブサイト:** [https://www.crestdata.ai/][4]
- **ユーザー ガイド:** [Splunk から Datadog へのユーザー ガイド][2]


[1]: https://migration-app1.crestdata.ai:3000/auth/signup
[2]: https://s3.amazonaws.com/docs.crestdata.ai/datadog-migration-readme/Splunk-to-Datadog-Migration-Platform-User-Guide.pdf
[3]: mailto:migrationapps@crestdata.ai
[4]: https://www.crestdata.ai/
[5]: mailto:datadog-sales@crestdata.ai

---
このアプリケーションは Datadog Marketplace を通じて提供され、Datadog テクノロジー パートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-splunk-to-datadog-migration" target="_blank">Marketplace で本アプリケーションを購入</a>してください。