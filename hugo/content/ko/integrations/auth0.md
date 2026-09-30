---
app_id: auth0
app_uuid: 0c91d12e-f01e-47d9-8a07-4dba1cde4b67
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: auth0.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10098
    source_type_name: Auth0
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Auth0
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- incidents
- 로그 수집
- 보안
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/auth0/README.md
display_on_public_website: true
draft: false
git_integration_title: auth0
integration_id: auth0
integration_title: Auth0
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: auth0
public_title: Auth0
short_description: Auth0 이벤트를 확인하고 분석하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Incidents
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Auth0 이벤트를 확인하고 분석하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Auth0
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Auth0은 개발팀을 위한 ID 플랫폼으로, 개발자와 기업이 애플리케이션을 보호하는 데 필요한 빌딩 블록을 제공합니다.


이 통합은 Auth0의 로그 스트리밍을 활용하여 로그를 Datadog에 직접 보냅니다. 로그는 Auth0에서 생성될 때 실시간으로 전송되어 고객에게 Auth0 테넌트에 대한 최신 정보를 제공합니다. 이 통합의 주요 이점 중 하나는 트렌드를 식별하기 위해 데이터를 수집하고 시각화하는 기능입니다. 엔지니어링 팀은 이를 사용하여 오류율과 트래픽 데이터를 시각화합니다. 보안팀은 이를 사용하여 인증 트래픽을 시각화하고 위험도가 높은 액션에 대한 경고를 설정합니다.

### 주요 사용 사례

#### 활동을 ID 데이터와 상호 연관시켜 트렌드 파악

ID 데이터는 누가 어떤 활동을 수행했는지에 대한 중요한 인사이트를 제공합니다. 이를 통해 팀은 시스템 전반의 사용자 행동을 더 잘 이해할 수 있습니다.

#### 시스템 아키텍처 및 개발에 대한 결정

시간 경과에 따른 ID 트렌드를 추적함으로써 팀은 제품 개발 및 시스템 아키텍처에 대해 정보에 입각한 결정을 내릴 수 있습니다. 예를 들어 팀은 최대 로그인 시간, 인증 활동 및 지리적 활동 추적을 기반으로 개발 우선 순위를 지정할 수 있습니다.

#### 성능 및 보안 사고에 신속하게 대응

ID 정보를 사용하여 보안 및 성능 사고를 신속하게 식별할 수 있습니다. 예를 들어 로그인 시도 실패가 급증하면 ID 시스템을 표적으로 삼는 가장 일반적인 위협 중 하나인 크리덴셜 스터핑 공격이 진행 중임을 나타낼 수 있습니다.

보안 팀은 임계값을 구성하여 의심스러운 이벤트에 대해 알리는 경고를 설정할 수 있고, 보안 사고에 신속하게 대응할 수 있습니다.

## 설정

모든 설정은 [Auth0 대시보드][1]에서 이루어집니다.

1. [Auth0 대시보드][1]에 로그인합니다.
2. **Logs** > **Streams**로 이동합니다.
3. **+ Create Stream**을 클릭합니다.
4. Datadog을 선택하고 새 Datadog 이벤트 스트림의 고유한 이름을 입력합니다.
5. 다음 화면에서 Datadog 이벤트 스트림에 대해 다음 설정을 제공합니다.


    | 설정          | 설명                                                |
    | ---------------- | ---------------------------------------------------------- |
    | `API Key`        | [Datadog API 키][2] 입력.                           |
    | `Region`           | 해당 [Datadog 사이트][3] (예: app.datadoghq.eu인 경우 `EU`, app.datadoghq.com인 경우 `US1`, us3.datadoghq.com인 경우 `US3` |


6. Save를 클릭합니다.

Auth0이 다음 테넌트 로그를 작성하면 Datadog에서 소스 및 서비스가 `auth0`로 설정된 해당 로그 이벤트의 복사본을 받습니다.

### 검증

Datadog에서 로그 보기

1. **Logs** > **Livetail**로 이동합니다.
2. `source:auth0`를 설정해 Auth0 로그를 확인합니다.

## 수집한 데이터

### 로그 수집

Auth0 로그가 수집되어 Datadog으로 전송됩니다. 반환될 수 있는 로그 유형은 [로그 이벤트 유형 코드][4]에 설명되어 있습니다.

### 메트릭

Auth0는 메트릭을 포함하지 않습니다.

### 서비스 점검

Auth0는 서비스 점검을 포함하지 않습니다.

### 이벤트

Auth0는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.
[블로그 게시물][6]에서 해당 통합에 대해 자세히 알아보세요.

[1]: https://manage.auth0.com
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.datadoghq.com/ko/getting_started/site/
[4]: https://auth0.com/docs/logs/references/log-event-type-codes
[5]: https://docs.datadoghq.com/ko/help/
[6]: https://www.datadoghq.com/blog/monitor-auth0-with-datadog/