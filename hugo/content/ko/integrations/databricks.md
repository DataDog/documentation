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
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- 비용 관리
- 로그 수집
custom_kind: 통합
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
short_description: Databricks 환경의 안정성 및 비용을 모니터링합니다.
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
  description: Databricks 환경의 안정성 및 비용을 모니터링합니다.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/data-jobs-monitoring/
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/data-observability-monitoring/
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/databricks-monitoring-datadog/
  support: README.md#Support
  title: Databricks
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


<div class="alert alert-info">
<a href="https://docs.datadoghq.com/data_jobs/">데이터 작업 모니터링</a>으로 Databricks 작업 및 클러스터를 관측, 트러블슈팅, 비용 최적화할 수 있도록 도와드립니다.<br/><br/>
본 페이지는 Databricks 모델 서빙 메트릭 및 클러스터 활용 데이터 수집에 관한 설명으로 제한됩니다.
</div>

![Databricks 기본 대시보드][1]

## 개요

Datadog은 여러 Databricks 모니터링 기능을 제공합니다.

[데이터 작업 모니터링][2]은 Databricks 작업 및 클러스터 모니터링을 제공합니다. 데이터 파이프라인의 모든 곳에서 문제가 발생한 Databricks 작업 및 워크플로를 감지하고, 실패한 작업과 장기 실행 작업을 더 빠르게 수정하며, 클러스터 리소스를 최적화하여 비용을 절감합니다.

[클라우드 비용 관리][3]는 모든 Databricks DBU 비용을 관련 클라우드 지출과 함께 분석할 수 있는 보기를 제공해 드립니다.

[로그 관리][4]를 통해 Databricks 작업 및 클러스터에서 로그를 집계 및 분석할 수 있습니다. [데이터 작업 모니터링][2]의 일부로써 이러한 로그를 수집할 수 있습니다.

[인프라스트럭처 모니터링][5]은 데이터 작업 모니터링 기능(Databricks 클러스터 및 Apache Spark 성능 메트릭의 리소스 사용률에 대한 가시성)의 제한된 하위 집합을 제공해 드립니다.

메트릭 서빙 모델은 Databricks 모델 서빙 인프라스트럭처 성능에 대한 인사이트를 제공합니다. 해당 메트릭을 통해 오류율 및 레이턴시가 높고 과도/부족 프로비저닝된 엔드포인트를 감지할 수 있습니다.
## 설정

### 설치
[모델 서빙 설정](#model-serving-configuration) 지침에 따라 모델 서빙 인프라스트럭처의 상태에 대한 인사이트를 얻으세요.

[Datadog Spark 통합][6]으로 Databricks Spark 애플리케이션을 모니터링하세요. [설정](#spark-configuration) 안내에 따라 내 클러스터에 맞는 적절한 [Datadog 에이전트][7]를 설치하세요. [Spark 설정](#spark-configuration) 지침을 참조하세요.

### 설정
#### 모델 서빙 설정
1. Databricks Workspace에서 오른쪽 상단의 프로필을 클릭하고 **설정**으로 이동합니다. 왼쪽 바에서 **개발자**를 선택합니다. **토큰 액세스** 옆의 **관리**를 클릭합니다.
2. **새 토큰 생성**을 클릭하고 **코멘트** 필드에 "Datadog 통합"을 입력한 다음, **라이프타임(일)**의 기본값을 삭제하고 **생성**을 클릭합니다. 토큰을 기록해 두세요.

   **중요:**
   * 토큰이 만료되지 않고 통합이 중단되지 않도록 **라이프타임(일)**의 기본값을 삭제해야 합니다.
   * 토큰을 생성하는 계정에 모니터링하려는 Databricks 작업과 클러스터에 대한 [CAN VIEW 액세스][8]가 있는지 확인합니다.

   또는 [공식 Databricks 문서][9]에 따라 [서비스 프린시펄][9]에 대한 액세스 토큰을 생성하세요.

3. Datadog에서 Databricks 통합 타일을 엽니다.
4. **설정** 탭에서 **Databricks Workspace 추가**를 클릭합니다.
5. 워크스페이스 이름, Databricks 워크스페이스 URL, 생성한 Databricks 토큰을 입력합니다.
6. **수집 설정할 리소스 선택** 섹션에서 **메트릭 - 모델 서빙**이 **활성화**로 설정되어 있는지 확인합니다.

#### Spark 설정
Spark 통합을 구성해 Databricks에서 Apache Spark 클러스터를 모니터링하고 시스템 및 Spark 메트릭 수집하기

아래 각 스크립트를 원하는 데로 수정해서 사용할 수 있습니다. 다음 예를 참고하세요.
- 인스턴스에 특정 태그 추가
- Spark 통합 구성 수정


{{% site-region region="us,us3,us5,eu,gov,ap1" %}}
또한 UI, Databricks CLI, 또는 클러스터 API를 호출해 클러스터를 사용해 클러스터 수준 init 스크립트 경로로 환경 변수를 정의하거나 수정할 수 있습니다.
  - 클러스터를 잘 파악하려면 `DD_API_KEY`를 설정하세요.
  - 클러스터를 잘 파악하려면 `DD_ENV`를 설정하세요
  - 내 사이트에 `DD_SITE`를 설정하세요({{< region-param key="dd_site" code="true" >}}). 기본값은 `datadoghq.com`입니다.
{{% /site-region %}}


<div class="alert alert-danger">UI에서 직접 일반 텍스트로 환경 변수 `DD_API_KEY`를 정의하는 것은 보안에 좋지 않습니다. 대신 <a href="https://docs.databricks.com/en/security/secrets/index.html">Databricks 비밀</a>을 사용하세요.



#### 전역 init 스크립트 사용

전역 init 스크립트는 각 작업 영역에 모두 생성됩니다. 조직 수준 라이브러리 구성이나 보안 스크린을 적용할 때 전역 init 스크립트를 사용하면 유용합니다.

<div class="alert alert-info">워크스페이스 관리자만 글로벌 초기화 스크립트를 관리할 수 있습니다.</div>
<div class="alert alert-info">글로벌 초기화 스크립트는 단일 사용자 또는 레거시 비격리 공유 액세스 모드로 설정된 클러스터에서만 실행됩니다. 따라서 Databricks은 모든 초기화 스크립트를 클러스터 범위 설정하고 클러스터 정책을 사용하여 워크스페이스 전체에서 관리할 것을 권장합니다.</div>

전역 init 스크립트를 편집하려면 Databricks UI를 사용하세요.

1. 드라이버나 클러스터 노드의 드라이버와 작업 노드에 에이전트를 설치하려면 다음 스크립트 중 하나를 사용하세요.
2. 내 요구 사항에 맞게 스크립트를 수정하세요. 예를 들어 통합에 맞게 태그를 추가하거나 특정 구성을 정의할 수 있습니다.
3. Admin Settings로 이동해  **Global Init Scripts** 탭을 클릭하세요.
4. **+ Add** 버튼을 클릭하세요.
5. 스크립트 이름을 정의(예: `Datadog init script`)한 후 **Script** 필드에 붙여 넣기 하세요.
6. **Enabled** 토글을 클릭해 활성화합니다.
7. **Add** 버튼을 클릭하세요

이 단계를 실행하면 새 클러스터에서 자동으로 해당 스크립트를 사용합니다. 글로벌 초기화 스크립트에 관한 자세한 내용은 [Databricks 공식 설명서][10]를 참고하세요.

<div class="alert alert-info">UI에서 여러 init 스크립트를 정의하고 순서를 지정할 수 있습니다.</div>

{{< tabs >}}
{{% tab "Driver only" %}}
##### Datadog 에이전트를 드라이버에 설치

클러스터 노드의 드라이버에 Datadog 에이전트를 설치하세요.

<div class="alert alert-danger">스크립트 내 `DD_API_KEY` 변수 값을 정의해야 합니다.</div>

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

  # 드라이버용 호스트 태그 구성
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${DB_DRIVER_IP}","spark_node:driver","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # 드라이버와 작업 노드에 최신 Datadog 에이전트 7 설치
  DD_INSTALL_ONLY=true \
    DD_API_KEY=\$DD_API_KEY \
    DD_HOST_TAGS=\$DD_TAGS \
    DD_HOSTNAME="\$(hostname | xargs)" \
    DD_SITE="\${DD_SITE:-datadoghq.com}" \
    bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

  # 포트 6062의 충돌 예방
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

  # 구조화된 스트리밍 메트릭이 활성환 상태에서 Spark 통합 구성 파일 쓰기
  # spark.d/conf.yaml.example에 다른 옵션을 포함하도록 수정
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

  # 드라이버 로그를 수집하도록 datadog.yaml에서 로그 활성화
  sed -i '/.*logs_enabled:.*/a logs_enabled: true' /etc/datadog-agent/datadog.yaml
fi

echo "Restart the agent"
sudo service datadog-agent restart
EOF

chmod a+x /tmp/start_datadog.sh
/tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown
```

{{% /tab %}}
{{% tab "All nodes" %}}
##### Install the Datadog Agent on driver and worker nodes

Install the Datadog Agent on the driver and worker nodes of the cluster.

<div class="alert alert-danger">You will need to define the value of the `DD_API_KEY` variable inside the script.</div>

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

  # CONFIGURE HOST TAGS FOR DRIVER
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${DB_DRIVER_IP}","spark_node:driver","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # INSTALL THE LATEST DATADOG AGENT 7 ON DRIVER AND WORKER NODES
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

  # WRITING CONFIG FILE FOR SPARK INTEGRATION WITH STRUCTURED STREAMING METRICS ENABLED
  # MODIFY TO INCLUDE OTHER OPTIONS IN spark.d/conf.yaml.example
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

  # ENABLE LOGS IN datadog.yaml TO COLLECT DRIVER LOGS
  sed -i '/.*logs_enabled:.*/a logs_enabled: true' /etc/datadog-agent/datadog.yaml
else
  echo "Installing Datadog Agent on the worker."

  # CONFIGURE HOST TAGS FOR WORKERS
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:worker","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # INSTALL THE LATEST DATADOG AGENT 7 ON DRIVER AND WORKER NODES
  # CONFIGURE HOSTNAME EXPLICITLY IN datadog.yaml TO PREVENT AGENT FROM FAILING ON VERSION 7.40+
  # SEE https://github.com/DataDog/datadog-agent/issues/14152 FOR CHANGE
  DD_INSTALL_ONLY=true DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS DD_HOSTNAME="\$(hostname | xargs)" bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

  echo "Datadog Agent is installed"
fi

# Avoid conflicts on port 6062
echo "process_config.expvar_port: 6063" >> /etc/datadog-agent/datadog.yaml

echo "Restart the agent"
sudo service datadog-agent restart
EOF

chmod a+x /tmp/start_datadog.sh
/tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown

```

{{% /tab %}}
{{< /tabs >}}

#### 클러스터 수준 init 스크립트 사용

클러스터 수준 init 스크립트는 클러스터 설정에 정의된 init 스크립트입니다. 클러스터 수준 init 스크립트는 생성한 클러스터와 작업을 실행하기 위해 생성된 클러스터 모두에 적용됩니다. Databricks는 다음을 통해 init 스크립트 설정 및 저장을 지원합니다.
- Workspace 파일
- Unity Catalog Volumes
- Cloud 오브젝트 스토리지

Databricks UI를 사용해 클러스트를 편집하여 init 스크립트를 실행하는 방법:

1. 드라이버나 클러스터 노드의 드라이버와 작업 노드에 에이전트를 설치하려면 다음 스크립트 중 하나를 사용하세요.
2. 내 요구 사항에 맞게 스크립트를 수정하세요. 예를 들어 통합에 맞게 태그를 추가하거나 특정 구성을 정의할 수 있습니다.
3. 왼쪽의 **Workspace** 메뉴로 스크립트를 워크스페이스에 저장합니다. **Unity Catalog Volume**을 사용하는 경우 왼쪽의 **Catalog** 메뉴로 **Volume**에 스크립트를 저장합니다.
4. 클러스터 구성 페이지에서 **Advanced** 옵션 토글을 클릭하세요.
5. **Environment variables**에서 환경 변수 `DD_API_KEY`를 지정하세요. 원하는 경우 환경 변수 `DD_ENV`와 `DD_SITE`를 지정할 수도 있습니다.
6. **Init Scripts** 탭으로 이동하세요.
7. **Destination** 드롭다운에서 `Workspace` 대상 유형을 선택합니다. **Unity Catalog Volume**을 사용하는 경우 **Destination** 드롭다운에서 `Volume` 대상 유형을 선택합니다.
8. init 스크립트 경로를 지정합니다.
9. **Add** 버튼을 클릭하세요

`Shared` 작업 영역에 바로 `datadog_init_script.sh`를 저장한 경우 `/Shared/datadog_init_script.sh` 경로를 이용해 파일에 액세스할 수 있습니다.

`datadog_init_script.sh`를 사용자 작업 영역에 바로 저장한 경우에는 `/Users/$EMAIL_ADDRESS/datadog_init_script.sh` 경로로 파일에 액세스할 수 있습니다.

`datadog_init_script.sh`을 `Unity Catalog Volume`에 직접 저장한 경우, `/Volumes/$VOLUME_PATH/datadog_init_script.sh` 경로로 파일에 접근할 수 있습니다.

클러스터 초기화 스크립트에 관한 자세한 정보는 [Databricks 공식 설명서][10]를 참고하세요.

{{< tabs >}}
{{% tab "Driver only" %}}
##### 드라이버에 Datadog 에이전트 설치

클러스터 노드의 드라이버에 Datadog 에이전트를 설치하세요.

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

  # 드라이버용 호스트 태그 구성
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${DB_DRIVER_IP}","spark_node:driver","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # 드라이버와 작업 노드에 최신 Datadog 에이전트 7 설치
  DD_INSTALL_ONLY=true \
    DD_API_KEY=\$DD_API_KEY \
    DD_HOST_TAGS=\$DD_TAGS \
    DD_HOSTNAME="\$(hostname | xargs)" \
    DD_SITE="\${DD_SITE:-datadoghq.com}" \
    bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

  # 포트 6062의 충돌 예방
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

  # 구조화된 스트리밍 메트릭이 활성환 상태에서 Spark 통합 구성 파일 쓰기
  # spark.d/conf.yaml.example에 다른 옵션을 포함하도록 수정
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

  # 드라이버 로그를 수집하도록 datadog.yaml에서 로그 활성화
  sed -i '/.*logs_enabled:.*/a logs_enabled: true' /etc/datadog-agent/datadog.yaml
fi


echo "Restart the agent"
sudo service datadog-agent restart
EOF

chmod a+x /tmp/start_datadog.sh
/tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown
```

{{% /tab %}}
{{% tab "All nodes" %}}
##### Install the Datadog Agent on driver and worker nodes

Install the Datadog Agent on the driver and worker nodes of the cluster.

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

  # CONFIGURE HOST TAGS FOR DRIVER
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${DB_DRIVER_IP}","spark_node:driver","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # INSTALL THE LATEST DATADOG AGENT 7 ON DRIVER AND WORKER NODES
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

  # WRITING CONFIG FILE FOR SPARK INTEGRATION WITH STRUCTURED STREAMING METRICS ENABLED
  # MODIFY TO INCLUDE OTHER OPTIONS IN spark.d/conf.yaml.example
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

  # ENABLE LOGS IN datadog.yaml TO COLLECT DRIVER LOGS
  sed -i '/.*logs_enabled:.*/a logs_enabled: true' /etc/datadog-agent/datadog.yaml
else
  echo "Installing Datadog Agent on the worker."

  # CONFIGURE HOST TAGS FOR WORKERS
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:worker","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # INSTALL THE LATEST DATADOG AGENT 7 ON DRIVER AND WORKER NODES
  # CONFIGURE HOSTNAME EXPLICITLY IN datadog.yaml TO PREVENT AGENT FROM FAILING ON VERSION 7.40+
  # SEE https://github.com/DataDog/datadog-agent/issues/14152 FOR CHANGE
  DD_INSTALL_ONLY=true DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS DD_HOSTNAME="\$(hostname | xargs)" bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

  echo "Datadog Agent is installed"
fi

# Avoid conflicts on port 6062
echo "process_config.expvar_port: 6063" >> /etc/datadog-agent/datadog.yaml

echo "Restart the agent"
sudo service datadog-agent restart
EOF

chmod a+x /tmp/start_datadog.sh
/tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown
```

{{% /tab %}}
{{< /tabs >}}

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "databricks" >}}

#### Spark 메트릭
수집한 Spark 메트릭 목록을 보려면 [Spark 통합 설명서][11]를 참고하세요.

### 서비스 점검

수집한 서비스 점검 목록을 보려면 [Spark 통합 설명서][12]를 참고하세요.

### 이벤트

Databricks 통합에는 이벤트가 포함되어 있지 않습니다.

## 트러블슈팅

[Databricks 웹 터미널][13]을 활성화하거나 [Databricks Notebook][14]을 사용해 스스로 문제를 트러블슈팅할 수 있습니다. 유용한 트러블슈팅 단계를 보려면 [에이전트 트러블슈팅][15] 설명서를 참고하세요.

도움이 필요하신가요? [Datadog 지원팀][16]에 문의해 주세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Unity Catalog Volume에 스크립트 업로드][17]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/databricks/images/databricks_dashboard.png
[2]: https://www.datadoghq.com/product/data-jobs-monitoring/
[3]: https://www.datadoghq.com/product/cloud-cost-management/
[4]: https://www.datadoghq.com/product/log-management/
[5]: https://docs.datadoghq.com/ko/integrations/databricks/?tab=driveronly
[6]: https://app.datadoghq.com/integrations/spark
[7]: https://app.datadoghq.com/account/settings/agent/latest
[8]: https://docs.databricks.com/en/security/auth-authz/access-control/index.html#job-acls
[9]: https://docs.databricks.com/en/admin/users-groups/service-principals.html#what-is-a-service-principal
[10]: https://docs.databricks.com/clusters/init-scripts.html#global-init-scripts
[11]: https://docs.datadoghq.com/ko/integrations/spark/#metrics
[12]: https://docs.datadoghq.com/ko/integrations/spark/#service-checks
[13]: https://docs.databricks.com/en/clusters/web-terminal.html
[14]: https://docs.databricks.com/en/notebooks/index.html
[15]: https://docs.datadoghq.com/ko/agent/troubleshooting/
[16]: https://docs.datadoghq.com/ko/help/
[17]: https://docs.databricks.com/en/ingestion/add-data/upload-to-volume.html#upload-files-to-a-unity-catalog-volume