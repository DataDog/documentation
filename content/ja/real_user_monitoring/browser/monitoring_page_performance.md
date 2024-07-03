---
further_reading:
- link: https://learn.datadoghq.com/courses/core-web-vitals-lab
  tag: ラーニングセンター
  text: 'インタラクティブラボ: コアウェブバイタル'
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: ブログ
  text: リアルユーザーモニタリング (RUM)
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/
  tag: ブログ
  text: Datadog RUM および Synthetic モニタリングでウェブに関する主な指標を監視
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Datadog でビューを検索する
- link: /real_user_monitoring/explorer/visualize/
  tag: ドキュメント
  text: イベントへの視覚化の適用
- link: /real_user_monitoring/platform/dashboards/
  tag: Documentation
  text: RUM ダッシュボードについて
title: ページのパフォーマンスの監視
---

## 概要

RUM のビューイベントは、各ページビューについて広範囲のパフォーマンスメトリクスを収集します。アプリケーションのページビューを監視し、ダッシュボードや RUM エクスプローラーでパフォーマンスメトリクスを確認することができます。

{{< img src="real_user_monitoring/browser/waterfall-4.png" alt="RUM エクスプローラーの RUM ビューの Performance タブに表示されるウォーターフォールグラフ" style="width:100%;" >}}

以下で、ビューのパフォーマンスメトリクスにアクセスできます。

- すぐに使える [RUM ダッシュボード][1]。これは、アプリケーションのパフォーマンスの概要を表示するものです。例えば、RUM が収集した[デフォルト属性][2]にフィルターをかけて、[パフォーマンス概要ダッシュボード][3]でユーザーのサブセットに影響を与える問題を浮き彫りにすることができます。また、このダッシュボードを複製してニーズに合わせてカスタマイズし、ダッシュボードのクエリで任意の [RUM パフォーマンスメトリクス](#all-performance-metrics)を使用することができます。
- [RUM エクスプローラー][4]の各 RUM ビューイベントでアクセスできるパフォーマンスウォーターフォール。ここでは、特定のページビューのパフォーマンスのトラブルシューティングを行うことが可能です。Web サイトのアセットやリソース、ロングタスク、フロントエンドエラーが、エンドユーザーのページレベルのパフォーマンスにどのような影響を与えるかが表示されます。

## イベントのタイミングとコア Web バイタル

<div class="alert alert-warning">
Datadog の Core Web Vitals メトリクスは、<a href="https://github.com/DataDog/browser-sdk">@datadog/browser-rum</a> パッケージ v2.2.0 以降から入手できます。
</div>

[Google のウェブに関する主な指標][5]は、サイトのユーザーエクスペリエンスを監視するために設計された 3 つのメトリクスのセットです。これらのメトリクスは、負荷パフォーマンス、対話性、視覚的安定性のビューを提供することに重点を置いています。各メトリクスには、優れたユーザーエクスペリエンスにつながる値の範囲に関するガイダンスが付属しています。Datadog では、このメトリクスの 75 パーセンタイルの監視をおすすめしています。

{{< img src="real_user_monitoring/browser/core-web-vitals.png" alt="コアウェブバイタルの概要の視覚化" >}}

- バックグラウンドで開かれたページの First Input Delay および Largest Contentful Paint は収集されません（たとえば、新規タブや焦点のないウィンドウ）。
- 実際のユーザーのページビューから収集されたメトリクスは、[Synthetic ブラウザテスト][6]などの固定され制御された環境で読み込まれたページに対して計算されたものと異なる場合があります。Synthetic Monitoring では、Largest Contentful Paint と Cumulative Layout Shift を実際のメトリクスではなく、ラボメトリクスとして表示します。

| メトリクス                   | 焦点            | 説明                                                                                           | 対象値 |
|--------------------------|------------------|-------------------------------------------------------------------------------------------------------|--------------|
| [Largest Contentful Paint][7] | ロードパフォーマンス | ビューポート内の最大の DOM オブジェクト (つまり、画面に表示される) がレンダリングされるページ読み込みタイムラインの瞬間。         | 2.5秒以下       |
| [First Input Delay][8]        | インタラクティブなアクティビティ    | ユーザーがページを最初に操作してからブラウザが応答するまでの経過時間。             | 100ms以下      |
| [Cumulative Layout Shift][9]  | ビジュアルの安定性 | 動的に読み込まれるコンテンツ (サードパーティの広告など) による予期しないページ移動を定量化します。0 はシフトが発生していないことを意味します。 | 0.1以下        |
| [Interaction To Next Paint][19]| インタラクティブなアクティビティ    | ユーザーがページを操作してから次の描画までの最長の所要時間。RUM SDK v5.1.0 が必要です。 | <200ms        |

### コア Web バイタルのターゲット要素

高いコア Web バイタルメトリクスのトリガーとなった要素を特定することは、根本的な原因を理解し、パフォーマンスを改善するための第一歩です。
RUM は、各コア Web バイタルインスタンスに関連付けられている要素をレポートします。

- Largest Contentful Paint では、RUM は最大のコンテンツ描画に対応する要素の CSS セレクタをレポートします。
- Interaction to Next Paint では、RUM は次の描画までの最長のインタラクションに関連する要素の CSS セレクタをレポートします。
- First Input Delay では、RUM はユーザーが最初に操作した要素の CSS セレクタをレポートします。
- Cumulative Layout Shift では、RUM は CLS に最も影響を与えるシフトした要素の CSS セレクタをレポートします。

## すべてのパフォーマンスメトリクス

| 属性                       | タイプ        | 説明                                                                                                                                                                                                                      |
|---------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`               | 数値 (ns) | 現在のビューで過ごした時間。                                                                                                                                                                                                  |
| `view.first_byte`               | 数値 (ns) | ビューの 1 バイト目を受信した時点までの経過時間。                                                                                                |
| `view.largest_contentful_paint` | 数値 (ns) | ページの読み込みタイムラインにおいて、ビューポート内で最大の DOM オブジェクトがレンダリングされて画面上に表示される瞬間。                                                                                                               |
| `view.largest_contentful_paint_target_selector` | 文字列 (CSS セレクタ) | 最大のコンテンツ描画に対応する要素の CSS セレクタ。                                                                                     |
| `view.first_input_delay`        | 数値 (ns) | ユーザーがページを最初に操作してからブラウザが応答するまでの経過時間。                                                                                                                                        |
| `view.first_input_delay_target_selector`      | 文字列 (CSS セレクタ) | ユーザーが最初に操作した要素の CSS セレクタ。                                                                                                                |
| `view.interaction_to_next_paint`| 数値 (ns) | ユーザーがページを操作してから次の描画までの最長の所要時間。                                                                                                                              |
| `view.interaction_to_next_paint_target_selector`| 文字列 (CSS セレクタ) | 次の描画までの最長のインタラクションに関連する要素の CSS セレクタ。                                                                                                          |
| `view.cumulative_layout_shift`  | 数値      | 動的に読み込まれるコンテンツ (サードパーティの広告など) による予期せぬページの移動を定量化します。0 は移動が発生していないことを意味します。                                                                                      |
| `view.cumulative_layout_shift_target_selector`  | 文字列 (CSS セレクタ) | ページの CLS に最も影響を与えるシフトした要素の CSS セレクタ。                                           |
| `view.loading_time`             | 数値 (ns) | ページの準備が整い、ネットワークリクエストまたは DOM ミューテーションが現在発生していない状態になるまでの時間。詳しくは[ページパフォーマンスの監視][10]をご覧ください。                                                                          |
| `view.first_contentful_paint`   | 数値 (ns) | ブラウザによりテキスト、画像（背景画像を含む）、白以外のキャンバス、または SVG が最初にレンダリングする時間。ブラウザのレンダリングの詳細については、[w3c 定義][11]を参照してください。                                         |
| `view.dom_interactive`          | 数値 (ns) | パーサーによりメインドキュメントの作業が終了する瞬間。詳しくは、[MDN ドキュメント][12]を参照してください。                                                                                                        |
| `view.dom_content_loaded`       | 数値 (ns) | 最初の HTML ドキュメントがレンダリング以外のブロッキングスタイルシート、画像、サブフレームの読み込み完了を待たずに完全に読み込まれ解析される際に発生するイベント。詳しくは、[MDN ドキュメント][13]を参照してください。 |
| `view.dom_complete`             | 数値 (ns) | ページとすべてのサブリソースの準備が完了。ユーザー側では、ローディングスピナーの回転が停止。詳しくは、[MDN ドキュメント][14]を参照してください。                                                                     |
| `view.load_event`               | 数値 (ns) | ページが完全に読み込まれた際に発生するイベント。通常は追加のアプリケーションロジックのトリガー。詳しくは、[MDN ドキュメント][15]を参照してください。                                                                            |
| `view.error.count`              | 数値      | このビューについて収集されたすべてのエラーの数。                                                                                                                                                                                     |
| `view.long_task.count`          | 数値      | このビューについて収集されたすべてのロングタスクの数。                                                                                                                                                                                 |
| `view.resource.count`           | 数値      | このビューについて収集されたすべてのリソースの数。                                                                                                                                                                                  |
| `view.action.count`             | 数値      | このビューについて収集されたすべてのアクションの数。                                                                                                                                                                                    |

## シングルページアプリケーション (SPA) の監視

シングルページアプリケーション (SPA) の場合、RUM ブラウザ SDK は、`loading_type` 属性を使用して、`initial_load` ナビゲーションと `route_change` ナビゲーションを区別します。ウェブページを操作すると、ページが完全に更新されずに異なる URL に移動する場合、RUM SDK は、`loading_type:route_change` を使用して新しいビューイベントを開始します。RUM は、[履歴 API][16] を使用して URL の変更を追跡します。

Datadog は、ページの読み込みに必要な時間を計算する独自のパフォーマンスメトリクス、`loading_time` を提供します。このメトリクスは、`initial_load` と `route_change` の両方のナビゲーションで機能します。

### ロード時間の計算方法

最新のウェブアプリケーションを考慮するために、読み込み時間はネットワークリクエストと DOM のミューテーションを監視します。

- **Initial Load**: 読み込み時間は、次の_どちらか長い方_になります。

  - `navigationStart` と `loadEventEnd` の差、または
  - `navigationStart` とページで初めてアクティビティがなくなる時間との差。詳しくは、[ページアクティビティの計算方法](#how-page-activity-is-calculated)をご覧ください。

- **SPA Route Change**: ロード時間は、URL が変わってから、そのページに初めてアクティビティが発生するまでの差に相当します。詳しくは、[ページアクティビティの計算方法](#how-page-activity-is-calculated)をご覧ください。

### ページアクティビティの計算方法

RUM ブラウザ SDK は、インターフェイスが再び安定するまでの時間を推定するために、ページのアクティビティを追跡します。ページは、以下の場合にアクティビティがあるとみなされます。

- `xhr` または `fetch` リクエストが進行中です。
- ブラウザは、パフォーマンスリソースのタイミングエントリ (JS や CSS などの読み込み終了) を発行します。
- ブラウザは DOM のミューテーションを発行します。

ページのアクティビティは、100ms 間アクティビティがなかった場合に終了したと判断されます。

**注**: SDK の初期化後に発生したアクティビティのみを考慮します。

**注意事項:**

最後のリクエストまたは DOM 変異から 100ms という基準は、以下のシナリオではアクティビティの正確な判断にならないかもしれません。

- アプリケーションは、定期的またはクリックごとに API へのリクエストを送信することで分析を収集します。
- アプリケーションは "[comet][17]" の技術 (つまり、ストリーミングやロングポーリング) を使用しており、リクエストは不定時間保留されたままです。

このような場合のアクティビティ判定の精度を向上させるには、`excludedActivityUrls` を指定します。これは、ページアクティビティを計算する際に RUM ブラウザ SDK が除外するリソースのリストです。

```javascript
window.DD_RUM.init({
    ...
    excludedActivityUrls: [
        // 正確な URL を除外する
        'https://third-party-analytics-provider.com/endpoint',

        // /comet で終わる URL を除外する
        /\/comet$/,

        // 関数が true を返す URL を除外する
        (url) => url === 'https://third-party-analytics-provider.com/endpoint',
    ]
})
```

### Hash SPA ナビゲーション

RUM SDK は、ハッシュ (`#`) ナビゲーションに依存するフレームワークを自動的に監視します。SDK は `HashChangeEvent` を監視し、新しいビューを表示します。現在のビューのコンテキストに影響しない HTML アンカータグからくるイベントは無視されます。

## 独自のパフォーマンスタイミングを追加

RUM のデフォルトのパフォーマンスタイミングに加えて、アプリケーションで時間がかかっている場所をより柔軟に計測することが可能です。`addTiming` API を使用すると、パフォーマンスタイミングを簡単に追加できます。

たとえば、ヒーロー画像が表示されたときのタイミングを追加します。

```html
<html>
  <body>
    <img onload="window.DD_RUM.addTiming('hero_image')" src="/path/to/img.png" />
  </body>
</html>
```

または、ユーザーが初めてスクロールしたとき:

```javascript
document.addEventListener("scroll", function handler() {
    //1度だけトリガーするよう、イベントリスナーを削除
    document.removeEventListener("scroll", handler);
    window.DD_RUM.addTiming('first_scroll');
});
```

タイミングが送信されると、タイミングはナノ秒単位で `@view.custom_timings.<timing_name>` (たとえば `@view.custom_timings.first_scroll`) としてアクセス可能になります。RUM エクスプローラーまたはダッシュボードで視覚化を作成する前に、[メジャーを作成][18]する必要があります。

シングルページアプリケーションの場合、`addTiming` API により現在の RUM ビューの開始の相対的なタイミングが発行されます。たとえば、ユーザーがアプリケーションを表示し（初期ロード）、次に別のページを 5 秒間表示して（ルート変更）、8 秒後に `addTiming` をトリガーした場合、タイミングは `8-5 = 3` 秒となります。

非同期セットアップを使用している場合は、2 番目のパラメーターとして自分のタイミング (UNIX エポックタイムスタンプ) を指定できます。

例:

```javascript
document.addEventListener("scroll", function handler() {
    //1 度だけトリガーするよう、イベントリスナーを削除 
    document.removeEventListener("scroll", handler);

    const timing = Date.now()
    window.DD_RUM.onReady(function() {
      window.DD_RUM.addTiming('first_scroll', timing);
    });
});

```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/platform/dashboards/
[2]: /ja/real_user_monitoring/browser/data_collected/#default-attributes
[3]: /ja/real_user_monitoring/platform/dashboards/performance
[4]: /ja/real_user_monitoring/explorer/
[5]: https://web.dev/vitals/
[6]: /ja/synthetics/browser_tests/
[7]: https://web.dev/lcp/
[8]: https://web.dev/fid/
[9]: https://web.dev/cls/
[10]: /ja/real_user_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[11]: https://www.w3.org/TR/paint-timing/#sec-terminology
[12]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[14]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[15]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[16]: https://developer.mozilla.org/en-US/docs/Web/API/History
[17]: https://en.wikipedia.org/wiki/Comet_&#40;programming&#41;
[18]: /ja/real_user_monitoring/explorer/search/#setup-facets-and-measures
[19]: https://web.dev/inp/