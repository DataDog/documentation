---
app_id: apptrail
app_uuid: 302b6db7-d1d6-445c-ae20-00743775cb6b
assets: {}
author:
  homepage: https://apptrail.com
  name: Apptrail
  sales_email: sales@apptrail.com
  support_email: support@apptrail.com
categories:
- ログの収集
- セキュリティ
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/apptrail/README.md
display_on_public_website: true
draft: false
git_integration_title: apptrail
integration_id: apptrail
integration_title: Apptrail
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: apptrail
public_title: Apptrail
short_description: Apptrail を使用して、すべての SaaS 監査ログを監視、分析、および警告する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Apptrail を使用して、すべての SaaS 監査ログを監視、分析、および警告する
  media:
  - caption: Apptrail は、SaaS ベンダーに代わって監査ログポータルをホストし、顧客は監査ログの表示、検索、設定、およびエクスポートを行うことができます。
    image_url: images/1-at-portal.png
    media_type: image
  - caption: Apptrail ポータルから完全な監査イベント履歴を表示し、時間やイベントのプロパティで検索、フィルタリングできます。
    image_url: images/2-at-events-history.png
    media_type: image
  - caption: Apptrail の監査イベントには、IP アドレスやカスタムイベントデータなどのコンテキスト情報とともに、記録されたアクティビティの「誰が、何を、どこで、いつ、どのように」の詳細情報が含まれています。
    image_url: images/3-at-log-detail.png
    media_type: image
  - caption: トレイルを作成し、監査ログを Datadog などの数十の宛先にリアルタイムで継続的に流し、アーカイブ、監視、分析を行うことができます。
    image_url: images/4-at-create-trail-sel.png
    media_type: image
  - caption: トレイルルールを使用して、トレイルから配信するイベントのサブセットをフィルタリングして選択します。
    image_url: images/5-at-trail-detail.png
    media_type: image
  - caption: Apptrail の監査ログは、継続的に Datadog Logs にリアルタイムでエクスポートされ、監査ログの分析、クエリ、監視を行うことが可能です。
    image_url: images/6-datadog-preview.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Apptrail
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Apptrail][1] は、包括的な SaaS 監査ログのプラットフォームです。SaaS 企業は、Apptrail を使用して、フル機能の顧客向け監査ログを自社製品に追加しています。顧客は、Apptrail を使用して、すべての SaaS ベンダーからの監査ログを表示、照会、分析、およびエクスポートすることができます。

Apptrail の監査イベントストリーミング機能 ([_トレイル_][2]) により、監査ログを数十の人気のある宛先に配信することができます。

Apptrail と Datadog のインテグレーションにより、SaaS の監査ログを Apptrail から Datadog にリアルタイムで継続的にエクスポートすることができるようになります。Datadog を使用して、SaaS 監査ログの分析、アーカイブ、監視、警告を行うことができます。

## 計画と使用

前提条件として、SaaS ベンダーから Apptrail にサインアップしている必要があります。

まずは、Apptrail Portal で配信トレイルを作成し、構成された配信先として Datadog を選択します。

### ステップ

トレイルの作成に関する一般的なドキュメントは、[トレイルの作成][3]のドキュメントをご覧ください。

1. Apptrail Portal の [**Trails**][4] ページに移動します。
2. 右上の **Create a new trail** ボタンをクリックします。
3. **トレイル名**を入力し、任意の**ルール**を構成します。
4. next をクリックし、宛先のリストから **Datadog** を選択します。
5. 使用する [Datadog **Region/Site**][5] を指定します。例えば、app.datadoghq.eu の場合は `EU`、app.datadoghq.com の場合は `US1` を指定します。
6. [Datadog API キー][6]を入力します。
7. **Create trail** をクリックしてトレイルを作成します。

### 検証

Apptrail の監査ログを Datadog で表示するには

1. **Logs** > **Live Tail** の順に移動します。
2. `source:apptrail` の設定により、Apptrail の監査ログを見ることができます。

詳しくは、[Apptrail Datadog 配信ドキュメント][7]をお読みください。

## リアルユーザーモニタリング

### 収集データ

Datadog を宛先とする Apptrail の[トレイル][2]は、構成された[トレイルルール][8]にマッチしたすべてのログを Datadog に継続的に送信します。Apptrail の監査ログのフォーマットについては、[イベントフォーマット][9]を参照してください。

## Agent

ヘルプが必要ですか？[Datadog サポート][10]または [Apptrail サポート][11]にご連絡ください。

## その他の参考資料

- [Apptrail の顧客向けドキュメント][12]
- [Apptrail Datadog ログ配信ドキュメント][7]
- [Apptrail の監査ログのフォーマット][9]
- [Apptrail イベント配信トレイル][2]

[1]: https://apptrail.com
[2]: https://apptrail.com/docs/consumers/guide/event-delivery/#trails
[3]: https://apptrail.com/docs/consumers/guide/event-delivery/working-with-trails#creating-a-trail
[4]: https://portal.apptrail.com/trails
[5]: https://docs.datadoghq.com/ja/getting_started/site/
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://apptrail.com/docs/consumers/guide/event-delivery/integrations/datadog
[8]: https://apptrail.com/docs/consumers/guide/event-delivery/working-with-trails#selecting-events-using-trail-rules
[9]: https://apptrail.com/docs/consumers/guide/event-format
[10]: https://docs.datadoghq.com/ja/help/
[11]: mailto:support@apptrail.com
[12]: https://apptrail.com/docs/consumers/guide