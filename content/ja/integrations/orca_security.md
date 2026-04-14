---
app_id: orca-security
app_uuid: c5503835-004d-4f4b-bf61-57845767f8e1
assets:
  dashboards:
    Orca Security - Alerts: assets/dashboards/orca_security_alerts.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 32538198
    source_type_name: Orca Security
  logs:
    source: orca_security
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
- https://github.com/DataDog/integrations-core/blob/master/orca_security/README.md
display_on_public_website: true
draft: false
git_integration_title: orca_security
integration_id: orca-security
integration_title: Orca Security
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: orca_security
public_title: Orca Security
short_description: Orca Security のアラート ログに関するインサイトを得ます。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Orca Security アラートに関するインサイトを得ます。
  media:
  - caption: Orca Security - アラート
    image_url: images/orca_security_alerts.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Orca Security
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

[Orca Security][1] は、セキュリティ リスクとコンプライアンスの問題を特定し、優先順位を付け、是正するクラウド セキュリティ プラットフォームです。リアルタイムの可視化、脆弱性管理、ワークロード保護、クラウド セキュリティ ポスチャ管理、コンプライアンス管理などの機能を提供します。
このインテグレーションは、次のログを取り込みます:

- アラート: アラートの状態、アカウントの詳細、アラートが検出されたアセット、その他の詳細などの情報が含まれます。

Orca Security インテグレーションは、Orca に組み込まれた Datadog との連携機能を使用して、アラート ログ データをシームレスに取り込みます。取り込み前にログを正規化および拡充し、データ形式を一貫させて、後続の処理や分析に役立つ情報量を高めます。すぐに使えるダッシュボードを通じて、アラート ログに関するインサイトを提供します。

## セットアップ

### 構成

#### [Datadog 向けの Orca Security の構成][2]

1. Orca Security プラットフォームにログインします。
2. **Settings** > **Connections** > **Integrations** に移動します。
3. **SIEM/SOAR** セクションで **Datadog** を選択し、**Connect** をクリックします。

   Datadog Configuration ウィンドウが開きます。
4. 以下の設定を行います:
   - **API Key** - Datadog プラットフォームの API キーを追加します。
   - **Region** - Datadog インスタンスが配置されているリージョンを選択します。
5. **Save** をクリックします。
6. Datadog Integration で **Configure** をクリックし、インテグレーションを有効にします。
7. **Automations** に移動し、**+ Create Automation** をクリックします。
8. **Automation Details** セクションで **Automation Name** を指定します。
9. **Trigger Query** セクションで、クエリ内のアラート状態の値をすべて選択します。クエリは次のようになります: `When an alert Alert State is open,in_progress,snoozed,dismissed,closed`
10. **Define Results** セクションで、Orca Security プラットフォームの既存のアラートも Datadog に転送する必要がある場合は **Apply to Existing Alerts** を有効にします。新しく生成または更新されたアラートのみを転送する場合は無効にします。   
**注**: 更新から 18 時間以上経過したアラートは Datadog に取り込むことができません。
11. **Define Results** セクション内の **SIEM/SOAR** セクションで **Datadog** にチェックを入れ、Datadog type として **Logs** を選択します。
12. **Create** をクリックします。

## 収集データ

### ログ

Orca インテグレーションは、Orca のアラート ログを収集し、Datadog に転送します。

### メトリクス

Orca インテグレーションには、メトリクスは含まれません。

### イベント

Orca インテグレーションには、イベントは含まれません。

## サポート

追加のサポートが必要な場合は、[Datadog サポート][3]にお問い合わせください。

[1]: https://docs.orcasecurity.io/docs
[2]: https://docs.orcasecurity.io/docs/integrating-datadog
[3]: https://docs.datadoghq.com/ja/help/