---
title: API の使用
type: api
---
{{< h2-with-copy-btn >}}API の使用{{< /h2-with-copy-btn >}}

Datadog HTTP API を使用して、Datadog プラットフォームにプログラムによりアクセスします。API を使用して、データを Datadog に送信したり、データの視覚化を構築したり、アカウントを管理したりできます。

{{< h2 >}}データを Datadog に送信する{{< /h2 >}}

API を使用して、Integrations データの Datadog への送信を開始します。Agent の追加設定を行うことで、API を使用して Synthetic テストデータ、ログ、トレースを Datadog に送信することもできます。

**インテグレーションエンドポイント**

利用可能なインテグレーションエンドポイント:

- [AWS インテグレーション][1]
- [AWS ログインテグレーション][2]
- [Azure インテグレーション][3]
- [Cloudflare インテグレーション][37]
- [Fastly インテグレーション][38]
- [Google Cloud インテグレーション][4]
- [Jira インテグレーション][39]
- [Microsoft Teams インテグレーション][40]
- [Okta インテグレーション][41]
- [Opsgenie インテグレーション][42]
- [PagerDuty インテグレーション][6]
- [Slack インテグレーション][5]
- [Webhooks インテグレーション][7]
- [Oracle Cloud インテグレーション][43]

**プラットフォームエンドポイント**

これらのエンドポイントを使用して、Datadog プラットフォームの他の部分との間でデータを送受信します。

- [メトリクス][8]エンドポイントを使用すると、[メトリクス][9]データをポストできるため、Datadog のダッシュボードでグラフ化し、あらゆる期間のメトリクスを問い合わせることができます。
- [イベント][10]のエンドポイントを使用すると、[Datadog Event Explorer][11] との間でイベントを送受信できます。
- [Synthetic Monitoring][12] エンドポイントを使用して、[Synthetic テスト][13]を作成、開始、終了し結果を確認します。
- [Tracing Agent API][14] を使用して、Datadog Agent にトレースを送信すると、Datadog に転送されます。
- [Agent Observability Export API][36] を使用して Agent Observability データにアクセスし、外部評価の実行やオフラインストレージ用のスパンのエクスポートを行います。

{{< h2 >}}データの視覚化{{< /h2 >}}

Datadog へのデータ送信が始まると、API を使用してデータの視覚化をプログラムで構築できるようになります。

- [ダッシュボード][15]を構築して[ダッシュボードリスト][16]を表示
- [ホストタグ][17]を管理
- [埋め込み可能なグラフ][18]を作成
- [グラフのスナップショット][19]を取得
- [サービスの依存関係][20] - APM サービスとその依存関係のリストを確認
- [モニター][21]を作成
- [サービスのチェック][22] - モニターで使用されるチェックステータスをポスト
- [ログ][23]、[ログインデックス][24]、[ログパイプライン][25]を作成および管理
- 組織の[ホスト][17]情報を取得
- [Service Level Objectives][26] を作成および管理
- [セキュリティモニタリング][27]シグナルを生成

{{< h2 >}}アカウントの管理{{< /h2 >}}

また、Datadog API を使ってアカウントをプログラムで管理することもできます。

- [ユーザー][28]を管理
- [ロール][29]を管理
- [組織][30]を管理
- API とアプリキーを [Authentication][31] エンドポイントで検証
- [ログ制限クエリ][32]で特定ログアクセスを許可
- [Key Management][33] で既存のキーを管理
- [使用量のメータリング][34]エンドポイントで、Datadog の複数ファセットにおける毎時、日次、月次使用量を把握
- [IP 範囲][35]で、Datadog に属する IP プレフィックスのリストを確認


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
[14]: /ja/tracing/guide/send_traces_to_agent_by_api/
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
[36]: /ja/llm_observability/investigate/export_api
[37]: /ja/api/latest/cloudflare-integration/
[38]: /ja/api/latest/fastly-integration/
[39]: /ja/api/latest/jira-integration/
[40]: /ja/api/latest/microsoft-teams-integration/
[41]: /ja/api/latest/okta-integration/
[42]: /ja/api/latest/opsgenie-integration/
[43]: /ja/api/latest/oci-integration/