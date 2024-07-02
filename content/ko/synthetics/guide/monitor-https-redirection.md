---
further_reading:
- link: /synthetics/api_tests/http_tests
  tag: 설명서
  text: HTTP 테스트 생성하기
title: HTTP 요청이 HTTPS으로 리디렉션되는지 모니터링합니다.
---

## 개요

HTTP 트래픽이 HTTPS로 리디렉션되는지 모니터링하는 것은 사용자 연결을 API 엔드포인트 및 애플리케이션으로 암호화하는 데 매우 중요합니다.

### HTTPS 리디렉션 모니터링

설정에 따라, 헤더의 생성된 **응답 미리보기** 탭의 `location` 또는 **본문**의 `"https:"===window.location.protocol`에서 HTTPS로의 리디렉션을 식별할 수 있습니다.

HTTP 트래픽이 HTTPS로 리디렉션되는지 모니터링하려면:

1. HTTP 테스트를 생성 및 [요청을 정의][1]합니다.
2. **테스트 URL**을 클릭합니다. 응답 미리보기는 **요청 미리보기** 및 **응답 미리보기**를 생성합니다.
3. HTTPS로 리디렉션하는 것에 대한 어서션(표명)을 추가합니다.
    - 응답 미리보기의 `location` 헤더를 클릭하여 `location` 헤더에 어서션(표명)을 정의합니다. 예를 들어, **헤더**에서 `http://datadoghq.com`에 대한 `location` 헤더는 `https://datadoghq.com`입니다.

    {{< img src="synthetics/guide/monitor-https-redirections/location-header-https.png" alt="Location header in the response preview" style="width:100%;" >}}
    - 또는, **+ 새 어서션(표명)**을 클릭하여 응답 본문에서 어서션(표명)을 정의합니다. `body` `contains`을 선택하여 텍스트 필드에 `"https:"===window.location.protocol`을 붙여넣습니다. 
    {{< img src="synthetics/guide/monitor-https-redirections/https-assertion.png" alt="Define your assertion" style="width:100%;" >}}

나머지 테스트 생성 워크플로우를 완료하고 HTTP 테스트를 저장합니다. 

알림을 정의하면 Datadog은 HTTP 트래픽이 HTTPS로 올바르게 리디렉션되지 않은 경우 알려드립니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/synthetics/api_test/#define-request