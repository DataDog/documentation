---
"app_id": "hive"
"app_uuid": "827ff57e-83db-45b4-8a59-2f0270d389e8"
"assets":
  "dashboards":
    "Hive Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": hive.server.memory.total.used
      "metadata_path": metadata.csv
      "prefix": hive.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10062"
    "source_type_name": Hive
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/hive/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "hive"
"integration_id": "hive"
"integration_title": "Hive"
"integration_version": "1.10.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "hive"
"public_title": "Hive"
"short_description": "Gathers various JMX metrics from HiveServer2 and Hive MetaStore"
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
  "description": Gathers various JMX metrics from HiveServer2 and Hive MetaStore
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Hive
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、[Hive][1] の Hive Metastore と HiveServer2 の 2 つを監視します。

## セットアップ

### インストール

Hive チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### 構成

#### Hive のセットアップ

1. Hive Metastore と HiveServer2 のメトリクスを有効化するには、以下のプロパティを追加して、[`HIVE_HOME/conf/hive-site.xml`][3] にある Hive コンフィギュレーションファイルを編集します。

   ```xml
   <property>
     <name>hive.metastore.metrics.enabled</name>
     <value>true</value>
   </property>
   <property>
     <name>hive.server2.metrics.enabled</name>
     <value>true</value>
   </property>
   ```

2. HiveServer2、Hive Metastore、またはその両方の JMX リモート接続を有効にします。たとえば、以下のように `HADOOP_CLIENT_OPTS` 環境変数を設定します。

   ```conf
   export HADOOP_CLIENT_OPTS="$HADOOP_CLIENT_OPTS -Dcom.sun.management.jmxremote \
   -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false \
   -Dcom.sun.management.jmxremote.port=8808"
   ```

   次に、HiveServer2 または Hive Metastore を再起動します。Hive Metastore と HiveServer2 で同じ JMX 接続を共有することはできません。

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

##### メトリクスの収集

1. Hive のパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `hive.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル hive.d/conf.yaml][1] を参照してください。

    このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、[ステータスページ][2]に表示されます。以下で説明するコンフィギュレーションを編集することで、関心があるメトリクスを指定できます。
    収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][3]で詳細な手順を参照してください。制限数以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][4]までお問い合わせください。

2. [Agent を再起動します][5]。

##### ログ収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

   ```yaml
   logs_enabled: true
   ```

2. Hive のログの収集を開始するには、次の構成ブロックを `hive.d/conf.yaml` ファイルに追加します。

   ```yaml
     logs:
       - type: file
         path: /tmp/<USER>/hive.log
         source: hive
         service: '<SERVICE_NAME>'
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \d{4}\-\d{2}\-\d{2}
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべての構成オプションの詳細については、[サンプル hive.d/conf.yaml][1] を参照してください。

3. [Agent を再起動します][5]。

[1]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/integrations/java/
[4]: https://docs.datadoghq.com/help/
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

Datadog-Hive インテグレーションを使用してメトリクスを収集するには、[JMX を使用したオートディスカバリー][2]ガイドを参照してください。

##### ログ収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][3]を参照してください。

| パラメーター      | 値                                                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "hive", "service": "<サービス名>", "log_processing_rules":{"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{4}\-\d{2}\-\d{2}"}}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[3]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][4]し、Checks セクションで `Hive` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "hive" >}}


### イベント

Hive チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "hive" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。


[1]: https://cwiki.apache.org/confluence/display/Hive/Home
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://cwiki.apache.org/confluence/display/Hive/Configuration+Properties#ConfigurationProperties-Metrics
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/help/
