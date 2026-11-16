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
## 概要{#overview}

いつでも、現在の集計に応じて、ログ探索を以下の形式で**エクスポート**または**保存**できます。

- [{{< ui >}}Saved View{{< /ui >}}][1]。将来の自身またはチームメイトの調査の開始点として使用するものです。
- [{{< ui >}}Dashboard widget{{< /ui >}}][2] または [{{< ui >}}Notebooks widget{{< /ui >}}][8]。レポート作成や統合の目的で使用します。
- [{{< ui >}}Monitor{{< /ui >}}][3]。事前定義されたしきい値でアラートをトリガーするために使用します。
- [{{< ui >}}Metric{{< /ui >}}][4]。ログが Datadog に取り込まれるときに、ログを長期 KPI に集計するために使用します。
- {{< ui >}}cURL command{{< /ui >}}。ログエクスプローラーでクエリをテストして、[Datadog API][5] を使用してカスタムレポートを構築するために使用します。
- {{< ui >}}CSV{{< /ui >}}(個々のログおよびトランザクション用)。個々のログの場合は一度に最大 100,000 件、パターンは 300 件、トランザクションは 500 件までエクスポートできます。時系列、トップリスト、またはテーブルビューを CSV ファイルとしてダウンロードすることもできます。
- {{< ui >}}Share{{< /ui >}}ビュー。メールや Slack などを使用して、現在のビューへのリンクをチームメイトと共有します。この機能で使用可能なすべての [Datadog 通知インテグレーション][6]を参照してください。

{{< img src="logs/explorer/export3.png" alt="検索フィルター" style="width:100%;" >}}

ログイベントサイドパネルで [{{< ui >}}Save to notebook{{< /ui >}}] を選択して、個々のログをノートブックに保存することもできます。ノートブックに保存されたログは読みやすい形式で表示され、この表示はログイベント自体が保持期間を過ぎた後もノートブックに保存されます。

{{< img src="logs/explorer/save_logs_to_notebooks.png" alt="ログをノートブックに保存する" style="width:80%;" >}}

Logs API が返す最大 1000 件の制限を超えるログリストを取得するには、[ページネーション機能][7]を使用します。

## CSV エクスポートのフォーマット{#csv-export-formatting}

エクスポートされたログをスプレッドシートアプリケーションと互換性のあるものにするため、Datadog は CSV エクスポートをサニタイズします。そのため、エクスポートされた値と列名は元のログと異なる場合があります。Datadog は以下の変更を行います。

- **改行** (`\n`、`\r\n`、`\r`) を削除します。スペースは挿入されません。たとえば、`foo\nbar` は `foobar` になります。
- **連続するスペースを**1つのスペースに置き換えます。
- ****スプレッドシートアプリケーションが数式として解釈するのを防ぐため、`=`、`+`、`-`、`@`、タブ、または復帰で始まる数式文字の前に、単一引用符 (`'`) を付けます。
- **重複する列名に数値のサフィックスを追加します**。たとえば、`message(1)` のようになります。

標準的な CSV ルールに従い、Datadog は値を二重引用符で囲み、値内の二重引用符を `""` としてエスケープすることもします。

これらの CSV フォーマットの変更なしでログを取得するには、[Log Search API][5] または [Log Archives][9] を使用してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/saved_views/
[2]: /ja/dashboards/
[3]: /ja/monitors/types/log/
[4]: /ja/logs/logs_to_metrics
[5]: /ja/api/latest/logs/
[6]: /ja/integrations/#cat-notification
[7]: /ja/logs/guide/collect-multiple-logs-with-pagination/?tab=v2api
[8]: /ja/notebooks/
[9]: /ja/logs/log_configuration/archives/