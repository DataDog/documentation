---
description: Datadog Feature Flags가 평가 컨텍스트와 타겟팅 키를 사용하여 평가 대상에 대한 플래그를 평가하는 방법을 알아보십시오.
further_reading:
- link: /feature_flags/concepts/targeting_rules
  tag: 설명서
  text: 대상 지정 규칙 및 필터
- link: /feature_flags/concepts/traffic_splitting
  tag: 설명서
  text: 트래픽 분할 및 무작위화
- link: /feature_flags/client/
  tag: 설명서
  text: 클라이언트 측 SDK
- link: /feature_flags/server/
  tag: 설명서
  text: 서버 측 SDK
title: 평가 컨텍스트
---
## 개요 {#overview}

**평가 컨텍스트**는 SDK가 플래그를 평가할 때 Datadog에 전달하는 속성 집합입니다. Datadog Feature Flags는 [OpenFeature][1]의 평가 컨텍스트를 사용합니다. 이는 사용자, 세션, 기기 등 평가 중인 대상을 설명하는 속성의 평면 맵입니다. [타겟팅 규칙][2] 및 [백분율 롤아웃][3]은 이러한 속성을 읽어 대상(예: 사용자 등)이 어떤 변형을 수신할지 결정합니다.

평가 컨텍스트가 없어도 SDK는 불리언 on/off 플래그를 평가할 수 있습니다. 대상(예: 사용자 등) 속성을 필터링하는 타겟팅 규칙과 일치시킬 수 없으며, 해당 대상에 대해 일관된 롤아웃 할당을 생성할 수 없습니다.

## 타겟팅 키 {#the-targeting-key}

`targetingKey`은(는) 평가 컨텍스트의 기본 식별자입니다. 일반적으로 사용자 ID, 세션 ID 또는 기기 ID입니다. Datadog은 `targetingKey`을(를) [결정론적 무작위화][3]에 사용하므로, 동일한 대상(예: 사용자 등)이 플래그에 대해 항상 동일한 변형을 일관되게 수신합니다.

세션 전반에 걸쳐 동일한 대상(예: 사용자 등)에 대해 안정적이고 일관된 식별자를 사용하십시오. 로그아웃했거나 익명인 대상(예: 사용자 등)의 경우, `SharedPreferences`을(를) 생략하거나 세션마다 다시 생성하는 대신 로컬 스토리지 또는 `targetingKey`에 저장된 UUID와 같은 영구 식별자를 사용하십시오.

## 컨텍스트 속성 {#context-attributes}

`targetingKey` 외에도 평가 컨텍스트에는 `user_role`, `country` 또는 `tier`과 같은 추가 속성을 원하는 만큼 포함할 수 있습니다. 타겟팅 규칙 [필터][2]에서 이러한 속성을 참조하여 각 변형을 볼 대상을 제어하십시오.

<div class="alert alert-warning">Datadog Feature Flags는 평가 컨텍스트 속성이 문자열, 숫자, 불리언과 같은 평면적인 기본 값이어야 합니다. 중첩된 객체와 배열은 지원되지 않으며 노출 데이터가 삭제될 수 있습니다.</div>

### 평가 컨텍스트 예시 {#example-evaluation-context}

{{< programming-lang-wrapper langs="javascript,python,go" >}}

{{< programming-lang lang="javascript" >}}

```javascript
const evaluationContext = {
  targetingKey: 'user-123',
  user_id: 'user-123',
  user_role: 'admin',
  country: 'US',
  tier: 'premium',
};
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

```python
from openfeature.evaluation_context import EvaluationContext

eval_ctx = EvaluationContext(
    targeting_key="user-123",
    attributes={
        "user_id": "user-123",
        "user_role": "admin",
        "country": "US",
        "tier": "premium",
    },
)
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
evalCtx := openfeature.NewEvaluationContext(
    "user-123",
    map[string]interface{}{
        "user_id":   "user-123",
        "user_role": "admin",
        "country":   "US",
        "tier":      "premium",
    },
)
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## 클라이언트 측 vs. 서버 측 컨텍스트 {#client-side-vs-server-side-context}

클라이언트 및 서버 SDK는 평가 컨텍스트를 다르게 설정합니다:

- **클라이언트 측 SDK**는 SDK 인스턴스에 대한 단일 전역 평가 컨텍스트를 유지합니다. 초기화 중에 한 번 설정한 다음, 사용자가 로그인한 후와 같이 주체 속성이 변경될 때 `OpenFeature.setContext()`를 호출하여 업데이트하십시오. 이후의 모든 플래그 평가는 업데이트된 컨텍스트를 사용합니다.
- **서버 측 SDK**는 전역 컨텍스트를 유지하지 않습니다. 현재 사용자 또는 세션을 기반으로 각 들어오는 요청에 대한 평가 컨텍스트를 빌드하고, 해당 요청에 대한 모든 플래그 평가 호출에 명시적으로 전달하십시오. 요청 내 평가 전반에서 동일한 컨텍스트 객체를 재사용하고, 주체 속성이 변경되는 경우에만 다시 빌드하십시오.

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openfeature.dev/docs/reference/concepts/evaluation-context
[2]: /ko/feature_flags/concepts/targeting_rules/
[3]: /ko/feature_flags/concepts/traffic_splitting/