---
aliases:
- /ko/service_management/on-call/
cascade:
  algolia:
    rank: 70
further_reading:
- link: https://www.datadoghq.com/blog/designing-on-call-sounds
  tag: 블로그
  text: 온콜 엔지니어를 위한 공감형 경보음을 설계한 방법
- link: https://www.datadoghq.com/blog/datadog-on-call/
  tag: 블로그
  text: Datadog On-Call로 온콜 경험 강화
- link: https://www.datadoghq.com/blog/on-call-paging/
  tag: 블로그
  text: 효과적인 페이지 전략을 수립하는 방법
- link: https://www.datadoghq.com/blog/incidents-ai-workbench-status-page/
  tag: 블로그
  text: Datadog Incident Response로 복구 및 커뮤니케이션 통합
title: On-Call
---
Datadog On-Call은 모니터링, 페이징, 인시던트 대응을 하나의 플랫폼에 통합합니다.

{{< img src="service_management/oncall/oncall_overview.png" alt="페이지 라우팅 개요 모니터링, 인시던트, 보안 시그널 또는 API 호출로부터 페이지 팀(예: 'payments-team')에 전송된 후, 라우팅 규칙(예: 우선 순위에 따라)을 거쳐 에스컬레이션 정책으로 전달됩니다. 이후 일정으로 전송되거나 사용자에게 직접 전송될 수 있습니다." style="width:100%;" >}}

## 개념 {#concepts}

- **페이지**는 모니터링, 인시던트 또는 보안 시그널과 같이 경보를 받아야 할 대상을 나타냅니다. 페이지 상태는 `Triggered`, `Acknowledged`, `Resolved` 중 하나일 수 있습니다.
- **팀**은 전문성과 운영 역할에 따라 특정 유형의 페이지를 처리하도록 Datadog 내에서 구성된 그룹입니다.
- **라우팅 규칙**을 통해 팀은 특정 유형의 수신 이벤트에 대한 반응을 세밀하게 조정할 수 있습니다. 이 규칙은 페이지의 긴급 수준을 설정하고, 이벤트의 메타데이터에 따라 페이지를 다른 에스컬레이션 정책으로 라우팅하며, 정의된 시간대에만 에스컬레이션 알림을 전송하기 위해 [지원 시간][7]을 구성할 수 있습니다.
- **에스컬레이션 정책**은 페이지가 팀 내 또는 여러 팀 간에 어떻게 에스컬레이션되는지를 결정합니다.
- **일정**은 특정 팀 구성원이 페이지에 응답하기 위해 대기 상태인 시간을 정의합니다.

## 작동 방식 {#how-it-works}

**팀**은 Datadog On-Call의 중앙 조직 단위입니다. Datadog에서 알림이 발생하면 **페이지**가 지정된 온콜 팀으로 전달됩니다.

{{< img src="service_management/oncall/notification_page.png" alt="On-Call 팀이 언급된 알림입니다." style="width:80%;" >}}

각 팀은 **에스컬레이션 정책**과 **일정**을 소유합니다. 에스컬레이션 정책은 페이지를 여러 일정으로 전달하는 방식을 정의합니다. 예를 들어 _Checkout Operations - Interrupt Handler_, _Primary_, 및 _Secondary_와 같은 일정입니다. 또한 각 팀은 **라우팅 규칙**을 구성하여 페이지를 다른 에스컬레이션 정책으로 전달할 수 있습니다.

{{< img src="service_management/oncall/escalation_policy.png" alt="샘플 에스컬레이션 정책입니다." style="width:80%;" >}}

일정은 팀 구성원이 페이지에 응답하도록 지정된 특정 시간을 정의합니다. 일정은 여러 시간대와 근무조를 기준으로 팀 구성원의 가용성을 조직하고 관리합니다.

{{< img src="service_management/oncall/schedule.png" alt="일본, 유럽 및 미국 업무 시간을 위한 여러 계층이 포함된 샘플 일정입니다." style="width:80%;" >}}

## 세분화된 액세스 제어 {#granular-access-control}

[세분화된 액세스 제어][3]를 사용하여 On-Call 리소스에 접근할 수 있는 [역할][4], 팀 또는 사용자를 제한합니다. 기본적으로 On-Call 일정, 에스컬레이션 정책 및 팀 라우팅 규칙에 대한 접근은 제한이 없습니다.

세분화된 액세스 제어는 다음 On-Call 리소스에 대해 사용할 수 있습니다.
- **일정**: 누가 일정을 조회하고, 편집하고, 변경할 수 있는지를 제어합니다.
- **에스컬레이션 정책**: 누가 에스컬레이션 정책을 조회하고, 편집할 수 있는지를 제어합니다.
- **팀 라우팅 규칙**: 누가 팀 라우팅 규칙을 조회하고, 편집할 수 있는지를 제어합니다.

### 지원되는 리소스 및 권한 {#supported-resources-and-permissions}

| On-Call 리소스 | Viewer | Overrider | Editor |
|------------------|--------|-----------|--------|
| **일정** | 일정 조회 가능 | 일정 조회 및 근무 교대 재정의 가능 | 일정 조회, 편집 및 근무 교대 재정의 가능 |
| **에스컬레이션 정책** | 에스컬레이션 정책 조회 가능 | - | 에스컬레이션 정책 조회 및 편집 가능 |
| **팀 라우팅 규칙** | 팀 라우팅 규칙 조회 가능 | - | 팀 규칙 조회 및 편집 가능 |

### On-Call 리소스에 대한 액세스 제한 {#restrict-access-to-on-call-resources}

On-Call 리소스에 대한 액세스를 제한하려면 다음을 수행합니다.

1. 특정 On-Call 리소스(일정, 에스컬레이션 정책 또는 팀 라우팅 규칙)로 이동합니다.
1. **Manage**를 클릭합니다.
1. 드롭다운 메뉴에서 **Permissions**를 선택합니다.
1. **Restrict Access**를 클릭합니다.
1. 드롭다운 메뉴에서 하나 이상의 역할, 팀 또는 사용자를 선택합니다.
1. **Add**를 클릭합니다.
1. 이름 옆의 드롭다운 메뉴에서 각 대상에 부여할 액세스 수준을 선택합니다.
   - **Viewer**: 리소스를 조회할 수 있는 읽기 전용 권한
   - **Overrider**(일정 전용): 일정 조회 및 일정 재정의 생성 가능
   - **Editor**: 리소스 조회 및 수정이 가능한 전체 권한
1. **Save**를 클릭합니다.

**참고**: 리소스에 대한 편집 권한을 유지하려면 저장하기 전에 반드시 본인이 속한 역할 중 하나 이상을 포함해야 합니다.

## Datadog On-Call 시작하기{#start-using-datadog-on-call}

<div class="alert alert-danger">인시던트 기록을 보존하기 위해 Datadog On-Call은 페이지, 에스컬레이션 정책 또는 일정과 같은 리소스 삭제를 지원하지 않습니다. 운영 환경에 영향을 주지 않고 On-Call을 테스트하려면 샌드박스용 평가 조직을 생성하세요.</div>

On-Call을 시작하려면 [On-Call 팀을 구성][1]하고 모든 팀 구성원이 [On-Call 프로필 설정][2]을 구성하여 알림을 받을 수 있는 상태인지 확인합니다.

{{< whatsnext desc="이 섹션에는 다음 주제가 포함되어 있습니다.">}}
  {{< nextlink href="/incident_response/on-call/teams">}}<u>팀 온보딩</u>: 새로운 On-Call 팀을 생성하거나 기존 Datadog 팀을 On-Call에 추가하거나 PagerDuty에서 팀을 가져옵니다.{{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/pages">}}<u>페이지</u>: 모니터, 인시던트, 보안 시그널 및 기타 소스에서 페이지를 생성합니다. 페이지를 응답 확인, 재할당 또는 해결하거나 인시던트로 승격할 수 있습니다.{{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/escalation_policies">}}<u>에스컬레이션 정책</u>: 페이지가 여러 일정으로 전달되는 단계를 정의합니다. {{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/schedules">}}<u>일정</u>: 팀 구성원의 온콜 순환 일정을 정의합니다.{{< /nextlink >}}
  {{< nextlink href="/incident_response/on-call/profile_settings">}}<u>프로필 설정</u>: 적시에 효과적인 페이지를 받을 수 있도록 연락 방법 및 알림 기본 설정을 구성합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 과금 {#billing}

On-Call은 사용자 좌석 기반 SKU입니다. On-Call 요금 체계 및 Datadog 내 좌석 관리 방법에 대한 자세한 내용은 [요금 페이지][5] 및 [Incident Response 과금 설명서][6]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/incident_response/on-call/teams
[2]: /ko/incident_response/on-call/profile_settings
[3]: /ko/account_management/rbac/granular_access/
[4]: /ko/account_management/rbac/#role-based-access-control
[5]: https://www.datadoghq.com/pricing/?product=incident-response#products
[6]: /ko/account_management/billing/incident_response/
[7]: /ko/incident_response/on-call/routing_rules#support-hours