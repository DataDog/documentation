---
further_reading:
- link: opentelemetry/agent/
  tag: ドキュメント
  text: DDOT Collector 付き Datadog Agent
- link: /opentelemetry/setup/ddot_collector/install/
  tag: ドキュメント
  text: DDOT OpenTelemetry Collector 付き Datadog Agent をインストールする
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: ドキュメント
  text: Datadog Agent でカスタム OpenTelemetry コンポーネントを使用する
- link: /opentelemetry/guide/migrate/ddot_collector
  tag: ドキュメント
  text: DDOT OpenTelemetry Collector 付き Datadog Agent に移行する
- link: /opentelemetry/setup/otlp_ingest_in_the_agent
  tag: ドキュメント
  text: OTLP Ingest in the Agent
title: Datadog Agent
---

## 概要

Datadog Agent を使って Datadog にデータを送信することは、Agent ベースの機能を求める既存の Datadog ユーザーやチームにとって優れた選択肢となります。

**主な利点**:
- [{{< translate key="integration_count" >}}個以上の Datadog インテグレーション][1]、[Live Container Monitoring][3]、[Cloud Network Monitoring][7]、[Universal Service Monitoring][5] (eBPF 付き) などにアクセスできます
- OpenTelemetry コミュニティが提供するインテグレーションを活用して、OTLP ネイティブ フォーマットでテレメトリーを収集できます
- 定期的な脆弱性スキャンと分析を含む、Datadog の堅牢なセキュリティ対策の恩恵を受ける
- オンボーディングやトラブルシューティングの支援のために、Datadog のグローバルサポートチームにアクセス

Datadog Agent では、OpenTelemetry データの取り込み方法が 2 つ用意されています。

- **[Datadog Distribution of OpenTelemetry (DDOT) Collector](#datadog-distribution-of-opentelemetry-ddot-collector)**: Datadog Agent に組み込まれた DDOT Collector を使用します。
- **[Agent での OTLP 取り込み](#otlp-ingest-in-the-agent)**: OpenTelemetry Protocol (OTLP) を利用して、テレメトリー データを Datadog Agent に送信します。

## Datadog Distribution of OpenTelemetry (DDOT) Collector

DDOT Collector は、Datadog Agent を組み込みの OpenTelemetry Collector と組み合わせたものです。このオプションは、高度なデータ処理や OTLP データの複数宛先へのエクスポートなど、Collector の機能をフル活用したい Kubernetes ユーザーに最適です。

{{< img src="/opentelemetry/setup/ddot-collector-2.png" alt="Datadog Agent に組み込まれた DDOT Collector のアーキテクチャ概要。" style="width:100%;" >}}

**DDOT Collector を使用するケース**:

- プロセッサーやエクスポーターを含め、OpenTelemetry パイプラインを完全に制御したい場合。
- OTLP データを Datadog だけでなく、複数のバックエンドに転送することを計画している場合。
- Kubernetes Linux 環境で実行している場合。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/agent/" >}}DDOT Collector について{{< /nextlink >}}
{{< /whatsnext >}}

## OTLP Ingest in the Agent

Agent での OTLP 取り込みは、OpenTelemetry SDK でインスツルメントされたアプリケーションから Datadog Agent に直接テレメトリー データを送信する方法です。

{{< img src="/opentelemetry/setup/dd-agent-otlp-ingest.png" alt="Datadog Agent を通じた OpenTelemetry データの流れ" style="width:100%;" >}}

**Agent での OTLP 取り込みを使用するケース**:

- カスタム処理や複数の宛先を必要とせず、すべての OTLP テレメトリー データを Datadog に直接送信することを計画している場合。
- OpenTelemetry パイプラインの管理が不要で、最小限の構成で済むアプローチを希望する場合。
- Windows、ベア メタル EC2、VM 環境、または[その他サポートされているプラットフォーム][8]など、Kubernetes Linux 以外のプラットフォームで実行している場合。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/otlp_ingest_in_the_agent" >}}Agent での OTLP 取り込みについて{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/
[3]: /ja/containers/
[5]: /ja/universal_service_monitoring/
[7]: /ja/network_monitoring/cloud_network_monitoring/
[8]: /ja/agent/basic_agent_usage/?tab=Linux#supported-platforms