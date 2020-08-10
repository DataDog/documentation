---
title: API リファレンス V1
type: api
---
{{< h2 >}}API リファレンス V1{{< /h2 >}}

Datadog プラットフォームにプログラマティックにアクセスするには、Datadog HTTP API を使用します。Datadog API は、リソース指向の URL とステータスコードを使用してリクエストの成功または失敗を示し、すべてのリクエストから JSON を返します。

**Datadog の HTTP API を使用するには、以下のフローを使用して必要なエンドポイントを決定し、[Datadog Postman コレクション][1]を確認してください。**


**注**: cURL コードの例は、 BASH および GNU Core Utilities を使用することを想定したものです。macOS をお使いの方は [Homebrew package manager][2] から Coreutils をダウンロードして、次のコマンドでインストールが可能です: `brew install coreutils`

{{< img src="api/api-flow.png" alt="Datadog 内のフロー" responsive="true" style="width:100%;">}}
{{< h2 >}}Install the Datadog Agent{{< /h2 >}}

API を使用してデータの送信または表示をするには、 [Datadog Agent をインストール][3]する必要があります。Datadog Agent は、ホストで実行されるソフトウェアです。ホストからイベントとメトリクスを収集し、Datadog に送信します。ここで、モニタリングとパフォーマンスのデータを分析できます。

{{< h2 >}}Datadog へデータを送信{{< /h2 >}}

Datadog Agent の設定ができたら、API を使用してインテグレーションデータの Datadog への送信を始めます。Agent に追加のセットアップを行うと、API を使用して Synthetic モニタリングデータ、ログ、トレースを Datadog へ送信することも可能です。

**インテグレーションエンドポイント**

利用可能なインテグレーションエンドポイント:

- [AWS インテグレーション][4]
- [AWS ログインテグレーション][5]
- [Azure インテグレーション][6]
- [GCP インテグレーション][7]
- [Slack インテグレーション][8]
- [PagerDuty インテグレーション][9]
- [Webhooks インテグレーション][10]

**プラットフォームエンドポイント**

このエンドポイントを使用して、Datadog プラットフォームの他の部分との間でデータを送受信します。

- [メトリクス][11]エンドポイントを使用すると、[メトリクス][12]データをポストできるため、Datadog のダッシュボードでグラフ化し、あらゆる期間のメトリクスを問い合わせることができます。
- イベントのエンドポイントを使用すると、[Datadog のイベントストリーム][14]との間でイベントを送受信できます。
- [Synthetic モニタリング][15] エンドポイントを使用して、[Synthetic テスト][16]を作成、開始、終了し結果を確認します。
- [トレース Agent API][17] を使用して、Datadog Agent にトレースを送信すると、Datadog に転送されます。

{{< h2 >}}データの視覚化{{< /h2 >}}

Datadog へのデータ送信が始まると、API を使用してデータの視覚化をプログラマティックに構築できるようになります。

- [ダッシュボード][18] を構築して[ダッシュボードリスト][19]を表示
- [ホストタグ][20]の管理
- [埋め込み可能なグラフ][21]を作成
- [グラフのスナップショット][22]を撮る
- [サービスの依存関係][23] - APM サービスとその依存関係のリストを確認
- [モニター][24]の作成
- [サービスチェック][25] - モニター]で使用されるチェックステータスをポスト
- [ログ][26]、[ログのインデックス][27]、[ログパイプライン][28]の作成および管理
- 組織の[ホスト][20]情報を取得
- [サービスレベル目標][29]の作成および管理
- [セキュリティモニタリング][30]シグナルを生成

{{< h2 >}}アカウント管理{{< /h2 >}}

また、Datadog API を使ってアカウントをプログラマティックに管理することもできます。

- [ユーザー][31]管理
- [ロール][32]管理
- [組織][33]の管理
- API とアプリキーを[認証][34]エンドポイントで承認
- [ログ制限クエリ][35]で特定ログアクセスを許可
- [Key Management][36] で既存のキーを管理
- [使用量のメータリング][37]エンドポイントで、Datadog の複数ファセットにおける毎時、日次、月次使用量を把握
- [IP 範囲][38] で Datadog に属する IP プレフィックスのリストを確認

{{< h2 >}}レート制限{{< /h2 >}}

一部の API エンドポイントでは、レートが制限されています。一定の時間内に所定のリクエスト数を超過すると、エラーが返されます。

レート制限がある API エンドポイントについては、ヘッダーが返されるので、制限にどの程度近づいているかを知ることができます。また、制限を超えた場合は、このヘッダーを確認して、いつ再試行できるかを判断できます。

デフォルトのレート制限を増加したい場合は、[Datadog のサポートチームまでお問い合わせください][39]。

API レート制限ポリシーについて

- Datadog では、データポイント/メトリクスの送信に対して**レート制限を設けていません** (メトリクスの送信レートの処理方法については、[メトリクスのセクション][11]を参照してください)。制限に達したかどうかは、お客様の契約に基づく[カスタムメトリクス][40]の数量によって決まります。
- メトリクスの**取得**のレート制限値は、`100`/時間/Organization です。
- イベント送信のレート制限値は、`1000`/集計/日/Organization です。集計は、類似のイベントのグループです。
- [時系列ポイントのクエリ API][41] 呼び出しのレート制限値は、`600`/時間/Organization です。これは、オンデマンドで増やすことができます。
- [Log Query API][42] 呼び出しのレート制限値は、`300`/時間/Organization です。これは、オンデマンドで増やすことができます。
- [Graph a Snapshot API][22] 呼び出しのレート制限値は、組織当たり `60`/時間です。これは、オンデマンドで増やすことができます。
- [Log Configuration API][27] のレート制限値は、組織当たり `6000`/分です。これは、オンデマンドで増やすことができます。

| レート制限ヘッダー      | 説明                                              |
| ----------------------- | -------------------------------------------------------- |
| `X-RateLimit-Limit`     | 期間内に許可されるリクエスト数。             |
| `X-RateLimit-Period`    | リセット期間 (秒)。カレンダーと連携。 |
| `X-RateLimit-Remaining` | 現在の期間内で許可される残りのリクエスト数。  |
| `X-RateLimit-Reset`     | 次のリセットまでの時間 (秒)。                        |

[1]: /ja/getting_started/api
[2]: https://brew.sh
[3]: /ja/getting_started/agent/
[4]: /ja/api/v1/aws-integration/
[5]: /ja/api/v1/aws-logs-integration/
[6]: /ja/api/v1/azure-integration/
[7]: /ja/api/v1/gcp-integration/
[8]: /ja/api/v1/slack-integration/
[9]: /ja/api/v1/pagerduty-integration/
[10]: /ja/api/v1/webhooks-integration/
[11]: /ja/api/v1/metrics/
[12]: /ja/metrics/introduction/
[13]: /ja/api/v1/events/
[14]: /ja/events/
[15]: /ja/api/v1/synthetics/
[16]: /ja/synthetics/
[17]: /ja/api/v1/tracing/
[18]: /ja/api/v1/dashboards/
[19]: /ja/api/v1/dashboard-lists/
[20]: /ja/api/v1/hosts/
[21]: /ja/api/v1/embeddable-graphs/
[22]: /ja/api/v1/snapshots/
[23]: /ja/api/v1/service-dependencies/
[24]: /ja/api/v1/monitors/
[25]: /ja/api/v1/service-checks/
[26]: /ja/api/v1/logs/
[27]: /ja/api/v1/logs-indexes/
[28]: /ja/api/v1/logs-pipelines/
[29]: /ja/api/v1/service-level-objectives/
[30]: /ja/api/v2/security-monitoring/
[31]: /ja/api/v1/users/
[32]: /ja/api/v1/roles/
[33]: /ja/api/v1/organizations/
[34]: /ja/api/v1/authentication/
[35]: /ja/api/v2/logs-restriction-queries/
[36]: /ja/api/v1/key-management/
[37]: /ja/api/v1/usage-metering/
[38]: /ja/api/v1/ip-ranges/
[39]: /ja/help/
[40]: /ja/developers/metrics/custom_metrics/
[41]: /ja/api/v1/metrics/#query-timeseries-points
[42]: /ja/api/v1/logs/#get-a-list-of-logs