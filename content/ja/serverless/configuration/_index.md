---
aliases:
- /ja/serverless/distributed_tracing/collect_lambda_payloads
- /ja/serverless/libraries_integrations/lambda_code_signing
- /ja/serverless/guide/forwarder_extension_migration/
- /ja/serverless/guide/extension_private_link/
further_reading:
- link: /serverless/installation/
  tag: ドキュメント
  text: サーバーレスモニタリングのインストール
- link: /serverless/troubleshooting/
  tag: ドキュメント
  text: サーバーレスモニタリングのトラブルシューティング
kind: documentation
title: サーバーレスモニタリングの構成
---

まず、Datadog サーバーレスモニタリングを[インストール][1]し、メトリクス、トレース、ログの収集を開始します。インストールが完了したら、以下のトピックを参照して、モニタリングのニーズに合わせてインストールを構成します。

### メトリクス
- [非 Lambda リソースからメトリクスを収集する](#collect-metrics-from-non-lambda-resources)
- [カスタムメトリクスの送信](#submit-custom-metrics)

### ログ管理
- [ログ収集の構成](#configure-logs-collection)
- [非 Lambda リソースからログを収集する](#collect-logs-from-non-lambda-resources)
- [ログとトレースを接続する](#connect-logs-and-traces)

### APM
- [トレース収集の構成](#configure-trace-collection)
- [リクエストとレスポンスのペイロードを収集する](#collect-the-request-and-response-payloads)
- [非 Lambda リソースからトレースを収集する](#collect-traces-from-non-lambda-resources)
- [AWS リソース上でトレースコンテキストを伝播させる](#propagate-trace-context-over-aws-resources)
- [X-Ray と Datadog のトレースをマージする](#merge-x-ray-and-datadog-traces)
- [ソースコードにエラーをリンクさせる](#link-errors-to-your-source-code)

### その他
- [タグを使ったテレメトリー接続](#connect-telemetry-using-tags)
- [AWS PrivateLink またはプロキシ経由でテレメトリーを送信する](#send-telemetry-over-privatelink-or-proxy)
- [Datadog Lambda 拡張機能に移行する](#migrate-to-the-datadog-lambda-extension)
- [AWS Lambda のコード署名を有効にする](#enable-aws-lambda-code-signing)
- [トラブルシューティング](#troubleshoot)

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

また、Datadog は、Lambda 関数に定義された既存の AWS リソースタグで、収集したテレメトリーをリッチ化することができます。

- [Datadog Lambda 拡張機能][2]を使用して Lambda 関数からテレメトリーを収集している場合、[Datadog AWS インテグレーション][3]を有効にします。

- [Datadog Forwarder Lambda 関数][4]を使って Lambda 関数からテレメトリーを収集している場合、Datadog Forwarder の CloudFormation スタックで、`DdFetchLambdaTags` オプションを `true` に設定します。このオプションは、バージョン 3.19.0 以降、デフォルトで true に設定されています。

## リクエストとレスポンスのペイロードを収集する

<div class="alert alert-info">この機能は現在、Python、Node.js、Java、.NET でサポートされています。</div>

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
- S3
- DynamoDB

この機能を無効にするには、`DD_TRACE_MANAGED_SERVICES` を `false` に設定します。

## ログ収集の構成

### ログから情報をフィルタリングまたはスクラブする

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

### ログ収集の無効化

Datadog Lambda 拡張機能によるログ収集は、デフォルトで有効になっています。

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

## トレース収集の構成

Datadog APM クライアントによって自動的にインスツルメントされるライブラリやフレームワークについては、[APM の互換性要件][14]を参照してください。カスタムアプリケーションをインスツルメントするには、Datadog の APM ガイドの[カスタムインスツルメンテーション][15]を参照してください。

### トレースから機密情報をフィルタリングまたはスクラブする

Datadog に送信する前にトレースをフィルタリングするには、[APM で不要なリソースを無視する][16]を参照してください。

データセキュリティのためにトレース属性をスクラブするには、[データセキュリティのための Datadog Agent またはトレーサーの構成][17]を参照してください。

### トレース収集の無効化

Datadog Lambda 拡張機能によるトレース収集は、デフォルトで有効になっています。Lambda 関数からのトレース収集を停止したい場合は、以下の手順に従ってください。

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

[Forwarder Lambda 関数][4]を使用してトレースとログを収集している場合、`dd.trace_id` は自動的にログに挿入されます (環境変数 `DD_LOGS_INJECTION` で有効になります)。Datadog のトレースとログのビューは、Datadog のトレース ID を使用して接続されています。この機能は一般的なランタイムとロガーを使用しているほとんどのアプリケーションでサポートされています ([ランタイムによるサポート][18]を参照)。

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
    4. 複製したパイプラインの [Grok パーサー][19]ルールを更新して、Datadog トレース ID を `dd.trace_id` 属性にパースするようにします。例えば、`[INFO] dd.trace_id=4887065908816661012 My log message`のようなログには、ルール `my_rule \[%{word:level}\]\s+dd.trace_id=%{word:dd.trace_id}.*` が使用されます。

## ソースコードにエラーをリンクする

<div class="alert alert-info">この機能は、Go と Java でサポートされています。</div>

[Datadog ソースコードインテグレーション][20]では、GitHub で Lambda 関数のソースコードにテレメトリー (スタックトレースなど) をリンクさせることができます。以下の手順で機能を有効化してください。**注**: ダーティでもリモートより先でもない、ローカルの Git リポジトリからデプロイする必要があります。

{{< tabs >}}
{{% tab "Datadog CLI" %}}

`datadog-ci lambda instrument` を `--source-code-integration true` で実行すると、現在のローカルディレクトリの Git メタデータが自動的に送信され、Lambda 関数に必要なタグが追加されます。

**注**: Git のメタデータをアップロードするためには、環境変数 `DATADOG_API_KEY` を `datadog-ci` に設定する必要があります。`DATADOG_API_KEY` は、テレメトリーを送信する Lambda 関数にも設定されますが、 `DATADOG_API_KEY_SECRET_ARN` も定義されている場合は、`DATADOG_API_KEY` より優先的に設定されます。


```sh
# ... その他の必要な環境変数 (DATADOG_SITE など)

# 必須、git メタデータをアップロードするため
export DATADOG_API_KEY=<DATADOG_API_KEY>

# オプション、未定義の場合は DATADOG_API_KEY が使用されます
export DATADOG_API_KEY_SECRET_ARN=<DATADOG_API_KEY_SECRET_ARN>

datadog-ci lambda instrument \
    --source-code-integration true
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
[2]: https://app.datadoghq.com/account/settings#integrations/github-apps
{{% /tab %}}
{{< /tabs >}}

## カスタムメトリクスの送信

[カスタムメトリクスの送信][21]により、カスタムビジネスロジックを監視することができます。

## PrivateLink またはプロキシ経由でテレメトリーを送信する

Datadog Lambda 拡張機能は、Datadog にデータを送信するために公衆インターネットにアクセスする必要があります。Lambda 関数が公衆インターネットにアクセスできない VPC にデプロイされている場合、`datadoghq.com` [Datadog サイト][23] には [AWS PrivateLink 経由でデータを送信]し、それ以外のサイトには[プロキシ経由でデータを送信][24]することができます。

Datadog Forwarder を使用している場合は、こちらの[手順][25]に従ってください。

## AWS リソース上でトレースコンテキストを伝播させる

Datadog は、発信する AWS SDK のリクエストにトレースコンテキストを自動的に挿入し、Lambda イベントからトレースコンテキストを抽出します。これにより、Datadog は分散サービス上でリクエストやトランザクションをトレースすることができます。[サーバーレスのトレース伝播][26]を参照してください。

## X-Ray と Datadog のトレースをマージする

AWS X-Ray は、AppSync や Step Functions などの特定の AWS マネージドサービスを通じたトレースをサポートしていますが、Datadog APM ではネイティブにサポートされていません。[Datadog X-Ray インテグレーション][27]を有効にし、X-Ray トレースを Datadog ネイティブトレースとマージすることが可能です。[追加詳細][28]を参照してください。

## AWS Lambda のコード署名を有効にする

[AWS Lambda のコード署名][29]により、信頼できるコードのみを Lambda 関数から AWS へデプロイすることができます。関数でコード署名を有効にすると、デプロイメントのすべてのコードが信頼できるソースにより署名されていることが AWS で検証されます。このソースは、コード署名コンフィギュレーションで定義します。

Lambda 関数がコード署名を使用するように構成されている場合、Datadog が公開する Lambda レイヤーを使用して Lambda 関数をデプロイする前に、関数のコード署名構成に Datadog の Signing Profile ARN を追加する必要があります。

Datadog の Signing Profile ARN:

```
arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc
```

## Datadog Lambda 拡張機能に移行する

Datadog は、[Forwarder Lambda 関数][4]または [Lambda 拡張機能][2]を使用して、Lambda 関数から監視データを収集することができます。Datadog は、新規インストールには Lambda 拡張機能を推奨しています。迷っている場合は、[Datadog Lambda 拡張機能への移行を決定する][30]を参照してください。

移行するには、[Datadog Lambda 拡張機能を使ったインストール手順][1]と [Datadog Forwarder を使った手順][31]を比較してみてください。ご参考までに、主な相違点を以下にまとめます。

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

## トラブルシューティング

インストール時の構成に問題がある場合は、環境変数 `DD_LOG_LEVEL` を `debug` に設定すると、デバッグ用のログが出力されます。その他のトラブルシューティングのヒントについては、[サーバーレスモニタリングのトラブルシューティングガイド][32]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}



[1]: /ja/serverless/installation/
[2]: /ja/serverless/libraries_integrations/extension/
[3]: /ja/integrations/amazon_web_services/
[4]: /ja/serverless/libraries_integrations/forwarder/
[5]: https://www.datadoghq.com/blog/troubleshoot-lambda-function-request-response-payloads/
[6]: /ja/tracing/setup_overview/configure_data_security/#scrub-sensitive-data-from-your-spans
[7]: /ja/serverless/enhanced_lambda_metrics
[8]: /ja/integrations/amazon_api_gateway/#data-collected
[9]: /ja/integrations/amazon_appsync/#data-collected
[10]: /ja/integrations/amazon_sqs/#data-collected
[11]: /ja/integrations/amazon_web_services/#log-collection
[12]: https://www.datadoghq.com/blog/monitor-aws-fully-managed-services-datadog-serverless-monitoring/
[13]: /ja/agent/logs/advanced_log_collection/
[14]: /ja/tracing/setup_overview/compatibility_requirements/
[15]: /ja/tracing/setup_overview/custom_instrumentation/
[16]: /ja/tracing/guide/ignoring_apm_resources/
[17]: /ja/tracing/setup_overview/configure_data_security/
[18]: /ja/tracing/connect_logs_and_traces/
[19]: /ja/logs/log_configuration/parsing/
[20]: /ja/integrations/guide/source-code-integration
[21]: /ja/serverless/custom_metrics
[22]: /ja/agent/guide/private-link/
[23]: /ja/getting_started/site/
[24]: /ja/agent/proxy/
[25]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#aws-privatelink-support
[26]: /ja/serverless/distributed_tracing/serverless_trace_propagation/
[27]: /ja/integrations/amazon_xray/
[28]: /ja/serverless/distributed_tracing/serverless_trace_merging
[29]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html
[30]: /ja/serverless/guide/extension_motivation/
[31]: /ja/serverless/guide#install-using-the-datadog-forwarder
[32]: /ja/serverless/guide/troubleshoot_serverless_monitoring/