---
aliases:
- /ko/integrations/faq/my-Azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
further_reading:
- link: /account_management/billing/azure/
  tag: FAQ
  text: Azure 통합 요금 청구
- link: /account_management/billing/azure/#azure-vm-exclusion
  tag: 설명서
  text: 태그로 Azure VM 필터링
title: 인프라스트럭처 목록에서 Azure VM 전원 끄기
---

Azure에서 VM의 전원을 꺼도 Azure 통합에서 해당 VM의 `azure.vm.status` 메트릭을 계속 수집합니다. 이 메트릭은 `status:running`, `status:not_running`, 또는 `status:unknown`로 태그됩니다.

이는 의도된 동작이나, 이 때문에 인프라스트럭처 목록에 VM이 계속 남아있게 됩니다. VM이 이 메트릭만 보고할 경우에는 요금이 청구되는 호스트 수에 속하지 않습니다. 요금 청구와 관련한 자세한 내용은 Datadog [요금 청구 섹션][1]을 참고하세요.

Azure VM을 제거하면 3시간 내에 인프라스트럭처 목록에서 제거됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/billing/