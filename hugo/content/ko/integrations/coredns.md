---
app_id: coredns
app_uuid: b613759e-89ca-4d98-a2c1-4d465c42e413
assets:
  dashboards:
    CoreDNS: assets/dashboards/coredns.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: coredns.request_count
      metadata_path: metadata.csv
      prefix: coredns.
    process_signatures:
    - coredns
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10038
    source_type_name: CoreDNS
  monitors:
    '[CoreDNS] Cache hits count low': assets/monitors/coredns_cache_hits_low.json
    '[CoreDNS] Request duration high': assets/monitors/coredns_request_duration_high.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 캐싱(caching)
- 컨테이너
- 쿠버네티스(Kubernetes)
- 로그 수집
- 네트워크
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/coredns/README.md
display_on_public_website: true
draft: false
git_integration_title: coredns
integration_id: coredns
integration_title: CoreDNS
integration_version: 3.2.2
is_public: true
manifest_version: 2.0.0
name: coredns
public_title: CoreDNS
short_description: CoreDNS는 쿠버네티스에서 DNS 메트릭을 수집합니다.
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Containers
  - Category::Kubernetes
  - Category::Log Collection
  - Category::Network
  - Supported OS::Linux
  configuration: README.md#Setup
  description: CoreDNS는 쿠버네티스에서 DNS 메트릭을 수집합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: CoreDNS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

실시간으로 CoreDNS에서 메트릭을 받아 DNS 실패와 캐시 적중 및 캐시 누락을 가시화 및 모니터링하세요.

## 설정


버전 1.11.0부터 본 OpenMetrics 기반 통합에는 최신 모드(`openmetrics_endpoint`가 대상 엔드포인트를 가리키도록 설정하여 활성화됨)와 레거시 모드(`prometheus_url`를 대신 설정하여 활성화됨)가 있습니다. Datadog에서는 최신 모드를 활성화해 최신 기능을 사용할 것을 권장합니다. 자세한 내용을 확인하려면 [OpenMetrics 기반 통합의 최신 및 레거시 버전 관리][3]를 참고하세요.

CoreDNS 점검 최신 모드를 사용하려면 Python 3이 필요하며 `.bucket` 메트릭을 제출하고 `.sum` 및 `.count` 히스토그램 샘플을 단조 카운트 유형으로 제출합니다. 이전에는 이 메트릭이 레거시 모드에서 `gauge` 유형으로 제출되었습니다. 각 모드에서 사용할 수 있는 메트릭 목록은 [`metadata.csv` 파일][2]을 참고하세요.

Python 3을 사용할 수 없는 호스트나 이 통합 모드를 전에 구현한 적이 있으면 `legacy` 모드 [구성 예시][3]를 참고하세요. `coredns.d/auto_conf.yaml` 파일을 사용하는 자동탐지 사용자의 경우, 이 파일은 기본적으로 점검 `legacy` 모드에서 `prometheus_url` 옵션을 활성화합니다. 기본 구성 옵션을 보려면 [coredns.d/auto_conf.yaml][4] 샘플을 보고 사용할 수 있는 구성 옵션 목록 전체를 보려면 [coredns.d/conf.yaml.example][5] 샘플을 보세요.

### 설치

[Datadog 에이전트][6] 패키지에 CoreDNS 점검이 포함되어 있기 때문에 서버에 새로운 설치를 할 필요가 없습니다.

### 설정
{{< tabs >}}
{{% tab "Docker" %}}
#### Docker

컨테이너에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

애플리케이션 컨테이너에서 [자동탐지 통합 템플릿][1]을 Docker 레이블로 설정합니다.

```yaml
LABEL "com.datadoghq.ad.check_names"='["coredns"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"openmetrics_endpoint":"http://%%host%%:9153/metrics", "tags":["dns-pod:%%host%%"]}]'
```

이 OpenMetrics 기반 점검의 레거시 모드를 활성화하려면 `openmetrics_endpoint`를 `prometheus_url`로 교체하세요.

```yaml
LABEL "com.datadoghq.ad.instances"='[{"prometheus_url":"http://%%host%%:9153/metrics", "tags":["dns-pod:%%host%%"]}]' 
```

**참고**:

- 전달된 `coredns.d/auto_conf.yaml` 파일은 기본적으로 레거시 모드에서 `prometheus_url` 옵션을 활성화합니다.
- `dns-pod` 태그가 대상 DNS 파드 IP를 추적합니다. 다른 태그는 서비스 탐지를 사용해 정보를 폴링하는 Datadog 에이전트와 관련되어 있습니다.
- 파드에서 서비스 탐지 주석을 해야 합니다. 배포하고 싶을 경우 템플릿 사양 메타데이터에 주석을 추가하세요. 외부 사양 수준에 추가하지 마세요.

#### 로그 수집

기본적으로 로그 수집은 Datadog 에이전트에서 비활성화되어 있습니다. 활성화하려면 [Docker 로그 수집][2]을 참고하세요.

그런 다음 Docker 레이블로 [로그 통합][3]을 설정하세요.

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"coredns","service":"<SERVICE_NAME>"}]'
```

[1]: http://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation
[3]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### 쿠버네티스(Kubernetes)

쿠버네티스에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

애플리케이션 컨테이너에 [자동탐지 통합 템플릿][1]을 파드 주석으로 설정하세요. 또는 [파일, configmap, 또는 키-값 저장소][2]로 구성할 수도 있습니다.

**주석 v1**(Datadog 에이전트 v7.36 이하용)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: coredns
  annotations:
    ad.datadoghq.com/coredns.check_names: '["coredns"]'
    ad.datadoghq.com/coredns.init_configs: '[{}]'
    ad.datadoghq.com/coredns.instances: |
      [
        {
          "openmetrics_endpoint": "http://%%host%%:9153/metrics", 
          "tags": ["dns-pod:%%host%%"]
        }
      ]
  labels:
    name: coredns
spec:
  containers:
    - name: coredns
```

**주석 v2**(for Datadog 에이전트 v7.36 이상)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: coredns
  annotations:
    ad.datadoghq.com/coredns.checks: |
      {
        "coredns": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:9153/metrics", 
              "tags": ["dns-pod:%%host%%"]
            }
          ]
        }
      }
  labels:
    name: coredns
spec:
  containers:
    - name: coredns
```

이 OpenMetrics 기반 점검의 레거시 모드를 활성화하려면 `openmetrics_endpoint`를 `prometheus_url`로 교체하세요.

**주석 v1** (Datadog 에이전트 v7.36 이하용)

```yaml
    ad.datadoghq.com/coredns.instances: |
      [
        {
          "prometheus_url": "http://%%host%%:9153/metrics", 
          "tags": ["dns-pod:%%host%%"]
        }
      ]
```

**주석 v2**(for Datadog 에이전트 v7.36 이상)

```yaml
          "instances": [
            {
              "prometheus_url": "http://%%host%%:9153/metrics", 
              "tags": ["dns-pod:%%host%%"]
            }
          ]
```

**참고**:

- 전달된 `coredns.d/auto_conf.yaml` 파일은 기본적으로 레거시 모드에서 `prometheus_url` 옵션을 활성화합니다.
- `dns-pod` 태그가 대상 DNS 파드 IP를 추적합니다. 다른 태그는 서비스 탐지를 사용해 정보를 폴링하는 Datadog 에이전트와 관련되어 있습니다.
- 파드에서 서비스 탐지 주석을 해야 합니다. 배포를 하고 싶을 경우 템플릿 사양 메타데이터에 주석을 추가하세요. 외부 사양 수준에 추가하지 마세요.

#### 로그 수집

Datadog 에이전트에서 기본적으로 로그 수집이 비활성화되어 있습니다. 활성화하려면 [쿠버네티스 로그 수집]을 확인하세요.

그리고 [로그 통합][4]을 파드 주석으로 설정하세요. 또는 [파일, configmap, 또는 키-쌍 저장소][5]로 구성할 수도 있습니다.

**주석 v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: coredns
  annotations:
    ad.datadoghq.com/coredns.logs: '[{"source": "coredns", "service": "<SERVICE_NAME>"}]'
  labels:
    name: coredns
```

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/ko/agent/kubernetes/log/?tab=daemonset
[4]: https://docs.datadoghq.com/ko/agent/kubernetes/log/?tab=kubernetes#examples---datadog-redis-integration
[5]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/?tab=file
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

ECS에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

애플리케이션 컨테이너에 [자동탐지 통합 템플릿][1]을 Docker 레이블로 설정하세요.

```json
{
  "containerDefinitions": [{
    "name": "coredns",
    "image": "coredns:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"coredns\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"openmetrics_endpoint\":\"http://%%host%%:9153/metrics\", \"tags\":[\"dns-pod:%%host%%\"]}]"
    }
  }]
}
```

이 OpenMetrics 기반 점검의 레거시 모드를 활성화하려면 `openmetrics_endpoint`를 `prometheus_url`로 교체하세요.

```json
      "com.datadoghq.ad.instances": "[{\"prometheus_url\":\"http://%%host%%:9153/metrics\", \"tags\":[\"dns-pod:%%host%%\"]}]"
```

**참고**:

- 전달된 `coredns.d/auto_conf.yaml` 파일은 기본적으로 레거시 모드에서 `prometheus_url` 옵션을 활성화합니다.
- `dns-pod` 태그가 대상 DNS 파드 IP를 추적합니다. 다른 태그는 서비스 탐지를 사용해 정보를 폴링하는 Datadog 에이전트와 관련되어 있습니다.
- 파드에서 서비스 탐지 주석을 해야 합니다. 배포를 하고 싶을 경우 템플릿 사양 메타데이터에 주석을 추가하세요. 외부 사양 수준에 추가하지 마세요.

##### 로그 수집

기본적으로 로그 수집은 Datadog 에이전트에서 비활성화되어 있습니다. 활성화하려면 [ECS 로그 수집][2]을 참조하세요.

그런 다음 Docker 레이블로 [로그 통합][3]을 설정하세요.

```yaml
{
  "containerDefinitions": [{
    "name": "coredns",
    "image": "coredns:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"coredns\",\"service\":\"<SERVICE_NAME>\"}]"
    }
  }]
}
```
[1]: https://docs.datadoghq.com/ko/agent/amazon_ecs/?tab=awscli#process-collection
[2]: https://docs.datadoghq.com/ko/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/ko/agent/amazon_ecs/logs/?tab=linux#activate-log-integrations
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트의 `status` 하위 명령어를 실행][7]하고 Checks 섹션 아래에서 `coredns`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "coredns" >}}


### 이벤트

CoreDNS 점검에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "coredns" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [CoreDNS 모니터링 핵심 메트릭][9]
- [CoreDNS의 메트릭과 로그를 수집하는 도구][10]
- [Datadog로 CoreDNS를 모니터링하는 방법][11]



[1]: https://docs.datadoghq.com/ko/integrations/guide/versions-for-openmetrics-based-integrations
[2]: https://github.com/DataDog/integrations-core/blob/master/coredns/metadata.csv
[3]: https://github.com/DataDog/integrations-core/blob/7.32.x/coredns/datadog_checks/coredns/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/auto_conf.yaml
[5]: https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/conf.yaml.example
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: http://docs.datadoghq.com/help
[9]: https://www.datadoghq.com/blog/coredns-metrics/
[10]: https://www.datadoghq.com/blog/coredns-monitoring-tools/
[11]: https://www.datadoghq.com/blog/monitoring-coredns-with-datadog/