---
description: Synthetic Monitoring & Testing Overview 페이지를 사용하여 실패하는 테스트, 실패가 클러스터링되는
  위치, 테스트 적용 범위가 없는 엔드포인트 및 뷰를 확인할 수 있습니다.
further_reading:
- link: /synthetics/
  tag: 문서
  text: Synthetic Monitoring
- link: /synthetics/explore/results_explorer/
  tag: 문서
  text: Synthetic Monitoring & Testing Results Explorer
- link: /synthetics/api_tests/
  tag: 문서
  text: API 테스트
- link: /synthetics/browser_tests/
  tag: 문서
  text: 브라우저 테스트
- link: /synthetics/mobile_app_testing/
  tag: 문서
  text: 모바일 애플리케이션 테스트
title: Synthetic Monitoring & Testing Overview 페이지
---
Synthetic Monitoring & Testing Overview 페이지는 Synthetic 테스트의 상태와 적용 범위를 한눈에 보여주며, 다음 두 가지 질문의 답을 찾도록 도와줍니다.

- **어디서 실패가 발생하고 있습니까?** 경보가 발생한 테스트를 식별하고 실패가 집중된 위치를 확인하며 실패한 각 테스트에 대해 조치를 취할 수 있습니다.
- **아직 테스트하지 않은 항목은 무엇입니까?** 트래픽이 가장 많은 엔드포인트와 뷰 중에서 Synthetic 테스트가 적용되지 않은 엔드포인트와 뷰를 찾아 해당 엔드포인트 및 뷰에 대한 테스트를 생성합니다.

이 페이지를 실패를 분류하고 테스트 적용 범위를 추가할 위치를 결정하는 시작점으로 사용합니다.

{{< img src="synthetics/explore/overview/overview_page.png" alt="Synthetic Monitoring & Testing Overview 페이지입니다. 위치별로 그룹화된 실패 맵과 경보가 발생한 테스트 목록이 있는 Test health 섹션과 테스트된 엔드포인트와 테스트되지 않은 엔드포인트의 서비스 카드가 표시된 Coverage gaps 섹션이 표시되어 있습니다." style="width:100%;" >}}

## 전제 조건 {#prerequisites}

- 테스트되지 않은 엔드포인트를 보려면 서비스에 대해 [APM][1]을 활성화합니다.
- 테스트되지 않은 보기를 보려면 웹 또는 모바일 애플리케이션에 대해 [RUM][2]을 활성화합니다.

Overview 페이지의 [Test Health](#test-health) 섹션에는 APM이나 RUM이 필요하지 않습니다.

## 테스트 상태 {#test-health}

{{< ui >}}Test Health{{< /ui >}} 섹션에는 전체 테스트 중 경보가 발생한 테스트가 몇 개인지 표시됩니다. {{< ui >}}View all alerting tests{{< /ui >}}를 클릭하면 전체 목록이 열립니다.

### 테스트 필터링 {#filter-tests}

다음 필터를 사용하여 맵과 실패한 테스트 목록의 범위를 지정할 수 있습니다.

- {{< ui >}}Teams{{< /ui >}}: 하나 이상의 팀이 소유한 테스트를 표시합니다.
- {{< ui >}}Environment{{< /ui >}}: 하나 이상의 환경에 대한 테스트를 표시합니다.
- {{< ui >}}Tags{{< /ui >}}: 특정 태그가 있는 테스트를 표시합니다.
- {{< ui >}}Creator{{< /ui >}}: 특정 사용자가 생성한 테스트를 표시합니다.

### 집중된 실패 찾기 {#find-concentrated-failures}

맵에는 실패가 집중된 위치가 표시됩니다. 먼저 테스트를 {{< ui >}}OK{{< /ui >}}와 {{< ui >}}In alert{{< /ui >}}로 나눕니다. 각 타일은 그룹을 나타내며 포함된 테스트 수를 표시합니다. 타일이 클수록 더 많은 테스트가 포함된 것입니다.

{{< ui >}}Group by{{< /ui >}} 메뉴를 사용하여 맵에서 테스트를 그룹화하는 방법을 선택합니다.

- {{< ui >}}Location{{< /ui >}}
- {{< ui >}}Test type{{< /ui >}}
- {{< ui >}}Priority{{< /ui >}}
- {{< ui >}}Failure reason{{< /ui >}}
- {{< ui >}}Environment{{< /ui >}}
- {{< ui >}}Team{{< /ui >}}

위치별로 그룹화하면 테스트가 실행되는 모든 위치 아래에 테스트가 나타납니다. 각 타일은 해당 위치에서 테스트에 실패하고 있는지 여부를 보여줍니다. 따라서 타일에 표시된 테스트 수를 합하면 전체 테스트 수보다 많을 수 있습니다.

{{< img src="synthetics/explore/overview/failure_map.png" alt="위치별로 그룹화되고 OK 및 In alert 섹션으로 나뉜 실패 맵으로, 각 위치의 테스트 수에 따라 타일 크기가 달라집니다." style="width:100%;" >}}

### 실패한 테스트에 대한 조치 {#act-on-a-failing-test}

맵 옆의 목록에는 경보가 발생한 모든 테스트가 표시됩니다. 각 항목에는 테스트 이름, 테스트가 확인하는 URL 또는 요청, 실패한 위치가 표시됩니다.

맵에서 타일을 클릭하면 해당 타일에 포함된 테스트로 목록이 필터링됩니다.

실패한 각 테스트에 대해 다음 작업을 수행할 수 있습니다.

- {{< ui >}}Investigate with Bits{{< /ui >}}를 클릭하여 AI 지원 실패 조사를 시작합니다.
- {{< ui >}}View Traces{{< /ui >}}를 클릭하여 API 테스트에 대한 백엔드 추적을 확인합니다.
- {{< ui >}}View Failing Step{{< /ui >}}을 클릭하여 브라우저 테스트에 실패한 단계를 엽니다.

테스트의 케밥 메뉴(**⋮**)를 클릭하여 다음 작업을 수행할 수 있습니다.

- {{< ui >}}Run test now{{< /ui >}}: 일정을 벗어나 테스트 실행을 트리거합니다.
- {{< ui >}}Pause scheduling{{< /ui >}}: 테스트를 위해 예약된 실행을 중지합니다.
- {{< ui >}}Open in Results Explorer{{< /ui >}}: [Results Explorer][3]에서 테스트 결과를 확인합니다.

{{< img src="synthetics/explore/overview/failing_test_actions.png" alt="한 위치로 필터링된 실패 맵과 그 옆에는 해당 위치에 대해 경보가 발생한 테스트 목록이 표시되어 있습니다. 첫 번째 테스트에서 Investigate With Bits가 강조 표시되어 있으며, 해당 케밥 메뉴가 열려 Run test now, Pause scheduling, Open in Results Explorer 항목이 표시되어 있습니다." style="width:100%;" >}}

## Coverage gaps {#coverage-gaps}

{{< ui >}}Coverage gaps{{< /ui >}} 섹션은 Synthetic 테스트가 적용되지 않는 엔드포인트와 보기를 보여줍니다. Datadog에서는 트래픽 즉, 지난주에 발생한 요청 수 또는 보기 수를 기준으로 엔드포인트와 보기의 순위를 매깁니다. 트래픽이 가장 높은 영역부터 먼저 테스트하도록 목록 상단의 항목부터 시작하세요.

섹션 오른쪽 상단의 토글을 사용하여 {{< ui >}}Endpoints{{< /ui >}}와 {{< ui >}}Views{{< /ui >}} 간에 전환할 수 있습니다. 검색창을 사용하여 특정 서비스, 애플리케이션, 엔드포인트 또는 뷰를 찾을 수 있습니다.

### 적용 범위 그리드 읽기{#read-the-coverage-grid}

각 카드는 서비스 또는 애플리케이션을 나타냅니다. 카드의 각 사각형은 하나의 엔드포인트 또는 뷰를 나타냅니다.

| 색상  | 의미                 |
|--------|-------------------------|
| 파란색   | 테스트됨                  |
| 주황색 | 테스트되지 않음, 트래픽 높음  |
| 회색   | 테스트되지 않음, 트래픽 낮음 |

높은 트래픽은 다음과 같이 정의됩니다.

- **엔드포인트**: Datadog은 상위 20개 서비스 전반에서 지난주 요청 수를 기준으로 엔드포인트를 정렬합니다. 요청의 90%를 구성하는 엔드포인트는 트래픽이 높은 것입니다.
- **보기**: Datadog은 상위 20개 애플리케이션 전반에 걸쳐 지난주 보기 수를 기준으로 보기를 정렬합니다. 보기의 90%를 구성하는 보기는 트래픽이 높은 것입니다.

{{< img src="synthetics/explore/overview/coverage_grid.png" alt="Group by service가 켜진 상태에서 Endpoints 보기로 표시된 Coverage gaps 섹션입니다. 서비스 카드에서 트래픽이 높은데 테스트되지 않은 엔드포인트는 주황색 사각형으로, 트래픽이 낮은데 테스트되지 않은 엔드포인트는 회색 사각형으로, 테스트된 엔드포인트는 파란색 사각형으로 표시됩니다. 선택한 서비스의 테스트되지 않은 엔드포인트는 트래픽 순으로 왼쪽에 나열됩니다." style="width:100%;" >}}

### 테스트되지 않은 엔드포인트 {#untested-endpoints}

{{< ui >}}Endpoints{{< /ui >}} 보기에는 APM의 테스트되지 않은 API 엔드포인트가 나열됩니다. 트래픽 기준 상위 20개 서비스가 표시됩니다. 각 항목에는 HTTP 메서드, 경로 및 서비스가 표시됩니다.

기본적으로 {{< ui >}}Group by service{{< /ui >}}가 켜져 있으므로 뷰에는 서비스당 하나의 카드가 표시되며, 각 카드에는 테스트되지 않은 엔드포인트 수가 표시되어 있습니다. 서비스 카드를 클릭하면 지난주의 요청 수에 따라 순위가 매겨진 해당 서비스의 엔드포인트로 목록이 필터링됩니다.

엔드포인트에 대한 테스트를 생성하려면 다음 단계를 따르세요.

1. 서비스 카드를 클릭하여 해당 서비스만 표시되도록 목록을 필터링합니다.
2. 목록 맨 위에 있는, 지난주 요청 수가 가장 많은 엔드포인트 위에 마우스를 가져갑니다.
3. {{< ui >}}Create an API Test{{< /ui >}}를 클릭합니다.
4. 엔드포인트 URL이 미리 입력된 상태로 열리는 새 [API 테스트][4]에서 테스트 구성을 완료하고 {{< ui >}}Save{{< /ui >}}를 클릭합니다.

{{< img src="synthetics/explore/overview/create_api_test.png" alt="마우스를 가져가면 표시되는 목록의 테스트되지 않은 엔드포인트로, Create an API Test 버튼이 표시되어 있고 옆에는 적용 범위 그리드에서 선택한 서비스 카드가 표시되어 있습니다." style="width:100%;" >}}

### 테스트되지 않은 보기 {#untested-views}

{{< ui >}}Views{{< /ui >}} 보기에는 웹 및 모바일 애플리케이션에 대한 RUM의 테스트되지 않은 보기가 나열됩니다. 지난주 보기 수 기준 상위 20개 애플리케이션을 보여줍니다. 각 항목에는 보기 이름과 애플리케이션이 표시됩니다.

기본적으로 {{< ui >}}Group by application{{< /ui >}}가 켜져 있으므로 보기에는 애플리케이션당 카드가 하나씩 표시되며 각 카드에는 테스트하지 않은 보기의 수가 표시됩니다.

보기에 대한 테스트를 생성하려면 다음 단계를 수행하세요.

1. 목록에서 보기 위에 마우스를 가져갑니다.
2. 웹 애플리케이션 보기의 경우 {{< ui >}}Create a Browser Test{{< /ui >}}를 클릭하고, 모바일 애플리케이션 보기의 경우 {{< ui >}}Create a Mobile Test{{< /ui >}}를 클릭합니다.
3. 새 테스트를 구성합니다. 새 테스트는 필드가 비워진 상태로 열립니다.
   - 웹 애플리케이션 보기의 경우 새 [브라우저 테스트][5]에서 시작 URL을 입력하고 단계를 기록한 다음 {{< ui >}}Save{{< /ui >}}를 클릭합니다.
   - 모바일 애플리케이션 보기의 경우 새 [모바일 앱 테스트][6]에서 애플리케이션을 선택하고 단계를 기록한 다음 {{< ui >}}Save{{< /ui >}}를 클릭합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/
[2]: /ko/real_user_monitoring/
[3]: /ko/synthetics/explore/results_explorer/
[4]: /ko/synthetics/api_tests/
[5]: /ko/synthetics/browser_tests/
[6]: /ko/synthetics/mobile_app_testing/