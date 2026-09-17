---
description: OpenTelemetry のデータを OpenTelemetry Collector と Datadog Exporter に送信する
further_reading:
- link: /opentelemetry/setup/ddot_collector/install/
  tag: ドキュメント
  text: DDOT Collector をインストールする (推奨)
- link: /opentelemetry/compatibility/
  tag: ドキュメント
  text: 機能の互換性
- link: https://www.datadoghq.com/architecture/opentelemetry-collector-in-kubernetes/
  tag: Architecture Center
  text: Kubernetes における OpenTelemetry Collector
title: OpenTelemetry Collector をインストールおよび構成する
---
## 概要 {#overview}

このページでは、テレメトリデータを Datadog に送信するためのスタンドアロンの OpenTelemetry Collector をインストールおよび構成するためのガイドを提供します。

この方法は、OpenTelemetry オープンソースコミュニティの OTel Collector ディストリビューションの使用を希望するユーザーや、他のセットアップでは利用できない高度な処理機能を必要とするユーザーに最適です。ほとんどのユースケースでは、[Datadog Distribution of OTel Collector (DDOT)][1] を使用する方法が推奨されます。

## セットアップ {#setup}

まず、OpenTelemetry Collector をインストールし、Datadog Exporter を使用して構成します。このガイドでは、より具体的な構成トピックに進む前に必要な初期セットアップについて説明します。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/install" >}}
    <h3>Install and Configure the Collector</h3>
    Follow the initial setup steps to get a Collector running with the Datadog Exporter.
    {{< /nextlink >}}
{{< /whatsnext >}}

## 構成 {#configuration}

Collector が実行されたら、これらのガイドを使用して、テレメトリを収集およびエンリッチするための特定のレシーバーとプロセッサを構成してください。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/deploy" >}}
    <h3>Deploy the Collector</h3>
    Learn how to run the Collector in various environments, including on a host, in Docker, or as a DaemonSet or Gateway in Kubernetes.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/hostname_tagging" >}}
    <h3>Configure Hostname and Tagging</h3>
    Use resource detection and Kubernetes attributes processors to ensure proper hostname resolution and apply critical tags for correlating telemetry in Datadog.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/log_collection" >}}
    <h3>Set up Log Collection</h3>
    Configure the filelog receiver to collect logs from files and forward them to Datadog, enabling unified logs, metrics, and traces.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/otlp_receiver" >}}
    <h3>Enable the OTLP Receiver</h3>
    Configure the OTLP receiver to accept traces, metrics, and logs from your OpenTelemetry-instrumented applications over gRPC or HTTP.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/config/collector_batch_memory" >}}
    <h3>Tune Batch and Memory Settings</h3>
    Optimize your Collector's performance and resource consumption by configuring the batch processor and memory limiter.
    {{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/opentelemetry/setup/ddot_collector/install/