---
app_id: trend-micro-email-security
app_uuid: 0f19a81b-93c1-477a-ad5d-bbabed937f85
assets:
  dashboards:
    Trend Micro Email Security - Mail Tracking: assets/dashboards/trend_micro_email_security_mail_tracking.json
    Trend Micro Email Security - Policy Events: assets/dashboards/trend_micro_email_security_policy_events.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 18089572
    source_type_name: Trend Micro Email Security
  logs:
    source: trend-micro-email-security
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- security
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/trend_micro_email_security/README.md
display_on_public_website: true
draft: false
git_integration_title: trend_micro_email_security
integration_id: trend-micro-email-security
integration_title: Trend Micro Email Security
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: trend_micro_email_security
public_title: Trend Micro Email Security
short_description: Trend Micro Email Security のログからインサイトを得る。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Trend Micro Email Security のログからインサイトを得る。
  media:
  - caption: Trend Micro Email Security - Mail Tracking
    image_url: images/trend_micro_email_security_mail_tracking.png
    media_type: image
  - caption: Trend Micro Email Security - Policy Events
    image_url: images/trend_micro_email_security_policy_events.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Trend Micro Email Security
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[Trend Micro Email Security][1] は、フィッシング、ランサムウェア、ビジネス メール詐欺 (BEC) 攻撃を阻止するクラウド ベースのソリューションです。このソリューションは、機械学習、サンドボックス分析、データ ロス プリベンション (DLP) などのクロス ジェネレーションの脅威対策技術の組み合わせを使用して、あらゆる種類のメールの脅威を阻止します。

This integration ingests the following logs:

- ポリシー イベントと検出: これらのログは、ポリシー イベントと検出に関する情報を提供し、潜在的なセキュリティ脅威を効果的に監視し、対応できるようにします。
- メール トラッキング: これらのログは、受信許可およびブロックされたトラフィックを含むメール アクティビティに関する情報を提供し、システムを通過したメール メッセージを追跡して、配信状況を監視できるようにします。

すぐに使えるダッシュボードを使用して、メール トラフィック分析、リアルタイムの脅威検出、セキュリティの検出と観測、コンプライアンス監視に関する詳細なインサイトを可視化します。

## セットアップ

### Trend Micro Email Security で API 資格情報を生成する

1. Trend Micro Email Security 管理コンソールにログオンします。
2. **Administration** > **Service Integration** > **API Access** に移動します。
3. **Add** をクリックして API Key を生成します。
4. **Log Retrieval** タブに切り替え、ログ取得の **status** が有効になっていることを確認します。
5. お使いの Trend Micro Email Security の **Host Region** を特定するには、こちらの [リンク][2] を参照してください。
6. **Username** は Trend Micro Email Security コンソールの **Login ID** です。

### Trend Micro Email Security アカウントを Datadog に接続する

1. Host Region、Username、API Key を追加します。
    | パラメーター  | 説明                                                           |
    | ----------- | --------------------------------------------------------------------- |
    | Host Region | Trend Micro Email Security 管理コンソールのリージョン。 |
    | Username | Trend Micro Email Security 管理コンソールのユーザー名。 |
    | API Key | Trend Micro Email Security 管理コンソールの API キー。 |

2. **Save** ボタンをクリックして設定を保存します。

## 収集データ

### ログ

Trend Micro Email Security インテグレーションは、ポリシー イベントと検出情報およびメール トラッキングを収集して Datadog に転送します。

### メトリクス

Trend Micro Email Security インテグレーションにはメトリクスは含まれません。

### イベント

Trend Micro Email Security インテグレーションにはイベントは含まれません。

## サポート

さらなるサポートが必要な場合は、[Datadog サポート][3] までお問い合わせください。

[1]: https://www.trendmicro.com/en_in/business/products/user-protection/sps/email-and-collaboration/email-security.html
[2]: https://success.trendmicro.com/en-US/solution/KA-0016673#:~:text=Trend%20micro%20email%20security
[3]: https://docs.datadoghq.com/ja/help/