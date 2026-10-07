---
further_reading:
- link: /synthetics/api_tests/http_tests
  tag: 설명서
  text: HTTP 테스트 생성하기
title: HTTP 모니터링 요청이 HTTPS로 리디렉션됩니다.
---

## 개요

HTTP 트래픽이 HTTPS로 리디렉션되는 것을 모니터링하는 것은 API 엔드포인트 및 애플리케이션과의 사용자 연결이 암호화되도록 하는 데 매우 중요합니다.

### HTTPS 리디렉션 모니터링

설정에 따라 생성된 **응답 미리보기** 탭의 헤더 아래 `location` 또는 **본문**에서 `"https:"===window.location.protocol` - HTTPS 리디렉션을 식별할 수 있습니다 .

HTTP 트래픽의 HTTPS 리디렉션을 모니터링하려면,

1. HTTP 테스트를 생성하고 [요청을 정의][1]합니다.
2. **테스트 URL**을 클릭합니다. 응답 미리보기는 **요청 미리보기** 및 **응답 미리보기**를 생성합니다.
3. HTTPS로의 리디렉션에 대한 어설션을 추가합니다.
    - 응답 미리 보기에서 `location` 헤더를 클릭하여 `location` 헤더에 어설션을 정의합니다. 예를 들어 **헤더**에서 `http://datadoghq.com`에 대한 `location` 헤더는 `https://datadoghq.com`입니다.

    {{< img src="synthetics/guide/monitor-https-redirections/location-header-https.png" alt="Location header in the response preview" style="width:100%;" >}}
    - 또는 **+ 새 어설션**을 클릭하여 응답 본문에서 어설션을 정의합니다. `body` `contains`을 선택하고 `"https:"===window.location.protocol`을 텍스트 필드에 붙여넣습니다. 
    {{< img src="synthetics/guide/monitor-https-redirections/https-assertion.png" alt="Define your assertion" style="width:100%;" >}}

나머지 테스트 생성 워크플로우를 완료하고 HTTP 테스트를 저장합니다. 

알림을 정의한 후 Datadog는 HTTP 트래픽이 HTTPS로 올바르게 리디렉션되지 않을 때 알림을 전송할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/synthetics/api_test/#define-request