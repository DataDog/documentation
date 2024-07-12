---
aliases:
- /ja/logs/export
description: ログエクスプローラーのビューをエクスポートして、後で、または別のコンテキストで再利用することができます。
further_reading:
- link: logs/explorer/search
  tag: ドキュメント
  text: ログのフィルター方法
- link: logs/explorer/analytics
  tag: ドキュメント
  text: ログをグループ化する方法
- link: logs/explorer/visualize
  tag: ドキュメント
  text: ログからビジュアライゼーションを作成する
title: ログのエクスポート
---

## 概要

いつでも、現在の集計に応じて、ログ探索を次のように**エクスポート**または**保存**します。

- 将来の自身またはチームメイトの調査の開始点として使用する[**保存ビュー**][1]。
- レポートまたは統合を目的とした[**ダッシュボードウィジェット**][2]または[**ノートブックウィジェット**][8]。
- 事前定義されたしきい値でアラートをトリガーするための[**監視**][3]。
- ログが Datadog に取り込まれるときに、ログを長期 KPI に集計するための[**メトリクス**][4]。
- ログエクスプローラーでクエリをテストし、[Datadog API][5] を使用してカスタムレポートを構築するための **cURL コマンド**。
- **CSV** (個別ログとトランザクションの場合)。個別ログは 10 万件まで、パターンは 300 件まで、トランザクションは 500 件まで一度にエクスポートすることができます。また、時系列、トップリスト、テーブルビューを CSV ファイルとしてダウンロードすることができます。
- ビューの**共有**: メールや Slack などを通じて、現在のビューへのリンクをチームメートと共有します。この機能で利用可能なすべての[Datadog 通知インテグレーション][6]を参照してください。

{{< img src="logs/explorer/export3.png" alt="検索フィルター" style="width:100%;" >}}

また、ログイベントのサイドパネルで `Save to notebook` を選択することで、個々のログをノートブックに保存することができます。ノートブックに保存されたログは読み手に優しい形式で表示され、この表示はログイベント自体の保持期間が終了した後でもノートブックに保存されます。

{{< img src="logs/explorer/save_logs_to_notebooks.png" alt="ログをノートブックに保存する" style="width:80%;" >}}

Logs API が返す最大 1000 件以上のログリストを取得する場合は、[ページネーション機能][7]を使用します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/saved_views/
[2]: /ja/dashboards/
[3]: /ja/monitors/types/log/
[4]: /ja/logs/logs_to_metrics
[5]: /ja/api/latest/logs/
[6]: /ja/integrations/#cat-notification
[7]: /ja/logs/guide/collect-multiple-logs-with-pagination/?tab=v2api
[8]: /ja/notebooks/