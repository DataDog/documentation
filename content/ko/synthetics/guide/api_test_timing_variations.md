---
aliases:
- /ko/synthetics/api_test_timing_variations
description: API 테스트 타이밍을 이해하고 시간 변형을 트러블슈팅합니다.
further_reading:
- link: https://docs.datadoghq.com/synthetics/metrics/#api-tests
  tag: 설명서
  text: 신서틱 API 테스트 메트릭
kind: 설명서
title: API 테스트 타이밍 이해와 시간 변형 문제 해결
---


## 개요

신서틱 API 테스트에서 수집한 [타이밍 메트릭][1]으로 서버와 클라이언트 간의 병목 현상을 파악할 수 있습니다.


## 타이밍 메트릭


신서틱 테스트에서는 다음을 측정하는 [메트릭][1]을 수집합니다.


### 리디렉션 시간

`synthetics.http.redirect.time` 메트릭은 리디렉션에 걸린 총 시간을 측정합니다. 다른 네트워크 타이밍(예: DNS 확인 및 TCP 연결)은 마지막 요청에 따라 결정됩니다.

예를 들어 **Follow Redirects**가 선택된 HTTP 테스트에서 페이지 A를 로딩하는 데 걸린 시간이 `35 ms`이고 페이지 B로 리디렉션되었다고 합시다. 페이지 B를 로딩하는데 걸린 시간이 `40 ms`이고 페이지 C로 리디렉션되었습니다. 이 때, 총 리디렉션 타이밍은 `35 ms + 40 ms = 75 ms`와 같이 계산되며, 페이지 C를 로딩하는데 걸리는 시간 안에 DNS 확인 및 TCP 연결 시간 등과 같은 다른 타이밍이 포함됩니다.

리디렉션 허용에 관한 자세한 정보는 [HTTP 테스트][2]를 참고하세요.


신서틱 HTTP 테스트 실행 중에 리디렉션이 발생한 경우에만 `synthetics.http.redirect.time` 메트릭이 측정됩니다.

### DNS 확인 시간

`synthetics.dns.response.time` 메트릭과 `*.dns.time` 메트릭은 도메인 이름을 확인하는 데 걸리는 시간을 측정합니다. 신서틱 API 테스트에서는 도메인 이름을 확인할 때 Google, CloudFlare, AWS, Azure와 같이 일반적인 DNS 서버를 사용합니다. 이 서버를  [프라이빗 위치][3]나 [DNS 테스트][5]로 재정의할 수 있습니다. 

이와 같은 메트릭은 API 테스트 URL 필드에 도메인 이름이 있을 경우에만 측정됩니다. IP 주소가 있으면 DNS 확인을 건너뛰고, 이 메트릭에 시계열이 표시되지 않습니다.


리디렉션의 경우 마지막 요청에 따라 DNS 확인 시간이 결정됩니다.

### TCP 연결 시간

`*.connect.time` 메트릭은 TCP와 서버가 연결하는 데 걸린 총 시간을 측정합니다.

리디렉션의 경우 마지막 요청에 따라 TCP 연결 시간이 결정됩니다.

### SSL 핸드셰이크 시간

`synthetics.http.ssl.time`과 `synthetics.ssl.hanshake.time` 메트릭은 SSL 핸드셰이크에 걸린 시간을 측정합니다.

이 메트릭은 HTTP가 아니라 HTTPS를 통할 때만 수집됩니다.

리디렉션의 경우 마지막 요청에 따라 SSL 핸드셰이크 타이밍이 결정됩니다.


### 첫 바이트 시간

`synthetics.http.firstbyte.time` 메트릭은 연결된 순간에서 Datadog 클라이언트가 응답 첫 바이트를 수신하는 순간까지 걸린 시간을 측정합니다. 이 타이밍에는 요청에서 데이터를 전송하는 총 시간이 포함됩니다.



리디렉션의 경우 마지막 요청에 따라 첫 바이트 시간이 결정됩니다.

### 다운로드 시간

`synthetics.http.download.time` 메트릭은 Datadog 클라이언트가 응답으로 첫 바이트를 수신한 순간에서 전체 응답을 다운로드 받은 순간까지 걸린 시간을 측정합니다. 일반적으로 응답 본문 크기가 클수록 시간이 많이 걸립니다.

응답에 본문이 없을 경우에는 시간이 null로 표시됩니다.

리디렉션의 경우 마지막 요청에 따라 다운로드 시간이 결정됩니다.

### 총 응답 시간

`*.response.time` 메트릭은 신서틱이 시작하는 순간에서 신서틱이 요청을 완료하는 순간까지 걸린 총 시간을 측정합니다. 응답 시간은 총 네트워크 타이밍 시간의 합입니다.

예를 들어 HTTPS 엔드포인트에 리디렉션이 없는 HTTP 테스트의 총 응답 시간은 `synthetics.http.response.time = synthetics.http.dns.time + synthetics.http.connect.time + synthetics.http.ssl.time + synthetics.http.firstbyte.time + synthetics.http.download.time`입니다.

## 타이밍 변형

응답 본문의 리디렉션에서 다운로드까지, 요청 단계 중에 병목 현상이나 지연이 있을 경우 API 테스트 네트워크 타이밍 메트릭이 변형될 수 있습니다. 

다음 동작을 파악하세요.

- 변형이 일반적인 추세로 인한 것인지 혹은 급증 때문인지 파악
- 요청의 특정 단계에서 변형이 발생하는지 파악(예: DNS 타이밍)
- 영향을 받은 신서틱 테스트가 여러 위치에서 실행 중인지, 변형이 위치 한 곳에서 발생하는지, 혹은 여러 곳에서 발생하는지 파악
- 변형이 단일 URL, 도메인, 또는 하위 도메인에서 발생하는지, 혹은 모든 테스트에 영향을 주는지 파악



타이밍 메트릭이 측정될 때마다 다음 요소로 변형을 설명할 수 있습니다.

### 리디렉션 시간
리디렉션 시간은 요청의 모든 리디렉션 시간의 합입니다. DNS 확인에서 다운로드까지, HTTP 요청의 어떤 단계이든 리디렉션 타이밍 시간이 늘어날 수 있습니다. 

예를 들어 DNS 확인 시간이 지연되면 리디렉션 시간에도 영향이 있습니다. 왜냐하면 리디렉션을 하려면 API 테스트에서 여러 도메인을 확인해야 하기 때문입니다.


### DNS 확인 시간
DNS 확인 시간이 늘어날 경우 권한 있는 서버에서 대기 시간이 추가 발생할 수 있습니다.

### TCP 연결 시간
네트워크 및 서버 로드, 요청과 응답 메시지 크기, 신서틱 관리형 위치 또는 [프라이빗 위치][5]와 서버 간 거리로 인해 TCP 핸드셰이크 변형이 발생할 수 있습니다.

### SSL 핸드셰이크 시간
서버 로드(보통 SSL 핸드셰이크에는 CPU가 소모가 큼), 네트워크 로드, 신서틱 관리형 위치 또는 [프라이빗 위치][5]와 서버 간 거리와 같은 이유로 인해 SSL 핸드셰이크 시간 변형이 생길 수 있습니다. CDN 문제도 SSL 핸드셰이크 시간을 늘릴 수 있습니다.

### 첫 바이트 시간
네트워크 및 서버 로드와 신서틱 관리형 위치 또는 [프라이빗 위치][5]와 서버 간 거리로 인해 첫 바이트 시간에 변형이 발생할 수 있습니다. 예를 들어 CDN을 사용할 수 없어 네트워크 로드나 트래픽 라우팅 크기가 커질수록 첫 바이트 타이밍 시간에 부정적인 영향을 미칩니다.

### 다운로드 시간
응답 크기 변화로 인해 다운로드 시간 변형이 생길 수 있습니다. 테스트 결과와 `synthetics.http.response.size` 메트릭에서 다운로드한 본문 크기를 확인할 수 있습니다.

네트워크 로드로 인한 변형이 발생할 경우 [네트워크 성능 모니터링][6]과 [신서틱 ICMP 테스트][7]를 사용해 잠재적인 병목 현상을 파악할 수 있습니다.

서버 로드로 인해 변형이 발생할 경우 [Datadog Agent][8]와 [통합][9]을 사용해 잠재적인 시간 지연을 파악할 수 있습니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/metrics/#api-tests
[2]: /ko/synthetics/api_tests/http_tests?tab=requestoptions#define-request
[3]: /ko/synthetics/private_locations/configuration#dns-configuration
[4]: /ko/synthetics/api_tests/dns_tests#define-request
[5]: /ko/synthetics/private_locations/?tab=docker#overview
[6]: /ko/network_monitoring/performance/#overview
[7]: /ko/synthetics/api_tests/icmp_tests/#overview
[8]: /ko/getting_started/agent/#overview
[9]: /ko/integrations/