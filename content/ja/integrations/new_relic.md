---
categories:
- notifications
dependencies: []
description: New Relic のメトリクスとイベントを Datadog で表示。
doc_link: https://docs.datadoghq.com/integrations/new_relic/
draft: false
git_integration_title: new_relic
has_logo: true
integration_id: new-relic
integration_title: New Relic
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: new_relic
public_title: Datadog-New Relic インテグレーション
short_description: New Relic のメトリクスとイベントを Datadog で表示。
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->

## 概要

<div class="alert alert-danger">New Relic APM インテグレーションは非推奨となり、機能が低下しています。APM メトリクスラベルは利用できません。</div>

New Relic に接続すると、イベントストリームに New Relic のアラートが表示されます。

## 計画と使用

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