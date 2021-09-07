---
title: Amazon EventBridge API 宛先でイベントおよびログを Datadog へ送信
kind: ガイド
further_reading:
  - link: 'https://aws.amazon.com/blogs/compute/using-api-destinations-with-amazon-eventbridge/#sending-aws-events-to-datadog'
    tag: ブログ
    text: API 宛先のユースケース例を示す AWS ブログ
---
Amazon EventBridge は、イベント駆動型アプリケーションの構築を可能にするサーバーレスイベントバスです。 EventBridge は AWS サービスと統合可能ですが、API 宛先機能を利用すると、API を使用して AWS 外からのデータをプッシュ/プルできます。このガイドでは、EventBridge から Datadog へイベントおよびログを送信する方法を解説します。Datadog から EventBridge へのイベントのプッシュに関する詳細は、[EventBridge インテグレーション文書][1]をご参照ください。

## セットアップ

始めるには、[Datadog アカウント][2]と [API キー][3]、[Amazon Eventbridge API 宛先][4]へのアクセスが必要です。

### コンフィギュレーション

1. [Amazon の API 宛先を作成][5]文書のステップに従い、Datadog を API 宛先として追加します。
    - キー名として `DD-API-KEY`、[Datadog API キー][3]を値として、API キー認証を使用します。
    - 宛先エンドポイントには、ログの場合 `https://http-intake.logs.datadoghq.com/v1/input`、イベントの場合は `https://api.datadoghq.com/api/v1/events` を使用して、HTTP メソッドとして `POST` を設定します。ログとイベントの違いに関する詳細は、[データのカテゴリ文書のページ][8]の[ログセクション][6]および[イベントセクション][7]を参照してください。
2. 宛先をセットアップしたら、Amazon の手順に従い [EventBridge 作成ルール][9]を作成して、Datadog をあて先として設定します。
3. Datadog を宛先としてルールをセットアップしたら、イベントを EventBridge にポストしてトリガーします。Datadog から EventBridge へのイベントのプッシュに関する詳細は、[EventBridge インテグレーション文書][1]をご参照ください。たとえば、アカウントで[オブジェクトを S3 バケットへアップロード][10]してテストイベントをトリガーするには、以下の AWS CloudShell コマンドを使用します。

    ```bash
    echo "test" > testfile.txt
    aws s3 cp testfile.txt s3://YOUR_BUCKET_NAME
    ```
4. およそ 5 分後、イベントとログが送信されると、Datadog の[ログコンソール][11]または[イベントストリーム][12]（送信先となっているエンドポイントに基づき ます）でデータが利用可能になります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/integrations/amazon_event_bridge/
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: /ja/account_management/api-app-keys/#api-keys
[4]: https://aws.amazon.com/eventbridge/
[5]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html#eb-api-destination-create
[6]: /ja/security/#logs
[7]: /ja/security/#events-and-comments
[8]: /ja/security/
[9]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html
[10]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html
[11]: https://app.datadoghq.com/logs
[12]: https://app.datadoghq.com/event/stream