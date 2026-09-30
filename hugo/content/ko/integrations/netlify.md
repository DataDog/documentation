---
categories:
- 협업
- 로그 수집
- 프로비저닝
custom_kind: 통합
dependencies: []
description: Netlify 로그 추적
doc_link: https://docs.datadoghq.com/integrations/netlify/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-netlify-with-datadog/
  tag: 블로그
  text: Datadog로 Netlify 사이트 모니터링
git_integration_title: netlify
has_logo: true
integration_id: netlify
integration_title: Netlify
integration_version: ''
is_public: true
manifest_version: '1.0'
name: netlify
public_title: Datadog-Netlify 통합
short_description: Netlify 로그 추적
team: web-integrations
type: ''
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

[Netlify][1]는 고객이 역동적이면서 고성능 웹 앱을 구축할 수 있도록 도와주는 잼스택 개발 플랫폼입니다.

Netlify와 Datadog를 통합하면 다음과 같은 이점이 있습니다.

* [Datadog 로그 관리][2]로 트래픽 로그를 확인하고 파싱
* HTTP 상태 코드를 사용해 중단된 애플리케이션 요청 수 확인
* 함수 시간과 각 요청에 해당하는 로그 시각화
* [Datadog Synthetic Monitoring][3]으로 프론트엔드 성능 모니터링

## 설정

1. [Datadog API 키][4] 생성
2. [Netlify Log Drain][5]을 구성해 로그를 Datadog로 전송

## 수집한 데이터

### 메트릭

Netlify 통합에는 메트릭이 포함되어 있지 않습니다.

### 서비스 점검

Netlify 통합에는 서비스 점검이 포함되어 있지 않습니다.

### 이벤트

Netlify 통합에는 이벤트가 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][6]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.netlify.com/
[2]: https://docs.datadoghq.com/ko/logs/
[3]: https://docs.datadoghq.com/ko/synthetics/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.netlify.com/monitor-sites/log-drains/
[6]: https://docs.datadoghq.com/ko/help/