---
title: サーバーレスパッケージが大きすぎるエラーのトラブルシューティング
kind: documentation
further_reading:
  - link: /serverless/installation/nodejs
    tag: ドキュメント
    text: Node.js アプリケーションのインスツルメンテーション
---
このガイドは、"Code uncompressed size is greater than max allowed size of 272629760 "というエラーのトラブルシューティングを支援します。このエラーは、Datadog サーバーレスプラグインを使用して Node.js サーバーレスアプリケーションをインスツルメントするときに最も一般的に表示されます。また、他の言語やデプロイメント方法でこのエラーが発生した場合にも、このトラブルシューティングの方法が適用される場合があります。

このエラーは、関数の_圧縮されていない_コードサイズが 250MB の制限を超えていることを示しています。[関数パッケージ][1] (関数のコードと依存関係を含む `.zip` アーティファクト) と関数に設定された [Lambda レイヤー][2]の両方が、この制限にカウントされます。両方を調べて、根本的な原因を探ってください。

## レイヤー

通常、Datadog はインスツルメンテーションのために 2 つの Lambda レイヤーを追加します。

- 関数コードをインスツルメントする言語固有のライブラリと
- 観測データを集計し、バッファリングし、Datadog のバックエンドに転送する拡張機能。

AWS CLI コマンド [`aws lambda get-layer-version`][3] で Datadog Lambda レイヤーの内容やサイズを検査します。例えば、以下のコマンドを実行すると、_Datadog-Node14-x version 67_ と _Datadog-Extension version 19_ の Lambda レイヤーをダウンロードするリンクが得られ、圧縮されていないサイズ (合わせて約 30MB) を検査することが可能です。解凍サイズはレイヤーやバージョンによって異なります。以下の例のレイヤー名とバージョン番号は、アプリケーションで使用されているものに置き換えてください。

```
aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Node14-x \
  --version-number 67

aws lambda get-layer-version \
  --layer-name arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Extension \
  --version-number 19
```

Datadog の Lambda レイヤー以外にも、関数に追加された (または追加される) Lambda レイヤーも検査します。[Serverless Framework][4] を利用している場合、CloudFormation のテンプレートは `deploy` または `package` コマンドを実行した後の隠しフォルダ `.serverless` から、Lambda レイヤー一覧は `Layers` セクションから確認することが可能です。

## パッケージ

関数デプロイパッケージには、不要な大きなファイルやコードが含まれていることがあります。Serverless Framework を使用している場合、`deploy` または `package` コマンドを実行すると、隠しフォルダである `.serverless` に生成されたデプロイパッケージ (`.zip` ファイル) を見つけることができます。

デプロイパッケージとレイヤーのサイズの合計が制限を超えない場合は、AWS サポートに連絡して調査を受けてください。合計サイズが制限を超える場合は、デプロイパッケージを検査し、実行時に不要な大きなファイルを[パッケージ][5]オプションを使用して除外してください。

## 依存関係

Datadog Lambda レイヤーはインスツルメンテーションライブラリをパッケージ化し、Lambda 実行環境で使用できるようにするので、 `datadog-lambda-js` と `dd-trace` を `package.json` で依存関係に指定する必要は _ありません_。もし、ローカルのビルドやテストに Datadog のライブラリが必要な場合は、`devDependencies` として指定し、デプロイパッケージから除外するようにします。同様に、 `serverless-plugin-datadog` は開発時にのみ必要なので、 `devDependencies` に指定してください。

また、デプロイパッケージに含まれる他の依存関係 (`node_modules` フォルダ) を検査し、必要なものだけを `dependencies` に保存してください。

## Webpack

[Webpack][6] のようなバンドラーを使用すると、使用するコードのみを含めることでデプロイパッケージのサイズを劇的に削減することができます。必要な Webpack の構成は [Node.js の Lambda Tracing と Webpack の互換性][7]を参照してください。

## サポート

Datadog のサポートチームによる調査が必要な場合は、チケットに以下の情報を含めてください。

1. この関数の構成された Lambda レイヤー (名前とバージョン、または ARN)。
2. AWS にアップロードする関数のデプロイパッケージ (または解凍したパッケージの内容とサイズがわかるスクリーンショット)。
3. プロジェクトのコンフィギュレーションファイル (**編集されたシークレット**を含む): `serverless.yaml`、`package.json`、`package-lock.json`、`yarn.lock`、 `tsconfig.json` および `webpack.config.json`。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html#gettingstarted-package-zip
[2]: https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html#gettingstarted-package-layers
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/get-layer-version.html
[4]: https://www.serverless.com/
[5]: https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/#package
[6]: https://webpack.js.org
[7]: /ja/serverless/guide/serverless_tracing_and_webpack/