---
aliases:
- /ko/continuous_integration/explore_tests/
- /ko/continuous_integration/guides/test_configurations/
- /ko/continuous_integration/integrate_tests/
- /ko/continuous_integration/tests/
- /ko/tests/repositories/
- /ko/tests/search/
cascade:
  algolia:
    rank: 70
    tags:
    - ci test
    - ci tests
    - test optimization
    - test visibility
    - failed test
    - flaky test
    - supported features
  site_support_id: test_optimization
further_reading:
- link: /monitors/types/ci/
  tag: 문서
  text: CI 테스트 모니터링에 대해 알아보기
- link: /tests/flaky_test_management/
  tag: 문서
  text: 불안정한 테스트(Flaky Test) 관리에 대해 알아보기
- link: /tests/browser_tests/
  tag: 문서
  text: RUM으로 브라우저 테스트를 계측하는 방법 알아보기
- link: /tests/troubleshooting/
  tag: 문서
  text: Test Optimization에서 문제를 해결하는 방법 알아보기
- link: https://learn.datadoghq.com/courses/getting-started-test-optimization
  tag: 학습 센터
  text: Test Optimization 시작하기
- link: https://www.datadoghq.com/blog/datadog-ci-visibility/
  tag: 블로그
  text: Datadog CI Visibility로 CI 파이프라인과 테스트 모니터링하기
- link: https://www.datadoghq.com/blog/ci-test-visibility-with-rum/
  tag: 블로그
  text: CI Visibility 및 RUM을 사용하여 엔드투엔드 테스트의 문제 해결하기
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: 블로그
  text: Datadog의 GitLab 소스 코드 통합으로 더 빠르게 문제 해결하기
- link: https://www.datadoghq.com/blog/dbt-data-quality-testing
  tag: 블로그
  text: dbt-expectations를 사용하여 dbt 데이터 품질 검사 구현하기
- link: https://www.datadoghq.com/blog/platform-engineering-metrics/
  tag: 블로그
  text: 플랫폼 엔지니어링 팀을 위한 성공 메트릭
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: 릴리스 노트
  text: 최신 Software Delivery 릴리스를 확인! (앱 로그인 필요)
title: Datadog의 Test Optimization
---
{{< callout url=# btn_hidden="true" header="Test Optimization은 CI/CD Optimization의 일부입니다.">}}CI/CD Optimization은 CI Visibility와 Test Optimization을 하나의 통합 인터페이스로 결합합니다. 이 페이지는 Test Optimization을 다룹니다. CI Visibility와 공유되는 기능은 [CI/CD Optimization][1]을 참조하세요.

[1]: /ko/cicd/
{{< /callout >}}

{{< learning-center-callout header="학습 센터에서 'Test Optimization 시작하기' 과정을 수강해 보세요." btn_title="지금 등록" btn_url="https://learn.datadoghq.com/courses/getting-started-test-optimization">}}
  테스트 모니터링을 설정하고, 불안정한 테스트를 식별하며, Test Impact Analysis를 사용해 필요한 테스트만 실행함으로써 CI 파이프라인을 가속화하는 방법을 알아보세요.
{{< /learning-center-callout >}}

## 개요 {#overview}

[Test Optimization][1]은 테스트의 중요한 메트릭과 결과를 표시하여 테스트 중심으로 CI 상태를 파악할 수 있도록 합니다. 이를 통해 테스트를 실행하는 파이프라인이 아니라, 코드에 초점을 맞춰 현재 작업과 가장 관련성이 높은 성능 문제와 테스트 실패를 조사할 수 있습니다.

## 설정 {#setup}

Datadog에서 Test Optimization을 구성할 옵션을 선택하세요.

{{< card-grid card_width="75px" >}}
  {{< image-card href="/tests/setup/dotnet/" src="integrations_logos/dotnet_avatar.svg" alt=".net" >}}
  {{< image-card href="/tests/setup/java/" src="integrations_logos/java_avatar.svg" alt="java" >}}
  {{< image-card href="/tests/setup/javascript/" src="integrations_logos/javascript.png" alt="javascript" >}}
  {{< image-card href="/tests/setup/python/" src="integrations_logos/python_avatar.svg" alt="python" >}}
  {{< image-card href="/tests/setup/ruby/" src="integrations_logos/ruby_avatar.svg" alt="ruby" >}}
  {{< image-card href="/tests/setup/swift/" src="integrations_logos/swift_avatar.svg" alt="swift" >}}
  {{< image-card href="/tests/setup/go/" src="integrations_logos/golang-avatar.png" alt="go" >}}
  {{< image-card href="/tests/setup/junit_xml/" src="integrations_logos/junit_xml.png" alt="Datadog에 junit 테스트 업로드" >}}
{{< /card-grid >}}

Bazel을 사용하여 Go, Java 또는 Python 테스트를 실행하는 경우 Datadog [Test Optimization용 Bazel 규칙][10]을 사용하세요.

Test Optimization은 테스트뿐만 아니라 프로젝트의 전체 테스트 단계에 대한 가시성도 제공합니다.

### 지원되는 기능 {#supported-features}

|                                                                                                                                                                                                                                   |   .NET    | Java/JVM 기반 |       Javascript       |  Python   |         Ruby          |   Swift   |     Go    |       JUnit Xml        |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------:|:--------------------:|:----------------------:|:---------:|:---------------------:|:---------:|:---------:|:----------------------:|
| {{< ci-details title="정확한 시간/지속 시간 결과" >}}테스트 시작 시간과 지속 시간을 마이크로초 단위로 정밀하게 측정합니다.{{< /ci-details >}}                                                                                             | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="통합 테스트의 분산 트레이스" >}}Datadog으로 계측된 외부 서비스를 호출하는 테스트의 세부 정보에서 전체 분산 트레이스를 표시합니다.{{< /ci-details >}}                  | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Agent 기반 보고" >}}Datadog Agent를 통해 테스트 정보를 보고할 수 있는 기능입니다.{{< /ci-details >}}                                                                                                  | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Agentless 보고" >}}Datadog Agent 없이 테스트 정보를 보고할 수 있는 기능입니다.{{< /ci-details >}}                                                                                                    | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="테스트 모음 수준 가시성" >}}세션, 모듈, 모음 및 테스트를 포함한 전체 테스트 프로세스에 대한 가시성을 제공합니다.{{< /ci-details >}}                                                                 | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="수동 API" >}}Datadog의 자동 계측으로 지원되지 않는 테스트 프레임워크에 대해 프로그래밍 방식으로 CI Visibility 이벤트를 생성할 수 있는 기능입니다.{{< /ci-details >}}                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             |            |           |                        |
| {{< ci-details title="테스트별 코드 소유자" >}}CODEOWNERS 파일을 기반으로 테스트 파일의 소유자를 자동으로 탐지합니다.{{< /ci-details >}}                                                                                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} | {{< X >}} (부분적으로)  |
| {{< ci-details title="소스 코드 시작/종료" >}}테스트의 시작 및 종료 라인을 자동으로 보고합니다.{{< /ci-details >}}                                                                                                         | {{< X >}} |       {{< X >}}      | {{< X >}} (시작만) | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} (시작만) |
| {{< ci-details title="CI 및 git 정보" >}}CI 제공자, git 커밋 SHA 또는 파이프라인 URL과 같은 git 및 CI 환경 메타데이터를 자동으로 수집합니다.{{< /ci-details >}}                                                        | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Git 메타데이터 업로드" >}}<a href="/tests/test_impact_analysis">Test Impact Analysis</a>에 사용되는 git 트리 정보를 자동으로 업로드합니다.{{< /ci-details >}}                                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Test Impact Analysis*" >}}코드 커버리지 및 git 메타데이터를 기반으로 테스트를 지능적으로 건너뛰는 <a href="/tests/test_impact_analysis">Test Impact Analysis</a>를 활성화할 수 있는 기능입니다.{{< /ci-details >}} | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="코드 커버리지 지원" >}}<a href="/tests/code_coverage">총 코드 커버리지</a> 메트릭을 보고할 수 있는 기능입니다.{{< /ci-details >}}                                                                              | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |   {{< X >}} (수동)   |
| {{< ci-details title="벤치마크 테스트 지원" >}}벤치마크 테스트에 대한 성능 통계를 자동으로 탐지합니다.{{< /ci-details >}}                                                                                           | {{< X >}} |                      |                        | {{< X >}} |                       | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="파라미터화된 테스트" >}}파라미터화된 테스트를 자동으로 탐지합니다.{{< /ci-details >}}                                                                                                                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} |           |                        |
| {{< ci-details title="불안정한 테스트 조기 탐지*" >}}자동으로 <a href="/tests/flaky_test_management/early_flake_detection">새 테스트를 재시도</a>하여 불안정성을 탐지합니다.{{< /ci-details >}}                                          | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="자동 테스트 재시도*" >}}테스트 불안정성으로 인한 빌드 실패를 방지하기 위해 실패한 테스트를 최대 N회까지 자동으로 <a href="/tests/flaky_test_management/auto_test_retries">재시도</a>합니다.{{< /ci-details >}}    | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="실패한 테스트 리플레이*" >}}재시도된 실패한 테스트에서 <a href="/tests/flaky_test_management/auto_test_retries#failed-test-replay">로컬 변수 정보에 액세스</a>합니다.{{< /ci-details >}}                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        |           |                       |           |           |                        |
| {{< ci-details title="Selenium RUM 통합" >}}RUM으로 계측된 애플리케이션을 테스트할 때 <a href="/tests/browser_tests">브라우저 세션을 테스트 케이스에 자동으로 연결</a>합니다.{{< /ci-details >}}                            | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             |           |           |                        |

\* 표시된 기능은 opt-in 기능으로 [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][2]에서 활성화해야 합니다.

## 기본 구성 {#default-configurations}

테스트는 주어진 조건 집합에서 코드가 어떻게 동작하는지 평가합니다. 이 조건 중 일부는 운영 체제나 사용되는 런타임처럼 테스트가 실행되는 환경과 관련이 있습니다. 동일한 코드라도 실행 조건 집합에 따라 다르게 동작할 수 있으므로, 개발자는 일반적으로 테스트가 다양한 조건 집합에서 실행되도록 구성하고 모든 조건에서 예상대로 동작하는지 검증합니다. 이러한 특정 조건 집합을 *구성*이라고 합니다.

Test Optimization에서는 여러 구성을 사용하는 테스트를 각 구성별로 별개의 테스트로 간주합니다. 특정 구성에서 테스트가 실패하고 다른 구성에서는 통과하는 경우, 실패한 테스트와 구성의 조합만 실패로 표시됩니다.

예를 들어, 단일 커밋을 테스트할 때 Python 테스트를 세 가지 다른 Python 버전에서 실행한다고 가정해 보겠습니다. 이 테스트가 특정 버전에서 실패할 경우 해당 버전의 테스트는 실패로 표시되고, 나머지 버전은 통과로 표시됩니다. 이후 동일한 커밋에서 테스트를 다시 시도했을 때 세 가지 Python 버전 모두에서 통과하면, 이전에 실패했던 버전의 테스트는 통과 및 불안정 상태로 표시되며, 나머지 두 버전은 통과 상태로 유지되고 불안정성이 탐지되지 않습니다.

### 테스트 구성 속성 {#test-configuration-attributes}

Test Optimization으로 테스트를 실행하면, 라이브러리는 테스트가 실행되는 환경에 대한 정보를 테스트 태그로 탐지하고 보고합니다. 예를 들어, `Windows` 또는 `Linux`와 같은 운영 체제 이름, `arm64` 또는 `x86_64`와 같은 플랫폼의 아키텍처가 각 테스트에 태그로 추가됩니다. 이러한 값은 특정 구성에서 테스트가 실패하거나 불안정할 때 커밋 및 브랜치 개요 페이지에 표시됩니다.

다음 태그는 테스트 구성을 식별하기 위해 자동으로 수집되며, 일부 태그는 특정 플랫폼에만 적용될 수 있습니다.

| 태그 이름               | 설명                                                     |
|------------------------|-----------------------------------------------------------------|
| `os.platform`          | 테스트가 실행되는 운영 체제의 이름           |
| `os.family`            | 테스트가 실행되는 운영 체제의 계열         |
| `os.version`           | 테스트가 실행되는 운영 체제의 버전        |
| `os.architecture`      | 테스트가 실행되는 운영 체제의 아키텍처   |
| `runtime.name`         | 테스트를 위한 런타임 시스템의 이름                       |
| `runtime.version`      | 런타임 시스템의 버전                                  |
| `runtime.vendor`       | 테스트가 실행되는 런타임 플랫폼을 구축한 벤더 |
| `runtime.architecture` | 테스트 런타임 시스템의 아키텍처               |
| `device.model`         | 테스트가 실행되는 기기 모델                             |
| `device.name`          | 장치 이름                                             |
| `ui.appearance`        | 사용자 인터페이스 스타일                                           |
| `ui.orientation`       | UI의 표시 방향                                   |
| `ui.localization`      | 애플리케이션의 언어                                    |

### 파라미터화된 테스트 구성 {#parameterized-test-configurations}

파라미터화된 테스트를 실행할 때, 라이브러리는 사용된 파라미터에 대한 정보를 탐지하고 보고합니다. 파라미터는 테스트 구성의 일부이므로, 동일한 테스트 케이스라도 서로 다른 파라미터로 실행하면 Test Optimization에서는 두 개의 서로 다른 테스트로 간주합니다.

테스트 파라미터가 비결정적이고 테스트가 실행될 때마다 값이 달라지는 경우, Test Optimization은 각 테스트 실행을 새로운 테스트로 간주합니다. 따라서 이러한 테스트에서는 실행 기록, 불안정성 탐지, Test Impact Analysis 등의 일부 제품 기능이 올바르게 작동하지 않을 수 있습니다.

비결정적 테스트 파라미터의 예시는 다음과 같습니다.

- 현재 날짜
- 무작위 값
- 테스트 실행 환경에 따라 달라지는 값(예: 절대 파일 경로 또는 현재 사용자 이름)
- 결정적인 문자열 표현이 없는 값(예: `toString()` 메서드를 재정의하지 않은 Java 클래스 인스턴스)

비결정적 테스트 파라미터를 사용하지 마세요. 이를 피할 수 없는 경우, 일부 테스트 프레임워크에서는 비결정적 파라미터에 대한 결정론적 문자열 표현을 지정하는 방법을 제공합니다(예: 파라미터 표시 이름 재정의).

## 사용자 정의 구성 {#custom-configurations}

일부 설정은 환경 변수, 테스트 실행 인수 또는 개발자가 사용하는 접근 방식에 따라 달라질 수 있으므로 자동으로 식별하거나 보고할 수 없습니다. 이러한 경우 Test Optimization에서 올바르게 설정을 식별할 수 있도록 라이브러리에 세부 정보를 제공해야 합니다.

이 태그를 `DD_TAGS` 환경 변수의 일부로 정의하고 `test.configuration` 접두사를 사용하세요.

예를 들어, 다음 테스트 구성 태그는 디스크 응답 시간이 느리고 사용 가능한 메모리가 낮은 테스트 구성을 식별합니다.

{{< code-block lang="bash" >}}
DD_TAGS=test.configuration.disk:slow,test.configuration.memory:low
{{< /code-block >}}

`test.configuration` 접두사가 있는 모든 태그는 자동으로 수집된 태그와 더불어 설정 태그로 사용됩니다.

참고: 중첩된 `test.configuration` 태그, 예를 들어 `test.configuration.cpu.memory`는 지원되지 않습니다.

이러한 설정 태그를 사용하여 필터링하려면 [이러한 태그에 대한 패싯을 생성해야 합니다][3].

## 개발자 워크플로 개선 {#enhance-your-developer-workflow}

{{< whatsnext desc="Test Optimization을 코드 커버리지 데이터를 보고하는 도구와 통합하고, 브라우저 테스트에 RUM을 적용하여 개발 주기 전반에서 문제를 더욱 신속하게 식별하고 해결하며, 여러 플랫폼에 걸친 인사이트를 활용할 수 있습니다." >}}
{{< nextlink href="/tests/developer_workflows/" >}}Datadog을 활용한 개발자 워크플로 개선하기{{< /nextlink >}}
{{< nextlink href="/tests/code_coverage" >}}Code Coverage에 대해 알아보기{{< /nextlink >}}
{{< nextlink href="/tests/browser_tests" >}}Browser RUM을 사용하여 Cypress 브라우저 테스트 계측하기{{< /nextlink >}}
{{< nextlink href="/tests/swift_tests" >}}RUM으로 Swift 테스트 계측하기{{< /nextlink >}}
{{< /whatsnext >}}

## CI 테스트 데이터 사용 {#use-ci-tests-data}

{{% ci-information-collected %}}

[대시보드][4] 또는 [노트북][5]을 생성하는 경우 검색 쿼리에서 CI 테스트 데이터를 사용할 수 있으며 이는 시각화 위젯 옵션을 업데이트합니다. 자세한 내용은 [Dashboards][6] 및 [Notebooks 문서][7]를 참조하세요.

## 테스트 데이터에 경보 설정{#alert-on-test-data}

실패하거나 불안정한 테스트 또는 CI 테스트의 성능을 평가할 때, {{< ui >}}Export{{< /ui >}} 버튼을 클릭하여 [Test Optimization Explorer][8]에서 [CI Test monitor][9]로 검색 쿼리를 내보낼 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test/health
[2]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[3]: /ko/continuous_integration/explorer/facets/
[4]: https://app.datadoghq.com/dashboard/lists
[5]: https://app.datadoghq.com/notebook/list
[6]: /ko/dashboards
[7]: /ko/notebooks
[8]: https://app.datadoghq.com/ci/test-runs
[9]: /ko/monitors/types/ci/
[10]: /ko/tests/setup/bazel/