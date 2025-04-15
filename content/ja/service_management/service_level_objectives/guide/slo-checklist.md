---
aliases:
- /ja/monitors/guide/slo-checklist/
further_reading:
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: ブログ
  text: Datadog で SLO のステータスとエラーバジェットを追跡する
- link: https://learn.datadoghq.com/courses/intro-to-slo
  tag: ラーニングセンター
  text: サービスレベル目標入門
- link: /service_management/service_level_objectives/guide/slo_types_comparison/
  tag: ドキュメント
  text: Comparison of Datadog SLO Types
title: SLO チェックリスト
---


## はじめに

1. Navigate to the [SLO Manage page][1].

2. ユーザーの目線から考えてみてください:

    * ユーザーはアプリケーションをどのように操作していますか？
    * アプリケーションを通じたユーザージャーニーはどのようなものですか？
    * それらのジャーニーには、インフラストラクチャーのどの部分が関わっていますか？
    * システムから何を期待していますか？何を達成したいと思っていますか？

## 関連する SLI の選択

### ステップ 1

#### 応答 / リクエスト

|  Type of SLI |  説明                                                   |
| ------------ | -------------------------------------------------------------- |
| 可用性 | サーバーはリクエストに正常に応答しましたか？          |
| レイテンシー      | サーバーがリクエストに応答するまでにどれぐらい時間がかかりましたか？ |
| スループット   | いくつのリクエストを処理できますか？                              |

#### Storage

|  Type of SLI |  説明                                 |
| ------------ | -------------------------------------------- |
| 可用性 | データにオンデマンドでアクセスできますか？          |
| レイテンシー      | データの読み書きにどれぐらい時間がかかりますか？ |
| 耐性   | データは必要なときに取り出せる状態ですか？   |

#### パイプライン

| Type of SLI |   説明                                                      |
| ----------- | ------------------------------------------------------------------ |
| 正確性 | 正しいデータが返されましたか？                                       |
| 鮮度   | 新しいデータまたは処理された結果が表示されるまでにどれぐらい時間がかかりますか？ |

### ステップ 2

**Do you require an SLI calculation that is time-based or count-based?**

The following SLO types are available in Datadog: 

**Metric-based SLOs**

_例: リクエストの 99% は、30 日間で 250 ms 未満で完了する必要があります。_

- Count-based SLI calculation
- SLI is calculated as the sum of good events divided by the sum of total events

**Monitor-based SLOs**

_例: すべてのユーザーリクエストのタイムレイテンシーの 99% は、いずれの 30 日の範囲内でも250 ms 未満で
ある必要があります。_

- Time-based SLI calculation
- SLI calculated based on the underlying Monitor’s uptime
- You can select a single monitor, multiple monitors (up to 20), or a single multi alert monitor with groups

新しいモニターの作成が必要な場合は [Monitor create][2] ページを開きます。

**Time Slice SLOs**

_例: すべてのユーザーリクエストのタイムレイテンシーの 99% は、いずれの 30 日の範囲内でも250 ms 未満で
ある必要があります。_

- Time-based SLI calculation
- SLI calculated based on your custom uptime definition using a metric query

## Implement your SLIs

1. [カスタムメトリクス][3] (例: カウンター)
2. [インテグレーションメトリクス][4] (例: ロードバランサー、HTTP リクエスト)
3. [Datadog APM][5] (例: エラー、サービスのレイテンシー、リソース)
4. [Datadog ログ][6] (例: 特定のイベントの発生数に応じてログから生成されたメトリクス)

## ターゲット目標および時間枠の設定

1. Select your target: `99%`, `99.5%`, `99.9%`, `99.95%`, or any other target value that makes sense for your requirements.
2. Select your time window: over the last rolling `7`, `30`, or `90 days`

## SLO の名前、説明、タグの追加

1. SLO に名前を付けます。
2. 説明を追加します: SLO が追跡している対象と、それがエンドユーザーのエクスペリエンスにとってなぜ重要なのかを記述します。参考としてダッシュボードのリンクを追加することもできます。
3. タグを追加します: 一般的には `team` および `service` のタグが用いられます。

## ビューおよび検索

[タグを使用して SLO のリストビューから SLO を検索します][7]。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo/manage
[2]: https://app.datadoghq.com/monitors#create/metric
[3]: /ja/metrics
[4]: /ja/integrations
[5]: /ja/tracing/trace_pipeline/generate_metrics/
[6]: /ja/logs/logs_to_metrics/
[7]: /ja/service_management/service_level_objectives/#searching-and-viewing-slos