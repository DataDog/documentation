---
app_id: redpanda
app_uuid: 4c7855c5-6c2c-46c5-bfc3-1a7df1ac6b77
assets:
  dashboards:
    Redpanda Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: redpanda.application.uptime
      metadata_path: metadata.csv
      prefix: redpanda.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10232
    source_type_name: Redpanda
  logs:
    source: redpanda
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Redpanda
  sales_email: support@redpanda.com
  support_email: support@redpanda.com
categories:
- ログの収集
- メッセージキュー
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/redpanda/README.md
display_on_public_website: true
draft: false
git_integration_title: redpanda
integration_id: redpanda
integration_title: Redpanda
integration_version: 2.0.0
is_public: true
kind: integration
manifest_version: 2.0.0
name: redpanda
public_title: Redpanda
short_description: Redpanda クラスターの全体的な健全性とパフォーマンスを監視します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Message Queues
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Redpanda クラスターの全体的な健全性とパフォーマンスを監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Redpanda
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->

## 概要

Redpanda は、ミッションクリティカルなワークロードのための Kafka API 互換のストリーミングプラットフォームです。

Datadog と [Redpanda][1] を接続し、主要なメトリクスを表示したり、特定のユーザーニーズに基づいて追加のメトリクスグループを追加することができます。

## 計画と使用

### インフラストラクチャーリスト

1. [Datadog Agent をダウンロードして起動][2]します。
2. Redpanda インテグレーションを手動でインストールします。環境に応じた詳細は、[コミュニティインテグレーションを利用する][3]を参照してください。

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホスト上で動作している Agent に対してこのチェックを構成するには、`datadog-agent integration install -t datadog-redpanda==<INTEGRATION_VERSION>` を実行します。

{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境では、Docker Agent とこのインテグレーションを使用する最善の方法は、Redpanda インテグレーションをインストールした Agent をビルドすることです。

Agent のアップデート版をビルドするには

1. 以下の Dockerfile を使用します。

```dockerfile
FROM gcr.io/datadoghq/agent:latest

ARG INTEGRATION_VERSION=2.0.0

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

{{% /tab %}}
{{< /tabs >}}

### ブラウザトラブルシューティング

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

##### メトリクスの収集

Redpanda のパフォーマンスデータの収集を開始するには

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `redpanda.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[redpanda.d/conf.yaml.example][2] のサンプルファイルを参照してください。

2. [Agent を再起動します][3]。

##### 収集データ

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
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

##### メトリクスの収集

コンテナ環境では、Datadog Agent イメージに Redpanda チェックが統合された後、オートディスカバリーがデフォルトで構成されます。

メトリクスは、Datadog のサーバーに自動的に収集されます。詳細は、[オートディスカバリーインテグレーションテンプレート][1]を参照してください。

##### 収集データ

デフォルトでは、Datadog Agent でログ収集は無効になっています。ログ収集は、Agent v6.0+ で利用可能です。

ログを有効にするには、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "redpanda", "service": "redpanda_cluster"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://app.datadoghq.com/account/settings/agent/latest
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent のステータスサブコマンドを実行][4]し、Checks セクションで `redpanda` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "redpanda" >}}


### ヘルプ

Redpanda インテグレーションには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "redpanda" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。


[1]: https://redpanda.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/help/