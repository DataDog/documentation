---
description: USM メトリクスを使ったモニター、SLO、ダッシュボードの作成方法についてご紹介します。
further_reading:
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: ブログ
  text: ユニバーサルサービスモニタリングにより、すべてのサービスを数秒で自動的に検出、マッピング、監視する
- link: /universal_service_monitoring
  tag: Documentation
  text: ユニバーサルサービスモニタリングについて
- link: /tracing/metrics
  tag: Documentation
  text: APM メトリクスについて
title: モニター、SLO、ダッシュボードでの USM メトリクスの活用
---

## 概要

[ユニバーサルサービスモニタリング][1]は、一般的なコンテナタグ (`app`、`short_image`、`kube_deployment` など) を使用してサービスを検出し、それらのサービスの[ソフトウェアカタログ][2]にエントリーを生成します。

Datadog では、ユニバーサルサービスモニタリングで検出されたすべてのサービスのインバウンドとアウトバウンドの両方のトラフィックについて、リクエスト、エラー、およびレイテンシーのメトリクスにアクセスすることができます。これらのサービス健全性メトリクスは、アラートの作成、[デプロイの追跡][3]、[サービスレベル目標 (SLO)][4] の開始などに役立つため、インフラストラクチャー上で実行されているすべてのサービスを幅広く可視化することが可能です。

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

**注:** `.hits` メトリクスは、インフラストラクチャータグをすべて持ち、リクエストとエラーカウントをクエリする推奨方法です。また、すべての USM メトリクスに[第 2 プライマリタグ][5]を追加することができます。

### メトリクス構文

USM メトリクスクエリ構文は、`trace.*` を使用する [APM メトリクスクエリ構文][6]と異なります。USM メトリクスは、1 つのディストリビューションメトリクス名に分類されます。

例:

| APM                                             | USM                                                  |
|-------------------------------------------------|------------------------------------------------------|
| trace.universal.http.client.hits{*}             | count:universal.http.client{*}                       |
| trace.universal.http.client.errors              | count:universal.http.client{error:true}              |
| trace.universal.http.client.hits.by_http_status | count:universal.http.client{*} by http_status_family |
| pXX:trace.universal.http.client{*}              | pXX:universal.http.client{*}                         |
| trace.universal.http.client.apdex{*}            | universal.http.client.apdex{*}                       |

インバウンドトラフィックをキャプチャする `universal.http.server` オペレーションについても同様の変換が適用されます。ディストリビューションメトリクスについては、[APM における DDSketch ベースのメトリクス][7]を参照してください。

## 使用方法

[**Infrastructure > Universal Service Monitoring**][8] に移動し、ユニバーサルサービスモニタリングのテレメトリータイプでフィルターをかけて、サービスをクリックします。**Performance** タブには、ヒット、レイテンシー、リクエスト、エラーなどに関するサービスレベルのグラフが表示されます。これらのメトリクスは、[モニター](#create-a-monitor)または [SLO](#create-an-slo) の作成時、あるいは[ソフトウェアカタログ][2]の[ダッシュボード](#access-a-defined-dashboard)で確認することもできます。

### モニターを作成

`universal.http.client` などの USM メトリクスがしきい値を超えたり、予想されるパターンから外れたりすると、アラートをトリガーする [**APM Monitor**][9] を作成することができます。

1. [**Monitors > New Monitor**][10] の順に移動し、[**APM**][9] をクリックします。
2. **APM Metrics** を選択し、サービスまたはリソースの `env` とその他の[プライマリタグ][11]を定義します。モニターするサービスまたはリソースを選択し、モニターがクエリを評価する時間間隔を定義します。
3. **Threshold Alert** を選択し、トリガーするモニターのために `Requests per Second` のような USM メトリクスを選択します。次に、アラートと警告のしきい値を**上**または**下**にするかどうかを定義します。アラートしきい値、およびオプションで警告しきい値に値を入力します。
4. 通知セクションには、このモニター用にあらかじめ入力されたメッセージが含まれています。アラート名とメッセージをカスタマイズし、このモニターの権限を定義します。
5. **Create** をクリックします。

{{< img src="universal_service_monitoring/guide/usm_monitor.png" alt="BITSBOUTIQUE のユニバーサルサービスモニタリングモニター" style="width:100%;" >}}

詳しくは、[APM モニターのドキュメント][12]を参照してください。

### SLO を作成する

サービスごとに [**SLO**][13] を作成することで、USM メトリクスで設定された目標を達成し、時間の経過とともに可用性が向上していることを確認することができます。Datadog では、多くのサービスをカバーするために、[プログラム的に SLO を作成する][14]ことを推奨しています。

ソフトウェアカタログから SLO を作成するには

1. [ソフトウェアカタログ][8]の **Reliability** タブに移動します。
2. **SLOs** 列で、サービスにカーソルを合わせ、**+ Create Availability SLO** または **+ Create Latency SLO** をクリックします。

{{< img src="universal_service_monitoring/guide/software_catalog_slo_setup.png" alt="BITSBOUTIQUE のユニバーサルサービスモニタリング SLO を設定する" style="width:100%;" >}}

オプションで、USM メトリクスを使用して SLO を手動で作成するには

1. [**Service Management > SLOs**][15] の順に移動し、[**New SLO**][13] をクリックします。
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

詳しくは、[サービスレベル目標のドキュメント][17]をご覧ください。

### 定義されたダッシュボードにアクセスする

[ソフトウェアカタログ][2]では、サービス定義ファイルに定義されたダッシュボードを識別し、**Dashboards** タブに一覧表示します。**Manage Dashboards** をクリックすると、GitHub で直接サービス定義にアクセスし編集することができます。

{{< img src="universal_service_monitoring/guide/manage_dashboards.png" alt="ソフトウェアカタログのサービスの Dashboards タブにある Manage Dashboards ボタン" style="width:90%;" >}}

詳しくは、[ダッシュボードのドキュメント][16]をご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/universal_service_monitoring
[2]: /ja/tracing/software_catalog
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