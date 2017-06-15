---
last_modified: 2015/07/16
translation_status: complete
language: ja
title: Datadog-PagerDuty Integration
integration_title: PagerDuty
kind: integration
doclevel: basic
---

<!-- ### Overview
{:#int-overview} -->

### 概要
{:#int-overview}


<!-- Connect PagerDuty to Datadog in order to:

- Trigger and resolve incidents from your stream by mentioning @pagerduty in your post
- See incidents and escalations in your stream as they occur
- Get a daily reminder of who's on-call -->

次の目的の為に、pagerdutyのメトリクスをDatadogに送信します:

- **@paperduty** を使ってメンションすることにより、イベントストリーム上でインシデントの発動と解除
- インシデントとエスカレーションを発生順にイベントストリームで閲覧
- 毎日、オンコール担当者にリマインダーの送信


<!-- You can also check out [this documentation](http://www.pagerduty.com/docs/guides/datadog-integration-guide/) from Pagerduty.

Once you have Pagerduty integrated, you can check out our custom [Pagerduty Incident Trends](https://app.datadoghq.com/report/pagerduty).

<img src="/static/images/pagerduty_incident_trends.png" style="width:100%; border:1px solid #777777" /> -->

Pagerdutyが公開している [次のドキュメント](http://www.pagerduty.com/docs/guides/datadog-integration-guide/) も合わせて参照可能です。

インテグレーションの設定が完了すると、以下のような[Pagerduty Incident Trends](https://app.datadoghq.com/report/pagerduty)リポートを毎週emailで受信することが出来ます。

<img src="/static/images/pagerduty_incident_trends.png" style="width:100%; border:1px solid #777777" />
