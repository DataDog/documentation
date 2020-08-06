---
title: RUM ビュー
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: ブログ
    text: リアルユーザーモニタリング
  - link: /real_user_monitoring/dashboards/
    tag: ドキュメント
    text: 追加設定なしで使用できるダッシュボードでRUMデータを視覚化します
  - link: /real_user_monitoring/explorer/
    tag: ドキュメント
    text: Datadog でビューを検索する
  - link: /logs/processing/attributes_naming_convention/
    tag: ドキュメント
    text: Datadog 標準属性
---
ページビューとは、ウェブサイトからページへアクセスするユーザー数のことです。一意の属性 `view.id` を使うと、ページビューの間の[エラー][1]、[リソース][2]、[ロングタスク][3]、[ユーザーアクション][4]がそのページビューにアタッチされます。新しいイベントが収集されると、ページビューは更新されます。

ページビューには、読み込みパフォーマンスのメトリクスが [Paint Timing API][5] と [Navigation Timing API][6] の両方から収集されます。

## シングルページアプリケーション

シングルページアプリケーション (SPA) の場合、RUM SDK は、`loading_type` 属性を使用して、`initial_load` ナビゲーションと `route_change` ナビゲーションを区別します。ウェブページをクリックすると、ページが完全に更新されずに新しいページが表示される場合、RUM SDK は、`loading_type:route_change` を使用して新しいビューイベントを開始します。RUM は、[履歴 API][7]を使用してページの変更を追跡します。

Datadog は、ページの読み込みに必要な時間を計算する独自のパフォーマンスメトリクス、`loading_time` を提供します。このメトリクスは、`initial_load` と `route_change` の両方のナビゲーションで機能します。

### 読み込み時間はどのように計算されますか？
最新のウェブアプリケーションを考慮するために、読み込み時間はネットワークリクエストと DOM のミューテーションを監視します。

* **Initial Load**: 読み込み時間は、次の*どちらか長い方*になります*。

    - `navigationStart` と `loadEventEnd` の差。
    - または、`navigationStart` と、ページに 100 ミリ秒を超えて初めてアクティビティがないときの差 (アクティビティは、進行中のネットワークリクエストとして定義されているか、DOM ミューテーションが現在発生しています)。

* **SPA Route Change**: 読み込み時間は、ユーザーのクリックと、ページに 100 ミリ秒を超えて初めてアクティビティがないときの差に等しくなります (アクティビティは、進行中のネットワークリクエストとして定義されているか、DOM ミューテーションが現在発生しています)

## 収集されるメトリクス

{{< img src="real_user_monitoring/data_collected/view/timing_overview.png" alt="タイミングの概要"  >}}

| 属性                              | タイプ        | 説明                                                                                                                                                                                                                 |
|----------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | 数値（ns） | 現在のビューに費やした時間。                                                                                                                                                                                                  |
| `view.loading_time`                             | 数値（ns） | ページの準備が整い、ネットワークリクエストまたは DOM ミューテーションが現在発生していない状態になるまでの時間。[収集データドキュメントの詳細][8]|
| `view.measures.first_contentful_paint` | 数値（ns） | ブラウザによりテキスト、画像（背景画像を含む）、白以外のキャンバス、または SVG が最初にレンダリングされた時間。ブラウザのレンダリングの詳細については、[w3 定義][9]を参照してください。                                                                                            |
| `view.measures.dom_interactive`        | 数値（ns） | パーサーによりメインドキュメントの作業が終了された瞬間。[MDN ドキュメントの詳細][10]                                                                                                               |
| `view.measures.dom_content_loaded`     | 数値（ns） | 最初の HTML ドキュメントがレンダリング以外のブロッキングスタイルシート、画像、サブフレームの読み込み完了を待たずに完全に読み込まれ解析される際に発生するイベント。[MDN ドキュメントの詳細][11]。 |
| `view.measures.dom_complete`           | 数値（ns） | ページとすべてのサブリソースの準備が完了。ユーザー側では、ローディングスピナーの回転が停止。[MDN ドキュメントの詳細][12]                                                                             |
| `view.measures.load_event_end`         | 数値（ns） | ページが完全に読み込まれた際に発生するイベント。通常は追加のアプリケーションロジックのトリガー。[MDN ドキュメントの詳細][13]                                                                                   |
| `view.measures.error_count`            | 数値      | このビューについてこれまでに収集されたすべてのエラーの数。                                                                                                                                                                        |
| `view.measures.long_task_count`        | 数値      | このビューについて収集されたすべてのロングタスクの数。                                                                                                                                                                           |
| `view.measures.resource_count`         | 数値      | このビューについて収集されたすべてのリソースの数。                                                                                                                                                                            |
| `view.measures.user_action_count`      | 数値      | このビューについて収集されたすべてのユーザーアクションの数。                                                                                                                                                                         |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/data_collected/error/
[2]: /ja/real_user_monitoring/data_collected/resource/
[3]: /ja/real_user_monitoring/data_collected/long_task/
[4]: /ja/real_user_monitoring/data_collected/user_action/
[5]: https://www.w3.org/TR/paint-timing/
[6]: https://www.w3.org/TR/navigation-timing/#sec-navigation-timing
[7]: https://developer.mozilla.org/en-US/docs/Web/API/History
[8]: /ja/real_user_monitoring/data_collected/view/#how-is-loading-time-calculated
[9]: https://www.w3.org/TR/paint-timing/#sec-terminology
[10]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event