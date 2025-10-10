---
aliases:
- /ja/continuous_integration/quality_gates/
description: Quality Gates とルール実行のための Quality Gates Explorer について説明します。
further_reading:
- link: /quality_gates/
  tag: ドキュメント
  text: Quality Gates について
- link: /quality_gates/explorer/saved_views/
  tag: ドキュメント
  text: 保存ビューについて
title: Quality Gates Explorer
---

## 概要

Quality Gates Explorer を使用すると、任意のタグを用いて複数のレベルで品質ゲートまたはルールの実行結果を[検索およびフィルター](#search-and-filter)、[可視化](#visualize)、および[エクスポート](#export)できます。

{{< tabs >}}
{{% tab "Gates" %}}

[**Software Delivery** > **Quality Gates** > **Quality Gate Executions**][101] に移動して、Quality Gates を確認してください。

{{< img src="/quality_gates/explorer/gates_3.png" text="Quality Gate ルールページ" style="width:100%" >}}

左側にある **Quality Gates** パネルには、ゲートを検索するために使用できるデフォルトのファセットが一覧表示されます。

| ファセット           | 説明                                                    |
|-----------------|---------------------------------------------------------------|
| ステータス       | Quality Gate のステータス: `Passed` または `Failed`                   |
| Gate ID      | Quality Gate の ID                                      |

## Quality Gate details

選択した期間にわたる品質ゲートの集計データを確認できます。調査したいゲートを表示するために、検索フィールドやファセットを使用してリストを絞り込みます。

### Quality Gate data

Quality Gate のデータはダッシュボードやノートブックでも利用可能で、ビルドエンジニアリングチームが重要な作業や CI のトレンドに関する情報を時系列でカスタマイズして共有できます。

[101]: https://app.datadoghq.com/ci/quality-gates/executions
[102]: https://app.datadoghq.com/dashboard/lists
[103]: https://app.datadoghq.com/notebook/list

{{% /tab %}}
{{% tab "ルール実行" %}}

[**Software Delivery** > **Quality Gates** > **Quality Gate Executions**][101] に移動して、Quality Gate ルールの実行結果を確認してください。

{{< img src="/quality_gates/explorer/rules_1.png" text="Quality Gates Rule Executions ページ" style="width:100%" >}}

左側にある **Quality Gates** パネルには、ルールの実行結果を検索するために使用できるデフォルトのファセットが一覧表示されます。

| ファセット           | 説明                                                    |
|-----------------|---------------------------------------------------------------|
| ステータス       | Quality Gate のステータス: `Passed` または `Failed`                   |
| Rule Name    | 特定のルールを識別するためのユーザー指定の名前                                    |
| Blocking Status | ルールのステータスが CI ワークフローの失敗を引き起こすかどうか (`true` または `false`)   |
| Creator      | Quality Gate ルールを作成したユーザー                                 |
| Data Source  | ルールで評価されるデータのソース (テスト、静的分析)                             |
| Gate ID      | Quality Gate の ID                                      |

## Rule executions details

選択した期間にわたるルール実行結果の集計データを確認できます。調査したい実行結果を表示するために、検索フィールドやファセットを使用してリストを絞り込みます。

### Rule execution data

Quality Gate ルールのデータは、[ダッシュボード][102]や[ノートブック][103]で利用できるため、ビルドエンジニアリングチームは重要な作業や CI のトレンドに関する情報を時系列でカスタマイズして共有できます。

[101]: https://app.datadoghq.com/ci/quality-gates/executions
[102]: https://app.datadoghq.com/dashboard/lists
[103]: https://app.datadoghq.com/notebook/list

{{% /tab %}}
{{< /tabs >}}

## 検索とフィルター

左側のファセットをクリックするか、検索バーに独自のクエリを記述することで、品質ゲートまたはルール実行結果のサブセットにフォーカスを絞ったり、広げたり、変更したりできます。ファセットを選択または解除すると、検索バーが自動的に変更内容を反映します。同様に、検索バーのクエリを編集したり、最初からクエリを記述したりすることも可能です。

- 品質ゲートのルール検索方法については、[Search and Manage][1] を参照してください。
- クエリの作成方法については、[検索構文][2]を参照してください。

## 分析

品質ゲートまたはルール実行結果を、より高いレベルのフィールド、パターン、トランザクションでグルーピングし、情報を導き出したり集約したりできます。属性を検索するだけであれば、あらかじめファセットを作成する必要はありません。[ファセット][3]を使用して以下を行えます。

- **Quality Gate の実行結果におけるトレンドやパターンの把握**: どのリポジトリやパイプラインが最も頻繁にブロックされているかを確認
- **Quality Gate ルール実行結果におけるトレンドやパターンの把握**: 組織全体でどの種類のルールが最も頻繁に失敗しているかを確認

## 可視化

フィルターや集計結果の可視化を選択して、品質ゲートまたはルール実行結果をより深く理解しましょう。たとえば、ゲートの結果をリスト形式で表示し、列にデータを整理したり、時系列グラフで表示して時間経過に伴うゲートの実行データを測定したりできます。

## エクスポート

[Quality Gates Explorer][5] で表示内容をエクスポートすると、後でまたは別のコンテキストで再利用できます。詳細については、[保存ビュー][4]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/quality_gates/search
[2]: /ja/quality_gates/explorer/search_syntax
[3]: /ja/quality_gates/explorer/facets
[4]: /ja/quality_gates/explorer/saved_views
[5]: /ja/quality_gates/explorer