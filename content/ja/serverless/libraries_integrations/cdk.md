---
dependencies:
- https://github.com/DataDog/datadog-cdk-constructs/blob/main/README.md
kind: documentation
title: Datadog CDK コンストラクト
---
[![NPM](https://img.shields.io/npm/v/datadog-cdk-constructs?color=blue&label=npm+cdk+v1)](https://www.npmjs.com/package/datadog-cdk-constructs)
[![NPM](https://img.shields.io/npm/v/datadog-cdk-constructs-v2?color=39a356&label=npm+cdk+v2)](https://www.npmjs.com/package/datadog-cdk-constructs-v2)
[![PyPI](https://img.shields.io/pypi/v/datadog-cdk-constructs?color=blue&label=pypi+cdk+v1)](https://pypi.org/project/datadog-cdk-constructs/)
[![PyPI](https://img.shields.io/pypi/v/datadog-cdk-constructs-v2?color=39a356&label=pypi+cdk+v2)](https://pypi.org/project/datadog-cdk-constructs-v2/)
[![Slack](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-cdk-constructs/blob/main/LICENSE)

この Datadog CDK コンスタクトライブラリを使用して、AWS CDK .NET Framework を使用してサーバーレスアプリケーションをデプロイします。

以下を行うことで、サーバーレスアプリケーションからのメトリクス、トレース、ログの収集を CDK ライブラリで自動的に構成できます。

- [Python][1] および [Node.js][2] Lambda 関数用に Datadog Lambda ライブラリをインストールし構成。
- Lambda 関数からのトレースおよびカスタムメトリクスの収集を有効化。
- Datadog Forwarder から Lambda および非 Lambda ロググループへのサブスクリプションを管理。

## AWS CDK v1 と AWS CDK v2
Datadog CDK コンストラクトには、`datadog-cdk-constructs` と `datadog-cdk-constructs-v2` という 2 つのバージョンが存在します。これらは、それぞれ `AWS CDK v1` と `AWS CDK v2` で動作するように設計されています。

- `datadog-cdk-constructs-v2` には Node 14+ が必要で、`datadog-cdk-constructs-v1` は Node 12+ をサポートしています。
- それ以外は、2 つのパッケージの使用方法は同じです。

## npm パッケージのインストール:

AWS CDK v2 で使用する場合:
```
yarn add --dev datadog-cdk-constructs-v2
# または
npm install datadog-cdk-constructs-v2 --save-dev
```

AWS CDK v1 で使用する場合:
```
yarn add --dev datadog-cdk-constructs
# または
npm install datadog-cdk-constructs --save-dev
```

## PyPI パッケージのインストール:

AWS CDK v2 で使用する場合:
```
pip install datadog-cdk-constructs-v2
```

AWS CDK v1 で使用する場合:
```
pip install datadog-cdk-constructs
```

### 注:

`Datadog CDK Construct Library` はピアの依存関係があるので、パッケージマネージャーからの出力に注意してください。

## 使用方法

### AWS CDK

- _AWS CDK を初めて使うのであれば、こちらの[ワークショップ][14]をご覧ください。_
- _以下の例では、AWS CDK v2 を使用することを想定しています。CDK v1 を使用している場合は、`datadog-cdk-constructs-v2` ではなく、`datadog-cdk-constructs` をインポートします。_

これを CDK スタックに追加します。

```typescript
import { Datadog } from "datadog-cdk-constructs-v2";

const datadog = new Datadog(this, "Datadog", {
  nodeLayerVersion: <LAYER_VERSION>,
  pythonLayerVersion: <LAYER_VERSION>,
  addLayers: <BOOLEAN>,
  extensionLayerVersion: "<EXTENSION_VERSION>",
  forwarderArn: "<FORWARDER_ARN>",
  flushMetricsToLogs: <BOOLEAN>,
  site: "<SITE>",
  apiKey: "{Datadog_API_Key}",
  apiKeySecretArn: "{Secret_ARN_Datadog_API_Key}",
  apiKmsKey: "{Encrypted_Datadog_API_Key}",
  enableDatadogTracing: <BOOLEAN>,
  enableDatadogLogs: <BOOLEAN>,
  injectLogContext: <BOOLEAN>,
  logLevel: <STRING>,
  env: <STRING>, //オプション
  service: <STRING>, //オプション
  version: <STRING>, //オプション
  tags: <STRING>, //オプション
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>])
datadog.addForwarderToNonLambdaLogGroups([<LOG_GROUPS>])
```

オプションとして、[ソースコードインテグレーション](https://docs.datadoghq.com/integrations/guide/source-code-integration/) (Typescript のみ) を有効にしたい場合、AWS CDK は非同期関数をサポートしていないため、スタック設定にいくつかの変更を加える必要があります。

初期化関数を次のように変更します (注: ここでは `gitHash` の値を CDK に渡すように変更します)。

```typescript
async function main() {
  // パッケージマネージャーで @datadog/datadog-ci を追加することを確認します
  const datadogCi = require("@datadog/datadog-ci");
  const gitHash = await datadogCi.gitMetadata.uploadGitCommitHash('{Datadog_API_Key}', '<SITE>')

  const app = new cdk.App();
  // ExampleStack のコンストラクタにハッシュを渡します
  new ExampleStack(app, "ExampleStack", {}, gitHash);
}
```

スタックのコンストラクタで、オプションの `gitHash` パラメーターを追加して、`addGitCommitMetadata()` を呼び出すように変更します。

```typescript
export class ExampleStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps, gitHash?: string) {
    ...
    ...
    datadog.addGitCommitMetadata([<YOUR_FUNCTIONS>], gitHash)
  }
}
```

## コンフィギュレーション

Datadog のコンストラクトをさらに構成するには、以下のカスタムパラメーターを使用します。

_注_: 説明では npm パッケージパラメーターを使用していますが、PyPI パッケージパラメーターにも適用されます。

| npm パッケージパラメーター | PyPI パッケージパラメーター | 説明 |
| --- | --- | --- |
| `addLayers` | `add_layers` | Lambda レイヤーを追加またはユーザーが独自のレイヤーを使用。デフォルトは true。「true」の場合、Lambda ライブラリのバージョン変数も必要になります。「false」の場合は、関数のデプロイメントパッケージに Datadog Lambda ライブラリを含める必要があります。 |
| `pythonLayerVersion` | `python_layer_version` | インストールする Python Lambda レイヤーのバージョン（例: 21）。Python で記述された Lambda 関数を 1 つ以上デプロイする場合で、`addLayers` が「true」のときは必須。最新バージョンの数字は、[こちら][5]で確認できます。 |
| `nodeLayerVersion` | `node_layer_version` | インストールする Node.js Lambda レイヤーのバージョン（例: 29）。Node.js で記述された Lambda 関数を 1 つ以上デプロイする場合で、`addLayers` が「true」のときは必須。最新バージョンの数字は、[こちら][6]で確認できます。 |
| `extensionLayerVersion` | `extension_layer_version` | 5 など、インストールする Datadog Lambda Extension レイヤーのバージョン。`extensionLayerVersion` が設定されている場合は、`apiKey` (暗号化の場合は `apiKMSKey` または `apiKeySecretArn`) の設定も必要となります。有効にすると、Lambda 関数のロググループは Forwarder にサブスクライブされなくなります。Lambda Extension の詳細は[こちら][12]。 |
| `forwarderArn` | `forwarder_arn` | 設定すると、プラグインは自動的に Datadog Forwarder を関数のロググループにサブスクライブするようになります。`extensionLayerVersion` が設定されている場合は、`forwarderArn` を設定しないでください。 |
| `flushMetricsToLogs` | `flush_metrics_to_logs` | Datadog Forwarder Lambda 関数で CloudWatch ログを使用してカスタムメトリクスを送信します (推奨)。デフォルトは `true` です。このパラメーターを無効にすると、`apiKey` (暗号化されている場合は `apiKMSKey` または `apiKeySecretArn`) を設定する必要があります。 |
| `site` | `site` | データを送信する Datadog サイトを設定します。これは、`flushMetricsToLogs` が `false` または `extensionLayerVersion` が設定されている場合にのみ使用されます。可能な値は、`datadoghq.com`、`datadoghq.eu`、`us3.datadoghq.com`、`us5.datadoghq.com`、`ddog-gov.com` です。デフォルトは `datadoghq.com` です。 |
| `apiKey` | `api_key` | Datadog API キー。`flushMetricsToLogs` が `false` または `extensionLayerVersion` が設定されている場合にのみ必要です。Datadog API キーの取得の詳細については、[API キーのドキュメント][8]を参照してください。 |
| `apiKeySecretArn` | `api_key_secret_arn` | AWS Secrets Manager で Datadog の API キーを保存しているシークレットの ARN。`flushMetricsToLogs` が `false` の場合や `extensionLayer` が設定されている場合に、`apiKey` の代わりにこのパラメータを使用することができます。Lambda  の実行ロールに `secretsmanager:GetSecretValue` アクセス許可を追加することを忘れないようにしましょう。 |
| `apiKmsKey` | `api_kms_key` | KMS を使用して暗号化された Datadog API キー。`flushMetricsToLogs` が `false` または `extensionLayerVersion` が設定されており、KMS 暗号化を使用している場合、`apiKey` の代わりにこのパラメーターを使用します。 |
| `enableDatadogTracing` | `enable_datadog_tracing` | Lambda 関数で Datadog トレースを有効にします。デフォルトは `true` です。 |
| `enableDatadogLogs` | `enable_datadog_logs` | Datadog Lambda Extension を介して Lambda 関数のログを Datadog に送信します。 デフォルトは `true` です。注: この設定は、Datadog Forwarder 経由で送信されるログには影響しません。 |
| `injectLogContext` | `inject_log_context` | 設定すると、Lambda レイヤーは自動的に console.log に Datadog のトレース ID をパッチします。デフォルトは `true` です。 |
| `logLevel` | `log_level` | `debug` に設定すると、Datadog Lambda Library および Extension は、問題のトラブルシューティングに役立つ情報を追加でログに記録します。 |
| `env` | `env` | `extensionLayerVersion` と共に設定すると、指定した値を持つすべての Lambda 関数に `DD_ENV` 環境変数が追加されます。`forwarderArn` と共に設定すると、すべての Lambda 関数に `env` タグが追加され、指定した値が設定されます。 |
| `service` | `service` | `extensionLayerVersion` と共に設定すると、指定した値を持つすべての Lambda 関数に `DD_SERVICE` 環境変数が追加されます。`forwarderArn` と共に設定すると、すべての Lambda 関数に `service` タグが追加され、指定した値が設定されます。 |
| `version` | `version` | `extensionLayerVersion` と共に設定すると、指定した値を持つすべての Lambda 関数に `DD_VERSION` 環境変数が追加されます。`forwarderArn` と共に設定すると、すべての Lambda 関数に `version` タグが追加され、指定した値が設定されます。 |
| `tags` | `tags` | 1 つの文字列としての key:value のペアのカンマ区切りのリスト。`extensionLayerVersion` と共に設定すると、すべての Lambda 関数に `DD_TAGS` 環境変数が追加され、指定した値が設定されます。`forwarderArn` と共に指定すると、cdk は文字列をパースして、各 key:value ペアをタグとしてすべての Lambda 関数に設定します。 |

**注**: `env`、`service`、`version`、`tags` は、関数レベルの環境変数 `DD_XXX` をオーバーライドします。
### トレーシング

Lambda 関数で X-Ray トレーシングを有効にします。詳しくは、[CDK ドキュメント][9]を参照してください。

```typescript
import * as lambda from "aws-cdk-lib/aws-lambda";

const lambda_function = new lambda.Function(this, "HelloHandler", {
  runtime: lambda.Runtime.NODEJS_14_X,
  code: lambda.Code.fromAsset("lambda"),
  handler: "hello.handler",
  tracing: lambda.Tracing.ACTIVE,
});
```

### ネストされたスタック

Datadog CDK コンストラクトを、Datadog でインスツルメントしたい各スタックに追加します。以下の例では、Datadog CDK コンストラクトを初期化し、`RootStack` と `NestedStack` の両方で `addLambdaFunctions()` を呼び出しています。

```typescript
import { Datadog } from "datadog-cdk-constructs-v2";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

class RootStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new NestedStack(this, "NestedStack");

    const datadog = new Datadog(this, "Datadog", {
      nodeLayerVersion: <LAYER_VERSION>,
      pythonLayerVersion: <LAYER_VERSION>,
      addLayers: <BOOLEAN>,
      forwarderArn: "<FORWARDER_ARN>",
      flushMetricsToLogs: <BOOLEAN>,
      site: "<SITE>",
      apiKey: "{Datadog_API_Key}",
      apiKeySecretArn: "{Secret_ARN_Datadog_API_Key}",
      apiKmsKey: "{Encrypted_Datadog_API_Key}",
      enableDatadogTracing: <BOOLEAN>,
      enableDatadogLogs: <BOOLEAN>,
      injectLogContext: <BOOLEAN>
    });
    datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);

  }
}

class NestedStack extends cdk.NestedStack {
  constructor(scope: Construct, id: string, props?: cdk.NestedStackProps) {
    super(scope, id, props);

    const datadog = new Datadog(this, "Datadog", {
      nodeLayerVersion: <LAYER_VERSION>,
      pythonLayerVersion: <LAYER_VERSION>,
      addLayers: <BOOLEAN>,
      forwarderArn: "<FORWARDER_ARN>",
      flushMetricsToLogs: <BOOLEAN>,
      site: "<SITE>",
      apiKey: "{Datadog_API_Key}",
      apiKeySecretArn: "{Secret_ARN_Datadog_API_Key}",
      apiKmsKey: "{Encrypted_Datadog_API_Key}",
      enableDatadogTracing: <BOOLEAN>,
      enableDatadogLogs: <BOOLEAN>,
      injectLogContext: <BOOLEAN>
    });
    datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);

  }
}
```

### タグ

コンストラクトにタグを追加します。Datadog のテレメトリーを紐付けるために、`env` タグと `service` タグを設定することをお勧めします。詳しくは [AWS 公式ドキュメント][10]や [CDK ドキュメント][11]を参照してください。

## UDS の仕組み

Datadog CDK コンストラクトは、Lambda 関数のリストを取り込み、関数に [Node.js][2] と [Python][1] の Lambda Layers をアタッチして、Datadog Lambda Library をインストールするものです。これは、必要なコードの変更なしに Lambda Library を初期化する代替ハンドラーにリダイレクトします。Datadog CDK コンストラクトに追加された構成も、各 Lambda 関数の下でそれぞれの環境変数に変換されます (該当する場合/必要な場合)。

Lambda 関数ベースのロググループは `addLambdaFunctions` メソッドで自動的に処理されますが、このコンストラクトには追加の関数 `addForwarderToNonLambdaLogGroups` があり、Forwarder に追加のロググループをサブスクライブさせます。


## CDK について学ぶためのリソース

- [CDK TypeScript ワークショップ](https://cdkworkshop.com/20-typescript.html)
- [CDK by AWS の紹介ビデオ (デモ付き)](https://youtu.be/ZWCvNFUN-sU)
- [CDK コンセプト](https://youtu.be/9As_ZIjUGmY)

## リポジトリの構造

このリポジトリでは、`v1` と `v2` というフォルダが、パッケージ `datadog-cdk-constructs` と `datadog-cdk-contructs-v2` に対応しています。それぞれは独立したプロジェクトとして扱うことができます (依存関係、コンフィギュレーションファイル、テスト、スクリプトを持つ別々の projen プロジェクトです)。

さらに、`v1` と `v2` の両パッケージに共通する共有ロジックを格納した `common` フォルダも用意されています。これは、`v1/src` と `v2/src` 内の `common` フォルダを、リポジトリのルートにある `common` フォルダにソフトリンクすることによって行われます。

## Projen の使用

Datadog CDK コンストラクトライブラリの `v1` と `v2` は共に、`package.json`、`.gitignore`、`.npmignore` などのプロジェクトコンフィギュレーションファイルを管理するために Projen を使用しています。ほとんどのコンフィギュレーションファイルは、Projen によって読み取り専用権限で保護されています。これらのファイルを変更するには、 `v1` または `v2` フォルダ内の `.projenrc.js` ファイルを編集して、`npx projen` (`v1` または `v2` 内) を実行して新しい変更を反映させます。詳しくは、[Projen][13] をチェックしてください。

## 問題を開く

このパッケージでバグが発生した場合は、お知らせください。新しい問題を開く前に、重複を避けるために既存の問題を検索してください。

問題を開くときは、Datadog CDK コンストラクトのバージョン、Node のバージョン、および取得できる場合はスタックトレースを含めてください。さらに、必要に応じて再現手順を含めてください。

機能リクエストの問題を開くこともできます。

## 寄稿

このパッケージに問題が見つかり、修正された場合は、[手順](https://github.com/DataDog/datadog-cdk-constructs/blob/main/CONTRIBUTING.md)に従ってプルリクエストを開いてください。

## テスト

このパッケージに貢献した場合、`v1` または `v2` フォルダ内の `yarn test` を使ってテストを実行することができます。このパッケージには、手動テスト用のサンプルアプリケーションも含まれています。

1. 別のターミナルを開き、`v1` または `v2` に `cd` します。
2. `yarn watch` を実行すると、`src` ディレクトリにある Typescript ファイルが、`lib` ディレクトリにある Javascript にコンパイルされることを確認できます。
3. `src/sample` に移動し、ここで `index.ts` を編集して、手動で貢献をテストすることができます。
4. `v1` または `v2` ディレクトリのルートで、`npx cdk --app lib/sample/index.js <CDK Command>` を実行します。`<CDK Command>` は `synth`、`diff`、`deploy` などの一般的な CDK コマンドに置き換えてください。

- なお、"... is not authorized to perform: …” (...は実行する権限がありません: …) と表示された場合は、AWS の認証情報でコマンドを認証する必要がある場合もあります。

### デバッグログ

このライブラリのデバッグログを表示するには、`cdk synth` を実行するときに `DD_CONSTRUCT_DEBUG_LOGS` 環境変数を `true` に設定します (生成されたテンプレートの出力を抑制するには `--quiet` を使用します)。

例:
_`v1` または `v2` ディレクトリのルートにいることを確認します_

```
DD_CONSTRUCT_DEBUG_LOGS=true npx cdk --app lib/sample/index.js synth --quiet
```

## コミュニティ

製品のフィードバックや質問については、[Slack の Datadog コミュニティ](https://chat.datadoghq.com/)の `#serverless` チャンネルに参加してください。

## ライセンス

特に明記されていない限り、このリポジトリ内のすべてのファイルは、Apache License Version 2.0 の下でライセンスされます。

この製品には、Datadog(https://www.datadoghq.com/) で開発されたソフトウェアが含まれています。Copyright 2021 Datadog, Inc.

[1]: https://github.com/DataDog/datadog-lambda-layer-python
[2]: https://github.com/DataDog/datadog-lambda-layer-js
[3]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros.html
[4]: https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_core.Stack.html
[5]: https://github.com/DataDog/datadog-lambda-python/releases
[6]: https://github.com/DataDog/datadog-lambda-js/releases
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-subscriptionfilter.html
[8]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#api-keys
[9]: https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-lambda.Tracing.html
[10]: https://docs.aws.amazon.com/cdk/latest/guide/tagging.html
[11]: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.Tags.html
[12]: https://docs.datadoghq.com/ja/serverless/datadog_lambda_library/extension/
[13]: https://github.com/projen/projen
[14]: https://cdkworkshop.com/15-prerequisites.html