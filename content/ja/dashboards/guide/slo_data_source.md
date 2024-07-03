---
disable_toc: false
title: Graph historical SLO data on Dashboards
---

{{< callout url="#" btn_hidden="true" header="false">}}
  The SLO data source is in public beta. This feature is supported for <strong>Metric-based</strong> and <strong>Time Slice</strong> SLOs.
{{< /callout >}}

## 概要

Graph Metric-based and Time Slice SLOs on dashboards and track trends over 15 months. You can also leverage the [scheduled dashboard reporting][1] functionality to automatically deliver visual reports to key stakeholders. 

## 構成

{{< img src="dashboards/guide/slo_data_type/slo-data-source-good-events.png" alt="Graph editor configuration with the slo data type selected and the good events measure selected" style="width:100%;" >}}

まずは、ダッシュボードのウィジェットトレイから標準的な視覚化タイプの 1 つを選択し、クエリのドロップダウンメニューで *SLOs* をデータソースとして選択します。

For the *Measure* parameter, see the table below for more information on what each measure visualizes. The *Display* parameter allows you to break out the query by the groups that are already configured for the SLO. 

{{< callout url="#" btn_hidden="true" header="Key Information">}}
  When using an SLO data source measures in the Timeseries widget, the value shown at each point is based on the default rollup in the widget, not rolling time period of the SLO. Additionally, SLO status corrections are applied to scalar widgets only, not the timeseries widget. 
{{< /callout >}}

| メジャー | SLO type |  時系列ウィジェット  | スカラーウィジェット |
| -----  | ----- | ----- | ----- |
| 良好イベント | Metric-based | The count of good events. | The sum of good events across all groups. |
| 不良イベント | Metric-based | The count of bad events. | The sum of bad events across all groups. |
| Good minutes | Time Slice | The count of good minutes. | The sum of good minutes across all groups. |
| Bad minutes | Time Slice | The count of bad minutes. | The sum of bad minutes across all groups. |
| SLO ステータス | Metric-based or Time Slice | For each time bucket, the SLO status is calculated as the ratio of the number of good events/minutes to total events/minutes. | The ratio of the number of good events/minutes to total events/minutes. |
| エラーバジェットの残り | Metric-based or Time Slice | For each time bucket, the percentage of error budget remaining. The target for the [primary time window][3] is used in the error budget calculation. | The percentage of error budget remaining at the end of the widget's time frame. |
| バーンレート | Metric-based or Time Slice | For each time bucket, the burn rate shows the observed error rate divided by the ideal error rate. | The burn rate over the widget's time frame. |
| エラーバジェットバーンダウン | Metric-based or Time Slice | The error budget burned over time. It starts at 100% (unless there were bad events/minutes within the first time bucket) and decreases with bad events/minutes. | Error budget burndown is not available in scalar widgets. |



[1]: /ja/dashboards/sharing/scheduled_reports/
[2]: /ja/service_management/service_level_objectives/#slo-status-corrections
[3]: /ja/service_management/service_level_objectives/#configuration