---
aliases:
- /ja/tracing/setup_overview/open_standards/otlp_ingest_in_the_agent/
- /ja/tracing/trace_collection/open_standards/otlp_ingest_in_the_agent/
- /ja/opentelemetry/otlp_ingest_in_the_agent/
- /ja/opentelemetry/interoperability/otlp_ingest_in_the_agent/
description: Datadog Agent 経由で OTLP トレース データを取り込む
further_reading:
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-announces-opentelemetry-protocol-support/
  tag: ブログ
  text: Agent における OTLP 取り込み
- link: /metrics/open_telemetry/otlp_metric_types
  tag: ドキュメント
  text: OTLP メトリクス タイプ
- link: /opentelemetry/runtime_metrics/
  tag: ドキュメント
  text: OpenTelemetry ランタイム メトリクス
title: Datadog Agent による OTLP 取り込み
---


Agent における OTLP 取り込みは、[OpenTelemetry SDK][1] でインスツルメントされたアプリケーションから Datadog Agent へテレメトリ データを直接送信する方法です。バージョン 6.32.0 および 7.32.0 以降、Datadog Agent は gRPC または HTTP 経由で OTLP トレースと [OTLP メトリクス][2] を取り込めます。バージョン 6.48.0 および 7.48.0 以降、Datadog Agent は gRPC または HTTP 経由で OTLP ログも取り込めます。

Agent における OTLP 取り込みにより、Datadog Agent の各種可観測性機能を利用できます。OpenTelemetry SDK でインスツルメントされたアプリケーションのデータは、App and API Protection、Continuous Profiler、Ingestion Rules といった Datadog 独自製品では使用できない場合があります。[一部の言語で OpenTelemetry ランタイム メトリクスがサポートされています][10]。

{{< img src="/opentelemetry/setup/dd-agent-otlp-ingest.png" alt="Diagram: OpenTelemetry SDK が OTLP プロトコルでデータを Collector (Datadog Exporter 搭載) に送信し、Collector が Datadog のプラットフォームへ転送する。" style="width:100%;" >}}

<div class="alert alert-info">このセットアップでサポートされる Datadog 機能については、<b>OTel to Datadog Agent (OTLP)</b> セクションにある <a href="/opentelemetry/compatibility/">機能互換性表</a> を参照してください。</div>

## 初期セットアップ

開始するには、まず OpenTelemetry SDK で [アプリケーションをインスツルメント][3] します。次に、テレメトリ データを OTLP 形式で Datadog Agent にエクスポートします。具体的な構成手順は、以下のページで説明するように、サービスがデプロイされているインフラの種類によって異なります。最新の OTLP バージョンとの互換性を目指していますが、Agent における OTLP 取り込みがすべての OTLP バージョンに対応しているわけではありません。Datadog Agent と互換性のある OTLP バージョンは、OpenTelemetry Collector の OTLP Receiver でサポートされているバージョンと一致します。サポートされている正確なバージョンを確認するには、Agent の `go.mod` ファイル内に記載された `go.opentelemetry.io/collector` のバージョンを確認してください。

OpenTelemetry のインスツルメンテーション ドキュメントを参照し、インスツルメンテーションの送信先として Agent を指定する方法を理解してください。以下に記載する `receiver` セクションは、[OpenTelemetry Collector の OTLP Receiver 構成スキーマ][5] に準拠します。

<div class="alert alert-warning">サポートされるセットアップは、OpenTelemetry データを生成する各ホストに取り込み用 Agent をデプロイする方式です。1 つのホストで動作する Collector やインスツルメント済みアプリから、別ホストの Agent に OpenTelemetry テレメトリを送信することはできません。ただし、Agent が Collector または SDK インスツルメント済みアプリと同一ホスト上にある場合は、複数のパイプラインを構成できます。</div>

## Datadog Agent で OTLP 取り込みを有効化する

{{< tabs >}}
{{% tab "ホスト" %}}

OTLP 取り込みはデフォルトで無効です。`datadog.yaml` の設定を更新するか、環境変数を設定して有効化できます。以下の `datadog.yaml` の設定は、デフォルト ポートでエンドポイントを有効にします。

{{% otel-endpoint-note %}}

gRPC のデフォルト ポート 4317:

```yaml
otlp_config:
  receiver:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
```
HTTP のデフォルト ポート 4318:

```yaml
otlp_config:
  receiver:
    protocols:
      http:
        endpoint: 0.0.0.0:4318
```

代替として、環境変数でポートを指定してエンドポイントを構成できます:

- gRPC (`localhost:4317`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT`
- HTTP (`localhost:4318`): `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT`

これらは core Agent と trace Agent の両プロセスに渡す必要があります。コンテナ化された環境で実行している場合は、ローカル以外のインターフェイスでもサーバーを公開できるよう、`localhost` の代わりに `0.0.0.0` を使用してください。

本機能には gRPC または HTTP のいずれかを構成してください。両方の構成を示す [サンプル アプリケーション][1] があります。

Datadog Agent での OTLP ログ取り込みは、課金に影響する予期せぬログ製品の利用を避けるため、デフォルトで無効になっています。OTLP ログ取り込みを有効にするには:

1. [Host Agent のログ収集セットアップ][2] に従ってログ収集全体を明示的に有効にします:

   ```yaml
   logs_enabled: true
   ```

2. `otlp_config.logs.enabled` を true に設定します:

   ```yaml
   otlp_config:
     logs:
       enabled: true
   ```

[1]: https://gist.github.com/gbbr/4a54dd02d34ad05e694952e0a02e1c67
[2]: /ja/agent/logs/
{{% /tab %}}
{{% tab "Docker" %}}

1. [Datadog Docker Agent のセットアップ][1] に従ってください。

2. Datadog Agent コンテナでは、以下のエンドポイント環境変数を設定し、対応するポートを公開します:
   - gRPC: `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` を `0.0.0.0:4317` に設定し、ポート `4317` を公開します。
   - HTTP: `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` を `0.0.0.0:4318` に設定し、ポート `4318` を公開します。

3. OTLP ログ取り込みを有効にする場合は、Datadog Agent コンテナで次の環境変数を設定します:
   - `DD_LOGS_ENABLED` を true に設定します。
   - `DD_OTLP_CONFIG_LOGS_ENABLED` を true に設定します。

<div class="alert alert-danger">
<strong>既知の問題</strong>: Agent バージョン 7.61.0 以降、Docker 環境で OTLP 取り込みパイプラインの起動に失敗し、次のエラーが表示される場合があります: <code>Error running the OTLP ingest pipeline: failed to register process metrics: process does not exist</code>.<br><br>
該当バージョンを使用している場合は、次のいずれかの回避策を使用できます:<br><br>
1. Agent の Docker コンテナで、環境変数 <code>HOST_PROC</code> を <code>/proc</code> に設定します。<br>
2. Agent の Docker コンテナで、<code>volumes</code> から <code>/proc/:/host/proc/:ro</code> を削除します。<br>
3. Agent の Docker コンテナで、<code>pid</code> を <code>host</code> に設定します。<br><br>
これらの設定は、<code>docker</code> コマンドまたは Docker compose ファイルのいずれかで適用できます。</div>

[1]: /ja/agent/docker/
{{% /tab %}}
{{% tab "Kubernetes (Daemonset)" %}}

1. [Kubernetes Agent のセットアップ][1] に従ってください。

2. trace Agent コンテナと core Agent コンテナの両方で、次の環境変数を構成します:

   gRPC の場合:
   ```
   name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT # enables gRPC receiver on port 4317
   value: "0.0.0.0:4317"
   ```

   HTTP の場合:
   ```
   name: DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT # enables HTTP receiver on port 4318
   value: "0.0.0.0:4318"
   ```
3. core Agent コンテナでは、コンテナ ポート 4317 または 4318 をホスト ポートにマッピングします:

   gRPC の場合:
   ```
   ports:
     - containerPort: 4317
       hostPort: 4317
       name: traceportgrpc
       protocol: TCP
   ```

   HTTP の場合:
   ```
   ports:
     - containerPort: 4318
       hostPort: 4318
       name: traceporthttp
       protocol: TCP
   ```

4. OTLP ログ取り込みを有効にする場合は、core Agent コンテナで次のエンドポイント 環境変数を設定します:

   [DaemonSet でのログ収集][2] を有効化します:
   ```
   name: DD_LOGS_ENABLED
   value: "true"
   ```

   続いて OTLP ログ取り込みを有効化します:
   ```
   name: DD_OTLP_CONFIG_LOGS_ENABLED
   value: "true"
   ```

[1]: /ja/agent/kubernetes/?tab=daemonset
[2]: /ja/containers/guide/kubernetes_daemonset/#log-collection
{{% /tab %}}

{{% tab "Kubernetes (Helm) - values.yaml" %}}

1. [Kubernetes Agent のセットアップ][1] に従ってください。

2. `values.yaml` ファイルの `datadog.otlp` セクションを編集して、Agent で OTLP エンドポイントを有効化します:

   gRPC の場合:
   ```
   otlp:
    receiver:
      protocols:
        grpc:
          endpoint: 0.0.0.0:4317
          enabled: true
   ```

   HTTP の場合:
   ```
   otlp:
    receiver:
      protocols:
        http:
          endpoint: 0.0.0.0:4318
          enabled: true
   ```

これにより、各プロトコルがデフォルト ポートで有効になります (OTLP/gRPC は `4317`、OTLP/HTTP は `4318`)。


[1]: /ja/agent/kubernetes/?tab=helm
{{% /tab %}}

{{% tab "Kubernetes (Helm) - set" %}}

1. [Kubernetes Agent のセットアップ][1] に従ってください。

2. 使用したいプロトコルを有効化します:

   gRPC の場合:
   ```
   --set "datadog.otlp.receiver.protocols.grpc.enabled=true"
   ```
   HTTP の場合:
   ```
   --set "datadog.otlp.receiver.protocols.http.enabled=true"
   ```

これにより、各プロトコルがデフォルト ポートで有効になります (OTLP/gRPC は `4317`、OTLP/HTTP は `4318`)。

[1]: /ja/agent/kubernetes/?tab=helm
{{% /tab %}}
{{% tab "Kubernetes (Operator)" %}}

1. [Kubernetes Agent のセットアップ][1] に従ってください。

2. Operator のマニフェストで、使用するプロトコルを有効化します:

   gRPC の場合:
   ```yaml
   features:
     otlp:
       receiver:
         protocols:
           grpc:
             enabled: true
   ```
   HTTP の場合:
   ```yaml
   features:
     otlp:
       receiver:
         protocols:
           http:
             enabled: true
   ```

これにより、各プロトコルがデフォルト ポートで有効になります (OTLP/gRPC は `4317`、OTLP/HTTP は `4318`)。

[1]: /ja/agent/kubernetes/?tab=helm
{{% /tab %}}
{{% tab "AWS Lambda" %}}

AWS Lambda と Datadog で OpenTelemetry を使用するための詳細な手順 (次を含む):

- OpenTelemetry を用いた Lambda 関数のインスツルメンテーション
- Datadog トレーサーにおける OpenTelemetry API サポートの利用
- Datadog Lambda Extension への OpenTelemetry トレースの送信

詳細は、Serverless ドキュメントの [AWS Lambda と OpenTelemetry][100] を参照してください。

[100]: /ja/serverless/aws_lambda/opentelemetry/
{{% /tab %}}
{{< /tabs >}}

Datadog Agent でサポートされる環境変数や設定は、ほかにも多数あります。全体像については、[設定テンプレート][6] を参照してください。

## OpenTelemetry のトレース、メトリクス、ログを Datadog Agent に送信する

{{< tabs >}}
{{% tab "Docker" %}}
1. アプリケーション コンテナで、Datadog Agent コンテナを指すように環境変数 `OTEL_EXPORTER_OTLP_ENDPOINT` を設定します。例:

   ```
   OTEL_EXPORTER_OTLP_ENDPOINT=http://<datadog-agent>:4318
   ```

2. 両コンテナは同じブリッジ ネットワーク内に定義されている必要があります。Docker Compose を使用している場合は自動的に処理されます。そうでない場合は、[Docker アプリケーションのトレーシング][1] の Docker の例に従って、適切なポートを開けたブリッジ ネットワークを設定してください。

[1]: /ja/agent/docker/apm/#docker-network
{{% /tab %}}

{{% tab "Kubernetes" %}}

アプリケーションのデプロイメント ファイルで、環境変数 `OTEL_EXPORTER_OTLP_ENDPOINT` を用いて、OpenTelemetry クライアントがトレースを送信するエンドポイントを構成します。

gRPC の場合:
```yaml
env:
 - name: HOST_IP
   valueFrom:
     fieldRef:
       fieldPath: status.hostIP
 - name: OTEL_EXPORTER_OTLP_ENDPOINT
   value: "http://$(HOST_IP):4317" # ポート 4317 の gRPC レシーバーに送信
```

HTTP の場合:
```yaml
env:
 - name: HOST_IP
   valueFrom:
     fieldRef:
       fieldPath: status.hostIP
 - name: OTEL_EXPORTER_OTLP_ENDPOINT
   value: "http://$(HOST_IP):4318" # ポート 4318 の HTTP レシーバーに送信
```
**注**: カスタム メトリクスのコンテナ タグを充実させるには、OTLP メトリクスを生成するアプリケーション コード内で適切なリソース 属性を設定してください。例えば、`container.id` リソース 属性に Pod の UID を設定します。

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">トレースの送信先エンドポイントを構成する際は、使用している OTLP ライブラリが要求する正しいパスを指定してください。ライブラリによっては、トレースの送信先を <code>/v1/traces</code> パスに期待するものもあれば、ルート パス <code>/</code> を使用するものもあります。</div>

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/instrumentation/
[2]: /ja/metrics/open_telemetry/otlp_metric_types/
[3]: https://opentelemetry.io/docs/concepts/instrumenting/
[4]: https://github.com/DataDog/datadog-agent/blob/main/CHANGELOG.rst
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/config.md
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[10]: /ja/opentelemetry/runtime_metrics/