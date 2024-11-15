---
app_id: aerospike
app_uuid: 68799442-b764-489c-8bbd-44cb11a15f4e
assets:
  dashboards:
    Aerospike Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - aerospike.uptime
      - aerospike.namespace.memory_free_pct
      metadata_path: metadata.csv
      prefix: aerospike.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10067
    source_type_name: Aerospike
  logs:
    source: aerospike
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/aerospike/README.md
display_on_public_website: true
draft: false
git_integration_title: aerospike
integration_id: aerospike
integration_title: Aerospike
integration_version: 2.2.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: aerospike
public_title: Aerospike
short_description: Aerospike 데이터베이스에서 클러스터 및 네임스페이스 통계를 수집하세요
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Data Stores
  - Category::Log Collection
  configuration: README.md#Setup
  description: Aerospike 데이터베이스에서 클러스터 및 네임스페이스 통계를 수집하세요
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Aerospike
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Aerospike 데이터베이스에서 메트릭을 확보하여 실시간으로 다음을 수행하세요.

- Aerospike 상태를 시각화하고 모니터링합니다.
- Aerospike 실패 조치 및 이벤트에 대한 알림을 받습니다.

## 설정

참고: 현재 aerospike 통합은 Aerospike 서버 v4.9 이상과만 호환됩니다. 자세한 내용은 Aerospike의 [Python 클라이언트 라이브러리 릴리스 노트][1]를 참조하세요.
이전 Aerospike 서버 버전을 사용하는 경우 Datadog Agent 버전 7.29.0 이하를 사용하여 모니터링할 수 있습니다.

### 설치

Aerospike 검사는 [Datadog Agent][2] 패키지에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다.

### 설정

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

##### 메트릭 수집
호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

1. [Aerospike Prometheus Exporter][1]를 설치하고 설정합니다. 자세한 내용은 [Aerospike 문서][2]를 참조하세요.

2. Agent의 설정 디렉터리 루트에서 `conf.d/` 폴더에 있는 `aerospike.d/conf.yaml` 파일을 편집하여 Aerospike 성능 데이터 수집을 시작하세요. 사용 가능한 모든 설정 옵션은 [샘플 aerospike.d/conf.yaml][3]를 참조하세요.

3. [Agent를 재시작합니다][4].

**참고**: 이 검사의 버전 1.16.0 이상에서는 메트릭 수집에 [OpenMetrics][5]를 사용하며, Python 3이 필요합니다. Python 3을 사용할 수 없거나 이 검사의 레거시 버전을 사용하려는 호스트의 경우 [예제 설정][6]을 참조하세요.

##### 로그 수집


1. Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화해야 합니다.

   ```yaml
   logs_enabled: true
   ```

2. Aerospike 로그 수집을 시작하려면 `aerospike.d/conf.yaml` 파일에 다음 설정 블록을 추가하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/aerospike/aerospike.log
       source: aerospike
   ```

    `path` 파라미터 값을 변경하고 환경에 맞게 설정하세요. 사용 가능한 모든 설정 옵션은 [샘플 aerospike.d/conf.yaml][3]을 참조하세요.

3. [Agent를 재시작합니다][4].

[1]: https://github.com/aerospike/aerospike-prometheus-exporter
[2]: https://docs.aerospike.com/monitorstack/new/installing-components
[3]: https://github.com/DataDog/integrations-core/blob/master/aerospike/datadog_checks/aerospike/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/integrations/openmetrics/
[6]: https://github.com/DataDog/integrations-core/blob/7.36.x/aerospike/datadog_checks/aerospike/data/conf.yaml.example
{{% /tab %}}
{{% tab "컨테이너화" %}}


#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `aerospike`                          |
| `<INIT_CONFIG>`      | 비워두거나 `{}`                        |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint": "http://%%host%%:9145/metrics"}` |

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

Datadog 에이전트에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "aerospike", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent의 상태 하위 명령을 실행][3]하고 Checks 섹션에서 `aerospike`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "aerospike" >}}


### 서비스 검사

**aerospike.can_connect**
**aerospike.cluster_up**

### 이벤트

Aerospike는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.


[1]: https://download.aerospike.com/download/client/python/notes.html#5.0.0
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ko/help/