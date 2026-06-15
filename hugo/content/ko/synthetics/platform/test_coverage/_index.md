---
aliases:
- /ko/synthetics/dashboards/testing_coverage
- /ko/synthetics/test_coverage
description: 브라우저 액션 및 API 엔드포인트에 대한 테스트 스위트의 커버리지를 평가하세요.
further_reading:
- link: https://www.datadoghq.com/blog/test-coverage-monitoring-datadog/
  tag: 블로그
  text: Datadog RUM 및 신서틱(Synthetic) 모니터링으로 테스트 커버리지를 추적하세요.
- link: https://www.datadoghq.com/blog/api-test-coverage-monitoring-datadog-synthetics/
  tag: 블로그
  text: Datadog 신서틱(Synthetic) 모니터링을 사용해 API 테스트 범위  개선
- link: /synthetics/browser_tests
  tag: 설명서
  text: 신서틱(Synthetic) 브라우저 테스트 알아보기
- link: /real_user_monitoring/browser/tracking_user_actions
  tag: 설명서
  text: RUM 액션에 대해 알아보기
- link: /real_user_monitoring/session_replay
  tag: 설명서
  text: 세션 재생에 대해 알아보기
- link: /api_catalog
  tag: 설명서
  text: API Catalog에 대해 알아보기
title: 테스트 지원 범위
---

## 개요

**Digital Experience** > **Synthetic Monitoring & Testing**에서 찾을 수 있는 [**Test Coverage**페이지][1]에서 RUM 브라우저 액션 또는 API 엔드포인트에 대한 테스트 스위트의 신서틱(Synthetic) 테스트 커버리지를 살펴보세요.

{{< tabs >}}
{{% tab "Browser Actions" %}}
[**Test Coverage**페이지][1]는 [RUM 애플리케이션][2]의 전체 테스트 커버리지에 대한 실제적인 인사이트를 제공합니다. 이를 위해 [Browser RUM SDK에서 수집된 데이터][3] 및 [신서틱(Synthetic) 브라우저 테스트 결과][4]를 사용합니다.

{{< img src="synthetics/test_coverage/browser_actions.png" alt="Overview 섹션, Untested Actions 섹션 및  Tested Actions 섹션이 있는 Test Coverage 페이지" style="width:100%" >}}

Test Coverage 페이지에는 다음 정보가 표시됩니다.

- 가장 많이 방문한 웹페이지
- 테스트된 [RUM 액션]의 비율[5]
- 테스트된 액션 수 및 총 액션 수
- 액션을 다루는 브라우저 테스트 수
- 실제 사용자 인터랙션 수

## 애플리케이션 또는 뷰에 대한 테스트 커버리지 조사

테스트되지 않은 액션을 식별하고 Test Coverage 페이지에서 실제 사용자 인터랙션과 연결하여 보다 포괄적이고 정확한 테스트 스위트를 구축할 수 있습니다.

브라우저 테스트를 생성해야 하는 애플리케이션 또는 뷰의 영역을 식별하려면 다음을 수행하세요.

1. **Application** 드롭다운 메뉴에서 RUM 애플리케이션을 선택하거나 **View Name** 드롭다운 메뉴에서 뷰를 선택합니다.
2. **Custom**을 클릭하면 생성된 액션보다 더 고유하고 정확한 커버리지 결과를 제공하는 [커스텀 액션][5]에 대한 데이터를 필터링할 수 있습니다. 테스트 커버리지 분석에 생성된 액션을 포함하려면 **All Actions**를 선택합니다.
3. 다음 섹션에 제시된 정보를 검토하여 테스트 커버리지의 차이를 식별하세요.

   **Test Coverage Overview** 
   : 테스트 중인 액션의 백분율, 실제 사용자 인터랙션 수에 따라 가중치가 부여된 테스트 중인 액션의 백분율, 사용자 세션 및 브라우저 테스트 수가 포함된 상위 뷰 목록, 테스트 중인 액션의 백분율을 표시합니다.

   **Untested Actions**
   : 테스트되지 않은 사용자 액션 수, 수집된 총 액션 수, 실제 사용자가 가장 많이 상호 작용하지만 테스트되지 _않은_ 상위 액션 목록을 표시합니다.

   **Tested Actions**
   : 사용자 액션을 다루는 브라우저 테스트 수, 실제 사용자 인터랙션 수, 실제 사용자가 가장 많이 상호 작용하고 _테스트 중인_ 상위 액션 목록을 표시합니다.

 [Test Coverage 페이지][1]는 광범위하게 사용되는 액션을 채우고 애플리케이션에서 덜 사용되는 액션을 숨깁니다. 표시되는 데이터에 대한 자세한 내용은 [신서틱(Synthetic) 모니터링 메트릭][6]를 참조하세요.

## 세션 재생 확인 및 테스트 추가

다음 질문에 대한 답변은 [Test Coverage 페이지][1]에서 확인할 수 있습니다.

- 애플리케이션에서 테스트되지 않는 작업은 무엇인가요?
- 사용자들에게 가장 인기 있는 뷰는 무엇인가요? 
- 브라우저 테스트가 더 필요한 액션은 무엇인가요?
- 사용자 액션을 다루는 브라우저 테스트의 비율은 얼마나 되나요?

### 세션 재생 보기

 **Untested Actions** 테이블의 액션 옆에 있는 **Play** 아이콘을 클릭하여 [Session Replay][8]의 [실제 사용자 인터랙션 기록][7]을 확인합니다.

### 액션 조사하기

액션을 클릭하면 선택한 액션이 포함된 테스트, 뷰, 세션 및 이에 대한 하위 집합에 액세스할 수 있습니다. 

{{< img src="synthetics/test_coverage/tested_action.png" alt="관련 신서틱(Synthetic) 테스트, RUM 뷰, 세션 재생을 표시하는 탭이 있는 액션 사이드 패널" style="width:100%" >}}

애플리케이션의 주요 사용자 여정이 코드로 인해 부정적인 영향을 받을 때 알림을 받으려면 애플리케이션의 가장 인기 있는 섹션을 새 브라우저 테스트 또는 기존 브라우저 테스트에 추가하세요.

테스트를 생성하려면  [Test Coverage 페이지][1]오른쪽 상단에 있는 **+ New Test**를 클릭합니다. 프로덕션 환경에서 코드를 출시하기 전에 회귀가 발생하지 않도록 [CI/CD 파이프라인에서 직접][9] 테스트를 실행할 수 있습니다.

[1]: https://app.datadoghq.com/synthetics/test-coverage/browser
[2]: /ko/synthetics/guide/explore-rum-through-synthetics/
[3]: /ko/real_user_monitoring/browser/data_collected/
[4]: /ko/synthetics/browser_tests/
[5]: /ko/real_user_monitoring/guide/send-rum-custom-actions/
[6]: /ko/synthetics/metrics/
[7]: /ko/real_user_monitoring/session_replay/browser/
[8]: https://app.datadoghq.com/rum/explorer/
[9]: /ko/continuous_testing/

{{% /tab %}}
{{% tab "API Endpoints" %}}

[**Test Coverage**  페이지][1]는 [API 엔드포인트][2]의 전체 테스트 커버리지에 대한 실제적인 인사이트를 제공합니다. 이를 위해 [API Catalog에서 수집된 데이터][2] 및 [APM의 스팬][3]을 사용합니다.

{{< img src="synthetics/test_coverage/api_endpoints.png" alt="Overview 섹션, Untested Actions 섹션, Tested Actions 섹션이 있는 Test Coverage 페이지" style="width:100%" >}}

Test Coverage 페이지에는 다음 정보가 표시됩니다.

- API 엔드포인트의 전체 커버리지
- 테스트된 API 엔드포인트의 비율
- 요청 수가 가장 많으며 테스트되지 않은 API 엔드포인트 수(오류율 기준으로 정렬)
- CI에서 테스트되지 않은 API 테스트를 포함하는 테스트된 API 엔드포인트의 비율
- [APM 모니터][4]가 있는 테스트되지 않은 API 엔드포인트의 수

## API 엔드포인트에 대한 테스트 커버리지 조사

신서틱(Synthetic) 테스트가 실패하고 API 엔드포인트의 성능이 저하되는 문제를 해결하여 포괄적이고 정확한 테스트 스위트를 유지하세요.

API 테스트를 생성해야 하는 테스트 스위트 영역을 식별하려면 다음을 수행하세요.

1.  **API overall coverage** 섹션에서 **Untested** 체크박스를 클릭합니다. 
2. 엔드포인트 사이드 패널을 조사하여 엔드포인트에 대해 생성된 모든 통과 또는 실패 테스트를 확인합니다. **Dependency Map**에는 엔드포인트 성능 저하의 원인이 될 수 있는 업스트림 문제와 영향을 받는 다운스트림 종속성이 표시됩니다.
3. 다음 섹션에 제시된 정보를 검토하여 API 테스트 커버리지의 차이를 식별하세요.

   **API Overall Coverage** 
   : 태그 범위 내에서 테스트되지 않은 모든 엔드포인트를 표시합니다.

   **Performance**
   : 가장 참여도가 높고 테스트되지 않은 엔드포인트 중 오류율이 높은 엔드포인트를 표시합니다.

   **Tested in the CI**
   : CI 파이프라인에서 현재 테스트 중인 엔드포인트를 표시합니다.

   **APM Monitors**
   : 테스트되지 않았지만 활성 모니터가 있는 엔드포인트를 표시합니다.

표시되는 데이터에 대한 자세한 내용은 [APM 메트릭][5]을 참조하세요.

## 테스트 추가하기

테스트를 생성하려면 [Test Coverage 페이지][1] 오른쪽 상단에 있는 **+ New Test**를 클릭하세요. 프로덕션 환경에서 코드를 출시하기 전에 회귀가 발생하지 않도록 [CI/CD 파이프라인에서 직접][6] 테스트를 실행할 수 있습니다.

[1]: https://app.datadoghq.com/synthetics/test-coverage/api
[2]: /ko/api_catalog/monitor_apis/
[3]: /ko/tracing/
[4]: /ko/monitors/types/apm
[5]: /ko/tracing/metrics/
[6]: /ko/continuous_testing/

{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/test-coverage/browser