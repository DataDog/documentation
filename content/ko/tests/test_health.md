---
description: 불안정한 테스트의 영향을 측정하고, Test Optimization으로 CI 효율을 개선하세요.
further_reading:
- link: tests/flaky_test_management
  tag: 설명서
  text: 불안정한 테스트 관리하기
- link: tests/flaky_test_management/auto_test_retries
  tag: 설명서
  text: Auto Test Retries에 대해 알아보기
- link: tests/test_impact_analysis
  tag: 설명서
  text: Test Impact Analysis에 대해 알아보기
- link: tests/flaky_test_management/early_flake_detection
  tag: 설명서
  text: Early Flake Detection에 대해 알아보기
- link: quality_gates
  tag: 설명서
  text: 품질 게이트에 대해 알아보기
title: Test Health
---

## 개요

[Test Health][5] 대시보드는 팀의 CI 테스트 관리 및 최적화를 위한 분석 기능을 제공합니다. 불안정한 테스트가 미치는 영향과 Test Optimization으로 이를 완화하는 방법을 보여줍니다.

대시보드는 불안정한 테스트 실패를 줄이고 CI 시간을 회복할 수 있도록 특정 Datadog 기능과 전략을 담은 [Test Health 권장 사항](#test-health-recommendations)을 제공합니다.

{{< img src="tests/test-health-2.png" alt="Test Health 대시보드" style="width:100%;" >}}

## 요약 메트릭

대시보드는 현재 기간과 적용된 필터를 기반으로 다음과 같은 주요 메트릭을 강조 표시합니다.

- [**Pipelines Failed**](#pipelines-failed): 불안정한 테스트로 인해 실패한 파이프라인의 총합
- [**Time Wasted in CI**](#time-wasted-in-ci): 불안정한 테스트로 인해 CI에서 소요된 총 시간
- [**Pipelines Saved**](#pipelines-saved): Auto Test Retries로 인해 실패하지 않은 파이프라인 수
- [**Time Saved in CI**](#time-saved-in-ci): Test Impact Analysis 및 Auto Test Retries로 절약된 시간

### Pipelines Failed

다음 표는 파이프라인 실행, 실패, 개발자 경험에 미치는 영향에 대한 상세 정보를 제공합니다.

| 메트릭 | 설명 |
|--------|-------------|
| **Pipeline Executions with Tests**    | 하나 이상의 테스트 세션이 포함된 파이프라인 실행 수. |
| **Failures Due to Flaky Tests**       | 불안정한 테스트로 인해 실패한 파이프라인 실행 수. 실패한 모든 테스트에는 `@test.is_known_flaky` 또는 `@test.is_new_flaky` 중 하나 이상이 포함되어 있습니다. |
| **Failures Due to Non-Flaky Tests**   | 결함이 없는 테스트로 인해 실패한 파이프라인 실행 횟수. 실패한 테스트에는 `@test.is_known_flaky`, `@test.is_new_flaky`, `@test.is_flaky` 태그가 없습니다. |
| **Dev Experience - Test Failure Breakdown** | 불안정한 테스트 실패와 불안정하지 않은 테스트 실패의 비율입니다. 테스트로 인해 파이프라인이 실패할 때, 불안정한 테스트는 얼마나 자주 발생할까요? 불안정한 테스트 실패 비율이 높을수록 테스트 결과에 대한 신뢰도가 떨어집니다. 개발자들은 실패하는 테스트를 불안정한 것으로 여기며 무시하고, 수동으로 재시도할 수 있습니다. |

### Time Wasted in CI

다음 표는 테스트 시간, 실패로 인해 손실된 시간, 개발자 경험에 미치는 영향에 대한 세부 정보를 제공합니다.

| 메트릭 | 설명 |
|--------|-------------|
| **Total Testing Time**               | 모든 테스트 세션 기간의 합계. |
| **Time Lost Due to Flaky Tests**     | 불안정한 테스트로 인해 실패한 테스트 세션의 총 시간. 실패한 모든 테스트에는 `@test.is_known_flaky`, `@test.is_new_flaky`, `@test.is_flaky` 태그 중 하나 이상이 포함되어 있습니다. |
| **Time Lost Due to Non-Flaky Tests** | 불안정하지 않은 테스트로 인해 실패한 테스트 세션의 총 시간. 실패한 테스트에는 `@test.is_known_flaky`, `@test.is_new_flaky`, `@test.is_flaky` 태그가 없습니다. |
| **Dev Experience - Time Lost Breakdown** | 불안정한 테스트 실패와 불안정하지 않은 테스트 실패로 인한 시간 손실 비율입니다. 테스트로 시간을 손실할 때, 불안정한 테스트로 인한 시간 손실은 얼마나 될까요? 불안정한 테스트 실패로 인한 시간 손실 비율이 높을수록 개발자의 좌절감도 커집니다. |

### Pipelines Saved

다음 표는 [Auto Test Retries][1]가 실패를 방지한 파이프라인 수를 보여줍니다.

<div class="alert alert-info">이러한 메트릭에는 불안정한 테스트가 실패한 후 자동으로 재시도되어 통과된 테스트 세션이 포함됩니다. 최신 버전의 테스트 라이브러리는 테스트 재시도에 대한 더욱 정확한 원격 측정 데이터와 결과를 제공합니다.</div>

| 메트릭 | 설명 |
|--------|-------------|
| **Pipeline Executions with Tests** | 하나 이상의 테스트 세션이 포함된 파이프라인 실행 수. |
| **Saved by Auto Test Retries**     | `@test.is_retry:true` 및 `@test.is_new:false` 테스트를 포함하는 테스트 세션을 통과한 CI 파이프라인의 수. |

### Time Saved in CI

다음 표는 [Test Impact Analysis][4] 및 [Auto Test Retries][1] 기능으로 CI 사용 시간이 얼마나 절약되었는지를 보여줍니다.

| 메트릭 | 설명 |
|--------|-------------|
| **Total Testing Time**            | 모든 테스트 세션 기간의 합계. |
| **Total Time Saved**              | Test Impact Analysis 및 Auto Test Retries로 절약된 시간의 합계. **% of Testing Time**은 전체 테스트 시간 중 절약된 시간의 백분율입니다. 불필요한 파이프라인 및 작업 재시도를 많이 방지하면 절약된 총 시간이 전체 테스트 시간을 초과할 수 있습니다. |
| **Saved by Test Impact Analysis** | `@test_session.itr.time_saved`로 표시되는 총 시간. |
| **Saved by Auto Test Retries**    | 처음에는 실패했지만 Auto Test Retries로 나중에 통과한 테스트 세션의 총 지속 시간. 해당 테스트에는 `@test.is_retry:true` 및 `@test.is_new:false` 태그가 포함되어 있습니다.  |

## 사용 사례

### 개발자 경험 향상
**Dev Experience - Test Failure Breakdown** 및 **Dev Experience - Time Lost Breakdown**을 사용하여 불안정한 테스트가 얼마나 자주 실패를 유발하고 CI 시간을 낭비하는지 파악하세요.

이러한 Test Optimization 기능은 테스트 실패와 시간 낭비를 줄여 개발자 경험을 향상시킵니다.
- **[Auto Test Retries][1]**는 불안정한 테스트로 인해 파이프라인이 실패할 가능성을 줄여줍니다. 여기에는 알려진 불안정한 테스트와 아직 식별되지 않은 불안정한 테스트 모두 포함됩니다. 또한 테스트가 실제로 실패하더라도 모든 재시도 역시 실패하기 때문에 개발자는 테스트 결과에 대한 확신을 가질 수 있습니다.
- **[Early Flake Detection][2]**은 **[Quality Gates][3]**와 결합하여 불안정한 새 테스트가 기본 브랜치에 들어가는 것을 방지합니다.
- **[Test Impact Analysis][4]**는 코드 커버리지를 기반으로 관련 테스트만 실행하여 불안정한 테스트를 최소화합니다. 관련 없는 테스트를 건너뛰면 개발자의 피드백 루프도 단축됩니다.

### 파이프라인 효율성 극대화 및 비용 절감
테스트 스위트가 길어지면 개발자에게 전달되는 피드백 속도가 느려지고, 관련 없는 테스트를 실행하면 불필요한 비용이 발생합니다.

Test Optimization 기능을 사용하면 CI 시간과 비용을 절약할 수 있습니다.
- **[Auto Test Retries][1]**: 세션 중에 불안정한 테스트 하나가 실패하면 CI 작업 전체가 손실됩니다. Auto Test Retries를 통해 불안정한 테스트를 다시 실행할 수 있으므로 테스트 통과 가능성이 높아집니다.
- **[Test Impact Analysis][4]**: 코드 변경 사항과 관련된 테스트만 실행하면 테스트 세션의 전체 시간이 단축됩니다. 또한, 관련 없는 불안정한 테스트를 건너뛰어 파이프라인이 실패하는 것을 방지할 수 있습니다.

## Test Health recommendations

Test Health 대시보드는 테스트의 신뢰성과 효율성을 개선하기 위한 데이터 기반의 리포지토리별 맞춤형 제안을 제공합니다. 전구 아이콘이 있는 리포지토리를 선택하면 권장 기능이 표시되고, 토글을 사용하여 대시보드에서 직접 기능을 활성화할 수 있습니다.

{{< img src="tests/test-health-recommendations.png" alt="Test Health 대시보드에 열린 Recommendations 사이드 패널" style="width:100%;" >}}

각 권장 사항은 특정 Test Optimization 기능을 활성화하여 테스트 실패율과 CI 시간을 얼마나 줄일 수 있는지 추정합니다. 권장 사항에는 다음이 포함될 수 있습니다.

- **[Auto Test Retries][1]**: Retry failing tests to avoid failing your build due to flaky tests(불안정한 테스트로 인해 빌드가 실패하지 않도록 실패한 테스트를 재시도하세요).
- **[Test Impact Analysis][4]**: Automatically select and run only the relevant tests for a given commit based on the code being changed(변경된 코드를 기준으로 해당 커밋에 관련된 테스트만 자동으로 선택해 실행하세요).

대시보드는 [지원되는][6] 프로그래밍 언어와 테스트 프레임워크를 기준으로, 해당 리포지토리에서 사용 가능한 기능만 권장합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tests/flaky_test_management/auto_test_retries/
[2]: /ko/tests/flaky_test_management/early_flake_detection/
[3]: /ko/quality_gates/
[4]: /ko/tests/test_impact_analysis/
[5]: https://app.datadoghq.com/ci/test/health
[6]: /ko/tests/#supported-features