---
app_id: palo-alto-cortex-xdr
app_uuid: 156afdc8-d8e9-4544-92fd-d8da87278671
assets:
  dashboards:
    Palo Alto Cortex XDR - Alerts: assets/dashboards/palo_alto_cortex_xdr_alerts.json
    Palo Alto Cortex XDR - Incidents: assets/dashboards/palo_alto_cortex_xdr_incidents.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 20766332
    source_type_name: Palo Alto Cortex XDR
  logs:
    source: palo-alto-cortex-xdr
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
- security
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/palo_alto_cortex_xdr/README.md
display_on_public_website: true
draft: false
git_integration_title: palo_alto_cortex_xdr
integration_id: palo-alto-cortex-xdr
integration_title: Palo Alto Cortex XDR
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: palo_alto_cortex_xdr
public_title: Palo Alto Cortex XDR
short_description: Palo Alto Cortex XDR 로그에 관한 인사이트 얻기
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Palo Alto Cortex XDR 로그에 대한 인사이트 얻기
  media:
  - caption: Palo Alto Cortex XDR - 인시던트
    image_url: images/palo_alto_cortex_xdr_incidents.png
    media_type: 이미지
  - caption: Palo Alto Cortex XDR - 알림
    image_url: images/palo_alto_cortex_xdr_alerts.png
    media_type: 이미지
  overview: README.md#Overview
  support: README.md#Support
  title: Palo Alto Cortex XDR
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

[Palo Alto Cortex XDR][1]은 엔드포인트, 네트워크, 클라우드 환경 전반에서 고급 위협 보호를 제공하는 종합 탐지 및 대응 플랫폼입니다. 엔드포인트 보호, 네트워크 보안, 분석을 통합하여 실시간 가시성 및 대응 기능을 제공하고 정교한 사이버 위협에 효과적으로 대응합니다.

본 통합은 다음 로그를 수집합니다.

- 인시던트: 위협 이벤트의 아티팩트, 에셋, 경고에 관한 정보(심각도, 상태, 담당 사용자 정보 포함)를 표시합니다.
- 알림: 심각도, 빈도, 소스를 포함한 경고의 실시간 분석을 표시합니다.

Palo Alto Cortex XDR 통합은 REST API를 사용하여 Palo Alto Cortex XDR 로그의 데이터를 원활하게 수집합니다. 데이터를 수집하기 전, 로그를 정규화 및 보강하여 데이터 형식을 일관되게 유지하고, 다운스트림 프로세싱 및 분석용 정보 콘텐츠를 보강합니다. 본 통합은 즉시 사용 가능한 대시보드를 통해 인시던트 및 경고에 관한 인사이트를 제공합니다.

## 설정

### Palo Alto Cortex XDR에서 API 자격 증명 생성하기

1. **Palo Alto Cortex XDR 계정**에 로그인합니다.
2. **Settings** > **Configurations** > **Integrations** > **API Keys**로 이동합니다.
3. **New Key**를 클릭합니다.
4. 원하는 보안 수준(**Advanced** 또는 **Standard**)에 따라 API 키 유형을 선택합니다.
5. API 키 인증 시간 제한을 정의하려면 **Enable Expiration Date**를 선택하고 **expiration date and time**을 설정합니다. **Settings** > **Configurations** > **Integrations** > **API Keys**로 이동하여 각 API 키의 **Expiration Time** 설정을 추적합니다.
6. 필요한 경우 API 키의 용도를 설명하는 코멘트를 입력합니다.
7. 기존 **Roles**에서 해당 키에 원하는 액세스 수준을 선택하거나, **Custom**을 선택하여 권한을 세부적으로 설정합니다.
8. **Generate**를 클릭하여 API 키를 생성합니다.

### Palo Alto Cortex XDR API 키 ID 가져오기

1. API 키 테이블에서 ID 필드를 찾습니다.
2. 해당 ID 번호를 기록해 두시기 바랍니다. 이 값은 **x-xdr-auth-id:{key_id}** 토큰을 나타냅니다.

### Palo Alto Cortex XDR의 FQDN 가져오기

1. 마우스 오른쪽 버튼으로 API 키를 클릭하고 **View Examples**를 선택합니다.
2. **CURL Example** URL을 복사합니다. 본 예시에는 고유 **FQDN**이 포함됩니다.

### Palo Alto Cortex XDR 계정을 Datadog에 연결하기

1. Palo Alto Cortex XDR 자격 증명을 추가합니다.

    | 파라미터   | 설명  |
    | -------------| ------------ |
    | API 키      | Palo Alto Cortex XDR의 API키입니다. |
    | API 키 ID   | Palo Alto Cortex XDR 인증 ID입니다. |
    | FQDN         | Palo Alto Cortex XDR의 FQDN입니다. `baseUrl/public_api/v1/{name of api}/{name of call}/`의 `baseUrl` 부분입니다. |

2. **Save** 버튼을 클릭하여 설정을 저장합니다.

## 수집한 데이터

### 로그

Palo Alto Cortex XDR 통합은 Palo Alto Cortex XDR 인시던트 및 알림 로그를 수집하여 Datadog에 전달합니다.

### 메트릭

Palo Alto Cortex XDR 통합은 메트릭을 포함하지 않습니다.

### 이벤트

Palo Alto Cortex XDR 통합은 이벤트를 포함하지 않습니다.

## 지원

도움이 필요하신가요? [Datadog 지원팀][2]에 문의하세요.

[1]: https://docs-cortex.paloaltonetworks.com/p/XDR
[2]: https://docs.datadoghq.com/ko/help/