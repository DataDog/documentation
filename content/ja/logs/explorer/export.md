---
aliases:
- /ja/logs/explorer/export
- /ja/logs/export
description: ログエクスプローラーのビューをエクスポートして、後で、または別のコンテキストで再利用することができます。
further_reading:
- link: logs/explorer/search
  tag: ドキュメント
  text: ログの絞り込み
- link: logs/explorer/group
  tag: ドキュメント
  text: クエリログのグループ化
- link: logs/explorer/visualize
  tag: ドキュメント
  text: ログからビジュアライゼーションを作成する
kind: documentation
title: ログのエクスポート
---

いつでも、現在の集計に応じて、ログ探索を次のように**エクスポート**します。

- 将来の自身またはチームメイトの調査の開始点として使用する[**保存ビュー**][1]。
- レポートまたは統合を目的とした[**ダッシュボードウィジェット**][2]。
- 事前定義されたしきい値でアラートをトリガーするための[**監視**][3]。
- ログが Datadog に取り込まれるときに、ログを長期 KPI に集計するための[**メトリクス**][4]。
- ログエクスプローラーでクエリをテストし、[Datadog API][5] を使用してカスタムレポートを構築するための **cURL コマンド**。
- **CSV** (個々のログとトランザクション用)。個々のログには一度に最大 5,000 個のログをエクスポートでき、トランザクションには 500 個のログをエクスポートできます。
- ビューの**共有**: メールや Slack などを通じて、現在のビューへのリンクをチームメートと共有します。この機能で利用可能なすべての[Datadog 通知インテグレーション][6]を参照してください。

{{< img src="logs/explorer/export2.png" alt="検索フィルター" style="width:100%;" >}}

また、ログエクスプローラーのビューをエクスポートして、後で再利用したり、別のコンテキストで使用したりすることもできます。例えば、リストビューやテーブルビューを CSV ファイルでダウンロードして、ログのオフライン処理を行ったり、クエリの結果をチームメイトと共有したりできます。

Logs API が返す最大 1000 件以上のログリストを取得する場合は、[ページネーション機能][7]を使用します。

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/saved_views/
[2]: /ja/dashboards/
[3]: /ja/monitors/create/types/log/
[4]: /ja/logs/logs_to_metrics
[5]: /ja/api/latest/logs/
[6]: /ja/integrations/#cat-notification
[7]: /ja/logs/guide/collect-multiple-logs-with-pagination/?tab=v2api