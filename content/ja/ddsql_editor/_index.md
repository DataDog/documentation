---
aliases:
- /ja/dashboards/ddsql_editor/
further_reading:
- link: ddsql_reference/ddsql_default
  tag: ドキュメント
  text: DDSQL リファレンス
- link: https://www.datadoghq.com/blog/advanced-analysis-tools/
  tag: ブログ
  text: Datadog での高度な分析のために Sheets、DDSQL Editor、Notebooks でデータを探索する
title: DDSQL Editor
---

{{< callout url="https://www.datadoghq.com/product-preview/logs-metrics-support-in-ddsql-editor/" >}}
DDSQL でのログとメトリクスのクエリはプレビューです。アクセスをリクエストするにはこのフォームをご利用ください。
{{< /callout >}}

## 概要

[DDSQL Editor][1] を使用すると、自然言語またはタグ クエリを追加サポートした SQL 方言の [DDSQL](#use-sql-syntax-ddsql) でリソースにクエリを実行し、インフラストラクチャーをより深く可視化できます。

{{< img src="/ddsql_editor/query-results-cloud-provider-host-count.png" alt="Datadog の DDSQL ページでクラウド プロバイダーごとのホスト数を示す SQL クエリの結果" style="width:100%;" >}}

## 自然言語でクエリ

検索ボックスに質問を入力すると、Datadog が SQL クエリを自動生成します。まだこの機能が有効になっていない場合は、[サポートに問い合わせる][5] ことで有効化できます。

{{< img src="ddsql_editor/natural-language-query-2.png" alt="自然言語検索ボックスに入力されたクエリ" style="width:90%;" >}}

## SQL 構文を使用する (DDSQL)

DDSQL は Datadog のデータ用のクエリ言語です。標準的な SQL 操作 (`SELECT` など) を多数サポートし、[タグ][2] のような非構造化データに対してもクエリを実行できます。`SELECT` ステートメントを書いて、必要なデータだけを取得しましょう。タグを通常のテーブル カラムのようにクエリできます。詳細は [DDSQL リファレンス][6] を参照してください。

{{< code-block lang="sql" >}}
SELECT instance_type, count(instance_type)
FROM aws.ec2_instance
WHERE tags->'region' = 'us-east-1' -- region はカラムではなくタグです
GROUP BY instance_type
{{< /code-block >}}

## テレメトリーを探索する

<div class="alert alert-danger">DDSQL での Logs と Metrics のクエリはプレビュー版です。アクセスをリクエストするには <a href="https://www.datadoghq.com/product-preview/logs-metrics-support-in-ddsql-editor/">このフォーム</a> をご利用ください。</div>

Data Explorer でクエリをビュー、フィルター、およびビルドします。

{{< img src="/ddsql_editor/data-tab-available-tables.png" alt="DDSQL Editor でクエリ可能なテーブル一覧を表示するサイド パネル" style="width:90%;" >}}

テーブル名をクリックすると、そのカラムとリレーションシップを表示できます:

{{< img src="ddsql_editor/data-tab.png" alt="aws.ec2_instance 用のテーブル情報を表示する Data タブ" style="width:70%;" >}}

Logs と Metrics の場合は、クエリ ビルダーを使用してテーブル関数を生成してください。

## クエリを保存および共有する

将来参照できるよう便利なクエリを保存したり、データを CSV としてダウンロードしたりできます。

{{< img src="/ddsql_editor/save_export.png" alt="保存とエクスポート オプションがハイライトされた DDSQL Editor のクエリ結果インターフェイス" style="width:90%;" >}}

**Save to Dashboard** をクリックすると、保存済みクエリをダッシュボードにエクスポートできます。ダッシュボードから結果を可視化し、Scheduled Reports を送信できます。

サイド パネルで最近または保存済みのクエリを閲覧および再実行できます。

{{< img src="/ddsql_editor/queries-tab-recent-queries.png" alt="DDSQL Editor の Queries タブで保存済みおよび最近のクエリ一覧を表示しているサイド パネル" style="width:70%;" >}}

## 権限

DDSQL Editor アプリにアクセスするには、ユーザーに `ddsql_editor_read` 権限が必要です。この権限はデフォルトで Datadog Read Only Role に含まれています。組織がカスタム ロールを使用している場合は、該当ロールにこの権限を追加してください。権限管理の詳細は [RBAC ドキュメント][3] を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ddsql/editor
[2]: /ja/ddsql_reference/ddsql_default/#tags
[3]: /ja/account_management/rbac/
[4]: /ja/bits_ai
[5]: /ja/help/
[6]: /ja/ddsql_reference/ddsql_default/