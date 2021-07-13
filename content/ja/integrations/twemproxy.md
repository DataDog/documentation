---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Twemproxy - Overview: assets/dashboards/twemproxy_overview.json
  logs:
    source: twemproxy
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - autodiscovery
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/twemproxy/README.md'
display_name: Twemproxy
draft: false
git_integration_title: twemproxy
guid: a5cca58a-9984-4226-ad1c-8dff73c9d6ac
integration_id: twemproxy
integration_title: Twemproxy
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: twemproxy.
metric_to_check: twemproxy.total_connections
name: twemproxy
public_title: Datadog-Twemproxy インテグレーション
short_description: twemproxy のパフォーマンスを視覚化し、他のアプリケーションと関連付け
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

各 Twemproxy サーバーで、全体の統計とプールごとの統計を追跡します。この Agent チェックは、クライアントとサーバーの接続とエラー、リクエスト率と応答率、プロキシの受送信バイト数などのメトリクスを収集します。

## セットアップ

### インストール

Agent の Twemproxy チェックは [Datadog Agent][1] パッケージに含まれています。Twemproxy サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `twemproxy.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル twemproxy.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     - host: localhost
       port: 2222
   ```

2. [Agent を再起動][3]すると、Datadog へ Twemproxy メトリクスの送信が開始します。

##### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

   ```yaml
   logs_enabled: true
   ```

2. Apache のログ収集を開始するには、次のコンフィギュレーションブロックを `twemproxy.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: twemproxy
       service: "<SERVICE_NAME>"
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル twemproxy.d/conf.yaml][2] を参照してください。

3. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/twemproxy/datadog_checks/twemproxy/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                  |
| -------------------- | -------------------------------------- |
| `<インテグレーション名>` | `twemproxy`                            |
| `<初期コンフィギュレーション>`      | 空白または `{}`                          |
| `<インスタンスコンフィギュレーション>`  | `{"host": "%%host%%", "port":"22222"}` |

##### ログの収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][2]を参照してください。

| パラメーター      | 値                                            |
| -------------- | ------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "twemproxy", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][2]し、Checks セクションで `twemproxy` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "twemproxy" >}}


### イベント

Twemproxy チェックには、イベントは含まれません。

### サービスのチェック

**twemproxy.can_connect**:<br>
Agent が Twemproxy 統計エンドポイントに接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は `OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ja/help/