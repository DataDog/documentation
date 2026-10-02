---
aliases:
- /ko/service_management/events/explorer/searching/
further_reading:
- link: /getting_started/search/
  tag: 문서
  text: Datadog에서 검색 시작하기
- link: logs/explorer/search_syntax
  tag: 문서
  text: 로그 검색 구문
title: 검색 구문
---
## 개요 {#overview}

이벤트 검색은 [로그 검색 구문][1]을 사용합니다. 로그 검색과 마찬가지로 이벤트 검색은 다음을 허용합니다.

- `AND`, `OR` 및 `-` 연산자
- 와일드카드
- 이스케이프 문자
- `key:value`를 사용한 태그 및 패싯 검색
- `@` 접두사를 사용한 속성 내 검색

## 쿼리 예시 {#example-queries}

`source:(github OR chef)`
: GitHub 또는 Chef의 이벤트를 표시합니다.

`host:(i-0ade23e6 AND db.myapp.com)`
: `i-0ade23e6` 및 `db.myapp.com`의 이벤트를 표시합니다.

`service:kafka`
: `kafka` 서비스의 이벤트를 표시합니다.

`status:error`
: `error` 상태인 이벤트를 표시합니다(: `emergency`, `alert`, `critical`, `error`, `warn`, `notice`, `info`, `debug`, `ok` 지원).

`availability-zone:us-east-1a`
: `us-east-1a` AWS 가용 영역(AZ)의 이벤트를 표시합니다.

`container_id:foo*`
: ID가 `foo`로 시작하는 모든 컨테이너의 이벤트를 표시합니다.

`@evt.name:foo`
: `evt.name` 속성이 `foo`와 같은 이벤트를 표시합니다.

자세한 내용은 [로그 검색 구문][1]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/explorer/search_syntax/