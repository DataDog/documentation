---
aliases:
- /ko/synthetics/faq/clone-test/
further_reading:
- link: /synthetics/
  tag: 설명서
  text: 신서틱(Synthetic) 모니터링에 대해 알아보기
title: 신서틱 테스트 복제하기
---

## 개요

신서틱 테스트를 복제하려면 UI나 API 엔드포인트를 이용하세요.

## UI 사용

1. 신서틱 테스트에서 오른쪽에 있는 **Gear** 아이콘을 클릭하세요.
2. 드롭다운 메뉴에서 **Clone**을 클릭하세요.

{{< img src="synthetics/faq/clone-test.mp4" alt="신서틱 테스트 복제" video="true" width="90%" >}}

## API 사용

1. 관련 엔드포인트로 테스트 구성을 가져오세요. [API 테스트 가져오기][1] 또는 [브라우저 테스트 가져오기][2]를 참고하세요.
2. 필요한 수정을 하세요(URL이나 태그 변경 등).
3. 관련 엔드포인트로 업데이트한 테스트 구성을 보내세요. [API 테스트 생성][3]이나 [브라우저 테스트 생성][4]을 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/latest/synthetics/#get-an-api-test
[2]: /ko/api/latest/synthetics/#get-a-browser-test
[3]: /ko/api/latest/synthetics/#create-an-api-test
[4]: /ko/api/latest/synthetics/#create-a-browser-test