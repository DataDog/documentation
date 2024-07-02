---
"app_id": "jboss-wildfly"
"app_uuid": "4ad5a2e9-106b-43a2-820a-f146c7effffe"
"assets":
  "dashboards":
    "JBoss WildFly": assets/dashboards/jboss_wildfly.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": jboss.jdbc_connections.count
      "metadata_path": metadata.csv
      "prefix": jboss.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10060"
    "source_type_name": JBoss/WildFly
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "jboss_wildfly"
"integration_id": "jboss-wildfly"
"integration_title": "JBoss/WildFly"
"integration_version": "2.2.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "jboss_wildfly"
"public_title": "JBoss/WildFly"
"short_description": "Gathers various JMX metrics from JBoss and WildFly Applications"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Gathers various JMX metrics from JBoss and WildFly Applications
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": JBoss/WildFly
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは [JBoss][1] および [WildFly][2] アプリケーションを監視します。

## セットアップ

### インストール

JBoss/WildFly チェックは [Datadog Agent][3] パッケージに含まれています。JBoss/WildFly ホストに追加でインストールする必要はありません。

### 構成

このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、[ステータスページ][4]に表示されます。下記の構成を編集することで、関心のあるメトリクスを指定できます。収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][5]で詳細な手順を参照してください。制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][6]までお問い合わせください。

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

##### メトリクスの収集

1. JBoss または WildFly アプリケーションサーバーのパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `jboss_wildfly.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[jboss_wildfly.d/conf.yaml のサンプル][1] を参照してください。

   サーバーのセットアップによっては（特に `remote+http` JMX スキームを使用している場合は）、サーバーに接続するためにカスタムな JAR を指定する必要がでてきます。Agent と同じマシンに JAR を配置し、`jboss_wildfly.d/conf.yaml` ファイルの`custom_jar_paths` オプションにパスを追加します。

    **注**: JMX URL スキームは WildFly のバージョンにより異なります。

   - Wildfly 9 以降: `service:jmx:http-remoting-jmx://<ホスト>:<ポート> `
   - Wildfly 10 以降: `service:jmx:remote+http://<ホスト>:<ポート>`

    詳細については、[WildFly JMX サブシステムコンフィギュレーションページ][2]を参照してください。

2. [Agent を再起動します][3]。

##### ログ収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. 次に、下部にある `logs` 行のコメントを解除して、`jboss_wildfly.d/conf.yaml` を編集します。ログの `path` を JBoss ログファイルの正しいパスで更新してください。

   ```yaml
   logs:
     - type: file
       path: /opt/jboss/wildfly/standalone/log/*.log
       source: jboss_wildfly
       service: '<APPLICATION_NAME>'
   ```

3. [Agent を再起動します][3]。

[1]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[2]: https://docs.jboss.org/author/display/WFLY9/JMX%20subsystem%20configuration.html
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

##### メトリクスの収集

コンテナ環境の場合は、[JMX を使用したオートディスカバリー][1]のガイドを参照してください。

##### ログ収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                                      |
| -------------- | ---------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "jboss_wildfly", "service": "<サービス名>"}` |

[1]: https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][4]し、Checks セクションで `jboss_wildfly` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "jboss_wildfly" >}}


### イベント

JBoss/WildFly インテグレーションには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "jboss_wildfly" >}}


### Collecting metrics with JMXFetch

You can configure the Datadog Agent to collect Java application metrics through [JMXFetch][7]. To collect the default metrics configured for the JBoss/Wildfly Datadog integration, set the system property
`Ddd.jmxfetch.jboss_wildfly.enabled=true`. 

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。



[1]: https://developers.redhat.com/products/eap/overview
[2]: http://wildfly.org
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/integrations/java/
[6]: https://docs.datadoghq.com/help/
[7]: https://docs.datadoghq.com/integrations/java
