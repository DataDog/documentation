---
aliases:
- /ja/graphing/widgets/funnel/
further_reading:
- link: /ja/dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
- link: /notebooks/
  tag: ドキュメント
  text: ノートブック
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: GitHub
  text: ファネル分析により、主要なユーザーフローを理解し、最適化する
title: ファネルウィジェット
---

ファネルウィジェットは、ユーザーのワークフローとエンドツーエンドのユーザージャーニーにおけるコンバージョン率を視覚化します。

{{< img src="dashboards/widgets/funnel/funnel.png" alt="EC サイトにおけるユーザーのドロップオフ率を視覚化するファネルウィジェット" >}}

## セットアップ

{{< img src="dashboards/widgets/funnel/funnel_setup.png" alt="ファネルウィジェット設定画面" >}}

### コンフィギュレーション

1. グラフ化するデータを選択します。
    * RUM: RUM クエリの構成については、[RUM イベントの検索のドキュメント][1]を参照してください。
2. **View** または **Action** を選択し、ドロップダウンメニューからクエリを選択します。
3. ファネルを視覚化するには、**+** ボタンをクリックし、ドロップダウンメニューから別のクエリを選択します。ファネル分析の視覚化の詳細については、[RUM 視覚化のドキュメント][2]を参照してください。

### オプション

#### グローバルタイム

スクリーンボードとノートブックの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、グローバルタイムフレームを使用するかを選択します。

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/explorer/search/
[2]: /ja/real_user_monitoring/funnel_analysis