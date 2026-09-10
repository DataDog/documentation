---
description: Observability Pipelines Worker を使用して Datadog Agent からログ、メトリクス、またはトレースを収集する方法を学びます。
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
  tag: ブログ
  text: Observability Pipelines を使用して、環境内のメトリクス量とタグを管理する
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: メトリクス
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Datadog Agent ソース
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の Datadog Agent ソースを使用して、Datadog Agent からログまたはメトリクスを受信します。

**注記**:
- Datadog Distribution of OpenTelemetry (DDOT) Collector を使用してログまたはメトリクスを収集している場合は、[OpenTelemetry ソースを使用してそのデータを Observability Pipelines に送信する必要があります][4]。
- Datadog Agent は、`ddsource` および `ddtags` でタグ付けされたログとメトリクスを、`source` および `tags` ではなく送信します。これらのイベントのプロセッサークエリまたはフィルターを定義する際は、代わりに `ddsource` および `ddtags` を使用してください。

## 前提条件 {#prerequisites}

{{% observability_pipelines/prerequisites/datadog_agent %}}

## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: Datadog Agent アドレスの識別子と、該当する場合は TLS キーパスのみを入力します。実際の値は<b>入力しない</b>でください。</div>

[パイプラインをセットアップする][1]際に、このソースをセットアップします。パイプラインは、[UI][6]、[API][7]、または [Terraform][8] を使用してセットアップできます。このセクションの手順は、UI でソースをセットアップするためのものです。

パイプライン UI で Datadog Agent ソースを選択した後、Datadog Agent アドレスの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。

{{% observability_pipelines/secrets_env_var_note %}}

### オプションの TLS 設定 {#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

## シークレットのデフォルト{#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- Datadog Agent アドレスの識別子:
    - Observability Pipelines Worker が Datadog Agent からログを受信するためにリッスンするバインドアドレスを参照します。
    - デフォルトの識別子は `SOURCE_DATADOG_AGENT_ADDRESS` です。
- Datadog Agent TLS パスフレーズの識別子 (TLS が有効な場合):
    - デフォルトの識別子は `SOURCE_DATADOG_AGENT_KEY_PASS` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/datadog_agent %}}

{{% /tab %}}
{{< /tabs >}}

## Datadog Agent を Observability Pipelines Worker に接続する {#connect-the-datadog-agent-to-the-observability-pipelines-worker}

{{< tabs >}}
{{% tab "ログ" %}}

Agent 設定ファイルまたは Agent Helm チャートの値ファイルを使用して、Datadog Agent を Observability Pipelines Worker に接続します。

**注**: Agent が Docker コンテナで実行されている場合は、`DD_CONTAINER_EXCLUDE_LOGS`環境変数を使用して Observability Pipelines のログを除外する必要があります。Helm については、`datadog.containerExcludeLogs` を使用します。これにより、ワーカーが独自のログを Datadog に直接送信するため、重複ログが防止されます。詳細については、[Docker ログの収集][1]または[Helm の環境変数を設定する][2]を参照してください。

{{% collapse-content title="Agent 構成ファイル" level="h3" expanded=false id="logs-agent-config-file" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent %}}

{{% /collapse-content %}}

{{% collapse-content title="Agent Helm 値ファイル" level="h3" expanded=false id="logs-agent-helm-values-file" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent_kubernetes %}}

{{% /collapse-content %}}

[1]: /ja/containers/docker/log/?tab=containerinstallation#linux
[2]: /ja/containers/guide/container-discovery-management/?tab=helm#setting-environment-variables

{{% /tab %}}

{{% tab "メトリクス" %}}

Agent 設定ファイルまたは Agent Helm チャートの値ファイルを使用して、Datadog Agent を Observability Pipelines Worker に接続します。

**注**: Agent が Docker コンテナで実行されている場合は、`DD_CONTAINER_EXCLUDE_METRICS`環境変数を使用して、使用率やイベントの入出力などの Observability Pipelines メトリクスを除外する必要があります。Helm については、`datadog.containerExcludeMetrics` を使用します。これにより、Observability Pipelines Worker も独自のメトリクスを Datadog に直接送信するため、重複メトリクスが防止されます。詳細については、[Docker メトリクスの収集][1]または[Helm の環境変数を設定する][2]を参照してください。

{{% collapse-content title="Agent 構成ファイル" level="h3" expanded=false id="metrics-agent-config-file" %}}

Datadog Agent のメトリクスを Observability Pipelines Worker に送信するには、[Agent 構成ファイル][1]を次のように更新します。

```
observability_pipelines_worker:
  metrics:
    enabled: true
    url: "http://<OPW_HOST>:8383"

```

`<OPW_HOST>` は、Observability Pipelines Worker に関連付けられたホスト IP アドレスまたはロードバランサーの URL です。
- CloudFormation インストールの場合は、URL に `LoadBalancerDNS` CloudFormation 出力を使用してください。
- Kubernetes インストールの場合は、Observability Pipelines Worker サービスの内部 DNS レコードを使用できます。たとえば: `http://opw-observability-pipelines-worker.default.svc.cluster.local:<PORT>`。

**注**: Observability Pipelines Worker がポート 8282 でログをリッスンしている場合は、メトリクス用に 8383 など、別のポートを使用する必要があります。

[Agent を再起動][2]すると、オブザーバビリティデータが Observability Pipelines Worker に送信され、パイプラインで処理されてから Datadog に配信されます。

[1]: /ja/agent/configuration/agent-configuration-files/
[2]: /ja/agent/configuration/agent-commands/#restart-the-agent

{{% /collapse-content %}}

{{% collapse-content title="Agent Helm 値ファイル" level="h3" expanded=false id="metrics-agent-helm-values-file" %}}

Datadog Agent のメトリクスを Observability Pipelines Worker に送信するには、Datadog Helm チャート [datadog-values.yaml][1] を以下の環境変数で更新します。詳細については、[Agent 環境変数][2]を参照してください。

```
datadog:
  env:
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_ENABLED
      value: true
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_URL
      value: "http://<OPW_HOST>:8383"
```

`<OPW_HOST>` は、Observability Pipelines Worker に関連付けられたホスト IP アドレスまたはロードバランサーの URL です。

 Kubernetes インストールの場合は、Observability Pipelines Worker サービスの内部 DNS レコードを使用できます。たとえば: `http://opw-observability-pipelines-worker.default.svc.cluster.local:<PORT>`。

**注**: Observability Pipelines Worker がポート 8282 でログをリッスンしている場合は、メトリクス用に 8383 など、別のポートを使用する必要があります。

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[2]: https://docs.datadoghq.com/ja/agent/guide/environment-variables/

{{% /collapse-content %}}

[1]: /ja/containers/docker/data_collected/
[2]: /ja/containers/guide/container-discovery-management/?tab=helm#setting-environment-variables

{{% /tab %}}
{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/configuration/set_up_pipelines/
[4]: /ja/observability_pipelines/sources/opentelemetry/#send-data-from-the-datadog-distribution-of-opentelemetry-collector-to-observability-pipelines
[5]: /ja/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
[6]: https://app.datadoghq.com/observability-pipelines
[7]: /ja/api/latest/observability-pipelines/
[8]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline