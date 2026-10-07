---
app_id: helm
app_uuid: 754a061c-d896-4f3c-b54e-87125bb66241
assets:
  dashboards:
    Helm - Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: helm.release
      metadata_path: metadata.csv
      prefix: helm.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10257
    source_type_name: Helm
  monitors:
    '[helm] Monitor Helm failed releases': assets/monitors/monitor_failed_releases.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 설정 및 배포
- ㅊ
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/helm/README.md
display_on_public_website: true
draft: false
git_integration_title: helm
integration_id: helm
integration_title: Helm 점검
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: helm
public_title: Helm 점검
short_description: Datadog를 사용한 Helm 배포 추적
supported_os:
- 리눅스
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Configuration & Deployment
  - Category::Containers
  - 제공::통합
  configuration: README.md#Setup
  description: Datadog를 사용한 Helm 배포 추적
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-helm-kubernetes-with-datadog/
  support: README.md#Support
  title: Helm 점검
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 Datadog 에이전트를 통해 Helm 배포를 모니터링합니다.

Helm은 여러 스토리지 백엔드를 지원합니다. v3에서 Helm의 기본값은 쿠버네티스(Kubernetes) 시크릿이고 v2에서 Helm의 기본값은 ConfigMaps입니다.. 이 점검은 두 가지 옵션을 모두 지원합니다.

## 설정

### 설치

Helm 점검은 [Datadog 에이전트 ][1] 패키지에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다.

### 구성

{{< tabs >}}
{{% tab "Helm" %}}

클러스터 점검입니다. Helm 차트에 `datadog.helmCheck.enabled`을 추가하여 이 점검을 활성화할 수 있습니다.

**참고**: 설정이 필요하지 않은 경우 빈 `conf.d`를 건너뛸 수 있습니다.

자세한 내용은 [클러스터 점검 설명서][1]를 참조하세요.

[1]: https://docs.datadoghq.com/ko/agent/cluster_agent/clusterchecks/
{{% /tab %}}
{{% tab "Operator (v1.5.0+)" %}}

클러스터 점검입니다. `DatadogAgent` 배포 설정에 `spec.features.helmCheck.enabled`를 추가하여 이 점검을 활성화할 수 있습니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    helmCheck:
      enabled: true
```

{{% /tab %}}
{{% tab "Operator (< v1.5.0)" %}}

클러스터 점검입니다. `DatadogAgent` 배포 설정에서 클러스터 에이전트에 설정 파일 `helm.yaml`을 제공하여 이 점검을 활성화할 수 있습니다.

```
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  override:
    clusterAgent:
      [...]
      extraConfd:
        configDataMap:
          helm.yaml: |-
            init_config:
            instances:
            - collect_events: false
```

이 점검에는 클러스터 에이전트 포드에서 사용하는 쿠버네티스(Kubernetes) 서비스 계정에 바인딩된 추가 권한이 있어야 합니다. 권한이 있어야만 Helm이 저장한 릴리스에 액세스할 수 있습니다.

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: datadog-helm-check
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: datadog-helm-check
subjects:
  - kind: ServiceAccount
    name: datadog-cluster-agent
    namespace: default
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: datadog-helm-check
rules:
- apiGroups:
  - ""
  resources:
  - secrets
  - configmaps
  verbs:
  - get
  - list
  - watch
```

**참고**: `ServiceAccount` 제목은 `default` 네임스페이스에 설치한 예시입니다. 배포에 따라 `name` 및 `namespace`을 조정하세요.

{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령][2]을 실행하고 점검 섹션에서 `helm` 을 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "helm" >}}


### 이벤트

이 점검은 `collect_events` 옵션이 `true`로 설정된 경우 이벤트를 전송합니다. 기본값은 `false`입니다.

이 옵션을 활성화하면 다음 경우, 점검에서 이벤트를 전송합니다.
- 새 릴리스 배포 시
- 릴리스 삭제 시
- 릴리스가 업그레이드(새 버전) 시
- 예를 들어 배포됨에서 대체됨으로 상태가 변경됩니다.

### 서비스 점검
{{< get-service-checks-from-git "helm" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [블로그: Datadog를 사용해 Helm에서 관리하는 쿠버네티스(Kubernetes) 애플리케이션 모니터링][4]



[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ko/help/
[4]: https://www.datadoghq.com/blog/monitor-helm-kubernetes-with-datadog/