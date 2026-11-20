---
further_reading:
- link: https://aws.amazon.com/blogs/compute/using-api-destinations-with-amazon-eventbridge/#sending-aws-events-to-datadog
  tag: ブログ
  text: API 宛先のユースケースの例を示す AWS ブログ
- link: /logs/guide/reduce_data_transfer_fees
  tag: ガイド
  text: データ転送料金を削減しながら Datadog にログを送信する方法
site_support_id: amazon-event-bridge
title: Amazon EventBridge API 宛先でイベントおよびログを Datadog へ送信
---
Amazon EventBridge は、イベント駆動型アプリケーションを構築できるサーバーレスイベントバスです。EventBridge は AWS サービスと統合できますが、API 宛先機能を使用すると、API を使用して AWS の外部からデータを送受信できます。このガイドでは、EventBridge から Datadog にイベントとログを送信する手順を説明します。Datadog から EventBridge にイベントをプッシュする方法の詳細については、[EventBridge インテグレーションドキュメント][1]を参照してください。

## セットアップ {#setup}

始めるには、[Datadog アカウント][2]と [API キー][3]、[Amazon Eventbridge API 宛先][4]へのアクセス権が必要です。

### 構成 {#configuration}

1. [Amazon の API 宛先ドキュメントの作成][5]の手順に従って、Datadog を API 宛先として追加します。
    - キー名を `DD-API-KEY`、値を [Datadog API キー][3]として、API キー認証を使用します。
    - 送信先エンドポイントには、`https://{{< region-param key="http_endpoint" code="true" >}}/api/v2/logs` for logs and `https://event-management-intake.{{< region-param key="dd_site" code="true" >}}/api/v2/events` for events, and set `POST` を HTTP メソッドとして使用します。ログとイベントの違いの詳細については、[データ関連リスクの低減][8]を参照してください。
2. 宛先をセットアップしたら、Amazon のドキュメントを参照して [EventBridge ルールを作成][10]し、Datadog を宛先として設定します。

    If you're using the events endpoint, configure an [input transformer][16] on the target so the rule sends events in the format the endpoint expects. Use the following input path to extract values from the original event:

    ```json
    {
      "detailType": "$.detail-type",
      "source": "$.source",
      "time": "$.time"
    }
    ```

    Then, use the following input template to build the request body:

    ```json
    {
      "data": {
        "type": "event",
        "attributes": {
          "title": <detailType>,
          "message": "<detailType> from <source>",
          "category": "alert",
          "timestamp": <time>,
          "tags": ["source:<source>"],
          "attributes": {
            "status": "ok"
          }
        }
      }
    }
    ```

    Set `status` to `warn` or `error` for events that represent a problem. For AWS events that represent a configuration change, you can instead send `"category": "change"` with a `changed_resource` object. For the full list of accepted fields, see [Post an event][9].
3. Datadog を宛先とするルールをセットアップしたら、EventBridge にイベントを投稿してイベントをトリガーしてください。Datadog から EventBridge にイベントをプッシュする方法の詳細については、[EventBridge インテグレーションドキュメント][1]を参照してください。たとえば、アカウント内の [S3 バケットにオブジェクトをアップロード][11]してテストイベントをトリガーするには、次の AWS CloudShell コマンドを使用します。

    ```bash
    echo "test" > testfile.txt
    aws s3 cp testfile.txt s3://YOUR_BUCKET_NAME
    ```
4. およそ 5 分後、イベントとログが送信されると、送信先エンドポイントに基づいて、Datadog の[ログコンソール][12]または[イベントエクスプローラー][13]でデータが利用可能になります。

## トラブルシューティング {#troubleshooting}

Datadog に送信されるペイロードの詳細を確認し、API エンドポイントの応答を表示するには、Amazon SQS キューをセットアップします。 
1. [Amazon SQS][14] にキューを作成します。
2. [Configuration](#configuration) セクションで作成した [EventBridge ルール][15]に移動します。
3. {{< ui >}}Targets{{< /ui >}} タブを選択し、[{{< ui >}}Edit{{< /ui >}}] をクリックします。
4. {{< ui >}}Additional settings{{< /ui >}} セクションを展開します。
4. {{< ui >}}Dead-letter queue{{< /ui >}} セクションで、{{< ui >}}Select an Amazon SQS queue in the current AWS account to use as the dead-letter queue{{< /ui >}} を選択します。
5. 先ほど作成した SQS キューを選択します。
6. ルールを更新します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/integrations/amazon_event_bridge/
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: /ja/account_management/api-app-keys/#api-keys
[4]: https://aws.amazon.com/eventbridge/
[5]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html#eb-api-destination-create
[8]: /ja/data_security/#other-sources-of-potentially-sensitive-data/
[9]: https://docs.datadoghq.com/ja/api/latest/events/#post-an-event
[10]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html
[11]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html
[12]: https://app.datadoghq.com/logs
[13]: https://app.datadoghq.com/event/explorer
[14]: https://console.aws.amazon.com/sqs/
[15]: https://console.aws.amazon.com/events/
[16]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-transform-target-input.html