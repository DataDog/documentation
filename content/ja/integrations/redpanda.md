---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Redpanda Overview: assets/dashboards/overview.json
  logs:
    source: redpanda
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- 処理
- メッセージング
- ログの収集
- autodiscovery
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/redpanda/README.md
display_name: Redpanda
draft: false
git_integration_title: redpanda
guid: 7aa73d69-b635-4973-8b7c-b0bb325d407b
integration_id: redpanda
integration_title: Redpanda
integration_version: 1.1.0
is_public: true
kind: integration
maintainer: support@vectorized.io
manifest_version: 1.0.0
metric_prefix: redpanda.
metric_to_check: redpanda.application.uptime
name: redpanda
public_title: Redpanda
short_description: Redpanda クラスターの全体的な健全性とパフォーマンスを監視します。
support: contrib
supported_os:
- linux
- mac_os
- windows
---


## 概要

Redpanda は、ミッションクリティカルなワークロードのための Kafka API 互換のストリーミングプラットフォームです。

Datadog と [Redpanda][1] を接続し、主要なメトリクスを表示したり、特定のユーザーニーズに基づいて追加のメトリクスグループを追加することができます。

## セットアップ

### インストール

1. [Datadog Agent をダウンロードして起動][2]します。
2. Redpanda インテグレーションを手動でインストールします。環境に応じた詳細は、[コミュニティインテグレーションを利用する][3]を参照してください。

{{< tabs >}}
{{< tab "Host" >}}

#### ホスト

ホスト上で動作している Agent に対してこのチェックを構成するには、`datadog-agent integration install -t datadog-redpanda==<INTEGRATION_VERSION>` を実行します。

{{< /tab >}}
{{< tab "Containerized" >}}

#### コンテナ化

コンテナ環境では、Docker Agent とこのインテグレーションを使用する最善の方法は、Redpanda インテグレーションをインストールした Agent をビルドすることです。

Agent のアップデート版をビルドするには

1. 以下の Dockerfile を使用します。

```dockerfile
FROM gcr.io/datadoghq/agent:latest

ARG INTEGRATION_VERSION=1.0.0

RUN agent integration install -r -t datadog-redpanda==${INTEGRATION_VERSION}
```

2. イメージをビルドし、プライベート Docker レジストリにプッシュします。

3. Datadog Agent コンテナイメージをアップグレードします。Helm チャートを使用している場合は、`values.yaml` ファイルの `agents.image` セクションを変更して、デフォルトの Agent イメージを置き換えます。

```yaml
agents:
  enabled: true
  image:
    tag: <NEW_TAG>
    repository: <YOUR_PRIVATE_REPOSITORY>/<AGENT_NAME>
```

4. 新しい `values.yaml` ファイルを使用して Agent をアップグレードします。

```shell
helm upgrade -f values.yaml <RELEASE_NAME> datadog/datadog
```

{{< /tab >}}
{{< /tabs >}}

### コンフィギュレーション

{{< tabs >}}
{{< tab "Host" >}}

#### ホスト

##### メトリクスの収集

Redpanda のパフォーマンスデータの収集を開始するには

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `redpanda.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[redpanda.d/conf.yaml.example][2] のサンプルファイルを参照してください。

2. [Agent を再起動します][3]。

##### ログの収集

デフォルトでは、Datadog Agent でログを収集することは無効になっています。ログ収集は、Agent v6.0+ で利用可能です。

1. ログを有効にするには、`datadog.yaml` ファイルに以下を追加します。

   ```yaml
   logs_enabled: true
   ```

2. `dd-agent` ユーザーが `systemd-journal` グループのメンバであることを確認してください。
   ```
   usermod -a -G systemd-journal dd-agent
   ```

3. Redpanda のログの収集を開始するには、`redpanda.d/conf.yaml` ファイルに以下を追加します。

   ```yaml
    logs:
    - type: journald
      source: redpanda
    ```

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-extras/blob/master/redpanda/datadog_checks/redpanda/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{< /tab >}}
{{< tab "Containerized" >}}

#### コンテナ化

##### メトリクスの収集

コンテナ環境では、Datadog Agent イメージに Redpanda チェックが統合された後、オートディスカバリーがデフォルトで構成されます。

メトリクスは、Datadog のサーバーに自動的に収集されます。詳細は、[オートディスカバリーインテグレーションテンプレート][1]を参照してください。

##### ログの収集

デフォルトでは、Datadog Agent でログ収集は無効になっています。ログ収集は、Agent v6.0+ で利用可能です。

ログを有効にするには、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "redpanda", "service": "redpanda_cluster"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://app.datadoghq.com/account/settings#agent
{{< /tab >}}
{{< /tabs >}}

### 検証

[Agent のステータスサブコマンドを実行][4]し、Checks セクションで `redpanda` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "redpanda" >}}


### イベント

Redpanda インテグレーションには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "redpanda" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。


[1]: https://vectorized.io
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/help/