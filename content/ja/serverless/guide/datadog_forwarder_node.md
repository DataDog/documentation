---
kind: ガイド
title: Datadog Forwarder を使用した Node.js サーバーレスアプリケーションのインスツルメンテーション
---

## 概要

<div class="alert alert-warning">
Datadog Serverless の新規ユーザーの場合、代わりに <a href="/serverless/installation/nodejs">Datadog Lambda Extension を使用して Lambda 関数をインスツルメントする手順</a>に従ってください。Lambda がすぐに使える機能を提供する前に、Datadog Forwarder で Datadog Serverless をセットアップした場合は、このガイドを使用してインスタンスを維持してください。
</div>

## 前提条件

[Datadog Forwarder Lambda 関数][1]は、AWS Lambda トレース、拡張メトリクス、カスタムメトリクス、ログの取り込みに必要です。

## コンフィギュレーション

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Datadog CLI は、既存の Lambda 関数のコンフィギュレーションを修正し、新しいデプロイを必要とせずにインスツルメンテーションを可能にします。Datadog のサーバーレスモニタリングをすばやく開始するための最適な方法です。

CI/CD パイプラインにコマンドを追加してすべてのサーバーレスアプリケーションにインスツルメンテーションを有効化することも可能です。Datadog CLI コマンドによる変更が上書きされないよう、通常のサーバーレスアプリケーションのデプロイ*後*にコマンドを実行します。

### Install

NPM または Yarn を使用して Datadog CLI をインストールします。

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### インスツルメントする

関数をインスツルメントするには、[AWS 資格情報][1]を使用して次のコマンドを実行します。

```sh
datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v <layer_version> --forwarder <forwarder_arn>
```

関数をインスツルメントするには、AWS CDK アプリの `Stack` オブジェクトに `DatadogServerless` 変換と `CfnMapping` を追加します。以下の Python のサンプルコードを参照してください (他の言語での使用方法も同様です)。
- `<functionname>` と `<another_functionname>` を Lambda 関数名に置き換えます。
- `<aws_region>` を AWS リージョン名に置き換えます。
- `<layer_version>` を目的のバージョンの Datadog Lambda ライブラリに置き換えます。最新バージョンは `{{< latest-lambda-layer-version layer="node" >}}` です。
- `<forwarder_arn>` を Forwarder ARN に置き換えます ([Forwarder のドキュメント][2]を参照)。

例:

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v {{< latest-lambda-layer-version layer="node" >}} --forwarder "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder"
```

Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog CLI でインスツルメントするには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][3]に追加する必要があります。

[CLI のドキュメント][4]に詳細と追加のパラメーターがあります。

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/ja/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[4]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/cli

{{% /tab %}}
{{% tab "Serverless Framework" %}}

[Datadog Serverless Plugin][1] は、レイヤーを使用して Datadog Lambda ライブラリを関数に自動的に追加し、[Datadog Forwarder][2] を介してメトリクス、トレース、ログを Datadog に送信するように関数を構成します。

Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog Serverless Plugin をインストールする前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][6]に追加する必要があります。

Datadog サーバーレスプラグインをインストールして構成するには、次の手順に従います。

1. Datadog サーバーレスプラグインをインストールします。
    ```
    yarn add --dev serverless-plugin-datadog
    ```
2. `serverless.yml` に以下を追加します。
    ```
    plugins:
      - serverless-plugin-datadog
    ```
3. `serverless.yml` に、以下のセクションも追加します。
    ```
    custom:
      datadog:
        forwarderArn: # The Datadog Forwarder ARN goes here.
    ```
   Datadog Forwarder ARN またはインストールの詳細については、[こちら][2]を参照してください。追加の設定については、[プラグインのドキュメント][1]を参照してください。

**注**: Lambda 関数が Datadog のトレーシングライブラリと　[Webpack][5] を同時に使用している場合は、これらの[追加のコンフィギュレーションステップ][4]に従ってください。

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ja/serverless/forwarder/
[4]: /ja/serverless/guide/serverless_tracing_and_webpack/
[5]: https://webpack.js.org/
[6]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "AWS SAM" %}}

[Datadog CloudFormation マクロ][1]は、SAM アプリケーションテンプレートを自動的に変換して、レイヤーを使用して Datadog Lambda ライブラリを関数に追加し、[Datadog Forwarder][2] を介してメトリクス、トレース、ログを Datadog に送信するように関数を構成します。

### Install

[AWS 認証情報][3]で次のコマンドを実行して、マクロ AWS リソースをインストールする CloudFormation スタックをデプロイします。アカウントの特定のリージョンに一度だけマクロをインストールする必要があります。マクロを最新バージョンに更新するには、`create-stack` を `update-stack` に置き換えます。

```sh
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

マクロが表示され、使用を開始できます。

### インスツルメントする

`template.yml` で、SAM の `AWS::Serverless` 変換の**後に**、`Transform` セクションの下に以下を追加します。

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      stackName: !Ref "AWS::StackName"
      nodeLayerVersion: "{{< latest-lambda-layer-version layer="node" >}}"
      forwarderArn: "<FORWARDER_ARN>"
      service: "<SERVICE>" # オプション
      env: "<ENV>" # オプション
```

関数をインスツルメントするには、AWS CDK アプリの `Stack` オブジェクトに `DatadogServerless` 変換と `CfnMapping` を追加します。以下の Python のサンプルコードを参照してください (他の言語での使用方法も同様です)。
- `<FORWARDER_ARN>` を Forwarder ARN に置き換えます ([Forwarder のドキュメント][2]を参照)。
- `<SERVICE>` と `<ENV>` をサービスと環境の値に置き換えます。

Lambda 関数が、コード署名を使用するよう構成してある場合、マクロを使用するには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][4]に追加する必要があります。

[マクロのドキュメント][1]に詳細と追加のパラメーターがあります。

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/ja/serverless/forwarder/
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "AWS CDK" %}}

以下を行うことで、[Datadog CDK コンストラクト][1]でサーバーレスアプリケーションからのメトリクス、トレース、ログの収集を自動的に構成できます。

- Python および Node.js Lambda 関数用に Datadog Lambda ライブラリをインストールし構成。
- Lambda 関数からのトレースおよびカスタムメトリクスの収集を有効化。
- Datadog Forwarder から Lambda 関数ロググループへのサブスクリプションを管理。

### Install

CDK プロジェクトで以下の Yarn または NPM コマンドを実行し、Datadog CDK Constructs ライブラリをインストールします。

```sh
#Yarn
yarn add --dev datadog-cdk-constructs

#NPM
npm install datadog-cdk-constructs --save-dev
```

### インスツルメントする

関数をインスツルメントするには、AWS CDK アプリで `datadog-cdk-construct` モジュールをインポートして、以下のコンフィギュレーションを追加します (この例では TypeScript ですが、他の言語でも使用する場合も同様です)。

```typescript
import * as cdk from "@aws-cdk/core";
import { Datadog } from "datadog-cdk-constructs";

class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const datadog = new Datadog(this, "Datadog", {
      nodeLayerVersion: {{< latest-lambda-layer-version layer="node" >}},
      forwarderArn: "<FORWARDER_ARN>",
      service: "<SERVICE>",  // オプション
      env: "<ENV>",  // オプション
    });
    datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>])
  }
}
```

関数をインスツルメントするには、AWS CDK アプリの `Stack` オブジェクトに `DatadogServerless` 変換と `CfnMapping` を追加します。以下の Python のサンプルコードを参照してください (他の言語での使用方法も同様です)。

- `<FORWARDER_ARN>` を Forwarder ARN に置き換えます ([Forwarder のドキュメント][2]を参照)。
- `<SERVICE>` と `<ENV>` をサービスと環境の値に置き換えます。

Lambda 関数が、コード署名を使用するよう構成してある場合、マクロを使用するには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][3]に追加する必要があります。

さらに詳しい情報や、追加パラメーターについては、[Datadog CDK NPM ページ][1]をご覧ください。


[1]: https://www.npmjs.com/package/datadog-cdk-constructs
[2]: https://docs.datadoghq.com/ja/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Container Image" %}}

### Install

Lambda 関数をコンテナイメージとしてデプロイする場合は、Datadog Lambda ライブラリをレイヤーとして使用できません。代わりに、Datadog Lambda ライブラリを、イメージ内の関数の依存関係としてインストールする必要があります。Datadog トレーシングを使用している場合は、`dd-trace` もインストールする必要があります。

**NPM**:

```sh
npm install --save datadog-lambda-js dd-trace
```

**Yarn**:

```sh
yarn add datadog-lambda-js dd-trace
```

**注**: `datadog-lambda-js` パッケージのマイナーバージョンは、常にレイヤーのバージョンに一致します。たとえば、`datadog-lambda-js v0.5.0` は、レイヤーバージョン 5 のコンテンツに一致します。

### 構成

以下の手順に従って、関数を構成します。

1. イメージの `CMD` 値を `node_modules/datadog-lambda-js/dist/handler.handler` に設定します。AWS で設定するか、Dockerfile 内で直接設定します。**注**: 両方の値を設定した場合、AWS で設定した値が Dockerfile 内の値をオーバーライドします。
2. AWS で以下の環境変数を設定します。
  - 元のハンドラーに `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。
  - `DD_TRACE_ENABLED` を `true` に設定します。
  - `DD_FLUSH_TO_LOG` を `true` に設定します。
3. オプションで、関数に `service` および `env` タグを適切な値とともに追加します。

### サブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブします。

1. [まだの場合は、Datadog Forwarder をインストールします][1]。
2. [Datadog Forwarder を関数のロググループにサブスクライブします][2]。


[1]: https://docs.datadoghq.com/ja/serverless/forwarder/
[2]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{% tab "Custom" %}}

### Install

Datadog Lambda ライブラリは、レイヤーまたは JavaScript パッケージとしてインポートすることができます。

`datadog-lambda-js` パッケージのマイナーバージョンは、常にレイヤーのバージョンに一致します。たとえば、datadog-lambda-js v0.5.0 は、レイヤーバージョン 5 のコンテンツに一致します。

#### レイヤーの使用

以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][8]します。

```
# us、us3、us5、eu リージョンの場合
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>

# 米国政府リージョンの場合
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>

```

利用可能な `RUNTIME` オプションは {{< latest-lambda-layer-version layer="node-versions" >}} です。最新の `VERSION` は `{{< latest-lambda-layer-version layer="node" >}}` です。例:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-{{< latest-lambda-layer-version layer="node-example-version" >}}:{{< latest-lambda-layer-version layer="node" >}}
```

Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog Lambda ライブラリをレイヤーとして追加するには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][2]に追加する必要があります。

#### パッケージの使用

**NPM**:

```
npm install --save datadog-lambda-js
```

**Yarn**:

```
yarn add datadog-lambda-js
```

[最新リリース][3]を参照。

### 構成

以下の手順に従って、関数を構成します。

1. 関数のハンドラーを、レイヤーを使用する場合は `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler` に、パッケージを使用する場合は `node_modules/datadog-lambda-js/dist/handler.handler` に設定します。
2. 元のハンドラーに、環境変数 `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。
3. 環境変数 `DD_TRACE_ENABLED` を `true` に設定します。
4. 環境変数 `DD_FLUSH_TO_LOG` を `true` に設定します。
5. オプションで、関数に `service` および `env` タグを適切な値とともに追加します。

**注**: Lambda 関数が Datadog のトレーシングライブラリと　[Webpack][5] を同時に使用している場合は、これらの[追加のコンフィギュレーションステップ][4]に従ってください。

### サブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブします。

1. [まだの場合は、Datadog Forwarder をインストールします][6]。
2. [Datadog Forwarder を関数のロググループにサブスクライブします][7]。

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[3]: https://www.npmjs.com/package/datadog-lambda-js
[4]: /ja/serverless/guide/serverless_tracing_and_webpack/
[5]: https://webpack.js.org/
[6]: https://docs.datadoghq.com/ja/serverless/forwarder/
[7]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[8]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html

{{% /tab %}}
{{< /tabs >}}

### タグ

オプションではありますが、Datadog では以下の[統合サービスタグ付けのドキュメント][2]に従いサーバーレスアプリケーションに `env`、`service`、`version` タグをタグ付けすることをお勧めします。

## 確認

以上の方法で関数を構成すると、[Serverless Homepage][3] でメトリクス、ログ、トレースを確認できるようになります。

## カスタムビジネスロジックの監視

カスタムメトリクスまたはスパンの送信をご希望の場合は、以下のコード例をご参照ください。

```javascript
const { sendDistributionMetric, sendDistributionMetricWithDate } = require("datadog-lambda-js");
const tracer = require("dd-trace");

// "sleep" という名前のカスタムスパンを送信します
const sleep = tracer.wrap("sleep", (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
});

exports.handler = async (event) => {
  // Lambda 関数スパンにカスタムタグを追加します
  // X-Ray トレーシングが有効になっている場合は機能しません
  const span = tracer.scope().active();
  span.setTag('customer_id', '123456');

  await sleep(100);

  // カスタムスパンを送信します
  const sandwich = tracer.trace('hello.world', () => {
    console.log('Hello, World!');
  });

  // カスタムメトリクスを送信します
  sendDistributionMetric(
    "coffee_house.order_value", // メトリクス名
    12.45, // メトリクス値
    "product:latte", // タグ
    "order:online", // タグ
  );

  // タイムスタンプ付きのカスタムメトリクスを送信します
  sendDistributionMetricWithDate(
    "coffee_house.order_value", // メトリクス名
    12.45, // メトリクス値
    new Date(Date.now()), // 日付、過去 20 分以内である必要があります
    "product:latte", // タグ
    "order:online", // タグ
  );

  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from serverless!"),
  };
  return response;
};
```

カスタムメトリクス送信の詳細については、[Serverless Custom Metrics][4] を参照してください。カスタムインスツルメンテーションの詳細については、[カスタムインスツルメンテーション][5]の Datadog APM ドキュメントを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/serverless/forwarder
[2]: /ja/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[3]: https://app.datadoghq.com/functions
[4]: /ja/serverless/custom_metrics?tab=nodejs
[5]: /ja/tracing/custom_instrumentation/nodejs/