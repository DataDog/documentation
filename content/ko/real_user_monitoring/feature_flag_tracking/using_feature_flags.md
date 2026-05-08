---
aliases:
- /ko/real_user_monitoring/guide/getting-started-feature-flags/
- /ko/real_user_monitoring/guide/setup-feature-flag-data-collection/
beta: true
description: 기능 플래그의 상태와 사용량을 파악하세요.
disable_toc: false
further_reading:
- link: /real_user_monitoring/guide/setup-feature-flag-data-collection/
  tag: 설명서
  text: 기능 플래그 데이터 수집 설정
- link: /real_user_monitoring/explorer/
  tag: 설명서
  text: RUM Explorer에 대해 자세히 알아보기
- link: https://www.datadoghq.com/blog/feature-flag-tracking/
  tag: 블로그
  text: Datadog RUM의 기능 플래그 추적을 통해 릴리스 안전성 보장
title: 기능 플래그 사용
---

기능 플래그 데이터 수집을 설정한 후 RUM 내의 [**Feature Flags**][1] 탭으로 이동합니다.

이 보기에서 기능 플래그의 상태 및 사용에 대해 궁금한 점을 조사할 수 있습니다.
- 각 변형을 경험하는 사용자 수를 모니터링하고 기능 플래그의 요약 통계를 확인하세요.
- 코드 정리를 위해 제거할 수 있는 기능 플래그가 있는지 확인하려면 기능 플래그의 [상태](#feature-flag-status)를 확인하세요.
- 해당 기능 플래그가 어떤 페이지를 대상으로 평가되는지 확인하세요.

기능 플래그는 평가되는 이벤트의 컨텍스트에 표시되며, 이는 기능 플래그 코드 로직이 실행되는 보기에 표시되어야 함을 의미합니다.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-2.png" alt="기능 플래그 목록을 통해 기능 플래그의 상태 및 사용법을 자세히 파악하세요" style="width:90%;" >}}

## 검색 및 필터링
검색창에 입력하여 기능 플래그를 검색하고 필터링하세요. 패싯 검색을 사용하여 관심 있는 기능 플래그의 하위 집합으로 범위를 좁히거나, 넓히거나, 초점을 이동할 수도 있습니다.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-search-filter.png" alt="기능 플래그 목록 검색창 및 필터링" style="width:90%;" >}}

## 기능 플래그 상태
세 가지의 기능 플래그 상태가 있습니다.

Active
: 해당 기능 플래그는 지난 2주 동안 다양한 변형을 평가했습니다.

Inactive
: 지난 2주 동안 컨트롤 변형의 기능 플래그 평가만 이루어졌습니다.

Out to 100%
: 지난 2주 동안 _컨트롤이 아닌_ 변형 중 하나에 관해서만 기능 플래그 평가가 이루어졌습니다.


## 기능 플래그 분석
기능 플래그의 상태 및 성능에 관한 자세한 내용을 보려면 목록에서 플래그를 클릭하여 전용 Feature Flag 분석 대시보드로 이동하세요. Feature Flag 분석 대시보드는 기능 플래그 성능에 관한 개요를 제공하며, 사용자 세션, Core Web Vitals 변화, 오류율 등의 정보를 표시합니다.

이 기본 제공 그래프는 플래그 변형에 걸쳐 집계되므로 심각한 문제로 발전하기 전에 기능 릴리스의 문제를 쉽게 발견할 수 있습니다. 이 대시보드는 기능 릴리스를 쉽게 모니터링할 수 있는 방법을 제공하며, 문제를 발견하는 즉시 신속하게 롤백하여 부정적인 사용자 경험을 방지할 수 있습니다.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-details-page.mp4" alt="기능 플래그 세부 정보 페이지 - 사용자 개요" video=true width=90% >}}

- **Users** 탭은 기능 플래그의 주요 요약 통계를 제공하며, 각 기능 플래그 변형을 확인하는 사용자를 모든 속성별로 심층 분석할 수 있도록 합니다. 특정 변형을 경험한 사람과 다른 변형을 경험한 사람의 경험을 비교하려면 각 사례의 [Session Replay][2]를 시청할 수 있습니다.

- **Issues** 탭에서는 기능 플래그가 적용된 사용자 세션에서 발생하는 애플리케이션 오류를 확인할 수 있습니다. [Error Tracking][3]에서 감지된 문제가 기능 플래그의 특정 변형에서 발생했는지, 변경 사항과 관련이 있는지 확인하세요.

- **Performance**탭을 사용하면 기능 플래그 변형 중 하나가 성능 저하를 초래했는지 파악할 수 있습니다. 각 변형에 대한 Core Web Vitals와 로딩 시간을 확인하여 변형 중 하나가 애플리케이션의 성능에 부정적인 영향을 미쳤는지 확인할 수 있습니다.

## RUM 탐색기를 사용하여 기능 플래그 데이터에서 커스텀 보기 구축
[RUM Explorer][4]에서 RUM이 수집한 모든 데이터를 검색하여 기능 플래그의 추세를 파악하고, 더 큰 맥락에서 패턴을 분석하거나 [대시보드][5] 및 [모니터][6]로 내보낼 수 있습니다.

RUM 탐색기에서 세션, 보기 또는 오류를 검색할 수 있으며, `@feature_flags.{flag_name}` 속성을 사용하여 범위를 좁혀 사용자에게 특정 사용자 경험이 표시된 이벤트에 집중할 수 있습니다.

쿼리를 `@feature_flags.{flag_name}`으로 그룹화하여 나와 팀에게 중요한 메트릭을 비교할 수 있습니다. 예를 들어,  새로운 체크아웃 플로우가 체크아웃 페이지에서 사용자가 구매할 때까지의 전환율에 어떤 영향을 미치는지 알고 싶다면 전환율 그래프에 "Group by"를 추가할 수 있습니다.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-rum-explorer.png" alt="기능 플래그 목록 검색창 및 필터링" style="width:90%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/feature-flags
[2]: /ko/real_user_monitoring/session_replay/browser/
[3]: /ko/real_user_monitoring/error_tracking/explorer/#explore-your-issues
[4]: https://app.datadoghq.com/rum/explorer
[5]: /ko/dashboards/
[6]: /ko/monitors/#create-monitors