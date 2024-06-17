---
app_id: airflow
app_uuid: ed426432-3df4-4ab8-ab2f-a5a85900c59b
assets:
  dashboards:
    Airflow Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: airflow.dagbag_size
      metadata_path: metadata.csv
      prefix: airflow.
    process_signatures:
    - airflow
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10083
    source_type_name: Airflow
  logs:
    source: airflow
  monitors:
    Heartbeat Failure: assets/monitors/heartbeat_failures.json
    Ongoing Duration: assets/monitors/ongoing_duration.json
  saved_views:
    airflow_overview: assets/saved_views/airflow_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 자동화
- 로그 수집
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/airflow/README.md
display_on_public_website: true
draft: false
git_integration_title: airflow
integration_id: airflow
integration_title: Airflow
integration_version: 5.0.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: airflow
public_title: Airflow
short_description: DAG, 작업, 풀, 실행기 등과 관련한 메트릭 추적
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: DAG, 작업, 풀, 실행기 등과 관련한 메트릭 추적
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Airflow
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Datadog 에이전트는 Airflow에서 다음을 포함한 다양한 메트릭을 수집합니다.

- DAG(Directed Acyclic Graphs): DAG 프로세스 수, DAG 백 사이즈 등
- 작업: 작업 실패, 성공, 취소 등
- 풀: 오픈 슬롯, 사용된 슬롯 등
- 실행기: 오픈 슬롯, 대기열 작업, 실행 중인 작업 등

메트릭은 [Airflow StatsD][1] 플러그인을 통해 수집되고 Datadog [DogStatsD][2]로 전송됩니다.

Datadog 에이전트는 메트릭에 더해 Airflow의 상태와 관련한 서비스 점검 결과도 전송합니다.

## 설정

### 설치

Airflow 통합이 잘 작동하도록 하려면 다음 단계를 올바로 따라야 합니다. 시작하기 전에 먼저 [Datadog 에이전트를 설치][3]하세요. 설치 버전은 `>=6.17`이나 `>=7.17`이어야 합니다. 이 버전에 StatsD/DogStatsD 매핑 기능이 포함되어 있습니다.

### 설정
Airflow 통합에는 두 가지 형식이 있습니다. Datadog 에이전트 통합의 경우 Airflow용으로 제공된 엔드포인트로 요청을 보내 연결이 가능하고 정상 상태인지 보고합니다. Airflow StatsD의 경우 Datadog 에이전트로 메트릭을 전송하도록 Airflow를 구성하고, 이를 통해 Airflow 주석을 Datadog 주석으로 리매핑할 수 있습니다.

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

##### Datadog 에이전트 Airflow 통합 구성

[Datadog 에이전트][1] 패키지에 포함된 Airflow 점검을 구성해 메트릭 상태와 서비스 점검을 수집합니다. 그러려면 에이전트 구성 디렉터리의 루트 수준에 있는 `conf.d/` 폴더에서 `airflow.d/conf.yaml` 파일 내 `url`을 편집하세요. 그러면 Airflow 서비스 점검이 시작됩니다. 사용할 수 있는 구성 옵션 전체를 보려면 [airflow.d/conf.yam 샘플][2]을 참고하세요.

`url`이 내 Airflow [웹서버 `base_url`][3]과 일치하는지 확인하세요. 이는 Airflow 인스턴스에 연결할 때 사용한 URL입니다.

##### Airflow를 DogStatsD에 연결

Airflow `statsd` 기능을 사용해 Airflow를 DogStatsD(Datadog 에이전트에 포함되어 있음)에 연결하여 메트릭을 수집하세요. 사용된 Airflow 버전에 따른 메트릭 보고서와 추가 구성 옵션에 관해 자세히 알아보려면 아래 Airflow 설명서를 참고하세요.
- [Airflow 메트릭][4]
- [Airflow 메트릭 구성][5]

**참고**: Airflow가 보고하는 StatsD 메트릭 존재 여부는 사용하는 Airflow Executor 종류에 따라 달라집니다. 예를 들어 `KubernetesExecutor`[6]의 경우 `airflow.ti_failures/successes`, `airflow.operator_failures/successes`, `airflow.dag.task.duration`이 보고되지 않습니다.

1. [Airflow StatsD 플러그인][7]을 설치합니다.

   ```shell
   pip install 'apache-airflow[statsd]'
   ```

2. Airflow 구성 파일 `airflow.cfg`에 다음 구성을 추가해 업데이트합니다.

   <div class="alert alert-warning">`statsd_datadog_enabled`를 true로 설정하지 마세요. `statsd_datadog_enabled`를 활성화하면 충돌이 발생할 수 있습니다. 문제를 예방하려면 이 변수를 `False`로 설정해야 합니다.</div>

   ```conf
   [scheduler]
   statsd_on = True
   # Hostname or IP of server running the Datadog Agent
   statsd_host = localhost  
   # DogStatsD port configured in the Datadog Agent
   statsd_port = 8125
   statsd_prefix = airflow
   ```

3. [Datadog 에이전트 주 구성 파일][8]에 다음 구성을 추가해 업데이트합니다.

   ```yaml
   # dogstatsd_mapper_cache_size: 1000  # default to 1000
   dogstatsd_mapper_profiles:
     - name: airflow
       prefix: "airflow."
       mappings:
         - match: "airflow.*_start"
           name: "airflow.job.start"
           tags:
             job_name: "$1"
         - match: "airflow.*_end"
           name: "airflow.job.end"
           tags:
             job_name: "$1"
         - match: "airflow.*_heartbeat_failure"
           name: airflow.job.heartbeat.failure
           tags:
             job_name: "$1"
         - match: "airflow.operator_failures_*"
           name: "airflow.operator_failures"
           tags:
             operator_name: "$1"
         - match: "airflow.operator_successes_*"
           name: "airflow.operator_successes"
           tags:
             operator_name: "$1"
         - match: 'airflow\.dag_processing\.last_runtime\.(.*)'
           match_type: "regex"
           name: "airflow.dag_processing.last_runtime"
           tags:
             dag_file: "$1"
         - match: 'airflow\.dag_processing\.last_run\.seconds_ago\.(.*)'
           match_type: "regex"
           name: "airflow.dag_processing.last_run.seconds_ago"
           tags:
             dag_file: "$1"
         - match: 'airflow\.dag\.loading-duration\.(.*)'
           match_type: "regex"
           name: "airflow.dag.loading_duration"
           tags:
             dag_file: "$1"
         - match: "airflow.dagrun.*.first_task_scheduling_delay"
           name: "airflow.dagrun.first_task_scheduling_delay"
           tags:
             dag_id: "$1"
         - match: "airflow.pool.open_slots.*"
           name: "airflow.pool.open_slots"
           tags:
             pool_name: "$1"
         - match: "airflow.pool.queued_slots.*"
           name: "airflow.pool.queued_slots"
           tags:
             pool_name: "$1"
         - match: "airflow.pool.running_slots.*"
           name: "airflow.pool.running_slots"
           tags:
             pool_name: "$1"
         - match: "airflow.pool.used_slots.*"
           name: "airflow.pool.used_slots"
           tags:
             pool_name: "$1"
         - match: "airflow.pool.starving_tasks.*"
           name: "airflow.pool.starving_tasks"
           tags:
             pool_name: "$1"
         - match: 'airflow\.dagrun\.dependency-check\.(.*)'
           match_type: "regex"
           name: "airflow.dagrun.dependency_check"
           tags:
             dag_id: "$1"
         - match: 'airflow\.dag\.(.*)\.([^.]*)\.duration'
           match_type: "regex"
           name: "airflow.dag.task.duration"
           tags:
             dag_id: "$1"
             task_id: "$2"
         - match: 'airflow\.dag_processing\.last_duration\.(.*)'
           match_type: "regex"
           name: "airflow.dag_processing.last_duration"
           tags:
             dag_file: "$1"
         - match: 'airflow\.dagrun\.duration\.success\.(.*)'
           match_type: "regex"
           name: "airflow.dagrun.duration.success"
           tags:
             dag_id: "$1"
         - match: 'airflow\.dagrun\.duration\.failed\.(.*)'
           match_type: "regex"
           name: "airflow.dagrun.duration.failed"
           tags:
             dag_id: "$1"
         - match: 'airflow\.dagrun\.schedule_delay\.(.*)'
           match_type: "regex"
           name: "airflow.dagrun.schedule_delay"
           tags:
             dag_id: "$1"
         - match: 'airflow.scheduler.tasks.running'
           name: "airflow.scheduler.tasks.running"
         - match: 'airflow.scheduler.tasks.starving'
           name: "airflow.scheduler.tasks.starving"
         - match: 'airflow.sla_email_notification_failure'
           name: 'airflow.sla_email_notification_failure'
         - match: 'airflow\.task_removed_from_dag\.(.*)'
           match_type: "regex"
           name: "airflow.dag.task_removed"
           tags:
             dag_id: "$1"
         - match: 'airflow\.task_restored_to_dag\.(.*)'
           match_type: "regex"
           name: "airflow.dag.task_restored"
           tags:
             dag_id: "$1"
         - match: "airflow.task_instance_created-*"
           name: "airflow.task.instance_created"
           tags:
             task_class: "$1"
         - match: 'airflow\.ti\.start\.(.+)\.(\w+)'
           match_type: regex
           name: airflow.ti.start
           tags: 
             dagid: "$1"
             taskid: "$2"
         - match: 'airflow\.ti\.finish\.(\w+)\.(.+)\.(\w+)'
           name: airflow.ti.finish
           match_type: regex
           tags: 
             dagid: "$1"
             taskid: "$2"
             state: "$3"
   ```

##### Datadog 에이전트와 Airflow 재시작

1. [Agent를 재시작합니다][9].
2. Airflow을 재시작하면 Airflow 메트릭이 에이전트 DogStatsD 엔드포인트로 전송되기 시작합니다.

##### 통합 서비스 점검

`airflow.d/conf.yaml` 파일의 기본 구성을 사용해 Airflow 서비스 점검을 활성화하세요. 사용할 수 있는 전체 사용 옵션을 보려면 샘플[airflow.d/conf.yaml][2]을 참고하세요.

##### 로그 수집

_에이전트 버전 > 6.0 이상 사용 가능_

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml` 파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

2. `airflow.d/conf.yaml` 맨 아래에 있는 다음 구성 블록에 코멘트를 지우고 편집합니다.
  `path`와 `service` 파라미터 값을 변경하고 내 환경에 맞게 구성합니다.

   - DAG 프로세서 매니저와 스케쥴러 로그를 구성합니다.

      ```yaml
      logs:
        - type: file
          path: "<PATH_TO_AIRFLOW>/logs/dag_processor_manager/dag_processor_manager.log"
          source: airflow
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \[\d{4}\-\d{2}\-\d{2}
        - type: file
          path: "<PATH_TO_AIRFLOW>/logs/scheduler/latest/*.log"
          source: airflow
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \[\d{4}\-\d{2}\-\d{2}
      ```

     매일 로그 회전을 통해 스케쥴러를 정기적으로 정리하는 것이 좋습니다.

   - DAG 작업 로그 추가 구성

      ```yaml
      logs:
        - type: file
          path: "<PATH_TO_AIRFLOW>/logs/*/*/*/*.log"
          source: airflow
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \[\d{4}\-\d{2}\-\d{2}
      ```

     중요: 기본적으로 Airflow에서는 로그 파일 템플릿 `log_filename_template = {{ ti.dag_id }}/{{ ti.task_id }}/{{ ts }}/{{ try_number }}.log`를 사용합니다.  정기적으로 제거하지 않으면 로그 파일 수가 빠른 속도로 늘어납니다. 각 실행 작업 로그를 개별적으로 Airflow UI에 표시하기 위해 이와 같은 패턴을 사용합니다.

     Airflow UI로 로그를 보지 않는 경우, Datadog에서는 `airflow.cfg`에 `log_filename_template = dag_tasks.log` 구성을 사용하기를 권장합니다. 그러면 로그가 이 파일을 회전하고 다음 구성을 사용합니다.

      ```yaml
      logs:
        - type: file
          path: "<PATH_TO_AIRFLOW>/logs/dag_tasks.log"
          source: airflow
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \[\d{4}\-\d{2}\-\d{2}
      ```

3. [에이전트를 다시 시작합니다][10].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/integrations-core/blob/master/airflow/datadog_checks/airflow/data/conf.yaml.example
[3]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#base-url
[4]: https://airflow.apache.org/docs/apache-airflow/stable/logging-monitoring/metrics.html
[5]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#metrics
[6]: https://airflow.apache.org/docs/apache-airflow/stable/executor/kubernetes.html
[7]: https://airflow.apache.org/docs/stable/metrics.html
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ko/help/
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

##### Datadog 에이전트 Airflow 통합 구성

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

| 파라미터            | 값                 |
|----------------------|-----------------------|
| `<INTEGRATION_NAME>` | `airflow`             |
| `<INIT_CONFIG>`      | 비워두거나 `{}`         |
| `<INSTANCE_CONFIG>`  | `{"url": "http://%%host%%:8080"}` |

`url`이 내 Airflow [웹서버 `base_url`][2]과 일치하는지 확인하세요. 이는 Airflow 인스턴스에 연결할 때 사용한 URL입니다. `localhost`를 템플릿 변수 `%%host%%`로 변경하세요.

##### Airflow를 DogStatsD에 연결

Airflow `statsd` 기능을 사용해 Airflow를 DogStatsD(Datadog 에이전트에 포함되어 있음)에 연결하여 메트릭을 수집하세요. 사용된 Airflow 버전에 따른 메트릭 보고서와 추가 구성 옵션에 관해 자세히 알아보려면 아래 Airflow 설명서를 참고하세요.
- [Airflow 메트릭][3]
- [Airflow 메트릭 구성][4]

**참고**: Airflow가 보고하는 StatsD 메트릭 존재 여부는 사용하는 Airflow Executor 종류에 따라 달라집니다. 예를 들어 `KubernetesExecutor`[5]의 경우 `airflow.ti_failures/successes`, `airflow.operator_failures/successes`, `airflow.dag.task.duration`이 보고되지 않습니다.

**참고**: Airflow에 사용되는 환경 변수가 버전에 따라 다를 수 있습니다. 예를 들어 Airflow `2.0.0`에서는 환경 변수 `AIRFLOW__METRICS__STATSD_HOST`를 활용하지만 Airflow `1.10.15`에서는 `AIRFLOW__SCHEDULER__STATSD_HOST`를 사용합니다. 

쿠버네티스 배포의 경우 다음 환경 변수를 사용해 Airflow StatsD 구성을 활성화할 수 있습니다.
  ```yaml
  env:
    - name: AIRFLOW__SCHEDULER__STATSD_ON
      value: "True"
    - name: AIRFLOW__SCHEDULER__STATSD_PORT
      value: "8125"
    - name: AIRFLOW__SCHEDULER__STATSD_PREFIX
      value: "airflow"
    - name: AIRFLOW__SCHEDULER__STATSD_HOST
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
  ```
호스트 엔드포인트 `AIRFLOW__SCHEDULER__STATSD_HOST`의 환경 변수는 노드의 호스트 IP 주소와 함께 제공되어 StatsD 데이터를 Airflow Pod와 같은 Pod인 Datadog 에이전트 Pod로 라우팅합니다. 이 설정을 사용하려면  에이전트의 `hostPort`인 `8125` 포트가 개방되어 있어야 하고 로컬이 아닌 StatsD 트래픽을 수락해야 합니다. 더 자세한 정보는 [쿠버네티스에서 DogStatsD 설정][6]을 참고하세요.

그러면 StatsD 트래픽이 수신 준비가 된 상태로 Airflow 컨테이너에서 Datadog 에이전트로 이동합니다. 마지막으로 실행할 단계는 Datadog 에이전트를 적합한 `dogstatsd_mapper_profiles`로 업데이트하는 것입니다. 그러려면 [호스트 설치][7]에 있는 `dogstatsd_mapper_profiles`를 복사해 `datadog.yaml` 파일에 붙여 넣으세요. 또는 환경 변수 `DD_DOGSTATSD_MAPPER_PROFILES`에서 동급의 JSON 구성을 사용해 Datadog 에이전트를 배포하세요. 쿠버네티스의 경우 동급 환경 변수 표기는 다음과 같습니다.
  ```yaml
  env: 
    - name: DD_DOGSTATSD_MAPPER_PROFILES
      value: >
        [{"prefix":"airflow.","name":"airflow","mappings":[{"name":"airflow.job.start","match":"airflow.*_start","tags":{"job_name":"$1"}},{"name":"airflow.job.end","match":"airflow.*_end","tags":{"job_name":"$1"}},{"name":"airflow.job.heartbeat.failure","match":"airflow.*_heartbeat_failure","tags":{"job_name":"$1"}},{"name":"airflow.operator_failures","match":"airflow.operator_failures_*","tags":{"operator_name":"$1"}},{"name":"airflow.operator_successes","match":"airflow.operator_successes_*","tags":{"operator_name":"$1"}},{"match_type":"regex","name":"airflow.dag_processing.last_runtime","match":"airflow\\.dag_processing\\.last_runtime\\.(.*)","tags":{"dag_file":"$1"}},{"match_type":"regex","name":"airflow.dag_processing.last_run.seconds_ago","match":"airflow\\.dag_processing\\.last_run\\.seconds_ago\\.(.*)","tags":{"dag_file":"$1"}},{"match_type":"regex","name":"airflow.dag.loading_duration","match":"airflow\\.dag\\.loading-duration\\.(.*)","tags":{"dag_file":"$1"}},{"name":"airflow.dagrun.first_task_scheduling_delay","match":"airflow.dagrun.*.first_task_scheduling_delay","tags":{"dag_id":"$1"}},{"name":"airflow.pool.open_slots","match":"airflow.pool.open_slots.*","tags":{"pool_name":"$1"}},{"name":"airflow.pool.queued_slots","match":"airflow.pool.queued_slots.*","tags":{"pool_name":"$1"}},{"name":"airflow.pool.running_slots","match":"airflow.pool.running_slots.*","tags":{"pool_name":"$1"}},{"name":"airflow.pool.used_slots","match":"airflow.pool.used_slots.*","tags":{"pool_name":"$1"}},{"name":"airflow.pool.starving_tasks","match":"airflow.pool.starving_tasks.*","tags":{"pool_name":"$1"}},{"match_type":"regex","name":"airflow.dagrun.dependency_check","match":"airflow\\.dagrun\\.dependency-check\\.(.*)","tags":{"dag_id":"$1"}},{"match_type":"regex","name":"airflow.dag.task.duration","match":"airflow\\.dag\\.(.*)\\.([^.]*)\\.duration","tags":{"dag_id":"$1","task_id":"$2"}},{"match_type":"regex","name":"airflow.dag_processing.last_duration","match":"airflow\\.dag_processing\\.last_duration\\.(.*)","tags":{"dag_file":"$1"}},{"match_type":"regex","name":"airflow.dagrun.duration.success","match":"airflow\\.dagrun\\.duration\\.success\\.(.*)","tags":{"dag_id":"$1"}},{"match_type":"regex","name":"airflow.dagrun.duration.failed","match":"airflow\\.dagrun\\.duration\\.failed\\.(.*)","tags":{"dag_id":"$1"}},{"match_type":"regex","name":"airflow.dagrun.schedule_delay","match":"airflow\\.dagrun\\.schedule_delay\\.(.*)","tags":{"dag_id":"$1"}},{"name":"airflow.scheduler.tasks.running","match":"airflow.scheduler.tasks.running"},{"name":"airflow.scheduler.tasks.starving","match":"airflow.scheduler.tasks.starving"},{"name":"airflow.sla_email_notification_failure","match":"airflow.sla_email_notification_failure"},{"match_type":"regex","name":"airflow.dag.task_removed","match":"airflow\\.task_removed_from_dag\\.(.*)","tags":{"dag_id":"$1"}},{"match_type":"regex","name":"airflow.dag.task_restored","match":"airflow\\.task_restored_to_dag\\.(.*)","tags":{"dag_id":"$1"}},{"name":"airflow.task.instance_created","match":"airflow.task_instance_created-*","tags":{"task_class":"$1"}},{"name":"airflow.ti.start","match":"airflow.ti.start.*.*","tags":{"dag_id":"$1","task_id":"$2"}},{"name":"airflow.ti.finish","match":"airflow.ti.finish.*.*.*","tags":{"dag_id":"$1","state":"$3","task_id":"$2"}}]}]
  ```

##### 로그 수집

_에이전트 버전 > 6.0 이상 사용 가능_

Datadog 에이전트에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][8]을 참고하세요.

| 파라미터      | 값                                                 |
|----------------|-------------------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "airflow", "service": "<YOUR_APP_NAME>"}` |

[1]: https://docs.datadoghq.com/ko/getting_started/agent/autodiscovery/?tab=docker#integration-templates
[2]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#base-url
[3]: https://airflow.apache.org/docs/apache-airflow/stable/logging-monitoring/metrics.html
[4]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#metrics
[5]: https://airflow.apache.org/docs/apache-airflow/stable/executor/kubernetes.html
[6]: https://docs.datadoghq.com/ko/developers/dogstatsd/?tab=kubernetes#setup
[7]: /ko/integrations/airflow/?tab=host#connect-airflow-to-dogstatsd
[8]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/?tab=kubernetes#configuration
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령을 실행][4]하고 점검 섹션에서 `airflow`를 찾습니다.

## Annexe

### Airflow DatadogHook

추가로 [Airflow DatadogHook][5]을 사용해 Datadog과 소통할 수 있습니다.

- 메트릭 전송
- 메트릭 쿼리
- 이벤트 게시

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "airflow" >}}


### 이벤트

Airflow 점검에는 이벤트가 포함되지 않습니다.

### 서비스 검사
{{< get-service-checks-from-git "airflow" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][6]에 문의하세요.



[1]: https://airflow.apache.org/docs/stable/metrics.html
[2]: https://docs.datadoghq.com/ko/developers/dogstatsd/
[3]: https://docs.datadoghq.com/ko/agent/
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[5]: https://airflow.apache.org/docs/apache-airflow-providers-datadog/stable/_modules/airflow/providers/datadog/hooks/datadog.html
[6]: https://docs.datadoghq.com/ko/help/