---
app_id: databricks
app_uuid: f99b6e79-f50a-479d-b916-955a577e4f41
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10152
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
custom_kind: integration
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

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Databricks のデフォルトのダッシュボード][1]

## 概要

[Databricks][2] クラスターを Datadog の [Spark インテグレーション][3]で監視します。

このインテグレーションは、ログ、インフラストラクチャーメトリクス、Spark パフォーマンスメトリクスを統合し、ノードの健全性とジョブのパフォーマンスをリアルタイムで視覚化します。エラーのデバッグ、パフォーマンスの微調整、非効率なデータ分割やクラスターのメモリ不足などの問題の特定に役立ちます。

機能の詳細については、[Datadog を使用した Databricks の監視][4]を参照してください。

## 計画と使用

### インフラストラクチャーリスト

Databricks Spark アプリケーションを [Datadog Spark インテグレーション][5]で監視します。適切なクラスターの[構成](#configuration)方法に従って、クラスターに [Datadog Agent][6] をインストールしてください。その後、Datadog に [Spark インテグレーション][5]をインストールし、Databricks Overview ダッシュボードを自動インストールします。

### ブラウザトラブルシューティング

Databricks で Apache Spark クラスターを監視し、システムと Spark のメトリクスを収集するように Sparkインテグレーションを構成します。

以下に説明する各スクリプトは、ニーズに合わせて変更することができます。例えば、
- インスタンスに特定のタグを追加することができます。
- Spark インテグレーション構成を変更することができます。


{{% site-region region="us,us3,us5,eu,gov,ap1" %}}
UI、Databricks CLI を使用して、または Clusters API を呼び出して、クラスタースコープの init スクリプトパスで環境変数を定義または変更することもできます。
  - `DD_API_KEY` を設定することで、クラスターを識別しやすくなります。
  - `DD_ENV` を設定することで、クラスターを識別しやすくなります。
  - `DD_SITE` をサイトに設定します: {{< region-param key="dd_site" code="true" >}} デフォルトは `datadoghq.com` です。
{{% /site-region %}}


<div class="alert alert-warning">セキュリティ上の理由から、環境変数 `DD_API_KEY` を UI で直接プレーンテキストで定義することは推奨されません。代わりに <a href="https://docs.databricks.com/en/security/secrets/index.html">Databricks シークレット</a>を使用してください。</div>



#### グローバル init スクリプトの場合

グローバル init スクリプトは、ワークスペースで作成されたすべてのクラスターで実行されます。グローバル init スクリプトは、組織全体のライブラリ構成やセキュリティ画面を強制したい場合に便利です。

<div class="alert alert-info">ワークスペース管理者のみがグローバル init スクリプトを管理できます。</div>

Databricks UI を使用してグローバル init スクリプトを編集します。

1. 以下のスクリプトのいずれかを選択して、Agent をドライバー、またはクラスターのドライバーノードとワーカーノードにインストールします。
2. ニーズに合わせてスクリプトを変更します。例えば、タグを追加したり、インテグレーション用に特定の構成を定義することができます。
3. 管理者設定に移動し、**Global Init Scripts** タブをクリックします。
4. **+ Add** ボタンをクリックします。
5. `Datadog init script` のようにスクリプトに名前を付けて、** Script** フィールドに貼り付けます。
6. **Enabled** トグルをクリックして有効にします。
7. **Add** ボタンをクリックします。

これらの手順の後、新しいクラスターは自動的にスクリプトを使用します。グローバル init スクリプトの詳細については [Databricks 公式ドキュメント][7]を参照してください。

<div class="alert alert-info">複数の init スクリプトを定義し、UI でその順番を指定することができます。</div>

{{< tabs >}}
{{% tab "ドライバーのみ" %}}
##### ドライバーに Datadog Agent をインストールする

クラスターのドライバーノードに Datadog Agent をインストールします。

<div class="alert alert-warning">スクリプト内で `DD_API_KEY` 変数の値を定義する必要があります。</div>

```shell script
#!/bin/bash
cat <<EOF > /tmp/start_datadog.sh
#!/bin/bash

date -u +"%Y-%m-%d %H:%M:%S UTC"
echo "Running on the driver? \$DB_IS_DRIVER"
echo "Driver ip: \$DB_DRIVER_IP"

DB_CLUSTER_NAME=$(echo "$DB_CLUSTER_NAME" | sed -e 's/ /_/g' -e "s/'/_/g")
DD_API_KEY='<YOUR_API_KEY>'

if [[ \${DB_IS_DRIVER} = "TRUE" ]]; then
  echo "Installing Datadog Agent on the driver..."

  # ドライバーのホストタグを構成します
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${DB_DRIVER_IP}","spark_node:driver","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # 最新の Datadog Agent 7 をドライバーノードとワーカーノードにインストールします
  DD_INSTALL_ONLY=true \
    DD_API_KEY=\$DD_API_KEY \
    DD_HOST_TAGS=\$DD_TAGS \
    DD_HOSTNAME="\$(hostname | xargs)" \
    DD_SITE="\${DD_SITE:-datadoghq.com}" \
    bash -c "\$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"

  # ポート 6062 での競合を回避
  echo "process_config.expvar_port: 6063" >> /etc/datadog-agent/datadog.yaml

  echo "Datadog Agent is installed"

  while [ -z \$DB_DRIVER_PORT ]; do
    if [ -e "/tmp/driver-env.sh" ]; then
      DB_DRIVER_PORT="\$(grep -i "CONF_UI_PORT" /tmp/driver-env.sh | cut -d'=' -f2)"
    fi
    echo "Waiting 2 seconds for DB_DRIVER_PORT"
    sleep 2
  done

  echo "DB_DRIVER_PORT=\$DB_DRIVER_PORT"

  # 構造化ストリーミングメトリクスを有効にし Spark インテグレーション用のコンフィギュレーションファイルを記述
  # 他のオプションを spark.d/conf.yaml.example に含めるように変更します
  echo "init_config:
instances:
    - spark_url: http://\${DB_DRIVER_IP}:\${DB_DRIVER_PORT}
      spark_cluster_mode: spark_driver_mode
      cluster_name: \${DB_CLUSTER_NAME}
      streaming_metrics: true
      executor_level_metrics: true
logs:
    - type: file
      path: /databricks/driver/logs/*.log
      source: spark
      service: databricks
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: \d{2,4}[\-\/]\d{2,4}[\-\/]\d{2,4}.*" > /etc/datadog-agent/conf.d/spark.d/spark.yaml

  echo "Spark integration configured"

  # datadog.yaml のログを有効にしてドライバーログを収集します
  sed -i '/.*logs_enabled:.*/a logs_enabled: true' /etc/datadog-agent/datadog.yaml
fi

echo "Restart the agent"
sudo service datadog-agent restart
EOF

chmod a+x /tmp/start_datadog.sh
/tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown
```

{{% /tab %}}
{{% tab "全ノード" %}}
##### Datadog Agent をドライバーノードとワーカーノードにインストールする

クラスターのドライバーノードとワーカーノードに Datadog Agent をインストールします。

<div class="alert alert-warning">スクリプト内で `DD_API_KEY` 変数の値を定義する必要があります。</div>

```shell script
#!/bin/bash
cat <<EOF > /tmp/start_datadog.sh
#!/bin/bash

date -u +"%Y-%m-%d %H:%M:%S UTC"
echo "Running on the driver? \$DB_IS_DRIVER"
echo "Driver ip: \$DB_DRIVER_IP"

DB_CLUSTER_NAME=$(echo "$DB_CLUSTER_NAME" | sed -e 's/ /_/g' -e "s/'/_/g")
DD_API_KEY='<YOUR_API_KEY>'

if [[ \${DB_IS_DRIVER} = "TRUE" ]]; then
  echo "Installing Datadog Agent on the driver (master node)."

  # ドライバー用のホストタグを構成する
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${DB_DRIVER_IP}","spark_node:driver","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # 最新の Datadog Agent 7 をドライバーノードとワーカーノードにインストールする
  DD_INSTALL_ONLY=true \
    DD_API_KEY=\$DD_API_KEY \
    DD_HOST_TAGS=\$DD_TAGS \
    DD_HOSTNAME="\$(hostname | xargs)" \
    DD_SITE="\${DD_SITE:-datadoghq.com}" \
    bash -c "\$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"

  echo "Datadog Agent is installed"

  while [ -z \$DB_DRIVER_PORT ]; do
    if [ -e "/tmp/driver-env.sh" ]; then
      DB_DRIVER_PORT="\$(grep -i "CONF_UI_PORT" /tmp/driver-env.sh | cut -d'=' -f2)"
    fi
    echo "Waiting 2 seconds for DB_DRIVER_PORT"
    sleep 2
  done

  echo "DB_DRIVER_PORT=\$DB_DRIVER_PORT"

  # 構造化ストリーミングメトリクスを有効にし Spark インテグレーション用のコンフィギュレーションファイルを記述
  # spark.d/conf.yaml.example に他のオプションを含めるように変更する
  echo "init_config:
instances:
    - spark_url: http://\${DB_DRIVER_IP}:\${DB_DRIVER_PORT}
      spark_cluster_mode: spark_driver_mode
      cluster_name: \${DB_CLUSTER_NAME}
      streaming_metrics: true
      executor_level_metrics: true
logs:
    - type: file
      path: /databricks/driver/logs/*.log
      source: spark
      service: databricks
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: \d{2,4}[\-\/]\d{2,4}[\-\/]\d{2,4}.*" > /etc/datadog-agent/conf.d/spark.d/spark.yaml

  echo "Spark integration configured"

  # ドライバーのログを収集するために datadog.yaml でログを有効にする
  sed -i '/.*logs_enabled:.*/a logs_enabled: true' /etc/datadog-agent/datadog.yaml
else
  echo "Installing Datadog Agent on the worker."

  # ワーカー用のホストタグを構成する
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:worker","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # 最新の Datadog Agent 7 をドライバーノードとワーカーノードにインストールする
  # バージョン 7.40 以上で Agent が失敗しないように、datadog.yaml でホスト名を明確に構成する
  # 変更については https://github.com/DataDog/datadog-agent/issues/14152 をご覧ください
  DD_INSTALL_ONLY=true DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS DD_HOSTNAME="\$(hostname | xargs)" bash -c "\$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"

  echo "Datadog Agent is installed"
fi

# ポート 6062 での競合を回避
echo "process_config.expvar_port: 6063" >> /etc/datadog-agent/datadog.yaml

echo "Restart the agent"
sudo service datadog-agent restart
EOF

chmod a+x /tmp/start_datadog.sh
/tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown

```

{{% /tab %}}
{{< /tabs >}}

#### クラスタースコープの init スクリプトの場合

クラスタースコープの init スクリプトは、クラスター構成で定義される init スクリプトです。クラスタースコープの init スクリプトは、あなたが作成するクラスターとジョブを実行するために作成されたクラスターの両方に適用されます。

Databricks UI を使用してクラスターを編集し、init スクリプトを実行します。

1. 以下のスクリプトのいずれかを選択して、Agent をドライバー、またはクラスターのドライバーノードとワーカーノードにインストールします。
2. ニーズに合わせてスクリプトを変更します。例えば、タグを追加したり、インテグレーション用に特定の構成を定義することができます。
3. 左側の **Workspace** メニューでスクリプトをワークスペースに保存します。
4. クラスター構成ページで、** Advanced** オプションのトグルをクリックします。
5. **Environment variables** で、`DD_API_KEY` 環境変数と、オプションで `DD_ENV` と `DD_SITE` 環境変数を指定します。
6. **Init Scripts** タブに移動します。
7. **Destination** ドロップダウンで、`Workspace` の宛先タイプを選択します。
8. init スクリプトへのパスを指定します。
9. **Add** ボタンをクリックします。

もし `datadog_init_script.sh` を `Shared` ワークスペースに直接保存した場合は、パス `/Shared/datadog_init_script.sh` でファイルにアクセスできます。

もし `datadog_init_script.sh` をユーザーワークスペースに直接保存した場合は、パス `/Users/$EMAIL_ADDRESS/datadog_init_script.sh` でファイルにアクセスできます。

クラスター init スクリプトの詳細については、[Databricks 公式ドキュメント][7]を参照してください。

{{< tabs >}}
{{% tab "ドライバーのみ" %}}
##### ドライバーに Datadog Agent をインストールします

クラスターのドライバーノードに Datadog Agent をインストールします。

```shell script
#!/bin/bash
cat <<EOF > /tmp/start_datadog.sh
#!/bin/bash

date -u +"%Y-%m-%d %H:%M:%S UTC"
echo "Running on the driver? \$DB_IS_DRIVER"
echo "Driver ip: \$DB_DRIVER_IP"

DB_CLUSTER_NAME=$(echo "$DB_CLUSTER_NAME" | sed -e 's/ /_/g' -e "s/'/_/g")

if [[ \${DB_IS_DRIVER} = "TRUE" ]]; then
  echo "Installing Datadog Agent on the driver..."

  # ドライバーのホストタグを構成します
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${DB_DRIVER_IP}","spark_node:driver","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # 最新の Datadog Agent 7 をドライバーノードとワーカーノードにインストールします
  DD_INSTALL_ONLY=true \
    DD_API_KEY=\$DD_API_KEY \
    DD_HOST_TAGS=\$DD_TAGS \
    DD_HOSTNAME="\$(hostname | xargs)" \
    DD_SITE="\${DD_SITE:-datadoghq.com}" \
    bash -c "\$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"

  # ポート 6062 での競合を回避
  echo "process_config.expvar_port: 6063" >> /etc/datadog-agent/datadog.yaml

  echo "Datadog Agent is installed"

  while [ -z \$DB_DRIVER_PORT ]; do
    if [ -e "/tmp/driver-env.sh" ]; then
      DB_DRIVER_PORT="\$(grep -i "CONF_UI_PORT" /tmp/driver-env.sh | cut -d'=' -f2)"
    fi
    echo "Waiting 2 seconds for DB_DRIVER_PORT"
    sleep 2
  done

  echo "DB_DRIVER_PORT=\$DB_DRIVER_PORT"

  # 構造化ストリーミングメトリクスを有効にし Spark インテグレーション用のコンフィギュレーションファイルを記述
  # 他のオプションを spark.d/conf.yaml.example に含めるように変更します
  echo "init_config:
instances:
    - spark_url: http://\${DB_DRIVER_IP}:\${DB_DRIVER_PORT}
      spark_cluster_mode: spark_driver_mode
      cluster_name: \${DB_CLUSTER_NAME}
      streaming_metrics: true
      executor_level_metrics: true
logs:
    - type: file
      path: /databricks/driver/logs/*.log
      source: spark
      service: databricks
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: \d{2,4}[\-\/]\d{2,4}[\-\/]\d{2,4}.*" > /etc/datadog-agent/conf.d/spark.d/spark.yaml

  echo "Spark integration configured"

  # datadog.yaml のログを有効にしてドライバーログを収集します
  sed -i '/.*logs_enabled:.*/a logs_enabled: true' /etc/datadog-agent/datadog.yaml
fi


echo "Restart the agent"
sudo service datadog-agent restart
EOF

chmod a+x /tmp/start_datadog.sh
/tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown
```

{{% /tab %}}
{{% tab "全ノード" %}}
##### Datadog Agent をドライバーノードとワーカーノードにインストールする

クラスターのドライバーノードとワーカーノードに Datadog Agent をインストールします。

```shell script
#!/bin/bash
cat <<EOF > /tmp/start_datadog.sh
#!/bin/bash

date -u +"%Y-%m-%d %H:%M:%S UTC"
echo "Running on the driver? \$DB_IS_DRIVER"
echo "Driver ip: \$DB_DRIVER_IP"

DB_CLUSTER_NAME=$(echo "$DB_CLUSTER_NAME" | sed -e 's/ /_/g' -e "s/'/_/g")

if [[ \${DB_IS_DRIVER} = "TRUE" ]]; then
  echo "Installing Datadog Agent on the driver (master node)."

  # ドライバー用のホストタグを構成する
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${DB_DRIVER_IP}","spark_node:driver","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # 最新の Datadog Agent 7 をドライバーノードとワーカーノードにインストールする
  DD_INSTALL_ONLY=true \
    DD_API_KEY=\$DD_API_KEY \
    DD_HOST_TAGS=\$DD_TAGS \
    DD_HOSTNAME="\$(hostname | xargs)" \
    DD_SITE="\${DD_SITE:-datadoghq.com}" \
    bash -c "\$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"

  echo "Datadog Agent is installed"

  while [ -z \$DB_DRIVER_PORT ]; do
    if [ -e "/tmp/driver-env.sh" ]; then
      DB_DRIVER_PORT="\$(grep -i "CONF_UI_PORT" /tmp/driver-env.sh | cut -d'=' -f2)"
    fi
    echo "Waiting 2 seconds for DB_DRIVER_PORT"
    sleep 2
  done

  echo "DB_DRIVER_PORT=\$DB_DRIVER_PORT"

  # 構造化ストリーミングメトリクスを有効にし Spark インテグレーション用のコンフィギュレーションファイルを記述
  # spark.d/conf.yaml.example に他のオプションを含めるように変更する
  echo "init_config:
instances:
    - spark_url: http://\${DB_DRIVER_IP}:\${DB_DRIVER_PORT}
      spark_cluster_mode: spark_driver_mode
      cluster_name: \${DB_CLUSTER_NAME}
      streaming_metrics: true
      executor_level_metrics: true
logs:
    - type: file
      path: /databricks/driver/logs/*.log
      source: spark
      service: databricks
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: \d{2,4}[\-\/]\d{2,4}[\-\/]\d{2,4}.*" > /etc/datadog-agent/conf.d/spark.d/spark.yaml

  echo "Spark integration configured"

  # ドライバーのログを収集するために datadog.yaml でログを有効にする
  sed -i '/.*logs_enabled:.*/a logs_enabled: true' /etc/datadog-agent/datadog.yaml
else
  echo "Installing Datadog Agent on the worker."

  # ワーカー用のホストタグを構成する
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:worker","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # 最新の Datadog Agent 7 をドライバーノードとワーカーノードにインストールする
  # バージョン 7.40 以上で Agent が失敗しないように、datadog.yaml でホスト名を明確に構成する
  # 変更については https://github.com/DataDog/datadog-agent/issues/14152 をご覧ください
  DD_INSTALL_ONLY=true DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS DD_HOSTNAME="\$(hostname | xargs)" bash -c "\$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"

  echo "Datadog Agent is installed"
fi

# ポート 6062 での競合を回避
echo "process_config.expvar_port: 6063" >> /etc/datadog-agent/datadog.yaml

echo "Restart the agent"
sudo service datadog-agent restart
EOF

chmod a+x /tmp/start_datadog.sh
/tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown
```

{{% /tab %}}
{{< /tabs >}}

## リアルユーザーモニタリング

### データセキュリティ

収集されたメトリクスのリストについては、[Spark インテグレーションドキュメント][8]を参照してください。

### ヘルプ

収集されたサービスチェックのリストについては、[Spark インテグレーションドキュメント][9]を参照してください。

### ヘルプ

Databricks インテグレーションには、イベントは含まれません。

## ヘルプ

[Databricks Web ターミナル][10]を有効にするか、[Databricks ノートブック][11]を使用することで、問題を自分でトラブルシューティングできます。有用なトラブルシューティング手順については、[Agent のトラブルシューティング][12]のドキュメントを参照してください。

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/databricks/images/databricks_dashboard.png
[2]: https://databricks.com/
[3]: https://docs.datadoghq.com/ja/integrations/spark/?tab=host
[4]: https://www.datadoghq.com/blog/databricks-monitoring-datadog/
[5]: https://app.datadoghq.com/integrations/spark
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://docs.databricks.com/clusters/init-scripts.html#global-init-scripts
[8]: https://docs.datadoghq.com/ja/integrations/spark/#metrics
[9]: https://docs.datadoghq.com/ja/integrations/spark/#service-checks
[10]: https://docs.databricks.com/en/clusters/web-terminal.html
[11]: https://docs.databricks.com/en/notebooks/index.html
[12]: https://docs.datadoghq.com/ja/agent/troubleshooting/
[13]: https://docs.datadoghq.com/ja/help/