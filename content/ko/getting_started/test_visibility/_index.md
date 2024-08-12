---
algolia:
  tags:
  - 테스트 가시성
  - CI 테스트
  - CI 테스트
  - 비정상적 테스트(Flaky Test)
  - 비정상적 테스트(Flaky Test)
  - 테스트 실행
  - 테스트 실행
  - 테스트 스팬(span)
  - 테스트 스팬(span)
further_reading:
- link: https://www.datadoghq.com/blog/ci-test-visibility-with-rum/
  tag: 블로그
  text: CI 가시성 및 RUM을 사용하여 엔드 투 엔드 테스트 트러블슈팅
- link: /tests/
  tag: 설명서
  text: 테스트 가시성에 대해 알아보기
- link: /tests/guides/flaky_test_management
  tag: 설명서
  text: 비정상적 테스트(Flaky Test) 관리에 대해 자세히 알아보기
- link: /tests/developer_workflows
  tag: 설명서
  text: Datadog으로 개발자 워크플로우 개선하는 방법 알아보기
title: 테스트 가시성 시작하기
---

## 개요

[테스트 가시성][1]을 활용하면 테스트 상태를 보다 잘 이해하고, 비정상적 테스트를 유발하는 커밋을 식별하고 성능 감소를 파악하며, 복잡한 테스트 실패 문제를 해결할 수 있습니다.

{{< img src="getting_started/test_visibility/list.png" alt="테스트 가시성의 테스트 서비스 목록" style="width:100%;" >}}

테스트 실행의 성능을 트레이스로 시각화할 수 있으며, 여기서 스팬(span)은 테스트의 다양한 부분 실행 작업을 나타냅니다.

테스트 가시성으로 테스트 성능, 결함, 실패에 대한 인사이트를 제공함으로써 개발팀이 CI 환경에서 소프트웨어 테스트를 디버그, 최적화, 가속화할 수 있습니다. 테스트 가시성으로 각 테스트를 자동으로 계측하고, [지능형 테스트 러너][2]를 사용하여 지능형 테스트 선택을 통합해 테스트 효율성을 높이고 중복률을 줄입니다. 

팀은 과거 테스트 데이터 기록으로 성능 감소를 이해하고, 기능 브랜치와 기본 브랜치의 테스트 결과를 비교하며 성능 벤치마크를 설정할 수 있습니다. 팀은 테스트 가시성을 활용하여 [개발자 워크플로우][14]를 개선하고 훌륭한 코드 결과 품질을 유지할 수 있습니다. 

## 테스트 서비스 설정하기

테스트 가시성으로 CI 테스트의 성능과 결과를 추적하고 테스트 실행 결과를 표시합니다.

테스트 계측 및 실행을 시작하려면 다음 언어 중 하나에 대한 설명서를 참조하세요.

{{< partial name="continuous_integration/ci-tests-setup.html" >}}

</br>

테스트 가시성은 모든 CI 공급자와 호환되며, 이는 CI 가시성이 지원하는 기능에 국한되지 않습니다. 지원하는 기능에 대한 자세한 내용을 확인하려면 [테스트 가시성][3] 항목을 참조하세요.

## CI 테스트 데이터 사용하기

테스트의 메트릭(실행, 기간, 분포 기간, 전체 성공률, 실패율 등)에 액세스하여 CI 파이프라인 전반에서 테스트로 수집한 데이터를 사용하여 중요한 트렌드 및 패턴을 파악하세요.

{{< img src="getting_started/test_visibility/tests_dashboard.png" alt="Datadog의 기본 지원 테스트 가시성 대시보드" style="width:100%;" >}}

[대시보드][4]를 생성하여 테스트 내에서 발생하는 비정상적 테스트, 성능 회귀, 테스트 실패를 모니터링할 수 있습니다. 또는 테스트 가시성으로 수집한 데이터로 채워진 위젯을 포함한 [즉시 사용 가능한 대시보드][5]를 활용하여 CI 테스트 세션, 모듈, 스위트(suite), 테스트의 서비스 상태 및 성능을 시각화할 수 있습니다.

## 비정상적 테스트 관리

[비정상적 테스트(Flaky Test)][6]는 동일한 커밋에 대해 다중 테스트 실행 시 성공 및 실패 상태를 모두 나타내는 테스트입니다. 코드를 커밋하고 CI를 통해 실행하였을 때 테스트가 실패하였으나, CI를 통해 재실행했을 때 테스트가 성공했다면 해당 테스트는 신뢰할 수 없으며 비정상적 테스트로 표시됩니다.

테스트 실행 개요 페이지의 **비정상적 테스트** 섹션에서 비정상적 테스트 정보에 액세스하거나, [**테스트 목록** 페이지][7]의 테스트 서비스 목록 컬럼에서 액세스할 수 있습니다.

{{< img src="getting_started/test_visibility/commit_flaky_tests.png" alt="테스트 실행 커밋 섹션에서 무시할 수 있는 비정상적 테스트" style="width:100%;" >}}

각 브랜치의 목록에는 신규 비정상적 테스트 수, 비정상적 테스트의 커밋 수, 총 테스트 시간 및 브랜치의 최신 커밋 세부 정보가 표시됩니다.

평균 시간
: 테스트가 실행되는 데 걸리는 평균 시간입니다.

첫 번째 및 가장 마지막 비정상적 테스트
: 테스트에서 첫 번째로, 또 가장 마지막으로 비정상적 동작이 발생했을 때의 SHA 날짜 및 커밋입니다.

비정상적 커밋
: 테스트에서 비정상적 동작이 발생한 커밋의 수입니다. 

실패율
: 처음 비정상적 동작이 발생한 후로 실패한 테스트 실행의 백분율 값입니다. 

트렌드
: 비정상적 테스트(Flaky Test)가 수정되었는지 또는 여전히 비정상적 동작을 보이는지를 나타내는 시각화 데이터입니다.

테스트 가시성은 다음 그래프를 표시하여 커밋의 **비정상적 테스트** 섹션에서 비정상적 테스트의 트렌드와 영향을 파악하도록 도와드립니다.

신규 비정상적 테스트(Flaky Test) 실행
: 신규 비정상적 테스트가 감지되는 빈도를 나타냅니다.

알려진 비정상적 테스트(Flaky Test) 실행
: 추적 중인 비정상적 테스트와 관련된 모든 테스트 실패를 나타냅니다. 비정상적 테스트의 '플레이크'가 발생할 때마다 표시됩니다.

실수로 비정상적 테스트가 감지되었다고 판단한 커밋에 대한 새로운 비정상적 테스트를 무시하려면, 드롭다운 옵션에서 **새로운 비정상적 데이터** 값이 포함된 테스트를 클릭한 다음 **비정상적 테스트 무시**를 클릭합니다. 자세한 내용을 확인하려면 [비정상적 테스트 관리][8]를 참조하세요.

## 테스트 가시성 탐색기에서 결과 확인하기

테스트 가시성 탐색기를 사용하면 테스트에서 수집한 데이터를 사용하여 시각화를 생성하고 테스트 스팬을 필터링할 수 있습니다. 각 테스트 실행은 트레이스로 보고되며, 해당 트레이스에는 테스트 요청에 의해 생성된 추가 스팬(span)이 포함됩니다.

{{< tabs >}}
{{% tab "Session" %}}

[**소프트웨어 제공** > **테스트 가시성** > **테스트 실행**][101]으로 이동한 후 `Session`을 선택하여 테스트 세션 스팬(span) 결과를 필터링합니다.

{{< img src="/getting_started/test_visibility/session.png" alt="Shopist 레지스토리에서 필터링된 테스트 가시성 탐색기의 테스트 세션 결과" 스타일="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Asession

{{% /tab %}}
{{% tab "Module" %}}

[**소프트웨어 제공** > **테스트 가시성** > **테스트 실행**][101]으로 이동한 후 `Module`을 선택하여 테스트 모듈 스팬(span) 결과를 필터링합니다.

{{< img src="/getting_started/test_visibility/module.png" alt="Shopist 레지스토리에서 필터링된 테스트 가시성 탐색기의 테스트 모듈 결과" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Amodule

{{% /tab %}}
{{% tab "Suite" %}}

[**소프트웨어 제공** > **테스트 가시성** > **테스트 실행**][101]으로 이동한 후 `Suite`을 선택하여 테스트 스위트(suite) 스팬(span) 결과를 필터링합니다.

{{< img src="/getting_started/test_visibility/suite.png" alt="Shopist 레지스토리에서 필터링된 테스트 가시성 탐색기의 테스트 스위트(suite) 결과" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Asuite

{{% /tab %}}
{{% tab "Test" %}}

[**소프트웨어 제공** > **테스트 가시성** > **테스트 실행**][101]으로 이동한 후 `Test`을 선택하여 테스트 스팬(span) 결과를 필터링합니다.

{{< img src="/getting_started/test_visibility/test.png" alt="Shopist 레지스토리에서 필터링된 테스트 가시성 탐색기의 테스트 결과" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Atest

{{% /tab %}}
{{< /tabs >}}

[패싯][9]을 사용하여 검색 쿼리를 사용자 지정하고 테스트 실행의 각 레벨에서 소요된 시간의 변화를 파악합니다.

**테스트 목록** 페이지에서 테스트를 클릭하면 **트레이스** 탭에서 플레임 그래프 또는 스팬(span)의 목록을 확인할 수 있습니다. 

{{< img src="/getting_started/test_visibility/failed_test_trace.png" alt="테스트 목록 페이지의 실패한 테스트 실행의 스택 트레이스" style="width:100%" >}}

테스트 실행에서 병목 현상을 파악하고 실행 시간의 최대 퍼센테이지부터 최소 퍼센테이지까지 순위를 매긴 개별 레벨을 조사할 수 있습니다.

## 테스트에 커스텀 측정값 추가하기

CI 가시성 테스트 API 엔드포인트를 사용하여 프로그래밍 방식으로 검색하거나 이벤트 테스트를 관리할 수 있습니다. 자세한 내용을 확인하려면 [API 문서][10]를 참조하세요.

CI 테스트에서 수집한 데이터를 개선하려면, 테스트 실행 중에 생성된 스팬(span)에 프로그래밍 방식으로 태그 또는 측정값(예: 메모리 사용량)을 직접 추가할 수 있습니다. 자세한 내용을 확인하려면 [테스트에 커스텀 측정값 추가하기][11]를 참조하세요.

## CI 모니터링 생성하기

테스트가 실패하거나 새로운 비정상적 테스트가 발생하면 조직의 관련 팀에 테스트 성능 회귀에 대해 알려드립니다.

{{< img src="/getting_started/test_visibility/test_monitor.png" alt="테스트 실패 횟수가 1회를 초과하면 알림을 트리거하는 CI 테스트 모니터링" style="width:100%" >}}

다음에 따라 테스트 실패 횟수가 실패 임계값 1회를 초과할 때 알림을 전송하는 모니터링을 설정합니다.

1. [**모니터링** > **새 모니터링**][12]으로 이동한 다음 **CI**를 클릭합니다.
1. 시작하려면 CI 테스트의 공통 모니터링 유형을 선택합니다. 예를 들어, 코드 베이스에 새로운 비정상적 테스트가 추가될 때 알림을 트리거하려면 `New Flaky Test`, 테스트 실패 시 알림을 트리거하려면 `Test Failures`, 테스트 성능 회귀에 대한 알림을 트리거하려면 `Test Performance`, 또는 검색 쿼리를 커스터마이징합니다. 본 예시에서는 `Branch (@git.branch)` 패싯을 선택하여 `main` 브랜치에서 테스트 실행을 필터링합니다.
1. `Evaluate the query over the` 섹션에서 마지막 15분을 선택합니다. 
1. 측정값이 임계값 이상일 때 트리거되도록 알림 조건을 설정하고, 알림 또는 경고 임계값(예: `Alert threshold > 1`)을 지정합니다.
1. 모니터링 알림을 정의합니다.
1. 모니터링 권한을 설정합니다.
1. **생성하기**를 클릭합니다.

자세한 내용을 확인하려면 [CI 모니터링 문서][13]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tests/
[2]: /ko/intelligent_test_runner/
[3]: /ko/tests/#supported-features
[4]: /ko/dashboards/
[5]: https://app.datadoghq.com/dash/integration/30897/ci-visibility---tests-dashboard
[6]: /ko/glossary/?product=ci-cd#flaky-test
[7]: https://app.datadoghq.com/ci/test-services
[8]: /ko/tests/guides/flaky_test_management
[8]: https://app.datadoghq.com/ci/test-runs
[9]: /ko/continuous_integration/explorer/facets/?tab=testruns
[10]: /ko/api/latest/ci-visibility-tests/
[11]: /ko/tests/guides/add_custom_measures/
[12]: https://app.datadoghq.com/monitors/create
[13]: /ko/monitors/types/ci/?tab=tests#track-new-flaky-tests
[14]: /ko/tests/developer_workflows