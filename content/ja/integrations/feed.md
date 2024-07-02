---
"app_id": "feed"
"app_uuid": "182613d4-64f4-458a-bf1c-defc27129758"
"assets":
  "integration":
    "auto_install": false
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "14"
    "source_type_name": Feed
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- event management
- notifications
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "feed"
"integration_id": "feed"
"integration_title": "Feed"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "feed"
"public_title": "Feed"
"short_description": "Collect RSS Feed events in Datadog"
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Event Management"
  - "Category::Notifications"
  "configuration": "README.md#Setup"
  "description": Collect RSS Feed events in Datadog
  "media":
  - "caption": RSS Feed Setup
    "image_url": images/rss_setup.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": documentation
    "url": "https://docs.datadoghq.com/service_management/events/usage"
  "support": "README.md#Support"
  "title": Feed
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

{{< img src="integrations/rss/rss_event.png" alt="An RSS event in the Datadog Events Explorer" >}}

RSS Feed インテグレーションを使用すると、クラウドプロバイダーのステータスフィードや Datadog リリースノートフィードなどの RSS Feed イベントをすべて Datadog に収集することができます。RSS Feed イベントを使用すると、以下のことが可能になります。

- 新しいアクティビティや予期せぬアクティビティに対するアラートの設定
- ダッシュボードへのイベントの表示と分析
- フィードイベントについてチームで議論

## セットアップ

### インストール

構成には以下が必要です。

- RSS または ATOM フィードへの完全な URL
- フィードごとに少なくとも 1 つのカスタムタグ

Optionally, enter a username and a password to access the RSS feed.

{{< img src="integrations/rss/rss_setup.png" alt="RSS セットアップ" >}}

### 検証

Datadog で RSS フィードのアクティビティを表示するには、[イベントエクスプローラー][1]を確認してください。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Using Events][3]


[1]: https://app.datadoghq.com/event/explorer
[2]: https://docs.datadoghq.com/help/
[3]: https://docs.datadoghq.com/service_management/events/usage

