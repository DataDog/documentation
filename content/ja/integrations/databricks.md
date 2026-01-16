---
app_id: databricks
app_uuid: f99b6e79-f50a-479d-b916-955a577e4f41
assets:
  dashboards:
    Databricks Clusters Dashboard: assets/dashboards/clusters_dashboard.json
    Databricks Model Serving Overview: assets/dashboards/model_serving_overview.json
    Databricks Overview Dashboard: assets/dashboards/overview_dashboard.json
    databricks_cost_overview: assets/dashboards/databricks_cost_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: databricks.model_serving.provisioned_concurrent_requests_total
      metadata_path: metadata.csv
      prefix: databricks.model_serving.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10152
    source_type_name: Databricks
  logs:
    source: spark
  monitors:
    'Databricks Model Serving: High CPU memory usage': assets/monitors/cpu_memory_usage_high.json
    'Databricks Model Serving: High CPU usage': assets/monitors/cpu_usage_high.json
    'Databricks Model Serving: High GPU memory usage': assets/monitors/gpu_memory_usage_high.json
    'Databricks Model Serving: High GPU usage': assets/monitors/gpu_usage_high.json
    'Databricks Model Serving: High count 4xx errors': assets/monitors/4xx_errors.json
    'Databricks Model Serving: High count 5xx errors': assets/monitors/5xx_errors.json
    'Databricks Model Serving: High request latency': assets/monitors/request_latency_high.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- cloud
- コスト管理
- ログの収集
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/databricks/README.md
display_on_public_website: true
draft: false
git_integration_title: databricks
integration_id: databricks
integration_title: Databricks
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: databricks
public_title: Databricks
short_description: Databricks 環境の信頼性とコストを監視します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Cost Management
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Databricks 環境の信頼性とコストを監視します。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/data-jobs-monitoring/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/data-observability-monitoring/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/databricks-monitoring-datadog/
  support: README.md#Support
  title: Databricks
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


<div class="alert alert-info">
<a href="https://docs.datadoghq.com/data_jobs/">Data Jobs Monitoring</a> は、Databricks の ジョブおよびクラスターを監視、トラブルシューティング、コスト最適化するのに役立ちます。<br/><br/>
このページは、Databricks の モデルサービングメトリクスおよびクラスター利用状況データの取り込みに関するドキュメントに限定されています。
</div>

![Databricks のデフォルトのダッシュボード][1]

## 概要

Datadog は、いくつかの Databricks の監視機能を提供しています。

[Data Jobs Monitoring][2] は、Databricks のジョブやクラスターの監視機能を提供します。データパイプラインのあらゆる場所で問題のあるDatabricks ジョブやワークフローを検出し、失敗したジョブや長時間実行されているジョブを迅速に対応・修正することができ、クラスターリソースを効率的に最適化してコスト削減につなげることが可能です。

[Cloud Cost Management][3] は、関連するクラウド支出と共に、すべての Databricks DBU コストを分析するビューを提供します。

[Log Management][4] は、Databricks のジョブやクラスターからのログを集約・分析することを可能にします。これらのログは [Data Jobs Monitoring][2] の一部として収集することができます。

[Infrastructure Monitoring][5] は、Data Jobs Monitoring の機能の一部に特化した限定的なサブセットであり、Databricks クラスターのリソース使用状況や Apache Spark のパフォーマンスメトリクスを可視化する機能を提供します。

モデルサービングメトリクスは、Databricks の モデルサービング基盤がどのように機能しているかについての洞察を提供します。これらのメトリクスを用いることで、高いエラーレートやレイテンシーを示すエンドポイント、過剰/過少プロビジョニングのエンドポイントなどを検出できます。
## セットアップ

### インストール
[モデルサービングの構成](#model-serving-configuration)の手順に従い、モデルサービング基盤の健全性に関する洞察を得てください。

[Datadog Spark インテグレーション][6]を用いて、Databricks の Spark アプリケーションをモニタリングします。[Datadog Agent][7] をクラスターにインストールするには、適切なクラスター用の[構成](#spark-configuration)手順に従ってください。詳細については [Spark Configuration](#spark-configuration) を参照してください。

### 構成
#### モデルサービングの構成
1. Databricks ワークスペースで右上のプロフィールアイコンをクリックし、**Settings**を開きます。左側のサイドバーから **Developer**を選択し、**Access tokens**の横にある **Manage**をクリックします。
2. **Generate new token**をクリックし、**Comment**フィールドに「Datadog Integration」と入力した上で、**Lifetime (days)**のデフォルト値を削除してから **Generate**をクリックしてください。生成されたトークンはメモしておきます。

   **重要:**
   * **Lifetime (days)** のデフォルト値を削除することで、トークンの有効期限切れによるインテグレーションの障害を防止できます。
   * 監視対象の Databricks ジョブやクラスターに対して、トークンを生成するアカウントが [CAN VIEW アクセス][8]を有していることを確認してください。

   また、[公式の Databricks ドキュメント][9]に従って[サービスプリンシパル][9]用のアクセストークンを生成することもできます。

3. Datadog で、Databricks インテグレーションタイルを開きます。
4. **Configure** タブで、**Add Databricks Workspace** をクリックします。
5. ワークスペース名、Databricks ワークスペース URL、生成した Databricks トークンを入力します。
6. **Select resources to set up collection** セクションにて、**Metrics - Model Serving** が **Enabled** になっていることを確認してください。

#### Spark の構成
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


<div class="alert alert-danger">セキュリティ上の理由から、環境変数 `DD_API_KEY` を UI で直接プレーンテキストで定義することは推奨されません。代わりに <a href="https://docs.databricks.com/en/security/secrets/index.html">Databricks シークレット</a>を使用してください。</div>



#### グローバル init スクリプトの場合

グローバル init スクリプトは、ワークスペースで作成されたすべてのクラスターで実行されます。グローバル init スクリプトは、組織全体のライブラリ構成やセキュリティ画面を強制したい場合に便利です。

<div class="alert alert-info">グローバル init スクリプトを管理できるのはワークスペース管理者のみです。</div>
<div class="alert alert-info">グローバル init スクリプトは、シングルユーザーまたはレガシーのアイソレーションなし共有アクセスモードで構成されたクラスターでのみ実行されます。したがって、Databricks はすべての init スクリプトをクラスタースコープで構成し、クラスターポリシーを使用してワークスペース全体で管理することを推奨します。</div>

Databricks UI を使用してグローバル init スクリプトを編集します。

1. 以下のスクリプトのいずれかを選択して、Agent をドライバー、またはクラスターのドライバーノードとワーカーノードにインストールします。
2. ニーズに合わせてスクリプトを変更します。例えば、タグを追加したり、インテグレーション用に特定の構成を定義することができます。
3. 管理者設定に移動し、**Global Init Scripts** タブをクリックします。
4. **+ Add** ボタンをクリックします。
5. `Datadog init script` のようにスクリプトに名前を付けて、** Script** フィールドに貼り付けます。
6. **Enabled** トグルをクリックして有効にします。
7. **Add** ボタンをクリックします。

これらの手順を完了すると、新規クラスターは自動的にこのスクリプトを使用します。グローバル init スクリプトの詳細は [Databricks 公式ドキュメント][10]を参照してください。

<div class="alert alert-info">複数の init スクリプトを定義し、UI でその順番を指定することができます。</div>

{{< tabs >}}
{{% tab "ドライバーのみ" %}}
##### ドライバーに Datadog Agent をインストールする

クラスターのドライバーノードに Datadog Agent をインストールします。

<div class="alert alert-danger">スクリプト内で `DD_API_KEY` 変数の値を定義する必要があります。</div>

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
    bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

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

<div class="alert alert-danger">スクリプト内で `DD_API_KEY` 変数の値を定義する必要があります。</div>

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
    bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

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
  DD_INSTALL_ONLY=true DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS DD_HOSTNAME="\$(hostname | xargs)" bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

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

クラスタースコープの init スクリプトとは、クラスター構成内で定義される init スクリプトのことです。クラスタースコープの init スクリプトは、あなたが作成するクラスターとジョブを実行するために作成されたクラスターの両方に適用されます。Databricks は、以下の方法で init スクリプトの構成と保存をサポートしています。
- Workspace Files
- Unity Catalog Volumes
- Cloud Object Storage

Databricks UI を使用してクラスターを編集し、init スクリプトを実行します。

1. 以下のスクリプトのいずれかを選択して、Agent をドライバー、またはクラスターのドライバーノードとワーカーノードにインストールします。
2. ニーズに合わせてスクリプトを変更します。例えば、タグを追加したり、インテグレーション用に特定の構成を定義することができます。
3. 左側の **Workspace** メニューを使用して、スクリプトをワークスペースに保存します。**Unity Catalog Volume** を使用する場合は、左側の **Catalog** メニューを使用して、スクリプトを **Volume** に保存します。
4. クラスター構成ページで、** Advanced** オプションのトグルをクリックします。
5. **Environment variables** で、`DD_API_KEY` 環境変数と、オプションで `DD_ENV` と `DD_SITE` 環境変数を指定します。
6. **Init Scripts** タブに移動します。
7. **Destination** のドロップダウンで、`Workspace` の宛先タイプを選択します。**Unity Catalog Volume** を使用する場合、**Destination** のドロップダウンで、`Volume` の宛先タイプを選択します。
8. init スクリプトのパスを指定してください。
9. **Add** ボタンをクリックします。

もし `datadog_init_script.sh` を `Shared` ワークスペースに直接保存した場合は、パス `/Shared/datadog_init_script.sh` でファイルにアクセスできます。

もし `datadog_init_script.sh` をユーザーワークスペースに直接保存した場合は、パス `/Users/$EMAIL_ADDRESS/datadog_init_script.sh` でファイルにアクセスできます。

もし `datadog_init_script.sh` を `Unity Catalog Volume` に直接保存した場合は、パス `/Volumes/$VOLUME_PATH/datadog_init_script.sh` でファイルにアクセスできます。

クラスター init スクリプトの詳細については、[Databricks 公式ドキュメント][10]を参照してください。

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
    bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

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
    bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

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
  DD_INSTALL_ONLY=true DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS DD_HOSTNAME="\$(hostname | xargs)" bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

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

## 収集データ

### メトリクス
{{< get-metrics-from-git "databricks" >}}

#### Spark メトリクス
収集される Spark メトリクスの一覧については、[Spark インテグレーションドキュメント][11]を参照してください。

### サービスチェック

収集されるサービスチェックの一覧については、[Spark インテグレーションドキュメント][12]を参照してください。

### イベント

Databricks インテグレーションには、イベントは含まれません。

## トラブルシューティング

[Databricks Web ターミナル][13]を有効にするか、[Databricks Notebook][14] を利用することで、自分で問題をトラブルシューティングできます。詳細な手順については、[Agent トラブルシューティング][15]ドキュメント を参照してください。

ご不明な点は、[Datadog のサポートチーム][16]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Unity カタログボリュームへのスクリプトのアップロード][17]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/databricks/images/databricks_dashboard.png
[2]: https://www.datadoghq.com/product/data-jobs-monitoring/
[3]: https://www.datadoghq.com/product/cloud-cost-management/
[4]: https://www.datadoghq.com/product/log-management/
[5]: https://docs.datadoghq.com/ja/integrations/databricks/?tab=driveronly
[6]: https://app.datadoghq.com/integrations/spark
[7]: https://app.datadoghq.com/account/settings/agent/latest
[8]: https://docs.databricks.com/en/security/auth-authz/access-control/index.html#job-acls
[9]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#what-is-a-service-principal
[10]: https://docs.databricks.com/clusters/init-scripts.html#global-init-scripts
[11]: https://docs.datadoghq.com/ja/integrations/spark/#metrics
[12]: https://docs.datadoghq.com/ja/integrations/spark/#service-checks
[13]: https://docs.databricks.com/en/clusters/web-terminal.html
[14]: https://docs.databricks.com/en/notebooks/index.html
[15]: https://docs.datadoghq.com/ja/agent/troubleshooting/
[16]: https://docs.datadoghq.com/ja/help/
[17]: https://docs.databricks.com/en/ingestion/add-data/upload-to-volume.html#upload-files-to-a-unity-catalog-volume