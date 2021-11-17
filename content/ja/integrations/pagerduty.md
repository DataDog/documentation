---
categories:
  - monitoring
  - notification
ddtype: crawler
dependencies: []
description: Datadog のメトリクスとイベントから PagerDuty アラートを生成。
doc_link: https://docs.datadoghq.com/integrations/pagerduty/
draft: false
git_integration_title: pagerduty
has_logo: true
integration_id: pagerduty
integration_title: PagerDuty
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

Pagerduty の[こちらのドキュメント][1]を参照してください。

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

### モニターがリカバリしたときに、PagerDuty サービスを自動的に解決するにはどうすればよいですか

以下のように、モニターの **Say what's happening** セクションの `{{#is_recovery}}` コンテキストに、PagerDuty 通知を含める必要があります。

```text
{{#is_recovery}}

    この通知は、モニターが解決したときのみ発生します。
    @pagerduty-trigger がトリガーされアラートが発動すると、同様に解決します。

{{/is_recovery}}
```

### 複数の PagerDuty サービスが統合されている場合に、特定のサービスにメッセージ/通知を送信するにはどうすればよいですか

モニターメッセージで `@pagerduty-[serviceName]` を使用します。モニターの **Say what's happening** セクションで入力を開始すると、オートコンプリートされます。

{{< img src="integrations/pagerduty/pagerduty_faq_1.png" alt="pagerduty faq 1" popup="true">}}

### PagerDuty でアラートの説明が途切れているのはなぜですか

Datadog では、PagerDuty に送信されるモニター通知の長さに上限を設けています。上限は **1024 文字**です。

[1]: http://www.pagerduty.com/docs/guides/datadog-integration-guide
[2]: https://docs.datadoghq.com/ja/events/