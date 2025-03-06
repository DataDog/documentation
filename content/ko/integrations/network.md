---
app_id: 시스템
app_uuid: 114d71e8-0128-4dca-aee8-297178732d31
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: system.net.bytes_rcvd
      metadata_path: metadata.csv
      prefix: 시스템.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: 네트워크
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/network/README.md
display_on_public_website: true
draft: false
git_integration_title: network
integration_id: 시스템
integration_title: 네트워크
integration_version: 5.1.0
is_public: true
manifest_version: 2.0.0
name: network
public_title: 네트워크
short_description: 송수신 바이트 및 패킷, 연결 상태,  추적, 왕복 시간 등을 추적하기
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Network
  - Offering::Integration
  configuration: README.md#Setup
  description: 송수신 바이트 및 패킷, 연결 상태,  추적, 왕복 시간 등을 추적하기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: 네트워크
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![네트워크 대시보드][1]

## 개요

네트워크 점검에서는 호스트 운영 시스템에서 TCP/IP 통계를 수집합니다.

## 설정

호스트에서 실행되는 Agent에 대해 이 검사를 설치하고 구성하려면 아래 지침을 따르세요.

### 설치

네트워크 점검은 [Datadog Agent][2] 패키지에 포함되어 있으므로 서버에 다른 것을 설치할 필요가 없습니다.

이 통합으로 메트릭을 수집하려면 호스트에 conntrack 모듈이 활성화되어 있는지 확인해야 합니다. 활성화되어 있지 않은 경우에는 다음을 실행하세요.

```shell
sudo modprobe nf_conntrack
sudo modprobe nf_conntrack_ipv4
sudo modprobe nf_conntrack_ipv6
```

*참고*: 에이전트 이미지에 conntrack 바이너리 설치가 필요할 수 있습니다.

### 구성

1. 기본적으로 에이전트에서 네트워크 점검이 활성화되어 있으나, 직접 구성을 확인하고 싶을 경우에는 [에이전트 구성 디렉터리][3] 루트에 있는 `conf.d/` 폴더에서 `network.d/conf.yaml` 파일을 편집할 수 있습니다. 사용할 수 있는 구성 옵션 전체를 보려면 [network.d/conf.yaml 샘플][4]을 참고하세요.

2. 변경된 구성을 적용하려면 [에이전트 다시 시작][5]하세요.

**참고**:

액세스 권한이 있는 conntrack을 실행해야 가져올 수 있는 메트릭이 일부 있을 수 있습니다.

Linux: 이 작업을 진행하려면 다음 sudoers를 구성하세요.

```shell
dd-agent ALL=NOPASSWD: /usr/sbin/conntrack -S
```

#### Kubernetes  

Kubernetes v1.11 이하, 또는 Kubernetes v1.11+ 이상에서 `host` 네트워킹 모드를 사용하는 경우에 기본적으로 Conntrack 메트릭을 사용할 수 있습니다.

[AWS ENA 메트릭][6]을 수집하는 방법:

- `collect_aws_ena_metrics: true`를 사용해 `network` 점검을 업데이트하여 AWS ENA 메트릭을 활성화합니다.
- 에이전트 컨테이너를 업데이트하여 `host` 네트워크 모드를 사용하고 `NET_ADMIN` 기능을 추가합니다.

Datadog [Helm 차트][7] 배포를 하려면 다음으로 차트 값을 업데이트합니다.

```yaml
datadog:
  # Enable AWS ENA metrics collection for network check
  confd:
    network.yaml: |-
      init_config:
      instances:
        - collect_aws_ena_metrics: true

# Have agent containers use host network with NET_ADMIN capability
agents:
  useHostNetwork: true
  containers:
    agent:
      securityContext:
        capabilities:
          add:
            - NET_ADMIN

```

DaemonSet를 사용해 수동으로 에이전트를 배포한 경우, `datadog` DaemonSet 패치를 적용합니다.

```yaml
spec:
  template:
    spec:
      dnsPolicy: ClusterFirstWithHostNet
      hostNetwork: true
      containers:
        - name: agent
          ports:
          - containerPort: 8125
            hostPort: 8125
            name: dogstatsdport
            protocol: UDP
          securityContext:
            capabilities:
              add:
              - NET_ADMIN
```

**참고**: `hostNetwork: true`의 경우 모든 컨테이너에 적용되기 때문에 DaemonSet의 다른 컨테이너에 `hostPort: 8125`를 추가해야 할 수 있습니다.

### 검증

[에이전트의 `status` 하위 명령을 실행][8]하고 Checks 섹션 아래에서 `network`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "network" >}}


**참고**: `system.net.conntrack` 메트릭은 에이전트 v6.12+에서 사용할 수 있습니다. 자세한 내용은 [CHANGELOG][10]를 참고하세요.

### 이벤트

네트워크 점검에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

네트워크 점검에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

- [TCP/UDP 호스트 메트릭을 Datadog API로 전송][11]

## 참고 자료

- [HTTP 점검에 네트워크 모니터 구축][12]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/network/images/netdashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/network/datadog_checks/network/data/conf.yaml.default
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/monitoring-network-performance-ena.html
[7]: https://docs.datadoghq.com/ko/containers/kubernetes/installation/?tab=helm#installation
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/network/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/network/CHANGELOG.md#1110--2019-05-14
[11]: https://docs.datadoghq.com/ko/integrations/guide/send-tcp-udp-host-metrics-to-the-datadog-api/
[12]: https://docs.datadoghq.com/ko/monitors/monitor_types/network/