---
title: 通知
disable_toc: false
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Learn more about notification options
---

## 概要

Datadog supports `@notifications` in the messages of events when [posted by the API][1]. For example:

`@all`
: オーガニゼーションの全メンバーに通知を送信します。

`@test@example.com`
: 電子メールを `test@example.com` に送信します。

`@slack-<SLACK_ACCOUNT>-<CHANNEL_NAME>`
: 指定した Slack チャンネルに、イベントやグラフを投稿します。

`@webhook`
: Webhook をアラートまたはトリガーします。[Webhooks に関するブログ記事][2]を参照してください。

詳細については、[通知][3]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /api/latest/events/#post-an-event
[2]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio
[3]: /monitors/notify/
