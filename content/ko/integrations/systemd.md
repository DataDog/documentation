---
app_id: systemd
app_uuid: a18dccd2-35c0-40e2-9c0a-7a01a5daf5f3
assets:
  dashboards:
    Systemd Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: systemd.units_by_state
      metadata_path: metadata.csv
      prefix: systemd.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10066
    source_type_name: Systemd
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/systemd/README.md
display_on_public_website: true
draft: false
git_integration_title: systemd
integration_id: systemd
integration_title: Systemd
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: systemd
public_title: Systemd
short_description: Systemd 및 Systemd가 관리하는 유닛에 대한 메트릭 확인
supported_os:
- 리눅스
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::OS & System
  - 제공::통합
  configuration: README.md#Setup
  description: Systemd 및 Systemd가 관리하는 유닛에 대한 메트릭 확인
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Systemd
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 [Systemd][1] 및 Datadog Agent를 통해 관리하는 유닛을 모니터링합니다.

- Systemd의 상태 추적
- Systemd가 관리하는 유닛, 서비스, 소켓 모니터링

## 설정

### 설치

Systemd 점검은 [Datadog Agent][2] 패키지에 포함되어 있어 서버에 추가로 설치할 필요가 업습니다.

### 구성

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

1. Agent 구성 디렉터리 루트에서 `conf.d/` 폴더에 있는 `systemd.d/conf.yaml` 파일을 편집하여
   성능 데이터 수집을 시작하세요.
   사용 가능한 모든 구성 옵션은 [샘플 systemd.d/conf.yaml][1]을 참고하세요.

2. [Agent를 재시작합니다][2].

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/systemd.d/conf.yaml.example
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화

컨테이너화된 환경에서는 Systemd 데이터 검색에 필요한 소켓 `/run/systemd/private`이 포함된 `/run/systemd/` 폴더를 마운트합니다. 예:

```bash
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup/:ro \
              -v /run/systemd/:/host/run/systemd/:ro \
              -e DD_API_KEY=<YOUR_API_KEY> \
              datadog/agent:latest
```

#### Helm

Helm 구성에서는 컨테이너 내 systemd 관련 파일과 디렉터리에 접근할 수 있도록 볼륨과 볼륨 마운트를 정의하여 Datadog Agent가 systemd 유닛(예: `kubelet.service`, `ssh.service`)을 모니터링하도록 설정할 수 있습니다. 예를 들면 다음과 같습니다.

```bash
datadog:
  #(...)
  confd:      
    # SystemD용 사용자 정의 구성 파일
    # 예: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/systemd.d/conf.yaml.example

    systemd.yaml: |-
      init_config:
      instances:
        - unit_names:
            - kubelet.service
            - ssh.service

agents:
  # SystemD 소켓용 Custom Mounts (/run/systemd/private)
  volumeMounts:
    - name: systemd
      mountPath: /host/run/systemd/ # 볼륨이 마운트될 컨테이너 내부의 경로

  volumes:
    - name: systemd
      hostPath:
        path: /run/systemd/ # 컨테이너에 마운트될 호스트 머신의 경로
```


{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent 상태 하위 명령을 실행][3]하고 Checks 섹션에서 `systemd`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "systemd" >}}


일부 메트릭은 해당 구성이 활성화된 경우에만 보고됩니다.

- `systemd.service.cpu_time_consumed`을 사용하려면 Systemd 구성 `CPUAccounting`을 활성화해야 합니다.
- `systemd.service.memory_usage`를 사용하려면 Systemd 구성 `MemoryAccounting`을 활성화해야 합니다.
- `systemd.service.task_count`를 사용하려면 Systemd 구성 `TasksAccounting`을 활성화해야 합니다.

일부 메트릭은 Systemd의 특정 버전에서만 사용할 수 있습니다.

- `systemd.service.cpu_time_consumed`를 사용하려면 Systemd v220이 필요합니다.
- `systemd.service.restart_count`를 사용하려면 Systemd v235가 필요합니다.
- `systemd.socket.connection_refused_count`를 사용하려면 Systemd v239가 필요합니다.

### 이벤트

Systemd 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "systemd" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.



[1]: https://www.freedesktop.org/wiki/Software/systemd/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ko/help/