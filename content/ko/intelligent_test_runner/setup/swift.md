---
aliases:
- /ko/continuous_integration/intelligent_test_runner/swift/
- /ko/continuous_integration/intelligent_test_runner/setup/swift/
code_lang: swift
code_lang_weight: 40
further_reading:
- link: /continuous_integration/tests
  tag: 설명서
  text: 테스트 결과 및 성능 탐색
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: CI Visibility 문제 해결
is_beta: true
kind: documentation
title: Swift를 위한 Intelligent Test Runner
type: multi-code-lang
---

{< callout url="#" btn_hidden="true" >}}Swift용 인텔리전트 테스트 러너가 베타 버전으로 출시되었습니다.{{< /callout >}}

## 호환성

Intelligent Test Runner는 `dd-sdk-swift>= 2.2.0`에서만 지원됩니다.

## 설정

### 테스트 가시성

지능형 테스트 러너를 설정하기 전에 [Swift용 테스트 가시성][1]을 설정하세요. 스키마 또는 테스트 계획의 테스트 설정에서 **코드 검사** 옵션도 활성화하거나, Swift 테스트 명령에 `--enable-code-coverage`를 추가해야 합니다(SPM 타겟을 사용하는 경우).

에이전트를 통해 데이터를 보고하는 경우 v6.40 이상 또는 v7.40 이상을 사용하세요.

### 지능형 테스트 러너 활성화

Intelligent Test Runner를 활성화하려면 다음 환경 변수를 설정합니다:

`DD_TEST_RUNNER`
: 테스트 계측을 활성화하거나 비활성화합니다. 테스트 프로세스 외부(예: CI 빌드)에 정의된 환경 변수를 사용하여 테스트 계측을 활성화 또는 비활성화할 수 있도록 이 값을 `$(DD_TEST_RUNNER)`로 설정합니다.<br/>
**기본값**: `false`<br/>
**권장**: `$(DD_TEST_RUNNER)`

{{% ci-itr-activation-instructions %}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_integration/tests/swift