---
"app_id": "teamcity"
"app_uuid": "8dd65d36-9cb4-4295-bb0c-68d67c0cdd4b"
"assets":
  "dashboards":
    "TeamCity Overview": "assets/dashboards/overview.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": true
    "metrics":
      "check":
      - "teamcity.builds"
      - "teamcity.build_duration"
      "metadata_path": "metadata.csv"
      "prefix": "teamcity."
    "process_signatures":
    - "teamcity-server.sh"
    - "teamcity-server"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "109"
    "source_type_name": "Teamcity"
  "monitors":
    "Build Status": "assets/monitors/build_status.json"
  "saved_views":
    "teamcity_processes": "assets/saved_views/teamcity_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "configuration & deployment"
- "log collection"
- "notifications"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/teamcity/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "teamcity"
"integration_id": "teamcity"
"integration_title": "TeamCity"
"integration_version": "4.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "teamcity"
"public_title": "TeamCity"
"short_description": "ビルドを追跡し、各デプロイのパフォーマンス上の影響を調査。"
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::構成 & デプロイ"
  - "Category::ログの収集"
  - "Category::Notifications"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "ビルドを追跡し、各デプロイのパフォーマンス上の影響を調査。"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "TeamCity"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このインテグレーションは、TeamCity サーバーに接続してメトリクス、サービスチェック、イベントを送信し、TeamCity プロジェクトのビルド構成、ビルド実行、サーバーリソースなどの健全性を監視することができます。

## セットアップ

### インストール

TeamCity チェックは [Datadog Agent][1] パッケージに含まれています。TeamCity サーバーに追加でインストールする必要はありません。

### 構成

#### TeamCity の準備

[ゲストログイン](#guest-login)を有効にするか、Basic HTTP 認証の[ユーザー資格情報](#user-credentials)を識別することができます。

##### ゲストログイン

1. [ゲストログインを有効にします][2]。

2. プロジェクト単位の権限を Guest ユーザーに割り当てられるように、`Per-project permissions` を有効にします。[認可モードの変更][3]を参照してください。
![ゲストログインを有効にする][4]
3. 既存のロールを使用するか、新しい読み取り専用ロールを作成し、そのロールに`View Usage Statistics` 権限を追加します。[ロールと権限の管理][5]を参照してください。
![読み取り専用ロールの作成][6]

3. _[オプション]_ イベント収集時にビルド構成の種類を自動的に検出するチェックを有効にするには、読み取り専用ロールに `View Build Configuration Settings` 権限を追加します。
![View Build Config Settings 権限の付与][7]

4. Guest ユーザーに[読み取り専用]ロールを割り当てます。[ユーザーへのロールの割り当て][8]を参照してください。
![ゲストユーザー設定][9]
![ロールの割り当て][10]

##### ユーザー資格情報

Basic HTTP 認証の場合
- [Agent の構成ディレクトリ][11]の `conf.d/` フォルダ内の `teamcity.d/conf.yaml` ファイルに、識別された `username` と `password` を指定します。
- `Access denied. Enable guest authentication or check user permissions.` (アクセスが拒否されました。ゲスト認証を有効にするか、ユーザー権限を確認してください。) というエラーが発生した場合は、ユーザーの権限が正しいことを確認してください。 
  - プロジェクト単位および View Usage Statistics 権限が有効になっている。
  - Agent Workload Statistics を収集する場合は、View Agent Details および View Agent Usage Statistics 権限も割り当てます。

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `teamcity.d/conf.yaml` を編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル teamcity.d/conf.yaml][2] を参照してください。

TeamCity チェックは、データ収集の 2 つのメソッドを提供します。TeamCity 環境を最適にモニターするには、2 つの別々のインスタンスを構成して、それぞれの方法からメトリクスを収集します。

1. OpenMetrics method (requires Python version 3):

   TeamCity の `/metrics` Prometheus エンドポイントからメトリクスを収集するために `use_openmetrics: true` を有効化します。

   ```yaml
   init_config: 

   instances:
     - server: http://teamcity.<ACCOUNT_NAME>.com

       ## @param projects - mapping - optional
       ## Mapping of TeamCity projects and build configurations to
       ## collect events and metrics from the TeamCity REST API.
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

  To collect [OpenMetrics-compliant][3] histogram and summary metrics (available starting in TeamCity Server 2022.10+), add the internal property, `teamcity.metrics.followOpenMetricsSpec=true`. See, [TeamCity Internal Properties][4].

2. TeamCity Server REST API method (requires Python version 3):

   Configure a separate instance in the `teamcity.d/conf.yaml` file to collect additional build-specific metrics, service checks, and build status events from the TeamCity server's REST API. Specify your projects and build configurations using the `projects` option.

   ```yaml
   init_config:

   instances:
     - server: http://teamcity.<ACCOUNT_NAME>.com

       ## @param projects - mapping - optional
       ## Mapping of TeamCity projects and build configurations to
       ## collect events and metrics from the TeamCity REST API.
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

Customize each project's build configuration monitoring using the optional `include` and `exclude` filters to specify build configuration IDs to include or exclude from monitoring, respectively. Regular expression patterns are supported in the `include` and `exclude` keys to specify build configuration ID matching patterns. If both `include` and `exclude` filters are omitted, all build configurations are monitored for the specified project. 

For Python version 2, configure one build configuration ID per instance using the `build_configuration` option:

```yaml
init_config:

instances:
  - server: http://teamcity.<ACCOUNT_NAME>.com

    ## @param projects - mapping - optional
    ## Mapping of TeamCity projects and build configurations to
    ## collect events and metrics from the TeamCity REST API.
    #
    build_configuration: <BUILD_CONFIGURATION_ID>
```

[Agent を再起動][5]すると、TeamCity イベントが収集され、Datadog に送信されます。

##### ログ収集

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

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/teamcity/datadog_checks/teamcity/data/conf.yaml.example
[3]: https://github.com/OpenObservability/OpenMetrics/blob/main/specification/OpenMetrics.md
[4]: https://www.jetbrains.com/help/teamcity/server-startup-properties.html#TeamCity+Internal+Properties
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://www.jetbrains.com/help/teamcity/teamcity-server-logs.html
[7]: https://docs.datadoghq.com/logs/log_configuration/pipelines/#integration-pipelines
[8]: https://logging.apache.org/log4j/2.x/manual/layouts.html#Patterns
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `teamcity`                                                                                        |
| `<INIT_CONFIG>`      | 空白または `{}`                                                                                     |
| `<INSTANCE_CONFIG>`  | `{"server": "%%host%%", "use_openmetrics": "true"}`                                               |

##### ログ収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "teamcity"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][12]し、Checks セクションで `teamcity` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "teamcity" >}}


### イベント

ビルドの成功と失敗を表す TeamCity イベントが Datadog に転送されます。

### サービスチェック
{{< get-service-checks-from-git "teamcity" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。

## その他の参考資料

- [Track performance impact of code changes with TeamCity and Datadog][14]


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://www.jetbrains.com/help/teamcity/enabling-guest-login.html
[3]: https://www.jetbrains.com/help/teamcity/managing-roles-and-permissions.html#Changing+Authorization+Mode
[4]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/authentication.jpg
[5]: https://www.jetbrains.com/help/teamcity/managing-roles-and-permissions.html
[6]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/create_role.jpg
[7]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/build_config_permissions.jpg
[8]: https://www.jetbrains.com/help/teamcity/creating-and-managing-users.html#Assigning+Roles+to+Users
[9]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/guest_user_settings.jpg
[10]: https://raw.githubusercontent.com/DataDog/integrations-core/master/teamcity/images/assign_role.jpg
[11]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[12]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[13]: https://docs.datadoghq.com/help/
[14]: https://www.datadoghq.com/blog/track-performance-impact-of-code-changes-with-teamcity-and-datadog
