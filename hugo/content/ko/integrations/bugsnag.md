---
categories:
- notifications
dependencies: []
description: 애플리케이션 전반의 오류 비율을 중앙에서 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/bugsnag/
draft: false
git_integration_title: bugsnag
has_logo: true
integration_id: bugsnag
integration_title: Bugsnag
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: bugsnag
public_title: Datadog-Bugsnag 통합
short_description: 오류 증가 및 감소에 따른 애플리케이션 전반의 오류 비율 변화를 중앙에서 추적하세요."
team: 웹-통합
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Bugsnag은 소프트웨어 팀에 웹 및 모바일 애플리케이션을 위한 자동화된 충돌 감지 플랫폼을 제공합니다. Bugsnag은 자동으로 오류 발생 시 오류를 캡처하고 알립니다. Datadog와 Bugsnag을 통합하여 Datadog 이벤트 스트림에 오류 알림을 전송합니다.

이 통합으로 다음 이점을 누릴 수 있습니다.

- Datadog 이벤트 스트림에서 오류 요약 받기
- 프로젝트 오류 비율 급증 시 알림 받기
- 심각도와 릴리스 단계순으로 알림 필터링

## 설정

### 설치

설치할 필요가 없습니다.

### 설정

Datadog와 Bugsnag을 통합하는 방법:

1.  Datadog에 알림을 전송하기 위해 설정하려는 프로젝트를 보려면 [Bugsnag][1]에서 **설정**으로 이동합니다.
2. **팀 알림**을 선택한 다음 **Datadog**를 선택합니다.
3. 오류 알림 트리거를 선택하여 Datadog에서 보이는 알림을 커스터마이즈합니다.
   {{< img src="integrations/bugsnag/bugsnag_1.png" alt="bugsnag_알림_설정" popup="true">}}

4. 특정 릴리스 단계와 심각도의 오류를 확인하려면 알림 트리거에 커스텀 필터를 적용합니다.
   {{< img src="integrations/bugsnag/bugsnag_2.png" alt="bugsnag_필터_설정" popup="true">}}

5. Datadog API 키를 입력합니다.
6. **테스트 알림**을 선택해 설정을 테스트합니다. Bugsnag 테스트 오류가 Datadog에 나타나야 합니다.
7. 설정을 저장합니다.
8. 동일한 프로젝트에서 더 많은 스트림을 추가해 각기 다른 알림 기준 설정에 따른 오류 이벤트를 확인합니다.

## 수집한 데이터

### 메트릭

Bugsnag 통합은 메트릭을 포함하지 않습니다.

### 이벤트

Bugsnag 통합은 설정된 Bugsnag 오류와 알림을 Datadog 이벤트 스트림으로 푸시합니다.

### 서비스 검사

Bugsnag 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객지원][2]에 문의하세요.

[1]: https://bugsnag.com
[2]: https://docs.datadoghq.com/ko/help/