---
kind: ドキュメント
title: サーバーレスレイヤーの「未認可」エラーのトラブルシューティング
---
このガイドは、デプロイメントエラー `not authorized to perform: lambda:GetLayerVersion on resource` のトラブルシューティングに役立ちます。このエラーは、Datadog Lambda Library レイヤーまたは Datadog 拡張機能レイヤーでよく発生します。

## リージョン性
Lambda 関数には、関数と同じリージョンにある [Lambda レイヤー][1]しか含めることができません。通常、このエラーは、ユーザーが異なるリージョンにデプロイされた他のアプリケーションからインスツルメンテーション設定をコピーした場合に発生します。

Lambda レイヤーのリージョンと Lambda 関数のバージョンが一致していることを確認します。次に、バージョン番号が正しいことを確認します。

有効な AWS 資格情報を使って `aws lambda get-layer-version` を実行することで、Lambda レイヤーのバージョンが存在することを確認できます。

例えば、Datadog 拡張機能レイヤーと Datadog Node.js ライブラリレイヤーを確認するには、以下を実行します。
```
aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:464622532012:layer:Datadog-{{< latest-lambda-layer-version layer="node-example-version" >}} \
  --version-number {{< latest-lambda-layer-version layer="node" >}}

aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Extension \
  --version-number {{< latest-lambda-layer-version layer="extension" >}}
```

## Permissions
たまに、ユーザーが誤って、その関数が `lambda:GetLayerVersion` を実行する権限を明示的に `DENY` してしまうことがあります。いくつかの[リソースベース][2]ポリシー構成は明示的な `DENY` を引き起こす可能性があります。さらに、IAM [権限境界][3]でも `lambda:GetLayerVersion` の明示的な `DENY` が発生することがあります。

これをテストするには、Lambda 関数が使用しているのと同じ IAM ポリシーにアタッチされた IAM ユーザーを使用して、上記のように `get-layer-version` コマンドをテストします。コマンドはエラーなしで成功するはずです。

## Datadog サポートへのお問い合わせ

Datadog のサポートチームによる調査が必要な場合は、チケットに以下の情報を含めてください。

1. この関数の構成された Lambda レイヤー (名前とバージョン、または ARN)。
2. プロジェクトのコンフィギュレーションファイル (**マスキングされたハードコードシークレット**を含む): `serverless.yaml`、`package.json`、`package-lock.json`、`yarn.lock`、 `tsconfig.json` および `webpack.config.json`。
3. プロジェクトの IAM ポリシーとロール情報。

[1]: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html#gettingstarted-package-layers
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html