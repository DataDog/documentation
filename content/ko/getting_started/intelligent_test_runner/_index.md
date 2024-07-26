---
algolia:
  tags:
  - 지능형 테스트 러너
  - CI 테스트
  - CI 테스트
  - 비정상적 테스트(Flaky Test)
  - 비정상적 테스트(Flaky Test)
further_reading:
- link: https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/
  tag: 블로그
  text: Datadog Intelligent Test Runner로 CI 테스트 간소화
- link: /intelligent_test_runner/
  tag: 설명서
  text: 지능형 테스트 러너에 대해 알아보기
- link: /tests/code_coverage/
  tag: 설명서
  text: 코드 검사에 대해 알아보기
title: 지능형 테스트 러너 사용 시작하기
---

## 개요

[지능형 테스트 러너][1]를 사용하면 최근 코드 변경의 영향을 받지 않는 관련 없는 테스트를 스마트하게 제외하여 조직의 테스트 영향 분석을 간소화할 수 있습니다.

개발팀은 [테스트 가시성][2]을 사용하여 테스트 서비스용 지능형 테스트 러너를 설정합니다. 또한 제외할 브랜치 설정(기본 브랜치 등), 추적할 파일 정의(추적된 파일이 변경되면 모든 테스트의 전체 실행 트리거) 작업을 수행할 수 있습니다.

{{< img src="/continuous_integration/itr_test_selection_diagram.png" alt="추적된 파일, 제외된 브랜치, 건너 뛴 테스트 등, 지능형 테스트 러너의 구성 요소를 보여 주는 벤 다이어그램." caption="지능형 테스트 러너가 추적된 파일, 제외된 브랜치, 통과한 테스트를 사용하여 제외된 테스트를 정의하는 방법을 보여주는 벤 다이어그램." style="width:65%" >}}

테스트 서비스용 지능형 테스트 러너를 활성화 및 설정하여 불필요한 테스트 시간을 줄이고 CI 테스트 효율성을 높여 보세요. 비용을 절감하면서 CI 환경 전반의 안정성과 성능을 유지할 수 있습니다.

지능형 테스트 러너는 [코드 검사 데이터][5]를 사용하여 테스트를 건너뛰어야 하는지 여부를 결정합니다. 자세한 정보를 확인하려면 [Datadog 지능형 테스트 러너 동작 방식][10]을 참조하세요.

## 지능형 테스트 러너 설정하기

지능형 테스트 러너를 설정하려면 사용 중인 프로그래밍 언어에 관한 다음 문서를 참조하세요.

{{< partial name="continuous_integration/ci-itr-setup.html" >}}

</br>

## 지능형 테스트 러너 활성화

다음과 같이 지능형 테스트 러너 활성화합니다.

1. [**소프트웨어 제공** > **테스트 가시성** > **설정**][3]으로 이동합니다. 
1. **테스트 서비스** 탭 에서 `Intelligent Test Runner` 열의 서비스 **설정**을 클릭합니다.

{{< img src="/getting_started/intelligent_test_runner/enable_settings.png" alt="테스트 서비스 설정 페이지에서 테스트 서비스용 지능형 테스트 러너 활성화" style="width:100%" >}}

`Intelligent Test Runner Activation Write` 권한이 있어야 합니다. 자세한 내용을 확인하려면 [Datadog 역할 권한 문서][4]를 참조하세요.

중요한 브랜치(예: 기본 브랜치)에서 지능형 테스트 러너를 비활성화하면 포괄적인 테스트 범위를 확보할 수 있지만, 기능 또는 개발 브랜치에서 이를 실행하도록 설정하면 테스트 효율성을 극대화할 수 있습니다.

## 지능형 테스트 러너 설정하기

지능형 테스트 러너를 사용하여 특정 테스트를 건너뛰지 않도록 설정할 수 있습니다. 해당 테스트를 *건너뛸 수 없는 테스트*라고 하며, [코드 검사 데이터][5]와 관계없이 실행됩니다. 

다음과 같이 지능형 테스트 러너를 설정합니다.

1. **상태** 토글을 클릭하여 지능형 테스트 러너를 활성화합니다.
1. 제외할 브랜치를 지정합니다(대개 리포지토리의 기본 브랜치). 지능형 테스트 러너는 이러한 브랜치 테스트를 건너뛰지 않습니다.
1. 추적할 파일 디렉토리와 파일을 지정합니다(예: `documentation/content/**` 또는 `domains/shopist/apps/api/BUILD.bazel`). 지능형 테스트 러너는 추적된 파일이 하나라도 변경되면 모든 CI 테스트를 실행합니다.
1. **설정 저장**을 클릭합니다.

{{< img src="/getting_started/intelligent_test_runner/configure_itr.png" alt="지능형 테스트 러너를 활성화하고, 지능형 테스트 러너가 제외할 브랜치를 제시합니다. 또한 변경 사항이 발생할 경우, 지능형 테스트 러너가 추적 및 테스트를 실행할 파일을 추가합니다." style="width:100%" >}}

테스트 서비스에서 지능형 테스트 러너를 설정한 다음 기본 브랜치에서 테스트 스위트(suite)를 실행합니다. 이러한 작업으로 지능형 테스트 러너가 향후 커밋시 관련 없는 테스트를 적절하게 건너뛸 수 있는 기준을 설정합니다.

## 지능형 테스트 러너 데이터 사용하기

테스트 건너뛰기를 통한 시간 절약, 조직의 지능형 테스트 러너 사용량 등, 지능형 테스트 러너를 활성화하여 수집한 데이터를 살펴보고 CI 효율성을 개선합니다.

{{< img src="/getting_started/intelligent_test_runner/dashboard.png" alt="지능형 테스트 러너로 건너뛴 테스트가 절약한 시간과 조직의 지능형 테스트 러너 사용량에 관한 정보를 표시하는 기본 제공 대시보드" style="width:100%" >}}

[대시보드][6]를 생성하여 메트릭 테스트를 시각화하거나, 지능형 테스트 러너가 수집한 데이터로 채워진 위젯이 포함된 [기본 제공 대시보드][7]을 활용하여 사용 패턴 및 트렌드 데이터로 개선할 부분을 파악할 수 있도록 도와드립니다.

## 테스트 가시성 탐색기에서 결과 확인하기

[테스트 가시성 탐색기][8]로 테스트 가시성 및 지능형 테스트 러너에서 수집한 데이터를 사용하여 시각화를 생성하고 테스트 스팬(span)을 필터링할 수 있습니다. 지능형 테스트 러너가 활성화되면 각 테스트 세션 또는 커밋 실행 시 절약한 시간이 표시됩니다. 테스트 건너뛰기가 활성화되면 지속 시간 바가 보라색으로 변경됩니다.

{{< tabs >}}
{{% tab "Session" %}}

[**소프트웨어 제공** > **테스트 가시성** > **테스트 실행**][101]으로 이동한 후 `Session`을 선택하여 테스트 세션 스팬(span) 결과를 필터링합니다.

{{< img src="/getting_started/intelligent_test_runner/itr_sessions.png" alt="지능형 테스트 러너가 건너뛴 테스트를 필터링한 테스트 가시성 탐색기의 테스트 세션 결과" 스타일="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Asession

{{% /tab %}}
{{% tab "Module" %}}

[**소프트웨어 제공** > **테스트 가시성** > **테스트 실행**][101]으로 이동한 후 `Module`을 선택하여 테스트 모듈 스팬(span) 결과를 필터링합니다.

{{< img src="/getting_started/intelligent_test_runner/itr_modules.png" alt="지능형 테스트 러너가 건너뛴 테스트를 필터링한 테스트 가시성 탐색기의 테스트 모듈 결과" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Amodule

{{% /tab %}}
{{% tab "Suite" %}}

[**소프트웨어 제공** > **테스트 가시성** > **테스트 실행**][101]으로 이동한 후 `Suite`을 선택하여 테스트 스위트(suite) 스팬(span) 결과를 필터링합니다.

{{< img src="/getting_started/intelligent_test_runner/itr_suites.png" alt="지능형 테스트 러너가 건너뛴 테스트를 필터링한 테스트 가시성 탐색기의 테스트 스위트(suite) 결과" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Asuite

{{% /tab %}}
{{% tab "Test" %}}

[**소프트웨어 제공** > **테스트 가시성** > **테스트 실행**][101]으로 이동한 후 `Test`을 선택하여 테스트 스팬(span) 결과를 필터링합니다.

{{< img src="/getting_started/intelligent_test_runner/itr_tests.png" alt="지능형 테스트 러너가 건너뛴 테스트를 필터링한 테스트 가시성 탐색기의 테스트 결과" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Atest

{{% /tab %}}
{{< /tabs >}}

다음의 기본 제공 지능형 테스트 러너 [패싯][9]을 사용하여 검색 쿼리를 사용자 지정합니다.

코드 검사 활성화
: 테스트 세션 동안 코드 검사 추적 활성화 여부를 나타냅니다.

ITR가 건너뛴 테스트
: 지능형 테스트 러너가 세션 중 건너뛴 테스트의 수입니다.

테스트 건너뛰기 활성화
: 테스트 세션에 대한 지능형 테스트 러너 활성화 여부를 나타냅니다.

테스트 건너뛰기 유형
: 지능형 테스트 러너가 건너뛸 테스트를 결정하는 데 사용하는 방법이나 기준입니다.

테스트 건너뜀
: 테스트 세션 중 실행되지 않은 테스트의 총 개수로, 건너뛰도록 설정되었거나 수동으로 제외된 테스트가 포함될 수 있습니다.

절약한 시간
: 세선 실행 중 지능형 테스트 러너 사용으로 절약한 시간입니다.

예를 들어, `Test Skipping Enabled`이 있는 테스트 세션 실행을 필터링하려면 검색 쿼리에서 `@test.itr.tests_skipping.enabled:true`을 사용합니다. 

{{< img src="/getting_started/intelligent_test_runner/session_run.png" alt="지능형 테스트 러너의 테스트 건너뛰기 기능이 활성화된 첫 번째 테스트 세션 실행을 표시하는 사이드 패널" style="width:100%" >}}

그런 다음 테스트 세션 실행을 클릭하고 테스트 세션 사이드 패널의 **테스트 세션 세부 정보** 섹션에서 지능형 테스트 러너가 절약한 시간을 확인합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/intelligent_test_runner/
[2]: /ko/tests/
[3]: https://app.datadoghq.com/ci/settings/test-service
[4]: /ko/account_management/rbac/permissions/
[5]: /ko/tests/code_coverage
[6]: /ko/dashboards/
[7]: https://app.datadoghq.com/dash/integration/30941/ci-visibility---intelligent-test-runner
[8]: /ko/tests/explorer/
[9]: /ko/continuous_integration/explorer/facets/?tab=testruns
[10]: /ko/intelligent_test_runner/how_it_works/