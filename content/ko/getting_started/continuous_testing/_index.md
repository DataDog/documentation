---
algolia:
  tags:
  - 지속적 테스팅
further_reading:
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: 학습 센터
  text: CI/CD 파이프라인에서 신서틱 테스트 사용
- link: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
  tag: 블로그
  text: Datadog을 사용한 연속적 테스트 모범 사례
- link: https://www.datadoghq.com/blog/release-confidently-with-datadog-continuous-testing/
  tag: 블로그
  text: Datadog Continuous Testing을 사용해 안심하고 릴리스하세요
- link: /continuous_testing/environments
  tag: 설명서
  text: 로캘 및 스테이징 환경에 대해 자세히 알아보기
- link: /continuous_testing/cicd_integrations
  tag: 설명서
  text: Continuous Testing 및 CI/CD에 대해 알아보기
title: 지속적 테스팅 시작하기
---
{{< jqmath-vanilla >}}

## 개요

Continuous Testing를 사용하면 [스테이징, QA 및 사전 프로덕션 환경][14]에서 구성한 것과 동일한 [신서틱(Synthetic) 테스트][1]를 자동으로 실행 및 모니터링하고 코드 변경으로 테스트에 실패할 경우 팀에 선제적으로 경고하고 파이프라인 배포를 차단할 수 있습니다.

Continuous Testing 테스트를 통해 다음을 할 수 있습니다.

* [시스템에서 API 요청 실행][2]
* [웹 애플리케이션에서 브라우저 시나리오 시뮬레이션][3]
* [iOS 및 Android 애플리케이션에서 기능 테스트][4]

[병렬화][24]를 설정하면 CI/CD 파이프라인에서 여러 테스트를 순차적으로 실행하지 않고 동시에 실행하여 빌드, 테스트 및 배포 프로세스의 속도를 높일 수 있습니다. 테스트가 실행되면 [신서틱(Synthetic) 모니터링 & 테스트 결과 탐색기][5]에서 테스트 결과와 CI 배치를 살펴보세요. 

Continuous Testing로 개발자 워크플로를 개선하려면 다음을 수행하세요.

* [`datadog-ci` NPM 패키지][6]을 사용하여 CI 파이프라인에서 직접 테스트를 실행하세요.
* IDE에서 직접 테스트를 실행하려면 [Datadog 신서틱(Synthetics) 대 코드 통합][7]를 사용하세요.

Continuous Testing는 전체 소프트웨어 수명 주기에서 엔드투엔드 테스트를 자동화하여 조직의 애플리케이션 개발을 가속화합니다. 로캘 및 스테이징 환경에서 테스트를 실행하고, 테스트 실행을 병렬화하고, CI 공급자와 통합할 수 있도록 해줍니다.

## 사전 필수 요건

계정이 없다면 [Datadog 계정][8]을 만드세요.

## 지속적 테스팅 테스트 생성

지속적 테스팅 테스트를 설정하려면 먼저 Datadog에서 신서틱 테스트를 생성해야 합니다. 다음은 테스트 e-커머스 웹 애플리케이션 사이트 `https://www.shopist.io`에서 [브라우저 테스트][3]를 생성하는 예시입니다.

브라우저 테스트에서는 **시작 URL**에서 시작해 웹 애플리케이션의  사용자의 여정을 테스트합니다. **시작 URL**이 스테이징 환경 내에 있도록 하면 다음 프로덕션 단계로 넘어가기 전에 변경 사항을 테스트하기가 수월해집니다.

### 테스트 상세 구성

1. [디지털 경험** > **신서틱(Synthetic) 모니터링 & 테스트** > **새 테스트**][26]로 이동합니다.
2. 상단 오른쪽 모서리에서 **New Test** > **Browser Test**를 클릭합니다.

   {{< img src="continuous_testing/new_browser_test.png" alt="new_browser_test" style="width:80%;" >}}

3. 브라우저 테스트 정의하기:

    - 시작 URL 필드에 모니터링하고자 하는 웹사이트의 URL을 추가합니다. 이 예시에서는 `https://www.shopist.io`를 입력합니다.
    - **Advanced Options**를 선택해 사용자 설정 요청 옵션, 인증서, 인증 자격 등을 설정할 수 있습니다. 이 예시에서는 특정 고급 옵션이 필요없습니다.
    - 테스트 이름을 지정하고 팀 태그를 **팀 체크아웃** 등으로 지정합니다. 테스트 스위트를 정리하고 신서틱(Synthetic) 모니터링 & 테스트 결과 탐색기를 통해 관심 있는 테스트를 찾을 수 있습니다.
    - 테스트하고자 하는 브라우저와 디바이스를 선택합니다.

4. 계속하여 [평소처럼 테스트 상세 내용과 기록 내용을 기입][9]합니다.

## CI 공급자 또는 협업 도구와 통합

Continuous Testing에서 테스트와 트러블슈팅 를 결합하여 애플리케이션 개발을 가속화하고, 워크플로를 간소화하고, 컨텍스트 전환을 최소화하세요. 

CI 공급자 또는 [Slack][28] 또는 [Jira][29]와 같은 협업 도구와 통합하려면 해당 문서를 참조하세요:

{{< partial name="getting_started/continuous_testing/providers.html" >}}

</br>

## 지속적 테스팅 테스트 실행

개발 워크플로우를 향상하려면 CLI에 있는 `datadog-ci`를 CI 환경으로 사용해 테스트를 구성할 수 있습니다. 그 후 IDE 개발자 환경에서 바로 테스트를 실행할 수 있습니다.

### CLI에서 테스트 실행

[`datadog-ci`NPM 패키지][6]를 사용해 지속적 테스팅 확장 기능을 사용할 수 있습니다. `datadog-ci`는 CI/CD 스크립트 내에서 명령을 실행해 배포 전에 애플리케이션을 테스트할 수 있도록 해줍니다. 테스트가 실패할 시에는 자동으로 변경 사항을 차단하거나 롤백할 수 있습니다. [설치 및 설정 방법을 보려면 `datadog-ci` 구성 페이지][10]를 참고하세요.

`datadog-ci`을 사용하여 특정 [Datadog 팀 태그][25]로 태그된 테스트만 실행할 수 있습니다. 예를 들어 `team-checkout`으로 태그된 모든 테스트를 실행하려면 다음을 수행하세요.

1. 명령줄로 이동합니다.
2. 다음 명령을 실행합니다:

   ```
   datadog-ci synthetics run-tests -search 'tag:team-checkout' --config global.config.json
   ```

신서틱 명령 실행 및 리포터 사용에 대한 자세한 내용은 [설정 설명서][11]를 참조하세요.

### IDE에서 테스트 실행

[Datadog 신서틱 VS 코드 통합][12]을 별도로 사용하면 다음에 도움이 됩니다.

* 로컬에서 개발을 가속화하려면 [비공개 위치][13] 또는 [로컬 환경][14]을 사용하세요.
* HTTP API 테스트와 브라우저 테스트를 실행하고 VS 코드 내에서 결과를 확인할 수 있습니다.
* 관련 테스트를 동시에 실행하여 중요한 것만 테스트할 수 있습니다.

{{< img src="developers/ide_plugins/vscode/vscode-extension-demo.png" alt="vscode-extension-demo" style="width:100%;" >}}

### VS 코드에서 테스트 실행

1. VS 코드를 실행하고 VS 코드 확장 보기에서 Datadog 확장을 설치합니다.
2. Datadog 신서틱 확장을 실행하고 로그인 페이지가 나타나면 로그인합니다.
3. 실행할 신서틱 테스트를 선택합니다.
4. 시작 URL을 설정합니다.
5. 테스트를 실행합니다.

## 신서틱(Synthetic) 모니터링 & 테스트 결과 탐색기에서 결과 확인

신서틱(Synthetic) 모니터링 & 테스트 결과 탐색기를 사용하면 Continuous Testing 테스트에 대한 시각화를 만들고 [CI 배치][22] 및 [테스트 실행][23]을 필터링할 수 있습니다.

[**디지털 경험** > **신서틱(Synthetic) 모니터링 & 테스트** > **새 테스트**][26]로 이동한 다음 **CI 배치** 또는 **테스트 실행**을 선택하여 탐색기에서 CI 배치 또는 테스트 실행의 결과를 확인합니다. 목록에서 CI 배치 또는 테스트를 선택하면 결과를 더 자세히 볼 수 있습니다.

{{< tabs >}}
{{% tab "CI Batches" %}}
{{< img src="continuous_testing/explorer_ci_batches_1.png" alt="신서틱 모니터링 및 테스트 결과 탐색기에서 CI 배치 검색 및 관리" style="width:100%;">}}
{{% /tab %}}
{{% tab "Test Runs" %}}
{{< img src="continuous_testing/explorer_test_runs_1.png" alt="신서틱 모니터링 및 테스트 결과 탐색기에서 테스트 실행 검색 및 관리" style="width:100%;">}}
{{% /tab %}}
{{< /tabs >}}

### 검색 쿼리 생성하기

즉시 사용 가능한 검색 쿼리 중 하나를 살펴보고 CI 배치 필터링이나 테스트 실행을 시작해 보세요.

{{< img src="continuous_testing/explorer/search_queries.png" alt="신서틱 모니터링 및 테스트 결과 탐색기에서 바로 사용 가능한 검색 쿼리" style="width:100%;" >}}

선택적으로 쿼리에서 [검색 테스트 실행][15]을 생성할 수 있습니다. 위에서 만든 브라우저 테스트를 사용하여 테스트 ID를 찾고 공통 테스트 실행 패싯을 사용하여 검색 쿼리를 만듭니다. 

브라우저 테스트의 ID를 찾으려면,

{{< img src="continuous_testing/example_test_id.png" alt="테스트 실행의 속성 섹션에 강조 표시된 브라우저 테스트 ID" style="width:60%;" >}}

1. [**테스트** 페이지][19]로 이동합니다.
2. 테스트를 선택합니다.
3. **Properties** 섹션에서 테스트 ID를 찾습니다.

검색 쿼리에서 패싯을 사용하는 방법에 관한 자세한 정보는 [테스트 실행 검색][17]을 참고하세요.

신서틱(Synthetic) 모니터링 & 테스트 결과 탐색기의 보기를 내보내려면 **> 보기**를 클릭합니다. 자세한 내용은 [저장된 보기][16]를 참조하세요.

## 병렬화 기본 설정 구성

신서틱 테서트에서 병렬화 설정은 기본값으로 비활성화되어 있습니다. 병렬화 기능을 사용하면 CI/CD 파이프라인에서 테스트 여러 개를 동시에 실행할 수 있습니다. 테스트를 병렬화하려면 **Estimate Parallelization** 계산기를 사용해 기능 사용이 필요한지 확인할 수 있습니다.

{{< img src="continuous_testing/parallelization_estimate.png" alt="parallelization_estimate" style="width:100%;" >}}

[**디지털 경험** > **신서틱(Synthetic) 모니터링 & 테스트** > **설정**][27]으로 이동하여 계산기를 찾습니다.

예를 들어 CI 배치에 테스트가 24개 있다고 합시다. 각 테스트를 완료하는데 2분이 걸리고, 목표는 모든 테스트를 4분 내에 완료하는 것입니다. 그러면 12개 테스트를 병렬화하여 실행해야 합니다.

$$\text"병렬화 예측" = {\text"CI 배치 당 24개 테스트"* \text"소요 시간 2분"} / \text"CI 파이프라인 예상 소요 시간 4분"$$

병렬화 예측이 완료되면 병렬화 모달에 동시에 실행하고자 하는 테스트 수를 입력하고 **Save Selection**을 클릭하세요.

자세한 정보는 [병렬화 설명서][18]를 참조하세요.

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
[14]: /ko/continuous_testing/environments/
[15]: /ko/continuous_testing/explorer/?tab=testruns#create-a-search-query
[16]: /ko/continuous_testing/explorer/saved_views/
[17]: /ko/continuous_testing/explorer/search_runs/
[18]: /ko/continuous_testing/settings/#parallelization
[19]: https://app.datadoghq.com/synthetics/tests
[22]: /ko/glossary/?product=synthetic-monitoring#test-batch
[23]: /ko/glossary/?product=synthetic-monitoring#test-run
[24]: /ko/glossary/?product=synthetic-monitoring#parallelization
[25]: /ko/account_management/teams/
[26]: https://app.datadoghq.com/synthetics/explorer?query=%40type%3Aresult%20-%40result.result.unhealthy%3Atrue&index=%2A&track=synthetics&viz=stream&from_ts=1713544430419&to_ts=1713548030419&live=true
[27]: https://app.datadoghq.com/synthetics/settings/continuous-testing
[28]: /ko/integrations/slack/
[29]: /ko/integrations/jira/