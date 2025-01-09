---
aliases:
- /ko/synthetics/cicd_testing/ci_results_explorer
- /ko/synthetics/ci_results_explorer
- /ko/synthetics/explorer
description: 연속 테스트를 실행하는 CI 작업을 검사합니다.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
  tag: 블로그
  text: Datadog 신서틱 테스트를 CI/CD 파이프라인에 통합
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: 학습 센터
  text: CI/CD 파이프라인에서 신서틱 테스트 실행 방법 알아보기
- link: /continuous_testing/explorer/search/
  tag: 설명서
  text: 테스트 배치를 통해 검색하는 방법 알아보기
- link: /continuous_testing/explorer/search_runs/
  tag: 설명서
  text: 테스트 실행을 통해 검색하는 방법 알아보기
title: 신서티 모니터링 및 및 테스트 결과 탐색기
---

## 개요

[Results Explorer][1]는 **Synthetic Monitoring** 및 **Continuous Testing**의 모든 테스트 실행 및 CI 배치에 대한 가시성을 제공합니다.

{{< tabs >}}
{{% tab "CI 배치" %}}
{{< img src="continuous_testing/explorer_ci_batches_1.png" alt="신서틱 모니터링 및 테스트 결과 탐색기에서 CI 배치 검색 및 관리" style="width:100%;">}}
{{% /tab %}}
{{% tab "테스트 실행" %}}
{{< img src="continuous_testing/explorer_test_runs_1.png" alt="신서틱 모니터링 및 테스트 결과 탐색기에서 테스트 실행 작업 검색 및 관리" style="width:100%;">}}
{{% /tab %}}
{{< /tabs >}}

다음 작업을 실행할 수 있습니다.

* 다양한 기기와 브라우저에서 실행한 테스트 작업을 비교하여 브라우저와 기기 간 문제를 찾아냅니다.
* 실패 상태 코드를 기준으로 하여 결과 시간 패싯 및 필터 실행 성능 문제를 검사합니다.
* 검색 쿼리를 온보딩하여 탐색기에서 검색을 시작해 보세요.

## 검색 쿼리 생성하기

[**Digital Experience > Synthetic Monitoring & Testing** > **Continuous Testing**][1]로 이동해 기본 검색 쿼리를 클릭하면 테스트 배치나 실행 작업을 찾아 시각화할 수 있습니다.

{{< img src="continuous_testing/explorer_search_query_1.png" alt="Explorer에서 사용할 수 있는 기본 검색 쿼리" style="width:100%;">}}

- 차단 상태를 필터링하고 새 릴리스를 차단하고 있는지 확인하여 CI 파이프라인에서 실행 중인 실패 테스트를 확인합니다.
- HTTP 오류 상태 코드로 실패한 테스트 실행을 분석하여 예상치 못한 상태 코드가 있는 API 테스트를 식별하세요.
- 초기에는 실패했으나 재시도 후 통과한 테스트 실행을 검토합니다.
- CI 파이프라인에 포함할 테스트 ID에 접근합니다. 

더 자세한 정보는 [검색 신택스][5]를 참조하시기 바랍니다.

## 테스트 실행 탐색하기

Results Explorer에는 [Synthetic Monitoring][7] 및 [Continuous Testing][8]의 모든 테스트 실행이 표시됩니다. 모든 테스트는 빠른 재시도를 포함하여 특정 테스트 하위 유형에 대한 테스트 실행에 해당합니다. 테스트 실행 페이지에 액세스하려면 Results Explorer에서 테스트를 클릭합니다.

{{< img src="continuous_testing/api_test_run.png" alt="API 테스트 실행 상세 페이지" style="width:100%;">}}

1. 테스트 실행을 클릭하면 테스트 결과 또는 세부 정보 페이지로 이동합니다.
2. 테스트 실행 성능 또는 API 및 멀티스텝 API 테스트 성능을 분석합니다.
3. 시계열 그래프, 상위 목록 또는 테이블과 같은 시각화 정보를 생성합니다.

더 자세한 정보는 [검색 테스트 실행][6]을 참조하시기 바랍니다.

## 테스트 배치 살펴보기

Results Explorer에는 [Continuous Testing 및 CI/CD 공급자][2]에서 실행한 테스트 배치가 표시됩니다. 모든 배치는 ([CI/CD 통합][2], [datadog-ci][3] NPM 패키지 중 하나를 통해 또는 API 엔드포인트를 통해 직접) Datadog API에 대한 호출과 일치하며 하나 이상의 테스트 실행을 트리거합니다.

{{< img src="continuous_testing/ci_execution_side_panel.png" alt="신서틱 모니터링 및 테스트 결과 탐색기 테스트 작업의 CI 배치 측면 패널" style="width:100%;">}}

1. 배치를 클릭하면 배치 CI/CD 메타데이터 및 배치 테스트 결과를 보여주는 사이드 패널이 열립니다. 
2. 배치의 일부로 수행된 테스트 실행을 살펴보고 실패한 테스트를 정확히 찾아내세요.
3. 실패한 테스트 결과를 클릭하면 자세한 **테스트 결과** 페이지가 표시되며 문제의 근본 원인을 알아낼 수 있습니다.

더 자세한 정보는 [검색 테스트 배치][4]를 참조하시기 바랍니다.

## 내보내기

신서틱 모니터링 및 테스트 결과 탐색기에서 [저장한 뷰][9]로 내보낼 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /ko/continuous_testing/cicd_integrations
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: /ko/continuous_testing/explorer/search/
[5]: /ko/continuous_testing/explorer/search_syntax/
[6]: /ko/continuous_testing/explorer/search_runs/
[7]: /ko/synthetics/
[8]: /ko/continuous_testing/
[9]: /ko/continuous_testing/explorer/saved_views/