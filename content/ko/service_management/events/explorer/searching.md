---
further_reading:
- link: logs/explorer/search_syntax
  tag: 설명서
  text: 로그 검색 구문
kind: 설명서
title: 구문 검색
---

## 개요

이벤트 검색 시 [로그 검색 구문][1]을 사용합니다. 로그 검색과 마찬가지로 이벤트 검색에 다음을 사용할 수 있습니다.

- `AND`, `OR`, `-` 연산자
- 와일드카드
- 이스케이프 문자
- `key:value`가 있는 태그 및 패싯 검색
- `@` 접두사가 있는 속성 내 검색

## 쿼리 예시

`source:(github OR chef)`
: GitHub OR Chef의 이벤트를 표시합니다.

`host:(i-0ade23e6 AND db.myapp.com)`
: `i-0ade23e6` AND `db.myapp.com`의 이벤트를 표시합니다.

`service:kafka`
: `kafka` 서비스의 이벤트를 표시합니다.

`status:error`
: `error` 상태의 이벤트를 표시합니다(지원 대상: `error`, `warning`, `info`, `ok`).

`availability-zone:us-east-1a`
: `us-east-1a` AWS 사용 가능 영역(AZ)의 이벤트를 표시합니다.

`container_id:foo*`
: `foo`로 시작하는 ID가 있는 모든 컨테이너의 이벤트를 표시합니다.

`@evt.name:foo`
: `evt.name` 속성이 `foo`와 동일한 이벤트를 표시합니다.

자세한 내용은 [로그 검색 구문][1]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/explorer/search_syntax/