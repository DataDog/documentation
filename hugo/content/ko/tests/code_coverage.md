---
aliases:
- /ko/continuous_integration/guides/code_coverage/
- /ko/continuous_integration/integrate_tests/code_coverage/
- /ko/continuous_integration/tests/code_coverage/
description: Datadog에서 코드 검사를 보고하고 사용하는 방법 알아보기
further_reading:
- link: /tests
  tag: 설명서
  text: 테스트 가시성에 대해 알아보기
- link: /monitors/types/ci
  tag: 설명서
  text: CI 모니터링에 대해 알아보기
title: Datadog에서 코드 검사하기
---

## 개요

코드 검사는 모듈 또는 세션이 실행하는 총 코드 검사 백분율의 측정값입니다.

[테스트 가시성][1]이 내 언어에 이미 설정되어 있는지 확인합니다.

## 코드 검사 보고하기

{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

### 호환성

* `dd-trace>=3.20.0`.
* `jest>=24.8.0`로 실행할 때만 `jest-circus`입니다.
* `mocha>=5.2.0`.
* `cucumber-js>=7.0.0`.
* [`Istanbul`][101] 코드 검사만 지원됩니다.


[이스탄불(Istanbul)][101]로 테스트를 계측하면 Datadog 트레이서는 테스트 세션에 대해 `test.code_coverage.lines_pct` 태그 아래에 코드 검사 결과를 자동으로 보고합니다. 이스탄불로 테스트를 계측하려면 [`nyc`][102]를 사용할 수 있습니다.

테스트 세션에서 모든 코드 검사를 보고하려면 다음 단계를 따르세요.

1. `nyc` 설치:
```
npm install --save-dev nyc
```

2. 테스트 명령을 `nyc`로 래핑합니다.
```json
{
  "scripts": {
    "test": "mocha",
    "coverage": "nyc npm run test"
  }
}
```

<div class="alert alert-danger">
  <strong>참고</strong>: 제스트(Jest)에는 기본적으로 이스탄불(Istanbul)이 포함되어 있으므로 <code>nyc</code>를 설치하지 않아도 됩니다. <code>--coverage</code>를 전달하기만 하면 됩니다.
</div>

```json
{
  "scripts": {
    "coverage": "jest --coverage"
  }
}
```

3. 새로운 `coverage` 명령으로 테스트를 실행합니다.
```
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-service npm run coverage
```


[101]: https://istanbul.js.org/
[102]: https://github.com/istanbuljs/nyc
{{% /tab %}}

{{% tab ".NET" %}}

### 호환성
* `dd-trace>=2.31.0`.

코드 검사를 사용할 수 있는 경우, Datadog 트레이서(2.31.0 버전 이상)가 테스트 세션 동안 `test.code_coverage.lines_pct` 태그 아래에 이를 보고합니다.

코드 검사를 컴퓨팅하는 데 [Coverlet][101]를 사용하는 경우, `dd-trace` 실행 시 `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` 환경 변수에서 보고서 파일로의 경로를 지정합니다. 보고서 파일은 OpenCover 또는 Cobertura 형식이어야 합니다. 대신, `DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true` 환경 변수를 사용해 Datadog 트레이서의 내장 코드 검사 계산을 활성화할 수 있습니다.

### 고급 옵션

Datadog 트레이서의 기본 제공 코드 검사는 `.runsettings` 파일로 `Coverlet` 및 `VS Code Coverage` 옵션을 모두 지원합니다.

#### 파일 구조
```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
    <DataCollectionRunSettings>
        <DataCollectors>
            <DataCollector friendlyName="DatadogCoverage">
                <Configuration>
                    <!-- Datadog 코드 검사 설정 -->
                    ...
                </Configuration>
            </DataCollector>
        </DataCollectors>
    </DataCollectionRunSettings>
</RunSettings>
```

#### Coverlet 옵션

| 옵션                   | 요약                                                                                                                                                         |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ExcludeByAttribute       | 코드 검사에서 속성이 추가된 메서드, 클래스 또는 어셈블리를 제외합니다.                                                                                                                |
| ExcludeByFile            | 코드 검사에서 특정 소스 파일을 제외합니다.                                                                                                                |
| 제외                  | 필터 정규 표현식을 사용하여 코드 검사 분석에서 제외합니다.                                                                                                  |

##### 속성

`System.Diagnostics.CodeAnalysis` 네임스페이스에 있는 `ExcludeFromCodeCoverage` 속성을 생성 및 적용하여 메서드, 전체 클래스 또는 어셈블리를 코드 검사에서 제외합니다.

`ExcludeByAttribute` 속성과 속성의 짧은 이름(네임스페이스을 제외한 유형 이름)이 있는 추가 속성은 제외합니다.

##### 소스 파일

`ExcludeByFile` 속성을 사용하여 코드 검사에서 특정 소스 파일을 제외합니다.

* 콤마로 구분하여 단일 또는 다중 경로를 사용합니다.
* 와일드카드(`*`)가 있는 파일 경로 또는 디렉토리 경로를 사용합니다(예: `dir1/*.cs`).

##### 필터링

다음 구문의 **필터 정규 표현식**을 사용하여 필터링으로 제외되는 항목을 세밀하게 제어할 수 있습니다.

`[<ASSEMBLY_FILTER>]<TYPE_FILTER>`

**와일드카드**가 지원됩니다.

* `*` => 0개 이상의 문자와 일치
* `?` => 접두어 문자는 옵션입니다.

**예시**:

* `[*]*` => 전체 어셈블리의 모든 유형을 제외합니다(계측되지 않음).
* `[coverlet.*]Coverlet.Core.Coverage` => `coverlet.*`와 일치하는 어셈블리(예: `coverlet.core`)에 속하는 `Coverlet.Core` 네임스페이스에서 `Coverage` 클래스를 제외합니다.
* `[*]Coverlet.Core.Instrumentation.*` => 전체 어셈블리에서 `Coverlet.Core.Instrumentation` 네임스페이스에 속하는 모든 유형을 제외합니다.
* `[coverlet.*.tests?]*` => `coverlet.`로 시작하고 `.test` 또는 `.tests`로 끝나는 전체 어셈블리의 모든 유형을 제외합니다( `?`은 `s` 옵션을 생성).
* `[coverlet.*]*,[*]Coverlet.Core*\` => `coverlet.*`와 일치하는 어셈블리를 제외하고, 어셈블리에서 `Coverlet.Core` 네임스페이스에 속하는 모든 유형을 제외합니다.

#### VS 코드 검사 옵션


자세한 내용을 확인하려면 Microsoft 설명서의 [코드 검사 분석 사용자 지정][102]을 참조하세요.

| 옵션                   | 요약                                                                                                                                                         |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Attributes\Exclude       | 코드 검사에서 속성이 추가된 메서드, 클래스 또는 어셈블리를 제외합니다.                                                                                                                |
| Sources\Exclude          | 코드 검사에서 특정 소스 파일을 제외합니다.                                                                                                                |

#### 실행 설정 예시
```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
    <DataCollectionRunSettings>
        <DataCollectors>
            <DataCollector friendlyName="DatadogCoverage">
                <Configuration>
                    <!-- Coverlet 설정 -->
                    <ExcludeByAttribute>CompilerGeneratedAttribute</ExcludeByAttribute>
                    <ExcludeByFile>**/Fibonorial.cs</ExcludeByFile>
                    <Exclude>[myproject.*.tests?]*</Exclude>

                    <!-- VS 코드 검사 설정 -->
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

[101]: https://github.com/coverlet-coverage/coverlet
[102]: https://learn.microsoft.com/en-us/visualstudio/test/customizing-code-coverage-analysis?view=vs-2022
{{% /tab %}}
{{% tab "Java" %}}

### 호환성
* `dd-trace-java >= 1.24.2`.

코드 검사를 사용할 수 있는 경우, Datadog 트레이서가 테스트 세션 동안 `test.code_coverage.lines_pct` 태그 아래에 이를 보고합니다.

[Jacoco][101]는 코드 검사 라이브러리로 지원됩니다.

프로젝트에 이미 Jacoco가 설정되어 있는 경우, Datadog 트레이서가 이를 계측하고 자동으로 Datadog에 해당 검사 데이터를 보고합니다.

또는 트레이서를 사용하여 런타임에 테스트 실행에 Jacoco를 추가할 수 있습니다.
`DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION` 환경 변수로 삽입할 [Jacoco 버전][102]을 지정하세요(예: `DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION=0.8.11`).


[101]: https://www.eclemma.org/jacoco/
[102]: https://mvnrepository.com/artifact/org.jacoco/org.jacoco.agent
{{% /tab %}}
{{% tab "Python" %}}

### 호환성

* `dd-trace>=2.5.0`.
* `Python>=3.7`.
* `coverage>=4.4.2`.
* `pytest>=3.0.0`.
* `pytest-cov>=2.7.0`.
* `unittest>=3.8`.
* [`coverage.py`][101], [`pytest-cov`][102] 코드 검사 만 지원됩니다.


테스트가 [`coverage.py`][101] 또는 [`pytest-cov`][102],로 계측되면 Datadog 트레이서는 테스트 세션의 `test.code_coverage.lines_pct` 태그 아래에 코드 검사를 자동 보고합니다.

[`coverage.py`][101]로 테스트 세션의 총 코드 검사를 보고하려면 다음 단계를 따르세요.

1. `coverage` 설치:
```
python3 -m pip install coverage
```

2. 새로운 `coverage` 명령으로 테스트를 실행합니다.
```
DD_ENV=ci DD_SERVICE=my-python-service coverage run -m pytest
```

또는 [`pytest-cov`][102]로 테스트 세션의 총 코드 검사를 보고하려면 다음 단계를 따르세요.

1. `pytest` 설치:
```
python3 -m pip install pytest
```

2. `pytest-cov` 설치:
```
python3 -m pip install pytest-cov
```

3. 다음과 같이 `--cov` flag to your `pytest` 명령을 추가하여 테스트를 실행합니다.
```
DD_ENV=ci DD_SERVICE=my-python-service pytest --cov
```

[101]: https://github.com/nedbat/coveragepy
[102]: https://github.com/pytest-dev/pytest-cov
{{% /tab %}}
{{% tab "JUnit Report Uploads" %}}

### 호환성
* `datadog-ci>=2.17.2`.

다음과 같이 JUnit 보고서 업로드를 사용할 때 코드 검사 백분율 값을 업로드할 수 있습니다.

```shell
datadog-ci junit upload --service <service_name> --report-measures=test.code_coverage.lines_pct:85 <path>
```

본 예시에서 `85`은 테스트에 포함된 라인의 퍼센테이지 값이며 다른 도구를 사용하여 생성해야 합니다.

코드 검사 보고서는 다른 프로세스에서 생성해야 하며, 그렇지 않은 경우 JUnit 보고서 업로드로 코드 검사 보고서가 생성되지 않습니다. 보고된 메트릭 이름은 `test.code_coverage.lines_pct`이어야 합니다.

{{% /tab %}}
{{< /tabs >}}

## 그래프 코드 검사

보고된 코드 검사는 패싯의 총 백분율을 나타내는 `@test.code_coverage.lines_pct`으로 보고되며, CI 가시성 탐색기에서 다른 측정값 패싯으로 플로팅할 수 있습니다.

{{< img src="/continuous_integration/graph_code_coverage.png" text="그래프 코드 검사" style="width:100%" >}}

## 테스트 세션 검사 탭

보고된 코드 검사는 다음과 같이 테스트 세션 세부 정보 페이지의 **검사** 탭에도 표시됩니다.

{{< img src="/continuous_integration/code_coverage_tab.png" text="테스트 세션 코드 검사 탭" style="width:100%" >}}


## 그래프 내보내기

**내보내기** 버튼을 클릭하여 그래프를 [대시보드][2] 또는 [노트북][3]로 내보내고 다음과 같이 해당 데이터를 기반으로 [모니터링][4]을 생성할 수 있습니다.

{{< img src="/continuous_integration/code_coverage_export_to.png" text="코드 검사 내보내기" style="width:60%" >}}


## 모니터링 추가하기

[CI 테스트 모니터링][5]을 생성하여 서비스의 코드 검사가 특정 임계값 아래로 떨어질 때마다 알림을 받습니다.

{{< img src="/continuous_integration/code_coverage_monitor.png" text="코드 검사 모니터링" style="width:100%" >}}

## 브랜치의 코드 검사 변화 확인하기

또한 [브랜치 개요 페이지][6] 에서 코드 검사의 변화를 확인하여 해당 코드 검사가 개선되었는지 또는 악화되었는지 살펴볼 수 있습니다.

{{< img src="/continuous_integration/code_coverage_branch_view.png" text="브랜치의 코드 검사 보기" style="width:100%" >}}


## 풀 리퀘스트의 코드 검사 변경 사항 표시

풀 리퀘스트의 [테스트 요약 코멘트][7]는 기본 브랜치와 비교하여 GitHub 풀 리퀘스트의 코드 검사 변경 사항을 보여줍니다.

## 지능형 테스트 러너 및 전체 코드 검사

[지능형 테스트 러너][8]는 _테스트당_ 코드 검사 수행이 필요하더라도 총 코드 검사 측정값을 자동으로 제공하지 **않습니다.**

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/tests/
[2]: /ko/dashboards
[3]: /ko/notebooks
[4]: /ko/monitors
[5]: /ko/monitors/types/ci/#maintain-code-coverage-percentage
[6]: /ko/continuous_integration/tests/developer_workflows#branch-overview
[7]: /ko/tests/developer_workflows/#test-summaries-in-github-pull-requests
[8]: /ko/continuous_integration/intelligent_test_runner/