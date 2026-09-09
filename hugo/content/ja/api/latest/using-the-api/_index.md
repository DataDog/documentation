---
title: API の使用
type: api
---
{{< h2-with-copy-btn >}}API の使用{{< /h2-with-copy-btn >}}

Datadog HTTP API を使用すると、Datadog プラットフォームにプログラムによってアクセスできます。API を使用して、Datadog へのデータ送信、データ可視化の構築、アカウントの管理を行うことができます。

{{< h2 >}}Datadog へのデータ送信{{< /h2 >}}

API を使用して、Datadog への Integrations データの送信を開始します。Agent の追加設定を行うことで、API を使用して Synthetic テストデータ、ログ、トレースを Datadog に送信することもできます。

**Integrations エンドポイント**

利用可能な Integrations エンドポイント:

- [AWS Integration][1]
- [AWS Logs Integration][2]
- [Azure Integration][3]
- [Cloudflare Integration][37]
- [Fastly Integration][38]
- [Google Cloud Integration][4]
- [Jira Integration][39]
- [Microsoft Teams Integration][40]
- [Okta Integration][41]
- [Opsgenie Integration][42]
- [PagerDuty Integration][6]
- [Slack Integration][5]
- [Webhooks Integration][7]

**プラットフォームエンドポイント**

これらのエンドポイントを使用して、Datadog プラットフォームの他の部分との間でデータを送信および取得できます。

- [メトリクス][8] エンドポイントを使用すると、[メトリクス][9] データを送信して Datadog のダッシュボードでグラフ化したり、任意の期間にわたるメトリクスをクエリしたりできます。
- [イベント][10] エンドポイントを使用すると、[Datadog イベント エクスプローラー][11] との間でイベントを送信および取得できます。
- [Synthetic テスト][13] の作成、開始、停止、および結果の確認を行うには、[Synthetic Monitoring][12] エンドポイントを使用します。
- [Tracing Agent API][14] を使用してトレースを Datadog Agent に送信し、Agent から Datadog へ転送します。
- Agent Observability データにアクセスしたり、外部評価の実行やオフラインストレージへのスパンのエクスポートを行ったりするには、[Agent Observability Export API][36] を使用します。

{{< h2 >}}データの可視化{{< /h2 >}}

Datadog へのデータ送信を開始したら、API を使用してプログラムによってデータを可視化できます

- [ダッシュボード][15] の構築と [ダッシュボードリスト][16] の表示
- [ホストタグ][17] の管理
- [埋め込み可能グラフ][18] の作成
- [グラフスナップショット][19] の取得
- [サービス依存関係][20] - APM サービスとその依存関係のリストをご確認ください
- [モニター][21] の作成
- [サービスチェック][22] - モニターで使用するチェックのステータスを送信します
- [ログ][23]、[ログインデックス][24]、[ログパイプライン][25] の作成と管理
- 組織の [ホスト][17] 情報の取得
- [Service Level Objectives][26] の作成と管理
- [Security Monitoring][27] シグナルの生成

{{< h2 >}}アカウントの管理{{< /h2 >}}

Datadog API を使用して、プログラムによってアカウントを管理することもできます。

- [ユーザー][28] の管理
- [ロール][29] の管理
- [組織][30] の管理
- [認証][31] エンドポイントでの API とアプリキーの検証
- [ログ制限クエリ][32] による特定のログへのアクセス権の付与
- [キー管理][33] による既存のキーの管理
- [使用状況メトリクス][34] エンドポイントでの Datadog の複数の側面における時間別、日別、月別の使用状況データの取得
- [IP 範囲][35] を指定した、Datadog に属する IP プレフィックスのリストの確認


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
[36]: /ja/llm_observability/evaluations/export_api
[37]: /ja/api/latest/cloudflare-integration/
[38]: /ja/api/latest/fastly-integration/
[39]: /ja/api/latest/jira-integration/
[40]: /ja/api/latest/microsoft-teams-integration/
[41]: /ja/api/latest/okta-integration/
[42]: /ja/api/latest/opsgenie-integration/