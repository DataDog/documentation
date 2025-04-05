---
app_id: harbor
app_uuid: a4aae6fb-1865-42d0-be03-78e98b7e4b22
assets:
  dashboards:
    Harbor Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: harbor.projects.count
      metadata_path: metadata.csv
      prefix: harbor.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10063
    source_type_name: Harbor
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ㅊ
- 로그 수집
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/harbor/README.md
display_on_public_website: true
draft: false
git_integration_title: harbor
integration_id: harbor
integration_title: Harbor
integration_version: 5.1.0
is_public: true
manifest_version: 2.0.0
name: harbor
public_title: Harbor
short_description: Harbor 컨테이너 레지스트리 상태 모니터링
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
  - Category::Containers
  - Category::Log Collection
  - 제공::통합
  configuration: README.md#Setup
  description: Harbor 컨테이너 레지스트리 상태 모니터링
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Harbor
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 Datadog 에이전트를 통해 [Harbor][1]를 모니터링합니다.

## 설정

### 설치

Harbor 점검은 [Datadog 에이전트 ][2] 패키지에 포함되어 있습니다. 서버에 추가 설치가 필요하지 않습니다.

### 구성

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

##### 메트릭 수집

1. [에이전트의 설정 디렉토리][1]의 루트의 `conf.d/` 폴더에 있는 `harbor.d/conf.yaml` 파일을 편집하여 Harbor 성능 데이터 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [harbor.d/conf.yaml 샘플][2]을 참조하세요.

    **참고**: 설정에서 모든 유형의 사용자를 지정할 수 있지만 디스크 메트릭을 가져오려면 관리자 권한이 있는 계정이 필요합니다. `harbor.projects.count`는 제공된 사용자가 액세스할 수 있는 프로젝트 수만 반영합니다.

2. [에이전트를 재시작][3]하세요.

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

1. Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화해야 합니다.

   ```yaml
   logs_enabled: true
   ```

2. `harbor.d/conf.yaml` 파일에 이 설정 블록을 추가하여 Harbor 로그 수집을 시작하세요.

   ```yaml
     logs:
       - type: file
         path: /var/log/harbor/*.log
         source: harbor
         service: '<SERVICE_NAME>'
   ```

3. [에이전트를 재시작][3]하세요.

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/
[2]: https://github.com/DataDog/integrations-core/blob/master/harbor/datadog_checks/harbor/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

##### 메트릭 수집

| 파라미터            | 값                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `harbor`                                                                              |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                                         |
| `<INSTANCE_CONFIG>`  | `{"url": "https://%%host%%", "username": "<USER_ID>", "password": "<USER_PASSWORD>"}` |

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

Datadog Agent에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][2]을 참조하세요.

| 파라미터      | 값                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "harbor", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트의 상태 하위 명령을 실행][3]하고 점검 섹션에서 `harbor`을 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "harbor" >}}


### 이벤트

Harbor 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "harbor" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.



[1]: https://goharbor.io
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ko/help/