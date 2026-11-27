---
description: Datadog Agent を使用してアプリケーションから OTLP データを受信するか、Agent と並行して OpenTelemetry
  Collector を実行します。
further_reading:
- link: /opentelemetry/setup/otlp_ingest_in_the_agent
  tag: ドキュメント
  text: Agent の OTLP エンドポイントをセットアップする
- link: /opentelemetry/setup/ddot_collector/install/
  tag: ドキュメント
  text: Agent のコレクターをセットアップする
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: ドキュメント
  text: Agent のコレクターにコンポーネントを追加する
- link: /opentelemetry/migrate/ddot_collector
  tag: ドキュメント
  text: Agent のコレクターに移行する
title: Datadog Agent を介して OpenTelemetry データを送信する
---
## 概要 {#overview}

Datadog Agent を実行している場合、それを介して OpenTelemetry データを送信できます。Agent は必要とする Datadog の機能を追加します。たとえば、[{{< translate key="integration_count" >}}+ Datadog インテグレーション][1]、[Live Container Monitoring][3]、[Cloud Network Monitoring][7]、[Universal Service Monitoring][5] などです。

Agent は以下の 2 つの方法で OpenTelemetry データを処理します。

- **[Agent の OTLP エンドポイント](#otlp-ingest-in-the-agent)**: Agent はアプリケーションから OTLP データを受信します。
- **[Agent のコレクター](#agents-collector)**: OpenTelemetry コレクターが Agent と並行して別のプロセスとして実行されるため、独自のパイプラインを設定できます。

Agent を使用せずに OpenTelemetry データを送信する場合は、[OpenTelemetry データを Datadog に送信する][9]を参照してください。

## Agent の OTLP エンドポイント {#otlp-ingest-in-the-agent}

OpenTelemetry SDK でインスツルメントされたアプリケーションは、OTLP を介して Datadog Agent にテレメトリを送信します。

{{< img src="/opentelemetry/setup/dd-agent-otlp-ingest.png" alt="OpenTelemetry SDK でインスツルメントされたアプリケーションは、OTLP を Datadog Agent に送信し、Datadog Agent がそれを Datadog に送信します。" style="width:100%;" >}}

**最適**: 構成をほとんど行わず、管理するパイプラインもなく、OTLP を Datadog に送信したいチーム。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/otlp_ingest_in_the_agent" >}}Agent の OTLP エンドポイントをセットアップする{{< /nextlink >}}
{{< /whatsnext >}}

## Agent のコレクター {#agents-collector}

Agent のコレクターは、Datadog Agent と並行して別のプロセスとして実行される OpenTelemetry コレクターです。標準の OpenTelemetry コレクター設定を使用して構成します。

Agent なしで実行される DDOT コレクターについては、[DDOT コレクター][10]を参照してください。

{{< callout url="https://www.datadoghq.com/product-preview/remote-configuration-for-datadogs-distribution-of-opentelemetry-collector-ddot/" >}}
Agent のコレクターの Remote Configuration は<strong>プレビュー版</strong>です。このフォームを使用してアクセスをリクエストしてください。
{{< /callout >}}

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Datadog Agent でデプロイされる OpenTelemetry コレクターである Agent のコレクターのアーキテクチャの概要。" style="width:100%;" >}}

**最適**: OpenTelemetry パイプラインを制御したい、または Datadog や他の送信先にも OTLP を送信したいチーム。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/install/" >}}Agent のコレクターをセットアップする{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/custom_components" >}}Agent のコレクターにコンポーネントを追加する{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/migrate/ddot_collector" >}}Agent のコレクターに移行する{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/
[3]: /ja/containers/
[5]: /ja/universal_service_monitoring/
[7]: /ja/network_monitoring/cloud_network_monitoring/
[9]: /ja/opentelemetry/setup/
[10]: /ja/opentelemetry/setup/ddot_collector/