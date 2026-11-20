---
description: 사용자 지정 User-Agent 문자열로 브라우저 테스트 단계 기록
further_reading:
- link: /synthetics/browser_tests/test_steps
  tag: 설명서
  text: 브라우저 테스트 단계에 대해 알아보기
- link: /synthetics/browser_tests/advanced_options/
  tag: 설명서
  text: 단계의 고급 옵션 구성
title: 사용자 지정 User-Agent로 단계 기록
---
## 개요 {#overview}

일부 구현에서는 특정 `User-Agent` 문자열을 사용할 때만 애플리케이션이 특정 방식으로 렌더링되도록 합니다(예: 모바일 `User-Agent`을 사용할 때). 이러한 경우, 애플리케이션에서 브라우저 테스트 단계를 기록할 수 있도록 `User-Agent` 헤더를 사용자 지정 문자열로 설정해야 합니다. 설정 방법은 다음과 같습니다.

1. 브라우저 테스트 레코더에서 {{< ui >}}Open in Popup{{< /ui >}}을 클릭하여 팝업으로 애플리케이션을 엽니다.
2. Chrome Developer Tools를 엽니다.
3. 세로로 배열된 점 3개가 있는 메뉴 버튼을 클릭합니다.
4. {{< ui >}}More tools - Network conditions{{< /ui >}} 옵션을 선택합니다.
5. {{< ui >}}Network conditions{{< /ui >}} 탭으로 이동하여 {{< ui >}}Select automatically{{< /ui >}} 옵션을 비활성화합니다.
6. {{< ui >}}Custom{{< /ui >}}을 선택하고 원하는 `User-Agent` 문자열을 입력합니다.

**참고:** 테스트 구성에 헤더로 추가하여 테스트 실행 시 [기본 `User-Agent` 문자열][1]을 재정의할 수 있습니다. 

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/guide/identify_synthetics_bots/?tab=browsertests#user-agent