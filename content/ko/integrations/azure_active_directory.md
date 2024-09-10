---
app_id: azure-active-directory
app_uuid: 8c4717a8-93f0-4de6-b79b-1e7f52c94895
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10106
    source_type_name: Azure Active Directory
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- cloud
- 로그 수집
- 보안
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/azure_active_directory/README.md
display_on_public_website: true
draft: false
git_integration_title: azure_active_directory
integration_id: azure-active-directory
integration_title: Azure Active Directory
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_active_directory
public_title: Azure Active Directory
short_description: Azure Active Directory 활동 로그 분석
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Cloud
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Azure Active Directory 활동 로그 분석
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Active Directory
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Azure Active Directory는 Microsoft Azure에서 제공하는 클라우드 호스팅 Active Directory입니다.
이 통합을 통해 [Azure AD 활동 로그][1](감사 및 로그인 로그)를 Datadog에 주입할 수 있습니다.

## 설정

### 설치

이 통합은 Event Hub와 함께 Azure를 사용하여 Datadog에 로그를 전달합니다. 활동 로그를 이벤트 허브에 전달하도록 Azure AD를 구성합니다.

### 구성

1. [Datadog에 Azure 로그 보내기][2] 가이드에 따라 Event Hub를 사용하여 Azure에서 Datadog으로 로그 전달 파이프라인을 설정합니다.

2. Azure 포털에서 _Azure Active Directory > Monitoring > Audit logs_를 선택합니다.

3. **Export Settings**를 선택합니다.

4. Diagnostics 설정 창에서 다음 중 하나를 수행합니다.

   - 기존 설정을 변경하기 위해 **Edit setting**을 선택합니다.
   - 새로운 설정을 추가하기 위해 **Add diagnostics setting**을 선택합니다. 최대 3개까지 설정할 수 있습니다.

5. **Stream to an event hub** 체크 박스를 선택하고 **Event Hub/Configure**를 선택합니다.

6. 로그를 라우팅하기 위해 이전에 만든 Azure 구독 및 Event Hub 네임스페이스를 선택합니다.

7. OK를 선택하여 이벤트 허브 구성을 종료합니다.

8. 다음 중 하나 또는 둘 다를 수행합니다. Datadog에서는 두 가지를 모두 선택할 것을 권장합니다.

   - 감사 로그를 보내려면 **AuditLogs** 체크 박스를 선택합니다.
   - 로그인 로그를 보내려면 **SignInLogs** 체크 박스를 선택합니다.

9. **Save**를 선택합니다.

로그는 15분 이내에 Datadog으로 들어오기 시작해야 합니다.
설정에 대한 자세한 내용은 [Azure 튜토리얼][3]을 참조하세요.

## 수집한 데이터

#### 로그 수집

이 통합을 통해 Azure Active Directory 활동 로그에 대한 로그 수집을 설정할 수 있습니다.

여기에는 다음이 포함됩니다.

   - 로그인 - 관리되는 애플리케이션 사용 및 사용자 로그인 활동에 대한 정보를 제공

   - 감사 로그 - Azure AD 내의 다양한 기능으로 변경된 사항에 대해 로그를 통해 추적할 수 있도록 함

### 메트릭

Azure Active Directory에는 메트릭이 포함되지 않습니다.

### 이벤트

Datadog은 Azure 앱 등록, Key Vault 키, Key Vault 암호 및 Key Vault 인증서의 크리덴셜 만료를 가시적으로 확인할 수 있도록 크리덴셜 만료 이벤트를 보냅니다. Azure 앱 등록을 위한 이벤트를 수신하려면 Azure Active Directory 통합을 설치해야 합니다. Azure에서 이벤트를 수신하려면 [Azure 통합][4]도 설치해야 합니다.


- **만료 이벤트**는 크리덴셜 만료일 60일, 30일, 15일, 1일 전에 전송되며, 만료 후에는 한 번만 전송됩니다.
- **권한 누락 이벤트**는 15일마다 전송됩니다. 권한이 누락된 이벤트에는 Datadog이 권한을 갖고 있지 않은 Key Vault 목록이 포함되어 있습니다. 최근 15일 주기 동안 Key Vault 권한에 변경 사항이 없을 경우 이벤트 알림이 다시 전송됩니다.

[Event Explorer][5]에서 이러한 이벤트를 볼 수 있습니다.

**참고**: 

- Azure 앱 등록 만료 이벤트를 수집하려면 [Microsoft Graph API에 대한 액세스를 활성화][6]하세요.
- 인증서와 연결된 키 및 비밀이 같은 날에 모두 만료되는 경우에는 모든 리소스에 대해 하나의 만료 이벤트가 전송됩니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/overview-reports#activity-reports
[2]: https://docs.datadoghq.com/ko/logs/guide/azure-logging-guide/
[3]: https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/tutorial-azure-monitor-stream-logs-to-event-hub
[4]: https://docs.datadoghq.com/ko/integrations/azure/
[5]: https://app.datadoghq.com/event/explorer
[6]: https://docs.datadoghq.com/ko/integrations/guide/azure-graph-api-permissions/
[7]: https://docs.datadoghq.com/ko/help