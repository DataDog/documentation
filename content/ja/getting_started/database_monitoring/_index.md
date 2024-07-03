---
further_reading:
- link: /database_monitoring/
  tag: Documentation
  text: Database Monitoring
- link: /database_monitoring/troubleshooting/
  tag: Documentation
  text: Troubleshooting
- link: https://www.datadoghq.com/blog/database-performance-monitoring-datadog/
  tag: Blog
  text: Database performance monitoring with Datadog
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Join an interactive session to level up your Database Monitoring
title: Getting Started with Database Monitoring
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">選択した Datadog サイト ({{< region-param key="dd_site_name" >}}) ではデータベースモニタリングは利用できません。</div>
{{% /site-region %}}

## 概要

Datadog データベースモニタリングを使用すると、データベースの状態とパフォーマンスの理解を深め、問題の根本原因を特定しやすくなります。

1 つの場所で、次を表示できます。

* ホストレベルのメトリクス
* 説明プラン
* 過去のクエリパフォーマンスメトリクス

このガイドに目を通し、PostgreSQL データベースの例で Datadog データベースモニタリングを設定してください。次に、高価なクエリを特定し、遅いクエリのトラブルシューティングを行い、ダッシュボードを作成してクエリ量の変化を表示します。

## セットアップ

### 前提条件

始める前に、[Datadog アカウント][1]が必要です。

サンプルアプリケーションを実行するには、[GNU Make][2] と [Docker][3] を備えたマシンが必要です。Datadog [API キー][4]を利用できるようにします。

### サンプルアプリケーションをインストールします

サンプルアプリケーションは、Docker コンテナ内の Datadog Agent と PostgreSQL データベースを起動します。アプリケーションの実行中、Agent はデータベースメトリクスを Datadog に送信します。Datadog データベースモニタリングでアプリケーションからのデータを表示できます。

以下の手順に従って、サンプルアプリケーションを MacOS または Linux にインストールします。

1. サンプルアプリケーションを含む[リポジトリ][5]のクローンを作成します。
    ```
    git clone https://github.com/DataDog/dd-database-monitoring-example
    ```

2. `dd-database-monitoring-example` ディレクトリに変更します。
    ```
    cd dd-database-monitoring-example
    ```

3. 環境変数 `DD_API_KEY` を Datadog API キーに設定します。
    ```
    export DD_API_KEY=<API_KEY>
    ```

4. アプリケーションを起動します。
    ```
    make postgres
    ```

Ctrl + C を押してコマンドを停止するまで、コマンドは実行され続けます。

## 高価なクエリを特定する

どのクエリが最もデータベース時間を消費するかを調べるには、クエリメトリクスビューを使用します。

1. [Database Monitoring][6] ページで、UI の **Query metrics** タブをクリックします。

2. 正規化されたクエリテーブルを **Percent time** で並べ替えて、データベースの実行に最も多くの時間を費やしているクエリを確認します。

   データベース時間を最も消費するクエリが最初の行に表示されます。

   {{< img src="database_monitoring/dbm_qm_sort_time.png" alt="パーセント時間でソートされた正規化されたクエリ" style="width:100%;">}}

## 遅いクエリをトラブルシューティングする

遅いクエリを識別するだけでなく、Datadog データベースモニタリングはその診断にも役立ちます。クエリの説明プランは、データベースがクエリを解決するために実行する手順を説明します。クエリサンプルビューでサンプルをクリックして、説明プランを表示します。

1. [Database Monitoring][6] 内の **Samples** タブを選択して、Query Samples ビューに移動します。

2. **In** ドロップダウンで、**Explain Plans** を選択します。

3. 正規化されたクエリテーブルを **Duration** で並べ替えます。

   {{< img src="database_monitoring/dbm_qs_explain_plan_duration.png" alt="期間でソートされた正規化されたクエリサンプル">}}

4. テーブル内の **Explain Plan** 列にデータがあるクエリを見つけてクリックし、Sample Details ページを開きます。

5. **Explain Plan** の下で、**List View** をクリックします。Explain Plan Sample ページの下部にあるこの実行計画では、クエリに _Index Scan_ が必要であることが示されています。

   {{< img src="database_monitoring/dbm_qs_explain_plan_list_view.png" alt="インデックススキャンを示すクエリ実行計画">}}

## データベースの状態とパフォーマンスを視覚化する

データベースの状態とパフォーマンスを一目で理解するには、Datadog データベースモニタリングメトリクスをダッシュボードに追加します。

### クエリ量の変更を表示する

たとえば、クエリカウントメトリクスを追跡する **Change** ウィジェットを追加することで、過去 1 時間のクエリ量の絶対的な変化を確認できます。

1. UI で **Dashboards > New Dashboard** を選択します。

2. ダッシュボードの名前を入力します。**New Dashboard** ボタンをクリックして、新しいダッシュボードに移動します。

2. ダッシュボードにコンテンツを追加するには、**Add Widgets** をクリックします。

3. ウィジェットカルーセルで、**Change** ウィジェットを選択します。

4. **Metric** ドロップダウンで `postgresql.queries.count` を選択します。このメトリクスは、PostgreSQL データベースに送信されたクエリの数をカウントします。

5. ウィジェットがホストごとにクエリを集計するように、**Break it down by** ドロップダウンで `host` を選択します。

   {{< img src="database_monitoring/dashboard_change_postgres.png" alt="postgres クエリメトリクスの変更ウィジェットを構成する" style="width:100%;">}}

7. **Save** ボタンをクリックします。ダッシュボードに新しいウィジェットが表示されます。

   {{< img src="database_monitoring/dashboard_change_widget.png" alt="クエリカウントを表示するウィジェットを変更する" style="width:100%;">}}

### すぐに使えるダッシュボードを表示する

Datadog データベースモニタリングが提供するすぐに使用できるダッシュボードで、現在のデータベースアクティビティ、リソース使用率などを確認します。

ダッシュボードにアクセスするには、[Database Monitoring][6] ページから **Dashboards** タブを選択し、表示したいダッシュボードを選択します。

必要に応じて、すぐに使用できるダッシュボードのクローンを作成して変更できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://www.gnu.org/software/make/
[3]: https://www.docker.com/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://github.com/DataDog/dd-database-monitoring-example
[6]: https://app.datadoghq.com/databases