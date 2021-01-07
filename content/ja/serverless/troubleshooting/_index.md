---
title: サーバーレスモニタリングのトラブルシューティング
kind: ドキュメント
further_reading:
  - link: serverless/installation/node
    tag: Documentation
    text: Node.js サーバーレスモニタリングのインストール
  - link: serverless/installation/ruby
    tag: Documentation
    text: Ruby サーバーレスモニタリングのインストール
---
サーバレスモニタリングをまだ構成していない場合は、[インストール手順][1]のページに進んでください。Lambda インテグレーションをインストールしたばかりの場合は、メトリクスが表示されるまでに数分かかることがあります。

[Datadog Forwarder][2] および [Datadog Lambda レイヤー][3]の構成手順と高度なセットアップに関する詳細。

以下の表を使い、サーバレスモニタリングのさまざまな部分で発生する可能性のある問題のトラブルシューティングを行います。


| 機能                       | 説明 |
| ----------------------------- |--------------------------------------------------|
| [Lambda メトリクス][4]           | Amazon CloudWatch からプルされた AWS Lambda メトリクス。|
| [拡張メトリクス][5]         | Datadog が生成したリアルタイムの拡張 Lambda メトリクス|
| [Lambda ログ][6]              | ログ管理と Lambda 関数からのログの取り込み。|
| [Lambda カスタムメトリクス][7]    | Lambda 関数からのカスタムメトリクスの取り込み。|
| [Datadog APM][8]              | Datadog Tracer または AWS X-Ray を使用する分散型トレーシング|

それでも問題がはっきりしない場合は、[Datadog のサポートチーム][9]にご連絡ください。

[1]: /ja/serverless/#getting-started
[2]: /ja/serverless/forwarder
[3]: /ja/serverless/installation/
[4]: /ja/integrations/amazon_lambda/#metric-collection
[5]: /ja/integrations/amazon_lambda/#real-time-enhanced-lambda-metrics
[6]: /ja/integrations/amazon_lambda/#log-collection
[7]: /ja/integrations/amazon_lambda/#custom-metrics
[8]: /ja/tracing/serverless_functions/
[9]: /ja/help/