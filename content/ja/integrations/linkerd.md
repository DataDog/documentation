---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
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
kind: integration
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

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Linkerd チェックは [Datadog Agent][3] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィグレーション

[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `linkerd.d/conf.yaml` ファイルを編集します。
使用可能なすべての構成オプションについては、[サンプル linkerd.d/conf.yaml][5] を参照してください。

### 検証

[Agent の `status` サブコマンドを実行][6]し、Checks セクションで `linkerd` を探します。

## 収集データ

### メトリクス

このインテグレーションによって提供されるデフォルトのメトリクスのリストについては、[metadata.csv][7] を参照してください。

linkerd v1 の場合、一部のメトリクスの詳細については、[finagle のメトリクスに関するドキュメント][8]を参照してください。linkerd によって公開されるメトリクスの例については、[こちらの gist][9] を参照してください。

注意: linkerd の構成によっては、公開されないメトリクスもあります。

現在の構成で公開されるメトリクスをリストするには、次のコマンドを実行します。
```bash
curl <linkerd_prometheus_endpoint>
```
ここで、`linkerd_prometheus_endpoint` は linkerd Prometheus エンドポイントです (`linkerd.yaml` 内の `prometheus_url` 構成キーと同じ値を使用する必要があります)。

デフォルトで提供されないメトリクスを使用する必要がある場合は、`linkerd.yaml` にエントリを追加します。

[デフォルト構成][5]内の例に従ってください。

### サービスのチェック

`linkerd.prometheus.health`:
Agent が Prometheus エンドポイントへの接続に失敗した場合は、CRITICAL を返します。それ以外の場合は、UP を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://linkerd.io
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/linkerd/datadog_checks/linkerd/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/linkerd/metadata.csv
[8]: https://twitter.github.io/finagle/guide/Metrics.html
[9]: https://gist.githubusercontent.com/arbll/2f63a5375a4d6d5acface6ca8a51e2ab/raw/bc35ed4f0f4bac7e2643a6009f45f9068f4c1d12/gistfile1.txt
[10]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}