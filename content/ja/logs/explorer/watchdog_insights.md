---
title: ログ用 Watchdog Insights
kind: documentation
description: 調査を開始またはフォローアップする地点に関するインサイトを得る
further_reading:
  - link: 'https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/'
    tag: ブログ
    text: Watchdog Insights を使用してログ調査を加速します
  - link: logs/explorer/side_panel
    tag: Documentation
    text: ログサイドパネル
  - link: 'logs/explorer/#list-of-logs'
    tag: Documentation
    text: ログのリストビュー
---
## 概要

Watchdog Insights を使用すると、ログを探索するときに受け取るコンテキストインサイトの問題の根本原因にすばやく到達できます。 Watchdog Insights は、専門知識やひらめきを補完し、トラブルシューティングの注意をどこに集中できるかを判断します。

<div class="alert alert-warning">
ログエクスプローラーの Watchdog Insights はベータ機能であり、ログ管理を使用してお客様に展開されます。フィードバックがある場合は、<a href="https://docs.datadoghq.com/help">Datadog サポート</a>にお問い合わせください。
</div>

次の例では、Watchog Insights は、コンテナ化された Ruby アプリケーションの `version:2.9.7` が、特定の時間範囲で観察されるエラーのほとんどを引き起こすことを強調しています。

{{< img src="logs/explorer/watchdog_insights/overview.png" alt="Watchdog Insights" style="width:100%;" >}}

## Watchdog Insights の操作

Watchdog Insights バナーがログエクスプローラーの結果ページに表示され、現在のクエリに関連するインサイトが表示されます。

{{< img src="logs/explorer/watchdog_insights/banner_collapsed.png" alt="Watchdog Insights バナー (折り畳み)" style="width:100%;" >}}

インサイトの概要をすばやく確認するには、Watchdog Insight バナーを展開します。

{{< img src="logs/explorer/watchdog_insights/banner_expanded.png" alt="Watchdog Insights バナー (展開)" style="width:100%;" >}}

トラブルシューティングのインスピレーションをさらに深めるには、**View all** をクリックして Watchdog Insights サイドパネルを開きます。

{{< img src="logs/explorer/watchdog_insights/side_panel.png" alt="Watchdog Insights サイドパネル" style="width:100%;" >}}

各インサイトには、独自の組み込みインタラクションと詳細なトラブルシューティング資料を含むサイドパネルが付属しています。インサイトの相互作用とサイドパネルは、[Watchdog Insight のタイプ](#watchdog-insights-collections)によって異なります。


## Watchdog Insights コレクション


### エラー外れ値

エラー外れ値インサイトには、現在のクエリに一致するエラーの特徴であるフィールド (つまり、[ファセットタグまたは属性][1]) が表示されます。これにより、エラー間で統計的に大きな比率を占める `key:value` ペアを浮き彫りにし、問題の考えられる根本原因に関するヒントが得られます。

典型的なエラー外れ値の例は、`env:staging`、`docker_image:acme:3.1` `http.useragent_details.browser.family:curl` です。

* インサイトの**バナーカード**バージョンには、次の情報が表示されます。

  * フィールドの名前。
  * このフィールドが寄与しているエラーと全体的なログの割合。

{{< img src="logs/explorer/watchdog_insights/error_outlier_s_card.png" alt="エラー外れ値カード (S)" style="width:40%;" >}}

* インサイトの**サイドパネルカード**には、さらに次の情報が表示されます。

  * フィールドを持つエラーログのメイン[ログパターン][2]。

{{< img src="logs/explorer/watchdog_insights/error_outlier_l_card.png" alt="エラー外れ値カード (L)" style="width:60%;" >}}

* カードの**フルサイドパネル**には、さらに次の情報が表示されます。

  * フィールドを持つエラーログの時系列。
  * これらのログに関連付けられることが多いその他のフィールド。
  * これらのログの[ログパターン][2]の包括的なリスト。

{{< img src="logs/explorer/watchdog_insights/error_outlier_side_panel.png" alt="エラー外れ値サイドパネル" style="width:60%;" >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/facets/
[2]: https://docs.datadoghq.com/ja/logs/explorer/#patterns