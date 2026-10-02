---
aliases:
- /ja/monitors/service_level_objectives/monitor/
- /ja/service_management/service_level_objectives/monitor/
description: モニターを使用してサービスレベル目標 (SLO) を定義する
further_reading:
- link: /monitors/
  tag: ドキュメント
  text: モニターの詳細
- link: https://www.datadoghq.com/blog/define-and-manage-slos/#monitor-based-slo
  tag: ブログ
  text: Datadog で SLO を管理するためのベストプラクティス
- link: https://www.datadoghq.com/blog/slo-synthetic-monitoring/
  tag: ブログ
  text: Datadog Synthetic Monitoring を使用して SLO の精度とパフォーマンスを向上させる
- link: https://learn.datadoghq.com/courses/understanding-slos
  tag: ラーニングセンター
  text: Service Level Objectives (SLO) の理解
title: SLO モニタリング
---
## 概要 {#overview}
新規または既存の Datadog モニターから SLO を構築するには、モニターベースの SLO を作成します。モニターベースの SLO を使用すると、システムが正常な動作を示した時間を総時間で割ることで、サービスレベル指標 (SLI) を計算することができます。

<div class="alert alert-info">Time Slice SLO は、時間ベースの SLI 計算で SLO を作成するもう 1 つの方法です。Time Slice SLO を使用すると、モニターを介さずに稼働時間 SLO を作成できるため、モニターと SLO の両方を作成して管理する手間を省くことができます。</div>

{{< img src="service_level_objectives/monitor/monitor_slo_side_panel.png" alt="モニターベースの SLO の例" >}}

## 前提条件 {#prerequisites}

モニターベースの SLO を作成するには、既存の Datadog モニターが必要です。新しいモニターをセットアップするには、[モニター作成ページ][1]に移動します。

Datadog のモニターベースの SLO は、以下のモニタータイプをサポートしています。
- メトリクスモニターの種類 (メトリクス、インテグレーション、APM メトリクス、異常値、予測値、外れ値)
- Synthetic
- サービスチェック

## セットアップ {#setup}

[SLO ステータスページ][2]で、[{{< ui >}}\+ New SLO{{< /ui >}}] をクリックします。次に、[{{< ui >}}By Monitor Uptime{{< /ui >}}] を選択します。

### クエリを定義する {#define-queries}


検索ボックスに、モニター名の入力を開始します。一致するモニターのリストが表示されます。モニター名をクリックして、ソースリストに追加します。

**注**:

- SLO で単一のマルチアラートモニターを使用している場合は、オプションで [Calculate on selected groups] を選択し、最大 20 個のグループを選択できます。
- 複数のモニターを SLO に追加する場合、グループ選択はサポートされていません。最大 20 個のモニターを追加できます。

### SLO ターゲットを設定する {#set-your-slo-targets}

[{{< ui >}}target{{< /ui >}}] パーセンテージ、[{{< ui >}}time window{{< /ui >}}]、およびオプションの [{{< ui >}}warning{{< /ui >}}] レベルを選択します。

目標パーセンテージは、SLO の基礎となるモニターが ALERT 状態であってはならない時間の割合を指定します。タイムウィンドウは、SLO が計算を実行するローリング期間を指定します。

SLI の値に応じて、Datadog UI は SLO のステータスを異なる色で表示します。
- SLI が目標値を超えている間は、UI に SLO のステータスが緑色で表示されます。
- SLI が目標値を下回ると、UI に SLO のステータスが赤色で表示されます。
- 警告レベルを設定しており、SLI が警告レベルを下回ったものの目標レベルは上回っている場合、UI の SLO ステータスは黄色で表示されます。

選択したタイムウィンドウによって、モニターベースの SLO に利用できる精度が変わります。
- 7 日および 30 日のタイムウィンドウは、小数点以下 2 桁まで表示可能です。
- 90 日のタイムウィンドウは、小数点以下 3 桁まで表示可能です。

SLO の詳細 UI では、7 日および 30 日のタイムウィンドウで構成された SLO については小数点以下 2 桁、90 日のタイムウィンドウで構成された SLO については小数点以下 3 桁が Datadog に表示されます。

以下の例は、Datadog が SLO の計算において小数点以下の桁数を制限して表示する理由を示しています。7 日間または 30 日間のウィンドウで 99.999% という目標を設定した場合、エラーバジェットはそれぞれ 6 秒または 26 秒となります。モニターは 1 分ごとに評価されるため、モニターベースの SLO の粒度も 1 分単位となります。したがって、上記の例では、たった 1 回のアラートが発生するだけで、6 秒または 26 秒というエラーバジェットを完全に使い果たし、超過してしまうことになります。実際には、これほどわずかなエラーバジェットの範囲内でチームが運用を維持することは不可能です。

1 分間に 1 回のモニター評価よりも細かい粒度が必要な場合は、代わりに[メトリクスベースの SLO][3] を使用することを検討してください。

### 名前とタグを追加する {#add-name-and-tags}

SLO の名前と詳細な説明を選択します。SLO に関連付けるタグを選択します。[{{< ui >}}Create{{< /ui >}}] または [{{< ui >}}Create & Set Alert{{< /ui >}}] を選択して、新しい SLO を保存します。

## ステータス計算 {#status-calculation}

{{< img src="service_level_objectives/monitor/monitor_slo_overall_status.png" alt="グループを使用したモニターベースの SLO" >}}

Datadog は、特定のグループが選択されていない限り、すべてのモニターまたはモニターグループ全体の稼働率として SLO の全体的なステータスを計算します。
- 特定のグループが選択されている場合 (最大 20 個)、SLO ステータスはそのグループのみを使用して計算されます。UI には、選択されたすべてのグループが表示されます。
- 特定のグループが選択されていない場合、SLO ステータスは *すべて*のグループを対象に計算されます。UI には、その SLO を構成するすべてのグループが表示されます。

**注:** グループを含むモニターベースの SLO の場合、グループ数が 5,000 以下の場合はすべてのグループが表示されます。5,000 を超えるグループを含む SLO の場合、SLO はすべてのグループに基づいて計算されますが、UI にはグループは表示されません。

モニターベースの SLO は `WARN` 状態を `OK` として扱います。SLO の定義では、動作を良好か不良かの二者択一で区別する必要があります。SLO 計算では、`WARN` は良好な動作として扱われます。なぜなら、`WARN` は不良とみなすほど深刻な状態ではないためです。

3 つのモニターを含むモニターベースの SLO の次の例を考えてみましょう。単一のマルチアラートモニターに基づくモニターベースの SLO の計算も、これと同様の形になります。

| モニター            | t1 | t2 | t3    | t4 | t5    | t6 | t7 | t8 | t9    | t10 | ステータス |
|--------------------|----|----|-------|----|-------|----|----|----|-------|-----|--------|
| モニター 1          | OK | OK | OK    | OK | ALERT | OK | OK | OK | OK    | OK  | 90%    |
| モニター 2          | OK | OK | OK    | OK | OK    | OK | OK | OK | ALERT | OK  | 90%    |
| モニター 3          | OK | OK | ALERT | OK | ALERT | OK | OK | OK | OK    | OK  | 80%    |
| **全体ステータス** | OK | OK | ALERT | OK | ALERT | OK | OK | OK | ALERT | OK  | 70%    |

この例では、全体のステータスが個々のステータスの平均値よりも低くなっています。

モニターをミュートしても、SLO の計算には影響しません。SLO の計算から期間を除外するには、[SLO ステータス修正][5]機能を使用します。

### Synthetic テストの例外 {#exceptions-for-synthetic-tests}
1 つのグループ化された Synthetic テストで構成されるモニターベースの SLO において、ステータス計算の例外となるケースがあります。Synthetic テストには、テストが ALERT 状態になるタイミングの動作を変更し、結果として全体のアップタイムに影響を与える特別なアラート条件がオプションで用意されています。

- グループが失敗状態にある時間が指定された分数 (デフォルト: 0) に達するまで待機する
- 失敗状態にあるグループの数が指定された数 (デフォルト: 1) に達するまで待機する
- 特定のロケーションでのテストを失敗とみなす前に、指定された回数 (デフォルト: 0) だけ再試行する

これらの条件のいずれかをデフォルト以外に変更した場合、1 つの Synthetic テストを使用するモニターベースの SLO の全体的なステータスは、Synthetic テストの個々のグループの集計ステータスよりも優れているように見える可能性があります。

Synthetic テストのアラート条件の詳細については、「[Synthetic Monitoring][4]」を参照してください。

### データの欠落{#missing-data}
#### メトリクスモニター {#metric-monitors}
メトリクスモニターを作成する際、[モニターが欠落データをどのように処理するか][6]を選択します。この設定は、モニターベースの SLO 計算が欠落データをどのように解釈するかに影響します。

| モニター設定     | 欠落データの SLO 計算 |
|---------------------------|---------------------------------|
| `Evaluate as zero`        | モニターのアラートしきい値に依存 <br>例えば、しきい値が `> 10` の場合はアップタイム (モニターのステータスが `OK` となるため) として扱われますが、しきい値が `< 10` の場合はダウンタイムとして扱われます。                            |
| `Show last known status`  | SLO の最後のステータスを維持          |
| `Show NO DATA`            | アップタイム                          |
| `Show NO DATA and notify` | ダウンタイム                        |
| `Show OK`                 | アップタイム                          |

#### その他のモニタータイプ {#other-monitor-types}
サービスチェックモニターを作成する際、データが欠落したときにアラートを送信するかどうかを選択します。この設定は、モニターに基づく SLO 計算において、欠落データがどのように解釈されるかに影響します。欠落データを無視するように設定されたモニターの場合、データが欠落している期間は、SLO によって OK (アップタイム) として扱われます。欠落データに対してアラートを送信するように設定されたモニターの場合、データが欠落している期間は、SLO によって ALERT (ダウンタイム) として扱われます。

Synthetic テストを一時停止すると、SLO はその計算からデータが欠落している期間を除外します。UI では、これらの期間は SLO ステータスバー上で薄い灰色で表示されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create
[2]: https://app.datadoghq.com/slo
[3]: /ja/service_level_objectives/metric/
[4]: /ja/synthetics/api_tests/?tab=httptest#alert-conditions
[5]: /ja/service_level_objectives/#slo-status-corrections
[6]: /ja/monitors/configuration/#no-data