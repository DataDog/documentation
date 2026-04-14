---
title: AWS Lambda 向け ログ コレクション
---

<div class="alert alert-info"><a href="https://docs.datadoghq.com/serverless/libraries_integrations/extension/">Datadog Lambda extension</a> を使用している場合、ログ コレクションは <strong>デフォルトで有効</strong> になっています。</div>

### 非 Lambda リソースからログを収集する

AWS Lambda 関数以外のマネージドリソースで生成されたログは、サーバーレスアプリケーションの問題の根本的な原因を特定するのに役立ちます。Datadog では、お使いの環境の以下の AWS マネージドリソースから[ログを収集][11]することをお勧めします。
- API: API Gateway、AppSync、ALB
- キューとストリーム: SQS、SNS、Kinesis
- データストア: DynamoDB、S3、RDS

## 設定

### ログ収集の有効化

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

### ログ収集の無効化

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

### ログのパースと変換

Datadog でログをパースして変換するには、[Datadog ログパイプライン][14]のドキュメントを参照してください。

### ログとトレースの接続

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

[2]: /ja/serverless/libraries_integrations/extension/
[4]: /ja/serverless/libraries_integrations/forwarder/
[11]: /ja/integrations/amazon_web_services/#log-collection
[13]: /ja/agent/logs/advanced_log_collection/
[14]: /ja/logs/log_configuration/pipelines/
[24]: /ja/tracing/other_telemetry/connect_logs_and_traces/
[25]: /ja/logs/log_configuration/parsing/
[47]: /ja/logs/