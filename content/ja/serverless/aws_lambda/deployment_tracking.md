---
aliases:
- /ja/serverless/deployment_tracking
further_reading:
- link: /serverless/distributed_tracing
  tag: ドキュメント
  text: サーバーレス環境での分散型トレーシング
- link: /serverless/serverless_tagging
  tag: ドキュメント
  text: サーバーレスタグ付け
kind: ドキュメント
title: AWS Lambda サーバーレスアプリケーションのためのデプロイメントトラッキング
---

デプロイメント追跡は、コードの新しいバージョンやコンフィギュレーションの変更によってエラー率の上昇、パフォーマンス低下、またお使いのクラウド環境が期待通りの稼働状態から外れていないかなどを把握するのに役立ちます。

To access deployment tracking for your serverless applications, select a function in the [Serverless view][1] to open a side panel, and click the **Deployments** tab. This shows key serverless metrics like invocations, execution duration, and error counts automatically displayed with event overlays that mark code deployments and configuration changes related to the function.

コードの履歴とコンフィギュレーションの変更を可視化するには、ビューの右上にあるグローバルタイムセレクターを調節してください。

## Setup

Datadog は、AWS CloudTrail からお使いの AWS Lambda 関数におけるコードとコンフィギュレーションの変更イベントを収集します。

[Amazon Web Services][2] インテグレーションをまだセットアップしていない場合は、最初にセットアップします。次に、AWS/Datadog ロールのポリシードキュメントに以下のアクセス許可を追加します。

```text
cloudtrail:LookupEvents
```

アクセス許可を既に追加していても AWS Lambda 関数のイベントが表示されない場合は、AWS Lambda インテグレーションタイルを使用してデプロイ追跡を有効にします。

{{< img src="serverless/lambda_integration_settings.png" alt="Lambda インテグレーション設定" style="width:100%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /ja/integrations/amazon_web_services/#setup