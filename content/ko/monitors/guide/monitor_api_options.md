---
title: API 옵션 모니터링
---

## 일반적인 옵션

- **`silenced`** 범위에서 타임스탬프로의 사전 또는 `null`. 각 범위는 지정된 POSIX 타임스탬프까지 뮤트되며, 값이 `null`인 경우에는 무제한으로 뮤트 됩니다. 기본값: **null**. 예:

  - 알림을 완전히 뮤트하려면: `{'*': null}`
  - `role:db`를 잠시 뮤트하려면: `{'role:db': 1412798116}`

- **`new_group_delay`** 새로 생성된 애플리케이션 또는 컨테이너가 완전히 시작하도록 새 그룹에 대한 알림을 시작하기 전까지의 시간(초)입니다. 음수가 아닌 정수여야 합니다. 기본값: **60**. 예: 컨테이너화된 아키텍처를 사용하는 경우 평가 지연을 설정하면 새 컨테이너가 생성될 때 모니터의 그룹별 컨테이너가 트리거되지 않으므로 처음 몇 분 동안 약간의 지연 시간이나 CPU 사용량 급증이 발생할 수 있습니다.

- **`new_host_delay`** 모니터 결과 평가를 시작하기 전에 호스트가 부팅되고 애플리케이션이 완전히 시작될 수 있는 시간(초)입니다. 음수가 아닌 정수여야 합니다. **사용 중단됨: `new_group_delay`를 대신 사용하세요.**

- **`notify_no_data`** 데이터 보고가 중지될 때 이 모니터에서 알림을 보낼지 여부를 나타내는 부울 값입니다. 기본값:  **False**.
- **`no_data_timeframe`** 데이터 보고가 중지된 후 모니터가 알림을 보내기까지의 시간(분)입니다. Datadog은 메트릭 알림의 경우 모니터 타임프레임의 2배 이상, 서비스 검사의 경우 2분 이상을 권장합니다. **생략할 경우, 메트릭 알림에는 평가 타임프레임의 2배가 사용되며, 서비스 검사에는 24시간이 사용됩니다.**
- **`timeout_h`** 모니터가 트리거된 상태에서 자동으로 해결되기 전까지 데이터를 보고하지 않는 시간입니다. 허용되는 최소값은 0시간입니다. 최대 허용 값은 24시간입니다. 기본값: **null**.

-  **`require_full_window`** 이 모니터를 평가하기 전에 전체 데이터 창이 필요한지 여부를 나타내는 부울 값입니다. Datadog은 희소 메트릭의 경우 일부 평가가 생략되는 것을 방지하기 위해 `False`로 설정할 것을 권장합니다. 기본값: **False**.
- **`renotify_interval`** 마지막 알림 후 모니터가 현재 상태에 대해 다시 알림을 보내기까지의 시간(분)입니다. 문제가 해결되지 않은 경우에만 다시 알림을 보냅니다. 기본값: **null**.
- **`renotify_statuses`** 모니터가 다시 알림을 보내는 상태입니다. `renotify_interval`이 설정된 경우에만 설정할 수 있습니다. 기본값: **null**. `renotify_statuses`설정 없이 `Alert` 및 `No Data` 상태에서 다시 알림을 보냅니다.
- **`renotify_occurrences`** 모니터가 다시 알림을 보내는 횟수입니다. `renotify_interval`이 설정된 경우에만 설정할 수 있습니다. 기본값: **null**, 제한 없이 재알림합니다.
- **`escalation_message`** 재알림에 포함할 메시지입니다. 다른 곳에서 사용되는 '@username' 알림을 지원합니다. `renotify_interval`이 `null`이면 적용되지 않습니다. 기본값: **null**.
- **`notify_audit`** 태그된 사용자가 이 모니터의 변경 사항에 대해 알림을 받을지 여부를 나타내는 부울 값입니다. 기본값: **False**
- **`include_tags`** 이 모니터의 알림 제목에 트리거하는 태그를 자동으로 삽입할지 여부를 나타내는 부울 값입니다. 기본값: **True**. 예:

  - `True`: `[Triggered on {host:h1}] Monitor Title`
  - `False`: `[Triggered] Monitor Title`

### 권한 옵션

- **`locked`** 이 모니터에 대한 변경 사항을 작성자 또는 조직 관리 (`org_management`) 권한이 있는 사용자로 제한할지 여부를 나타내는 부울 값입니다. 기본값: **False**. **사용 중단됨: `restricted_roles`를 대신 사용하세요.**
- **`restricted_roles`** 모니터를 편집할 수 있는 역할의 UUID를 나열한 배열입니다. 모니터 편집에는 모니터 설정 업데이트, 모니터 삭제, 일정 시간 동안 모니터 뮤트 등이 포함됩니다. 역할 UUID는 [Roles API][1]에서 가져올 수 있습니다. `restricted_roles`는 `locked`의 후속입니다.

**참고:** 동일한 모니터에서 `locked`와 `restricted_roles` 매개 변수 둘다 설정하지 마세요. 둘 다 설정하면 더 제한적인 매개 변수가 적용됩니다. `restricted_roles`에 설정된 모든 역할은 `locked:true`보다 더 제한적인 것으로 간주됩니다.

다음 예는 `locked` 및 `restricted_roles` 매개 변수가 상호 작용하는 방식을 보여줍니다:
- 모니터가 `locked:false`와 `"restricted_roles": [ "er6ec1b6-903c-15ec-8686-da7fd0960002" ]`로 설정되어 있으면  `restricted_roles` 매개 변수가 적용됩니다.
- 모니터가 `locked:true`와 `"restricted_roles": [ "er6ec1b6-903c-15ec-8686-da7fd0960002" ]`로 설정되어 있으면`restricted_roles` 매개 변수가 적용됩니다.
- 모니터가 `locked:true`로 설정되어 있고, `"restricted_roles"` 매개 변수가 설정되어 있지 않으면, `locked:true` 매개 변수가 적용됩니다.

모니터의 RBAC 설정과 모니터를 고정 설정에서 역할 제한 사용으로 마이그레이션하는 방법에 대한 자세한 내용은 [전용 가이드][2]를 참조하세요.

## 이상 감지 옵션

_이 옵션은 이상 모니터에만 적용되며 다른 모니터 유형에는 무시됩니다._

- **`threshold_windows`** `recovery_window`와 `trigger_window`를 포함하는 사전입니다.

  - `recovery_window`는 이상 메트릭이 얼마나 정상으로 있어야 알림이 복구되는지를 설명합니다.
  - `trigger_window`는 메트릭이 얼마나 비정상으로 있어야 알림이 트리거되는지를 설명합니다.

예: `{'threshold_windows': {'recovery_window': 'last_15m', 'trigger_window': 'last_15m'}}`

## 메트릭 알림 옵션

_이 옵션은 메트릭 알림에만 적용됩니다._

- **`thresholds`** 임계값 유형별 임계값 사전입니다. 메트릭 알림에는 두 가지 임계값 유형이 있습니다: *critical* 및 *warning*입니다. *Critical*은 쿼리에서 정의되지만 이 옵션에서도 지정할 수 있습니다. *Warning* 임계값은 임계값 옵션을 통해서만 지정할 수 있습니다. 모니터에 [복구 임계값][3]을 사용하려면 `critical_recovery` 및 `warning_recovery` 속성을 사용하세요.

예: `{'critical': 90, 'warning': 80, 'critical_recovery': 70, 'warning_recovery': 50}`

- **`evaluation_delay`** 시간(초)을 음수가 아닌 정수로 입력하여 평가를 지연시킵니다. 예를 들어, 값이 300(5분), 시간 프레임이 last_5m, 시간이 7:00인 경우 모니터는 6:50부터 6:55까지 데이터를 평가합니다. 이 기능은 AWS CloudWatch 및 기타 백필된 메트릭이 평가 중에 모니터에 항상 데이터가 있는지 확인하는 데 유용합니다.

## 서비스 검사 옵션

_이 옵션은 서비스 검사에만 적용되며 다른 모니터 유형에는 무시됩니다._

- **`thresholds`** 상태별 임계값 사전입니다. 서비스 검사에는 여러 임계값이 있을 수 있으므로 쿼리에서 직접 임계값을 정의하지 않습니다.

예: `{'ok': 1, 'critical': 1, 'warning': 1}`

## 로그 알림 옵션

_이 옵션은 로그 알림에만 적용됩니다._

- **`thresholds`** 상태별 임계값 사전입니다.

예시: `{'ok': 1, 'critical': 1, 'warning': 1}`

- **`aggregation`** `type`, `metric`, `groupBy`의 사전입니다.
  - `type`: 세 유형이 지원됩니다: `count`, `cardinality`, `avg`.
  - `metric`: `cardinality`에는 패싯의 이름을 사용하고, `avg`에는 메트릭의 이름을 사용합니다. `count`에는 `count`를 메트릭으로 입력합니다.
  - `groupBy`: 그룹화할 패싯의 이름입니다.

예: `{"metric": "count","type": "count","groupBy": "core_service"}`

- **`enable_logs_sample`** 알림 메시지에 샘플 또는 값을 추가하는 부울 값입니다. 기본값: `False`

[1]: /ko/api/latest/roles/
[2]: /ko/monitors/guide/how-to-set-up-rbac-for-monitors/
[3]: /ko/monitors/guide/recovery-thresholds/