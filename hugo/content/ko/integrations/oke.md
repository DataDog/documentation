---
app_id: oke
app_uuid: c3361861-32be-4ed4-a138-d68b85b8d88b
assets:
  dashboards:
    OCI OKE Overview: assets/dashboards/oci_oke_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - oci.oke.apiserver_request_count
      - oci.oke.apiserver_response_count
      - oci.oke.kubernetes_node_condition
      - oci.oke.node_state
      - oci.oke.unschedulable_pods
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10255
    source_type_name: 쿠버네티스(Kubernetes)용 Oracle 컨테이너 엔진 - OKE
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 설정 및 배포
- 컨테이너
- 쿠버네티스(Kubernetes)
- 메트릭
- oracle
- 오케스트레이션
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/oke/README.md
display_on_public_website: true
draft: false
git_integration_title: oke
integration_id: oke
integration_title: 쿠버네티스(Kubernetes)용 Oracle 컨테이너 엔진
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oke
public_title: 쿠버네티스(Kubernetes)용 Oracle 컨테이너 엔진
short_description: OKE는 OCI 관리형 컨테이너 오케스트레이션 서비스입니다.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Containers
  - Category::Kubernetes
  - Category::Metrics
  - Category::Oracle
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: OKE는 OCI 관리형 컨테이너 오케스트레이션 서비스입니다.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-oracle-kubernetes-engine/
  support: README.md#Support
  title: 쿠버네티스(Kubernetes)용 Oracle 컨테이너 엔진
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

쿠버네티스(Kubernetes)용 Oracle 클라우드 인프라스트럭처 컨테이너 엔진(OKE)은 엔터프라이즈급 대규모 쿠버네티스(Kubernetes)의 운영을 간소화하는 관리형 쿠버네티스(Kubernetes) 서비스입니다.

본 통합은 메트릭과 [`oci_oke`][1] 네임스페이스 태그를 수집하여 쿠버네티스(Kubernetes) 컨트롤 플레인, 클러스터, 노드 상태를 모니터링하도록 도와드립니다. 

[Datadog 에이전트][2]를 OKE 클러스터에 배포하면 클러스터, 포드 및 개별 노드의 로드를 추적하여 리소스를 프로비저닝 및 배포하는 방법에 대한 더 나은 인사이트를 얻을 수 있도록 도와드립니다.

노드, 포드, 컨테이너 모니터링 외에도, 에이전트로 클러스터에서 실행 중인 서비스의 메트릭을 수집 및 보고할 수 있습니다. 다음 작업이 가능합니다.

- [사전 설정된 쿠버네티스(Kubernetes) 대시보드][3]로 OKE 클러스터 살펴보기
- 컨테이너 및 프로세스 실시간 모니터링
- 컨테이너화된 서비스를 자동 추적 및 모니터링

## 설정

[Oracle 클라우드 인프라스트럭처][4] 통합을 설정한 후 [커넥터 허브][5]에 `oci_oke` 네임스페이스가 포함되어 있는지 확인합니다.

Datadog이 이미 쿠버네티스(Kubernetes)와 AWS에 통합되었기 때문에 OKE 모니터링에 바로 사용할 수 있습니다. 쿠버네티스 클러스터에서 에이전트를 실행하거나 EKS로 마이그레이션할 계획이라면 Datadog을 사용해 클러스터를 계속 모니터링할 수 있습니다.

[Helm 차트][6]를 사용하여 에이전트를 DaemonSet으로 배포하는 것이 가장 간단한 방법(권장)입니다. 에이전트가 클러스터 내 모든 노드의 포드로 실행되고, 각 새 노드가 자동으로 에이전트를 설치하도록 하기 때문입니다. Helm 값 파일에 몇 줄을 추가하여 프로세스 데이터, 트레이스, 로그를 수집하기 위해 에이전트를 설정할 수도 있습니다. 아울러, OKE 노드 풀을 지원해 드립니다.


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

## 참고 자료

- [Datadog으로 OKE를 모니터링하는 방법][8]

[1]: https://docs.oracle.com/en-us/iaas/Content/ContEng/Reference/contengmetrics.htm
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/#installation
[3]: https://app.datadoghq.com/dashboard/lists/preset/3?q=kubernetes
[4]: https://docs.datadoghq.com/ko/integrations/oracle_cloud_infrastructure/
[5]: https://cloud.oracle.com/connector-hub/service-connectors
[6]: https://docs.datadoghq.com/ko/agent/kubernetes/?tab=helm
[7]: https://docs.datadoghq.com/ko/help/
[8]: https://www.datadoghq.com/blog/monitor-oracle-kubernetes-engine/