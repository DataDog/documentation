---
description: クエリされたログをパターンにグループ化します。
further_reading:
- link: logs/explorer/
  tag: Documentation
  text: ログエクスプローラーについて
- link: logs/explorer/analytics
  tag: Documentation
  text: ログの分析方法
- link: https://www.datadoghq.com/blog/filter-logs-by-subqueries-with-datadog/
  tag: ブログ
  text: Subqueries を使ってログを動的にフィルタリングし、相関付ける
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: ブログ
  text: ネットワークとセキュリティ分析のための DNS ログの監視
title: ログをパターンにグループ化する
---

## 概要

デフォルトでは、 **Log Patterns** が `message` フィールドで類似した値を持つログをクラスター化し、結果を `Status` と `Service` でグループ化します。 

クラスター化や結果のグループ化に使うログ属性は、別のものを選択できます。

**Patterns** ビューは、他の問題を見落とす原因となるノイズの多いエラーパターンを検出し、フィルターするのに便利です。パターン検出は、10,000 のログサンプルに基づいています。ログの特定のサブセットに限定したパターンを見るために、検索を絞り込むことができます。

{{< img src="logs/explorer/pattern_cluster.png" alt="パターンでグループ化されたログを表示する Log Explorer" style="width:90%;" >}}

パターンは、[リスト][1]の視覚化をサポートします。リスト内のパターンをクリックすると、パターンのサイドパネルが開き、次のことができます。

- そのパターンからログのサンプルにアクセスする
- 検索フィルターを追加して、このパターンからのログのみにスコープを絞る
- [grok パースルール][2]のキックスタートを取得して、そのパターンの構造化された情報ログを抽出する

{{< img src="logs/explorer/patterns_side_panel.jpg" alt="すべて表示ボタンとパースルールがハイライトされた状態のログサイドパネル" style="width:90%;" >}}

## Pattern Inspector

パターンインスペクターを使用すると、検索クエリに基づくログパターンの集計の基礎となる値を視覚化することができます。

{{< img src="logs/explorer/group/pattern_inspector_values.png" alt="数値の分布を棒グラフで示したグラフ" style="width:90%;" >}}

例えば、問題を調査する場合、何台のホストが関係しているか、どの地域やデータセンターが影響を受けているかを確認することができます。

1. [ログエクスプローラー][3]に移動します。
2. **Group into** セクションの **Patterns** をクリックします。パターンのリストでは、メッセージセクションの集計値が黄色でハイライトされています。集計値の上にカーソルを置くと、その値の視覚的な分布のプレビューが表示されます。
3. 集計値をクリックすると、ログパターンのサイドパネルが開き、**Pattern Inspector** タブで詳細を見ることができます。

{{< img src="logs/explorer/group/pattern_inspector_panel_1.png" alt="Pattern Inspector タブを表示したパターンパネル" style="width:90%;" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/visualize/#list-aggregates-of-logs
[2]: /ja/logs/log_configuration/processors/#grok-parser
[3]: https://app.datadoghq.com/logs