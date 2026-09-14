---
further_reading:
- link: /integrations/servicenow/
  tag: 설명서
  text: ServiceNow 통합
title: ServiceNow ITOM 및 ITSM 설정
---
ServiceNow의 ITOM/ITSM 통합을 사용하면 Datadog에서 생성된 경보, 작업 항목, 인시던트를 ServiceNow의 인시던트 또는 이벤트 표에 레코드로 보낼 수 있습니다. 이 통합은 중간 테이블과 변환 맵을 사용합니다.

통합을 사용하려면 지침에 따라 설치한 다음 각 제품에 대해 통합을 구성하세요.
1. [ServiceNow 타일 구성](#tile)
1. [ITOM/ITSM 통합 설치](#install)
1. 통합 구성
   1. [Datadog 서식화된 모니터 알림 구성](#monitor-notifications)
   1. [Datadog Work Management 구성](#case-management)
   1. [Datadog Incident Management 구성](#incident-management)
1. [변환 맵으로 데이터 사용자 지정](#transform-maps)

## ServiceNow 타일 구성 {#tile}

통합을 설치하기 전에 Datadog에서 [ServiceNow 타일이 구성][3]되어 있고 ServiceNow 인스턴스가 연결되어 있는지 확인하세요.

## ITOM/ITSM 통합 설치 {#install}

통합을 설치하는 방법에는 두 가지가 있습니다.
- Datadog은 ServiceNow 스토어에서 [Datadog용 ITOM/ITSM 통합][1]의 최신 버전을 설치할 것을 권장합니다.
- 또는 최신 업데이트 세트([Datadog-Snow_Update_Set_v2.7.9.xml][2])를 다운로드하여 ServiceNow 인스턴스에 수동으로 업로드할 수 있습니다.

## 통합 구성 {#configure-the-integration}

### 서식화된 모니터 알림 구성 {#monitor-notifications}

<div class="alert alert-info">이 기능을 사용하려면 ITOM/ITSM 통합 버전 2.6.0 이상이 필요합니다.</a></div>

#### 인스턴스 우선순위 매핑 설정 {#configure-instance-priority-mapping}

기본적으로 Datadog은 이벤트를 ServiceNow로 보낼 때 ServiceNow 영향 및 긴급도 수준을 포함하지 않습니다. 각 ServiceNow 구성에 대해 Datadog에서 생성된 이벤트에 포함할 ServiceNow 수준과 Datadog의 모니터 우선순위 수준 간의 매핑을 구성할 수 있습니다.

1. Datadog에서 [ServiceNow 통합 설정][4] 페이지로 이동합니다.
1. **Configure** 탭으로 이동한 다음 **ITOM/ITSM** 탭, **Monitors** 탭으로 이동합니다.
1. **Instance Priority Mapping for Templates** 아래에서 ServiceNow 인스턴스에 대한 설정을 엽니다.
1. **Instance Priority Mapping for Templates** 토글을 켭니다.
1. **ServiceNow Urgency** 및 **ServiceNow Impact** 아래에서 Datadog의 모니터링 우선순위 수준과 대응시킬 수준을 선택합니다. 예를 들면 다음과 같습니다.
   - 영향: 4
   - 긴급도: 5
1. **Update**를 클릭합니다.

#### 모니터 알림에 대한 커스텀 ServiceNow @핸들을 만듭니다. {#create-a-custom-servicenow-handle-for-monitor-notifications}

모니터에서 ServiceNow 레코드를 생성하려면 모니터링 Notifications 규칙이나 Notifications 수신자 내에서 사용할 @핸들을 구성해야 합니다.

1. Datadog에서 [ServiceNow 통합 설정][4] 페이지로 이동합니다.
1. **Configure** 탭으로 이동한 다음 **ITOM/ITSM** 탭, **Monitors** 탭으로 이동합니다.
1. **템플릿** 옆에서 **+ New**를 클릭하여 새 템플릿을 만듭니다.
1. 모니터 알림을 전달할 @핸들 **이름**, **인스턴스** 및 **대상 표**을 정의합니다.
1. (선택 사항) 템플릿에서 **할당 그룹**, **비즈니스 서비스** 및/또는 **사용자**를 설정합니다.<br /> **참고**: 할당 그룹과 사용자를 모두 설정하는 경우, ServiceNow 레코드 생성이 성공적으로 완료되려면 사용자가 선택한 할당 그룹에 속해 있어야 합니다.
1. (선택 사항) **알림 페이로드 사용자 지정** 섹션을 확장하고 **Add field**를 클릭하여 Datadog에서 더 많은 변수를 추가합니다.
1. **Save**를 클릭합니다.

새 템플릿을 사용하려면 모니터 설명에 `@servicenow-<TEMPLATE_NAME>`을 추가합니다. 모니터가 경고하면 ServiceNow는 해당 레코드를 생성하고, 기본 경고가 복구되면 해당 레코드를 자동으로 **Resolved**로 설정합니다.

{{% collapse-content title="레거시 모니터링 알림 구성" level="h4" expanded=false id="configure-legacy-monitor-notifications" %}}
`@servicenow-<INSTANCE_NAME>`을 사용하여 레거시 모니터링 알림을 구성하려면 다음 단계를 따르세요.

1. Datadog에서 [ServiceNow 통합 설정][4] 페이지로 이동합니다.
1. **Configure** 탭으로 이동한 다음 **ITOM/ITSM** 탭, **Monitors** 탭으로 이동합니다.
1. **Manage Legacy Monitor Notifications**에서 알림을 설정하려는 인스턴스를 선택한 다음 레거시 모니터링 알림에 쓸 표를 선택합니다.
1. 통합이 올바르게 설정되었는지 확인하기 위해 모니터 또는 이벤트 알림에 `@servicenow-<INSTANCE_NAME>`을 추가합니다. ServiceNow가 인시던트 우선순위를 계산하는 데 사용할 수 있도록 `Impact` 및 `Urgency` 값을 모두 정의할 수 있습니다. 원시 데이터는 중간 표의 행을 채우고 통합에 의해 지정된 ServiceNow 표로 전달됩니다.
   {{< img src="integrations/guide/servicenow/servicenow-priority-field-mapping.png" alt="정의된 영향 및 긴급도 값이 있는 레거시 모니터링 예시" style="width:100%;" >}}
1. ServiceNow에서 [변환 맵](#transform-maps)을 사용하여 중간 테이블로 전송되는 데이터의 변환을 사용자 지정합니다.
1. 사용 가능한 Datadog 변수 또는 커스텀 문자열을 사용하여 알림 페이로드를 사용자 지정합니다.

**참고**: 모니터 설명의 `Impact` 및 `Urgency`는 레거시 모니터 구성에서만 작동합니다. 서식화된 모니터의 경우 인스턴스 우선순위 매핑을 구성합니다. ServiceNow 인시던트의 `priority` 필드는 읽기 전용이며 [우선 순위 조회 규칙][8]을 통해서만 업데이트할 수 있습니다.
{{% /collapse-content %}}

{{% collapse-content title="서식화된 모니터 테이블 필드 및 변환 맵" level="h4" expanded=false id="templated-monitor-table-fields-transform-maps" %}}
`action`
: **유형**: 문자열<br>
모니터링에서 수행되는 작업: `create`, `update`, `acknowledge` 또는 `resolve`

`additional_information`
: **유형**: 문자열<br>
**ITOM 변환**: `additional_info`<br>
모든 이벤트 세부 정보가 포함된 형식화된 문자열

`aggreg_key`
: **유형**: 문자열<br>
경고 모니터의 ID 해시를 나타내는 집계 키

`alert_cycle_key`
: **유형**: 문자열<br>
단일 모니터의 경고 주기(경고 → 주의 → 해결)의 해시를 나타내는 키입니다.

`alert_id`
: **유형**: 문자열<br>
경고 모니터의 ID입니다.

`alert_metric`
: **유형**: 문자열<br>
**ITOM 변환**: `metric_name`<br>
경보를 트리거한 메트릭입니다.

`alert_query`
: **유형**: 문자열<br>
경보를 트리거한 쿼리입니다.

`alert_scope`
: **유형**: 문자열<br>
경보를 트리거한 범위

`alert_status`
: **유형**: 문자열<br>
현재 경보 상태

`alert_title`
: **유형**: 문자열<br>
경보 이름

`alert_transition`
: **유형**: 문자열<br>
**ITSM 변환**: (스크립트) -> 상태<br>
경고 전환 상태: `Triggered`, `Warn` 또는 `Recovered`

`assignment_group_sys_id`
: **유형**: 참조<br>
**ITSM 변환**: `assignment_group`<br>
**Reference Table**: 그룹<br>
템플릿 핸들의 할당 그룹에 대한 ServiceNow sys_id

`business_service_sys_id`
: **유형**: 참조<br>
**ITSM 변환**: `business_service`<br>
**Reference Table**: 서비스<br>
템플릿 핸들의 비즈니스 서비스에 대한 ServiceNow sys_id

`custom_fields`
: **유형**: 문자열<br>
JSON 변환 가능한 문자열로 형식이 지정된 사용자 설정 키-값 필드

`datadog_tags`
: **유형**: 문자열<br>
알림 모니터의 Datadog 태그

`description`
: **유형**: 문자열<br>
**ITSM 변환**: `description`<br>
**ITOM 변환**: `description`<br>
모니터 알림에 대한 요약 설명

`event_details`
: **유형**: 문자열<br>
**ITSM 변환**: `work_notes`<br>
연결되는 형식이 지정되어 있고, 클릭 가능한 Datadog 링크가 포함된 이벤트 세부 정보

`event_id`
: **유형**: 문자열<br>
이벤트의 Datadog ID

`event_link`
: **유형**: 문자열<br>
모니터 알림에서 생성된 이벤트 링크

`event_msg`
: **유형**: 문자열<br>
이벤트 메시지

`event_title`
: **유형**: 문자열<br>
**ITSM 변환**: `short_description`<br>
이벤트 타이틀

`event_type`
: **유형**: 문자열<br>
**ITOM 변환**: `type`<br>
이벤트 유형

`hostname`
: **유형**: 문자열<br>
**ITSM 변환**: `cmdb_ci`<br>
**ITOM 변환**: `node`<br>
영향을 받는 모니터의 호스트

`impact`
: **유형**: 정수<br>
**ITSM 변환**: `impact`<br>
모니터 우선순위의 사용자 정의 매핑을 기반으로 한 영향 값

`logs_sample`
: **유형**: 문자열<br>
관련 로그 샘플

`monitor_priority`
: **유형**: 정수<br>
**ITOM 변환**: `severity`<br>
정수로 표시된 알림 모니터의 우선순위

`org_name`
: **유형**: 문자열<br>
알림 모니터의 조직 이름

`sys_created_by`
: **유형**: 문자열<br>
**ITSM 변환**: `caller_id`<br>
레코드 작성자(일반적으로 구성된 ServiceNow API 계정)

`ticket_state`
: **유형**: 문자열<br>
**ITSM 변환**: `state`, (스크립트) -> close_code, (스크립트) -> close_notes<br>
**ITOM 변환**: (스크립트) -> resolution_notes<br>
ServiceNow 레코드 상태: `new` 또는 `resolved`

`u_correlation_id`
: **유형**: 문자열<br>
**ITSM 변환**: `correlation_id`<br>
**ITOM 변환**: `message_key`<br>
레코드를 동일한 대상 인시던트로 병합하는 데 사용되는 결합된 alert_cycle_key 및 aggreg_key

`urgency`
: **유형**: 정수<br>
**ITSM 변환**: `urgency`<br>
모니터 정의 우선순위에 따라 통합 타일의 사용자 정의 매핑에서 설정된 긴급도

`user_sys_id`
: **유형**: 참조<br>
**ITSM 변환**: `assigned_to`<br>
**Reference Table**: 사용자 <br>
사용자에 대해 전달된 템플릿 핸들에서 가져온 sys_id

{{% /collapse-content %}}

### Datadog 작업 관리 구성 {#case-management}

{{% site-region region="gov2" %}}
<div class="alert alert-warning">
작업 관리 통합은 {{< region-param key=dd_datacenter code="true" >}} 사이트에서 지원되지 않습니다.
</div>
{{% /site-region %}}

Datadog에서 ServiceNow의 Datadog 케이스 ITSM 표로 작업 항목을 보냅니다. ServiceNow는 들어오는 레코드를 저장하고 설치된 업데이트 세트를 사용하여 인시던트 테이블의 레코드를 변환합니다. Datadog은 이 표에 대한 사용자 지정 페이로드를 지원하지 않습니다.

<div class="alert alert-info">ServiceNow에서 설정을 구성하는 사용자는 다음 두 가지를 모두 보유해야 합니다. <code>x_datad_datadog.user</code> 및 <code>admin</code> 역할.</a></div>

1. Datadog에서 [ServiceNow 통합 설정][4] 페이지로 이동합니다.
1. **Configure** 탭으로 이동한 다음 **ITOM/ITSM** 탭, **Work Management** 탭으로 이동합니다.
1. **Sync ServiceNow with Work Management**에서 ServiceNow 인스턴스에 대한 설정을 엽니다.
1. **케이스 표** 옆에서 작업 항목을 **Datadog 케이스 ITSM**으로 보내도록 선택합니다. **참고**: ITOM은 Work Management에서 지원되지 않습니다.
1. [**Work Management > Settings**][5] 페이지로 이동하여 프로젝트를 확장합니다. 그런 다음 해당 프로젝트에 대해 [ServiceNow 통합을 설정][6]합니다.

### Datadog Incident Management 구성 {#incident-management}

Datadog ServiceNow 통합을 사용하면 Datadog 인시던트에서 ServiceNow 인시던트를 생성하고 두 플랫폼 간에 [데이터를 양방향으로 동기화](#sync-bidirectionally)할 수 있습니다. Datadog Incident Management와의 통합은 향상된 가시성, 인시던트 상태, 심각도 및 모든 상태 업데이트의 자동 양방향 동기화, 기존 ServiceNow 워크플로에 대한 지원을 제공합니다.

통합을 설치한 후 Datadog에서 [통합 설정][9] 페이지로 이동하세요. **ServiceNow** 타일을 클릭하여 ServiceNow 인시던트 생성을 구성하세요.

Incident Management를 위해 이 통합을 설정하고 구성하는 방법에 대한 단계별 지침은 [ServiceNow와 Datadog Incident Management 통합][12]을 참조하세요.

## ServiceNow와 Work/Incident Management 간에 데이터를 양방향으로 동기화 {#sync-bidirectionally}

ServiceNow에서는 Work Management 및 Incident Management 모두와 상태, 영향 및 긴급도를 양방향으로 동기화할 수 있습니다.

**참고**: 데이터는 Datadog의 ServiceNow 통합 타일에 구성된 사용자가 **아닌** ITIL 역할이 있는 사용자가 변경한 경우에만 ServiceNow에서 Datadog으로 다시 동기화됩니다.

1. Datadog에서 지침에 따라 [서비스 계정 애플리케이션 키를 생성][7]합니다.<br />**참고**: Datadog은 개인 키를 사용하는 대신 이 키를 생성할 것을 권장합니다. 개인 키를 사용하면 사용자 계정이 비활성화되거나 권한이 변경될 경우 ServiceNow 동기화가 중단될 위험이 있습니다.
1. ServiceNow에서 오른쪽 상단 모서리에 있는 지구본 아이콘을 클릭한 다음 **Application Scope**가 **ITOM/ITSM Integration for Datadog**으로 설정되어 있는지 확인합니다.
1. 왼쪽 상단 탐색 메뉴에서 **All**을 클릭합니다.
1. 필터에 **ITOM/ITSM Integration for Datadog**을 입력합니다.
1. 필터링된 결과에서 **Configuration** 링크를 클릭한 다음 필요한 설정을 입력합니다.
   1. **Datadog 데이터 센터**를 선택합니다.
   1. **Datadog API 키**를 붙여넣습니다.
   1. 생성한 **서비스 계정 애플리케이션 키**를 붙여넣습니다.
   1. **Enabled** 확인란을 선택합니다.
1. **Save**를 클릭합니다.
1. (선택 사항) ITOM/ITSM 통합 버전 2.7.0 이상을 사용하는 경우, 상관관계가 있는 알림의 정보를 사용하여 ServiceNow의 값을 채울 수 있습니다.<br /> 방법에 대한 지침은 아래 **상관관계가 있는 경보 데이터 변환**에서 확인할 수 있습니다.



## 변환 맵으로 데이터 사용자 지정 {#transform-maps}

ServiceNow 통합은 Datadog에서 임시 표로 데이터를 기록하며, 이 데이터는 ServiceNow의 레코드로 변환됩니다. 모든 사용자 지정(예: [사용자 지정 필드 매핑](#custom-field-mappings))의 경우, 변환 맵을 확장하여 Datadog에서 ServiceNow로 매핑할 필드를 지정할 수 있습니다.

## 추가 구성 옵션 {#additional-configuration-options}

{{% collapse-content title="Datadog 가져오기 호스트 자동 플러시 규칙" level="h3" expanded=false id="import-host-auto-flush" %}}
가져오기 세트 표 `x_datad_datadog_import_host`에 너무 많은 행이 쌓이는 것을 방지하기 위해, 최근 24시간 데이터만 유지하도록 표 정리 도구에 자동 플러시 규칙이 추가되었습니다. 이 구성 설정은 필터 탐색기에서 `sys_auto_flush_list.do`로 이동하여 `x_datad_datadog_import_host` 표에 대한 규칙으로 들어가 필요에 따라 변경할 수 있습니다. 그에 따라 `Age in seconds` 필드를 업데이트할 수 있습니다.
{{% /collapse-content %}}

{{% collapse-content title="ServiceNow에서 사용자 지정 필드 매핑 만들기" level="h3" expanded=false id="custom-field-mappings" %}}
ServiceNow에서 사용자 지정 필드 매핑을 만드는 방법:

1. 테이블 중 하나를 클릭하고(예: **Datadog ITSM 테이블 모니터링**) 레코드 하단으로 스크롤하여 연결된 변환 맵의 링크를 확인합니다.
1. 변환 맵의 이름을 클릭하면 레코드를 볼 수 있습니다.
   {{< img src="integrations/guide/servicenow/servicenow-click-transform-map.png" alt="Datadog 인시던트 표를 인시던트 표에 매핑하는 Datadog 인시던트 변환을 보여주는 ServiceNow 표 변환 맵입니다." style="width:100%;" >}}
   상단에는 변환 레코드의 두 가지 중요한 필드인 <code>Source table</code> 및 <code>Target table</code>이(가) 있습니다.
   {{< img src="integrations/guide/servicenow/servicenow-source-target-fields.png" alt="소스 표인 Datadog 인시던트 표가 대상 표인 인시던트 [incident]에 매핑된 것을 보여주는 ServiceNow의 Datadog 인시던트 변환 맵입니다." style="width:100%;" >}}
1. **New**를 클릭합니다.
   {{< img src="integrations/guide/servicenow/servicenow-click-new.png" alt="ServiceNow의 Field Maps 탭에서 Datadog 인시던트 변환에 대한 소스 및 대상 필드 매핑을 보여줍니다. 분홍색 화살표가 새 필드 맵을 추가하는 데 사용되는 New 버튼을 가리킵니다." style="width:100%;" >}}
1. 일대일 매핑을 위해 소스 필드와 대상 필드를 선택합니다.
   {{< img src="integrations/guide/servicenow/servicenow-select-source-target.png" alt="Datadog 인시던트 변환 맵에서 소스 필드 PRIORITY가 대상 필드 Severity에 매핑된 것을 보여주는 ServiceNow 필드 맵 구성입니다." style="width:100%;" >}}
   또는 <strong>Use source script</strong> 상자를 검사하고 변환을 정의합니다.
   {{< img src="integrations/guide/servicenow/servicenow-script-example.png" alt="Datadog 인시던트 변환의 ServiceNow 필드 맵 스크립트에서 소스 스크립트가 source.priority 값을 Incident 표의 우선순위 필드에 대한 숫자 심각도 수준으로 매핑하는 것을 보여줍니다." style="width:100%;" >}}

통합 타일에서 사용자 지정 필드를 매핑하려면 Datadog 모니터 ITOM 및 Datadog 모니터 ITSM 변환 맵 모두에 대해 다음 스크립트를 사용할 수 있습니다. 이 예시에서 `my_field` 필드는 통합 타일에서 사용자 지정 필드로 정의됩니다.

```
answer = (function transformEntry(source)
{
    var additional_info = JSON.parse(source.additional_info);
    return additional_info.my_field;
})(source);
```

**참고**:
- 소스는 선택한 가져오기 집합 표(이 경우, Datadog ITSM 표 모니터링)이고 대상은 이벤트가 저장되어 있는 실제 인시던트 표(또는 이벤트 표)입니다.
- 필드 매핑은 레코드 하단에 있습니다. 여기에는 일부 기본 매핑이 포함되어 있습니다. 여기에서 포함할 필드를 선택하고, 형식을 정의하며, ServiceNow 인스턴스에서 대상 필드를 선택합니다.
{{% /collapse-content %}}

{{% collapse-content title="상관관계가 있는 경보 데이터 변환" level="h3" expanded=false id="transform-correlated-alert-data" %}}
상관관계가 있는 경보의 정보를 사용하여 ServiceNow의 값을 채우려면 Datadog 케이스 ITSM/ITOM 표 변환 맵 아래에 새 onBefore 변환 스크립트를 추가하세요.

ServiceNow 인시던트에 데이터를 채우려면 Datadog에서 전송되어 EM 상관관계 경보 열에 저장된 데이터를 구문 분석하도록 스크립트를 수정하고, 구문 분석된 데이터를 보낼 인시던트의 필드를 지정해야 합니다. 다음은 필요에 따라 사용자 지정할 수 있는 샘플 스크립트입니다.

```
(function runTransformScript(source, map, log, target /*undefined onStart*/ ) {
    // We do not need to process non-correlated-alert events
    if (!source.em_correlated_alert_id) {
        return;
    }

    // Create a GlideRecord for the table
    var gr = new GlideRecord('x_datad_datadog_case_incident_table');
    gr.addQuery('case_id', source.case_id);
    gr.addNotNullQuery('em_correlated_alert_id');
    gr.orderByDesc('sys_created_on');
    gr.query();

    // Ensure we process each alert_id only once
    var seenAlert = {};

    // Add relevant correlated alert fields here
    var alertNames = [];


    // Loop through list of correlated_alerts associated with the same case_id
    while (gr.next()) {
        var emAlertId = gr.getValue('em_correlated_alert_id');

        if (!seenAlert.hasOwnProperty(emAlertId)) {
            seenAlert[emAlertId] = true;
            var changeType = gr.getValue('em_change_type');
            if (changeType == "added") {
                var correlatedAlert = gr.getValue("em_correlated_alert");
                var jsonAlert = JSON.parse(correlatedAlert);

                // Get relevant fields from the JSON event
                var alertName = jsonAlert['alert_message'];
                alertNames.push(alertName);
            }
        }
    }

    // Set the corresponding value on the incident table
    // target.impact = 1;

})(source, map, log, target);
```

{{% /collapse-content %}}

## 문제 해결 {#troubleshooting}

{{% collapse-content title="Datadog 통합의 오류 메시지" level="h3" expanded=false id="troubleshooting-error-messages" %}}
Datadog 통합 타일에서 오류 메시지가 표시되거나 `Error while trying to post to your ServiceNow instance` 알림이 나타나는 경우:
- 인스턴스 이름을 입력할 때 하위 도메인만 사용되었는지 확인합니다.
- 생성한 사용자에게 필요한 권한이 있는지 확인합니다.
- 사용자 이름과 비밀번호가 올바른지 확인합니다.
{{% /collapse-content %}}

{{% collapse-content title="티켓이 생성되지 않았습니다." level="h3" expanded=false id="troubleshooting-no-ticket" %}}
통합이 설정되고 경보가 트리거되었지만 티켓이 생성되지 않은 경우:
- 임시 표가 채워져 있는지 확인합니다. 그럴 경우 문제는 매핑 및 변환에 있는 것입니다. ServiceNow에서 **Transform Errors**로 이동하여 매핑 및 스크립트를 추가로 디버깅할 수 있습니다.
- 타일에서 지정한 임시 표로 작업하고 있는지 확인합니다.

ServiceNow 사용자는 가져오기 표에 액세스할 수 있도록 `rest_service` 및 `x_datad_datadog.user` 역할이 필요합니다. 알림을 인시던트 표나 이벤트 표로 직접 보내는 기존 방식을 사용하는 경우 `itil` 및 `evt_mgmt_integration` 권한이 필요합니다.
{{% /collapse-content %}}

{{% collapse-content title="ServiceNow에서 Datadog으로의 업데이트가 없습니다." level="h3" expanded=false id="troubleshooting-no-updates" %}}
Datadog Work Management에서 ServiceNow로의 업데이트는 확인되지만 ServiceNow에서 Datadog으로의 업데이트가 확인되지 않는 경우, 이는 ServiceNow ITOM에 대해 예상되는 동작입니다. Work Management와의 양방향 동기화는 ServiceNow ITSM에서만 지원됩니다.
{{% /collapse-content %}}

{{% collapse-content title="중복 인시던트 모니터링" level="h3" expanded=false id="troubleshooting-monitors-duplicating-incidents" %}}
모니터가 각 경고에 대해 새 인시던트를 생성하는 대신 동일한 인시던트를 다시 여는 경우, 단순 경고로 설정되어 있지 않은지 확인하세요. 메트릭의 태그를 사용하여 그룹화함으로써 모니터를 [복수 경고][11]로 변환하세요. 이렇게 하면 각 경고가 별도의 인시던트를 트리거합니다.
{{% /collapse-content %}}

추가 지원이 필요하세요? [Datadog 지원팀][10]에 문의하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://store.servicenow.com/store/app/e0e963a21b246a50a85b16db234bcb67
[2]: /ko/resources/xml/Datadog-Snow_Update_Set_v2.7.9.xml
[3]: /ko/integrations/servicenow/#configure-the-servicenow-tile-in-datadog
[4]: https://app.datadoghq.com/integrations?integrationId=servicenow
[5]: https://app.datadoghq.com/work/settings
[6]: /ko/incident_response/work_management/notifications_integrations/#servicenow
[7]: /ko/account_management/org_settings/service_accounts/#create-or-revoke-application-keys
[8]: https://docs.servicenow.com/en-US/bundle/sandiego-it-service-management/page/product/incident-management/task/def-prio-lookup-rules.html
[9]: https://app.datadoghq.com/incidents/settings?section=integrations
[10]: /ko/help/
[11]: /ko/monitors/configuration/?tab=thresholdalert#multi-alert
[12]: /ko/incident_response/incident_management/integrations/servicenow