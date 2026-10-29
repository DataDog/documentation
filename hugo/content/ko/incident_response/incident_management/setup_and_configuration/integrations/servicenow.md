---
aliases:
- /ko/service_management/incident_management/integrations/servicenow/
- /ko/incident_response/incident_management/integrations/servicenow/
further_reading:
- link: integrations/servicenow/
  tag: 설명서
  text: ServiceNow 통합 설치
- link: /integrations/guide/servicenow-itom-itsm-setup
  tag: 설명서
  text: ServiceNow ITOM 및 ITSM 설정
- link: https://app.datadoghq.com/integrations/servicenow
  tag: 앱
  text: 인앱 ServiceNow 통합 타일
title: ServiceNow와 Datadog Incident Management 통합
---
## 개요 {#overview}

ServiceNow는 디지털 워크플로, IT 운영 및 비즈니스 프로세스를 관리하기 위한 솔루션을 제공하는 IT 서비스 관리 플랫폼입니다. Datadog ServiceNow 통합을 사용하면 Datadog 인시던트에서 ServiceNow 인시던트를 생성하고 두 플랫폼 간에 데이터를 양방향으로 동기화할 수 있습니다.

ServiceNow를 Datadog Incident Management와 통합하면 다음과 같은 이점이 있습니다.
- **향상된 가시성**: 모든 이해관계자에게 인시던트 정보를 즉시 전달하여 신속하게 대응할 수 있도록 합니다.
- **양방향 동기화**: 인시던트 상태, 심각도(영향도 및 긴급도) 및 모든 상태 업데이트를 Datadog과 ServiceNow 간에 자동으로 동기화합니다.
- **기존 워크플로 지원**: 현재 프로세스와 원활하게 통합되어 기존 ServiceNow 워크플로 내에서 인시던트를 더 쉽게 관리할 수 있습니다.

## 전제 조건 {#prerequisites}

ServiceNow와의 자동 인시던트 생성 및 양방향 동기화를 사용하려면 다음 단계를 따르세요.

1. ServiceNow 통합 타일을 통해 [ServiceNow 통합][1]을 설치하고, Datadog에서 ServiceNow 인스턴스에 연결하도록 [ServiceNow 타일을 구성했는지][2] 확인합니다.
2. ServiceNow 스토어에서 [Datadog용 ITOM/ITSM 통합][3]을 설치하거나(권장), 최신 업데이트 세트([Datadog-Snow_Update_Set_v2.8.0.xml][4])를 다운로드하여 ServiceNow 인스턴스에 수동으로 업로드합니다.
3. 안전한 인증을 위해 Datadog에서 [서비스 계정 애플리케이션 키][5]를 생성합니다. **참고**: Datadog은 개인 키 대신 서비스 계정 키를 생성할 것을 권장합니다. 개인 키를 사용하면 사용자 계정이 비활성화되거나 권한이 변경될 경우 ServiceNow 동기화가 중단될 위험이 있습니다.

## 설정 {#setup}

### 자동 인시던트 생성 구성 {#configure-automatic-incident-creation}

1. [Integration Settings][6]로 이동합니다.
1. 왼쪽 메뉴에서 **Integrations**를 클릭합니다.
1. **ServiceNow** 통합 타일을 찾아 클릭하여 구성 화면을 엽니다.
2. **Enable ServiceNow incident creation** 토글을 클릭합니다.
3. **Automatically create a ServiceNow incident** 토글을 클릭합니다.
4. ServiceNow 인시던트가 자동으로 생성되는 시점을 지정하는 조건을 추가합니다. 이 조건을 비워 두면 Datadog에서 인시던트가 생성될 때 통합 기능을 통해 ServiceNow 인시던트도 생성됩니다.

### 양방향 동기화 구성 {#configure-bidirectional-sync}

ServiceNow에서는 Incident Management와 상태, 영향도 및 긴급도를 양방향으로 동기화할 수 있습니다.

1. ServiceNow에서 오른쪽 상단 모서리에 있는 지구본 아이콘을 클릭한 다음 **Application Scope**가 **ITOM/ITSM Integration for Datadog**으로 설정되어 있는지 확인합니다.
2. 왼쪽 상단 탐색 메뉴에서 **All**을 클릭합니다.
3. 필터에 **ITOM/ITSM Integration for Datadog**을 입력합니다.
4. 필터링된 결과에서 **Configuration** 링크를 클릭한 다음 필수 설정을 입력합니다.
   1. **Datadog 데이터 센터**를 선택합니다.
   2. **Datadog API Key**를 붙여넣습니다.
   3. 앞서 생성한 **Service Account Application Key**를 붙여넣습니다.
   4. **Enabled** 확인란을 선택합니다.
5. **Save**를 클릭합니다.

양방향 동기화를 사용하면 Datadog에서 인시던트가 생성될 때 연결된 ServiceNow 인스턴스에서도 해당 인시던트가 생성됩니다. 이 ServiceNow 인시던트에는 Datadog 인시던트에 대한 참조가 포함되며 정의된 [필드 매핑](#field-mappings)을 기반으로 동기화 상태가 유지됩니다.

## 필드 매핑 {#field-mappings}

필드 매핑은 Datadog 인시던트의 정보가 ServiceNow 인시던트의 필드로 어떻게 전송되고 동기화되는지를 정의합니다. 이를 통해 상태, 심각도, 설명과 같은 주요 인시던트 세부 정보가 두 시스템 모두에서 일관되게 최신 상태로 유지됩니다.

다음은 통합에 사용되는 기본 필드 매핑입니다. 워크플로에 고급 필드 구성이 필요한 경우 ServiceNow 내의 [변환 맵][7] 메커니즘을 사용하여 매핑을 사용자 지정할 수 있습니다.

다음 필드는 Datadog Incident Management와 ServiceNow 간에 동기화됩니다.

| **Incident Management** | **ServiceNow Cases 표** | **ServiceNow 인시던트** | **동기화 상태**                         |
| ----------------------- | -------------------------- | ----------------------- | --------------------------------------- |
| 제목                   | 제목 - 문자열             | 간략한 설명       | Datadog → ServiceNow 단방향 동기화 |
| 발생한 일           | 설명 - 문자열       | 설명             | Datadog → ServiceNow 단방향 동기화 |
| 상태                   | 상태 - 문자열             | 상태                   | 양방향 동기화됨                 |
| DD 인시던트 URL         | 인시던트 URL - 문자열      | 작업 노트              | Datadog → ServiceNow 단방향 동기화 |
| 심각도                | 인시던트 긴급도(int)     | 긴급도                 | 양방향 동기화됨                 |
| 심각도                | 인시던트 영향도(int)      | 영향도                  | 양방향 동기화됨                 |

### 인시던트 상태 매핑 {#incident-state-mapping}

| **Datadog 모니터링 상태**                    | **ServiceNow 인시던트 상태** |
|----------------------------------------------|------------------------------|
| 활성                                      | 진행 중                  |
| 경고                                        | 진행 중                  |
| OK                                          | 해결됨                     |
| 완료 _(선택 사항, 설정에서 구성)_ | 해결됨                  |

### Datadog 인시던트 심각도에 따른 ServiceNow 우선순위 매핑 {#datadog-incident-severity-to-servicenow-priority-mapping}

| **Datadog 인시던트 심각도** | **ServiceNow 긴급도** | **ServiceNow 영향도** | **ServiceNow 우선순위** |
|-------------------------------|------------------------|-----------------------|-------------------------|
| SEV-1                         | 1                      | 1                     | 1 - 심각            |
| SEV-2                         | 1                      | 2                     | 2 - 높음                |
| SEV-2                         | 2                      | 1                     | 2 - 높음                |
| SEV-3                         | 1                      | 3                     | 3 - 보통            |
| SEV-3                         | 2                      | 2                     | 3 - 보통            |
| SEV-3                         | 3                      | 1                     | 3 - 보통            |
| SEV-4                         | 2                      | 3                     | 4 - 낮음                 |
| SEV-4                         | 3                      | 2                     | 4 - 낮음                 |
| SEV-5(경미)                 | 3                      | 3                     | 5 - 계획            |
| 알 수 없음                       | 3                      | 3                     | 5 - 계획            |

**참고**: Incident Management 설정에서 `Start at SEV-0`이 활성화된 경우, `ServiceNow Urgency`, `ServiceNow Impact` 및 `ServiceNow Priority`의 값은 모두 동일하게 유지되지만 `Datadog Incident Severity`는 한 단계 낮아집니다. 예를 들어, 이 표의 첫 번째 행에서 `Datadog Incident Severity`는 `0`으로 변경되지만, 해당 행의 나머지 값은 그대로 유지됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/servicenow
[2]: /ko/integrations/servicenow/#configure-the-servicenow-tile-in-datadog
[3]: https://store.servicenow.com/store/app/e0e963a21b246a50a85b16db234bcb67
[4]: /ko/resources/xml/Datadog-Snow_Update_Set_v2.8.0.xml
[5]: /ko/account_management/org_settings/service_accounts/#create-or-revoke-application-keys
[6]: https://app.datadoghq.com/incidents/settings#Integrations
[7]: /ko/integrations/guide/servicenow-itom-itsm-setup/#tranform-maps