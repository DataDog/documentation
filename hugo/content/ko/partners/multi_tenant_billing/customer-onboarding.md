---
description: 파트너가 잠재 고객을 등록된 거래에서 연결된 고객 조직으로 전환하는 방법.
title: 신규 고객 온보딩 절차
---
## 개요 {#overview}

파트너가 Datadog에 관심이 있는 잠재 고객을 확보했을 때, 첫 대화부터 연결된 고객 조직까지의 과정은 기회 등록, 가치 증명을 위한 Trial Org 생성, 그리고 계약을 체결하고 규모를 산정하기 위해 파트너 계정 팀과 협력하는 세 단계로 구성됩니다. 

아래의 각 단계는 중요합니다. 이 단계를 통해 기회가 Datadog에 적절하게 등록되고, 계약이 체결된 후에는 파트너가 Admin Org에서 고객의 청구 정보를 확인할 수 있게 됩니다.

## 기회 등록 {#register-the-opportunity}

[Partner Portal][1]에서 가능한 한 빨리 기회를 등록하세요. 등록:

- 기회가 파트너 소싱으로 인정될 가능성이 높아집니다.
- Datadog 이 이미 동일한 잠재 고객과 진행 중인 경우 Datadog 이 파트너의 참여를 파악할 수 있게 하여 중복 대신 협업을 가능하게 합니다.
- Datadog 과 파트너 간에 공유되고 투명한 기록을 생성하여 거래 성사까지 추적할 수 있도록 합니다.

거래를 등록하려면:

1. [Partner Portal][1]에 로그인합니다.
2.  {{< ui >}}Deal Dashboard{{< /ui >}}에서 {{< ui >}}Register Deal{{< /ui >}}를 클릭합니다.
3. 기회 이름, 고객 이름, 예상 마감일, 사용 사례, 주요 이해관계자, 예상 ARR 등 가능한 한 많은 세부 정보를 포함하여 필수 필드를 작성합니다.
4. 를 클릭합니다.{{< ui >}}Submit{{< /ui >}}

제출 후, 새로운 기회가 등록되었음을 파트너 계정 팀에 알립니다. 연락할 담당자를 모르는 경우 [partner-support@datadoghq.com][2]로 문의하세요.

## Trial Org 생성 {#create-a-trial-org}

기회가 등록된 후, 잠재 고객을 위한 Trial Org을 생성합니다. 이를 위해서는 Trial Org Provisioner 기능이 활성화된 Admin Org이 필요합니다. 아직 설정되지 않은 경우 [관리자 조직 요청하기][3]를 참조하세요.

Trial Org의 지역을 선택할 때는 클라우드 제공업체, 지리적 위치, 규정 준수 요구 사항을 고려하여 가능한 한 잠재 고객의 환경과 일치시키세요. 예를 들어, 잠재적인 Azure 고객은 US3(Azure) 사이트에 적합합니다. 특별한 제약 조건이 없는 경우 기본적으로 US1을 선택하거나, 확실하지 않은 경우 파트너 계정 팀과 상의하세요.

전체 양식 안내는 [Trial Org Provisioning][4]을 참조하세요.

## Trial Org를 계정 팀과 공유 {#share-the-trial-org-with-the-account-team}

새 Trial Org 정보를 파트너 계정 팀과 공유하여 등록된 영업 기회에 연관시킬 수 있도록 하세요. 영업 기회가 계약 체결로 진행됨에 따라 파트너 계정 팀과 계속 협력하세요.

## 관련 문서 {#related-docs}

- [비용 및 사용량 가시성][5]: 고객 조직의 계약이 활성화된 후, Admin Org에서 사용량 및 비용 데이터가 표시되는 방식.
- [문제 해결][6]: 진행 과정에서 발생하는 일반적인 문제.

[1]: https://partners.datadoghq.com
[2]: mailto:partner-support@datadoghq.com
[3]: /ko/partners/multi_tenant_billing/#requesting-an-admin-org
[4]: /ko/partners/multi_tenant_billing/trial-org-provisioning/
[5]: /ko/partners/multi_tenant_billing/cost-and-usage-visibility/
[6]: /ko/partners/multi_tenant_billing/troubleshooting/