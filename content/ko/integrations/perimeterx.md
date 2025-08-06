---
app_id: perimeterx
categories:
- 로그 수집
- security
custom_kind: 통합
description: PerimeterX 로그 및 메트릭을 Datadog와 통합하세요.
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: PerimeterX
---
## 개요

This integration allows [PerimeterX](https://www.perimeterx.com/) customers to forward their PerimeterX related logs and events to Datadog.

## 설정

All configuration is done by PerimeterX. See the [PerimeterX documentation](https://edocs.humansecurity.com/docs/configuring-the-export-via-portal) regarding third party integrations.

### 설치

호스트에 설치할 필요가 없습니다.

### 설정

1. Generate a new Integration API Key in your [Datadog portal](https://app.datadoghq.com/organization-settings/api-keys).
1. Open a support ticket with [PerimeterX Support](mailto:support@perimeterx.com) and request the Datadog log export integration. Support needs the following information:
   - Datadog 통합 API 키
   - 메트릭 및/또는 로그 전송을 원하는지 여부
   - Datadog에 전달해야 할 PerimeterX 애플리케이션 ID

### 검증

PerimeterX 지원팀에서 Datadog 통합이 완료되었음을 확인하면 다음 단계를 수행하여 통합이 예상대로 작동하는지 확인합니다.

1. Datadog 포털에 로그인합니다.
1. 로그 -> 검색으로 이동합니다.
1. "Source:perimeterx" 필터 쿼리로 검색을 수행합니다.
1. PerimeterX에서 로그를 수신 중인지 확인합니다(로그 시작 표시까지 몇 분이 소요될 수 있음).

## 수집한 데이터

### Metrics

PerimeterX does not include metrics for [requests](https://docs.perimeterx.com/pxconsole/docs/data-schema-metrics).

### 서비스 점검

PerimeterX에는 서비스 점검이 포함되어 있지 않습니다.

### 이벤트

PerimeterX에는 이벤트가 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.