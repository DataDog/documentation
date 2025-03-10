---
categories:
- mobile
custom_kind: 통합
dependencies: []
description: 앱 충돌을 모니터링하고 상세한 런타임 성능 메트릭 수집
doc_link: https://docs.datadoghq.com/integrations/mparticle/
draft: false
git_integration_title: mparticle
has_logo: true
integration_id: mparticle
integration_title: mParticle
integration_version: ''
is_public: true
manifest_version: '1.0'
name: mparticle
public_title: Datadog-mParticle 통합
short_description: 앱 충돌을 모니터링하고 상세한 런타임 성능 메트릭 수집
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

mParticle은 모바일 앱의 상세한 런타임 성능 데이터를 추적할 수 있도록 도와줍니다. mParticle SDK에서는 CPU 로드, 메모리 사용량, 배터리 수준과 같은 상세 런타임 성능 데이터를 자동으로 수집합니다. mParticle을 Datadog와 연결하면 Datadog 대시보드에서 다음 정보를 실시간으로 확인할 수 있습니다.

- 충돌 보고
- 제 3자 네트워크 성능 데이터
- 활성 세션 상세 정보
- 디바이스 CPU, 메모리, 배터리 활용

mParticle에 관한 자세한 정보는 [블로그][1]와 [설명서][2]를 참고하세요.

## 설정

### 설치

1. [mParticle 계정][3]으로 로그인합니다.
2. 좌측 탐색 창에 있는 종이 비행기 아이콘을 클릭해 서비스 페이지로 이동합니다.
3. Datadog 타이틀을 클릭해 Datadog 통합의 설정 패널을 표시합니다.
4. 설정 패널에 [Datadog API 키][4]를 입력하고 Save를 클릭합니다.
5. Status를 토글해 Datadog로 데이터 전송하는 것을 활성화합니다.

## 수집한 데이터

### 메트릭

이 통합으로 사용할 수 있는 메트릭을 보려면 [mParticle 설명서][2]를 참고하세요.

### 이벤트

mParticle 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

mParticle 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][5]에 문의하세요.

[1]: https://www.datadoghq.com/blog/track-detailed-run-time-performance-data-with-mparticle-and-datadog/
[2]: https://docs.mparticle.com/integrations/datadog/event/
[3]: https://app.mparticle.com/login?return=
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.datadoghq.com/ko/help/