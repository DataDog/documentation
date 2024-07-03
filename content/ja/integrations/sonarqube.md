---
app_id: sonarqube
app_uuid: c6033e2f-8b3d-4b82-8d35-7c61ce7d0908
assets:
  dashboards:
    Sonarqube Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: sonarqube.server.database.pool_active_connections
      metadata_path: metadata.csv
      prefix: sonarqube.
    process_signatures:
    - java org.sonar.server.app.WebServer
    - java org.sonar.ce.app.CeServer
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10132
    source_type_name: SonarQube
  monitors:
    SonarQube vulnerabilities: assets/monitors/vulnerabilities.json
  saved_views:
    status_overview: assets/saved_views/status_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- automation
- log collection
- security
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/sonarqube/README.md
display_on_public_website: true
draft: false
git_integration_title: sonarqube
integration_id: sonarqube
integration_title: SonarQube
integration_version: 3.2.2
is_public: true
manifest_version: 2.0.0
name: sonarqube
public_title: SonarQube
short_description: Monitor your SonarQube server and projects.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Monitor your SonarQube server and projects.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: SonarQube
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは [SonarQube][1] を監視します。

## セットアップ

### インストール

SonarQube チェックは [Datadog Agent][2] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### 構成

SonarQube は、Web API および JMX の 2 つのソースからのメトリクスを公開します。
[以下で指定されたメトリクス](#metrics)のすべてを収集するには、このチェックの 3 つのインスタンスを構成します。SonarQube の
Web API を監視するものと、SonarQube の JMX Bean を監視する 2 つです。

SonarQube の Web API に関するドキュメントは、SonarQube Web UI の `/web_api` でご確認ください。デフォルトで
このインテグレーションは SonarQube の JMX Bean を通じて公開されたすべての関連 SonarQube パフォーマンスを収集します。この
デフォルトのメトリクスのコンフィギュレーションは、[sonarqube.d/metrics.yaml][3] ファイルにあります。Bean に関するドキュメントは、
[SonarQube のウェブサイト][4]をご覧ください。

SonarQube の JMX サーバーは、デフォルトで**無効**になっています。つまり、有効にしない限り `sonarqube.server.*` メトリクスは収集されません。有効化して SonarQube 内で JMX を構成する方法について、詳細は [SonarQube ドキュメント][5]をご参照ください。以下は、いくつかの一般的な Java プロセスで JMX サーバーを有効にするために必要な構成です。

```conf
# WEB SERVER
sonar.web.javaAdditionalOpts="
  -Dcom.sun.management.jmxremote=true
  -Dcom.sun.management.jmxremote.port=10443
  -Dcom.sun.management.jmxremote.rmi.port=10443
  ...
  "

# COMPUTE ENGINE
sonar.ce.javaAdditionalOpts="
  -Dcom.sun.management.jmxremote=true
  -Dcom.sun.management.jmxremote.port=10444
  -Dcom.sun.management.jmxremote.rmi.port=10444
  ...
  "

# ELASTICSEARCH
sonar.search.javaAdditionalOpts="
  -Dcom.sun.management.jmxremote=true
  -Dcom.sun.management.jmxremote.port=10445
  -Dcom.sun.management.jmxremote.rmi.port=10445
  ...
  "
```

これは、SonarQube および JMX のデフォルトに基づく基本的な `sonarqube.d/conf.yaml` 例です。ホストベースまたはコンテナベースで Agent をインストールする場合、ここを起点として開始できます。

```yaml
init_config:
    is_jmx: false
    collect_default_metrics: true
instances:

  # Web API インスタンス
  - is_jmx: false
    web_endpoint: http://localhost:9000
    auth_type: basic
    username: <username>    # Web UI で定義済み
    password: <password>    # Web UI で定義済み
    default_tag: component  # オプション
    components:             # 必須
      my-project:
        tag: project_name

  # Web JMX インスタンス
  - is_jmx: true
    host: localhost
    port: 10443           # SonarQube の sonar.properties ファイルの sonar.web.javaAdditionalOpts を参照してください
    user: <username>      # SonarQube の sonar.properties ファイルで定義済み
    password: <password>  # SonarQube の sonar.properties ファイルで定義済み

  # Compute Engine JMX インスタンス
  - is_jmx: true
    host: localhost
    port: 10444           # SonarQube の sonar.properties ファイルの sonar.ce.javaAdditionalOpts を参照してください
    user: <username>      # SonarQube の sonar.properties ファイルで定義済み
    password: <password>  # SonarQube の sonar.properties ファイルで定義済み
```

**注**: インテグレーションを構成したら、SonarQube で 1 つ以上のプロジェクトをスキャンし、メトリクスを Datadog に送信します。

このインテグレーションで収集される.メトリクスは、デフォルトで `component` タグが付けられます。タグ名をコンポーネント別に変更するには、コンポーネントの定義で `tag` プロパティを指定します。すべてのプロジェクトに設定するには、インスタンスのコンフィグで `default_tag` プロパティを設定します。

**注**: SonarQube のプロジェクトには、よく複数のソース管理ブランチが含まれています。このインテグレーションでは、SonarQube 内のデフォルトブランチ (通常は `main`) からのメトリクスのみが収集されます。

#### サーバーメトリクスの検索

SonarQube はこのインテグレーションの追加インスタンスおよび JMX メトリクスのコンフィギュレーションを使用して監視される検索サーバーを公開します。収集するメトリクスのカスタマイズ方法については、[JMX チェックのドキュメント][6]で詳細をご確認ください。例については、以下のコンフィグや、 [sonarqube.d/metrics.yaml][3] 内のデフォルトの JMX メトリクスコンフィグなどもご活用いただけます。

```yaml
init_config:
  # インテグレーションにより収集されるメトリクスのリスト。
  config:
    - include:
      domain: SonarQube
      name: <name>
      exclude_tags:
        - name
      attribute:
        MyMetric:
          alias: sonarqube.search_server.my_metric
          metric_type: gauge
instances:
  # Search Server JMX インスタンス
  - is_jmx: true
    host: localhost
    port: 10445           # SonarQube の sonar.properties ファイルの sonar.search.javaAdditionalOpts を参照してください
    user: <username>      # SonarQube の sonar.properties ファイルで定義済み
    password: <password>  # SonarQube の sonar.properties ファイルで定義済み
```

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

##### メトリクスの収集

1. 次のルートにある `conf.d/` フォルダーの `sonarqube.d/conf.yaml` ファイルを編集します:
   SonarQube データの収集を開始します。
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル  sonarqube.d/conf.yaml][1] を参照してください。

   This check has a limit of 350 metrics per JMX instance. The number of returned metrics is indicated in [the status page][2].
   以下で説明する構成を編集することで、関心があるメトリクスを指定できます。
   収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][3]で詳細な手順を参照してください。
   制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][4]までお問い合わせください。

2. [Agent を再起動します][5]。

##### ログ収集

1. Enable SonarQube [logging][6].

2. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

3. 次のコンフィギュレーションブロックを `sonarqube.d/conf.yaml` ファイルに追加します。環境に基づいて、`path` パラメーターと `service` パラメーターの値を変更してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル sonarqube.d/conf.yaml][1] を参照してください。

   ```yaml
   logs:
     - type: file
       path: /opt/sonarqube/logs/access.log
       source: sonarqube
     - type: file
       path: /opt/sonarqube/logs/ce.log
       source: sonarqube
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
     - type: file
       path: /opt/sonarqube/logs/es.log
       source: sonarqube
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
     - type: file
       path: /opt/sonarqube/logs/sonar.log
       source: sonarqube
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
     - type: file
       path: /opt/sonarqube/logs/web.log
       source: sonarqube
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
   ```

5. [Agent を再起動します][5]。

[1]: https://github.com/DataDog/integrations-core/blob/master/sonarqube/datadog_checks/sonarqube/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ja/integrations/java/
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.sonarqube.org/latest/instance-administration/system-info/
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

##### メトリクスの収集

コンテナ環境の場合は、[JMX を使用したオートディスカバリー][1]のガイドを参照してください。

##### ログ収集

Datadog Agent では、ログの収集がデフォルトで無効になっています。これを有効にするには、[Docker ログの収集][2]を参照してください。

| パラメーター      | 値                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "sonarqube"}` |

[1]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/ja/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

#### コンポーネントの検出

`components_discovery` パラメータで、コンポーネントの検出方法を構成することができます。

`limit`
: 自動検出するアイテムの最大数。
**デフォルト値**: `10`

`include`
: 正規表現キーとコンポーネント設定値の自動検出へのマッピング。 
**デフォルト値**: 空のマップ

`exclude`
: 自動検出から除外するコンポーネントのパターンを持つ正規表現のリスト。
**デフォルト値**: 空のリスト

**例**:

`my_project` で始まる名前のコンポーネントを最大 `5` まで含めます。

```yaml
components_discovery:
  limit: 5
  include:
    'my_project*':
```

最大 `20` のコンポーネントを含み、`temp` で始まるコンポーネントは除外します。

```yaml
components_discovery:
  limit: 20
  include:
    '.*':
  exclude:
    - 'temp*'
```

名前が `issues` で始まるコンポーネントをすべて含み、`issues_project` タグを適用し、カテゴリー `issues` に属するメトリクスのみを収集します。`limit` が定義されていないため、検出されるコンポーネントの数はデフォルト値の `10` に制限されます。
```yaml
components_discovery:
  include:
    'issues*':
       tag: issues_project
       include:
         - issues.
```

### 検証

[Agent のステータスサブコマンドを実行][7]し、 **JMXFetch** セクションで `sonarqube` を探します。

```text
========
JMXFetch
========
  Initialized checks
  ==================
    sonarqube
      instance_name : sonarqube-localhost-10444
      message : <no value>
      metric_count : 33
      service_check_count : 0
      status : OK
      instance_name : sonarqube-localhost-10443
      message : <no value>
      metric_count : 38
      service_check_count : 0
      status : OK
```

`is_jmx: true` を使用せずにインスタンスを設定する場合も、**Collector** セクションで `sonarqube` を探します。

```text
=========
Collector
=========
  Running Checks
  ==============
    sonarqube (1.1.0)
    -----------------
      Instance ID: sonarqube:1249c1ed7c7b489a [OK]
      Configuration Source: file:/etc/datadog-agent/conf.d/sonarqube.d/conf.yaml
      Total Runs: 51
      Metric Samples: Last Run: 39, Total: 1,989
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 51
      Average Execution Time : 1.19s
      Last Execution Date : 2021-03-12 00:00:44.000000 UTC
      Last Successful Execution Date : 2021-03-12 00:00:44.000000 UTC
```

## 収集データ

### メトリクス
{{< get-metrics-from-git "sonarqube" >}}


### イベント

SonarQube には、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "sonarqube" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://www.sonarqube.org
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/sonarqube/datadog_checks/sonarqube/data/metrics.yaml
[4]: https://docs.sonarqube.org/latest/instance-administration/monitoring/
[5]: https://docs.sonarsource.com/sonarqube/latest/instance-administration/monitoring/instance/#how-do-i-activate-jmx
[6]: https://docs.datadoghq.com/ja/integrations/java/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/ja/help/