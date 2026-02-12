---
further_reading:
- link: /monitors/
  tag: 설명서
  text: 모니터링 생성
- link: /monitors/notify/
  tag: 설명서
  text: 모니터링 알림
- link: /monitors/notify/notification_rules/
  tag: 설명서
  text: 모니터링 알림 규칙
- link: https://www.datadoghq.com/blog/tagging-best-practices-monitors/
  tag: 블로그
  text: 모니터링 태그 지정 모범 사례
title: 모니터링 설정
---

## 개요

[모니터링 설정 페이지][1]에서 다음 토픽에 액세스하거나 이를 제어할 수 있습니다.

* [태그 정책](#tag-policies)
* [알림 규칙](#notification-rules)
* [삭제한 모니터링](#deleted-monitors)


## 태그 정책

모니터 태그 정책을 사용하면 Datadog 모니터의 태그 및 태그 값에 대한 데이터 유효성 검사를 적용할 수 있습니다. 이렇게 하면 분류 및 처리를 위해 올바른 다운스트림 시스템과 워크플로우로 알림을 전송할 수 있습니다.

<div class="alert alert-danger">설정을 마치면 태그 정책은 <strong>모든</strong> Datadog 모니터링에 적용됩니다.</div>

- 새 모니터를 만들려면 조직의 태그 정책을 준수해야 합니다.
- 조직의 태그 정책을 위반하는 기존 모니터는 계속해서 경고 및 알림을 제공하지만 다른 설정을 수정하려면 먼저 태그 정책과 일치하도록 업데이트해야 합니다.

### 모니터 태그 정책 설정하기

1. [**Monitors Settings**][1] 페이지로 이동합니다.
2. 'Tag policies' 탭을 엽니다. 다음은 태그 정책을 통해 적용되는 세 가지 데이터 유효성 검사입니다.
    - 필수 값을 가진 태그가 필요한 경우
    - 태그만 필요한 경우
    - 필수 값을 가진 부수적인 태그
3. 녹색 체크 표시를 클릭하여 정책을 저장합니다.

{{< img src="/monitors/settings/tag_policies.png" alt="Monitor setting tag policies page" style="width:100%;" >}}

### 필수 값을 가진 태그가 필요한 경우

필수 태그를 적용하려면 **Required** 확인란을 선택하고 태그 키와 값을 지정합니다. 이 예시에서는 모니터에 `cost_center` 태그가 필요합니다. 값은 `cc1`, `cc2` 또는 `cc3`로 설정해야 합니다.

{{< img src="monitors/settings/monitor_tag_enforcement_key_and_value.png" alt="필수 값이 포함된 필수 태그의 태그 정책을 표시하는 Monitors Settings 페이지" >}}

### 태그만 필요한 경우

태그를 필수로 지정하되 사용자가 직접 값을 지정하도록 허용할 수 있습니다. 이 예제에서는 모니터에 `product_id` 태그가 필요합니다. 값은 사용자가 지정할 수 있습니다.

{{< img src="monitors/settings/monitor_tag_enforcement_key_only.png" alt="태그만 필요한 태그 정책을 표시하는 Monitors Settings 페이지" >}}

### 필수 값을 가진 부수적인 태그

태그는 선택 사항이지만 태그가 있는 모니터가 특정 값을 사용하도록 하려면 **값** 필드에 태그의 값을 입력합니다. 이 예시에서 `env`태그는 선택 사항입니다. 그러나 모니터가 이 태그를 사용하는 경우 값을 `dev`, `staging` 또는 `prod`로 설정해야 합니다.

{{< img src="monitors/settings/monitor_tag_enforcement_optional_key_with_values.png" alt="필수 값이 포함된 옵션 태그에 대한 태그 정책을 표시하는 Monitors Settings 페이지" >}}

### 권한

모니터 태그 정책을 설정하려면 `MONITOR_CONFIG_POLICY_WRITE_PERMISSION`승인 권한이 있는 역할을 맡아야 합니다.

자세한 내용은 [역할 기반 액세스 컨트롤][2] 또는 [역할 권한][3]을 참고하세요.

## 알림 규칙

알림 규칙을 이용하면 모니터링 알림을 더욱 효과적으로 라우팅할 수 있습니다. 모니터링 알림 규칙으로 모니터링과 관련된 태그를 기반으로 알림을 라우팅하는 규칙을 생성하여 반복적인 알림과 관련한 관리 작업을 줄일 수 있습니다.

모니터링 알림 규칙을 생성 및 관리하려면 [모니터링 알림 규칙][4]을 참조하세요.


## 삭제한 모니터
모니터는 7일 동안 보관된 이후 영구적으로 삭제됩니다. 최근에 삭제한 Datadog 모니터를 복원하려면 다음을 따릅니다.
1. [**Monitors** > **Settings**][1] 페이지로 이동합니다.
1. **Deleted Monitors** 탭을 엽니다.
1. 복원하려는 모니터링을 선택합니다.
1. 테이블 상단의 **Restore** 버튼을 클릭합니다.

{{< img src="monitors/settings/recently_deleted.png" alt="삭제한 모니터링 복원" style="width:100%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/settings
[2]: /ko/account_management/rbac/
[3]: /ko/account_management/rbac/permissions/
[4]: /ko/monitors/notify/notification_rules/