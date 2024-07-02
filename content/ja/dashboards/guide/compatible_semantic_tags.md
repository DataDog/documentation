---
title: Compatible semantic tags
aliases:
- /dashboards/guide/semantic_colors
further_reading:
- link: "/dashboards/guide/widget_colors/#categorical-palettes"
  tag: Documentation
  text: Selecting the right colors for your graphs
---

## 概要

互換性のある一連のデータについて、Datadog は色と意味を対応させることができます。互換性のあるタグが検出されると、Datadog はセマンティックカラーパレットを提案します。これにより、データを意味主導の色に自動的にマッピングします。

**注**: セマンティックカラーパレットを使用するには、クエリが 1 つのタグでグループ化されている必要があります。

### 互換性のあるタグを、その意味に基づいて色にマッピングする

例えば、エラーステータスコードは赤、成功は緑にマッピングされます。

{{< img src="/dashboards/guide/compatible_semantic_tags/semantic_option.png" alt="グラフエディターにおけるセマンティックカラーオプション" style="width:100%;" >}}

### チャート間で一貫した色付けにする

セマンティックパレットを使用したグラフでは、各タグに同じ安定した色を使用します。これにより、異なるグラフ間で指定されたタグを簡単に追跡することができます。

### グループ化の挙動

単一のタグセットでグループ化されたクエリがサポートされます。セマンティックパレットで複数のグルーパーを使用した場合、色付けは一貫して行われますが、意味づけはされません。

{{< img src="/dashboards/guide/compatible_semantic_tags/multiple_tags.png" alt="セマンティックパレットを用いた複数タググラフの例" style="width:100%;" >}}

例えば、`Status` タグと `Service` タグの両方を使用したクエリを考えてみましょう。セマンティックパレットが選択されていても、チャートの色はもはや特定の意味に対応していません (赤が必ずしも「悪い」ことを示すわけではない、というように)。ただし、ステータスとサービスの組み合わせは、すべてのチャートで一貫した色付けが維持されます。

## 対応するタグキー

{{% semantic-color %}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}