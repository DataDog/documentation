---
app_id: databricks
app_uuid: f99b6e79-f50a-479d-b916-955a577e4f41
assets:
  dashboards:
    Databricks Spark Overview: assets/dashboards/databricks_overview.json
  integration:
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Databricks
  logs:
    source: spark
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- cloud
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/databricks/README.md
display_on_public_website: true
draft: false
git_integration_title: databricks
integration_id: databricks
integration_title: Databricks
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: databricks
public_title: Databricks
short_description: Databricks クラスターで Apache Spark を監視する
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Databricks クラスターで Apache Spark を監視する
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Databricks
---



## 概要

[Databricks][1] クラスターを Datadog の [Spark インテグレーション][2]で監視します。

## セットアップ

### インストール

Databricks Spark アプリケーションを [Datadog Spark インテグレーション][3]で監視します。適切なクラスターの[コンフィギュレーション](#configuration)方法に従って、クラスターに [Datadog Agent][4] をインストールしてください。

### コンフィギュレーション

Databricks で Apache Spark クラスターを監視し、システムと Spark のメトリクスを収集するように Sparkインテグレーションを構成します。

1. Databricks クラスター環境に最適な init スクリプトを以下で決定します。

2. 内容をコピーしてノートブックに実行します。ノートブックは、クラスターに Datadog Agent をインストールする init スクリプトを作成します。
   ノートブックは、スクリプトをグローバル構成として保存するために、1 回だけ実行する必要があります。
    - `<init-script-folder>` パスを init スクリプトを保存する場所に設定します。

{{% site-region region="us,us3,us5,eu,gov,ap1" %}}

3. UI、Databricks CLI を使用するか、Clusters API を呼び出して、クラスタースコープの init スクリプトパスで新しい Databricks クラスターを構成します。
    - Datadog API キーを使用して、クラスターの Advanced Options で `DD_API_KEY` 環境変数を設定します。
    - Advanced Options の下に `DD_ENV` 環境変数を追加して、クラスターをより適切に識別するためのグローバル環境タグを追加します。
    - `DD_SITE` に自分のサイトを設定します: {{< region-param key="dd_site" code="true" >}}
{{% /site-region %}}



#### 標準クラスター

{{< tabs >}}
{{% tab "ドライバーのみ" %}}
##### ドライバーに Datadog Agent をインストールします
クラスターのドライバーノードに Datadog Agent をインストールします。

`datadog-install-driver-only.sh` スクリプトを作成した後、[クラスターコンフィギュレーションページ][1]に init スクリプトパスを追加します。

```shell script
%python 

dbutils.fs.put("dbfs:/<init-script-folder>/datadog-install-driver-only.sh","""
#!/bin/bash

date -u +"%Y-%m-%d %H:%M:%S UTC"
echo "Running on the driver? $DB_IS_DRIVER"
echo "Driver ip: $DB_DRIVER_IP"

cat <<EOF > /tmp/start_datadog.sh
#!/bin/bash

if [[ \${DB_IS_DRIVER} = "TRUE" ]]; then

  echo "Installing Datadog Agent on the driver..."

  # クラスターのホストタグを構成します
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:driver"

  # 最新の Datadog Agent 7 をインストールします
  DD_INSTALL_ONLY=true DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

  # Datadog Agent がインストールされるのを待ちます
  while [ -z \$datadoginstalled ]; do
    if [ -e "/etc/datadog-agent/datadog.yaml" ]; then
      datadoginstalled=TRUE
    fi
    sleep 2
  done

  echo "Datadog Agent is installed"

  # datadog.yaml のログを有効にしてドライバーログを収集します
  sed -i '/.*logs_enabled:.*/a logs_enabled: true' /etc/datadog-agent/datadog.yaml

  # バージョン 7.40 以降で Agent が失敗しないように datadog.yaml でホスト名を明示的に構成します
  # 変更点は https://github.com/DataDog/datadog-agent/issues/14152 をご覧ください
  hostname=\$(hostname | xargs)
  echo "hostname: \$hostname" >> /etc/datadog-agent/datadog.yaml

  # マスターパラメータが読み込まれるまで待ってから、IP とポートを取得します
  while [ -z \$gotparams ]; do
    if [ -e "/tmp/driver-env.sh" ]; then
      DB_DRIVER_PORT=\$(cat /tmp/driver-env.sh | cut -d' ' -f2)
      gotparams=TRUE
    fi
    sleep 2
  done

  hostip=\$(hostname -I | xargs)  

  # 有効にした構造化ストリーミングメトリクスとログコンフィギュレーションで Spark インテグレーション用のコンフィギュレーションファイルを記述します
  # 他のオプションを spark.d/conf.yaml.example に含めるように変更します
  echo "init_config:
instances:
    - spark_url: http://\$DB_DRIVER_IP:\$DB_DRIVER_PORT
      spark_cluster_mode: spark_standalone_mode
      cluster_name: \${hostip}
      streaming_metrics: true
logs:
    - type: file
      path: /databricks/driver/logs/*.log
      source: spark
      service: databricks
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: \d{2,4}[\-\/]\d{2,4}[\-\/]\d{2,4}.*" > /etc/datadog-agent/conf.d/spark.d/spark.yaml

  # Agent を再起動
  sleep 15
  sudo service datadog-agent restart

fi
EOF

# CLEANING UP
if [ \$DB_IS_DRIVER ]; then
  chmod a+x /tmp/start_datadog.sh
  /tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown
fi
""", True)
```

[1]: https://docs.databricks.com/clusters/init-scripts.html#configure-a-cluster-scoped-init-script-using-the-ui
{{% /tab %}}
{{% tab "All nodes" %}}
##### ドライバーノードとワーカーノードに Datadog Agent をインストールします

 `datadog-install-driver-workers.sh` スクリプトを作成した後、[クラスターコンフィギュレーションページ][1]に init スクリプトパスを追加します。

```shell script
%python 

dbutils.fs.put("dbfs:/<init-script-folder>/datadog-install-driver-workers.sh","""
#!/bin/bash

date -u +"%Y-%m-%d %H:%M:%S UTC"
echo "Running on the driver? $DB_IS_DRIVER"
echo "Driver ip: $DB_DRIVER_IP"

cat <<EOF > /tmp/start_datadog.sh
#!/bin/bash

if [[ \${DB_IS_DRIVER} = "TRUE" ]]; then

  echo "Installing Datadog Agent on the driver (master node)."

  # ドライバーのホストタグを構成します
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:driver"

  # 最新の Datadog Agent 7 をドライバーノードとワーカーノードにインストールします
  DD_INSTALL_ONLY=true DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

  # Datadog Agent がインストールされるのを待ちます
  while [ -z \$datadoginstalled ]; do
    if [ -e "/etc/datadog-agent/datadog.yaml" ]; then
      datadoginstalled=TRUE
    fi
    sleep 2
  done

  echo "Datadog Agent is installed"

  # datadog.yaml のログを有効にしてドライバーログを収集します
  sed -i '/.*logs_enabled:.*/a logs_enabled: true' /etc/datadog-agent/datadog.yaml

  # バージョン 7.40 以降で Agent が失敗しないように datadog.yaml でホスト名を明示的に構成します
  # 変更点は https://github.com/DataDog/datadog-agent/issues/14152 をご覧ください
hostname=\$(hostname | xargs)
echo "hostname: \$hostname" >> /etc/datadog-agent/datadog.yaml

  while [ -z \$gotparams ]; do
    if [ -e "/tmp/driver-env.sh" ]; then
      DB_DRIVER_PORT=\$(grep -i "CONF_UI_PORT" /tmp/driver-env.sh | cut -d'=' -f2)
      gotparams=TRUE
    fi
    sleep 2
  done

  hostip=$(hostname -I | xargs)

  # 構造化ストリーミングメトリクスを有効にして Spark インテグレーション用のコンフィギュレーションファイルを記述します
  # 他のオプションを spark.d/conf.yaml.example に含めるように変更します
  echo "init_config:
instances:
    - spark_url: http://\${DB_DRIVER_IP}:\${DB_DRIVER_PORT}
      spark_cluster_mode: spark_driver_mode
      cluster_name: \${hostip}
      streaming_metrics: true
logs:
    - type: file
      path: /databricks/driver/logs/*.log
      source: spark
      service: databricks
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: \d{2,4}[\-\/]\d{2,4}[\-\/]\d{2,4}.*" > /etc/datadog-agent/conf.d/spark.d/spark.yaml
else

  # ワーカーのホストタグを構成します 
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:worker"

  # 最新の Datadog Agent 7 をドライバーノードとワーカーノードにインストールします
  DD_INSTALL_ONLY=true DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

  # バージョン 7.40 以降で Agent が失敗しないように datadog.yaml でホスト名を明示的に構成します
  # 変更点は https://github.com/DataDog/datadog-agent/issues/14152 をご覧ください
hostname=\$(hostname | xargs)
echo "hostname: \$hostname" >> /etc/datadog-agent/datadog.yaml
fi

  # Agent を再起動します
  sleep 15
  sudo service datadog-agent restart
EOF

# クリーンアップします
chmod a+x /tmp/start_datadog.sh
/tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown
""", True)
```
[1]: https://docs.databricks.com/clusters/init-scripts.html#configure-a-cluster-scoped-init-script-using-the-ui
{{% /tab %}}
{{< /tabs >}}

#### ジョブクラスター
`datadog-install-job-driver-mode.sh` スクリプトを作成した後、[クラスターコンフィギュレーションページ][5]に init スクリプトパスを追加します。

**注**: ジョブクラスターは Spark UI ポートを使用して `spark_driver_mode` で監視されます。


```shell script
%python 

dbutils.fs.put("dbfs:/<init-script-folder>/datadog-install-job-driver-mode.sh","""
#!/bin/bash

date -u +"%Y-%m-%d %H:%M:%S UTC"
echo "Running on the driver? $DB_IS_DRIVER"
echo "Driver ip: $DB_DRIVER_IP"

cat <<EOF >> /tmp/start_datadog.sh
#!/bin/bash

if [ \$DB_IS_DRIVER ]; then

  echo "Installing Datadog Agent on the driver..."

  # ドライバーのホストタグを構成します
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:driver"

  # 最新の Datadog Agent 7 をドライバーノードとワーカーノードにインストールします
  DD_INSTALL_ONLY=true DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

  # Datadog Agent がインストールされるのを待ちます
  while [ -z \$datadoginstalled ]; do
    if [ -e "/etc/datadog-agent/datadog.yaml" ]; then
      datadoginstalled=TRUE
    fi
    sleep 2
  done

  echo "Datadog Agent is installed"  

  # datadog.yaml のログを有効にしてドライバーログを収集します
  sed -i '/.*logs_enabled:.*/a logs_enabled: true' /etc/datadog-agent/datadog.yaml

  # バージョン 7.40 以降で Agent が失敗しないように datadog.yaml でホスト名を明示的に構成します
  # 変更点は https://github.com/DataDog/datadog-agent/issues/14152 をご覧ください
  hostname=\$(hostname | xargs)
  echo "hostname: \$hostname" >> /etc/datadog-agent/datadog.yaml

  while [ -z \$gotparams ]; do
    if [ -e "/tmp/driver-env.sh" ]; then
      DB_DRIVER_PORT=\$(grep -i "CONF_UI_PORT" /tmp/driver-env.sh | cut -d'=' -f2)
      gotparams=TRUE
    fi
    sleep 2
  done

  hostip=\$(hostname -I | xargs)

  # Spark コンフィギュレーションファイルを記述します
  echo "init_config:
instances:
    - spark_url: http://\$DB_DRIVER_IP:\$DB_DRIVER_PORT
      spark_cluster_mode: spark_driver_mode
      cluster_name: \$hostip
logs:
    - type: file
      path: /databricks/driver/logs/*.log
      source: spark
      service: databricks
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: \d{2,4}[\-\/]\d{2,4}[\-\/]\d{2,4}.*" > /etc/datadog-agent/conf.d/spark.d/spark.yaml

  # Agent を再起動
  sleep 15
  sudo service datadog-agent restart

fi
EOF

# CLEANING UP
if [ \$DB_IS_DRIVER ]; then
  chmod a+x /tmp/start_datadog.sh
  /tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown
fi
""", True)

```


### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションの下にある `spark` を探します。

## 収集したデータ

### メトリクス

収集されるメトリクスの一覧は、[Spark インテグレーションドキュメント][7]を参照してください。

### サービスチェック

収集したサービスチェックの一覧は、[Spark インテグレーションドキュメント][8]を参照してください。

### イベント

Databricks インテグレーションには、イベントは含まれません。

## トラブルシューティング

### ポート 6062 のバインドに失敗した

[`ipywidgets`][9] は Databricks Runtime 11.0 以降で利用可能です。デフォルトでは、`ipywidgets` はポート `6062` を占有します。
これは、[デバッグエンドポイント][10]の Datadog Agent のデフォルトポートでもあります。そのため、この問題に遭遇することがあります。

```
23/02/28 17:07:31 ERROR DriverDaemon$: XXX Fatal uncaught exception. Terminating driver.
java.io.IOException: Failed to bind to 0.0.0.0/0.0.0.0:6062
```

この問題を解決するには、いくつかの選択肢があります。

1. Databricks Runtime 11.2 以上では、Spark の `spark.databricks.driver.ipykernel.commChannelPort` オプションを使用してポートを変更することができます。詳しくは [Databricks ドキュメント][11]を参照してください。
2. Datadog Agent が使用するポートは、[`datadog.yaml`][10] コンフィギュレーションファイルの `process_config.expvar_port` で構成することができます。
3. または、`DD_PROCESS_CONFIG_EXPVAR_PORT` 環境変数を設定して、Datadog Agent が使用するポートを構成することができます。

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://databricks.com/
[2]: https://docs.datadoghq.com/ja/integrations/spark/?tab=host
[3]: https://app.datadoghq.com/integrations/spark
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://docs.databricks.com/clusters/init-scripts.html#configure-a-cluster-scoped-init-script-using-the-ui
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/integrations/spark/#metrics
[8]: https://docs.datadoghq.com/ja/integrations/spark/#service-checks
[9]: https://docs.databricks.com/notebooks/ipywidgets.html
[10]: https://github.com/DataDog/datadog-agent/blob/7.43.x/pkg/config/config_template.yaml#L1262-L1266
[11]: https://docs.databricks.com/notebooks/ipywidgets.html#requirements
[12]: https://docs.datadoghq.com/ja/help/