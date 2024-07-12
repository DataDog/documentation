---
further_reading:
- link: logs/log_configuration/attributes_naming_convention
  tag: 설명서
  text: 로그 관리의 표준 속성에 대해 알아보기
- link: /real_user_monitoring/browser/data_collected
  tag: 설명서
  text: RUM 브라우저용으로 수집된 데이터
- link: /tracing/trace_explorer/query_syntax/
  tag: 설명서
  text: 트레이스 탐색 방법 알아보기
kind: documentation
title: 스팬(span) 태그 시맨틱
---

## 개요

[Datadog 추적 라이브러리][1]는 다양한 라이브러리 계측을 위한 기본 지원을 제공합니다.
이러한 계측은 분산 시스템에서 논리적 작업 단위를 나타내는 스팬(span)을 생성합니다.
각 스팬(span) 은 [스팬(span) 태그][2]로 구성되어 시스템에서 발생하는 작업 단위에 대한 추가 정보를 제공합니다. 명명 규칙은 스팬(span) 이벤트에서 사용할 수 있는 이름과 내용을 설명합니다.

<div class="alert alert-info">모든 스팬(span) 태그 , 예약 속성 및 명명 규칙에 대한 종합적인 목록을 확인하려면 <a href="/standard-attributes/?product=애플리케이션 성능 모니터링(APM)">기본 표준 속성을 참조</a>하세요.</div>

## 스팬(span) 태그 이름 지정 규칙

시스템에서 일어나는 작업을 설명하는 스팬(span) 태그의 종류는 다양합니다. 예를 들어 다음 도메인을 설명하는 스팬(span) 태그 등이 있습니다:

- **예약됨**: 모든 스팬(span)에 항상 존재하는 속성입니다.
- **코어**: 사용된 계측 및 작업의 종류입니다.
- **네트워크 커뮤니케이션**: 네트워크 커뮤니케이션에 해당하는 작업 단위입니다.
- **HTTP 요청**: HTTP 클라이언트 및 서버 스팬(span)입니다.
- **데이터베이스**: 데이터베이스 스팬(span)입니다.
- **메시지 대기열**: 메시징 시스템 스팬(span)입니다.
- **원격 프로시저 호출**: 스팬(span)은 RMI 또는 gRPC와 같은 원격 프로시저 호출에 해당합니다.
- **오류**: 스팬(span)과 관련된 오류입니다.

자세한 내용은 [기본 표준 속성][6]을 참조하세요.

## 스팬(span) 태그 및 스팬(span) 속성

스팬(span) 태그 와 스팬(span) 속성은 비슷하지만 서로 다른 개념입니다:

- [스팬(span) 태그](#스팬(span)-태그)은 스팬(span)의 컨텍스트입니다.
- [스팬(span) 속성](#스팬(span)-attributes)은 스팬(span) 의 콘텐츠입니다.

### 스팬(span) 태그

스팬(span) 태그는 스팬에 대한 컨텍스트입니다.

- **호스팅 태그 **: `hostname`, `availability-zone`, `cluster-name`
- **컨테이너 태그 **: `container_name`, `kube_deployment`, `pod_name`

태그는 일반적으로 호스트, 컨테이너, 또는 서비스 카탈로그에서 가져온 태그와 같은 다른 데이터 소스에서 보강됩니다. 이러한 태그는 스팬(span) 에 추가되어 컨텍스트를 설명합니다. 예를 들어 태그에는 호스트와 컨테이너 속성 또는 스팬(span) 의 출처 또는 서비스 의 속성 또는 스팬(span) 의 출처가 설명될 수 있습니다.

Datadog에서 스팬(span) 태그를 찾으려면 트레이스 사이드 패널의 **인프라스트럭처** 탭 로 이동하세요:

{{< img src="/tracing/attributes/span-tags.png" alt="인프라스트럭처 탭의 스팬 태그입니다." style="width:100%;" >}}

### 스팬(span) 속성

스팬(span) 속성은 스팬(span)의 콘텐츠입니다. 예를 들면 다음과 같습니다.

- `http.url`
- `http.status_code`
- `error.message`

스팬(span) 속성을 쿼리로 변경하려면 `@` 문자 뒤에 속성 이름을 검색 상자에 입력합니다. 예를 들어 `@http.url`입니다.

Datadog에서 스팬(span) 속성을 찾으려면 트레이스 사이드 패널의 **정보** 탭 로 이동합니다:

{{< img src="/tracing/attributes/span-attributes.png" alt="정보 탭의 스팬 속성입니다." style="width:100%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/setup_overview/
[2]: /ko/glossary/#span-tag
[3]: https://opentelemetry.io/docs/reference/specification/trace/api/#spankind
[4]: /ko/tracing/setup_overview/configure_data_security/
[5]: /ko/tracing/trace_collection/library_config/
[6]: /ko/standard-attributes/?product=apm