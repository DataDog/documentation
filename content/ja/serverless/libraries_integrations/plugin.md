---
aliases:
- /ja/serverless/serverless_integrations/plugin
dependencies:
- https://github.com/DataDog/serverless-plugin-datadog/blob/main/README.md
title: Datadog サーバーレスフレームワークプラグイン
---
![build](https://github.com/DataDog/serverless-plugin-datadog/workflows/build/badge.svg)
[![Code Coverage](https://img.shields.io/codecov/c/github/DataDog/serverless-plugin-datadog)](https://codecov.io/gh/DataDog/serverless-plugin-datadog)
[![NPM](https://img.shields.io/npm/v/serverless-plugin-datadog)](https://www.npmjs.com/package/serverless-plugin-datadog)
[![Slack](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/serverless-plugin-datadog/blob/master/LICENSE)

Datadog は、サーバーレスフレームワークを使用してサーバーレスアプリケーションをデプロイする開発者向けに、サーバーレスフレームワークプラグインを推奨しています。
プラグインは、アプリケーションのインスツルメンテーションを自動的に有効にして、次の方法でメトリクス、トレース、ログを収集します。

- Datadog Lambda ライブラリを Lambda にインストールすると、Lambda レイヤーとして機能します。
- Datadog Lambda 拡張機能を Lambda 関数に Lambda レイヤーとしてインストールするか (`addExtension`)、Datadog Forwarder を Lambda 関数のロググループにサブスクライブします (`forwarderArn`)。
- Lambda 関数に環境変数やトレースレイヤーを追加するなど、必要なコンフィギュレーション変更を行います。

## はじめに

すぐに開始するには、[Python][1]、[Node.js][2]、[Ruby][3]、[Java][4]、[Go][5]、または [.NET][6] のインストール手順に従い、Datadog で関数の拡張メトリクス、トレース、ログを表示します。

インストールが完了したら、[詳細オプション](https://docs.datadoghq.com/serverless/configuration)を監視の目的に合わせて設定します。

## アップグレード

プラグインの各バージョンは、[Datadog Lambda レイヤーの特定のバージョンのセット][15]で公開されています。Datadog Lambda レイヤーの最新バージョンによって提供される新機能とバグ修正を取得するには、サーバーレスフレームワークプラグインをアップグレードします。新しいバージョンを本番アプリケーションに適用する前にテストしてください。

## コンフィギュレーションパラメーター

プラグインをさらに構成するには、`serverless.yml` で以下のカスタムパラメーターを使用します。

| パラメーター                     | 説明                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `site`                        | データを送信する Datadog サイトを設定します。例えば、 `datadoghq.com` (デフォルト)、`datadoghq.eu`、`us3.datadoghq.com`、`us5.datadoghq.com`、`ap1.datadoghq.com` または `ddog-gov.com` などに設定します。このパラメーターは、Datadog Lambda 拡張機能を使用してテレメトリーを収集する場合に必要です。                                                                                                                                                        |
| `apiKey`                      | [Datadog API キー][7]。このパラメーターは、Datadog Lambda 拡張機能を使用してテレメトリーを収集する際に必要です。また、デプロイ環境で `DATADOG_API_KEY` 環境変数を設定することも可能です。                                                                                                                                                                                                    |
| `appKey`                      | Datadog アプリキー。`monitors` フィールドが定義されている場合のみ必要です。また、デプロイ環境で `DATADOG_APP_KEY` 環境変数を設定することも可能です。                                                                                                                                                                                                                                                |
| `apiKeySecretArn`             | `apiKey` フィールドを使用する代替です。AWS Secrets Manager に Datadog API キーを保存しているシークレットの ARN です。Lambda の実行ロールに `secretsmanager:GetSecretValue` 権限を追加することを忘れないようにします。                                                                                                                                                                                                   |
| `apiKMSKey`                   | `apiKey` フィールドを使用する代替です。Datadog API キーは KMS を使用して暗号化されています。Lambda の実行ロールに `kms:Decrypt` 権限を追加することを忘れないようにします。                                                                                                                                                                                                                                                                  |
| `env`                         | `addExtension` と共に設定すると、指定した値を持つすべての Lambda 関数に `DD_ENV` 環境変数が追加されます。それ以外の場合、すべての Lambda 関数に `env` タグが追加され、指定した値が設定されます。デフォルトはサーバーレスデプロイメントの `stage` 値です。                                                                                                                                                  |
| `service`                     | `addExtension` と共に設定すると、指定した値を持つすべての Lambda 関数に `DD_SERVICE` 環境変数が追加されます。それ以外の場合、すべての Lambda 関数に `service` タグが追加され、指定した値が設定されます。デフォルトはサーバーレスプロジェクトの `service` 値です。
| `version`                     | `addExtension` と共に設定すると、指定した値を持つすべての Lambda 関数に `DD_VERSION` 環境変数が追加されます。`forwarderArn` と共に設定すると、すべての Lambda 関数に `version` タグが追加され、指定した値が設定されます。                                                                                                                                                                              |
| `tags`                        | 1 つの文字列としての `key`:`value` のペアのカンマ区切りのリスト。`extensionLayerVersion` と共に設定すると、すべての Lambda 関数に `DD_TAGS` 環境変数が追加され、指定した値が設定されます。`forwarderArn` と共に指定すると、プラグインは文字列をパースして、各 `key`:`value` ペアをタグとしてすべての Lambda 関数に設定します。                                                                                |
| `enableXrayTracing`           | Lambda 関数と API Gateway 統合で X-Ray トレーシングを有効にするには、`true` に設定します。デフォルトは `false` です。                                                                                                                                                                                                                                                                                                                |
| `enableDDTracing`             | Lambda 関数で Datadog トレースを有効にします。デフォルトは `true` です。                                                                                                                                                                                                                                                                                                                                                           |
| `enableASM`                   | Lambda 関数で [Datadog Application Security Management (ASM)][19] を有効にします。これには、Datadog 拡張機能が存在している必要があり (`addExtension` を使用または手動で追加)、`enableDDTracing` も必要です。デフォルトは `false` です。                                                                                                                                                                                                                                                                                                                                                          |
| `enableDDLogs`                | Lambda 拡張機能を使用して Datadog のログ収集を有効にします。デフォルトは `true` です。注: この設定は、Datadog Forwarder から送信されるログには影響しません。                                                                                                                                                                                                                                                                        |
| `monitors`                    | 定義すると、Datadog プラグインはデプロイされた関数のモニターを構成します。ご使用の環境で、`DATADOG_API_KEY` および `DATADOG_APP_KEY` を設定する必要があります。モニターの定義方法については、[推奨されるサーバーレスモニターを有効にして構成するには](#to-enable-and-configure-a-recommended-serverless-monitor)を参照してください。                                                                                                    |
| `captureLambdaPayload`        | Datadog APM のスパンで、Lambda の呼び出しに対する [AWS Lambda のペイロードの入出力をキャプチャ][17]します。デフォルトは `false` です。                                                                                                                                                                                                                                                                                               |
| `enableSourceCodeIntegration` | 関数の [Datadog ソースコードインテグレーション][18]を有効にします。デフォルトは `true` です。                                                                                                                                                                                                                                                                                                                                           |
| `uploadGitMetadata`           | ソースコードインテグレーションの一部として、関数の Git メタデータアップロードを有効にします。Datadog Github インテグレーションをインストールしている場合は、これを false に設定すると、Git メタデータのアップロードが不要になります。デフォルトは `true` です。                                                                                                                                                                                          |
| `subscribeToAccessLogs`       | Datadog Forwarder の API Gateway アクセスロググループへの自動サブスクリプションを有効化します。`forwarderArn` の設定が必要です。デフォルトは `true` です。                                                                                                                                                                                                                                                                                |
| `subscribeToExecutionLogs`    | Datadog Forwarder の HTTP API と Websocket ロググループへの自動サブスクリプションを有効化します。`forwarderArn` の設定が必要です。デフォルトは `true` です。                                                                                                                                                                                                                                                                           |
| `forwarderArn`                | Lambda または API Gateway のロググループにサブスクライブされる Datadog Forwarder の ARN。                                                                                                                                                                                                                                                                                                                                   |
| `addLayers`                   | Datadog Lambda ライブラリをレイヤーとしてインストールするかどうか。デフォルトは `true` です。特定のバージョンの Datadog Lambda ライブラリ ([Python][8] または [Node.js][9]) をインストールできるように Datadog Lambda ライブラリを関数のデプロイパッケージに独自にパッケージ化する場合は、`false` に設定します。                                                                                                                   |
| `addExtension`                | Datadog Lambda 拡張機能をレイヤーとしてインストールするかどうか。デフォルトは `true` です。有効にすると、`apiKey` と `site` を設定する必要があります。                                                                                                                                                                                                                                                                                  |
| `exclude`                     | 設定後、このプラグインは指定されたすべての関数を無視します。Datadog の機能に含まれてはならない関数がある場合は、このパラメーターを使用します。デフォルトは `[]` です。                                                                                                                                                                                                                                                         |
| `enabled`                     | `false` に設定すると、Datadog プラグインが非アクティブ状態になります。デフォルトは `true` です。たとえば、`enabled: ${strToBool(${env:DD_PLUGIN_ENABLED, true})}` の環境変数を使用してこのオプションを制御し、デプロイ時にプラグインを有効化 / 無効化することができます。また、`--stage` を通じて渡された値を使用してこのオプションを制御することもできます。[こちらの例](#disable-plugin-for-particular-environment)をご覧ください。 |
| `customHandler`               | 設定すると、指定されたハンドラーがすべての関数のハンドラーとして設定されます。                                                                                                                                                                                                                                                                                                                                                 |
| `failOnError`                 | このプラグインを設定すると、Datadog カスタムモニターの作成または更新が失敗した場合にエラーが生成されます。これは、デプロイ後に発生しますが、`serverless deploy` の結果が 0 以外の終了コードを返す原因になります（ユーザー CI を失敗にするため）。デフォルトは `false` です。                                                                                                                                                                              |
| `logLevel`                    | ログのレベル。拡張ロギングの場合 `DEBUG` に設定します。                                                                                                                                                                                                                                                                                                                                                                          |
| `skipCloudformationOutputs`   | スタックに Datadog Cloudformation Outputs を追加するのをスキップしたい場合は、`true` に設定します。これは、スタックの作成に失敗する原因となる 200 の出力制限に遭遇している場合に有効です。                                                                                                                                                                                                                              |
| `enableColdStartTracing`      | コールドスタートトレースを無効にするには、`false` に設定します。NodeJS と Python で使用されます。デフォルトは `true` です。                                                                                                                                                                                                                                                                                                                                 |
| `coldStartTraceMinDuration`   | コールドスタートトレースでトレースするモジュールロードイベントの最小継続時間 (ミリ秒) を設定します。数値。デフォルトは `3` です。                                                                                                                                                                                                                                                                                            |
| `coldStartTraceSkipLibs`      | オプションで、カンマで区切られたライブラリのリストに対してコールドスタートスパンの作成をスキップすることができます。深さを制限したり、既知のライブラリをスキップするのに便利です。デフォルトはランタイムに依存します。                                                                                                                                                                                                                                                                |
| `subdomain`                   | 出力されるアプリの URL に使用するオプションのサブドメインを設定します。デフォルトは `app` です。                                                                                                                                                                                                                                                                                                                                |
| `enableProfiling`             | Datadog Continuous Profiler を `true` で有効にします。NodeJS と Python のベータ版でサポートされています。デフォルトは `false` です。                                                                                                                                                                                                                                                                                                            |
| `encodeAuthorizerContext`     | Lambda オーサライザーで `true` に設定すると、トレースコンテキストがレスポンスにエンコードされて伝搬されます。NodeJS と Python でサポートされています。デフォルトは `true` です。                                                                                                                                                                                                                                                       |
| `decodeAuthorizerContext`     | Lambda オーサライザーで認可された Lambda に対して `true` を設定すると、エンコードされたトレースコンテキストをパースして使用します (見つかった場合)。NodeJS と Python でサポートされています。デフォルトは `true` です。                                                                                                                                                                                                                                |
| `apmFlushDeadline`            | タイムアウトが発生する前にスパンを送信するタイミングをミリ秒単位で決定するために使用されます。AWS Lambda の呼び出しの残り時間が設定された値よりも小さい場合、トレーサーは、現在のアクティブなスパンとすべての終了したスパンの送信を試みます。NodeJS と Python でサポートされています。デフォルトは `100` ミリ秒です。                                                                                                             |
| `mergeStepFunctionAndLambdaTraces` | `true` に設定すると、Lambda トレースは呼び出し元の Step Function のトレースとマージされます。デフォルトは `false` です。                                                                                                                                                                                                                                                                                                                          |
| `enableStepFunctionsTracing`    | Datadog Forwarder の Step Function ロググループと Step Function トレーシングへの自動サブスクリプションを有効にします。Step Function のロググループが構成されていない場合は、自動的に作成されます。`forwarderArn` の設定が必要です。デフォルトは `false` です。                                                                                                                                                                  |
| `redirectHandlers`    | オプションで、`false` に設定した場合にハンドラーのリダイレクトを無効にします。これは APM が完全に無効になっている場合にのみ `false` に設定してください。デフォルトは `true` です。                                                                                                                                                                  |
上記のパラメーターを使用するには、以下の例のように `custom` > `datadog` セクションを `serverless.yml` に追加します。

```yaml
custom:
  datadog:
    apiKeySecretArn: "{Datadog_API_Key_Secret_ARN}"
    enableXrayTracing: false
    enableDDTracing: true
    enableDDLogs: true
    subscribeToAccessLogs: true
    forwarderArn: arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder
    exclude:
      - dd-excluded-function
```

### Webpack

webpack などのバンドラーを使用している場合は、[サーバーレストレーシングと Webpack](https://docs.datadoghq.com/serverless/guide/serverless_tracing_and_webpack/) を参照してください。

### TypeScript

タイプ定義が見つからないというエラーに遭遇することがあります。このエラーを解決するには、プロジェクトの package.json の `devDependencies` リストに `datadog-lambda-js` と `dd-trace` を追加してください。

serverless-typescript を使用している場合は、`serverless-datadog` が `serverless.yml` の `serverless-typescript` エントリの上にあることを確認してください。プラグインは自動的に `.ts` ファイルを検出します。

```yaml
plugins:
  - serverless-plugin-datadog
  - serverless-typescript
```

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

|       モニター        |                                         データセキュリティ                                          | しきい値  | サーバーレスモニター ID  |
| :------------------: | :--------------------------------------------------------------------------------------: | :--------: | :--------------------: |
|   高いエラー率    |                       `aws.lambda.errors`/`aws.lambda.invocations`                       |   >= 10%   |   `high_error_rate`    |
|       タイムアウト        |                      `aws.lambda.duration.max`/`aws.lambda.timeout`                      |    >= 1    |       `timeout`        |
|    メモリ不足     |                           `aws.lambda.enhanced.out_of_memory`                            |    > 0     |    `out_of_memory`     |
|  イテレータ経過時間が長い   |                            `aws.lambda.iterator_age.maximum`                             | >= 24 時間  |  `high_iterator_age`   |
| 高いコールドスタート率 | `aws.lambda.enhanced.invocations(cold_start:true)`/<br>`aws.lambda.enhanced.invocations` |   >= 20%   | `high_cold_start_rate` |
|    高いスロットル    |                     `aws.lambda.throttles`/`aws.lambda.invocations`                      |   >= 20%   |    `high_throttles`    |
|    コストの増加    |                           `aws.lambda.enhanced.estimated_cost`                           | &#8593;20% |    `increased_cost`    |

#### 推奨されるサーバーレスモニターを有効にして構成するには

推奨モニターを作成するには、それぞれのサーバーレスモニター ID を使用する必要があります。ご使用の環境に、`DATADOG_API_KEY` および `DATADOG_APP_KEY` も設定する必要があることにご注意ください。

推奨モニターのパラメーターをさらに構成する場合は、サーバーレスモニター ID の下にパラメーター値を直接定義できます。推奨モニターで指定されていないパラメーターは、デフォルトの推奨値を使用します。推奨モニターの `query` パラメーターは直接変更できず、デフォルトで上記で定義された値の `query` を使用します。ただし、`options` パラメーター内で再定義することにより、`query` のしきい値を変更できます。モニターを削除するには、`serverless.yml` テンプレートからモニターを削除します。モニターパラメーターの定義方法の詳細については、[Datadog Monitors API](https://docs.datadoghq.com/api/latest/monitors/#create-a-monitor) を参照してください。

モニターの作成は、関数がデプロイされた後に行われます。モニターの作成に失敗した場合でも、関数は正常にデプロイされます。

##### デフォルト値で推奨モニターを作成するには

パラメーター値を指定せずに、適切なサーバーレスモニター ID を定義します

```yaml
custom:
  datadog:
    addLayers: true
    monitors:
      - high_error_rate:
```

##### 推奨モニターを構成するには

```yaml
custom:
  datadog:
    addLayers: true
    monitors:
      - high_error_rate:
          name: "High Error Rate with Modified Warning Threshold"
          message: "More than 10% of the function’s invocations were errors in the selected time range. Notify @data.dog@datadoghq.com @slack-serverless-monitors"
          tags: ["modified_error_rate", "serverless", "error_rate"]
          require_full_window: true
          priority: 2
          options:
            include_tags: true
            notify_audit: true
            thresholds:
              ok: 0.025
              warning: 0.05
              critical: 0.1
```

##### モニターを削除するには

サーバーレスモニター ID とそのパラメーターを削除すると、モニターが削除されます。

#### カスタムモニターを有効にして構成するには

カスタムモニターを定義するには、環境で API キーとアプリケーションキー (`DATADOG_API_KEY` と `DATADOG_APP_KEY`) を渡すことに加えて、一意のサーバーレスモニター ID 文字列を定義する必要があります。`query` パラメーターは必須ですが、他のすべてのパラメーターはオプションです。一意のサーバーレスモニター ID 文字列を定義し、以下に必要なパラメーターを指定します。モニターパラメーターの詳細については、[Datadog Monitors API](https://docs.datadoghq.com/api/latest/monitors/#create-a-monitor) を参照してください。

```yaml
custom:
  datadog:
    addLayers: true
    monitors:
      - custom_monitor_id:
          name: "Custom Monitor"
          query: "max(next_1w):forecast(avg:system.load.1{*}, 'linear', 1, interval='60m', history='1w', model='default') >= 3"
          message: "Custom message for custom monitor. Notify @data.dog@datadoghq.com @slack-serverless-monitors"
          tags: ["custom_monitor", "serverless"]
          priority: 3
          options:
            enable_logs_sample: true
            require_full_window: true
            include_tags: false
            notify_audit: true
            notify_no_data: false
            thresholds:
              ok: 1
              warning: 2
              critical: 3
```

## 変更の分割

[**v5.0.0**](https://github.com/DataDog/serverless-plugin-datadog/releases/tag/v5.0.0)

- Datadog 拡張機能と併用することで、Lambda のリソースタグではなく、環境変数を通して `service` と `env` タグを設定するプラグインです。
- `enableTags` パラメーターは、新しい `service`、`env` パラメーターに置き換わりました。

[**v4.0.0**](https://github.com/DataDog/serverless-plugin-datadog/releases/tag/v4.0.0)

- Datadog Lambda 拡張機能は、Datadog へテレメトリーを送信するメカニズムのデフォルトになりました。

## serverless-plugin-warmup との連携
このライブラリは [serverless-plugin-warmup](https://github.com/juanjoDiaz/serverless-plugin-warmup) とベストエフォートで互換性があります。Datadog から warmer 関数を除外したい場合は、このライブラリの `exclude` 機能を使用します。

アプリケーションを適切にパッケージするために、このプラグインは `serverless.yml` ファイルの `serverless-plugin-warmup` の_後_に記述する*必要があります*。
```yaml
plugins:
  - serverless-plugin-warmup
  - serverless-plugin-datadog
```

## 問題を開く

このパッケージでバグが発生した場合は、問題を登録してお知らせください。新しい問題を開く前に、重複を避けるために既存の問題を検索してください。

問題を開くときは、Serverless Framework のバージョン、Python/Node.js のバージョン、および取得できる場合はスタックトレースを含めてください。さらに、必要に応じて再現手順を含めてください。

機能リクエストの問題を開くこともできます。

## 寄稿

このパッケージに問題が見つかり、修正された場合は、[手順][14]に従ってプルリクエストを開いてください。

## ヘルプ

製品のフィードバックや質問については、[Slack の Datadog コミュニティ](https://chat.datadoghq.com/)の `#serverless` チャンネルに参加してください。

## ライセンス

特に明記されていない限り、このリポジトリ内のすべてのファイルは、Apache License Version 2.0 の下でライセンスされます。

この製品には、Datadog(<https://www.datadoghq.com/>) で開発されたソフトウェアが含まれています。Copyright 2021 Datadog, Inc.

[1]: https://docs.datadoghq.com/ja/serverless/installation/python/?tab=serverlessframework
[2]: https://docs.datadoghq.com/ja/serverless/installation/nodejs/?tab=serverlessframework
[3]: https://docs.datadoghq.com/ja/serverless/installation/ruby/?tab=serverlessframework
[4]: https://docs.datadoghq.com/ja/serverless/installation/java/?tab=serverlessframework
[5]: https://docs.datadoghq.com/ja/serverless/installation/go/?tab=serverlessframework
[6]: https://docs.datadoghq.com/ja/serverless/installation/dotnet/?tab=serverlessframework
[7]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[8]: https://pypi.org/project/datadog-lambda/
[9]: https://www.npmjs.com/package/datadog-lambda-js
[10]: https://webpack.js.org/configuration/externals/
[11]: https://docs.datadoghq.com/ja/serverless/forwarder/
[12]: https://docs.datadoghq.com/ja/serverless/datadog_lambda_library/extension/
[13]: https://docs.aws.amazon.com/lambda/latest/dg/using-extensions.html
[14]: https://github.com/DataDog/serverless-plugin-datadog/blob/master/CONTRIBUTING.md
[15]: https://github.com/DataDog/serverless-plugin-datadog/blob/master/src/layers.json
[16]: https://docs.datadoghq.com/ja/tracing/setup_overview/configure_data_security/?tab=mongodb#replace-rules-for-tag-filtering
[17]: https://www.datadoghq.com/blog/troubleshoot-lambda-function-request-response-payloads/
[18]: https://docs.datadoghq.com/ja/integrations/guide/source-code-integration
[19]: https://docs.datadoghq.com/ja/security/application_security/