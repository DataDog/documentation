---
aliases:
- /ja/real_user_monitoring/heatmaps
description: ヒート マップは、ウェブ サイト上でユーザーがどこをクリックしているかを確認できるビジュアライゼーションの一種です。
further_reading:
- link: /real_user_monitoring/session_replay/browser/
  tag: ドキュメント
  text: ブラウザー向け Session Replay
- link: /real_user_monitoring/session_replay/mobile/
  tag: ドキュメント
  text: モバイル向け Session Replay
- link: https://www.datadoghq.com/blog/visualize-behavior-datadog-scrollmaps/
  tag: ブログ
  text: Datadog Heatmaps の Scrollmaps を使用して、ページ上のユーザー インタラクションを可視化する
title: ヒート マップ
---

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-landing.png" alt="ヒート マップ 機能の概要。" style="width:100%;">}}

ヒート マップ (heat map とも) とは、Session Replay データの上にユーザーのインタラクションをオーバーレイ表示して可視化するものです。Real User Monitoring (RUM) には 3 種類のヒート マップがあります:

- **Click maps:** ページでユーザーがどのように操作しているかを理解するために、ユーザーのインタラクション (クリック) を表示します。
- **Top Elements:** 特定のページで最も操作された要素のランキングを、最大上位 10 件まで表示します。
- **Scroll maps:** ユーザーがページをどこまでスクロールしたかを表示します。ページの平均的なファースト ビュー (average fold) の位置も確認できます。平均的なファースト ビューは、ユーザーがスクロールせずにデバイス上で見られる最下点を指します。

ヒート マップを使うと、複雑なデータをひと目で確認でき、ユーザー エクスペリエンス最適化のための示唆が得られます。

## 前提条件

ヒート マップを使い始めるには:

1. SDK のバージョンを確認します:
   - Click maps の場合、SDK は最新バージョン v4.40.0 以降である必要があります。
   - Scroll maps の場合、SDK は v4.50.0 以降が必要です。
2. [Session Replay][1] を有効化します。
3. アクション追跡を有効にするため、SDK の初期化時に `trackUserInteractions: true` を設定します (Click maps で必須)。

## はじめに

[**Digital Experience > Real User Monitoring > Session Replay > Heatmaps**][2] に移動します。アプリケーションとビューを選択します。

[Real User Monitoring ランディング ページ][3] で、[アプリケーション セレクター][4] からアプリケーションとビューを選択します。Timeframe セレクターの左側で、表示したい heatmap の種類を選択できます: Top Elements、Click Map、Scroll Map。これにより、特定のビューの [ヒート マップ ページ][2] に移動します。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-different-views.png" alt="Heatmaps ページでは、アプリケーション、マップ タイプ、デバイス タイプ、アクション名、詳細フィルターなどで異なるビューを表示できます。" style="width:100%;">}}

次の追加の表示オプションがあります:

- 表示中のビューを切り替えるには、上部の **View Name** と **Application** セレクターを使用します。
- デバイス ビューを変更するには、**Device type** セレクターを使用します。
- アクション名でフィルタするには、**Filter actions by** ドロップダウンを使用します。
- 特定の地域など、より詳細なフィルターを追加するには、**Add Filter** ボタンをクリックします。

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

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-scrollmap.png" alt="サンプル E コマース アプリケーションの 寝具 ページの Scroll map" style="width:100%;">}}

Scroll map の左側のパネルには、ハイ レベル な インサイトとクエリ結果への直接リンクがあります。たとえば、特定のパーセンタイルを越えてスクロールしたビューの一覧へのリンクなどです。インサイト パネルの下には、ページのミニ マップと、詳細な スクロール データを表示する分布 グラフがあり、どこで最も大きな離脱が発生しているかの特定に役立ちます。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-minimap.png" alt="スクロール データのインサイト向けクエリのスクリーン ショット" style="width:50%;">}}

## Snapshots

Snapshot は、特定の時点における Session Replay の状態です。Snapshot を変更すると、選択した Snapshot に応じて異なる結果が表示されます。ヒート マップの Snapshot として特定の Snapshot を選択するには、**Change Snapshot** ボタンを使用できます。

背景 Snapshot を選択する手順:

1. ヒート マップのビューで、**Change Snapshot** ボタンをクリックします。

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-change-snapshot-button.png" alt="ヒート マップの背景 Snapshot を変更するには Change Snapshot ボタンをクリックします。" style="width:100%;">}}
1. 右側のアクション イベントをクリックして、ヒート マップ用に別の Snapshot を選択します。

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-list-all-events.png" alt="Session Replay のアクション イベント一覧。" style="width:100%;">}}

1. セッションに [アクションが含まれていない](#the-view-that-i-selected-is-not-showing-the-initial-content) 場合は、**Choose Another Replay** をクリックしてリプレイの一覧に戻れます。
1. **Select Snapshot** ボタンをクリックすると、一時停止している時点の Snapshot をヒート マップに適用します。

## 次のステップ

ヒート マップを分析したら、関連データを探索してユーザー アクションを理解しましょう。[Analytics Explorer][4] にピボットするか、関連する [Session Replay][1] を視聴して、セッション全体の文脈の中でユーザー アクションを視覚的に確認できます。

## トラブル シューティング

### 特定のビューのヒート マップを見ていますが、想定外のページが表示されます。

ヒート マップは RUM のビュー名に基づきます。RUM アプリケーションの構成によっては、多くのページが同じビュー名の下にグループ化され始めたり、特定のビュー名を持つようになったりすることがあります。

### 選択したビューで初期コンテンツが表示されません。

ヒート マップは Session Replay データで生成されます。Datadog のインテリジェントなアルゴリズムは、ページの初期状態に最も一致し、かつ最新のリプレイを選択します。場合によっては、適切なリプレイが見つからないことがあります。ヒート マップの Snapshot を切り替えるには、**Change Snapshot** ボタンを使用してリプレイの異なる状態を移動し、目的の状態を見つけてください。閲覧中のリプレイに目的の Snapshot が含まれていない場合は、**Choose Another Replay** ボタンで同じビューの別のリプレイを選択できます。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-change-the-snapshot.mp4" alt="Change Snapshot をクリックして異なる背景を選択します。" video=true >}}

### ヒート マップの横のアクション リストで、ヒート マップ内に表示されていない要素を示すアイコンが見えます。

アイコンのツール チップには element is not visible と表示されます。これは、その要素がページ上の一般的なアクションではあるものの、ヒート マップの Snapshot では表示されていないことを意味します。その要素を確認するには、右上の **Change Snapshot** をクリックし、その要素が存在する Snapshot に切り替えてください。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-hidden-elements.png" alt="ヒート マップのアクション リスト内の非表示要素。" style="width:100%;">}}

### **ヒート マップの作成を試みると、「No Replay Data」状態が表示されます。**

これは、現在の検索フィルターに一致し、ヒート マップの背景として使用できる Session Replay が Datadog に見つからなかったことを意味します。[Browser SDK][6] でセッションの記録を開始したばかりの場合、Session Replay が閲覧可能になるまで数分かかることがあります。

### ヒート マップの作成を試みると、「Not enough data to generate a heatmap」状態が表示されます。

これは、現在選択されているリプレイにユーザー アクションを一致させられなかったことを意味します。次のようなさまざまな理由が考えられます:

- アプリケーションが最新の SDK バージョン (>= 4.20.0) を使用していない。
- ページが最近大きく変更された。

### ページ上のユーザー情報がすべて空である。

ユーザー情報は既定では収集されません。ヒート マップは、セッション データで利用可能なユーザー情報を使用して、行動に関する関連インサイトを表示します。

## 参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/session_replay/
[2]: https://app.datadoghq.com/rum/heatmap/
[3]: https://app.datadoghq.com/rum/performance-monitoring
[4]: /ja/real_user_monitoring/explorer/#view-by-application
[5]: https://app.datadoghq.com/rum/sessions
[6]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/package.json