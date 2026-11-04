---
aliases:
- /ja/real_user_monitoring/session_replay/heatmaps
- /ja/real_user_monitoring/heatmaps
- /ja/product_analytics/session_replay/heatmaps
- /ja/product_analytics/heatmaps
description: ヒートマップは、ユーザーが Web サイト上でどこをクリックしたかを視覚化するものです。
further_reading:
- link: /session_replay/
  tag: ドキュメント
  text: ブラウザ向け Session Replay
- link: /session_replay/?platform=android
  tag: ドキュメント
  text: モバイル向け Session Replay
- link: https://www.datadoghq.com/blog/session-replay-custom-heatmap-backgrounds/
  tag: ブログ
  text: Session Replay でカスタムヒートマップをキャプチャして分析する
- link: https://www.datadoghq.com/blog/visualize-behavior-datadog-scrollmaps/
  tag: ブログ
  text: Datadog ヒートマップのスクロールマップを使用して、ページ上のユーザーインタラクションを視覚化する
title: ヒートマップ
---
{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-landing.png" alt="ヒートマップ機能の概要。" style="width:100%;">}}

ヒートマップは、Session Replay データに重ね合わせたユーザーのインタラクションを視覚化するものです。ヒートマップには 3 つの異なるタイプがあります。

- {{< ui >}}Click maps{{< /ui >}}: ユーザーのインタラクション (クリック) を表示し、ユーザーがページをどのように利用しているかを把握します。
- {{< ui >}}Top Elements{{< /ui >}}: 特定のページで最もインタラクションの多い要素を最大 10 個までランキング形式で表示します。
- {{< ui >}}Scroll maps{{< /ui >}}: ユーザーがページをどこまでスクロールしたかを表示します (ページの平均的なフォールド位置を含む)。平均的なフォールドとは、ユーザーがスクロールせずにデバイス上で見ることができるページ内の最も低い位置のことです。

ヒートマップを使用して複雑なデータを一目で確認し、ユーザーエクスペリエンスの最適化に関する洞察を得ることができます。

<div class="alert alert-info">ヒートマップは、ブラウザ Session Replay でのみサポートされています。</div>

## 前提条件 {#prerequisites}

ヒートマップを始めるには、

1. ブラウザ SDK のバージョンを確認してください。
   - クリックマップを使用するには、最新バージョンの SDK (v4.40.0 以降) である必要があります。
   - スクロールマップを使用するには、(v4.50.0 以降) である必要があります。
2. [Session Replay][1] を有効にします。
3. アクション追跡を有効にするには、SDK の初期化で `trackUserInteractions: true` を設定します (クリックマップに必要)。

## はじめに {#getting-started}

{{< tabs >}}
{{% tab "RUM" %}}

[{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Real User Monitoring{{< /ui >}} > {{< ui >}}Session Replay{{< /ui >}} > {{< ui >}}Heatmaps{{< /ui >}}][1] に移動します。アプリケーションとビューを選択します。

[Real User Monitoring のランディングページ][2]で、アプリケーションセレクターからアプリケーションとビューを選択します。期間セレクターの左側で、表示するヒートマップのタイプ (トップ要素、クリックマップ、またはスクロールマップ) を選択できます。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-different-views.png" alt="ヒートマップページでは、アプリケーション別、マップタイプ別、デバイスタイプ別、アクション名別、詳細なフィルターなど、さまざまな方法でビューを表示できます。" style="width:100%;">}}

[1]: https://app.datadoghq.com/rum/heatmap/
[2]: https://app.datadoghq.com/rum/performance-monitoring

{{% /tab %}}
{{% tab "Product Analytics" %}}

[{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Product Analytics{{< /ui >}} > {{< ui >}}Heatmaps{{< /ui >}}][1] に移動します。アプリケーションとビューを選択します。

このページから、特定のビューに対して表示するヒートマップのタイプ (トップ要素、クリックマップ、スクロールマップ) を選択できます。

{{< img src="product_analytics/heatmaps/pa-heatmaps-page.png" alt="各ビューについて、異なるタイプのヒートマップ (トップ要素、クリックマップ、またはスクロールマップ) を選択できます。" style="width:100%;">}}

ビュー名をクリックすると、関連するヒートマップの詳細が表示されます。

{{< img src="product_analytics/heatmaps/pa-heatmaps-annotated.png" alt="ヒートマップページでは、アプリケーション別、マップタイプ別、デバイスタイプ別、アクション名別、詳細なフィルターなど、さまざまな方法でビューを表示できます。" style="width:100%;">}}

[1]: https://app.datadoghq.com/product-analytics/heatmap

{{% /tab %}}
{{< /tabs >}}

以下の追加のビューオプションがあります。

- 表示するビューを切り替えるには、上部にある {{< ui >}}View Name{{< /ui >}} および {{< ui >}}Application{{< /ui >}} セレクターを使用します。
- デバイスビューを変更するには、{{< ui >}}Device type{{< /ui >}} セレクターを使用します。
- アクション名でフィルタリングするには、{{< ui >}}Filter actions by{{< /ui >}} ドロップダウンを使用します。
- 特定の地域など、より詳細なフィルターを追加するには、{{< ui >}}Add Filter{{< /ui >}} ボタンをクリックします。

## トップ要素 {#top-elements}

トップ要素ヒートマップは、特定のビューでのクリック操作を集計し、最もインタラクションの多い要素とそのインタラクション順位を表示します。マップ上のランキングは、横に表示されるアクション名に対応しています。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-top-elements.png" alt="ページ上でクリックされたトップ要素のランキングです。" style="width:100%;">}}

パネル内のアクション名にカーソルを合わせると、マップ上の対応するアクションが強調表示されます。

## クリックマップ {#click-maps}

クリックマップは、セッションからユーザーのクリック操作を集計し、それらをマップ上にブロブとして視覚化することで、特定のビューで最もインタラクションの多いアクションを表示します。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-clickmaps.png" alt="Web サイトにオーバーレイ表示されたクリックマップデータです。" style="width:100%;">}}

左側には、ページ上で発生したすべてのアクションが頻度順に一覧表示されています。アクションをクリックすると、そのインタラクションについて詳しく確認できます。例:

- ユーザーが行ったアクションの回数と、そのページでの上位アクションの全体的な分析での位置づけ。
- そのアクションにフラストレーションシグナルが発生していた場合 (たとえば、ユーザーがそのボタンを激怒してクリックした場合) には、関連するフラストレーションシグナルも表示することができます。

このビューでは、{{< ui >}}Start a Funnel{{< /ui >}} ボタンをクリックしてユーザーの離脱を特定することもできます。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-clickmap-actions.png" alt="アクションの例と、そのアクションについて取得できる情報を示します。" style="width:50%;">}}

## スクロールマップ {#scroll-maps}

スクロールマップは、特定のページにおけるスクロールアクティビティの集計結果を表示します。スクロールマップを使用して、ページの平均的なフォールド位置や、特定の深さまでスクロールしたユーザー数を確認できます。スクロールマップ上の青いフローティングバーをドラッグして、確認したい深さまで移動できます。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-scrollmap.png" alt="サンプル E コマースアプリケーションの寝具ページのスクロールマップ" style="width:100%;">}}

スクロールマップの左側にあるパネルでは、クエリ結果への直接リンクなど、概要レベルのインサイトを確認できます。たとえば、ユーザーが特定のパーセンタイルを超えてスクロールしたビューの一覧へのリンクがあります。インサイトパネルの下には、ページのミニマップと、詳細なスクロールデータを表示する分布グラフがあります。これは、どこで最大の離脱が発生しているかを特定するのに役立ちます。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-minimap.png" alt="スクロールデータインサイトのクエリのスクリーンショット" style="width:50%;">}}

## スクリーンショット {#screenshots}

スクリーンショットとは、特定の時点におけるビューの状態です。スクリーンショットを変更すると、選択したスクリーンショットに応じて異なる結果が表示されます。スクリーンショットを保存して、組織内の全員が同じビューの状態を分析できるようにすることもできます。

### スクリーンショットの変更 {#changing-screenshots}

ヒートマップビューから、{{< ui >}}Change Screenshot{{< /ui >}} ボタンをクリックします。3 つのオプションを含むドロップダウンが表示されます。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-change-screenshot-button.png" alt="[Change Screenshot] ドロップダウンには、[Existing screenshots]、[Take new screenshot]、[Grab from replay] の 3 つのオプションが表示されます。" style="width:100%;">}}

{{< ui >}}Existing screenshots{{< /ui >}}

あなたまたはチームメイトが以前に保存したスクリーンショットから選択します。これにより、組織内の全員が同じビュー状態を分析できるようになります。

{{< ui >}}Take new screenshot{{< /ui >}}

ライブアプリケーションから直接スクリーンショットをキャプチャします。開いているモーダル、ホバーメニュー、特定のスクロール位置など、記録されたリプレイに存在しない状態が必要な場合にこのオプションを使用します。

**前提条件**: このオプションを使用する前に、[Datadog Test Recorder][6] Chrome拡張機能をインストールしてください。この拡張機能は、Datadog 内の埋め込みブラウザでライブアプリケーションを読み込み、キャプチャしたい正確なページとUI状態に移動できるようにします。

1. {{< ui >}}Take new screenshot{{< /ui >}} をクリックします。


1. 埋め込みブラウザでキャプチャしたいページに移動します。
1. ページをスクロールして操作し、目的のコンテンツを表示します。
1. ヒートマップのスクリーンショットに機密データが表示されないように、マスキングレベルを選択します。コードで構成された要素レベルのプライバシー設定が引き続き優先されます。詳細については、[プライバシーオプション][5]を参照してください。

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-take-new-screenshot.png" alt="ナビゲーション手順とマスキングレベルセレクターが表示された [Take new screenshot] パネル。" style="width:100%;">}}

1. {{< ui >}}Take Screenshot{{< /ui >}} をクリックします。スクリーンショットのプレビューが開きます。
1. プレビューを確認し、{{< ui >}}Confirm{{< /ui >}} をクリックしてヒートマップにスクリーンショットを適用します。

{{< ui >}}Grab from replay{{< /ui >}}

記録された Session Replay からスクリーンショットを選択します。

1. {{< ui >}}Grab from replay{{< /ui >}} をクリックします。

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-grab-from-replay-selected.png" alt="[Grab from replay] が選択された状態の [Change Screenshot] ドロップダウン。" style="width:100%;">}}

1. 右側のアクションイベントをクリックして、ヒートマップに使用する別のスナップショットを選択します。

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-list-all-events-1.png" alt="Session Replay のアクションイベントのリスト。" style="width:100%;">}}

1. セッションに目的のスクリーンショットにつながる[アクションが含まれていない](#the-view-that-i-selected-is-not-showing-the-initial-content)場合は、{{< ui >}}Choose Another Replay{{< /ui >}} をクリックして Session Replay のリストに戻ります。
1. {{< ui >}}Take Screenshot{{< /ui >}} をクリックして、一時停止した時点のスクリーンショットをヒートマップに適用します。

### スクリーンショットの保存 {#saving-screenshots}

{{< ui >}}Grab from replay{{< /ui >}} または {{< ui >}}Take new screenshot{{< /ui >}} を使用して撮影されたスクリーンショットは自動的に保存され、組織内でヒートマップを開くすべてのユーザーのデフォルトビューになります。最近の Session Replay から自動選択されたスクリーンショットも保存するには、現在のスクリーンショット上の {{< ui >}}Save{{< /ui >}} をクリックします。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-save-screenshot-1.png" alt="[Save] をクリックして、自動選択されたスクリーンショットを適用します。" style="width:100%;">}}

同じ表示に対して複数のスクリーンショットを保存し (例: デフォルト表示、ナビゲーションメニューを開いた状態、モーダルを開いた状態など)、チームメイトが保存したスクリーンショットを切り替えることができます。

現在保存されているスクリーンショットを削除し、最近の Session Replay から自動選択されたものに戻すには、現在のスクリーンショット上の {{< ui >}}Unpin{{< /ui >}} をクリックします。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-unpin-screenshot-1.png" alt="[unpin] をクリックして、現在ピン留めされているスクリーンショットを削除します。" style="width:100%;">}}

### リプレイの保持期間を超えてヒートマップを分析する {#analyzing-heatmaps-beyond-replay-retention}

Product Analytics では、クリックデータは背景として使用される Session Replay よりも長く保持されます。[データ保持](#data-retention) を参照してください。リプレイの保持期間よりも前の期間のヒートマップを表示するには、

1. 日付範囲を過去 30 日以内の期間に設定し、最近の Session Replay を背景としてヒートマップをレンダリングします。
1. 現在のスクリーンショット上の {{< ui >}}Save{{< /ui >}} をクリックしてピン留めします。
1. 日付範囲を分析したい期間に戻します。

ピン留めしたスクリーンショット上に、古いクリックデータが表示されます。{{< ui >}}Take new screenshot{{< /ui >}} を使用して、ライブアプリケーションから特定の状態をキャプチャすることもできます。

**注**: 背景には、分析している期間中のアプリケーションではなく、最近のアプリケーションの状態が反映されます。その間にページレイアウトが変更された場合、クリックが誤った要素の上に表示されることがあります。

## データ保持 {#data-retention}

ヒートマップは 2 つのデータ (**オーバーレイ** - クリックとスクロール、および**背景のスクリーンショット**) を組み合わせたもので、Datadog はそれぞれを異なる期間保持します。

| データ | ソース | 保持期間 |
| ---- | ------ | --------- |
| **RUM のオーバーレイ** (クリックとスクロール) | RUM アクションイベント | 30 日間 |
| **Product Analytics のオーバーレイ** (クリックとスクロール) | Product Analytics クリックデータ | 15 か月間 |
| **両方の背景のスクリーンショット** | Session Replay | デフォルトで 30 日間 |

ヒートマップのレンダリングには両方のデータが必要です。クリックデータは存在するものの、背景として使用できる Session Replay が残っていない期間を選択した場合、Analytics Explorer でそれらのアクションをクエリできるにもかかわらず、ヒートマップには [No Replay Data] と表示されます。

Product Analytics で 30 日を超える期間の表示を分析する場合は、Session Replay が利用可能なうちにその表示のスクリーンショットを保存してください。スクリーンショットを保存すると、その背後にある Session Replay の保持期間が 15 か月に延長されるため、Datadog が Product Analytics のクリックデータを保持している限り、ヒートマップはレンダリングされ続けます。[リプレイの保持期間を超えてヒートマップを分析する](#analyzing-heatmaps-beyond-replay-retention)を参照してください。

RUM では、アクションイベントは 30 日後に期限切れとなるため、その期間を超えてヒートマップを利用することはできません。

他のデータ型に適用される保持期間については、[データ保持期間][7]を参照してください。個別のリプレイの保持期間を延長する方法については、[データ保持期間の延長][8]を参照してください。

## 次のステップ {#next-steps}

ヒートマップを分析した後は、関連データを調査してユーザーアクションを理解します。関連する [Session Replay][1] を視聴してセッション全体のコンテキストでユーザーアクションを確認するか、[RUM][3] または [Product Analytics][4] の Analytics Explorer に移動してユーザーデータを分析します。

## トラブルシューティング {#troubleshooting}

### あるビューのヒートマップを確認していますが、予期しないページが表示されています。{#i-am-looking-at-a-heatmap-for-a-given-view-but-its-showing-me-an-unexpected-page}

ヒートマップはビュー名に基づいています。アプリケーションの構成によっては、多くのページが同じビュー名でグループ化されたり、特定のビュー名が付けられたりすることがあります。

### 選択したビューに初期コンテンツが表示されていません。{#the-view-that-i-selected-is-not-showing-the-initial-content}

ヒートマップは Session Replay データを使用して生成されます。Datadog のインテリジェントなアルゴリズムが、最新で、ページの初期状態に最も近い Session Replay を選択します。場合によっては、この Session Replay が目的のものとは異なることがあります。ヒートマップのスナップショットを切り替えるには、{{< ui >}}Change Snapshot{{< /ui >}} ボタンを使用して Session Replay のさまざまな状態を切り替え、目的の状態を見つけます。表示している Session Replay に目的のスナップショットがない場合は、{{< ui >}}Choose Another Replay{{< /ui >}} ボタンを使用して同じビューの別の Session Replay を選択できます。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-change-the-snapshot.mp4" alt="[Change Snapshot] ボタンをクリックして、別の背景を選択します。" video=true >}}

### ヒートマップ横のアクションリストに、ヒートマップでは表示されない要素を示すアイコンがあります。{#on-the-action-list-on-the-side-of-my-heatmap-i-see-an-icon-showing-an-element-that-is-not-visible-in-the-heatmap}

アイコンのツールチップには、要素が表示されていないことが示されています。これは、その要素がページ上でよく実行されるアクションであるものの、ヒートマップのスナップショットには表示されていないことを意味します。その要素を確認するには、右上の {{< ui >}}Change Snapshot{{< /ui >}} をクリックして、その要素が存在するスナップショットにヒートマップを切り替えます。

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-hidden-elements.png" alt="ヒートマップのアクションリスト内の非表示要素。" style="width:100%;">}}

### ヒートマップを作成しようとすると、[No Replay Data] という状態が表示されます。{#after-attempting-to-create-a-heatmap-i-see-a-no-replay-data-state-appear}

[No Replay Data] 状態は、ヒートマップの背景として使用できる Session Replay が Datadog で見つからなかったことを意味します。一般的な原因:

- 選択した期間が、デフォルトの 30 日間の Session Replay 保持期間よりも前である。クリックデータは存在する可能性がありますが、背景として使用する Session Replay が残っていません。[リプレイの保持期間を超えてヒートマップを分析する](#analyzing-heatmaps-beyond-replay-retention)を参照してください。
- 現在の検索フィルターに一致する Session Replay がありません。
- [Browser SDK][2] での記録を開始したばかりのため、Session Replay はまだ利用できません。これには数分かかる場合があります。

### ヒートマップを作成しようとすると、[Not enough data to generate a heatmap] という状態が表示されます。{#after-attempting-to-create-a-heatmap-i-see-a-not-enough-data-to-generate-a-heatmap-state-appear}

これは、Datadog が現在選択されている Session Replay と一致するユーザーアクションを見つけられなかったことを意味します。これは、以下のようなさまざまな理由で発生します。

- アプリケーションが最新の SDK バージョン (>= 4.20.0) を使用していません。
- ページが最近、大幅に変更されています。

### ページ内のユーザー情報がすべて空になっています。{#all-of-the-user-information-on-the-page-is-empty}

ユーザー情報はデフォルトでは収集されません。ヒートマップは、セッションデータで利用可能なユーザー情報を使用して、行動に関する関連性の高いインサイトを表示します。

## 参考資料 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/session_replay/
[2]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/package.json
[3]: /ja/real_user_monitoring/explorer/
[4]: /ja/product_analytics/charts/analytics_explorer/
[5]: /ja/session_replay/privacy_options?platform=browser#privacy-options
[6]: https://chromewebstore.google.com/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[7]: /ja/data_security/data_retention_periods/
[8]: /ja/session_replay/#extend-data-retention