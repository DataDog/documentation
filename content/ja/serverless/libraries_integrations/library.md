---
aliases:
- /ja/serverless/datadog_lambda_library/
further_reading:
- link: /serverless/libraries_integrations/extension/
  tag: ドキュメント
  text: Datadog Lambda 拡張機能
- link: https://github.com/DataDog/datadog-lambda-python/blob/master/README.md
  tag: Github
  text: Datadog Lambda Library for Python
- link: https://github.com/DataDog/datadog-lambda-js/blob/master/README.md
  tag: Github
  text: Datadog Lambda Library for Node.js
- link: https://github.com/DataDog/datadog-lambda-rb/blob/master/README.md
  tag: Github
  text: Ruby 向け Datadog Lambda ライブラリ
- link: https://github.com/DataDog/datadog-lambda-go/blob/master/README.md
  tag: Github
  text: Go 向け Datadog Lambda ライブラリ
- link: https://github.com/DataDog/datadog-lambda-java/blob/master/README.md
  tag: Github
  text: Datadog Lambda Library for Java
kind: documentation
title: Datadog Lambda ライブラリ
---

{{< img src="serverless/datadog_lambda_library.png" alt="Datadog Lambda ライブラリ"  style="width:100%;">}}

Datadog Lambda ライブラリでは以下を実行します。

- 呼び出し、エラー、コールドスタート、推定コストなどのリアルタイム[拡張 Lambda メトリクス][1]を生成します。
- [カスタムメトリクス][2]を送信（同期および非同期）します。
- Node.js、Python、Ruby 向けに [Datadog APM および分散型トレース][3]を有効化します。

**Ruby** 用の Datadog Lambda ライブラリを使用している場合は、Datadog Forwarder をインストールして構成し、Lambda 関数からトレース、拡張 Lambda メトリクス、またはカスタムメトリクスを (非同期で) 取り込む必要があります。
**Python**、**Node**、**Go**、**Java**、または **.NET** 用の Datadog Lambda ライブラリを使用している場合は、[Datadog Lambda 拡張機能][4]を使用して、トレース、拡張 Lambda メトリクス、またはカスタムメトリクスを取り込むことができます。または、Datadog Forwarder を引き続き使用できます。

Datadog Lambda ライブラリは以下の収集には**対応していません**。

- CloudWatch からの Lambda メトリクス ([AWS Lambda インテグレーション][5]を参照)
- X-Ray からの Lambda トレース ([AWS X-Ray インテグレーション][6]を参照)
- CloudWatch からの Lambda ログ ([Datadog Forwarder][7] を参照)

Datadog は Lambda ライブラリを Python、Node.js、Ruby、Go、Java 向けパッケージとして配布しています。パッケージは pip、npm、gem、maven などの共通のパッケージマネージャーからインストールできます。

Datadog Lambda ライブラリは Python、Node.js、Ruby 向けの [Lambda レイヤー][8]としても利用可能です。

Datadog Lambda ライブラリをインストールしてお使いのサーバーレスアプリケーションをインスツルメントする方法については、[インストール手順][9]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/serverless/enhanced_lambda_metrics/
[2]: /ja/serverless/custom_metrics/
[3]: /ja/tracing/
[4]: /ja/serverless/libraries_integrations/extension/
[5]: /ja/integrations/amazon_lambda/
[6]: /ja/integrations/amazon_xray/
[7]: /ja/serverless/forwarder/
[8]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[9]: /ja/serverless/installation/