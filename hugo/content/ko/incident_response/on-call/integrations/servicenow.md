---
description: On-Call 페이지에서 ServiceNow 인시던트를 생성하고, 동기화 상태를 유지하며, ServiceNow 인시던트에서
  페이지를 트리거합니다.
further_reading:
- link: /integrations/servicenow/
  tag: 설명서
  text: ServiceNow 통합 설치
- link: /integrations/guide/servicenow-itom-itsm-setup
  tag: 설명서
  text: ServiceNow ITOM 및 ITSM 설정
- link: /incident_response/on-call/routing_rules/
  tag: 설명서
  text: 라우팅 규칙
- link: /incident_response/on-call/integrations/
  tag: 설명서
  text: On-Call 통합
title: ServiceNow와 Datadog On-Call 통합
---
{{< callout url="https://www.datadoghq.com/product-preview/on-call-integrations/" btn_hidden="false" header="미리 보기에 참여하세요">}}
Datadog On-Call용 ServiceNow 통합은 미리 보기로 제공되고 있습니다.
{{< /callout >}}

## 개요 {#overview}

Datadog On-Call용 ServiceNow 통합은 On-Call 페이지와 ServiceNow 인시던트를 연결합니다. 이는 두 가지 흐름을 지원합니다.

- **[페이지를 ServiceNow에 동기화](#sync-pages-to-servicenow-incidents)**: 라우팅 규칙이 페이지를 생성하면 Datadog은 ServiceNow 인시던트를 생성하고 페이지와 동기화 상태를 유지합니다. 상태, 긴급도 및 코멘트는 구성한 매핑에 따라 동기화됩니다.
- **[ServiceNow에서 페이지 트리거](#trigger-pages-from-servicenow-incidents)**: ServiceNow 레코드가 비즈니스 규칙과 일치하면 해당 규칙이 Datadog On-Call 팀 또는 사용자를 대상으로 페이지를 트리거합니다.

## 전제 조건 {#prerequisites}

- On-Call 설정에서 ServiceNow 연결을 생성하는 데 필요한 [On-Call Admin (`on_call_admin`)][1] 권한이 있는지 확인합니다.
- [ServiceNow ITOM/ITSM 설정][2]을 완료합니다.
  1. ServiceNow 타일을 구성하고 ITOM/ITSM Integration for Datadog 버전 2.9.3 이상을 설치합니다.
  1. [ServiceNow와 Datadog 간의 양방향 데이터 동기화][3]의 단계를 완료합니다. 이 페이지의 두 흐름 모두 해당 구성의 자격 증명을 사용합니다.

## 페이지를 ServiceNow 인시던트와 동기화 {#sync-pages-to-servicenow-incidents}

### ServiceNow 연결 생성 {#create-a-servicenow-connection}

연결은 인시던트를 수신할 ServiceNow 인스턴스와 페이지 및 인시던트의 동기화 방식을 정의합니다. 예를 들어 각 할당 그룹마다 하나씩, 둘 이상의 연결을 생성할 수 있습니다.

1. Datadog에서 [**On-Call > Settings > Integrations**][4]로 이동합니다.
1. **ServiceNow**를 선택하고 **Add Connection**을 클릭합니다.
1. 연결을 구성합니다.
   - **ServiceNow 인스턴스**: ServiceNow 타일에서 구성한 ServiceNow 인스턴스를 선택합니다. 인스턴스를 추가하려면 **Manage accounts**를 클릭하세요.
   - **Assignment group** (선택 사항): 페이지에서 생성된 인시던트에 사용할 ServiceNow 할당 그룹을 선택하세요.
   - **Automatically create ServiceNow incidents from Pages**: 이 연결을 사용하는 라우팅 규칙이 페이지를 생성할 때마다 ServiceNow 인시던트를 생성하려면 이 토글을 활성화하세요.
   - **Sync methods and mappings**: 페이지와 ServiceNow 인시던트 간에 각 필드가 동기화되는 방식을 선택하고 해당 값을 매핑하세요. 페이지의 상태를 인시던트의 **상태**로, 긴급도를 인시던트의 **영향** 및 **긴급도**로, 코멘트를 인시던트의 **작업 참고 사항**으로 동기화할 수 있습니다.
1. 연결을 저장하세요.

### 라우팅 규칙에서 페이지 동기화 {#sync-pages-from-a-routing-rule}

연결을 생성한 후 팀의 [라우팅 규칙][5]에 ServiceNow 동기화를 추가하세요.

1. [**On-Call > Teams**][6]로 이동하여 팀을 선택합니다.
1. **Page Routing** 섹션을 찾아 **Edit**을 클릭합니다.
1. 라우팅 규칙을 추가하거나 편집합니다.
1. **Set targets**에서 **Add**를 클릭하고 **Sync with a ServiceNow Incident**를 선택한 다음 사용할 연결을 선택합니다.
1. 라우팅 규칙을 저장합니다.

규칙이 경보와 일치하면 Datadog은 페이지와 ServiceNow 인시던트를 동시에 생성합니다. 인시던트는 연결 설정에 따라 페이지와 동기화된 상태를 유지합니다.

## ServiceNow 인시던트에서 페이지 트리거 {#trigger-pages-from-servicenow-incidents}

ITOM/ITSM Integration for Datadog에는 `PublishOnCallPage` 스크립트가 포함되어 있습니다. 예를 들어, 인시던트가 생성될 때 ServiceNow 비즈니스 규칙에서 이 스크립트를 호출하여 On-Call 페이지를 트리거할 수 있습니다.

1. ServiceNow에서 **System Definition > Business Rules**로 이동한 다음 **New**를 클릭합니다.
1. 비즈니스 규칙의 표, 실행 시점 및 필터 조건을 구성하여 어떤 레코드가 페이지를 트리거할지 정의합니다. **Advanced** 확인란을 선택하여 스크립팅을 활성화합니다.
1. **Advanced** 탭에서 스크립트 내 `PublishOnCallPage`를 호출합니다. 예를 들어, `database` 팀에 높은 긴급도로 페이지를 보내는 방법은 다음과 같습니다.

   ```javascript
   (function executeRule(current, previous /* null when async */) {
       new PublishOnCallPage("team_handle", "database", "high").execute(current);
   })(current, previous);
   ```

   지원되는 대상 유형, 긴급도 인수 및 스크립트에 필요한 애플리케이션 키 범위는 [ServiceNow에서 Datadog On-Call 페이지 생성][7]을 참조하세요.
1. **Submit**을 클릭합니다.

비즈니스 규칙이 실행되면 Datadog은 대상 팀 또는 사용자에 대해 페이지를 트리거합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/permissions/#on-call
[2]: /ko/integrations/guide/servicenow-itom-itsm-setup/
[3]: /ko/integrations/guide/servicenow-itom-itsm-setup/#sync-bidirectionally
[4]: https://app.datadoghq.com/on-call/settings/integrations
[5]: /ko/incident_response/on-call/routing_rules/
[6]: https://app.datadoghq.com/on-call/teams
[7]: /ko/integrations/guide/servicenow-itom-itsm-setup/#create-on-call-page