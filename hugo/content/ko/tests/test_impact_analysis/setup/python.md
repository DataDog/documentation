---
aliases:
- /ko/continuous_integration/intelligent_test_runner/python/
- /ko/continuous_integration/intelligent_test_runner/setup/python/
- /ko/intelligent_test_runner/setup/python
code_lang: python
code_lang_weight: 30
further_reading:
- link: /continuous_integration/tests
  tag: 설명서
  text: 테스트 결과 및 성능 탐색
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: CI Visibility 문제 해결
title: Python용 Test Impact Analysis
type: multi-code-lang
---

## 호환성

Test Impact Analysis는 다음 버전 및 테스트 프레임워크에서만 지원됩니다.

* `pytest>=7.2.0`
  * `ddtrace>=2.1.0`부터.
  * `Python>=3.7`부터.
  * `coverage>=5.5` 필수.
  * `pytest-cov`와 호환되지 않음([알려진 제한 사항](#known-limitations) 참고)
* `unittest`
  * `ddtrace>=2.2.0`부터.
  * `Python>=3.7`부터.
* `coverage`
  * 커버리지 수집과 호환되지 않음([알려진 제한 사항](#known-limitations) 참고)

## 설정

### 테스트 최적화

Test Impact Analysis를 설정하기 전에 [Python용 Test Optimization][1]을 설정하세요. Agent를 통해 데이터를 보고하는 경우 v6.40 이상 또는 v7.40 이상을 사용하세요.

{{% ci-itr-activation-instructions %}}

### 필수 종속 항목

Test Impact Analysis에는 [`coverage` 패키지][2]가 필요합니다.

예를 들어 CI 테스트 환경에 패키지를 설치하려면 관련 요구 사항 파일에 패키지를 지정하거나 `pip`를 사용하세요.

{{< code-block lang="shell" >}}
pip install coverage
{{< /code-block >}}

이미 `coverage` 패키지나 플러그인(예: `pytest-cov`)을 사용하고 있다면 [알려진 제한 사항](#known-limitations)을 참고하세요.

## 활성화된 Test Impact Analysis로 테스트 실행

Datadog 통합을 활성화한 상태에서 테스트를 실행하면 Test Impact Analysis가 활성화됩니다. 다음 명령으로 테스트를 실행하세요.

{{< tabs >}}

{{% tab "Pytest" %}}

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-python-app pytest --ddtrace
{{< /code-block >}}

{{% /tab %}}

{{% tab "Unittest" %}}

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-python-app ddtrace-run python -m unittest
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

### Test Impact Analysis 일시적 비활성화

`DD_CIVISIBILITY_ITR_ENABLED` 환경 변수를 `false` 또는 `0`으로 설정하여 Test Impact Analysis를 로컬 환경에서 비활성화할 수 있습니다.

`DD_CIVISIBILITY_ITR_ENABLED`(선택 사항)
:  Test Impact Analysis 커버리지 및 테스트 건너뛰기 기능 활성화<br />
**기본값**: `(true)`

Test Impact Analysis를 비활성화하려면 다음 명령을 실행하세요.

{{< tabs >}}

{{% tab "Pytest" %}}

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-python-app DD_CIVISIBILITY_ITR_ENABLED=false pytest --ddtrace
{{< /code-block >}}

{{% /tab %}}

{{% tab "Unittest" %}}

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-python-app DD_CIVISIBILITY_ITR_ENABLED=false ddtrace-run python -m unittest
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

## 특정 테스트에 대한 건너뛰기 비활성화

Test Impact Analysis 동작을 재정의하여 특정 테스트를 건너뛰지 않도록 할 수 있습니다. 이러한 테스트를 '건너뛸 수 없는 테스트'라고 합니다.

### 테스트 건너뛸 수 없는 이유는 무엇인가요?

Test Impact Analysis는 코드 커버리지 데이터를 사용하여 테스트를 건너뛸지 여부를 결정합니다. 경우에 따라 이 데이터만으로는 결정을 내리기에 충분하지 않을 수 있습니다.

예를 들면 다음과 같습니다:

* 텍스트 파일에서 데이터를 읽는 테스트
* 테스트 중인 코드 외부의 API와 상호 작용하는 테스트(예: 원격 REST API)

테스트를 건너뛸 수 없도록 지정하면 Test Impact Analysis에서 커버리지 데이터와 관계없이 테스트를 실행합니다.


{{< tabs >}}

{{% tab "Pytest" %}}

### 호환성

다음 버전에서는 건너뛸 수 없는 테스트가 지원됩니다.

* `pytest`
  * `ddtrace>=1.19.0`부터.

### 테스트를 unskippable(건너뛸 수 없음)로 표시

[`pytest`][1]의 [`skipif` 표시][2]를 사용하면 Test Impact Analysis에서 개별 테스트나 모듈을 건너뛰지 않도록 할 수 있습니다. `condition`을 `False`로, `reason`을 `"datadog_itr_unskippable"`로 지정하세요.

#### 개별 테스트

다음과 같이 `@pytest.mark.skipif` 데코레이터를 사용하여 개별 테스트를 건너뛸 수 없음으로 표시할 수 있습니다.
```python
import pytest

@pytest.mark.skipif(False, reason="datadog_itr_unskippable")
def test_function():
    assert True
```
#### 모듈

다음과 같이 [`pytestmark` 전역 변수][3]를 사용하여 모듈을 건너뛸 수 있습니다.
```python
import pytest

pytestmark = pytest.mark.skipif(False, reason="datadog_itr_unskippable")

def test_function():
    assert True
```

**참고**: 이는 다른 `skip` 표시나 `condition`이 `True`인 `skipif` 표시를 덮어쓰지 않습니다.

[1]: https://pytest.org/
[2]: https://docs.pytest.org/en/latest/reference/reference.html#pytest-mark-skipif-ref
[3]: https://docs.pytest.org/en/latest/reference/reference.html#globalvar-pytestmark

{{% /tab %}}

{{% tab "Unittest" %}}

### 호환성

다음 버전에서는 건너뛸 수 없는 테스트가 지원됩니다.

* `unittest`
  * `ddtrace>=2.2.0`부터.

### `unittest`에서 테스트를 unskippable(건너뛸 수 없음)로 표시

[`unittest`][1]의 [`skipif` 표시][2]를 사용하면 Test Impact Analysis에서 개별 테스트를 건너뛰지 않도록 할 수 있습니다. `condition`을 `False`로, `reason`을 `"datadog_itr_unskippable"`로 지정하세요.

#### 개별 테스트

다음과 같이 `@unittest.skipif` 데코레이터를 사용하여 개별 테스트를 건너뛸 수 없음으로 표시할 수 있습니다.
```python
import unittest

class MyTestCase(unittest.TestCase):
  @unittest.skipIf(False, reason="datadog_itr_unskippable")
  def test_function(self):
      assert True
```


`@unittest.skipif`를 사용하면 다른 `skip` 표시나, `condition` 값이 `True`인 `skipIf` 표시를 덮어쓰지 않습니다.

[1]: https://docs.python.org/3/library/unittest.html
[2]: https://docs.python.org/3/library/unittest.html#unittest.skipIf

{{% /tab %}}

{{< /tabs >}}

## 알려진 제한사항

### 코드 커버리지 수집

#### 커버리지 툴과의 상호작용

Test Impact Analysis가 활성화된 경우 커버리지 데이터가 불완전하게 표시될 수 있습니다. 평소 테스트로 커버되는 코드 줄은 이 테스트가 건너뛰어지면 커버되지 않습니다. 

#### 커버리지 패키지와의 상호 작용

Test Impact Analysis는 [`coverage`][2] 패키지의 API를 사용하여 코드 커버리지를 수집합니다. `ddtrace`의 `Coverage` 클래스 사용으로 인해 `coverage run` 또는 `pytest-cov`와 같은 플러그인의 데이터가 불완전합니다.

테스트 실행 순서를 변경하거나 병렬화를 도입하는 `pytest-xdist`와 같은 `pytest` 플러그인을 사용할 때 일부 경쟁 조건으로 인해 예외가 발생할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_integration/tests/python
[2]: https://pypi.org/project/coverage/