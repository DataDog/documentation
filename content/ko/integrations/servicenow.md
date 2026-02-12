---
categories:
- alerting
- incidents
- issue tracking
- notifications
custom_kind: 통합
dependencies: []
description: Datadog 알림이 자동으로 티켓을 생성하고 업데이트하도록 하세요.
doc_link: https://docs.datadoghq.com/integrations/servicenow/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/create-servicenow-tickets-from-datadog-alerts/
  tag: 블로그
  text: Datadog 알림에서 ServiceNow 티켓을 생성하세요.
- link: https://www.datadoghq.com/blog/servicenow-cmdb-it-management-datadog/
  tag: 블로그
  text: ServiceNow CMDB 및 Datadog를 사용해 인프라스트럭처를 관리하세요.
git_integration_title: servicenow
has_logo: true
integration_id: ''
integration_title: ServiceNow
integration_version: ''
is_public: true
manifest_version: '1.0'
name: servicenow
public_title: Datadog-ServiceNow 통합
short_description: Datadog 알림이 자동으로 티켓을 생성하고 업데이트하도록 하세요.
team: 웹-통합
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

ServiceNow는 단일 장소에서 기업 엔터프리이즈 수준의 IT 프로세스를 기록하고, 추적하고 관리할 수 있도록 해주는 IT 서비스 관리 플랫폼입니다.

Datadog ServiceNow 통합은 양방향 통합을 제공하며 다음을 지원합니다.

-   Datadog 생성 이벤트를 ServiceNow 티켓에 푸시하고 Datadog 내에서 IT 서비스 관리(ITSM) 및 IT 운영 관리(ITOM)를 통해 해상도 워크플로를 관리할 수 있습니다. 
-   서비스 그래프 연결기를 사용하여 CMDB(ServiceNow Configuration Management Database) 설정 항목(CI)에 대한 발견 메커니즘으로 Datadog를 사용합니다.
-   ServiceNow CMDB에서 CI로 저장된 비즈니스별 정보를 Datadog의 호스트, 서비스, 장치 정보로 강화하여 인프라스트럭처 사용량을 더 잘 이해하고, 트러블슈팅을 가속하고 리소스 활용도를 최대화합니다.

Datadog는 다음 ServiceNow 도구와 통합됩니다.

-   ITOM
-   ITSM
-   CMDB

**참고**: Datadog ServiceNow 통합은 수명 종료로 등록되지 않은 [ServiceNow 릴리스][1]를 지원합니다. 

### Datadog의 ServiceNow 타일 설정

1. Datadog에서 통합 페이지의 [ServiceNow 통합 타일][2]로 이동합니다.
2. *새 인스턴스 추가**를 클릭합니다.
3. ServiceNow 도메인의 하위 도메인인 인스턴스 이름을 추가합니다. `<INSTANCE_NAME>.service-now.com`.
4. ServiceNow 인스턴스에 대한 사용자 이름과 비밀번호를 추가합니다.

**참고**: ServiceNow에서 Datadog만을 위한 제한된 사용자를 만들 수 있습니다.

{{< img src="integrations/servicenow/servicenow-configuration-new-instance-12-23.png" alt="ServiceNow 통합 새 인스턴스" >}}

## CMDB 설정

### Datadog용 서비스 그래프 연결기

[관측 가능성을 위한 서비스 그래프 연결기 - Datadog][3]는 Datadog에서 발견한 새로운 리소스에 대해 자동으로 CMDB[4]에서 서버와 데이터베이스 설정 항목(CI)을 자동으로 입력할 수 있도록 해줍니다. 서비스 그래프 연결기는 ServiceNow [스토어][4]를 통해 사용할 수 있습니다[4].

설정을 위해 서비스 그래프 연결기의 가이드 설정 지침을 따릅니다.

지원되는 CI 유형:

-   서버
-   Amazon RDS

아래 알림은 ServiceNow ITOM/ITSM에 대한 통합을 이미 설정한 경우에만 적용됩니다.

-   서비스 그래프 연결기는 설정 타일에서 `Target table` 및 `Custom table` 값을 사용하지 않습니다. 대상 테이블 기본 값을 통해 통합을 저장할 수 있습니다.
-   서비스 그래프 연결기에 안내된 설정 지침에 따라 `cmdb_import_api_admin` 역할을 이 사용자에게 부여하여 동일한 ITOM/ITSM 사용자를 서비스 그래프 연결기를 위해 사용할 수 있습니다.

### CI 필드 커스터마이즈

[Datadog ServiceNow][2] 통합 타일에서 **서비스 그래프 연결기** 탭을 클릭한 다음 **CI 필드 커스터마이즈** 섹션을 확장합니다. 다음 옵션을 사용할 수 있습니다.

CI 유형
: 이 필드가 적용되는 CI 유형입니다.

ServiceNow Field
: 적용할 ServiceNow의 필드입니다.

Datadogtag
: Datadog 리소스에서 전송할 태그입니다(동일한 이름의 여러 태그가 존재하는 경우 쉼표로 구분됩니다.).

예를 들어 `Host` CI 유형을 CI 필드와 ServiceNow 필드 `Host Name`를 추가하려면 모든 _호스트_ 태그 속성을 `Datadogtag` 필드를 추가합니다.

**참고**: `Datadogtag` 필드는 Datadog 호스트에서 존재하는 _호스트_태그여야 하며 호스트 속성 태그가_아니어야_ 합니다.

{{< img src="integrations/servicenow/servicenow_integration_tile.png" alt="서비스 그래프 연결기 탭을 표시하는 ServiceNow 통합 타일의 스크린샷" >}}

### 호스트 태깅

호스트 태깅을 통해 ServiceNow CMDB 메타데이터를 통해 Datadog 호스트를 강화합니다.

호스트 태그 수집을 활성화하려면,

1. Datadog에서 태깅하려는 모든 호스트를 반환하는 ServiceNow 인스턴스의 [쿼리 빌더][5] 쿼리를 설정합니다.
1. 쿼리를 예약하여 원하는 새로고침 간격으로 실행합니다.
1. 쿼리가 ServiceNow에 저장되면 Datadog의 ServiceNow 통합 타일로 이동합니다. **CMDB 강화** 탭에서 **호스트 태깅**을 선택합니다.
1. **쿼리 설정**에서 **새 쿼리 추가** 버튼을 클릭합니다.
1. 드롭다운 메뉴에서 **ServiceNow 인스턴스** 및 **쿼리**를 선택합니다.
1. 쿼리 루트의 CI 호스트 이름 필드를 Datadog의 호스트 이름 필드에 매핑하는 **호스트 이름 열**의 값을 선택합니다.
1. **열 이름 맵**을 사용하여 선택 필드 이름 리매핑을 선택합니다.
1. **저장**을 클릭합니다.

쿼리 예약 실행 직후 Datadog에 호스트 태그가 채워질 것으로 보입니다.

{{< img src="integrations/servicenow/host-tags.jpg" alt="ServiceNow 호스트 태그를 보여주는 호스트 정보 탭의 스크린샷" >}}

`source:servicenow`에서 검색 쿼리 범위를 지정하여 Datadog [이벤트 탐색기][6]에서 수집 프로세스를 모니터링합니다.

{{< img src="integrations/servicenow/ingestion-progress.jpg" alt="수집을 실행하는 항목을 보여주는 스크린샷" >}}

#### 호스트 태깅 트러블슈팅

호스트 태깅이 올바르게 작동하려면 다음 항목이 시스템에서 참인지 확인하세요.

-   쿼리 빌더 쿼리를 만들고 생성하는 사용자가 Datadog 설정의 사용자 이름과 일치합니다. ServiceNow의 사용자는 `cmdb_query_builder_read` 역할이어야 합니다.
-   쿼리에서 반환되는 결과 수는 ServiceNow의 `glide.cmdb.query.max_results_limit` 설정보다 작거나 같아야 합니다. 기본적으로 최대 결과 수는 10000개입니다. 설정을 변경하려면 **설정** -> **CMDB 속성** -> **쿼리 빌더 속성**으로 이동하세요.
-   쿼리 빌더 쿼리에 구성된 모든 CI에는 **1** 레이블이 있어야 합니다. 이렇게 하면 파서가 지원하지 않는 중복된 CI를 만들지 않았는지 확인할 수 있습니다.

#### 한계

-   수집은 실행별 10만 개 호스트로 제한됩니다.
-   호스트에 대한 업데이트는 시간당 몇 천 건으로 제한됩니다. 일정 간격을 선택할 때 이 제한을 고려하세요.
-   태깅은 Datadog 호스트 별칭은 대소문자를 구분하므로 소문자 호스트 이름을 가진 Linux 시스템에서는 작동하지 않습니다.

### 서비스 태깅

서비스 태깅을 통해 ServiceNow CMDB 메타데이터로 Datadog 서비스 카탈로그를 강화하세요.

서비스 태깅을 사용하여 Datadog [서비스 카탈로그][7]를 ServiceNow CMDB의 서비스로 채울 수 있습니다.

#### 설정

서비스 데이터 수집을 활성화하려면,

1. 서비스 카탈로그에서 보강하려는 모든 서비스를 반환하는 [쿼리 빌더][5] 쿼리를 ServiceNow 인스턴스에서 설정합니다.
1. 원하는 새로 고침 간격에 실행되도록 쿼리 예약을 설정합니다.
1. 쿼리가 ServiceNow에 저장되면 Datadog의 ServiceNow 통합 타일로 이동합니다. **CMDB 강화** 탭 에서 **서비스 태깅**을 선택합니다.
1. **쿼리 설정**에서 **새 쿼리 추가** 버튼을 클릭합니다.
1. 드롭다운 메뉴에서 **ServiceNow 인스턴스** 및 **쿼리**를 선택합니다. 
1. **서비스 이름 열** 드롭다운 메뉴에서 값을 선택합니다. 이 값은 쿼리의 루트 서비스 CI의 열 이름과 일치하며 서비스 카탈로그의 서비스 이름을 채웁니다.
1. 스키마 매핑을 설정하여 서비스에 대한 추가 메타데이터를 서비스 카탈로그로 풀링할 수 있습니다. 자세한 내용은 [서비스 정의][8]를 참조하세요. Datadog에서 수집을 허용하려면 매핑의 각 필드가 서비스 카탈로그 서비스 정의 스키마에 매핑할 수 있는 올바른 유형이어야 합니다.
1. **저장**을 클릭합니다.

쿼리' 예약 실행 후 몇 분 후에 Datadog에 서비스 데이터가 채워질 것으로 예상됩니다. 수집 오류를 보려면 [이벤트 탐색기][6]로 이동하고 이벤트의 경우 검색에서 `source:servicenow`로 이동하세요.

{{< img src="integrations/servicenow/service-metadata.jpg" alt="ServiceNow에서 채워진 메타데이터를 보여주는 서비스 설정 패널 스크린샷" >}}

#### 설정 트러블슈팅

서비스 수집이 올바르게 작동하려면 시스템에서 다음 항목이 참인지 확인하세요.

-   쿼리 빌더 쿼리를 만들고 실행하는 사용자는 Datadog 설정의 사용자 이름과 일치해야 합니다. ServiceNow 사용자는 `cmdb_query_builder_read` 역할이 있어야 합니다.
-   쿼리에서 반환되는 결과 수는 ServiceNow의 `glide.cmdb.query.max_results_limit` 설정보다 작거나 같아야 합니다. 기본적으로 최대 결과 수는 10000개입니다. 설정을 변경하려면 **설정** -> **CMDB 속성** -> **쿼리 빌더 속성**으로 이동하세요.
-   쿼리 빌더 쿼리에 구성된 모든 CI에는 **1** 레이블이 있어야 합니다. 이렇게 하면 파서가 지원하지 않는 중복된 CI를 만들지 않았는지 확인할 수 있습니다.

### 네트워크 장치 태깅

ServiceNow CMDB의 데이터로 채워진 Datadog에서 네트워크 장치에 태그를 추가합니다.

장치 태깅을 사용하면 ServiceNow CMDB의 장치 메타데이터로 Datadog [네트워크 장치 모니터링][9]에서 모니터링하는 네트워크 장치를 동적으로 보강할 수 있습니다.

장치 태그 수집을 활성화하려면,

1. ServiceNow 인스턴스에서 [쿼리 빌더][5] 쿼리를 설정합니다. 장치 IP 주소를 반환하는지 확인합니다.
1. 원하는 새로 고침 간격에 실행되도록 쿼리 예약을 설정합니다.
1. Datadog에서 커스텀 IP 네임스페이스를 사용하는 경우 ServiceNow에 추가해야 합니다. 네트워크 장치 CI에 **u_dd_device_namespace**라는 열을 만들고 각 장치에 해당하는 네임스페이스로 채웁니다. 이 열이 없는 경우 기본값 네임스페이스가 사용됩니다.
1. 쿼리가 ServiceNow에 저장되면 Datadog의 ServiceNow 통합 타일로 이동합니다. **CMDB 강화** 탭에서 **장치 태깅**을 선택합니다.
1. **쿼리 설정**에서 **새 쿼리 추가** 버튼을 클릭합니다.
1. 드롭다운 메뉴에서 **ServiceNow 인스턴스** 및 **쿼리**를 선택합니다.
1. 쿼리의 IP 주소 필드를 Datadog의 IP 주소 필드에 매핑하는 IP 주소 열을 선택합니다.
1. 선택 필드 이름 리매핑을 선택합니다.
1. **저장**을 클릭합니다.

쿼리 예약 실행 후 몇 분 이내에 Datadog에 네트워크 장치 태그가 채워질 것으로 예상할 수 있습니다. 모든 수집 오류는 이벤트 탐색기에서 볼 수 있는 이벤트를 통해 보고됩니다.

`source:servicenow`에서 검색 쿼리 범위를 지정하여 Datadog [이벤트 탐색기][6]에서 수집 프로세스를 모니터링합니다.

{{< img src="integrations/servicenow/ingestion-progress.jpg" alt="수집을 실행하는 항목을 표시하는 스크린샷" >}}

#### 네트워크 장치 태깅 트러블슈팅

-   쿼리 빌더 쿼리를 만들었거나 실행 중인 사용자가 Datadog 설정에서 동일한 사용자이고 역할이 `cmdb_query_builder_read`인지 확인합니다.
-   쿼리가 ServiceNow `glide.cmdb.query.max_results_limit` 설정에서 허용되는 것보다 더 많은 결과를 반환하지 않는지 확인합니다.
    쿼리 빌더 쿼리에 설정된 모든 CI에 '1' 레이블이 있는지 확인합니다. 파서가 중복된 CI를 지원하지 않으므로 중복된 CI를 만들지 않았는지 확인하세요.

#### 한계

-   수집은 실행당 10만 호스트로 제한됩니다.
-   네트워크 장치 태깅은 [SNMP 장치][10]로 제한됩니다.
-   장치에 대한 업데이트는 시간당 수천 건으로 제한됩니다. 일정 간격을 선택할 때 이 점을 고려하세요.

### 참조표

[참조 테이블][11]을 사용하여 ServiceNow CI의 추가 필드로 로그와 이벤트를 보강합니다. 참조 테이블을 사용하면 값 필드 집합을 호스트 이름과 같은 기본 키에 매핑하고 지정된 키가 포함된 모든 로그 또는 이벤트에 이러한 필드를 자동으로 추가할 수 있습니다.

참조 테이블 수집을 활성화하려면,

1. ServiceNow 인스턴스에서 [쿼리 빌더][12] 쿼리를 설정합니다.
1. 쿼리를 원하는 새로 고침 간격으로 실행하도록 예약합니다.
1. 쿼리를 저장합니다.
1. **새 쿼리 추가**를 선택하고 드롭다운 메뉴에서 쿼리를 선택합니다.
1. 기본 키 드롭다운에서 기본 키로 사용할 열 이름을 선택합니다.
    1. 선택적으로 이 기본 키로 [처리 파이프라인][13]을 생성하여 로그와 이벤트를 보강하고 연계합니다.
1. 참조 테이블의 이름을 입력합니다.
1. **저장**을 클릭합니다.

[참조 테이블][11]은 저장 직후 쿼리 데이터로 채워집니다.

#### 주의 사항 및 제한 사항

-   참조 테이블 이름은 고유해야 합니다.
-   기존 테이블의 삭제 및 스키마 업데이트는 지원되지 않습니다.

## ITOM 및 ITSM 설정

{{% site-region region="gov,ap1" %}}

<div class="alert alert-danger">
사례 관리 통합은 {{< region-param key=dd_datacenter code="true" >}} 사이트에서 지원되지 않습니다.
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
인시던트 관리 통합은 {{< region-param key=dd_datacenter code="true" >}} 사이트에서 지원되지 않습니다.
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}


<div class="alert alert-danger">
서식화된 모니터 알림은 {{< region-param key=dd_datacenter code="true" >}} 사이트에서 지원되지 않습니다.
</div>
{{% /site-region %}}

모니터, 사례 관리 및 인시던트 관리에 Datadog 통합을 사용하려면 다음 단계를 따르세요:

1. [앱 설치하기](#install-the-app)
2. [Datadog]에 대한 올바른 권한으로 ServiceNow 계정 만들기](#create-a-servicenow-account-with-correct-permissions-for-Datadog)
3. [ ITOM 및 ITSM과 함께 사용하기 위한 Datadog 애플리케이션 설정](#configure-datadog-applications-for-use-with-itom-and-itsm-modules)

### 앱 설치

앱은 두 가지 방법으로 설치할 수 있습니다.

1. ServiceNow 스토어에서 `ITOM/ITSM Integration for Datadog` 앱 최신 버전을 설치합니다.

{{< img src="integrations/servicenow/servicenow-appstore-itxm-integration.png" alt="ServiceNow 앱 스토어 ITSM/ITOM 통합" >}}

2. 최신 업데이트 세트를 다운로드합니다. [`Datadog-Snow_Update_Set_v2.6.1.xml`][14]를 다운로드하여 ServiceNow 인스턴스에 수동으로 업로드합니다.

**변경 로그**

- v2.4.0 >= 사례 관리를 통한 단방향 동기화를 제공합니다.
- v2.5.0 >= 인시던스 관리와의 통합을 위한 사례 관리와 ITSM 테이블을 통한 양방향 동기화, 또한 케이스 관리를 통한 양방향 동기화는 ServiceNow ITSM에서만 지원됩니다.
- v2.6.0 >= ITOM/ITSM을 통해 서식화된 모니터 알림을 제공합니다. 

ServiceNow에서 업데이트 세트 설치하기:

1. 다운로드한 업데이트 세트 XML 파일을 ServiceNow 인스턴스로 수동으로 가져옵니다.
2. XML 파일을 가져오면 업데이트 집합에 `Loaded` 상태가 표시되어야 합니다. 업데이트 집합의 이름을 클릭하여 변경 사항을 미리 봅니다.
3. 업데이트 세트를 미리 보고 오류가 없는지 확인했으면 **업데이트 세트 커밋**을 선택하여 애플리케이션을 시스템에 병합합니다.

앱을 설치한 후 ServiceNow 탐색 메뉴에서 검색 **Datadog**를 클릭하여 모든 테이블과 양방향 동기화 설정을 위한 설정 페이지에 액세스합니다.

- `Configuration`
- `Datadog Incidents ITSM`
- `Cases ITOM`, 이전 `Datadog Cases ITOM`
- `Cases ITSM`, 이전 `Datadog Cases ITSM`
- `Legacy Monitors ITOM`, 이전 `Datadog Monitors ITOM`
- `Legacy Monitors ITSM`, 이전 `Datadog Monitors ITSM`
- `Templated Monitors ITOM`
- `Templated Monitors ITSM`

### Datadog에 대한 올바른 권한이 있는 ServiceNow 계정을 만듭니다. 

통합을 사용하려면 ServiceNow 사용자(예: 사용자 이름 "Datadog" 또는 "datadog_통합")를 만들고 다음 역할을 모두 할당하세요.

- `x_datad_datadog.user` 및
- `import_set_loader` 및
- `import_transformer`

#### 인시던트 해결 및 종결

<div class="alert alert-info">사례 관리와의 양방향 동기화는 ServiceNow ITSM에 대해서만 지원됩니다.</div>

해결을 위해 인시던트 상태를 동기화하려면 ServiceNow 사용자에게 다음 역할 중 하나가 필요합니다.

-   `ITIL` 또는
-   `list_updater` 또는
-   `sn_incident_write`

종료 시 인시던트 상태를 동기화하려면 ServiceNow 사용자에게 다음과 같은 역할이 필요합니다.

-   `ITIL_admin`

#### 인시던트 및 이벤트 테이블에 직접 모니터 알림 전송

알림 을 ITOM 모듈 **이벤트** 테이블 또는 ITSM 모듈 **인시던트** 테이블로 직접 전송히려면 ServiceNow 사용자에게 다음 역할 중 하나가 필요합니다.

-   ITSM을 위한 `ITIL` 
-   ITOM을 위한 `evt_mgmt_integration`

**참고**: 이 ServiceNow 사용자("Datadog" 또는 "datadog_통합")가 ServiceNow에서 티켓에 수동으로 업데이트한 내용은 Datadog에 동기화되지 않습니다.

### 서식화된 모니터 알림

**참고**: 이 기능을 사용하려면 앱 버전 >= v2.6.0이 필요합니다. 또한 아래 단계를 완료하기 전에 Datadog에서 ServiceNow 타일의 설정 페이지에 인스턴스를 추가해야 합니다.

##### 인스턴스 우선순위 매핑 설정

{{< img src="integrations/servicenow/servicenow-priority-mapping.png" alt="통합 타일에서 ServiceNow 우선순위 매핑" >}}

특정 인스턴스에 서식화된 모든 @-핸들에 대해 이제 이 매핑에 따라 Datadog가 ServiceNow의 영향과 긴급성에 따른 모니터 우선순위 모니터링 매핑을 실행합니다.

`Use Instance Priority Mapping`을 끄면 ServiceNow 레코드에 대한 영향 및 긴급성 설정이 비활성화됩니다.

#### 모니터 템플릿 설정

{{< img src="integrations/servicenow/servicenow-integration-tile.png" alt="새 ServiceNow 통합 타일" >}}

Datadog에서 `@servicenow-<TEMPLATE_NAME>`을 사용하는 모니터 알림의 경우, ServiceNow 통합 타일 에서 Datadog의 ITOM/ITSM 탭에서 새 템플릿 생성 UI를 사용하여 ServiceNow 알림을 생성합니다.

**참고**: 이 기능은 앱 버전이 2.6.0 이상인 경우에만 사용할 수 있습니다.

##### 모니터 알림에 대한 커스텀 ServiceNow @핸들을 만듭니다.

{{< img src="integrations/servicenow/servicenow-monitors.png" alt="새 ServiceNow 통합 타일의 모니터 알림 지침" >}}

1. `+ New` 버튼을 클릭하여 새 템플릿을 만듭니다.
2. 전달할 모니터 알림에 대해 `Name`, `Instance` 및 `Target Table` @핸들을 정의합니다. 그런 다음 `Assignment Group`, `Business Service`, `User` 또는 `Unassigned` 중 하나를 선택하여 레코드를 할당합니다. 2.6.0에 정의된 변환 맵은 여기서 선택한 값으로 인시던트 `INC` 레코드를 자동으로 채웁니다.

새 템플릿을 사용하려면 모니터 설명에 `@servicenow-<TEMPLATE_NAME>`을 추가하세요.

`Customize notification payload` 섹션에서 `Add Field` 을 클릭하여 페이로드에 커스텀 필드를 추가할 수 있습니다.

#### 사례 관리 설정

{{< img src="integrations/servicenow/servicenow-case-management.png" alt="새 ServiceNow 통합 타일의 사례 관리 지침" >}}

`Case Management` 탭에서,

1. 사례 관리용 설정하려는 인스턴스를 선택합니다.
2. `Datadog Cases ITOM` 또는 `Datadog Cases ITSM` 중 사례를 보낼 테이블을 선택합니다.
   **참고**: 기본적으로 테이블이 선택되지 않습니다.
3. Datadog에서 [사례 관리][15]로 이동합니다.
4. ServiceNow 인시던트 만들기를 선택합니다.
5. 인스턴스와 선택적 할당 그룹을 고른 다음 만들기를 클릭합니다.

##### 사례 관리를 통해 양방향으로 상태 및 댓글 동기화

ServiceNow에서 편집한 내용을 Datadog 에서 관련 사례를 업데이트하려면 `x_datad_datadog.user` 및 `admin` 역할이 있는 ServiceNow 사용자가 ServiceNow에서 **Datadog 앱에 대한 ITOM/ITSM 통합**의 설치 구성을 설정해야 합니다:

1. 왼쪽 상단의 **모두**를 클릭하고 필터에 `ITOM/ITSM Integration for Datadog`를 입력한 다음 필터링된 목록에 표시되는 **설정** 링크를 클릭하여 **ITOM/ITSM 통합 for Datadog** 앱의 설정 구성 페이지로 이동합니다.
1. Datadog 데이터 센터 사이트를 선택합니다.
1. **조직 설정**에서 찾을 수 있는 Datadog API 키를 **API 키** 필드에 붙여넣습니다.
1. **조직 설정**에서 찾을 수 있는 Datadog 서비스 계정 신청 키를 **신청 키** 필드에 붙여넣습니다.
1. 활성화됨 확인란을 선택하고 설정 변경 사항을 저장합니다.

ServiceNow에서 설치 구성을 설정한 후 Datadog 사례 관리로 돌아가 [통합 설정][16]으로 이동합니다.

**참고**: 이 설정에서는 사용자의 애플리케이션 키가 아닌 서비스 계정 애플리케이션 키를 사용하는 것이 중요합니다. 사용자의 애플리케이션 키는 사용자의 계정 권한에 연결됩니다. 사용자의 권한이 줄어들거나 사용자가 비활성화되면 ServiceNow와 Datadog 간의 양방향 동기화가 중지됩니다. 서비스 계정 애플리케이션 키는 개별 사용자에게 연결되지 않으므로 양방향 동기화는 사용자 계정 변경의 영향을 받지 않습니다.

{{< img src="integrations/servicenow/datadog-sync-configuration.png" alt="ServiceNow 설정 구성으로 Datadog에서 ServiceNow 변경 사항을 동기화합니다." >}}

#### 인시던트 관리 설정

앱을 설치한 후 인시던트 앱의 [통합 설정][17]으로 이동하여 설정을 완료합니다.

#### 레거시 모니터 알림

Datadog에서 `@servicenow-<INSTANCE_NAME>`을 사용하는 레거시 모니터 알림의 경우, 중간 테이블을 선택하여 "레거시 모니터 알림 관리"라는 ITOM/ITSM 타일 하단에 있는 알림을 전송합니다.

1. 알림을 설정하려는 인스턴스를 선택한 다음 레거시 모니터 알림에 쓸 테이블을 선택합니다.
2. 통합이 올바르게 설정되었는지 확인하려면 모니터 또는 이벤트 알림에 `@servicenow-<INSTANCE_NAME>`을 추가합니다. 원시 데이터가 중간 테이블의 행에 채워지고 앱에서 지정한 ServiceNow 테이블로 전달됩니다.
3. ServiceNow에서 [변환 맵 사용](#customize-data-with-transform-maps)을 사용하여 중간 테이블로 전송되는 데이터의 변환을 커스터마이즈합니다.
4. 사용 가능한 Datadog 변수 또는 커스텀 문자열을 사용하여 알림 페이로드를 커스터마이즈합니다.

#### 변환 맵을 사용하여 모니터 알림에 대한 데이터 커스터마이즈

**서식화된 모니터 ITSM**, **레거시 모니터 ITSM** 및 **Datadog 사례 ITSM** 테이블은 변환 맵을 사용하여 Datadog 레코드를 ServiceNow 인시던트로 변환합니다.
마찬가지로 **Datadog 모니터 ITOM** 및 **Datadog 사례 ITOM** 테이블은 Datadog 레코드를 ServiceNow 이벤트로 변환합니다.

**템플릿 모니터 ITOM** 및 **템플릿 모니터 ITSM** 테이블은 변환 맵을 사용하여 Datadog 레코드를 각각 ServiceNow 이벤트 및 인시던트로 변환합니다. `New Template` UI에서 알림 페이로드를 커스터마이즈하여 이러한 테이블의 ServiceNow 이벤트 및 인시던트 정보를 사용자 지정하고 ServiceNow에서 변환 맵을 확장할 수 있습니다.

**참고**: Datadog 사례 ITOM** 및 **Datadog 사례 ITSM** 테이블은 변환 맵을 유사하게 사용하지만, Datadog 사례의 페이로드는 사용자 지정할 수 없으므로 사례 관리와 함께 사용하기 위해 변환 맵 커스터마이즈를 권장하지 않습니다.

## 트러블슈팅

ServiceNow 테이블에 이벤트가 표시되지 않고 대신 다음과 같은 메시지가 표시되는 경우

-   Datadog 통합 타일 또는 `Error while trying to post to your ServiceNow instance` 알림에 오류 메시지가 표시됩니다.

    -   인스턴스 이름을 입력할 때 하위 도메인만 사용되었는지 확인합니다.
    -   생성한 사용자에게 필요한 권한이 있는지 확인합니다.
    -   사용자 이름과 비밀번호가 올바른지 확인합니다.

-   통합이 설정되고 알림이 트리거되며 티켓이 만들어지지 않습니다.

    -   중간 테이블이 채워졌는지 확인합니다. 그렇다면 매핑 및 변환에 문제가 있는 것입니다. ServiceNow에서 **변환 오류**로 이동하여 매핑 및 스크립트를 추가로 디버깅할 수 있습니다.
    -   타일에서 지정한 임시 테이블로 작업하고 있는지 확인합니다.

    ServiceNow 사용자가 가져오기 테이블에 액세스할 수 있도록 `rest_service` 및 `x_datad_datadog.user` 역할이 필요합니다. 알림을 인시던트 테이블 또는 이벤트 테이블로 직접 보내는 레거시 방법을 사용하는 경우에는 `itil` 및 `evt_mgmt_integration` 권한이 필요합니다.

Datadog 사례 관리에서 ServiceNow로의 업데이트는 표시되지만 ServiceNow에서 Datadog로의 업데이트가 표시되지 않는 경우 이는 ServiceNow ITOM에 대해 예상되는 동작입니다. 사례 관리와의 양방향 동기화는 ServiceNow ITSM에서만 지원됩니다.

추가 지원이 필요하세요? [Datadog 지원][18]에 문의하세요.

## 지식 기반

### 서식화된 모니터 ITXM 테이블 필드 및 매핑 변환

`action`
: **유형**: 문자열<br>
모니터에서 수행 중인 작업: `create`, `update`, `acknowledge` 또는 `resolve`

`additional_information`
: **유형**: 문자열<br>
**ITOM 변환**: `additional_info`<br>
모든 이벤트 세부 정보를 포함하는 형식화된 문자열

`aggreg_key`
: **유형**: 문자열<br>
경고 모니터의 ID 해시를 나타내는 집계 키입니다.

`alert_cycle_key`
: **유형**: 문자열<br>
단일 모니터의 경고 주기(경고 → 주의 → 해결)의 해시를 나타내는 키입니다.

`alert_id`
: **유형**: 문자열<br>
경고 모니터링 ID

`alert_metric`
: **유형**: 문자열<br>
**ITOM 변환**: `metric_name`<br>
경고를 트리거한 메트릭

`alert_query`
: **유형**: 문자열<br>
쿼리 경고를 트리거한 문자열

`alert_scope`
: **유형**: 문자열<br>
범위 경고를 트리거한 문자열

`alert_status`
: **유형**: 문자열<br>
알림의 현재 상태

`alert_title`
: **유형**: 문자열<br>
알림 이름

`alert_transition`
: **유형**: 문자열<br>
**ITSM 변환**: (스크립트) -> 상태<br>
경고 전환 상태: `Triggered`, `Warn`, 또는 `Recovered`

`assignment_group_sys_id`
: **유형**: 참조<br>
**ITSM 변환**: `assignment_group`<br>
**참조 테이블**: Group<br>
서식화된 핸들의 할당 그룹에 대한 ServiceNow sys_id

`business_service_sys_id`
: **유형**: 참조<br>
**ITSM 변환**: `business_service`<br>
**참조 테이블**: 서비스<br>
서식화된 핸들의 비즈니스에 대한 ServiceNow sys_id 서비스

`custom_fields`
: **유형**: 문자열<br>
JSON 변환 가능한 문자열로 포맷된 사용자 설정 키-값 필드

`datadog_tags`
: **유형**: 문자열<br>
경고 모니터의 Datadog 태그

`description`
: **유형**: 문자열<br>
**ITSM 변환**: `description`<br>
**ITOM 변환**: `description`<br>
모니터 알림에 대한 요약 설명

`event_details`
: **유형**: 문자열<br>
**ITSM 변환**: `work_notes`<br>
이벤트 형식이 지정된 클릭 가능한 링크가 포함된 세부 정보 Datadog

`event_id`
: **유형**: 문자열<br>
Datadog ID 이벤트

`event_link`
: **유형**: 문자열<br>
모니터 알림에서 생성된 이벤트 링크

`event_msg`
: **유형**: 문자열<br>
이벤트 메시지

`event_title`
: **유형**: 문자열<br>
**ITSM 변환**: `short_description`<br>
이벤트 제목

`event_type`
: **유형**: 문자열<br>
**ITOM 변환**: `type`<br>
유형 이벤트

`hostname`
: **유형**: 문자열<br>
**ITSM 변환**: `cmdb_ci`<br>
**ITOM 변환**: `node`<br>
영향을 받은 모니터의 호스트

`impact`
: **유형**: 정수<br>
**ITSM 변환**: `impact`<br>
모니터 우선순위의 사용자 정의 매핑에 기반한 영향 값

`logs_sample`
: **유형**: 문자열<br>
관련 샘플 로그

`monitor_priority`
: **유형**: 정수<br>
**ITOM 변환**: `severity`<br>
경고 모니터링하다 의 우선순위를 정수로 변환합니다.

`org_name`
: **유형**: 문자열<br>
경고 모니터의 조직 이름

`sys_created_by`
: **유형**: 문자열<br>
**ITSM 변환**: `caller_id`<br>
레코드 작성자(일반적으로 구성된 ServiceNow API 계정)

`ticket_state`
: **유형**: 문자열<br>
**ITSM 변환**: (스크립트) -> 상태, (스크립트) -> 닫기_코드, (스크립트) -> 해결_노트<br>
**ITOM 변환**: (스크립트) -> resolution_notes<br>
ServiceNow 레코드의 상태: `new` 또는 `resolved`

`u_correlation_id`
: **유형**: 문자열<br>
**ITSM 변환**: `correlation_id`<br>
**ITOM 변환**: `message_key`<br>
동일한 대상 인시던트에 레코드를 통합하는 데 사용되는 alert_cycle_key와 aggreg_key를 결합한 값입니다.

`urgency`
: **유형**: 정수<br>
**ITSM 변환**: `urgency`<br>
모니터에 정의된 우선순위에 따라 통합 타일의 사용자 정의 매핑에서 설정된 긴급도입니다.

`user_sys_id`
: **유형**: 참조<br>
**ITSM 변환**: `assigned_to`<br>
**참조 테이블**: 사용자 <br>
사용자에 대해 전달된 템플릿 핸들의 sys_id.


### Datadog 가져오기 호스트 자동 플러시 규칙

가져오기 세트 테이블 `x_datad_datadog_import_host` 에 너무 많은 행이 누적되는 것을 방지하기 위해 최근 24시간의 데이터만 유지하도록 자동 플러시 규칙이 테이블 클리너 도구에 추가되었습니다. 이 설정을 구성하려면 필터 탐색기에서 `sys_auto_flush_list.do`로 이동하여 `x_datad_datadog_import_host` 테이블에 대한 규칙으로 이동하여 필요에 따라 변경할 수 있습니다. `Age in seconds` 필드는 그에 따라 업데이트할 수 있습니다.

{{< img src="integrations/servicenow/servicenow-cmdb-autoflush-rule.png" alt="통합 설정 구성" >}}

### Datadog 알림에서 지원 티켓 자동 생성하기

ServiceNow가 Datadog 계정에 연결되면 수신된 알림이 자동으로 지원 티켓을 만들어 ServiceNow 티켓팅 대기열로 보낼 수 있습니다. 거기서부터 지원팀은 ServiceNow 내에서 이미 설정한 커뮤니케이션 워크플로우를 사용하여 문제를 통보받게 됩니다. 알림 메시지에 `@servicenow`를 언급하거나 알림 목록에 `@servicenow`를 추가합니다. 

{{< img src="integrations/servicenow/servicenow-02-monitor-page.png" alt="ServiceNow" >}}

### 중복 인시던트 모니터링

모니터에서 동일한 인시던트가 다시 열리지 않도록 하려면, 각 경고에 대해 새 경고를 만드는 대신, 모니터가 단순 알림으로 설정되어 있지 않은지 확인하세요. 메트릭에서 태그를 사용하여 그룹화하여 모니터를 [다중 알림][19]으로 변환합니다. 이렇게 하면 각 알림이 별도의 인시던트를 트리거하게 됩니다.

### 티켓 페이로드 및 필드 매핑에 변수 사용하기

변수를 알림 본문이나 필드 매핑에 사용하여 이벤트의 세부 정보가 ServiceNow에 포함되도록 할 수 있습니다. 예를 들어 제목과 심각도를 적절한 ServiceNow 필드에 포함하거나 ServiceNow 티켓에서 바로 Datadog에 특정 인시던트로 돌아가는 링크를 포함할 수 있습니다.

{{< img src="integrations/servicenow/servicenow-variables-form.png" alt="ServiceNow 변수 입력 양식" >}}

{{< img src="integrations/servicenow/servicenow-variables.png" alt="ServiceNow 변수" >}}

### 인시던트 우선순위 필드 매핑

ServiceNow 인시던트의 `priority` 필드는 _읽기 전용_이며 [우선 순위 조회 규칙][20]을 통해서만 업데이트할 수 있습니다.

모니터에 `Impact` 및 `Urgency`를 정의하여 ServiceNow 인시던트 우선 순위를 계산합니다.

{{< img src="integrations/servicenow/servicenow-priority-field-mapping.png" alt="ServiceNow 우선순위 필드 매핑" >}}

### 지원 해결 워크플로 자동화

모니터 상태가 정상으로 돌아오면 관련 지원 티켓이 자동으로 "종결됨"으로 표시됩니다.

{{< img src="integrations/servicenow/servicenow-03-servicenow-resolved.png" alt="ServiceNow 종결됨" >}}

### 커스텀 매핑 정의

테이블 중 하나를 클릭하고(예: **Datadog ITSM 테이블 모니터링**) 레코드 하단으로 스크롤하여 연결된 변환 맵의 링크를 확인합니다.

### 매핑 이해

변환 맵의 이름을 클릭하면 레코드를 볼 수 있습니다.

{{< img src="integrations/servicenow/servicenow-click-transform-map.png" alt="ServiceNow 통합" >}}

상단에는 변환 레코드의 두 가지 중요한 필드인 `Source table` 및 `Target table`이 있습니다.

{{< img src="integrations/servicenow/servicenow-source-target-fields.png" alt="ServiceNow 통합" >}}

**참고**:

-   소스는 선택한 가져오기 집합 테이블(Datadog ITSM 테이블 모니터링)이고 대상은 이벤트가 저장되어 있는 실제 인시던트 테이블(또는 이벤트 테이블)입니다.
-   필드 매핑은 레코드 하단에 있습니다. 몇 가지 기본 매핑이 포함되어 있습니다. 여기에서 포함할 필드를 선택하고, 형식을 정의하고, ServiceNow 인스턴스에서 대상 필드를 선택합니다.

### 새 필드 매핑 추가

**새로 만들기**를 클릭합니다.

{{< img src="integrations/servicenow/servicenow-click-new.png" alt="SeviceNow 통합" >}}

일대일 매핑을 위해 소스 필드와 대상 필드를 선택합니다.

{{< img src="integrations/servicenow/servicenow-select-source-target.png" alt="ServiceNow 통합" >}}

또는 **소스 스크립트 사용** 상자를 점검하고 변환을 정의합니다.

{{< img src="integrations/servicenow/servicenow-script-example.png" alt="ServiceNow 통합" >}}

**참고: 통합 타일의 커스텀 필드를 매핑하려면 Datadog 모니터 ITOM 및 Datadog 모니터 ITSM 변환 맵에 대해 다음 매핑 스크립트를 사용할 수 있습니다. 이 예제에서는 `my_field` 필드가 통합 타일에서 커스텀 필드로 정의되었습니다.

```
answer = (function transformEntry(source)
{
    var additional_info = JSON.parse(source.additional_info);
    return additional_info.custom_my_field;
})(source);
```

### 여러 매핑 정의

**매핑 지원**(관련 링크 아래)을 사용하여 여러 소스 필드와 대상 필드를 매핑할 수 있습니다.

{{< img src="integrations/servicenow/servicenow-mapping-assist.png" alt="ServiceNow 통합" >}}

### 검증

통합이 올바르게 설정되었는지 확인하려면 모니터 또는 이벤트 알림에 `@servicenow`를 추가합니다. 원시 데이터는 중간 테이블의 행을 채운 뒤, 생성한 매핑 및 변환에 지정된 ServiceNow 테이블로 전달됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.servicenow.com/community/now-platform-articles/servicenow-versions-release/ta-p/2312014
[2]: https://app.datadoghq.com/integrations/servicenow
[3]: https://store.servicenow.com/sn_appstore_store.do#!/store/application/c877cb86687e0050f8774bfad236c950/1.2.1
[4]: https://store.servicenow.com/
[5]: https://docs.servicenow.com/bundle/xanadu-servicenow-platform/page/product/configuration-management/concept/cmdb-query-builder-landing-page.html
[6]: https://app.datadoghq.com/event/explorer
[7]: https://docs.datadoghq.com/ko/tracing/service_catalog/
[8]: https://docs.datadoghq.com/ko/tracing/service_catalog/adding_metadata/
[9]: https://docs.datadoghq.com/ko/network_monitoring/devices/
[10]: https://docs.datadoghq.com/ko/network_monitoring/devices/snmp_metrics/
[11]: https://app.datadoghq.com/reference-tables
[12]: https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/configuration-management/task/use-cmdb-query-builder.html
[13]: https://app.datadoghq.com/event/pipelines
[14]: https://docs.datadoghq.com/resources/xml/Datadog-Snow_Update_Set_v2.6.1.xml
[15]: https://app.datadoghq.com/cases
[16]: https://docs.datadoghq.com/ko/service_management/case_management/settings#servicenow
[17]: https://app.datadoghq.com/incidents/settings#Integrations
[18]: https://docs.datadoghq.com/ko/help/
[19]: https://docs.datadoghq.com/ko/monitors/configuration/?tab=thresholdalert#multi-alert
[20]: https://docs.servicenow.com/en-US/bundle/sandiego-it-service-management/page/product/incident-management/task/def-prio-lookup-rules.html