---
title: API の使用
type: api
---
{{< h2 >}}API の使用{{< /h2 >}}

プログラムに従い Datadog のプラットフォームにアクセスするには、Datadog HTTP API を使用します。API を使用して、データを Datadog へ送信し、データの視覚化やアカウントの管理ができます。

{{< h2 >}}Datadog へデータを送信{{< /h2 >}}

API を使用してインテグレーションデータの Datadog への送信を始めます。Agent に追加のセットアップを行うと、API を使用して Synthetic テストデータ、ログ、トレースを Datadog へ送信することも可能です。

**インテグレーションエンドポイント**

利用可能なインテグレーションエンドポイント:

- [AWS インテグレーション][1]
- [AWS ログインテグレーション][2]
- [Azure インテグレーション][3]
- [GCP インテグレーション][4]
- [Slack インテグレーション][5]
- [PagerDuty インテグレーション][6]
- [Webhooks インテグレーション][7]

**プラットフォームエンドポイント**

このエンドポイントを使用して、Datadog プラットフォームの他の部分との間でデータを送受信します。

- [メトリクス][8]エンドポイントを使用すると、[メトリクス][9]データをポストできるため、Datadog のダッシュボードでグラフ化し、あらゆる期間のメトリクスを問い合わせることができます。
- [イベント][10]のエンドポイントを使用すると、[Datadog のイベントストリーム][11]との間でイベントを送受信できます。
- [Synthetic モニタリング][12] エンドポイントを使用して、[Synthetic テスト][13]を作成、開始、終了し結果を確認します。
- [トレース Agent API][14] を使用して、Datadog Agent にトレースを送信すると、Datadog に転送されます。

{{< h2 >}}データの視覚化{{< /h2 >}}

Datadog へのデータ送信が始まると、API を使用してデータの視覚化をプログラムで構築できるようになります。

- [ダッシュボード][15] を構築して[ダッシュボードリスト][16]を表示
- [ホストタグ][17]の管理
- [埋め込み可能なグラフ][18]を作成
- [グラフのスナップショット][19]を撮る
- [サービスの依存関係][20] - APM サービスとその依存関係のリストを確認
- [モニター][21]の作成
- [サービスチェック][22] - モニターで使用されるチェックステータスをポスト
- [ログ][23]、[ログのインデックス][24]、[ログパイプライン][25]の作成および管理
- 組織の[ホスト][17]情報を取得
- [サービスレベル目標][26]の作成および管理
- [セキュリティモニタリング][27]シグナルを生成

{{< h2 >}}アカウント管理{{< /h2 >}}

また、Datadog API を使ってアカウントをプログラムで管理することもできます。

- [ユーザー][28]管理
- [ロール][29]管理
- [組織][30]の管理
- API とアプリキーを[認証][31]エンドポイントで承認
- [ログ制限クエリ][32]で特定ログアクセスを許可
- [Key Management][33] で既存のキーを管理
- [使用量のメータリング][34]エンドポイントで、Datadog の複数ファセットにおける毎時、日次、月次使用量を把握
- [IP 範囲][35] で Datadog に属する IP プレフィックスのリストを確認


[1]: /ja/api/v1/aws-integration/
[2]: /ja/api/v1/aws-logs-integration/
[3]: /ja/api/v1/azure-integration/
[4]: /ja/api/v1/gcp-integration/
[5]: /ja/api/v1/slack-integration/
[6]: /ja/api/v1/pagerduty-integration/
[7]: /ja/api/v1/webhooks-integration/
[8]: /ja/api/v1/metrics/
[9]: /ja/metrics/introduction/
[10]: /ja/api/v1/events/
[11]: /ja/events/
[12]: /ja/api/v1/synthetics/
[13]: /ja/synthetics/
[14]: /ja/api/v1/tracing/
[15]: /ja/api/v1/dashboards/
[16]: /ja/api/v1/dashboard-lists/
[17]: /ja/api/v1/hosts/
[18]: /ja/api/v1/embeddable-graphs/
[19]: /ja/api/v1/snapshots/
[20]: /ja/api/v1/service-dependencies/
[21]: /ja/api/v1/monitors/
[22]: /ja/api/v1/service-checks/
[23]: /ja/api/v1/logs/
[24]: /ja/api/v1/logs-indexes/
[25]: /ja/api/v1/logs-pipelines/
[26]: /ja/api/v1/service-level-objectives/
[27]: /ja/api/v2/security-monitoring/
[28]: /ja/api/v1/users/
[29]: /ja/api/v1/roles/
[30]: /ja/api/v1/organizations/
[31]: /ja/api/v1/authentication/
[32]: /ja/api/v2/logs-restriction-queries/
[33]: /ja/api/v1/key-management/
[34]: /ja/api/v1/usage-metering/
[35]: /ja/api/v1/ip-ranges/