---
categories:
- alerting
- notifications
custom_kind: 통합
dependencies: []
description: Datadog 경고 및 이벤트에서 VictorOps를 알림 채널로 사용하세요.
doc_link: https://docs.datadoghq.com/integrations/victorops/
draft: false
git_integration_title: victorops
has_logo: true
integration_id: victorops
integration_title: VictorOps
integration_version: ''
is_public: true
manifest_version: '1.0'
name: victorops
public_title: Datadog-VictorOps 통합
short_description: Datadog 경고 및 이벤트에서 VictorOps를 알림 채널로 사용하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Datadog-VictorOps 통합을 사용하여 Datadog 경고를 VictorOps로 전송하고 라우팅 및 에스컬레이션을 정밀하게 제어할 수 있습니다. **@victorops**를 사용하여 경고를 생성하면 문제를 더 빠르게 파악하고 해결 시간을 단축할 수 있습니다.

- 이벤트 스트림에서
- 스냅샷 찍어서
- 메트릭 알림이 트리거될 떄

## 설정

### 설치

1. VictorOps 설정 페이지에서 "Integrations"을 클릭합니다
2. "Datadog"을 클릭한 후 "Enable Integration"을 클릭합니다
3. 키를 복사합니다
4. Datadog으로 돌아가서 다음 섹션에 API 키를 붙여넣습니다

## 수집한 데이터

### 메트릭

VictorOps 통합은 메트릭을 포함하지 않습니다.

### 이벤트

VictorOps 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

VictorOps 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][1]에 문의하세요.

## 참고 자료

### Knowledge base

#### 키 라우팅

특정 VictorOps 사용자에게 경고를 전송하려면 Datadog에 모든 라우팅 목록을 만드세요. 라우팅 키가 설정되지 않은 경우 VictorOps는 기본 그룹으로 경고를 전송합니다. 그런 다음 `@victorops`를 사용하여 경고를 수신할 VictorOps 엔드포인트를 선택하세요.

이름에는 특수문자를 사용할 수 없습니다. 대문자/소문자, 숫자, '\_', '-'만 사용할 수 있습니다.

### 커스텀 엔드포인트 선택

필드가 비어있는 경우 기본 엔드포인트는 'https://alert.victorops.com/integrations/datadog/20140523/alert'

[1]: https://docs.datadoghq.com/ko/help/