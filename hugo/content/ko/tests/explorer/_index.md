---
description: Test Optimization Explore에서 테스트 실행을 검색하고 필터링하는 방법을 알아보세요.
further_reading:
- link: /continuous_integration/tests/
  tag: 설명서
  text: 테스트 데이터를 탐색하여 문제가 발생한 테스트를 찾고 해결하세요
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: 블로그
  text: Datadog CI 모니터로 파이프라인 알림을 설정하세요
- link: /continuous_testing/guide/view-continuous-testing-test-runs-in-test-optimization/
  tag: 가이드
  text: Test Optimization에서 Continuous Testing 테스트 실행 보기
title: Test Optimization Explorer
---

## 개요

Test Optimization Explorer를 통해 태그를 사용하여 여러 수준에서 테스트 실행을 [검색 및 필터링](#search-and-filter), [시각화](#visualize), [내보내기](#export)할 수 있습니다.

[Software Delivery** > **Test Optimization** > **Test Runs**][6]으로 이동하여 **Session**, **Module**, **Suite** 및 **Test** 수준에서 CI 테스트 실행 결과를 확인합니다. 각 테스트 수준은 서로 다른 수준의 테스트 집계를 나타냅니다.

{{< img src="/tests/explorer/test_runs.png" text="Test Optimization Explorer의 테스트 실행 결과 목록" style="width:100%" >}}

## 일반 패싯 

왼쪽의 **Test** 패널에는 테스트 실행을 검색하는 데 사용할 수 있는 기본 패싯이 나와 있습니다.

| 패싯 | 설명 |
|---|---|
| Test Status | 테스트 결과로 `Passed`, `Failed`, 또는 `Skipped`가 있습니다. |
| 기간 | 테스트 완료하는 데 걸린 시간입니다. |
| Test Service | CI Visibility를 사용해 계측한 [테스트 서비스][12]입니다. |
| Test Full Name | 테스트 이름, 테스트 제품군 이름, 구성 또는 파라미터(있는 경우)를 포함하는 테스트 식별자입니다. |
| Test Name | 테스트 사례에 대한 간략한 이름. 테스트에서 정의됩니다. |
| 테스트 스위트 | 언어 및 테스트 프레임워크에 따라 동일한 코드 단위를 실행하는 [테스트 그룹][13]입니다. |
| Flaky | 동일한 커밋에 대해 여러 테스트 실행에서 통과 및 실패 상태를 모두 표시합니다. |
| Has Parameters | 테스트에 파라미터가 있는지 여부. `true` 또는 `false`입니다. |
| Known Flaky | 테스트가 `true` 또는 `false`로 일관되지 않을 수 있습니다.<br><br>이 테스트 실행은 실패하여 테스트가 현재 브랜치나 기본 브랜치에서 일관되지 않은 테스트로 식별됩니다. |
| 언어 | 테스트가 생성된 라이브러리의 프로그래밍 언어입니다. |
| New Flaky | `true` 또는 `false`로 일관되지 않은 테스트가 발생한 적이 있는지 여부. <br><br> 테스트 실행이 커밋에서 비일관된 테스트로 식별됩니다. 테스트가 현재 브랜치나 기본 브랜치에서 일관되지 않은 테스트로 식별된 적 없습니다. |
| Performance Regression  
 | 테스트 시간이 평균의 5배이고 기본 브랜치의 동일 테스트 최대 시간보다 큰 경우 테스트 실행이 회귀로 표시됩니다. |
| Baseline Mean | 테스트 회귀의 경우 지난주 테스트 실행 동안 계산된 기본 브랜치의 동일한 기간 평균을 의미합니다. |
| Baseline Standard Deviation | 테스트 회귀의 경우 지난주 테스트 실행 기간에 계산된 기본 브랜치의 동일한 테스트에 대한 표준 편차를 의미합니다. |
| Absolute Change | 테스트 회귀에서 기준 평균과 비교한 테스트 실행 기간에 대한 절대적 변경을 의미합니다. |
| Relative Change | 테스트 회귀에서 기준 평균 대비 테스트 실행 기간에 대한 상대적 변경을 의미합니다. |
| Standard Deviation Change | 테스트가 신규로 추가되었는지 나타냅니다. |
| Test Code Owners | 리포지토리 구성에서 추론된 테스트 코드 소유자 이름입니다. |
| Test Fingerprint | 개별 테스트 실행에 대한 고유 식별자입니다. |
| Test Framework | 테스트 생성 및 실행에 사용된 기본 프레임워크 또는 일련의 툴입니다. |
| Test Command | 테스트 실행에 사용된 명령입니다. |
| Test Bundle | 테스트 모듈과 동등합니다. 이전 Datadog 테스트 라이브러리 버전에서 사용됩니다. |
| 테스트 전체 이름 | 테스트 전체 이름입니다. |
| Test Module | 테스트 모듈은 언어에 따라 다릅니다.<br><br>.NET에서는 테스트 모듈은 동일한 유닛 테스트 프로젝트에서 실행되는 모든 테스트를 그룹화합니다.<br>Swift에서는 테스트 모듈이 주어진 번들에 실행되는 모든 테스트를 그룹화합니다.<br>JavaScript에서 테스트 모듈은 테스트 세션에 일대일로 매핑됩니다.<br>Java에서 테스트 모듈은 동일한 Maven Surefire, Failsafe 또는 Gradle 테스트 작업 실행으로 실행되는 모든 테스트를 그룹화합니다.<br>Python에서 테스트 모듈은 일반적으로 `unittest` 또는 `pytest`와 같은 프레임워크에서 관리되는 테스트 제품군의 일부로 동일한 `.py` 파일에서 실행되는 모든 테스트를 그룹화합니다.<br>Ruby에서 테스트 모듈은 일반적으로 `RSpec` 또는 `Minitest`와 같은 프레임워크에서 관리되는 동일한 테스트 파일 내에서 실행되는 모든 테스트를 그룹화합니다. |
| Test Traits | `category:flaky`와 같은 테스트 특징입니다. |
| Test Type | `unit benchmark` 또는 `browser`와 같은 테스트 유형입니다. |
| RUM Active | 테스트가 활성 [실제 사용자 모니터링][14] 웹 세션 내부에서 실행되는지를 나타냅니다. |
| Is New | 테스트가 신규로 추가되었는지 나타냅니다. |
| Is Retry | 테스트가 재시도 결과로 실행되었는지 나타냅니다. |
| Code Coverage Enabled | [Test Impact Analysis][16]가 세션에 대해 테스트당 [코드 지원 범위][17]를 활성화했는지 나타냅니다.  |
| Skipped by ITR | Test Impact Analysis에 의해 세션 동안 건너 뛴 테스트 수입니다. |
| Test Skipping Enabled | 테스트 세션 또는 모듈이 Test Impact Analysis를 사용해 건너뛰도록 허용되었는지 나타냅니다. |
| Test Skipping Type | Test Impact Analysis에서 사용된 메서드 또는 기준으로 건너 뛸 테스트를 결정하는 데 사용됩니다. |
| Test Skipped | 테스트 세션 중에 실행되지 않은 테스트의 총 개수로, 건너 뛰도록 구성되었거나 수동 제외로 설정된 테스트가 포함될 수 있습니다. |
| Time Saved | Test Impact Analysis 사용으로 세션에 절약한 시간입니다. |
| Early Flake Detection Enabled | [Early Flake Detection][15]를 사용하여 테스트를 실행했는지 여부를 나타냅니다. |
| Early Flake Detection Abort Reason | 테스트의 Early Flake Detection 금지 이유를 나타냅니다. |

Test Optimization Explorer에서 검색 쿼리의 일부로 사용할 수 있는 일반적인 패싯에 대한 자세한 정보는 [테스트 실행 패싯][3]을 참조하세요.

### 세션

테스트 세션은 가장 높은 수준의 집계입니다. `yarn test`, `mvn test` 또는  `dotnet test`와 같은 테스트 명령에 일대일로 대응합니다.

JUnit 보고서 업로드의 경우 업로드되는 보고서 파일당 1개의 세션이 있습니다.

### 모듈

모듈의 정의는 언어마다 조금씩 다릅니다.

* .NET에서 테스트 모듈은 동일한 [단위 테스트 프로젝트][9]에서 실행되는 모든 테스트를 그룹화합니다.
* Swift에서 테스트 모듈은 지정된 번들에 실행되는 모든 테스트를 그룹화합니다.
* JavaScript에서 테스트 모듈은 테스트 세션에 일대일로 매핑됩니다.
* Java에서 테스트 모듈은 동일한 Maven Surefire/Failsafe 또는 Gradle Test 작업으로 실행되는 모든 테스트를 그룹화합니다.
* JUnit 보고서 업로드에서 테스트 모듈은 테스트 세션에 일대일로 매핑됩니다.

모듈의 예는 `SwiftLintFrameworkTests`이며, 이는 [`SwiftLint`][10]의 테스트 대상에 해당합니다.

### Suite

테스트 제품군은 동일한 코드 단위를 실행하는 테스트 그룹입니다.

테스트 제품군의 예는 `src/commands/junit/__tests__/upload.test.ts`이며, 이는 [`datadog-ci`][11]의 테스트 파일에 해당합니다.

테스트 실행 데이터는 [대시보드][7]와 [노트북][8]에서 사용할 수 있기 때문에 빌드 엔지니어링 팀에서 우선순위가 높은 작업과 시간 경과에 따른 CI 트렌드에 따라 커뮤니케이션을 맞춤화할 수 있습니다.

## 검색 및 필터링

왼쪽의 패싯을 클릭하거나 검색창에 사용자 지정 쿼리를 직접 작성하여 테스트 실행의 하위 집합으로 범위를 좁히거나, 넓히거나, 초점을 이동할 수 있습니다. 패싯을 선택하거나 선택 해제하면 검색창에 변경 사항이 자동으로 반영됩니다. 마찬가지로 검색창 쿼리를 수정하거나 검색창에 처음부터 쿼리를 작성하여 왼쪽의 패싯을 선택하거나 선택을 해제할 수 있습니다.

- 테스트 검색 방법을 알아보려면 [탐색기)][1]을 참조하세요.
- 쿼리를 만드는 방법을 알아보려면 [검색 구문][2]을 참조하세요.

## 분석

쿼리한 테스트 실행을 필드, 패턴 및 트랜잭션과 같은 상위 엔터티로 그룹화하여 정보를 도출하거나 통합합니다. 속성을 검색하기 위해 만들 필요가 없는 [패싯][3]을 사용하면 다음과 같은 작업을 할 수 있습니다.

- CI/CD에서 실행 중인 테스트의 진행 상황을 검색하고 추적할 수 있습니다.
- 모든 CI/CD 작업 실행 건을 조사하여 실패한 테스트 실행을 식별하고 문제를 해결하세요.
- [일관되지 않은 테스트][5]를 식별하여 수정하세요.

## 시각화

시각화 유형을 선택하여 필터 및 집계 결과를 시각화하고 테스트 실행 결과를 더 잘 이해할 수 있습니다. 예를 들어 테스트 결과를 목록으로 표시하여 테스트 데이터를 열로 구성하거나 [시계열 그래프][18]로 표시하여 시간 경과에 따른 CI 테스트 데이터를 측정할 수 있습니다.

## 내보내기

Test Optimization Explorer에서 [보기 내보내기][4]를 하여 나중에 또는 다른 상황에서 재사용할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tests/explorer/
[2]: /ko/tests/explorer/search_syntax
[3]: /ko/tests/explorer/facets
[4]: /ko/tests/explorer/saved_views
[5]: /ko/tests/flaky_test_management
[6]: https://app.datadoghq.com/ci/test-runs
[7]: https://app.datadoghq.com/dashboard/lists
[8]: https://app.datadoghq.com/notebook/list
[9]: https://learn.microsoft.com/en-us/visualstudio/test/create-a-unit-test-project?view=vs-2022#to-create-a-unit-test-project
[10]: https://github.com/realm/SwiftLint/blob/7738f0c0a5990201ca6556bdb2f13f8e67b5191d/Package.swift#L71
[11]: https://github.com/DataDog/datadog-ci/blob/6de6ea3bbffa57d8576422535061ca35c759feb6/src/commands/junit/__tests__/upload.test.ts
[12]: /ko/glossary/?product=ci-cd#test-service
[13]: /ko/glossary/?product=ci-cd#test-suite 
[14]: /ko/real_user_monitoring/
[15]: /ko/tests/flaky_test_management/early_flake_detection/
[16]: /ko/intelligent_test_runner/
[17]: /ko/tests/code_coverage/
[18]: https://app.datadoghq.com/ci/test-runs?viz=timeseries