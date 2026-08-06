---
disable_toc: false
further_reading:
- link: /monitors/notify/
  tag: ドキュメント
  text: 通知オプションについて
title: 通知
---

## 概要

Datadog は、[API で送信された場合][1]、イベント メッセージ内で `@notifications` をサポートします。例:

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


[1]: /ja/api/latest/events/#post-an-event
[2]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio
[3]: /ja/monitors/notify/