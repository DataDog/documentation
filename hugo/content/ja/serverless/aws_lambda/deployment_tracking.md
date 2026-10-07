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
title: AWS Lambda サーバーレスアプリケーションのためのデプロイメントトラッキング
---

デプロイメント追跡は、コードの新しいバージョンやコンフィギュレーションの変更によってエラー率の上昇、パフォーマンス低下、またお使いのクラウド環境が期待通りの稼働状態から外れていないかなどを把握するのに役立ちます。

サーバーレスのアプリケーションでデプロイメント追跡にアクセスするには、[サーバーレスビュー][1]で関数を選択してサイドパネルを開き、**Deployments** タブをクリックします。ここには呼び出し回数、実行時間、エラー数などの主要なサーバーレスメトリクスが、選択した関数に関連するコードデプロイや設定変更を示すイベントオーバーレイとともに自動的に表示されます。

コードの履歴とコンフィギュレーションの変更を可視化するには、ビューの右上にあるグローバルタイムセレクターを調節してください。

## セットアップ

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