---
app_id: flink
app_uuid: 39d70c50-017c-407a-9117-2055d8e03427
assets:
  dashboards:
    Flink Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: flink.taskmanager.Status.JVM.CPU.Load
      metadata_path: metadata.csv
      prefix: flink.
    process_signatures:
    - java org.apache.flink.client.python.PythonShellParser
    - java org.apache.flink.container.entrypoint.StandaloneApplicationClusterEntryPoint
    - java org.apache.flink.kubernetes.entrypoint.KubernetesSessionClusterEntrypoint
    - java org.apache.flink.kubernetes.entrypoint.KubernetesApplicationClusterEntrypoint
    - java org.apache.flink.kubernetes.taskmanager.KubernetesTaskExecutorRunner
    - java org.apache.flink.kubernetes.cli.KubernetesSessionCli
    - java org.apache.flink.runtime.taskexecutor.TaskManagerRunner
    - java org.apache.flink.runtime.zookeeper.FlinkZooKeeperQuorumPeer
    - java org.apache.flink.runtime.webmonitor.history.HistoryServer
    - java org.apache.flink.runtime.entrypoint.StandaloneSessionClusterEntrypoint
    - java org.apache.flink.table.gateway.SqlGateway
    - java org.apache.flink.table.client.SqlClient
    - java org.apache.flink.yarn.cli.FlinkYarnSessionCli
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10088
    source_type_name: flink
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/flink/README.md
display_on_public_website: true
draft: false
git_integration_title: flink
integration_id: flink
integration_title: Flink
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: flink
public_title: Flink
short_description: Flink 작업에 대한 메트릭을 추적하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Flink 작업에 대한 메트릭을 추적하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Flink
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 [Flink][1]를 모니터링합니다. Datadog은 [Datadog's HTTP API][3]를 사용하는 Flink의 [Datadog HTTP Reporter][2]를 통해 Flink 메트릭을 수집합니다.

## 설정

### 설치

Flink 점검은 [Datadog Agent][4] 패키지에 포함되어 있습니다. 따라서 서버에 추가 설치가 필요하지 않습니다.

### 구성

#### 메트릭 수집

1. Flink에서 [Datadog HTTP Reporter][2]를 구성합니다.

   `<FLINK_HOME>/conf/flink-conf.yaml`에서 다음 줄을 추가하여 `<DATADOG_API_KEY>`를 Datadog [API 키][5]로 변경합니다.

    ```yaml
    metrics.reporter.dghttp.factory.class: org.apache.flink.metrics.datadog.DatadogHttpReporterFactory
    metrics.reporter.dghttp.apikey: <DATADOG_API_KEY>
    metrics.reporter.dghttp.dataCenter: US #(optional) The data center (EU/US) to connect to, defaults to US.
    ```

2. `<FLINK_HOME>/conf/flink-conf.yaml`에서 시스템 범위를 다시 매핑합니다.

    ```yaml
    metrics.scope.jm: flink.jobmanager
    metrics.scope.jm.job: flink.jobmanager.job
    metrics.scope.tm: flink.taskmanager
    metrics.scope.tm.job: flink.taskmanager.job
    metrics.scope.task: flink.task
    metrics.scope.operator: flink.operator
    ```

   **참고**: Flink 메트릭을 지원하려면 시스템 범위를 다시 매핑해야 합니다. 그렇지 않으면 커스텀 메트릭으로 제출됩니다.

3. `<FLINK_HOME>/conf/flink-conf.yaml`에서 추가 [태그][2]를 구성합니다. 다음은 커스텀 태그의 예입니다.

    ```yaml
    metrics.reporter.dghttp.scope.variables.additional: <KEY1>:<VALUE1>, <KEY1>:<VALUE2>
    ```

   **참고**: 기본적으로 메트릭 이름의 모든 변수는 태그로 전송되므로 `job_id`, `task_id` 등에 대한 커스텀 태그를 추가할 필요가 없습니다.

4. Flink 메트릭을 Datadog으로 전송하려면 Flink를 다시 시작합니다.

#### 로그 수집

_Agent >6.0에서 사용 가능_

1. Flink는 기본적으로 `log4j` 로거를 사용합니다. 파일에 대한 로깅을 활성화하려면 Flink 배포 `conf/` 디렉터리의 `log4j*.properties` 구성 파일을 편집하여 형식을 사용자 정의합니다. 설정과 관련된 구성 파일에 대한 정보는 [Flink 로깅 문서][6]를, 기본 구성은 [Flink 리포지토리][7]를 참조하세요.

2. 기본적으로 통합 파이프라인은 다음 레이아웃 패턴을 지원합니다.

    ```text
    %d{yyyy-MM-dd HH:mm:ss,SSS} %-5p %-60c %x - %m%n
    ```

   유효한 타임스탬프의 예는 `2020-02-03 18:43:12,251`입니다.

   형식이 다른 경우 [통합 파이프라인][8]을 복제하고 편집합니다.

3. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

4. `flink.d/conf.yaml` 파일에서 로그 구성 블록의 주석 처리를 제거하고 편집합니다. 환경에 따라 `path` 및 `service` 파라미터 값을 변경합니다. 사용 가능한 모든 구성 옵션은 [샘플 flink.d/conf.yaml][9]을 참조하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/flink/server.log
       source: flink
       service: myapp
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
       #    name: new_log_start_with_date
   ```

5. [에이전트를 다시 시작합니다][10].

### 검증

[Agent의 상태 하위 명령을 실행][11]하고 Checks 섹션에서 `flink`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "flink" >}}


### 서비스 점검

Flink는 서비스 점검을 포함하지 않습니다.

### 이벤트

Flink는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원팀][13]에 문의하세요.


[1]: https://flink.apache.org/
[2]: https://nightlies.apache.org/flink/flink-docs-release-1.16/docs/deployment/metric_reporters/#datadog
[3]: https://docs.datadoghq.com/ko/api/?lang=bash#api-reference
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://nightlies.apache.org/flink/flink-docs-release-1.16/docs/deployment/advanced/logging/
[7]: https://github.com/apache/flink/tree/release-1.16/flink-dist/src/main/flink-bin/conf
[8]: https://docs.datadoghq.com/ko/logs/processing/#integration-pipelines
[9]: https://github.com/DataDog/integrations-core/blob/master/flink/datadog_checks/flink/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/flink/metadata.csv
[13]: https://docs.datadoghq.com/ko/help/