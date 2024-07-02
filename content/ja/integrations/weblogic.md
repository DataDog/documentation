---
"app_id": "weblogic"
"app_uuid": "80a8d9e2-48dd-4242-be78-0d929ea1a492"
"assets":
  "dashboards":
    "metrics": assets/dashboards/metrics.json
    "overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": weblogic.jvm_runtime.heap_size
      "metadata_path": metadata.csv
      "prefix": weblogic.
    "process_signatures":
    - java weblogic.Server
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10245"
    "source_type_name": WebLogic
  "monitors":
    "active_threads": assets/monitors/active_threads.json
    "stuck_threads": assets/monitors/stuck_threads.json
  "saved_views":
    "weblogic_error_logs": assets/saved_views/error_logs.json
    "weblogic_overview": assets/saved_views/weblogic_overview.json
    "weblogic_patterns": assets/saved_views/weblogic_patterns.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
- oracle
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/weblogic/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "weblogic"
"integration_id": "weblogic"
"integration_title": "WebLogic"
"integration_version": "1.3.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "weblogic"
"public_title": "WebLogic"
"short_description": "Monitor the health and performance of WebLogic Servers."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Oracle"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor the health and performance of WebLogic Servers.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": WebLogic
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Oracle WebLogic は、オンプレミスおよびクラウドの両方で、エンタープライズ Java アプリケーションを開発、実行、導入するためのプラットフォームです。Web サーバー機能、メッセージングなどのビジネスコンポーネント、データベースなどのバックエンドエンタープライズシステムへのアクセスなどのアプリケーションサービスを一元管理します。

Datadog による Oracle WebLogic のモニタリングでは、以下のことが可能です。
- Java 仮想マシン (JVM) のヒープサイズの増大を意識する
- サーバーの応答時間を追跡する
- Web アプリケーションのセッションの詳細を監視する
- スレッドプールとメッセージングサービスを追跡する
- データベース接続プールの使用量を追跡する

## セットアップ

### インストール

WebLogic チェックは [Datadog Agent][1] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

1. このチェックは JMX ベースで、JVM によりエキスポートされた プラットフォーム MBean サーバーからメトリクスを収集するため、WebLogic サーバーで JMX リモートモニタリングが有効になっている必要があります。インストール手順については、[リモートモニタリングおよび管理][2]を参照してください。

2. Set the system property `-Djavax.management.builder.initial=weblogic.management.jmx.mbeanserver.WLSMBeanServerBuilder` to enable these metrics on the Platform MBean Server. This should be enabled in both the WebLogic Server Administration Console and in the server startup scripts. **Note**: This can and should be done more than once.


   _**管理コンソールで有効化**_

   ```
   Domain => Configuration => General => Advanced => Platform MBean Server Enabled
   ```

   _**サーバー起動スクリプトで有効化**_

   ```yaml
   -Djavax.management.builder.initial=weblogic.management.jmx.mbeanserver.WLSMBeanServerBuilder
   ```

   詳細については、[WebLogic のドキュメント][3]を参照してください。


3. WebLogic サーバー管理コンソールで [`PlatformMBeanServerUsed`][4] 属性の値が `true` に設定されていることを確認します。WebLogic サーバーのバージョン 10.3.3.0 以上で、デフォルト値は `true` です。この設定は、WebLogic サーバー管理コンソールにあります。または、WebLogic Scripting Tool (WSLT) を使用して構成できます。

   _**管理コンソールで有効化**_

   ```
   Domain (<WEBLOGIC_SERVER>) => Configuration => General => (Advanced) => Platform MBeanServer Enabled
   ```

   _**WLST で有効化**_

   編集セッションを開始します。ドメインの JMX ディレクトリに移動し、`false` に設定されている場合は `cmo.setPlatformMBeanServerUsed(true)` を使用して有効にします。

   例:
   ```
   # > java weblogic.WLST
   (wlst) > connect('weblogic','weblogic')
   (wlst) > edit()
   (wlst) > startEdit()
   (wlst) > cd('JMX/<DOMAIN_NAME>')
   (wlst) > set('EditMBeanServerEnabled','true')
   (wlst) > activate()
   (wlst) > exit()
   ```

   変更をアクティブにして、WebLogic サーバーを再起動します。

### 構成

1. Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `weblogic.d/conf.yaml` ファイルを編集して、
   WebLogic パフォーマンスデータの収集を開始します。 
   使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル weblogic.d/conf.yaml][5] を参照してください。

   このチェックは、1 インスタンスあたり 350 メトリクスの制限があります。返されたメトリクスの数は、Datadog Agent の [status コマンド][6]を実行したときに表示されます。
   [構成][5]を編集することで、関心があるメトリクスを指定できます。

   収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][7]で詳細な手順を参照してください。
   制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][8]までお問い合わせください。

2. [Agent を再起動します][9]

### 検証

[Agent の `status` サブコマンドを実行][6]し、Checks セクションで `weblogic` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "weblogic" >}}


### ログ収集

1. WebLogic ロギングサービスは、Java ロギング API に基づく実装をデフォルトで使用します。別のフォーマットを使用する場合は、[インテグレーションパイプライン][11]のクローンを作成し編集します。

2. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。
   ```yaml
   logs_enabled: true
   ```

3. `weblogic.d/conf.yaml` ファイルのコメントを解除して、ログコンフィギュレーションブロックを編集します。環境に基づいて、パスおよびサービスのパラメーターの値を変更してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[weblogic.d/conf.yaml のサンプル][5]を参照してください。
   ```yaml
    - type: file
      path: <DOMAIN_DIR>/servers/<ADMIN_SERVER_NAME>/logs/<ADMIN_SERVER_NAME>.log
      source: weblogic
      service: admin-server
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: (\####)?<\w{3} (0?[1-9]|[12][0-9]|3[01]), \d{4}
    - type: file
      path: <DOMAIN_DIR>/servers/<ADMIN_SERVER_NAME>/logs/<DOMAIN_NAME>.log
      source: weblogic
      service: domain
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: (\####)?<\w{3} (0?[1-9]|[12][0-9]|3[01]), \d{4}
    - type: file
      path: <DOMAIN_DIR>/servers/<SERVER_NAME>/logs/<SERVER_NAME>.log
      source: weblogic
      service: managed-server
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: (\####)?<\w{3} (0?[1-9]|[12][0-9]|3[01]), \d{4}
    - type: file
      path: <DOMAIN_DIR>/servers/*/logs/access.log 
      source: weblogic
      service: http-access
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: .*\[\d{2}\/(\w{3}|\w{4})\/\d{4}:\d{2}:\d{2}:\d{2} (\+|-)\d{4}\]
   ```
4. [Agent を再起動します][9]

### コンテナ化
コンテナ環境の場合は、[JMX を使用したオートディスカバリー][12]のガイドを参照してください。

### イベント

WebLogic インテグレーションには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "weblogic" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.oracle.com/javase/8/docs/technotes/guides/management/agent.html#gdenl
[3]: https://support.oracle.com/cloud/faces/DocumentDisplay?_afrLoop=308314682308664&_afrWindowMode=0&id=1465052.1&_adf.ctrl-state=10ue97j4er_4
[4]: https://docs.oracle.com/en/middleware/standalone/weblogic-server/14.1.1.0/jmxcu/understandwls.html#GUID-1D2E290E-F762-44A8-99C2-EB857EB12387
[5]: https://github.com/DataDog/integrations-core/blob/master/weblogic/datadog_checks/weblogic/data/conf.yaml.example
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/integrations/java/
[8]: https://docs.datadoghq.com/help/
[9]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://github.com/DataDog/integrations-core/blob/master/weblogic/metadata.csv
[11]: https://docs.datadoghq.com/logs/processing/#integration-pipelines
[12]: https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[13]: https://github.com/DataDog/integrations-core/blob/master/weblogic/assets/service_checks.json

