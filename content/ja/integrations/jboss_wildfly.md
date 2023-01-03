---
app_id: jboss-wildfly
app_uuid: 4ad5a2e9-106b-43a2-820a-f146c7effffe
assets:
  dashboards:
    JBoss WildFly: assets/dashboards/jboss_wildfly.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: jboss.jdbc_connections.count
      metadata_path: metadata.csv
      prefix: jboss.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: JBoss/WildFly
  logs:
    source: jboss_wildfly
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- web
- ログの収集
- オートディスカバリー
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/README.md
display_on_public_website: true
draft: false
git_integration_title: jboss_wildfly
integration_id: jboss-wildfly
integration_title: JBoss/WildFly
integration_version: 2.0.1
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: jboss_wildfly
oauth: {}
public_title: JBoss/WildFly
short_description: JBoss および WildFly アプリケーションからさまざまな JMX メトリクスを収集
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
  - Category::Web
  - Category::Log Collection
  - Category::Autodiscovery
  configuration: README.md#Setup
  description: JBoss および WildFly アプリケーションからさまざまな JMX メトリクスを収集
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: JBoss/WildFly
---



## 概要

このチェックは [JBoss][1] および [WildFly][2] アプリケーションを監視します。

## セットアップ

### インストール

JBoss/WildFly チェックは [Datadog Agent][3] パッケージに含まれています。JBoss/WildFly ホストに追加でインストールする必要はありません。

### コンフィギュレーション

このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、情報ページに表示されます。以下で説明するコンフィギュレーションを編集することで、関心があるメトリクスを指定できます。収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][4]で詳細な手順を参照してください。制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][5]までお問い合わせください。

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. JBoss または WildFly アプリケーションサーバーのパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `jboss_wildfly.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[jboss_wildfly.d/conf.yaml のサンプル][1] を参照してください。

   サーバーのセットアップによっては（特に `remote+http` JMX スキームを使用している場合は）、サーバーに接続するためにカスタムな JAR を指定する必要がでてきます。Agent と同じマシンに JAR を配置し、`jboss_wildfly.d/conf.yaml` ファイルの`custom_jar_paths` オプションにパスを追加します。

    **注**: JMX URL スキームは WildFly のバージョンにより異なります。

   - Wildfly 9 以降: `service:jmx:http-remoting-jmx://<ホスト>:<ポート> `
   - Wildfly 10 以降: `service:jmx:remote+http://<ホスト>:<ポート>`

    詳細については、[WildFly JMX サブシステムコンフィギュレーションページ][2]を参照してください。

2. [Agent を再起動します][3]。

##### ログの収集

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
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

##### メトリクスの収集

コンテナ環境の場合は、[JMX を使用したオートディスカバリー][1]のガイドを参照してください。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                                      |
| -------------- | ---------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "jboss_wildfly", "service": "<サービス名>"}` |

[1]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `jboss_wildfly` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "jboss_wildfly" >}}


### イベント

JBoss/WildFly インテグレーションには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "jboss_wildfly" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。



[1]: https://developers.redhat.com/products/eap/overview
[2]: http://wildfly.org
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/integrations/java/
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information