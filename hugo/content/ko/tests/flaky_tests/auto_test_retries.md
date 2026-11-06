---
aliases:
- /ko/tests/auto_test_retries
- /ko/tests/flaky_test_management/auto_test_retries
description: 불안정한 테스트로 인해 빌드가 실패하지 않도록 실패한 테스트 케이스를 재시도하세요.
further_reading:
- link: /tests
  tag: 문서
  text: Test Optimization에 대해 알아보기
- link: /tests/flaky_test_management
  tag: 문서
  text: 불안정한 테스트(Flaky Test) 관리에 대해 알아보기
title: 자동 테스트 재시도
---
## 개요 {#overview}

Test Optimization의 Auto Test Retries 기능을 사용하면 불안정한 테스트로 인해 빌드가 실패하지 않도록 실패한 테스트를 최대 N번까지 재시도할 수 있습니다.
실패한 테스트 케이스는 통과할 때까지 또는 남은 재시도 횟수가 없을 때까지 재시도됩니다(이 경우 빌드가 실패함).

## 설정 {#setup}

[Test Optimization][1]이 테스트 실행에 맞게 구성되었는지 확인하세요.

{{< tabs >}}

{{% tab "Java" %}}

### 호환성 {#compatibility}

`dd-trace-java >= 1.34.0`

테스트 프레임워크 호환성은 `Scala Weaver`를 제외하고 [Test Optimization Compatibility][3]와 동일합니다.

### 구성 {#configuration}
Test Optimization을 설정한 후 [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1]에서 Auto Test Retries를 구성하세요. 이 설정은 조직, 리포지토리 또는 테스트 서비스 수준에서 적용할 수 있습니다.

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="CI/CD 설정의 자동 테스트 재시도 토글." style="width:100%" >}}

이 기능의 기본 동작은 실패한 테스트 케이스를 최대 5번까지 재시도하는 것입니다.
이 동작은 다음 환경 변수를 사용하여 미세 조정할 수 있습니다.

* `DD_CIVISIBILITY_FLAKY_RETRY_ONLY_KNOWN_FLAKES` - 이 환경 변수가 `true`로 설정된 경우, Test Optimization에서 [불안정한][2] 테스트로 간주하는 테스트 케이스만 재시도됩니다.
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - 테스트 케이스당 최대 재시도 횟수를 변경하려면 음수가 아닌 숫자로 설정할 수 있습니다.

[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[2]: /ko/tests/flaky_test_management/
[3]: /ko/tests/setup/java/#compatibility
{{% /tab %}}

{{% tab "JavaScript" %}}

### 호환성 {#compatibility-1}

`dd-trace-js >= v5.19.0`

### 구성 {#configuration-1}

Test Optimization을 설정한 후 [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1]에서 Auto Test Retries를 구성하세요. 이 설정은 조직, 리포지토리 또는 테스트 서비스 수준에서 적용할 수 있습니다.

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="CI/CD 설정의 자동 테스트 재시도 토글." style="width:100%" >}}

이 기능의 기본 동작은 실패한 테스트 케이스를 최대 5번까지 재시도하는 것입니다.
이 동작은 다음 환경 변수를 사용하여 미세 조정할 수 있습니다.

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - 원격 설정이 활성화되어 있더라도 재시도를 명시적으로 비활성화하려면 0 또는 false로 설정하세요(기본값: true).
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - 테스트 케이스당 최대 재시도 횟수를 변경하는 음수가 아닌 숫자(기본값: 5).

[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories

{{% /tab %}}

{{% tab "Ruby" %}}

### 호환성 {#compatibility-2}

`datadog-ci-rb >= 1.4.0`

### 구성 {#configuration-2}

Test Optimization을 설정한 후 [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1]에서 Auto Test Retries를 구성하세요. 이 설정은 조직, 리포지토리 또는 테스트 서비스 수준에서 적용할 수 있습니다.

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="CI/CD 설정의 자동 테스트 재시도 토글." style="width:100%" >}}

이 기능의 기본 동작은 실패한 테스트 케이스를 최대 5번까지 재시도하는 것입니다.
이 동작은 다음 환경 변수를 사용하여 미세 조정할 수 있습니다.

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - 원격 설정이 활성화되어 있더라도 재시도를 명시적으로 비활성화하려면 0 또는 false로 설정하세요(기본값: true).
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - 테스트 케이스당 최대 재시도 횟수를 변경하는 음수가 아닌 숫자(기본값: 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - 재시도할 실패한 테스트의 최대 총 개수를 설정하는 음수가 아닌 숫자(기본값: 1000)


[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
{{% /tab %}}

{{% tab ".NET" %}}

### 호환성 {#compatibility-3}

`dd-trace-dotnet >= 3.4.0`

### 구성 {#configuration-3}

Test Optimization을 설정한 후 [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1]에서 Auto Test Retries를 구성하세요. 이 설정은 조직, 리포지토리 또는 테스트 서비스 수준에서 적용할 수 있습니다.

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="CI/CD 설정의 자동 테스트 재시도 토글." style="width:100%" >}}

기본적으로 이 기능은 실패하는 모든 테스트 케이스를 최대 5번까지 재시도합니다.
다음 환경 변수를 사용하여 Auto Test Retries를 사용자 지정하세요.

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - 원격 설정이 활성화되어 있더라도 재시도를 명시적으로 비활성화하려면 `0` 또는 `false`으로 설정하세요(기본값: true).
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - 테스트 케이스당 최대 재시도 횟수를 변경하는 음수가 아닌 숫자(기본값: 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - 재시도할 실패한 테스트의 최대 총 개수를 설정하는 음수가 아닌 숫자(기본값: 1000)


[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
{{% /tab %}}

{{% tab "Go" %}}

### 호환성 {#compatibility-4}

`orchestrion >= 0.9.4` + `dd-trace-go >= 1.69.1`

### 구성 {#configuration-4}

Test Optimization을 설정한 후 [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1]에서 Auto Test Retries를 구성하세요. 이 설정은 조직, 리포지토리 또는 테스트 서비스 수준에서 적용할 수 있습니다.

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="CI/CD 설정의 자동 테스트 재시도 토글." style="width:100%" >}}

기본적으로 이 기능은 실패하는 각 테스트 케이스를 최대 5번까지 재시도합니다.
다음 환경 변수를 사용하여 Auto Test Retries를 사용자 지정하세요.

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - 원격 설정이 활성화되어 있더라도 재시도를 명시적으로 비활성화하려면 `0` 또는 `false`으로 설정하세요(기본값: true).
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - 테스트 케이스당 최대 재시도 횟수를 변경하는 음수가 아닌 숫자(기본값: 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - 재시도할 실패한 테스트의 최대 총 개수를 설정하는 음수가 아닌 숫자(기본값: 1000)


[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
{{% /tab %}}

{{% tab "Python" %}}

### 호환성 {#compatibility-5}

`dd-trace-py >= 3.0.0`(`pytest >= 7.2.0`)

### 구성 {#configuration-5}

Test Optimization을 설정한 후 [{{< ui >}}CI/CD Settings{{< /ui >}}][1]에서 Auto Test Retries를 구성하세요. 이 설정은 조직, 리포지토리 또는 테스트 서비스 수준에서 적용할 수 있습니다.

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="CI/CD 설정의 자동 테스트 재시도 토글." style="width:100%" >}}

이 기능의 기본 동작은 실패한 모든 테스트 케이스를 최대 5회까지 재시도하는 것입니다. Pytest에서 초기 설정, 해제 또는 픽스처에서 실패한 테스트 케이스는 재시도되지 않습니다.

다음 환경 변수를 사용하여 이 동작을 미세 조정할 수 있습니다.

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - 원격 설정이 활성화되어 있더라도 재시도를 명시적으로 비활성화하려면 `0` 또는 `false`으로 설정하세요(기본값: `true`).
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - 테스트 케이스당 최대 재시도 횟수를 변경하는 음수가 아닌 숫자(기본값: `5`).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - 재시도할 실패 테스트의 최대 총 개수를 설정하기 위한 음수가 아닌 숫자(기본값: `1000`)

### Dynamic Auto Test Retries {#dynamic-auto-test-retries}

`dd-trace-py >= 4.15.0`

기본적으로 Auto Test Retries는 모든 실패 테스트에 동일한 재시도 제한을 적용합니다. Dynamic Auto Test Retries(Dynamic ATR)는 첫 번째 시도에서 테스트가 실행되는 데 걸리는 시간을 기준으로 재시도 횟수를 결정합니다. 빠른 테스트일수록 재시도 횟수가 많고 느린 테스트일수록 적습니다.

테스트에 대한 재시도 예산은 첫 시도의 실행 시간을 기준으로 한 번 결정되며, 모든 재시도에 적용됩니다. 재시도 중 하나가 통과하는 즉시 해당 테스트의 재시도가 중단됩니다.

기본 실행 시간 버킷은 다음과 같습니다.

| 첫 번째 시도 실행 시간 | 기본 재시도 횟수 |
| ---------------------- | --------------- |
| 5초 이하 | 10 |
| 5초 초과, 10초 이하 | 5 |
| 10초 초과, 30초 이하 | 3 |
| 30초 초과, 5분 이하 | 2 |
| 5분 초과 | 1 |

모든 실패 테스트는 실행 시간에 관계없이 최소 한 번 재시도됩니다.

Dynamic Auto Test Retries를 활성화하려면 다음 환경 변수를 설정하세요.

* `DD_CIVISIBILITY_DYNAMIC_ATR_ENABLED` - 재시도 횟수를 고정된 `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` 제한 대신 테스트의 첫 번째 시도 실행 시간을 기준으로 하려면 `true`로 설정하세요(기본값: `false`). Dynamic ATR이 활성화된 동안에는 고정 제한이 무시됩니다. Auto Test Retries는 [{{< ui >}}CI/CD Settings{{< /ui >}}][1]에서 활성화되어야 합니다.
* `DD_CIVISIBILITY_DYNAMIC_ATR_BUCKETS` - 이전 표의 기본 예산을 재정의하는 `1`와 `20` 사이의 쉼표로 구분된 5개의 정수이며, 가장 빠른 실행 시간 버킷부터 가장 느린 실행 시간 버킷 순으로 정렬됩니다(예: `10,4,1,1,1`). 이 변수가 설정되지 않았거나 비어 있으면 이전 표의 기본 예산이 사용됩니다. `DD_CIVISIBILITY_DYNAMIC_ATR_BUCKETS`에 유효하지 않은 값이 포함된 경우 라이브러리는 이를 무시하고 경고를 기록하며 기본 예산을 사용합니다.

**참고**: 동적 ATR이 활성화된 경우에도 세션 수준 제한 `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT`는 계속 적용됩니다.

[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories

{{% /tab %}}

{{% tab "Swift" %}}

### 호환성 {#compatibility-6}

`dd-sdk-swift-testing >= 2.5.2`

### 구성 {#configuration-6}

Test Optimization을 설정한 후 [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][1]에서 Auto Test Retries를 구성하세요. 이 설정은 조직, 리포지토리 또는 테스트 서비스 수준에서 적용할 수 있습니다.

{{< img src="continuous_integration/auto_test_retries_test_settings-3.png" alt="CI/CD 설정의 자동 테스트 재시도 토글." style="width:100%" >}}

이 기능의 기본 동작은 실패한 테스트 케이스를 최대 5번까지 재시도하는 것입니다.
이 동작은 다음 환경 변수를 사용하여 미세 조정할 수 있습니다.

* `DD_CIVISIBILITY_FLAKY_RETRY_ENABLED` - 원격 설정이 활성화되어 있더라도 재시도를 명시적으로 비활성화하려면 0 또는 false로 설정하세요(기본값: true).
* `DD_CIVISIBILITY_FLAKY_RETRY_COUNT` - 테스트 케이스당 최대 재시도 횟수를 변경하는 음수가 아닌 숫자(기본값: 5).
* `DD_CIVISIBILITY_TOTAL_FLAKY_RETRY_COUNT` - 재시도할 실패한 테스트의 최대 총 개수를 설정하는 음수가 아닌 숫자(기본값: 1000)


[1]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
{{% /tab %}}

{{< /tabs >}}

### Failed Test Replay {#failed-test-replay}

<div class="alert alert-info">Failed Test Replay는 Java, JavaScript 및 .NET에 대해서만 지원됩니다.</div>

Failed Test Replay를 사용하면 실패한 테스트를 자동으로 재시도할 뿐만 아니라 테스트 오류 스택 트레이스의 최상위 프레임에서 로컬 변수 데이터를 확인할 수 있습니다.

Failed Test Replay는 재시도된 테스트 실행에서 변수 데이터를 캡처하므로 Auto Test Retries가 활성화되어 있어야 합니다.

[{{< ui >}}CI/CD Optimization settings{{< /ui >}}][4]의 {{< ui >}}Mitigation{{< /ui >}} > {{< ui >}}Failed Test Replay{{< /ui >}}에서 Failed Test Replay를 활성화하세요. 이 설정은 조직, 리포지토리 또는 테스트 서비스 수준에서 적용할 수 있습니다.

#### 로그 인덱스 생성 {#create-a-logs-index}

Failed Test Replay는 Datadog에 전송되어 일반 애플리케이션 로그와 함께 표시되는 로그를 생성합니다.

[제외 필터][5]를 사용하는 경우 Failed Test Replay 로그가 필터링되지 않도록 다음을 수행하세요.

1. 로그 인덱스를 생성하고 [설정][6]에서 원하는 보존 기간으로 **샘플링 없이** 구성합니다.
2. 필터를 `source:dd_debugger` 태그에 일치하도록 설정합니다. 모든 Failed Test Replay 로그에는 이 소스가 있습니다.
3. 첫 번째로 일치하는 항목이 우선하므로, 새 인덱스가 해당 태그와 일치하는 필터가 있는 다른 인덱스보다 우선하도록 합니다.

이 기능을 활성화하면 실패한 테스트에서 로컬 변수 데이터를 확인할 수 있습니다.

{{< img src="continuous_integration/failed_test_replay_local_variables.png" alt="Failed Test Replay." style="width:100%" >}}

#### 알려진 제한 사항 {#known-limitations}

[jest-image-snapshot][7]은 `jest.retryTimes`와 호환되지 않습니다. 단, `customSnapshotIdentifier`가 `toMatchImageSnapshot`에 전달되는 경우는 예외입니다([jest-image-snapshot 문서][8] 참조). 따라서 Auto Test Retries는 `customSnapshotIdentifier`가 사용되지 않으면 작동하지 않습니다.

## Test Optimization Explorer에서 결과 탐색 {#explore-results-in-the-test-optimization-explorer}

[Test Optimization Explorer][2]에서 재시도된 테스트를 쿼리할 수 있습니다. 해당 테스트는 `@test.is_retry` 태그가 `true`로 설정되어 있습니다(일부 테스트는 `@test.is_new`도 `true`로 설정되어 있을 수 있으며, 이는 [Early Flakiness Detection][3] 기능에 의해 재시도되었음을 나타냅니다).

## 문제 해결 {#troubleshooting}

Auto Test Retries에 문제가 있다고 의심되는 경우 [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][4]를 열고 리포지토리나 서비스를 찾은 다음 Auto Test Retries를 끄세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tests/setup/
[2]: /ko/tests/explorer/
[3]: /ko/tests/flaky_test_management/early_flake_detection
[4]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[5]: /ko/logs/log_configuration/indexes/#exclusion-filters
[6]: /ko/logs/log_configuration/indexes/#add-indexes
[7]: https://www.npmjs.com/package/jest-image-snapshot
[8]: https://github.com/americanexpress/jest-image-snapshot?tab=readme-ov-file#jestretrytimes