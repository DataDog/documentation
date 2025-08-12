---
app_id: tcp-queue-length
app_uuid: 2c48a360-9fbb-4cd6-9316-0e9afd9926c8
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: tcp_queue.read_buffer_max_usage_pct
      metadata_path: metadata.csv
      prefix: tcp_queue.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10295
    source_type_name: TCP Queue Length
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 개발 툴
- 네트워크
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tcp_queue_length/README.md
display_on_public_website: true
draft: false
git_integration_title: tcp_queue_length
integration_id: tcp-queue-length
integration_title: TCP Queue Length
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: tcp_queue_length
public_title: TCP Queue Length
short_description: Datadog으로 TCP 버퍼 크기를 추적합니다.
supported_os:
- 리눅스
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Network
  - Supported OS::Linux
  - 제공::통합
  configuration: README.md#Setup
  description: Datadog으로 TCP 버퍼 크기를 추적합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: TCP Queue Length
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

해당 검사는 Linux의 TCP 수신 및 전송 대기열 사용량을 모니터링합니다. 개별 컨테이너의 TCP 수신 또는 전송 대기열이 꽉 찼는지 감지할 수 있습니다.

## 설정

### 설치

`tcp_queue_length`는  `system-probe`에 구현된 eBPF 구성 요소에 의존하는 핵심 Agent 6/7 점검입니다. Agent 버전 7.24.1/6.24.1 이상이 필요합니다.

`system-probe`에서 사용하는 eBPF 프로그램은 런타임에 컴파일되며 적절한 커널 헤더에 액세스할 수 있어야 합니다.

데비안(Debian) 유사 배포에서 다음과 같이 커널 헤더를 설치합니다.
```sh
apt install -y linux-headers-$(uname -r)
```

RHEL 유사 배포에서 다음으로 커널 헤더를 설치합니다.
```sh
yum install -y kernel-headers-$(uname -r)
yum install -y kernel-devel-$(uname -r)
```

**참고**: Windows 및 CentOS/RHEL 8 이전 버전은 지원하지 않습니다.

### 구성

`tcp_queue_length` 통합을 활성화하려면 `system-probe` 및 코어 Agent 모두 구성 옵션이 활성화되어 있어야 합니다.

`system-probe.yaml` 구성 파일 내에서 다음 매개변수를 설정합니다.
```yaml
system_probe_config:
  enable_tcp_queue_length: true
```

1. 다음 루트의 `conf.d/` 폴더에 있는 `tcp_queue_length.d/conf.yaml` 파일을 편집합니다.
   Agent의 설정 디렉터리에서 tcp_queue_length 성능 데이터 수집을 시작합니다.
   사용 가능한 모든 구성 옵션은 [tcp_queue_length.d/conf.yaml 샘플][1]을 참조하세요.

2. [Agent를 재시작합니다][2].


### Helm으로 설정하기

[Datadog Helm 차트][3]의 경우, `values.yaml` 파일에서 `datadog.systemProbe.enabled`를 `true`로 설정하여 `system-probe`를 활성화합니다.
그런 다음 `datadog.systemProbe.enableTCPQueueLength` 파라미터를 설정하여 검사를 활성화합니다.

### 오퍼레이터(v1.0.0 이상)로 설정하기

DatadogAgent 매니페스트에서 `features.tcpQueueLength.enabled` 파라미터를 설정합니다.
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    tcpQueueLength:
      enabled: true
```

**참고**: COS(컨테이너에 최적화된 OS)를 사용하는 경우 다음과 같이 노드 에이전트에서 `src` 볼륨을 오버라이드합니다.
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    tcpQueueLength:
      enabled: true
  override:
    nodeAgent:
      volumes: 
      - emptyDir: {}
        name: src
```

### 검증

[Agent의 `status` 하위 명령을 실행][2]하고 Checks 섹션에서 `tcp_queue_length`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "tcp_queue_length" >}}


### 서비스 점검

TCP Queue Length 점검은 서비스 점검을 포함하지 않습니다.

### 이벤트

TCP Queue Length 점검은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/tcp_queue_length.d/conf.yaml.example
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://github.com/DataDog/helm-charts
[4]: https://github.com/DataDog/integrations-core/blob/master/tcp_queue_length/metadata.csv
[5]: https://docs.datadoghq.com/ko/help/