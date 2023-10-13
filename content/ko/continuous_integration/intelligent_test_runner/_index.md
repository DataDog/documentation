---
further_reading:
- link: https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/
  tag: 블로그
  text: Datadog Intelligent Test Runner를 통해 CI 테스트 간소화
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: 블로그
  text: Datadog으로 모든 CI 파이프라인 모니터링
is_beta: true
kind: 설명서
title: Intelligent Test Runner
---

<div class="alert alert-warning">Intelligent Test Runner는 베타 제품입니다.</div>

Intelligent Test Runner는 Datadog의 테스트 영향 분석 솔루션입니다. 변경 중인 코드에 따라 지정된 커밋과 관련된 테스트만 자동으로 선택하고 실행합니다. 테스트 적용 범위를 유지하면서 테스트 소요 시간과 전체 CI 비용을 크게 줄입니다.


{{< img src="continuous_integration/itr_savings.png" alt="Intelligent test runner를 활성화한 테스트 세션에서 시간 절약 효과가 입증됐습니다.">}}

Intelligent Test Runner는 테스트 스위트(suite)를 분석하여 각 테스트에서 다루는 코드를 결정한 다음 해당 범위를 새 코드 변경의 영향을 받는 파일과 상호 참조하는 방식으로 작동합니다. Datadog은 이 정보를 사용하여 코드 변경의 영향을 받지 않는 테스트를 생략하고 전체 테스트 기간을 줄이면서 관련이 있고, 영향을 받는 테스트를 선별하여 실행합니다.

Intelligent Test Runner는 커밋당 실행되는 테스트의 수를 최소화하여 파이프라인을 방해하는 불안정한 테스트의 빈도를 줄여줍니다. 불안정한 테스트는 동일한 커밋이 주어졌을 때 무작위로 통과하거나 실패할 수 있는 테스트입니다. 이는 테스트의 결함이 테스트 중인 코드 변경과 관련이 없을 때 특히 실망스러운 결과가 될 수 있습니다. 테스트 서비스에 Intelligent Test Runner를 활성화한 후 각 커밋을 관련 테스트로 제한하여 코드 변경과 관련 없는 불안정한 테스트로 인해 빌드가 임의로 중단되지 않도록 할 수 있습니다.


### 베타 버전의 제한 사항

Intelligent Test Runner의 현재 구현에는 특정 조건에서 실행해야 하는 테스트를 건너뛰는 알려진 제한 사항이 있습니다. 특히 Intelligent Test Runner는 라이브러리 종속성, 컴파일러 옵션, 외부 서비스에서의 변경 사항 또는 데이터 기반 테스트에서의 데이터 파일 변경 사항을 감지할 수 없습니다.

Intelligent Test Runner를 재정의하고 모든 테스트를 실행하려면 Git 커밋 메시지의 아무 곳에나 `ITR:NoSkip` (대소문자를 구분하지 않음)를 추가합니다.

## Datadog 라이브러리 설정하기

Intelligent Test Runner를 설정하기 전에 특정 언어에 대한 [Test Visibility][1]를 설정해야 합니다. Agent를 통해 데이터를 보고하는 경우 v6.40+/v7.40+를 사용하세요.

{{< whatsnext desc="Datadog에서 Intelligent Test Runner를 설정할 언어를 선택하세요:" >}}
    {{< nextlink href="continuous_integration/intelligent_test_runner/dotnet" >}}.NET{{< /nextlink >}}
    {{< nextlink href="continuous_integration/intelligent_test_runner/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="continuous_integration/intelligent_test_runner/javascript" >}}JavaScript{{< /nextlink >}}
    {{< nextlink href="continuous_integration/intelligent_test_runner/swift" >}}Swift{{< /nextlink >}}
{{< /whatsnext >}}

## 설정

Intelligent Test Runner를 위한 Datadog 라이브러리를 설정한 후 [Test Service Settings][2] 페이지에서 구성합니다.

{{< img src="continuous_integration/itr_overview.png" alt="Datadog의 CI 섹션에 있는 테스트 서비스 설정에서 Intelligent test runner를 활성화했습니다." style="width:80%;">}}

위에서 설명한 제한 사항으로 인해 리포지토리의 기본 브랜치는 Intelligent Test Runner 활성화에서 자동으로 제외됩니다. Datadog은 프로덕션에 도달하기 전에 모든 테스트가 실행되도록 이 설정을 권장합니다.

제외할 다른 브랜치가 있는 경우 Intelligent Test Runner 설정 페이지에서 브랜치를 추가합니다. 쿼리 표시줄에서 `*` 와일드카드 문자를 사용하여 `release_*`와 같이 일치하는 브랜치를 제외할 수 있습니다.

{{< img src="continuous_integration/itr_configuration2.png" alt="Intelligent test runner에서 제외할 브랜치 선택" style="width:80%;">}}

## 테스트 세션 탐색하기

테스트 커밋 페이지와 테스트 세션 패널을 통해 Intelligent Test Runner에서 절감되는 시간을 살펴볼 수 있습니다.

{{< img src="continuous_integration/itr_commit.png" alt="Intelligent test runner가 있는 테스트 커밋 페이지" style="width:80%;">}}

{{< img src="continuous_integration/itr_savings.png" alt="Intelligent test runner를 활성화한 테스트 세션에서 시간 절약 효과가 입증됐습니다." style="width:80%;">}}

Intelligent Test Runner가 활성화된 상태에서 테스트를 건너뛰면 각 테스트 세션 또는 각 커밋에서 절약된 시간이 보라색 텍스트로 표시됩니다. 지속 시간 막대의 색상도 보라색으로 바뀌므로 [Test Runs][3] 페이지에서 Intelligent Test Runner를 사용하는 테스트 세션을 빠르게 식별할 수 있습니다.

## 도입 및 글로벌 절약 확인하기

즉시 사용 가능한 [Intelligent Test Runner 대시보드][4]를 통해 조직 비용 절감 및 Intelligent Test Runner 도입 현황을 추적할 수 있습니다. 대시보드에는 데이터의 리포지토리별, 커미터별 및 서비스별 보기 뿐만 아니라 전체 절감액을 추적하는 위젯이 포함되어 있습니다. 대시보드를 통해 조직의 어느 부분에서 Intelligent Test Runner를 최대한 잘 활용하고 있는지 파악할 수 있습니다.

{{< img src="continuous_integration/itr_dashboard1.png" alt="Intelligent Test Runner 대시보드" style="width:80%;">}}

또한 대시보드는 조직 전체에 걸쳐 Intelligent Test Runner를 도입한 현황을 추적합니다.

{{< img src="continuous_integration/itr_dashboard2.png" alt="Intelligent Test Runner 대시보드" style="width:80%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_integration/tests/
[2]: https://app.datadoghq.com/ci/settings/test-service
[3]: https://app.datadoghq.com//ci/test-runs
[4]: https://app.datadoghq.com/dash/integration/30941/ci-visibility-intelligent-test-runner-beta
