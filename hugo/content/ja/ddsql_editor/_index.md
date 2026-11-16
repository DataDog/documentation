---
aliases:
- /ja/dashboards/ddsql_editor/
- /ja/ddsql_editor/getting_started/
description: 自然言語またはタグをテーブル列としてサポートする DDSQL 構文を使用して、インフラストラクチャーリソースとテレメトリデータをクエリします。
further_reading:
- link: mcp_server
  tag: ドキュメント
  text: Datadog MCP Server
- link: ddsql_reference/ddsql_default
  tag: ドキュメント
  text: DDSQL リファレンス
- link: https://learn.datadoghq.com/courses/getting-started-ddsql-editor
  tag: ラーニングセンター
  text: DDSQL エディタの概要
- link: https://www.datadoghq.com/blog/metrics-natural-language-queries/
  tag: ブログ
  text: 自然言語クエリで Datadog メトリクスを探索する
- link: https://www.datadoghq.com/blog/advanced-analysis-tools/
  tag: ブログ
  text: Sheets、DDSQL Editor、および Notebooks を使用した Datadog での高度な分析のためのデータ探索
title: DDSQL エディター
---
{{< callout url="https://www.datadoghq.com/product-preview/additional-advanced-querying-data-sources/" header="高度なデータソース">}}
まだ利用できないデータソースをクエリしたい場合は、以下のフォームを使用してリクエストを送信してください。サポートされているデータソースの全リストについては、<a href="/ddsql_reference/data_directory/">データディレクトリ</a>を参照してください。
{{< /callout >}}

## 概要{#overview}

[DDSQL エディタ][1] を使用すると、自然言語またはタグクエリを追加サポートした SQL 方言の [DDSQL](#use-sql-syntax-ddsql) でリソースにクエリを実行し、テレメトリをより深く可視化できます。

DDSQL クエリの結果をエクスポートして Dashboard やノートブックで可視化したり、[DDSQL Action](#save-and-share-queries)を通じて Datadog ワークフローで自動化したりすることもできます。

DDSQL クエリは、[Datadog MCP Server][9] `ddsql` ツールセットを使用して、AI エージェントから実行できます (プレビュー)。

{{< img src="/ddsql_editor/query-results-avg-cpu-usage-by-host.png" alt="Datadog の DDSQL ページで、ホストごとの平均 CPU 使用率を示す SQL クエリの結果" style="width:100%;" >}}

## 自然言語でクエリ {#query-in-natural-language}

検索ボックスに質問を入力すると、Datadog があなたに代わって SQL クエリを構築します。変更を承諾または破棄したり、フィードバックを提供して機能の改善に役立てたりすることができます。

{{< img src="ddsql_editor/natural-language-query-2.png" alt="自然言語検索ボックスに入力されたクエリ" style="width:90%;" >}}

## SQL 構文を使用する (DDSQL) {#use-sql-syntax-ddsql}

[DDSQL][6] は、Datadog データのクエリ言語です。`SELECT` などの標準的な SQL 操作をいくつか実装しており、[タグ][2] などの非構造化データに対するクエリを可能にします。独自の `SELECT` ステートメントを作成して、必要なデータを正確に取得します。タグを、標準のテーブルの列としてクエリします。詳細については、[DDSQL リファレンス][6]を参照してください。

{{< code-block lang="sql" >}}
SELECT instance_type, count(instance_type)
FROM aws.ec2_instance
WHERE tags->'region' = 'us-east-1' -- region is a tag, not a column
GROUP BY instance_type
{{< /code-block >}}

## テレメトリを探索する {#explore-your-telemetry}

Data Explorer でクエリをビュー、フィルター、およびビルドします。

テーブル名をクリックすると、そのカラムとリレーションシップを表示できます:

{{< img src="ddsql_editor/data-tab.png" alt="aws.ec2_instance のテーブル情報を表示するデータタブ" style="width:70%;" >}}

Logs などのデータソースについては、クエリビルダーを使用してテーブル関数を生成します。

## クエリを保存および共有する{#save-and-share-queries}

将来参照できるよう便利なクエリを保存したり、データを CSV としてダウンロードしたりできます。サイド パネルで最近または保存済みのクエリを閲覧および再実行できます。

{{< img src="/ddsql_editor/save-and-actions.png" alt="保存およびアクションのドロップダウンが強調表示された、クエリ結果を表示する DDSQL エディターインターフェース" style="width:90%;" >}}

保存済みクエリの結果を以下にエクスポートします。
- 可視化およびレポート作成のためのダッシュボードまたはノートブック
- Datadog ワークフロー の [DDSQL アクション](https://app.datadoghq.com/actions/action-catalog#com.datadoghq.dd/com.datadoghq.dd.ddsql/com.datadoghq.dd.ddsql.tableQuery)を使用して自動化します。これにより、以下のことが可能です。
  - [DDSQL クエリからカスタムメトリクスを作成する](https://app.datadoghq.com/workflow/blueprints/create-a-metric-from-a-ddsql-query)
  - [DDSQL クエリの結果をプログラムでエクスポートする](https://app.datadoghq.com/workflow/blueprints/export-ebs-volumes-not-in-ddsql-as-s3-csv)
  - [リソースのコンプライアンスを確認するための Slack メッセージをスケジュールする](https://app.datadoghq.com/workflow/blueprints/idle-compute-check-via-ddsql-with-slack-updates)
- [DDSQL クエリでアラート][8] (Logs、Metrics、RUM、Spans、Product Analytics のみ)

{{< img src="/ddsql_editor/queries-tab-recent-queries.png" alt="DDSQL エディターで、保存済みクエリと最近のクエリを一覧表示する [Queries] タブを示すサイドパネル" style="width:70%;" >}}

## 権限{#permissions}

DDSQL エディターアプリにアクセスするには、ユーザーに `ddsql_editor_read` 権限が必要です。この権限は、デフォルトで Datadog Read Only ロールに含まれています。組織でカスタムロールを使用している場合は、適切なロールにこの権限を追加してください。権限の管理の詳細については、[RBAC のドキュメント][3]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ddsql/editor
[2]: /ja/ddsql_reference/ddsql_default/#tags
[3]: /ja/account_management/rbac/
[4]: /ja/bits_ai
[5]: /ja/help/
[6]: /ja/ddsql_reference/ddsql_default/
[7]: https://docs.datadoghq.com/ja/ddsql_editor/#save-and-share-queries
[8]: /ja/monitors/types/analysis/
[9]: /ja/mcp_server/