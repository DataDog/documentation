---
dependencies:
  - 'https://github.com/DataDog/serverless-plugin-datadog/blob/master/README.md'
kind: ドキュメント
title: Datadog サーバーレスプラグイン
---
[![serverless](http://public.serverless.com/badges/v1.svg)](https://www.serverless.com)
![build](https://github.com/DataDog/serverless-plugin-datadog/workflows/build/badge.svg)
[![Code Coverage](https://img.shields.io/codecov/c/github/DataDog/serverless-plugin-datadog)](https://codecov.io/gh/DataDog/serverless-plugin-datadog)
[![NPM](https://img.shields.io/npm/v/serverless-plugin-datadog)](https://www.npmjs.com/package/serverless-plugin-datadog)
[![Slack](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/serverless-plugin-datadog/blob/master/LICENSE)

Datadog は、サーバーレスフレームワークを使用してサーバーレスアプリケーションをデプロイする開発者向けに、サーバーレスフレームワークプラグインを推奨しています。
以下を行うことで、サーバーレスアプリケーションからのメトリクス、トレース、ログの収集をプラグインで自動的に構成できます。

- Python および Node.js Lambda 関数用に Datadog Lambda ライブラリをインストールし構成。
- Lambda 関数からの拡張 Lambda 関数およびカスタムメトリクスの収集を有効化。
- Datadog Forwarder から Lambda 関数ロググループへのサブスクリプションを管理。

## はじめに

すぐに開始するには、[Python][1] または [Node.js][2] のインストール手順に従い、Datadog で関数の拡張メトリクス、トレース、ログを表示します。これらの手順により、基本的な作業設定を行うことができます。

## その他のコンフィギュレーションオプション

プラグインをさらに構成するには、`AWS::CloudFormation::Macro` に以下のカスタムパラメーターを使用します。

| パラメーター            | 説明                                                                                                                                                                                                                                                                                                                                                                                     |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `flushMetricsToLogs` | Datadog Forwarder Lambda 関数でログを使用してカスタムメトリクスを送信します (推奨)。デフォルトは `true` です。このパラメーターを無効にする場合は、パラメーター `site` と `apiKey` (または暗号化されている場合は `apiKMSKey`) を設定する必要があります。                                                                                                                                                            |
| `site`               | データを送信する Datadog サイトを設定します。flushMetricsToLogs が `false` の場合にのみ必要です。可能な値は、`datadoghq.com`、`datadoghq.eu`、`us3.datadoghq.com`、`ddog-gov.com` です。デフォルトは `datadoghq.com` です。                                                                                                                                                                                                                                |
| `apiKey`             | Datadog API キー。`flushMetricsToLogs` が `false` の場合にのみ必要です。Datadog API キーの取得の詳細については、[API キーのドキュメント][3]を参照してください。                                                                                                                                                                                                                                    |
| `apiKMSKey`          | KMS を使用して暗号化された Datadog API キー。`flushMetricsToLogs` が `false` で、KMS 暗号化を使用している場合、`apiKey` の代わりにこのパラメーターを使用します。                                                                                                                                                                                                                                             |
| `addLayers`          | Datadog Lambda ライブラリをレイヤーとしてインストールするかどうか。デフォルトは `true` です。特定のバージョンの Datadog Lambda ライブラリ ([Python][4] または [Node.js][5]) をインストールできるように Datadog Lambda ライブラリを関数のデプロイパッケージに独自にパッケージ化する場合は、`false` に設定します。 |
| `logLevel`           | ログのレベル。拡張ロギングの場合 `DEBUG` に設定します。デフォルトは`info`。                                                                                                                                                                                                                                                                                                                           |
| `enableXrayTracing`  | Lambda 関数と API Gateway 統合で X-Ray トレーシングを有効にするには、`true` に設定します。デフォルトは `false` です。                                                                                                                                                                                                                                                                                   |
| `enableDDTracing`    | Lambda 関数で Datadog トレースを有効にします。デフォルトは `true` です。有効にした場合、`forwarder` パラメーターを設定する必要があります。                                                                                                                                                                                                                                                                         |
| `forwarder`          | このパラメーターを設定すると、Lambda 関数の CloudWatch ロググループが指定された Datadog Forwarder Lambda 関数にサブスクライブされます。`enableDDTracing` が `true` に設定されている場合に必要です。                                                                                                                                                                                                                 |
| `enableTags`         | 設定すると、サーバーレスアプリケーション定義の `service` 値と `stage` 値を使用して、Lambda 関数に `service` タグと `env` タグを自動的にタグ付けします。`service` または `env` タグがすでに存在する場合はオーバーライドされません。デフォルトは `true` です。                                                                                                                                      |
| `injectLogContext`         | 設定すると、lambda レイヤーは自動的に console.log に Datadog のトレース ID をパッチします。デフォルトは `true` です。                                                                                                                                      |
| `exclude`         | 設定後、このプラグインは指定されたすべての機能を無視します。Datadog の機能に含まれてはならない機能がある場合は、このパラメーターを使用します。デフォルトは `[]` です。                                                                                                                                      |
| `enabled`            | false に設定されている場合、DataDog プラグインは非アクティブのままとなります。デフォルトは `true` です。環境変数を使用してこのオプションを制御し（たとえば、`enabled: ${strToBool(${env:DD_PLUGIN_ENABLED, true})}`）、デプロイの間にプラグインをアクティブ化/非アクティブ化できます。または、`--stage` を通じて渡された値を使用してこのオプションを制御することも可能です。 [こちらの例をご覧ください。](#disable-plugin-for-particular-environment)|


上記のパラメーターを使用するには、以下の例のように `custom` > `datadog` セクションを `serverless.yml` に追加します。

```yaml
custom:
  datadog:
    flushMetricsToLogs: true
    apiKey: "{Datadog_API_Key}"
    apiKMSKey: "{Encripted_Datadog_API_Key}"
    addLayers: true
    logLevel: "info"
    enableXrayTracing: false
    enableDDTracing: true
    forwarder: arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder
    enableTags: true
    injectLogContext: true
    exclude: 
      - dd-excluded-function
```

**注**: Webpack を使用する場合、Datadog は、`addLayers` をデフォルトの `true` に設定して事前に構築されたレイヤーを使用し、`datadog-lambda-js` と `dd-trace` を Webpack コンフィギュレーションの [externals][6] セクションに追加することをお勧めします。

### TypeScript

serverless-typescript を使用している場合は、`serverless-datadog` が `serverless.yml` の `serverless-typescript` エントリの上にあることを確認してください。プラグインは自動的に `.ts` ファイルを検出します。

```yaml
plugins:
  - serverless-plugin-datadog
  - serverless-typescript
```

TypeScript を使用する場合、タイプ定義が欠落しているというエラーが発生する可能性があります。事前に構築されたレイヤーを使用し (たとえば、`addLayers` をデフォルトの `true` に設定)、`datadog-lambda-js` と `dd-trace` パッケージからヘルパー関数をインポートしてカスタムメトリクスを送信したり、特定の関数をインスツルメントしたりする必要がある場合、タイプ定義が欠落します。エラーを解決するには、プロジェクトの package.json の `devDependencies` リストに `datadog-lambda-js` と `dd-trace` を追加します。

### Webpack

`dd-trace` は条件付きインポートの使用やその他の問題などで、Webpack との互換性がないことが知られています。Webpack を使用する場合は、`datadog-lambda-js` と `dd-trace` を Webpack の[外部](https://webpack.js.org/configuration/externals/)に設定してください。これで、ランタイム時にこれらの依存関係を利用できることが Webpack で認識されます。また、`datadog-lambda-js` と `dd-trace` を `package.json` およびビルドプロセスから削除し、Datadog Lambda レイヤーから提供されたバージョンを必ず使用するようにしてください。

#### serverless-webpack

`serverless-webpack` を使用する場合は、`serverless.yml` 内の `datadog-lambda-js` と `dd-trace` を Webpack の config ファイルで外部宣言した上でそれらを除外します。

**webpack.config.js**
```javascript
var nodeExternals = require('webpack-node-externals')

module.exports = {
  // webpack-node-externals を使用してすべてのノードの依存関係を除外します。
  // 手動で外部設定にすることも可能です。
  externals: [nodeExternals(), 'dd-trace', 'datadog-lambda-js'],
}
```

**serverless.yml**
```yaml
custom:
  webpack:
    includeModules:
      forceExclude:
        - dd-trace
        - datadog-lambda-js
```

### Forwarder

[Datadog Forwarder Lambda 関数][7] は、インストールして Lambda 関数ロググループにサブスクライブさせる必要があります。Forwarder の ARN が `forwarder` オプションを介して提供された際に、プラグインが自動的にログサブスクリプションを生成します。

以下のエラーが発生した場合は、提供されている Forwarder ARN が正しいかどうかを再チェックし、サーバーレスアプリケーションが配置されている地域とアカウントから提供されていることを確認してください。

```
エラーが発生しました。GetaccountapiLogGroupSubscription -  Lambda 関数を実行できませんでした。関数を実行するための許可がCloudWatch Logs に付与されていることを確認してください。(Service: AWSLogs; Status Code: 400; Error Code: InvalidParameterException)。

### 特定の環境にプラグインを無効にする

環境に基づき（`--stage` を通じて渡された場合など）プラグインを無効にするには、以下の例のような構文を使用できます。

```yaml
provider:
  stage: ${self:opt.stage, 'dev'}

custom:
  staged: ${self:custom.stageVars.${self:provider.stage}, {}}

  stageVars:
    dev:
      dd_enabled: false

  datadog:
    enabled: ${self:custom.staged.dd_enabled, true}
```

## 問題を開く

このパッケージでバグが発生した場合は、問題を登録してお知らせください。新しい問題を開く前に、重複を避けるために既存の問題を検索してください。

問題を開くときは、Serverless Framework のバージョン、Python/Node.js のバージョン、および取得できる場合はスタックトレースを含めてください。さらに、必要に応じて再現手順を含めてください。

機能リクエストの問題を開くこともできます。

## 寄稿

このパッケージに問題が見つかり、修正された場合は、[手順](CONTRIBUTING.md)に従ってプルリクエストを開いてください。

## コミュニティ

製品のフィードバックや質問については、[Slack の Datadog コミュニティ](https://chat.datadoghq.com/)の `#serverless` チャンネルに参加してください。

## ライセンス

特に明記されていない限り、このリポジトリ内のすべてのファイルは、Apache License Version 2.0 の下でライセンスされます。

この製品には、Datadog(https://www.datadoghq.com/) で開発されたソフトウェアが含まれています。Copyright 2019 Datadog, Inc.

[1]: https://docs.datadoghq.com/ja/serverless/installation/python/?tab=serverlessframework
[2]: https://docs.datadoghq.com/ja/serverless/installation/nodejs/?tab=serverlessframework
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[4]: https://pypi.org/project/datadog-lambda/
[5]: https://www.npmjs.com/package/datadog-lambda-js
[6]: https://webpack.js.org/configuration/externals/
[7]: https://docs.datadoghq.com/ja/serverless/forwarder/