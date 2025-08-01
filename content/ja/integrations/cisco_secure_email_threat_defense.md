---
app_id: cisco-secure-email-threat-defense
app_uuid: 9776e6c8-2031-4dda-98b5-3628b181625b
assets:
  dashboards:
    Cisco Secure Email Threat Defense: assets/dashboards/cisco_secure_email_threat_defense.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 21617758
    source_type_name: Cisco Secure Email Threat Defense
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- security
- クラウド
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cisco_secure_email_threat_defense/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_secure_email_threat_defense
integration_id: cisco-secure-email-threat-defense
integration_title: Cisco Secure Email Threat Defense
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cisco_secure_email_threat_defense
public_title: Cisco Secure Email Threat Defense
short_description: Cisco Secure Email Threat Defense のメッセージログからインサイトを得る。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Category::Cloud
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Cisco Secure Email Threat Defense メッセージログのインサイトを取得。
  media:
  - caption: Cisco Secure Email Threat Defense
    image_url: images/cisco_secure_email_threat_defense.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cisco Secure Email Threat Defense
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[Cisco Secure Email Threat Defense][1] は、Microsoft 365 向けのクラウドネイティブな統合型セキュリティソリューションです。デプロイの簡易性、攻撃に対する修復の容易性、インバウンド、アウトバウンド、内部ユーザー間のメッセージに対する優れた可視性の提供に重点を置いています。

This integration ingests the following logs:
- メッセージ: メッセージログは、分析と監視のため、送信者、受信者、タイムスタンプ、件名、脅威関連データなど、メール通信に関する詳細情報を提供します。

Cisco Secure Email Threat Defense インテグレーションでは、すぐに使えるダッシュボードが提供されるため、Cisco Secure Email Threat Defense のメッセージログに関するインサイトを得て、必要な対応を取ることができます。また、標準の検出ルールを利用することで、潜在的なセキュリティ脅威を効果的に監視して、対応することができます。

**免責事項**: 本インテグレーションは、個人情報を含むデータを収集する可能性があり、Datadog との契約に従って使用されるものとします。Cisco は、インテグレーションを使用することで送信される、エンドユーザー情報 (個人データを含む) のプライバシー、セキュリティ、または完全性について責任を負いません。

## セットアップ

### Cisco Secure Email Threat Defense で API 認証情報を生成する

1. Cisco Secure Email Threat Defense の UI にログインします。
2. **Administration** に移動し、**API Clients** タブを選択します。
3. **Add New Client** をクリックします。
4. **Client Name** を入力し、オプションで説明を入力します。
5. **Submit** をクリックします。これにより、**クライアント ID** と **クライアント パスワード** が生成されます。
6. **API Key** セクションから API キーを取得します。

### Cisco Secure Email Threat Defense アカウントを Datadog に接続する

1. Cisco Secure Email Threat Defense の認証情報を追加します。

    | パラメーター | 説明 |
    | ---------- | ----------- |
    | Host Name | ホスト名は、Cisco Secure Email Threat Defense サーバーのあるリージョンによって決まります。詳細については、システム管理者にお問い合わせください。|
    | Client ID | Cisco Secure Email Threat Defense アカウントのクライアント ID。 |
    | Client Password | Cisco Secure Email Threat Defense アカウントのクライアントパスワード。 |
    | API Key | Cisco Secure Email Threat Defense アカウントの API キー。 |
    | Verdict Delay | イベントは、Verdict Delay で指定した時間 (分) 後に遅延取得されます。 |


2. **Save** ボタンをクリックして設定を保存します。


## 収集データ

### ログ

Cisco Secure Email Threat Defense インテグレーションは、Cisco Secure Email Threat Defense のメッセージログを収集し、Datadog に転送します。このインテグレーションにより、scam、malicious、phishing、BEC、spam、graymail、neutral の判定値を持つメッセージが取り込まれます。

**注**: イベントは、Verdict Delay で指定された時間の遅延後に取得されます。この遅延は、ログにレトロスペクティブな判定を含めるために必要です。ただし、更新に要する時間はさまざまであるため、すべてのレトロスペクティブ判定がこの時間枠内に反映される保証はありません。完全な判定情報を確認するには、Cisco Secure Email Threat Defense システムにログインしてください。

### メトリクス

Cisco Secure Email Threat Defense インテグレーションにはメトリクスは含まれていません。

### イベント

Cisco Secure Email Threat Defense インテグレーションにはイベントは含まれていません。

## サポート

追加のサポートが必要な場合は、[Datadog サポート][2]にお問い合わせください。

[1]: https://www.cisco.com/site/us/en/products/security/secure-email/index.html?dtid=osscdc000283
[2]: https://docs.datadoghq.com/ja/help/