---
description: AWS Lambda、ECS Fargate、Azure Functions、Cloud Run、およびその他のサーバーレスプラットフォームから、Datadog
  Agent や Collector を使用することなくトレースを Datadog へ直接送信します。
further_reading:
- link: /opentelemetry/setup/otlp_ingest/
  tag: ドキュメント
  text: Datadog OTLP インテークエンドポイント
- link: /serverless/
  tag: ドキュメント
  text: Datadog Serverless Monitoring
title: Serverless 向け OTLP インテーク
---
## 概要 {#overview}

[Datadog Agent][1] や OpenTelemetry Collector を必要とすることなく、サーバーレスワークロードから HTTP/protobuf 経由でトレースを Datadog へ直接送信します。プラットフォームが[マネージドプラットフォーム][5]テーブルに表示されている場合は、代わりに専用のエンドポイントを使用してください。

サーバーレスワークロードは、一般的な [OTLP ログ][3]および [OTLP メトリクス][4]インテークエンドポイント経由でログとメトリクスを送信することもできます。このページのリソース属性は、アプリケーションがエクスポートするすべてのシグナルに適用されます。

サポート対象プラットフォーム:

- **AWS**: Lambda、ECS Fargate
- **Azure**: Container Apps、Web Apps (App Service)、Azure Functions
- **GCP**: Cloud Run、Cloud Run Functions、GKE Autopilot

<div class="alert alert-info">Collector の実行が現実的でない場合、直接インジェストを使用します (Lambda など)。Collector を実行できる場合は、メタデータのエンリッチメント、正規化、および集中サンプリングの <a href="/opentelemetry/setup/collector_exporter/">OpenTelemetry Collector</a> を参照してください。</div>

## 前提条件 {#prerequisites}

以下の設定はすべてのプラットフォームに適用されます。

**プロトコル**: `http/protobuf` または `http/json`。`grpc` はサポート対象外です。

**必須ヘッダー**:

- `dd-api-key`: Datadog API キー。
- `dd-otlp-source`: `serverless` に設定します。
- `compute_stats`: `true` に設定します。[トレースメトリクス][2]に必要です。

**サービス名**: `OTEL_SERVICE_NAME` を設定してサービスを識別します。これがない場合、トレースは `unknown_service` として表示されます。

**リソース属性**: `OTEL_RESOURCE_ATTRIBUTES` を使用してプラットフォーム固有の属性を設定します。必須属性およびオプション属性については、以下の各クラウドプロバイダータブを参照してください。

`host.name` ではなく、このページのプラットフォーム属性を使用してワークロードを識別します。ダイレクト OTLP インテークのホスト名の推奨事項については、[ホスト名とタグ付け][6]をご覧ください。

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="{{< region-param key="otlp_trace_endpoint" >}}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-service"
```

## セットアップ {#setup}

<div class="alert alert-info">利用している <a href="/getting_started/site/">Datadog サイト</a>である次に基づく: {{< region-param key=dd_datacenter code="true" >}}: 次の例では <code>${YOUR_ENDPOINT}</code> を {{< region-param key="otlp_trace_endpoint" code="true" >}} に置き換えます。</div>

プラットフォーム固有のリソース属性設定を行うクラウドプロバイダーを選択します。

{{< tabs >}}
{{% tab "AWS" %}}

### Lambda {#lambda}

[AWS Distro for OpenTelemetry (ADOT) Lambda レイヤー][100]は、Lambda 関数の自動インスツルメンテーションとリソース検出を提供します。

ADOT レイヤーを Lambda 関数に追加し、以下の環境変数を設定します。

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-lambda-function"
```

ADOT レイヤーはリソース属性の検出を自動的に処理します。ADOT を使用していない場合は、リソース属性を手動で設定してください。`cloud.provider` は必須です。完全なプラットフォーム識別を行うには `faas.id` (解析可能な Lambda ARN) を設定します。`faas.id` が利用できない場合は、代わりに `cloud.platform=aws_lambda` を設定してください。

```shell
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=aws,faas.id=arn:aws:lambda:us-east-1:123456789012:function:my-function"
```

| 属性 | 必須 | 説明 |
|---|---|---|
| `cloud.provider` | Yes | 設定: `aws` |
| `faas.id` | 推奨 | Lambda 関数 ARN (プラットフォーム識別に推奨) |
| `cloud.platform` | 条件付き | `faas.id` が設定されていない場合は `aws_lambda` に設定します |
| `cloud.region` | No | AWS リージョン |
| `faas.name` | No | 関数名 |
| `faas.version` | No | 関数バージョン |
| `faas.instance` | No | インスタンス識別子 |
| `faas.max_memory` | No | 設定された最大メモリ (バイト) |
| `aws.log.group.names` | No | CloudWatch ロググループ名 (トレースログの相関付けを有効にする) |
| `aws.log.stream.names` | No | CloudWatch ログストリーム名 |

### ECS Fargate {#ecs-fargate}

ECS Fargate の識別は、`cloud.provider` または `cloud.platform` ではなく、タスク ARN と起動タイプによって行われます。OpenTelemetry SDK を設定して、ECS タスクから直接トレースをエクスポートします。

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-ecs-service"
export OTEL_RESOURCE_ATTRIBUTES="aws.ecs.task.arn=arn:aws:ecs:us-east-1:123456789012:task/my-cluster/1234567890abcdef,aws.ecs.launchtype=fargate"
```

| 属性 | 必須 | 説明 |
|---|---|---|
| `aws.ecs.task.arn` | Yes | ECS タスク ARN |
| `aws.ecs.launchtype` | Yes | `fargate` に設定します (大文字と小文字は区別しません) |
| `cloud.provider` | No | デフォルト: `aws` |
| `cloud.platform` | No | デフォルト: `aws_ecs` |
| `cloud.region` | No | AWS リージョン |
| `cloud.availability_zone` | No | アベイラビリティーゾーン |
| `aws.ecs.cluster.arn` | No | クラスター ARN |
| `aws.ecs.task.family` | No | タスク定義ファミリー |
| `aws.ecs.task.id` | No | タスク ID |
| `aws.ecs.task.revision` | No | タスク定義リビジョン |
| `aws.log.group.names` | No | CloudWatch ロググループ名 (トレースログの相関付けを有効にする) |
| `aws.log.stream.names` | No | CloudWatch ログストリーム名 |

[100]: https://aws-otel.github.io/docs/getting-started/lambda

{{% /tab %}}
{{% tab "Azure" %}}

<div class="alert alert-warning">OpenTelemetry Collector の Azure リソース検出プロセッサーは、VM のみに対応しています。SDK レベルの Azure リソース検出機能は一部のプラットフォーム (Web Apps、Functions) に対応していますが、カバレッジは言語 SDK によって異なります。すべての Azure サーバーレスプラットフォームにおける信頼性の高いパスとして、 <code>cloud.provider</code>、<code>cloud.platform</code>、および <code>cloud.resource_id</code> を手動で設定します。</div>

### Container Apps {#container-apps}

Container Apps の Azure リソース検出機能サポートは、言語 SDK によって異なります。リソース属性を手動で設定する:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-container-app"
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=azure,cloud.platform=azure.container_apps,cloud.resource_id=/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.App/containerApps/{appName}"
```

### Web Apps (App Service) {#web-apps-app-service}

Azure リソース検出機能 SDK パッケージを使用する (言語 SDK によってカバレッジが異なります)、または `OTEL_RESOURCE_ATTRIBUTES` を手動で設定します。

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-web-app"
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=azure,cloud.platform=azure.app_service,cloud.resource_id=/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{appName}"
```

### Azure Functions {#azure-functions}

Azure リソース検出機能 SDK パッケージを使用する (言語 SDK によってカバレッジが異なります)、または `OTEL_RESOURCE_ATTRIBUTES` を手動で設定します。

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-azure-function"
export OTEL_RESOURCE_ATTRIBUTES="cloud.provider=azure,cloud.platform=azure.functions,cloud.resource_id=/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{functionAppName}"
```

### リソース属性リファレンス {#resource-attributes-reference}

| プラットフォーム | `cloud.provider` | `cloud.platform` | `cloud.resource_id` |
|---|---|---|---|
| Container Apps | `azure` | `azure.container_apps` | `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.App/containerApps/{appName}` |
| Web Apps | `azure` | `azure.app_service` | `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{appName}` |
| Azure Functions | `azure` | `azure.functions` | `/subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Web/sites/{functionAppName}` |

{{% /tab %}}
{{% tab "GCP" %}}

GCP リソース検出は、GCP リソース検出機能 SDK パッケージで自動的に機能します。アプリケーションの依存関係に追加すると、手動で設定しなくてもリソース属性が設定されます。

### Cloud Run および Cloud Run 関数 {#cloud-run-and-cloud-run-functions}

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-cloud-run-service"
```

GCP リソース検出機能 SDK は、`cloud.account.id`、`cloud.platform`、`cloud.provider`、`cloud.region`、`faas.id`、`faas.instance`、`faas.name`、`faas.version` を自動的に設定します。

### GKE Autopilot {#gke-autopilot}

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="${YOUR_ENDPOINT}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=serverless,compute_stats=true"
export OTEL_SERVICE_NAME="my-gke-service"
```

GCP リソース検出機能 SDK は、`cloud.account.id`、`cloud.platform`、`cloud.provider`、`cloud.region`、`host.id`、`k8s.cluster.name` を自動的に設定します。

### リソース属性リファレンス {#resource-attributes-reference-1}

| プラットフォーム | GCP リソース検出機能によって設定される属性 |
|---|---|
| Cloud Run / Cloud Run 関数 | `cloud.account.id`、`cloud.platform`、`cloud.provider`、`cloud.region`、`faas.id`、`faas.instance`、`faas.name`、`faas.version` |
| GKE Autopilot | `cloud.account.id`、`cloud.platform`、`cloud.provider`、`cloud.region`、`host.id`、`k8s.cluster.name` |

{{% /tab %}}
{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/opentelemetry/otlp_ingest_in_the_agent/
[2]: /ja/tracing/metrics/
[3]: /ja/opentelemetry/setup/otlp_ingest/logs/
[4]: /ja/opentelemetry/setup/otlp_ingest/metrics/
[5]: /ja/opentelemetry/setup/otlp_ingest/managed_platforms/
[6]: /ja/opentelemetry/config/hostname_tagging/#direct-otlp-intake-without-a-collector