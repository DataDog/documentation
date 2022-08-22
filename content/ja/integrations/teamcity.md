---
app_id: teamcity
app_uuid: 8dd65d36-9cb4-4295-bb0c-68d67c0cdd4b
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Teamcity
  logs:
    source: teamcity
  saved_views:
    teamcity_processes: assets/saved_views/teamcity_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuration & deployment
- autodiscovery
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/teamcity/README.md
display_on_public_website: true
draft: false
git_integration_title: teamcity
integration_id: teamcity
integration_title: Teamcity
integration_version: 2.1.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: teamcity
oauth: {}
public_title: Teamcity インテグレーション
short_description: ビルドを追跡し、各デプロイのパフォーマンス上の影響を調査。
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
  - Category::構成 & デプロイ
  - Category::Autodiscovery
  - Category::Log Collection
  configuration: README.md#Setup
  description: ビルドを追跡し、各デプロイのパフォーマンス上の影響を調査。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Teamcity インテグレーション
---



## 概要

このチェックは、正常なビルドに関連するイベントを監視し、それらのイベントを Datadog に送信します。

多くの Agent チェックとは異なり、このチェックはメトリクスを収集せずに、イベントのみを収集します。

## セットアップ

### インストール

Teamcity チェックは [Datadog Agent][1] パッケージに含まれています。Teamcity サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

#### Teamcity の準備

Teamcity を準備するには、[ゲストログインを有効にする][2]を参照してください。

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `teamcity.d/conf.yaml` を編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル teamcity.d/conf.yaml][2] を参照してください。

```yaml
init_config:

instances:
  - name: My Website
    server: teamcity.mycompany.com

    # 追跡するビルド構成の内部ビルド ID
    build_configuration: MyWebsite_Deploy
```

追跡する各ビルド構成の `instances` に上のような項目を追加します。

[Agent を再起動][3]すると、Teamcity イベントが収集され、Datadog に送信されます。

##### ログの収集

1. Teamcity [ログ設定][4]を構成します。

2. デフォルトでは、Datadog のインテグレーションパイプラインは以下のログフォーマットをサポートします。

   ```text
   [2020-09-10 21:21:37,486]   INFO -  jetbrains.buildServer.STARTUP - Current stage: System is ready
   ```

   別の変換[パターン][6]を定義する場合は、[インテグレーションパイプライン][5]を複製して編集してください。

3. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

4. `teamcity.d/conf.yaml` ファイルで以下のコンフィギュレーションブロックのコメントを削除します。環境に基づいて、`path` パラメーターの値を変更します。使用可能なすべてのコンフィギュレーションオプションについては、[teamcity.d/conf.yaml のサンプル][2]を参照してください。

   ```yaml
   logs:
     - type: file
       path: /opt/teamcity/logs/teamcity-server.log
       source: teamcity
     - type: file
       path: /opt/teamcity/logs/teamcity-activities.log
       source: teamcity
     - type: file
       path: /opt/teamcity/logs/teamcity-vcs.log
       source: teamcity
     - type: file
       path: /opt/teamcity/logs/teamcity-cleanup.log
       source: teamcity
     - type: file
       path: /opt/teamcity/logs/teamcity-notifications.log
       source: teamcity
     - type: file
       path: /opt/teamcity/logs/teamcity-ws.log
       source: teamcity
   ```

5. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/teamcity/datadog_checks/teamcity/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://www.jetbrains.com/help/teamcity/teamcity-server-logs.html
[5]: https://docs.datadoghq.com/ja/logs/processing/#integration-pipelines
[6]: https://logging.apache.org/log4j/2.x/manual/layouts.html#Patterns
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| `<インテグレーション名>` | `teamcity`                                                                                        |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                                                     |
| `<インスタンスコンフィギュレーション>`  | `{"name": "<BUILD_NAME>", "server":"%%host%%", "build_configuration":"<BUILD_CONFIGURATION_ID>"}` |

##### ログの収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "teamcity"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][3]し、Checks セクションで `teamcity` を探します。

## 収集データ

### メトリクス

Teamcity チェックには、メトリクスは含まれません。

### イベント

正常なビルドを表す Teamcity イベントが Datadog に転送されます。

### サービスのチェック

Teamcity チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

- [TeamCity と Datadog を使用して、コード変更がパフォーマンスに与える影響を追跡する][5]


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://confluence.jetbrains.com/display/TCD9/Enabling+Guest+Login
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://www.datadoghq.com/blog/track-performance-impact-of-code-changes-with-teamcity-and-datadog