---
app_id: tyk
app_uuid: caca4c4f-104b-4d28-a051-f09bc58a0a32
assets:
  dashboards:
    Tyk Analytics Canvas: assets/dashboards/tyk_analytics_canvas.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - tyk.request_time.95percentile
      - tyk.request_time.count
      - tyk.request_time.avg
      - tyk.request_time.max
      - tyk.request_time.median
      metadata_path: metadata.csv
      prefix: tyk.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10233
    source_type_name: Tyk
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Tyk
  sales_email: yaara@tyk.io
  support_email: yaara@tyk.io
categories:
- メトリクス
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/tyk/README.md
display_on_public_website: true
draft: false
git_integration_title: tyk
integration_id: tyk
integration_title: Tyk
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: tyk
public_title: Tyk
short_description: resp-code、api、path、oauth などで細分化された、時間に関する統計付きでリクエストを追跡
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Metrics
  - Supported OS::macOS
  configuration: README.md#Setup
  description: resp-code、api、path、oauth などで細分化された、時間に関する統計付きでリクエストを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Tyk
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Datadog で、エラー応答時間、所要時間、レイテンシーを収集、表示して、[Tyk][1] における API トラフィックのパフォーマンスを監視し、API または消費者の問題を理解できます。

Tyk には、[Tyk API ゲートウェイ][2]からメトリクスを収集する Datadog インテグレーションが組み込まれています。

Tyk API ゲートウェイでは、処理されるすべてのトラフィックが記録され、その情報を Datadog に送信してその関連ダッシュボードを構築します。

### UDS の仕組み

[Tyk pump][3] は、アプリケーションのカスタムメトリクスを書き込み、Datadog Agent にバンドルされたメトリクス集計サービスである [DogStatsD][4] へ送信することで Datadog に送信します。DogStatsD は、`Tyk-gateway` で使用されるヒストグラムメトリクスタイプを含む Datadog 固有の拡張機能を追加する StatsD プロトコルを実装します。

`Tyk-gateway` は `Tyk-pump` を使用して、生成した分析を Datadog へ送信します。

Datadog Agent の実行中、DogstatsD は `Tyk-pump` から `request_time` メトリクスをリクエストごとにリアルタイムで取得するため、API の使用状況を理解し、さまざまなパラメーター別（日付、バージョン、リターンコード、メソッドなど）に柔軟に集計できます。

カスタムメトリクス Tyk は、タイプ [DD_HISTOGRAM_AGGREGATES][5] を使用しています。

## 計画と使用

Tyk インテグレーションは `tyk-pump` パッケージに含まれており、`pump.conf`age でコンフィギュレーションを設定するだけです（Tyk プラットフォームから何もインストールする必要はありません）。

### インストール

#### インフラストラクチャーリスト

このインテグレーションに必要なのは、実行中の Tyk インストールのみです。[Tyk セルフマネージド][6] または [Tyk OSS][7] をインストールできます。両オプションに、`tyk-pump` が含まれています。

#### Datadog Agent のインストール

ご使用の環境に [Datadog Agent][8] をインストールします。

Datadog [Agent][9] は、K8s クラスター、Docker コンテナ、Mac など、`Tyk pump` がアクセスできる環境であれば、どのような方法でも実行可能です。

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][10]のガイドをご参照ください。変更の適用を検証するには、[Agent の status サブコマンドを実行][11]します。


### ブラウザトラブルシューティング

#### Tyk-pump
Datadog pump を設定するには、pump README の [DogstatsD セクション][12]に記載された手順に従います。

以下は、`pump.conf` の Datadog pump コンフィギュレーション例です。

``` json
pump.conf:
...
   "dogstatsd": {
      "type": "dogstatsd",
      "meta": {
        "address": "dd-agent:8126",
        "namespace": "tyk",
        "async_uds": true,
        "async_uds_write_timeout_seconds": 2,
        "buffered": true,
        "buffered_max_messages": 32,
        "sample_rate": 0.9999999999,
        "tags": [
          "method",
          "response_code",
          "api_version",
          "api_name",
          "api_id",
          "org_id",
          "tracked",
          "path",
          "oauth_id"
        ]
      }
    },
```

これは、1 つのコマンドでフル Tyk プラットフォームをスピンアップし、Datadog の例を含むすぐに使用できる例を提供するオープンソースプロジェクトである [Tyk デモ][14]プロジェクトから採用した[例][13]です。このインテグレーションを実行するには、`up.sh analytics-datadog` を使用します。

#### Datadog Agent の設定

Tyk インテグレーションでは、Datadog Agent にバンドルされたメトリクス集計サービスの [DogstatsD][15] を使用します。DogStatsD は `StatsD` プロトコルを実装し、Datadog 固有の拡張機能を追加します。Tyk は `Histogram メトリクスタイプ`を使用しています。

ご使用の環境で、以下の Datadog および DogStatsD 環境変数を設定します。

| DD 環境変数 | 値 | 説明 |
|---------------------------|-------------|------|
| DD_API_KEY | {ご使用の-datadog-api-キー} | Datadog Agent の DD ポータルへの接続用。API キーは、[アカウント設定][16]で確認できます。 |
| DD_ENV |    tyk-demo-env   |   環境名を設定します。 |
| DD_DOGSTATSD_TAGS | "env:tyk-demo" |  この DogStatsD サーバーが受信するすべてのメトリクス、イベント、サービスのチェックに付加する追加タグ。 |
| DD_LOGS_ENABLED | true | Datadog Agent でのログ収集を有効にします。 |
| DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL | true | コンテナからログを収集します。 |
| DD_DOGSTATSD_SOCKET | /var/run/docker.sock | リスニングする Unix ソケットのパス。Docker Compose はこのパスをマウントします。 |
| DD_DOGSTATSD_ORIGIN_DETECTION | true | Unix ソケットのメトリクス用にコンテナの検出とタグ付けを有効にします。 |
| DD_DOGSTATSD_NON_LOCAL_TRAFFIC | true | 他のコンテナからの DogStatsD パケットをリスニングします (カスタムメトリクスの送信に必要)。 |
| DD_AGENT_HOST | dd-agent | Docker のエージェントホスト名。 |
| DD_AC_EXCLUDE | redis | Datadog Redis チェックを除外します。(オプション) |
| DD_CONTAINER_EXCLUDE | true | Datadog Agent の Docker チェックを除外します。 |

上記に記載された環境変数を設定後、Agent を [DogstatsD][17] でセットアップします。

設定後、[Agent を再起動します][18]。

### 検証

ダッシュボードを作成または[サンプル][19]をインポートし、ウィジェットを追加します。**metric** オプションの **Graph your data** で、`dogstatsd.namespace` のコンフィグ `pump.conf` の pump に選択したネームスペースを入力します。

上の例では、`tyk` です。入力を始めると、利用可能なすべてのメトリクスが表示されます。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "tyk" >}}


### ライブラリ

Datadog では、API サービスおよびその消費に関する統計データを表示するダッシュボードを作成できます。

そのようなダッシュボードの例がこちらです。

![Tyk 分析ダッシュボードの例][21]

**注: 上記のダッシュボードを[インポート][19]して、自身のダッシュボードの例またはベースラインとして使用できます。**

### ヘルプ

Tyk インテグレーションには、イベントは含まれません。

### ヘルプ

Tyk インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][22]までお問い合わせください。

[1]: https://tyk.io/
[2]: https://github.com/TykTechnologies/tyk
[3]: https://tyk.io/docs/tyk-pump/
[4]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=hostagent#pagetitle
[5]: https://docs.datadoghq.com/ja/agent/docker/?tab=standard#dogstatsd-custom-metrics
[6]: https://tyk.io/docs/tyk-self-managed/install/
[7]: https://tyk.io/docs/apim/open-source/installation/
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://docs.datadoghq.com/ja/agent/
[10]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
[12]: https://github.com/TykTechnologies/tyk-pump#dogstatsd
[13]: https://github.com/TykTechnologies/tyk-demo/blob/master/deployments/analytics-datadog/volumes/tyk-pump/pump-datadog.conf
[14]: https://github.com/TykTechnologies/tyk-demo/tree/master/deployments/analytics-datadog
[15]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=hostagent#setup
[16]: https://app.datadoghq.com/organization-settings/api-keys
[17]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=hostagent#how-it-works
[18]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[19]: https://github.com/DataDog/integrations-extras/blob/master/tyk/assets/dashboards/tyk_analytics_canvas.json
[20]: https://github.com/DataDog/integrations-extras/blob/master/tyk/metadata.csv
[21]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/tyk/images/datadog-tyk-analytics-dashboard.jpg
[22]: https://docs.datadoghq.com/ja/help/