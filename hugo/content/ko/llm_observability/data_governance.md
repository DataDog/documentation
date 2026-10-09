---
aliases:
- /ko/llm_observability/data_privacy_security_and_rbac/
- /ko/llm_observability/data_security_and_rbac/
description: Access Control 및 RBAC를 사용하여 민감한 Agent Observability 데이터에 대한 액세스를 제어하고,
  스팬 프로세서를 사용하여 데이터를 비식별화하며, Agent Observability가 각 데이터 유형을 얼마나 오래 보관하는지 알아보세요.
further_reading:
- link: /account_management/rbac/data_access
  tag: 설명서
  text: 데이터 액세스 제어에 대해 자세히 알아보기
- link: /llm_observability/improve/datasets/
  tag: 설명서
  text: 데이터셋 및 데이터셋 버전 사용하기
- link: /data_security/data_retention_periods/
  tag: 설명서
  text: Datadog 제품별 기본 데이터 보존 기간 확인하기
- link: https://www.datadoghq.com/pricing/?product=llm-observability#products
  tag: 요금
  text: Agent Observability 요금
title: 데이터 거버넌스
---
{{< whatsnext desc=" ">}}
  {{< nextlink href="https://datadoghq.com/legal/hipaa-eligible-services">}}<u>HIPAA 적격 서비스</u>: Datadog Legal의 HIPAA 적격 서비스 목록{{< /nextlink >}}
{{< /whatsnext >}}

## Data Access Control {#data-access-control}

Agent Observability를 사용하면 AI 애플리케이션과 관련된 잠재적으로 민감한 데이터에 대한 액세스를 조직 내 특정 팀 및 역할로만 제한할 수 있습니다. 이는 AI 애플리케이션이 개인 데이터, 기업의 독점 정보 또는 기밀 사용자 상호 작용과 같은 민감한 정보를 처리할 때 특히 중요합니다.

Agent Observability의 Access Control은 민감한 데이터에 대한 액세스를 제어할 수 있는 Datadog의 [Data Access Control][11] 기능을 기반으로 합니다. `ml_app` 태그를 사용하여 조직 내 특정 AI 애플리케이션을 식별하고 액세스를 제한할 수 있습니다.

또한 실험, 데이터셋, 데이터셋 레코드 및 주석 대기열을 포함한 개별 Agent Observability 프로젝트에 대한 액세스를 제한할 수 있습니다. [Agent Observability의 Data Access Control][14]을 참조하세요.

## 스팬 프로세서를 사용한 데이터 비식별화 {#redacting-data-with-span-processors}

Datadog으로 전송되기 전에 애플리케이션 수준에서 민감한 데이터를 비식별화하거나 수정할 수 있습니다. Agent Observability SDK의 스팬 프로세서를 사용하여 스팬의 입력 및 출력 데이터를 조건부로 수정하거나 스팬이 아예 생성되지 않도록 할 수 있습니다.

이는 다음과 같은 경우에 유용합니다.
- 프롬프트나 응답에서 민감한 정보 제거
- 내부 워크플로 또는 테스트 데이터 필터링
- 태그 또는 기타 기준에 따라 조건부로 데이터 비식별화

자세한 구현 예시 및 사용 패턴은 [SDK Reference의 Span Processing 섹션][12]을 참조하세요.

## Sensitive Data Scanner 통합 {#sensitive-data-scanner-integration}

Agent Observability는 [Sensitive Data Scanner][13]와 통합되어 AI 애플리케이션의 모든 단계에 존재할 수 있는 민감한 정보(개인 데이터, 금융 정보 또는 독점 정보 등)를 식별하고 비식별화하여 데이터 유출을 방지하는 데 도움이 됩니다.

민감한 데이터를 사전에 스캔함으로써 Agent Observability는 대화가 안전하게 유지되고 데이터 보호 규정을 준수하도록 지원합니다. 이 추가적인 보안 계층은 AI 애플리케이션과의 사용자 상호 작용에 대한 기밀성과 무결성을 유지하려는 Datadog의 노력을 강화합니다.

## 데이터 보존 {#data-retention}

Agent Observability의 보존 기간은 데이터 유형과 플랜에 따라 다릅니다. 계측된 애플리케이션의 트레이스는 플랜의 스팬 보존 기간을 따르며 실험, 데이터셋 및 프롬프트에는 각각 별도의 보존 기간이 적용됩니다.

| 데이터                                         | 보존 기간                                                                          |
| -------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 트레이스 및 스팬                             | 15일, 보존 애드온 사용 시 30일, 60일 또는 90일                                       |
| 실험                                  | 무료 티어 및 온디맨드 플랜: 15일 약정 플랜: 90일 보존 애드온 사용 시: 6개월, 9개월 또는 12개월 |
| 주석이 달린 상호 작용 및 레이블            | 주석 시점부터 90일, 또는 스팬 보존 기간이 더 긴 경우 해당 기간      |
| 데이터셋 레코드                              | 현재 버전: 3년 이전 버전: 90일, 사용 시 재설정                     |
| 프롬프트 레지스트리의 프롬프트               | 3년, 프롬프트를 가져올 때마다 연장                                          |
| `ml_obs.*`메트릭                           | 15개월                                                                                 |

### 트레이스 및 스팬 {#traces-and-spans}

계측된 애플리케이션의 트레이스 및 스팬은 기본적으로 모든 플랜에서 **15일** 동안 보존됩니다. 이는 비용, 토큰 수, 지연 시간, 오류와 같은 스팬별 운영 데이터와 스팬에 첨부된 평가 점수를 포함하여 스팬에 저장된 모든 항목에 적용됩니다.

보존 애드온을 사용하면 이를 **30일, 60일 또는 90일**로 연장할 수 있습니다. 무료 티어에서는 애드온을 사용할 수 없습니다. [보존 기간 변경](#changing-your-retention-period)을 참조하세요.

보존은 Trace Explorer에서 쿼리하는 원시 스팬에 적용됩니다. 해당 스팬에서 파생된 메트릭은 별도로 더 오랫동안 보존됩니다. [메트릭](#metrics)을 참조하세요.

### 실험 {#experiments}

약정 플랜의 경우 [실험][3]은 프로덕션 트레이스보다 더 오래 보존됩니다.

| 플랜                                | 실험 보존 기간 |
| ----------------------------------- | -------------------- |
| 무료 티어                           | 15일              |
| 온디맨드                           | 15일              |
| 약정(월간 또는 연간)       | 90일              |
| 30일 보존 애드온             | 6개월             |
| 60일 보존 애드온             | 9개월             |
| 90일 보존 애드온             | 12개월            |

조직에 맞춤형 계약이 있는 경우 보존 기간이 이 표와 다를 수 있습니다. 보존 기간을 확인하려면 Datadog 계정 담당자에게 문의하세요.

### 보존 기간 변경 {#changing-your-retention-period}

보존 기간이 길어질수록 Datadog이 더 많은 데이터를 저장하므로 청구 금액에 영향을 미칩니다. 요금은 [Agent Observability 가격 페이지][10]를 참조하세요.

보존 애드온은 Datadog UI에서 활성화하는 것이 아니라 계정 팀을 통해 설정됩니다. 더 긴 보존 기간을 요청하려면 Datadog 계정 담당자나 [Datadog 지원팀][1]에 문의하세요.

보존 애드온을 추가하거나 연장하면 더 긴 기간이 **아직 만료되지 않은 모든 스팬에 소급 적용됩니다**. 이전 보존 기간에 만료된 스팬은 복원할 수 없습니다.

예를 들어, 기본 15일 보존 기간을 사용 중인데 오늘 60일 애드온을 추가하면 지난 15일간의 스팬에는 60일 보존 기간이 적용되지만 그보다 오래된 스팬은 이미 삭제되어 있습니다.

더 짧은 보존 기간으로 변경하면 새로운 기간보다 오래된 스팬은 더 이상 사용할 수 없습니다.

### 주석이 추가된 상호 작용 {#annotated-interactions}

상호 작용에 주석을 달면 보존 기간이 연장됩니다. 트레이스, 스팬 또는 세션에 직접 또는 [주석 대기열][2]을 통해 주석 레이블이나 메모를 적용하면 Datadog은 스팬 보존 기간이 더 짧더라도 주석이 추가된 상호 작용을 주석 시점부터 **90일** 동안 보존합니다. 스팬에 주석을 달면 전체 상위 트레이스가 보존되며 세션에 속한 트레이스에 주석을 달면 전체 세션이 보존됩니다.

주석 레이블은 해당 주석이 적용된 상호 작용과 동일한 기간 동안 보존됩니다.

상호 작용에 주석을 달아 보존 기간을 연장해도 추가 요금이 발생하지 않습니다.

### 데이터셋 레코드 {#dataset-records}

[데이터셋][4]의 현재 버전에 있는 레코드는 스팬 보존 기간과 관계없이 **3년** 동안 보존됩니다.

데이터셋의 이전 버전에 있는 레코드는 **90일** 동안 보존됩니다. 이 기간은 이전 버전이 사용될 때마다 재설정됩니다. 예를 들어, 실험에서 해당 버전을 읽으면 기간이 재설정됩니다. 이전 버전을 90일 연속 사용하지 않으면 영구 삭제 대상이 됩니다. 자세한 내용은 [데이터셋 버전 관리][5]를 참조하세요.

### 프롬프트 {#prompts}

[프롬프트 레지스트리][9]의 프롬프트는 **3년** 동안 보존됩니다. 이 기간은 애플리케이션이 프롬프트를 가져올 때마다 연장되므로 현재 사용 중인 프롬프트는 계속 사용할 수 있습니다. 3년 동안 가져오지 않은 프롬프트는 영구 삭제 대상이 됩니다.

### 메트릭 {#metrics}

스팬에서 생성된 `ml_obs.*` 메트릭은 표준 [Datadog 메트릭][6]이며 [표준 Datadog 메트릭 보존][7] 정책을 따릅니다. 전체 세분성으로 15개월 동안 보존됩니다. 이 메트릭은 스팬 보존 기간과 관계없이 이 일정에 따라 보존되므로 기반 스팬이 만료된 후에도 스팬 수, 토큰 사용량, 비용, 지연 시간 및 오류율에 대한 장기 대시보드와 모니터를 구축할 수 있습니다.

사용 가능한 전체 메트릭 목록은 [Agent Observability 메트릭][8]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help/
[2]: /ko/llm_observability/investigate/annotation_queues/
[3]: /ko/llm_observability/improve/experiments/
[4]: /ko/llm_observability/improve/datasets/
[5]: /ko/llm_observability/improve/datasets/#dataset-versioning
[6]: /ko/metrics/
[7]: /ko/data_security/data_retention_periods/
[8]: /ko/llm_observability/investigate/metrics/
[9]: /ko/llm_observability/configure/prompt_management/
[10]: https://www.datadoghq.com/pricing/?product=llm-observability#products
[11]: /ko/account_management/rbac/data_access
[12]: /ko/llm_observability/instrument/sdk/#span-processing
[13]: /ko/security/sensitive_data_scanner/
[14]: /ko/llm_observability/improve/access_control/