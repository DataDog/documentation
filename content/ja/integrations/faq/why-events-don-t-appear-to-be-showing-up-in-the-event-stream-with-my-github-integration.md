---

title: github とのインテグレーションで、イベントがイベントストリームに表示されないのはなぜですか？
---

まず、GitHub インテグレーションを構成する必要があります。[この専用ドキュメントの記事][1]をご覧ください。

次に、Webhook を GitHub の関連リポジトリに設定し、データを送信しているのが確認できるのに、イベントがイベントストリームに表示されない場合は、Webhook の設定に起因している可能性があります。

Webhook を content-type:application/x-www-form-urlencoded で構成するのではなく

Webhook には content-type:application/json を設定する必要があります。

{{< img src="integrations/faq/github_webhook_config.png" alt="github_webhook_config" >}}

更新すると、Datadog アプリケーションでイベントが正常に流れることが確認できるはずです。もしそうでない場合は、[当社][2]に直接ご連絡ください。

[1]: /ja/integrations/github/
[2]: /ja/help/
