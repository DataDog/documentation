---
app_id: kube-apiserver-metrics
app_uuid: c5caf884-25c1-4a35-a72e-fa75e7cc10fc
assets:
  dashboards:
    Kubernetes API Server - Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kube_apiserver.go_goroutines
      metadata_path: metadata.csv
      prefix: kube_apiserver.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10197
    source_type_name: Kubernetes API 서버 메트릭
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 컨테이너
- 쿠버네티스(Kubernetes)
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/README.md
display_on_public_website: true
draft: false
git_integration_title: kube_apiserver_metrics
integration_id: kube-apiserver-metrics
integration_title: Kubernetes API 서버 메트릭
integration_version: 6.2.0
is_public: true
manifest_version: 2.0.0
name: kube_apiserver_metrics
public_title: Kubernetes API 서버 메트릭
short_description: Kubernetes API 서버에서 메트릭 수집
supported_os:
- 리눅스
- windows
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
  configuration: README.md#Setup
  description: Kubernetes API 서버에서 메트릭 수집
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Kubernetes API 서버 메트릭
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Kubernetes API Server 대시보드][1]

## 개요

이 점검은 [Kube_apiserver_metrics][2]를 모니터링합니다.

## 설정

### 설치

Kube_apiserver_metrics 점검은 [Datadog Agent][3] 패키지에 포함되어 있으므로 서버에 추가 설치할 필요가 없습니다.

### 구성

쿠버네티스(Kubernetes) 클러스터에 마스터 노드가 있고 `kube-apiserver` 이미지에 대한 포드와 컨테이너 를 실행 중인 경우, Datadog 에이전트가 [자동으로 해당 포드를 감지][4]하고 `kube_apiserver_metrics.d/auto_conf.yaml` 파일에 관한 통합을 설정합니다. 

그러나 GKE, EKS 또는 AKS와 같은 관리형 쿠버네티스(Kubernetes) 배포를 사용하는 경우, 에이전트가 감지할 수 있는 실행 중인 `kube-apiserver` 포드가 없을 수도 있습니다.

해당 경우 `default` 네임스페이스에서 `kubernetes` 서비스에 대한 통합을 설정할 수 있습니다.

- `kube_apiserver_metrics` 점검을 실행하는 주요 사용 사례는 [클러스터 레벨 점검][5]입니다. 
- [서비스의 어노테이션](#annotate-service)을 사용하거나 Datadog 오퍼레이터, Helm 차트 또는 수동으로 [로컬 파일](#local-file)을 사용하여 이 작업을 수행할 수 있습니다. 
- 메트릭을 수집하려면 [자동탐지][4] 템플릿에 다음 파라미터 및 값을 설정합니다. 

| 파라미터         | 값                                                                 |
|-------------------|-----------------------------------------------------------------------|
| `<INTEGRATION_NAME>`| `["kube_apiserver_metrics"]`                                            |
| `<INIT_CONFIG>`     | `[{}]`                                                                  |
| `<INSTANCE_CONFIG>` | `[{"prometheus_url": "https://%%host%%:%%port%%/metrics"}]` |

사용 가능한 모든 설정 옵션은 [kube_apiserver_metrics.yaml][6]에서 검토할 수 있습니다.

#### 서비스 어노테이션

`default` 네임스페이스의 쿠버네티스(Kubernetes) 서비스에 다음과 같이 어노테이션할 수 있습니다.

{{< tabs >}}
{{% tab "Annotations v2 (for Datadog Agent v7.36)" %}}

```yaml
ad.datadoghq.com/endpoints.checks: |
  {
    "kube_apiserver_metrics": {
      "instances": [
        {
          "prometheus_url": "https://%%host%%:%%port%%/metrics"
        }
      ]
    }
  }
```

{{% /tab %}}

{{% tab "Annotations v1 (for Datadog Agent < v7.36)" %}}

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances:
    '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics"}]'
```

{{% /tab %}}
{{< /tabs >}}

그런 다음 Datadog Cluster Agent는 각 엔드포인트에 대한 점검을 Datadog Agent에 예약합니다.

#### 로컬 파일

[에이전트의 설정 디렉토리][7]의 루트에 있는 `conf.d/` 폴더의 `kube_apiserver_metrics.yaml` 파일에서 직접 엔드포인트를 설정하여 [클러스터 점검][8]으로 디스패칭하도록 설정하여 해당 점검을 실행할 수도 있습니다.

**참고**: 로컬 파일 또는 ConfigMap을 사용하는 경우 설정 파일에 `cluster_check: true`를 추가하여 클러스터 점검을 설정합니다.

클러스터 에이전트에 [설정][9]를 제공하여 클러스터 점검을 설정합니다.

{{< tabs >}}

{{% tab "Helm" %}}

```yaml
clusterAgent:
  confd:
    kube_apiserver_metrics.yaml: |-
      advanced_ad_identifiers:
        - kube_endpoints:
            name: "kubernetes"
            namespace: "default"
      cluster_check: true
      init_config:
      instances:
        - prometheus_url: "https://%%host%%:%%port%%/metrics"
```

{{% /tab %}}

{{% tab "Operator" %}}

```yaml
spec:
#(...)
  override:
    clusterAgent:
      extraConfd:
        configDataMap:
          kube_apiserver_metrics.yaml: |-
            advanced_ad_identifiers:
              - kube_endpoints:
                  name: "kubernetes"
                  namespace: "default"
            cluster_check: true
            init_config:
            instances:
              - prometheus_url: "https://%%host%%:%%port%%/metrics"
```

{{% /tab %}}

{{< /tabs >}}

해당 설정은 에이전트를 트리거하여 정의된 엔드포인트 IP 주소 및 정의된 포트에서 `default` 네임스페이스의 `kubernetes` 서비스에 요청합니다.

### 검증

[에이전트의 상태 하위 명령을 실행][10]하고 점검 섹션에서 `kube_apiserver_metrics`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "kube-apiserver-metrics" >}}


### 서비스 점검

Kube_apiserver_metrics는 서비스 점검을 포함하지 않습니다.

### 이벤트

Kube_apiserver_metrics는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/kube_apiserver_metrics/images/screenshot.png
[2]: https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[5]: https://docs.datadoghq.com/ko/agent/cluster_agent/clusterchecks/
[6]: https://github.com/DataDog/integrations-core/blob/master/kube_apiserver_metrics/datadog_checks/kube_apiserver_metrics/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https:docs.datadoghq.com//containers/cluster_agent/clusterchecks/?tab=datadogoperator#setting-up-check-configurations
[9]: https://docs.datadoghq.com/ko/containers/cluster_agent/clusterchecks/?tab=helm#configuration-from-configuration-files
[10]: https://docs.datadoghq.com/ko/agent/faq/agent-commands/#agent-status-and-information
[11]: https://docs.datadoghq.com/ko/help/