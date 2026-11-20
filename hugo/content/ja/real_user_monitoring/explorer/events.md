---
description: サイドパネルで、コンテキスト、ウォーターフォール、パフォーマンスの時系列、パフォーマンスデータなど、個々の RUM イベントに関する詳細情報を表示します。
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: ドキュメント
  text: イベント検索
- link: /real_user_monitoring/application_monitoring/mobile_vitals/#performance-timeseries
  tag: ドキュメント
  text: モバイルバイタルとパフォーマンスの時系列
title: イベントサイドパネル
---
## 概要{#overview}

Real User Monitoring (RUM) エクスプローラーは、個々のイベントをサイドパネルに表示します。[RUM エクスプローラー][1]でイベントサイドパネルを開くには、{{< ui >}}List{{< /ui >}} 可視化タイプのテーブル行をクリックします。

サイドパネルのヘッダーを使用して、ユーザーに関するコンテキスト情報 (環境、国) や、表示パスや読み込みタイプなどのイベント固有の詳細を表示します。Synthetic テスト実行の場合は、テスト ID をクリックして結果を表示します。

上部の分布ビジュアルは、現在のビューが中央値に近いか外れ値であるかを把握するのに役立ちます。ドロップダウンを使用して切り替えます。 {{< tooltip text="Loading Time" tooltip="ページの準備が整い、ネットワークリクエストや DOM ミューテーションが発生していない状態になるまでの時間。モバイルアプリには、手動で報告される異なる読み込み時間があります。<a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#all-performance-telemetry'>詳細はこちら</a>" >}}、または以下のような Web およびモバイルのバイタル。 {{< tooltip text="Time To First Byte" tooltip="ビューの 1 バイト目を受信した時点までの経過時間。<a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#all-performance-telemetry'>詳細はこちら</a>" >}}、{{< tooltip text="FCP" tooltip="First Contentful Paint: ブラウザがテキスト、画像、または SVG を最初にレンダリングするまでの時間。<a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>詳細はこちら</a>" >}}、{{< tooltip text="LCP" tooltip="Largest Contentful Paint: ビューポート内の最大の DOM オブジェクトがレンダリングされるまでの時間。<a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>詳細はこちら</a>" >}}、{{< tooltip text="CLS" tooltip="Cumulative Layout Shift: 動的に読み込まれたコンテンツによる予期しないページの移動量を定量化します。<a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>詳細はこちら</a>" >}}、{{< tooltip text="INP" tooltip="Interaction to Next Paint: ユーザーの操作から次のペイントまでの最長所要時間。<a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>詳細はこちら</a>" >}}、リフレッシュレート、および平均メモリ。期間を調整して、日、週、月単位でデータを表示します。

{{< img src="real_user_monitoring/explorer/events/side-panel-overview-2.png" alt="分布ビジュアル、ウォーターフォールタイムライン、およびフィルターオプションを表示する RUM エクスプローラーのサイドパネル" width="100%" >}}

いずれかのタブをクリックして対応する詳細を表示し、イベントの特定の側面を調査します。一覧については、[追加タブ](#additional-tabs)を参照してください。

## ユーザーセッション間の移動 {#navigate-between-user-sessions}

RUM SDK で `@usr.id` が設定され、エクスプローラーを特定の `@usr.id` 値でフィルターすると、セッションサイドパネルに {{< ui >}}Previous{{< /ui >}} ボタンと {{< ui >}}Next{{< /ui >}} ボタンが表示されます。これらのボタンを使用すると、エクスプローラーリストに戻ることなく、そのユーザーのセッション間を移動できます。

[保持フィルター][5]によって保持されたセッションのみがナビゲーションに表示されます。保持されていないセッションはスキップされます。たとえば、ユーザーに 3 つのセッションがあり、1 番目と 3 番目のみが保持されている場合、ボタンを使用してこれら 2 つのセッション間を直接移動できます。間にセッションが存在したことは示されません。

`@usr.id` を構成するには、[高度な構成][6]を参照してください。

{{< img src="real_user_monitoring/explorer/events/rum-explorer-session-continuity.png" alt="[Previous] および [Next] のナビゲーションボタンが強調表示された RUM エクスプローラーのセッションサイドパネル。セッション開始画面と終了理由を示すツールチップが表示されています。" style="width:100%;" >}}

## ウォーターフォールタブ {#waterfall-tab}

{{< ui >}}Waterfall{{< /ui >}} タブには、このビューに関連付けられたイベントのインタラクティブなタイムラインが表示されます。オーバーレイには、[Core Web Vitals][3] やモバイルのタイミングなど、主要なパフォーマンスマーカーが合格または不合格のインジケーターと共に表示されます。

{{< img src="real_user_monitoring/explorer/events/events_side_panel-3.mp4" alt="ウォーターフォールタブでのウォーターフォールタイムラインの操作" video="true" width="80%" >}}

###  ウォーターフォールのフィルター {#filtering-the-waterfall}

ウォーターフォールに表示するイベントを制御。

- **クリティカルパス別**: {{< ui >}}Critical Events{{< /ui >}} トグルをクリックして、主要なパフォーマンスタイミングに直接影響を与えるイベントのみを表示します。
- **属性別**: ウォーターフォールの上部にあるフィルターボタンを使用します。フィルターをクリックすると、リソース URL、アクション名、エラーメッセージなどの追加オプションにアクセスできます。
- **時間範囲別**: ミニマップの時間セレクターをドラッグするか、左側のサイドバーを展開してタイミングをクリックし、その時点より前のイベントに絞り込みます。

左側のサイドバーには、[addTiming API][4] からのカスタムタイミングを含む主要なタイミングが表示されます。

### イベントの調査 {#inspecting-events}

ウォーターフォール内のイベントにカーソルを合わせると、タイムスタンプ、所要時間、および寄与要因 (スクリプト、スタイル/レイアウト、その他の処理) が表示されます。Core Web Vital にカーソルを合わせると、その定義、しきい値、および p75 との比較が表示されます。

{{< img src="real_user_monitoring/explorer/events/specific-times-1.png" alt="パフォーマンスの詳細、しきい値インジケーター、および p75 パフォーマンスとの比較を示す読み込み時間のポップオーバー" width="100%" >}}

### 接続されたテレメトリ {#connected-telemetry}

ウォーターフォールのイベントをクリックして、関連データにアクセスします。

- {{< ui >}}Resources{{< /ui >}}: 接続されたバックエンドトレースを表示します。
- {{< ui >}}Long Animation Frames{{< /ui >}}: パフォーマンス分析に関連付けられたプロファイルにアクセスします。

## パフォーマンス時系列{#performance-timeseries}

{{< callout url="https://www.datadoghq.com/product-preview/rum-timeseries/" btn_hidden="false" header="プレビューに参加しましょう。">}}
パフォーマンス時系列はプレビュー版であり、デフォルトではデータ収集がオフになっています。有効にするには、プレビューに参加してください。Datadog は、参加するお客様にセットアップ手順を送信します。
{{< /callout >}}

{{< img src="real_user_monitoring/mobile_vitals/timeseries-panel.png" alt="セッション全体にわたるインタラクティブなメモリおよび CPU グラフを表示する、RUM サイドパネルの「パフォーマンス時系列」セクション" style="width:100%;" >}}

iOS および Android SDK からのセッションの場合、{{< ui >}}Performance Timeseries{{< /ui >}} セクションには、セッション全体で 1 秒ごとにキャプチャされたアプリケーションのリソース使用量の {{< ui >}}Memory & CPU{{< /ui >}} グラフが表示されます。セッション、ビュー、および操作のサイドパネルで利用できます。

グラフはセッション全体を対象としています。ビューや操作から開くと、そのビューや操作の開始位置と終了位置がマーカーで示されるため、その前後で実行されたすべての処理と照らし合わせてリソース使用量を確認できます。アプリケーションがバックグラウンドにあった期間は網掛けで表示されます。

各系列の測定内容については、[モバイルバイタル][7] を参照してください。

## その他のタブ {#additional-tabs}

その他のタブを使用して、関連データを調査します。

{{< ui >}}Replay{{< /ui >}}
: ユーザーセッションのビジュアルリプレイを再生します。

{{< ui >}}Errors{{< /ui >}}
: イベントに関連付けられたエラーを表示します。

{{< ui >}}Resources{{< /ui >}}
: イベント中に読み込まれたすべてのリソースを調査します。

{{< ui >}}Traces{{< /ui >}}
: イベントに接続されたバックエンドトレースを確認します。

{{< ui >}}Feature Flags{{< /ui >}}
: イベント中に評価されたフィーチャーフラグを表示します。

{{< ui >}}Actions{{< /ui >}}
: セッション中にキャプチャされたユーザーアクションを確認します。

{{< ui >}}Logs{{< /ui >}}
: イベントに関連付けられたログにアクセスします。

{{< ui >}}Attributes{{< /ui >}}
: 収集されたコンテキスト属性を表示します。[グローバルコンテキスト API][2] を使用してカスタム属性を追加します。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/explorer
[2]: /ja/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#global-context
[3]: /ja/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[4]: /ja/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#track-additional-performance-timings
[5]: /ja/real_user_monitoring/rum_without_limits/retention_filters
[6]: /ja/real_user_monitoring/application_monitoring/browser/advanced_configuration/
[7]: /ja/real_user_monitoring/application_monitoring/mobile_vitals/#performance-timeseries