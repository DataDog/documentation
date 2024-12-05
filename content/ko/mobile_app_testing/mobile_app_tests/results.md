---
aliases:
- /ko/mobile_testing/mobile_app_tests/results
description: 신서틱(Synthetic) 모바일 앱 테스트 결과를 확인하고 성공 또는 실패한 샘플 실행을 테스트와 비교하세요.
further_reading:
- link: /mobile_app_testing/mobile_app_tests/
  tag: 설명서
  text: 신서틱(Synthetic) 모바일 테스트에 대해 알아보기
- link: /service_management/events/explorer
  tag: 설명서
  text: 이벤트 탐색기에 대해 알아보기
title: 모바일 앱 테스트 결과
---

{{< site-region region="us,us5,eu" >}}
<div class="alert alert-warning">Mobile Application Testing은 일반적으로 US1, US5, EU 사이트에서 이용 가능합니다.</div>
{{< /site-region >}}

{{< site-region region="us3,ap1" >}}
<div class="alert alert-warning">모바일 애플리케이션 테스트는 이 사이트에서 지원되지 않습니다.</div>
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">모바일 애플리케이션 테스트는 이 사이트에서 지원되지 않습니다.</div>
{{< /site-region >}}

## 개요

[**Synthetic Tests** 페이지][11]에서 모바일 앱 테스트를 클릭하면 테스트 세부 정보 페이지를 볼 수 있습니다. 테스트 세부 정보 페이지에는 테스트 속성, 테스트 이력, 샘플 실행, 테스트 실행 등 테스트와 관련된 모든 정보가 포함되어 있습니다.

{{< img src="mobile_app_testing/test_details.png" alt="테스트 세부 정보 페이지" style="width=80%" >}}

신서틱(Synthetic) 모바일 앱 테스트가 실행된 후 테스트 세부 정보 페이지에 테스트 실행이 나타납니다. [샘플 결과](#sample-results)는 시간 간격, 특정 위치 및 디바이스 수에 따른 최신 테스트 실행의 성공 및 실패와 관련이 있습니다.

## 테스트 속성

**Properties** 섹션에서는 테스트 ID, 테스트 생성 및 편집 날짜, 테스트 우선 순위, 환경 태그 및 추가 태그를 확인할 수 있습니다.

**개요**
: 이 섹션에서는 모바일 애플리케이션, 버전, 위치, 장치 수, 테스트 간격, 테스트 단계 수를 포함한 신서틱(Synthetic) 테스트 세부 사항을 설명합니다.

**Monitor**
: [신서틱(Synthetic) 테스트 모니터][1]의 이름과 설정된 알림 메시지를 포함합니다.

**CI/CD Execution**
: 이 섹션은 [CI 파이프라인][3]의 일부로 실행되는 테스트의 [실행 규칙][2]을 변경하기 위한 드롭다운 메뉴를 포함합니다.

## 테스트 이력

**History** 섹션에서는 지정된 시간 간격 동안 모든 테스트 위치의 총 가동 시간을 표시하는 **Global Uptime** 그래프를 볼 수 있습니다. 전역 가동 시간은 테스트를 위해 구성된 [알림 조건][4]을 고려합니다.

{{< img src="mobile_app_testing/history.png" alt="이력 그래프에 전역 가동 시간 표시" style="width=80%" >}}

## 샘플 결과

모바일 앱 테스트 실행에는 [테스트 실패](#failed-results)를 해결하는 데 도움이 되는 [스크린샷](#screenshots-and-actions)과 같은 구성 요소가 포함됩니다.

**Sample Runs** 섹션에서는 최근에 실패한 테스트 실행을 검사하고 최근에 성공한 테스트 실행과 비교할 수 있습니다.

### 개요 속성

상태
: 테스트 실행 상태( `PASSED` 또는 `FAILED`).

시작 URL
: 모바일 앱 테스트 시나리오의 URL.

단계
: 샘플 실행에서 완료된 [테스트 단계][10]의 수.

기간
: 테스트를 실행하는 데 걸린 시간.

위치
: 테스트가 실행된 [관리되는][8] 또는 [개인 위치][9].

기기
: 테스트가 실행된 기기 유형.

실행 유형
: 테스트 실행 유형(CI, 수동 트리거 또는 예약).

### 스크린샷 및 액션

실행되는 모든 테스트 단계에는 단계 액션, 단계 액션 이름, 단계 ID 및 단계 기간의 스크린샷이 포함됩니다.

{{< img src="mobile_app_testing/screenshot-and-action.png" alt="테스트 세부 정보 Sample Runs 섹션의 스크린샷 및 액션" style="width=80%" >}}

## 실패한 결과

테스트 결과가 어설션을 충족하지 못하거나 다른 이유로 단계가 실패한 경우 `FAILED`로 간주됩니다. 스크린샷을 확인하고, 단계 수준에서 잠재적인 오류를 확인하며, 해당 단계에서 생성된 리소스를 조사하여 실패한 실행 문제를 해결할 수 있습니다.

일반적인 모바일 앱 테스트 오류는 다음과 같습니다:

`Element located but it's invisible`
: 요소가 페이지에 있지만 클릭할 수 없습니다. 예를 들어 다른 요소가 그 위에 겹쳐져 있는 경우입니다.

`Cannot locate element`
: XML에서 요소를 찾을 수 없습니다.

## 테스트 이벤트

신서틱(Synthetic) 테스트 모니터링의 경고는 **Test Runs** 아래의 **Events** 탭에 나타납니다. 이벤트 탐색기에서 신서틱(Synthetic) 테스트의 알림을 검색하려면 [**Events** > **Explorer**][7]로 이동하여 검색 쿼리에서`@evt.type:synthetics_alert`를 입력합니다. 자세한 내용은 [신서틱(Synthetic) 테스트 모니터링 사용][1]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/guide/synthetic-test-monitors/
[2]: /ko/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[3]: /ko/continuous_testing/cicd_integrations
[4]: /ko/mobile_app_testing/mobile_app_tests/#scheduling-and-alert
[5]: /ko/synthetics/guide/uptime-percentage-widget/
[6]: /ko/help
[7]: https://app.datadoghq.com/event/explorer
[8]: /ko/getting_started/synthetics/browser_test#select-locations
[9]: /ko/synthetics/private_locations
[10]: /ko/mobile_app_testing/mobile_app_tests/steps
[11]: https://app.datadoghq.com/synthetics/tests