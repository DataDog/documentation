---
further_reading:
- link: https://aws.amazon.com/blogs/compute/using-api-destinations-with-amazon-eventbridge/#sending-aws-events-to-datadog
  tag: ブログ
  text: API 宛先のユースケース例を示す AWS ブログ
kind: ガイド
title: Amazon EventBridge API 宛先でイベントおよびログを Datadog へ送信
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Datadog for Government サイトは、Amazon EventBridge をサポートしていません。</div>
{{< /site-region >}}

Amazon EventBridge は、イベント駆動型アプリケーションの構築を可能にするサーバーレスイベントバスです。 EventBridge は AWS サービスと統合可能ですが、API 宛先機能を利用すると、API を使用して AWS 外からのデータをプッシュ/プルできます。このガイドでは、EventBridge から Datadog へイベントおよびログを送信する方法を解説します。Datadog から EventBridge へのイベントのプッシュに関する詳細は、[EventBridge インテグレーション文書][1]をご参照ください。

## 計画と使用

始めるには、[Datadog アカウント][2]と [API キー][3]、[Amazon Eventbridge API 宛先][4]へのアクセスが必要です。

### ブラウザトラブルシューティング

1. [Amazon の API 宛先を作成][5]文書のステップに従い、Datadog を API 宛先として追加します。
    - キー名として `DD-API-KEY`、[Datadog API キー][3]を値として、API キー認証を使用します。
    - 宛先エンドポイントには、ログの場合 `https://{{< region-param key="http_endpoint" code="true" >}}/api/v2/logs`、イベントの場合は `https://api.{{< region-param key="dd_site" code="true" >}}/api/v1/events` を使用して、HTTP メソッドとして `POST` を設定します。ログとイベントの違いに関する詳細は、[データ関連リスクの低減][8]を参照してください。
    - イベントエンドポイントを利用する場合、API Destination 接続の `body.field` パラメータに `title` と `text` を含める必要があります。これらは、イベントエンドポイントに `POST` するために必要な値です。詳しくは、[イベントのポストのドキュメント][9]を参照してください。
2. 宛先をセットアップしたら、Amazon のドキュメントを参照して [EventBridge 作成ルール][10]を作成して、Datadog をあて先として設定します。
3. Datadog を宛先としてルールをセットアップしたら、イベントを EventBridge にポストしてトリガーします。Datadog から EventBridge へのイベントのプッシュに関する詳細は、[EventBridge インテグレーションのドキュメント][1]をご参照ください。たとえば、アカウントで[オブジェクトを S3 バケットへアップロード][11]してテストイベントをトリガーするには、以下の AWS CloudShell コマンドを使用します。

    ```bash
    echo "test" > testfile.txt
    aws s3 cp testfile.txt s3://YOUR_BUCKET_NAME
    ```
4. およそ 5 分後、イベントとログが送信されると、Datadog の[ログコンソール][12]または[イベントエクスプローラー][13]（送信先となっているエンドポイントに基づき ます）でデータが利用可能になります。

## ヘルプ

Datadog に送信されたペイロードの詳細を確認し、API エンドポイントのレスポンスを表示するには、Amazon SQS キューをセットアップします。
1. [Amazon SQS][14] にキューを作成します。
2. [構成](#configuration)セクションで作成した [EventBridge ルール][15]に移動します。
3. **Targets** タブを選択し、**Edit** をクリックします。
4. **Additional settings** セクションを展開します。
4. *Dead-letter queue* セクションで、**Select an Amazon SQS queue in current AWS account to use as dead-letter queue** (デッドレターキューとして使用する、現在の AWS アカウントの Amazon SQS キューを選択する) を選択します。
5. 先ほど作成した SQS キューを選択します。
6. ルールを更新します。

## その他の参考資料

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