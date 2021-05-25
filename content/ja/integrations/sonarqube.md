---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: sonarqube
  metrics_metadata: metadata.csv
  monitors:
    SonarQube vulnerabilities: assets/recommended_monitors/vulnerabilities.json
  saved_views:
    status_overview: assets/saved_views/status_overview.json
  service_checks: assets/service_checks.json
categories:
  - セキュリティ
  - 問題追跡
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/sonarqube/README.md'
display_name: SonarQube
draft: false
further_reading:
  - link: 'https://www.datadoghq.com/blog/datadog-sonarqube-integration/'
    tag: ブログ
    text: SonarQube で Datadog のコード品質を監視
git_integration_title: sonarqube
guid: ce089575-93bf-47f0-80b6-ffaf6e34722c
integration_id: sonarqube
integration_title: SonarQube
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: sonarqube.
metric_to_check: sonarqube.server.database.pool_active_connections
name: sonarqube
public_title: SonarQube
short_description: SonarQube のサーバーとプロジェクトを監視します。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは [SonarQube][1] を監視します。

## セットアップ

### インストール

SonarQube チェックは [Datadog Agent][2] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

SonarQube は、Web API および JMX の 2 つのソースからのメトリクスを公開します。
[以下で指定されたメトリクス](#metrics)のすべてを収集するには、このチェックの 3 つのインスタンスを構成します。SonarQube の
Web API を監視するものと、SonarQube の JMX Bean を監視する 2 つです。

SonarQube の Web API に関するドキュメントは、SonarQube Web UI の `/web_api` でご確認ください。デフォルトで
このインテグレーションは SonarQube の JMX Bean を通じて公開されたすべての関連 SonarQube パフォーマンスを収集します。この
デフォルトのメトリクスのコンフィギュレーションは、[sonarqube.d/metrics.yaml][3] ファイルにあります。Bean に関するドキュメントは、
[SonarQube のウェブサイト][4]をご覧ください。

SonarQube の JMX サーバーは、デフォルトで無効になっています。有効化して SonarQube 内で JMX を構成する方法について、
詳細は [SonarQube ドキュメント][5]をご参照ください。

これは、SonarQube および JMX のデフォルトに基づく基本的な `sonarqube.d/conf.yaml` 例です。ホストベースまたはコンテナベースで
Agent をインストールする場合、ここを起点として開始できます。

```yaml
init_config:
    is_jmx: false
    collect_default_metrics: true
instances:
  # Web API インスタンス
  - is_jmx: false
    web_endpoint: http://localhost:9000
    auth_type: basic
    username: <username>    # Defined in the Web UI
    password: <password>    # Defined in the Web UI
    default_tag: component  # Optional
    components:
      my-project:
        tag: project_name
  # Web JMX インスタンス
  - is_jmx: true
    host: localhost
    port: 10443
    user: <username>      # SonarQube の sonar.properties ファイルで定義済み
    password: <password>  # SonarQube の sonar.properties ファイルで定義済み
  # Compute Engine JMX インスタンス
  - is_jmx: true
    host: localhost
    port: 10444
    user: <username>      # SonarQube の sonar.properties ファイルで定義済み
    password: <password>  # SonarQube の sonar.properties ファイルで定義済み
```

> 注: インテグレーションを構成したら、SonarQube で 1 つ以上のプロジェクトをスキャンし、メトリクスを Datadog に表示します。
> 

このインテグレーションで収集される.メトリクスは、デフォルトで `component` タグが付けられます。タグ名をコンポーネント別に
変更するには、コンポーネントの定義で `tag` プロパティを指定します。すべてのプロジェクトに設定するには、インスタンスの
コンフィグで `default_tag` プロパティを設定します。

> 注: SonarQube のプロジェクトには、よく複数のソース管理ブランチが含まれています。このインテグレーションでは、
>SonarQube 内のデフォルトブランチ (通常は `main`) からのメトリクスのみが収集されます。

さらに、SonarQube はこのインテグレーションの追加インスタンスおよび収集する JMX メトリクスのコンフィギュレーションを
使用して監視される Search Server を公開します。収集するメトリクスのカスタマイズ方法については、[JMX チェックのドキュメント][6]
で詳細をご確認ください。以下のコンフィグ例や、 [sonarqube.d/metrics.yaml][3] 内のデフォルトの JMX メトリクスコンフィグ
などもご活用いただけます。

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
    port: 10445
    user: <username>      # SonarQube の sonar.properties ファイルで定義済み
    password: <password>  # SonarQube の sonar.properties ファイルで定義済み
```

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. 次のルートにある `conf.d/` フォルダーの `sonarqube.d/conf.yaml` ファイルを編集します:
   SonarQube データの収集を開始します。
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル  sonarqube.d/conf.yaml][1] を参照してください。

   このチェックでは、JMX インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、情報ページに表示されます。
   以下で説明する構成を編集することで、関心があるメトリクスを指定できます。
   収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][2]で詳細な手順を参照してください。
    制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][3]までお問い合わせください。

2. [Agent を再起動します][4]。

##### ログの収集

1. SonarQube [ログの収集][5]を有効化します。

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

5. [Agent を再起動します][4]。

[1]: https://github.com/DataDog/integrations-core/blob/master/sonarqube/datadog_checks/sonarqube/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/integrations/java/
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.sonarqube.org/latest/instance-administration/system-info/
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

##### メトリクスの収集

コンテナ環境の場合は、[JMX を使用したオートディスカバリー][1]のガイドを参照してください。

##### ログの収集

Datadog Agent では、ログの収集がデフォルトで無効になっています。これを有効にするには、[Docker ログの収集][2]を参照してください。

| パラメーター      | 値                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "sonarqube"}` |

[1]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/ja/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

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


### サービスのチェック

**sonarqube.can_connect**:<br>
Agent が監視対象の SonarQube インスタンスの JMX エンドポイントに接続できず、メトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**sonarqube.api_access**:<br>
Agent が監視対象の SonarQube インスタンスの Web エンドポイントに接続できず、メトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

### イベント

SonarQube には、イベントは含まれません。

## トラブルシューティング

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。


[1]: https://www.sonarqube.org
[2]: https://docs.datadoghq.com/ja/agent/
[3]: https://github.com/DataDog/integrations-core/blob/master/sonarqube/datadog_checks/sonarqube/data/metrics.yaml
[4]: https://docs.sonarqube.org/latest/instance-administration/monitoring/
[5]: https://docs.sonarqube.org/latest/instance-administration/monitoring/#header-4
[6]: https://docs.datadoghq.com/ja/integrations/java/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/ja/help/