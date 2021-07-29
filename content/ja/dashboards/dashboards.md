---
title: ダッシュボードレイアウト
kind: documentation
aliases:
  - /ja/graphing/dashboards/dashboard/
  - /ja/graphing/dashboards/dashboard/
  - /ja/dashboards/dashboard/
  - /ja/dashboards/
  - /ja/dashboard/
further_reading:
  - link: /dashboards/template_variables/
    tag: ドキュメント
    text: テンプレート変数を使用してダッシュボードを強化
  - link: /dashboards/sharing/
    tag: ドキュメント
    text: Datadogの外部でグラフを共有
  - link: /dashboards/widgets/
    tag: ドキュメント
    text: ダッシュボードで利用可能なすべてのウィジェット
---
ダッシュボードは、画像、グラフ、ログなどのさまざまなオブジェクトを含めることができる次世代のグリッドベースのレイアウト上にあります。これは通常、ステータスボードやストーリーテリングビューとして使用され、リアルタイムで更新したり、過去の定点を表したりすることができます。また、デバッグにも適しています。

[タイムボードレイアウト][1]からダッシュボードレイアウトに切り替えるには、歯車メニューの `Pick Layout` を使用して `Grid` を選択します。

{{< img src="dashboards/grid-layout.png" alt="ダッシュボードのグリッドレイアウトオプション"  style="width:70%;">}}

#### 高密度モード

高密度モードでは、ウィジェットの密度を高めるために、ダッシュボードにグループウィジェットが並べて表示されます。このモードは、グループウィジェットを使用するダッシュボードの大画面でデフォルトでオンになります。

{{< img src="dashboards/high-density-mode.png" alt="高密度モードディスプレイ"  style="width:90%;">}}

## 検索

オーバーレイ検索オプションについては、[タイムボードのドキュメント][2]を参照してください。

## グラフメニュー

グラフメニューのオプションについては、[タイムボードのドキュメント][3]を参照してください。

## ヒントとコツ

- ウィジェットアイコンをクリックして、ドラッグせずにダッシュボードに追加します (キーボードショートカットの `N` と `shift+N` でも可能)
- ウィジェットの左下または右下のサイズ変更ハンドルをダブルクリックして、隣接する空のスペースを即座に埋めます
- なげなわツールを使用するには、空のスペースをクリックしてドラッグします
- 複数のウィジェットを選択すると、一括アクションを含むアクションメニューが表示されます
- `cmd+G` または `ctrl+G` を押して、選択したウィジェットをグループ化します 
- ダッシュボードヘッダーの歯車メニューを使用して、ダッシュボード上のすべてのグループを開いたり折りたたんだりします


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/timeboards
[2]: /ja/dashboards/timeboards/#search
[3]: /ja/dashboards/timeboards/#graph-menu