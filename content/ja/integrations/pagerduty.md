---
categories:
- monitoring
- notification
dependencies: []
description: Datadog のメトリクスとイベントから PagerDuty アラートを生成。
doc_link: https://docs.datadoghq.com/integrations/pagerduty/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/mobile-incident-management-datadog/
  tag: ブログ
  text: Datadog モバイルアプリで外出先からインシデントを管理
- link: https://www.datadoghq.com/blog/how-pagerduty-deploys-safely-with-datadog/
  tag: ブログ
  text: Datadog で PagerDuty を安全にデプロイする方法
- link: https://docs.datadoghq.com/tracing/service_catalog/integrations/#pagerduty-integration
  tag: ブログ
  text: サービスカタログとのインテグレーションを利用する
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
<div class="alert alert-warning">Datadog PagerDuty インテグレーションは、Datadog for Government サイトをサポートしていません。<b>注</b>: PagerDuty にモニター通知を送信することは可能です。</div>
{{< /site-region >}}

## 概要

PagerDuty を Datadog に接続することで、以下のことが可能になります。

- 自分の投稿に `@pagerduty` と記載することで、自分のストリームからインシデントをトリガーし、解決する
- インシデントやエスカレーションが発生した際、ストリームで確認する
- オンコール担当者のリマインダーを毎日受け取る

## セットアップ

Pagerduty の [Datadog インテグレーションガイド][1]をご参照ください。

{{< site-region region="us" >}}
Pagerduty をインテグレーションしたら、Datadog のカスタム Pagerduty Incident Trends をチェックすることができます。
{{< /site-region >}}

## 収集したデータ

### メトリクス

PagerDuty インテグレーションには、メトリクスは含まれていません。

### イベント

PagerDuty のトリガー/解決されたイベントは、[イベントエクスプローラー][2]に表示されます。

<div class="alert alert-warning">PagerDuty Webhooks V3 は、Datadog Incident App にのみイベントを送信します。</div>

### サービスのチェック

PagerDuty インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

### 特定の PagerDuty サービスに通知を送信する

複数のサービスが統合されている場合に、特定の PagerDuty サービスにメッセージや通知を送るには、モニターメッセージに `@pagerduty-[serviceName]` を使用します。これをモニターの **Say what's happening** セクションに入力し始めると、オートコンプリートされるのがわかるはずです。

{{< img src="integrations/pagerduty/pagerduty_faq_1.png" alt="pagerduty faq 1" popup="true">}}

モニターが回復するとき、通知ハンドルをモニター回復メッセージに含めると、自動的に Pagerduty サービスを解決しますが、`{{#is_alert}}` コンテキストにのみ含まれている場合は解決しません。

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



{{< partial name="whats-next/whats-next.html" >}}

[1]: http://www.pagerduty.com/docs/guides/datadog-integration-guide
[2]: https://docs.datadoghq.com/ja/events/explorer/