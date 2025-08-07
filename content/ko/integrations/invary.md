---
app_id: invary
categories:
- 자동화
- log collection
- os & system
- 보안
custom_kind: integration
description: 운영 체제의 런타임 무결성 시각화
integration_version: 1.0.0
media:
- caption: Invary Runtime Integrity OOTB 대시보드
  image_url: images/dashboard.png
  media_type: image
supported_os:
- linux
title: Invary
---
## 개요

Invary 관리 운영 체제의 런타임 무결성을 시각화하세요.

Invary validates the Runtime Integrity of operating systems and detects rootkits that can deceive other systems. This integration allows Invary Runtime Integrity appraisals to be streamed to Datadog and stored as logs. Invary appraisal events contain the overall status of your endpoints' integrity, along with details on what specific sections of your endpoint's kernel have been compromised, if any.  A detailed example of an Invary appraisal event can be found at: [developers.invary.com](https://developers.invary.com/).

이 통합에는 Invary가 관리하는 엔드포인트의 런타임 무결성을 시각화하는 기본 제공 대시보드도 포함되어 있습니다. 이 대시보드는 현재 무결성이 결여된 엔드포인트와 시간에 따른 무결성 추세를 강조하여 보여줍니다. 또한 Invary 대시보드는 실행 중인 운영 체제의 인벤토리 정보를 제공하며, 사용 중인 배포판 및 커널 버전에 관한 인사이트도 함께 제공합니다.

This integration uses the [Invary API](https://developers.invary.com/).

## 설정

### 설치

Invary 통합을 통해 엔드포인트 및 평가에 관한 세부 정보를 Invary SaaS 플랫폼에서 Datadog 인스턴스로 전달할 수 있습니다. 서버에 추가 설치가 필요하지 않습니다.

### 설정

1. Invary가 Datadog 인스턴스와 통신할 수 있도록 OAuth 권한 부여 플로를 완료합니다.
1. "Invary Runtime Integrity" 대시보드에서 런타임 무결성을 종합적으로 살펴보세요.

### 검증

1. "Invary Runtime Integrity" 대시보드에서 시기적절하고 예상되는 평가 정보를 검토하세요.
1. `source:invary` 기본 쿼리로 로그를 쿼리합니다.

### 삭제

- 이 통합이 설치 제거되면 이전 인증은 취소됩니다.
- 추가적으로 [API 키 페이지](https://app.datadoghq.com/organization-settings/api-keys)에서 통합 이름을 검색하여 이 통합과 연결된 모든 API 키가 비활성화되었는지 확인합니다. 

## 수집한 데이터

### 로그

Invary forwards your Runtime Integrity appraisal results with the `source:invary` tag.

### Metrics

Invary Runtime Integrity 통합에는 메트릭이 포함되어 있지 않습니다.

### 서비스 점검

Invary Runtime Integrity에는 서비스 검사가 포함되어 있지 않습니다.

### 이벤트

Invary Runtime Integrity 통합에는 이벤트가 포함되지 않습니다.

## 트러블슈팅

Need help? Contact [Invary Support](mailto:support@invary.com).