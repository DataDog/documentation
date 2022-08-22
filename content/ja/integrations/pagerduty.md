---
categories:
- monitoring
- notification
dependencies: []
description: Datadog のメトリクスとイベントから PagerDuty アラートを生成。
doc_link: https://docs.datadoghq.com/integrations/pagerduty/
draft: false
git_integration_title: pagerduty
has_logo: true
integration_id: ''
integration_title: PagerDuty
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: pagerduty
public_title: Datadog-PagerDuty インテグレーション
short_description: Datadog のメトリクスとイベントから PagerDuty アラートを生成。
version: '1.0'
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Datadog PagerDuty インテグレーションは、政府関係のサイトに対する Datadog の使用をサポートしていません。<b>注</b>: 監視通知を PagerDuty に送信することは可能です。</div>
{{< /site-region >}}

{{< site-region region="us" >}}
{{< img src="integrations/pagerduty/pagerduty_incident_trends.png" alt="PagerDuty インシデントトレンド" popup="true">}}
{{< /site-region >}}

## 概要

PagerDuty を Datadog に接続して、以下のことができます。

- ポストに `@pagerduty` をメンションすることで、ストリームからインシデントをトリガーおよび解決できます。
- インシデントやエスカレーションの発生時に、それらをストリームに表示できます。
- 誰がオンコールかのリマインダーを毎日取得できます。

## セットアップ

Pagerduty の [Datadog インテグレーションガイド][1]を参照してください。

{{< site-region region="us" >}}
PagerDuty を統合したら、Datadog のカスタム PagerDuty インシデントトレンドを確認できます。
{{< /site-region >}}

## 収集データ

### メトリクス

PagerDuty インテグレーションには、メトリクスは含まれません。

### イベント

トリガー/解決された PagerDuty イベントが[イベントストリーム][2]に表示されます。

### サービスのチェック

PagerDuty インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

### PagerDuty のサービスを自動で解決する

モニターが回復したときに自動的に PagerDuty サービスを解決するには、以下のようにモニターの **Say what's happening** セクションの `{{#is_recovery}}` コンテキストに PagerDuty 通知を含めます。

```text
{{#is_recovery}}

    この通知は、モニターが解決したときのみ発生します。
    @pagerduty-trigger がトリガーされアラートが発動すると、同様に解決します。

{{/is_recovery}}
```

### 特定の PagerDuty サービスに通知を送信する

複数のサービスが統合されている場合に、特定の PagerDuty サービスにメッセージや通知を送るには、モニターメッセージに `@pagerduty-[serviceName]` を使用します。これをモニターの **Say what's happening** セクションに入力し始めると、オートコンプリートされるのがわかるはずです。

{{< img src="integrations/pagerduty/pagerduty_faq_1.png" alt="pagerduty faq 1" popup="true">}}

### PagerDuty のインシデント重大度のマッピング

PagerDuty インシデントの重大度は、アラートの原因となっているモニターのステータスによって決定されます。次の表は、アラートステータスが PagerDuty インシデントの重大度にどのようにマッピングされるかを示しています。

| モニターステータス     | PagerDuty インシデント重大度             |
|--------------------|-----------------------------------------|
| `ALERT`            | `error`                                 |
| `NODATA`           | `error`                                 |
| `WARNING`          | `warning`                               |
| `OK` またはその他     | `info`                                  |

例えば、モニターが `OK` から `WARNING` に遷移し、`@pagerduty-[serviceName]` に通知した場合、作成される PagerDuty インシデントの重大度は `warning` となります。

**注**: このマッピングは自動的に行われ、変更することはできません。

### アラートの説明文の切り捨て

Datadog では、PagerDuty に送信されるモニター通知の長さに上限を設けています。上限は **1024 文字**です。

[1]: http://www.pagerduty.com/docs/guides/datadog-integration-guide
[2]: https://docs.datadoghq.com/ja/events/