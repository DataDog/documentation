---
app_id: kubevirt-controller
app_uuid: f213050d-a54c-4a72-bf51-e9290a7d050c
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - kubevirt_controller.virt_controller.leading_status
      - kubevirt_controller.virt_controller.ready_status
      metadata_path: metadata.csv
      prefix: kubevirt_controller.
    process_signatures:
    - virt-controller
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 22545001
    source_type_name: KubeVirt Controller
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 컨테이너
- kubernetes
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kubevirt_controller/README.md
display_on_public_website: true
draft: false
git_integration_title: kubevirt_controller
integration_id: kubevirt-controller
integration_title: KubeVirt Controller
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: kubevirt_controller
public_title: KubeVirt Controller
short_description: 주요 메트릭을 수집하여 KubeVirt Controller 서비스의 상태를 모니터링합니다.
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: 주요 메트릭을 수집하여 KubeVirt Controller 서비스의 상태를 모니터링합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: KubeVirt Controller
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


<div class="alert alert-warning">
본 통합은 퍼블릭 베타 단계이므로 프로덕션 워크로드에서는 신중하게 사용해야 합니다.
</div>

## 개요

이 검사는 Datadog Agent를 통해 [KubeVirt Controller][1]를 모니터링합니다.

## 설정

아래 지침을 따라 호스트에서 실행되는 에이전트에 대해 이 점검을 설치 및 설정하세요. 컨테이너화된 환경의 경우, 이러한 지침을 적용하는 데 가이드가 필요하다면 [자동탐지 통합 템플릿][2]을 참조하세요.

### 설치

KubeVirt Controller 점검은 [Datadog Agent][3] 패키지에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다.

### 설정

`kubevirt_controller` 점검을 실행하는 주요 사용 사례는 [클러스터 레벨 점검][4]입니다.

이를 실행하려면 아래 단계에 따라 일부 RBAC 권한을 업데이트하여  `datadog-agent` 서비스 계정에`KubeVirt` 리소스에 대한 읽기 전용 액세스 권한을 부여합니다.

1. `kubevirt.io:view` 클러스터 역할을 `datadog-agent` 서비스 계정에 바인딩합니다.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: datadog-agent-kubevirt
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: kubevirt.io:view
subjects:
  - kind: ServiceAccount
  name: datadog-agent
  namespace: default
```

2. `KubeVirt` 리소스를 다음과 같이 패치하여 `virt-controller` 배포의 포드 템플릿에 주석을 추가합니다.

```yaml
apiVersion: kubevirt.io/v1
kind: KubeVirt
metadata:
  name: kubevirt
  namespace: kubevirt
spec:
  certificateRotateStrategy: {}
  configuration: {}
  customizeComponents:
    patches:
    - resourceType: Deployment
        resourceName: virt-controller
        patch: '{"spec": {"template":{"metadata":{"annotations":{ "ad.datadoghq.com/virt-controller.check_names": "[\"kubevirt_controller\"]", "ad.datadoghq.com/virt-controller.init_configs": "[{}]", "ad.datadoghq.com/virt-controller.instances": "[{ \"kubevirt_controller_metrics_endpoint\": \"https://%%host%%:%%port%%/metrics\",\"kubevirt_controller_healthz_endpoint\": \"https://%%host%%:%%port%%/healthz\", \"kube_namespace\":\"%%kube_namespace%%\", \"kube_pod_name\":\"%%kube_pod_name%%\", \"tls_verify\": \"false\"}]"}}}}}'
        type: strategic
```

`<DD_CLUSTER_NAME>`을 원하는 클러스터 이름으로 변경합니다.

### 검증

[클러스터 Agent의 `clusterchecks` 하위 명령][5]을 클러스터 Agent 컨테이너 내에서 실행하고, Checks 섹션에서 `kubevirt_controller` 점검을 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "kubevirt_controller" >}}


### 이벤트

KubeVirt Controller 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

KubeVirt Controller 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/kubevirt_controller
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ko/containers/cluster_agent/clusterchecks/?tab=datadogoperator
[5]: https://docs.datadoghq.com/ko/containers/troubleshooting/cluster-and-endpoint-checks/#dispatching-logic-in-the-cluster-agent
[6]: https://github.com/DataDog/integrations-core/blob/master/kubevirt_controller/metadata.csv
[7]: https://docs.datadoghq.com/ko/help/