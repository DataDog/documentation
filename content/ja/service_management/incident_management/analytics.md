---
aliases:
- /ja/monitors/incident_management/analytics
description: ダッシュボードとノートブックで、インシデント管理の集計された統計情報を追跡・分析
title: インシデント管理分析
---

## 概要

{{< img src="service_management/incidents/incident_analytics.mp4" alt="Incident Management Analytics" video=true style="width:80%;">}}

Incident Management Analytics は、インシデントの統計情報を集計したクエリ可能なデータソースです。[ダッシュボード][1]と[ノートブック][2]の両方で、さまざまなグラフウィジェットでこれらの分析結果をクエリし、インシデント対応の履歴を時系列で分析することができます。Datadog では、インシデント管理の概要を示す [Dashboard テンプレート][3]と [Notebook テンプレート][4]を提供しており、必要に応じて複製してカスタマイズすることができます。

以下のウィジェットは、Incident Management Analytics をサポートしています。

* Timeseries
* トップリスト
* クエリ値

### メジャー

Datadog は、分析クエリを形成するために、以下のすぐに使える集計メジャーを提供します。

1. カウント (*)
2. 顧客への影響期間
3. ステータスアクティブ期間 (インシデントが `Active` ステータスであった時間)
4. ステータス安定期間 (インシデントが `Stable` ステータスであった時間)
5. 修復までの時間 (顧客影響終了タイムスタンプ - インシデント作成タイムスタンプ)
6. 解決までの時間 (解決されたタイムスタンプ - 作成されたタイムスタンプ)

これらのデフォルトに加えて、[インシデント設定][7]でカスタムの *Number* プロパティフィールドを追加することで、新しいメジャーを作成することができます。

### グラフコンフィギュレーション

Incident Management Analytics のデータを使用してグラフを構成するには、次の手順に従います。

1. [視覚化に使用するウィジェットを選択します][5]。
2. データソースのドロップダウンメニューから `Incidents` を選択します。
3. 黄色のドロップダウンメニューからメジャーを選択します。
     - **Default Statistic:** インシデントの数を数えます。
4. メジャーの集計を選択します。
5. (オプション) メジャーのロールアップを選択します。
6. (オプション) 検索バーを使用して、インシデントの特定のサブセットに統計をフィルタリングします。
7. (オプション) ピンクのドロップダウンメニューでファセットを選択してメジャーをグループごとに分割し、表示するグループの数を制限します。
8. [グラフのタイトルを決めます][6]。
9. ウィジェットを保存します。

**例:** サービスごとの毎週の停止の顧客への影響期間

1. ウィジェット: 時系列折れ線グラフ
2. データソース: `Incidents`
3. メジャー: `Customer Impact Duration`
4. 集計: `avg`
5. ロールアップ: `1w`
6. フィルター: `severity:("SEV-1" OR "SEV-2")`
7. グループ: `Services`, limit to top 5

{{< img src="service_management/incidents/incident_analytics_query_example.jpeg" alt="インシデント分析のクエリ例" style="width:80%;">}}

[1]: /ja/dashboards/
[2]: /ja/notebooks/
[3]: https://app.datadoghq.com/dash/integration/30523/incident-management-overview?from_ts=1632093826308&to_ts=1634685826308&live=true
[4]: https://app.datadoghq.com/notebook/template/11/incident-management-overview
[5]: /ja/dashboards/querying/#select-your-visualization
[6]: /ja/dashboards/querying/#create-a-title
[7]: /ja/service_management/incident_management/incident_settings#property-fields