---
"categories":
- "monitoring"
- "notification"
"ddtype": "crawler"
"dependencies": []
"description": "New Relic のメトリクスとイベントを Datadog で表示。"
"doc_link": "https://docs.datadoghq.com/integrations/new_relic/"
"draft": false
"git_integration_title": "new_relic"
"has_logo": true
"integration_title": "New Relic"
"is_public": true
"kind": "インテグレーション"
"manifest_version": "1.0"
"name": "new_relic"
"public_title": "Datadog-New Relic インテグレーション"
"short_description": "New Relic のメトリクスとイベントを Datadog で表示。"
"version": "1.0"
---

{{< img src="integrations/new_relic/newrelicdashboard.png" alt="New Relic ダッシュボード" popup="true">}}

## 概要

New Relic に接続して、以下のことができます。

- New Relic の主要メトリクス (応答時間、Apdex スコアなど) を Datadog の他のメトリクスと関連付けて表示できます。<br> **(New Relic Pro 以上のアカウントで利用可能)**
- イベントストリームに New Relic アラートを表示します。

## セットアップ

### インストール

#### イベントストリームへの New Relic アラートの表示

1. New Relic のアラート通知設定ページにある Webhook タブで、次の Webhook URL を入力します。

    ```text
    https://app.datadoghq.com/intake/webhook/newrelic?api_key=<DATADOG_API_KEY>
    ```

2. 'Custom Payload' で、'Payload Type' として JSON を選択します。

#### New Relic APM メトリクスの収集

1. New Relic の API キーページで REST API キーを見つけ (**Account Settings** -> **Integrations** -> **API Keys**)、[Datadog New Relic Integration][1] ページのフォームに入力します。
2. すべてのメトリクスに New Relic アカウント番号をタグ付けするには、アカウントタグを追加します。
3. ホストごとにメトリクスを収集するか、アプリ全体で収集するかを選択します。
    _注: このオプションを有効にすると、New Relic ホストが Datadog にインポートされます。_

{{< alert >}}
New Relic のカスタムメトリクスが Datadog に表示されるまで 5～10 分かかることがあります。
<br>最初の 5000 個までのカスタムメトリクスを自動コンプリートに使用できます。
{{< /alert >}}

## 収集データ

### メトリクス
{{< get-metrics-from-git "new_relic" >}}


### イベント

New Relic インテグレーションには、イベントは含まれません。

### サービスのチェック

New Relic インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

### 'Collect metrics by host' オプションはどのような機能ですか

これを設定すると、Datadog は、ホストスループットベースの全体平均ではなく、関連するホストごとにアプリケーションメトリクスを収集します。

たとえば、次のようにメトリクスを別々に使用すると、状況を理解できます。「ホスト X のエラー率 Y は異常で問題があるが、多数のホストでアプリケーション Z の全体的なエラー率を集計すると許容範囲である。」

このオプションを設定した場合も、New Relic ホストが Datadog Infrastructure セクションにインポートされます。

### 'Collect metrics by host' オプションを有効にしています。アプリケーションレベルのメトリクスの値が New Relic と Datadog で異なるのはなぜですか

New Relic は、ホストレベルで測定されたメトリクス (例: 応答時間) についてアプリケーションレベルの集計値を計算する際、各ホストのスループットの測定値を基に加重平均を計算します。

Datadog でこれに最も近いものは算術平均を計算する `avg` 集計関数です。これはデフォルトの集計関数でもあり、`new_relic.web_transaction.average_response_time{*}` のような最も単純なクエリから得られる結果と同じです。すべてのホストのスループットがほぼ同じであれば、Datadog の平均集計値と New Relic のスループットに基づく加重集計値は同様の数値になりますが、スループットが不均一な場合、表示されるアプリケーションレベルの集計値は New Relic と Datadog で異なります。

たとえば、3 つのホストを持つアプリケーションがあるとします。
ある時点で、各ホストは次の値を持ちます。

```text
              スループット    応答時間
hostA         305 rpm           240 ms
hostB         310 rpm           250 ms
hostC          30 rpm            50 ms
```

New Relic は、アプリケーションレベルの応答時間を次のように計算します。

```text
hostA: 240 ms x 305 rpm = 73200 合計時間
hostB: 250 ms x 310 rpm = 77500 合計時間
hostC:  50 ms x 30 rpm =  1500 合計時間

合計スループット = 305 + 310 + 30 = 645 rpm
平均応答時間 = (73200 + 77500 + 1500) ÷ 645 = 236.0 ms
```

一方、Datadog は単に算術平均を計算します。

```text
平均応答時間 = (240 + 250 + 50) ÷ 3 = 180.0 ms
```

### Beta Alerts: カスタムタグを含める方法はありますか？

New Relic の Beta Alerts 機能と "Use Custom Payload" オプションを利用することで、カスタムタグを含めることができます。これを構成するには、New Relic アカウントに移動し、画面の右上隅にある 'Alerts Beta' ボタンをクリックします。ここから、'Notification channels' セクションを選択し、Datadog に対して設定した Webhook を見つけます。ここに 'Use Custom Payload' というセクションがあります。これを選択すると、JSON ペイロードが表示されます。このペイロードを変更して、"tags" 属性を追加する必要があります。たとえば、変更後のペイロードは次のようになります。

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

変更を完了したら、必ず 'Update Chanel' を選択して変更を保存します。

[1]: https://app.datadoghq.com/account/settings#integrations/new_relic
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/new_relic/new_relic_metadata.csv

