---
title: RUMビュー
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
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
  text: Datadog標準属性
---

ページビューは、Webサイトからページにアクセスするユーザーを表しています。そのページビューの間に、エラー、リソース、長いタスク、ユーザーアクションが一意の`view.id`属性でそのページビューにアタッチされます。 新しいイベントが収集されると、ページビューが更新されるのでご注意ください。

ページビューは、読み込みパフォーマンスメトリクスは[ペイントタイミングAPI] [1]と[ナビゲーションタイミングAPI] [2]の両方から収集されます。

シングルページアプリケーション（SPA）では、パフォーマンスメトリクスは最初にアクセスしたページでのみ使用できます。 ReactJS、AngularJS、VueJSといった最新のWebフレームワークは、ページをリロードせずにWebサイトのコンテンツを更新するため、Datadogは従来のパフォーマンスメトリクスを収集できません。 RUMは、[履歴API] [3]を使用してページの変更を追跡できます。

## 収集された測定値

{{< img src="real_user_monitoring/data_collected/view/timing_overview.png" alt="タイミングの概要" responsive="true" >}}

| 属性                              | 種類        | 説明                                                                                                                                                                                                                 |
|----------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.measures.first_contentful_paint` | 数 | ブラウザによりテキスト、（背景画像を含む）画像、白以外のキャンバス、またはSVGが最初にレンダリングされた時間。[詳細] [4]                                                                                                |
| `view.measures.dom_interactive`        | 数 | パーサーによりメインドキュメントの作業が終了された瞬間。 [MDNドキュメントの詳細] [5]                                                                                                               |
| `view.measures.dom_content_loaded`     | 数 | 最初のHTMLドキュメントがレンダリング以外のブロッキングスタイルシート、画像、サブフレームの読み込み完了を待たずに完全に読み込まれて解析される際に発生するイベント。 [MDNドキュメントの詳細] [6]。 |
| `view.measures.dom_complete`           | 数 | ページとすべてのサブリソースの準備ができました。 ユーザーのために、ローディングスピナーの回転を停止しました。 [MDNドキュメントの詳細] [7]                                                                             |
| `view.measures.load_event_end`         | 数 | 37
ページが完全に読み込まれる際に発生するイベント。 通常、追加のアプリケーションロジックのトリガー。 [MDNドキュメントの詳細] [8]                                                                                   |
| `view.measures.error_count`            | number      | このビューについてこれまでに収集されたすべてのエラーの数。                                                                                                                                                                        |
| `view.measures.long_task_count`        | number      | このビューについて収集されたすべての長いタスクの数。                                                                                                                                                                           |
| `view.measures.resource_count`         | number      | このビューについて収集されたすべてのリソースの数。                                                                                                                                                                            |
| `view.measures.user_action_count`      | number      | このビューについて収集されたすべてのユーザーアクションの数。                                                                                                                                                                         |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.w3.org/TR/paint-timing/
[2]: https://www.w3.org/TR/navigation-timing/#sec-navigation-timing
[3]: https://developer.mozilla.org/en-US/docs/Web/API/History
[4]: https://www.w3.org/TR/paint-timing/#sec-terminology
[5]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
