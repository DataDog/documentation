---
description: APM データから生成できる有用なメトリクスをご紹介します。
further_reading:
- link: tracing/trace_pipeline/
  tag: ドキュメント
  text: トレースの取り込みをカスタマイズし、重要なトレースを保持します。
- link: tracing/trace_collection/
  tag: ドキュメント
  text: サービスのインスツルメンテーションと Agent でのトレースデータ収集のセットアップ
- link: monitors/
  tag: ドキュメント
  text: モニターを作成し、管理することで、重要なときにチームに通知することができます。
title: APM メトリクス
---

## トレースメトリクス

[トレースアプリケーションメトリクス][1]は、トレース収集を有効にし、アプリケーションをインスツルメントした後に収集されます。これらのメトリクスは、ダッシュボードやモニターで利用することができます。
これらのメトリクスは、**リクエスト**カウント、**エラー**カウント、および**レイテンシー**の測定をキャプチャします。これらは、[トレース取り込みサンプリング][2]の構成に関係なく、アプリケーションのトラフィックの 100% に基づいて計算されます。


取り込まれたスパンとトレースは、15 分間保持されます。保持フィルターが保持するインデックスされたスパンおよびトレースは、Datadog に 15 日間保存されます。しかし、取り込まれたデータからカスタムメトリクスを生成した場合、そのメトリクスは 15 ヶ月間保持されます。

## ランタイムメトリクス

サポートされているトレースライブラリで[ランタイムメトリクス収集][3]を有効にし、アプリケーションのパフォーマンスに関する洞察を得ることができます。


## 次のステップ

{{< whatsnext desc="設定したものを使用する:" >}}
    {{< nextlink href="tracing/guide/apm_dashboard" >}}APM メトリクスを追跡・相関させるダッシュボードの作成{{< /nextlink >}}
    {{< nextlink href="monitors/create/types/apm/" >}}想定外のことが起きたときに警告・通知する APM モニターの作成{{< /nextlink >}}
{{< /whatsnext >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/metrics/metrics_namespace/
[2]: /ja/tracing/trace_pipeline/ingestion_mechanisms
[3]: /ja/tracing/metrics/runtime_metrics/