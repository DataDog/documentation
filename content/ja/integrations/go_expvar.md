---
aliases:
  - /ja/integrations/goexpvar
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - languages
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/go_expvar/README.md'
display_name: Go-Expvar
git_integration_title: go_expvar
guid: 33557f7a-5f24-43f3-9551-78432894e539
integration_id: go-expvar
integration_title: Go-Expvar
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: go_expvar.
metric_to_check: go_expvar.memstats.alloc
name: go_expvar
public_title: Datadog-Go-Expvar インテグレーション
short_description: Go サービスから expvar で計測されたメトリクスとメモリ統計を収集 Go service.
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Go グラフ][1]

## 概要

Go サービスのメモリ使用量を追跡し、Go の expvar パッケージから計測されたメトリクスを収集します。

[dogstats-go][2] のみを使用して Go コードを計測する場合でも、このインテグレーションを使用して、メモリ関連のメトリクスを収集できます。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][3]のガイドを参照してこの手順を行ってください。

### インストール

Go Expvar チェックは Agent にパッケージ化されているため、メトリクスを収集するには、Go サービスを実行している場所に [Agent をインストール][4]します。

### コンフィグレーション
#### Go サービスの準備

Go サービスで [expvar パッケージ][5]をまだ使用していない場合は、これをインポートします (`import "expvar"`)。expvar を使用して独自のメトリクスを計測しない場合 (サービスのメモリメトリクスのみを収集する場合) は、空の識別子を使用してパッケージをインポートします (`import _ "expvar"`)。

サービスがまだ (http パッケージを使用して) HTTP リクエストをリスニングしていない場合は、ローカルで Datadog Agent のみを[リスニングするように設定][6]します。

#### Agent の接続

1. [Agent の構成ディレクトリ][7]のルートにある `conf.d/` フォルダーの `go_expvar.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル go_expvar.d/conf.yaml][8] を参照してください。

    ```yaml
        init_config:

        instances:
          - expvar_url: http://localhost:<your_apps_port>
            # optionally change the top-level namespace for metrics, e.g. my_go_app.memstats.alloc
            namespace: my_go_app # defaults to go_expvar, e.g. go_expvar.memstats.alloc
            # optionally define the metrics to collect, e.g. a counter var your service exposes with expvar.NewInt("my_func_counter")

            metrics:
              - path: my_func_counter
                # if you don't want it named my_go_app.my_func_counter
                #alias: my_go_app.preferred_counter_name
                type: counter # other valid options: rate, gauge
                #tags:
                #  - "tag_name1:tag_value1"
    ```

    `metrics` リストが構成されていない場合でも、Agent は memstat メトリクスを収集します。`metrics` を使用すると、収集する expvar 変数を Agent に指示できます。

2. [Agent を再起動][9]すると、Datadog への memstat および expvar メトリクスの送信が開始されます。

#### メトリクスの収集
Go Expvar インテグレーションでは[カスタムメトリクス][10]を送信することができますが、これはお客様の[課金][11]に影響します。デフォルトでは、メトリクス数は 350 に制限されています。メトリクスの追加が必要な場合は、[Datadog のサポートチーム][12]にお問い合わせください。

### 検証

[Agent の status サブコマンドを実行][13]し、Checks セクションの `go_expvar` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "go_expvar" >}}


### イベント
Go-Expvar チェックには、イベントは含まれません。

### サービスのチェック
Go-Expvar チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

## その他の参考資料

* [Expvar と Datadog を使用した Go アプリの計測][15]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/go_expvar/images/go_graph.png
[2]: https://github.com/DataDog/datadog-go
[3]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://golang.org/pkg/expvar
[6]: https://golang.org/pkg/net/http/#ListenAndServe
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-core/blob/master/go_expvar/datadog_checks/go_expvar/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/developers/metrics/custom_metrics
[11]: https://docs.datadoghq.com/ja/account_management/billing/custom_metrics
[12]: https://docs.datadoghq.com/ja/help
[13]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[14]: https://github.com/DataDog/integrations-core/blob/master/go_expvar/metadata.csv
[15]: https://www.datadoghq.com/blog/instrument-go-apps-expvar-datadog


{{< get-dependencies >}}