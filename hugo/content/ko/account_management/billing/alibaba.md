---
title: Alibaba 통합 요금 청구
---

## 개요

Datadog는 Datadog에서 모니터링하는 Alibaba 가상 머신(Virtual Machine, "VM")에 대하여 요금을 청구합니다. 이러한 머신은 Datadog Agent 설치 여부와 관계 없이 요금이 청구될 수 있습니다. Alibaba 통합을 통해 Alibaba VM 상에서 Agent를 실행 중인 경우에는 **요금이 중복 청구되지 않습니다**.

기타 Alibaba 리소스(CDN, Express Connect Instance, Aspara DB 등)는 월간 요금 청구 대상이 아닙니다.

## Alibaba VM 배제

[Datadog-Alibaba 통합][1] 타일을 사용하여 Datadog에서 모니터링하는 VM을 [호스트 태그][2]로 필터링할 수 있습니다. **Configuration** 탭에서 기존 계정을 수정하거나 새 계정을 추가하세요. 각 계정을 클릭하고 **Optionally limit metrics collection to hosts with tag** 항목을 작성하여 필터링을 관리할 수 있습니다.

{{< img src="account_management/billing/alibaba_filter.png" alt="Alibaba VM 필터" >}}

기존 Alibaba 계정에 제한을 추가할 때 이전에 탐지된 VM은 [인프라스트럭처 목록][3]에 최대 2시간 동안 표시됩니다. 이전(트랜지션) 동안에는 VM의 상태가 `???`로 표시됩니다. 이는 요금 청구 대상으로 간주되지 않습니다.

Agent를 실행 중인 VM은 계속 표시되며 요금 청구(빌링) 대상에 포함됩니다. 그러니 Agent를 실행하지 않는 VM에만 제한 옵션의 효력이 적용됩니다.

## 트러블슈팅

기술적 지원이 필요하신 경우 [Datadog 지원팀][4]에 문의해주세요.

요금 청구와 관련해 궁금하신 점이 있다면 [고객 성공][5] 매니저와 상의하시기 바랍니다.

[1]: https://app.datadoghq.com/account/settings#integrations/alibaba-cloud
[2]: /ko/getting_started/tagging/using_tags/#integrations
[3]: /ko/infrastructure/
[4]: /ko/help/
[5]: mailto:success@datadoghq.com