---
code_lang: windows
code_lang_weight: 5
further_reading:
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: ドキュメント
  text: Datadog Agent でカスタム OpenTelemetry コンポーネントを使用する
title: Windows への DDOT コレクターのインストール
type: multi-code-lang
---
## 概要 {#overview}

このガイドに従って、Windows ベースのベアメタルホストおよび仮想マシンに Datadog Distribution of OpenTelemetry (DDOT) コレクターをインストールします。

## 要件 {#requirements}

このガイドの手順を実行するには、以下の準備が必要です。

**Datadog アカウント**:
1. まだお持ちでない場合は、[Datadog アカウントを作成][1] してください。
1. [Datadog API キー][2] を見つけるか、作成します。

**ソフトウェア**:
- サポートされている Windows バージョン (Windows Server 2016 以降または Windows 10 以降)。詳細については、[サポートされているプラットフォーム][14]を参照してください。

**ネットワーク**:

{{% otel-network-requirements %}}

## OpenTelemetry Collector を使用して Datadog Agent をインストールする {#install-the-datadog-agent-with-opentelemetry-collector}

<div class="alert alert-info">このインストールは、Datadog SDK + DDOT および OpenTelemetry SDK + DDOT 構成の両方に必要です。Datadog SDK は OpenTelemetry API を実装していますが、OTLP メトリクスとログを処理して転送するために DDOT Collector が必要です。</div>

### インストール {#installation}

Windows ホストに DDOT コレクターをインストールするには、次の MSI コマンドを使用します。

```powershell
$p = Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /i "https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi" /log C:\Windows\SystemTemp\install-datadog.log APIKEY="<DATADOG_API_KEY>" SITE="{{< region-param key="dd_site" >}}" DD_OTELCOLLECTOR_ENABLED=true'
if ($p.ExitCode -ne 0) {
  Write-Host "msiexec failed with exit code $($p.ExitCode) please check the logs at C:\Windows\SystemTemp\install-datadog.log" -ForegroundColor Red
}
```

このコマンドは、コア Datadog Agent パッケージと、その横で実行される DDOT コレクターの両方をインストールします。

**注**: Agent v7.78 以降の場合、Datadog Agent がホストに既にインストールされていれば、DDOT コレクターを個別にインストールできます。**管理者特権の PowerShell セッション**から実行します:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" otel install
```

### 検証 {#validation}

インストールを検証するには、Agent の[ステータスコマンド][3]を実行します。

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
```

インストールに成功すると、次のような Agent 情報で始まる Agent Status レポートが返されます。

```text
====================
Agent (v7.x.x)
====================
  Status date: 2025-08-22 18:35:17.449 UTC (1755887717449)
  Agent start: 2025-08-22 18:16:27.004 UTC (1755886587004)
  Pid: 2828211
  Go Version: go1.24.6
  Python Version: 3.12.11
  Build arch: amd64
  Agent flavor: agent
  FIPS Mode: not available
  Log Level: info
```

{{< ui >}}OTel Agent{{< /ui >}} ステータスセクションもあり、OpenTelemetry 情報が含まれています:

```text
==========
OTel Agent
==========

  Status: Running
  Agent Version: 7.x.x
  Collector Version: v0.129.0

  Receiver
  ==========================
    Spans Accepted: 0
    Metric Points Accepted: 1055
    Log Records Accepted: 0

  Exporter
  ==========================
    Spans Sent: 0
    Metric Points Sent: 1055
    Log Records Sent: 0
```

## Datadog Agent を構成する {#configure-the-datadog-agent}

### DDOT コレクターを有効にする {#enable-the-ddot-collector}
Datadog Agent の構成ファイルは、`C:\ProgramData\Datadog\datadog.yaml` に自動的にインストールされます。インストーラーは、DDOT コレクターを有効にするために、以下の構成設定を `C:\ProgramData\Datadog\datadog.yaml` に追加します。

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}
otelcollector:
  enabled: true
agent_ipc:
  port: 5009
  config_refresh_interval: 60
{{< /code-block >}}

DDOT は、デフォルトで OpenTelemetry Collector をポート 4317 (grpc) および 4318 (http) に自動的にバインドします。

### (オプション) 追加の Datadog 機能を有効にする {#optional-enable-additional-datadog-features}

<div class="alert alert-warning">これらの機能を有効にすると、追加料金が発生する場合があります。<a href="https://www.datadoghq.com/pricing/">料金ページ</a>を確認し、進む前にカスタマーサクセスマネージャーに相談してください。</div>

利用可能なオプションの完全な一覧表示については、`C:\ProgramData\Datadog\datadog.yaml.example` にある完全にコメント化されたリファレンスファイルを参照してください。または、GitHub の [Windows 用の Agent 構成ファイルの例][12]を参照してください。

追加の Datadog 機能を有効にする際は、Datadog 環境変数に依存するのではなく、必ず Datadog または OpenTelemetry Collector の設定ファイルを使用してください。

## OpenTelemetry Collector を構成する {#configure-the-opentelemetry-collector}

インストーラーは、出発点として使用できるサンプルの OpenTelemetry Collector 構成を `C:\ProgramData\Datadog\otel-config.yaml` に提供します。

{{% collapse-content title="インストール時のサンプル otel-config.yaml ファイル" level="p" %}}
インストールのサンプル `otel-config.yaml` は次のようになります:
{{< code-block lang="yaml" filename="otel-config.yaml" collapsible="true" >}}
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 60s
          static_configs:
            - targets: ["0.0.0.0:8888"]
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
exporters:
  debug:
    verbosity: detailed
  datadog:
    api:
      key: <DATADOG_API_KEY>
      site: <DATADOG_SITE>
    sending_queue:
      batch:
        flush_timeout: 10s
processors:
  infraattributes:
    cardinality: 2
  cumulativetodelta:
connectors:
  datadog/connector:
    traces:
      compute_top_level_by_span_kind: true
      peer_tags_aggregation: true
      compute_stats_by_span_kind: true
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [datadog, datadog/connector]
    metrics:
      receivers: [otlp, datadog/connector, prometheus]
      processors: [infraattributes, cumulativetodelta]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [datadog]
{{< /code-block >}}
{{% /collapse-content %}}

#### 主要コンポーネント {#key-components}

Datadog にテレメトリデータを送信するために、構成内で次のコンポーネントが定義されています:

{{< img src="/opentelemetry/embedded_collector/components-3.jpg" alt="Agent のデプロイメントパターンを示す図" style="width:100%;" >}}

##### Datadog コネクタ {#datadog-connector}

[Datadog コネクタ][4] は Datadog APM トレースメトリクスを計算します。

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
connectors:
  datadog/connector:
    traces:
{{< /code-block >}}

##### Datadog エクスポーター {#datadog-exporter}

[Datadog エクスポーター][5] はトレース、メトリクス、およびログを Datadog にエクスポートします。

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
exporters:
  datadog:
    api:
      key: <DATADOG_API_KEY>
      site: <DATADOG_SITE>
    sending_queue:
      batch:
        flush_timeout: 10s
{{< /code-block >}}

**注**: `key` が指定されていないかシークレットに設定されている場合、または `site` が指定されていない場合、システムはコア Agent の設定から値を使用します。デフォルトでは、コア Agent はサイトを `datadoghq.com` (US1) に設定します。

##### Prometheus レシーバー {#prometheus-receiver}

[Prometheus レシーバー][6] はメトリクスパイプラインのために OpenTelemetry Collector からヘルスメトリクスを収集します。

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 60s
          static_configs:
            - targets: ["0.0.0.0:8888"]
{{< /code-block >}}

詳細については、[コレクターのヘルスメトリクス][11] ドキュメントを参照してください。

## Datadog にテレメトリを送信する {#send-your-telemetry-to-datadog}

テレメトリデータを Datadog に送信するには:

1. [Instrument your application](#instrument-the-application)
2. [Configure the application](#configure-the-application)
3. [Correlate observability data](#correlate-observability-data)
4. [Run your application](#run-the-application)

### アプリケーションをインスツルメントする{#instrument-the-application}

[OpenTelemetry API を使用して][7] アプリケーションをインスツルメントします。

{{% collapse-content title="OpenTelemetry API でインスツルメントされたアプリケーションの例" level="p" %}}
例として、すでにインスツルメント済みの [カレンダーサンプルアプリケーション][8] を使用できます。以下のコードは、OpenTelemetry のアノテーションと API を使用して [CalendarService.getDate()][9] メソッドをインスツルメントします:
   {{< code-block lang="java" filename="CalendarService.java" disable_copy="true" collapsible="false" >}}
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    Span span = Span.current();
    span.setAttribute("peer.service", "random-date-service");
    ...
}
{{< /code-block >}}
{{% /collapse-content %}}

### アプリケーションを構成する {#configure-the-application}

アプリケーションは、同じホスト上の DDOT Collector にデータを送信する必要があります。`OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数がアプリケーションに設定されていることを確認してください。

サンプルアプリケーションを使用している場合、[`run-otel-local.sh`][13] が必要な環境変数を設定し、アプリケーションを実行します:
{{< code-block lang="bash" filename="run-otel-local.sh" disable_copy="true" collapsible="true" >}}
export OTEL_METRICS_EXPORTER="otlp"
export OTEL_LOGS_EXPORTER="otlp"
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317"
export OTEL_EXPORTER_OTLP_PROTOCOL="grpc"
{{< /code-block >}}

**注**: このスクリプトは、Git for Windows に含まれている Git Bash で実行できます。
### 可観測性データを相関付けする {#correlate-observability-data}

[unified service tagging][10] により、Datadog 内の可観測性データ同士が結び付けられ、一貫性のあるタグを使用してメトリクス、トレース、ログを横断的に確認することができます。

ベアメタル環境では、`env`、`service`、および `version` は OpenTelemetry リソース属性の環境変数を通じて設定されます。DDOT Collector はこのタグ付け構成を検出し、アプリケーションから収集したデータに適用します。

サンプルアプリケーションでは、これは `run-otel-local.sh` で行われます:
{{< code-block lang="bash" filename="run-otel-local.sh" disable_copy="true" collapsible="true" >}}
export OTEL_RESOURCE_ATTRIBUTES="service.name=my-calendar-service,service.version=1.0,deployment.environment.name=otel-test,host.name=calendar-host"
{{< /code-block >}}

### アプリケーションを実行する {#run-the-application}

アプリケーションを再デプロイして、環境変数に加えた変更を適用します。更新された構成が有効になると、メトリクス、トレース、ログに対して unified service tagging が完全に有効になります。

## Datadog で可観測性データを確認する {#explore-observability-data-in-datadog}

Datadog を使用して、アプリケーションの可観測性データを確認します。

### Fleet Automation {#fleet-automation}

Datadog Agent、DDOT、およびアップストリームの OpenTelemetry Collector の構成を確認してください。

{{< img src="/opentelemetry/embedded_collector/fleet_automation.png" alt="Fleet Automation ページから Agent と Collector の構成を確認します。" style="width:100%;" >}}

### インフラストラクチャー監視 {#infrastructure-monitoring}

ランタイムおよびインフラストラクチャーメトリクスを表示して、ホストのパフォーマンスを視覚化、監視、測定します。

{{< img src="/opentelemetry/embedded_collector/infrastructure.png" alt="Host List からランタイムおよびインフラストラクチャーメトリクスを表示します。" style="width:100%;" >}}

### ログ {#logs}

アプリケーションおよびシステムの運用を監視し、トラブルシューティングを行うにはログを確認します。

{{< img src="/opentelemetry/embedded_collector/logs.png" alt="Log Explorer からログを表示します。" style="width:100%;" >}}

### トレース {#traces}

アプリケーションが処理したリクエストの状態とパフォーマンスを把握するため、トレースとスパンを表示し、同じトレース内でインフラストラクチャーメトリクスを関連付けます。

{{< img src="/opentelemetry/embedded_collector/traces.png" alt="Trace Explorer からトレースを表示します。" style="width:100%;" >}}

### ランタイムメトリクス {#runtime-metrics}

アプリケーションのランタイム (JVM) メトリクスを監視します。

{{< img src="/opentelemetry/embedded_collector/metrics.png" alt="JVM Metrics dashboard から JVM メトリクスを表示します。" style="width:100%;" >}}

### コレクターのヘルスメトリクス {#collector-health-metrics}

DDOT Collector からメトリクスを表示し、Collector のヘルスを監視します。

{{< img src="/opentelemetry/embedded_collector/dashboard.png" alt="OTel dashboard からコレクターのヘルスメトリクスを表示します。" style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: /ja/agent/configuration/agent-commands/#agent-status-and-information
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver
[7]: /ja/opentelemetry/instrument/api_support
[8]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[9]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/java/com/otel/service/CalendarService.java#L27-L48
[10]: /ja/opentelemetry/correlate/
[11]: /ja/opentelemetry/integrations/collector_health_metrics/
[12]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example
[13]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/run-otel-local.sh
[14]: /ja/agent/supported_platforms/windows/