---
categories:
- 로그 수집
- 보안
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/alcide.md
description: Alcide 로그 수집 및 처리
doc_link: https://docs.datadoghq.com/integrations/alcide/
has_logo: true
integration_id: alcide
integration_title: Alcide
is_public: true
custom_kind: integration
name: alcide
public_title: Datadog-Alcide 통합
short_description: Alcide 로그 수집 및 처리
version: '1.0'
---

## 개요

Alcide는 쿠버네티스(Kubernetes) 감시 및 이상 징후 모니터링 서비스를 제공해 드립니다. Datadog은 해당 통합으로 Alcide 로그를 수집 및 처리할 수 있습니다.

## 구성

### 설치

Datadog는 Alcide 로그를 감지하면 자동으로 로그 처리 파이프라인을 활성화합니다. 별도로 설치할 필요가 없습니다.

### 설정

Alcide에서 _통합_(_Integrations_) 탭 을 선택한 후 _탐지 통합 설정_(_Detections Integrations Configuration_) 섹션으로 이동합니다. 해당 섹션은 위협 정보 로그용 통합 구성에 사용됩니다.

1. 대상을 **HTTP API**로 선택하세요.

2. URL 상자에 `https://http-intake.logs.<DATADOG_SITE>/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=alcide` 을 입력합니다. 미국 사이트라면 플레이스홀더 값 `<DATADOG_SITE>`을 `datadoghq.com`로 변경하고, `datadoghq.eu` EU 사이트라면 플레이스홀더 값  `<DATADOG_API_KEY>`을 [Datadog API 키][1]로 바꿉니다.

3. _엔티티 유형_(_Entities Types_)에서 위협 정보를 전달할 유형을 선택합니다. Datadog은 해당 유형을 모두 선택하기를 권장합니다.

4. _탐지 카테고리_(_Detection Categories_)에서 전달할 카테고리를 선택합니다. Datadog은 _인시던트_(_incidents_)와 _이상 징후_(_anomalies_)를 모두 선택하기를 권장합니다.

5. _탐지 신뢰도_(_Detection Confidence_)에서 원하는 신뢰도 수준을 선택합니다. Datadog은 최소 _높음_(_high_) 및 _중간_( _medium_) 수준을 선택할 것을 권장합니다.

6. 선택 사항으로, _일치하는 엔티티_(_Entities Matching_) 및 _일치하지 않는 엔티티_(_Entities Not Matching_) 상자를 활용하여 엔티티 포함 및 제외 필터를 생성할 수도 있습니다.

다음으로 이전 섹션의 _선택한 감시 엔티티 통합 설정_(Selected Audit Entries Integration Configuration_ ) 섹션으로 이동합니다. 해당 섹션은 감시 로그 통합 구성에 사용됩니다.

1. 대상을 **HTTP API**로 선택하세요.

2. URL 상자에 `https://http-intake.logs.<DATADOG_SITE>/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=alcide` 을 입력합니다. 미국 사이트라면 플레이스홀더 값 `<DATADOG_SITE>`을 `datadoghq.com`로 변경하고, `datadoghq.eu` EU 사이트라면 플레이스홀더 값  `<DATADOG_API_KEY>`을 [Datadog API 키][1]로 바꿉니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객지원][2]에 문의하세요.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ko/help/