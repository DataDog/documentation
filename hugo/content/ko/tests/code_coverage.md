---
aliases:
- /ko/continuous_integration/guides/code_coverage/
- /ko/continuous_integration/integrate_tests/code_coverage/
- /ko/continuous_integration/tests/code_coverage/
description: Datadog에서 코드 적용 범위를 보고하고 사용하는 방법을 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: 블로그
  text: Datadog의 GitLab 소스 코드 통합으로 더 빠르게 문제 해결하기
- link: /tests
  tag: 설명서
  text: Test Optimization에 대해 알아보기
- link: /monitors/types/ci
  tag: 설명서
  text: CI 모니터링에 대해 알아보기
title: Datadog의 코드 적용 범위
---
<div class="alert alert-warning">
이 Test Optimization 기능은 레거시입니다. 대신 새로운 전용 <a href="https://docs.datadoghq.com/code_coverage/">Code Coverage</a> 제품을 사용하세요.
</div>

## 개요 {#overview}

코드 적용 범위는 모듈이나 세션이 실행하는 전체 코드 적용 범위 백분율을 측정하는 지표입니다.

[Test Optimization][1]이 사용 중인 언어에 대해 이미 설정되어 있는지 확인하세요.

## 코드 적용 범위 보고 {#report-code-coverage}

{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

### 호환성 {#compatibility}

* `dd-trace>=4.45.0` 및 `dd-trace>=5.21.0`
* `jest>=24.8.0`. `jest-circus`로 실행할 때만 해당합니다.
* `mocha>=5.2.0`
* `cucumber-js>=7.0.0`
* `vitest>=2.0.0`

<div class="alert alert-danger">
  <strong>참고</strong>: Datadog Tracer는 코드 적용 범위를 생성하지 않습니다. 코드 적용 범위가 활성화된 상태에서 테스트를 실행하는 경우 <code>dd-trace</code> 는 테스트 세션의 <code>test.code_coverage.lines_pct</code> 태그 아래에서 이를 자동으로 보고합니다.
</div>

#### Mocha/Cucumber-js {#mochacucumber-js}

`mocha` 및 `cucumber-js`에 대해서는 [`Istanbul`][1] 코드 적용 범위만 지원됩니다.

`mocha` 및 `cucumber-js` 테스트 세션에서 전체 코드 적용 범위를 보고하려면 [`nyc`][2]를 설치하고 테스트 명령을 래핑하세요.

1. `nyc`를 설치합니다.

```
npm install --save-dev nyc
```

2. `nyc`로 테스트 명령을 래핑합니다.

```json
{
  "scripts": {
    "test": "mocha",
    "coverage": "nyc npm run test"
  }
}
```

#### Jest {#jest}
Jest에는 Istanbul이 기본적으로 포함되어 있으므로 `nyc`를 설치할 필요가 없습니다. `--coverage`를 전달하기만 하면 됩니다.

```json
{
  "scripts": {
    "coverage": "jest --coverage"
  }
}
```

지원되는 유일한 [`coverageProvider`][3]는 기본값인 `babel`입니다.

#### Vitest {#vitest}
Vitest를 코드 적용 범위와 함께 실행하려면 추가 종속성이 필요합니다. 자세한 내용은 [vitest 문서][4]를 참조하세요. 종속성을 설치한 후 테스트 명령에 `--coverage`를 전달하세요.

```json
{
  "scripts": {
    "coverage": "vitest run --coverage"
  }
}
```

테스트 명령을 수정한 후 새로운 `coverage` 명령으로 테스트를 실행하세요.

```
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-service npm run coverage
```


[1]: https://istanbul.js.org/
[2]: https://github.com/istanbuljs/nyc
[3]: https://jestjs.io/docs/configuration#coverageprovider-string
[4]: https://vitest.dev/guide/coverage.html
{{% /tab %}}

{{% tab ".NET" %}}

### 호환성 {#compatibility-1}
* `dd-trace>=2.31.0`.

코드 적용 범위를 사용할 수 있는 경우, Datadog Tracer(v2.31.0 이상)가 테스트 세션의 `test.code_coverage.lines_pct` 태그 아래에서 이를 보고합니다.

[Coverlet][1]을 사용하여 코드 적용 범위를 계산하는 경우 `dd-trace`를 실행할 때 `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` 환경 변수에 보고서 파일 경로를 지정하세요. 보고서 파일은 OpenCover 또는 Cobertura 형식이어야 합니다. 또는 `DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true` 환경 변수를 사용하여 Datadog Tracer의 내장 코드 적용 범위 계산을 활성화할 수 있습니다.

**참고**: `dd-trace ci run`에 의해 계측된 명령이 `dotnet test`, `dotnet vstest` 또는 `vstest.console`인 경우에만 `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH`를 사용합니다. 예를 들어, `dd-trace ci run -- coverlet TestAssembly.dll --target dotnet --targetargs "test TestAssembly.dll"`을 실행할 때는 변수의 결과가 무시됩니다.

### 고급 옵션 {#advanced-options}

Datadog Tracer의 내장 코드 적용 범위는 `.runsettings` 파일을 통해 `Coverlet` 및 `VS Code Coverage` 옵션을 모두 지원합니다.

#### 파일 구조 {#file-structure}

```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
    <DataCollectionRunSettings>
        <DataCollectors>
            <DataCollector friendlyName="DatadogCoverage">
                <Configuration>
                    <!-- Datadog Code Coverage settings -->
                    ...
                </Configuration>
            </DataCollector>
        </DataCollectors>
    </DataCollectionRunSettings>
</RunSettings>
```

#### Coverlet 옵션 {#coverlet-options}

| 옵션                   | 요약                                                                                                                                                         |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ExcludeByAttribute       | 특성이 적용된 메서드, 클래스 또는 어셈블리를 코드 적용 범위에서 제외합니다.                                                                                                                |
| ExcludeByFile            | 특정 소스 파일을 코드 적용 범위에서 제외합니다.                                                                                                                |
| Exclude                  | 필터 표현식을 사용하여 코드 적용 범위 분석에서 제외합니다.                                                                                                  |

##### 특성 {#attributes}

`System.Diagnostics.CodeAnalysis` 네임스페이스에 있는 `ExcludeFromCodeCoverage` 특성을 생성하고 적용하여 메서드, 전체 클래스 또는 어셈블리를 코드 적용 범위에서 제외할 수 있습니다.

`ExcludeByAttribute` 속성과 특성의 짧은 이름(네임스페이스를 제외한 유형 이름)을 사용하여 추가 특성을 제외합니다.

##### 소스 파일 {#source-files}

`ExcludeByFile` 속성을 사용하여 특정 소스 파일을 코드 적용 범위에서 제외합니다.

* 경로를 하나 사용하거나 여러 개 사용하는 경우 쉼표로 구분하세요.
* 와일드카드(`*`)가 포함된 파일 경로 또는 디렉터리 경로를 사용하세요(예: `dir1/*.cs`).

##### 필터 {#filters}

필터는 다음 구문과 함께 **필터 표현식**을 사용하여 제외할 항목을 세밀하게 제어합니다.

`[<ASSEMBLY_FILTER>]<TYPE_FILTER>`

**와일드카드**가 지원됩니다.

* `*` => 0개 이상의 문자와 일치
* `?` => 접두사가 붙은 문자는 선택 사항입니다

**예시**:

* `[*]*` => 모든 어셈블리의 모든 유형을 제외합니다(아무것도 계측되지 않음)
* `[coverlet.*]Coverlet.Core.Coverage` => `coverlet.*`과 일치하는 모든 어셈블리(예: `coverlet.core`)에 속하는 `Coverlet.Core` 네임스페이스에서 `Coverage` 클래스를 제외합니다.
* `[*]Coverlet.Core.Instrumentation.*` => 모든 어셈블리의 `Coverlet.Core.Instrumentation` 네임스페이스에 속하는 모든 유형을 제외합니다
* `[coverlet.*.tests?]*` => `coverlet.`으로 시작하고 `.test` 또는 `.tests`로 끝나는 모든 어셈블리의 모든 유형을 제외합니다(`?`는 `s`를 선택 사항으로 만듦).
* `[coverlet.*]*,[*]Coverlet.Core*\` => `coverlet.*`과 일치하는 어셈블리를 제외하고 모든 어셈블리의 `Coverlet.Core` 네임스페이스에 속하는 모든 유형을 제외합니다

#### VS 코드 적용 범위 옵션 {#vs-code-coverage-options}


추가 정보는 Microsoft 설명서의 [코드 적용 범위 분석 사용자 지정][2]을 참조하세요.

| 옵션                   | 요약                                                                                                                                                         |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Attributes\Exclude       | 특성이 적용된 메서드, 클래스 또는 어셈블리를 코드 적용 범위에서 제외합니다.                                                                                                                |
| Sources\Exclude          | 특정 소스 파일을 코드 적용 범위에서 제외합니다.                                                                                                                |

#### Runsettings 예시 {#runsettings-example}

```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
    <DataCollectionRunSettings>
        <DataCollectors>
            <DataCollector friendlyName="DatadogCoverage">
                <Configuration>
                    <!-- Coverlet configuration -->
                    <ExcludeByAttribute>CompilerGeneratedAttribute</ExcludeByAttribute>
                    <ExcludeByFile>**/Fibonorial.cs</ExcludeByFile>
                    <Exclude>[myproject.*.tests?]*</Exclude>

                    <!-- VS Code Coverage configuration -->
                    <CodeCoverage>
                        <Attributes>
                            <Exclude>
                                <Attribute>^System\.ObsoleteAttribute$</Attribute>
                            </Exclude>
                        </Attributes>
                        <Sources>
                            <Exclude>
                                <Source>^MyFile\.cs$</Source>
                            </Exclude>
                        </Sources>
                    </CodeCoverage>
                </Configuration>
            </DataCollector>
        </DataCollectors>
    </DataCollectionRunSettings>
</RunSettings>
```

[1]: https://github.com/coverlet-coverage/coverlet
[2]: https://learn.microsoft.com/en-us/visualstudio/test/customizing-code-coverage-analysis?view=vs-2022
{{% /tab %}}
{{% tab "Java" %}}

### 호환성 {#compatibility-2}
* `dd-trace-java >= 1.24.2`.

코드 적용 범위를 사용할 수 있는 경우 Datadog Tracer가 테스트 세션의 `test.code_coverage.lines_pct` 태그 아래에서 이를 보고합니다.

[Jacoco][1]는 코드 적용 범위 라이브러리로 지원됩니다.

프로젝트에 Jacoco가 이미 구성되어 있으면 Datadog Tracer가 이를 계측하고 적용 범위 데이터를 Datadog에 자동으로 보고합니다.

그렇지 않은 경우 런타임에 테스트 실행에 Jacoco를 추가하도록 SDK를 구성할 수 있습니다.
`DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION` 환경 변수를 사용하여 주입할 [Jacoco 버전][2]을 지정하세요(예: `DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION=0.8.11`).


[1]: https://www.eclemma.org/jacoco/
[2]: https://mvnrepository.com/artifact/org.jacoco/org.jacoco.agent
{{% /tab %}}
{{% tab "Python" %}}

### 호환성 {#compatibility-3}

* `dd-trace>=2.5.0`.
* `Python>=3.7`.
* `coverage>=4.4.2`.
* `pytest>=3.0.0`.
* `pytest-cov>=2.7.0`.
* `unittest>=3.8`.
* [`coverage.py`][1] 및 [`pytest-cov`][2] 코드 적용 범위만 지원됩니다.


[`coverage.py`][1] 또는 [`pytest-cov`][2]로 테스트를 계측하면 Datadog Tracer가 테스트 세션의 `test.code_coverage.lines_pct` 태그 아래에서 코드 적용 범위를 자동으로 보고합니다.

[`coverage.py`][1]를 사용하여 테스트 세션에서 전체 코드 적용 범위를 보고하려면 다음 단계를 따르세요.

1. `coverage`를 설치합니다.

```
python3 -m pip install coverage
```

2. 새 `coverage` 명령으로 테스트를 실행합니다.

```
DD_ENV=ci DD_SERVICE=my-python-service coverage run -m pytest
```

또는 [`pytest-cov`][2]를 사용하여 테스트 세션에서 전체 코드 적용 범위를 보고하려면 다음 단계를 따르세요.

1. `pytest`를 설치합니다.

```
python3 -m pip install pytest
```

2. `pytest-cov`를 설치합니다.

```
python3 -m pip install pytest-cov
```

3. `pytest` 명령에 `--cov` 플래그를 추가하여 테스트를 실행합니다.

```
DD_ENV=ci DD_SERVICE=my-python-service pytest --cov
```

[1]: https://github.com/nedbat/coveragepy
[2]: https://github.com/pytest-dev/pytest-cov
{{% /tab %}}
{{% tab "Ruby" %}}

### 호환성 {#compatibility-4}

* `datadog-ci-rb>=1.7.0`
* `simplecov>=0.18.0`.

<div class="alert alert-danger">
  <strong>참고</strong>: Datadog 라이브러리는 전체 코드 적용 범위를 생성하지 않습니다. 코드 적용 범위가 활성화된 상태에서 테스트를 실행하는 경우 <code>datadog-ci-rb</code> 는 테스트 세션의 <code>test.code_coverage.lines_pct</code> 태그 아래에서 이를 자동으로 보고합니다.
</div>

프로젝트에 [simplecov][1]가 구성되어 있으면 datadog-ci-rb 라이브러리가 이를 계측하고 테스트 세션의 `test.code_coverage.lines_pct` 태그 아래에서 적용 범위 데이터를 Datadog에 자동으로 보고합니다.

이 기능은 기본적으로 활성화되어 있습니다. `DD_CIVISIBILITY_SIMPLECOV_INSTRUMENTATION_ENABLED` 환경 변수를 사용하면 이 기능을 비활성화할 수 있습니다(예: `DD_CIVISIBILITY_SIMPLECOV_INSTRUMENTATION_ENABLED=0`).

[1]: https://github.com/simplecov-ruby/simplecov
{{% /tab %}}

{{% tab "Go" %}}

### 호환성 {#compatibility-5}

* `go test -cover`

<div class="alert alert-danger">
  <strong>참고</strong>: Datadog 라이브러리는 전체 코드 적용 범위를 생성하지 않습니다. 코드 적용 범위가 활성화된 상태에서 테스트를 실행하는 경우 <code>ddtest instrument</code> 는 테스트 세션의 <code>test.code_coverage.lines_pct</code> 태그 아래에서 이를 자동으로 보고합니다.
</div>

테스트가 `-cover` 플래그와 함께 실행되면 `ddtest instrument`가 테스트 세션의 `test.code_coverage.lines_pct` 태그 아래에서 적용 범위 데이터를 Datadog에 자동으로 보고합니다. `go test`이 두 개 이상의 패키지를 실행할 때는 세션 합계가 해당 프로필에서 나오므로 `-coverprofile`도 설정하세요.

{{% /tab %}}

{{% tab "Swift" %}}

### 호환성 {#compatibility-6}
* `dd-sdk-swift-testing>=2.5.3`.
* `Xcode>=14.3`.

코드 적용 범위가 활성화되면 Datadog Tracer가 테스트 세션의 `test.code_coverage.lines_pct` 태그 아래에서 이를 보고합니다.

Xcode 프로젝트에서 코드 적용 범위를 활성화하려면 Apple: [테스트 계획에서 코드 적용 범위 활성화][1]의 가이드를 따르세요.

SPM 테스트의 경우 `swift test` 호출에 `--enable-code-coverage` 파라미터를 추가하세요.

[1]: https://developer.apple.com/documentation/xcode/determining-how-much-code-your-tests-cover#Enable-code-coverage-in-your-test-plan
{{% /tab %}}

{{% tab "JUnit 보고서 업로드" %}}

### 호환성 {#compatibility-7}
* `datadog-ci>=2.17.2`.

JUnit 보고서 업로드를 사용할 때 코드 적용 범위 백분율 값을 업로드할 수 있습니다.

```shell
datadog-ci junit upload --service <service_name> --report-measures=test.code_coverage.lines_pct:85 <path>
```

이 예시에서 `85`는 테스트가 커버하는 코드 라인의 백분율이며, 이 수치는 다른 도구를 사용하여 생성해야 합니다.

코드 적용 범위 보고서는 별도의 프로세스에서 생성해야 합니다. 그렇지 않으면 JUnit 보고서 업로드를 통해 코드 적용 범위 보고서가 생성되지 않습니다. 보고된 메트릭 이름은 `test.code_coverage.lines_pct`여야 합니다.

{{% /tab %}}
{{< /tabs >}}

## 그래프로 코드 적용 범위 표시 {#graph-code-coverage}

보고된 코드 적용 범위는 `@test.code_coverage.lines_pct`로 보고되며, 이는 패싯의 전체 백분율을 나타내고 CI Visibility Explorer에서 다른 측정 패싯과 마찬가지로 그래프로 표시할 수 있습니다.

{{< img src="/continuous_integration/graph_code_coverage.png" text="Graph code coverage" style="width:100%" >}}

## 테스트 세션 적용 범위 탭 {#test-session-coverage-tab}

보고된 코드 적용 범위는 테스트 세션 세부 정보 페이지의 {{< ui >}}Coverage{{< /ui >}} 탭에도 표시됩니다.

{{< img src="/continuous_integration/code_coverage_tab.png" text="Test sessions code coverage tab" style="width:100%" >}}


## 그래프 내보내기 {#export-your-graph}

{{< ui >}}Export{{< /ui >}} 버튼을 클릭하여 그래프를 [대시보드][2] 또는 [노트북][3]으로 내보내고, 이를 기반으로 [모니터][4]를 생성할 수 있습니다.

{{< img src="/continuous_integration/code_coverage_export_to.png" text="Export code coverage" style="width:60%" >}}


## 모니터 추가 {#add-a-monitor}

[CI 테스트 모니터][5]를 생성하여 서비스의 코드 적용 범위가 특정 임계값 아래로 떨어질 때마다 경보를 받을 수 있습니다.

{{< img src="/continuous_integration/code_coverage_monitor.png" text="Code coverage monitor" style="width:100%" >}}

## 브랜치의 코드 적용 범위 변화 확인 {#see-your-branchs-code-coverage-evolution}

[Branch Overview 페이지][6]에서 코드 적용 범위의 변화를 확인하고 개선되고 있는지 또는 악화되고 있는지 확인할 수도 있습니다.

{{< img src="/continuous_integration/code_coverage_branch_view.png" text="Branch view's code coverage" style="width:100%" >}}


## 풀 리퀘스트의 코드 적용 범위 변경 사항 표시 {#show-code-coverage-change-of-a-pull-request}

풀 리퀘스트의 [테스트 요약 코멘트][7]는 기본 브랜치와 비교한 GitHub 풀 리퀘스트의 코드 적용 범위 변경 사항을 보여줍니다.

## Test Impact Analysis 및 전체 코드 적용 범위 {#test-impact-analysis-and-total-code-coverage}

[Test Impact Analysis][8]는 작동을 위해 _테스트별_ 코드 적용 범위를 필요로 하지만 전체 코드 적용 범위 측정값을 자동으로 제공하지는 **않습니다**.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/tests/
[2]: /ko/dashboards
[3]: /ko/notebooks
[4]: /ko/monitors
[5]: /ko/monitors/types/ci/#maintain-code-coverage-percentage
[6]: /ko/continuous_integration/tests/developer_workflows#branch-overview
[7]: /ko/tests/developer_workflows/#test-summaries-in-github-pull-requests
[8]: /ko/tests/test_impact_analysis