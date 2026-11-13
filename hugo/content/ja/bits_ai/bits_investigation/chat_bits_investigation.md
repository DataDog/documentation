---
aliases:
- /ja/bits_ai/bits_ai_sre/chat_bits_ai_sre/
title: Bits Investigation とのチャット
---
調査の過程で、Bits とチャットして調査に関する追加情報や関連するテレメトリなどを収集できます。

{{< img src="bits_ai/bits_ai_sre_chat_example.png" alt="ユーザーが Bits AI に関連する進行中のインシデントについて尋ね、Bits AI が関連するインシデントのリストと、それらが関連している理由の説明を返すチャットの例" style="width:100%;" >}}

## データソース {#data-sources}

Bits Investigation チャットボットは以下にアクセスできます。
- **調査の詳細**: モニターアラート、実行された探索的クエリ、仮説とその評価、根本原因の結論に関する詳細
- **テレメトリ**: メトリクス、ログ、トレース、イベント、モニター、RUM イベント、ダッシュボード、ノートブック、ホストに関する詳細
- **インシデント**: インシデントとそのステータス、重大度などに関する詳細
- **サービス**: カタログ内のサービス、その依存関係、所有者など
- **Datadog ドキュメント**: 文書化された Datadog 製品情報
- **Confluence ドキュメント**: Confluence ドキュメントからの関連ドキュメントまたはランブック ([Confluence インテグレーションがアカウントクロールを有効にするように設定されている場合][1])

## 質問例 {#example-questions}

| 機能                                  | プロンプト例                                                    | データソース                       |
|------------------------------------------------|-------------------------------------------------------------------|-----------------------------------|
| 調査の詳細について説明を求める | `Why do you think there's database query slowness?`               | Bits Investigation の詳細 |
| 調査結果の詳細を尋ねる | `Tell me more about the increased 500s on <web-store>.`           | Bits Investigation の詳細 |
| Bits をより良く機能させる方法 | `How can I make the investigation more effective next time?`      | Bits Investigation の詳細 |
| サービスに関する情報を検索する            | `Are there any ongoing incidents for <web-store>?`                | カタログおよびインシデント    |
| サービスの最近の変更を確認する              | `Were there any recent changes on <web-store>?`                   | Change Tracking                   |
| APM のリクエスト、エラー、期間メトリクスをクエリする | `What's the current error rate for <web-store>?`                  | APM                               |
| Continuous Profiler のプロファイリングデータをクエリおよび分析する               | `What performance bottlenecks do you see for <web-store>?`        | Continuous Profiler                               |
| Datadog 製品について質問する | `Does Bits Investigation connect to Datadog Work Management?`     | Datadog Documentation |
| ノートブックを作成する | `Can you create a notebook with a summary of this investigation?` | Notebooks |

[1]: bits_ai/bits_investigation/configure#confluence