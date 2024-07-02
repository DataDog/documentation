---
aliases:
- /ko/integrations/mesos_master/
- /ko/integrations/mesos_slave/
integration_title: Mesos
is_public: true
custom_kind: integration
short_description: 클러스터 리소스 사용, 주요 및 보조 노드 개수, 작업 상태 추적 and more.
---




이 점검에서는 Mesos 마스터의 주요 메트릭을 수집합니다. Mesos 보조 메트릭의 경우 [Mesos 보조 통합][1]을 참고하세요.

![Mesos 주요 대시보드][2]

## 개요

이 점검에서는 다음 Mesos 주요 메트릭을 수집합니다.

- 클러스터 리소스
- 등록, 활성, 비활성, 연결, 비연결 상태의 보조 개수
- 실패, 완료, 준비, 실행 중인 작업 수
- 활성, 비활성, 연결, 비연결된 프레임워크 수

이 외에도 더 많은 사항을 추적할 수 있습니다.

## 구성

### 설치

DC/OS가 있든 없든 Mesos 설치 방법은 동일합니다. Mesos 각 주요 노드에서 datadog-agent 컨테이너를 실행하세요.

```shell
docker run -d --name datadog-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e DD_API_KEY=<YOUR_DATADOG_API_KEY> \
  -e MESOS_MASTER=true \
  -e MARATHON_URL=http://leader.mesos:8080 \
  datadog/agent:latest
```

위 명령에서 Datadog API 키와 Mesos Master API URL을 대체하세요.

### 설정

datadog-agent를 실행할 때 올바른 Master URL을 전달했다면 에이전트가 이미 기본값 `mesos_master.d/conf.yaml`을 사용해 주요 노드에서 메트릭을 수집하고 있을 겁니다. 모든 구성 옵션을 보려면 [mesos_master.d/conf.yaml 샘플][3]을 참고하세요.

주요 노드의 API에서 자체 서명된 인증서를 사용하고 있을 경우에는 이와 다릅니다. 이 경우에는  `mesos_master.d/conf.yaml`에서 `disable_ssl_validation: true`를 설정하세요.

#### 로그 수집

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml` 파일에서 로그 수집을 사용하도록 설정합니다.

    ```yaml
    logs_enabled: true
    ```

2. Mesos 로그 수집을 시작하려면 이 설정 블록을 `mesos_master.d/conf.yaml` 파일에 추가합니다.

    ```yaml
    logs:
      - type: file
        path: /var/log/mesos/*
        source: mesos
    ```

   내 환경에 맞게 `path` 파라미터 값을 변경하거나 docker stdout 기본값을 사용하세요.

    ```yaml
    logs:
      - type: docker
        source: mesos
    ```

   사용 가능한 설정 옵션을 모두 확인하려면 [mesos_master.d/conf.yaml 샘플][3]을 참고하세요.

3. [에이전트를 다시 시작합니다][4].

쿠버네티스 환경에서 로그를 활성화하려면 [쿠버네티스 로그 수집][5]을 참고하세요.

### 검증

Datadog의 Metric Explorer에서 `mesos.cluster`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "mesos_master" >}}


### 이벤트

Mesos-master 점검에는 이벤트가 포함되지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "mesos_master" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객지원][6]에 연락하세요.

## 참고 자료

- [DC/OS로 Mesos에 Datadog 설치하기][7]




## Mesos 보조 통합

![Mesos 보조 대시보드][8]

## 개요

이 에이전트 점검에서는 다음 Mesos 보조 메트릭을 수집합니다.

- 시스템 로드
- 실패, 완료, 준비, 실행 중인 작업 수
- 실행, 종료 및 기타 실행기 수

이 외에도 더 많은 사항을 추적할 수 있습니다.

또 이 점검에서는 각 실행기 작업마다 서비스 점검을 생성합니다.

## 구성

### 설치

DC/OS 웹 UI로 각 Mesos 에이전트 노드에 Datadog 에이전트를 설치하려면 [DC/OS로 Mesos에 Datadog 설치하기][7]를 참고하세요.

### 설정

#### DC/OS

1. DC/OS 웹 UI에서 **Universe** 탭을 클릭하세요. **datadog** 패키지를 찾은 후 설치 버튼을 클릭하세요.
1. **Advanced Installation** 버튼을 클릭하세요.
1. 첫 번째 필드에 Datadog API 키를 입력하세요.
1. 인스턴스 필드에 클러스터의 보조 노드 수를 입력하세요(DC/OS 웹 UI 좌측에 있는 Nodes 탭을 클릭해 클러스터의 노드 수를 결정할 수 있음).
1. **Review and Install**을 클릭하고 **Install**을 누릅니다.

#### Marathon

DC/OS를 사용하지 않는 경우, Marathon 웹 UI를 사용하거나 다음 JSON에 따라 API URL을 게시해 Datadog 에이전트를 정의하세요. 이때 `<YOUR_DATADOG_API_KEY>`를 내 API 키로 변경하고 보조 노드 수에는 내 클러스터에 있는 보조 노드 수를 입력해야 합니다. docker 이미지도 최근 태그로 업데이트해야 할 수 있습니다. 최근 이미지를 [Docker Hub][9]에서 찾을 수 있습니다.

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

`disable_ssl_validation: true`로 설정하는 등 `mesos_slave.d/conf.yaml`를 커스텀 구성해야 하는 경우를 제외하고, 에이전트를 설치한 후에 해야 하는 추가 작업은 없습니다.

#### 로그 수집

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

    ```yaml
    logs_enabled: true
    ```

2. Mesos 로그 수집을 시작하려면 이 설정 블록을 `mesos_slave.d/conf.yaml` 파일에 추가합니다.

    ```yaml
    logs:
      - type: file
        path: /var/log/mesos/*
        source: mesos
    ```

   내 환경에 맞게 `path` 파라미터 값을 변경하거나 docker stdout 기본값을 사용하세요.

    ```yaml
    logs:
      - type: docker
        source: mesos
    ```

   사용 가능한 설정 옵션을 모두 확인하려면 [mesos_slave.d/conf.yaml 샘플][10]을 참고하세요.

3. [에이전트를 다시 시작합니다][4].

쿠버네티스 환경에서 로그를 활성화하려면 [쿠버네티스 로그 수집][5]을 참고하세요.

### 검증

#### DC/OS

DC/OS 웹 UI의 Service 탭 아래에 Datadog 에이전트가 나타납니다. Datadog의 Metrics Explorer에서 `mesos.slave`를 검색하세요.

#### Marathon

DC/OS를 사용하지 않는 경우, 정상적으로 실행 중인 애플리케이션 목록에 datadog-agent가 있습니다. Datadog의 Metrics Explorer에서 `mesos.slave`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "mesos_slave" >}}


### 이벤트

Mesos-slave 점검에는 이벤트가 포함되지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "mesos_slave" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객지원][6]에 연락하세요.

## 참고 자료

- [DC/OS로 Mesos에 Datadog 설치하기][7]


[1]: https://docs.datadoghq.com/ko/integrations/mesos/#mesos-slave-integration
[2]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mesos_master/images/mesos_dashboard.png
[3]: https://github.com/DataDog/integrations-core/blob/master/mesos_master/datadog_checks/mesos_master/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
[6]: https://docs.datadoghq.com/ko/help/
[7]: https://www.datadoghq.com/blog/deploy-datadog-dcos
[8]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mesos_slave/images/mesos_dashboard.png
[9]: https://hub.docker.com/r/datadog/agent/tags
[10]: https://github.com/DataDog/integrations-core/blob/master/mesos_slave/datadog_checks/mesos_slave/data/conf.yaml.example