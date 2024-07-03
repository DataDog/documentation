---
aliases:
- /ja/graphing/widgets/treemap/
description: Graph proportions of one or more datasets
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Building Dashboards using JSON
- link: /dashboards/widgets/pie_chart/
  tag: Documentation
  text: Pie Chart Widget
title: Treemap Widget
widget_type: treemap
---

The treemap widget allows you to display proportions of one or more datasets. This widget can display a single dataset with corresponding proportions, or multiple datasets with nested proportions.

{{< img src="dashboards/widgets/treemap/treemap_overview.png" alt="リアルユーザーモニタリング (RUM) データセットから得られたユニークなページビューを、国とブラウザレベルで表示したツリーマップウィジェットです。外側のグループ (色で区別) は、ユーザーの国を示しています。">}}

## 構成

1. 利用可能なデータソースから選択します。
2. クエリを構成します。詳しくは、次の資料をご覧ください。
    * メトリクス: メトリクスのクエリを構成するには、[クエリ作成][1]のドキュメントを参照してください。
    * イベント: ログイベントクエリの構成については、[ログ検索][2]に関するドキュメントを参照してください。
3. (オプション) [式][3]でクエリを修正します。
4. グラフをカスタマイズします。

## カスタマイズ

### コンテキストリンク

[コンテキストリンク][4]は、デフォルトで有効になっており、オンまたはオフに切り替えることができます。コンテキストリンクは、ダッシュボードウィジェットと他のページ (Datadog 内、またはサードパーティ製) の橋渡しをします。

## 表示とインタラクション

### フィルターとフォーカス

複数のデータ群を一度にプロットする場合、ウィジェットを 1 つのカテゴリーにフィルターし、その中での比率を表示することが可能です。

フィルタリングして 1 つのカテゴリーにフォーカスするには、カテゴリーの外側の部分にカーソルを合わせてクリックします。前のビューに戻るには、ウィジェットの左上のヘッダーにある **back** ボタンをクリックします。

{{< img src="dashboards/widgets/treemap/focus_animation.mp4" alt="ツリーマップウィジェットで、カテゴリーを 1 つずつフィルタリングして表示する方法をアニメーションで説明します。" video="true">}}

### コンテキストメニューにアクセスする

コンテキストメニューにアクセスするには、まず個々のカテゴリーにカーソルを合わせます。カテゴリーは、ネストしたカテゴリーやグループ (次の例では **Canada** や **Canada &gt; Edge** など) であることがあります。これにより、右上隅にドロップダウンボタンが表示されます。クリックすると、コンテキストメニューが表示されます。

{{< img src="dashboards/widgets/treemap/context_menu_dropdown.png" alt="カテゴリーにカーソルを合わせると、ドロップダウンボタンが表示されます">}}

### 全画面

ツリーマップウィジェットを全画面表示すると、標準の[全画面表示オプション][5]のセットが表示されます。

## 円グラフウィジェット

ツリーマップウィジェットのように、[円グラフウィジェット][8]もネストされた比率を表示するために使用することができます。両者の主な違いは、円グラフは放射状のスライスで比率を表示し、ツリーマップはネストされた長方形を表示する点です。

## API

このウィジェットは **[Dashboards API][6]** で使用できます。[ウィジェット JSON スキーマ定義][7]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/querying
[2]: /ja/logs/explorer/search_syntax/
[3]: /ja/dashboards/functions/
[4]: /ja/dashboards/guide/context-links/
[5]: /ja/dashboards/widgets/#full-screen
[6]: /ja/api/latest/dashboards/
[7]: /ja/dashboards/graphing_json/widget_json/
[8]: /ja/dashboards/widgets/pie_chart/