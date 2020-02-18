---
title: RUM ビュー
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
  text: Datadog 標準属性
---

ページビューとは、ウェブサイトからページへアクセスするユーザー数のことです。一意の属性 `view.id` を使うと、ページビューの間のエラー、リソース、ロングタスク、ユーザーアクションがそのページビューにアタッチされます。新しいイベントが収集されると、ページビューは更新されます。

ページビューには、読み込みパフォーマンスのメトリクスが [Paint Timing API][1] と [Navigation Timing API][2] の両方から収集されます。

シングルページアプリケーション（SPA）では、最初にアクセスしたページでのみパフォーマンスメトリクスを使用できます。ReactJS、AngularJS、VueJS といった最新の Web フレームワークでは、ページをリロードせずにウェブサイトのコンテンツが更新されるため、Datadog は従来のパフォーマンスメトリクスを収集できません。RUM は、[履歴 API][3] を使用してページの変更を追跡できます。

## 収集される測定値

{{< img src="real_user_monitoring/data_collected/view/timing_overview.png" alt="タイミングの概要" responsive="true" >}}

| 属性                              | 種類        | 説明                                                                                                                                                                                                                 |
|----------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.measures.first_contentful_paint` | 数 | ブラウザによりテキスト、画像（背景画像を含む）、白以外のキャンバス、または SVG が最初にレンダリングされた時間。[詳細][4]                                                                                                |
| `view.measures.dom_interactive`        | 数 | パーサーによりメインドキュメントの作業が終了された瞬間。[MDN ドキュメントの詳細][5]                                                                                                               |
| `view.measures.dom_content_loaded`     | 数 | 最初の HTML ドキュメントがレンダリング以外のブロッキングスタイルシート、画像、サブフレームの読み込み完了を待たずに完全に読み込まれ解析される際に発生するイベント。[MDN ドキュメントの詳細][6]。 |
| `view.measures.dom_complete`           | 数 | ページとすべてのサブリソースの準備が完了。ユーザー側では、ローディングスピナーの回転が停止。[MDN ドキュメントの詳細][7]                                                                             |
| `view.measures.load_event_end`         | 数 | ページが完全に読み込まれた際に発生するイベント。通常は追加のアプリケーションロジックのトリガー。[MDN ドキュメントの詳細][8]                                                                                   |
| `view.measures.error_count`            | number      | このビューについてこれまでに収集されたすべてのエラーの数。                                                                                                                                                                        |
| `view.measures.long_task_count`        | number      | このビューについて収集されたすべてのロングタスクの数。                                                                                                                                                                           |
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
