---
algolia:
  subcategory: Marketplace インテグレーション
app_id: rapdev-box
app_uuid: 3de78642-7136-41a8-9df9-48d65ed46251
assets:
  dashboards:
    RapDev Box Overview: assets/dashboards/rapdev_box_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.box.users.count
      metadata_path: metadata.csv
      prefix: rapdev.box.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10278
    source_type_name: RapDev Box
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- クラウド
- ログの収集
- マーケットプレイス
- メトリクス
- notifications
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_box
integration_id: rapdev-box
integration_title: Box
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_box
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.box
  product_id: box
  short_description: ユーザー 1 人あたりの単価
  tag: user_login
  unit_label: Box 登録ユーザー
  unit_price: 1
public_title: Box
short_description: Box エンタープライズユーザーとストレージの監視
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Log Collection
  - Category::Marketplace
  - Category::Metrics
  - Category::Notifications
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Box エンタープライズユーザーとストレージの監視
  media:
  - caption: Box インテグレーション概要ダッシュボード - 概要
    image_url: images/dashboard_overview_1_4.jpg
    media_type: image
  - caption: Box インテグレーション概要ダッシュボード - ユーザー
    image_url: images/dashboard_overview_2_4.jpg
    media_type: image
  - caption: Box インテグレーション概要ダッシュボード - ストレージ
    image_url: images/dashboard_overview_3_4.jpg
    media_type: image
  - caption: Box インテグレーション概要ダッシュボード - ログ
    image_url: images/dashboard_overview_4_4.jpg
    media_type: image
  - caption: Box の UI 例
    image_url: images/box_ui_16_9.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Box
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->

## 概要
このインテグレーションは、[Box エンタープライズアカウント](https://box.com/)のユーザーストレージに関するメトリクスをレポートし、`admin_logs_streaming` エンドポイントを使用して Box 管理者ログを収集するものです。以下のトリガーはログとして Datadog に送信されます。
 + [ユーザーソースオブジェクト](https://developer.box.com/guides/events/event-triggers/event-source/#user-source-object)
 + [シールドイベント](https://developer.box.com/guides/events/event-triggers/shield-alert-events/)
 + [サインイベント](https://developer.box.com/guides/events/event-triggers/sign-events/)
### データセキュリティ
このインテグレーションは、Box エンタープライズアカウントのユーザーに関するストレージメトリクスを収集します。
以下のメトリクスを送信します。
```
rapdev.box.users.count
rapdev.box.users.storage.max
rapdev.box.users.storage.used
```
### ワークフローの自動化
このインテグレーションは、`admin_logs_streaming` エンドポイントを使用して Box 管理者ログを収集します。
以下のトリガーは、ログとして Datadog に送信されます。
 + [ユーザーソースオブジェクト](https://developer.box.com/guides/events/event-triggers/event-source/#user-source-object)
 ```
 {
  "source": {
    "id": 11446498,
    "type": "user",
    "address": "900 Jefferson Ave, Redwood City, CA 94063",
    "avatar_url": "https://www.box.com/api/avatar/large/181216415",
    "created_at": "2012-12-12T10:53:43-08:00",
    "job_title": "CEO",
    "language": "en",
    "login": "ceo@example.com",
    "max_upload_size": 2147483648,
    "modified_at": "2012-12-12T10:53:43-08:00",
    "name": "Aaron Levie",
    "notification_email": {
      "email": "notifications@example.com",
      "is_confirmed": true
    },
    "phone": 6509241374,
    "space_amount": 11345156112,
    "space_used": 1237009912,
    "status": "active",
    "timezone": "Africa/Bujumbura"
  }
}
 ```
 + [シールドイベント](https://developer.box.com/guides/events/event-triggers/shield-alert-events/)
 ```
 {
  "source":null,
  "created_by":{
    "type":"user",
    "id":"2",
    "name":"Unknown User",
    "login":""
  },
  "action_by":null,
  "created_at":"2019-12-20T11:38:56-08:00",
  "event_id":"97f1b31f-f143-4777-81f8-1b557b39ca33",
  "event_type":"SHIELD_ALERT",
  "ip_address":"10.1.2.3",
  "type":"event",
  "session_id":null,
  "additional_details":{
    "..."
  }
}
 ```
 + [サインイベント](https://developer.box.com/guides/events/event-triggers/sign-events/)
 ```
 "additional_details": {
    "sign_request": {
        "sign_request_id": "123e4567-e89b-12d3-a456-426614174000",
        "sign_request_short_id": "426614174000",
        "status": "sent",
        "signer_ip_address": null,
        "requestor_ip_address": "",
        "files": [
            {
                "id": "1234567890",
                "type": "file",
                "name": "example_doc.pdf",
                "parent": {
                    "id": "987654321",
                    "type": "folder"
                }
            }
        ],
        "requestor": {
            "id": "13579246",
            "type": "user",
            "name": "John Doe",
            "login": "johndoe@box.com"
        },
        "signer": null,
        "template": {
            "id": "987abC5423",
            "template_type": "Signing",
            "name": "Work Contact"
        },
        "batch_send": {
            "id": "W23YVL46"
        },
        "sender_message": {
            "subject": "Can you please sign this document?",
            "message": "This document shows the terms agreed to on the phone."
        },
        "forward": null
    }
}
 ```
### ライブラリ
このインテグレーションは、**Box Integration Overview** という名前のすぐに使えるダッシュボードを提供します。ダッシュボードは、メトリクスとログが収集されると、ポップアップ表示されます。

Agent がログを収集するためには、メインの `datadog.yaml` ファイルで `logs_enabled: true` を設定します。

## Agent
サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから RapDev.io にお問い合わせください。
- サポート: support@rapdev.io
- セールス: sales@rapdev.io
- チャット: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- 電話: 855-857-0222
---
ボストンより ❤️ を込めて
*お探しのインテグレーションが見つかりませんか？組織に役立つ重要なツールの導入をお考えですか？[こちら](mailto:support@rapdev.io)から RapDev へメッセージをお送りいただければ、導入をサポートいたします！*

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/rapdev-box" target="_blank">こちらをクリック</a>してください。