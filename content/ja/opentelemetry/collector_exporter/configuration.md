---
further_reading:
- link: https://opentelemetry.io/docs/collector/management/
  tag: 外部サイト
  text: OpenTelemetry Collector Management
- link: https://opentelemetry.io/docs/collector/configuration/
  tag: 外部サイト
  text: OpenTelemetry Collector Configuration
title: 構成
---

## OpenTelemetry Collector configuration

To learn more about configuring the Collector, read the [OpenTelemetry Collector Configuration][3] documentation.

## すぐに使える Datadog Exporter の構成

Datadog Exporter のすぐに使える構成の例は、OpenTelemetry Collector Contrib プロジェクトの [`exporter/datadogexporter/examples` フォルダ][5]にあります。完全なコンフィギュレーションファイル例は [`ootb-ec2.yaml`][4] を参照してください。以下の各コンポーネントをニーズに合わせて構成します。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/collector_exporter/otlp_receiver/" >}}OTLP Receiver{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/hostname_tagging/" >}}Hostname and Tags{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/collector_exporter/collector_batch_memory/" >}}Batch and Memory Settings{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://opentelemetry.io/docs/collector/configuration/
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/ootb-ec2.yaml
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/