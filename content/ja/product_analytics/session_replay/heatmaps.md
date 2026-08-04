---
aliases:
- /ja/product_analytics/heatmaps
description: ヒートマップは、ウェブ サイト上でユーザーがどこをクリックしているかを確認できるビジュアライゼーションの一種です。
further_reading:
- link: /product_analytics/session_replay/browser/
  tag: ドキュメント
  text: ブラウザー向け Session Replay
- link: /product_analytics/session_replay/mobile/
  tag: ドキュメント
  text: モバイル向け Session Replay
- link: https://www.datadoghq.com/blog/visualize-behavior-datadog-scrollmaps/
  tag: ブログ
  text: Datadog Heatmaps の Scroll maps を使用して、ページ上のユーザー インタラクションを可視化する
title: ヒートマップ
---

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-landing.png" alt="Click map オプションが表示されたヒートマップ ページの概要。" style="width:100%;">}}

ヒートマップ (heat map とも呼ばれます) とは、Session Replay データの上にユーザーのインタラクションをオーバーレイ表示して可視化するものです。Product Analytics には 3 種類のヒートマップがあります:

- **Click maps:** ページでユーザーがどのように操作しているかを理解するために、ユーザーのインタラクション (クリック) を表示します。
- **Top elements:** 特定のページで最も操作された要素のランキングを、最大上位 10 件まで表示します。
- **Scroll maps:** ユーザーがページをどこまでスクロールしたかを表示します。ページの平均的なファースト ビュー (average fold) の位置も確認できます。平均的なファースト ビューは、ユーザーがスクロールせずにデバイス上で見られる最下点を指します。

ヒートマップを使うと、ユーザー インタラクションに関するデータを確認し、ユーザー エクスペリエンスを改善する方法を特定できます。

## 前提条件

ヒート マップを使い始めるには:

1. SDK のバージョンを確認します:
   - Click maps の場合、SDK は v4.40.0+ である必要があります。
   - Scroll maps の場合、SDK は v4.50.0+ である必要があります。
2. [Session Replay][1] を有効化します。
3. アクション追跡を有効にするため、SDK の初期化時に `trackUserInteractions: true` を設定します (Click maps で必須)。

## はじめに

[**Digital Experience > Product Analytics > Session Replay > Heatmaps**][2] に移動します。アプリケーションとビューを選択します。

タイムフレーム セレクターの左側で、表示したいヒートマップの種類を選択できます: Top Elements、Click Map、Scroll Map。

{{< img src="product_analytics/heatmaps/pa-heatmaps-page.png" alt="各ビューで異なる種類のヒートマップを選択できます: Top Elements、Click Map、Scroll Map。" style="width:100%;">}}

次の追加の表示オプションがあります:

- 表示中のビューを切り替えるには、上部の **View Name** と **Application** セレクターを使用します。
- デバイス ビューを変更するには、**Device type** セレクターを使用します。
- アクション名でフィルタするには、**Filter actions by** ドロップダウンを使用します。
- 特定の地域など、より詳細なフィルターを追加するには、**Add Filter** ボタンをクリックします。

{{< img src="product_analytics/heatmaps/pa-heatmaps-annotated.png" alt="ヒートマップ ページでは、アプリケーション、マップ タイプ、デバイス タイプ、アクション名、詳細フィルターなどで異なるビューを表示できます。" style="width:100%;">}}

## Top Elements

Top Elements ヒート マップは、特定のビューにおけるクリック アクションを集計し、最も操作された要素とそのインタラクション順位を表示します。マップ上のランキングは、サイドに表示されるアクション名と対応しています。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-top-elements.png" alt="ページでクリックされた要素の上位ランキング。" style="width:100%;">}}

パネル内の任意のアクション名にホバーすると、マップ上の対応するアクションがハイライト表示されます。

## Click maps

Click map は、セッションからのユーザー クリック アクションを集計し、マップ上にブロブとして可視化することで、特定のビューで最も操作されたアクションを示します。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-clickmaps.png" alt="ウェブ サイト上にオーバーレイされた Click map データ。" style="width:100%;">}}

左側には、そのページで発生したすべてのアクションが頻度順に一覧表示されます。アクションをクリックすると、次のようにそのインタラクションの詳細を確認できます:

- ユーザーがそのアクションを実行した回数や、そのページにおける上位アクション全体の分析での位置づけ。
- そのアクションでフラストレーション シグナルが発生している場合 (例: ボタンへのレイジ クリック)、関連するフラストレーション シグナルも確認できます。

このビューから **Start a Funnel** ボタンをクリックして、ユーザーの離脱を特定することもできます。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-clickmap-actions.png" alt="アクション例と、そのアクションから取得できる情報の例。" style="width:50%;">}}

## Scroll maps

Scroll maps は、特定のページにおけるスクロール アクティビティの集計を表示します。Scroll maps を使うと、ページの平均的なファースト ビュー (average fold) がどこに位置するかや、どれだけのユーザーが特定の深さまでスクロールしたかを確認できます。Scroll map 上のフローティングの青いバーを、評価したい深さまでドラッグできます。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-scrollmap.png" alt="平均的なファースト ビューとスクロールの深さの分布が表示されたサンプル E コマース ページの Scroll map。" style="width:100%;">}}

Scroll map の左側のパネルには、ハイ レベル な インサイトとクエリ結果への直接リンクがあります。たとえば、特定のパーセンタイルを越えてスクロールしたビューの一覧へのリンクなどです。インサイト パネルの下には、ページのミニ マップと、詳細な スクロール データを表示する分布 グラフがあり、どこで最も大きな離脱が発生しているかの特定に役立ちます。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-minimap.png" alt="スクロール データのインサイト向けクエリのスクリーン ショット" style="width:50%;">}}

## スクリーンショット

スクリーンショットは、特定の時点におけるビューの状態です。スクリーンショットを変更すると、選択したスクリーンショットに応じて異なる結果が表示されます。スクリーンショットを保存して、組織内の全員が同じビューの状態を分析できるようにすることもできます。

### スクリーンショットの変更
ヒートマップのビューで、**Change Screenshot** ボタンをクリックします。チームメイトが以前保存した既存のスクリーンショットから選択するか、Session Replay からスクリーンショットを取得します。

Session Replay からスクリーンショットを選択するには:

1. 希望するヒートマップのスクリーンショットがまだ保存されていない場合は、**Grab from replay** をクリックします。

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-change-screenshot-button-1.png" alt="ヒートマップの背景の基になっているスクリーンショットを変更するには Grab from replay ボタンをクリックします。" style="width:100%;">}}

1. 右側のアクション イベントをクリックして、ヒート マップ用に別の Snapshot を選択します。

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-list-all-events-1.png" alt="Session Replay のアクション イベント一覧。" style="width:100%;">}}

1. セッションに、希望するスクリーンショットにつながるような[アクションが含まれていない](#the-view-that-i-selected-is-not-showing-the-initial-content)場合は、**Choose Another Replay** をクリックしてリプレイの一覧に戻れます。
1. **Take Screenshot** ボタンをクリックすると、一時停止している時点のスクリーンショットをヒートマップに適用します。

### スクリーンショットの保存

現在のヒートマップの状態をスクリーンショットとして保存することで、組織内でヒートマップを開く人のデフォルト ビューにすることができます。最近のリプレイから自動選択された現在のスクリーンショットを保存するには、現在のスクリーンショットの **Save** をクリックします。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-save-screenshot-1.png" alt="Save をクリックして、自動選択されたスクリーンショットを適用します。" style="width:100%;">}}

同じビューに対して複数のスクリーンショットを保存し (例: デフォルト ビュー、ナビゲーション メニューを開く、モーダルを開く)、チームメイトが保存したスクリーンショットに切り替えることができます。

現在保存されているスクリーンショットを削除し、最近のリプレイから自動選択されたスクリーンショットに戻すには、現在のスクリーンショットの **Unpin** をクリックします。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-unpin-screenshot-1.png" alt="Unpin をクリックして、現在ピン止めされているスクリーンショットを削除します。" style="width:100%;">}}

## 次のステップ

ヒートマップを分析したら、関連データを探索してユーザーの行動の背景にある理由を理解しましょう。[Analytics Explorer][3] に切り替えるか、関連する [Session Replay][1] を視聴して、セッション全体の文脈の中でユーザー アクションを視覚的に確認できます。

## トラブル シューティング

### 特定のビューのヒート マップを見ていますが、想定外のページが表示されます。

ヒートマップは Product Analytics のビュー名に基づきます。Product Analytics アプリケーションの構成によっては、多くのページが同じビュー名の下にグループ化されたり、非常に具体的なビュー名を持つようになったりすることがあります。

### 選択したビューで初期コンテンツが表示されません。

ヒートマップは Session Replay データで生成されます。Datadog は、ページの初期状態によく一致する最近のリプレイを自動的に選択します。場合によっては、ビューの別の状態のヒートマップを見たいこともあるでしょう。ヒートマップのスクリーンショットを切り替えるには、**Change Screenshot**、**Grab from replay** の順にクリックして、リプレイのさまざまな状態を確認し、目的の状態を見つけてください。閲覧中のリプレイに目的のスクリーンショットが含まれていない場合は、**Choose Another Replay** ボタンで同じビューの別のリプレイを選択できます。

### ヒート マップの横のアクション リストで、ヒート マップ内に表示されていない要素を示すアイコンが見えます。

アイコンのツールチップには element is not visible と表示されます。これは、その要素がページ上の一般的なアクションではあるものの、ヒートマップのスクリーンショットでは表示されていないことを意味します。その要素を確認するには、右上の **Change Screenshot** をクリックし、その要素が存在するスクリーンショットに切り替えてください。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-hidden-elements.png" alt="ヒート マップのアクション リスト内の非表示要素。" style="width:100%;">}}

### **ヒート マップの作成を試みると、「No Replay Data」状態が表示されます。**

これは、現在の検索フィルターに一致し、ヒートマップの背景として使用できる Session Replay が Datadog に見つからなかったことを意味します。[Browser SDK][4] でセッションの記録を開始したばかりの場合、Session Replay が閲覧可能になるまで数分かかることがあります。

### ヒート マップの作成を試みると、「Not enough data to generate a heatmap」状態が表示されます。

これは、現在選択されているリプレイにユーザー アクションを一致させられなかったことを意味します。次のようなさまざまな理由が考えられます:

- アプリケーションが最新の SDK バージョン (>= 4.20.0) を使用していない。
- ページが最近大きく変更された。

### ページ上のユーザー情報がすべて空である。

ユーザー情報は、デフォルトでは収集されません。ヒートマップは、セッション データ内の利用可能なユーザー情報を使用して、行動に関する洞察を表示します。ユーザー情報を収集するには、SDK の実装でユーザー属性を設定してください。

## 参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/product_analytics/session_replay/browser/
[2]: https://app.datadoghq.com/product-analytics/heatmap
[3]: /ja/product_analytics/analytics_explorer/
[4]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/package.json