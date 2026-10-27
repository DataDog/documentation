---
description: ダッシュボードのグラフ全体で異常を自動的に検知してグループ化し、その原因となっているタグを特定して、根本原因分析を Bits Investigation
  に委任します。
further_reading:
- link: /dashboards/graph_insights/watchdog_explains/
  tag: ドキュメント
  text: Watchdog Explains で単一の異常を分析する
- link: /bits_ai/bits_investigation/
  tag: ドキュメント
  text: Bits Investigation による根本原因分析の仕組みを学ぶ
site_support_id: dashboard_anomaly_detection
title: ダッシュボードの異常を調査する
---
## 概要{#overview}

Datadog は、ダッシュボードの時系列グラフ全体で異常を検知し、同時に発生した異常を問題としてグループ化し、それぞれに最も寄与しているタグを特定します。異常から、[Watchdog Explains][2] を使用して単一のグラフ上で原因を絞り込むか、[Bits Investigation][1] に根本原因分析を委任することができます。

<div class="alert alert-info">異常検知は、<a href="/dashboards/widgets/timeseries/">時系列ウィジェット</a> ([{{< ui >}}Metrics{{< /ui >}}] (メトリクス) データ (<code>avg</code>、<code>sum</code>、<code>min</code>、および <code>max</code> 集計) を使用するもの) で利用できます。関数 ( <code>cumsum</code>、<code>anomalies</code>、または <code>outliers</code> など) を使用するウィジェットでは利用できません。</div>

ダッシュボードを開くと検知が実行され、約 20 秒以内に問題が表示されます。Datadog で異常が検出されなかった場合、[{{< ui >}}Investigate{{< /ui >}}] (調査) メニューおよびこのページで説明しているコントロールは表示されません。

Datadog は、以下のダッシュボードでは異常検知を実行しません。

- 公開 (共有) ダッシュボード (結果に基づいてアクションを実行できるサインイン済みの閲覧者がいないため)
- モバイルアプリに埋め込まれているダッシュボード
- TV モードのダッシュボード
- 印刷モードのダッシュボード
- [{{< ui >}}Auto-detect issues{{< /ui >}}] (問題の自動検知) をオフにしたダッシュボード

## Datadog による異常検知の仕組み {#how-datadog-detects-anomalies}

Datadog は、基になる時系列の形状と値の両方を分析することで、ダッシュボード上のグラフに異常検知を適用します。履歴パターンからの逸脱を特定し、期待される動作と一致しない急激な増加、急激な減少、または緩やかな変動にフラグを付けます。

季節性を考慮するため、アルゴリズムは最大 3 週間前まで遡って調べます。たとえば、月曜日の午前 9 時に急激な増加が発生した場合、Datadog はそのデータポイントを過去の月曜日の同じ時間と比較します。同様のパターンが一貫して現れる場合、その急激な増加は**季節的**なものとして扱われ、異常としてはフラグ付けされません。これにより誤検知が減り、Datadog では予期しない逸脱のみが検出されるようになります。

異常には急激な増加や減少だけでなく、ステップの変化や傾斜の変化といった、より微妙な傾向も含まれることがあります。

## ダッシュボードで検知された問題を見つける {#find-detected-issues-on-a-dashboard}

ダッシュボード上部の [{{< ui >}}Investigate{{< /ui >}}] をクリックすると、Datadog で検知された問題を確認できます。各問題には、逸脱したメトリクスと検知された日時が示されます。問題を展開すると、問題への影響力が高いタグと [{{< ui >}}Widget affected{{< /ui >}}] (影響を受けるウィジェット) も表示されます。

問題を選択すると、ダッシュボードがスクロールされ、問題の影響があるグラフが表示されます。

複数のウィジェットで同時に発生した異常は、`Anomalies co-occur on 18 widgets` のように 1 つの問題にグループ化されます。

{{< img src="dashboards/graph_insights/investigate_anomalies/investigate_menu.png" alt="ダッシュボードで [Investigate] メニューが開き、検知された 4 つの問題と [Auto-detect issues] トグルが表示されます。" style="width:100%;" >}}

## 異常を確認する {#review-an-anomaly}

検知された異常は、グラフ上でピンク色で強調表示されます。

1. 強調表示されている領域にカーソルを合わせます。チップが表示され、異常の概要と期待される範囲からどの程度逸脱しているかが示されます (例: `The spike is 70% higher than the expected range as inferred from the past 3 weeks of data.`)。
1. チップをクリックして展開します。展開されたチップには、常に以下が含まれます。
   - **[Influential tags] (影響力が高いタグ)**: 異常の原因として最も寄与度が高いタグ。
   - **[Next steps] (次のステップ)**: 推奨されるフォローアップアクション (影響を受けるサービスの確認やモニターの作成など)。

   一部の異常には [**Co-occurs with**] (同時発生) セクションも含まれており、同じ期間に逸脱していたその他のメトリクスが示されます。

{{< img src="dashboards/graph_insights/investigate_anomalies/anomaly_chip.png" alt="[Influential tag]、[Next steps]、[Investigate With AI] (AI を使用して調査) ボタンが示されている、展開された異常チップ。" style="width:100%;" >}}

## Watchdog Explains で単一のグラフを分析する {#analyze-a-single-graph-with-watchdog-explains}

異常を特定のタグに絞り込むには、グラフを全画面表示で開き、[{{< ui >}}Findings{{< /ui >}}] (検出結果) をクリックします。このパネルは Watchdog Explains を利用して提供されています。

各調査結果には、異常の原因である可能性が高いタグが記載されています。また、そのタグを除外する前後のグラフも表示されるため、タグを除外した場合にスパイクが平坦化されるかどうかを確認できます。

詳しくは、「[Watchdog Explains][2]」を参照してください。

## Bits Investigation で根本原因を調査する {#investigate-root-cause-with-bits-investigation}

展開された異常チップ、[{{< ui >}}Investigate With AI{{< /ui >}}] メニュー、または Watchdog Explains の検出結果から、[{{< ui >}}Investigate{{< /ui >}}] をクリックします。Datadog の新しいタブで [Bits Investigation][1] が開き、ここで異常が分析され、根本原因、影響評価、タイムラインが報告されます。

関連する調査がすでに存在する場合、ボタンには [{{< ui >}}See _N_ Related Investigations{{< /ui >}}] (_N_ 件の関連する調査を表示) (_N_ は件数) と示されます。ボタンをクリックすると、フィルタリングされた調査のリストが表示されます。単一の調査を開くには、[{{< ui >}}Review Completed Investigation{{< /ui >}}] (完了した調査を確認) をクリックします。

<div class="alert alert-info">関連調査の件数は、表示している異常ではなく、ダッシュボードと時間範囲全体を対象としたものです。件数が 1 の場合、同じダッシュボード上の別のグラフから開始された調査を意味する可能性があります。</div>

このように開始された調査は、ソースとして [{{< ui >}}Dashboard Anomaly{{< /ui >}}] (ダッシュボードの異常) を記録し、`dashboard_id` タグが付けられています。このソースまたはタグを使用して、後で Bits Investigation のリストから調査を見つけることができます。

## 異常検知をオフにする {#turn-off-anomaly-detection}

ダッシュボードでの異常検知を停止するには、[{{< ui >}}Investigate{{< /ui >}}] をクリックして [{{< ui >}}Auto-detect issues{{< /ui >}}] をオフにします。

この設定は 1 つのダッシュボードに適用され、ブラウザに保存されます。同じダッシュボードを表示しているほかのユーザーには、そのユーザー自身が検知をオフにしない限り、引き続き異常が表示されます。また、この設定は別のブラウザやデバイスには引き継がれません。

単一のウィジェットを異常検知の対象から除外するには、そのウィジェットを編集し、[{{< ui >}}Anomaly Detection{{< /ui >}}] (異常検知) を展開して [{{< ui >}}Hide{{< /ui >}}] (非表示) を選択します。この設定はウィジェット定義の一部であるため、そのダッシュボードを表示するすべてのユーザーに適用されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/bits_ai/bits_investigation/
[2]: /ja/dashboards/graph_insights/watchdog_explains/