---
app_id: sentry
app_uuid: c5e6ea68-6042-405f-abda-1e4fced494ee
assets:
  integration:
    auto_install: true
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 56
    source_type_name: Sentry
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- collaboration
- issue tracking
- event management
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: sentry
integration_id: sentry
integration_title: Sentry
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sentry
public_title: Sentry
short_description: Datadog イベントストリームで Sentry の例外を参照。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::コラボレーション
  - Category::問題の追跡
  - Category::Event Management
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog イベントストリームで Sentry の例外を参照。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/datadog-sentry-integration-collaborative-bug-fixing/
  support: README.md#Troubleshooting
  title: Sentry
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Sentry は従来の Webhook 統合を非推奨とし、現在は Webhook を使用して外部システムにイベントを転送する方法として **Sentry Internal Integrations** の利用を推奨しています。

Datadog にイベントを転送するには、Sentry で Webhook 統合を直接設定する必要があります。この設定により、Sentry は組織でサポートされている任意の公開エンドポイントにイベントを送信できるようになります。

より詳しい情報とセットアップ方法については、[Sentry の公式ドキュメント][1]を参照してください。

Datadog intake URL (ログまたはイベント用) は、[Datadog API ドキュメント][2]または Datadog のアカウント設定で確認できます。

## 従来の Webhook

以前に Sentry の従来の Webhook 統合を設定していた場合、当面は引き続き機能する可能性があります。ただし、今後のすべての新しい Webhook 設定では **Sentry Internal Integrations** を使用する必要があります。

## セットアップ

### 設定

## ステップ 1: Webhook Forwarder をデプロイする

Sentry の Webhook には、カスタムヘッダーを含めることができません。インフラストラクチャー上に、以下の機能を持つ簡易的なサービスをデプロイする必要があります。

- Sentry から送信される Webhook の POST リクエストを受け付ける
- 必要な認証ヘッダーを追加する
- ペイロードを宛先に転送する

詳しくは [Sentry 公式ドキュメント][1]をご覧ください。

## ステップ 2: Sentry で Internal Integration を作成する

1. **Settings > Developer Settings > Internal Integrations** に移動します。

2. **Create New Internal Integration** をクリックします。

3. Fill in:

   - **Name**: Alert Forwarder
   - **Webhook URL**: デプロイしたサービスの公開 URL
   - **Alert Rule Action** を有効にします

4. 権限を設定します:

   - **Issue & Event**: 読み取り専用
   - **Alerts**: 読み取り専用

5. Webhook トリガーを有効にします:

   - `issue`
   - `error`

6. **Save** をクリックします。

7. オプションで、プロキシがトークンベースの認証に対応している場合は、トークンを生成します。

## ステップ 3: アラート ルールを作成する

1. **Project Settings > Alerts > Issue Alerts** に移動します。

2. 新しいアラート ルールを作成します:

   - **WHEN**: 新しい issue が作成されたとき
   - (オプション) フィルターを追加します
   - **THEN**: Internal Integration を使って通知を送信する
   - 必要に応じて、頻度と通知間隔を設定します

3. **Send Test Notification** オプションを使用して、セットアップを確認します。

## ステップ 4: 受信を確認する

構成の完了後:

- 転送されたアラートについて、転送先のシステムを監視します。
- ペイロードの構造と内容が想定どおりであることを確認します。
- プロキシからのログを使用して、配信の問題をデバッグします。

アラートが表示されない場合:

- プロキシが公衆インターネットから到達可能であることを確認します。
- 認証ヘッダーが正しく追加されているかどうかを検証します。
- **Developer Settings > Internal Integrations > Your Integration > Logs** で Sentry の Webhook ログを確認します。

## サポート

Sentry の Webhook 統合の構成について質問がある場合や、問題が発生した場合は、Sentry サポートに直接お問い合わせください:  
[https://support.sentry.io][3]

[1]: https://docs.sentry.io/organization/integrations/integration-platform/webhooks/
[2]: https://docs.datadoghq.com/ja/api/latest/logs/#send-logs
[3]: https://support.sentry.io