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
---
ユーザーがウェブサイトのページを訪問すると、新しい **RUM ビューイベント** が作成されます。このビューにはページの読み込みおよびパフォーマンスのライブメトリクスが含まれます。パフォーマンスメトリクスは、ページの読み込みが終わると定期的に Datadog へ送信されます。Datadog UI に表示される前の数秒間は空白になることがあります。

## パフォーマンスのボトルネックを特定

ページのパフォーマンスを低下させている要因を見つけるには

1. アプリケーションに [RUM ブラウザモニタリング][1]をセットアップして構成します。
2. RUM Applications ページで、[Performance Overview ダッシュボード][2]を開きます。モニター中のページの概要が表示されます。フィルターを使用してパフォーマンスの問題を絞り込み検索し、特定します。
3. 問題のあるページが見つかったら、概要ダッシュボードからすばやく RUM ビューに移動します。**View RUM events** をクリックして具体的な問題を [RUM Explorer][3] で開き、特定のユーザービューをクリックして確認します。ウォーターフォール形式のサイドパネルには、リソースの読み込み時間などのパフォーマンス詳細が表示されるため、ボトルネックやその他の問題を解決するのに役立ちます。
    {{< img src="real_user_monitoring/browser/rum-page-performance-dive.gif" alt="パフォーマンス概要ダッシュボードから、パフォーマンス詳細へ移動し問題を特定したビューを表示"  >}}

## ビューのパフォーマンスメトリクス

パフォーマンスメトリクスは、各ビューに対して収集されます。デフォルトで収集（現在のページビュー情報、GeoIP データ、ブラウザ情報など）され、[Global Context][4] で拡張された RUM コンテキストと使用すると、このメトリクスで問題が発生している場所を的確に把握できます。

以下のパフォーマンスメトリクスは、調査を開始するための重要な要素となります。

- **Time To First Byte:** サーバーのリクエスト処理にかかる時間。サーバーが遅い場合は、APM を使用してサーバー側の遅延原因を理解します。
- **First Contentful Paint:** 何かが表示されるまでの時間。RUM ウォーターフォールで、ブロックされているリソースや、ブラウザによるコンテンツのレンダリングを阻止している長時間タスクをチェックします。
- **Loading Time:** ページがインタラクティブになるまでの時間。RUM ウォーターフォールで、読み込もうとしているアセットが多すぎるかどうか、レンダリングをブロックしているリソースがあるか、などをチェックします。

## すべてのパフォーマンスメトリクス

すべての RUM イベントタイプのデフォルト属性に関する詳細は、[収集されるデータ][5]をご覧ください。サンプリングまたはグローバルコンテキストに関する情報は、[高度なコンフィギュレーション][6]をご覧ください。下記の表には、Datadog 専用のメトリクスと、[Navigation Timing API][7] および [Paint Timing API][8] から収集されるパフォーマンスメトリクスが示されています。

| 属性                              | タイプ        | 説明                                                                                                                                                                                                                 |
|----------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`                             | 数値（ns） | 現在のビューに費やした時間。                                                                                                                                                                                                  |
| `view.loading_time`                             | 数値（ns） | ページの準備が整い、ネットワークリクエストまたは DOM ミューテーションが現在発生していない状態になるまでの時間。[詳細](#how-is-loading-time-calculated)。|
| `view.first_contentful_paint` | 数値（ns） | ブラウザによりテキスト、画像（背景画像を含む）、白以外のキャンバス、または SVG が最初にレンダリングする時間。ブラウザのレンダリングの詳細については、[w3 定義][9]を参照してください。                                                                                            |
| `view.dom_interactive`        | 数値（ns） | パーサーによりメインドキュメントの作業が終了する瞬間。[MDN ドキュメントの詳細][10]                                                                                                               |
| `view.dom_content_loaded`     | 数値（ns） | 最初の HTML ドキュメントがレンダリング以外のブロッキングスタイルシート、画像、サブフレームの読み込み完了を待たずに完全に読み込まれ解析される際に発生するイベント。[MDN ドキュメントの詳細][11]。 |
| `view.dom_complete`           | 数値（ns） | ページとすべてのサブリソースの準備が完了。ユーザー側では、ローディングスピナーの回転が停止。[MDN ドキュメントの詳細][12]                                                                             |
| `view.load_event`         | 数値（ns） | ページが完全に読み込まれた際に発生するイベント。通常は追加のアプリケーションロジックのトリガー。[MDN ドキュメントの詳細][13]                                                                                   |
| `view.error.count`            | 数値      | このビューについて収集されたすべてのエラーの数。                                                                                                                                                                        |
| `view.long_task.count`        | 数値      | このビューについて収集されたすべてのロングタスクの数。                                                                                                                                                                           |
| `view.resource.count`         | 数値      | このビューについて収集されたすべてのリソースの数。                                                                                                                                                                            |
| `view.action.count`      | 数値      | このビューについて収集されたすべてのアクションの数。

## シングルページアプリケーションの監視

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

[1]: /ja/real_user_monitoring/browser/
[2]: /ja/real_user_monitoring/dashboards/performance_overview_dashboard
[3]: /ja/real_user_monitoring/explorer/
[4]: /ja/real_user_monitoring/browser/advanced_configuration/#add-global-context
[5]: /ja/real_user_monitoring/browser/data_collected/#default-attributes
[6]: /ja/real_user_monitoring/browser/advanced_configuration/
[7]: https://www.w3.org/TR/navigation-timing/#sec-navigation-timing
[8]: https://www.w3.org/TR/paint-timing/
[9]: https://www.w3.org/TR/paint-timing/#sec-terminology
[10]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[14]: https://developer.mozilla.org/en-US/docs/Web/API/History
[15]: /ja/real_user_monitoring/explorer/?tab=measures#setup-facets-and-measures