---
aliases:
- /ja/real_user_monitoring/product_analytics/sankey
- /ja/product_analytics/sankey
- /ja/product_analytics/journeys/sankey
- /ja/product_analytics/journeys/pathways
further_reading:
- link: /product_analytics/journeys
  tag: ドキュメント
  text: グラフ
- link: /dashboards/widgets/sankey/
  tag: ドキュメント
  text: ダッシュボードで Sankey ウィジェットを構築する
title: Pathways ダイアグラム
---

## 概要

Pathways ダイアグラムを利用すると、アプリケーション全体にわたるすべてのユーザー ジャーニーを可視化し、クリティカル パスを分析できます。

{{< img src="/product_analytics/journeys/pathways/ga_pathway_diagrams_page.png" alt="アプリ用のデフォルトの Pathways ダイアグラム" style="width:90%;" >}}

各ノードは、ユーザーが訪問したビューを表します。各ノードの太さは、そのページを含むユーザー セッション数を表します。訪問者が少ないページほど、ダイアグラム上のノードは細くなります。

ユーザーがセッション中に同じページを複数回訪問した場合、そのページは 1 回しかカウントされません。

Pathways ダイアグラムでは、アクション イベントはサポートされません。

## Pathways ダイアグラムの構築

### デフォルトのダイアグラムを表示する

1. [**Product Analytics > Charts**][1] に移動します。
2. まだ選択されていない場合は、**Pathways** をクリックします。これにより、アプリケーションで最も人気のあるユーザー ジャーニーを表すデフォルトの視覚化が表示されます。

### 指定したビューでダイアグラムを開始または終了する

左側のメニューを使用してこのダイアグラムをカスタマイズし、次を表示できます:
- ユーザーが特定のビューを訪問した*後*に辿った経路
- ユーザーが特定のビューを訪問する*前*に辿った経路

下の例では、米国のユーザーが `/department/lighting` にアクセスした後に辿る 4 つのステップが表示されています。

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img2.png" alt="アプリ用のカスタマイズされた Pathways ダイアグラム" style="width:90%;" >}}

### 指定したフレーズを含むすべてのビューをグラフ化する

Pathways ダイアグラムは [Datadog ワイルドカード][2] をサポートしており、指定したフレーズを含むすべてのビューのダイアグラムを作成できます。

複数の経路にマッチさせるには、単一のビュー名を選択するのではなく、ワイルドカードを入力します。下の例では、`/department/*` に一致するビューにアクセスした後にユーザーが辿る 5 つのステップが表示されます。

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img3.png" alt="複数の経路にマッチするようにワイルドカードを使用した Pathways ダイアグラム" style="width:90%;" >}}

## Pathways ダイアグラムの分析

ダイアグラム ノードにカーソルを合わせると、そのビューへの訪問を含むセッション数を表示できます。

ノードをクリックすると、サンプル [Session Replay][3] の表示や、そのビューを始点とする Pathways ダイアグラムの構築など、分析オプションの一覧が表示されます。

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img4.png" alt="Pathways ダイアグラム ノードのアクション メニュー" style="width:90%;" >}}

### ダイアグラムをファネルに変換する

1. Pathways ダイアグラム ページで、**Build Funnel** ボタンをクリックします。
2. Pathways ダイアグラムで、ファネルに含めたいビューのノードをクリックします。
3. **Create Funnel From Selection** をクリックします。

{{< img src="/product_analytics/journeys/pathways/pana_pathway_page_img5.png" alt="Pathway からファネルへの変換処理中" style="width:90%;" >}}

## 参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/user-journey/pathways
[2]: /ja/real_user_monitoring/explorer/search_syntax/#wildcards
[3]: /ja/product_analytics/session_replay/