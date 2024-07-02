---
title: List Widget
widget_type: list_stream
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Building Dashboards using JSON
- link: /notebooks/
  tag: Documentation
  text: Notebooks
algolia:
  tags: [event stream, log stream]
---

The list widget displays a list of events and issues, which can come from a variety of sources such as Logs, RUM, or Events. Search and query across sources to narrow down the events you want the widget to highlight and display.

_エラー追跡問題を表示するリストウィジェット_

{{< img src="dashboards/widgets/list/list_overview.png" alt="エラーの一覧、エラー数、エラー量を表示するリストウィジェットです。" style="width:50%;">}}

## セットアップ

{{< img src="dashboards/widgets/list/list_setup.png" alt="リストウィジェットの構成モーダル" style="width:100%;">}}

### 構成

1. Choose the type of data to graph. You can create a list widget from Issues, Logs, Audit Trail, Watchdog Alerts, or Events depending on which products are available for your organization.

2. ディスプレイの環境設定を行います。スクリーンボードとノートブックの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、グローバルタイムフレームを使用するかを選択します。

3. オプション: グラフにタイトルを付けます (または、提案されたタイトルを使用するには空白のままにします)。

### オプション

リストウィジェットの種類によって、それぞれ構成が異なります。

### 問題

#### ソート方法

問題については、以下でソートすることができます。

* エラー数 (デフォルト)
* 最初に遭遇
* 影響を受けたセッション

**注:** "Sorting by” の選択を変更しても、表示される列は変わりません。影響を受けたセッションでソートするようにリストを変更し、これをウィジェットに表示したい場合、グラフエディタに "Impacted Sessions” も選択または追加する必要があります。

### Logs

#### グループ化

ログについては、以下でグループ化することができます。

* パターン
* トランザクション

### RUM イベントリストオプション

#### ソート方法

RUM については、以下でソートすることができます。

* セッションタイプ
* 使用時間
* 表示回数
* エラー数
* アクション数
* セッションフラストレーション数
* 初期ビュー名
* 最終ビュー名

昇順または降順

### イベント

#### レポートフォーマットのサイズ:

イベントについては、ウィジェットでの表示方法を選択することができます。

* 小 (タイトルのみ)
* 大 (イベント全体)

## API

このウィジェットは **[Dashboards API][1]** で使用できます。[ウィジェット JSON スキーマ定義][2]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/dashboards/
[2]: /dashboards/graphing_json/widget_json/
