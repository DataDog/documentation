---
title: サーバーレスモニタリングのインストール
kind: ドキュメント
aliases:
  - /ja/serverless/installation/installing_the_library/
further_reading:
  - link: serverless/installation/node
    tag: Documentation
    text: Node.js サーバーレスモニタリングのインストール
  - link: serverless/installation/ruby
    tag: Documentation
    text: Ruby サーバーレスモニタリングのインストール
---
### Datadog の AWS インテグレーションをインストールする

[AWS インテグレーション][1]をインストールします。これにより、Datadog は AWS CloudWatch から Lambda メトリクスを取り込むことができます。

### サーバーレスアプリケーションをインスツルメントする

サーバーレスアプリケーションをインスツルメントする手順については、以下の Lambda ランタイムを選択してください。

   {{< partial name="serverless/getting-started-languages.html" >}}

[1]: /ja/integrations/amazon_web_services/#setup