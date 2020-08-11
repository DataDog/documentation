---
title: Node.js アプリケーションのインスツルメンテーション
kind: ドキュメント
further_reading:
  - link: serverless/installation/node
    tag: Documentation
    text: Node.js サーバーレスモニタリングのインストール
  - link: serverless/installation/ruby
    tag: Documentation
    text: Ruby サーバーレスモニタリングのインストール
---
[AWS インテグレーションをインストール][1]したら、以下のいずれかの方法を選択してアプリケーションをインスツルメントし、Datadog にメトリクス、ログ、トレースを送信します。

## 構成

{{< tabs >}}
{{% tab "Serverless Framework" %}}

コードを変更せずにメトリクス、ログ、トレースをアプリケーションから Datadog へ送信するには、[Datadog サーバーレスプラグイン][1]を使用します。プラグインにより、Node.js 用 Datadog Lambda ライブラリがレイヤーを使用した関数に自動的にアタッチされます。そしてデプロイ時に、元の関数ハンドラーは、Datadog Lambda ライブラリを初期化し元の関数ハンドラーを呼び出す Datadog 提供ハンドラーに置き換えられます。また、これにより Lambda 関数の Datadog および X-Ray トレーシングが可能になります。

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
        flushMetricsToLogs: true
        forwarder: # The Datadog Forwarder ARN goes here.
    ```
    Forwarder ARN について、および Forwarder のインストール方法に関する詳細は、[Forwarder ドキュメント][2]をご参照ください。
4. サーバーレスアプリケーションを再デプロイします。

[1]: https://github.com/DataDog/serverless-plugin-datadog
[2]: https://docs.datadoghq.com/ja/serverless/forwarder/
{{% /tab %}}
{{% tab "AWS SAM" %}}

<div class="alert alert-warning"> このサービスは公開ベータ版です。フィードバックがございましたら、<a href="/help">Datadog サポートチーム</a>までお寄せください。</div>

### Datadog CloudFormation マクロのデプロイ

コードをインスツルメントせずにアプリケーションからトレースを取り込むには、[Datadog CloudFormation マクロ][1]を使用します。マクロは、Node.js と Python 用の Datadog Lambda ライブラリを関数に自動的にアタッチします。デプロイ時に、既存の関数をラップする新しいハンドラー関数を生成し、Lambda ライブラリを初期化します。

マクロをインストールするには、次の手順に従います。

1. ローカル環境で Datadog CloudFormation マクロレポジトリのクローンを作成します。
```
git clone https://github.com/DataDog/datadog-cloudformation-macro.git
```
2. マクロとその依存関係をインストールします。
```
yarn install # Yarn users
npm install  # NPM users
```
3. ビルドスクリプトを実行します。
```
yarn build    # Yarn users
npm run build # NPM users
```

Lambda 関数と同じリージョンにマクロをデプロイします。Lambda 関数を監視するすべてのリージョンにマクロをデプロイする必要があります。

4. マクロ用に CloudFormation アーティファクトを保存するには S3 バケットが必要です。まだバケットがない場合は、作成できます。

    ```bash
      aws s3 mb s3://<bucket name>
    ```

5. 提供されている CloudFormation テンプレート (`macro_template.yml`) のパッケージを実行します。これには、Lambda 関数および CloudFormation マクロソースが含まれます。このテンプレートは AWS Serverless Application Model (SAM) を使用するため、デプロイ前に変化する必要があります。

 ```bash
    aws cloudformation package \
        --template-file macro_template.yml \
        --s3-bucket <your bucket name here> \
        --output-template-file packaged.template
    ```

6. パッケージ化された CloudFormation テンプレートを CloudFormation スタックにデプロイします。

    ```bash
    aws cloudformation deploy \
        --stack-name datadog-cfn-macro \
        --template-file packaged.template \
        --capabilities CAPABILITY_IAM
    ```

マクロが表示され、使用を開始できます。

### Datadog Lambda ライブラリのインストール

コードをインスツルメントせずにアプリケーションからトレース、ログ、拡張メトリクスを取り込むには、Datadog CloudFormation マクロを使用します。マクロは、Node.js と Python 用の Datadog Lambda ライブラリを関数に自動的にアタッチします。デプロイ時に、既存の関数をラップする新しいハンドラー関数を生成し、Lambda ライブラリを初期化します。

CloudFormation マクロを使用して Datadog Lambda ライブラリをインストールするには、次の手順に従います。

1. `template.yml` に以下を追加します。
  ```
  Transform:
      - Name: DatadogCfnMacro
      Parameters:
        enableDDTracing: true
              flushMetricsToLogs: true
        stackName: !Ref "AWS::StackName"
              forwarderArn: "arn:aws:lambda:<REGION>:<ACCOUNT-ID>:function:datadog-forwarder"
  ```
  Datadog Forwarder ARN は、[AWS コンソール][2]にあります。Forwarder のインストールに関する詳細は、[公式ドキュメント][3]をご参照ください。

2. サーバーレスアプリケーションを再デプロイします。


[1]: https://github.com/DataDog/datadog-cloudformation-macro
[2]: https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder
[3]: https://docs.datadoghq.com/ja/serverless/forwarder/
{{% /tab %}}

{{% tab "AWS CDK" %}}

<div class="alert alert-warning"> このサービスは公開ベータ版です。フィードバックがございましたら、<a href="/help">Datadog サポートチーム</a>までお寄せください。</div>

### Datadog CloudFormation マクロのデプロイ

コードをインスツルメントせずにアプリケーションからトレースを取り込むには、[Datadog CloudFormation マクロ][1]を使用します。マクロは、Node.js と Python 用の Datadog Lambda ライブラリを関数に自動的にアタッチします。デプロイ時に、既存の関数をラップする新しいハンドラー関数を生成し、Lambda ライブラリを初期化します。

マクロをインストールするには、次の手順に従います。

1. ローカル環境で Datadog CloudFormation マクロレポジトリのクローンを作成します。

    ```
    git clone https://github.com/DataDog/datadog-cloudformation-macro.git
    ```

2. マクロとその依存関係をインストールします。

    ```
    yarn install # Yarn users
    npm install  # NPM users
    ```

3. ビルドスクリプトを実行します。

    ```
    yarn build    # Yarn users
    npm run build # NPM users
    ```

Lambda 関数と同じリージョンにマクロをデプロイします。Lambda 関数を監視するすべてのリージョンにマクロをデプロイする必要があります。

4. マクロ用に CloudFormation アーティファクトを保存するには S3 バケットが必要です。まだバケットがない場合は、作成できます。

    ```bash
      aws s3 mb s3://<bucket name>
    ```

5. 提供されている CloudFormation テンプレート (`macro_template.yml`) のパッケージを実行します。これには、Lambda 関数および CloudFormation マクロソースが含まれます。このテンプレートは AWS Serverless Application Model (SAM) を使用するため、デプロイ前に変化する必要があります。

    ```bash
    aws cloudformation package \
        --template-file macro_template.yml \
        --s3-bucket <your bucket name here> \
        --output-template-file packaged.template
    ```

6. パッケージ化された CloudFormation テンプレートを CloudFormation スタックにデプロイします。

    ```bash
    aws cloudformation deploy \
        --stack-name datadog-cfn-macro \
        --template-file packaged.template \
        --capabilities CAPABILITY_IAM
    ```

マクロが表示され、使用を開始できます。

### Datadog Lambda ライブラリのインストール

コードをインスツルメントせずにアプリケーションからトレース、ログ、拡張メトリクスを取り込むには、Datadog CloudFormation マクロを使用します。マクロは、Node.js と Python 用の Datadog Lambda ライブラリを関数に自動的にアタッチします。デプロイ時に、既存の関数をラップする新しいハンドラー関数を生成し、Lambda ライブラリを初期化します。

CloudFormation マクロを使用して Datadog Lambda ライブラリをインストールするには、次の手順に従います。

1. AWS CDK アプリで、`CfnMapping` を `Stack` オブジェクトに追加します。
  ```typescript
      import * as cdk from "@aws-cdk/core";

      class CdkStack extends cdk.Stack {
        constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
          super(scope, id, props);
          this.addTransform("DatadogCfnMacro");

          new cdk.CfnMapping(this, "Datadog", {
            mapping: {
              Parameters: {
                forwarderArn: "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder",
                stackName: this.stackName,
                enableDDTracing: true,
                flushMetricsToLogs: true,
              },
            },
          });
        }
      }
  ```
    Datadog Forwarder ARN は、[AWS コンソール][2]にあります。Forwarder のインストールに関する詳細は、[公式ドキュメント][3]をご参照ください。

2. サーバーレスアプリケーションを再デプロイします。


[1]: https://github.com/DataDog/datadog-cloudformation-macro
[2]: https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder
[3]: https://docs.datadoghq.com/ja/serverless/forwarder/
{{% /tab %}}
{{% tab "Custom" %}}

### Datadog Lambda ライブラリのインストール

Datadog Lambda ライブラリは、レイヤーまたは JavaScript パッケージとしてインポートすることができます。

`datadog-lambda-js` パッケージのマイナーバージョンは、常にレイヤーのバージョンに一致します。例: datadog-lambda-js v0.5.0 は、レイヤーバージョン 5 のコンテンツに一致。

#### レイヤーの使用

以下のフォーマットで、ARN を使用して Lambda 関数に[レイヤーを構成][1]します。

```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>
```

使用できる `RUNTIME` オプションは、`Node8-10`、`Node10-x`、`Node12-x` です。`VERSION` については、[最新リリース][2]を参照してください。例:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Node12-x:25
```

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

### 関数の構成

1. 関数のハンドラーを、レイヤーを使用する場合は `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler` に、パッケージを使用する場合は `node_modules/datadog-lambda-js/dist/handler.handler` に設定します。
2. 元のハンドラーに、環境変数 `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。
3. 環境変数 `DD_TRACE_ENABLED` を `true` に設定します。
4. 環境変数 `DD_FLUSH_TO_LOG` を `true` に設定します。
5. オプションで、関数に `service` および `env` タグを適切な値とともに追加します。

### Datadog Forwarder をロググループにサブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブする必要があります。

1. [まだの場合は、Datadog Forwarder をインストールします][4]。
2. [DdFetchLambdaTags のオプションが有効であることを確認します][5]。
3. [Datadog Forwarder を関数のロググループにサブスクライブします][6]。


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://github.com/DataDog/datadog-lambda-layer-js/releases
[3]: https://www.npmjs.com/package/datadog-lambda-js
[4]: https://docs.datadoghq.com/ja/serverless/forwarder/
[5]: https://docs.datadoghq.com/ja/serverless/forwarder/#experimental-optional
[6]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{< /tabs >}}

## Datadog サーバーレスモニタリングの利用

以上の方法で関数を構成すると、[Serverless ページ][2]でメトリクス、ログ、トレースを確認できるようになります。カスタムメトリクスの送信または関数の手動インスツルメントをご希望の場合は、以下のコード例をご参照ください。

```javascript
const { sendDistributionMetric } = require("datadog-lambda-js");
const tracer = require("dd-trace");

// これにより、"sleep" という名前のスパンが生成
const sleep = tracer.wrap("sleep", (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
});

exports.handler = async (event) => {
  await sleep(1000);
  sendDistributionMetric(
    "coffee_house.order_value", // metric name
    12.45, // metric Value
    "product:latte", // tag
    "order:online", // another tag
  );
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from serverless!"),
  };
  return response;
};
```

[1]: /ja/serverless/#1-install-the-cloud-integration
[2]: https://app.datadoghq.com/functions