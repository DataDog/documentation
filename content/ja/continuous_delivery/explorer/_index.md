---
description: デプロイメント実行のための CD Visibility Explorer について説明します。
further_reading:
- link: /continuous_delivery/deployments/
  tag: ドキュメント
  text: Deployment Visibility について
- link: /continuous_delivery/explorer/saved_views
  tag: ドキュメント
  text: 保存ビューについて
title: Continuous Delivery Visibility Explorer
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="プレビューに参加しませんか？" >}}
CD Visibility はプレビュー段階です。この機能に興味がある場合は、フォームにご記入いただき、アクセスをリクエストしてください。
{{< /callout >}}

## 概要

[CD Visibility Explorer][4] では、任意のタグを使用して、デプロイメント実行を複数のレベルで[検索とフィルター](#search-and-filter)、[分析](#analyze)、[視覚化](#visualize)、[エクスポート](#export)することができます。

{{< img src="continuous_delivery/explorer/deployment_executions_2.png" alt="CD Visibility Explorer に表示されるデプロイメント実行結果" width="100%" >}}

## 検索とフィルター

左側のファセットをクリックするか、検索バーに独自のカスタムクエリを記述することで、デプロイメント実行のサブセットに焦点を絞ったり、範囲を広げたり、視点を切り替えたりできます。ファセットを選択または選択解除すると、検索バーに変更が自動的に反映されます。同様に、検索バーのクエリを変更するか、検索バーにクエリをゼロから記述して、左側のファセットを選択または選択解除できます。

- デプロイメント実行の検索方法については、[検索と管理][1]を参照してください。
- クエリの作成方法については、[検索構文][2]を参照してください。

## 分析

クエリしたデプロイメントを、フィールド、パターン、トランザクションなどの上位エンティティにグループ化して、情報を取得・統合します。[ファセット][3]は属性の検索に必須ではありませんが、次のようなアクションを実行できます。

- 環境におけるデプロイメントの検索および進捗の追跡
- すべてのデプロイメント結果を調査して、失敗したデプロイメントを特定し、トラブルシューティング

## 視覚化

視覚化タイプを選択してフィルターや集計結果を表示し、デプロイメント実行をより深く理解する。例えば、デプロイメント結果をリストで表示し、デプロイメントデータを列に整理します。または、デプロイメント結果を時系列グラフで表示し、時間経過によるデプロイメントデータを測定します。

## エクスポート

[CD Visibility Explorer][4] の[ビュー][5]をエクスポートすると、後で別のコンテキストで再利用できます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_delivery/search
[2]: /ja/continuous_delivery/explorer/search_syntax
[3]: /ja/continuous_delivery/explorer/facets
[4]: https://app.datadoghq.com/ci/deployments/executions
[5]: /ja/continuous_delivery/explorer/saved_views