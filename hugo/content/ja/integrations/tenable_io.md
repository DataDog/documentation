---
app_id: tenable-io
app_uuid: 18788ece-f752-4584-a4e9-6652eaad80b5
assets:
  dashboards:
    Tenable.io - Activity Summary: assets/dashboards/tenable_io_activity_summary.json
    Tenable.io - Vulnerability Summary: assets/dashboards/tenable_io_vulnerability_summary.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 32769000
    source_type_name: Tenable.io
  logs:
    source: tenable-io
  monitors:
    Automatic asset age out activity detected: assets/monitors/automatic_asset_age_out_activity.json
    Multiple asset deletion activities detected: assets/monitors/asset_deletion_activity.json
    Multiple user impersonation activities detected: assets/monitors/user_impersonation_activity.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- security
- コンプライアンス
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tenable_io/README.md
display_on_public_website: true
draft: false
git_integration_title: tenable_io
integration_id: tenable-io
integration_title: Tenable.io
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: tenable_io
public_title: Tenable.io
short_description: Tenable.io のログを可視化して状況を把握できます。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - カテゴリ::コンプライアンス
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Tenable.io のログを可視化して状況を把握できます。
  media:
  - caption: Tenable.io - Activity Summary
    image_url: images/tenable_io_activity_summary.png
    media_type: image
  - caption: Tenable.io - Vulnerability Summary
    image_url: images/tenable_io_vulnerability_summary.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Tenable.io
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

[Tenable.io][1] はクラウド プラットフォームで、システムやサービス全体にわたる脆弱性の発見、評価、レポート、優先度付けを幅広く支援します。資産のディスカバリーによって可視性を高め、組織のセキュリティ ポスチャを効果的に管理できるようにします。

Tenable.io インテグレーションは、次の種類のログを収集します:

- **Activity**: このエンドポイントには、ユーザー アクション、システム イベント、スキャン、セキュリティ制御タスク (権限の管理、ロールの割り当て、セキュリティ イベントの処理など) に関する情報が含まれます。
- **Vulnerability**: このエンドポイントには、脆弱性と、それに紐づく脆弱な資産に関する情報が含まれます。

このインテグレーションは、上記のソースからログを収集し Datadog に送信します。

## セットアップ

### Tenable.io で API 認証情報を生成する

1. [Tenable.io][2] アカウントにログインします。
2. プロフィール アイコンをクリックし、 **My Profile** を選択します。
3. **API Keys** セクションに移動します。
4. ページ右下の **Generate** ボタンをクリックします。
5. 警告ダイアログ ボックスのメッセージを確認し、 **Continue** をクリックして **アクセス キー** と **秘密鍵** を生成します。

### Tenable.io アカウントを Datadog に接続する

1. アクセス キーと秘密鍵を追加する
    |Parameters|Description|
    |--------------------|--------------------|
    |Access Key|Tenable.io アカウントのアクセス キー。|
    |Secret Key|Tenable.io アカウントの秘密鍵。|
2. **Save** ボタンをクリックして設定を保存します。

## 収集データ

### Logs 

Tenable.io インテグレーションはログを収集し Datadog に転送します。

### メトリクス

Tenable.io インテグレーションには、メトリクスは含まれません。

### イベント

Tenable.io インテグレーションには、イベントは含まれません。

## サポート

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://www.tenable.com/
[2]: https://cloud.tenable.com/tio/app.html#/login
[3]: https://docs.datadoghq.com/ja/help/