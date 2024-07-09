---
description: RUM とセッションリプレイを使用して、ユーザーの行動と機能採用の傾向を監視する方法について説明します。
further_reading:
- link: /real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM エクスプローラーについて
- link: /real_user_monitoring/
  tag: ドキュメント
  text: RUM データを視覚化する方法について
- link: /real_user_monitoring/frustration_signals
  tag: ドキュメント
  text: フラストレーションシグナルについて
- link: /real_user_monitoring/session_replay
  tag: ドキュメント
  text: セッションリプレイについて
- link: /dashboards/guide/powerpacks-best-practices/
  tag: ドキュメント
  text: パワーパックについて
title: RUM とセッションリプレイを製品分析に活用する
---

## 概要

[RUM とセッションリプレイ][1]は、消費者行動の傾向をモニターし、Web やモバイルアプリケーションに関する製品の使用量に関する質問の答えを明らかにすることができます。

このガイドでは、RUM とセッションリプレイデータを充実させ、製品分析に関連する質問に答えるための、いくつかの使用例について説明します。

## セットアップ

Datadog RUM SDK をセットアップしたら、[ブラウザ][2]やモバイル ([iOS][3]、[Android][4]) データに属性を付加して、ユースケースに応じてデータをカスタマイズします。例えば、コンテキスト情報を追加することで、[特定のユーザーに紐づくセッションを特定する][4]ことができます。

## ページのトラフィックと機能の使用量を監視する

ユーザーがどのボタンを最も多くクリックしたかを知りたい場合は、アプリケーションのページトラフィックとボタンの使用量を追跡することができます。

1. [RUM エクスプローラー][5]に移動し、検索クエリの横にあるドロップダウンメニューから **Actions** を選択します。
2. 検索クエリに `@view.name:/cart` を入力し、**Top List** の視覚化タイプを選択します。
3. 上記の `Group into fields` セクションの `by` フィールドで、グループのドロップダウンから **Action Name** を選択します。

この例では、Shopist の `/cart` ページで上位のアクションを表示しています。

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/actions_in_cart_page-2.png" alt="Shopist のカートページでのアクションの検索クエリ" style="width:90%;">}}

どのユーザーがこれらのボタンをクリックしたかを調べるには、検索クエリを変更して、**Table** 視覚化タイプを選択し、**+** をクリックして `@user.name` に別の `group` フィールドを追加します。

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/actions_by_user_name_in_cart_page-3.png" alt="Shopist のカートページで、ユーザー名でグループ分けされたアクションの検索クエリ" style="width:90%;">}}

## コアワークフローのコンバージョン率分析

[ファネル視覚化タイプ][6]を使用して、Web サイト内の重要なエリアにおけるコンバージョン率を追跡します。

Web サイトのビューやアクションに基づいたファネルを作成すると、次のような使い方ができます。

* [保存ビュー][7]を作成し、RUM とセッションリプレイで参照できるようにする
* ダッシュボードに[エクスポート][8]して、追加のテレメトリーデータとの関連でコンバージョン率を分析する
* ファネルステップをクリックして、**Funnel Analysis** [サイドパネル](#view-funnel-analysis)を表示する

### 保存ビューの追加

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/explorer_saved_view.mp4" alt="RUM エクスプローラーに保存ビューを追加する" video="true" width=90% >}}

### ファネルのエクスポート

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/explorer_funnel_export.png" alt="RUM エクスプローラーでファネル視覚化をエクスポートする" style="width:90%;" >}}

### ファネル分析を見る

サイドパネルには、個々のビューのロード時間、国、デバイスタイプ、ブラウザ、バージョンに基づくコンバージョン率とドロップオフ率、およびページで発生した未解決の[問題][9]に関する詳細な情報が表示されます。

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/funnel_analysis_side_panel.mp4" alt="コンバージョン率、ドロップオフ率、ページパフォーマンス、エラー、ユーザー行動などを表示するファネル分析サイドパネル" width=90%; video="true" >}}

## 最も不満のあるユーザーを特定する

[フラストレーションシグナル][10]は、ユーザーがフラストレーションを感じる行動 (怒りクリック、デッドクリック、エラークリック) を示す瞬間を抽出し、ユーザーが直面している最も緊急の問題に対処できるようにします。ユーザーの行動を調査して、ユーザーが行き詰っている Web サイトの領域を特定します。

1. [RUM エクスプローラー][5]で、ドロップダウンメニューから **Views** を選択します。
2. 検索クエリに `@view.frustration.count:>=2` を入力し、**Top List** の視覚化タイプを選択します。
3. 上記の `Group into fields` セクションの `by` フィールドで、グループのドロップダウンから **View Name** を選択します。

このクエリは、フラストレーションシグナルが 2 回以上発生したトップページを検索します。

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/frustration_signal_query-1.png" alt="RUM エクスプローラーで 2 つ以上のフラストレーションシグナルを含むビューの検索クエリ" style="width:90%;" >}}

トップビューの分析だけでなく、ユーザーが不満を表明しているボタンや要素も調査したいところです。

1. ドロップダウンメニューから、**Actions** を選択します。
2. 検索クエリに `@action.frustration.type:dead_click` を入力し、**Table** の視覚化タイプを選択します。
3. 検索クエリをクリックして、`@action.frustration.type:error_click` と ``@action.frustration.type:rage_click`` を選択し、これらの値を検索に含めます。**search for** フィールドは、`Action Frustration Type:(3 terms)` に更新されます。
4. 下の `Group into fields` セクションの `by` フィールドで、グループのドロップダウンから **Action Name** を選択し、**+** をクリックして **Action Frustration Type** の別の `group` フィールドを追加します。

このクエリは、ユーザーが何らかのフラストレーションシグナルを表現した時に、そのフラストレーションが発生したユニークなアクションをカウントするものです。

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/multi_group_frustration_type_search-3.png" alt="Shopist のカートページで、ユーザーが 3 種類のフラストレーションシグナルを発したアクションをリストアップし、カウントする検索クエリ" style="width:90%;">}}

## セッションリプレイでユーザー体験を見る

劣悪なユーザー体験がユーザーに与える影響を視覚化することができます。たとえば、ファネルを構築して、ステップ間のドロップオフ率が非常に高いことに気づいた場合、[セッションリプレイ記録][11]を見て、ドロップオフする前にユーザーが何をしたかを確認することができます。

ファネル視覚化では、**Funnel Analysis** サイドパネルにアクセスし、ユーザーが別のステップに継続した、またはドロップオフしたセッションの **Sample Replay Session** をクリックすることができます。

{{< img src="real_user_monitoring/guide/rum-for-product-analytics/funnel_sample_session_replay-2.mp4" alt="ファネル分析サイドパネルには、セッションリプレイへのリンクが含まれます" width=90%; video="true" >}}

セッションリプレイを使用すると、製品のどの部分がユーザーを混乱させ、コンバージョンを高めるために改善が必要なのかを特定できます。

## パワーパックにおける使用量の把握

[パワーパック][12]は、共通の監視パターンと製品分析のためのダッシュボードウィジェットのテンプレートグループです。

すぐに使える RUM Feature Usage パワーパックを使って、アプリケーションの特定のアクションに対するさまざまなトラフィックパターンをよりよく理解しましょう。

1.  [**Dashboards** > **New Dashboard**][13] を開き、**+ Add Widgets or Powerpacks** をクリックします。
2. **Powerpacks** タブで、検索バーに `tag:rum` と入力して RUM パワーパックを検索し、**RUM Feature Usage** を選択します。デフォルトでは、`@view.name` と `@action.name` の値は `*` に設定されています。
3. ドロップダウンメニューから値を選択してパワーパックをカスタマイズし、**Add to dashboard** をクリックすると、テンプレート変数として属性を使用することができます。
4. **Confirm** をクリックすると、パワーパックがダッシュボードに追加されます。

このパワーパックでは、Shopist の `/cart` ページでのアクション回数と使用頻度の割合に加え、国別の使用量、ビューでのアクション、時間経過によるアクションについてのグラフを提供します。

{{< img src="dashboards/guide/powerpacks_best_practices/configure_powerpack.png" alt="カートページでクーポンの適用アクションを監視する RUM Feature Usage パワーパック" style="width:100%;" >}} 

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/
[2]: /ja/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#enrich-and-control-rum-data
[3]: /ja/real_user_monitoring/ios/advanced_configuration/?tab=swift#enrich-user-sessions
[4]: /ja/real_user_monitoring/android/advanced_configuration/?tab=kotlin#enrich-user-sessions
[5]: https://app.datadoghq.com/rum/explorer
[6]: /ja/real_user_monitoring/funnel_analysis/
[7]: /ja/real_user_monitoring/explorer/saved_views/
[8]: /ja/real_user_monitoring/explorer/export/
[9]: /ja/real_user_monitoring/error_tracking/
[10]: /ja/real_user_monitoring/frustration_signals/
[11]: /ja/real_user_monitoring/session_replay/
[12]: /ja/dashboards/guide/powerpacks-best-practices/
[13]: https://app.datadoghq.com/dashboard/lists