---
aliases:
- /ja/serverless/distributed_tracing/collect_lambda_payloads
- /ja/serverless/libraries_integrations/lambda_code_signing
- /ja/serverless/guide/forwarder_extension_migration/
- /ja/serverless/guide/extension_private_link/
- /ja/serverless/configuration
further_reading:
- link: /serverless/installation/
  tag: Documentation
  text: AWS Lambda のためのサーバーレスモニタリングのインストール
- link: /serverless/troubleshooting/
  tag: Documentation
  text: AWS Lambda のためのサーバーレスモニタリングのトラブルシューティング
- link: /integrations/github
  tag: Documentation
  text: Datadog GitHub インテグレーション
title: AWS Lambda のためのサーバーレスモニタリングの構成
---

まず、Datadog サーバーレスモニタリングを[インストール][1]し、メトリクス、トレース、ログの収集を開始します。インストールが完了したら、以下のトピックを参照して、モニタリングのニーズに合わせてインストールを構成します。

### メトリクス
- [非 Lambda リソースからメトリクスを収集する](#collect-metrics-from-non-lambda-resources)
- [カスタムメトリクスの送信](#submit-custom-metrics)

### ログ管理
- [ログから情報をフィルターまたはスクラブする](#filter-or-scrub-information-from-logs)
- [ログ収集の有効化/無効化](#enabledisable-log-collection)
- [非 Lambda リソースからログを収集する](#collect-logs-from-non-lambda-resources)
- [ログのパースと変換](#parse-and-transform-logs)
- [ログとトレースを接続する](#connect-logs-and-traces)

### APM
- [タグを使ったテレメトリー接続](#connect-telemetry-using-tags)
- [リクエストとレスポンスのペイロードを収集する](#collect-the-request-and-response-payloads)
- [非 Lambda リソースからメトリクスを収集する](#collect-metrics-from-non-lambda-resources)
- [非 Lambda リソースからログを収集する](#collect-logs-from-non-lambda-resources)
- [非 Lambda リソースからトレースを収集する](#collect-traces-from-non-lambda-resources)
- [ログから情報をフィルターまたはスクラブする](#filter-or-scrub-information-from-logs)
- [ログ収集の有効化/無効化](#enabledisable-log-collection)
- [ログのパースと変換](#parse-and-transform-logs)
- [Datadog トレーサーの構成](#configure-the-datadog-tracer)
- [APM スパンを取り込む際のサンプリングレートの選択](#select-sampling-rates-for-ingesting-apm-spans)
- [トレースから機密情報をフィルターまたはスクラブする](#filter-or-scrub-sensitive-information-from-traces)
- [トレース収集の有効化/無効化](#enabledisable-trace-collection)
- [ログとトレースを接続する](#connect-logs-and-traces)
- [ソースコードにエラーをリンクさせる](#link-errors-to-your-source-code)
- [カスタムメトリクスの送信](#submit-custom-metrics)
- [OpenTelemetry のデータを Datadog に送信する](#send-opentelemetry-data-to-datadog)
- [プロファイリングデータの収集 (公開ベータ版)](#collect-profiling-data-public-beta)
- [PrivateLink またはプロキシ経由でテレメトリーを送信する](#send-telemetry-over-privatelink-or-proxy)
- [複数の Datadog 組織にテレメトリーを送信する](#send-telemetry-to-multiple-datadog-organizations)
- [AWS リソース上でトレースコンテキストを伝播させる](#propagate-trace-context-over-aws-resources)
- [X-Ray と Datadog のトレースをマージする](#merge-x-ray-and-datadog-traces)
- [AWS Lambda のコード署名を有効にする](#enable-aws-lambda-code-signing)
- [Datadog Lambda 拡張機能に移行する](#migrate-to-the-datadog-lambda-extension)
- [Datadog Lambda 拡張機能による x86 から arm64 への移行](#migrating-between-x86-to-arm64-with-the-datadog-lambda-extension)
- [ローカルテスト用の Datadog Lambda 拡張機能の構成](#configure-the-datadog-lambda-extension-for-local-testing)
- [トラブルシューティング](#troubleshoot)
- [参考文献](#further-reading)

### セキュリティ
- [脅威の検出を有効にして攻撃の試みを観測する](#enable-threat-detection-to-observe-attack-attempts)

### その他
- [タグを使ったテレメトリー接続](#connect-telemetry-using-tags)
- [リクエストとレスポンスのペイロードを収集する](#collect-the-request-and-response-payloads)
- [非 Lambda リソースからメトリクスを収集する](#collect-metrics-from-non-lambda-resources)
- [非 Lambda リソースからログを収集する](#collect-logs-from-non-lambda-resources)
- [非 Lambda リソースからトレースを収集する](#collect-traces-from-non-lambda-resources)
- [ログから情報をフィルターまたはスクラブする](#filter-or-scrub-information-from-logs)
- [ログ収集の無効化](#disable-logs-collection)
- [ログのパースと変換](#parse-and-transform-logs)
- [Datadog トレーサーの構成](#configure-the-datadog-tracer)
- [APM スパンを取り込む際のサンプリングレートの選択](#select-sampling-rates-for-ingesting-apm-spans)
- [トレースから機密情報をフィルターまたはスクラブする](#filter-or-scrub-sensitive-information-from-traces)
- [トレース収集の無効化](#disable-trace-collection)
- [ログとトレースを接続する](#connect-logs-and-traces)
- [ソースコードにエラーをリンクさせる](#link-errors-to-your-source-code)
- [カスタムメトリクスの送信](#submit-custom-metrics)
- [OpenTelemetry のデータを Datadog に送信する](#send-opentelemetry-data-to-datadog)
- [PrivateLink またはプロキシ経由でテレメトリーを送信する](#send-telemetry-over-privatelink-or-proxy)
- [複数の Datadog 組織にテレメトリーを送信する](#send-telemetry-to-multiple-datadog-organizations)
- [AWS リソース上でトレースコンテキストを伝播させる](#propagate-trace-context-over-aws-resources)
- [X-Ray と Datadog のトレースをマージする](#merge-x-ray-and-datadog-traces)
- [AWS Lambda のコード署名を有効にする](#enable-aws-lambda-code-signing)
- [Datadog Lambda 拡張機能に移行する](#migrate-to-the-datadog-lambda-extension)
- [Datadog Lambda 拡張機能による x86 から arm64 への移行](#migrating-between-x86-to-arm64-with-the-datadog-lambda-extension)
- [ローカルテスト用の Datadog Lambda 拡張機能の構成](#configure-the-datadog-lambda-extension-for-local-testing)
- [トラブルシューティング](#troubleshoot)
- [参考文献](#further-reading)

## 脅威の検出を有効にして攻撃の試みを観測する

サーバーレスアプリケーションを標的にしている攻撃者についてアラートを受け取り、素早く対応できます。

まずは、関数で[トレーシングが有効][43]になっていることを確認します。

脅威の監視を有効にするには、言語に応じて次の環境変数を追加します。
   ```yaml
   environment:
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```
   Go の関数の場合のみ、さらに以下を追加します。
   ```yaml
   environment:
     DD_UNIVERSAL_INSTRUMENTATION: true
   ```
   **NodeJS または Python の関数**の場合は、さらに以下を追加します。
   ```yaml
   environment:
     DD_EXPERIMENTAL_ENABLE_PROXY: true
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
   ```

関数を再デプロイして呼び出します。数分後、[ASM ビュー][3]に表示されます。

[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc

アプリケーションセキュリティ管理の脅威検出のアクションを見るには、既知の攻撃パターンをアプリケーションに送信します。例えば、`acunetix-product` という値を持つ HTTP ヘッダーを送信すると、[セキュリティスキャナー攻撃][44]の試行がトリガーされます。
   ```sh
   curl -H 'My-ASM-Test-Header: acunetix-product' https://<YOUR_FUNCTION_URL>/<EXISTING_ROUTE>
   ```
アプリケーションを攻撃パターンを送信すると、数分後に[アプリケーションシグナルエクスプローラー][3]に脅威情報が表示されます。

## タグを使ったテレメトリー接続

予約タグ (`env`、`service`、`version`) とカスタムタグを使用して、Datadog のテレメトリーを一緒に接続します。これらのタグを使用して、メトリクス、トレース、ログをシームレスに操作することができます。使用するインストール方法に応じて、以下の追加パラメーターを追加してください。

{{< tabs >}}
{{% tab "Datadog CLI" %}}

[Datadog CLI][1] の最新バージョンを使用していることを確認し、適切な追加引数を指定して `datadog-ci lambda instrument` コマンドを実行します。例えば、以下のようになります。

```sh
datadog-ci lambda instrument \
    --env dev \
    --service web \
    --version v1.2.3 \
    --extra-tags "team:avengers,project:marvel"
    # ... その他の必要な引数 (関数名など)
```

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

[Datadog サーバーレスプラグイン][1]の最新バージョンを使用していることを確認し、`env`、`service`、`version`、`tags` パラメーターを使用してタグを適用します。例えば、以下のようになります。

```yaml
custom:
  datadog:
    # ... その他の必要なパラメーター (Datadog のサイトや API キーなど)
    env: dev
    service: web
    version: v1.2.3
    tags: "team:avengers,project:marvel"
```

デフォルトでは、`env` と `service` を定義しない場合、プラグインは自動的にサーバーレスアプリケーションの定義にある `stage` と `service` の値を使用します。この機能を無効にするには、`enableTags` を `false` に設定します。

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/plugin
{{% /tab %}}
{{% tab "AWS SAM" %}}

[Datadog サーバーレスマクロ][1]の最新バージョンを使用していることを確認し、`env`、`service`、`version`、`tags` パラメーターを使用してタグを適用します。例えば、以下のようになります。

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... その他の必要なパラメーター (Datadog のサイトや API キーなど)
      env: dev
      service: web
      version: v1.2.3
      tags: "team:avengers,project:marvel"
```

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/macro
{{% /tab %}}
{{% tab "AWS CDK" %}}

[Datadog サーバーレス cdk コンストラクト][1]の最新バージョンを使用していることを確認し、`env`、`service`、`version`、`tags` パラメーターを使用してタグを適用します。例えば、以下のようになります。

```typescript
const datadog = new Datadog(this, "Datadog", {
    // ... その他の必要なパラメーター (Datadog のサイトや API キーなど)
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

[Datadog Lambda 拡張機能][1]を使用して Lambda 関数からテレメトリーを収集している場合、Lambda 関数に以下の環境変数を設定します。例えば、以下のようになります。
- DD_ENV: dev
- DD_SERVICE: web
- DD_VERSION: v1.2.3
- DD_TAGS: team:avengers,project:marvel

[Datadog Forwarder Lambda 関数][2]を使って Lambda 関数からテレメトリーを収集している場合、Lambda 関数に `env`、`service`、`version` および追加のタグを AWS リソースタグとして設定します。Datadog Forwarder の CloudFormation スタックで、`DdFetchLambdaTags` オプションが `true` に設定されていることを確認します。このオプションは、バージョン 3.19.0 以降、デフォルトで true に設定されています。

[1]: /ja/serverless/libraries_integrations/extension/
[2]: /ja/serverless/libraries_integrations/forwarder/
{{% /tab %}}
{{< /tabs >}}

また、Datadog は、Lambda 関数に定義された既存の AWS リソースタグで、数分遅れで収集したテレメトリーをリッチ化することができます。

- [Datadog Lambda 拡張機能][2]を使って Lambda 関数からテレメトリーを収集している場合、[Datadog AWS インテグレーション][3]を有効にしてください。この機能は、テレメトリーを**カスタム**タグでリッチ化するためのものです。Datadog の予約タグ (`env`、`service`、`version`) は、対応する環境変数 (それぞれ `DD_ENV`、`DD_SERVICE`、`DD_VERSION`) で設定する必要があります。予約タグは、サーバーレス開発者向けツールと Datadog のインテグレーションで提供されるパラメーターで設定することも可能です。この機能は、コンテナイメージでデプロイされた Lambda 関数では機能しません。

- [Datadog Forwarder Lambda 関数][4]を使って Lambda 関数からテレメトリーを収集している場合、Datadog Forwarder の CloudFormation スタックで、`DdFetchLambdaTags` オプションを `true` に設定します。このオプションは、バージョン 3.19.0 以降、デフォルトで true に設定されています。

## リクエストとレスポンスのペイロードを収集する

<div class="alert alert-info">この機能は、Python、Node.js、Go、Java、.NET でサポートされています。</div>

Datadog は [AWS Lambda 関数の JSON リクエストとレスポンスのペイロードを収集し可視化する][5]ことで、サーバーレスアプリケーションへの深い洞察と Lambda 関数障害のトラブルシューティングを支援することが可能です。

この機能は、デフォルトでは無効になっています。使用するインストール方法については、以下の説明に従ってください。

{{< tabs >}}
{{% tab "Datadog CLI" %}}

[Datadog CLI][1] の最新バージョンを使用していることを確認し、追加引数  `--capture-lambda-payload` を指定して `datadog-ci lambda instrument` コマンドを実行します。例えば、以下のようになります。

```sh
datadog-ci lambda instrument \
    --capture-lambda-payload true
    # ... その他の必要な引数 (関数名など)
```

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

[Datadog サーバーレスプラグイン][1]の最新バージョンを使用していることを確認し、`captureLambdaPayload` を `true` に設定します。例えば、以下のようになります。

```yaml
custom:
  datadog:
    # ... その他の必要なパラメーター (Datadog のサイトや API キーなど)
    captureLambdaPayload: true
```

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/plugin
{{% /tab %}}
{{% tab "AWS SAM" %}}

[Datadog サーバーレスマクロ][1]の最新バージョンを使用していることを確認し、`captureLambdaPayload` パラメーターを `true` に設定します。例えば、以下のようになります。

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... その他の必要なパラメーター (Datadog のサイトや API キーなど)
      captureLambdaPayload: true
```

[1]: https://docs.datadoghq.com/ja/serverless/serverless_integrations/macro
{{% /tab %}}
{{% tab "AWS CDK" %}}

[Datadog サーバーレス cdk コンストラクト][1]の最新バージョンを使用していることを確認し、`captureLambdaPayload` パラメーターを `true` に設定します。例えば、以下のようになります。

```typescript
const datadog = new Datadog(this, "Datadog", {
    // ... その他の必要なパラメーター (Datadog のサイトや API キーなど)
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

そのためには、Lambda 関数のコードと同じフォルダに、新しいファイル `datadog.yaml` を追加してください。Lambda ペイロードのフィールドの難読化は、`datadog.yaml` の `apm_config` 設定内の [replace_tags ブロック][6]で行うことができます。

```yaml
apm_config:
  replace_tags:
    # 任意のタグに出現する "foobar" をすべて "REDACTED" に置き換えます:
    - name: "*"
      pattern: "foobar"
      repl: "REDACTED"
    # リクエストヘッダーの "auth "を空の文字列に置き換えます
    - name: "function.request.headers.auth"
      pattern: "(?s).*"
      repl: ""
    # レスポンスペイロードの "apiToken" を "****" に置き換えます
    - name: "function.response.apiToken"
      pattern: "(?s).*"
      repl: "****"
```

別の方法として、Lambda 関数に環境変数 `DD_APM_REPLACE_TAGS` を設定し、特定のフィールドを難読化することもできます。

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

## 非 Lambda リソースからメトリクスを収集する

[Datadog Lambda 拡張メトリクス][7]のリアルタイム収集に加え、Datadog は [API Gateway][8]、[AppSync][9]、[SQS][10] などの AWS マネージドリソースに対するメトリクスを収集し、サーバーレスアプリケーション全体の監視を支援することが可能です。また、メトリクスは対応する AWS リソースタグでリッチ化されます。

これらのメトリクスを収集するには、[Datadog AWS インテグレーション][3]を設定します。

## 非 Lambda リソースからログを収集する

AWS Lambda 関数以外のマネージドリソースで生成されたログは、サーバーレスアプリケーションの問題の根本的な原因を特定するのに役立ちます。Datadog では、お使いの環境の以下の AWS マネージドリソースから[ログを収集][11]することをお勧めします。
- API: API Gateway、AppSync、ALB
- キューとストリーム: SQS、SNS、Kinesis
- データストア: DynamoDB、S3、RDS

## 非 Lambda リソースからトレースを収集する

<div class="alert alert-info">この機能は現在、Python、Node.js、Java、.NET でサポートされています。</div>

Datadog は、Lambda 関数をトリガーする AWS マネージドリソースの受信 Lambda イベントに基づいて APM スパンを推測することができます。これは、AWS マネージドリソース間の関係を視覚化し、サーバーレスアプリケーションにおけるパフォーマンス問題を特定するのに役立ちます。[追加の製品詳細][12]をご覧ください。

現在、以下のリソースがサポートされています。

- API ゲートウェイ (REST API、HTTP API、WebSocket)
- 関数 URL
- SQS
- SNS (SQS で配信される SNS メッセージにも対応)
- Kinesis Streams (データが JSON 文字列または base64 エンコードされた JSON 文字列の場合)
- EventBridge (カスタムイベント。`Details` は JSON 文字列)
- **注**: 2 つ以上のソースにサブスクライブする場合、このセットアップを完了後、新しい Kinesis ストリームにサブスクライブすることができます。
- DynamoDB

この機能を無効にするには、`DD_TRACE_MANAGED_SERVICES` を `false` に設定します。

### DD_SERVICE_MAPPING

`DD_SERVICE_MAPPING` は Lambda 以外のアップストリームの[サービス名][46]を名前変更する環境変数です。これは `old-service:new-service` のペアで動作します。

#### 構文

`DD_SERVICE_MAPPING=key1:value1,key2:value2`...

この変数を操作する方法は 2 つあります。

#### タイプのすべてのサービス名を変更

AWS Lambda インテグレーションに関連するすべてのアップストリームサービスの名前を変更するには、これらの識別子を使用します。

| AWS Lambda インテグレーション | DD_SERVICE_MAPPING Value |
|---|---|
| `lambda_api_gateway` | `"lambda_api_gateway:newServiceName"` |
| `lambda_sns` | `"lambda_sns:newServiceName"` |
| `lambda_sqs` | `"lambda_sqs:newServiceName"` |
| `lambda_s3` | `"lambda_s3:newServiceName"` |
| `lambda_eventbridge` | `"lambda_eventbridge:newServiceName"` |
| `lambda_kinesis` | `"lambda_kinesis:newServiceName"` |
| `lambda_dynamodb` | `"lambda_dynamodb:newServiceName"` |
| `lambda_url` | `"lambda_url:newServiceName"` |

#### 特定のサービス名を変更

より詳細なアプローチは、これらのサービス固有の識別子を使用します。

| サービス | 識別子 | DD_SERVICE_MAPPING Value |
|---|---|---|
| API Gateway | API ID | `"r3pmxmplak:newServiceName"` |
| SNS | トピック名 | `"ExampleTopic:newServiceName"` |
| SQS | キュー名 | `"MyQueue:newServiceName"` |
| **注**: 2 つ以上のソースにサブスクライブする場合、このセットアップを完了後、新しい Kinesis ストリームにサブスクライブすることができます。 | バケット名 | `"example-bucket:newServiceName"` |
| EventBridge | イベントソース | `"eventbridge.custom.event.sender:newServiceName"` |
| Kinesis | ストリーム名 | `"MyStream:newServiceName"` |
| DynamoDB | テーブル名 | `"ExampleTableWithStream:newServiceName"` |
| Lambda URL | API ID | `"a8hyhsshac:newServiceName"` |

#### 例と説明

| コマンド | 説明 |
|---|---|
| `DD_SERVICE_MAPPING="lambda_api_gateway:new-service-name"` | 全ての `lambda_api_gateway` アップストリームサービスの名前を `new-service-name` に変更します |
| `DD_SERVICE_MAPPING="08se3mvh28:new-service-name"` | 特定のアップストリームサービス `08se3mvh28.execute-api.eu-west-1.amazonaws.com` の名前を `new-service-name` に変更します |

ダウンストリームサービスの名前の変更については、[トレーサーの構成ドキュメント][45]の `DD_SERVICE_MAPPING` を参照してください。

## ログから情報をフィルタリングまたはスクラブする

`START` と `END` のログを除外するには、環境変数 `DD_LOGS_CONFIG_PROCESSING_RULES` を `[{"type": "exclude_at_match", "name": "exclude_start_and_end_logs", "pattern": "(START|END) RequestId"}]` に設定します。また、プロジェクトのルートディレクトリに `datadog.yaml` ファイルを追加して、以下の内容を記述することも可能です。

```yaml
logs_config:
  processing_rules:
    - type: exclude_at_match
      name: exclude_start_and_end_logs
      pattern: (START|END) RequestId
```

Datadog では、`REPORT` ログを残すことを推奨しています。これは、サーバーレス関数のビューで呼び出しリストを生成するために使用されるからです。

Datadog に送信する前に他のログをスクラブまたはフィルタリングするには、[高度なログ収集][13]を参照してください。

## ログ収集の有効化/無効化

Datadog Lambda 拡張機能によるログ収集は、デフォルトで有効になっています。

{{< tabs >}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # ... その他の必要なパラメーター (Datadog のサイトや API キーなど)
    enableDDLogs: true
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... その他の必要なパラメーター (Datadog のサイトや API キーなど)
      enableDDLogs: true
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new Datadog(this, "Datadog", {
    // ... その他の必要なパラメーター (Datadog のサイトや API キーなど)
    enableDatadogLogs: true
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

{{% /tab %}}
{{% tab "その他" %}}

Lambda 関数で環境変数 `DD_SERVERLESS_LOGS_ENABLED` を `true` に設定します。

{{% /tab %}}
{{< /tabs >}}

#### ログ収集の無効化

Datadog Forwarder Lambda 関数を使用したログ収集を停止したい場合は、自身の Lambda 関数の CloudWatch ロググループからサブスクリプションフィルターを削除します。

Datadog Lambda 拡張機能を使用してログの収集を停止したい場合は、使用するインストール方法に応じて以下の手順に従ってください。

{{< tabs >}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # ... その他の必要なパラメーター (Datadog のサイトや API キーなど)
    enableDDLogs: false
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... その他の必要なパラメーター (Datadog のサイトや API キーなど)
      enableDDLogs: false
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new Datadog(this, "Datadog", {
    // ... その他の必要なパラメーター (Datadog のサイトや API キーなど)
    enableDatadogLogs: false
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

{{% /tab %}}
{{% tab "その他" %}}

Lambda 関数で環境変数 `DD_SERVERLESS_LOGS_ENABLED` を `false` に設定します。

{{% /tab %}}
{{< /tabs >}}

詳しくは、[ログ管理][47] をご覧ください。

## ログのパースと変換

Datadog でログをパースして変換するには、[Datadog ログパイプライン][14]のドキュメントを参照してください。

## Datadog トレーサーの構成

Datadog APM クライアントによって自動的にインスツルメントされるライブラリやフレームワークについては、[APM の互換性要件][15]を参照してください。カスタムアプリケーションをインスツルメントするには、Datadog の APM ガイドの[カスタムインスツルメンテーション][16]を参照してください。

## APM スパンを取り込む際のサンプリングレートの選択

サーバーレス関数の [APM トレース呼び出しのサンプリングレート][17]を管理するには、関数上で `DD_TRACE_SAMPLE_RATE` 環境変数を 0.000 (Lambda 関数呼び出しのトレースなし) と 1.000 (Lambda 関数呼び出しのすべてトレース) の間の値に設定します。

メトリクスは、アプリケーションの 100% のトラフィックに基づいて計算され、どのようなサンプリング構成であっても正確な値を維持します。

トレースデータは非常に反復性が高いため、高スループットのサービスでは、通常、すべてのリクエストを収集する必要はありません。十分重要な問題は、常に複数のトレースで症状を示すはずです。[取り込み制御][18]は、予算の範囲内で、問題のトラブルシューティングに必要な可視性を確保するのに役立ちます。

取り込みのためのデフォルトのサンプリングメカニズムは[ヘッドベースサンプリング][19]と呼ばれています。トレースを維持するか削除するかの決定は、トレースの一番最初、ルートスパンの開始時に行われます。この決定は、HTTP リクエストヘッダーなどのリクエストコンテキストの一部として、他のサービスに伝搬されます。この判断はトレースの最初に行われ、その後トレースのすべての部分に伝えられるため、ルートサービスのサンプリングレートを構成しないと有効になりません。

Datadog がスパンを取り込んだ後、Datadog インテリジェント保持フィルターはトレースの一定割合をインデックス化し、アプリケーションの健全性を監視するのに役立てることができます。また、カスタムの[保持フィルター][20]を定義して、組織の目標をサポートするために長く保存しておきたいトレースデータのインデックスを作成することも可能です。

[Datadog Trace Pipeline][21] の詳細についてはこちらをご覧ください。

## トレースから機密情報をフィルタリングまたはスクラブする

Datadog に送信する前にトレースをフィルタリングするには、[APM で不要なリソースを無視する][22]を参照してください。

データセキュリティのためにトレース属性をスクラブするには、[データセキュリティのための Datadog Agent またはトレーサーの構成][23]を参照してください。

## トレース収集の有効化/無効化

Datadog Lambda 拡張機能によるトレース収集は、デフォルトで有効になっています。

Lambda 関数のトレース収集を開始したい場合は、以下の構成を適用します。

{{< tabs >}}
{{% tab "Datadog CLI" %}}

```sh
datadog-ci lambda instrument \
    --tracing true
    # ... その他の必要な引数 (関数名など)
```
{{% /tab %}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # ... その他の必要なパラメーター (Datadog のサイトや API キーなど)
    enableDDTracing: true
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... その他の必要なパラメーター (Datadog のサイトや API キーなど)
      enableDDTracing: true
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new Datadog(this, "Datadog", {
    // ... その他の必要なパラメーター (Datadog のサイトや API キーなど)
    enableDatadogTracing: true
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

{{% /tab %}}
{{% tab "その他" %}}

Lambda 関数で環境変数 `DD_TRACE_ENABLED` を `true` に設定します。

{{% /tab %}}
{{< /tabs >}}

#### トレース収集の無効化

Lambda 関数のトレース収集を停止したい場合は、以下の構成を適用します。

{{< tabs >}}
{{% tab "Datadog CLI" %}}

```sh
datadog-ci lambda instrument \
    --tracing false
    # ... その他の必要な引数 (関数名など)
```
{{% /tab %}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # ... その他の必要なパラメーター (Datadog のサイトや API キーなど)
    enableDDTracing: false
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... その他の必要なパラメーター (Datadog のサイトや API キーなど)
      enableDDTracing: false
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new Datadog(this, "Datadog", {
    // ... その他の必要なパラメーター (Datadog のサイトや API キーなど)
    enableDatadogTracing: false
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

{{% /tab %}}
{{% tab "その他" %}}

Lambda 関数で環境変数 `DD_TRACE_ENABLED` を `false` に設定します。

{{% /tab %}}
{{< /tabs >}}

## ログとトレースの接続

[Lambda 拡張機能][2]を使ってトレースやログを収集している場合、Datadog は自動的に AWS Lambda のリクエスト ID を `aws.lambda` スパンの `request_id` タグの下に追加します。さらに、同じリクエストの Lambda ログは、`lambda.request_id` 属性の下に追加されます。Datadog のトレースビューとログビューは、AWS Lambda のリクエスト ID を使用して接続されます。

[Forwarder Lambda 関数][4]を使用してトレースとログを収集している場合、`dd.trace_id` は自動的にログに挿入されます (環境変数 `DD_LOGS_INJECTION` で有効になります)。Datadog のトレースとログのビューは、Datadog のトレース ID を使用して接続されています。この機能は一般的なランタイムとロガーを使用しているほとんどのアプリケーションでサポートされています ([ランタイムによるサポート][24]を参照)。

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
    4. 複製したパイプラインの [Grok パーサー][25]ルールを更新して、Datadog トレース ID を `dd.trace_id` 属性にパースするようにします。例えば、`[INFO] dd.trace_id=4887065908816661012 My log message`のようなログには、ルール `my_rule \[%{word:level}\]\s+dd.trace_id=%{word:dd.trace_id}.*` が使用されます。

## ソースコードにエラーをリンクする

<div class="alert alert-info">この機能は、Go、Java、Python、JavaScript でサポートされています。</div>

[Datadog ソースコードインテグレーション][26]では、GitHub で Lambda 関数のソースコードにテレメトリー (スタックトレースなど) をリンクさせることができます。以下の手順で機能を有効化してください。**注**: ダーティでもリモートより先でもない、ローカルの Git リポジトリからデプロイする必要があります。

{{< tabs >}}
{{% tab "Datadog CLI" %}}

`datadog-ci lambda instrument` を `--source-code-integration=true` で実行すると、現在のローカルディレクトリの Git メタデータが自動的に送信され、Lambda 関数に必要なタグが追加されます。

**注**: Git のメタデータをアップロードするためには、環境変数 `DATADOG_API_KEY` を `datadog-ci` に設定する必要があります。`DATADOG_API_KEY` は、テレメトリーを送信する Lambda 関数にも設定されますが、 `DATADOG_API_KEY_SECRET_ARN` も定義されている場合は、`DATADOG_API_KEY` より優先的に設定されます。


```sh
# ... その他の必要な環境変数 (DATADOG_SITE など)

# 必須、git メタデータをアップロードするため
export DATADOG_API_KEY=<DATADOG_API_KEY>

# オプション、未定義の場合は DATADOG_API_KEY が使用されます
export DATADOG_API_KEY_SECRET_ARN=<DATADOG_API_KEY_SECRET_ARN>

datadog-ci lambda instrument \
    --source-code-integration=true
    # ... その他の必要な引数 (関数名など)
```
{{% /tab %}}
{{% tab "Serverless Framework" %}}

`enableSourceCodeIntegration` を `true` に設定すると、Datadog サーバーレスプラグインは自動的に現在のローカルディレクトリの Git メタデータを送信し、Lambda 関数に必要なタグを追加します。

**注**: Git のメタデータをアップロードするためには、プラグインに `apiKey` パラメーターを設定する必要があります。また、テレメトリーを送信する Lambda 関数にも `apiKey` が設定されますが、`apiKeySecretArn` も定義されている場合は `apiKey` よりも優先されます。

```yaml
custom:
  datadog:
    # ... その他の必要なパラメーター (Datadog のサイトなど)
    apiKey: <apiKey> # required, to upload git metadata
    apiKeySecretArn: <apiKeySecretArn> # オプション、未定義の場合は apiKey が使用されます
    enableSourceCodeIntegration: true # default is true
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

初期化関数を次のように変更し、CDK スタックに gitHash の値を渡します。

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

スタックのコンストラクタで、オプションの `gitHash` パラメーターを追加して、`addGitCommitMetadata()` を呼び出します。

```typescript
export class ExampleStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps, gitHash?: string) {
    ...
    ...
    datadog.addGitCommitMetadata([<YOUR_FUNCTIONS>], gitHash)
  }
}
```

{{% /tab %}}
{{% tab "その他" %}}

1. Lambda 関数に環境変数 `DD_TAGS="git.commit.sha:<GIT_COMMIT_SHA>,git.repository_url=<REPOSITORY_URL>"` を設定します
2. CI パイプラインで [datadog-ci git-metadata upload][1] を実行し、Git メタデータをアップロードします
3. オプションで、[GitHub アプリをインストール][2]すると、インラインでソースコードのスニペットを表示することができます。

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}
{{< /tabs >}}

## カスタムメトリクスの送信

[カスタムメトリクスの送信][27]により、カスタムビジネスロジックを監視することができます。

## OpenTelemetry のデータを Datadog に送信する

1. OpenTelemetry にスパンを [Datadog Lambda 拡張機能][40]にエクスポートするよう指示します。

   ```js
   // instrument.js

   const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
   const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
   const { Resource } = require('@opentelemetry/resources');
   const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
   const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');

   const provider = new NodeTracerProvider({
      resource: new Resource({
          [ SemanticResourceAttributes.SERVICE_NAME ]: 'rey-app-otlp-dev-node',
      })
   });

   provider.addSpanProcessor(
      new SimpleSpanProcessor(
          new OTLPTraceExporter(
              { url: 'http://localhost:4318/v1/traces' },
          ),
      ),
   );
   provider.register();
   ```
2. AWS Lambda 用の OpenTelemetry のインスツルメンテーションを追加します。これはトレースレイヤーを追加するようなものです。
   ```js
   // instrument.js

   const { AwsInstrumentation } = require('@opentelemetry/instrumentation-aws-sdk');
   const { AwsLambdaInstrumentation } = require('@opentelemetry/instrumentation-aws-lambda');
   const { registerInstrumentations } = require('@opentelemetry/instrumentation');

   registerInstrumentations({
      instrumentations: [
          new AwsInstrumentation({
              suppressInternalInstrumentation: true,
          }),
          new AwsLambdaInstrumentation({
              disableAwsContextPropagation: true,
          }),
      ],
   });

   ```
3. 実行時にインスツルメンテーションを適用します。例えば、Node.js の場合、`NODE_OPTIONS` を使用します。

   ```yaml
   # serverless.yml

   functions:
     node:
       handler: handler.handler
       environment:
         NODE_OPTIONS: --require instrument
   ```

4. `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` または `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` 環境変数を使って OpenTelemetry を有効にします。Datadog 拡張機能 v41 以降を追加してください。Datadog のトレーシングレイヤーを追加しないでください。

   ```yaml
   # serverless.yml

   provider:
     name: aws
     region: sa-east-1
     runtime: nodejs18.x
     environment:
       DD_API_KEY: ${env:DD_API_KEY}
       DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT: localhost:4318
     layers:
       - arn:aws:lambda:sa-east-1:464622532012:layer:Datadog-Extension:42
   ```

5. デプロイします。

## プロファイリングデータの収集 (公開ベータ版)

Datadog の [Continuous Profiler][42] は、Python ではバージョン 4.62.0、Layer ではバージョン 62 以前のベータ版で利用できます。このオプション機能は、環境変数 `DD_PROFILING_ENABLED` を `true` に設定することで有効になります。

Continuous Profiler は、実行中のすべての Python コードの CPU とヒープのスナップショットを定期的に取得するスレッドを生成して動作します。これにはプロファイラー自体も含まれることがあります。プロファイラー自身を無視したい場合は、`DD_PROFILING_IGNORE_PROFILER` を `true` に設定します。

## PrivateLink またはプロキシ経由でテレメトリーを送信する

Datadog Lambda 拡張機能は、Datadog にデータを送信するために公衆インターネットにアクセスする必要があります。Lambda 関数が公衆インターネットにアクセスできない VPC にデプロイされている場合、`datadoghq.com` [Datadog サイト][29] には [AWS PrivateLink 経由でデータを送信][28]し、それ以外のサイトには[プロキシ経由でデータを送信][30]することができます。

Datadog Forwarder を使用している場合は、こちらの[手順][31]に従ってください。

## 複数の Datadog 組織にテレメトリーを送信する

複数の組織にデータを送信したい場合は、平文の API キー、AWS Secrets Manager、または AWS KMS を使用してデュアルシッピングを有効にすることができます。

{{< tabs >}}
{{% tab "平文の API キー" %}}

Lambda 関数に次の環境変数を設定することで、平文の API キーを使用してデュアルシッピングを有効にすることができます。

```bash
# メトリクスでデュアルシッピングを有効にします
DD_ADDITIONAL_ENDPOINTS={"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}
# APM (トレース) でデュアルシッピングを有効にします
DD_APM_ADDITIONAL_ENDPOINTS={"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}
# APM (プロファイリング) でデュアルシッピングを有効にします
DD_APM_PROFILING_ADDITIONAL_ENDPOINTS={"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}
# ログでデュアルシッピングを有効にします
DD_LOGS_CONFIG_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS=[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]
```

{{% /tab %}}
{{% tab "AWS Secrets Manager" %}}

Datadog 拡張機能は、`_SECRET_ARN` のプレフィックスが付いた任意の環境変数について、[AWS Secrets Manager][1] の値の自動取得をサポートしています。これを利用することで、環境変数を Secrets Manager に安全に格納し、Datadog でのデュアルシッピングを可能にすることができます。

1. Lambda 関数に環境変数 `DD_LOGS_CONFIG_USE_HTTP=true` を設定します。
2. Lambda 関数の IAM ロールの権限に `secretsmanager:GetSecretValue` の権限を追加します。
3. Secrets Manager に、メトリクスのデュアルシッピング用の環境変数を格納するための新しいシークレットを作成します。その内容は、`{"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}`と似た内容になります。
4. Lambda 関数の環境変数 `DD_ADDITIONAL_ENDPOINTS_SECRET_ARN` に上記シークレットの ARN を設定します。
5. Secrets Manager に、APM (トレース) のデュアルシッピング用の環境変数を格納するための新しいシークレットを作成します。その内容は、`{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}`と**似た**内容になります。
6. Lambda 関数の環境変数 `DD_APM_ADDITIONAL_ENDPOINTS_SECRET_ARN` に上記シークレットの ARN と同じ値を設定します。
7. Secrets Manager に、APM (プロファイリング) のデュアルシッピング用の環境変数を格納するための新しいシークレットを作成します。その内容は、`{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}`と**似た**内容になります。
8. Lambda 関数の環境変数 `DD_APM_PROFILING_ADDITIONAL_ENDPOINTS_SECRET_ARN` に上記シークレットの ARN と同じ値を設定します。
9. Secrets Manager に、ログのデュアルシッピング用の環境変数を格納するための新しいシークレットを作成します。その内容は、`[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]`と**似た**内容になります。
10. Lambda 関数の環境変数 `DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS_SECRET_ARN` に上記シークレットの ARN と同じ値を設定します。

[1]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html

{{% /tab %}}
{{% tab "AWS KMS" %}}

Datadog 拡張機能は、`_KMS_ENCRYPTED` のプレフィックスが付いた任意の環境変数について、[AWS KMS][41] の値の自動復号化をサポートしています。これを利用することで、環境変数を KMS に安全に格納し、Datadog でのデュアルシッピングを可能にすることができます。

1. Lambda 関数に環境変数 `DD_LOGS_CONFIG_USE_HTTP=true` を設定します。
2. Lambda 関数の IAM ロールの権限に `kms:GenerateDataKey` と `kms:Decrypt` の権限を追加します。
3. メトリクスのデュアルシッピングの場合は、KMS を使用して`{"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}` を暗号化し、`DD_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` 環境変数にその値を設定します。
4. トレースのデュアルシッピングの場合は、KMS を使用して  `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}` を暗号化し、`DD_APM_ADDITIONAL_KMS_ENCRYPTED` 環境変数にその値を設定します。
5. プロファイリングのデュアルシッピングの場合は、KMS を使用して  `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}` を暗号化し、`DD_APM_PROFILING_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` 環境変数にその値を設定します。
5. ログのデュアルシッピングの場合は、KMS を使用して `[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]` を暗号化し、`DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` 環境変数にその値を設定します。

[41]: https://docs.aws.amazon.com/kms/
{{% /tab %}}
{{< /tabs >}}

より高度な使用方法については、[デュアルシッピングガイド][32]を参照してください。

## AWS リソース上でトレースコンテキストを伝播させる

Datadog は、発信する AWS SDK のリクエストにトレースコンテキストを自動的に挿入し、Lambda イベントからトレースコンテキストを抽出します。これにより、Datadog は分散サービス上でリクエストやトランザクションをトレースすることができます。[サーバーレスのトレース伝播][33]を参照してください。

## X-Ray と Datadog のトレースをマージする

AWS X-Ray は、AppSync や Step Functions などの特定の AWS マネージドサービスを通じたトレースをサポートしていますが、Datadog APM ではネイティブにサポートされていません。[Datadog X-Ray インテグレーション][34]を有効にし、X-Ray トレースを Datadog ネイティブトレースとマージすることが可能です。[追加詳細][35]を参照してください。

## AWS Lambda のコード署名を有効にする

[AWS Lambda のコード署名][36]により、信頼できるコードのみを Lambda 関数から AWS へデプロイすることができます。関数でコード署名を有効にすると、デプロイメントのすべてのコードが信頼できるソースにより署名されていることが AWS で検証されます。このソースは、コード署名コンフィギュレーションで定義します。

Lambda 関数がコード署名を使用するように構成されている場合、Datadog が公開する Lambda レイヤーを使用して Lambda 関数をデプロイする前に、関数のコード署名構成に Datadog の Signing Profile ARN を追加する必要があります。

Datadog の Signing Profile ARN:

{{< site-region region="us,us3,us5,eu,gov" >}}
```
arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc
```
{{< /site-region >}}

{{< site-region region="ap1" >}}
```
arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc
```
{{< /site-region >}}


## Datadog Lambda 拡張機能に移行する

Datadog は、[Forwarder Lambda 関数][4]または [Lambda 拡張機能][2]を使用して、Lambda 関数から監視データを収集することができます。Datadog は、新規インストールには Lambda 拡張機能を推奨しています。迷っている場合は、[Datadog Lambda 拡張機能への移行を決定する][37]を参照してください。

移行するには、[Datadog Lambda 拡張機能を使ったインストール手順][1]と [Datadog Forwarder を使った手順][38]を比較してみてください。ご参考までに、主な相違点を以下にまとめます。

**注**: Datadog では、まず開発用とステージング用のアプリケーションを移行し、本番用のアプリケーションを 1 つずつ移行していくことを推奨しています。

{{< tabs >}}
{{% tab "Datadog CLI" %}}

1. `datadog/datadog-ci` を最新バージョンにアップグレードする
2. 引数 `--layer-version` を更新し、ランタイムの最新バージョンに設定します。
3. 引数 `--extension-version` を最新の拡張機能バージョンに設定します。最新の拡張機能バージョンは `{{< latest-lambda-layer-version layer="extension" >}}` です。
4. 必要な環境変数 `DATADOG_SITE` と `DATADOG_API_KEY_SECRET_ARN` を設定します。
5. 引数 `--forwarder` を削除します。
6. Lambda のロググループに Forwarder を自動的にサブスクライブするように Datadog AWS インテグレーションを構成した場合、その地域の Lambda 関数を_すべて_移行した後にそれを無効にしてください。

{{% /tab %}}
{{% tab "Serverless Framework" %}}

1. `serverless-plugin-datadog` を最新バージョンにアップグレードします。このバージョンでは、`addExtension` を `false` に設定しない限り、Datadog Lambda 拡張機能がデフォルトでインストールされます。
2. 必要なパラメーター `site` と `apiKeySecretArn` を設定します。
3. Lambda のリソースタグとして `env`、`service`、`version` パラメーターを設定していた場合は、それらを設定します。このプラグインは、拡張機能を使用する際に、代わりに `DD_ENV` などの Datadog で予約された環境変数を通して自動的にそれらを設定します。
4. ただし、Lambda 以外のリソースからログを収集するために Forwarder を保持し、`subscribeToApiGatewayLogs`、`subscribeToHttpApiLogs`、`subscribeToWebsocketLogs` を `true` に設定している場合は、`forwarderArn` パラメーターは削除してください。
5. Lambda のロググループに Forwarder を自動的にサブスクライブするように Datadog AWS インテグレーションを構成した場合、その地域の Lambda 関数を_すべて_移行した後にそれを無効にしてください。

{{% /tab %}}
{{% tab "AWS SAM" %}}

1. `datadog-serverless-macro` CloudFormation スタックを更新して、最新バージョンを取得します。
2. `extensionLayerVersion` パラメーターを最新の拡張機能バージョンに設定します。最新の拡張機能バージョンは `{{< latest-lambda-layer-version layer="extension" >}}` です。
3. 必要なパラメーター `site` と `apiKeySecretArn` を設定します。
4. `forwarderArn` パラメーターを削除します。
5. Lambda のロググループに Forwarder を自動的にサブスクライブするように Datadog AWS インテグレーションを構成した場合、その地域の Lambda 関数を_すべて_移行した後にそれを無効にしてください。

{{% /tab %}}
{{% tab "AWS CDK" %}}

1. `datadog-cdk-constructs` または `datadog-cdk-constructs-v2` を最新バージョンにアップグレードします。
2. `extensionLayerVersion` パラメーターを最新の拡張機能バージョンに設定します。最新の拡張機能バージョンは `{{< latest-lambda-layer-version layer="extension" >}}` です。
3. 必要なパラメーター `site` と `apiKeySecretArn` を設定します。
4. Lambda のリソースタグとして `env`、`service`、`version` パラメーターを設定していた場合は、それらを設定します。このコンストラクトは、拡張機能を使用する際に、代わりに `DD_ENV` などの Datadog で予約された環境変数を通して自動的にそれらを設定します。
5. `forwarderArn` パラメーターを削除します。
6. Lambda のロググループに Forwarder を自動的にサブスクライブするように Datadog AWS インテグレーションを構成した場合、その地域の Lambda 関数を_すべて_移行した後にそれを無効にしてください。

{{% /tab %}}
{{% tab "その他" %}}

1. ランタイム用の Datadog Lambda ライブラリレイヤーを最新バージョンにアップグレードします。
2. 最新バージョンの Datadog Lambda 拡張機能をインストールします。
3. 必要な環境変数 `DD_SITE` と `DD_API_KEY_SECRET_ARN` を設定します。
3. 環境変数 `DD_ENV`、`DD_SERVICE`、`DD_VERSION` を Lambda のリソースタグとして設定したことがある場合は、それを設定します。
4. Lambda 関数のロググループから Datadog Forwarder にログをストリーミングするサブスクリプションフィルターを削除します。
5. Lambda のロググループに Forwarder を自動的にサブスクライブするように Datadog AWS インテグレーションを構成した場合、その地域の Lambda 関数を_すべて_移行した後にそれを無効にしてください。

{{% /tab %}}
{{< /tabs >}}

## Datadog Lambda 拡張機能で x86 と arm64 の切り替えを行う

Datadog 拡張機能はコンパイル済みのバイナリコードで、x86 と rm64 の2種類が用意されています。CDK、Serverless Framework、SAM などのデプロイメントツールを使用して x86 の Lambda 関数を arm64 に移行 (または arm64 を x86 に移行) する場合、サービスインテグレーション (API Gateway、SNS、Kinesisなど) が Lambda 関数のバージョンまたはエイリアスを使用する構成になっていることを確認してください。この確認を怠ると、デプロイ中に関数が約 10 秒間利用できなくなる可能性があります。

この現象が起きるのは、x86 から arm64 への Lambda 関数の移行が、`updateFunction` と `updateFunctionConfiguration` という並列で実行される 2 つの API 呼び出しで構成されているからです。これらの呼び出し中に短時間のずれが生じ、Lambda の `updateFunction` の呼び出しが完了して新しいアーキテクチャを使用するようコードが更新されても、 `updateFunctionConfiguration` の呼び出しがまだ完了せず、拡張機能で引き続き古いアーキテクチャを使用する構成が残ってしまいます。

Layer のバージョンを利用できない場合、Datadog では、アーキテクチャの移行プロセス中に [Datadog Forwarder][38] の構成を行うことを推奨しています。


## ローカルテスト用の Datadog Lambda 拡張機能の構成

Datadog Lambda 拡張機能をインストールして、Lambda 関数のコンテナイメージをローカルでテストするには、ローカルのテスト環境で `DD_LOCAL_TEST` を `true` に設定する必要があります。そうしないと、拡張機能は AWS Extensions API からのレスポンスを待ち、呼び出しをブロックします。

## トラブルシューティング

インストール時の構成に問題がある場合は、環境変数 `DD_LOG_LEVEL` を `debug` に設定すると、デバッグ用のログが出力されます。その他のトラブルシューティングのヒントについては、[サーバーレスモニタリングのトラブルシューティングガイド][39]を参照してください。

## その他の参考資料

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
[27]: /ja/serverless/custom_metrics
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