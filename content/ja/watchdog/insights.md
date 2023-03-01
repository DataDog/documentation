---
description: Watchdog Insights で検索クエリに一致する異常値や外れ値を表示します。
further_reading:
- link: /logs/explorer/watchdog_insights/
  tag: ドキュメント
  text: ログ用 Watchdog Insights
- link: /real_user_monitoring/explorer/watchdog_insights/
  tag: ドキュメント
  text: RUMのWatchdog Insights
- link: https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/
  tag: ブログ
  text: Watchdog Insights によるトラブルシューティングの拡張
- link: https://www.datadoghq.com/blog/watchdog-insights-apm/
  tag: ブログ
  text: Watchdog Insights for APM でエラーとレイテンシーのパターンを自動検出する
kind: documentation
title: Watchdog Insights
---

## 概要

Datadog Watchdog は常にバックグラウンドで動作し、組織全体のデータセットに異常がないかスキャンします。Datadog UI をナビゲートすると、Watchdog Insights がアクティブな検索クエリにマッチした異常のリストをフィルターし、優先度別にソートして表示します。

インシデントの調査には、試行錯誤が必要です。特定の分野に精通したエンジニアは、その経験をもとに、まずどこに潜在的な問題があるのかを知っています。Watchdog Insights を使うことで、経験の浅いエンジニアも含め、すべてのエンジニアが最も重要なデータに注意を払い、インシデント調査を加速させることができます。

### 異常の種類

各インサイトは、ユーザーのサブセットに影響を与える 1 つの外れ値または異常値を強調表示します。製品分野によって、Watchdog Insights は異なるタイプの異常を表示します。例としては、以下のようなものがあります (ただし、これらに限定されるものではありません)。
- ログ、トレース、RUM ビューにおけるエラーとレイテンシーの外れ値
- エラーログの急増
- 新しいエラーログ
- デッドロックされたスレッド
- 未対応の Kubernetes ポッドの割合が高い

### 優先順位付け

Watchdog は、最も重要なインサイトをリストの先頭に置くために、様々な要因に基づきインサイトをソートします。Watchdog が考慮する要素には以下のようなものがあります。
- 状態 (進行中と解決済み)
- ステータス (警告、エラー、重大)
- 開始時間
- 異常の種類

## 使用方法

{{< img src="watchdog/log_explorer_watchdog_insights.png" alt="ログエクスプローラーの Watchdog Insights バナーには、Web ストアサービスの新しいエラーログ、商品レコメンドサービスのエラーログの急増、商品レコメンドサービスのエラーログの別の急増の 3 つの異常が表示されています" >}}

Watchdog Insights のバナーは、各ページの上部付近にあります。バナーを展開すると、概要が表示されます。最も優先度の高いインサイトが左側に表示されます。Watchdog が問題を発見できない場合、バナーは灰色で表示されます。

### インサイトのフィルター

現在のビューを Watchdog Insight に合わせて絞り込むには、インサイトサマリーカードの右上隅にカーソルを合わせます。2 つのアイコンが表示されます。ツールチップ **Filter on Insight** が表示された逆三角形のアイコンをクリックします。ページが更新され、そのインサイトに対応するエントリーのリストが表示されます。

### サイドパネル

**View all** をクリックするとパネルが展開されます。右側からサイドパネルが開き、Watchdog Insights の垂直リストが表示されます。各エントリには詳細表示があり、サマリーカードより多くの情報が表示されます。

{{< img src="watchdog/log_explorer_watchdog_insights_panel.png" alt="ログエクスプローラー内の Watchdog Insights のサイドパネル表示。上部のエリアには、時間の経過に伴うエラーステータスの棒グラフが表示されます。「新しいエラーログが service:web-store で検出されました」というタイトルの Log Anomaly カードが1枚表示されています" >}}

### 詳細ビュー

インサイトの詳細を表示するには、個々のカードをクリックします。右からフルサイドパネルが開きます。

{{< img src="watchdog/profiler_watchdog_insight.png" alt="Watchdog Insights のフルサイドパネルビュー、タイトルは「service:product-recommendation でロック圧が高くなっています」" >}}

ワンクリックでインサイトを共有するには、フルサイドパネルの **Copy Link** ボタンをクリックします。クリップボードにインサイトを生成したクエリが入力されます。

## Watchdog Insights の確認

Watchdog Insights は、[インフラストラクチャー][1]、[APM][2]、[ログ管理][3]、[RUM][4] の 4 つの製品領域でご覧いただけます。

### インフラストラクチャー

Watchdog Insights は、[Live Containers][5] の Kubernetes Explorer タブに表示されます。

1. 左側のナビゲーションで、**Infrastructure** にカーソルを合わせます。
2. **Kubernetes** をクリックします。
3. ページ上部の **Explorer** タブを選択します。
4. **Select Resources** ボックスで、Kubernetes リソースタイプのいずれかを選択します。
5. Kubernetes リソースのリストが表示され、Watchdog Insights パネルが上部に表示されます。

### APM

Watchdog Insights は APM 内のいくつかのページに表示されます。
- [トレースエクスプローラー][6]
- [Continuous Profiler][7]
- [サービス詳細画面][8]
- [リソースステータス画面][9]

### ログ管理

ログ管理 UI で Watchdog Insights を見つけるには、次の手順を実行します。
1. 左側のナビゲーションで、**Logs** にカーソルを合わせます。
2. **Search** をクリックします。

画面の真ん中、ログの上にピンクの Watchdog Insights バナーが表示されます。

詳しくは、[Watchdog Insights for Logs][10] を参照してください。

### RUM

RUM UI で Watchdog Insights を見つけるには、次の手順を実行します。
1. 左側のナビゲーションで、**UX Monitoring** にカーソルを合わせます。
2. **Sessions & Replays** をクリックします。
3. ページの上部にある **In** ドロップダウンには、**Sessions** レベルにいることが表示されています。ドロップダウンを **Views** に変更します。

画面の真ん中、ビューの上にピンクの Watchdog Insights バナーが表示されます。

詳しくは、[Watchdog Insights for RUM][11] を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/orchestration/overview/pod
[2]: https://app.datadoghq.com/apm/home
[3]: https://app.datadoghq.com/logs
[4]: https://app.datadoghq.com/rum/explorer
[5]: /ja/infrastructure/livecontainers/#kubernetes-resources-view
[6]: /ja/tracing/trace_explorer/
[7]: /ja/tracing/profiler/
[8]: /ja/tracing/services/service_page/
[9]: /ja/tracing/services/resource_page/
[10]: /ja/logs/explorer/watchdog_insights/
[11]: /ja/real_user_monitoring/explorer/watchdog_insights/