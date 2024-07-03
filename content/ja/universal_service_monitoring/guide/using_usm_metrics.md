---
description: Learn how to create monitors, SLOs, and dashboards using your USM metrics.
further_reading:
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: Blog
  text: Automatically discover, map, and monitor all your services in seconds with
    Universal Service Monitoring
- link: /universal_service_monitoring
  tag: Documentation
  text: Learn about Universal Service Monitoring
- link: /tracing/metrics
  tag: Documentation
  text: Learn about APM Metrics
title: Using USM Metrics in Monitors, SLOs, and Dashboards
---

## 概要

[ユニバーサルサービスモニタリング][1]は、一般的なコンテナタグ (`app`、`short_image`、`kube_deployment` など) を使用してサービスを検出し、それらのサービスの[サービスカタログ][2]にエントリーを生成します。

You can access request, error, and duration metrics in Datadog for both inbound and outbound traffic on all services discovered with Universal Service Monitoring. These service health metrics are useful for creating alerts, [tracking deployments][3], and getting started with [service level objectives (SLOs)][4] so you can get broad visibility into all services running on your infrastructure. 

{{< img src="universal_service_monitoring/guide/usm_slo.png" alt="BITSBOUTIQUE のユニバーサルサービスモニタリング SLO" style="width:100%;" >}}

このガイドでは、`universal.http.*` などの USM メトリクスを検索して、モニター、SLO、ダッシュボードで使用する方法について説明します。

## USM メトリクスと APM メトリクスの比較

| メトリクス名                 | 単位   | タイプ         | 説明                                       |
|-----------------------------|---------|--------------|---------------------------------------------------|
| universal.http.client       | 秒 | Distribution | アウトバウンドリクエストのレイテンシー、カウント、エラー、およびレート。                |
| universal.http.client.hits  | Hits    | カウント        | アウトバウンドリクエストとエラーの合計数。                |
| universal.http.client.apdex | スコア   | Gauge        | このサービスのアウトバウンドリクエストの Apdex スコア。                |
| universal.http.server       | 秒 | Distribution | インバウンドリクエストのレイテンシー、カウント、エラー、およびレート。  |
| universal.http.server.hits  | Hits    | カウント        | インバウンドリクエストとエラーの合計数。                 |
| universal.http.server.apdex | スコア   | Gauge        | この Web サービスの Apdex スコア。             |

APM メトリクスとは異なり、エラーは別のメトリクスとしてではなく、`error:true` タグの下で利用可能です。

**Note:** The `.hits` metrics have all of your infrastructure tags and are the recommended way to query request and error counts. You can also add [second primary tags][5] to all USM metrics.

### メトリクス構文

The USM metric query syntax differs from the [APM metric query syntax][6], which uses `trace.*`. USM Metrics fall under a single distribution metric name. 

例:

| APM                                             | USM                                                  |
|-------------------------------------------------|------------------------------------------------------|
| trace.universal.http.client.hits{*}             | count:universal.http.client{*}                       |
| trace.universal.http.client.errors              | count:universal.http.client{error:true}              |
| trace.universal.http.client.hits.by_http_status | count:universal.http.client{*} by http_status_family |
| pXX:trace.universal.http.client{*}              | pXX:universal.http.client{*}                         |
| trace.universal.http.client.apdex{*}            | universal.http.client.apdex{*}                       |

The same translations apply for the `universal.http.server` operation that captures inbound traffic. For more information about distribution metrics, see [DDSketch-based Metrics in APM][7].

## 使用方法

Navigate to [**Infrastructure > Universal Service Monitoring**][8], filter by Universal Service Monitoring telemetry type, and click on a service. The **Performance** tab displays service-level graphs on hits, latency, requests, errors, and more. You can also access these metrics when creating a [monitor](#create-a-monitor) or an [SLO](#create-an-slo), or by looking at a [dashboard](#access-a-defined-dashboard) in the [Service Catalog][2].

### モニターを作成

You can create an [**APM Monitor**][9] to trigger an alert when a USM metric such as `universal.http.client` either crosses a threshold or deviates from an expected pattern.

1. Navigate to [**Monitors > New Monitor**][10] and click [**APM**][9].
2. Select **APM Metrics** and define a service or resource's `env` and any other [primary tags][11]. Select a service or resource to monitor and define time interval for the monitor to evaluate the query over. 
3. **Threshold Alert** を選択し、トリガーするモニターのために `Requests per Second` のような USM メトリクスを選択します。次に、アラートと警告のしきい値を**上**または**下**にするかどうかを定義します。アラートしきい値、およびオプションで警告しきい値に値を入力します。
4. 通知セクションには、このモニター用にあらかじめ入力されたメッセージが含まれています。アラート名とメッセージをカスタマイズし、このモニターの権限を定義します。
5. **Create** をクリックします。

{{< img src="universal_service_monitoring/guide/usm_monitor.png" alt="BITSBOUTIQUE のユニバーサルサービスモニタリングモニター" style="width:100%;" >}}

For more information, see the [APM Monitor documentation][12].

### SLO を作成する

You can create an [**SLO**][13] on a per-service basis to ensure you are meeting objectives set by USM metrics and improving availability over time. Datadog recommends [creating an SLO programmatically][14] to cover a lot of services. 

サービスカタログから SLO を作成するには

1. Navigate to the **Reliability** tab of the [Service Catalog][8].
2. **SLOs** 列で、サービスにカーソルを合わせ、**+ Create Availability SLO** または **+ Create Latency SLO** をクリックします。

{{< img src="universal_service_monitoring/guide/service_catalog_slo_setup.png" alt="BITSBOUTIQUE のユニバーサルサービスモニタリング SLO を設定する" style="width:100%;" >}}

オプションで、USM メトリクスを使用して SLO を手動で作成するには

1. Navigate to [**Service Management > SLOs**][15] and click [**New SLO**][13].
2. **Metric Based** を選択し、**Good events (numerator)** セクションで 2 つのクエリを作成します。

   * クエリ A: `universal.http.server` のような USM メトリクスを入力し、`from` フィールドにプライマリ `service` と `env` タグを追加して特定のサービスにフィルターし、`as` フィールドで `count` を選択します。
   * クエリ B: `universal.http.server` のような USM メトリクスを入力し、`from` フィールドに `error:true` タグに加えて、プライマリ `service` と `env` タグを追加して特定のサービスにフィルターし、`as` フィールドで `count` を選択します。

3. **+ Add Formula** をクリックし、`a-b` と入力します。
4. **Total events (denominator)** セクションでは、`universal.http.server` のような USM メトリクスを入力し、`from` フィールドにプライマリ `service` と `env` タグを追加して特定のサービスにフィルターし、`as` フィールドで `count` を選択します。
5. **+ New Target** をクリックすると、以下の設定でターゲットしきい値が作成されます。

   * タイムウィンドウは `7 Days`、ターゲットしきい値は `95%`、警告しきい値は `99.5%` です。Datadog では、すべてのタイムウィンドウで同じターゲットしきい値を設定することを推奨しています。

6. この SLO の名前と説明を入力します。`team` タグに加えて、プライマリ `env` と `service` タグを設定します。
7. **Save and Set Alert** をクリックします。

{{< img src="universal_service_monitoring/guide/usm_slo_setup.png" alt="BITSBOUTIQUE のユニバーサルサービスモニタリング SLO を設定する" style="width:100%;" >}}

For more information, see the [Service Level Objectives documentation][17].

### 定義されたダッシュボードにアクセスする

[サービスカタログ][2]では、サービス定義ファイルに定義されたダッシュボードを識別し、**Dashboards** タブに一覧表示します。**Manage Dashboards** をクリックすると、GitHub で直接サービス定義にアクセスし編集することができます。

{{< img src="universal_service_monitoring/guide/manage_dashboards.png" alt="サービスカタログのサービスの Dashboards タブにある Manage Dashboards ボタン" style="width:90%;" >}}

For more information, see the [Dashboards documentation][16].

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/universal_service_monitoring
[2]: /ja/tracing/service_catalog
[3]: /ja/tracing/services/deployment_tracking/
[4]: /ja/service_management/service_level_objectives
[5]: /ja/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-a-second-primary-tag-in-datadog
[6]: /ja/tracing/metrics/metrics_namespace
[7]: /ja/tracing/guide/ddsketch_trace_metrics/
[8]: https://app.datadoghq.com/services
[9]: https://app.datadoghq.com/monitors/create/apm
[10]: https://app.datadoghq.com/monitors/create
[11]: /ja/metrics/advanced-filtering/
[12]: /ja/monitors/create/types/apm
[13]: https://app.datadoghq.com/slo/new
[14]: /ja/api/latest/service-level-objectives/
[15]: https://app.datadoghq.com/slo/manage
[16]: /ja/dashboards
[17]: /ja/service_management/service_level_objectives/