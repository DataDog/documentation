---
assets:
  dashboards:
    Databricks Spark Overview: assets/dashboards/databricks_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
  - コラボレーション
  - 処理
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/databricks/README.md'
display_name: Databricks
draft: false
git_integration_title: databricks
guid: 3e1c7918-f224-46c6-836f-1169857e2564
integration_id: databricks
integration_title: Databricks
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: databricks.
metric_to_check: ''
name: databricks
public_title: Databricks
short_description: Databricks クラスターで Apache Spark を監視する
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

[Databricks][1] クラスターを Datadog の [Spark インテグレーション][2]で監視します。

## セットアップ

### インストール

Databricks Spark アプリケーションを [Datadog Spark インテグレーション][3]で監視します。適切なクラスターの[コンフィギュレーション](#コンフィギュレーション)方法に従って、クラスターに Datadog Agent をインストールしてください。

### コンフィギュレーション

Databricks で Apache Spark クラスターを監視し、システムと Spark のメトリクスを収集するように Sparkインテグレーションを構成します。

1. Databricks クラスター環境に最適な init スクリプトを以下で決定します。

2. 内容をコピーしてノートブックに実行します。ノートブックは、クラスターに Datadog Agent をインストールする init スクリプトを作成します。
   スクリプトをグローバルコンフィギュレーションとして保存するには、ノートブックを 1 回実行するだけで済みます。Databricks Datadog Init スクリプトの詳細については[こちら][3]をご覧ください。
    - `<init-script-folder>` パスを init スクリプトを保存する場所に設定します。

3. UI、Databricks CLI を使用するか、Clusters API を呼び出して、クラスタースコープの init スクリプトパスで新しい Databricks クラスターを構成します。
    - Datadog API キーを使用して、クラスターの Advanced Options で `DD_API_KEY` 環境変数を設定します。
    - Advanced Options の下に `DD_ENV` 環境変数を追加して、クラスターをより適切に識別するためのグローバル環境タグを追加します。


#### 標準クラスター

{{< tabs >}}
{{% tab "ドライバーのみ" %}}
##### ドライバーに Datadog Agent をインストールします
クラスターのドライバーノードに Datadog Agent をインストールします。これは、[Datadog Init Script][1] Databricks ノートブックの例の更新バージョンです。

`datadog-install-driver-only.sh` スクリプトを作成した後、[クラスターコンフィギュレーションページ][2]に init スクリプトパスを追加します。

```shell script
%python 

dbutils.fs.put("dbfs:/<init-script-folder>/datadog-install-driver-only.sh","""
#!/bin/bash

echo "Running on the driver? $DB_IS_DRIVER"
echo "Driver ip: $DB_DRIVER_IP"

cat <<EOF >> /tmp/start_datadog.sh
#!/bin/bash

if [[ \${DB_IS_DRIVER} = "TRUE" ]]; then
  echo "On the driver. Installing Datadog ..."

  # クラスターのホストタグを構成します
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:driver"

  # 最新の Datadog Agent 7 をインストールします
  DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=DD_TAGS bash -c "\$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"

  # Datadog Agent がインストールされるのを待ちます
  while [ -z \$datadoginstalled ]; do
    if [ -e "/etc/datadog-agent/datadog.yaml" ]; then
      datadoginstalled=TRUE
    fi
    sleep 2
  done

  echo "Datadog Agent is installed"

  # datadog.yaml のログを有効にしてドライバーログを収集します
  echo "logs_enabled: true" >> /etc/datadog-agent/datadog.yaml

  # マスターパラメータが読み込まれるまで待ってから、IP とポートを取得します
  while [ -z \$gotparams ]; do
    if [ -e "/tmp/master-params" ]; then
      DB_DRIVER_PORT=\$(cat /tmp/master-params | cut -d' ' -f2)
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
      source: databricks
      service: databricks
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: \d{2,4}[\-\/]\d{2,4}[\-\/]\d{2,4}.*" > /etc/datadog-agent/conf.d/spark.yaml

  # Agent を再起動
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

[1]: https://docs.databricks.com/_static/notebooks/datadog-init-script.html
[2]: https://docs.databricks.com/clusters/init-scripts.html#configure-a-cluster-scoped-init-script-using-the-ui
{{% /tab %}}
{{% tab "All nodes" %}}
##### ドライバーノードとワーカーノードに Datadog Agent をインストールします

`datadog-install-driver-workers.sh` スクリプトを作成した後、[クラスターコンフィギュレーションページ][1]に init スクリプトパスを追加します。

```shell script
%python 

dbutils.fs.put("dbfs:/<init-script-folder>/datadog-install-driver-workers.sh","""
#!/bin/bash
cat <<EOF >> /tmp/start_datadog.sh

#!/bin/bash

  hostip=$(hostname -I | xargs)

if [[ \${DB_IS_DRIVER} = "TRUE" ]]; then

  echo "Installing Datadog agent in the driver (master node) ..."
  # ドライバーのホストタグを構成します
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:driver"

  # 最新の Datadog Agent 7 をドライバーノードとワーカーノードにインストールします
  DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"

  # Datadog Agent がインストールされるのを待ちます
  while [ -z \$datadoginstalled ]; do
    if [ -e "/etc/datadog-agent/datadog.yaml" ]; then
      datadoginstalled=TRUE
    fi
    sleep 2
  done
  echo "Datadog Agent is installed"

  # datadog.yaml のログを有効にしてドライバーログを収集します
  echo "logs_enabled: true" >> /etc/datadog-agent/datadog.yaml

  while [ -z \$gotparams ]; do
    if [ -e "/tmp/driver-env.sh" ]; then
      DB_DRIVER_PORT=\$(grep -i "CONF_UI_PORT" /tmp/driver-env.sh | cut -d'=' -f2)
      gotparams=TRUE
    fi
    sleep 2
  done

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
      source: databricks
      service: databricks
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: \d{2,4}[\-\/]\d{2,4}[\-\/]\d{2,4}.*" > /etc/datadog-agent/conf.d/spark.yaml
else

  # ワーカーのホストタグを構成します
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:worker"

  # 最新の Datadog Agent 7 をドライバーノードとワーカーノードにインストールします
  DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"

fi

  # Agent を再起動します
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
`datadog-install-job-driver-mode.sh` スクリプトを作成した後、[クラスターコンフィギュレーションページ][4]に init スクリプトパスを追加します。

**注**: ジョブクラスターは Spark UI ポートを使用して `spark_driver_mode` で監視されます。


```shell script
%python 

dbutils.fs.put("dbfs:/<init-script-folder>/datadog-install-job-driver-mode.sh","""
#!/bin/bash

echo "Running on the driver? $DB_IS_DRIVER"
echo "Driver ip: $DB_DRIVER_IP"

cat <<EOF >> /tmp/start_datadog.sh
#!/bin/bash

if [ \$DB_IS_DRIVER ]; then
  echo "On the driver. Installing Datadog ..."

  # ドライバーのホストタグを構成します
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:driver"

  # 最新の Datadog Agent 7 をドライバーノードとワーカーノードにインストールします
  DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"

  # Datadog Agent がインストールされるのを待ちます
  while [ -z \$datadoginstalled ]; do
    if [ -e "/etc/datadog-agent/datadog.yaml" ]; then
      datadoginstalled=TRUE
    fi
    sleep 2
  done
  echo "Datadog Agent is installed"  

  # datadog.yaml のログを有効にしてドライバーログを収集します
  echo "logs_enabled: true" >> /etc/datadog-agent/datadog.yaml

  while [ -z \$gotparams ]; do
    if [ -e "/tmp/driver-env.sh" ]; then
      DB_DRIVER_PORT=\$(grep -i "CONF_UI_PORT" /tmp/driver-env.sh | cut -d'=' -f2)
      gotparams=TRUE
    fi
    sleep 2
  done

  current=\$(hostname -I | xargs)

  # Spark コンフィギュレーションファイルを記述します
  echo "init_config:
instances:
    - spark_url: http://\$DB_DRIVER_IP:\$DB_DRIVER_PORT
      spark_cluster_mode: spark_driver_mode
      cluster_name: \$current
logs:
    - type: file
      path: /databricks/driver/logs/*.log
      source: databricks
      service: databricks
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: \d{2,4}[\-\/]\d{2,4}[\-\/]\d{2,4}.*" > /etc/datadog-agent/conf.d/spark.yaml

  # Agent を再起動
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

[Agent の status サブコマンドを実行][5]し、Checks セクションで `spark` を探します。

## 収集データ

### メトリクス

収集されたメトリクスのリストについては、[Spark インテグレーションドキュメント][6]を参照してください。


### サービスのチェック

収集されたサービスチェックのリストについては、[Spark インテグレーションドキュメント][7]を参照してください。

### イベント

Databricks インテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。


[1]: https://databricks.com/
[2]: https://docs.datadoghq.com/ja/integrations/spark/?tab=host
[3]: https://databricks.com/blog/2017/06/01/apache-spark-cluster-monitoring-with-databricks-and-datadog.html
[4]: https://docs.databricks.com/clusters/init-scripts.html#configure-a-cluster-scoped-init-script-using-the-ui
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/integrations/spark/#metrics
[7]: https://docs.datadoghq.com/ja/integrations/spark/#service-checks
[8]: https://docs.datadoghq.com/ja/help/