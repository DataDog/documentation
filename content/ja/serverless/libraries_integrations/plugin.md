---
aliases:
  - /ja/serverless/serverless_integrations/plugin/
dependencies:
  - 'https://github.com/DataDog/serverless-plugin-datadog/blob/master/README.md'
kind: documentation
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
- Lambda 関数からの拡張 Lambda メトリクスおよびカスタムメトリクスの収集を有効化。
- Datadog Forwarder から Lambda 関数ロググループへのサブスクリプションを管理。

## はじめに

すぐに開始するには、[Python][1] または [Node.js][2] のインストール手順に従い、Datadog で関数の拡張メトリクス、トレース、ログを表示します。これらの手順により、基本的な作業設定を行うことができます。

## その他のコンフィギュレーションオプション

プラグインをさらに構成するには、`serverless.yml` で以下のカスタムパラメーターを使用します。

| パラメーター              | 説明                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `flushMetricsToLogs`   | Datadog Forwarder Lambda 関数 (推奨) でログを使用してカスタムメトリクスを送信します。デフォルトは `true` です。このパラメータを無効にする場合は、`apiKey` (または暗号化されている場合は `apiKMSKey`) を設定する必要があります。`addExtension` が true の場合、`flushMetricsToLogs` は無視されます。                                                                                                                                            |
| `site`                 | データを送信する Datadog サイトを設定します。これは、`flushMetricsToLogs` が `false` または `addExtension` が `true` の場合にのみ使用されます。可能な値は、`datadoghq.com`、`datadoghq.eu`、`us3.datadoghq.com`、`ddog-gov.com` です。デフォルトは `datadoghq.com` です。                                                                                                                                                               |
| `apiKey`               | Datadog API キー。`flushMetricsToLogs` が `false` または `addExtension` が `true` の場合にのみ必要です。`apiKey` を定義すると、Datadog API キーが環境変数として Lambda 関数に直接追加されます。Datadog API キーの取得の詳細については、[API キーのドキュメント][3]を参照してください。                                                                                                                                                                                                                            |
| `apiKMSKey`            | KMS を使用して暗号化された Datadog API キー。`flushMetricsToLogs` が `false` または `addExtension` が `true` で、KMS 暗号化を使用している場合、`apiKey` の代わりにこのパラメーターを使用します。`apiKMSKey` を定義すると、Datadog API キーが環境変数として Lambda 関数に直接追加されます。                                                                                                                                                                                                                                    |
| `monitorsApiKey`       | Datadog API キー。プラグインを使用して関数のモニターを作成する場合、および `monitors` が定義されている場合にのみ必要です。関数で `apiKey` とは別に、`monitorsApiKey` は Datadog Monitors API を介してモニターを作成するためにのみ使用されます。`apiKey` と `monitorsApiKey` の両方に同じ API キーを使用できます。                                                                                                                                                                               |
| `monitorsAppKey`       | Datadog アプリケーションキー。プラグインを使用して関数のモニターを作成する場合、および `monitors` が定義されている場合にのみ必要です。                                                                                                                                                                                                                                   |
| `addLayers`            | Datadog Lambda ライブラリをレイヤーとしてインストールするかどうか。デフォルトは `true` です。特定のバージョンの Datadog Lambda ライブラリ ([Python][4] または [Node.js][5]) をインストールできるように Datadog Lambda ライブラリを関数のデプロイパッケージに独自にパッケージ化する場合は、`false` に設定します。                                                                                                          |
| `addExtension`         | Datadog Lambda Extension をレイヤーとしてインストールするかどうか。デフォルトは `false` です。有効にした場合、`apiKey` (または `apiKMSKey`) パラメータを設定する必要があります。Datadog Lambda Extension Layer は公開プレビュー中です。Lambda Extension Layer の詳細については[こちら][8]をご覧ください。                                                                                   |
| `logLevel`             | ログのレベル。拡張ロギングの場合 `DEBUG` に設定します。                                                                                                                                                                                                                                                                                                                                             |
| `enableXrayTracing`    | Lambda 関数と API Gateway 統合で X-Ray トレーシングを有効にするには、`true` に設定します。デフォルトは `false` です。                                                                                                                                                                                                                                                                                                       |
| `enableDDTracing`      | Lambda 関数で Datadog トレースを有効にします。デフォルトは `true` です。                                                                                                                                                                                                                                                                                                                                                  |
| `subscribeToApiGatewayLogs` | Datadog Forwarder の API Gateway ロググループへの自動サブスクリプションを有効化します。デフォルトは `true` です。                                                                                                                                                                                                                                                                                                                 |
| `subscribeToHttpApiLogs` | Datadog Forwarder の Http-api ロググループへの自動サブスクリプションを有効化します。デフォルトは `true` です。                                                                                                                                                                                                                                                                                                                 |
| `subscribeToWebsocketLogs` | Datadog Forwarder の Websocket ロググループへの自動サブスクリプションを有効化します。デフォルトは `true` です。                                                                                                                                                                                                                                                                                                                 |
| `forwarderArn`         | このパラメーターを設定すると、指定された Datadog Forwarder が Lambda 関数の CloudWatch ロググループにサブスクライブされます。サブスクリプションが別の方法で適用されない限り、`enableDDTracing` が `true` に設定されている場合に必要です。たとえば、Datadog Forwarder サブスクリプションが Datadog の AWS インテグレーションを介して適用される場合、`forwarderArn` は必要ありません。         |
| `integrationTesting`   | インテグレーションテストを実行するときに `true` に設定します。これにより、Forwarder ARN と追加した Datadog モニターの出力リンクの検証要件がバイパスされます。デフォルトは `false` です。                                                                                                                                                                                                                                              |
| `enableTags`           | 設定すると、サーバーレスアプリケーション定義の `service` 値と `stage` 値を使用して、Lambda 関数に `service` タグと `env` タグを自動的にタグ付けします。`service` または `env` タグがすでに存在する場合はオーバーライドされません。デフォルトは `true` です。                                                                                                                                                          |
| `injectLogContext`     | 設定すると、lambda レイヤーは自動的に console.log に Datadog のトレース ID をパッチします。デフォルトは `true` です。                                                                                                                                                                                                                                                                                                     |
| `exclude`              | 設定後、このプラグインは指定されたすべての機能を無視します。Datadog の機能に含まれてはならない機能がある場合は、このパラメーターを使用します。デフォルトは `[]` です。                                                                                                                                                                                                                                            |
| `enabled`              | false に設定すると、Datadog プラグインが非アクティブ状態になります。デフォルトは `true` です。`enabled: ${strToBool(${env:DD_PLUGIN_ENABLED, true})}` などの環境変数を使用してこのオプションを制御し、デプロイ時にプラグインを有効化 / 無効化することができます。また、`--stage` を通じて渡された値を使用してこのオプションを制御することもできます。[こちらの例](#disable-plugin-for-particular-environment)をご覧ください。
| `monitors`             | 定義すると、Datadog プラグインはデプロイされた関数のモニターを構成します。また、`monitorsApiKey` と `monitorsAppKey` を定義する必要があります。モニターの定義方法については、[推奨されるサーバーレスモニターを有効にして構成するには](#to-enable-and-configure-a-recommended-serverless-monitor)を参照してください。  |

上記のパラメーターを使用するには、以下の例のように `custom` > `datadog` セクションを `serverless.yml` に追加します。

```yaml
custom:
  datadog:
    flushMetricsToLogs: true
    apiKey: "{Datadog_API_Key}"
    apiKMSKey: "{Encrypted_Datadog_API_Key}"
    monitorsApiKey: "{Datadog_API_Key}"
    monitorsAppKey: "{Datadog_Application_Key}"
    addLayers: true
    addExtension: true
    logLevel: "info"
    enableXrayTracing: false
    enableDDTracing: true
    enableAPIGatewayLogs: true
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
var nodeExternals = require("webpack-node-externals");

module.exports = {
  // webpack-node-externals を使用してすべてのノードの依存関係を除外します。
  // 手動で外部設定にすることも可能です。
  externals: [nodeExternals(), "dd-trace", "datadog-lambda-js"],
};
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

[Datadog Forwarder Lambda 関数][7] は、インストールして Lambda 関数ロググループにサブスクライブさせる必要があります。Forwarder の ARN が `forwarderArn` オプションを介して提供された際に、プラグインが自動的にログサブスクリプションを生成します。

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
### サーバーレスモニター

デフォルト値が事前構成された 7 つの推奨モニターがあります。

| モニター              | メトリクス                                                                                   | しきい値 | サーバーレスモニター ID |
|:--------------------:|:-----------------------------------------------------------------------------------------:|:-----------------:|:---------------------:|
| 高いエラー率      | `aws.lambda.errors`/`aws.lambda.invocations`                                              | >= 10%            | `high_error_rate`     |
| タイムアウト              | `aws.lambda.duration.max`/`aws.lambda.timeout`                                            | >= 1              | `timeout`             |
| Out of Memory        | `aws.lambda.lambda.enhanced.max_memory_used`/<br>`aws.lambda.memorysize`                  | >= 1              | `out_of_memory`       |
| High Iterator Age    | `aws.lambda.iterator_age.maximum`                                                         | >= 24 hrs         | `high_iterator_age`   |
| 高いコールドスタート率 | `aws.lambda.enhanced.invaocations(cold_start:true)`/<br>`aws.lambda.enhanced.invocations` | >= 20%            | `high_cold_start_rate`|
| 高いスロットル       | `aws.lambda.throttles`/`aws.lambda.invocations`                                           | >= 20%            | `high_throttles`      |
| コストの増加       | `aws.lambda.enhanced.estimated_cost`                                                      | &#8593;20%        | `increased_cost`      |

#### 推奨されるサーバーレスモニターを有効にして構成するには

推奨モニターを作成するには、それぞれのサーバーレスモニター ID を使用する必要があります。`monitorApiKey` と `monitorAppKey` も設定する必要があることに注意してください。

推奨モニターのパラメーターをさらに構成する場合は、サーバーレスモニター ID の下にパラメーター値を直接定義できます。推奨モニターで指定されていないパラメーターは、デフォルトの推奨値を使用します。推奨モニターの `query` パラメーターは直接変更できず、デフォルトで上記で定義された値の `query` を使用します。ただし、`options` パラメーター内で再定義することにより、`query` のしきい値を変更できます。モニターを削除するには、`serverless.yml` テンプレートからモニターを削除します。モニターパラメーターの定義方法の詳細については、[Datadog Monitors API](https://docs.datadoghq.com/api/latest/monitors/#create-a-monitor) を参照してください。

モニターの作成は、関数がデプロイされた後に行われます。モニターの作成に失敗した場合でも、関数は正常にデプロイされます。

##### デフォルト値で推奨モニターを作成するには
パラメーター値を指定せずに、適切なサーバーレスモニター ID を定義します

```yaml
custom:
 datadog:
   addLayers: true
   monitorsApiKey: "{Datadog_API_Key}"
   monitorsAppKey: "{Datadog_APP_Key}"
   monitors:
     - high_error_rate:
```

##### 推奨モニターを構成するには
```yaml
custom:
 datadog:
   addLayers: true
   monitorsApiKey: "{Datadog_API_Key}"
   monitorsAppKey: "{Datadog_APP_Key}"
   monitors:
     - high_error_rate:
        name: "High Error Rate with Modified Warning Threshold"
        message: "More than 10% of the function’s invocations were errors in the selected time range. Notify @data.dog@datadoghq.com @slack-serverless-                 monitors"
        tags: ["modified_error_rate", "serverless", "error_rate"]
        require_full_window: true
        priority: 2
        options: {
          include_tags: true
          notify_audit:true
          thresholds: {
            ok: 0.025
            warning: 0.05
          }
        }
```

##### モニターを削除するには
サーバーレスモニター ID とそのパラメーターを削除すると、モニターが削除されます。

#### カスタムモニターを有効にして構成するには

カスタムモニターを定義するには、API キーとアプリケーションキーを渡すことに加えて、一意のサーバーレスモニター ID 文字列を定義する必要があります。`query` パラメーターは必須ですが、他のすべてのパラメーターはオプションです。一意のサーバーレスモニター ID 文字列を定義し、以下に必要なパラメーターを指定します。モニターパラメーターの詳細については、[Datadog Monitors API](https://docs.datadoghq.com/api/latest/monitors/#create-a-monitor) を参照してください。

```yaml
custom:
  datadog:
    addLayers: true
    monitorsApiKey: "{Datadog_API_Key}"
    monitorsAppKey: "{Datadog_APP_Key}"
    monitors:
      - custom_monitor_id:
          name: "Custom Monitor"
          query: "max(next_1w):forecast(avg:system.load.1{*}, 'linear', 1, interval='60m', history='1w', model='default') >= 3"
          message: "Custom message for custom monitor. Notify @data.dog@datadoghq.com @slack-serverless-monitors"
          tags: ["custom_monitor", "serverless"]
          priority: 3
          options: {
            enable_logs_sample: true
            require_full_window: true
            include_tags: false
            notify_audit:true
            notify_no_data: false
            thresholds: {
              ok: 1
              warning: 2
            }
          }
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
[8]: https://docs.datadoghq.com/ja/serverless/libraries_integrations/extension/
