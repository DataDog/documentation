---
title: Node.js アプリケーションのインスツルメンテーション
kind: ドキュメント
further_reading:
  - link: /serverless/serverless_integrations/plugin/
    tag: Documentation
    text: Datadog サーバーレスプラグイン
  - link: /serverless/serverless_integrations/macro/
    tag: Documentation
    text: Datadog のサーバーレスマクロ
  - link: /serverless/serverless_integrations/cli/
    tag: Documentation
    text: Datadog サーバーレス CLI
  - link: serverless/serverless_tagging/
    tag: Documentation
    text: サーバーレスアプリケーションのタグ付け
  - link: serverless/distributed_tracing/
    tag: Documentation
    text: サーバーレスアプリケーションのトレース
  - link: serverless/custom_metrics/
    tag: Documentation
    text: サーバーレスアプリケーションからのカスタムメトリクスの送信
---
## 必須セットアップ

未構成の場合:

- [AWS インテグレーション][1]をインストールします。これにより、Datadog は AWS から Lambda メトリクスを取り込むことができます。
- AWS Lambda トレース、拡張メトリクス、カスタムメトリクス、ログの取り込みに必要な [Datadog Forwarder Lambda 関数][2]をインストールします。

[AWS インテグレーション][1]と [Datadog Forwarder][2] をインストールしたら、手順に従ってアプリケーションをインスツルメントし、Datadog にメトリクス、ログ、トレースを送信します。

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
        forwarder: # The Datadog Forwarder ARN goes here.
    ```
   Datadog Forwarder ARN またはインストールの詳細については、[こちら][2]を参照してください。追加の設定については、[プラグインのドキュメント][1]を参照してください。

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ja/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "AWS SAM" %}}

[Datadog CloudFormation マクロ][1]は、SAM アプリケーションテンプレートを自動的に変換して、レイヤーを使用して Datadog Lambda ライブラリを関数に追加し、[Datadog Forwarder][2] を介してメトリクス、トレース、ログを Datadog に送信するように関数を構成します。

### Datadog CloudFormation マクロのインストール

[AWS 認証情報][3]で次のコマンドを実行して、マクロ AWS リソースをインストールする CloudFormation スタックをデプロイします。アカウントの特定のリージョンに一度だけマクロをインストールする必要があります。マクロを最新バージョンに更新するには、`create-stack` を `update-stack` に置き換えます。

```sh
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

マクロが表示され、使用を開始できます。

### 関数をインスツルメントする

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

[Datadog CloudFormation マクロ][1]は、AWS CDK によって生成された CloudFormation テンプレートを自動的に変換して、レイヤーを使用して Datadog Lambda ライブラリを関数に追加し、[Datadog Forwarder][2] を介してメトリクス、トレース、ログを Datadog に送信するように関数を構成します。

### Datadog CloudFormation マクロのインストール

[AWS 認証情報][3]で次のコマンドを実行して、マクロ AWS リソースをインストールする CloudFormation スタックをデプロイします。アカウントの特定のリージョンに**一度だけ**マクロをインストールする必要があります。マクロを最新バージョンに更新するには、`create-stack` を `update-stack` に置き換えます。

```sh
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

マクロが表示され、使用を開始できます。

### 関数をインスツルメントする

AWS CDK アプリの `Stack` オブジェクトに `DatadogServerless` 変換と `CfnMapping` を追加します。以下の TypeScript のサンプルコードを参照してください (他の言語での使用方法も同様です)。

```typescript
import * as cdk from "@aws-cdk/core";

class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.addTransform("DatadogServerless");

    new cdk.CfnMapping(this, "Datadog", {
      mapping: {
        Parameters: {
          nodeLayerVersion: "<LAYER_VERSION>",
          forwarderArn: "<FORWARDER_ARN>",
          stackName: this.stackName,
          service: "<SERVICE>", // オプション
          env: "<ENV>", // オプション
        },
      },
    });
  }
}
```

`<SERVICE>` と `<ENV>` を適切な値に置き換え、`<LAYER_VERSION>` を目的のバージョンの Datadog Lambda レイヤーに置き換え ([最新リリース][3]を参照)、`<FORWARDER_ARN>` を Forwarder ARN に置き換えます ([Forwarder のドキュメント][2]を参照)。

Lambda 関数が、コード署名を使用するよう構成してある場合、マクロを使用するには事前に Datadog の署名プロフィール ARN (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) を関数の[コード署名コンフィギュレーション][4]に追加する必要があります。

[マクロのドキュメント][1]に詳細と追加のパラメーターがあります。

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/ja/serverless/forwarder/
[3]: https://github.com/DataDog/datadog-lambda-js/releases
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Datadog CLI" %}}

<div class="alert alert-warning"> このサービスは公開ベータ版です。フィードバックがございましたら、<a href="/help">Datadog サポートチーム</a>までお寄せください。</div>

Datadog CLI を使用して、CI/CD パイプラインの Lambda 関数にインスツルメンテーションを設定します。CLI コマンドは、レイヤーを使用して Datadog Lambda ライブラリを関数に自動的に追加し、メトリクス、トレース、ログを Datadog に送信するように関数を構成します。

### Datadog CLI のインストール

NPM または Yarn を使用して Datadog CLI をインストールします。

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### 関数をインスツルメントする

[AWS 認証情報][1]を使用して次のコマンドを実行します。`<functionname>` と `<another_functionname>` を Lambda 関数名に置き換え、`<aws_region>` を AWS リージョン名に置き換え、`<layer_version>` を目的のバージョンの Datadog Lambda レイヤーに置き換え ([最新リリース][2]を参照)、`<forwarder_arn>` を Forwarder ARN に置き換えます ([Forwarder のドキュメント][3]を参照)。

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

### Datadog Lambda ライブラリのインストール

Lambda 関数をコンテナイメージとしてデプロイする場合は、Datadog Lambda ライブラリをレイヤーとして使用できません。代わりに、Datadog Lambda ライブラリを直接イメージ内にインストールする必要があります。Datadog トレーシングを使用している場合は、`dd-trace` もインストールする必要があります。

**NPM**:

```sh
npm install --save datadog-lambda-js dd-trace
```

**Yarn**:


```sh
yarn add datadog-lambda-js dd-trace
```

`datadog-lambda-js` パッケージのマイナーバージョンは、常にレイヤーのバージョンに一致します。たとえば、`datadog-lambda-js v0.5.0` は、レイヤーバージョン 5 のコンテンツに一致します。

### 関数の構成

1. イメージの `CMD` 値を `node_modules/datadog-lambda-js/dist/handler.handler` に設定します。Dockerfile で直接設定するか、AWS を使用して値を上書きします。
2. 元のハンドラーに、環境変数 `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。
3. 環境変数 `DD_TRACE_ENABLED` を `true` に設定します。
4. 環境変数 `DD_FLUSH_TO_LOG` を `true` に設定します。
5. オプションで、関数に `service` および `env` タグを適切な値とともに追加します。

### Datadog Forwarder をロググループにサブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブする必要があります。

1. [まだの場合は、Datadog Forwarder をインストールします][1]。
2. [Datadog Forwarder を関数のロググループにサブスクライブします][2]。


[1]: https://docs.datadoghq.com/ja/serverless/forwarder/
[2]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{% tab "Custom" %}}

### Datadog Lambda ライブラリのインストール

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

### 関数の構成

1. 関数のハンドラーを、レイヤーを使用する場合は `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler` に、パッケージを使用する場合は `node_modules/datadog-lambda-js/dist/handler.handler` に設定します。
2. 元のハンドラーに、環境変数 `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。
3. 環境変数 `DD_TRACE_ENABLED` を `true` に設定します。
4. 環境変数 `DD_FLUSH_TO_LOG` を `true` に設定します。
5. オプションで、関数に `service` および `env` タグを適切な値とともに追加します。

### Datadog Forwarder をロググループにサブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブする必要があります。

1. [まだの場合は、Datadog Forwarder をインストールします][5]。
2. [Datadog Forwarder を関数のロググループにサブスクライブします][6]。


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
[4]: https://www.npmjs.com/package/datadog-lambda-js
[5]: https://docs.datadoghq.com/ja/serverless/forwarder/
[6]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{< /tabs >}}

### 統合サービスタグ付け

これはオプションですが、Datadog は、[統合サービスタグ付けのドキュメント][3]に従って、サーバーレスアプリケーションに `env`、`service`、`version` タグをタグ付けすることを強くお勧めします。

## Datadog サーバーレスモニタリングの利用

以上の方法で関数を構成すると、[Serverless Homepage][4] でメトリクス、ログ、トレースを確認できるようになります。

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

カスタムメトリクス送信の詳細については、[ここ][5]を参照してください。カスタムインスツルメンテーションの詳細については、[カスタムインスツルメンテーション][6]の Datadog APM ドキュメントを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/amazon_web_services/
[2]: /ja/serverless/forwarder
[3]: /ja/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[4]: https://app.datadoghq.com/functions
[5]: /ja/serverless/custom_metrics?tab=nodejs
[6]: /ja/tracing/custom_instrumentation/nodejs/