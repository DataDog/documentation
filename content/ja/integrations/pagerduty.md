---
categories:
- collaboration
- incidents
- notifications
custom_kind: integration
dependencies: []
description: Generate PagerDuty alerts from Datadog metrics and events.
doc_link: https://docs.datadoghq.com/integrations/pagerduty/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/mobile-incident-management-datadog/
  tag: Blog
  text: Manage incidents on the go with the Datadog mobile app
- link: https://www.datadoghq.com/blog/how-pagerduty-deploys-safely-with-datadog/
  tag: Blog
  text: How PagerDuty deploys safely with Datadog
- link: https://docs.datadoghq.com/tracing/service_catalog/integrations/#pagerduty-integration
  tag: Blog
  text: Using Integrations with Service Catalog
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_pagerduty
  tag: Terraform
  text: Create and manage the Datadog Pagerduty integration with Terraform
git_integration_title: pagerduty
has_logo: true
integration_id: ''
integration_title: PagerDuty
integration_version: ''
is_public: true
manifest_version: '1.0'
name: pagerduty
public_title: Datadog-PagerDuty インテグレーション
short_description: Datadog のメトリクスとイベントから PagerDuty アラートを生成。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< site-region region="gov" >}}
<div class="alert alert-warning">The Datadog PagerDuty integration has limited support in the Datadog for Government site. Service Catalog integration and auto-resolution from Incident Management and Workflow Automation are not supported.</div>
{{< /site-region >}}

## 概要

PagerDuty を Datadog に接続して、以下のことができます。

- ポストに `@pagerduty` をメンションすることで、ストリームからインシデントをトリガーおよび解決できます。
- インシデントやエスカレーションの発生時に、それらをストリームに表示できます。
- 誰がオンコールかのリマインダーを毎日取得できます。

## Setup

Pagerduty の [Datadog インテグレーションガイド][1]を参照してください。

{{< site-region region="us" >}}
PagerDuty を統合したら、Datadog のカスタム PagerDuty インシデントトレンドを確認できます。
{{< /site-region >}}

## Data Collected

### Metrics

PagerDuty インテグレーションには、メトリクスは含まれません。

### Events

PagerDuty のトリガーされた/解決されたイベントは[イベントエクスプローラー][2]に表示されます。

### Service Checks

PagerDuty インテグレーションには、サービスのチェック機能は含まれません。

## Troubleshooting

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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://www.pagerduty.com/docs/guides/datadog-integration-guide
[2]: https://docs.datadoghq.com/ja/events/explorer/