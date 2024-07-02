---
title: 検索構文
kind: documentation
description: Learn how to create a search query in the Synthetic Monitoring & Testing Results Explorer.
aliases:
  - /synthetics/explorer/search_syntax
  - /continuous_testing/explorer/search_syntax/
further_reading:
- link: /synthetics/explore/results_explorer
  tag: ドキュメント
  text: Learn about the Synthetic Monitoring & Testing Results Explorer
---

## 概要

クエリは条件と演算子で構成されます。

条件には 2 種類あります。

- **単一条件**は、1 つの単語です (`test`、`hello` など)。
- **シーケンス**は、二重引用符で囲まれた単語のグループです (`"hello dolly"` など)。

複合クエリで複数の条件を組み合わせるには、以下のブール演算子を使用します。

| 演算子 | 説明                                                                                        |
|--------------|------------------------------------------------------------------------------------------------------- |
| `AND`        | **Intersection**: 両方の項が選択されたビューに含まれます。演算子を使用しない場合、デフォルトで `AND` が使用されます。 |
| `OR`         | **和**: 選択されたビューからいずれかの条件を含む結果を検索します。                                             |
| `-`          | **除外**: ビューからこの条件を除いた結果を検索します。                                                  |

## オートコンプリート

検索バーのオートコンプリート機能を使用すると、既存の値でクエリを完成させることができます。

## 数値

特定の範囲内の数値属性を検索することができます。例えば、**Duration** ファセットで平均継続時間が 2～10 ナノ秒のすべてのバッチを取得します。検索クエリは `Duration:[2-10]` で更新されます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}
