---
aliases:
- /ja/monitors/faq/can-i-create-monitor-dependencies
further_reading:
- link: /monitors/
  tag: ドキュメント
  text: モニターの作成方法
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
- link: /monitors/notify/downtimes/
  tag: ドキュメント
  text: モニターをミュートするダウンタイムのスケジュール
kind: ガイド
title: モニターの依存関係を作成する
---

Datadog は[複合条件モニター][1]を完全にサポートしていますが、アラートツリーを作成する公式の方法はありません。

Webhook 通知と Datadog API によるダウンタイムスコープを組み合わせて、同様の結果を得ている Datadog のユーザーもいます。

そのための設定を大まかに言うと、次のようになります。

* アラート A はトリガーされ、`@webhook-notification` を持ちます。
* 通知は `$scope` によって [Datadog ダウンタイム API][2] に到達し、他のアラートをミュートします。
* アラート A が解決したら、別の @webhook-notification を使用して、同じ $scope からダウンタイムを削除します。
定義された [$scope][3] と重複するアクティブなダウンタイムがある場合、以前にスケジュールされたダウンタイムに影響を与える可能性があることに注意が必要です。

まず、[Webhook を作成します][4]。
{{< img src="monitors/guide/mute_demo_webhook.png" alt="mute_demo_webhook"  >}}

API エンドポイントのフルテキスト (左列の各入力ボックスの 2 つ目):

ミュート: `https://api.datadoghq.com/api/v1/downtime?api_key=XXX&application_key=XXX`

ミュート解除: `https://api.datadoghq.com/api/v1/downtime/cancel/by_scope?api_key=XXX&application_key=XXX`

そして、その両方に対応する Webhook の内容:

```json
{"scope": "$ALERT_SCOPE"}
```

次に、"Alert A" (たとえば、各利用可能ゾーンのホストのグループ化された割合に対するデータなしアラート) を作成します。
{{< img src="monitors/guide/alert_example.png" alt="alert_example"  >}}

次に、アラートメッセージで、@notify webhook を使用して、その可用性ゾーン内の後続のすべてのホストをトリガー時にミュートし、アラートが解決したときにミュートを解除するようにします。
{{< img src="monitors/guide/mute_demo_msg.png" alt="mute_demo_msg"  >}}

そのフルサンプルマークアップがこちらです。

```text
That's alot of missing data - check first to see if there is an AWS outage?
{{#is_alert}}
{{availability-zone.name}} is missing 50% of data!! ALL OTHER ALERTS FOR {{availability-zone.name}} WILL BE AUTOMUTED
@webhook-mute-ALL-monitor-scope
{{/is_alert}}

{{#is_alert_recovery}}
{{availability-zone.name}} is NO LONGER missing 50% of data!! ALL OTHER ALERTS FOR {{availability-zone.name}} ARE UNMUTED
@webhook-unmute-ALL-monitor-scope
{{/is_alert_recovery}}
```

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/create/types/composite/
[2]: /ja/api/v1/downtimes/
[3]: /ja/api/v1/downtimes/#cancel-downtimes-by-scope
[4]: https://app.datadoghq.com/account/settings#integrations/webhooks