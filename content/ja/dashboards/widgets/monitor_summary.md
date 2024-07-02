---
title: Monitor Summary Widget
description: "Display a summary view of all your Datadog monitors, or a subset based on a query."
widget_type: "manage_status"
aliases:
- /graphing/widgets/monitor_summary/
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Building Dashboards using JSON
---

モニターサマリーウィジェットは、Datadog のすべてのモニターまたはクエリに基づく一部のモニターの概要を表示します。

{{< img src="dashboards/widgets/monitor_summary/monitor-summary-overview.png" alt="モニターサマリー" >}}

## セットアップ

### 構成

1. 3 つのサマリータイプ `Monitor`、`Group`、`Combined` のいずれかを選択します。
    - `Monitor` サマリータイプには、[モニタークエリ][1]に一致するモニターのステータスと名前が一覧表示されます。マルチアラートモニターの結果リストには 1 行しかなく、そのステータスはマルチアラートモニターの全体的なステータスです。ステータスカウントは、各ステータスタイプと一致するモニターの数です。

    {{< img src="dashboards/widgets/monitor_summary/monitor_summary_type.png" alt="Monitor サマリータイプ" style="width:80%;">}}

    - `Group` サマリータイプには、モニタークエリに一致するモニターのステータス、名前、グループが一覧表示されます。マルチアラートモニターは結果リストで複数行に分割され、各グループとマルチアラートモニター内のそのグループの特定のステータスに対応します。また、`Group` サマリータイプは、[Triggered Monitors][2] ページと同様に、モニタークエリで `group` と `group_status` ファセットをサポートしています。ステータスカウントは、各ステータスタイプと一致するモニターグループの数です。

    {{< img src="dashboards/widgets/monitor_summary/group_summary_type.png" alt="Group サマリータイプ" style="width:80%;">}}

    - `Combined` サマリータイプには、モニタークエリに一致するグループステータスの数とモニターの名前が一覧表示されます。マルチアラートモニターの結果リストには、`Monitor` サマリータイプのように 1 行しかありませんが、グループ列には、モニターの全体的なステータスではなく、各ステータスタイプのグループ数が表示されます。また `Group` サマリータイプと同様に、`Combined` サマリータイプは、モニタークエリで `group` と `group_status` ファセットをサポートしています。ステータスカウントには、やはり `Monitor` サマリータイプのように、全体的なモニターステータスのカウントが表示されます。

    {{< img src="dashboards/widgets/monitor_summary/combined_summary_type.png" alt="Combined サマリータイプ" style="width:80%;">}}

2. 一部のモニターを対象としてモニターサマリーウィジェットを表示する場合は、モニタークエリを入力します。

   **注** 上記のリンクにリストされたファセットに加えて、`Group` と `Combined` サマリータイプは、[Triggered Monitors][2] ページと同様に、グループレベルの検索用に `group` と `group_status` ファセットもサポートします。

#### テンプレート変数

ダッシュボードで作成したテンプレート変数をモニターサマリーの検索クエリで使用するには、Manage Monitor ページと同じクエリ形式に従ってください。

**例**

1. テンプレート変数 `$service` を使って、モニター `scope` でフィルタリングを行う。

   管理ページやトリガーされたモニターページで `scope` を利用するには、`scope:service:web-store` を実行する必要があります。
   したがって、ウィジェットで `scope:$service` を実行し、テンプレート変数の値をウィジェットに適用する必要があります。

   {{< img src="dashboards/widgets/monitor_summary/templatevariable-example-scope.png" alt="テンプレート変数のスコープ" style="width:80%;">}}


2. テンプレート変数 `$env` を使って、モニター `group` でフィルタリングを行う。

   管理ページやトリガーされたモニターページで `group` を利用するには、`group:env:prod` を実行する必要があります。
   したがって、ウィジェットで `group:$env` を実行し、テンプレート変数の値をウィジェットに適用する必要があります。

   {{< img src="dashboards/widgets/monitor_summary/templatevariable-example-group.png" alt="テンプレート変数のグループ化" style="width:80%;">}}

## オプション

#### 表示設定

モニターステータスタイプごとのモニターの `Count` のみ、モニターの `List`、または `Both` のどれを表示するかを選択します。`Text` と `Background` オプションは、ステータスカウントのテキストまたは背景にステータスの色を適用するかどうかを指定します。`Hide empty Status Counts` オプションを有効にすると、結果リストにモニターがゼロより多いステータスのステータスカウントのみが表示されます。

{{< img src="dashboards/widgets/monitor_summary/display-preferences.png" alt="表示設定" style="width:80%;">}}

`Show triggered column` オプションを選択すると、トリガーされた状態（`Alert`、`Warn`、または `No Data`）のモニターまたはモニターグループに結果がフィルターされ、最近トリガーされたものから順にソートされます。モニター/グループが最後にトリガーされてから経過した時間を示す列が追加されます。

{{< img src="dashboards/widgets/monitor_summary/monitor-summary.png" alt="表示設定" style="width:80%;">}}

## API

このウィジェットは **[Dashboards API][3]** で使用できます。[ウィジェット JSON スキーマ定義][4]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/manage/
[2]: /monitors/manage/#grouped-results
[3]: /api/latest/dashboards/
[4]: /dashboards/graphing_json/widget_json/
