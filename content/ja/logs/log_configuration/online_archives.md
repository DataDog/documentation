---
description: ログの長期保存に対応したコスト効率の高いライブクエリ機能
further_reading:
- link: /logs/log_configuration/indexes/#indexes-filters
  tag: ドキュメント
  text: インデックスフィルター
- link: /logs/log_configuration/indexes/#exclusion-filters
  tag: ドキュメント
  text: 除外フィルター
- link: https://www.datadoghq.com/blog/online-archives-datadog/
  tag: ブログ
  text: Online Archives による履歴ログ解析・調査
is_beta: true
private: true
title: Online Archives
---

<div class="alert alert-warning">
Online Archives は、数に限りがあります。アクセス権をリクエストする場合は、<a href="/help/">Datadog サポート</a>にお問い合わせください。
</div>

## 概要

Online Archives は、Datadog のログを 15 ヶ月以上保存し、ライブクエリ、分析機能を提供するログウェアハウスソリューションです。

セキュリティ、コンプライアンス、エンジニアリングの各チームは、多くの場合、大規模な時間軸でログを照会する必要があります。セキュリティ侵害は、数ヶ月ではないにしても数週間後に発見されることが多く、法令遵守のレビューや監査プロセスでは、1 年以上前のログを必要とする場合もあります。しかし、長期的な分析要件は、セキュリティチームだけに限定されるものではありません。ユーザー、ホスト、IP アドレスなど、何百万ものエンティティについて、高いカーディナリティ、前年比、長期的な分析を行うエンジニアリングチームには、ストレートメトリクスよりもログが適しています。

Online Archives では、すべてのログデータを 15 ヶ月以上保持し、検索することができます。セキュリティ、コンプライアンス、エンジニアリングの各チームは、セキュリティ監査のような過去の調査や分析を必要とするユースケースに対応したり、長期にわたる特別な高基準の傾向を分析したり、メトリクスからシステムフォレンジックを、ログデータからアプリケーションやユーザーの行動と関連付けることができます。

## Online Archives を有効にする

Online Archives は、Log インデックスごとに設定されています。そのインデックスに適用される[インデックスフィルター][1]は、Online Archives にも適用されます。

**注**: ただし、そのインデックスの[除外フィルター][2]と 1 日のクォータは、Online Archives には適用されません。例えば、エラー以外のログをインデックスから除外することで、すべてのログを Online Archives に保持しながら、エラーログのみをインデックスにすることができます。

[Logs Index Configuration][3] ページで Online Archives を構成します。

1. [**Logs > Configuration > Indexes**][3] に進みます。
2. Online Archives で有効にしたいインデックスを編集します。
3. インデックスコンフィギュレーションのステップ 3 で Online Archives を有効にします。

{{< img src="logs/log_configuration/online_archives/enabling.png" alt="ログのアーカイブを有効にする方法" style="width:100%;">}}

## Online Archives で検索する

ログエクスプローラーのドロップダウンから Online Archives を選択すると、インデックスではなく Online Archives での検索を開始します。このドロップダウンは、タイムピッカーの隣にあります。タイムピッカーでは、事前設定オプションで最大 3 か月まで選択できるほか、カレンダービューで過去にさかのぼって検索できます。


{{< img src="logs/log_configuration/online_archives/searching.png" alt="オンラインアーカイブの検索方法" style="width:100%;">}}

[検索][4]は、検索バーにクエリを入力するか、ファセットパネルで該当するファセットを選択することで行います。

**注**: 
- オンラインアーカイブのログは、ダッシュボード、ノートブック、モニターへはエクスポートできません。
- 「トランザクション」および「パターン」のビューは、オンラインアーカイブでは利用できません。

## Online Archives における Analytics

**Group into Fields** または **Visualize as Timeseries/Top List/Table** を選択し、Analytics に切り替えます。

ストレージタイプを **Online Archives** に設定すると、インデックスの代わりに Online Archives にクエリを発行することができます。いつでも **Indexes** に戻すことができます。

## Online Archives とインデックスへのログの選択的送信

ログの属性やタグに基づいて、特定のログを Online Archives に送り、他のログをインデックスに送るように設定することができます。ログの使用例や保存戦略に応じて、ストレージタイプ間でログを混在させたり、組み合わせたりすることができます。

ストレージタイプを構成するには、Online Archives に適用されるインデックスフィルターを使用し、Online Archives に適用されないインデックス除外フィルターを使用します。

ここでは、さまざまなログ保持戦略の例とその実施方法について説明します。

### エンジニアリングチームは、すべてのログを Online Archives に保持しながら、インデックスのデバッグログをサンプリングしたい

1. フィルター `*` を持つすべてのログのインデックスを作成します。
2. このインデックスの Online Archives を有効にします。
3. インデックス `status:Debug` に、除外率を 90% に設定した除外フィルターを追加します。この除外フィルターは、インデックスにのみ適用されます。

{{< img src="logs/log_configuration/online_archives/retain.png" alt="インデックスからモノを除外する方法" style="width:100%;">}}

### セキュリティチームは、すべてのログを Online Archives に保存したくて、インデックスには保存したくない

1. セキュリティログ用のインデックスを `team:security` というフィルター付きで作成します。
2. このインデックスの Online Archives を有効にします。
3. インデックスに `*` 除外フィルターを追加して、インデックスからすべてのログをフィルタリングし、Online Archives からはフィルタリングしないようにします。

{{< img src="logs/log_configuration/online_archives/exclusion.png" alt="インデックスからモノを除外する方法" style="width:100%;">}}

### Online Archives を無効にする
Online Archives をオフにしたいインデックスを選択し、Online Archives のトグルをオフの位置に切り替えてください。

**注:** インデックスの順番は重要で、複数のインデックスがある場合、`team:security` のログはインデックスフィルターにマッチする最初のインデックスに入るからです。

[1]: /ja/logs/log_configuration/indexes/#indexes-filters
[2]: /ja/logs/log_configuration/indexes/#exclusion-filters
[3]: https://app.datadoghq.com/logs/pipelines/indexes
[4]: https://app.datadoghq.com/logs