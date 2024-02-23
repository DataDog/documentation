---
description: 오류 추적 탐색기에 대해 알아보세요.
further_reading:
- link: /monitors/types/error_tracking
  tag: 설명서
  text: 오류 추적 모니터에 대해 알아보세요.
- link: /real_user_monitoring/error_tracking
  tag: 설명서
  text: RUM을 위한 오류 추적에 대해 알아보세요.
kind: 설명서
title: 오류 추적 탐색기
---

## 개요

{{< img src="real_user_monitoring/error_tracking/rum_error_tracking.png" alt="웹 및 모바일 애플리케이션의 충돌 보고서에서 문제를 표시하는 RUM용 오류 추적 탐색기" style="width:100%;" >}}

오류 추적 탐색기를 사용하면 다양한 문제를 모두 탐색할 수 있습니다. 이슈는 동일한 버그와 관련된 유사한 오류의 그룹입니다. Datadog은 오류 유형, 오류 메시지 또는 스택 트레이스와 같은 일부 속성을 사용하여 각 오류에 대한 지문(fingerprint)을 계산해 이슈를 생성합니다. 동일한 지문(fingerprint)을 가진 오류는 동일한 이슈에 함께 그룹화됩니다.

## 문제 탐색하기

오류 추적 탐색기에 나열된 각 항목은 이슈이며 다음을 포함하여 오류에 대한 높은 수준의 정보를 포함합니다:

-   오류 유형 및 오류 메시지
-   기본 오류가 발생하는 파일의 경로
-   이슈의 지속 시간에 대한 중요 정보:
    -   처음 및 마지막으로 본 시점
    -   시간 경과에 따른 발생 그래프
    -   선택한 기간 동안 발생한 횟수


### 시간 범위

{{< img src="real_user_monitoring/error_tracking/time_range.png" alt="오류 추적 시간 범위" style="width:80%;" >}}

시간 범위는 탐색기 오른쪽 상단에 타임라인으로 표시됩니다. 이 기능을 사용하면 선택한 기간 내에 오류가 발생한 이슈를 표시할 수 있습니다. 드롭다운에서 미리 설정된 범위를 선택하여 시간 범위를 변경할 수 있습니다.

### 패싯

{{< img src="real_user_monitoring/error_tracking/facets_panel.png" alt="오류 추적 패싯" style="width:100%;" >}}

오류 추적은 이슈에서 미리 정의된 속성 목록을 자동으로 인덱싱하고 이 목록에서 패싯을 만듭니다. 패싯은 선택한 기간 동안 속성의 모든 고유 멤버를 표시하고 표시된 이슈 수와 같은 몇 가지 기본 분석을 제공합니다. 패싯을 사용하면 지정된 속성을 기준으로 이슈를 피벗하거나 필터링할 수 있습니다.

## 이슈 검사

이슈를 클릭하면 이슈 패널이 열리고 해당 이슈에 대한 자세한 정보를 확인할 수 있습니다.

{{< img src="real_user_monitoring/error_tracking/issue_summary.png" alt="문제에 대한 요약 보기를 제공하는 오류 추적 이슈 패널의 상단 부분" style="width:80%;" >}}

문제를 해결할 때 필요한 높은 수준의 세부 정보는 패널 상단에서 찾을 수 있습니다. 여기에서 특정 이슈의 최초 및 마지막 발생 날짜, 총 횟수, 시간 경과에 따른 횟수 등 수명 주기를 이해할 수 있습니다.

{{< img src="real_user_monitoring/error_tracking/error_sample.png" alt="오류 샘플을 제공하는 오류 추적 이슈 패널의 하단 부분" style="width:80%;" >}}

이슈 패널의 하단 부분에서 관련 이슈의 오류 샘플을 검색할 수 있습니다. 각 오류 샘플은 문제를 해결하는 동안 다음과 같은 정보를 제공합니다.

-   각 스택 프레임이 오류를 발생시킨 코드 줄을 중심으로 코드 스니펫을 제공하는 스택 트레이스입니다.
-   RUM SDK에서 실제로 수집한 경우 오류가 발생한 RUM 세션에 대한 정보입니다.
-   오류 발생 시 사용된 관련 버전이 있는 브라우저 또는 OS 등 사용자에 대한 정보입니다.

## 새로운 오류 발생 시 알림 받기

새로운 문제가 발생하는 즉시 확인하면 문제가 심각해지기 전에 확인하고 수정할 수 있습니다. 오류 추적은 특정 서비스 및 환경에서 문제가 처음 나타날 마다 [Datadog 이벤트][1]를 생성하고, 그 결과 [이벤트 모니터][2]를 구성하여 알림을 받을 수 있도록 합니다.

생성된 각 이벤트에는 버전, 서비스 및 환경에 태그가 지정되어 알림을 받고자 하는 이슈를 세밀하게 제어할 수 있습니다. 탐색기에서 검색 쿼리를 직접 내보내 관련 범위에 대한 이벤트 모니터를 만들 수 있습니다:

{{< img src="real_user_monitoring/error_tracking/export_to_monitor.mp4" alt="검색 쿼리를 오류 추적 모니터로 내보내기" video=true >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/events
[2]: /ko/monitors/types/event/