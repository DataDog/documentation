---
aliases:
- /ko/synthetics/dashboards/testing_coverage
- /ko/synthetics/test_coverage
description: 브라우저 액션에 대한 테스트 모음 적용 범위 평가
further_reading:
- link: https://www.datadoghq.com/blog/test-coverage-monitoring-datadog/
  tag: 블로그
  text: Datadog RUM 및 Synthetic Monitoring으로 테스트 적용 범위 추적하기
- link: /synthetics/browser_tests
  tag: 설명서
  text: Synthetic 브라우저 테스트 알아보기
- link: /real_user_monitoring/application_monitoring/browser/tracking_user_actions
  tag: 설명서
  text: RUM 액션에 대해 알아보기
- link: /real_user_monitoring/session_replay
  tag: 설명서
  text: Session Replay에 대해 알아보기
title: 테스트 적용 범위
---
## 개요 {#overview}

{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Synthetic Monitoring & Testing{{< /ui >}}에서 찾을 수 있는 [{{< ui >}}Test Coverage{{< /ui >}} 페이지][1]에서 RUM 브라우저 액션에 대한 테스트 모음의 Synthetic 테스트 적용 범위를 살펴보세요.

[{{< ui >}}Test Coverage{{< /ui >}} 페이지][1]는 [RUM 애플리케이션][2]의 전반적인 테스트 적용 범위에 대한 실행 가능한 인사이트를 제공합니다. [Browser RUM SDK에서 수집된 데이터][3]와 [Synthetic 브라우저 테스트 결과][4]를 사용합니다.

{{< img src="synthetics/test_coverage/browser_actions.png" alt="개요 섹션, 테스트되지 않은 액션 섹션, 테스트된 액션 섹션이 있는 테스트 적용 범위 페이지" style="width:100%" >}}

테스트 적용 범위 페이지에는 다음 정보가 표시됩니다.

- 가장 많이 방문한 웹 페이지
- 테스트된 [RUM 액션][5]의 비율
- 테스트된 액션 수와 총 액션 수
- 액션을 다루는 브라우저 테스트 수
- 실제 사용자 인터랙션 수 

## 애플리케이션 또는 뷰의 테스트 적용 범위 조사 {#investigate-test-coverage-for-an-application-or-view}

테스트되지 않은 액션을 식별하고 테스트 적용 범위 페이지에서 실제 사용자 인터랙션과 연결하여 보다 포괄적이고 정확한 테스트 모음을 구축할 수 있습니다. 

브라우저 테스트를 생성해야 하는 애플리케이션 또는 뷰의 영역을 식별하려면 다음을 수행하세요.

1. {{< ui >}}Application{{< /ui >}} 드롭다운 메뉴에서 RUM 애플리케이션을 선택하거나 {{< ui >}}View Name{{< /ui >}} 드롭다운 메뉴에서 뷰를 선택합니다. 
2. {{< ui >}}Custom{{< /ui >}}을 클릭하여 [커스텀 액션][5]에 대한 데이터를 필터링합니다. 커스텀 액션은 고유하며 생성된 액션보다 더 정확한 적용 범위 결과를 제공합니다. 테스트 적용 범위 분석에 생성된 액션을 포함하려면 {{< ui >}}All Actions{{< /ui >}}을 선택합니다.
3. 다음 섹션에 제시된 정보를 검토하여 테스트 적용 범위의 허점을 식별합니다. 

   {{< ui >}}Test Coverage Overview{{< /ui >}} 
   : 테스트 중인 액션의 백분율, 실제 사용자 인터랙션 수에 따라 가중치가 부여된 테스트 중인 액션의 백분율, 사용자 세션 및 브라우저 테스트 수가 포함된 상위 뷰 목록, 테스트 중인 액션의 백분율을 표시합니다. 

   {{< ui >}}Untested Actions{{< /ui >}}
   : 테스트되지 않은 사용자 액션 수, 수집된 총 액션 수, 실제 사용자가 가장 많이 상호 작용하지만 _테스트되지 않은_ 상위 액션 목록을 표시합니다.

   {{< ui >}}Tested Actions{{< /ui >}}
   : 사용자 액션을 다루는 브라우저 테스트 수, 실제 사용자 인터랙션 수, 실제 사용자가 가장 많이 상호 작용하고 _테스트 중인_ 상위 액션 목록을 표시합니다. 

[테스트 적용 범위 페이지][1]는 자주 사용되는 액션을 표시하고 애플리케이션에서 덜 자주 사용되는 액션은 숨깁니다. 표시되는 데이터에 대한 자세한 정보는 [Synthetic Monitoring 메트릭][6]을 참조하세요.

## Session Replay 조회 및 테스트 추가 {#view-replays-and-add-tests}

다음 질문에 대한 답변은 [테스트 적용 범위 페이지][1]에서 확인할 수 있습니다.

- 애플리케이션에서 테스트되지 않는 액션은 무엇입니까?
- 사용자들에게 가장 인기 있는 뷰는 무엇입니까? 
- 브라우저 테스트가 더 필요한 액션은 무엇입니까?
- 사용자 액션을 다루는 브라우저 테스트의 비율은 얼마입니까? 

### Session Replay 조회 {#view-session-replays}

{{< ui >}}Untested Actions{{< /ui >}} 표에서 액션 옆의 {{< ui >}}Play{{< /ui >}} 아이콘을 클릭하여 [Session Replay][8]에서 [실제 사용자 인터랙션 기록][7]을 확인합니다. 

### 액션 조사 {#examine-actions}

액션을 클릭하면 선택한 액션이 포함된 테스트, 뷰, 세션 및 이에 대한 하위 집합에 액세스할 수 있습니다. 

{{< img src="synthetics/test_coverage/tested_action.png" alt="관련 Synthetic 테스트, RUM 뷰 및 Session Replay를 표시하는 탭이 있는 액션 사이드 패널" style="width:100%" >}}

애플리케이션의 주요 사용자 여정이 코드로 인해 부정적인 영향을 받을 때 알림을 받으려면 애플리케이션의 가장 인기 있는 섹션을 새 브라우저 테스트 또는 기존 브라우저 테스트에 추가하세요.

 테스트를 생성하려면 [테스트 적용 범위 페이지][1] 오른쪽 상단에 있는 {{< ui >}}+ New Test{{< /ui >}}를 클릭합니다. 코드를 프로덕션에 릴리스하기 전에 회귀가 발생하지 않도록 [CI/CD 파이프라인에서 직접][9] 테스트를 실행할 수 있습니다.  

[1]: https://app.datadoghq.com/synthetics/test-coverage/browser
[2]: /ko/synthetics/guide/explore-rum-through-synthetics/
[3]: /ko/real_user_monitoring/application_monitoring/browser/data_collected/
[4]: /ko/synthetics/browser_tests/
[5]: /ko/real_user_monitoring/guide/send-rum-custom-actions/
[6]: /ko/synthetics/metrics/
[7]: /ko/session_replay/
[8]: https://app.datadoghq.com/rum/explorer/
[9]: /ko/continuous_testing/

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/test-coverage/browser