---
title: Datadog Forwarder を使用する - ノード
kind: ガイド
---
Datadog Serverless の新規ユーザーには、Datadog で[すぐに使用可能な Lambda 機能][1]を使用することをおすすめします。ただし、Lambda で提供される機能の前に Datadog Forwarder を使用して Datadog Serverless をセットアップしてある場合は、インスタンスを維持するためこのガイドをご利用ください。

## 必須セットアップ

未構成の場合:

- [AWS インテグレーション][2]をインストールします。これにより、Datadog は AWS から Lambda メトリクスを取り込むことができます。
- AWS Lambda トレース、拡張メトリクス、カスタムメトリクス、ログの取り込みに必要な [Datadog Forwarder Lambda 関数][3]をインストールします。

[AWS インテグレーション][2]と [Datadog Forwarder][3] をインストールしたら、手順に従ってアプリケーションをインスツルメントし、Datadog にメトリクス、ログ、トレースを送信します。

## コンフィギュレーション

{{< tabs >}}
{{% tab "Serverless Framework" %}}

[Datadog Serverless Plugin][1] は、レイヤーを使用して Datadog Lambda ライブラリを関数に自動的に追加し、[Datadog Forwarder][2] を介してメトリクス、トレース、ログを Datadog に送信するように関数を構成します。

Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog Serverless Plugin をインストールする前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][3]に追加する必要があります。

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
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[4]: /ja/serverless/troubleshooting/serverless_tracing_and_webpack/
[5]: https://webpack.js.org/
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
      nodeLayerVersion: "<LAYER_VERSION>"
      forwarderArn: "<FORWARDER_ARN>"
      service: "<SERVICE>" # オプション
      env: "<ENV>" # オプション
```

`<SERVICE>` と `<ENV>` を適切な値に置き換え、`<LAYER_VERSION>` を目的のバージョンの Datadog Lambda レイヤーに置き換え ([最新リリース][4]を参照)、`<FORWARDER_ARN>` を Forwarder ARN に置き換えます ([Forwarder のドキュメント][2]を参照)。

Lambda 関数が、コード署名を使用するよう構成してある場合、マクロを使用するには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][5]に追加する必要があります。

[マクロのドキュメント][1]に詳細と追加のパラメーターがあります。

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/ja/serverless/forwarder/
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://github.com/DataDog/datadog-lambda-js/releases
[5]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
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
      nodeLayerVersion: <LAYER_VERSION>,
      pythonLayerVersion: <LAYER_VERSION>,
      addLayers: <BOOLEAN>,
      forwarderArn: "<FORWARDER_ARN>",
      flushMetricsToLogs: <BOOLEAN>,
      site: "<SITE>",
      apiKey: "{Datadog_API_Key}",
      apiKMSKey: "{Encrypted_Datadog_API_Key}",
      enableDDTracing: <BOOLEAN>,
      injectLogContext: <BOOLEAN>
    });
    datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>])
  }
}
```

`<SERVICE>` および `<ENV>` を適切な値に、`<LAYER_VERSION>` を Datadog Lambda レイヤーの希望バージョン（[最新リリース][2]を参照）に、`<FORWARDER_ARN>` を Forwarder ARN（[Forwarder ドキュメント][3]を参照）に置き換えます。

Lambda 関数が、コード署名を使用するよう構成してある場合、マクロを使用するには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][4]に追加する必要があります。

さらに詳しい情報や、追加パラメーターについては、[Datadog CDK NPM ページ][1]をご覧ください。


[1]: https://www.npmjs.com/package/datadog-cdk-constructs
[2]: https://github.com/DataDog/datadog-lambda-js/releases
[3]: https://docs.datadoghq.com/ja/serverless/forwarder/
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Datadog CLI" %}}

<div class="alert alert-warning"> このサービスは公開ベータ版です。フィードバックがございましたら、<a href="/help">Datadog サポートチーム</a>までお寄せください。</div>

Datadog CLI を使用して、CI/CD パイプラインの Lambda 関数にインスツルメンテーションを設定します。CLI コマンドは、レイヤーを使用して Datadog Lambda ライブラリを関数に自動的に追加し、メトリクス、トレース、ログを Datadog に送信するように関数を構成します。

### Install

NPM または Yarn を使用して Datadog CLI をインストールします。

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### インスツルメントする

関数をインスツルメントするには、[AWS 認証情報][1]を使用して次のコマンドを実行します。`<functionname>` と `<another_functionname>` を Lambda 関数名に置き換え、`<aws_region>` を AWS リージョン名に置き換え、`<layer_version>` を目的のバージョンの Datadog Lambda レイヤーに置き換え ([最新リリース][2]を参照)、`<forwarder_arn>` を Forwarder ARN に置き換えます ([Forwarder のドキュメント][3]を参照)。

```sh
datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v <layer_version> --forwarder <forwarder_arn>
```

例:

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v 26 --forwarder arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder
```

Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog CLI でインスツルメントするには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][4]に追加する必要があります。

[CLI のドキュメント][5]に詳細と追加のパラメーターがあります。

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://github.com/DataDog/datadog-lambda-js/releases
[3]: https://docs.datadoghq.com/ja/serverless/forwarder/
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[5]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/cli
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

`datadog-lambda-js` パッケージのマイナーバージョンは、常にレイヤーのバージョンに一致します。例: datadog-lambda-js v0.5.0 は、レイヤーバージョン 5 のコンテンツに一致。

#### レイヤーの使用

以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

```
# 通常のリージョンの場合
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>

# 米国政府リージョンの場合
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>
```

使用できる `RUNTIME` オプションは、`Node10-x`、`Node12-x` です。`VERSION` については、[最新リリース][2]を参照してください。例:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Node12-x:25
```

Lambda 関数が、コード署名を使用するよう構成してある場合、Datadog Lambda ライブラリをレイヤーとして追加するには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][3]に追加する必要があります。

#### パッケージの使用

**NPM**:

```
npm install --save datadog-lambda-js
```

**Yarn**:

```
yarn add datadog-lambda-js
```

[最新リリース][4]を参照。

### 構成

以下の手順に従って、関数を構成します。

1. 関数のハンドラーを、レイヤーを使用する場合は `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler` に、パッケージを使用する場合は `node_modules/datadog-lambda-js/dist/handler.handler` に設定します。
2. 元のハンドラーに、環境変数 `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。
3. 環境変数 `DD_TRACE_ENABLED` を `true` に設定します。
4. 環境変数 `DD_FLUSH_TO_LOG` を `true` に設定します。
5. オプションで、関数に `service` および `env` タグを適切な値とともに追加します。

**注**: Lambda 関数が Datadog のトレーシングライブラリと　[Webpack][6] を同時に使用している場合は、これらの[追加のコンフィギュレーションステップ][6]に従ってください。

### サブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブします。

1. [まだの場合は、Datadog Forwarder をインストールします][7]。
2. [Datadog Forwarder を関数のロググループにサブスクライブします][8]。


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[4]: https://www.npmjs.com/package/datadog-lambda-js
[5]: /ja/serverless/troubleshooting/serverless_tracing_and_webpack/
[6]: https://webpack.js.org/
[7]: https://docs.datadoghq.com/ja/serverless/forwarder/
[8]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{< /tabs >}}

### タグ

これはオプションですが、Datadog は、[統合サービスタグ付けのドキュメント][4]に従って、サーバーレスアプリケーションに `env`、`service`、`version` タグをタグ付けすることを強くお勧めします。

## 確認

以上の方法で関数を構成すると、[Serverless Homepage][5] でメトリクス、ログ、トレースを確認できるようになります。

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

カスタムメトリクス送信の詳細については、[ここ][6]を参照してください。カスタムインスツルメンテーションの詳細については、[カスタムインスツルメンテーション][7]の Datadog APM ドキュメントを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/serverless/installation
[2]: /ja/integrations/amazon_web_services/
[3]: /ja/serverless/forwarder
[4]: /ja/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[5]: https://app.datadoghq.com/functions
[6]: /ja/serverless/custom_metrics?tab=nodejs
[7]: /ja/tracing/custom_instrumentation/nodejs/