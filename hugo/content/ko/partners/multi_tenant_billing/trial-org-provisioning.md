---
description: 관리자 조직에서 고객을 위해 체험판 Datadog 조직을 직접 프로비저닝합니다.
title: 체험판 조직 프로비저닝
---
## 개요 {#overview}

체험판 조직 프로비저너 기능이 활성화된 관리자 조직은 잠재 고객을 위해 체험판Datadog 조직을 직접 프로비저닝할 수 있습니다. 이를 통해 개념 증명(PoC) 참여를 대규모로 신속하게 실행할 수 있습니다. 기본적인 기회는 여전히 Datadog에 등록되어야 거래가 추적되고 파트너에게 크레딧이 제공됩니다. 전체 프로세스는 [신규 고객 온보딩][4]을 참조하세요. 이 방식으로 생성된 체험판 조직은 표준 14일 체험 기간 대신 30일 동안 실행됩니다.

{{< img src="partners/multi_tenant_billing/trial_org_provisioning.png" alt="관리자 조직 홈페이지의 체험판 조직 프로비저닝 페이지입니다." style="width:100%;" >}}

관리자 조직에서 {{< ui >}}Trial Org Provisioning{{< /ui >}} 페이지를 사용할 수 없는 경우 [partner-support@datadoghq.com][1]으로 문의하여 이 기능을 활성화하세요.

## 체험판 조직 프로비저닝 {#provision-a-trial-org}

1. 관리자 조직에 로그인합니다. {{< ui >}}Trial Org Provisioning{{< /ui >}} 페이지가 홈페이지로 나타납니다. 관리자 조직의 다른 곳에서 이 페이지로 돌아오려면 왼쪽 상단의 Datadog 로고를 클릭합니다.
2. 양식을 작성합니다.

    | 필드 | 필수 | 설명 |
    |---|---|---|
    | 지역 | 예 | `ap1`, `eu1`, `us1`, `us3` 또는 `us5`. 가능한 경우 고객의 클라우드 공급자, 지역 및 규정 준수 요구 사항을 일치시킵니다. 특정 요구 사항이 없는 경우 기본값인 `us1`이 사용됩니다. |
    | 체험판 조직 이름 | 예 | 32자를 초과할 수 없습니다. |
    | 고객 이름 | 예 | 이 체험판 조직이 대상으로 하는 최종 고객입니다. |
    | 파트너 메모 | 아니요 | Datadog 계정 팀과 공유할 가치가 있는 모든 컨텍스트입니다. |
    | 초대 대상자 목록 | 예 | 관리자 역할로 새 조직에 초대할 쉼표로 구분된 이메일 주소입니다. |

3. {{< ui >}}Submit{{< /ui >}}을 클릭합니다.

체험판 조직이 즉시 생성됩니다. 결과 패널에 새 조직의 이름, 조직 ID 및 상태 메시지가 표시됩니다.

## 체험판 조직 ID 찾기 {#find-the-trial-org-id}

결과 패널의 조직 ID를 캡처하지 못한 경우, 체험판 조직에 로그인하고 브라우저의 JavaScript 콘솔을 열어 검색하세요.

```javascript
JSON.parse(document.querySelector('#_current_user_json').value).org.id
```

북마클릿도 사용할 수 있습니다. `Get Datadog Org ID`라는 이름의 북마크를 만들고 다음을 URL로 지정한 후, 체험판 조직의 아무 페이지에서나 클릭하면 브라우저 경보에 ID가 표시됩니다.

```javascript
javascript:(function() {var orgId = JSON.parse(document.querySelector('#_current_user_json').value).org.id; alert("Datadog Org ID is " + orgId);})();
```

## 프로비저닝 후 {#after-provisioning}

체험판 조직의 사용량은 관리자 조직에서 자체적으로는 볼 수 없습니다. 새 체험판 조직의 이름과 조직 ID를 파트너 계정 팀과 공유하여 [Partner Portal][2]에 등록된 영업 기회에 연관시킬 수 있도록 하세요. 고객 조직이 파트너십과 관련된 활성 계약을 보유하게 되면 관리자 조직에 연결되고 사용량을 확인할 수 있게 됩니다.

## 다음 단계 {#whats-next}

고객 조직이 연결된 후 관리자 조직에서 사용량 및 비용 데이터가 표시되는 방식은 [비용 및 사용량 가시성][3]을 참조하세요.

[1]: mailto:partner-support@datadoghq.com
[2]: https://partners.datadoghq.com
[3]: /ko/partners/multi_tenant_billing/cost-and-usage-visibility/
[4]: /ko/partners/multi_tenant_billing/customer-onboarding/