---
aliases:
- /ko/service_management/status_pages/
further_reading:
- link: https://www.datadoghq.com/blog/status-pages
  tag: 블로그
  text: Datadog Status Pages를 사용하여 이해관계자에게 최신 정보 계속 제공
- link: /incident_response/incident_management/
  tag: 설명서
  text: Incident Management에 관해 자세히 알아보기
- link: /incident_response/on-call/
  tag: 설명서
  text: On-Call Scheduling에 관해 자세히 알아보기
- link: /incident_response/incident_management/integrations/status_pages
  tag: 설명서
  text: Datadog Status Pages를 Incident Management와 통합
title: Status Pages
---
## 개요 {#overview}

{{< img src="service_management/status_pages/shopist_status_page2.png" alt="서비스 구성 요소, 그 현재 상태와 최근 인시던트 업데이트가 표시된 상태 페이지 예시" style="width:100%;" >}}

Status Pages는 Datadog의 Incident Response 제품군에 속하며, On-Call 및 Incident Management와 함께 제공됩니다. 이 제품을 사용하면 팀원들이 **서비스 가용성**, **인시던트**, **예정된 유지 관리**를 고객이나 내부 이해관계자에게 공유 가능한 웹 페이지를 통해 선제적으로 알릴 수 있습니다.

Status Pages를 사용하여 할 수 있는 일:

* 중요한 시스템 및 기능의 사용 가능성 공유
* 인시던트 중간에 서비스 중단을 명확하게 전달
* 예약된 유지 관리 및 계획된 가동 중지를 미리 공지
* 선제적 이메일 알림을 사용하여 인바운드 지원 볼륨 감소

## 권한 구성 {#configure-permissions}

Status Pages와 관련된 RBAC 권한은 세 가지입니다. Datadog Admin 역할이 있는 사용자는 세 가지 필수 권한을 모두 보유합니다.

Status Pages를 생성, 업데이트 또는 게시하려면 `status_pages_settings_read`, `status_pages_settings_write` 및 `status_pages_incident_write` RBAC 권한이 있어야 합니다. 자세한 내용은 [Access Control][1]을 참조하세요.

<table>
  <thead>
    <tr>
      <th style="white-space: nowrap;">이름</th>
      <th>설명</th>
      <th>기본 역할</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;">Status Pages Settings Read<br><code style="white-space: nowrap;">status_pages_settings_read</code></td>
      <td>Status Pages 목록을 조회하고 각 Status Page의 설정, 알림 및 실행된 Internal Status Pages를 조회합니다.</td>
      <td>Datadog Read Only 역할</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Status Pages Settings Write<br><code style="white-space: nowrap;">status_pages_settings_write</code></td>
      <td>새 Status Pages를 생성 및 실행하고 Status Pages 설정을 구성합니다.</td>
      <td>Datadog Admin 역할</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Status Pages Notice Write<br><code style="white-space: nowrap;">status_pages_incident_write</code></td>
      <td>인시던트를 게시하고 업데이트합니다.</td>
      <td>Datadog Admin 역할</td>
    </tr>
  </tbody>
</table>

## 상태 페이지 생성 {#create-a-status-page}

1. Datadog에서 [**Status Pages**][2]로 이동합니다.
1. **상태 페이지 생성**을 클릭하고 온보딩 흐름을 따릅니다.

   | 필드             | 설명 |
   | ----------------- | ----------- |
   | **상태 페이지 유형**    | 페이지에 액세스할 수 있는 사용자가 누구인지 선택: <br>- **공개** - 링크가 있는 모든 사용자가 조회 가능 <br>- **내부** - Datadog 조직 내의 인증된 사용자만 조회 가능 |
   | **페이지 이름**     | 페이지 헤더로 표시됩니다(로고가 업로드되지 않은 경우). <br>*예: Acme Cloud Platform* |
   | **도메인 접두사** | 상태 페이지 하위 도메인 접두사로 사용합니다. 사용자 지정 도메인에 관한 자세한 내용은 [사용자 지정 도메인 설정](#set-a-custom-domain) 섹션을 참조하세요.<br>*예: shopist → shopist.statuspage.datadoghq.com* <br>- **전역적으로 고유**해야 함 <br>- 소문자, 영숫자, 하이픈 사용 <br>- 나중에 변경하면 링크에 영향을 미칠 수 있음 |
   | **구독***(선택 사항)* | 사용자가 상태 페이지 업데이트에 관한 이메일 알림을 수신할 수 있습니다. 구독이 활성화되면 사용자가 새 알림 및 업데이트에 관한 알림을 받기로 가입할 수 있습니다. 각각의 상태 페이지에 대하여 구독을 켜거나 끌 수 있습니다. **참고**: [이메일 구독](#email-subscriptions)은 이중 옵트인이며, 이메일을 반드시 확인해야 합니다. |
   | **회사 로고, 패비콘 또는 이메일 헤더 이미지***(선택 사항)* | 로고, 패비콘 또는 이미지를 업로드하여 상태 페이지 및 이메일 알림의 모양을 맞춤화합니다. |
1. (선택 사항) [구성 요소를 추가](#add-components)하여 개별 서비스의 상태를 표시합니다.
1. **설정 저장**을 클릭합니다.
   <div class="alert alert-info">상태 페이지는 설정을 저장한 뒤에도 <strong>라이브 상태가 아닙니다</strong>. 페이지를 사용할 수 있게 하려면 <a href="#publish-your-status-page">상태 페이지를 게시</a>하세요.</div>

## 구성 요소 추가 {#add-components}

{{< img src="/service_management/status_pages/status_page_components.png" alt="라이브 미리 보기 패널이 있는 상태 페이지 구성 요소 구성" style="width:100%;" >}}

구성 요소는 상태 페이지의 기본 요소입니다. 각각의 구성 요소가 사용자가 관심 있는 서비스 또는 기능을 나타냅니다. 구성 요소의 몇 가지 예를 들면 다음과 같습니다.
- API 게이트웨이
- 웹 대시보드
- 데이터베이스 클러스터
- 미국 지역 서비스

상태 페이지에는 초기 설정 시에나 상태 페이지 설정을 통해 구성 요소를 추가할 수 있습니다.

1. 상태 페이지에서 **설정**을 클릭하고 **구성 요소** 탭을 선택합니다.
1. 개별 구성 요소를 생성하거나 관련 구성 요소 그룹을 생성합니다. [알림](#add-a-notice)을 이러한 구성 요소와 연결하여 상태 페이지에 미치는 영향을 반영할 수 있습니다.
1. 시각화 유형 선택:
   1. 표시줄 및 업타임 비율
   1. 표시줄만
   1. 구성 요소 이름만

### 구성 요소 계층 구조 {#component-hierarchy}

여러 알림이 동일한 구성 요소에 영향을 미치는 경우, 영향이 가장 큰 알림이 우선입니다.
중대한 중단 > 부분 중단 > 성능 저하 > 유지 관리 > 정상 작동

## 상태 페이지 게시 {#publish-your-status-page}

상태 페이지 설정을 저장한 다음, **상태 페이지 실행**을 클릭하여 해당 페이지를 URL에서 사용할 수 있도록 하세요.

선택한 항목에 따른 설명:
- **공개**를 선택한 경우, 모든 방문자가 즉시 페이지에 액세스 가능.
- **내부**를 선택한 경우, 조직의 인증된 Datadog 사용자로만 액세스가 제한됨.

## 알림 추가 {#add-a-notice}

알림은 시스템 상태를 전달하기 위해 상태 페이지에 게시되는 메시지입니다. Status Pages는 두 가지 유형의 알림을 지원합니다. 하나는 계획에 없던 서비스 영향으로 인한 **성능 저하**, 다른 하나는 계획된 가동 중지의 **유지 관리 기간**입니다.

{{< img src="service_management/status_pages/select_notice_type_status_page.png" alt="상태 페이지 알림 선택기, 성능 저하 및 예약된 유지 관리 옵션 포함" style="width:60%;" >}}

### 성능 저하 게시 {#publish-a-degradation}

{{< img src="service_management/status_pages/shopist_status_page_degradations.png" alt="성능 저하를 겪고 있는 서비스 구성 요소를 표시한 상태 페이지 예시" style="width:100%;" >}}

성능 저하 알림은 인시던트 또는 서비스 중단과 같이 **계획되지 않은 서비스 영향**을 알립니다. 성능 저하 알림을 사용하여 문제를 조사, 완화, 해결하는 과정에서 사용자에게 계속 정보를 제공하세요.

상태 페이지에서 **알림 게시**를 클릭하고 **성능 저하**를 선택한 뒤, 다음 내용 제공:

| 필드 | 설명 |
| ---- | ---- |
| **알림 제목** | 문제에 대한 짧고 명확한 설명 <br>*예: 미국 지역의 오류율 증가* |
| **상태** | 문제의 현재 상태: <br>- 조사 중 <br>- 식별됨 <br>- 모니터링 <br>- 해결됨 |
| **메시지** | 사용자를 위한 추가적인 세부 정보 <br>*예: 당사에서 문제를 인지하고 있으며 해결을 위해 노력 중입니다.* |
| **영향을 받은 구성 요소** | 성능 저하로 인해 영향을 받은 하나 이상의 구성 요소 |
| **영향** | 구성 요소당 영향 수준: <br>- 정상 작동 <br>- 성능 저하 <br>- 부분 중단 <br>- 중대한 중단 |
| **구독자에게 알림** | 토글하여 구독한 사용자에게 업데이트 전송 |

{{< img src="service_management/status_pages/publish_status_page_degradation.png" alt="성능 저하에 대한 알림 모달 게시의 예" style="width:60%;" >}}

성능 저하 알림을 검토하고 게시한 뒤 알림의 상태:
- **상태 페이지 목록**에서 활성 알림 아래에 표시됩니다.
- 영향을 받은 구성 요소의 업타임 표시줄을 업데이트합니다.
- 알림 기록 타임라인에 표시됩니다.

시간의 흐름에 따른 업데이트를 게시할 수 있고, 문제가 완전히 완화되면 알림을 **해결됨**으로 표시할 수 있습니다.

### 성능 저하 백필 {#backfill-a-degradation}

백필된 성능 저하를 사용하면 이전에 공지되지 않은 서비스 중단을 소급해서 문서화할 수 있습니다. 각 업데이트에 자체 원본 타임스탬프를 할당할 수 있으므로, 인시던트 타임라인이 업타임 기록에 정확하게 표시됩니다.

상태 페이지에서 **알림 게시** 옆에 있는 드롭다운을 선택하고, **백필된 알림 게시** > **성능 저하**를 선택한 뒤, 다음 내용 제공:

| 필드 | 설명 |
| ---- | ---- |
| **알림 제목** | 인시던트의 짧고 명확한 설명 <br>*예: 미국 지역의 오류율 증가* |
| **업데이트** | 성능 저하의 시작 및 종료를 나타내는 정확히 두 개의 타임스탬프가 적용된 업데이트입니다. 각각의 업데이트에 시작된 시간 타임스탬프, 상태(조사 중 또는 해결됨), 설명 및 영향을 받은 구성 요소가 있어야 합니다. |

{{< img src="service_management/status_pages/publish_status_page_backfill_degradation.png" alt="성능 저하에 대한 백필된 알림 모달 게시의 예" style="width:60%;" >}}

### 유지 관리 기간 예약 {#schedule-a-maintenance-window}

{{< img src="service_management/status_pages/shopist_maintenance_example.png" alt="유지 관리를 진행 중인 서비스 구성 요소가 표시된 상태 페이지 예시" style="width:100%;" >}}

유지 관리 기간을 사용하면 계획된 가동 중지 또는 서비스 영향이 발생하기 전에 선제적으로 이를 전달할 수 있습니다. 성능 저하는 계획하지 않은 인시던트에 사용되지만, 유지 관리 기간은 이와 달리 인프라 업그레이드, 시스템 유지 관리, 데이터베이스 마이그레이션 및 기타 계획된 작업에 대하여 미리 예약합니다. 이렇게 하면 고객에게 계속 정보를 제공할 수 있고 지원 볼륨을 줄일 수 있습니다.

상태 페이지에서 **유지 관리 예약**을 클릭하거나 **알림 게시**를 클릭하고 **예약된 유지 관리**를 선택합니다. 이후, 다음과 같은 세부 정보 제공:

| 필드 | 설명 |
| ---- | ---- |
| **알림 제목** | 유지 관리 활동의 명확한 설명 <br>*예: 데이터베이스 인프라 업그레이드* |
| **유지 관리 기간** | 유지 관리의 예약된 시작 및 종료 시간 |
| **메시지** | 유지 관리가 진행되면서 자동으로 게시되는 메시지 |
| **영향을 받은 구성 요소** | 유지 관리 기간 동안 영향을 받은 구성 요소 |
| **구독자에게 알림** | 토글하여 구독자에게 미리 알림 전송 |

{{< img src="service_management/status_pages/publish_status_page_maintenance.png" alt="유지 관리 기간의 알림 모달 게시의 예" style="width:60%;" >}}

검토 및 예약을 마치고 난 유지 관리 기간의 상태:
- 상태 페이지의 **예정된 유지 관리** 아래에 표시됨
- 기간이 시작되면 구성 요소 상태를 자동으로 **유지 관리**로 업데이트함
- 기간이 종료되면 구성 요소를 **정상 작동**으로 되돌림(단, 수동으로 재정의한 경우는 예외)

계획이 변경되는 경우, 또는 필요에 따라 유지 관리 기간의 일정을 변경해야 하는 경우 업데이트를 게시할 수 있습니다.

### 유지 관리 기간 백필 {#backfill-a-maintenance-window}

백필된 유지 관리 기간을 사용하면 이전에 공지되지 않은 계획된 가동 중지를 소급해서 문서화할 수 있습니다. 각 업데이트에 자체 원본 타임스탬프를 할당할 수 있으므로, 유지 관리 타임라인이 업타임 기록에 정확하게 표시됩니다.

상태 페이지에서 **알림 게시** 옆에 있는 드롭다운을 선택하고, **백필된 알림 게시** > **예약된 유지 관리**를 선택한 뒤, 다음 내용 제공:

| 필드 | 설명 |
| ---- | ---- |
| **알림 제목** | 유지 관리 활동의 명확한 설명 <br>*예: 데이터베이스 인프라 업그레이드* |
| **업데이트** | 유지 관리 기간의 시작 및 종료를 나타내는 정확히 두 개의 타임스탬프가 적용된 업데이트입니다. 각각의 업데이트에 시작된 시간 타임스탬프, 상태(진행 중 또는 완료됨), 설명 및 영향을 받은 구성 요소가 있어야 합니다. |

{{< img src="service_management/status_pages/publish_status_page_backfill_maintenance.png" alt="유지 관리 기간에 대한 백필된 알림 모달 게시의 예" style="width:60%;" >}}

## 이메일 구독 {#email-subscriptions}

상태 페이지의 이메일 구독은 **이중 옵트인**입니다. 구독할 이메일을 입력하면 사용자에게 확인 이메일이 발송되고, 사용자는 확인 링크를 클릭하여 구독을 활성화해야 합니다. 이 프로세스를 거치는 동안 사용자는 상태 페이지 전체에 대한 알림을 받을지 모니터링하려고 하는 특정 구성 요소를 선택할지 고를 수 있습니다. 알림 내 타임스탬프 형식 지정을 위한 기본 시간대를 구성할 수 있습니다. 사용자는 언제든 알림 이메일에 포함된 구독 관리 링크를 통해 기본 설정을 관리하고 구독을 업데이트할 수 있습니다.

**내부** 상태 페이지의 경우, 구독 프로세스는 동일하지만 사용자가 구독을 확인하고 알림을 받으려면 동일한 Datadog 조직에 로그인해야 합니다.

{{< img src="/service_management/status_pages/status_pages_subscription_1.png" alt="필드가 채워진 상태 페이지 구독 모달의 스크린샷" style="width:70%;" >}}

## 사용자 지정 도메인 설정 {#set-a-custom-domain}

브랜딩과 일치하도록 상태 페이지를 `status.acme.com`과 같은 사용자 지정 도메인으로 매핑하는 옵션이 있습니다.

1. 상태 페이지에서 **설정**을 클릭합니다.
1. **사용자 지정 도메인**을 선택합니다.
1. 지침을 따라 도메인을 입력하고 DNS 레코드를 추가합니다.
1. Datadog은 자동으로 DNS 구성을 감지하여 SSL 인증서를 프로비저닝합니다.

<div class="alert alert-warning">사용자 지정 도메인에 CNAME 또는 A 레코드를 추가하려면 DNS 공급자에 대한 액세스 권한이 필요합니다.</div>

**참고**:

- DNS 전파는 몇 분 걸릴 수 있습니다.
- 언제든 기본 Datadog 도메인으로 되돌릴 수 있습니다.
- DNS 변경은 도메인 등록 기관에 대한 액세스 권한이 있는 사람이 적용해야 합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/
[2]: https://app.datadoghq.com/status-pages