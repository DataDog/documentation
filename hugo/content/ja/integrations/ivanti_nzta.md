---
app_id: ivanti-nzta
app_uuid: c161337b-578b-4c24-bc14-adf35e0ee0ed
assets:
  dashboards:
    Ivanti nZTA - Alerts: assets/dashboards/ivanti_nzta_alerts.json
    Ivanti nZTA - Analytics Logs: assets/dashboards/ivanti_nzta_analytics_logs.json
    Ivanti nZTA - Applications Access: assets/dashboards/ivanti_nzta_applications_access.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 38201876
    source_type_name: Ivanti nZTA
  logs:
    source: ivanti-nzta
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- security
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ivanti_nzta/README.md
display_on_public_website: true
draft: false
git_integration_title: ivanti_nzta
integration_id: ivanti-nzta
integration_title: Ivanti nZTA
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: ivanti_nzta
public_title: Ivanti nZTA
short_description: Ivanti nZTA ログからインサイトを得る
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Ivanti nZTA ログからインサイトを得る
  media:
  - caption: Ivanti nZTA - Analytics Logs
    image_url: images/ivanti_nzta_analytics_logs.png
    media_type: image
  - caption: Ivanti nZTA - Alerts
    image_url: images/ivanti_nzta_alerts.png
    media_type: image
  - caption: Ivanti nZTA - Applications Access
    image_url: images/ivanti_nzta_applications_access.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Ivanti nZTA
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

[Ivanti nZTA][1] は、クラウドベースの SaaS ソリューションで、アプリケーションインフラ向けにゼロトラスト認証とアクセス制御を提供します。管理者はポリシーを定義して、ユーザーとデバイスの安全なアクセスを実現できます。これにより、アプリケーションの可視性、アクセス制御、堅牢なセキュリティが保証されます。

このインテグレーションは次のログを取り込みます。

- **Analytics Logs**: このエンドポイントには、Admin Logs、Access Logs、Event Logs を通じたシステムアクティビティに関する情報が含まれています。
- **Alerts**: このエンドポイントには、セキュリティリスクや設定変更など、Ivanti nZTA によってトリガーされたアラートに関する情報が含まれています。
- **Application Access**: このエンドポイントには、ユーザーがアクセスしたアプリケーションに関する情報が含まれています。

This integration collects logs from the sources listed above and sends them to Datadog for analysis with our Log Explorer and Cloud SIEM products

- [Log Explorer][2]
- [Cloud SIEM][3]

## セットアップ

### Ivanti nZTA で API 認証情報を作成する

#### 新しい管理者ユーザーの作成

1. Ivanti nZTA プラットフォームにログインします。
2. **Secure Access** > **Manage Users** に移動します。
3. **Authentication Servers** タブに移動します。
4. **Admin Auth** で **Create User** をクリックし、次の情報を入力します。
   - **Full Name**: 識別可能な、わかりやすい名前を入力します。
   - **User Name**: 一意のユーザー名を入力します。
   - **Password**: 強力なパスワードを入力します。
   - **Confirm Password**: パスワードを再入力します。
5. **Temporary password** チェックボックスのチェックを外します。
6. Click **Create User**.

**注**: スムーズな実行を確保するために、UI ログインではなく、このインテグレーション専用に新たに作成した管理者ユーザーを使用してください。

#### ホストの特定

1. Ivanti nZTA のホストを特定するには、Ivanti nZTA プラットフォームの URL を確認します。
   <br>**例**: `example.pulsezta.net`

### Ivanti nZTA アカウントを Datadog に接続する

1. Host、Username、Password を追加します。

   | パラメーター | 説明                                             |
   | ---------- | ------------------------------------------------------- |
   | Host       | Ivanti nZTA プラットフォームのホスト                  |
   | Username   | Ivanti nZTA プラットフォームのテナント管理者のユーザー名 |
   | Password   | Ivanti nZTA プラットフォームのパスワード              |

2. **Save** をクリックします。

## 収集データ

### ログ

Ivanti nZTA インテグレーションは、アナリティクスログ、アラート、アプリケーションアクセスログを収集して Datadog に転送します。

### メトリクス

Ivanti nZTA インテグレーションにはメトリクスは含まれません。

### サービスチェック

Ivanti nZTA インテグレーションにはサービスチェックは含まれません。

### イベント

Ivanti nZTA インテグレーションにはイベントは含まれません。

## サポート

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://www.ivanti.com/products/ivanti-neurons-zero-trust-access
[2]: https://docs.datadoghq.com/ja/logs/explorer/
[3]: https://www.datadoghq.com/product/cloud-siem/
[4]: https://docs.datadoghq.com/ja/help/