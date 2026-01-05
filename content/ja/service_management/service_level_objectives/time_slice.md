---
further_reading:
- link: service_management/service_level_objectives/
  tag: ドキュメント
  text: サービス レベル目標の概要
- link: https://www.datadoghq.com/blog/define-and-manage-slos/
  tag: ブログ
  text: Datadog で SLO を管理するためのベスト プラクティス
title: Time Slice SLO
---

{{< jqmath-vanilla >}}

## 概要

Time Slice SLO を使用すると、独自の稼働時間定義に基づいて信頼性を測定できます。稼働時間はメトリクス タイム シリーズ上の条件として定義します。たとえば、p95 レイテンシーが 1 秒未満である場合を稼働時間と定義することで、レイテンシー SLO を作成できます。

Time Slice SLO はモニター ベース SLO の便利な代替手段です。モニターを介さずに稼働時間 SLO を作成できるため、モニターと SLO の両方を作成・管理する必要がありません。

## Time Slice SLO を作成

Time Slice SLO は、以下のいずれかの方法で作成できます。
- [作成ページから SLO を作成](#create-an-slo-from-the-create-page)
- [既存のモニター ベース SLO をエクスポート](#export-an-existing-monitor-slo)
- [モニターからインポート](#import-from-a-monitor)

### 作成ページから SLO を作成

{{< img src="service_management/service_level_objectives/time_slice/time-slice-creation.png" alt="Time Slice SLO を作成するための設定オプション" style="width:90%;" >}}

1. [**Service Management > SLO**][1] に移動します。
2. **+ New SLO** をクリックして Create SLO ページを開きます。
3. SLO の測定方法として **By Time Slices** を選択します。
4. メトリクス クエリ、比較演算子、しきい値を選択して稼働時間の条件を定義します。例: p95 レイテンシーが 1 秒未満の場合を稼働時間とする。または、[モニターから稼働時間をインポート](#import-from-a-monitor)することも可能です。
5. 稼働時間計算には 1 分または 5 分のタイム スライスを設定します。
6. タイムフレームと目標値を選択します。
7. SLO に名前とタグを付けます。
8. **Create** をクリックします。

### 既存のモニター SLO をエクスポート

<div class="alert alert-info">単一メトリクス モニター ベース SLO のみエクスポートできます。メトリクス以外のモニターや複数モニターに基づく SLO はエクスポートできません。</div>

既存のモニター ベース SLO をエクスポートして Time Slice SLO を作成します。モニター SLO から **Export to Time Slice SLO** をクリックします。

{{< img src="service_management/service_level_objectives/time_slice/monitor-time-slice-export.png" alt="モニター ベース SLO の詳細サイド パネルで、Time Slice へエクスポートするボタンがハイライト表示されている" style="width:90%;" >}}

### モニターからインポート

<div class="alert alert-info">メトリクス モニター SLO のみがインポートのモニター選択に表示されます。</div>

**Create or Edit SLO** ページの **Define your SLI** セクションで **Import from Monitor** をクリックし、ドロップダウンから選択するかモニター セレクターで検索します。

**注**: Time Slice SLO はローリング期間をサポートしていません。ローリング期間はモニター クエリからタイム スライス クエリに引き継がれません。

{{< img src="service_management/service_level_objectives/time_slice/import_from_monitor.png" alt="SLO 設定の Define your SLI セクションで、モニターからインポートするオプションがハイライト表示されている" style="width:90%;" >}}

## 稼働時間の計算

Time Slice SLO の稼働率を計算するために、Datadog はタイム シリーズを同じ長さの間隔 (「スライス」と呼びます) に分割します。インターバルの長さは 1 分または 5 分から設定できます:

{{< img src="service_management/service_level_objectives/time_slice/time-slice-granularity.png" alt="アプリケーション レイテンシーの稼働時間をグループで表示した Time Slice SLO の詳細パネル" style="width:100%;" >}}

空間集約と時間集約はメトリクス クエリによって決定されます。時間集約と空間集約の詳細は[メトリクス][2]ドキュメントを参照してください。

各スライスにはタイム シリーズの単一の値が対応し、`value < 1` などの稼働条件がスライスごとに評価されます。条件を満たすスライスは稼働時間と見なされます:

{{< img src="service_management/service_level_objectives/time_slice/time-slice-good.png" alt="アプリケーション レイテンシーに 1 件の稼働違反があることを示す Time Slice SLO の詳細パネル" style="width:50%;" >}}

満たさない場合はダウンタイムと見なされます:

{{< img src="service_management/service_level_objectives/time_slice/time-slice-bad.png" alt="アプリケーション レイテンシーに 1 件の稼働違反があることを示す Time Slice SLO の詳細パネル" style="width:50%;" >}}

以下の例では、Time Slice SLO が 5 分間隔のタイム スライスで構成されており、タイム シリーズ上で稼働条件に違反するポイントがちょうど 1 つあります。この例での条件は p95 レイテンシーが 2.5 秒以下であることです。表示されている総期間は 12 時間 (720 分) で、稼働時間は 715 分 (720 分の総時間 − 5 分のダウンタイム) とみなされるため、稼働率は 715/720 * 100 = 99.305% となります。

{{< img src="service_management/service_level_objectives/time_slice/uptime_latency.png" alt="アプリケーション レイテンシーに 1 件の稼働違反があることを示す Time Slice SLO の詳細パネル" style="width:100%;" >}}

### グループと全体の稼働率

Time Slice SLO では、メトリクス クエリの「group by」句で定義されたグループごとに稼働率を追跡できます。

グループがある場合、稼働率は各グループごとに個別に計算されます。ただし、全体の稼働率の計算方法は異なります。既存の Monitor SLO の動作と一致させるため、Time Slice SLO では全体の稼働率に同じ定義を採用します。**すべて**のグループが稼働状態である場合にのみ、それを全体の稼働と見なし、**いずれか**のグループがダウンタイムの場合は全体をダウンタイムと見なします。そのため、全体の稼働率は常に各グループの稼働率より低くなります。

{{< img src="service_management/service_level_objectives/time_slice/uptime_latency_groups.png" alt="アプリケーション レイテンシーの稼働時間をグループで表示した Time Slice SLO の詳細パネル" style="width:100%;" >}}

上記の例では、環境 **prod** は 12 時間 (720 分) のうち 5 分のダウンタイムがあり、およそ 715/720 * 100 = 99.305% の稼働率となります。環境「dev」も同様に 5 分のダウンタイムがあるため、同じ稼働率になります。つまり、prod または dev のいずれかがダウンタイムだった全体のダウンタイムは 10 分 (重複なし) であり、全体の稼働率は (720−10)/720 * 100 ≒ 98.611% となります。

### 補正

Time Slice SLO では、補正期間を常に稼働時間として計算に含めます。総時間が変わらないため、エラー バジェットも常に一定量の時間になります。これは、モニター ベース SLO における補正処理と比べて大幅に単純化・改善された点です。

モニター ベース SLO の場合、補正期間は計算から除外されます。たとえば、7 日間の SLO に 1 日の補正を加えると、1 時間のダウンタイムは 0.6% ではなく 0.7% として計算されます。

$$ 60/8640 *100 = ~0.7% $$

時間を除外すると「時間の伸縮」が起こり、ダウンタイム 1 分が総時間に対してより大きな割合を占めるようになります。

### 欠損データ

Time Slice SLO では、欠損データを常に稼働時間として扱います。タイムラインのビジュアライゼーションでは、欠損データはグレーで表示されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo/manage
[2]: /ja/metrics/#time-and-space-aggregation