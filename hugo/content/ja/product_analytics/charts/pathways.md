---
aliases:
- /ja/real_user_monitoring/product_analytics/sankey
- /ja/product_analytics/sankey
- /ja/product_analytics/journeys/sankey
- /ja/product_analytics/journeys/pathways
further_reading:
- link: /product_analytics/journeys
  tag: ドキュメント
  text: チャート
- link: /dashboards/widgets/sankey/
  tag: ドキュメント
  text: ダッシュボードで Sankey ウィジェットを作成する
title: Pathways
---
## 概要{#overview}

Pathways ダイアグラムを使用すると、アプリケーション全体でのすべてのユーザージャーニーを可視化し、クリティカルパスを分析できます。

{{< img src="/product_analytics/journeys/pathways/ga_pathway_diagrams_page.png" alt="アプリのデフォルトの Pathways ダイアグラム" style="width:90%;" >}}

各ノードは、ユーザーが訪問したビューを表します。各ノードの太さは、そのページでのユーザーセッション数を表します。訪問者が少ないページは、ダイアグラム内のノードが細く表示されます。

1 人のユーザーがセッション中に同じページを複数回訪問した場合、そのページは 1 回のみカウントされます。

アクションイベントは、Pathways ダイアグラムではサポートされていません。

## Pathways ダイアグラムを作成する{#build-a-pathways-diagram}

### デフォルトのダイアグラムを表示する{#view-the-default-diagram}

1. [{{< ui >}}Product Analytics{{< /ui >}} > {{< ui >}}Charts{{< /ui >}}][1] に移動します。
2. 選択されていない場合は、{{< ui >}}Pathways{{< /ui >}} をクリックします。これにより、アプリケーション内で最も一般的なユーザーのジャーニーを表すデフォルトの可視化が表示されます。

### 特定のビューを使ってダイアグラムを開始または終了する{#start-or-end-the-diagram-at-a-given-view}

左側のメニューを使用して、このダイアグラムをカスタマイズし、次の内容を表示できます。
- 特定のビューを訪問した*後*にユーザーがたどったステップ
- 特定のビューを訪問する*前*にユーザーがたどったステップ

次の例は、米国のユーザーが `/department/lighting` を訪問した後にたどる 4 つのステップを示しています。

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img2.png" alt="アプリ用にカスタマイズされた Pathways ダイアグラム" style="width:90%;" >}}

### 特定のフレーズを含むすべてのビューをグラフ化する{#graph-all-views-containing-a-given-phrase}

Pathways ダイアグラムは [Datadog ワイルドカード][2] をサポートしており、特定のフレーズを含むすべてのビューを対象としたダイアグラムを作成できます。

複数のルートを一致させるには、単一のビュー名を選択する代わりにワイルドカードを入力します。次の例は、ユーザーが `/department/*` に一致するビューを訪問した後にたどる 5 つのステップを示しています。

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img3.png" alt="ワイルドカードを使って複数のルートに一致させた Pathways ダイアグラム" style="width:90%;" >}}

## Pathways ダイアグラムを分析する{#analyze-a-pathways-diagram}

ダイアグラムのノードにカーソルを合わせると、そのビューへのアクセスが含まれるセッション数を確認できます。

ノードをクリックすると、サンプルの [Session Replay][3] の表示や、そのビューから始まる Pathways ダイアグラムの作成など、分析オプションのリストが表示されます。

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img4.png" alt="Pathways ダイアグラムノードのアクションメニュー" style="width:90%;" >}}

### ダイアグラムをファネルに変換する{#convert-the-diagram-to-a-funnel}

1. Pathways ダイアグラムページから、{{< ui >}}Build Funnel{{< /ui >}} ボタンをクリックします。
2. Pathways ダイアグラムで、ファネルに含めるビューのノードをクリックします。
3. {{< ui >}}Create Funnel From Selection{{< /ui >}} をクリックします。

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img5.png" alt="Pathways からファネルへの変換処理" style="width:90%;" >}}

## 関連資料{#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/user-journey/pathways
[2]: /ja/real_user_monitoring/explorer/search_syntax/#wildcards
[3]: /ja/session_replay/