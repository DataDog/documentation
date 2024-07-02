---
title: SLO Widget
widget_type: slo
description: "Track your SLOs"
aliases:
 - /monitors/monitor_uptime_widget/
 - /monitors/slo_widget/
 - /graphing/widgets/slo/
 - /dashboards/faq/how-can-i-graph-host-uptime-percentage/
further_reading:
- link: "https://www.datadoghq.com/blog/slo-monitoring-tracking/"
  tag: Blog
  text: Track the status of all your SLOs in Datadog
- link: /dashboards/guide/slo_graph_query
  tag: Documentation
  text: Scope metric-based SLO queries
---

SLOs (service-level objectives) are an agreed-upon target that must be achieved for each activity, function, and process to provide the best opportunity for customer success. SLOs represent the performance or health of a service. The SLO widget visualizes the status, budget, and remaining error budget of the existing SLOs. It displays all underlying groups of the SLO and lets you sort the groups by any of the time windows in the widget. Use this widget to build out meaningful dashboards with the most critical SLO information:
- **View all of the SLO groups directly in the widget**: This is helpful for SLOs containing a lot of groups, as the widget provides key information related to SLO groups.
- **Set your preferred sorting order for the SLO groups in the widget**: For all SLO types, sort groups based on any of the available time windows in the widget. Quickly identify the best and worst performing SLO groups for different time periods.
- **Easily identify time periods with missing data in an SLO**: For all SLO types, the SLO widget shows time periods with missing data as "-". The "-" is displayed for any time window where the entire window is missing data.

## セットアップ

Use the SLO widget to visualize a [Service Level Objective (SLO)][1] on a dashboard.

{{< img src="/dashboards/widgets/slo/slo-summary-widget-new.png" alt="metric-based slo summary widget graph editor " >}}

### 構成

1. Select an SLO from the dropdown menu. 
2. **For metric-based and Time Slice SLOs**: You can filter your query with tags and leverage [template variables][2] to dynamically scope your results:
    - Take advantage of template variables by using the *filter by* field to scope the SLO statuses the widget displays. For example, `filter by $env` scopes your SLO query to whatever value you choose in the dashboard for the *env* template variable.
    - タグが元の SLO 構成に含まれていない場合でも、SLO メトリクスクエリに追加のスコープとコンテキストを追加します。例えば、元の SLO クエリが `sum:trace.flask.request.hits{*} by {resource_name}.as_count()` で、ウィジェットで `env:prod` でフィルターした場合、データは `prod` 環境からのもののみにスコープされます。
3. Set up to three different time windows.
4. Select your display preferences.

### オプション

#### Set the time windows

Select up to three different time windows from the following:
- **Rolling time windows**: 7, 30, or 90 days
- **Calendar time windows**: week to date, previous week, month to date, or previous month
- **Global time**: This option allows you to display your SLO's status and error budget over arbitrary time periods. You can view up to 3 months of historical info for monitor-based SLOs. For Time Slice and metric-based SLOs, the supported historical view matches your account's metrics retention duration (by default, this is 15 months).

**Note:** To display an error budget and color-code your `Global time` SLO status value as green or red, you need to specify an SLO target. If the SLO input target is not specified, only the SLO status is shown, and the font color remains gray.

#### 表示設定

Select whether to show or hide remaining error budget by toggling the `Show error budget` option. 

If you are visualizing an SLO with multiple groups or a monitor-based SLO with multiple monitors, select your `View mode`:

- For SLOs with groups (metric-based or Time Slice SLO with groups, or monitor-based SLOs with a single monitor broken into groups), there are the following three view modes:
  - `Overall`: 全体の SLO ステータスのパーセンテージとターゲットを表示します
  - `Groups`: 各グループのステータス割合を表形式で表示します
  - `Both`: 総合 SLO ステータスの割合と目標、各グループのステータス割合表の両方を表示します

- 複数モニターでモニターベースの SLO を構成している場合は、以下の 3 つのビューモードが利用可能です。
  - `Overall`: 全体の SLO ステータスのパーセンテージとターゲットを表示します
  - `Monitors`: 各モニターのステータス割合を表形式で表示します
  - `Both`: 総合 SLO ステータスの割合と目標、各モニターのステータス割合表の両方を表示します

When you set the `View mode` to `Groups`, `Monitors`, or `Both`:
- The groups are sorted by ascending status in the smallest time window by default. After adding the widget to a dashboard, you have the ability to sort by status for any of the configured time windows through the widget UI.
- The widget displays the following:
  + For metric-based and Time Slice SLOs, *all* underlying groups of the SLO are displayed. 
  + For monitor-based SLOs with multiple monitors, all underlying monitors in the SLO are displayed. 
  + For single monitor-based SLOs with groups, up to 20 groups are displayed if specific groups have been selected in the SLO. If no specific groups have been selected for the SLO, then *all* underlying groups of the SLO are displayed.

**Note:** For monitor-based SLOs with groups, all groups can be displayed for any SLOs containing up to 5,000 groups. For SLOs containing more than 5,000 groups, the SLO is calculated based on all groups but no groups are displayed in the UI.

## API

このウィジェットは **[Dashboards API][3]** で使用できます。[ウィジェット JSON スキーマ定義][4]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/service_level_objectives/
[2]: /dashboards/template_variables/
[3]: /api/latest/dashboards/
[4]: /dashboards/graphing_json/widget_json/
