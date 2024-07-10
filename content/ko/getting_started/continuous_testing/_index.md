---
algolia:
  tags:
  - 지속적 테스팅
further_reading:
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: 설정
  text: CI/CD 파이프라인에서 신서틱 테스트 사용
- link: /synthetics/api_tests
  tag: 설명서
  text: API 테스트에 대해 자세히 알아보기
- link: /synthetics/multistep
  tag: 설명서
  text: 멀티스텝 API 테스트에 대해 자세히 알아보기
- link: /synthetics/browser_tests
  tag: 설명서
  text: 브라우저 테스트 알아보기
- link: /continuous_testing/cicd_integrations
  tag: 설명서
  text: CI 파이프라인에서 신서틱 테스트 실행하는 방법 알아보기
title: 지속적 테스팅 시작하기
---
{{< jqmath-vanilla >}}

## 개요

지속적 테스팅을 사용하면 스테이징, QA, 사전 프로덕션 환경에서 구성한 것과 같은 [신서틱 테스트][1]를 자동으로 실행하고 모니터링할 수 있습니다. 이를 통해 코드 변경으로 인해 테스팅에 실패할 시 팀에게 알림을 보내고 파이프라인 배포를 차단할 수 있습니다.

코드 없는 테스트로 다음을 실행할 수 있습니다.
* [시스템에서 API 요청 실행][2]
* [웹 애플리케이션에서 브라우저 시나리오 시뮬레이션][3]
* [iOS 및 Android 애플리케이션에서 기능 테스트][4]

테스트 실행 후 [Synthetic Monitoring & Continuous Testing Explorer][5]에서 테스트 결과와 CI 배치를 확인할 수 있습니다.

지속적 테스팅으로 개발자 워크플로우 향상:
* [`datadog-ci` NPM 패키지][6]를 사용해 CI 파이프라이에서 바로 테스트를 실행할 수 있습니다.
* [Datadog 신서틱 VS 코드 통합][7]을 사용해 IDE에서 테스트를 실행합니다.

또 지속적 테스팅에서는 [병렬화][24] 기능을 제공합니다. 이 기능을 사용하면 CI/CD 파이프라인에서 여러 테스트를 진행할 때 순서대로 진행하기보다 동시다발적으로 진행할 수 있기 때문에 빌드, 테스팅, 개발 과정이 좀 더 빨라집니다.

## 필수 요구 사항

계정이 없다면 [Datadog 계정][8]을 만드세요.

## 지속적 테스팅 테스트 생성

지속적 테스팅 테스트를 설정하려면 먼저 Datadog에서 신서틱 테스트를 생성해야 합니다. 다음은 테스트 e-커머스 웹 애플리케이션 사이트 `https://www.shopist.io`에서 [브라우저 테스트][3]를 생성하는 예시입니다.

브라우저 테스트에서는 **시작 URL**에서 시작해 웹 애플리케이션의  사용자의 여정을 테스트합니다. **시작 URL**이 스테이징 환경 내에 있도록 하면 다음 프로덕션 단계로 넘어가기 전에 변경 사항을 테스트하기가 수월해집니다.

### 테스트 상세 구성

1. Datadog 사이트에서 **UX 모니터링**에 마우스 커서를 올리고 **Continuous Testing**을 클릭합니다.
2. 상단 오른쪽 모서리에서 **New Test** > **Browser Test**를 클릭합니다.
3. 브라우저 테스트 정의하기:

    - 시작 URL 필드에 모니터링하고자 하는 웹사이트의 URL을 추가합니다. 이 예시에서는 `https://www.shopist.io`를 입력합니다.
    - **Advanced Options**를 선택해 사용자 설정 요청 옵션, 인증서, 인증 자격 등을 설정할 수 있습니다. 이 예시에서는 특정 고급 옵션이 필요없습니다.
    - 테스트 이름을 지정하고 **team-checkout**과 같은 팀 태그를 설정합니다. 태그를 지정하면 테스트 스위트를 정리된 상태로 유지할 수 있고 Synthetic Monitoring & Continuous Testing Explorer에서 원하는 테스트를 찾을 수 있습니다.
    - 테스트하고자 하는 브라우저와 디바이스를 선택합니다.

4. 계속하여 [평소처럼 테스트 상세 내용과 기록 내용을 기입][9]합니다.

{{< img src="continuous_testing/new_browser_test.png" alt="new_browser_test" style="width:100%;" >}}


## 지속적 테스팅 테스트 실행

개발 워크플로우를 향상하려면 CLI에 있는 `datadog-ci`를 CI 환경으로 사용해 테스트를 구성할 수 있습니다. 그 후 IDE 개발자 환경에서 바로 테스트를 실행할 수 있습니다.

### CLI에서 테스트 실행

[`datadog-ci`NPM 패키지][6]를 사용해 지속적 테스팅 확장 기능을 사용할 수 있습니다. `datadog-ci`는 CI/CD 스크립트 내에서 명령을 실행해 배포 전에 애플리케이션을 테스트할 수 있도록 해줍니다. 테스트가 실패할 시에는 자동으로 변경 사항을 차단하거나 롤백할 수 있습니다. [설치 및 설정 방법을 보려면 `datadog-ci` 구성 페이지][10]를 참고하세요.

`datadog-ci`를 사용해 특정 [팀 태그][25]로 지정된 테스트만 실행할 수 있습니다. 예를 들어 `team-checkout`으로 태그 지정된 테스트를 실행하려면 다음을 따르세요.

1. 명령줄로 이동합니다.
2. 다음을 실행합니다.
   ```
   yarn datadog-ci synthetics run-tests -search 'tag:team-checkout' --config global.config.json
   ```
신서틱 명령을 사용하고 보고자를 사용하는 방법과 관련한 자세한 정보는 [구성 설명서][11]를 참고하세요.

### IDE에서 테스트 실행

[Datadog 신서틱 VS 코드 통합][12]을 별도로 사용하면 다음에 도움이 됩니다.

* [Private Location][13] 또는 [Tunnel][14]을 사용해 로컬 개발 속도를 높입니다.
* HTTP API 테스트와 브라우저 테스트를 실행하고 VS 코드 내에서 결과를 확인할 수 있습니다.
* 관련 테스트를 동시에 실행하여 중요한 것만 테스트할 수 있습니다.

{{< img src="developers/ide_plugins/vscode/vscode-extension-demo.png" alt="vscode-extension-demo" style="width:100%;" >}}

### VS 코드에서 테스트 실행

1. VS 코드를 실행하고 VS 코드 확장 보기에서 Datadog 확장을 설치합니다.
2. Datadog 신서틱 확장을 실행하고 로그인 페이지가 나타나면 로그인합니다.
3. 실행할 신서틱 테스트를 선택합니다.
4. 시작 URL을 설정합니다.
5. 테스트를 실행합니다.

## Synthetic Monitoring & Continuous Testing Explorer에서 결과 확인

Synthetic Monitoring & Continuous Testing Explorer을 사용하면 지속적 테스팅 테스트의 가시화한 정보를 생성하고, [CI 배치][22]를 필터링하고, [테스트를 실행][23]할 수 있습니다. **UX Monitoring** > **Continuous Testing**으로 이동하세요. 

**CI Batches** 또는 **Test Runs**를 선택해 CI 배치나 Explorer에서 실행한 테스트를 확인하세요. 목록에서 CI 배치나 테스트를 선택해 결과의 상세 내역을 확인할 수 있습니다.

{{< img src="continuous_testing/ci_explorer_test_results.png" alt="ci_explorer_test_results" style="width:100%;" >}}

### 검색 쿼리 생성하기

CI 배치나 실행한 테스트를 필터링하려면 다음 기본 제공 검색 쿼리 중 하나를 클릭하세요.
- [실패한 테스트 전체][19]
- [처음에는 실패했으나 현재는 통과한 테스트][20]
- [사용하지 않은 테스트][21]

{{< img src="continuous_testing/example_search_queries.png" alt="example-search-queries" style="width:100%;" >}}

또는 쿼리를 생성해 [실행한 테스트를 검색][15]할 수도 있습니다. 위에 생성한 브라우저 테스트를 사용해 테스트 ID를 확인하고 일반적인 테스트 실행 패싯을 사용해 쿼리를 생성할 수 있습니다. 브라우저 테스트 ID를 찾으려면 다음을 단계를 따르세요.
1. Synthetic Tests 페이지로 이동합니다.
2. 테스트를 선택합니다.
3. **Properties** 섹션에서 테스트 ID를 찾습니다.

{{< img src="continuous_testing/example_test_id.png" alt="example_test_id" style="width:70%;" >}}

Synthetic Monitoring & Continuous Testing Explorer의 보기를 내보내려면 **>Views**를 클릭하고 **Save**를 선택하세요. 자세한 정보를 보려면 [저장한 보기][16]를 참고하세요.

검색 쿼리에서 패싯을 사용하는 방법에 관한 자세한 정보는 [테스트 실행 검색][17]을 참고하세요.

## 병렬화 기본 설정 구성

신서틱 테서트에서 병렬화 설정은 기본값으로 비활성화되어 있습니다. 병렬화 기능을 사용하면 CI/CD 파이프라인에서 테스트 여러 개를 동시에 실행할 수 있습니다. 테스트를 병렬화하려면 **Estimate Parallelization** 계산기를 사용해 기능 사용이 필요한지 확인할 수 있습니다.

**UX Monitoring** > **Settings**로 이동해 **Parallelization Settings**를 클릭하여 계산기를 찾습니다.

{{< img src="continuous_testing/parallelization_estimate.png" alt="parallelization_estimate" style="width:100%;" >}}

예를 들어 CI 배치에 테스트가 24개 있다고 합시다. 각 테스트를 완료하는데 2분이 걸리고, 목표는 모든 테스트를 4분 내에 완료하는 것입니다. 그러면 12개 테스트를 병렬화하여 실행해야 합니다.

$$\text"병렬화 예측" = {\text"CI 배치 당 24개 테스트"* \text"소요 시간 2분"} / \text"CI 파이프라인 예상 소요 시간 4분"$$

병렬화 예측이 완료되면 병렬화 모달에 동시에 실행하고자 하는 테스트 수를 입력하고 **Save Selection**을 클릭하세요.

자세한 내용은 [병렬화 설명서][18]를 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/
[2]: /ko/getting_started/synthetics/api_test/
[3]: /ko/getting_started/synthetics/browser_test/
[4]: /ko/mobile_app_testing/
[5]: /ko/synthetics/explorer?track=synbatch
[6]: /ko/continuous_testing/cicd_integrations/configuration/?tab=npm
[7]: /ko/developers/ide_plugins/
[8]: https://datadoghq.com 
[9]: /ko/getting_started/synthetics/browser_test/#create-a-browser-test
[10]: /ko/continuous_testing/cicd_integrations/configuration/?tab=npm#install-the-package
[11]: /ko/continuous_testing/cicd_integrations/configuration/?tab=npm#reporters
[12]: /ko/developers/ide_plugins/vscode/
[13]: /ko/getting_started/synthetics/private_location/
[14]: /ko/continuous_testing/testing_tunnel/
[15]: /ko/continuous_testing/explorer/?tab=testruns#create-a-search-query
[16]: /ko/continuous_testing/explorer/saved_views/
[17]: /ko/continuous_testing/explorer/search_runs/
[18]: /ko/continuous_testing/settings/#parallelization
[19]: https://app.datadoghq.com/synthetics/explorer?query=%40type%3Aresult%20-%40result.result.httpStatusCode%3A%5B100%20TO%20399%5D%20%40result.result.passed%3Afalse&agg_m=count&agg_q=%40result.result.httpStatusCode&cols=&index=%2A&top_n=100&track=synthetics&viz=timeseries
[20]: https://app.datadoghq.com/synthetics/explorer?query=%40type%3Aresult%20%40result.result.initialResultID%3A%2A%20%40result.status%3A0&agg_m=count&agg_q=%40result.result.httpStatusCode&cols=&index=%2A&top_n=100&track=synthetics&viz=stream 
[21]: https://app.datadoghq.com/synthetics/explorer?query=%40ci.job.name%3A%2A&agg_m=count&agg_q=%40result.test_public_id&cols=&index=%2A&top_n=100&track=synbatch&viz=query_table
[22]: /ko/glossary/?product=synthetic-monitoring#test-batch
[23]: /ko/glossary/?product=synthetic-monitoring#test-run
[24]: /ko/glossary/?product=synthetic-monitoring#parallelization
[25]: /ko/account_management/teams/