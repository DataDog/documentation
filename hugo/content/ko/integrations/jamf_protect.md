---
app_id: jamf-protect
app_uuid: a863cfe8-5ba4-45ae-923c-d273510f099c
assets:
  dashboards:
    jamf-protect-overview: assets/dashboards/jamf_protect_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10433
    source_type_name: jamf_logs
author:
  homepage: https://www.jamf.com/products/jamf-protect/
  name: Jamf Protect
  sales_email: support@jamf.com
  support_email: support@jamf.com
categories:
- security
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/jamf_protect/README.md
display_on_public_website: true
draft: false
git_integration_title: jamf_protect
integration_id: jamf-protect
integration_title: Jamf Protect
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: jamf_protect
public_title: Jamf Protect
short_description: Mac 및 모바일 기기를 위한 엔드포인트 보안 및 모바일 위협 방어(MTD)
supported_os:
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Security
  - 제공::통합
  configuration: README.md#Setup
  description: Mac 및 모바일 기기를 위한 엔드포인트 보안 및 모바일 위협 방어(MTD)
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Jamf Protect
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요
[Jamf Protect][1]는 macOS, iOS, iPadOS 엔드포인트 및 기타 지원 플랫폼을 포함한 Apple 엔드포인트용으로 특별히 설계된 포괄적인 보안 솔루션입니다. Jamf Protect는 Apple의 내장 보안 기능을 강화하고 악성 애플리케이션, 스크립트 및 사용자 활동을 실시간으로 탐지합니다.

Jamf Protect는 알려진 맬웨어와 애드웨어를 탐지할 뿐만 아니라 알려지지 않은 위협을 방지하고 명령 및 제어 트래픽과 위험한 도메인을 차단합니다. 또한, 엔드포인트 활동에 대한 세부적인 인사이트를 제공하여 엔드포인트 상태 및 컴플라이언스를 보장하고 자동화된 워크플로를 통해 인시던트 대응을 지원합니다. 이 통합은 Jamf Protect 이벤트에서 로그를 수집하며, Datadog을 사용하여 분석할 수 있습니다. 이 통합은 macOS Security와 Jamf Security Cloud 모두의 Jamf Protect 로그를 모니터링합니다.

## 설정

### 사전 필수 조건

- Datadog 수신 URL. [Datadog API Logs 문서][2]를 확인하고, 페이지 상단에서 Datadog Site를 선택하세요.
- [Datadog API 및 App 키][3].

### 설치

[Integrations 페이지][4]로 이동하여 "Jamf Protect" 타일을 검색합니다.

### macOS Security Portal
1. Jamf Protect에서 **Actions**를 클릭합니다.
2.  **Create Actions**를 클릭합니다.
3.  *Action Config Name* 필드에 이름(예: `Datadog`)을 입력합니다.
4.  (선택 사항) 알림을 수집하려면 **Remote Alert Collection Endpoints**를 클릭하고 다음을 추가합니다.

    a. **URL:** `https://${DATADOG_INTAKE_URL}/api/v2/logs?ddsource=jamfprotect&service=alerts`

    b. **Min Severity & Max Severity**를 설정합니다.

    c. **+ Add HTTP Header** 를 두번 클릭하고 다음 HTML 헤더 필드를 추가합니다.
      ```
      Name: DD-API-KEY
      Value: <API_Key>
      ```
      ```
      Name: DD-APPLICATION-KEY
      Value: <APPLICATION_KEY>
      ```

5. (선택 사항) 통합 로그를 수집하려면 **+ Unified Logs Collection Endpoints**를 클릭하고 다음을 추가합니다.

    a. **URL:** `https://${DATADOG_INTAKE_URL}/api/v2/logs?ddsource=jamfprotect&service=unifiedlogs`

    b. **+ Add HTTP Header**를 두 번 클릭하고 다음 HTML 헤더 필드를 추가합니다.
      ```
      Name: DD-API-KEY
      Value: <API_Key>
      ```
      ```
      Name: DD-APPLICATION-KEY
      Value: <APPLICATION_KEY>
      ```

6. (선택 사항) 텔레메트리 데이터를 수집하려면 **+ Telemetry Collection Endpoints**를 클릭합니다.

    a.  **URL:** `https://${DATADOG_INTAKE_URL}/api/v2/logs?ddsource=jamfprotect&service=telemetry`

    b. **+ Add HTTP Header**를 두 번 클릭하고 다음 HTML 헤더 필드를 추가합니다.
      ```
      Name: DD-API-KEY
      Value: <API_Key>
      ```
      ```
      Name: DD-APPLICATION-KEY
      Value: <APPLICATION_KEY>
      ```

7. **Save**을 클릭합니다.

### 구성된 Actions를 사용하도록 플랜 업데이트

1. **Plans**를 클릭합니다.
1. 기기에 할당된 플랜을 찾습니다. 
1. 플랜 이름 옆에 있는 **Edit**을 클릭합니다.
1. *Action Configuration* 드롭다운 메뉴에서 Action을 선택합니다. 이는 Datadog 구성을 포함하는 Action 구성 이름입니다.
1. **Save**을 클릭합니다.

### (선택 사항) Jamf Security Cloud

1.  hreat Events Stream에서 **Integrations**를 클릭합니다.
2.  **Data Streams**를 클릭합니다.
3.  **New Configuration**을 클릭합니다.
4.  **Threat Events**를 선택합니다.
5.  **Generic HTTP**를 선택합니다.
6.  **Continue**를 클릭합니다.
    | **구성**        | **세부 내용**                         |
    |--------------------------|-------------------------------------|
    | **Name**                 | Datadog (Threat)                    |
    | **Protocol**             | HTTPS                               |
    | **Server Hostname/IP**   | `${DATADOG_INTAKE_URL}`             |
    | **Port**                 | 443                                 |
    | **Endpoint**             | `api/v2/logs?ddsource=jamfprotect&` |

7.  **Create option "DD-API-KEY"**를 클릭합니다.
    ```
    Header Value: <API_Key>
    Header Name: DD-APPLICATION-KEY
    ```
8.  **Create option "DD-APPLICATION-KEY"**를 클릭합니다.
    ```
    Header Value: <APPLICATION_KEY>
    ```
9.  **Test Configuration**을 클릭합니다.

10.  성공적으로 완료되면 **Create Configuration**을 클릭합니다.

### (선택 사항) Network Traffic Stream

1.  **Integrations**를 클릭합니다.
2.  **Data Streams**를 클릭합니다.
3.  **New Configuration**을 클릭합니다.
4.  **Threat Events**를 선택합니다.

5. **Generic HTTP**를 선택합니다.

6.  **Continue**를 클릭합니다.
    a.  **Configuration Name:** Datadog (Threat)

    b.  **Protocol:** **HTTPS**

    c.  **Server** **Hostname/IP:** `${DATADOG_INTAKE_URL}`

    d.  **Port:** **443**

    e.  **Endpoint:** `api/v2/logs?ddsource=jamfprotect&service=networktraffic`

    f. **Additional Headers:**

        i.  **Header Name:** DD-API-KEY

        1.  Click **Create option "DD-API-KEY"**.

        ii.  **Header Value:** <API_Key>

           i. Header Name: DD-APPLICATION-KEY

        iv.  Click **Create option "DD-APPLICATION-KEY"**.

           i. Header Value: <APPLICATION_KEY>

7.  **Test Configuration**을 클릭합니다.
8.  성공적으로 완료되면 **Create Configuration**을 클릭합니다.

### 검증

[Logs Explorer][5]로 이동한 후 `source:jamfprotect`를 검색하여 로그를 수신하고 있는지 확인합니다.

## 수집한 데이터

### 로그

Jamf Protect 통합을 사용하면 [Jamf Audit Logs][6]를 Datadog으로 보낼 수 있습니다.

### 메트릭

Jamf Protect는 메트릭을 포함하지 않습니다.

### 서비스 점검

Jamf Protect는 서비스 점검을 포함하지 않습니다.

### 이벤트

Jamf Protect는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

[Jamf 설명서: Datadog과 Jamf Protect 통합하기][8]

[1]: https://www.jamf.com/products/jamf-protect/
[2]: https://docs.datadoghq.com/ko/api/latest/logs/#send-logs
[3]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[4]: https://app.datadoghq.com/integrations
[5]: https://app.datadoghq.com/logs
[6]: https://learn.jamf.com/bundle/jamf-protect-documentation/page/Audit_Logs.html
[7]: https://docs.datadoghq.com/ko/help/
[8]: https://learn.jamf.com/en-US/bundle/jamf-protect-documentation/page/SecurityIntegration_Datadog.html