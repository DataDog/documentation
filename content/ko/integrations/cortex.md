---
app_id: cortex
categories:
- 인시던트
custom_kind: 통합
description: Cortex 대시보드에서 바로 Datadog 인시던트를 생성하세요.
integration_version: 1.0.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: Cortex
---
## 개요

The [Cortex](https://www.getcortexapp.com/) integration enables you to trigger Datadog incidents directly from the Cortex dashboard.

## 설정

이 통합을 설정하려면 Cortex 계정과 Datadog API 및 애플리케이션 키를 보유하고 있어야 합니다.

### 설정

1. 현재 고객이 아니라면 Cortex에 데모를 요청하세요.
1. Create a [Datadog API key](https://docs.datadoghq.com/account_management/api-app-keys/#api-keys).
1. Create a [Datadog Application key](https://docs.datadoghq.com/account_management/api-app-keys/#application-keys).
1. Add Datadog API and Application keys to the [Cortex Datadog Integration](https://app.getcortexapp.com/admin/settings/datadog).

### 검증

1. Go to the [Cortex homepage](https://app.getcortexapp.com/admin/index).
1. Click on an existing service or [create a new service](https://app.getcortexapp.com/admin/service/new).
1. "통합(INTEGRATIONS)" 아래의 사이드바에서 "모두 보기(See all)"를 클릭한 다음 "Datadog"를 고릅니다.
1. "인시던트(Incidents)" 위의 빨간색 "인시던트 트리거(Trigger Incident)" 버튼을 클릭합니다.
1. 형식에 정보를 작성하고 녹색 "인시던트 트리거(Trigger Incident)" 버튼을 클릭합니다.
1. "인시던트가 트리거되었습니다. 여기를 클릭해 Datadog에서 봅니다(Incident has been triggered! Click here to see it in Datadog)."라는 메시지가 화면에 나타납니다.
1. 추가로, 새로운 인시던트가 "인시던트(Incidents)" 아래에 표시됩니다.

## 수집한 데이터

### Metrics

Cortex는 메트릭을 포함하지 않습니다.

### 서비스 점검

Cortex는 서비스 점검을 포함하지 않습니다.

### 이벤트

Cortex는 이벤트를 포함하지 않습니다.

## 트러블슈팅

Need help? Contact [support@getcortexapp.com](mailto:support@getcortexapp.com).