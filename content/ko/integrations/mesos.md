---
aliases:
- /ko/integrations/mesos_slave
app_id: mesos
categories:
- 설정 및 배포
- 컨테이너
- 로그 수집
- 네트워크
- 오케스트레이션
custom_kind: 통합
description: 클러스터 리소스 사용량, 마스터 및 슬레이브 개수, 작업 상태 등을 추적하세요.
further_reading:
- link: https://www.datadoghq.com/blog/deploy-datadog-dcos
  tag: 블로그
  text: DC/OS를 사용하여 Mesos에 Datadog 설치
integration_version: 6.0.0
media: []
supported_os:
- linux
- macos
title: Mesos Slave
---
![Mesos Slave Dashboard](https://raw.githubusercontent.com/DataDog/integrations-core/master/mesos_slave/images/mesos_dashboard.png)

## 개요

이 Agent 점검은 Mesos 슬레이브에서 다음 항목에 대한 메트릭을 수집합니다.

- 시스템 부하
- failed, finished, staged, running 등 상태별 작업 수
- running, terminated 등 상태별 실행기 수

이외에 다수가 있습니다.

이 점검은 모든 실행기 작업에 서비스 점검을 생성합니다.

## 설정

### 설치

각 Mesos 에이전트 노드에 DC/OS 웹 UI를 사용하여 Datadog Agent를 설치하려면 [DC/OS를 사용하여 Mesos에 Datadog 설치](https://www.datadoghq.com/blog/deploy-datadog-dcos)를 참고하세요.

### 설정

#### DC/OS

1. DC/OS 웹 UI에서 **Universe** 탭을 클릭한 후 **datadog** 패키지를 찾아 Install 버튼을 클릭합니다.
1. **Advanced Installation** 버튼을 클릭합니다.
1. 첫 번째 필드에 Datadog API 키를 입력합니다.
1. Instances 필드에 클러스터의 슬레이브 노드 수를 입력합니다. (DC/OS 웹 UI 왼쪽의  Nodes 탭을 클릭하면 클러스터의 노드 수를 확인할 수 있습니다.)
1. **Review and Install**을 클릭한 후 **Install**을 클릭합니다.

#### Marathon

DC/OS를 사용하지 않는 경우, Marathon 웹 UI를 사용하거나 API URL에 다음 JSON을 전송하여 Datadog Agent를 정의하세요. `<YOUR_DATADOG_API_KEY>`을 API 키로 변경하고, 인스턴스 수를 클러스터의 슬레이브 노드 수로 변경해야 합니다. 또한 사용 중인 Docker 이미지를 최신 태그로 업데이트해야 할 수도 있습니다. 최신 태그는 [Docker Hub에서](https://hub.docker.com/r/datadog/agent/tags) 확인할 수 있습니다.

```json
{
  "id": "/datadog-agent",
  "cmd": null,
  "cpus": 0.05,
  "mem": 256,
  "disk": 0,
  "instances": 1,
  "constraints": [
    ["hostname", "UNIQUE"],
    ["hostname", "GROUP_BY"]
  ],
  "acceptedResourceRoles": ["slave_public", "*"],
  "container": {
    "type": "DOCKER",
    "volumes": [
      {
        "containerPath": "/var/run/docker.sock",
        "hostPath": "/var/run/docker.sock",
        "mode": "RO"
      },
      { "containerPath": "/host/proc", "hostPath": "/proc", "mode": "RO" },
      {
        "containerPath": "/host/sys/fs/cgroup",
        "hostPath": "/sys/fs/cgroup",
        "mode": "RO"
      }
    ],
    "docker": {
      "image": "datadog/agent:latest",
      "network": "BRIDGE",
      "portMappings": [
        {
          "containerPort": 8125,
          "hostPort": 8125,
          "servicePort": 10000,
          "protocol": "udp",
          "labels": {}
        }
      ],
      "privileged": false,
      "parameters": [
        { "key": "name", "value": "datadog-agent" },
        { "key": "env", "value": "DD_API_KEY=<YOUR_DATADOG_API_KEY>" },
        { "key": "env", "value": "MESOS_SLAVE=true" }
      ],
      "forcePullImage": false
    }
  },
  "healthChecks": [
    {
      "protocol": "COMMAND",
      "command": { "value": "/probe.sh" },
      "gracePeriodSeconds": 300,
      "intervalSeconds": 60,
      "timeoutSeconds": 20,
      "maxConsecutiveFailures": 3
    }
  ],
  "portDefinitions": [
    { "port": 10000, "protocol": "tcp", "name": "default", "labels": {} },
    { "port": 10001, "protocol": "tcp", "labels": {} }
  ]
}
```

사용자 정의 `mesos_slave.d/conf.yaml`을 구성하는 것(예: `disable_ssl_validation: true`를 설정해야 하는 경우)이 아니라면, Agent를 설치한 후에 별도 작업을 수행할 필요가 없습니다.

#### 로그 수집

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. 다음 구성 블록을 `mesos_slave.d/conf.yaml` 파일에 추가하여 Mesos 로그를 수집합니다.

   ```yaml
   logs:
     - type: file
       path: /var/log/mesos/*
       source: mesos
   ```

   사용 환경에 따라 `path` 파라미터 값을 변경하거나 Docker의 기본 stdout을 사용하세요.

   ```yaml
   logs:
     - type: docker
       source: mesos
   ```

   사용 가능한 모든 구성 옵션은 [샘플 mesos_slave.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/mesos_slave/datadog_checks/mesos_slave/data/conf.yaml.example)을 참고하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

Kubernetes 환경에서 로그를 활성화하려면 [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/)을 참고하세요.

### 검증

#### DC/OS

DC/OS 웹 UI의 Services 탭에서 Datadog Agent가 표시되는지 확인합니다. Datadog의 Metrics Explorer에서`mesos.slave`를 검색하세요. 

#### Marathon

DC/OS를 사용하지 않는 경우, datadog-agent는 실행 중인 애플리케이션 목록에서 정상 상태로 표시됩니다. Datadog의 Metrics Explorer에서 `mesos.slave`를 검색하세요.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **mesos.slave.cpus_percent** <br>(gauge) | 할당된 CPU 비율<br>_percent로 표시됨_ |
| **mesos.slave.cpus_total** <br>(gauge) | CPU 수|
| **mesos.slave.cpus_used** <br>(gauge) | 할당된 CPU 수|
| **mesos.slave.disk_percent** <br>(gauge) | 할당된 디스크 공간의 비율<br>_percent로 표시됨_ |
| **mesos.slave.disk_total** <br>(gauge) | 디스크 스페이스<br>_mebibyte로 표시됨_ |
| **mesos.slave.disk_used** <br>(gauge) | 할당된 디스크 공간<br>_mebibyte로 표시됨_ |
| **mesos.slave.executors_registering** <br>(gauge) | 등록된 실행기 수|
| **mesos.slave.executors_running** <br>(gauge) | 실행 중인 실행기 수|
| **mesos.slave.executors_terminated** <br>(gauge) | 종료된 실행기 수|
| **mesos.slave.executors_terminating** <br>(gauge) | 종료 중인 실행기 수|
| **mesos.slave.frameworks_active** <br>(gauge) | 활성 프레임워크 수|
| **mesos.slave.gpus_percent** <br>(gauge) | 할당된 GPU 비율<br>_percent로 표시됨_ |
| **mesos.slave.gpus_total** <br>(gauge) | GPU 수|
| **mesos.slave.gpus_used** <br>(gauge) | 할당된 GPU 수|
| **mesos.slave.invalid_framework_messages** <br>(gauge) | 유효하지 않은 프레임워크 메시지 수<br>_message로 표시됨_ |
| **mesos.slave.invalid_status_updates** <br>(gauge) | 유효하지 않은 상태 업데이트 수|
| **mesos.slave.mem_percent** <br>(gauge) | 할당된 메모리 비율<br>_percent로 표시됨_ |
| **mesos.slave.mem_total** <br>(gauge) | 총 메모리<br>_mebibyte로 표시됨_ |
| **mesos.slave.mem_used** <br>(gauge) | 할당된 메모리<br>_mebibyte로 표시됨_ |
| **mesos.slave.recovery_errors** <br>(gauge) | 슬레이브 복구 중 발생한 오류 수<br>_error로 표시됨_ |
| **mesos.slave.tasks_failed** <br>(count) | 실패한 작업 수<br>_task로 표시됨_ |
| **mesos.slave.tasks_finished** <br>(count) | 완료된 작업 수<br>_task로 표시됨_ |
| **mesos.slave.tasks_killed** <br>(count) | 강제 종료된 작업 수<br>_task로 표시됨_ |
| **mesos.slave.tasks_lost** <br>(count) | 분실된 작업 수<br>_task로 표시됨_ |
| **mesos.slave.tasks_running** <br>(gauge) | 실행 중인 작업 수<br>_task로 표시됨_ |
| **mesos.slave.tasks_staging** <br>(gauge) | 스테이징 중인 작업 수<br>_task로 표시됨_ |
| **mesos.slave.tasks_starting** <br>(gauge) | 시작 중인 작업 수<br>_task로 표시됨_ |
| **mesos.slave.valid_framework_messages** <br>(gauge) | 유효한 프레임워크 메시지 수<br>_message로 표시됨_ |
| **mesos.slave.valid_status_updates** <br>(gauge) | 유효한 상태 업데이트 수|
| **mesos.state.task.cpu** <br>(gauge) | 작업 CPU|
| **mesos.state.task.disk** <br>(gauge) | 작업 디스크<br>_mebibyte로 표시됨_ |
| **mesos.state.task.mem** <br>(gauge) | 작업 메모리<br>_mebibyte로 표시됨_ |
| **mesos.stats.registered** <br>(gauge) | 해당 슬레이브가 마스터에 등록되어 있는지 여부|
| **mesos.stats.system.cpus_total** <br>(gauge) | 사용 가능한 CPU 개수|
| **mesos.stats.system.load_15min** <br>(gauge) | 지난 15분간의 평균 부하량|
| **mesos.stats.system.load_1min** <br>(gauge) | 지난 몇 분 동안의 평균 부하량|
| **mesos.stats.system.load_5min** <br>(gauge) | 지난 5분간의 평균 부하량|
| **mesos.stats.system.mem_free_bytes** <br>(gauge) | 사용 가능한 메모리<br>_byte로 표시됨_ |
| **mesos.stats.system.mem_total_bytes** <br>(gauge) | 총 메모리<br>_byte로 표시됨_ |
| **mesos.stats.uptime_secs** <br>(gauge) | 슬레이브 가동 시간|

### 이벤트

Mesos-slave 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

**mesos_slave.can_connect**

Agent가 Mesos 슬레이브 메트릭 엔드포인트에 연결하지 못하면 CRITICAL을 반환하고, 그 외에는 OK를 반환합니다.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

- [DC/OS를 사용하여 Mesos에 Datadog 설치](https://www.datadoghq.com/blog/deploy-datadog-dcos)