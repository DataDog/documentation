---
description: Datadog Feature Flags SDK에서 반환하는 값과 평가 세부 정보를 이해합니다.
further_reading:
- link: /feature_flags/concepts/evaluation_context
  tag: 설명서
  text: 평가 컨텍스트
- link: /feature_flags/concepts/targeting_rules
  tag: 설명서
  text: 대상 지정 규칙 및 필터
- link: /feature_flags/concepts/evaluation_tester
  tag: 설명서
  text: 평가 테스터
title: 플래그 평가 결과
---
## 개요 {#overview}

Datadog Feature Flags SDK는 [OpenFeature 평가 API][1]를 사용합니다. 각 플래그 평가를 위해서는 애플리케이션이 기본값을 제공해야 합니다. 공급자가 플래그를 결정할 수 없는 경우 SDK는 해당 값을 반환합니다. 상세 평가 메서드는 결정된 변형, 결정 이유 및 오류 코드와 같은 정보도 반환합니다.

## 비활성화된 플래그 {#disabled-flags}

OpenFeature는 공급자가 사용 가능한 구성에서 요청된 플래그를 찾을 수 없는 평가에 대해 [`FLAG_NOT_FOUND`][3]를 정의합니다. Datadog은 선택한 환경에 대해 전달된 런타임 구성에서 플래그가 누락된 경우 이 조건을 적용합니다.

Datadog 환경에서 플래그를 비활성화하면 Datadog은 클라이언트 측 및 서버 측 SDK로 전달되는 런타임 구성에서 해당 플래그를 생략합니다. 따라서 공급자는 비활성화된 플래그와 알 수 없는 플래그 키를 구분할 수 없습니다. 두 조건 모두 다음과 같은 상세 평가 결과를 생성합니다.

| 필드 | 결과 |
|---|---|
| 값 | 애플리케이션에서 제공한 기본값 |
| 이유 | `ERROR` |
| 오류 코드 | `FLAG_NOT_FOUND` |
| 변형 | 없음 |

OpenFeature는 비활성화된 것으로 표시된 플래그를 수신하는 공급자에 대한 결정 이유로 [`DISABLED`][2]도 정의합니다. Datadog 공급자는 Datadog에서 전달된 런타임 구성에서 비활성화된 플래그를 수신하지 않으므로 `FLAG_NOT_FOUND`를 반환하고 `DISABLED`는 반환하지 않습니다.

반환된 값은 Datadog에 구성된 기본 변형이 아니라 평가 호출의 기본값입니다. 비활성화된 플래그에 대해서는 Datadog 변형이 결정되지 않습니다.

### 비활성화된 플래그 결과 처리 {#handle-disabled-flag-results}

- 모든 평가에 대해 안전한 기본값을 제공하세요.
- 모든 `FLAG_NOT_FOUND` 결과에 대해 오류 로그를 기록하지 마세요. 비활성화된 플래그는 정상 작동 중에도 이 코드를 반환할 수 있으므로, 대신 이러한 로그를 집계하거나 샘플링하거나 전송률을 제한하세요.
- 애플리케이션이 비활성 플래그와 알 수 없는 키를 구분해야 하는 경우, 플래그를 활성화된 상태로 유지하고 명시적인 control 또는 off 변형을 제공하세요. 반환된 변형을 확인하여 해당 상태를 식별하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/specification/sections/flag-evaluation/
[2]: https://openfeature.dev/specification/types/#resolution-reason
[3]: https://openfeature.dev/specification/types/#error-code