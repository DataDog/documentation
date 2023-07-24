---
further_reading:
- link: /continuous_integration/tests
  tag: 설명서
  text: 테스트 결과 및 성능 탐색
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: 트러블슈팅 CI
kind: 설명서
title: Swift를 위한 Intelligent Test Runner
---

## 호환성

Intelligent Test Runner는 `dd-sdk-swift>= 2.2.0`에서만 지원됩니다.

## 설정

Intelligent Test Runner를 설정하기 전에 [Swift를 위한 Test Visibility][1]를 설정합니다. **코드 적용 범위**옵션을 테스트 계획의 테스트 설정에서 활성화하거나 --enable-code-coverage 를 Swift 테스트 명령에 추가해야 합니다(SPM 타겟을 사용하는 경우).

Agent를 통해 데이터를 보고하는 경우 v6.40+/v7.40+를 사용하세요.

Intelligent Test Runner를 활성화하려면 다음 환경 변수를 설정합니다:

`DD_TEST_RUNNER`
: 테스트 계측을 활성화하거나 비활성화합니다. 테스트 프로세스 외부 (예: CI 빌드)에 정의된 환경 변수를 사용하여 테스트 계측을 활성화하거나 비활성화할 수 있도록 이 값을 `$(DD_TEST_RUNNER)`로 설정합니다.<br/>
**기본값**: `false`<br/>
**권장**: `$(DD_TEST_RUNNER)`

`DD_APPLICATION_KEY` (필수)
: 건너뛸 테스트를 쿼리하는 데 사용되는 [Datadog 애플리케이션 키][2].<br/>
**기본값**: `(empty)`

#### UI 활성화
환경 변수 설정 외에도, 사용자 또는 "Intelligent Test Runner Activation" 권한이 있는 조직의 사용자가 [테스트 서비스 설정][3] 페이지에서 Intelligent Test Runner를 활성화해야 합니다.

{{< img src="continuous_integration/itr_overview.png" alt="Datadog의 CI 섹션에 있는 테스트 서비스 설정에서 Intelligent test runner 활성화.">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_integration/tests/swift
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: https://app.datadoghq.com/ci/settings/test-service
[4]: https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test
[5]: https://docs.microsoft.com/en-us/visualstudio/test/vstest-console-options