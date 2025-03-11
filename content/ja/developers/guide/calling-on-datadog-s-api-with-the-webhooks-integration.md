---
aliases:
- /ja/developers/faq/calling-on-datadog-s-api-with-the-webhooks-integration
title: Webhooks インテグレーションを使用した Datadog API の呼び出し
---

[Webhooks インテグレーション][1]を使用して、Datadog のモニターやイベントから Webhook をトリガーできます。これは、カスタムコミュニケーションツールを使用したり、[モニターアラートをテキストメッセージに転送して][2]、Datadog アカウントからチームに連絡する場合に便利です。

さらに、[Datadog の API][3] を呼び出すように Webhook 通知をセットアップすることもできます。たとえば、モニターがトリガーされるたびにメトリクスやイベントを Datadog アカウントに送信できます。

## 使用方法

Webhook をセットアップするには、名前 (モニターで参照される) と URL (Webhook によって ping される) を指定する必要があります。Datadog API の呼び出しを送信する場合は、「Use custom payload」を選択し、次のフィールドにカスタムペイロードを追加します。

* **name フィールド**: 他の Webhook 名フィールドと重複しない一意の名前。

* **url フィールド**: API を ping する際に使用される URL。次のようになります。
`https://api.datadoghq.com/api/v1/<API_ENDPOINT>?api_key=<DATADOG_API_KEY>`

* **custom payload フィールド**: API 呼び出しに使用されるすべてのオプションを格納した JSON。API 呼び出しの種類に応じて適切なオプションが決まります。モニターの `$symbol` コンテンツを使用してオプション値の一部に入力することができます。

## 例

チームのメンバーが、実行中にそのときどきのカウントを確認したいと思うような一連のモニターがあるとします。知りたいのは、いくつのモニターが OK ステータスで、いくつのモニターが CRITICAL ステータスかということです。そのために、これらのモニターのいずれかがアラート状態、または OK 状態になるたびに「check_run」API 呼び出しを送信する Webhook 通知を追加します。さらに、[スクリーンボード][4]に「Check status」ウィジェットを追加して、任意の時点でこれらのモニターのステータスをチームメンバーに示すことができます。

この例では、「mymonitorgroup-alert-check」用と「mymonitorgroup-ok-check」用の 2 つの Webhook が必要です。どちらも同じ API エンドポイントを使用するため、それぞれの名前と URL 値は以下のようになります。

* 名前: mymonitorgroup-alert-check
    URL: `https://api.datadoghq.com/api/v1/check_run?api_key=<DATADOG_API_KEY>`

* 名前: mymonitorgroup-ok-check
    URL: `https://api.datadoghq.com/api/v1/check_run?api_key=<DATADOG_API_KEY>`

カスタムペイロードで、check_run の名前とタグを適用します。「アラート」Webhook の場合は、以下のようになります。

```json
{
  "check": "mymonitorgroup.status",
  "status": 2,
  "host_name": "$HOSTNAME",
  "tags": "[monitor:$ALERT_TITLE]"
}
```

このカスタムペイロードを使用した場合は、@webhook-mymonitorgroup-alert-check がモニターによってトリガーされるたびに、「mymonitorgroup.status」という名前のチェックランが送信されます。このチェックランは、CRITICAL 状態をチェックし、モニターの名前と、該当する場合はモニターがトリガーされたホストの名前でもタグ付けされます。

さらに、同じカスタムペイロード値を "mymonitorgroup-ok-check" チェックにも適用できます。ただし、「status」は「2」ではなく、「OK」状態を示す「0」になります。

この 2 つの Webhook セットを作成したら、モニターに移動し (チームメンバーが簡易ステータス表示を行いたいモニター)、以下のように適切な条件付き論理タグの中にネストされた Webhook 通知リファレンスを追加します。

```text
{{#is_alert}} @webhook-mymonitorgroup-alert-check {{/is_alert}}
{{#is_recovery}} @webhook-mymonitorgroup-ok-check {{/is_recovery}}
```

モニターを設定してアラートが開始されたら (OK 状態や CRITICAL 状態がステータスカウントに正しく算入されるには、これらのモニターは OK または CRITICAL で少なくとも一度アラートする必要がある)、この例では「monitor」タグによってグループ選択された「mymonitorgroup.check」に対して[スクリーンボード][4]で「Check status」ウィジェットをセットアップできます。

以下に、そのようなウィジェットの例を挙げます。ただし、このチェックの名前は「composite.status」で、グループ内の 1 つのモニターが「alert」をトリガーし、その後再び「ok」になりました。

{{< img src="developers/faq/check_status_editor.png" alt="check_status_editor" >}}

[1]: /ja/integrations/webhooks/
[2]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio
[3]: /ja/api/
[4]: /ja/dashboards/#screenboards