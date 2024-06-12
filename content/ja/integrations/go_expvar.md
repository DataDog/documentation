---
app_id: go-expvar
app_uuid: cac5ebe3-fa36-49f7-93c5-22116c745e80
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: go_expvar.memstats.alloc
      metadata_path: metadata.csv
      prefix: go_expvar.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 77
    source_type_name: Go Expvar
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- languages
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/go_expvar/README.md
display_on_public_website: true
draft: false
git_integration_title: go_expvar
integration_id: go-expvar
integration_title: Go-Expvar
integration_version: 2.5.0
is_public: true
manifest_version: 2.0.0
name: go_expvar
public_title: Go-Expvar
short_description: Go サービスから expvar で計測されたメトリクスとメモリ統計を収集
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::言語
  configuration: README.md#Setup
  description: Go サービスから expvar で計測されたメトリクスとメモリ統計を収集
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Go-Expvar
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Go グラフ][1]

## 概要

Go サービスのメモリ使用量を追跡し、Go の expvar パッケージから計測されたメトリクスを収集します。

[dogstats-go][2] のみを使用して Go コードを計測する場合でも、このインテグレーションを使用して、メモリ関連のメトリクスを収集できます。

## 計画と使用

### インフラストラクチャーリスト

Go Expvar チェックは Agent にパッケージ化されているため、メトリクスを収集するには、Go サービスを実行している場所に [Agent をインストール][3]します。

### ブラウザトラブルシューティング

#### サービスの準備

Go サービスで [expvar パッケージ][4]をまだ使用していない場合は、これをインポートします (`import "expvar"`)。expvar を使用して独自のメトリクスを計測しない場合 (サービスのメモリメトリクスのみを収集する場合) は、空の識別子を使用してパッケージをインポートします (`import _ "expvar"`)。サービスがまだ (http パッケージを使用して) HTTP リクエストをリスニングしていない場合は、ローカルで Datadog Agent のみを[リスニングするように設定][5]します。

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

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
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                    |
| -------------------- | ---------------------------------------- |
| `<INTEGRATION_NAME>` | `go_expvar`                              |
| `<INIT_CONFIG>`      | 空白または `{}`                            |
| `<INSTANCE_CONFIG>`  | `{"expvar_url": "http://%%host%%:8080"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションの `go_expvar` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "go_expvar" >}}


### ヘルプ

Go-Expvar チェックには、イベントは含まれません。

### ヘルプ

Go-Expvar チェックには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

## その他の参考資料

- [Expvar と Datadog を使用した Go アプリの計測][8]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/go_expvar/images/go_graph.png
[2]: https://github.com/DataDog/datadog-go
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://golang.org/pkg/expvar
[5]: https://golang.org/pkg/net/http/#ListenAndServe
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://www.datadoghq.com/blog/instrument-go-apps-expvar-datadog