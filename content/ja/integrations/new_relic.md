---
categories:
- monitoring
- notification
ddtype: クローラー
dependencies: []
description: New Relic のメトリクスとイベントを Datadog で表示
doc_link: https://docs.datadoghq.com/integrations/new_relic/
git_integration_title: new_relic
has_logo: true
integration_title: New Relic
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: new_relic
public_title: Datadog-New Relic インテグレーション
short_description: New Relic のメトリクスとイベントを Datadog で表示
version: '1.0'
---

{{< img src="integrations/new_relic/newrelicdashboard.png" alt="New Relic Dashboard"  >}}

## 概要

New Relic に接続して、以下のことができます。

* New Relic のキーメトリクス (応答時間、Apdex スコアなど) を Datadog の他のメトリクスと関連付けて表示できます。<br> **(New Relic Pro アカウント以上で利用可能)**
* イベントストリームに New Relic アラートを表示できます。

## セットアップ
### インストール
#### イベントストリームへの New Relic アラートの表示

1.  New Relic のアラート通知設定ページにある Webhook タブで、次の Webhook URL を入力します。
`https://app.datadoghq.com/intake/webhook/newrelic?api_key={YOUR_DATADOG_API_KEY}`

2.  'Custom Payload' で、'Payload Type' として JSON を選択します。

#### New Relic APM メトリクスの収集

1.  New Relic の API キーページで REST API キーを見つけ (**Account Settings** -> **Integrations** -> **API Keys**)、[Datadog New Relic Integration][1] ページのフォームに入力します。

2.  すべてのメトリクスに New Relic アカウント番号をタグ付けするには、アカウントタグを追加します。

3.  ホストごとにメトリクスを収集するか、アプリ全体で収集するかを選択します。
    注: このオプションを有効にすると、New Relic ホストが Datadog にインポートされます。

<div class="alert alert-warning">
New Relic のカスタムメトリクスが Datadog に表示されるまで 5 ～ 10 分かかる場合があります。
</div>

## 収集データ
### メトリクス
{{< get-metrics-from-git "new_relic" >}}


### イベント
New Relic インテグレーションには、イベントは含まれません。

### サービスのチェック
New Relic インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

### 'Collect metrics by host' オプションはどのような機能ですか

これを設定すると、Datadog は、ホストスループットベースの全体平均ではなく、
関連するホストごとにアプリケーションメトリクスを収集します。

これは、たとえば次のように、これらのメトリクスを別々に使用する場合には意味があります。
"「ホスト X のエラー率 Y は異常な値で問題があるが、多数のホストにまたがる
アプリケーション Z 全体のエラー率を集計すると許容範囲である。」

このオプションを設定した場合も、New Relic ホストが Datadog Infrastructure セクションにインポートされます。

### 'Collect metrics by host' オプションを有効にしています。アプリケーションレベルのメトリクスの値が New Relic と Datadog で異なるのはなぜですか

New Relic は、ホストレベルで計測されたメトリクス (例: 応答時間) から
アプリケーションレベルの集計値を計算する際に、各ホストの
スループットの測定値に基づいて加重付き平均を計算します。

Datadog でこれに最も近いものは `avg` 集計関数ですが、
これは値の算術平均を計算します。これはデフォルトの集計関数でもあり、
`new_relic.web_transaction.average_response_time{*}` のような
最も単純なクエリから得られる結果と同じです。すべてのホストの
スループットがほぼ同じであれば、Datadog の平均による集計値と NR のスループットに基づく
加重付きの集計値は似たような数値になりますが、スループットが
不均一であると、アプリケーションレベルの集計値は
NR と Datadog で異なって表示されます。

たとえば、3 つのホストを持つアプリケーションがあるとします。
ある時点で、各ホストは次の値を持ちます。

               スループット    応答時間
    hostA         305 rpm           240 ms
    hostB         310 rpm           250 ms
    hostC          30 rpm            50 ms

New Relic は、アプリケーションレベルの応答時間を次のように計算します。

    hostA の合計時間: 240 ms * 305 rpm = 73200
    hostB の合計時間: 250 ms * 310 rpm = 77500
    hostC の合計時間:  50 ms *  30 rpm =  1500

    スループットの合計 = 305 + 310 + 30 = 645 rpm
    平均応答時間 = (73200 + 77500 + 1500) / 645 = 236.0 ms

一方、Datadog は単に算術平均を計算します。

    平均応答時間 = (240 + 250 + 50) / 3 = 180.0 ms

### Beta Alerts: カスタムタグを含める方法はありますか

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


{{< get-dependencies >}}
