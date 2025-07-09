---
title: API 옵션 모니터링
---

## 공통 옵션

- **`silenced`** 범위의 사전을 타임스탬프 또는 `null`로 변경합니다. 각 범위는 지정된 POSIX 타임스탬프까지 또는 값이 `null` 인 경우 영원히 음소거됩니다. 기본값은 **null**입니다. 예시:

  - 알림을 완전히 음소거하는 방법: `{'*': null}`
  - `role:db`를 잠시 음소거하는 방법: `{'role:db': 1412798116}`

- **`new_group_delay`** 새로 생성된 애플리케이션 또는 컨테이너가 완전히 시작될 수 있도록 새 그룹에서 경고를 시작하기 전까지의 지연 시간(초)입니다. 음수가 아닌 정수여야 합니다. 기본값은 **60**입니다. 예시: 컨테이너화된 아키텍처를 사용하는 경우 평가 지연을 설정하면 모니터의 그룹별 컨테이너가 새 컨테이가가 생성될 때 트리거되지 않지 않아 처음 몇 분 동안 지연이 발생하거나 CPU 사용량이 급증하는 것을 막을 수 있습니다.

- **`new_host_delay`** 모니터 결과 평가를 시작하기 전, 호스트가 부팅되어 애플리케이션이 완전히 시작될 때까지 걸리는 시간(초)입니다. 음수가 아닌 정수여야 합니다. **사용 중지: 대신 `new_group_delay` 사용**

- **`notify_no_data`** 데이터 보고가 중지될 때 모니터 알림 여부를 나타내는 부울입니다. 기본값은 **False**입니다.
- **`no_data_timeframe`** 데이터 보고가 중단된 후 모니터 알림이 전송되기까지의 시간(분)입니다. Datadog는 메트릭 알림의 경우 모니터 기간의 2배 이상, 서비스 점검의 경우 2분 이상을 권장합니다.  **생략 시 메트릭 알림의 경우 평가 기간의 2배가 사용되며 서비스 점검의 경우 24시간이 사용됩니다.**
- **`timeout_h`** 모니터가 트리거된 상태에서 자동으로 해결되기 전까지 데이터를 보고하지 않은 시간입니다. 허용되는 최소값은 0시간입니다. 최대 허용 값은 24시간입니다. 기본값은 **null**입니다.

-  **`require_full_window`** 평가하기 전에 모니터의 전체 데이터 범위가 필요한지 여부를 나타내는 부울입니다. Datadog에서는 흔치 않은 메트릭의 경우 `False`로 설정할 것을 권장합니다. 일부 평가가 건너뛰기됩니다. 기본값은 **False**입니다.
- **`renotify_interval`** 모니터가 마지막 알림 이후 이 현재 상태를 다시 알리기까지의 시간(분)입니다. 해결되지 않은 경우에만 다시 알림을 보냅니다. 기본값은 **null**입니다.
- **`renotify_statuses`** 모니터에서 보낸 다시 알림 상태입니다. 기본값: `renotify_interval`이 **null**인 경우 **null**입니다. `renotify_interval`이 설정되어 있으면 다시 알림 기본값은 `Alert` 및 `No Data`입니다. 
- **`renotify_occurrences`** 모니터 재알림 횟수입니다. `renotify_interval`이 설정된 경우에만 설정할 수 있습니다. 기본값: **Null**로 설정하면 제한 없이 다시 알림을 보냅니다.
- **`escalation_message`** 다시 알림에 포함할 메시지입니다. 다른 곳에서 허용되는 '@사용자 아이디' 알림 를 지원합니다. `renotify_interval`이 `null`인 경우 적용되지 않습니다. 기본값은 **null**입니다.
- **`notify_audit`** 태그가 지정된 사용자에게 이 모니터에 대한 변경 사항을 알릴지 여부를 나타내는 부울입니다. 기본값은 **False**입니다.
- **`include_tags`** 이 모니터에서 알림이 자동으로 제목에 트리거 태그를 삽입할지 여부를 나타내는 부울입니다. 기본값은 **True**입니다. 예시:

  - `True`: `[Triggered on {host:h1}] Monitor Title`
  - `False`: `[Triggered] Monitor Title`

### 권한 옵션

- **`restricted_roles`** 모니터를 편집할 수 있는 역할의 UUID가 나열된 배열입니다. 모니터 편집에는 모니터링하다 설정 업데이트, 모니타 삭제, 모니터 음소거 등이 포함됩니다. 역할 UUID는 [역할 API][1]에서 가져올 수 있습니다.

**참고: 이제 [제한 정책][5]을 사용하여 역할 외에 [팀][4] 및 사용자를 기준으로 모니터에 대한 권한을 설정할 수 있습니다. 모니터에 대한 권한을 제한하는 방법에 대한 자세한 내용은 [전용 가이드][2]를 참조하세요.

## 이상 옵션

이 옵션은 이상 모니터에만 적용되며 다른 모니터 유형에 대해서는 무시됩니다._

- **`threshold_windows`** `recovery_window`와 `trigger_window`를 포함하는 사전

  - `recovery_window` 경고가 복구되기까지 비정상적인 메트릭 상태가 정상으로 유지되는 시간을 설명합니다.
  - `trigger_window` 경고가 트리거되기 전에 메트릭이 비정상 상태로 유지되는 기간을 설명합니다.

예시: `{'threshold_windows': {'recovery_window': 'last_15m', 'trigger_window': 'last_15m'}}`

## 메트릭 알림 옵션

이 옵션은 메트릭 알림에만 적용됩니다.

- **`thresholds`** 임계값 유형별 임계값 사전입니다. 메트릭 알림에는 두 가지 임계값 유형이 있습니다: *심각* 및 *경고*입니다. *심각*은 쿼리에 정의되어 있지만 이 옵션에서도 지정할 수 있습니다. *경고* 임계값은 임계값 옵션을 통해서만 지정할 수 있습니다. 모니터에 [복구 임계값][3]을 사용하려면 `critical_recovery` 및 `warning_recovery` 속성을 사용합니다.

예시: `{'critical': 90, 'warning': 80,  'critical_recovery': 70, 'warning_recovery': 50}`

- **`evaluation_delay`** 평가 지연 시간(초)을 음수가 아닌 정수로 입력합니다. 예를 들어 값을 300(5분)으로 설정하고 기간을 last_5m으로 설정하고 시간을 7:00으로 설정하면 모니터는 6:50부터 6:55까지 데이터를 평가합니다. 이는 AWS 클라우드와치(CloudWatch) 및 기타 백필된 메트릭에 유용하며, 평가 중 모니터에 항상 데이터가 있는지 확인할 수 있도록 해줍니다.

## 서비스 점검 옵션

_이 옵션은 서비스 점검에만 적용되며 다른 모니터 유형에는 무시됩니다._

- **`thresholds`** 상태별 임계값 사전입니다. 서비스 점검 임계값은 여러 개가 있을 수 있으므로 쿼리에서 직접 정의되지 않습니다.

예시: `{'ok': 1, 'critical': 1, 'warning': 1}`

## 로그 알림 옵션

이 옵션은 로그 알림에만 적용됩니다.

- **`thresholds`** 상태별 임계값 사전입니다.

예시: `{'ok': 1, 'critical': 1, 'warning': 1}`

- **`aggregation`** `type`, `metric`, `groupBy`의 사전
  - `type`:  세 가지 유형이 지원됩니다(`count`, `cardinality`, `avg`).
  - `metric`: `cardinality`의 경우 패싯의 이름을 사용합니다. `avg`의 경우 메트릭 이름을 사용합니다. `count`의 경우 `count`를 메트릭으로 입력합니다.
  - `groupBy`: 그룹화할 패싯의 이름입니다.

예시: `{"metric": "count","type": "count","groupBy": "core_service"}`

- **`enable_logs_sample`** 알림 메시지에 샘플 또는 값을 추가하는 부울입니다. 기본값은 `False`입니다.

[1]: /ko/api/latest/roles/
[2]: /ko/monitors/guide/how-to-set-up-rbac-for-monitors/
[3]: /ko/monitors/guide/recovery-thresholds/
[4]: /ko/account_management/teams/
[5]:/ko/api/latest/restriction-policies/