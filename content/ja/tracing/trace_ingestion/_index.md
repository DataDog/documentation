---
title: トレースの取り込み
kind: documentation
aliases:
  - /ja/tracing/ingestion/
  - /ja/tracing/trace_retention_and_ingestion/
description: スパンの取り込みをコントロールする方法を学ぶ
further_reading:
  - link: /tracing/trace_retention/
    tag: ドキュメント
    text: トレースの保持
  - link: /tracing/trace_retention/usage_metrics/
    tag: ドキュメント
    text: 使用量メトリクス
---
{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースジャーニー: 取り込み" >}}

APM を使用することで、Datadog へのトレースの取り込みは完全にカスタマイズ可能です。

## 取り込みのメカニズム

トレースを設定し、きめ細かい[取り込み構成][1]でアプリケーションをエンドツーエンドで可視化することができます。アプリケーションの停止やサービスの応答性低下などのパフォーマンスの問題を見逃さないために、すべてのエラーと高レイテンシーのトレースを含む完全なトレースを取得することができます。

{{< img src="tracing/trace_indexing_and_ingestion/service_setup.png" style="width:80%;" alt="サービスセットアップ" >}}


## Ingestion controls

[Ingestion Control ページ][2]では、サービス全体の取り込み量と構成設定の概要を確認できます。

{{< img src="tracing/trace_indexing_and_ingestion/IngestionControls.png" style="width:80%;" alt="保持フィルター" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_ingestion/mechanisms
[2]: /ja/tracing/trace_ingestion/ingestion_controls