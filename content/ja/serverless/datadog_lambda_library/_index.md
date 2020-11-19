---
title: Datadog Lambda ライブラリ
kind: ドキュメント
further_reading:
  - link: /serverless/datadog_lambda_library/extension
    tag: Documentation
    text: Datadog Lambda 拡張機能 (プレビュー)
  - link: /serverless/datadog_lambda_library/python
    tag: Documentation
    text: Datadog Lambda Library for Python
  - link: /serverless/datadog_lambda_library/nodejs
    tag: Documentation
    text: Datadog Lambda Library for Node.js
  - link: /serverless/datadog_lambda_library/ruby
    tag: Documentation
    text: Ruby 向け Datadog Lambda ライブラリ
  - link: /serverless/datadog_lambda_library/go
    tag: Documentation
    text: Go 向け Datadog Lambda ライブラリ
  - link: /serverless/datadog_lambda_library/java
    tag: Documentation
    text: Datadog Lambda Library for Java
---
{{< img src="serverless/datadog_lambda_library.png" alt="Datadog Lambda ライブラリ"  style="width:100%;">}}

Datadog Lambda ライブラリでは以下を実行します。

- 呼び出し、エラー、コールドスタート、推定コストなどのリアルタイム[拡張 Lambda メトリクス][1]を生成します。
- [カスタムメトリクス][2]を送信（同期および非同期）します。
- Node.js、Python、Ruby 向けに [Datadog APM および分散型トレース][3]を有効化します。

また、Lambda 関数からトレース、拡張 Lambda メトリクス、またはカスタムメトリクス (非同期) を取り込むには、Datadog Forwarder をインストールおよび構成する**必要があります**。

Datadog Lambda ライブラリは以下の収集には**対応していません**。

- CloudWatch からの Lambda メトリクス ([AWS Lambda インテグレーション][4]を参照)
- X-Ray からの Lambda トレース ([AWS X-Ray インテグレーション][5]を参照)
- CloudWatch からの Lambda ログ ([Datadog Forwarder][6] を参照)

Datadog は Lambda ライブラリを Python、Node.js、Ruby、Go、Java 向けパッケージとして配布しています。パッケージは pip、npm、gem、maven などの共通のパッケージマネージャーからインストールできます。

Datadog Lambda ライブラリは Python、Node.js、Ruby 向けの [Lambda レイヤー][7]としても利用可能です。

Datadog Lambda ライブラリをインストールしてお使いのサーバーレスアプリケーションをインスツルメントする方法については、[インストール手順][8]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/serverless/enhanced_lambda_metrics/
[2]: /ja/serverless/custom_metrics/
[3]: /ja/tracing/
[4]: /ja/integrations/amazon_lambda/
[5]: /ja/integrations/amazon_xray/
[6]: /ja/serverless/forwarder/
[7]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[8]: /ja/serverless/installation/