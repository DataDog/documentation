---
assets:
  dashboards:
    Linkerd - Overview: assets/dashboards/overview.json
  logs: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/linkerd/README.md'
display_name: Linkerd
git_integration_title: linkerd
guid: 9aa60dff-4baf-4112-9177-f9c3814dd513
integration_id: linkerd
integration_title: Linkerd
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: linkerd.
metric_to_check: linkerd.prometheus.health
name: linkerd
public_title: Datadog-Linkerd インテグレーション
short_description: linkerd からメトリクスを取得してサービス健全性を監視
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、[Linkerd][1] から分散型システムの可観測性メトリクスを収集します。

## セットアップ

### インストール

Linkerd チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### 構成

#### ホスト

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

1. [Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `linkerd.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションについては、[サンプル linkerd.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][6]のガイドを参照して、次のパラメーターを適用してください。

##### Linkerd v1

| パラメーター            | 値                                                                 |
| -------------------- | --------------------------------------------------------------------- |
| `<インテグレーション名>` | `linkerd`                                                             |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                         |
| `<インスタンスコンフィギュレーション>`  | `{"prometheus_url": "http://%%host%%:9990/admin/metrics/prometheus"}` |

##### Linkerd v2

| パラメーター            | 値                                                                 |
| -------------------- | --------------------------------------------------------------------- |
| `<インテグレーション名>` | `linkerd`                                                             |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                         |
| `<インスタンスコンフィギュレーション>`  | `{"prometheus_url": "http://%%host%%:4191/metrics"}`                  |

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `linkerd` を探します。

## 収集データ

### メトリクス

このインテグレーションによって提供されるデフォルトのメトリクスのリストについては、[metadata.csv][8] を参照してください。

linkerd v1 の場合、一部のメトリクスの詳細については、[finagle のメトリクスに関するドキュメント][9]を参照してください。linkerd によって公開されるメトリクスの例については、[こちらの gist][10] を参照してください。

注意: linkerd の構成によっては、公開されないメトリクスもあります。

現在の構成で公開されるメトリクスをリストするには、次のコマンドを実行します。

```bash
curl <linkerd_prometheus_endpoint>
```

ここで、`linkerd_prometheus_endpoint` は linkerd Prometheus エンドポイントです (`linkerd.yaml` 内の `prometheus_url` 構成キーと同じ値を使用する必要があります)。

デフォルトで提供されないメトリクスを使用する必要がある場合は、`linkerd.yaml` にエントリを追加します。

[デフォルト構成][4]内の例に従ってください。

### サービスのチェック

`linkerd.prometheus.health`:
Agent が Prometheus エンドポイントへの接続に失敗した場合は、CRITICAL を返します。それ以外の場合は、UP を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://linkerd.io
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/linkerd/datadog_checks/linkerd/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/linkerd/metadata.csv
[9]: https://twitter.github.io/finagle/guide/Metrics.html
[10]: https://gist.githubusercontent.com/arbll/2f63a5375a4d6d5acface6ca8a51e2ab/raw/bc35ed4f0f4bac7e2643a6009f45f9068f4c1d12/gistfile1.txt
[11]: https://docs.datadoghq.com/ja/help/