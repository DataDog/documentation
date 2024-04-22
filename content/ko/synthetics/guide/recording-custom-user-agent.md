---
description: 브라우저 테스트 절차를 커스텀 User-Agent 스트링으로 기록하기
further_reading:
- link: /synthetics/browser_tests/actions
  tag: 설명서
  text: 브라우저 테스트 절차 알아보기
- link: /synthetics/browser_tests/advanced_options/
  tag: 설명서
  text: 절차의 고급 옵션 설정하기
kind: 설명서
title: 커스텀 User-Agent를 사용하여 단계 기록
---

## 개요

일부 통합은 애플리케이션이 특정 `User-Agent` 스트링을 사용할 때만(예: 모바일 `User-Agent`를 사용할 때만) 특정 방식으로 기록하도록 합니다. 이 경우에는 커스텀 스트링에 `User-Agent` 헤더를 설정해야 브라우저 테스트 절차를 애플리케이션에 기록할 수 있습니다. 그 방법은 다음과 같습니다.

1. 브라우저 테스트 레코더에서 **Open in Popup**을 클릭하여 팝업창에서 애플리케이션을 엽니다.
2. Chrome 개발 툴(Developer Tools)을 엽니다.
3. 말줄임표 기호로 표시된 메뉴 버튼을 클릭합니다.
4. **More tools - Network conditions** 옵션을 선택합니다.
5. **Network conditions** 탭으로 이동해 **Select automatically** 옵션을 비활성화합니다.
6. **Custom**을 선택하고 대상의 `User-Agent` 스트링을 입력합니다.

**참조:** 테스트 실행 시, 테스트 설정에 헤더로 추가하여 [기본 `User-Agent` 스트링][1]을 덮어쓸 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/guide/identify_synthetics_bots/?tab=apitests#default-headers