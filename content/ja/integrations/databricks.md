---
assets:
  dashboards: {}
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

Databricks-Datadog [チュートリアル][3]に従って、Apache Spark クラスターを監視するよう Spark インテグレーションを構成します。

#### 標準クラスター

[Datadog Init スクリプト][4]を使用して Databricks のノートブックを Datadog Agent にインストールし、システムおよび Spark のメトリクスを収集します。

```yaml
init_config:
instances:
    - spark_url: http://\$DB_DRIVER_IP:\$DB_DRIVER_PORT
      spark_cluster_mode: spark_standalone_mode
      cluster_name: \$current" > /etc/datadog-agent/conf.d/spark.yaml
```

#### ジョブクラスター

ジョブクラスターの場合は、以下のスクリプトを使用して Spark インテグレーションを構成します。

**注**: ジョブクラスターは Spark UI ポートを使用して `spark_driver_mode` で監視されます。


```shell script
#!/bin/bash

echo "Running on the driver? $DB_IS_DRIVER"
echo "Driver ip: $DB_DRIVER_IP"

cat <<EOF >> /tmp/start_datadog.sh
#!/bin/bash

if [ \$DB_IS_DRIVER ]; then
  echo "On the driver. Installing Datadog ..."

  # Datadog Agent をインストール
  DD_API_KEY=<API_KEY> bash -c "\$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"

  while [ -z \$gotparams ]; do
    if [ -e "/tmp/driver-env.sh" ]; then
      DB_DRIVER_PORT=\$(grep -i "CONF_UI_PORT" /tmp/driver-env.sh | cut -d'=' -f2)
      gotparams=TRUE
    fi
    sleep 2
  done

  current=\$(hostname -I | xargs)

  # Spark メトリクスのストリーミング用に Spark の config ファイルを作成
  echo "init_config:
instances:
    - spark_url: http://\$DB_DRIVER_IP:\$DB_DRIVER_PORT
      spark_cluster_mode: spark_driver_mode
      cluster_name: \$current" > /etc/datadog-agent/conf.d/spark.yaml

  # Agent を再起動
  sudo service datadog-agent restart

fi
EOF

# CLEANING UP
if [ \$DB_IS_DRIVER ]; then
  chmod a+x /tmp/start_datadog.sh
  /tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown
fi

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
[4]: https://docs.databricks.com/_static/notebooks/datadog-init-script.html
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/integrations/spark/#metrics
[7]: https://docs.datadoghq.com/ja/integrations/spark/#service-checks
[8]: https://docs.datadoghq.com/ja/help/