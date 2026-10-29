---
description: データレイクを Datadog に接続し、Iceberg テーブルのメタデータ、鮮度、品質を監視します。
further_reading:
- link: /data_observability/
  tag: ドキュメント
  text: Data Observability の概要
- link: https://www.datadoghq.com/architecture/monitoring-insurance-data-lakes-on-aws-using-datadog/
  tag: Architecture Center
  text: Datadog を使用した AWS 上の保険データレイクのモニタリング
title: データレイク Integrations
---
## 概要 {#overview}

Datadog Data Observability は、データレイクカタログに接続して Iceberg テーブルの健全性を監視します。接続すると、Datadog はスキーマ、鮮度、行数、テーブルサイズなどのテーブルメタデータを同期します。

これらのインテグレーションを使用して、以下を行います。
- **Iceberg テーブルのメタデータを同期**し、Datadog をデータレイクの構造と同期した状態に保つ
- **データの鮮度を監視**し、データが古い、または遅延していることを検出する
- **テーブルメトリクスを追跡**し、行数やテーブルサイズなどの経時変化を把握する

{{< whatsnext desc="次のデータレイクカタログに接続します。" >}}
   {{< nextlink href="data_observability/quality_monitoring/data_lakes/aws_glue" >}}Iceberg テーブル (AWS Glue){{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}