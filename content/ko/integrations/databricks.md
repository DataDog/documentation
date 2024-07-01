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
short_description: Apache Spark와 Databricks 작업의 성능, 안전성, 비용 모니터링하기.
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
  configuration: README.md#Setup
  description: Apache Spark와 Databricks 작업의 성능, 안전성, 비용 모니터링하기.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Databricks
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Databricks 기본 대시보드][1]

## 개요

Datadog [Spark 통합][3]으로 [Databricks][2] 클러스터 모니터링

이 통합을 사용하면 로그, 인프라스트럭처 메트릭, Spark 성능 메트릭을 통일하여 내 작업 성능과 노드 상태를 실시간으로 관찰할 수 있습니다. 오류를 디버깅하고, 성능을 미세 조정하며, 비효율적인 데이터 분할이나 클러스터 메모리 초과와 같은 문제를 파악하는 데 도움을 줍니다.

더 상세한 기능은 [Datadog로 Databricks 모니터링][4]을 참고하세요.

## 설정

### 설치

[Datadog Spark 통합][5]으로 Databricks Spark 애플리케이션을 모니터링하세요. [구성](#configuration) 안내에 따라 내 클러스터에 맞는 적절한 [Datadog 에이전트][6]를 설치하세요. 그 후에 Datadog에 [Spark 통합][5]을 설치하면 Databricks Overview 대시보드가 자동 설치됩니다.

### 구성

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


<div class="alert alert-warning">UI에서 직접 일반 텍스트로 환경 변수 `DD_API_KEY`를 정의하는 것은 보안에 좋지 않습니다. 대신 <a href="https://docs.databricks.com/en/security/secrets/index.html">Databricks 비밀</a>을 사용하세요.



#### 전역 init 스크립트 사용

전역 init 스크립트는 각 작업 영역에 모두 생성됩니다. 조직 수준 라이브러리 구성이나 보안 스크린을 적용할 때 전역 init 스크립트를 사용하면 유용합니다.

<div class="alert alert-info">작업 영역 관리자만 전역 init 스크립트를 관리할 수 있습니다.</div>

전역 init 스크립트를 편집하려면 Databricks UI를 사용하세요.

1. 드라이버나 클러스터 노드의 드라이버와 작업 노드에 에이전트를 설치하려면 다음 스크립트 중 하나를 사용하세요.
2. 내 요구 사항에 맞게 스크립트를 수정하세요. 예를 들어 통합에 맞게 태그를 추가하거나 특정 구성을 정의할 수 있습니다.
3. Admin Settings로 이동해  **Global Init Scripts** 탭을 클릭하세요.
4. **+ Add** 버튼을 클릭하세요.
5. 스크립트 이름을 정의(예: `Datadog init script`)한 후 **Script** 필드에 붙여 넣기 하세요.
6. **Enabled** 토글을 클릭해 활성화합니다.
7. **Add** 버튼을 클릭하세요

이 단계를 실행하면 새 클러스터에서 자동으로 해당 스크립트를 사용합니다. 전역 init 스크립트에 관한 자세한 내용은 [Databricks 공식 설명서][7]를 참고하세요.

<div class="alert alert-info">UI에서 여러 init 스크립트를 정의하고 순서를 지정할 수 있습니다.</div>

{{< tabs >}}
{{% tab "드라이버 전용" %}}
##### Datadog 에이전트를 드라이버에 설치

클러스터 노드의 드라이버에 Datadog 에이전트를 설치하세요.

<div class="alert alert-warning">스크립트 내 `DD_API_KEY` 변수 값을 정의해야 합니다.</div>

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
    bash -c "\$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"

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
##### 드라이버와 작업 노드에 Datadog 에이전트를 설치합니다.

클러스터 드라이버와 작업 노드에 Datadog 에이전트를 설치합니다.

<div class="alert alert-warning">스크립트 내 `DD_API_KEY` 변수 값을 정의해야 합니다.</div>

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

  # 드라이버용 호스트 태그 구성
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${DB_DRIVER_IP}","spark_node:driver","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # 드라이버와 작업 노드에 최신 Datadog 에이전트 7 설치
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

  # 구조화된 스트리밍 메트릭이 활성화된 상태에서 Spark 통합 구성 파일 쓰기
  # spark.d/conf.yaml.example에 다른 옵션이 포함되도록 수정
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

  # 로그를 수집하도록 datadog.yaml에서 로그 활성화
  sed -i '/.*logs_enabled:.*/a logs_enabled: true' /etc/datadog-agent/datadog.yaml
else
  echo "Installing Datadog Agent on the worker."

  # 작업자용 호스트 태그 구성
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:worker","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # 드라이버와 작업 노드에 최신 Datadog 에이전트 7 설치
  # datadog.yaml에 호스트 이름을 명시적으로 구성해 에이전트가 버전 7.40+에서 실패하지 않도록 예방
  # 변경 사항을 보려면 https://github.com/DataDog/datadog-agent/issues/14152 참고
  DD_INSTALL_ONLY=true DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS DD_HOSTNAME="\$(hostname | xargs)" bash -c "\$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"

  echo "Datadog Agent is installed"
fi

# 포트 6062의 충돌 예방
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

클러스터 수준 init 스크립트는 클러스터 구성에 정의된 init 스크립트입니다. 클러스터 수준 init 스크립트는 내가 생성한 클러스터와 작업을 실행하기 위해 생성된 클러스터 모두에 적용됩니다.

Databricks UI를 사용해 클러스트를 편집하여 init 스크립트를 실행하는 방법:

1. 드라이버나 클러스터 노드의 드라이버와 작업 노드에 에이전트를 설치하려면 다음 스크립트 중 하나를 사용하세요.
2. 내 요구 사항에 맞게 스크립트를 수정하세요. 예를 들어 통합에 맞게 태그를 추가하거나 특정 구성을 정의할 수 있습니다.
3. 좌측 메뉴에 있는 **Workspace**를 이용해 스크립트를 내 작업 영역에 저장하세요.
4. 클러스터 구성 페이지에서 **Advanced** 옵션 토글을 클릭하세요.
5. **Environment variables**에서 환경 변수 `DD_API_KEY`를 지정하세요. 원하는 경우 환경 변수 `DD_ENV`와 `DD_SITE`를 지정할 수도 있습니다.
6. **Init Scripts** 탭으로 이동하세요.
7. **Destination** 드롭다운에서 `Workspace` 대상 유형을 지정하세요
8. init 스크립트 경로를 지정하세요.
9. **Add** 버튼을 클릭하세요

`Shared` 작업 영역에 바로 `datadog_init_script.sh`를 저장한 경우 `/Shared/datadog_init_script.sh` 경로를 이용해 파일에 액세스할 수 있습니다.

`datadog_init_script.sh`를 사용자 작업 영역에 바로 저장한 경우에는 `/Users/$EMAIL_ADDRESS/datadog_init_script.sh` 경로로 파일에 액세스할 수 있습니다.

클러스터 스크립터에 관한 자세한 정보는 [Databricks 공식 설명서][7]를 참고하세요.

{{< tabs >}}
{{% tab "드라이버 전용" %}}
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
    bash -c "\$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"

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
{{% tab "모든 노드" %}}
##### 드라이버와 작업 노드에 Datadog 에이전트를 설치합니다

클러스터 드라이버와 작업 노드에 Datadog 에이전트를 설치합니다.

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

  # 드라이버용 호스트 태그 구성
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${DB_DRIVER_IP}","spark_node:driver","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # 드라이버와 작업 노드에 최신 Datadog 에이전트 7 설치
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

  # 구조화된 스트리밍 메트릭이 활성화된 상태에서 Spark 통합 구성 파일 쓰기
  # spark.d/conf.yaml.example에 다른 옵션이 포함되도록 수정
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

  # 로그를 수집하도록 datadog.yaml에서 로그 활성화
  sed -i '/.*logs_enabled:.*/a logs_enabled: true' /etc/datadog-agent/datadog.yaml
else
  echo "Installing Datadog Agent on the worker."

  # 작업자용 호스트 태그 구성
  DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${SPARK_LOCAL_IP}","spark_node:worker","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

  # 드라이버와 작업 노드에 최신 Datadog 에이전트 7 설치
  # datadog.yaml에 호스트 이름을 명시적으로 구성해 에이전트가 버전 7.40+에서 실패하지 않도록 예방
  # 변경 사항을 보려면 https://github.com/DataDog/datadog-agent/issues/14152 참고
  DD_INSTALL_ONLY=true DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DD_TAGS DD_HOSTNAME="\$(hostname | xargs)" bash -c "\$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"

  echo "Datadog Agent is installed"
fi

# 포트 6062의 충돌 예방
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

수집한 메트릭 목록을 보려면 [Spark 통합 설명서][8]를 참고하세요.

### 서비스 점검

수집한 서비스 점검 목록을 보려면 [Spark 통합 설명서][9]를 참고하세요

### 이벤트

Databricks 통합에는 이벤트가 포함되어 있지 않습니다.

## 트러블슈팅

[Databricks 웹 터미널][10]을 활성화하거나 [Databricks Notebook][11]을 사용해 스스로 문제를 트러블슈팅할 수 있습니다. 유용한 트러블슈팅 단계를 보려면 [에이전트 트러블슈팅][12] 설명서를 참고하세요.

도움이 필요하세요? [Datadog 지원팀][13]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/databricks/images/databricks_dashboard.png
[2]: https://databricks.com/
[3]: https://docs.datadoghq.com/ko/integrations/spark/?tab=host
[4]: https://www.datadoghq.com/blog/databricks-monitoring-datadog/
[5]: https://app.datadoghq.com/integrations/spark
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://docs.databricks.com/clusters/init-scripts.html#global-init-scripts
[8]: https://docs.datadoghq.com/ko/integrations/spark/#metrics
[9]: https://docs.datadoghq.com/ko/integrations/spark/#service-checks
[10]: https://docs.databricks.com/en/clusters/web-terminal.html
[11]: https://docs.databricks.com/en/notebooks/index.html
[12]: https://docs.datadoghq.com/ko/agent/troubleshooting/
[13]: https://docs.datadoghq.com/ko/help/