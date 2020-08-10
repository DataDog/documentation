---
title: セキュリティシグナルエクスプローラー
kind: ドキュメント
description: すべてのセキュリティシグナルを検索し、セキュリティ分析を実施
further_reading:
  - link: 'https://www.datadoghq.com/blog/announcing-security-monitoring/'
    tag: ブログ
    text: セキュリティモニタリング
  - link: /security_monitoring/detection_rules/
    tag: ドキュメント
    text: 検出ルール
---
{{< img src="security_monitoring/explorer/sse_diagram2.png" alt="セキュリティシグナルエクスプローラー"  >}}

[セキュリティシグナルエクスプローラー][1]から、セキュリティシグナルの関連付けと選別を行います。

このビューで、以下を行うことができます。

* [セキュリティシグナルの探索](#explore-your-security-signals)
* [セキュリティシグナルの検査](#inspect-a-security-signal)
* [セキュリティシグナル分析の表示](#visualize-your-security-signals-analytics)

## セキュリティシグナルの探索

セキュリティシグナルの検索結果が、セキュリティシグナルテーブルに表示されます。

{{< img src="security_monitoring/explorer/ss_table.png" alt="セキュリティシグナルテーブル"  >}}

テーブルのコンテンツを、使用可能なファセットのリストで絞り込むことができます。右上に表示される _Options_ ボタンを使用して、セキュリティシグナルテーブルのコンテンツを要件や好みに応じて構成できます。

## セキュリティシグナルの検査

セキュリティシグナルをクリックすると、セキュリティシグナルパネルが開いて詳細が表示されます。

{{< img src="security_monitoring/explorer/signal_1.png" alt="セキュリティシグナル"  >}}

問題を選別する際に最初に必要になる情報が、セキュリティシグナルパネルの最上部に表示されます。これらの情報から、シグナルの重要度や生成日時を判断したり、規則の設定にアクセスしたり、シグナルをチームメイトとすばやく共有したりできます。

FIRST SEEN と LAST SEEN の日時は更新され、過去にないデータが新しく表示されているのか、それとも攻撃が続いているのかを確認できます。また、何を基準にグループ化しているかも、このセクションに表示されます。この例では、`usr.name` でグループ化するように規則が構成されています。その下には、規則に設定されたタグが表示されています。

{{< img src="security_monitoring/explorer/signal_2.png" alt="セキュリティシグナル"  >}}

シグナルの大まかな説明の下には、シグナルの詳細情報を含む 3 つのタブがあります。1 つ目のタブは `Message` で、シグナルの目的や対応方法について理解するためのテキストが表示されます。2 つ目のタブは `Samples` で、ログのサンプルが表示され、シグナルがトリガーされた理由についてコンテキスト情報を得ることができます。サンプルをクリックすると、ログ全体が表示されます。3 つ目のタブは `Related Signals` で、シグナルのトリアージに役立つ値別グループを含む、他のシグナルのリストが表示されます。

## セキュリティシグナル分析の表示

ページの左上隅にある _Signal Mode_ ボタンをクリックすると、セキュリティシグナルテーブルとセキュリティシグナル分析の間でモードが切り替わります。

{{< img src="security_monitoring/explorer/visualize_analytics1.png" alt="分析を表示"  >}}

セキュリティ規則エンジンによってセキュリティシグナルが生成されたら、セキュリティシグナルのクエリをグラフ化して、最大値、最小値、パーセンタイル、ユニーク数などを確認できます。

すべてのグラフ作成オプションについては、[ログのグラフ作成ガイド][2]を参照してください。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/security
[2]: /ja/logs/explorer/analytics/?tab=timeseries