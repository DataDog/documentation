---
app_id: teamcity
app_uuid: 8dd65d36-9cb4-4295-bb0c-68d67c0cdd4b
assets:
  dashboards:
    TeamCity Overview: assets/dashboards/overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check:
      - teamcity.builds
      - teamcity.build_duration
      metadata_path: metadata.csv
      prefix: teamcity.
    process_signatures:
    - teamcity-server.sh
    - teamcity-server
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Teamcity
  logs:
    source: teamcity
  monitors:
    Build Status: assets/recommended_monitors/build_status.json
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
integration_title: TeamCity
integration_version: 2.2.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: teamcity
oauth: {}
public_title: TeamCity
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
  - Category::オートディスカバリー
  - Category::ログの収集
  configuration: README.md#Setup
  description: ビルドを追跡し、各デプロイのパフォーマンス上の影響を調査。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: TeamCity
---



## 概要

このインテグレーションは、TeamCity サーバーに接続してメトリクス、サービスチェック、イベントを送信し、TeamCity プロジェクトのビルド構成、ビルド実行、サーバーリソースなどの健全性を監視することができます。

## セットアップ

### APM に Datadog Agent を構成する

TeamCity チェックは [Datadog Agent][1] パッケージに含まれています。TeamCity サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

#### TeamCity の準備

1. TeamCity を準備するには、[ゲストログインを有効にする][2]を参照してください。

2. プロジェクト単位の権限を Guest ユーザーに割り当てられるように、`Per-project permissions` を有効にします。[認可モードの変更][3]を参照してください。
![ゲストログインを有効にする][4]
3. 既存のロールを使用するか、新しい読み取り専用ロールを作成し、そのロールに`View Usage Statistics` 権限を追加します。[ロールと権限の管理][5]を参照してください。
![読み取り専用ロールの作成][6]

3. _[オプション]_ イベント収集時にビルド構成の種類を自動的に検出するチェックを有効にするには、読み取り専用ロールに `View Build Configuration Settings` 権限を追加します。
![View Build Config Settings 権限の付与][7]

4. Guest ユーザーに[読み取り専用]ロールを割り当てます。[ユーザーへのロールの割り当て][8]を参照してください。
![ゲストユーザー設定][9]
![ロールの割り当て][10]

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `teamcity.d/conf.yaml` を編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル teamcity.d/conf.yaml][2] を参照してください。

TeamCity チェックは、データ収集の 2 つのメソッドを提供します。TeamCity 環境を最適にモニターするには、2 つの別々のインスタンスを構成して、それぞれの方法からメトリクスを収集します。

1. OpenMetricsV2 メソッド(Python バージョン 3 が必要です):

   TeamCity の `/metrics` Prometheus エンドポイントからメトリクスを収集するために `use_openmetrics: true` を有効化します。


   ```yaml
   init_config:

   instances:
       ## @param server - 文字列 - 必須
       ## TeamCity インスタンスのサーバー名を指定します。
       ## インスタンスでゲスト認証を有効にするか、
       ## オプションの `basic_http_authentication` 構成パラメーターを有効にして、データを収集します。
       ## `basic_http_authentication` を使用する場合は、以下を指定します。
       ##
       ## server: http://<USER>:<PASSWORD>@teamcity.<ACCOUNT_NAME>.com
       #
     - server: http://teamcity.<ACCOUNT_NAME>.com
       ## @param use_openmetrics - ブール値 - オプション - デフォルト: false
       ## 最新の OpenMetrics V2 実装を使用して、
       ## TeamCity サーバーの Prometheus メトリクスエンドポイントからメトリクスを収集します。
       ## Python バージョン 3 が必要です。
       ##
       ## Prometheus のメトリクスを収集するために別のインスタンスで有効化します。
       ## このオプションは、TeamCity REST API からイベント、サービスチェック、メトリクスを収集しません。
       #
       use_openmetrics: true
   ```
**注:** [OpenMetrics 準拠][3]のヒストグラムとサマリーのメトリクスを収集するには (TeamCity Server 2022.10+ から利用可能)、内部プロパティである `teamcity.metrics.followOpenMetricsSpec=true` を追加してください。[TeamCity 内部プロパティ][4]を参照してください。

2. TeamCity Server REST API メソッド:

   TeamCity サーバーの REST API から追加のビルド固有のメトリクス、サービスチェック、ビルドステータスイベントを収集するために、`teamcity.d/conf.yaml` ファイルに別のインスタンスを構成します。`projects` オプションを使用して、プロジェクトとビルド構成を指定します (Python バージョン 3 が必要です)。


   ```yaml
   init_config:

   instances:
     - server: http://teamcity.<ACCOUNT_NAME>.com

       ## @param projects - マッピング - オプション
       ## TeamCity REST API からイベントとメトリクスを収集するための
       ## TeamCity プロジェクトとビルド構成のマッピング。
       #
       projects:
         <PROJECT_A>:
           include:    
           - <BUILD_CONFIG_A>
           - <BUILD_CONFIG_B>
           exclude:
           - <BUILD_CONFIG_C>
         <PROJECT_B>:
           include:
           - <BUILD_CONFIG_D>
         <PROJECT_C>: {}
   ```


オプションの `include` と `exclude` フィルターを使用して、監視に含めるビルド構成 ID と監視から除外するビルド構成 ID をそれぞれ指定し、各プロジェクトのビルド構成監視をカスタマイズします。ビルド構成 ID のマッチングパターンを指定するために、`include` と `exclude` のキーで RegEx パターンがサポートされています。もし `include` と `exclude` の両方のフィルターが省略された場合、指定したプロジェクトのすべてのビルド構成が監視されます。

Python バージョン 2 の場合、`build_configuration` オプションを使用して、インスタンスごとに 1 つのビルド構成 ID を構成します。


   ```yaml
   init_config:

   instances:
     - server: http://teamcity.<ACCOUNT_NAME>.com

       ## @param projects - マッピング - オプション
       ## TeamCity REST API からイベントとメトリクスを収集するための
       ## TeamCity プロジェクトとビルド構成のマッピング。
       #
       build_configuration: <BUILD_CONFIGURATION_ID>
   ```


[Agent を再起動][5]すると、TeamCity イベントが収集され、Datadog に送信されます。

##### ログの収集

1. TeamCity [ログ設定][6]を構成します。

2. デフォルトでは、Datadog のインテグレーションパイプラインは以下のログフォーマットをサポートします。

   ```text
   [2020-09-10 21:21:37,486]   INFO -  jetbrains.buildServer.STARTUP - Current stage: System is ready
   ```

   別の変換[パターン][8]を定義する場合は、[インテグレーションパイプライン][7]を複製して編集してください。

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

5. [Agent を再起動します][5]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/teamcity/datadog_checks/teamcity/data/conf.yaml.example
[3]: https://github.com/OpenObservability/OpenMetrics/blob/main/specification/OpenMetrics.md
[4]: https://www.jetbrains.com/help/teamcity/server-startup-properties.html#TeamCity+Internal+Properties
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://www.jetbrains.com/help/teamcity/teamcity-server-logs.html
[7]: https://docs.datadoghq.com/ja/logs/log_configuration/pipelines/#integration-pipelines
[8]: https://logging.apache.org/log4j/2.x/manual/layouts.html#Patterns
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| `<インテグレーション名>` | `teamcity`                                                                                        |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                                                     |
| `<インスタンスコンフィギュレーション>`  | `{"server": "%%host%%", "use_openmetrics": "true"}`                                               |

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

[Agent の `status` サブコマンドを実行][11]し、Checks セクションで `teamcity` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "teamcity" >}}


### イベント

ビルドの成功と失敗を表す TeamCity イベントが Datadog に転送されます。

### サービスのチェック
{{< get-service-checks-from-git "teamcity" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

## {{< partial name="whats-next/whats-next.html" >}}

- [TeamCity と Datadog を使用して、コード変更がパフォーマンスに与える影響を追跡する][13]


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://www.jetbrains.com/help/teamcity/enabling-guest-login.html
[3]: https://www.jetbrains.com/help/teamcity/managing-roles-and-permissions.html#Changing+Authorization+Mode
[4]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/authentication.jpg
[5]: https://www.jetbrains.com/help/teamcity/managing-roles-and-permissions.html
[6]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/create_role.jpg
[7]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/build_config_permissions.jpg
[8]: https://www.jetbrains.com/help/teamcity/creating-and-managing-users.html#Assigning+Roles+to+Users
[9]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/guest_user_settings.jpg
[10]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/assign_role.jpg
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[12]: https://docs.datadoghq.com/ja/help/
[13]: https://www.datadoghq.com/blog/track-performance-impact-of-code-changes-with-teamcity-and-datadog