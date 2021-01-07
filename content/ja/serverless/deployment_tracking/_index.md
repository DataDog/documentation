---
title: デプロイ追跡
kind: documentation
further_reading:
  - link: /serverless/distributed_tracing
    tag: Documentation
    text: サーバーレス環境での分散型トレーシング
  - link: /serverless/serverless_tagging
    tag: Documentation
    text: サーバーレスタグ付け
---
{{< img src="serverless/deployment_tracking.jpeg" alt="サーバーレスのデプロイメント追跡"  style="width:100%;">}}

デプロイメント追跡は、コードの新しいバージョンやコンフィギュレーションの変更によってエラー率の上昇、パフォーマンス低下、またお使いのクラウド環境が期待通りの稼働状態から外れていないかなどを把握するのに役立ちます。

サーバーレスのアプリケーションでデプロイメント追跡にアクセスするには、[サーバーレスビュー][1]で関数を選択して **Deployments** タブをクリックします。このページには呼び出し、実行時間、エラー数など、主要なサーバーレスのメトリクスが選択した関数に関連するコードデプロイとコンフィギュレーションの変更を示すイベントオーバーレイと共に自動表示されます。

コードの履歴とコンフィギュレーションの変更を可視化するには、ビューの右上にあるグローバルタイムセレクターを調節してください。

## セットアップ

Datadog は、AWS CloudTrail からお使いの AWS Lambda 関数におけるコードとコンフィギュレーションの変更イベントを収集します。

[Amazon Web Services][2] インテグレーションをまだセットアップしていない場合は、最初にセットアップします。次に、AWS/Datadog ロールのポリシードキュメントに以下のアクセス許可を追加します。

```text
cloudtrail:LookupEvents
```

アクセス許可を既に追加していても AWS Lambda 関数のイベントが表示されない場合は、[サポートチーム][3]までお問い合わせの上、Deployment Tracking にオプトインしてください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/functions
[2]: /ja/integrations/amazon_web_services/#setup
[3]: /ja/help/