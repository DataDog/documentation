---
further_reading:
- link: /monitors/
  tag: 설명서
  text: 모니터 생성
- link: /monitors/notify/
  tag: 설명서
  text: 모니터링 알림
title: 모니터 태그 정책
---

## 개요

모니터 태그 정책을 사용하면 Datadog 모니터의 태그 및 태그 값에 대한 데이터 유효성 검사를 적용할 수 있습니다. 이렇게 하면 분류 및 처리를 위해 올바른 다운스트림 시스템과 워크플로우로 알림을 전송할 수 있습니다.

<div class="alert alert-warning">설정을 마치면 <strong>모든</strong>Datadog 모니터 및 신서틱(Synthetic) 테스트에 태그 정책이 적용됩니다.

- 새 모니터를 만들려면 조직의 태그 정책을 준수해야 합니다.
- 조직의 태그 정책을 위반하는 기존 모니터는 계속해서 경고 및 알림을 제공하지만 다른 설정을 수정하려면 먼저 태그 정책과 일치하도록 업데이트해야 합니다.

## 모니터 태그 정책 설정하기

1. **모니터** > **설정** 페이지로 이동하세요.
2. 태그 정책을 설정합니다. 태그 정책에 적용되는 세 가지 데이터 유효성 검사 규칙이 있습니다:
    - 필수 값을 가진 태그가 필요한 경우
    - 태그만 필요한 경우
    - 필수 값을 가진 부수적인 태그
3. 녹색 체크 표시를 클릭하여 정책을 저장합니다.

{{< img src="/monitors/settings/tag_policies.png" alt="Monitor setting tag policies page" style="width:100%;" >}}

### 필수 값을 가진 태그가 필요한 경우

필수 태그를 적용하려면 **필수** 확인란을 선택하고 태그 키와 값을 지정합니다. 이 예시에서는 모니터에 `cost_center`태그가 필요합니다. 값은 `cc1`, `cc2` 또는 `cc3`로 설정해야 합니다.

{{< img src="monitors/settings/monitor_tag_enforcement_key_and_value.png" alt="The Monitors Settings page displaying a tag policy for a required tag with mandatory values"  >}}

### 태그만 필요한 경우

태그를 필수로 지정하되 사용자가 직접 값을 지정하도록 허용할 수 있습니다. 이 예제에서는 모니터에 `product_id` 태그가 필요합니다. 값은 사용자가 지정할 수 있습니다.

{{< img src="monitors/settings/monitor_tag_enforcement_key_only.png" alt="The Monitors Settings page displaying a tag policy in which only the tag is required"  >}}

### 필수 값을 가진 부수적인 태그

태그는 선택 사항이지만 태그가 있는 모니터가 특정 값을 사용하도록 하려면 **값** 필드에 태그의 값을 입력합니다. 이 예시에서 `env`태그는 선택 사항입니다. 그러나 모니터가 이 태그를 사용하는 경우 값을 `dev`, `staging` 또는 `prod`로 설정해야 합니다.

{{< img src="monitors/settings/monitor_tag_enforcement_optional_key_with_values.png" alt="The Monitors Settings page displaying a tag policy for an optional tag with mandatory values"  >}}

## 권한 허용

모니터 태그 정책을 설정하려면 `MONITOR_CONFIG_POLICY_WRITE_PERMISSION`승인 권한이 있는 역할을 맡아야 합니다.

자세한 내용은  [Role Based Access Control][1] 또는 [Role Permissions][2] 을 참고하세요.



{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/
[2]: /ko/account_management/rbac/permissions/