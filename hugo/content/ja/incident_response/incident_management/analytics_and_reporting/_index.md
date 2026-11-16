---
aliases:
- /ja/monitors/incident_management/analytics
- /ja/service_management/incident_management/analytics/
- /ja/incident_response/incident_management/analytics
description: ダッシュボードとノートブックで、インシデント管理の集計された統計情報を追跡および分析する
further_reading:
- link: /incident_response/incident_management/setup_and_configuration
  tag: ドキュメント
  text: インシデント設定
- link: https://app.datadoghq.com/dash/integration/30523/incident-management-overview
  tag: アプリ内
  text: すぐに使える Incident Management の概要ダッシュボード
- link: https://app.datadoghq.com/notebook/template/11/incident-management-overview
  tag: アプリ内
  text: すぐに使えるインシデントレポートテンプレート
title: 分析およびレポート
---
## 概要 {#overview}

{{< img src="incident_response/incident_management/analytics_and_reporting/incident_analytics.mp4" alt="Incident Management の概要ダッシュボードをスクロールする" video=true style="width:100%;">}}

Incident Analytics を使用して、過去のインシデントから学び、インシデント対応プロセスの効率とパフォーマンスを把握します。Incident Analytics を使用すると、インシデントについて経時的に集計された統計情報を取得できます。これらの統計を使用して、次のことに役立つレポートを作成できます。
- インシデント対応プロセスが時間の経過とともに改善されているかどうかを分析する
- 平均解決時間を評価する
- 投資すべき改善領域を特定する

## 収集データ {#data-collected}

Incident Management Analytics は、集計されたインシデント統計のクエリ可能なデータソースです。Dashboards と Notebooks のさまざまなグラフウィジェットを使用してこれらの分析をクエリし、インシデント対応の履歴を時系列で分析できます。Datadog は、出発点として複製してカスタマイズできる以下のすぐに使えるリソースを提供しています。
- [Incident Management の概要ダッシュボードテンプレート][3]
- [ノートブックのインシデントレポートテンプレート][4]

### インシデントのタイムスタンプ {#incident-timestamps}

インシデントには、分析に影響を与える 3 つのタイムスタンプ属性があります。

* 宣言時刻 (`declared`): インシデントが宣言された時刻。
* 検出時刻 (`detected`): インシデントの宣言元となったリソースが作成された時刻。たとえば、午後 2 時にモニターのアラートが発報され、午後 2 時 30 分にインシデントが宣言された場合、検出時刻は午後 2 時になります。インシデントが別の Datadog リソースから宣言されなかった場合、`detected` は `declared` と同じになります。
* 解決時刻 (`resolved`): インシデントが最後に解決された時刻。

### メジャー {#measures}

Incident Management では、Dashboard と Notebook のウィジェットで分析クエリに使用できる以下の分析指標が提供されます。

{{< collapse-content title="顧客への影響時間" level="h4" >}}
インシデントで定義された影響に基づき、顧客が影響を受けた時間。
{{< img src="incident_response/incident_management/analytics_and_reporting/Customer Impact Duration.png" alt="顧客への影響時間" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="ステータスアクティブ時間" level="h4" >}}
インシデントのタイムラインに基づき、インシデントが「アクティブ」状態であった時間。
{{< img src="incident_response/incident_management/analytics_and_reporting/Status Active Duration.png" alt="ステータスアクティブ時間" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="ステータス安定時間" level="h4" >}}
インシデントのタイムラインに基づき、インシデントが「安定」状態であった時間。
{{< img src="incident_response/incident_management/analytics_and_reporting/StatusStableDuration.png" alt="ステータス安定時間" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="検出までの時間" level="h4" >}}
最初に顧客に影響が生じた時刻からインシデントの検出時刻までの時間。
{{< img src="incident_response/incident_management/analytics_and_reporting/TimeToDetect.png" alt="検出までの時間グラフィック" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="復旧までの時間" level="h4" >}}
インシデントの検出時刻から最後に顧客に影響が生じた時刻までの時間。
{{< img src="incident_response/incident_management/analytics_and_reporting/TimeToRepair.png" alt="復旧までの時間グラフィック" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="解決までの時間" level="h4" >}}
インシデントの宣言時刻から解決時刻までの時間。
{{< img src="incident_response/incident_management/analytics_and_reporting/TimeToResolve.png" alt="解決までの時間グラフィック" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="内部対応までの時間" level="h4" >}}
インシデントの検出時刻から宣言時刻までの時間。
{{< img src="incident_response/incident_management/analytics_and_reporting/TimeToInternalResponse.png" alt="内部対応までの時間グラフィック" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="検出から解決までの時間" level="h4" >}}
インシデントの検出時刻から解決時刻までの時間。宣言時刻から計測する解決までの時間とは異なり、このメジャーには検出から宣言までの時間も含まれます。
{{< /collapse-content >}}

これらのデフォルトに加えて、[インシデント設定][7]でカスタムの *Number* プロパティフィールドを追加することで、新しいメジャーを作成することができます。

### タイムスタンプオーバーライド {#timestamp-overrides}

インシデント対応者は、対応プロセスを開始する前に Datadog インシデントの宣言を忘れることがあります。また、インシデント対応プロセスが実質的に終了した後でも、Datadog でインシデントの解決を忘れることもあります。こうした見落としは、インシデント分析において誤解を招く状況を生み出し、平均解決時間やその他のメジャーを恒久的に膨らませる可能性があります。

これに対処するため、組織は**タイムスタンプオーバーライド**を有効にすることができます。これにより、インシデント対応者はインシデントに記録されたタイムスタンプを手動で上書きできるようになります。オーバーライドが設定されている場合、オーバーライドは以下の分析メジャーに影響します。

- `Time to Detect`
- `Time to Internal Response`
- `Time to Repair`
- `Time to Resolve`
- `Time from Detect to Resolve`

オーバーライドは、検索、分析、インシデントの**タイムスタンプ**セクションに表示される時間、およびテンプレートがレンダリングされる際の時間変数に影響します。インシデントのタイムラインに自動的に記録された履歴を変更するものではありません。インシデントのタイムライン上のステータスセグメントの累積長によって決まる分析指標の `Status Active Duration` や `Status Stable Duration` には適用されません。

タイムスタンプのオーバーライドを有効にするには、[**インシデント** > **設定** > **情報**][11]に移動します。

タイムスタンプのオーバーライドを作成、更新、または削除するには、ユーザーが **Incidents Write** 権限を持っている必要があります。

## ダッシュボードでインシデントデータを視覚化する {#visualize-incident-data-in-dashboards}

Incident Management Analytics のデータを使用してグラフを構成するには、以下の手順を実行します。

1. [視覚化方法を選択します][5]。
2. データソースドロップダウンメニューから `Incidents` を選択します。
3. 黄色のドロップダウンメニューからメジャーを選択します。
     - **Default Statistic:** インシデントの数を数えます。
4. メジャーの集計方法を選択します。
5. (オプション) メジャーのロールアップを選択します。
6. (オプション) 検索バーを使用して、統計情報の対象を特定のインシデントに絞り込みます。
7. (オプション) ピンクのドロップダウンメニューでファセットを選択してメジャーをグループ別に分け、表示するグループの制限数を選択します。
8. [グラフにタイトルを付けます][6]。
9. ウィジェットを保存します。

### 例: サービスごとにグループ化された毎週の停止顧客への影響時間 {#example-weekly-outage-customer-impact-duration-grouped-by-service}

{{< img src="/incident_response/incident_management/analytics_and_reporting/analytics_graph_configuration.png" alt="重要度でフィルタリングしたインシデントデータソースが表示された時系列グラフ構成。顧客への影響時間がサービスごとにグループ化して表示されている" style="width:90%;" >}}

この構成例は、SEV-1 または SEV-2 のインシデントの集計を示しています。グラフには、サービスごとにグループ化されたそれらのインシデントの顧客への影響期間が表示されます。

1. ウィジェット: [時系列ライングラフ][8]
2. データソース: `Incidents`
3. メジャー: `Customer Impact Duration`
4. 集計: `avg`
5. ロールアップ: `1w`
6. フィルター: `severity:("SEV-1" OR "SEV-2")`
7. グループ: `Services`、上位 5 つに制限

## インシデントレポート {#incident-report}

すぐに使えるノートブックテンプレートを使用してインシデントレポートを作成するか、ゼロから構築してチームやサービスのインシデントの概要レポートを取得します。
1. [インシデントレポートテンプレート][9]を開きます。
1. **テンプレートを使用する [**] をクリックして、編集およびカスタマイズします。
1. 既存のインシデントセルを使用するか、クエリをカスタマイズして各メジャーの値を表示できます。
1. 関連する値で概要セルを更新し、チームの他のメンバーと[レポートを共有][10]します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/
[2]: /ja/notebooks/
[3]: https://app.datadoghq.com/dash/integration/30523/incident-management-overview?from_ts=1632093826308&to_ts=1634685826308&live=true
[4]: https://app.datadoghq.com/notebook/template/11/incident-management-overview
[5]: /ja/dashboards/querying/#select-your-visualization
[6]: /ja/dashboards/querying/#create-a-title
[7]: /ja/incident_response/incident_management/setup_and_configuration/property_fields
[8]: /ja/dashboards/widgets/timeseries/
[9]: https://app.datadoghq.com/notebook/template/11/incident-report
[10]: /ja/notebooks/#share-notebooks
[11]: https://app.datadoghq.com/incidents/settings#information
[12]: /ja/incident_response/incident_management/setup_and_configuration/variables/#incident-variables