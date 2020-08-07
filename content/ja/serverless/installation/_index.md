---
title: サーバーレスモニタリングのインストール
kind: ドキュメント
further_reading:
  - link: serverless/installation/node
    tag: Documentation
    text: Node.js サーバーレスモニタリングのインストール
  - link: serverless/installation/ruby
    tag: Documentation
    text: Ruby サーバーレスモニタリングのインストール
---
### 1. AWS インテグレーションをインストール

[AWS インテグレーション][1] をインストールすることから始めます。これにより、Datadog は AWS Lambda から Amazon CloudWatch メトリクスを取り込めるようになります。AWS インテグレーションをインストールすることで、AWS Lambda トレース、拡張メトリクス、カスタムカスタムメトリクス、ログの取り込みに必要な [Datadog Forwarder][2] も構成されます。

### 2. アプリケーションをインスツルメント

これらの手順では、言語の設定に加えて、どの言語でも必要となる [Datadog Forwarder][2] と [Datadog Lambda ライブラリ][3] のインストールについてご説明します。

{{< partial name="serverless/getting-started-languages.html" >}}

[1]: /ja/integrations/amazon_web_services/
[2]: /ja/serverless/forwarder
[3]: /ja/serverless/installation/installing_the_library