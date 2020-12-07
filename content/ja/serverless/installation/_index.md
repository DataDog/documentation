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
### 1. AWS インテグレーションをインストール

[AWS インテグレーション][1]をインストールします。これにより、Datadog は AWS CloudWatch から Lambda メトリクスを取り込むことができます。

### 2. Datadog Forwarder のインストール

AWS Lambda トレース、拡張メトリクス、カスタムメトリクス、ログの取り込みに必要な [Datadog Forwarder Lambda 関数][2]をインストールします。

**注**: [AWS インテグレーション][1] CloudFormation スタックの一部として Forwarder 関数がすでにインストールされている場合は、この手順をスキップしてください。

### 3. アプリケーションのインスツルメンテーション

サーバーレスアプリケーションをインスツルメントする手順については、以下の Lambda ランタイムを選択してください。

{{< partial name="serverless/getting-started-languages.html" >}}

[1]: /ja/integrations/amazon_web_services/#setup
[2]: /ja/serverless/forwarder