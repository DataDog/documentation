---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: ドキュメント
  text: イベント検索
kind: documentation
title: 視覚化
---

## 概要

視覚化は、[RUM エクスプローラー][1]に表示されるフィルターと集計の結果を定義するものです。検索クエリで必要な情報を表示するために、関連する視覚化の種類を選択します。

## リスト

リストは、イベントの結果をページ分割したもので、個々の結果が重要な場合に最適です。リストを使うのに、一致する結果を定義するための予備知識は必要ありません。

{{< img src="real_user_monitoring/explorer/visualize/rum_explorer_lists.mp4" alt="RUM エクスプローラー内のリスト" video="true" style="width:70%;" >}}

検索した情報は、列で表示されます。以下の管理が可能です。

- 1 行目に利用可能なインタラクションを表示した表。列のソート、並べ替え、削除が可能です。
- 左側のファセットパネル、または右側の RUM [イベントサイドパネル][2]。フィールドの列を追加することができます。

デフォルトでは、リスト視覚化の RUM イベントはタイムスタンプで整理され、最新のイベントが最初に表示されます。イベントは、ファセットなど、任意の方法で並べ替えることができます。メジャーの最小値または最大値を持つ RUM イベントを最初に表示し、次にファセットの一意の値でイベントを辞書順に並べ替えます。これは、ファセットに従って列を並べ替えます。

列に属性やタグを追加することはできますが、Datadog は最初に[ファセットを宣言][3]している場合、テーブルをソートすることを推奨しています。テーブル上の行項目のカスタム属性の値を見るために、列にファセットでない属性を追加することはできますが、正しくソートされない場合があります。

RUM イベントテーブルの構成は、トラブルシューティングコンテキストの追加要素とともに[保存ビュー][4]に保存されます。

## Timeseries

選択したタイムフレーム内での 1 つのメジャー (または[ファセット][5]のユニーク値数) の動きを可視化し、オプションで、使用可能な[ファセット][5]で分割します。

{{< img src="real_user_monitoring/explorer/visualize/timeseries.png" alt="RUM エクスプローラーの時系列グラフ" style="width:80%;" >}}

時系列グラフは、Shopist アプリケーションのページビュー数の推移を、ビューパスごとに過去 1 日間に渡って示したものです。

以下などの追加表示オプションを選択することができます。

- Display: 結果は、棒グラフ (カウントやユニークカウントに推奨)、線グラフ (統計的集計に推奨)、面グラフで表示され、いくつかのカラーセットが利用可能です。
- The roll-up interval: 棒グラフのバケット幅を指定します。

## Toplist

選択したメジャーに基づくファセットから上位の値を視覚化します。

{{< img src="real_user_monitoring/explorer/visualize/top_list.png" alt="RUM エクスプローラーの上位リストの棒グラフ" style="width:80%;" >}}

上位リストには、直近 1 日間に Shopist のウェブサイトを訪問した際に使用されたブラウザの上位 10 個が含まれます。

## ネストされたテーブル

選択した[メジャー][5] (リストで選択した最初のメジャー) に基づいて最大 3 つの[ファセット][5]から上位の値を可視化し、テーブルの値に現れる要素に対して他のメジャーの値を表示します。検索クエリを更新したり、いずれかのディメンションに対応する RUM イベントを調べたりすることができます。

* メジャーが複数ある場合、最初のメジャーに応じて上位または下位リストが決定されます。
* サブセット（上位または下位）のみが表示されるため、小計がグループ内の実際の合計値とは異なる場合があります。このディメンジョンに対する、値が null または空欄のイベントは、サブグループとして表示されません。

 **注**: 単一のメジャーと単一のディメンジョンで使用されるテーブルの可視化は、表示が異なりますが、[上位リスト](#top-list)と同じです。

 次の RUM 分析テーブルは、**2 つの国**の**上位 5 の URL パス**です。つまり、**ユニークなセッション ID** の量と、90 パーセンタイルの**期間**に基づく、過去 1 日間の米国と日本の分析結果を示しています。

{{< img src="real_user_monitoring/explorer/visualize/nested_table.png" alt="RUM エクスプローラーのネストされたテーブル" style="width:90%;">}}

## ディストリビューション

選択した時間帯のメジャー属性の分布を表示し、値の変動を確認することができます。

{{< img src="real_user_monitoring/explorer/visualize/distribution.png" alt="RUM エクスプローラーの分布グラフ" style="width:90%;">}}

分布グラフは、Shopist ランディングページのユーザー体験を測定する Largest Contentful Paint の分布を表示します。

## ジオマップ

世界地図上で単一の[メジャー][5] (または[ファセット][5]の一意の値のカウント) を視覚化します。

{{< img src="real_user_monitoring/explorer/visualize/geomap.png" alt="RUM エクスプローラーの地形図" style="width:90%;">}}

RUM Analytics ジオマップは、過去 1 日間の **Largest Contentful Paint** の 75 パーセンタイルを示しています。

## 関連イベント

[ファネル](#funnel)以外のすべての視覚化では、グラフのセクションを選択するか、グラフをクリックしてズームインするか、選択した項目に対応するイベントのリストを表示します。

{{< img src="real_user_monitoring/explorer/visualize/related_events.png" alt="グラフをクリックすると、関連イベントリンクが表示されます" width="80%" >}}

ファネルグラフの場合、グラフをクリックすると、クエリに対応するコンバージョンされたセッションとドロップオフされたセッションのリストが表示されます。

残りの視覚化オプションについては、グラフをクリックし、**View events** をクリックすると、選択した項目に対応するイベントのリストが表示されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/explorer/
[2]: /ja/real_user_monitoring/explorer/events/
[3]: /ja/logs/explorer/facets/
[4]: /ja/real_user_monitoring/explorer/saved_views/
[5]: /ja/real_user_monitoring/explorer/search#setup-facets-and-measures
[6]: /ja/notebooks
[7]: /ja/real_user_monitoring/explorer/export/