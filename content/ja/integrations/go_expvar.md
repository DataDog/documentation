---
aliases:
  - /ja/integrations/goexpvar
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - languages
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/go_expvar/README.md'
display_name: Go-Expvar
draft: false
git_integration_title: go_expvar
guid: 33557f7a-5f24-43f3-9551-78432894e539
integration_id: go-expvar
integration_title: Go-Expvar
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: go_expvar.
metric_to_check: go_expvar.memstats.alloc
name: go_expvar
public_title: Datadog-Go-Expvar インテグレーション
short_description: Go サービスから expvar で計測されたメトリクスとメモリ統計を収集
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

### インストール

Go Expvar チェックは Agent にパッケージ化されているため、メトリクスを収集するには、Go サービスを実行している場所に [Agent をインストール][3]します。

### コンフィギュレーション

#### サービスの準備

Go サービスで [expvar パッケージ][4]をまだ使用していない場合は、これをインポートします (`import "expvar"`)。expvar を使用して独自のメトリクスを計測しない場合 (サービスのメモリメトリクスのみを収集する場合) は、空の識別子を使用してパッケージをインポートします (`import _ "expvar"`)。サービスがまだ (http パッケージを使用して) HTTP リクエストをリスニングしていない場合は、ローカルで Datadog Agent のみを[リスニングするように設定][5]します。

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### Agent の接続

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `go_expvar.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル go_expvar.d/conf.yaml][2] を参照してください。

    **注**: `metrics` リストが構成されていない場合でも、Agent は memstat メトリクスを収集します。`metrics` を使用すると、収集する expvar 変数を Agent に指示できます。

2. [Agent を再起動します][3]。

**注**: Go Expvar インテグレーションでは[カスタムメトリクス][4]を送信することができますが、これはお客様の[課金][5]に影響します。デフォルトでは、メトリクス数は 350 に制限されています。メトリクスの追加が必要な場合は、[Datadog のサポートチーム][6]にお問い合わせください。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/go_expvar/datadog_checks/go_expvar/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/developers/metrics/custom_metrics/
[5]: https://docs.datadoghq.com/ja/account_management/billing/custom_metrics/
[6]: https://docs.datadoghq.com/ja/help/
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                    |
| -------------------- | ---------------------------------------- |
| `<インテグレーション名>` | `go_expvar`                              |
| `<初期コンフィギュレーション>`      | 空白または `{}`                            |
| `<インスタンスコンフィギュレーション>`  | `{"expvar_url": "http://%%host%%:8080"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションの `go_expvar` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "go_expvar" >}}


### イベント

Go-Expvar チェックには、イベントは含まれません。

### サービスのチェック

Go-Expvar チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

## その他の参考資料

- [Expvar と Datadog を使用した Go アプリの計測][8]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/go_expvar/images/go_graph.png
[2]: https://github.com/DataDog/datadog-go
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://golang.org/pkg/expvar
[5]: https://golang.org/pkg/net/http/#ListenAndServe
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://www.datadoghq.com/blog/instrument-go-apps-expvar-datadog