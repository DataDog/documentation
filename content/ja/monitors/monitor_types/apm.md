---
title: APMモニター
kind: documentation
description: APM メトリクスをユーザー定義しきい値と比較する
aliases:
  - /ja/monitors/monitor_types/app_analytics
  - /ja/monitors/monitor_types/trace_search
further_reading:
  - link: monitors/notifications
    tag: Documentation
    text: モニター通知の設定
  - link: monitors/downtimes
    tag: Documentation
    text: モニターをミュートするダウンタイムのスケジュール
  - link: monitors/monitor_status
    tag: Documentation
    text: モニターステータスを確認
---
## 概要

APMメトリクスモニターは、通常の[メトリクスモニター] [1]と同様に機能しますが、APM専用に作られたコントロールを備えています。 これらのモニターを使用して、ヒット、エラー、およびさまざまなレイテンシー測定に関するサービスレベルでアラートを受信します。

App Analyticsモニターを使用すると、APMデータを経時的に視覚化し、Analyzed Spansに基づいてアラート設定を行えます。 たとえば、App Analyticsモニターを使用して、遅いリクエストの急増に関するアラートを受信できます。

## モニターの作成

Datadogで[APMモニター] [2]を作成するには、メインナビゲーションを使用して、*モニター --> 新しいモニター --> APM *の順に進みます。

** APMメトリクス **または** App Analytics **モニターから選択します。

{{< tabs >}}
{{% tab "APM Metrics" %}}

### モニタースコープを選択

ドロップダウンメニューから[プライマリータグ] [1]、[サービス] [2]、および[リソース] [3]を選択します。

### アラートの条件を設定する

**しきい値**または**異常検知**アラートを選択します。

#### 異常検出アラート

メトリクスがしきい値を超えると常にアラートがトリガーされます。

* `Requests per second`、`Errors per second`、`Apdex`、`Error rate`、`Avg latency`、`p50 latency`、 `p75 latency`、`p90 latency`、または`p99 latency`の時にアラート
* は`above`、`above or equal to`、`below`、または`below or equal to`
* アラートのしきい値 `<NUMBER>`
* 警告のしきい値`<NUMBER>`
* 最後の`5 minutes`、`15 minutes`、`1 hour`など以上

#### 異常検知アラート

メトリクスが予想されるパターンから逸脱すると常にアラートがトリガーされます。

* `Requests per second`、`Errors per second`、`Apdex`、`Error rate`、`Avg latency`, `p50 latency`、  `p75 latency`、 `p90 latency`、または`p99 latency`
* `<ALERT_THRESHOLD>`%, `<WARNING_THRESHOLD>`%の時にアラート
* 値が`<NUMBER>`偏差、`above or below`、`above`、または`below`
* 過去`5 minutes`、 `15 minutes`、`1 hour`などの間の予測

[1]: /ja/tracing/guide/setting_primary_tags_to_scope/#environment
[2]: /ja/tracing/visualization/service
[3]: /ja/tracing/visualization/resource
{{% /tab %}}
{{% tab "App Analytics" %}}

### 検索クエリを定義する

* [トレース検索] [1]と同じロジックを使用して検索クエリを構築します。
* トレースカウント、[ファセット] [2]、または[メジャー] [3]でのモニターを選択します。
    * **トレースカウントのモニター**: 検索バーを使用し（任意）、ファセットまたはメジャーを選択**しないで**ください。 Datadogが選択した時間枠でトレース数を評価し、それをしきい値の条件と比較します。
    * **ファセットまたはメジャーのモニター**: ファセットが選択されている場合、モニターはファセットの`Unique value count` でアラートを出します。 メジャーが選択されている場合は、メトリクスモニターと同様、集計を選択する必要があります（ `min`、`avg`、 `sum`、`median`、 `pc75`、`pc90`、 `pc95`、`pc98`、 `pc99`、または`max`）。

### アラート条件を選択

* メトリクスが`above`または`above or equal to`の場合にトリガー
* 最後の `5 minutes`、`15 minutes`、 `1 hour`などの間のしきい値
* アラートのしきい値: `<NUMBER>`
* 警告のしきい値: `<NUMBER>`

[1]: /ja/tracing/app_analytics/search/#search-bar
[2]: /ja/tracing/app_analytics/search/#facet-search
[3]: /ja/tracing/app_analytics/search/#numerical-values
{{% /tab %}}
{{< /tabs >}}

### 通知

**何が起きているのか**および**チームに通知**のセクションの詳細な手順については、[通知] [3]ページを参照してください。

**注**: [サービスページ] [4]および[サービスマップ] [5]でサービスレベルモニターを検索し、個々のリソースページでリソースレベルモニターを検索します（[サービスページ] [4]にリストされている特定のリソースをクリックすると、ここにアクセスできます）。

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/monitor_types/metric
[2]: https://app.datadoghq.com/monitors#create/apm
[3]: /ja/monitors/notifications
[4]: https://app.datadoghq.com/apm/services
[5]: https://app.datadoghq.com/apm/map