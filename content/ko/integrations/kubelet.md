---
app_id: kubelet
app_uuid: 8afd5500-0b72-4574-95f9-81282e2bd535
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kubernetes.cpu.usage.total
      metadata_path: metadata.csv
      prefix: kubernetes.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Kubelet
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- containers
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kubelet/README.md
display_on_public_website: true
draft: false
git_integration_title: kubelet
integration_id: kubelet
integration_title: Kubelet
integration_version: 9.1.0
is_public: true
manifest_version: 2.0.0
name: kubelet
public_title: Kubelet
short_description: kubelet에서 컨테이너 통계를 수집합니다.
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
  - Category::Containers
  - Offering::Integration
  configuration: README.md#Setup
  description: kubelet에서 컨테이너 통계를 수집합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Kubelet
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 통합은 kubelet에서 컨테이너 메트릭을 가져옵니다.

- kubelet 통계 시각화 및 모니터링
- kubelet 장애 조치 및 이벤트에 대한 알림 확인

## 설정

### 설치

Kubelet 점검에는 [Datadog 에이전트][1] 패키지가 포함되어 있으므로 서버에 다른 것을 설치할 필요가 없습니다.

### 구성

[에이전트의 설정 디렉토리][2]의 루트에 있는 `conf.d/` 폴더에서 `kubelet.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 설정 옵션은 [샘플 kubelet.d/conf.yaml][3]을 참조하세요.

### 검증

[에이전트의 상태 하위 명령][4]을 실행하고 점검 섹션에서 `kubelet`를 찾습니다.

### 호환성

kubelet 점검 은 두 가지 모드로 실행할 수 있습니다.

- 기본 프로메테우스 모드는 쿠버네티스(Kubernetes) 버전 1.7.6 이상에서 호환됩니다.
- cAdvisor 모드(`cadvisor_port` 옵션을 설정하여 활성화)는 버전 1.3 이상에서 호환되어야 합니다. 일관된 태깅 및 필터링을 사용하려면 에이전트 버전 6.2 이상이 필요합니다.

## OpenShift 3.7 미만 지원

cAdvisor 4194 포트는 OpenShift에서 기본적으로 비활성화되어 있습니다. 활성화하려면 다음을 추가해야 합니다.
[node-config 파일][5]에 다음 줄을 추가해야 합니다.

```text
kubeletArguments:
  cadvisor-port: ["4194"]
```

포트를 열 수 없는 경우 설정을 통해 컨테이너 메트릭 컬렉션의 두 소스를 모두 비활성화하세요.

- `cadvisor_port` 에 `0`
- `metrics_endpoint` 에 `""`

점검은 여전히 다음을 수집할 수 있습니다.

- kubelet 상태 서비스 점검
- 포드 실행/중지 메트릭
- 포드 제한 및 요청
- 노드 캐파 메트릭

## 수집한 데이터

### 서비스 점검
{{< get-service-checks-from-git "kubelet" >}}


### 제외된 컨테이너

수집된 데이터를 배포된 컨테이너의 하위 집합으로 제한하려면 [`DD_CONTAINER_EXCLUDE` 환경 변수][7]를 설정하세요. 메트릭은 해당 환경 변수에 지정된 컨테이너에 포함되지 않습니다.

포드 수준에서 보고된 네트워크 메트릭의 경우, 다른 컨테이너가 동일한 포드에 속할 수 있으므로 `name` 또는 `image name`을 기준으로 컨테이너를 제외할 수 없다. 따라서 `DD_CONTAINER_EXCLUDE`가 네임스페이스에 적용되는 경우, 포드가 해당 네임스페이스에 있으면 포드-수준 메트릭은 보고되지 않습니다. 그러나 `DD_CONTAINER_EXCLUDE`가 컨테이너 이름 또는 이미지 이름을 참조하는 경우, 제외 규칙이 포드의 일부 컨테이너에 적용되더라도 포드 수준 메트릭이 보고됩니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/kubelet/datadog_checks/kubelet/data/conf.yaml.default
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.openshift.org/3.7/install_config/master_node_configuration.html#node-configuration-files
[6]: https://github.com/DataDog/integrations-core/blob/master/kubelet/assets/service_checks.json
[7]: https://docs.datadoghq.com/ko/agent/guide/autodiscovery-management/?tab=containerizedagent
[8]: https://docs.datadoghq.com/ko/help/