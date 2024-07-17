---
aliases:
- /ja/tracing/trace_search_and_analytics/request_flow_map
description: トレース検索と分析
further_reading:
- link: https://www.datadoghq.com/blog/apm-request-flow-map-datadog
  tag: ブログ
  text: リクエストフローマップについて
title: リクエストフローマップ
---

{{< img src="tracing/live_search_and_analytics/request_flow_map/Overview.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="リクエストフローマップ" >}}

_リクエストフローマップ_は、Datadog APM の 2 つの重要な機能である[サービスマップ][1]と[ライブ探索][2]を組み合わせて、スタック内のリクエストパスを理解し、追跡するのに役立ちます。ノイズの多いサービスやチョークポイント、特定のエンドポイントへのリクエストで発生するデータベースコールの数などをすばやく特定することができます。

これらのフローマップを使用するために追加のコンフィギュレーションは不要で、フローマップはお客様の[取り込まれたスパン][3]から供給されます。ライブ (最後の 15 分) のトレースを任意のタグの組み合わせでスコープし、各サービス間のリクエストの流れを表すダイナミックなマップを生成します。マップは検索条件に基づいて自動的に生成され、変更があった場合はライブで再生成されます。

## リクエストフローマップの操作

- 2 つのサービスをつなぐエッジにカーソルを合わせると、クエリパラメータにマッチした 2 つのサービス間のリクエスト、エラー、レイテンシーのメトリクスが表示されます。

- 最もスループットの高い接続がハイライトされ、最も一般的なパスを示します。

- **Export** をクリックすると、現在のリクエストフローマップの PNG 画像が保存されます。これは、ライブのアーキテクチャーダイアグラムや、特定のユーザーフローに特化した図を作成するのに最適です。

{{< img src="tracing/live_search_and_analytics/request_flow_map/ServicePanel.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="フローマップのサイドパネルにサービス情報が表示される" >}}

- マップ上の任意のサービスをクリックすると、そのサービスの全体的な健全性とパフォーマンス情報 (スループット、レイテンシー、エラーレート、モニターの状態)、およびインフラストラクチャーとランタイムメトリクスが表示されます。

- マップは存在するサービスの数に基づいて自動で適切なレイアウトを選択します。**Cluster** または **Flow** をクリックすると、2 種類のレイアウトが表示されます。

- [RUM とトレースの接続][4]を行った場合、RUM アプリケーションがリクエストフローマップに表示されます。

{{< img src="tracing/live_search_and_analytics/request_flow_map/RUMService.mp4" alt="フローマップからの RUM サービスリンク" video=true style="width:100%;">}}

アプリ内のリクエストフローマップ][5]を試してみましょう。まず始めに、単一のサービスやエンドポイントなどの簡単なクエリを作成します。

### 例

リクエストフローマップを使って、アプリケーションの動作を検証します。

- 特定の HTTP リクエストに対応する[リソース][6]を検索します。

- [シャドウデプロイ][7]やカスタムスパンタグとして設定された機能フラグを使用している場合、マップを使用してリクエスト間のレイテンシーを比較することができます。これは、潜在的なコード変更がデプロイされたバージョンのレイテンシーにどのような影響を与えるかを観察する際に役立つ、実稼働前の[デプロイメント追跡][9]を補完する機能です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/services/services_map/
[2]: /ja/tracing/trace_explorer/
[3]: /ja/tracing/trace_pipeline/ingestion_controls
[4]: /ja/real_user_monitoring/platform/connect_rum_and_traces?tab=browserrum
[5]: https://app.datadoghq.com/apm/flow-map
[6]: /ja/tracing/glossary/#resources
[7]: /ja/tracing/services/deployment_tracking/#shadow-deploys
[9]: /ja/tracing/services/deployment_tracking/