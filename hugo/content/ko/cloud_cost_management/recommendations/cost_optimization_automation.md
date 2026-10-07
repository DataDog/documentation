---
description: Cloud Cost Recommendation에 따라 정기적으로 사용되지 않거나 낭비되는 클라우드 리소스를 정리하는 자동화를
  설정하세요.
further_reading:
- link: /cloud_cost_management/
  tag: 설명서
  text: Cloud Cost Management
- link: /cloud_cost_management/recommendations/
  tag: 설명서
  text: Cloud Cost Recommendations
- link: /cloud_cost_management/recommendations/notifications/
  tag: 설명서
  text: Notifications
- link: /actions/workflows/
  tag: 설명서
  text: Workflow Automation
title: Cost Optimization Automation
---
## 개요 {#overview}

Cost Optimization Automations을 사용하면 수동 정리 없이 [Cloud Cost Recommendations][1]에 지속적으로 조치를 취할 수 있습니다. {{< ui >}}Automations{{< /ui >}} 페이지의 {{< ui >}}Remediation{{< /ui >}} 탭에 있습니다. **자동화**를 정의하고, 원하는 계정, 지역 및 리소스에 범위를 설정하면 Datadog이 권장된 액션을 정기적으로 실행합니다. Datadog는 각각의 액션을 실행하기 전에 Slack 또는 Microsoft Teams에서 사용자의 승인을 요구할 수 있습니다. 따라서 팀은 모든 변경 사항을 직접 제어할 수 있습니다.

각 자동화는 하나의 권장 사항 유형을 대상으로 하며, 다음 항목으로 구성됩니다.

- 일정(주간, 격주, 30일마다 또는 90일마다)
- 범위(계정, 지역, 태그 및 실행당 최대 리소스 수)
- 권장 사항 유형별 안전 장치(예: 삭제 전 스냅샷 생성)
- Slack 또는 Microsoft Teams를 통해 전달되는 사용자 승인 단계(선택 사항)

자동화에 의해 처리된 권장 사항은 {{< ui >}}Completed{{< /ui >}}로 이동하며, [Cloud Cost Recommendation][1] 페이지에서 실현된 절감액에 반영됩니다.

자동화는 [Recommendation action-taking][2]에 설명된 원클릭 Workflow Automation 작업과 다릅니다. 원클릭 액션은 권장 사항 사이드 패널에서 필요시 하나의 변경 작업을 실행합니다. 자동화는 정기적인 일정에 따라 실행되며 범위 내에서 일치하는 모든 리소스에 대해 작동합니다.

또한 자동화는 일치하는 권장 사항에 대한 요약을 Slack이나 Microsoft Teams로 주기적으로 보내지만 조치는 수행하지 않는 [Notifications][8]와 다릅니다.

**참고**: Automations는 Datadog Workflows를 사용하며 추가 요금이 발생합니다. 자세한 가격 정보는 [Workflow Automation 가격 페이지][3]를 참조하세요.

## 지원되는 권장 사항 유형 {#supported-recommendation-types}

{{< ui >}}Remediation{{< /ui >}} 탭은 다음 권장 사항 유형을 지원합니다.

| 공급자 | 권장 사항 유형 | 내장 안전 장치 |
|----------|---------------------|---------------------|
| AWS | 연결되지 않은 EBS 볼륨 삭제 | (선택 사항) 각 볼륨을 삭제하기 전에 EBS 스냅샷을 생성합니다. |
| AWS | EBS 볼륨을 gp2에서 gp3로 마이그레이션 | 되돌릴 수 있음. 마이그레이션으로 인한 데이터 손실은 없습니다. |
| AWS | 사용하지 않는 EBS 스냅샷 삭제 | AMI에서 참조하는 스냅샷은 건너뜁니다. |
| AWS | 불필요한 온디맨드 백업(DynamoDB) 삭제 | 실행할 때마다 가장 최근의 백업 2개가 보존됩니다. |
| AWS | DynamoDB 테이블을 Infrequent Access 테이블 클래스로 마이그레이션 | 되돌릴 수 있음. 테이블 클래스는 언제든지 다시 변경할 수 있습니다. |
| AWS | 사용하지 않는 DynamoDB 테이블 삭제 | 각 테이블을 삭제하기 전에 백업을 생성합니다. |
| AWS | CloudWatch 로그 보존 정책 설정 | 되돌릴 수 있음. 보존 기간은 언제든지 조정하거나 제거할 수 있습니다. |
| AWS | 사용하지 않는 RDS 인스턴스 삭제 | 각 인스턴스를 삭제하기 전에 최종 RDS 스냅샷을 생성합니다. |
| AWS | 사용하지 않는 NAT 게이트웨이 삭제 | 없음. 삭제는 되돌릴 수 없습니다. |
| AWS | S3 Standard 객체를 Amazon S3 Intelligent-Tiering으로 전환 | 되돌릴 수 있음. 기존 수명 주기 규칙은 유지되며, 추가된 규칙은 언제든지 제거할 수 있습니다. |
| AWS | 사용하지 않는 EC2 인스턴스 삭제 | (선택 사항) 각 인스턴스를 삭제하기 전에 AMI를 생성합니다. |
| AWS | 사용하지 않는 Redshift 클러스터 삭제 | 각 클러스터를 삭제하기 전에 최종 스냅샷을 생성합니다. |
| GCP | 연결되지 않은 Compute Engine 디스크 삭제 | (선택 사항) 각 디스크를 삭제하기 전에 스냅샷을 생성합니다. |
| GCP | Cloud Storage 버킷에서 Autoclass 활성화 | 되돌릴 수 있음. Autoclass는 언제든지 비활성화할 수 있습니다. |
| Azure | 연결되지 않은 관리 디스크 삭제 | (선택 사항) 각 디스크를 삭제하기 전에 스냅샷을 생성합니다. |
| Azure | 사용하지 않는 SQL 데이터베이스 삭제 | 없음. 삭제는 되돌릴 수 없습니다. |

(선택 사항)으로 표시된 안전 장치는 기본적으로 활성화되어 있으며 자동화 양식에서 비활성화할 수 있습니다. 나열된 다른 모든 안전 장치는 항상 적용되며 비활성화할 수 없습니다.

## 전제 조건 {#prerequisites}

- [Cloud Cost Recommendations][4]가 구성되어 있고 권장 사항을 지속적으로 생성 중인 AWS, GCP 또는 Azure 계정
- {{< ui >}}Automations{{< /ui >}} 페이지에 액세스하기 위한 **Cloud Cost Management - Cloud Cost Management Write** 권한과, 자동화를 생성하거나 편집하기 위한 **App Builder & Workflow Automation - Workflows Write** 권한
- 자동화가 적용될 각 계정에 대한 연결로, {{< ui >}}Automations{{< /ui >}} 페이지의 {{< ui >}}Manage Connections{{< /ui >}}에서 설정 Datadog은 이 연결을 사용하여 권장 작업에 필요한 쓰기 권한이 있는 역할을 수임하고, 선택한 권장 사항 유형에 필요한 권한만 부여합니다. 하나의 자동화를 여러 계정에 적용하려면 [연결 그룹][7]을 생성합니다.
- (선택 사항) 승인 메시지를 채널로 전송하려면 Slack 또는 Microsoft Teams 연결이 필요합니다.

## 자동화 설정 {#set-up-an-automation}

정기적인 일정으로 권장 사항 유형에 자동화를 설정하려면 다음 단계를 따르세요.

1. [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Optimize{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}][6]로 이동합니다.
1. {{< ui >}}Remediation{{< /ui >}} 탭을 선택합니다.
1. 페이지 왼쪽에서 권장 사항 유형을 선택합니다.
1. {{< ui >}}Create New Automation{{< /ui >}}을 클릭합니다.
1. {{< ui >}}Connection{{< /ui >}} 드롭다운 메뉴에서 [{{< ui >}}Manage Connections{{< /ui >}}][5]에 구성된 연결 또는 연결 그룹을 선택합니다.
1.  {{< ui >}}Define scope{{< /ui >}} 섹션에서 다음을 수행합니다.
    1. `env`, `service`, `team` 등의 태그를 입력하여 해당 태그와 일치하는 리소스로 자동화의 적용 범위를 제한합니다.
    1. 한 번의 실행에서 자동화가 작업을 수행할 최대 리소스 수를 입력합니다. 자동화는 잠재적인 비용 절감 효과가 가장 큰 리소스부터 우선적으로 처리합니다.
1.  {{< ui >}}Set schedule{{< /ui >}} 섹션에서 자동화의 실행 주기와 실행 시간을 선택합니다.
1. (선택 사항) {{< ui >}}Require approval before execution{{< /ui >}} 토글을 활성화하여 실행 전에 담당자의 승인을 받도록 설정합니다. 활성화된 경우 {{< ui >}}Slack{{< /ui >}} 또는 {{< ui >}}Microsoft Teams{{< /ui >}}를 선택하고 채널 알림 필드를 작성합니다. [안전 장치](#safeguards)를 참조하세요.
1. 자동화의 이름을 입력합니다.
1. {{< ui >}}Save Automation{{< /ui >}}을 클릭합니다.

### 안전 장치 {#safeguards}

권장 사항 유형별로 내장 안전 장치가 적용됩니다. 예를 들어, **연결되지 않은 EBS 볼륨 삭제** 자동화는 각 볼륨을 삭제하기 전에 EBS 스냅샷을 생성할 수 있습니다. 권장 사항 유형별 안전 장치 전체 목록은 [지원되는 권장 사항 유형](#supported-recommendation-types)을 참조하세요.

{{< ui >}}Require approval before execution{{< /ui >}}이 [자동화 설정](#set-up-an-automation)에서 활성화되어 있는 경우, Datadog은 실행 대상 리소스의 요약 정보를 지정된 채널에 게시합니다. 자동화는 사용자가 채널에서 요청을 승인한 후에만 실행됩니다.

## 자동화 관리 {#manage-automations}

{{< ui >}}Remediation{{< /ui >}} 탭에는 조직의 모든 자동화가 권장 사항 유형별로 그룹화되어 표시됩니다. 이 보기에서 Automations는 **policies**로 표시됩니다. 페이지 상단의 {{< ui >}}Provider{{< /ui >}}, {{< ui >}}Resource Type{{< /ui >}} 및 {{< ui >}}Recommendation Type{{< /ui >}} 필터를 사용하여 목록을 좁힙니다. 이 페이지에서 다음을 수행할 수 있습니다.

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

상단의 {{< ui >}}Activity{{< /ui >}} 보기에서 상태, 권장 사항 유형 또는 날짜 범위 필터를 사용하여 실행을 찾을 수 있습니다.

## 버전 기록 {#version-history}

Datadog은 자동화가 생성, 편집, 활성화, 비활성화 또는 삭제될 때마다 새로운 버전을 기록합니다. 자동화를 열고 {{< ui >}}History{{< /ui >}} 탭을 선택하여 각각의 변경을 적용한 사람이 누구인지, 무엇이 변경되었는지 확인하세요. 이 보기를 사용하여 변경 사항을 감사하거나 이전 버전으로 롤백할 수 있습니다.

## 권장 사항 상태 {#recommendation-status}

자동화가 리소스에 성공적으로 작용하면 해당 권장 사항은 {{< ui >}}Completed{{< /ui >}}로 이동하고 자동화에 의해 완료된 것으로 표시됩니다. 그 절감액은 [Cloud Cost Recommendation][1] 페이지의 실현된 절감액 합계에 포함됩니다.

추천을 {{< ui >}}Dismissed{{< /ui >}}로 설정하면, 자동화는 해제 기간이 만료될 때까지 향후 실행에서 이를 건너뜁니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/cloud_cost_management/recommendations/
[2]: /ko/cloud_cost_management/recommendations/#recommendation-action-taking
[3]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[4]: /ko/cloud_cost_management/recommendations/#prerequisites
[5]: /ko/actions/connections/
[6]: https://app.datadoghq.com/cost/optimize/automations
[7]: /ko/actions/connections/#connection-groups
[8]: /ko/cloud_cost_management/recommendations/notifications/