---
title: ログパターン
kind: documentation
description: ログパターンを見つける
aliases:
  - /ja/logs/patterns
further_reading:
  - link: 'https://www.datadoghq.com/blog/log-patterns/'
    tag: ブログ
    text: 'ログパターン: 自動的にログをまとめて迅速に調査する'
  - link: logs/explorer/analytics
    tag: Documentation
    text: ログ分析の実行
  - link: logs/processing
    tag: Documentation
    text: ログの処理方法
  - link: logs/explorer/saved_views
    tag: Documentation
    text: ログエクスプローラーの自動構成
---
## 概要

大量のログデータを調査するには、膨大な時間がかかることがあります。調査に数時間かけても、ログの一部しか解析できないこともあります。しかし、アプリケーションログの内容は、一部が異なるだけで、ほかはほぼ同じであることがよくあります。これを *パターン* と呼びます。

ログエクスプローラーでは、パターンを自動的に表面化し、問題を浮き彫りにすることができます。これは、重要な事項をすばやく明らかにすると共に、無関係な事項を除外します。

{{< img src="logs/explorer/patterns/log_patterns_nav.png" alt="Log Patterns に移動"  style="width:50%;">}}

パターンビューは、他の問題を見逃すことがないように、ノイズが多いエラーパターンを検出してフィルタリングするために役立ちます。パターンと一致するログの数が、サービスやステータスに基づいて分割されて表示されます。

## ログの傾向と新しいパターンの表示

パターンビューに切り替えると、選択したコンテキストに対して Log Patterns が自動的に表示されます。[コンテキスト][1]は、タイムレンジと検索クエリで構成されます。各パターンは、特徴的な性状をすぐに把握できるように、ハイライト付きで表示されます。

* ミニグラフには、ログ量が大まかなタイムラインで表示され、そのパターンが他のパターンとどのように異なるかを特定するために役立ちます。
* パターンの中で変化があるログセクションはハイライトされ、ログ行間の違いをすばやく特定できます。

パターンをクリックすると、そこに含まれるログのサンプルが表示され、最終的には 1 つのログ単位で表示できます。

{{< img src="logs/explorer/patterns/patterns_overview.mp4" alt="Log Patterns" video="true"  width="90%" >}}

**注**: パターンは、10,000 個のログサンプルに基づいて検出されます。ログを一部分に制限してパターンを表示するには、検索を絞り込みます。

## パターンアクション

{{< img src="logs/explorer/patterns/patterns_action.png" alt="Log Patterns Actions"  style="width:80%;">}}

パターンを選択するとコンテキストパネルが開き、そこに含まれるログのサンプルが表示されます。右上にボタンが 3 個表示されます。

* **Parsing Rule**: このパターンに関連付けられた、自動生成されたパース規則を表示（下図参照）。
* **View All**: パターンクエリに一致するすべてのログを表示。
* **Graph**: このパターンの経時的な動きをグラフ化。

{{< img src="logs/explorer/patterns/patterns_parsing.png" alt="Log Patterns パース規則"  style="width:80%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/#context