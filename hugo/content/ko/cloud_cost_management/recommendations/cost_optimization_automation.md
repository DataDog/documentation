---
description: Cloud Cost Recommendation에 따라 정기적으로 사용되지 않거나 낭비되는 클라우드 리소스를 정리하는 자동화를
  설정하세요.
further_reading:
- link: /cloud_cost_management/
  tag: 설명서
  text: Cloud Cost Management
- link: /cloud_cost_management/recommendations/
  tag: 설명서
  text: Cloud Cost Recommendation
- link: /service_management/workflows/
  tag: 설명서
  text: Workflow Automation
title: Cost Optimization Automation
---
## 개요 {#overview}

Cost Optimization Automation을 사용하면 수동으로 정리하지 않고도 [Cloud Cost Recommendation][1]에 따라 지속적으로 조치를 취할 수 있습니다. **자동화**를 정의하고, 원하는 계정, 지역 및 리소스에 범위를 설정하면 Datadog이 권장된 액션을 정기적으로 실행합니다. Datadog는 각각의 액션을 실행하기 전에 Slack 또는 Microsoft Teams에서 사용자의 승인을 요구할 수 있습니다. 따라서 팀은 모든 변경 사항을 직접 제어할 수 있습니다.

각 자동화는 하나의 권장 사항 유형을 대상으로 하며, 다음 항목으로 구성됩니다.

- 일정(주간, 격주, 30일마다 또는 90일마다)
- 범위(AWS 계정, 지역, 태그 및 실행당 최대 리소스 수)
- 권장 사항 유형별 안전 장치(예: 삭제 전 스냅샷 생성)
- Slack 또는 Microsoft Teams를 통해 전달되는 사용자 승인 단계(선택 사항)

자동화에 의해 처리된 권장 사항은 {{< ui >}}Completed{{< /ui >}}로 이동하며, [Cloud Cost Recommendation][1] 페이지에서 실현된 절감액에 반영됩니다.

Cost Optimization Automation는 [권장 사항 액션 수행][2]에 설명된 원클릭 Workflow Automation 액션과는 다릅니다. 원클릭 액션은 권장 사항 사이드 패널에서 필요시 하나의 변경 작업을 실행합니다. 자동화는 정기적인 일정에 따라 실행되며 범위 내에서 일치하는 모든 리소스에 대해 작동합니다.

**참고**: Cost Optimization Automation은 Datadog Workflow를 사용하며 추가 비용이 발생합니다. 자세한 가격 정보는 [Workflow Automation 가격 페이지][3]를 참조하세요.

## 지원되는 권장 사항 유형 {#supported-recommendation-types}

Cost Optimization Automation은 다음과 같은 AWS 권장 사항 유형을 지원합니다.

| 권장 사항 유형 | 기본 안전 장치 |
|---------------------|---------------------|
| 연결되지 않은 EBS 볼륨 종료 | 각 볼륨을 삭제하기 전에 EBS 스냅샷을 생성합니다. |
| S3 Standard 객체를 Amazon S3 Intelligent-Tiering으로 전환 | 되돌릴 수 있습니다. 수명 주기 구성은 언제든지 제거할 수 있습니다. |
| 사용하지 않는 RDS 인스턴스 종료 | 각 인스턴스를 종료하기 전에 최종 RDS 스냅샷을 생성합니다. |
| 불필요한 온디맨드 백업(DynamoDB) 삭제 | 실행할 때마다 가장 최근의 백업 2개가 보존됩니다. |
| CloudWatch 로그 보존 정책 설정 | 되돌릴 수 있습니다. 보존 기간은 언제든지 조정하거나 제거할 수 있습니다. |
| 오래된 EBS 스냅샷 삭제 | AMI에서 참조하는 스냅샷은 건너뜁니다. |

## 전제 조건 {#prerequisites}

- [Cloud Cost Recommendation][4]이 구성되어 있고, 권장 사항을 활발히 생성하는 AWS 계정.
- 자동화를 생성하거나 편집하는 데 필요한 **Cloud Cost Management - Cloud Cost Management 쓰기** 권한.
- 자동화가 실행될 AWS 계정마다 [Workflow Automation 연결][5]이 필요합니다. Datadog은 이 연결을 사용하여 권장된 액션에 필요한 쓰기 권한을 가진 IAM 역할을 맡습니다. Datadog은 선택한 권장 사항 유형에 필요한 권한만 부여합니다.
- (선택 사항) 승인 메시지를 채널로 전송하려면 Slack 또는 Microsoft Teams 연결이 필요합니다.

## 자동화 설정 {#set-up-an-automation}

정기적인 일정으로 권장 사항 유형에 자동화를 설정하려면 다음 단계를 따르세요.

1. [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Optimize{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}][6]로 이동합니다.
1. 페이지 왼쪽에서 권장 사항 유형을 선택합니다.
1. **Create New Automation**을 클릭합니다.
1. {{< ui >}}AWS Connection{{< /ui >}} 드롭다운 메뉴에서 [연결][7]을 선택하거나 생성합니다. 1개의 자동화를 여러 계정에 적용하려면 [연결 그룹][8]을 선택하거나 생성합니다.
1.  {{< ui >}}Define scope{{< /ui >}} 섹션에서:
    1. `env`, `service`, `team` 등의 태그를 입력하여 해당 태그와 일치하는 리소스로 자동화의 적용 범위를 제한합니다.
    1. 한 번의 실행에서 자동화가 작업을 수행할 최대 리소스 수를 입력합니다. 자동화는 잠재적인 비용 절감 효과가 가장 큰 리소스부터 우선적으로 처리합니다.
1.  {{< ui >}}Set schedule{{< /ui >}} 섹션에서 자동화의 실행 주기와 실행 시간을 선택합니다.
1. (선택 사항) {{< ui >}}Require approval before execution{{< /ui >}} 토글을 활성화하여 실행 전에 담당자의 승인을 받도록 설정합니다. 활성화된 경우 {{< ui >}}Slack{{< /ui >}} 또는 {{< ui >}}Microsoft Teams{{< /ui >}}를 선택하고 채널 알림 필드를 작성합니다. [안전 장치](#safeguards)를 참조하세요.
1. 자동화의 이름을 입력합니다.
1. {{< ui >}}Save Policy{{< /ui >}}을 클릭합니다.

### 안전 장치 {#safeguards}

권장 사항 유형별로 기본적인 안전 장치가 적용됩니다. 예를 들어 **연결되지 않은 EBS 볼륨 종료** 자동화는 각 볼륨을 삭제하기 전에 EBS 스냅샷을 생성합니다. 자동화 양식에 나열된 안전 장치를 검토하고 사용자의 환경에서 제공하는 안전 장치 옵션을 사용 설정합니다.

{{< ui >}}Require approval before execution{{< /ui >}}이 [자동화 설정](#set-up-an-automation)에서 활성화되어 있는 경우, Datadog은 실행 대상 리소스의 요약 정보를 지정된 채널에 게시합니다. 자동화는 사용자가 채널에서 요청을 승인한 후에만 실행됩니다.

## 자동화 관리 {#manage-automations}

{{< ui >}}Automations{{< /ui >}} 페이지는 사용자의 조직에 있는 모든 자동화를 권장 사항 유형별로 나열합니다. 이 페이지에서 다음을 수행할 수 있습니다.

- 자동화 일시 중지 또는 재개
- 자동화의 범위, 일정 또는 안전 장치 편집
- 자동화 이름 변경
- 자동화 삭제

## 실행 기록 {#execution-history}

자동화를 열고 {{< ui >}}Activity{{< /ui >}} 탭을 선택하여 과거 및 예정된 실행을 확인합니다. 각 실행 기록에는 다음이 포함됩니다.

- 실행 시간 및 상태(성공, 실패 또는 승인 대기 중)
- 작업이 실행된 리소스
- 실행으로 실현된 예상 절감액
- 기본 Workflow Automation 실행으로 이동하는 링크

상단의 {{< ui >}}Activity{{< /ui >}} 보기에서 상태, 권장 사항 유형 또는 날짜 범위 필터를 사용하여 실행을 찾습니다.

## 버전 기록 {#version-history}

Datadog은 자동화가 생성, 편집, 활성화, 비활성화 또는 삭제될 때마다 새로운 버전을 기록합니다. 자동화를 열고 {{< ui >}}History{{< /ui >}} 탭을 선택하여 각각의 변경을 적용한 사람이 누구인지, 무엇이 변경되었는지 확인합니다. 이 보기를 사용하여 변경 사항을 감사하거나 이전 버전으로 롤백할 수 있습니다.

## 권장 사항 상태 {#recommendation-status}

자동화가 리소스에 성공적으로 작용하면 해당 권장 사항은 {{< ui >}}Completed{{< /ui >}}로 이동하고 자동화에 의해 완료된 것으로 표시됩니다. 그 절감액은 [Cloud Cost Recommendation][1] 페이지의 실현된 절감액 합계에 포함됩니다.

추천을 {{< ui >}}Dismissed{{< /ui >}}로 설정하면, 자동화는 해제 기간이 만료될 때까지 향후 실행에서 이를 건너뜁니다.

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/cloud_cost_management/recommendations/
[2]: /ko/cloud_cost_management/recommendations/#recommendation-action-taking
[3]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[4]: /ko/cloud_cost_management/recommendations/#prerequisites
[5]: /ko/service_management/workflows/connections/
[6]: https://app.datadoghq.com/cost/optimize/automations
[7]: /ko/actions/connections/
[8]: /ko/service_management/workflows/connections/#connection-groups