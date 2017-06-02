---
last_modified: 2015/07/16
translation_status: complete
language: ja
title: Datadog-Pingdom Integration
integration_title: Pingdom
kind: integration
doclevel:
---

<!-- ### Overview
{: #int-overview}

Track Pingdom downtime events and user-centric performance metrics in Datadog, for correlation with other relevant events and metrics.

At this time we track the response_time metric for any sites you configure on the Pingdom website. -->

### 概要
{: #int-overview}

Pingdomのダウンタイム·イベントやパフォーマンス·メトリックを追跡し、Datadogに送信することで、アプリケーションの他のメトリクスやイベントと連携し、インフラ全体の把握ができるようにします。

現在のインテグレーションの仕様では、Pingdomで設定した任意のサイトのresponse_timeメトリクスを追跡します。


<!-- ### Questions and Troubleshooting

**Q:** Does Datadog support transaction checks?

**A:** Pingdom does not provide an API for transaction checks, so we’re not able to show them in Datadog. The transaction monitor feature was in beta until recently, so if it becomes available we will look to support it. -->

### トラブルシュートと質問

**Q:** Datadogはトランザクションチェックをサポートしていますか。

**A:** Pingdomには、トランザクションチェックと連携するためのAPIが提供されていません。したがって、Datadog側では、トランザクションチェックに関する情報を取得し表示することが出来ません。この機能のAPIが利用可能になった時には、Datadogのインテグレーションも対応する予定です。
