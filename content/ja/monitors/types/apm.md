---
title: APM Monitor
description: "Compare an APM metric to a user defined threshold"
aliases:
  - /monitors/monitor_types/app_analytics
  - /monitors/monitor_types/trace_search
  - /tracing/guide/resource_monitor/
  - /monitors/monitor_types/apm
  - /monitors/create/types/apm/
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: Documentation
  text: Schedule a downtime to mute a monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Check your monitor status
---

## 概要

APM メトリクスモニターは、通常の[メトリクスモニター][1]と同様に機能しますが、APM 専用に作られたコントロールを備えています。このモニターを使用して、サービスレベルのヒット数、エラー数、そしてさまざまなレイテンシー測定値についてアラートを受信します。

Analytics モニターを使用すると、APM データを経時的に視覚化し、Indexed Span に基づきアラート設定を行えます。たとえば、Analytics モニターを使用して、リクエストの遅延急増に関するアラートを受信できます。

## モニターの作成

Datadog で [APM モニター][2]を作成するには、メインナビゲーションで *Monitors --> New Monitor --> APM* の順に進みます。

**APM Metrics** または **Trace Analytics** モニターのいずれかを選択します。

{{< tabs >}}
{{% tab "APM Metrics" %}}

### モニタースコープを選択

ドロップダウンメニューで[プライマリタグ][1]、[サービス][2]、[リソース][3]を選択します。

### アラートの条件を設定する

**しきい値**または**異常検知**アラートを選択します。

#### しきい値アラート

メトリクスがしきい値を超えるとアラートがトリガーされます。

* `Requests per second`、`Errors per second`、`Apdex`、`Error rate`、`Avg latency`、`p50 latency`、`p75 latency`、`p90 latency`、または `p99 latency` 
* が `above`、`above or equal to`、`below`、または `below or equal to` の時にアラートを作成
* アラートのしきい値 `<数値>`
* 警告のしきい値 `<数値>`
* 過去 `5 minutes`、`15 minutes`、`1 hour` など、または `custom` に 1 分～48 時間の値を設定します。

#### 異常検知アラート

メトリクスが予想されるパターンから逸脱するとアラートがトリガーされます。

* `Requests per second`、`Errors per second`、`Apdex`、`Error rate`、`Avg latency`, `p50 latency`、  `p75 latency`、 `p90 latency`、または `p99 latency` の場合
* `<ALERT_THRESHOLD>`%, `<WARNING_THRESHOLD>`% の時にアラート
* 値が`<数値>`偏差、`above or below`、`above`、または`below`
* 過去 `5 minutes`、`15 minutes`、`1 hour` などの間の予測、または `custom` に 1 分～48 時間の値を設定します。

#### 高度なアラート条件

高度なアラートオプション (データなし、評価遅延など) の詳細な手順については、[モニターコンフィギュレーション][4]ページを参照してください。メトリクス固有のオプションのフルデータウィンドウについては、[メトリクスモニター][5]ページを参照してください。

[1]: /tracing/guide/setting_primary_tags_to_scope/#environment
[2]: /tracing/services/service_page/
[3]: /tracing/services/resource_page/
[4]: /monitors/configuration/#advanced-alert-conditions
[5]: /monitors/types/metric/#data-window
{{% /tab %}}
{{% tab "Trace Analytics" %}}

<div class="alert alert-info"><strong>注</strong>: デフォルトでは、1 アカウントあたり 1000 トレース分析モニターという制限があります。この制限に引っかかっている場合、<a href="/monitors/configuration/?tab=thresholdalert#alert-grouping">マルチアラート</a>の使用を検討するか、<a href="/help/">サポートにお問い合わせ</a>ください。</div>

### 検索クエリを定義する

1. [トレース検索][1]と同じロジックを使用して検索クエリを構築します。
2. トレース数、[ファセット][2]、または[計測][3]のモニタリングを選択します。
    * **Monitor over a trace count**: 検索バーを使用し（任意）、ファセットまたはメジャーを選択**しません**。選択されたタイムフレームで Datadog がログ数を評価し、それをしきい値の条件と比較します。
    * **Monitor over a facet or measure**: ファセットが選択されている場合、モニターはファセットの `Unique value count` でアラートを作成します。計測が選択されている場合は、メトリクスモニターと同様、集計を選択する必要があります（`min`、`avg`、`sum`、`median`、`pc75`、`pc90`、 `pc95`、`pc98`、`pc99`、または `max`）。
3. 複数のディメンションでトレースをグループ化する (オプション):
   クエリに一致するすべてのトレースは、最大 4 つのファセットの値に基づいてグループに集約されます。
4. アラート設定のグループ化方法を構成します（任意）:
    * **シンプルアラート**: すべての報告元ソースを集計します。集計値が設定条件を満たすと、アラートを 1 件受信します。</br>
    クエリに `group by` があり、シンプルアラートモードを選択した場合、1 つまたは複数のグループの値がしきい値に違反すると **1 つ**のアラートが表示されます。この戦略を選択すると、通知ノイズを減らすことができます。
    * **Multi-Alert**: グループパラメーターに従い、複数のアラートを各ソースに適用します。アラートイベントは、設定された条件を満たすと各グループに生成されます。たとえば、クエリを `@resource.name` でグループ化すると、スパンのエラー率が高い場合にリソースごとに個別のアラートを受信することができます。

{{< img src="monitors/monitor_types/apm/define-the-search-query.png" alt="検索クエリの定義" style="width:80%;" >}}

**注:*** Analytics モニターは、[カスタム保持フィルター][6]によって保持されたスパンに基づいてのみ作成できます (インテリジェント保持フィルターではありません)。

### アラート条件を選択

* クエリ結果が `above`、`above or equal to`、`below`、`below or equal to` の場合にトリガーします。
* 過去 `5 minutes`、`15 minutes`、`1 hour` のしきい値、または `custom` に 5 分～48 時間の値を設定します。
* アラートのしきい値: `<数値>`
* 警告のしきい値: `<数値>`

#### データなしと下限のアラート

特定のクエリにマッチするグループがスパンの送信を停止したときに通知を受け取るには、条件を `1` より下に設定します。これは、グループに対して定義された評価期間内にモニタークエリに一致するスパンがない場合に通知されます。

#### 高度なアラート条件

高度なアラートオプション (評価遅延など) の詳細な手順については、[モニターコンフィギュレーション][5]ページを参照してください。

[1]: /tracing/trace_explorer/query_syntax/#search-bar
[2]: /tracing/trace_explorer/query_syntax/#facet-search
[3]: /tracing/trace_explorer/query_syntax/#numerical-values
[4]: /tracing/glossary/#indexed-span
[5]: /monitors/configuration/#advanced-alert-conditions
[6]: /tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
{{% /tab %}}
{{< /tabs >}}

### 通知

For detailed instructions on the **Configure notifications and automations** section, see the [Notifications][3] page.

**Note**: Find service level monitors on the [Service Catalog][4] and on the [Service Map][5], and find resource level monitors on the individual resource pages (you can get there by clicking on the specific resource listed on the a service details page).

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/metric/
[2]: https://app.datadoghq.com/monitors#create/apm
[3]: /monitors/notify/
[4]: https://app.datadoghq.com/services
[5]: https://app.datadoghq.com/apm/map
