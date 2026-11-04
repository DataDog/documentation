---
aliases:
- /ja/real_user_monitoring/ai_investigations/single_view_ai_investigation/
description: Bits Chat に特定のビューが遅い理由を尋ね、RUM チャートを分析し、RUM タスクを平易な言葉で完了します。
further_reading:
- link: /real_user_monitoring/bits_ai/
  tag: ドキュメント
  text: RUM における Bits
- link: /bits_ai/bits_chat/
  tag: ドキュメント
  text: Bits Chat
- link: /real_user_monitoring/explorer/events/
  tag: ドキュメント
  text: イベントサイドパネルを表示する
title: RUM で Bits Chat を使用する
---
## 概要 {#overview}

[Bits Chat][1] はすべての RUM ページで利用できます。Bits Chat は、現在表示しているページと表示内容をコンテキストとして利用し、トレース、ログ、プロファイルと併せて RUM データをクエリできます。以下の用途で使用します。

- [特定のビューが遅い理由を見つける](#find-out-why-a-view-is-slow)
- [チャートを分析する](#analyze-a-chart)
- [質問をしてタスクを完了する](#ask-questions-and-complete-tasks)

## ビューが遅い理由を見つける {#find-out-why-a-view-is-slow}

1. [RUM エクスプローラー][2]または [Session Replay][3] でビューを開きます。
2. ビューサイドパネルのパフォーマンスセクションで、**Ask Bits** をクリックします。

Bits Chat が開き、その特定のページの読み込みを調査します。ビューの読み込みタイムラインを[リソース][4]、[ロングタスク][5]、[エラー][6]、[ユーザーアクション][7]から再構築し、根本原因となる 4 つのソースを調査します。

| ソース | Bits が調査する内容 |
|---|---|
| アプリパフォーマンス | メインスレッドの競合、コード実行、レンダリング遅延などのクライアント側の問題。|
| サードパーティ | アプリケーションによって読み込まれたサードパーティのスクリプトやライブラリの影響。|
| サーバーサイド | [相関 APM トレース][8]を使用して、ビューに影響を与えたバックエンドのレイテンシーとサーバー側のエラー。|
| 環境 | ユーザーのデバイスとネットワークの状態。|

Bits は、根本的なイベントへのリンクを含むランク付けされた調査結果を返します。その後、`Is this happening to other users on this page?` や `Which backend endpoint is the slowest here?` などのフォローアップの質問をすることができます。

{{< img src="real_user_monitoring/bits_ai/ask-bits-view.png" alt="遅いページ読み込みに関するランク付けされた調査結果が表示されている、Ask Bits をクリックして Bits Chat を開いた状態のビューサイドパネル。" style="width:100%;" >}}

## チャートを分析する {#analyze-a-chart}

RUM サマリーページで、重要なチャートまたはエラー率チャート上の **Bits AI で分析する**をクリックします。Bits Chat は、メトリクスの傾向とその要因を要約します。

{{< img src="real_user_monitoring/bits_ai/analyze-with-bits-chart.png" alt="Bits Chat が過去 1 か月のメトリクスの傾向を要約した、検査モードで開かれた RUM 読み込み時間チャート。" style="width:100%;" >}}

## 質問をしてタスクを完了する {#ask-questions-and-complete-tasks}

どの RUM ページからでも、フロントエンドについて Bits Chat に平易な言葉で質問したり、RUM タスクの実行を依頼したりできます。例:

- `Which pages in this application have the worst INP right now, and which interactions cause it?`
- `Find sessions with 5xx errors on the checkout page in the last hour, grouped by error type.` RUM エクスプローラーでは、Bits　がクエリを自動的に適用します。
- `Which functions are slowing down my LCP?`これを RUM プロファイリングページで質問します。
- `Create a retention filter that keeps 25% of sessions with errors.`
- `Create an operation that tracks checkout from the cart page to the order confirmation page.`

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/bits_ai/bits_chat/
[2]: /ja/real_user_monitoring/explorer/
[3]: /ja/session_replay/
[4]: /ja/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance/
[5]: /ja/real_user_monitoring/application_monitoring/browser/data_collected/#long-task-timing-attributes
[6]: /ja/real_user_monitoring/error_tracking/
[7]: /ja/real_user_monitoring/application_monitoring/browser/tracking_user_actions/
[8]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm/