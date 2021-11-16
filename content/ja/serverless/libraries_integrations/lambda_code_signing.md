---
title: Lambda コード署名
kind: documentation
---
[AWS Lambda のコード署名][1]により、信頼できるコードのみを Lambda 関数から AWS へデプロイすることができます。関数でコード署名を有効にすると、デプロイメントのすべてのコードが信頼できるソースにより署名されていることが AWS で検証されます。このソースは、[コード署名コンフィギュレーション][2]で定義します。

# コンフィギュレーション

Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog により公開された Lambda レイヤーを使用して Lambda 関数をデプロイするには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][2]に追加する必要があります。以下のライブラリおよびインテグレーションは、Lambda レイヤーを関数に追加します。
- [Datadog Lambda ライブラリ][3]
- [Datadog Lambda 拡張機能][4]
- [Datadog サーバーレスプラグイン][5]
- [Datadog CloudFormation マクロ][6]
- [Datadog CLI][7]
- [Datadog CDK コンストラクトライブラリ][8]

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html
[2]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-updates
[3]: /ja/serverless/libraries_integrations/library
[4]: /ja/serverless/libraries_integrations/extension
[5]: /ja/serverless/libraries_integrations/plugin
[6]: /ja/serverless/libraries_integrations/macro
[7]: /ja/serverless/libraries_integrations/cli
[8]: https://www.npmjs.com/package/datadog-cdk-constructs