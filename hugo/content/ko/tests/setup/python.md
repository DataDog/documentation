---
aliases:
- /ko/continuous_integration/setup_tests/python
- /ko/continuous_integration/tests/python
- /ko/continuous_integration/tests/setup/python
code_lang: python
code_lang_weight: 30
further_reading:
- link: /continuous_integration/tests/containers/
  tag: 문서
  text: 컨테이너 내 테스트를 위한 환경 변수 전달하기
- link: /continuous_integration/tests
  tag: 문서
  text: 테스트 결과 및 성능 확인하기
- link: /tests/troubleshooting/
  tag: 문서
  text: Test Optimization 문제 해결
title: Python 테스트
type: multi-code-lang
---
## 호환성 {#compatibility}

지원되는 언어:

| 언어 | 버전 |
|---|---|
| Python 2 | >= 2.7 |
| Python 3 | >= 3.6 |

지원되는 테스트 프레임워크:

| 테스트 프레임워크 | 버전 |
|---|---|
| `pytest` | >= 3.0.0 |
| `pytest-benchmark` | >= 3.1.0 |
| `unittest` | >= 3.7 |

<div class="alert alert-info">Bazel을 사용하여 Python 테스트를 실행하는 경우 Datadog <a href="/tests/setup/bazel/python/">Python 테스트용 Bazel 규칙</a>을 사용하세요.</div>

## 보고 메서드 구성 {#configuring-reporting-method}

테스트 결과를 Datadog에 보고하려면 Datadog Python 라이브러리를 설정해야 합니다.

{{< tabs >}}
{{% tab "자동 계측을 지원하는 CI 공급자" %}}
{{% ci-autoinstrumentation %}}
{{% /tab %}}

{{% tab "기타 클라우드 CI 공급자" %}}
{{% ci-agentless %}}
{{% /tab %}}

{{% tab "온프레미스 CI 공급자" %}}
{{% ci-agent %}}
{{% /tab %}}
{{< /tabs >}}

## Python 트레이서 설치 {#installing-the-python-tracer}

다음을 실행해 Python 트레이서를 설치하세요.

{{< code-block lang="shell" >}}
pip install -U ddtrace
{{< /code-block >}}

더 자세한 정보는 [Python 트레이서 설치 문서][1]를 참조하세요.

## 테스트 계측 {#instrumenting-your-tests}

{{< tabs >}}
{{% tab "pytest" %}}

`pytest` 테스트의 계측을 활성화하려면 `pytest`를 실행할 때 `--ddtrace` 옵션을 추가하세요.

{{< code-block lang="shell" >}}
pytest --ddtrace
{{< /code-block >}}

플레임그래프에서 더 많은 정보를 얻기 위해 나머지 APM 통합도 사용하도록 설정하려면 `--ddtrace-patch-all` 옵션을 추가하세요.

{{< code-block lang="shell" >}}
pytest --ddtrace --ddtrace-patch-all
{{< /code-block >}}

추가 구성은 [구성 설정][3]을 참조하세요.

### 테스트에 사용자 지정 태그 추가 {#adding-custom-tags-to-tests}

테스트에 사용자 지정 태그를 추가하려면 테스트의 인수로 `ddspan`을 선언하세요.

```python
from ddtrace import tracer

# Declare `ddspan` as argument to your test
def test_simple_case(ddspan):
    # Set your tags
    ddspan.set_tag("test_owner", "my_team")
    # test continues normally
    # ...
```

이러한 태그에 대한 필터 또는 `group by` 필드를 생성하려면 먼저 패싯을 생성해야 합니다. 태그 추가에 대한 자세한 정보는 Python 사용자 지정 계측 문서의 [태그 추가][1] 섹션을 참조하세요.

### 테스트에 사용자 지정 측정값 추가 {#adding-custom-measures-to-tests}

태그와 마찬가지로 테스트에 사용자 지정 측정값을 추가하려면 현재 활성 스팬을 사용하세요.

```python
from ddtrace import tracer

# Declare `ddspan` as an argument to your test
def test_simple_case(ddspan):
    # Set your tags
    ddspan.set_tag("memory_allocations", 16)
    # test continues normally
    # ...
```
사용자 지정 측정값에 대한 자세한 내용은 [사용자 지정 측정값 추가 가이드][2]를 참조하세요.

[1]: /ko/tracing/trace_collection/custom_instrumentation/python?tab=locally#adding-tags
[2]: /ko/tests/guides/add_custom_measures/?tab=python
[3]: #configuration-settings
{{% /tab %}}

{{% tab "pytest-benchmark" %}}

`pytest-benchmark`로 벤치마크 테스트를 계측하려면 `pytest`을 실행할 때 `--ddtrace` 옵션을 사용하여 벤치마크 테스트를 실행하세요. 그러면 Datadog이 `pytest-benchmark`에서 메트릭을 자동으로 탐지합니다.

```python
def square_value(value):
    return value * value


def test_square_value(benchmark):
    result = benchmark(square_value, 5)
    assert result == 25
```

추가 구성은 [구성 설정][1]을 참조하세요.

[1]: #configuration-settings
{{% /tab %}}

{{% tab "unittest" %}}

`unittest` 테스트의 계측을 활성화하려면 `unittest` 명령의 시작 부분에 `ddtrace-run`을 추가하여 테스트를 실행하세요.

{{< code-block lang="shell" >}}
ddtrace-run python -m unittest
{{< /code-block >}}

또는 `unittest` 계측을 수동으로 활성화하려면 `patch()`를 사용하여 통합을 활성화하세요.

{{< code-block lang="python" >}}
from ddtrace import patch
import unittest
patch(unittest=True)

class MyTest(unittest.TestCase):
def test_will_pass(self):
assert True
{{< /code-block >}}

추가 구성은 [구성 설정][1]을 참조하세요.

[1]: #configuration-settings
{{% /tab %}}

{{% tab "수동 계측(베타)" %}}

### 수동 테스트 API {#manual-testing-api}

<div class="alert alert-warning">Test Optimization 수동 테스트 API는 <strong>베타</strong>로 제공되며 변경될 수 있습니다.</div>

`2.13.0` 버전부터 [Datadog Python SDK][1]는 필요에 따라 테스트 최적화 결과를 제출할 수 있는 Test Optimization API(`ddtrace.ext.test_visibility`)를 제공합니다.

#### API 실행 {#api-execution}

이 API는 클래스를 사용하여 테스트 최적화 이벤트를 제출하는 네임스페이스 메서드를 제공합니다.

테스트 실행에는 두 가지 단계가 있습니다.
- 검색: 예상되는 항목을 API에 알림
- 실행: 결과 제출(시작 및 완료 호출 사용)

검색 단계와 실행 단계가 분리되어 있어 테스트 러너 프로세스가 테스트를 수집하는 시점과 테스트가 시작되는 시점 사이에 간격을 둘 수 있습니다.

API 사용자는 API의 상태 저장소 내에서 Test Optimization 항목을 참조하는 데 사용되는 일관된 식별자(아래 설명됨)를 제공해야 합니다.

##### 활성화 `test_visibility` {#enable-test-visibility}

Test Optimization API를 사용하기 전에 `ddtrace.ext.test_visibility.api.enable_test_visibility()` 함수를 호출해야 합니다.

데이터가 올바르게 플러시되도록 프로세스가 종료되기 전에 `ddtrace.ext.test_visibility.api.disable_test_visibility()` 함수를 호출합니다.

#### 도메인 모델 {#domain-model}

API는 테스트 세션, 테스트 모듈, 테스트 모음 및 테스트란 네 개의 개념을 기반으로 합니다.

모듈, 모음, 테스트는 Python Test Optimization API에서 계층 구조를 형성하며, 이는 항목 식별자의 상위 관계에 의해 표현됩니다.

##### 테스트 세션 {#test-session}

테스트 세션은 프로젝트의 테스트 실행을 나타내며, 일반적으로 테스트 명령의 실행에 해당합니다. Test Optimization 프로그램 실행 시 하나의 세션만 검색하고 시작 및 완료할 수 있습니다.

`ddtrace.ext.test_visibility.api.TestSession.discover()`를 호출하여 세션을 검색하고 테스트 명령, 지정된 프레임워크 이름 및 버전을 전달합니다.

`ddtrace.ext.test_visibility.api.TestSession.start()`를 호출하여 세션을 시작합니다.

테스트가 완료되면 `ddtrace.ext.test_visibility.api.TestSession.finish()`를 호출합니다.


##### 테스트 모듈 {#test-module}

테스트 모듈은 프로젝트 테스트 실행 내의 더 작은 작업 단위(예: 디렉터리)를 나타냅니다.

`ddtrace.ext.test_visibility.api.TestModuleId()`을(를) 호출하고 모듈 이름을 파라미터로 제공하여 `TestModuleId`를 생성하세요.

`ddtrace.ext.test_visibility.api.TestModule.discover()`를 호출하고 `TestModuleId` 객체를 인수로 전달하여 모듈을 검색하세요.

`TestModuleId` 객체를 인수로 전달하여 `ddtrace.ext.test_visibility.api.TestModule.start()`를 호출하고 모듈을 시작하세요.

모듈 내의 모든 하위 항목이 완료된 후 `TestModuleId` 객체를 인수로 전달하여 `ddtrace.ext.test_visibility.api.TestModule.finish()`를 호출하세요.


##### 테스트 모음 {#test-suite}

테스트 모음은 프로젝트 모듈 내 테스트의 하위 집합(`.py` 파일 등)을 나타냅니다.

`TestSuiteId`를 생성하려면 상위 모듈의 `TestModuleId`와 모음 이름을 인수로 제공하여 `ddtrace.ext.test_visibility.api.TestSuiteId()`를 호출하세요.

`TestSuiteId` 객체를 인수로 전달하여 `ddtrace.ext.test_visibility.api.TestSuite.discover()`를 호출하고 모음을 검색하세요.

`TestSuiteId` 객체를 인수로 전달하여 `ddtrace.ext.test_visibility.api.TestSuite.start()`를 호출하고 모듈을 시작하세요.

모음 내의 모든 하위 항목이 완료된 후 `TestSuiteId` 객체를 인수로 전달하여 `ddtrace.ext.test_visibility.api.TestSuite.finish()`를 호출하세요.

##### 테스트 {#test}

테스트는 테스트 모음의 일부로 실행되는 단일 테스트 케이스를 나타냅니다.

`TestId`를 생성하려면 상위 모음의 `TestSuiteId`와 테스트 이름을 인수로 제공하여 `ddtrace.ext.test_visibility.api.TestId()`를 호출하세요. `TestId()` 메서드는 선택적 `parameters` 인수로 JSON 파싱 가능한 문자열을 허용합니다. `parameters` 인수는 이름은 같지만 파라미터 값이 다른 파라미터화된 테스트를 구분하는 데 사용할 수 있습니다.

`ddtrace.ext.test_visibility.api.Test.discover()`를 호출하고 `TestId` 객체를 인수로 전달하여 테스트를 검색하세요. `Test.discover()` 클래스 메서드는 선택적 `resource` 파라미터로 문자열을 허용하며, 기본값은 `TestId`의 `name`입니다.

`ddtrace.ext.test_visibility.api.Test.start()`를 호출하고 `TestId` 객체를 인수로 전달하여 테스트를 시작하세요.

`ddtrace.ext.test_visibility.api.Test.mark_pass()`를 호출하고 `TestId` 객체를 인수로 전달하여 테스트가 성공적으로 통과했음을 표시하세요.
`ddtrace.ext.test_visibility.api.Test.mark_fail()`을 호출하고 `TestId` 객체를 인수로 전달하여 테스트가 실패했음을 표시하세요. `mark_fail()`은 선택적 `TestExcInfo` 객체를 `exc_info` 파라미터로 허용합니다.
`ddtrace.ext.test_visibility.api.Test.mark_skip()`을 호출하고 `TestId` 객체를 인수로 전달하여 테스트가 건너뛰어졌음을 표시하세요. `mark_skip()`은 선택적 문자열을 `skip_reason` 파라미터로 허용합니다.

###### 예외 정보 {#exception-information}

`ddtrace.ext.test_visibility.api.Test.mark_fail()` 클래스 메서드는 테스트 실패 중에 발생한 예외에 대한 정보를 보유합니다.

`ddtrace.ext.test_visibility.api.TestExcInfo()` 메서드는 세 개의 위치 파라미터를 사용합니다.
- `exc_type`: 발생한 예외의 유형
- `exc_value`: 예외에 대한 `BaseException` 객체
- `exc_traceback`: 예외에 대한 `Traceback` 객체

###### 코드 소유자 정보 {#codeowner-information}

`ddtrace.ext.test_visibility.api.Test.discover()` 클래스 메서드는 `codeowners` 파라미터로 선택적 문자열 목록을 허용합니다.

###### 테스트 소스 파일 정보 {#test-source-file-information}

`ddtrace.ext.test_visibility.api.Test.discover()` 클래스 메서드는 `source_file_info` 파라미터로 선택적 `TestSourceFileInfo` 객체를 허용합니다. `TestSourceFileInfo` 객체는 주어진 테스트의 경로와 필요시 시작 및 종료 라인을 나타냅니다.

`ddtrace.ext.test_visibility.api.TestSourceFileInfo()` 메서드는 세 개의 위치 파라미터를 사용합니다.
- `path`: `pathlib.Path` 객체(`Test Optimization` API에서 리포지토리 루트를 기준으로 상대 경로로 변환)
- `start_line`: 파일 내 테스트의 시작 라인을 나타내는 선택적 정수
- `end_line`: 파일 내 테스트의 종료 라인을 나타내는 선택적 정수

###### 테스트 탐색 후 파라미터 설정{#setting-parameters-after-test-discovery}

`ddtrace.ext.test_visibility.api.Test.set_parameters()` 클래스 메서드는 `TestId` 객체와 JSON으로 파싱 가능한 문자열을 인수로 받아 테스트의 `parameters`를 설정합니다.

**참고:** 이는 테스트와 관련된 파라미터를 덮어쓰지만 `TestId` 객체의 `parameters` 필드는 수정하지 않습니다.

테스트가 탐색된 후 파라미터를 설정하려면 `parameters` 필드가 설정되지 않은 경우에도 `TestId` 객체가 고유해야 합니다.

#### 코드 예시 {#code-example}

```python
from ddtrace.ext.test_visibility import api
import pathlib
import sys

if __name__ == "__main__":
    # Enable the Test Optimization service
    api.enable_test_visibility()

    # Discover items
    api.TestSession.discover("manual_test_api_example", "my_manual_framework", "1.0.0")
    test_module_1_id = api.TestModuleId("module_1")
    api.TestModule.discover(test_module_1_id)

    test_suite_1_id = api.TestSuiteId(test_module_1_id, "suite_1")
    api.TestSuite.discover(test_suite_1_id)

    test_1_id = api.TestId(test_suite_1_id, "test_1")
    api.Test.discover(test_1_id)

    # A parameterized test with codeowners and a source file
    test_2_codeowners = ["team_1", "team_2"]
    test_2_source_info = api.TestSourceFileInfo(pathlib.Path("/path/to_my/tests.py"), 16, 35)

    parametrized_test_2_a_id = api.TestId(
        test_suite_1_id,
        "test_2",
        parameters='{"parameter_1": "value_is_a"}'
    )
    api.Test.discover(
        parametrized_test_2_a_id,
        codeowners=test_2_codeowners,
        source_file_info=test_2_source_info,
        resource="overriden resource name A",
    )

    parametrized_test_2_b_id = api.TestId(
        test_suite_1_id,
        "test_2",
        parameters='{"parameter_1": "value_is_b"}'
    )
    api.Test.discover(
      parametrized_test_2_b_id,
      codeowners=test_2_codeowners,
      source_file_info=test_2_source_info,
      resource="overriden resource name B"
    )

    test_3_id = api.TestId(test_suite_1_id, "test_3")
    api.Test.discover(test_3_id)

    test_4_id = api.TestId(test_suite_1_id, "test_4")
    api.Test.discover(test_4_id)


    # Start and execute items
    api.TestSession.start()

    api.TestModule.start(test_module_1_id)
    api.TestSuite.start(test_suite_1_id)

    # test_1 passes successfully
    api.Test.start(test_1_id)
    api.Test.mark_pass(test_1_id)

    # test_2's first parametrized test succeeds, but the second fails without attaching exception info
    api.Test.start(parametrized_test_2_a_id)
    api.Test.mark_pass(parametrized_test_2_a_id)

    api.Test.start(parametrized_test_2_b_id)
    api.Test.mark_fail(parametrized_test_2_b_id)

    # test_3 is skipped
    api.Test.start(test_3_id)
    api.Test.mark_skip(test_3_id, skip_reason="example skipped test")

    # test_4 fails, and attaches exception info
    api.Test.start(test_4_id)
    try:
      raise(ValueError("this test failed"))
    except:
      api.Test.mark_fail(test_4_id, exc_info=api.TestExcInfo(*sys.exc_info()))

    # Finish suites and modules
    api.TestSuite.finish(test_suite_1_id)
    api.TestModule.finish(test_module_1_id)
    api.TestSession.finish()
```

추가 구성은 [구성 설정][2]을 참조하세요.

[1]: https://github.com/DataDog/dd-trace-py
[2]: #configuration-settings
{{% /tab %}}

{{< /tabs >}}

## 구성 설정 {#configuration-settings}

SDK를 구성하려면 테스트 프로세스를 시작하기 전에 다음 환경 변수를 설정하세요. 병렬 테스트 실행기의 경우, 모든 작업자가 상속받을 수 있도록 상위 프로세스에서 설정하세요.

`DD_SERVICE` (선택 사항)
: 테스트 중인 서비스 또는 라이브러리의 이름입니다.<br/>
**기본값**: 리포지토리 이름. 사용할 수 없는 경우 pytest에는 `test`, unittest에는 `unittest`를 사용합니다.<br/>
**예시**: `my-python-app`

`DD_ENV`(선택 사항)
: 테스트가 실행되는 환경의 이름입니다.<br/>
**기본값**: `none`<br/>
**예시**: `local`, `ci`

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true`(Agentless 모드 사용 시 필수)
: 테스트 결과를 Datadog으로 직접 전송하는 Agentless 모드를 활성화합니다.<br/>
**기본값**: `false`

`DD_API_KEY`(Agentless 모드 사용 시 필수)
: 테스트 결과 업로드를 인증하는 데 사용되는 Datadog API 키입니다. 이 변수는 Agentless 모드를 활성화하지 않습니다.<br/>
**기본값**: `(empty)`

`DD_SITE`(Agentless 모드 사용 시 선택 사항)
: 테스트 결과를 업로드할 [Datadog 사이트][4]입니다. US1 이외의 사이트를 사용할 때 이 구성을 설정하세요.<br/>
**기본값**: `datadoghq.com`

`DD_TRACE_AGENT_URL`(Datadog Agent를 사용할 때만)
: `http://hostname:port` 형식의 트레이스 수집용 Datadog Agent URL입니다.<br/>
**기본값**: `http://localhost:8126`

`DD_TEST_SESSION_NAME`(선택 사항)
: `unit-tests`, `integration-tests` 또는 `smoke-tests`와 같은 테스트 그룹을 식별합니다.<br/>
**기본값**: CI 작업 이름 및 테스트 명령, 또는 CI 작업 이름을 사용할 수 없는 경우 테스트 명령입니다.<br/>
**예시**: `unit-tests`, `integration-tests`, `smoke-tests`

`service` 및 `env` 예약 태그에 대한 자세한 내용은 [Unified Service Tagging][2]을 참조하세요.

다른 모든 [Datadog 트레이서 설정][3] 옵션도 사용할 수 있습니다.

## Git 메타데이터 수집 {#collecting-git-metadata}

{{% ci-git-metadata %}}

## 모범 사례 {#best-practices}

### 테스트 세션 이름 `DD_TEST_SESSION_NAME` {#test-session-name-dd-test-session-name}

`DD_TEST_SESSION_NAME`을 사용하여 테스트 세션의 이름과 관련 테스트 그룹을 정의하세요. 이 태그에 대한 값의 예시는 다음과 같습니다.

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

`DD_TEST_SESSION_NAME`이 지정되지 않은 경우, 기본값은 CI 작업 이름과 테스트 명령입니다. CI 작업 이름을 사용할 수 없는 경우 테스트 명령이 사용됩니다.

서로 다른 테스트 그룹을 구분하는 데 도움이 되도록 테스트 세션 이름은 리포지토리 내에서 고유해야 합니다.

#### `DD_TEST_SESSION_NAME` 사용 시점 {#when-to-use-dd-test-session-name}

Datadog은 테스트 세션 간의 대응 관계를 설정하기 위해 일련의 파라미터를 검사합니다. 테스트를 실행하는 데 사용된 테스트 명령이 그중 하나입니다. 테스트 명령에 임시 폴더와 같이 실행할 때마다 변경되는 문자열이 포함되어 있으면 Datadog은 해당 세션들이 서로 관련이 없다고 간주합니다. 예:

- `pytest --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

테스트 명령이 실행마다 달라지는 경우 Datadog은 `DD_TEST_SESSION_NAME` 사용을 권장합니다.

## 알려진 제한 사항 {#known-limitations}

{{< tabs >}}

{{% tab "pytest" %}}

테스트 실행을 변경하는 `pytest`용 플러그인은 예기치 않은 동작을 유발할 수 있습니다.

### 병렬화 {#parallelization}

`pytest`에 병렬화를 도입하는 플러그인([`pytest-xdist`][1] 또는 [`pytest-forked`][2] 등)은 각 병렬 인스턴스에 대해 하나의 세션 이벤트를 생성합니다.

이러한 플러그인을 `ddtrace`와 함께 사용할 때 몇 가지 문제가 발생하지만, 최근 `dd-trace-py` 버전(3.12.6 이상)에서는 `pytest-xdist`에 대해 이러한 문제가 해결되었습니다. 예를 들어, 개별 테스트가 실패하더라도 세션, 모듈 또는 모음이 통과할 수 있습니다. 마찬가지로 모든 테스트가 통과하더라도 모음, 세션 또는 모듈이 실패할 수 있습니다. 이는 이러한 플러그인이 작업자 하위 프로세스를 생성하고 부모 프로세스에서 생성된 스팬이 자식 프로세스의 결과를 반영하지 못할 수 있기 때문에 발생합니다. 이러한 이유로, **`ddtrace`와 `pytest-forked`를 함께 사용하는 것은 현재 지원되지 않으며, `pytest-xdist`는 `ddtrace>=3.12.6`만 지원합니다.**

각 작업자가 Datadog에 테스트 결과를 독립적으로 보고하므로, 서로 다른 프로세스에서 실행되는 동일한 모듈의 테스트는 별도의 모듈 또는 모음 이벤트를 생성합니다.

테스트 이벤트의 전체 수(및 정확성)는 영향을 받지 않습니다. 개별 세션, 모듈 또는 모음 이벤트는 동일한 `pytest` 실행(`pytest-forked` 사용 시) 내의 다른 이벤트와 일관되지 않은 결과를 가질 수 있습니다.

### 테스트 순서 지정{#test-ordering}

테스트 실행 순서를 변경하는 플러그인([`pytest-randomly`][3] 등)은 여러 모듈 또는 모음 이벤트를 생성할 수 있습니다. 모듈 또는 모음 이벤트의 실행 시간 및 결과는 `pytest`에서 보고된 결과와 일치하지 않을 수 있습니다.

테스트 이벤트의 전체 수(및 정확성)는 영향을 받지 않습니다.


[1]: https://pypi.org/project/pytest-xdist/
[2]: https://pypi.org/project/pytest-forked/
[3]: https://pypi.org/project/pytest-randomly/

{{% /tab %}}

{{% tab "unittest" %}}

일부 경우에는 `unittest` 테스트 실행이 병렬 방식으로 실행되면 계측이 중단되고 테스트 최적화에 영향을 줄 수 있습니다.

Datadog은 테스트 최적화에 영향을 주지 않도록 한 번에 하나의 프로세스만 사용할 것을 권장합니다.

{{% /tab %}}

{{< /tabs >}}


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/dd_libraries/python/
[2]: /ko/getting_started/tagging/unified_service_tagging
[3]: /ko/tracing/trace_collection/library_config/python/?tab=containers#configuration
[4]: /ko/getting_started/site/