---
further_reading:
- link: synthetics/browser_tests
  tag: 설명서
  text: 브라우저 테스트 설정
- link: /synthetics/api_tests/http_tests
  tag: 설명서
  text: HTTP 테스트 구성하기
title: 신서틱 테스트 중 캐시 문제 방지하기
---

## 개요

이 가이드에서는 신서틱 테스트를 사용할 때 캐싱 문제를 예방하는 방법을 설명합니다.

## API 테스트

### HTTP 테스트

[로컬 변수][1]를 활용해 무작위 문자열을 생성한 후 페이로드와 함께 전송해 [HTTP 테스트][2]가 캐싱 시스템을 사용하지 않도록 할 수 있습니다.

## 브라우저 테스트

각 테스트 실행 후에는 브라우저가 종료되기 때문에 브라우저 테스트를 하는 동안 클라이언트 측에 캐시 관련 문제가 발생하지 않습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/api_tests/http_tests?tab=requestoptions#create-local-variables
[2]: /ko/synthetics/api_tests/http_tests