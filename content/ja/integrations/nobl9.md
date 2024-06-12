---
app_id: nobl9
app_uuid: 678f6805-2038-4705-80b3-de7cc143baef
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: nobl9.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10230
    source_type_name: Nobl9
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Nobl9
  sales_email: support@nobl9.com
  support_email: support@nobl9.com
categories:
- メトリクス
- notifications
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/nobl9/README.md
display_on_public_website: true
draft: false
git_integration_title: nobl9
integration_id: nobl9
integration_title: Nobl9
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: nobl9
public_title: Nobl9
short_description: Nobl9 は、SLI 収集、SLO 計算、エラーバジェットアラートを可能にします
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Notifications
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Nobl9 は、SLI 収集、SLO 計算、エラーバジェットアラートを可能にします
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nobl9
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要
Nobl9 は、リアルタイムで過去の SLO レポートを提供する SLO プラットフォームです。Nobl9 は、Datadog と統合して SLI メトリクスを収集し、SLO 目標に対して測定することができます。Nobl9 は許容しきい値のエラーバジェットを計算するため、エラーバーンレートが高すぎる場合や超過している場合にワークフローやアラートを起動させることができます。

Datadog Nobl9 との連携で、以下のことが可能になります。

- モニタリングデータでビジネスの文脈を伝える
- 信頼性目標の設定と測定
- エラーバジェットで設定された優先順位と活動を整合させる

### SLO グリッドビュー
![SLO グリッドビュー][1]

### SLO 詳細
![詳細][2]

### SLO レポート
![SLO レポート][3]

### サービスヘルスダッシュボード
![サービスヘルスダッシュボード][4]

## 計画と使用

構成はすべて Nobl9 SLO Platform 上で行われます。

1. データソースに接続するための Datadog API エンドポイントを、`https://api.datadoghq.com/` または `https://api.datadoghq.eu/` (必須) のいずれかを追加します。
2. **Project** 名を入力します。このフィールドは、複数のユーザーが複数のチームまたはプロジェクトにまたがっている状況を想定しています。空欄にすると、デフォルト値が表示されます。
3. **Display Name** は、**Name** フィールドに名前が入力されると自動的に表示されます。
4. データソースの名前を入力します (必須)。メタデータ名は各プロジェクト内で一意であり、いくつかの RFC や DNS 名と照合して検証されます。データソース名には、小文字の英数字とダッシュのみを含める必要があります。例: `my-datadog-data-source`
5. 説明文を入力します (任意)。チームまたは所有者の詳細を追加し、この特定のデータソースを作成した理由を説明します。説明文は、どのチームメンバーに対しても即座にコンテキストを提供します。

Nobl9 プラットフォームでの SLO 作成の詳細については、Nobl9 の[ユーザーガイド][5]を参照してください。

## ヘルプ

ヘルプが必要ですか？[Nobl9 サポート][6]または [Datadog サポート][7]にお問い合わせください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nobl9/images/grid_view.jpg
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nobl9/images/slo_detail.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nobl9/images/slo_report.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nobl9/images/service_health.png
[5]: https://nobl9.github.io/techdocs_User_Guide/#service-level-objectives-38
[6]: https://nobl9.com/about/#contact
[7]: https://docs.datadoghq.com/ja/help/