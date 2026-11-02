---
description: Test Optimization 데이터를 사용하여 CI 노드나 워커에 테스트 파일을 분산함으로써 CI 테스트 시간을 단축하세요.
title: 테스트 병렬화
---
## 개요 {#overview}

테스트 병렬화는 CI 노드나 로컬 워커에 테스트 파일을 분산하여 CI 테스트 시간을 단축하는 데 도움이 됩니다. Test Optimization 데이터를 사용하여 실행할 테스트 파일을 감지하고, 예상 소요 시간을 계산하며, 실행 계획을 생성합니다.

테스트 병렬화는 [Test Impact Analysis][1]과 함께 작동하도록 설계되었습니다. Test Impact Analysis는 코드 변경의 영향을 받지 않는 테스트를 건너뜁니다. 테스트 병렬화는 나머지 테스트 파일을 선택된 CI 노드에 균등하게 분할합니다.

테스트 모음의 실행 시간이 오래 걸릴 때 테스트 병렬화를 사용하세요. Test Impact Analysis와 함께 사용할 경우, 테스트 병렬화는 건너뛰지 않은 테스트가 포함된 파일만 실행합니다. 또한 필요한 만큼의 CI 노드만 선택하여 CI 비용을 절감하는 데 도움이 되며, 총 CPU 사용 시간을 줄일 수 있습니다.

## 설정 {#setup}

테스트 병렬화를 설정하기 전에 [Test Optimization][2]을 설정하세요. 필요시 테스트 병렬화와 함께 사용할 계획이라면 [Test Impact Analysis][1]도 설정하세요. 그런 다음 [테스트 병렬화 설정][3]에 따라 `ddtest`를 설치하고 CI 공급자를 구성하세요.

## 호환성 {#compatibility}

테스트 병렬화는 다음 언어 및 프레임워크에서 지원됩니다.

| 언어 | 프레임워크 | 최소 라이브러리 버전 |
| -------- | ---------- | ----------------------- |
| Ruby     | RSpec, Minitest | `datadog-ci` gem `1.31.0` 이상 |
| Python   | pytest | `ddtrace` 패키지 `4.11.0` 이상 |
| JavaScript | Cucumber.js, Cypress, Jest, Mocha, Playwright, Vitest | `dd-trace` 패키지 `5.111.0` 이상 (`v5`의 경우) 및 `6.0.0` 이상 (`v6` |의 경우)

JavaScript의 경우, `ddtest`은(는) Cypress 12 이상, Mocha 8 이상, Playwright 1.18 이상, Vitest 1.6 이상이 필요합니다. Cucumber.js 지원은 버전 7부터 13까지 테스트되었습니다. 이러한 프레임워크는 `ddtest` 1.6.0 이상이 필요합니다. 프레임워크 버전은 [`dd-trace` 호환성 요구 사항][4]도 충족해야 합니다.

## 작동 방식 {#how-it-works}

테스트 병렬화는 `ddtest` CLI를 사용하여 테스트를 계획하고 실행합니다.

1. `ddtest plan`을 한 번 실행하여 재사용 가능한 `.testoptimization/` 계획을 만듭니다.
2. 테스트를 실행하는 각 CI 작업에서 `.testoptimization/` 디렉터리를 공유합니다.
3. 각 CI 작업에서 `ddtest run --ci-node <CI_NODE_INDEX>`를 실행하여 해당 CI 노드에 할당된 파일만 실행합니다.

단일 노드 및 다중 노드 예시는 [테스트 병렬화 설정][3]을 참조하세요.

## 다음 단계 {#next-steps}

{{< whatsnext desc="ddtest를 설치하고, CI 공급자를 구성하며, 테스트 병렬화가 테스트 파일을 분할하는 방식을 사용자 지정하세요." >}}
{{< nextlink href="/tests/test_parallelization/setup/" >}}테스트 병렬화 설정{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/configuration/" >}}테스트 병렬화 구성{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/best_practices/" >}}테스트 병렬화 모범 사례{{< /nextlink >}}
{{< nextlink href="/tests/test_parallelization/troubleshooting/" >}}테스트 병렬화 문제 해결{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ko/tests/test_impact_analysis/
[2]: /ko/tests/setup/
[3]: /ko/tests/test_parallelization/setup/
[4]: /ko/tests/setup/javascript/#compatibility