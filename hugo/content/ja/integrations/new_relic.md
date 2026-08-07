---
app_id: new-relic
app_uuid: 82c7d333-a23e-44f9-a6c5-cd22fb541022
assets:
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check:
      - new_relic.application_summary.apdex_score
      - new_relic.apdex.score
      metadata_path: metadata.csv
      prefix: new_relic.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 54
    source_type_name: New Relic
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- notifications
- event management
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: new_relic
integration_id: new-relic
integration_title: New Relic
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: new_relic
public_title: New Relic
short_description: New Relic は、Web アプリケーションとモバイルアプリケーション向けのアプリケーションモニタリングサービスです。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Notifications
  - Category::Event Management
  - Offering::Integration
  configuration: README.md#Setup
  description: New Relic は、Web アプリケーションとモバイルアプリケーション向けのアプリケーションモニタリングサービスです。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: New Relic
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->

## 概要

<div class="alert alert-danger">New Relic APM インテグレーションは非推奨となり、機能が低下しています。APM メトリクスラベルは利用できません。</div>

<div class="alert alert-warning">2025 年 3 月 1 日以降、 New Relic の REST API v2 は REST API キーを受け付けなくなります。

このインテグレーションの機能を維持するには、インテグレーション設定で既存の REST API キーを User API キーに置き換えてください。</div>

New Relic に接続すると、イベントストリームに New Relic のアラートが表示されます。

## セットアップ

### イベントストリームへの New Relic アラートの表示

**New Relic** で以下の手順を実行します。

1. "Alerts & AI" タブで "Notificaton Channels" に移動します。
2. "New Notification Channel" を選択します。
3. チャンネルタイプとして "Webhook" を選択します。
4. チャンネルを "Datadog" と名付けます。
5. このベース URL を入力します:

    ```text
    https://app.datadoghq.com/intake/webhook/newrelic?api_key=<DATADOG_API_KEY>
    ```

6. "Custom Payload" をクリックし、ペイロードが JSON 形式であることを確認します。
**注:** カスタムタグを JSON で設定する手順については、次のセクションを参照してください。
7. "Create Channel" をクリックします。
8. "Alert Policies" をクリックします。
9. Datadog に送信したいアラートについて、アラートポリシーを選択します。

### 必須 Webhook フォーマット

このセクションでは、 Datadog で処理できる New Relic アラートの各種タイプと、それぞれのアラート タイプに必要なフィールドについて説明します。必須フィールドが 1 つでも欠けている場合、そのイベントは拒否され、 Event Explorer には表示されません。

#### デプロイメント通知

Webhook ペイロードに "deployment" が含まれている場合、そのイベントは INFO イベントとして扱われます。

必須フィールド:

1. created_at
2. revision
3. 説明
4. deployed_by
5. changelog

#### Alert

Webhook ペイロードに "alert" が含まれている場合、イベント タイプは short_description の内容に基づき、次のルールで判定されます:
1. SUCCESS: 説明文に "ended", "closed", "recovered" のいずれかが含まれている場合
2. INFO: 説明文に "acknowledged" が含まれている場合
3. ERROR: 上記以外のすべての場合

必須フィールド
1. short_description
2. message
3. alert_url
4. created_at
5. severity

#### デフォルト

上記の条件を満たさない場合は、 severity フィールドがアラート タイプにマッピングされます。

必須フィールド:
1. account_id
2. account_name
3. condition_id
4. condition_name
5. current_state
6. details
7. event_type
8. incident_acknowledge_url
9. targets
10. incident_id
11. incident_url
12. policy_name
13. policy_url
14. severity - このフィールドは info, warn, critical のいずれかである必要があります。イベント タイプの info, warning, error にマッピングされます。
15. タイムスタンプ


### ベータアラートにカスタムタグを含める

New Relic のベータアラート機能の "Use Custom Payload" オプションで、カスタムタグを含めることができます。これを構成するには、New Relic アカウントに移動し、画面の右上にある 'Alerts Beta' ボタンをクリックします。そして、'Notification channels' セクションを選択し、Datadog に対して設定した Webhook を見つけます。ここに 'Use Custom Payload' というセクションがあります。これを選択すると、JSON ペイロードが表示されます。このペイロードを変更して、"tags" 属性を追加する必要があります。たとえば、変更後のペイロードは次のようになります。

```json
{
    "account_id": "$ACCOUNT_ID",
    "account_name": "$ACCOUNT_NAME",
    "condition_id": "$CONDITION_ID",
    "condition_name": "$CONDITION_NAME",
    "current_state": "$EVENT_STATE",
    "details": "$EVENT_DETAILS",
    "event_type": "$EVENT_TYPE",
    "incident_acknowledge_url": "$INCIDENT_ACKNOWLEDGE_URL",
    "incident_id": "$INCIDENT_ID",
    "incident_url": "$INCIDENT_URL",
    "owner": "$EVENT_OWNER",
    "policy_name": "$POLICY_NAME",
    "policy_url": "$POLICY_URL",
    "runbook_url": "$RUNBOOK_URL",
    "severity": "$SEVERITY",
    "targets": "$TARGETS",
    "timestamp": "$TIMESTAMP",
    "tags": ["application:yourapplication", "host:yourhostname", "sometag"]
}
```

変更が完了したら、**Update Channel** を選択して変更を保存します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][1]までお問合せください。

[1]: https://docs.datadoghq.com/ja/help/