---
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: 블로그
  text: 실제 사용자 모니터링(RUM)
- link: /real_user_monitoring/explorer/
  tag: 설명서
  text: Datadog에서 보기 탐색
- link: /real_user_monitoring/explorer/visualize/
  tag: 설명서
  text: 이벤트에 시각화 적용
- link: /real_user_monitoring/platform/dashboards/
  tag: 설명서
  text: RUM 대시보드
kind: 설명서
title: 리소스 성능 모니터링
---

RUM Browser SDK는 모든 RUM 보기(페이지 로드)에 대한 리소스 및 자산을 수집합니다: [XMLHttpRequest][1](XHR) 및 Fetch 요청뿐만 아니라 이미지, CSS 파일, JavaScript 자산 및 글꼴 파일도 수집합니다. 각 리소스에 대해 자세한 타이밍과 메타데이터가 포함된 RUM 리소스 이벤트가 생성됩니다.

RUM 리소스는 수집 시점에 활성 RUM 보기와 관련된 모든 컨텍스트에서 상속됩니다.

## RUM 리소스를 APM 트레이스에 연결

요청이 스택의 여러 레이어를 이동할 때 요청에 대한 더욱 완벽한 엔드투엔드 가시성을 확보하려면 RUM 데이터를 해당 백엔드 트레이스와 연결하세요. 이를 통해 다음을 수행할 수 있습니다:

* 사용자가 직면하고 있는 오류를 초래한 백엔드 문제를 찾습니다.
* 스택 내 이슈로 인해 영향을 받는 사용자의 범위를 파악합니다.
* 플레임 그래프에서 전체 엔드투엔드 요청을 확인하여 정확한 컨텍스트와 함께 RUM과 APM 사이를 원활하게 탐색할 수 있습니다.

이 기능 설정에 대한 자세한 내용은 [RUM 및 트레이스 연결][2]을 참조하세요.

{{< img src="real_user_monitoring/browser/resource_performance_graph.png" alt="RUM 리소스에 대한 APM 트레이스 정보" >}}

## 리소스 타이밍 및 메트릭

리소스에 대한 자세한 네트워크 타이밍 데이터는 Fetch 및 XHR 네이티브 브라우저 메서드와 [성능 리소스 타이밍 API][3]에서 수집합니다.

| 속성                              | 유형           | 설명                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | 숫자         | 리소스를 로드하는 데 걸린 전체 시간.                                                                                                   |
| `resource.size`                | 숫자 (바이트) | 리소스 사이즈.                                                                                                                            |
| `resource.connect.duration`    | 숫자 (ns)    | 서버 연결 설정에 소요된 시간 (connectEnd - connectStart).                                                           |
| `resource.ssl.duration`        | 숫자 (ns)    | TLS 핸드셰이크에 소요된 시간. 마지막 요청이 HTTPS를 넘지 않으면 이 메트릭이 나타나지 않습니다 (connectEnd - secureConnectionStart).|
| `resource.dns.duration`        | 숫자 (ns)    | 마지막 요청의 DNS 이름을 확인하는 데 소요된 시간 (domainLookupEnd - domainLookupStart).                                              |
| `resource.redirect.duration`   | 숫자 (ns)    | 후속 HTTP 요청에 소요된 시간 (redirectEnd - redirectStart).                                                                     |
| `resource.first_byte.duration` | 숫자 (ns)    | 응답의 첫 번째 바이트가 수신될 때까지 기다린 시간 (responseStart - RequestStart).                                           |
| `resource.download.duration`   | 숫자 (ns)    | 응답을 다운로드하는 데 소요된 시간 (responseEnd - responseStart).                                                                        |

**참고**: 일부 리소스에 대한 자세한 타이밍을 수집하는 데 문제가 있는 경우 [리소스 타이밍 및 CORS](#resource-timing-and-cors)를 참조하세요.

## 리소스 속성

| 속성                      | 유형   | 설명                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `resource.type`                | 스트링 | 수집 중인 리소스 유형(예: `css`, `javascript`, `media`, `XHR`, `image`).           |
| `resource.method`                | 스트링 | HTTP 메서드 (예: `POST`, `GET`).           |
| `resource.status_code`             | 숫자 | 응답 상태 코드.                                                               |
| `resource.url`                     | 스트링 | 리소스 URL.                                                                       |
| `resource.url_host`        | 스트링 | URL의 호스트 부분.                                                          |
| `resource.url_path`        | 스트링 | URL의 경로 부분.                                                          |
| `resource.url_query` | 오브젝트 | URL의 쿼리 문자열 부분이 쿼리 파라미터 키/값 속성으로 분해됩니다. |
| `resource.url_scheme`      | 스트링 | URL의 프로토콜 이름(HTTP 또는 HTTPS).                                            |
| `resource.provider.name`      | 스트링 | 리소스 공급자 이름. 기본값은 `unknown`.                                            |
| `resource.provider.domain`      | 스트링 | 리소스 공급자 도메인.                                            |
| `resource.provider.type`      | 스트링 | 리소스 공급자 유형 (예: `first-party`, `cdn`, `ad`, `analytics`).                                            |

## 타사 리소스 확인 

RUM은 리소스 URL 호스트 부분에서 리소스 공급자의 이름과 카테고리를 추론합니다. 리소스 URL 호스트가 현재 페이지 URL 호스트와 일치하면 카테고리는 `first party`로 설정됩니다. 그렇지 않으면 카테고리는 예를 들어 `cdn`, `analytics`, `social`가 됩니다.

## 리소스 타이밍 및 CORS

[리소스 타이밍 API][3]는 RUM 리소스 타이밍을 수집하는 데 사용됩니다. 브라우저에서 스크립트에 적용하는 크로스 오리진 보안 제한의 적용을 받습니다. 예를 들어 웹 애플리케이션이 `www.example.com`에 호스팅되어 있고 이미지를 `images.example.com`를 통해 로딩하는 경우 기본적으로 `www.example.com`에 호스팅된 리소스에 대한 타이밍만 얻게 됩니다.

이 문제를 해결하려면 크로스 오리진 리소스에 `Timing-Allow-Origin` HTTP 응답 헤더를 추가하여 CORS가 적용되는 리소스에 대한 확장 데이터 수집을 활성화하세요. 예를 들어 모든 오리진에 리소스 타이밍에 대한 액세스 권한을 부여하려면 `Timing-Allow-Origin: *`을 사용합니다. CORS에 대한 자세한 내용은 [MDN 웹 문서][4]에서 확인하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[2]: /ko/real_user_monitoring/platform/connect_rum_and_traces
[3]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[4]: https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API#Coping_with_CORS