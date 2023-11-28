---
further_reading:
- link: /monitors/
  tag: ドキュメント
  text: モニターの作成方法
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
kind: faq
title: Datadog で SMS 通知を送信することはできますか？
---

多くのお客様は、[Webhook インテグレーション][1]を使用して、Twilio のような SMS サービスにアラートを送信しています。詳しくは、[Webhook と Twilio で SMS アラートを送信する][2]のブログ投稿をご覧ください。

SMS アラートを送信したい番号のサービスプロバイダーによっては、メールで SMS を送信することも可能です。Datadog でこれを構成するには、アラートを送信したいデバイスの 10 桁の電話番号に続いて、対応するモバイルプロバイダーのゲートウェイを送信します。例えば、電話番号が `+1 (234) 555-0100` で、サービスプロバイダーが AT&T の場合、アラートを `2345550100@txt.att.net` に送信します。同様に、サービスプロバイダーが Orange の場合、`+44 113 496 0000` に SMS を送信するには、`1134960000@orange.net` にアラートを送信します。その他のプロバイダーについては、メールから SMS へのアドレスを調べてください。

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/webhooks/
[2]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio