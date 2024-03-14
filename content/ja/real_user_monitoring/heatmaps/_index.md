---
description: ヒートマップは、ユーザーが Web サイト上でどこをクリックしたかを視覚化するものです。
further_reading:
- link: /real_user_monitoring/session_replay/
  tag: ドキュメント
  text: セッション リプレイ
- link: https://www.datadoghq.com/blog/visualize-behavior-datadog-scrollmaps/
  tag: ブログ
  text: Datadog Heatmap の Scrollmap を使用して、ページに対するユーザーのインタラクションを視覚化する
kind: documentation
title: ヒートマップ
---

{{< img src="real_user_monitoring/heatmaps/heatmap_v2.png" alt="ヒートマップ機能の概要です。" style="width:100%;">}}

ヒートマップは、セッションリプレイデータにユーザーのインタラクションを重ねて視覚化したものです。RUM には 3 種類のヒートマップがあります。

- **Click map:** ユーザーのインタラクション (クリック) を表示し、ユーザーがあなたのページとどのように関わっているかを理解します
- **Top Element:** 特定のページで最もインタラクションがあった要素の上位 10 位までの順位を表示します。
- **Scroll map:** ページの平均折り返し位置など、ユーザーがページをどこまでスクロールしたかを表示します。平均折り返し位置とは、ユーザーがスクロールせずに閲覧できるページの最下部です。

ヒートマップを使用すれば、複雑なデータを一目で確認し、ユーザーエクスペリエンスの最適化に関する洞察を得ることができます。

## 前提条件

ヒートマップを始めるには

1. SDK のバージョンを確認します。
  - Click map を使用するには、最新バージョンの SDK (v4.40.0 以降) である必要があります。
  - Scroll map を使用するには、(v4.50.0 以降) である必要があります。
2. [セッションリプレイ][1]を有効にします。
3. SDK の初期化で `trackUserInteractions: true` を設定し、アクションの追跡を有効にします (Clickmap に必要）。

## はじめに

[ビューリストページ][9]で、アプリケーションとビューを選択します。表示するヒートマップのタイプも選択できます。

{{< img src="real_user_monitoring/heatmaps/view-list-updated.png" alt="ヒートマップビューリストからビューを選択する" style="width:100%;" >}}

これで、特定のビューの[ヒートマップページ][3]に移動します。上部にある **View Name** と **Application** セレクタで表示するビューを切り替えることができます。例えば特定の地域など、より詳細なフィルターを追加するには、左側のパネルからフィルターを追加できます。

{{< img src="real_user_monitoring/heatmaps/heatmaps-filters-v2.png" alt="セッションリプレイを有効にしているアプリケーションとビューを選択するためのセレクタを表示します。" style="width:100%;">}}

## Click map

Click map は、セッションからユーザーのクリックアクションを集計し、それらをマップ上の塊として視覚化することで、特定のビューで最もインタラクションがあったアクションを表示します。

{{< img src="real_user_monitoring/heatmaps/heatmap_v3.png" alt="Web サイトに重ねられた Clickmap データ。" style="width:60%;">}}

各 Click map では、以下のような分析も提供されます。

- そのページが他のすべての訪問ページの中でどの順位にあるか
- そのページのユニークユーザー数
- そのページのフラストレーションシグナル

パネルの下には、そのページで発生したすべてのアクションが、頻度別にリストアップされています。アクションをクリックすると、そのインタラクションについてより詳しく理解することができます。例:

- ユーザーが行ったアクションの回数と、そのページでの上位アクションの全体的な分析での位置づけ。
- そのアクションにフラストレーションシグナルが発生していた場合 (例えば、ユーザーがそのボタンを激怒してクリックした場合) には、関連するフラストレーションシグナルも表示することができます。

{{< img src="real_user_monitoring/heatmaps/actions.jpeg" alt="アクションの例と、そのアクションについて得られる情報を表示します。" style="width:60%;">}}

## Top Element

Top Element ヒートマップは、最もインタラクションがあった要素とその順位を表示することで、特定のビューでのクリックアクションを集計します。マップ自体の順位はサイドのアクション名に対応しています。

{{< img src="real_user_monitoring/heatmaps/top-elements-v3.png" alt="ページ上でクリックされた上位の要素の順位。" style="width:100%;">}}

パネル内のアクション名をクリックすると、対応するアクションがマップ上でハイライトされます。

## Scroll map

Scroll map は、特定のページのスクロールアクティビティの集計を視覚的に表示します。Scroll map を使用すると、ページの平均折り返し位置や、指定した深さまでスクロールしたユーザーの数を確認できます。Scroll map 上の青いフローティングバーを、評価したい深さまでドラッグすることができます。

{{< img src="real_user_monitoring/heatmaps/scrollmaps-v3.png" alt="サンプル e コマースアプリケーションの寝具ページの Scrollmap" style="width:100%;">}}

Scroll map の左側のパネルは、ユーザーが特定のパーセンタイルを越えてスクロールしたビューのリストへのリンクなど、クエリ結果への直接リンクを含む大まかな洞察を提供します。インサイトパネルの下には、ページのミニマップと、詳細なスクロールデータを表示する分布グラフがあり、最大の離脱が発生する場所を特定するのに役立ちます。

{{< img src="real_user_monitoring/heatmaps/scrollmaps-insights-panel.png" alt="スクロールデータの洞察のためのクエリのスクリーンショット" style="width:50%;">}}

## 次のステップ

分析を理解した後、次のステップはヒートマップ外の他のデータの文脈でアクションを理解することです。これは、[RUM エクスプローラー][4]にピボットしたり、[コンバージョン率を分析][5]するためにそのアクションを含むファネルを構築したりすることを意味するかもしれません。また、関連する[セッションリプレイ][1]を見て、セッション全体のコンテキストでユーザーがアクションを実行している様子を視覚化することもできます。

## トラブルシューティング

### あるビューのヒートマップを見ているのですが、予想外のページが表示されるのですが。

ヒートマップは、RUM のビュー名に基づいています。RUM アプリケーションの構成によっては、多くのページが同じビュー名の下にグループ化されたり、非常に特殊なビュー名を持つようになったりすることがあります。デフォルトのビュー名収集が十分でないと思われる場合は、[startView][6] 関数を使用して手動でオーバーライドすることができます。

### 選択したビューに、初期コンテンツが表示されないのですが。

ヒートマップは、セッションリプレイデータで生成されます。Datadog のインテリジェントなアルゴリズムは、最新のリプレイとページの初期状態に最もマッチするリプレイをスマートに選択します。場合によっては、正しいリプレイを見つけることができないこともあります。ヒートマップの背景を切り替えるには、**Choose Background** ボタンを使用して、ページの異なる状態を行き来し、探しているものを見つけることができます。

{{< img src="real_user_monitoring/heatmaps/heatmaps-background-selector.mp4" alt="背景選択ボタンで別の背景を選択する" video=true >}}

### ヒートマップ横のアクションリストに、ヒートマップでは見えない要素がアイコンで表示されているのですが。

{{< img src="real_user_monitoring/heatmaps/heatmaps-hidden-elements.png" alt="ヒートマップ上のアクションリストの非表示要素。" style="width:60%;">}}

アイコンのツールチップに **element is not visible** と表示されています。これは、その要素がページ上で一般的なアクションであるにもかかわらず、ヒートマップの背景には表示されていないことを意味します。その要素を見るには、右下の **Choose Background** をクリックして、ヒートマップの背景をその要素が存在するものに切り替えることができます。

### ヒートマップを作成しようとすると、"No Replay Data" (リプレイデータなし) という状態が表示されるのですが。

これは、Datadog が現在の検索フィルターに一致するヒートマップの背景として使用するセッションリプレイを見つけることができなかったことを意味します。[Browser SDK][2] でセッションの記録を開始したばかりの場合、セッションリプレイが表示できるようになるまでに数分かかることもあります。

### ヒートマップを作成しようとすると、"Not enough data to generate a heatmap" (ヒートマップを作成するためのデータが不足しています) という状態が表示されるのですが。

これは、Datadog が、現在選択されているリプレイと、いかなるユーザー アクションもマッチさせることができなかったことを意味します。これは、以下のような様々な理由で発生します。

- アプリケーションが最新の SDK バージョン (>= 4.20.0) を使用していない。
- RUM アクションが有効になっていない。[ユーザーインタラクションを追跡する][7]方法についてはこちらをご覧ください。
- 最近、お客様のページが大きく変わった。

### ページ内のユーザー情報がすべて空になっている。

ユーザー情報は、デフォルトでは収集されません。ヒートマップは、セッションデータで利用可能なユーザー情報を使用して、行動に関する関連する洞察を表示します。[データとコンテキストの変更][8]の手順に従って、RUM にユーザー情報を設定することができます。

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/session_replay/
[2]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/package.json
[3]: https://app.datadoghq.com/rum/heatmap/view
[4]: /ja/real_user_monitoring/explorer/
[5]: /ja/real_user_monitoring/guide/alerting-with-conversion-rates/
[6]: /ja/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#override-default-rum-view-names
[7]: /ja/real_user_monitoring/browser/tracking_user_actions/#manage-information-being-collected
[8]: /ja/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#user-session
[9]: https://app.datadoghq.com/rum/heatmap