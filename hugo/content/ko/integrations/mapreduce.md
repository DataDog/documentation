---
app_id: mapreduce
categories:
- log collection
custom_kind: 통합
description: 맵 및 리듀스 작업의 상태와 소요 시간을 모니터링하세요.
further_reading:
- link: https://www.datadoghq.com/blog/hadoop-architecture-overview
  tag: 블로그
  text: Hadoop 아키텍처 개요
- link: https://www.datadoghq.com/blog/monitor-hadoop-metrics
  tag: 블로그
  text: Hadoop 메트릭 모니터링 방법
- link: https://www.datadoghq.com/blog/collecting-hadoop-metrics
  tag: 블로그
  text: Hadoop 메트릭 수집 방법
- link: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog
  tag: 블로그
  text: Datadog으로 Hadoop을 모니터링하는 방법
integration_version: 7.0.0
media: []
supported_os:
- linux
- windows
- macos
title: MapReduce
---
![MapReduce Dashboard](https://raw.githubusercontent.com/DataDog/integrations-core/master/mapreduce/images/mapreduce_dashboard.png)

## 개요

mapreduce 서비스에서 실시간으로 메트릭을 받아 다음을 수행할 수 있습니다.

- mapreduce 상태 시각화 및 모니터링
- mapreduce 장애 조치 및 이벤트에 대한 알림 확인

## 설정

### 설치

MapReduce 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있으므로 서버에 별도로 설치할 필요가 없습니다.

### 설정

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

1. [Agent 구성 디렉터리](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) 루트에서 `conf.d/` 폴더에 있는 `mapreduce.d/conf.yaml` 파일을 편집하여 서버와 포트를 지정하고 모니터링할 마스터를 설정하세요. 사용 가능한 모든 구성 옵션은 [샘플 mapreduce.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/mapreduce/datadog_checks/mapreduce/data/conf.yaml.example)을 참고하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent).

##### 로그 수집

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. `mapreduce.d/conf.yaml` 파일에서 로그 구성 블록의 주석을 해제하고 편집합니다. 환경에 따라 `type`, `path`, `service` 파라미터 값을 변경합니다. 사용 가능한 모든 구성 옵션은 [샘플 mapreduce.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/mapreduce/datadog_checks/mapreduce/data/conf.yaml.example)을 참고하세요.

   ```yaml
   logs:
     - type: file
       path: <LOG_FILE_PATH>
       source: mapreduce
       service: <SERVICE_NAME>
       # To handle multi line that starts with yyyy-mm-dd use the following pattern
       # log_processing_rules:
       #   - type: multi_line
       #     pattern: \d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}
       #     name: new_log_start_with_date
   ```

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent).

{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

| 파라미터            | 값                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `mapreduce`                                                                                   |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                                                 |
| `<INSTANCE_CONFIG>`  | `{"resourcemanager_uri": "https://%%host%%:8088", "cluster_name":"<MAPREDUCE_CLUSTER_NAME>"}` |

##### 로그 수집

Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. 로그 수집을 활성화하려면 [Docker 로그 수집](https://docs.datadoghq.com/agent/docker/log/)을 참고하세요.

다음으로, [로그 통합](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations)을 Docker 레이블로 설정합니다.

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source": "mapreduce", "service": "<SERVICE_NAME>"}]'
```

{{% /tab %}}

{{< /tabs >}}

### 검증

[Agent 상태 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) 을 실행하고 Checks 섹션에서 `mapreduce`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **mapreduce.job.counter.map_counter_value** <br>(rate) | 맵 작업의 카운터 값<br>_task로 표시됨_ |
| **mapreduce.job.counter.reduce_counter_value** <br>(rate) | 리듀스 작업의 카운터 값<br>_task로 표시됨_ |
| **mapreduce.job.counter.total_counter_value** <br>(rate) | 모든 작업의 ​​카운터 값<br>_task로 표시됨_ |
| **mapreduce.job.elapsed_time.95percentile** <br>(gauge) | 애플리케이션 시작 이후 경과 시간의 95번째 백분위수<br>_millisecond로 표시됨_ |
| **mapreduce.job.elapsed_time.avg** <br>(gauge) | 애플리케이션 시작 이후 평균 경과 시간<br>_millisecond로 표시됨_ |
| **mapreduce.job.elapsed_time.count** <br>(rate) | 경과 시간을 샘플링한 횟수|
| **mapreduce.job.elapsed_time.max** <br>(gauge) | 애플리케이션 시작 이후 최대 경과 시간<br>_millisecond로 표시됨_ |
| **mapreduce.job.elapsed_time.median** <br>(gauge) | 신청 시작 이후 경과된 시간의 중앙값<br>_millisecond로 표시됨_ |
| **mapreduce.job.failed_map_attempts** <br>(rate) | 맵 시도 실패 횟수<br>_task로 표시됨_ |
| **mapreduce.job.failed_reduce_attempts** <br>(rate) | 리듀스 시도 실패 횟수<br>_task로 표시됨_ |
| **mapreduce.job.killed_map_attempts** <br>(rate) | 맵 시도 중단 횟수<br>_task로 표시됨_ |
| **mapreduce.job.killed_reduce_attempts** <br>(rate) | 리듀스 시도 중단 횟수<br>_task로 표시됨_ |
| **mapreduce.job.map.task.elapsed_time.95percentile** <br>(gauge) | 전체 맵 작업의 경과 시간 중 95번째 백분위수<br>_millisecond로 표시됨_ |
| **mapreduce.job.map.task.elapsed_time.avg** <br>(gauge) | 모든 맵 작업의 평균 경과 시간<br>_millisecond로 표시됨_ |
| **mapreduce.job.map.task.elapsed_time.count** <br>(rate) | 맵 작업 경과 시간을 샘플링한 횟수|
| **mapreduce.job.map.task.elapsed_time.max** <br>(gauge) | 모든 맵 작업의 최대 경과 시간<br>_millisecond로 표시됨_ |
| **mapreduce.job.map.task.elapsed_time.median** <br>(gauge) | 모든 맵 작업의 경과 시간 중앙값<br>_millisecond로 표시됨_ |
| **mapreduce.job.maps_completed** <br>(rate) | 완료된 맵 작업 수<br>_task로 표시됨_ |
| **mapreduce.job.maps_pending** <br>(rate) | 대기 중인 맵 작업 수 <br>_task로 표시됨_ |
| **mapreduce.job.maps_running** <br>(rate) | 실행 중인 맵 작업 수<br>_task로 표시됨_ |
| **mapreduce.job.maps_total** <br>(rate) | 총 맵 작업 수<br>_task로 표시됨_ |
| **mapreduce.job.new_map_attempts** <br>(rate) | 새로운 맵 시도 횟수<br>_task로 표시됨_ |
| **mapreduce.job.new_reduce_attempts** <br>(rate) | 새로운 리듀스 시도 횟수<br>_task로 표시됨_ |
| **mapreduce.job.reduce.task.elapsed_time.95percentile** <br>(gauge) | 모든 리듀스 작업 경과 시간의 95번째 백분위수<br>_millisecond로 표시됨_ |
| **mapreduce.job.reduce.task.elapsed_time.avg** <br>(gauge) | 모든 리듀스 작업의 평균 경과 시간<br>_millisecond로 표시됨_ |
| **mapreduce.job.reduce.task.elapsed_time.count** <br>(rate) | 리듀스 작업 경과 시간을 샘플링한 횟수|
| **mapreduce.job.reduce.task.elapsed_time.max** <br>(gauge) | 모든 리듀스 작업의 최대 경과 시간<br>_millisecond로 표시됨_ |
| **mapreduce.job.reduce.task.elapsed_time.median** <br>(gauge) | 모든 리듀스 작업의 경과 시간 중앙값<br>_millisecond로 표시됨_ |
| **mapreduce.job.reduces_completed** <br>(rate) | 완료된 리듀스 작업 수<br>_task로 표시됨_ |
| **mapreduce.job.reduces_pending** <br>(rate) | 대기 중인 리듀스 작업 수<br>_task로 표시됨_ |
| **mapreduce.job.reduces_running** <br>(rate) | 실행 중인 리듀스 작업 수<br>_task로 표시됨_ |
| **mapreduce.job.reduces_total** <br>(rate) | 리듀스 작업 수<br>_task로 표시됨_ |
| **mapreduce.job.running_map_attempts** <br>(rate) | 실행 중인 맵 시도 횟수<br>_task로 표시됨_ |
| **mapreduce.job.running_reduce_attempts** <br>(rate) | 실행 중인 리듀스 시도 횟수<br>_task로 표시됨_ |
| **mapreduce.job.successful_map_attempts** <br>(rate) | 성공한 맵 시도 횟수<br>_task로 표시됨_ |
| **mapreduce.job.successful_reduce_attempts** <br>(rate) | 성공한 리듀스 시도 횟수<br>_task로 표시됨_ |

### 이벤트

Mapreduce 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

**mapreduce.resource_manager.can_connect**

Agent가 Resource Manager에 연결할 수 없는 경우 `CRITICAL`을 반환하고, 그렇지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

**mapreduce.application_master.can_connect**

Agent가 Application Master에 연결할 수 없는 경우 `CRITICAL`을 반환하고, 그렇지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

- [Hadoop 아키텍처 개요](https://www.datadoghq.com/blog/hadoop-architecture-overview)
- [Hadoop 메트릭 모니터링 방법](https://www.datadoghq.com/blog/monitor-hadoop-metrics)
- [Hadoop 메트릭 수집 방법](https://www.datadoghq.com/blog/collecting-hadoop-metrics)
- [Datadog으로 Hadoop 모니터링하는 방법](https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog)