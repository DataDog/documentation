---
title: APM モニター
kind: documentation
description: APM メトリクスをユーザー定義しきい値と比較する
aliases:
  - /ja/monitors/monitor_types/app_analytics
  - /ja/monitors/monitor_types/trace_search
further_reading:
  - link: /monitors/notifications/
    tag: Documentation
    text: モニター通知の設定
  - link: /monitors/downtimes/
    tag: Documentation
    text: モニターをミュートするダウンタイムのスケジュール
  - link: /monitors/monitor_status/
    tag: Documentation
    text: モニターステータスを確認
---
## 概要

APM メトリクスモニターは、通常の[メトリクスモニター][1]と同様に機能しますが、APM 専用に作られたコントロールを備えています。このモニターを使用して、サービスレベルのヒット数、エラー数、そしてさまざまなレイテンシー測定値についてアラートを受信します。

Analytics モニターを使用すると、APM データを経時的に視覚化し、Indexed Span に基づきアラート設定を行えます。たとえば、Analytics モニターを使用して、リクエストの遅延急増に関するアラートを受信できます。

## モニターの作成

Datadog で [APM モニター][2]を作成するには、メインナビゲーションで *Monitors --> New Monitor --> APM* の順に進みます。

**APM Metrics** または **Analytics** モニターのいずれかを選択します。

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

[1]: /ja/tracing/guide/setting_primary_tags_to_scope/#environment
[2]: /ja/tracing/visualization/service/
[3]: /ja/tracing/visualization/resource/
{{% /tab %}}
{{% tab "Analytics" %}}

### 検索クエリを定義する

* [トレース検索][1]と同じロジックを使用して検索クエリを構築します。
* トレース数、[ファセット][2]、または[計測][3]のモニタリングを選択します。
    * **Monitor over a trace count**: 検索バーを使用し（任意）、ファセットまたはメジャーを選択**しません**。選択されたタイムフレームで Datadog がログ数を評価し、それをしきい値の条件と比較します。
    * **Monitor over a facet or measure**: ファセットが選択されている場合、モニターはファセットの `Unique value count` でアラートを作成します。計測が選択されている場合は、メトリクスモニターと同様、集計を選択する必要があります（`min`、`avg`、`sum`、`median`、`pc75`、`pc90`、 `pc95`、`pc98`、`pc99`、または `max`）。

**注:** Analytics モニターは [Indexed Span][4] ベースでのみ作成できます。

### アラート条件を選択

* メトリクスが `above` または `above or equal to` の場合にトリガー
* 過去 `5 minutes`、`15 minutes`、`1 hour` などの間のしきい値、または `custom` に 5 分～48 時間の値を設定します。
* アラートのしきい値: `<数値>`
* 警告のしきい値: `<数値>`

[1]: /ja/tracing/trace_search_and_analytics/query_syntax/#search-bar
[2]: /ja/tracing/trace_search_and_analytics/query_syntax/#facet-search
[3]: /ja/tracing/trace_search_and_analytics/query_syntax/#numerical-values
[4]: /ja/tracing/visualization/#indexed-span
{{% /tab %}}
{{< /tabs >}}

### 通知

**Say what's happening** と **Notify your team** のセクションに関する詳しい説明は、[通知][3]のページを参照してください。

**注**: サービスレベルモニターについては[サービスページ][4]および[サービスマップ][5]で、リソースレベルモニターについては個々のリソースページで確認できます（[サービスページ][4]に記載されているリソースをクリックすると、特定のアクセスできます）。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/monitor_types/metric/
[2]: https://app.datadoghq.com/monitors#create/apm
[3]: /ja/monitors/notifications/
[4]: https://app.datadoghq.com/apm/services
[5]: https://app.datadoghq.com/apm/map