---
aliases:
- /ko/bits_ai/bits_ai_sre/configure/
title: Integrations 및 설정 구성
---
Bits Investigation의 기능을 확장하려면 통합을 설정하세요.
- [타사 관측성 및 SCM 플랫폼과 통합](#integrate-with-third-party-observability-and-scm-platforms)하여 외부 텔레메트리 및 코드 컨텍스트로 조사를 보강합니다.
- [조사 결과를 ITSM 및 협업 플랫폼으로 전송](#send-investigation-findings-to-itsm-and-collaboration-platforms)하여 인시던트 대응을 간소화합니다.
- [지식 베이스에서 컨텍스트를 가져와](#pull-context-from-knowledge-bases) 조사에 런북 및 문서를 통합합니다.

## 타사 관측성 및 SCM 플랫폼과 통합 {#integrate-with-third-party-observability-and-scm-platforms}

Bits Investigation은 GitHub, Grafana, Dynatrace, Splunk, Sentry 및 ServiceNow와 통합하여 관측성 데이터와 소스 코드를 조사에 통합합니다. Bits Investigation에서 코드로 해결할 수 있는 문제를 식별한 경우 Bits Code가 코드 수정을 생성하려면 소스 코드에 대한 액세스 권한도 필요합니다.

### GitHub {#github}
GitHub를 구성하려면 다음 단계를 따르세요.
1. [GitHub integration][13]을 설치합니다.
1. [APM 텔레메트리에 Git 정보를 태그][14]하여 실행 중인 애플리케이션 버전을 특정 리포지토리 및 커밋에 연결합니다.

## 조사 결과를 ITSM 및 협업 플랫폼으로 전송 {#send-investigation-findings-to-itsm-and-collaboration-platforms}

기본적으로 모든 조사는 [Bits Investigations][1] 페이지에 나열됩니다.

모니터 경보 조사에서는 조사 결과 요약을 모니터 상태 페이지에서 확인할 수 있습니다. 모니터에 이미 `@slack`, `@case` 또는 `@oncall` [알림][2]이 구성되어 있는 경우, Bits가 자동으로 해당 대상에 조사 결과를 게시합니다. 그렇지 않은 경우, 아래 지침에 따라 해당 통합을 설정할 수 있습니다.


### Slack {#slack}

1. Slack 워크스페이스에 [Datadog Slack 앱][3]이 설치되어 있는지 확인합니다.
1. 모니터에서 {{< ui >}}Configure notifications and automations{{< /ui >}}로 이동하여 `@slack-{channel-name}` 핸들을 추가합니다. 이렇게 설정하면 선택한 Slack 채널로 모니터 알림이 전송됩니다.
1. 마지막으로 [{{< ui >}}Bits Investigation{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][4]로 이동하여 Slack 워크스페이스를 연결합니다. 이렇게 설정하면 Bits가 Slack의 모니터 알림 바로 아래에 조사 결과를 작성할 수 있습니다.

<div class="alert alert-info">각 Slack 워크스페이스는 하나의 Datadog 조직에만 연결할 수 있습니다.</div>

### Microsoft Teams (미리 보기) {#microsoft-teams-preview}

1. [Microsoft 테넌트를 Datadog에 연결][12]
1. 모니터에서 {{< ui >}}Configure notifications and automations{{< /ui >}}로 이동하여 `@teams-{handle-name}` 핸들을 추가합니다. 이렇게 설정하면 선택한 MS Teams 채널로 모니터 알림이 전송됩니다. Bits가 알림에 조사 결과를 추가합니다.

<div class="alert alert-info">
Microsoft Teams와 Bits Investigation의 통합 기능은 모든 고객에게 미리 보기로 제공됩니다.</div>

### Datadog Work Management {#datadog-work-management}

Datadog Work Management는 Datadog 및 타사 통합에서 감지된 문제를 분류, 추적 및 해결하기 위한 중앙 집중식 작업 공간을 제공합니다. Bits Investigation은 Work Management를 통해 조사 결과를 Jira 및 ServiceNow에 자동으로 전송합니다.

Work Management와 Jira 및 ServiceNow 통합을 설정하려면 다음 단계를 따르세요.
1. 팀을 위한 [Work Management 프로젝트][5]를 생성합니다.
1. Datadog에서 [{{< ui >}}Work Management{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][6]로 이동합니다. 프로젝트 목록에서 해당 프로젝트를 확장한 후, {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog Monitors{{< /ui >}}로 이동하여 {{< ui >}}Enable Datadog Monitors integration for this project{{< /ui >}} 토글을 켭니다. 이렇게 설정하면 프로젝트의 고유 핸들: `@case-{project_name}`이 생성됩니다.
1. 같은 페이지의 {{< ui >}}Integrations{{< /ui >}}에서 Work Management의 Jira 또는 ServiceNow 통합을 설정합니다. 새 작업 항목이 생성되면 Work Management에서 해당 Jira 티켓 또는 ServiceNow 인시던트를 자동으로 열 수 있습니다.
1. 모니터에서 {{< ui >}}Configure notifications and automations{{< /ui >}}로 이동하여 `@case-{project_name}` 핸들을 추가합니다. 모니터가 트리거되면 다음을 수행합니다.
   - Datadog에서 새 작업 항목을 자동으로 생성합니다.
   - 작업 항목에서 연결된 Jira 티켓 또는 ServiceNow 인시던트를 생성합니다.
   - Bits는 조사 결과를 작업 항목에 직접 기록하며, 이는 Jira의 타임라인 댓글이나 ServiceNow의 작업 메모로 추가됩니다.

### Datadog On-Call {#datadog-on-call}

Datadog On-Call은 모니터링, 페이징, 인시던트 대응을 단일 플랫폼으로 통합하는 페이징 솔루션입니다.

On-Call을 설정하려면 모니터에서 {{< ui >}}Configure notifications and automations{{< /ui >}}로 이동하여 `@oncall-{team}` 핸들을 추가합니다. Bits의 조사 결과는 Datadog 모바일 앱의 On-Call 페이지에 표시되어 팀이 이동 중에도 문제를 분류할 수 있도록 돕습니다.

## 지식 베이스에서 컨텍스트 가져오기 {#pull-context-from-knowledge-bases}

### Confluence {#confluence}
Bits Investigation은 Confluence와 통합하여 다음을 수행합니다.
- 모니터 경보 조사를 지원하는 관련 문서 및 런북을 찾습니다.
- 채팅을 통해 Confluence 콘텐츠와 직접 상호작용할 수 있습니다.

Bits Investigation에서 Confluence를 사용하도록 설정하려면 다음 단계를 따르세요.

1. [Confluence 통합 타일][7]의 지침에 따라 Confluence Cloud 계정을 연결합니다.
1. 필요에 따라 계정 크롤링을 활성화하여 Confluence를 Bits의 채팅 인터페이스에서 데이터 소스로 사용할 수 있습니다. 계정 크롤링을 활성화하지 않아도 Bits는 조사 계획을 수립하는 데 Confluence를 사용할 수 있습니다.
1. 모니터 메시지에 Confluence 페이지 링크를 추가합니다. Bits는 페이지를 읽어 Datadog 텔레메트리 링크 및 기타 컨텍스트를 추출하여 조사 계획을 수립합니다.
1. [Bits 설정 페이지][4]에서 연결된 모든 Confluence 계정을 확인할 수 있습니다.

## 권한 구성 {#configure-permissions}

Bits Investigation에 적용되는 두 가지 RBAC 권한이 있습니다.

| 이름                                                    | 설명                            | 기본 역할           |
|:--------------------------------------------------------|:---------------------------------------|:-----------------------|
| Bits Investigations Read (`bits_investigations_read`)   | Bits Investigations를 읽습니다.              | Datadog Read Only 역할 |
| Bits Investigations Write (`bits_investigations_write`) | Bits Investigations를 실행하고 구성합니다. | Datadog Standard 역할  |

이러한 권한은 관리형 역할에 기본적으로 추가됩니다. 조직에서 사용자 지정 역할을 사용하거나 이전에 기본 역할을 수정한 경우, User Access Manage 권한이 있는 관리자가 적절한 역할에 해당 권한을 수동으로 추가해야 합니다. 자세한 내용은 [Access Control][8]을 참조하세요.

### Bits Investigation 비활성화 {#disable-bits-investigation}

조직에서 Bits Investigation의 사용을 제한하려면 User Access Manage 권한이 있는 관리자가 모든 역할에서 `bits_investigations_read` 및 `bits_investigations_write` 권한을 제거해야 합니다. 자세한 내용은 [Access Control][8]을 참조하세요.

또는 관리자가 [Plan & Usage > AI Credits][16]에서 조직 전체에 적용되는 토글을 사용하여 AI 크레딧을 통해 청구되는 모든 AI 제품을 비활성화할 수 있습니다. 자세한 내용은 [AI 크레딧 관리자 제어][17]를 참조하세요.

## 실행 제한 구성 {#configure-rate-limits}

실행 제한은 24시간 동안 Bits가 자동으로 실행할 수 있는 최대 조사 횟수를 정의합니다. 실행 제한에 도달한 후에도 [수동 조사][9]를 계속 트리거할 수 있습니다.

### 실행 제한 유형 {#types-of-rate-limits}

모니터당 제한
: 24시간 동안 단일 모니터에서 조사가 자동으로 트리거되는 횟수를 제어합니다.
: **기본값:** 각 모니터는 24시간마다 자동 조사를 한 번 트리거할 수 있습니다.

조직 제한
: Bits가 24시간 동안 전체 조직에서 실행할 수 있는 자동 조사의 총 횟수를 정의합니다.
: **기본값:** 제한 없음

### 실행 제한 설정 {#set-a-rate-limit}

실행 제한을 설정하려면 다음 단계를 따르세요.
1. [{{< ui >}}Bits Investigation{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Rate Limits{{< /ui >}}][10]로 이동합니다.
2. 활성화하려는 실행 제한을 켭니다.
3. 24시간 동안 실행할 최대 조사 횟수를 설정합니다.
4. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

{{< img src="bits_ai/rate_limits.png" alt="실행 제한 설정 옵션" style="width:60%;" >}}

## Audit Trail {#audit-trail}

[Audit Trail][11]을 사용하여 사용자가 시작한 작업을 모니터링할 수 있습니다. 다음과 같은 경우 이벤트가 전송됩니다.
- 사용자가 수동으로 조사를 시작하거나 조사가 완료된 경우
- 수동 조사에서 도구 호출이 실행된 경우
- 사용자가 모니터의 자동 조사를 활성화하거나 비활성화한 경우
- 사용자가 모니터의 실행 제한을 수정한 경우

## 작업 {#actions}

Bits Investigation은 세 가지 [작업][15]을 제공합니다.
- 조사 실행
- 조사 조회
- 조사 목록

이러한 작업을 사용하여 필요에 맞는 워크플로, 에이전트 및 앱을 구축할 수 있습니다.

## API {#api}

[API 를 통해][18] 프로그래밍 방식으로 조사를 실행하고 조회할 수 있습니다.

[1]: https://app.datadoghq.com/bits-ai/investigations
[2]: /ko/monitors/notify
[3]: https://docs.datadoghq.com/ko/integrations/slack/?tab=datadogforslack
[4]: https://app.datadoghq.com/bits-ai/settings/integrations
[5]: /ko/incident_response/work_management/projects
[6]: https://app.datadoghq.com/work/settings
[7]: https://app.datadoghq.com/integrations/confluence
[8]: /ko/account_management/rbac
[9]: /ko/bits_ai/bits_investigation/investigate_issues#manually-start-an-investigation
[10]: https://app.datadoghq.com/bits-ai/settings/rate-limits
[11]: /ko/account_management/audit_trail/events/#bits-ai-sre
[12]: /ko/integrations/microsoft-teams/?tab=datadogapprecommended
[13]: /ko/integrations/github/
[14]: /ko/source_code/service-mapping
[15]: /ko/actions/workflows/actions/
[16]: https://app.datadoghq.com/billing/bill-overview?detail_bd=ai_credits
[17]: /ko/account_management/billing/ai_credits/#admin-controls
[18]: /ko/api/latest/bits-ai/