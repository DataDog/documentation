---
aliases:
- /ja/serverless/distributed_tracing/collect_lambda_payloads
- /ja/serverless/libraries_integrations/lambda_code_signing
- /ja/serverless/guide/forwarder_extension_migration/
- /ja/serverless/guide/extension_private_link/
- /ja/serverless/configuration
further_reading:
- link: /serverless/installation/
  tag: ドキュメント
  text: AWS Lambda のためのサーバーレスモニタリングのインストール
- link: /serverless/troubleshooting/
  tag: ドキュメント
  text: AWS Lambda のためのサーバーレスモニタリングのトラブルシューティング
- link: /integrations/github
  tag: ドキュメント
  text: Datadog GitHub インテグレーション
- link: https://learn.datadoghq.com/courses/visibility-aws-lambda
  tag: ラーニングセンター
  text: Datadog の Serverless Monitoring 用 AWS Lambda の構成
title: AWS Lambda のためのサーバーレスモニタリングの構成
---
まず、メトリクス、トレース、およびログの収集を開始するために、Datadog Serverless Monitoring を[インストール][1]します。インストールが完了したら、監視ニーズに合わせてインストールを構成する方法については、以下のトピックを参照してください。

- [タグを使ったテレメトリー接続](#connect-telemetry-using-tags)
- [リクエストとレスポンスのペイロードを収集する](#collect-the-request-and-response-payloads)
- [非 Lambda リソースからトレースを収集する](#collect-traces-from-non-lambda-resources)
- [Datadog SDK を構成する](#configure-the-datadog-sdk)
- [APM スパンを取り込む際のサンプリングレートの選択](#select-sampling-rates-for-ingesting-apm-spans)
- [トレースから機密情報をフィルタリングまたはスクラブする](#filter-or-scrub-sensitive-information-from-traces)
- [トレース収集の有効化/無効化](#enabledisable-trace-collection)
- [ログとトレースの接続](#connect-logs-and-traces)
- [ソースコードにエラーをリンクする](#link-errors-to-your-source-code)
- [カスタムメトリクスの送信][27]
- [プロファイリングデータの収集](#collect-profiling-data)
- [PrivateLink またはプロキシ経由でテレメトリーを送信する](#send-telemetry-over-privatelink-or-proxy)
- [複数の Datadog 組織にテレメトリーを送信する](#send-telemetry-to-multiple-datadog-organizations)
- [FIPS コンプライアンスを有効にする](#enable-fips-compliance)
- [AWS リソース上でトレースコンテキストを伝播させる](#propagate-trace-context-over-aws-resources)
- [X-Ray と Datadog のトレースをマージする](#merge-x-ray-and-datadog-traces)
- [AWS Lambda のコード署名を有効にする](#enable-aws-lambda-code-signing)
- [Datadog Lambda Extension に移行する](#migrate-to-the-datadog-lambda-extension)
- [Datadog Lambda Extension を使用した x86 から arm64 への移行](#migrating-between-x86-to-arm64-with-the-datadog-lambda-extension)
- [ローカルテスト用の Datadog Lambda Extension の構成](#configure-the-datadog-lambda-extension-for-local-testing)
- [OpenTelemetry API を使用した AWS Lambda のインスツルメンテーション](#instrument-aws-lambda-with-the-opentelemetry-api)
- [Datadog Lambda Extension v67+ を使用する](#using-datadog-lambda-extension-v67)
- [DynamoDB PutItem の自動リンクを構成する](#configure-auto-linking-for-dynamodb-putitem)
- [AWS サービスを正しく可視化およびモデル化する](#visualize-and-model-aws-services-by-resource-name)
- [Observability Pipelines にログを送信する](#send-logs-to-observability-pipelines)
- [API キーのシークレットを定期的に再読み込みする](#reload-api-key-secret-periodically)
- [トラブルシューティング](#troubleshoot)
- [参考資料](#further-reading)


## 脅威の検出を有効にして攻撃の試みを観測する {#enable-threat-detection-to-observe-attack-attempts}

サーバーレスアプリケーションを標的にしている攻撃者についてアラートを受け取り、素早く対応できます。

まずは、関数で[トレーシングが有効][43]になっていることを確認します。

脅威の監視を有効にするには、デプロイに次の環境変数を追加します。
   ```yaml
   environment:
     DD_SERVERLESS_APPSEC_ENABLED: true
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
   ```

関数を再デプロイし、呼び出します。数分後、[AAP ビュー][49]に表示されます。

App and API Protection の脅威検出を実際に確認するには、既知の攻撃パターンをアプリケーションに送信します。例えば、値 `acunetix-product` の HTTP ヘッダーを送信して、[セキュリティスキャナ攻撃][44]の試行をトリガーします。
   ```sh
   curl -H 'My-AAP-Test-Header: acunetix-product' https://<YOUR_FUNCTION_URL>/<EXISTING_ROUTE>
   ```
アプリケーションを有効化し、攻撃パターンを送信してから数分後、**脅威情報が [Application Signals Explorer][41] に表示されます**。

## タグを使ったテレメトリー接続 {#connect-telemetry-using-tags}

予約済みの (`env`, `service`、`version`) およびカスタムタグを使用して Datadog テレメトリを接続します。これらのタグを使用して、メトリクス、トレース、およびログ間をシームレスにナビゲートできます。使用しているインストール方法に応じて、以下の追加パラメーターを設定します。

{{< tabs >}}
{{% tab "Datadog CLI" %}}

[Datadog CLI][1] の最新バージョンを使用していることを確認し、適切な追加引数を指定して `datadog-ci lambda instrument` コマンドを実行します。例えば、以下のようになります。

```sh
datadog-ci lambda instrument \
    --env dev \
    --service web \
    --version v1.2.3 \
    --extra-tags "team:avengers,project:marvel"
    # ... other required arguments, such as function names
```

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

[Datadog serverless plugin][1] の最新バージョンを使用していることを確認し、`env`、`service`、`version`、`tags` パラメーターを使用してタグを適用します。例えば、以下のようになります。

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    env: dev
    service: web
    version: v1.2.3
    tags: "team:avengers,project:marvel"
```

デフォルトでは、`env` と `service` を定義しない場合、プラグインはサーバーレスアプリケーション定義から `stage` と `service` の値を自動的に使用します。この機能を無効にするには、`enableTags` を `false` に設定します。

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/plugin
{{% /tab %}}
{{% tab "AWS SAM" %}}

[Datadog serverless macro][1] の最新バージョンを使用していることを確認し、`env`、`service`、`version`、`tags` パラメーターを使用してタグを適用します。例えば、以下のようになります。

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... other required parameters, such as the Datadog site and API key
      env: dev
      service: web
      version: v1.2.3
      tags: "team:avengers,project:marvel"
```

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/macro
{{% /tab %}}
{{% tab "AWS CDK" %}}

[Datadog serverless cdk construct][1] の最新バージョンを使用していることを確認し、`env`、`service`、`version`、`tags` パラメーターを使用してタグを適用します。例えば、以下のようになります。

```typescript
const datadog = new DatadogLambda(this, "Datadog", {
    // ... other required parameters, such as the Datadog site and API key
    env: "dev",
    service: "web",
    version: "v1.2.3",
    tags: "team:avengers,project:marvel"
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

[1]: https://github.com/DataDog/datadog-cdk-constructs
{{% /tab %}}
{{% tab "その他" %}}

[Datadog Lambda extension][1] を使用して Lambda 関数からテレメトリーを収集している場合、Lambda 関数に以下の環境変数を設定します。例えば、以下のようになります。
- DD_ENV: dev
- DD_SERVICE: web
- DD_VERSION: v1.2.3
- DD_TAGS: team:avengers,project:marvel

[Datadog Forwarder Lambda function][2] を使用して Lambda 関数からテレメトリを収集している場合、`env`、`service`、`version`、および追加のタグを Lambda 関数の AWS リソースタグとして設定します。Datadog Forwarder の CloudFormation スタックで `DdFetchLambdaTags` オプションが `true` に設定されていることを確認します。このオプションはバージョン 3.19.0 以降、デフォルトで true になります。

[1]: /ja/serverless/libraries_integrations/extension/
[2]: /ja/serverless/libraries_integrations/forwarder/
{{% /tab %}}
{{< /tabs >}}

また、Datadog は、Lambda 関数に定義された既存の AWS リソースタグで、数分遅れで収集したテレメトリーをリッチ化することができます。

- [Datadog Lambda extension][2] を使用して Lambda 関数からテレメトリーを収集している場合、[Datadog AWS インテグレーション][3]を有効にします。この機能は、テレメトリを**カスタム**タグで強化することを目的としています。Datadog の予約タグ (`env`、`service`、および `version`) は、対応する環境変数 (`DD_ENV`、`DD_SERVICE`、および `DD_VERSION`) を通じて設定する必要があります。予約タグは、サーバーレス開発ツール向けの Datadog インテグレーションが提供するパラメーターでも設定できます。この機能は、コンテナイメージでデプロイされた Lambda 関数には対応していません。

- [Datadog Forwarder Lambda function][4] を使って Lambda 関数からテレメトリーを収集している場合、Datadog Forwarder の CloudFormation スタックで、`DdFetchLambdaTags` オプションを `true` に設定します。このオプションはバージョン 3.19.0 以降、デフォルトで true になります。

## リクエストとレスポンスのペイロードを収集する {#collect-the-request-and-response-payloads}

<div class="alert alert-info">この機能は、Python、Node.js、Go、Java、.NET でサポートされています。</div>

Datadog は [AWS Lambda 関数の JSON リクエストとレスポンスのペイロードを収集し可視化する][5]ことで、サーバーレスアプリケーションへの深い洞察と Lambda 関数障害のトラブルシューティングを支援することが可能です。

この機能はデフォルトで無効です。使用しているインストール方法に応じて、以下の手順に従います。

{{< tabs >}}
{{% tab "Datadog CLI" %}}

[Datadog CLI][1] の最新バージョンを使用していることを確認し、`datadog-ci lambda instrument` コマンドを追加の `--capture-lambda-payload` 引数で実行します。例えば、以下のようになります。

```sh
datadog-ci lambda instrument \
    --capture-lambda-payload true
    # ... other required arguments, such as function names
```

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

[Datadog serverless plugin][1] の最新バージョンを使用していることを確認し、`captureLambdaPayload` を `true` に設定します。例えば、以下のようになります。

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    captureLambdaPayload: true
```

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/plugin
{{% /tab %}}
{{% tab "AWS SAM" %}}

[Datadog serverless macro][1] の最新バージョンを使用していることを確認し、`captureLambdaPayload` パラメーターを `true` に設定します。例えば、以下のようになります。

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... other required parameters, such as the Datadog site and API key
      captureLambdaPayload: true
```

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/macro
{{% /tab %}}
{{% tab "AWS CDK" %}}

[Datadog serverless cdk construct][1] の最新バージョンを使用していることを確認し、`captureLambdaPayload` パラメーターを `true` に設定します。例えば、以下のようになります。

```typescript
const datadog = new DatadogLambda(this, "Datadog", {
    // ... other required parameters, such as the Datadog site and API key
    captureLambdaPayload: true
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

[1]: https://github.com/DataDog/datadog-cdk-constructs
{{% /tab %}}
{{% tab "その他" %}}

Lambda 関数で環境変数 `DD_CAPTURE_LAMBDA_PAYLOAD` を `true` に設定します。

{{% /tab %}}
{{< /tabs >}}

リクエストやレスポンスの JSON オブジェクト内の機密データが Datadog に送信されないようにするには、特定のパラメーターをスクラブすることが可能です。

これを行うには、Lambda 関数コードと同じフォルダーに新しいファイル `datadog.yaml` を追加します。Lambda ペイロード内のフィールドの難読化は、`datadog.yaml` の `apm_config` 設定内の [replace_tags ブロック][6]を通じて利用可能です。

```yaml
apm_config:
  replace_tags:
    # Replace all the occurrences of "foobar" in any tag with "REDACTED":
    - name: "*"
      pattern: "foobar"
      repl: "REDACTED"
    # Replace "auth" from request headers with an empty string
    - name: "function.request.headers.auth"
      pattern: "(?s).*"
      repl: ""
    # Replace "apiToken" from response payload with "****"
    - name: "function.response.apiToken"
      pattern: "(?s).*"
      repl: "****"
```

別の方法として、Lambda 関数に環境変数 `DD_APM_REPLACE_TAGS`を設定し、特定のフィールドを難読化することもできます。

```yaml
DD_APM_REPLACE_TAGS=[
      {
        "name": "*",
        "pattern": "foobar",
        "repl": "REDACTED"
      },
      {
        "name": "function.request.headers.auth",
        "pattern": "(?s).*",
        "repl": ""
      },
      {
        "name": "function.response.apiToken",
        "pattern": "(?s).*"
        "repl": "****"
      }
]
```

AWS サービスからのペイロードを収集するには、[AWS サービスからリクエストおよびレスポンスをキャプチャ][54]を参照してください。



## 非 Lambda リソースからトレースを収集する {#collect-traces-from-non-lambda-resources}

Datadog は、Lambda 関数をトリガーする AWS マネージドリソースからの Lambda イベントに基づいて、APM スパンを推定できます。これにより、AWS マネージドリソース間の関係を可視化し、サーバーレスアプリケーションのパフォーマンス問題の特定に役立ちます。[追加の製品詳細][12]を参照してください。

現在、以下のリソースがサポートされています。

- API ゲートウェイ (REST API、HTTP API、WebSocket)
- 関数 URL
- SQS
- SNS (SQS 経由で配信される SNS メッセージもサポートされています)
- Kinesis Streams (データが JSON 文字列または base64 エンコードされた JSON 文字列の場合)
- EventBridge (カスタムイベント。`Details` は JSON 文字列)
- S3
- DynamoDB

この機能を無効にするには、`DD_TRACE_MANAGED_SERVICES` を `false` に設定します。

### DD_SERVICE_MAPPING {#dd-service-mapping}

`DD_SERVICE_MAPPING` は、アップストリームの非 Lambda [サービス名][46]をリネームする環境変数です。`old-service:new-service` のペアで動作します。

#### 構文 {#syntax}

`DD_SERVICE_MAPPING=key1:value1,key2:value2`...

この変数を操作する方法は 2 つあります。

#### タイプのすべてのサービス名を変更 {#rename-all-services-of-a-type}

AWS Lambda インテグレーションに関連するすべてのアップストリームサービスの名前を変更するには、これらの識別子を使用します。

| AWS Lambda インテグレーション | DD_SERVICE_MAPPING 値 |
|---|---|
| `lambda_api_gateway` | `"lambda_api_gateway:newServiceName"` |
| `lambda_sns` | `"lambda_sns:newServiceName"` |
| `lambda_sqs` | `"lambda_sqs:newServiceName"` |
| `lambda_s3` | `"lambda_s3:newServiceName"` |
| `lambda_eventbridge` | `"lambda_eventbridge:newServiceName"` |
| `lambda_kinesis` | `"lambda_kinesis:newServiceName"` |
| `lambda_dynamodb` | `"lambda_dynamodb:newServiceName"` |
| `lambda_url` | `"lambda_url:newServiceName"` |
| `lambda_msk` | `"lambda_msk:newServiceName"` |

#### 特定のサービス名を変更 {#rename-specific-services}

より詳細なアプローチは、これらのサービス固有の識別子を使用します。

| サービス | 識別子 | DD_SERVICE_MAPPING 値 |
|---|---|---|
| API Gateway | API ID | `"r3pmxmplak:newServiceName"` |
| SNS | Topic name | `"ExampleTopic:newServiceName"` |
| SQS | Queue name | `"MyQueue:newServiceName"` |
| S3 | Bucket name | `"example-bucket:newServiceName"` |
| EventBridge | Event source | `"eventbridge.custom.event.sender:newServiceName"` |
| Kinesis | Stream name | `"MyStream:newServiceName"` |
| DynamoDB | Table name | `"ExampleTableWithStream:newServiceName"` |
| Lambda URLs | API ID | `"a8hyhsshac:newServiceName"` |
| MSK | Cluster name | `"ExampleCluster:newServiceName"` |

#### 例と説明 {#examples-with-description}

| コマンド | 説明 |
|---|---|
| `DD_SERVICE_MAPPING="lambda_api_gateway:new-service-name"` | すべての `lambda_api_gateway` アップストリームサービスの名前を `new-service-name` | に変更します。
| `DD_SERVICE_MAPPING="08se3mvh28:new-service-name"` | 特定のアップストリームサービス `08se3mvh28.execute-api.eu-west-1.amazonaws.com` の名前を `new-service-name` | に変更します。

ダウンストリームサービスの名前の変更については、[トレーサーの構成ドキュメント][45]の `DD_SERVICE_MAPPING` を参照してください。

## Datadog SDK を構成する {#configure-the-datadog-sdk}

Datadog APM クライアントによって自動的にインスツルメントされるライブラリやフレームワークについては、[APM の互換性要件][15]を参照してください。カスタムアプリケーションをインスツルメントするには、Datadog の APM ガイドの[カスタムインスツルメンテーション][16]を参照してください。

## APM スパンを取り込む際のサンプリングレートの選択 {#select-sampling-rates-for-ingesting-apm-spans}

サーバーレス関数の [APM トレース付き呼び出しサンプリングレート][17]を管理するには、関数上で `DD_TRACE_SAMPLING_RULES` 環境変数を 0.000 (Lambda 関数呼び出しのトレースなし) と 1.000 (Lambda 関数呼び出しのすべてトレース) の間の値に設定します。

**注**:
   - `DD_TRACE_SAMPLE_RATE` の使用は非推奨です。代わりに `DD_TRACE_SAMPLING_RULES` を使用してください。たとえば、すでに `DD_TRACE_SAMPLE_RATE` を `0.1` に設定している場合は、代わりに `DD_TRACE_SAMPLING_RULES` を `[{"sample_rate":0.1}]` に設定してください。
   - `trace.<OPERATION_NAME>.hits`などの全体的トラフィックメトリクスは、Lambda 内のサンプリングされた呼び出し*のみ*に基づいて計算されます。

トレースデータは非常に反復性が高いため、高スループットのサービスでは、通常、すべてのリクエストを収集する必要はありません。十分重要な問題は、常に複数のトレースで症状を示すはずです。[取り込みのコントロール][18]は、予算の範囲内で、問題のトラブルシューティングに必要な可視性を確保するのに役立ちます。

取り込みのデフォルトのサンプリングメカニズムは[ヘッドベースサンプリング][19]と呼ばれます。トレースを保持するか削除するかの判断は、トレースの最初の段階、つまりルートスパンの開始時に行われます。この決定はその後、リクエストコンテキストの一部として、たとえば HTTP リクエストヘッダーとして他のサービスに伝播されます。判断はトレースの開始時に行われ、その後トレース全体に伝達されるため、効果を反映させるにはルートサービスでサンプリングレートを構成設定する必要があります。

Datadog にスパンが取り込まれた後、Datadog Intelligent Retention Filter は、アプリケーションの健全性を監視するのに役立つトレースの一部をインデックスします。カスタム[保持フィルター][20]を定義して、組織の目標をサポートするために長期間保持したいトレースデータをインデックス化することもできます。

[Datadog Trace Pipeline][21] の詳細についてはこちらをご覧ください。

## トレースから機密情報をフィルタリングまたはスクラブする {#filter-or-scrub-sensitive-information-from-traces}

Datadog に送信する前にトレースをフィルタリングするには、[APM で不要なリソースを無視する][22]を参照してください。

データセキュリティのためにトレース属性をスクラブするには、[データセキュリティのための Datadog Agent またはトレーサーの構成][23]を参照してください。

## トレース収集の有効化/無効化 {#enabledisable-trace-collection}

Datadog Lambda Extension によるトレース収集は、デフォルトで有効になっています。

Lambda 関数のトレース収集を開始したい場合は、以下の構成を適用します。

{{< tabs >}}
{{% tab "Datadog CLI" %}}

```sh
datadog-ci lambda instrument \
    --tracing true
    # ... other required arguments, such as function names
```
{{% /tab %}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    enableDDTracing: true
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... other required parameters, such as the Datadog site and API key
      enableDDTracing: true
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new DatadogLambda(this, "Datadog", {
    // ... other required parameters, such as the Datadog site and API key
    enableDatadogTracing: true
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

{{% /tab %}}
{{% tab "その他" %}}

Lambda 関数で環境変数 `DD_TRACE_ENABLED` を `true` に設定します。

{{% /tab %}}
{{< /tabs >}}

#### トレース収集の無効化 {#disable-trace-collection}

Lambda 関数のトレース収集を停止したい場合は、以下の構成を適用します。

{{< tabs >}}
{{% tab "Datadog CLI" %}}

```sh
datadog-ci lambda instrument \
    --tracing false
    # ... other required arguments, such as function names
```
{{% /tab %}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    enableDDTracing: false
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... other required parameters, such as the Datadog site and API key
      enableDDTracing: false
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new DatadogLambda(this, "Datadog", {
    // ... other required parameters, such as the Datadog site and API key
    enableDatadogTracing: false
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

{{% /tab %}}
{{% tab "その他" %}}

Lambda 関数で環境変数 `DD_TRACE_ENABLED` を `false` に設定します。

{{% /tab %}}
{{< /tabs >}}

## ログとトレースの接続 {#connect-logs-and-traces}

[Lambda extension][2] を使用してトレースとログを収集している場合、Datadog は AWS Lambda リクエスト ID を `aws.lambda` スパンの `request_id` タグに自動的に追加します。さらに、同じリクエストの Lambda ログは `lambda.request_id` 属性の下に追加されます。Datadog のトレースとログのビューは、AWS Lambda リクエスト ID を使用して接続されます。

[Forwarder Lambda function][4] を使用してトレースとログを収集している場合、`dd.trace_id` はログに自動的に挿入されます (環境変数 `DD_LOGS_INJECTION` でデフォルトで有効)。Datadog のトレースとログのビューは、Datadog トレース ID を使用して接続されます。この機能は、一般的なランタイムおよびロガーを使用しているほとんどのアプリケーションでサポートされています ([ランタイム別サポート][24]を参照)。

サポートされていないランタイムまたはカスタムロガーを使用している場合は、以下の手順に従ってください。
- JSON でログを記録する場合、`dd-trace` を使用して Datadog のトレース ID を取得し、それをログの `dd.trace_id` フィールドに追加する必要があります。
    ```javascript
    {
      "message": "This is a log",
      "dd": {
        "trace_id": "4887065908816661012"
      }
      // ... the rest of your log
    }
    ```
- 平文でログを記録する場合、以下を行う必要があります。
    1. `dd-trace` を使用して Datadog のトレース ID を取得し、ログに追加します。
    2. デフォルトの Lambda ログパイプラインを複製します (読み取り専用)。
    3. 複製したパイプラインを有効にし、デフォルトのパイプラインを無効にします。
    4. 複製したパイプラインの [Grok parser][25] ルールを更新して、Datadog トレース ID を `dd.trace_id` 属性に解析します。例えば、`my_rule \[%{word:level}\]\s+dd.trace_id=%{word:dd.trace_id}.*` のようなログに対してルール `[INFO] dd.trace_id=4887065908816661012 My log message` を使用します。

## ソースコードにエラーをリンクする {#link-errors-to-your-source-code}

[Datadog ソースコードインテグレーション][26]を使用すると、テレメトリー (スタックトレースなど) を Git リポジトリ内の Lambda 関数のソースコードにリンクできます。

サーバーレスアプリケーションでソースコードインテグレーションを設定する手順については、[ビルドアーティファクトに Git 情報を埋め込むセクション][101]を参照してください。

[101]: /ja/integrations/guide/source-code-integration/?tab=go#serverless

## プロファイリングデータの収集 {#collect-profiling-data}

Datadog の [Continuous Profiler][42] は、Python tracer バージョン 4.62.0 および layer バージョン 62 以前でプレビューとして利用可能です。このオプション機能は、`DD_PROFILING_ENABLED` 環境変数を `true` に設定することで有効になります。

Continuous Profiler は、実行中のすべての Python コードの CPU およびヒープのスナップショットを定期的に取得するスレッドを生成して動作します。これにはプロファイラー自体も含まれる可能性があります。プロファイラーが自分自身を無視するようにしたい場合は、`DD_PROFILING_IGNORE_PROFILER` を `true` に設定します。

## PrivateLink またはプロキシ経由でテレメトリーを送信する {#send-telemetry-over-privatelink-or-proxy}

Datadog Lambda Extension は、Datadog にデータを送信するためにインターネットへのアクセスが必要です。Lambda 関数がインターネットにアクセスできない VPC にデプロイされている場合、[AWS PrivateLink 経由でデータを送信][28]して `datadoghq.com` [Datadog サイト][29]に送信するか、その他のサイトには[プロキシ経由でデータを送信][30]できます。

Datadog Forwarder を使用している場合は、こちらの[手順][31]に従ってください。

## 複数の Datadog 組織にテレメトリーを送信する {#send-telemetry-to-multiple-datadog-organizations}

複数の組織にデータを送信したい場合は、平文の API キー、AWS Secrets Manager、または AWS KMS を使用してデュアルシッピングを有効にすることができます。

{{< tabs >}}
{{% tab "平文の API キー" %}}

Lambda 関数に次の環境変数を設定することで、平文の API キーを使用してデュアルシッピングを有効にすることができます。

```bash
# Enable dual shipping for metrics
DD_ADDITIONAL_ENDPOINTS={"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}
# Enable dual shipping for APM (traces)
DD_APM_ADDITIONAL_ENDPOINTS={"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}
# Enable dual shipping for APM (profiling)
DD_APM_PROFILING_ADDITIONAL_ENDPOINTS={"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}
# Enable dual shipping for logs
DD_LOGS_CONFIG_FORCE_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS=[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]
```

{{% /tab %}}
{{% tab "AWS Secrets Manager" %}}

Datadog Extension は、`_SECRET_ARN` で始まる任意の環境変数について、[AWS Secrets Manager][1] の値を自動的に取得することをサポートしています。これを使用すると、環境変数を Secrets Manager に安全に保存し、Datadog にも並行して送信できます。

1. Lambda 関数で環境変数 `DD_LOGS_CONFIG_FORCE_USE_HTTP` を設定します。
2. Lambda 関数の IAM ロールの権限に `secretsmanager:GetSecretValue` の権限を追加します。
3. メトリクスの並行送信用の環境変数を保存するために、Secrets Manager に新しいシークレットを作成します。内容は `{"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}` のようになります。
4. Lambda 関数の環境変数 `DD_ADDITIONAL_ENDPOINTS_SECRET_ARN` に上記シークレットの ARN を設定します。
5. APM (トレース) の並行送信用の環境変数を保存するために、Secrets Manager に新しいシークレットを作成します。内容は `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}` **のよう**になります。
6. Lambda 関数の環境変数 `DD_APM_ADDITIONAL_ENDPOINTS_SECRET_ARN` に上記シークレットの ARN と同じ値を設定します。
7. APM (プロファイリング) の並行送信用の環境変数を保存するために、Secrets Manager に新しいシークレットを作成します。内容は `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}` **のよう**になります。
8. Lambda 関数の環境変数 `DD_APM_PROFILING_ADDITIONAL_ENDPOINTS_SECRET_ARN` に上記シークレットの ARN と同じ値を設定します。
9. ログの並行送信用の環境変数を保存するために、Secrets Manager に新しいシークレットを作成します。内容は `[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]` **のよう**になります。
10. Lambda 関数の環境変数 `DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS_SECRET_ARN` に上記シークレットの ARN と同じ値を設定します。

[1]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html

{{% /tab %}}
{{% tab "AWS KMS" %}}

Datadog Extension は、`_KMS_ENCRYPTED` で始まる任意の環境変数について、[AWS KMS][41] の値を自動的に復号することをサポートしています。これを使用すると、環境変数を KMS に安全に保存し、Datadog にも並行して送信できます。

1. Lambda 関数で環境変数 `DD_LOGS_CONFIG_FORCE_USE_HTTP=true` を設定します。
2. Lambda 関数の IAM ロール権限に `kms:GenerateDataKey` および `kms:Decrypt` の権限を追加します。
3. メトリクスの並行送信の場合、`{"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}` を KMS で暗号化し、`DD_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` 環境変数をその値に設定します。
4. トレースの並行送信の場合、`{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}` を KMS で暗号化し、`DD_APM_ADDITIONAL_KMS_ENCRYPTED` 環境変数をその値に設定します。
5. プロファイリングの並行送信の場合、`{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}` を KMS で暗号化し、`DD_APM_PROFILING_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` 環境変数をその値に設定します。
5. ログの並行送信の場合、`[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]` を KMS で暗号化し、`DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` 環境変数をその値に設定します。

[41]: https://docs.aws.amazon.com/kms/
{{% /tab %}}
{{< /tabs >}}

より高度な使用方法については、[デュアルシッピングガイド][32]を参照してください。

## FIPS コンプライアンスを有効にする {#enable-fips-compliance}

<div class="alert alert-info">AWS Lambda 関数の FIPS コンプライアンスの全体像については、専用の <a href="/serverless/aws_lambda/fips-compliance">AWS Lambda FIPS コンプライアンス</a>ページを参照してください。

AWS Lambda 関数の FIPS コンプライアンスを有効にするには、次のステップに従います。

1. 適切な ARN を参照して FIPS コンプライアンス対応の拡張レイヤーを使用します。

{{< tabs >}}
{{% tab "AWS GovCLoud" %}}
 ```sh
 arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 ```
{{% /tab %}}
{{% tab "AWS Commercial" %}}
 ```sh
 arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 ```
{{% /tab %}}
{{< /tabs >}}

2. Python、JavaScript、または Go を使用する Lambda 関数の場合、環境変数 `DD_LAMBDA_FIPS_MODE` を `true` に設定します。この環境変数:
   - FIPS モードでは、Lambda メトリックヘルパー関数はメトリック送信のために FIPS コンプライアンス対応の拡張機能を必要とします。
   - API キーの検索に AWS FIPS エンドポイントを使用します。
   - GovCloud 環境ではデフォルトで有効になっています。

3. Ruby、.NET、または Java を使用する Lambda 関数の場合、追加の環境変数設定は必要ありません。

4. エンドツーエンドで FIPS コンプライアンスを完全に達成するには、Lambda 関数を Datadog for Government サイトを使用するように設定します。
   - `DD_SITE` を`ddog-gov.com` (US1-FED) または `us2.ddog-gov.com` (US2-FED) に設定します。
   **注**: FIPS コンプライアンス対応の Lambda コンポーネントは任意の Datadog サイトで動作しますが、FIPS コンプライアンス対応のインテークエンドポイントを持つのは Datadog for Government サイトのみです。

## AWS リソース上でトレースコンテキストを伝播させる {#propagate-trace-context-over-aws-resources}

Datadog は、アウトゴーイングの AWS SDK リクエストにトレースコンテキストを自動的に注入し、Lambda イベントからトレースコンテキストを抽出します。これにより、Datadog は分散サービス全体でリクエストやトランザクションをトレースできるようになります。[サーバーレストレースの伝搬][33]を参照してください。

## X-Ray と Datadog のトレースをマージする {#merge-x-ray-and-datadog-traces}

AWS X-Ray は、AppSync や Step Functions などの特定の AWS 管理サービスを通じたトレースをサポートしていますが、Datadog APM はネイティブではサポートしていません。[Datadog X-Ray integration][34] を有効にし、X-Ray トレースを Datadog ネイティブトレースとマージできます。[追加の詳細][35]を参照してください。

## AWS Lambda のコード署名を有効にする {#enable-aws-lambda-code-signing}

[AWS Lambda のコード署名][36]により、信頼できるコードのみを Lambda 関数から AWS へデプロイすることができます。関数でコード署名を有効にすると、デプロイメントのすべてのコードが信頼できるソースにより署名されていることが AWS で検証されます。このソースは、コード署名コンフィギュレーションで定義します。

Lambda 関数がコード署名を使用するように構成されている場合、Datadog が公開する Lambda レイヤーを使用して Lambda 関数をデプロイする前に、関数のコード署名構成に Datadog の Signing Profile ARN を追加する必要があります。

Datadog の Signing Profile ARN:

```
arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc
```


## Datadog Lambda Extension に移行する {#migrate-to-the-datadog-lambda-extension}

Datadog は、[Forwarder Lambda function][4] または [Lambda extension][2] を使用して、Lambda 関数から監視データを収集できます。Datadog は、新規インストールには Lambda extension を推奨しています。不明な場合は、[Datadog Lambda extension への移行を判断する][37]を参照してください。

移行するには、[Datadog Lambda Extension を使用したインストール手順][1]と [Datadog Forwarder を使用した手順][38]を比較してみてください。ご参考までに、主な相違点を以下にまとめます。

**注**: Datadog では、まず開発用とステージング用のアプリケーションを移行し、本番用のアプリケーションを 1 つずつ移行していくことを推奨しています。

<div class="alert alert-info">Datadog Lambda extension は、デフォルトでログ収集を有効にします。Forwarder から extension に移行する場合は、ログのサブスクリプションを削除してください。そうしないと、ログが重複して表示される可能性があります。</div>

{{< tabs >}}
{{% tab "Datadog CLI" %}}

1. `@datadog/datadog-ci` を最新バージョンにアップグレードします。
2. 引数 `--layer-version` を更新し、ランタイムの最新バージョンに設定します。
3. `--extension-version` 引数を最新の拡張機能バージョンに設定します。最新の拡張機能バージョンは `{{< latest-lambda-layer-version layer="extension" >}}`.
4. Set the required environment variables `DATADOG_SITE` and `DATADOG_API_KEY_SECRET_ARN`.
5. Remove the `--forwarder` 引数です。
6. Lambda のロググループに Forwarder を自動的にサブスクライブするように Datadog AWS インテグレーションを構成した場合、その地域の Lambda 関数を_すべて_移行した後にそれを無効にしてください。

{{% /tab %}}
{{% tab "Serverless Framework" %}}

1. `serverless-plugin-datadog` を最新バージョンにアップグレードしてください。これにより、`addExtension` を `false` に設定しない限り、Datadog Lambda Extension がデフォルトでインストールされます。
2. 必要なパラメーター `site` と `apiKeySecretArn` を設定します。
3. 以前に Lambda リソースタグとして設定した場合は、`env`、`service`、および `version` パラメーターを設定します。プラグインは、拡張機能を使用する際に、`DD_ENV` などの Datadog の予約環境変数を通じてそれらを自動的に設定します。
4. Forwarder を非 Lambda リソースからのログ収集のために保持したい場合、かつ `subscribeToApiGatewayLogs`、`subscribeToHttpApiLogs`、または `subscribeToWebsocketLogs` が `true` に設定されている場合を除き、`forwarderArn` パラメーターを削除してください。
5. Lambda のロググループに Forwarder を自動的にサブスクライブするように Datadog AWS インテグレーションを構成した場合、その地域の Lambda 関数を_すべて_移行した後にそれを無効にしてください。

{{% /tab %}}
{{% tab "AWS SAM" %}}

1. `datadog-serverless-macro` CloudFormation スタックを更新して、最新バージョンを取得します。
2. `extensionLayerVersion` パラメーターを最新の拡張バージョンに設定します。最新の拡張機能バージョンは `{{< latest-lambda-layer-version layer="extension" >}}`.
3. Set the required parameters `site` and `apiKeySecretArn`.
4. Remove the `forwarderArn` パラメーター。
5. Lambda のロググループに Forwarder を自動的にサブスクライブするように Datadog AWS インテグレーションを構成した場合、その地域の Lambda 関数を_すべて_移行した後にそれを無効にしてください。

{{% /tab %}}
{{% tab "AWS CDK" %}}

1. `datadog-cdk-constructs` または `datadog-cdk-constructs-v2` を最新バージョンにアップグレードします。
2. `extensionLayerVersion` パラメーターを最新の拡張バージョンに設定します。最新の拡張機能バージョンは `{{< latest-lambda-layer-version layer="extension" >}}`.
3. Set the required parameters `site` and `apiKeySecretArn`.
4. Set the `env`, `service`, and `version` parameters if you previously set them as Lambda resource tags. The construct will automatically set them through the Datadog reserved environment variables instead, such as `DD_ENV`, when using the extension.
5. Remove the `forwarderArn` パラメーター。
6. Lambda のロググループに Forwarder を自動的にサブスクライブするように Datadog AWS インテグレーションを構成した場合、その地域の Lambda 関数を_すべて_移行した後にそれを無効にしてください。

{{% /tab %}}
{{% tab "その他" %}}

1. ランタイム用の Datadog Lambda ライブラリレイヤーを最新バージョンにアップグレードします。
2. 最新バージョンの Datadog Lambda Extension をインストールします。
3. 必要な環境変数 `DD_SITE` と `DD_API_KEY_SECRET_ARN` を設定します。
3. 以前に Lambda リソースタグとして設定した場合は、`DD_ENV`、`DD_SERVICE`、および `DD_VERSION` 環境変数を設定します。
4. Lambda 関数のロググループから Datadog Forwarder にログをストリーミングするサブスクリプションフィルターを削除します。
5. Lambda のロググループに Forwarder を自動的にサブスクライブするように Datadog AWS インテグレーションを構成した場合、その地域の Lambda 関数を_すべて_移行した後にそれを無効にしてください。

{{% /tab %}}
{{< /tabs >}}

## Datadog Lambda Extension を使用した x86 から arm64 への移行 {#migrating-between-x86-to-arm64-with-the-datadog-lambda-extension}

Datadog Extension は、x86 と arm64 の両方のバリアントで利用可能なコンパイル済みバイナリです。CDK、Serverless Framework、SAM などのデプロイメントツールを使用して x86 Lambda 関数を arm64 (または arm64 から x86) に移行する場合、サービスインテグレーション (API Gateway、SNS、Kinesis など) が Lambda 関数のバージョンまたはエイリアスを使用するように構成されていることを確認してください。そうしないと、デプロイメント中に関数が約 10 秒間利用できなくなる可能性があります。

これは、x86 から arm64 への Lambda 関数の移行が `updateFunction` と `updateFunctionConfiguration` の 2 つの並行 API 呼び出しで構成されるために発生します。これらの呼び出しの間、Lambda `updateFunction` 呼び出しが完了し、コードが新しいアーキテクチャを使用するように更新される短いウィンドウがありますが、`updateFunctionConfiguration` 呼び出しはまだ完了していないため、古いアーキテクチャが拡張機能に対してまだ構成されています。

Layer のバージョンを利用できない場合、Datadog では、アーキテクチャの移行プロセス中に [Datadog Forwarder][38] の構成を行うことを推奨しています。


## ローカルテスト用の Datadog Lambda Extension の構成 {#configure-the-datadog-lambda-extension-for-local-testing}

すべての Lambda エミュレーターが AWS Lambda テレメトリー API をサポートしているわけではありません。Datadog Lambda Extension がインストールされた状態で、Lambda 関数のコンテナイメージをローカルでテストするには、ローカルテスト環境で `DD_SERVERLESS_FLUSH_STRATEGY` を `periodically,1` に設定する必要があります。そうしないと、拡張機能は AWS Lambda テレメトリー API からの応答を待機し、呼び出しをブロックします。

## OpenTelemetry API を使用した AWS Lambda のインスツルメンテーション {#instrument-aws-lambda-with-the-opentelemetry-api}

Datadog Lambda Extension のインストール時に含まれる Datadog SDK は、OpenTelemetry でインスツルメンテーションされたコードで生成されたスパンとトレースを受け入れ、テレメトリーを処理し、Datadog に送信します。

たとえば、コードがすでに OpenTelemetry API でインツルメンテーションされている場合、このアプローチを使用できます。また、OpenTelemetry API を使用してベンダー非依存のコードでインスツルメンテーションを行いながら、Datadog SDK の利点を得たい場合にもこのアプローチを使用できます。

OpenTelemetry API を使用して AWS Lambda をインスツルメンテーションするには、環境変数 `DD_TRACE_OTEL_ENABLED` を `true` に設定します。詳細については、[OpenTelemetry API によるカスタムインスツルメンテーション][48]を参照してください。

## Datadog Lambda Extension v67+ を使用する {#using-datadog-lambda-extension-v67}
[Datadog Extension][53] のバージョン 67+ は、コールドスタート時間を大幅に短縮するように最適化されています。
最適化された拡張機能を使用するには、環境変数 `DD_SERVERLESS_APPSEC_ENABLED` を `false` に設定します。
環境変数 `DD_SERVERLESS_APPSEC_ENABLED` が `true` に設定されている場合、Datadog Extension は完全に互換性のある古いバージョンをデフォルトで使用します。また、環境変数 `DD_EXTENSION_VERSION` を `compatibility` に設定することで、拡張機能を古いバージョンに強制的に使用させることができます。Datadog は、フィードバックやバグを報告するために [GitHub Issue][54] を追加し、その問題に `version/next` タグを付けることを推奨しています。

## DynamoDB PutItem の自動リンクを構成する {#configure-auto-linking-for-dynamodb-putitem}
_Python および Node.js ランタイムで利用可能です_。
非同期リクエストのセグメントがトレースコンテキストを伝播できない場合、Datadog の [Span Auto-linking][55] 機能が自動的にリンクされたスパンを検出します。
[DynamoDB Change Streams][56] の `PutItem` 操作に対してスパン自動リンクを有効にするには、テーブルのプライマリキー名を設定します。

{{< tabs >}}
{{% tab "Python" %}}

```python
ddtrace.config.botocore['dynamodb_primary_key_names_for_tables'] = {
    'table_name': {'key1', 'key2'},
    'other_table': {'other_key'},
}
```
{{% /tab %}}
{{% tab "Node.js" %}}

```js
// Initialize the tracer with the configuration
const tracer = require('dd-trace').init({
  dynamoDb: {
    tablePrimaryKeys: {
      'table_name': ['key1', 'key2'],
      'other_table': ['other_key']
    }
  }
})
```
{{% /tab %}}
{{% tab "環境変数" %}}

```sh
export DD_BOTOCORE_DYNAMODB_TABLE_PRIMARY_KEYS='{
    "table_name": ["key1", "key2"],
    "other_table": ["other_key"]
}'
```
{{% /tab %}}
{{< /tabs >}}

これにより、DynamoDB `PutItem` 呼び出しがスパンポインタでインスツルメントされるようになります。多くの DynamoDB API 呼び出しでは、アイテムのプライマリキーフィールドが個別の値として含まれないため、SDK に別途指定する必要があります。上記の設定は、辞書 (`dict`) またはテーブル名を文字列 (`str`) としてキーにしたオブジェクトとして構成されています。各値は、関連するテーブルのプライマリキーフィールド名 (文字列) のセットです。セットは、テーブルのプライマリキーのスキーマに応じて、1 つまたは 2 つの要素を持つことができます。

## リソース名による AWS サービスの可視化とモデリング {#visualize-and-model-aws-services-by-resource-name}

これらの [Node.js][50]、[Python][51]、および [Java][52] Lambda レイヤーのバージョンでは、AWS 管理サービスを正しく命名、モデリング、可視化するための変更がリリースされました。

サービス名は、AWS サービス名だけでなく、実際の AWS リソース名を反映しています。
* `aws.lambda` → `[function_name]`
* `aws.dynamodb` → `[table_name]`
* `aws.sns` → `[topic_name]`
* `aws.sqs` → `[queue_name]`
* `aws.kinesis` → `[stream_name]`
* `aws.s3` → `[bucket_name]`
* `aws.eventbridge` → `[event_name]`

ダッシュボードやモニターが従来の命名規則に依存している場合は、古いサービス表現モデルを使用することを好むかもしれません。以前の動作を復元するには、環境変数を設定します。`DD_TRACE_AWS_SERVICE_REPRESENTATION_ENABLED=false`

更新されたサービスモデリング設定を推奨します。

## Observability Pipelines にログを送信する {#send-logs-to-observability-pipelines}

{{% observability_pipelines/lambda_extension_source %}}

詳細については、[Datadog Lambda Extension Forwarder ログを Observability Pipelines に送信する方法][58]を参照してください。

## API キーのシークレットを定期的に再読み込みする {#reload-api-key-secret-periodically}

Datadog API キーを `DD_API_KEY_SECRET_ARN` で指定する場合、`DD_API_KEY_SECRET_RELOAD_INTERVAL` を設定してシークレットを定期的に再読み込みすることもできます。例えば、`DD_API_KEY_SECRET_RELOAD_INTERVAL` を `43200` に設定すると、API キーがデータ送信のために必要となり、かつ最後の読み込みから 43200 秒以上経過している場合に、シークレットが再読み込みされます。

使用例: セキュリティのために、毎日 (86 400 秒)、API キーがローテーションされ、シークレットが新しいキーに更新され、古い API キーは猶予期間としてさらに 1 日有効になります。この場合、`DD_API_KEY_SECRET_RELOAD_INTERVAL` を `43200` に設定することで、古い API キーの猶予期間中に API キーが再読み込みされます。

これは Datadog Lambda Extension のバージョン 88 以上で利用可能です。

## トラブルシューティング {#troubleshoot}

インストールの設定に問題がある場合は、デバッグログのために環境変数 `DD_LOG_LEVEL` を `debug` に設定してください。追加のトラブルシューティングのヒントについては、[サーバーレスモニタリングのトラブルシューティングガイド][39]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/serverless/installation/
[2]: /ja/serverless/libraries_integrations/extension/
[3]: /ja/integrations/amazon_web_services/
[4]: /ja/serverless/libraries_integrations/forwarder/
[5]: https://www.datadoghq.com/blog/troubleshoot-lambda-function-request-response-payloads/
[6]: /ja/tracing/configure_data_security/#scrub-sensitive-data-from-your-spans
[7]: /ja/serverless/enhanced_lambda_metrics
[8]: /ja/integrations/amazon_api_gateway/#data-collected
[9]: /ja/integrations/amazon_appsync/#data-collected
[10]: /ja/integrations/amazon_sqs/#data-collected
[11]: /ja/integrations/amazon_web_services/#log-collection
[12]: https://www.datadoghq.com/blog/monitor-aws-fully-managed-services-datadog-serverless-monitoring/
[13]: /ja/agent/logs/advanced_log_collection/
[14]: /ja/logs/log_configuration/pipelines/
[15]: /ja/tracing/trace_collection/compatibility/
[16]: /ja/tracing/trace_collection/custom_instrumentation/
[17]: /ja/tracing/trace_pipeline/ingestion_controls/#configure-the-service-ingestion-rate
[18]: /ja/tracing/guide/trace_ingestion_volume_control#effects-of-reducing-trace-ingestion-volume
[19]: /ja/tracing/trace_pipeline/ingestion_mechanisms/?tabs=environmentvariables#head-based-sampling
[20]: /ja/tracing/trace_pipeline/trace_retention/
[21]: /ja/tracing/trace_pipeline/
[22]: /ja/tracing/guide/ignoring_apm_resources/
[23]: /ja/tracing/configure_data_security/
[24]: /ja/tracing/other_telemetry/connect_logs_and_traces/
[25]: /ja/logs/log_configuration/parsing/
[26]: /ja/integrations/guide/source-code-integration
[27]: /ja/serverless/aws_lambda/metrics/#submit-custom-metrics
[28]: /ja/agent/guide/private-link/
[29]: /ja/getting_started/site/
[30]: /ja/agent/proxy/
[31]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#aws-privatelink-support
[32]: /ja/agent/guide/dual-shipping/
[33]: /ja/serverless/distributed_tracing/#trace-propagation
[34]: /ja/integrations/amazon_xray/
[35]: /ja/serverless/distributed_tracing/#trace-merging
[36]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html
[37]: /ja/serverless/guide/extension_motivation/
[38]: /ja/serverless/guide#install-using-the-datadog-forwarder
[39]: /ja/serverless/guide/troubleshoot_serverless_monitoring/
[40]: /ja/serverless/libraries_integrations/extension/
[41]: https://app.datadoghq.com/security/appsec?column=time&order=desc
[42]: /ja/profiler/
[43]: /ja/serverless/installation#installation-instructions
[44]: /ja/security/default_rules/security-scan-detected/
[45]: https://docs.datadoghq.com/ja/tracing/trace_collection/library_config/
[46]: https://docs.datadoghq.com/ja/tracing/glossary/#services
[47]: /ja/logs/
[48]: /ja/tracing/trace_collection/otel_instrumentation/
[49]: https://app.datadoghq.com/security/appsec?column=time&order=desc
[50]: https://github.com/DataDog/datadog-lambda-js/releases/tag/v12.127.0
[51]: https://github.com/DataDog/datadog-lambda-python/releases/tag/v8.113.0
[52]: https://github.com/DataDog/datadog-lambda-java/releases/tag/v24
[53]: https://github.com/DataDog/datadog-lambda-extension
[54]: https://github.com/DataDog/datadog-lambda-extension/issues
[55]: /ja/serverless/aws_lambda/distributed_tracing/#span-auto-linking
[56]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html
[57]: /ja/tracing/guide/aws_payload_tagging/?code-lang=python&tab=nodejs
[58]: /ja/observability_pipelines/sources/lambda_extension/