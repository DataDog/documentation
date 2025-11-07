---
algolia:
  subcategory: Marketplace インテグレーション
app_id: crest-data-systems-new-relic-to-datadog-migration
app_uuid: 2eaea6a4-6c8e-43b9-9b93-f9ef818f7795
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
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_newrelic_to_datadog_migration
integration_id: crest-data-systems-new-relic-to-datadog-migration
integration_title: New Relic から Datadog への移行アプリ
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: crest_data_systems_newrelic_to_datadog_migration
pricing:
- includes_assets: true
  private_offer_only: true
  product_id: new-relic-to-datadog-migration
  short_description: 数分で New Relic から Datadog へ移行
  unit_price: null
public_title: New Relic から Datadog への移行アプリ
short_description: 自動化ツールで New Relic から Datadog への移行をシームレスに実現します。
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
  description: 自動化ツールで New Relic から Datadog への移行をシームレスに実現します。
  media:
  - caption: Migrated Dashboard
    image_url: images/All-combined.png
    media_type: image
  - caption: New Relic から Datadog への構成
    image_url: images/NR-DD-Configuration.png
    media_type: image
  - caption: New Relic から Datadog へのデータ モデル マッピング
    image_url: images/NR-DD-Datamodel-mapping.png
    media_type: image
  - caption: New Relic から Datadog へのリスト
    image_url: images/NR-DD-App-list.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: New Relic から Datadog への移行アプリ
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

New Relic から Datadog への移行アプリは、New Relic のダッシュボードとクエリを Datadog 相当へ自動変換します。メタデータを Datadog 専用のダッシュボードとクエリに自動翻訳することで、移行作業を容易かつ高速化します。

- [登録はこちら][5]

### 利益

- **自動化された移行**: 数週間から数か月かかっていた New Relic のデータを、わずか数分で Datadog に移行でき、貴重な時間とリソースを節約します。
- **シームレスな移行**: 重要なワークフローを維持しながら、New Relic から Datadog へ中断なくスムーズに切り替えます。
- **迅速な導入**: 最小限の手間で Datadog の強力な可視化機能をすぐに活用できます。

### 主な特徴
- **自動変換:** New Relic 固有のダッシュボード、チャート、グラフを Datadog 互換形式へ自動翻訳します。
- **クエリ変換:** New Relic のクエリを Datadog のクエリ言語に変換し、データを正確に再現します。
- **詳細アセスメント レポート:** 自動変換可能なクエリ数やパネル数を示す評価レポートを提供し、移行範囲と効率を事前に把握できます。
- **フィールド マッピングの自動化:** New Relic と Datadog のフィールド名を整合させ、標準化と一貫性を確保します。
- **成果報酬型課金:** 移行に成功したパネルとクエリのみに課金するため、費用対効果が高まります。

本移行アプリが自動化するのはダッシュボードやクエリなどのメタデータのみです。ご利用前に、各種ソースから Datadog プラットフォームへ必要なデータを取り込んでおいてください。New Relic と同等のデータが Datadog アカウントに存在することが、可視化をスムーズに移行するうえで重要です。

**データ プライバシー保証:** Crest Data は、New Relic および Datadog 環境内の実データへアクセスしません。接続されたメタデータのみを扱い、実データを取得・処理しないことで、データ プライバシーとセキュリティを確保します。

リモート オプションでは、API キーを入力してダッシュボード詳細を取得し、移行を実施できます (ダッシュボード移行をサポート)。オフライン オプションでは、ダッシュボードは `.json`、パネル/検索クエリは `.csv` のファイルを使用して移行できます。

機能と制限の全一覧は [Crest ユーザー ガイド][3]を参照してください。移行アプリに関するご質問や、サポート対象外のユースケースについては [migrationapps@crestdata.ai][2] までお問い合わせください。

## サポート
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから Crest Data にお問い合わせください。
- **サポート メール:** [migrationapps@crestdata.ai][2]
- **営業 メール:** [datadog-sales@crestdata.ai][4]
- **Web サイト:** [https://www.crestdata.ai/][1]
- **ユーザー ガイド:** [New Relic から Datadog へのユーザー ガイド][3]


[1]: https://www.crestdata.ai/
[2]: mailto:migrationapps@crestdata.ai
[3]: https://s3.amazonaws.com/docs.crestdata.ai/datadog-migration-readme/New-Relic-to-Datadog-Migration-Platform-User-Guide.pdf
[4]: mailto:datadog-sales@crestdata.ai
"[5]: https://migration-app2.crestdata.ai:3000/auth/signup
---"
本アプリケーションは Datadog Marketplace で提供されており、Datadog テクノロジー パートナーによってサポートされています。ご利用になるには、<a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-new-relic-to-datadog-migration" target="_blank">Marketplace で本アプリケーションを購入</a>してください。