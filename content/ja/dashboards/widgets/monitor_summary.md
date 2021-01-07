---
title: モニターサマリーウィジェット
kind: documentation
description: Datadog のすべてのモニターまたはクエリに基づく一部のモニターの概要を表示する
widget_type: manage_status
aliases:
  - /ja/graphing/widgets/monitor_summary/
further_reading:
  - link: /dashboards/screenboards/
    tag: ドキュメント
    text: スクリーンボード
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
モニターサマリーウィジェットは、Datadog のすべてのモニターまたはクエリに基づく一部のモニターの概要を表示します。

{{< img src="dashboards/widgets/monitor_summary/monitor-summary-overview.png" alt="モニターサマリー" >}}

## セットアップ

{{< img src="dashboards/widgets/monitor_summary/monitor-summary-setup.png" alt="モニターサマリーの設定"  style="width:80%;">}}

### コンフィギュレーション

1. 3 つのサマリータイプ `Monitor`、`Group`、`Combined` のいずれかを選択します。
    - `Monitor` サマリータイプには、[モニタークエリ][1]に一致するモニターのステータスと名前が一覧表示されます。マルチアラートモニターの結果リストには 1 行しかなく、そのステータスはマルチアラートモニターの全体的なステータスです。ステータスカウントは、各ステータスタイプと一致するモニターの数です。

    {{< img src="dashboards/widgets/monitor_summary/monitor_summary_type.png" alt="Monitor サマリータイプ"  style="width:80%;">}}

    - `Group` サマリータイプには、モニタークエリに一致するモニターのステータス、名前、グループが一覧表示されます。マルチアラートモニターは結果リストで複数行に分割され、各グループとマルチアラートモニター内のそのグループの特定のステータスに対応します。また、`Group` サマリータイプは、[Triggered Monitors ページ][2]と同様に、モニタークエリで `group` と `group_status` ファセットをサポートしています。ステータスカウントは、各ステータスタイプと一致するモニターグループの数です。

    {{< img src="dashboards/widgets/monitor_summary/group_summary_type.png" alt="Group サマリータイプ"  style="width:80%;">}}

    - `Combined` サマリータイプには、モニタークエリに一致するグループステータスの数とモニターの名前が一覧表示されます。マルチアラートモニターの結果リストには、`Monitor` サマリータイプのように 1 行しかありませんが、グループ列には、モニターの全体的なステータスではなく、各ステータスタイプのグループ数が表示されます。また `Group` サマリータイプと同様に、`Combined` サマリータイプは、モニタークエリで `group` と `group_status` ファセットをサポートしています。ステータスカウントには、やはり `Monitor` サマリータイプのように、全体的なモニターステータスのカウントが表示されます。

    {{< img src="dashboards/widgets/monitor_summary/combined_summary_type.png" alt="Combined サマリータイプ"  style="width:80%;">}}

2. 一部のモニターを対象としてモニターサマリーウィジェットを表示する場合は、モニタークエリを入力します。
    - ダッシュボードでテンプレート変数を作成し、それらをモニタークエリに含める場合は、検索バーにドル記号 `$` を入力し、その後にテンプレート変数の名前を入力します。検索バーに `$` を入力すると、現在のダッシュボードで使用可能なテンプレート変数のオートコンプリートリストが表示され、目的のテンプレート変数を選択できます。

    **注** 上記のリンクにリストされたファセットに加えて、`Group` と `Combined` サマリータイプは、[Triggered Monitors ページ][2]と同様に、グループレベルの検索用に `group` と `group_status` ファセットもサポートします。

## オプション

#### 表示設定

モニターステータスタイプごとのモニターの `Count` のみ、モニターの `List`、または `Both` のどれを表示するかを選択します。`Text` と `Background` オプションは、ステータスカウントのテキストまたは背景にステータスの色を適用するかどうかを指定します。`Hide empty Status Counts` オプションを有効にすると、結果リストにモニターがゼロより多いステータスのステータスカウントのみが表示されます。

{{< img src="dashboards/widgets/monitor_summary/display-preferences.png" alt="表示設定"  style="width:80%;">}}

`Show triggered column` オプションを選択すると、トリガーされた状態（`Alert`、`Warn`、または `No Data`）のモニターまたはモニターグループに結果がフィルターされ、最近トリガーされたものから順にソートされます。モニター/グループが最後にトリガーされてから経過した時間を示す列が追加されます。

{{< img src="dashboards/widgets/monitor_summary/monitor-summary.png" alt="表示設定"  style="width:80%;">}}

#### タイトル

`Show a title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="dashboards/widgets/monitor_summary/widget_title.png" alt="ウィジェットのタイトル"  style="width:80%;">}}

オプションで、タイトルのサイズと配置を定義できます。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][3] ドキュメントをご参照ください。

モニターサマリーウィジェットの[ウィジェット JSON スキーマ定義][4]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/manage_monitor/
[2]: /ja/monitors/manage_monitor/#manage-triggered-monitors-with-group-level-granularity
[3]: /ja/api/v1/dashboards/
[4]: /ja/dashboards/graphing_json/widget_json/