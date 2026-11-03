---
description: 조직 수준, 사용자별 수준 또는 두 수준 모두에서 월간 AI 크레딧 한도를 설정하고, 개별 사용자에 대해 한도를 재정의합니다.
further_reading:
- link: /account_management/billing/ai_credits/
  tag: 설명서
  text: AI 크레딧
title: AI 크레딧 한도
---
## 개요 {#overview}

조직 관리자는 조직 수준, 사용자별 수준 또는 두 수준 모두에서 AI 크레딧 사용량에 대한 월간 한도를 설정할 수 있습니다. 관리자는 개별 사용자에 대해 기본 사용자별 한도를 재정의할 수도 있습니다. AI 크레딧은 [Bits Chat][1], [Bits Investigation][2], [Bits Code][3] 및 [Bits Agent Builder][4]에서 공유됩니다.

## 권한 {#permissions}

AI 크레딧 한도를 조회하고 설정하려면 사용자에게 [`billing_edit` 권한][6]이 필요합니다.

## 한도 설정 위치 {#where-to-set-limits}

AI 크레딧 한도는 [**Bits AI > AI 크레딧 관리**][5]에서 구성됩니다.

## 한도 유형 {#types-of-limits}

월간 한도는 세 가지 유형으로 설정할 수 있습니다.

| 한도 유형 | 설명 |
|---|---|
| 조직 전체 한도 | 해당 월의 조직 전체 AI 크레딧 사용량을 제한합니다. 기본적으로 설정된 조직 전체 한도는 없습니다. |
| 기본 사용자별 한도 | 개별 재정의되지 않은 각 사용자의 월간 AI 크레딧 사용량을 제한합니다. |
| 사용자별 재정의 | 개별 사용자에 대한 사용자 지정 월간 한도를 설정하여 해당 사용자의 기본 사용자별 한도를 대체합니다. |

## 한도 적용 방식 {#how-limits-are-applied}

- 조직 한도와 사용자 한도(또는 재정의)가 모두 구성된 경우, 적용 가능한 가장 제한적인 한도가 사용자에게 적용됩니다.
- 사용자에게 기본 사용자별 한도와 재정의가 모두 구성된 경우, 둘 중 더 높은 한도가 적용되며 사용자의 사용량은 여전히 조직 전체 한도의 적용을 받습니다.
- 한도를 높이면 이전 한도에 도달했던 사용자의 차단이 해제됩니다. 한도를 낮추면 사용량이 이미 새 값을 초과한 사용자가 차단됩니다.
- 사용자 또는 조직이 한도에 도달하면 영향을 받는 사용자는 Bits Chat, Bits Investigation, Bits Code 또는 Bits Agent Builder를 사용할 수 없으며, 배너에 재설정 날짜가 표시됩니다.

### 예시 {#examples}

| 조직 한도 | 사용자별 한도 | 사용자 | 최대 가상 사용량 | 최대 청구 가능 AI 크레딧 | 결과 |
|---|---|---|---|---|---|
| 2,000 AI 크레딧 | 사용자당 50 AI 크레딧 | 20 | 50 × 20 = 1,000 AI 크레딧 | 1,000 AI 크레딧 | 각 사용자는 다른 제한 없이 최대 50 AI 크레딧을 사용할 수 있습니다. |
| 2,000 AI 크레딧 | 사용자당 200 AI 크레딧 | 20 | 200 × 20 = 4,000 AI 크레딧<sup>*</sup> | 2,000 AI 크레딧 | 각 사용자는 조직 전체 한도인 2,000 AI 크레딧에 도달할 때까지 최대 200 AI 크레딧을 사용할 수 있습니다. |
| 설정되지 않음 | 사용자당 200 AI 크레딧 | 20 | 200 × 20 = 4,000 AI 크레딧 | 4,000 AI 크레딧 | 각 사용자는 다른 제한 없이 최대 200 AI 크레딧을 사용할 수 있습니다. |

<sup>*</sup> 구성된 조직 한도는 가상의 사용자별 한도 합계와 관계없이 조직의 상한선 역할을 합니다.

## 사용량 어트리뷰션 {#usage-attribution}

어트리뷰션은 특정 AI 사용량 단위에 누구의 한도가 적용되는지, 그리고 AI 크레딧 사용액이 누구에게 귀속되는지를 결정합니다.

| 제품 | 어트리뷰션 |
|---|---|
| [Bits Chat][1] | 모든 Bits Chat 사용량은 Bits Chat과 상호 작용하는 사용자의 이메일 주소로 합산됩니다. |
| [Bits Investigation][2] | 수동으로 시작된 조사는 해당 작업을 시작한 사용자의 이메일 주소로 합산됩니다.<br>자동으로 트리거된 조사(예: 모니터링에 의해 트리거된 조사)는 **Autonomous Agents**로 합산됩니다. |
| [Bits Code][3] | 모든 Bits Code 사용량은 Bits Code와 상호 작용하는 사용자의 이메일 주소로 합산됩니다. |
| [Bits Agent Builder][4] | 워크플로에 대한 Agent 실행은 워크플로를 생성한 사용자의 이메일 주소로 합산됩니다.<br>서비스 계정으로 생성된 워크플로에 대한 Agent 실행은 **Autonomous Agents**로 합산됩니다. |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/bits_ai/bits_chat/
[2]: /ko/bits_ai/bits_investigation/
[3]: /ko/bits_ai/bits_code/
[4]: /ko/actions/agents/
[5]: https://app.datadoghq.com/bits-ai/ai-credits-management
[6]: /ko/account_management/rbac/permissions/#billing-and-usage