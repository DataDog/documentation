---
title: ページのパフォーマンスの監視
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: ブログ
    text: リアルユーザーモニタリング
  - link: /real_user_monitoring/explorer/
    tag: Documentation
    text: Datadog でビューを検索する
  - link: /real_user_monitoring/explorer/analytics/
    tag: Documentation
    text: イベントに関する分析論を組み立てる
  - link: /real_user_monitoring/dashboards/
    tag: Documentation
    text: RUM ダッシュボード
  - link: 'https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/'
    tag: ブログ
    text: Datadog RUM および Synthetic モニタリングでウェブに関する主な指標を監視
---
{{< img src="real_user_monitoring/browser/waterfall.png" alt="リアルユーザーモニタリングのページ読み込みウォーターフォール" style="width:75%;" >}}

## ビューのパフォーマンスメトリクス

RUM ビューイベントでは、すべてのページビューのパフォーマンスの広範なメトリクスが収集されます。Datadog では、以下の方法でパフォーマンスメトリクスを分析することをおすすめします。
- **ダッシュボード**: アプリケーションのパフォーマンスに関する概要を確認できます。たとえば、すぐに最新鋭の [Performance Overview dashboard][1] では、RUM で収集される[デフォルトの属性][2]にフィルターをかけ、ユーザーのサブセットに影響を与えている問題を表面化できます。このダッシュボードは、クローンを作成したりニーズに合わせてカスタマイズしたりすることが可能です。すべての [RUM パフォーマンスメトリクス](#all-performance-metrics)は、ダッシュボードクエリで使用できます。
- **RUM ウォーターフォール**: [RUM エクスプローラー][3]のあらゆる RUM ビューイベントでアクセス可能で、ここから特定のページビューのパフォーマンスのトラブルシューティングができます。エンドユーザーのパフォーマンスに影響を与えているウェブサイトのアセットおよびリソース、長時間タスク、フロントエンドエラーなどを、ページレベルで表示されます。

### Core Web Vitals

[Google のウェブに関する主な指標][4]は、サイトのユーザーエクスペリエンスを監視するために設計された 3 つのメトリクスのセットです。これらのメトリクスは、負荷パフォーマンス、対話性、視覚的安定性のビューを提供することに重点を置いています。各メトリクスには、優れたユーザーエクスペリエンスにつながる値の範囲に関するガイダンスが付属しています。Datadog では、このメトリクスの 75 パーセンタイルの監視をおすすめしています。

{{< img src="real_user_monitoring/browser/core-web-vitals.png" alt="コアウェブバイタルの概要の視覚化"  >}}

| メトリクス                   | 焦点            | 説明                                                                                           | 対象値 |
|--------------------------|------------------|-------------------------------------------------------------------------------------------------------|--------------|
| [Largest Contentful Paint][5] | ロードパフォーマンス | ビューポート内の最大の DOM オブジェクト (つまり、画面に表示される) がレンダリングされるページ読み込みタイムラインの瞬間。         | 2.5秒以下       |
| [First Input Delay][6]        | インタラクティブなアクティビティ    | ユーザーがページを最初に操作してからブラウザが応答するまでの経過時間。             | 100ms以下      |
| [Cumulative Layout Shift][7]  | ビジュアルの安定性 | 動的に読み込まれるコンテンツ (サードパーティの広告など) による予期しないページ移動を定量化します。0 はシフトが発生しないことを意味します。 | 0.1以下        |

**注**: 実際のユーザーページビューから収集されたメトリクスは、 [Synthetics ブラウザテスト][8]など固定環境で読み込まれたページ用に計算されたメトリクスと異なる場合があります。

### すべてのパフォーマンスメトリクス

| 属性                       | タイプ        | 説明                                                                                                                                                                                                           |
|---------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`               | 数値（ns） | 現在のビューに費やした時間。                                                                                                                                                                                       |
| `view.largest_contentful_paint` | 数値（ns） | ビューポート内の最大の DOM オブジェクト (つまり、画面に表示される) がレンダリングされるページ読み込みタイムラインの瞬間。                                                                                                |
| `view.first_input_delay`        | 数値（ns） | ユーザーがページを最初に操作してからブラウザが応答するまでの経過時間。                                                                                                                             |
| `view.cumulative_layout_shift`  | 数値      | 動的に読み込まれるコンテンツ (サードパーティの広告など) による予期しないページ移動を定量化します。0 はシフトが発生しないことを意味します。                                                                               |
| `view.loading_time`             | 数値（ns） | ページの準備が整い、ネットワークリクエストまたは DOM ミューテーションが現在発生していない状態になるまでの時間。[詳細](#how-is-loading-time-calculated)。                                                                             |
| `view.first_contentful_paint`   | 数値（ns） | ブラウザによりテキスト、画像（背景画像を含む）、白以外のキャンバス、または SVG が最初にレンダリングする時間。ブラウザのレンダリングの詳細については、[w3c 定義][9]を参照してください。                               |
| `view.dom_interactive`          | 数値（ns） | パーサーによりメインドキュメントの作業が終了する瞬間。[MDN ドキュメントの詳細][10]                                                                                                         |
| `view.dom_content_loaded`       | 数値（ns） | 最初の HTML ドキュメントがレンダリング以外のブロッキングスタイルシート、画像、サブフレームの読み込み完了を待たずに完全に読み込まれ解析される際に発生するイベント。[MDN ドキュメントの詳細][11]。 |
| `view.dom_complete`             | 数値（ns） | ページとすべてのサブリソースの準備が完了。ユーザー側では、ローディングスピナーの回転が停止。[MDN ドキュメントの詳細][12]                                                                       |
| `view.load_event`               | 数値（ns） | ページが完全に読み込まれた際に発生するイベント。通常は追加のアプリケーションロジックのトリガー。[MDN ドキュメントの詳細][13]                                                                             |
| `view.error.count`              | 数値      | このビューについて収集されたすべてのエラーの数。                                                                                                                                                                          |
| `view.long_task.count`          | 数値      | このビューについて収集されたすべてのロングタスクの数。                                                                                                                                                                      |
| `view.resource.count`           | 数値      | このビューについて収集されたすべてのリソースの数。                                                                                                                                                                       |
| `view.action.count`             | 数値      | このビューについて収集されたすべてのアクションの数。                                                                                                                                                                         |

## シングルページアプリケーション (SPA) の監視

シングルページアプリケーション (SPA) の場合、RUM SDK は、`loading_type` 属性を使用して、`initial_load` ナビゲーションと `route_change` ナビゲーションを区別します。ウェブページをクリックすると、ページが完全に更新されずに新しいページが表示される場合、RUM SDK は、`loading_type:route_change` を使用して新しいビューイベントを開始します。RUM は、[履歴 API][14]を使用してページの変更を追跡します。

Datadog は、ページの読み込みに必要な時間を計算する独自のパフォーマンスメトリクス、`loading_time` を提供します。このメトリクスは、`initial_load` と `route_change` の両方のナビゲーションで機能します。

### 読み込み時間はどのように計算されますか？

最新のウェブアプリケーションを考慮するために、読み込み時間はネットワークリクエストと DOM のミューテーションを監視します。

- **Initial Load**: 読み込み時間は、次の_どちらか長い方_になります。

  - `navigationStart` と `loadEventEnd` の差。
  - または、`navigationStart` と、ページに 100 ミリ秒を超えて初めてアクティビティがないときの差 (進行中のネットワークリクエストまたは DOM ミューテーションとして定義されたアクティビティ)。

- **SPA Route Change**: 読み込み時間は、ユーザーのクリックと、ページに 100 ミリ秒を超えて初めてアクティビティがないときの差に等しくなります (進行中のネットワークリクエストまたは DOM ミューテーションとして定義されたアクティビティ)。

### Hash SPA ナビゲーション

RUM SDK は、ハッシュ (`#`) ナビゲーションに依存するフレームワークを自動的に監視します。SDK は `HashChangeEvent` を監視し、新しいビューを表示します。現在のビューのコンテキストに影響しない HTML アンカータグからくるイベントは無視されます。

## 独自のパフォーマンスタイミングを追加
RUM のデフォルトのパフォーマンスタイミングに加えて、アプリケーションで時間がかかっている場所をより柔軟に計測することが可能です。`addTiming` API を使用すると、パフォーマンスタイミングを簡単に追加できます。たとえば、ヒーロー画像が表示されたときのタイミングを追加します。

```html
<html>
  <body>
    <img onload="DD_RUM.addTiming('hero_image')" src="/path/to/img.png" />
  </body>
</html>
```

または、ユーザーが初めてスクロールしたとき:

```javascript
document.addEventListener("scroll", function handler() {
    //1度だけトリガーするよう、イベントリスナーを削除
    document.removeEventListener("scroll", handler);
    DD_RUM.addTiming('first_scroll');
});
```

タイミングが送信されると、タイミングは `@view.custom_timings.<timing_name>` (たとえば `@view.custom_timings.first_scroll`) としてアクセス可能になります。RUM 分析またはダッシュボードでグラフを作成する前に、[メジャーを作成][15]する必要があります。

**注**: シングルページアプリケーションの場合、`addTiming` API により現在の RUM ビューの開始の相対的なタイミングが発行されます。たとえば、ユーザーがアプリケーションを表示し（初期ロード）、次に別のページを 5 秒間表示して（ルート変更）、8 秒後に `addTiming` をトリガーした場合、タイミングは 8-5 = 3 秒となります。
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/dashboards/performance_overview_dashboard
[2]: /ja/real_user_monitoring/browser/data_collected/#default-attributes
[3]: /ja/real_user_monitoring/explorer/
[4]: https://web.dev/vitals/
[5]: https://web.dev/lcp/
[6]: https://web.dev/fid/
[7]: https://web.dev/cls/
[8]: /ja/synthetics/browser_tests/
[9]: https://www.w3.org/TR/paint-timing/#sec-terminology
[10]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[14]: https://developer.mozilla.org/en-US/docs/Web/API/History
[15]: /ja/real_user_monitoring/explorer/?tab=measures#setup-facets-and-measures