---
aliases:
- /ko/service_management/status_pages/
description: 공유 가능한 상태 페이지를 통해 고객이나 내부 이해관계자에게 서비스 가용성, 인시던트, 예정된 유지 관리를 알리세요.
further_reading:
- link: https://www.datadoghq.com/blog/status-pages
  tag: 블로그
  text: Datadog Status Pages를 사용하여 이해관계자에게 최신 정보 계속 제공하기
- link: /incident_response/incident_management/
  tag: 문서
  text: Incident Management에 관해 자세히 알아보기
- link: /incident_response/on-call/
  tag: 문서
  text: On-Call Scheduling에 관해 자세히 알아보기
- link: /incident_response/incident_management/integrations/status_pages
  tag: 문서
  text: Datadog Status Pages를 Incident Management와 통합하기
title: Status Pages
---
## 개요 {#overview}

{{< img src="incident_response/status_pages/shopist_status_page3.png" alt="서비스 구성 요소, 그 현재 상태와 최근 인시던트 업데이트가 표시된 상태 페이지 예시" style="width:100%;" >}}

Status Pages는 Datadog의 Incident Response 모음에 속하며, On-Call 및 Incident Management와 함께 제공됩니다. 이 제품을 사용하면 팀원들이 **서비스 가용성**, **인시던트**, **예정된 유지 관리**를 고객이나 내부 이해관계자에게 공유 가능한 웹 페이지를 통해 선제적으로 알릴 수 있습니다.

Status Pages를 사용하여 할 수 있는 일:

* 중요한 시스템 및 기능의 사용 가능성 공유
* 인시던트 중간에 서비스 중단을 명확하게 전달
* 예약된 유지 관리 및 계획된 가동 중지를 미리 공지
* 선제적 이메일 및 Slack 알림을 사용하여 인바운드 지원 요청을 줄이세요.

## 권한 구성 {#configure-permissions}

Status Pages를 생성, 업데이트 또는 게시하려면 적절한 RBAC 권한이 있어야 합니다. 자세한 내용은 [Access Control][1]을 참조하세요.

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
      <td>새 Status Pages를 생성하고 Status Pages 설정을 구성합니다.</td>
      <td>Datadog Admin 역할</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Status Pages Notice Write<br><code style="white-space: nowrap;">status_pages_incident_write</code></td>
      <td>인시던트를 게시하고 업데이트합니다.</td>
      <td>Datadog Admin 역할</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Status Pages 공개 페이지 게시<br><code style="white-space: nowrap;">status_pages_public_page_publish</code></td>
      <td>공개 Status Pages를 게시하거나 게시 취소합니다.</td>
      <td>없음</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Status Pages 내부 페이지 게시<br><code style="white-space: nowrap;">status_pages_internal_page_publish</code></td>
      <td>내부 Status Pages를 게시하거나 게시 취소합니다.</td>
      <td>없음</td>
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
   | **구독** *(필요시)* | 사용자가 [이메일](#email-subscriptions) 또는 [Slack](#slack-subscriptions)을 통해 상태 페이지 업데이트에 대한 알림을 받을 수 있도록 합니다. 구독이 활성화되면 방문자는 게시된 페이지에서 가입하여 새로운 공지 사항 및 업데이트에 대한 알림을 받을 수 있습니다. 이메일 및 Slack 구독은 각 상태 페이지별로 독립적으로 켜거나 끌 수 있습니다. **참고**: [이메일 구독](#email-subscriptions)은 이중 옵트인 방식이며, 이메일 주소를 반드시 확인해야 합니다. |
   | **회사 로고, Favicon, 이메일 헤더 이미지 또는 Slack 앱 아이콘** *(필요시)* | 이미지를 업로드하여 상태 페이지와 알림을 개인화하세요. Slack 앱 아이콘은 Slack 알림에서 페이지 이름과 함께 발신자 아바타로 표시됩니다. |
1. (필요시) [구성 요소를 추가](#add-components)하여 개별 서비스의 상태를 표시합니다.
1. **설정 저장**을 클릭합니다.
   <div class="alert alert-info">상태 페이지는 설정을 저장한 뒤에도 <strong>라이브 상태가 아닙니다</strong>. 페이지를 사용할 수 있게 하려면 <a href="#publish-your-status-page">상태 페이지를 게시</a>하세요.</div>

## 구성 요소 추가 {#add-components}

{{< img src="/incident_response/status_pages/status_page_components.png" alt="라이브 미리 보기 패널이 있는 상태 페이지 구성 요소 구성" style="width:100%;" >}}

구성 요소는 상태 페이지의 기본 요소입니다. 각각의 구성 요소가 사용자가 관심 있는 서비스 또는 기능을 나타냅니다. 구성 요소의 몇 가지 예를 들면 다음과 같습니다.
- API Gateway
- 웹 대시보드
- 데이터베이스 클러스터
- 미국 지역 서비스

상태 페이지에는 초기 설정 시에나 상태 페이지 설정을 통해 구성 요소를 추가할 수 있습니다.

1. 상태 페이지에서 **설정**을 클릭하고 **구성 요소** 탭을 선택합니다.
1. 개별 구성 요소를 생성하거나 관련 구성 요소 그룹을 생성합니다. [알림](#add-a-notice)을 이러한 구성 요소와 연결하여 상태 페이지에 미치는 영향을 반영할 수 있습니다.
1. 시각화 유형을 선택합니다.
   1. 표시줄 및 업타임 비율
   1. 표시줄만
   1. 구성 요소 이름만

### 구성 요소 계층 구조 {#component-hierarchy}

여러 알림이 동일한 구성 요소에 영향을 미치는 경우, 영향이 가장 큰 알림이 우선입니다.
주요 중단 > 부분 중단 > 성능 저하 > 유지 관리 > 정상 작동

### 구성 요소 상태 및 가동 시간 {#component-status-and-uptime}

각 구성 요소 상태는 가동 시간 막대와 가동 시간 백분율에 각각 다르게 영향을 미칩니다.

| 상태 | 가동 시간 막대 | 가동 시간 백분율 |
|--------|-------------|-------------------|
| 주요 중단 | 표시됨 | 가동 중지 시간으로 계산됨 |
| 부분 중단 | 표시됨 | 가동 중지 시간으로 계산됨 |
| 성능 저하 | 표시됨 | 영향 없음 |
| 유지 관리 | 표시됨 | 영향 없음 |
| 운영 중 | 정상으로 표시됨 | 영향 없음 |

**참고**: 부분 중단과 주요 중단은 동일하게 가중치가 적용됩니다. 두 상태 중 어느 상태이든 지속된 전체 기간은 가동 시간 백분율 계산 시 가동 중지 시간으로 계산됩니다.

## 상태 페이지 게시 {#publish-your-status-page}

상태 페이지 설정을 저장한 다음, **상태 페이지 실행**을 클릭하여 해당 페이지를 URL에서 사용할 수 있도록 하세요.

선택한 방식에 따라 다음을 설정하세요.
- **공개**를 선택한 경우, 모든 방문자가 즉시 페이지에 액세스 가능.
- **내부**를 선택한 경우, 조직의 인증된 Datadog 사용자로만 액세스가 제한됨.

## 알림 추가 {#add-a-notice}

알림은 시스템 상태를 전달하기 위해 상태 페이지에 게시되는 메시지입니다. Status Pages는 두 가지 유형의 알림을 지원합니다. 하나는 계획에 없던 서비스 영향으로 인한 **성능 저하**, 다른 하나는 계획된 가동 중지의 **유지 관리 기간**입니다.

{{< img src="incident_response/status_pages/select_notice_type_status_page.png" alt="상태 페이지 알림 선택기, 성능 저하 및 예약된 유지 관리 옵션 포함" style="width:60%;" >}}

### 성능 저하 게시 {#publish-a-degradation}

{{< img src="incident_response/status_pages/shopist_status_page_degradations2.png" alt="성능 저하를 겪고 있는 서비스 구성 요소를 표시한 상태 페이지 예시" style="width:100%;" >}}

성능 저하 알림은 인시던트 또는 서비스 중단과 같이 **계획되지 않은 서비스 영향**을 알립니다. 성능 저하 알림을 사용하여 문제를 조사, 완화, 해결하는 과정에서 사용자에게 계속 정보를 제공하세요.

상태 페이지에서 **알림 게시**를 클릭하고 **성능 저하**를 선택한 뒤, 다음 내용을 제공합니다.

| 필드 | 설명 |
| ---- | ---- |
| **알림 제목** | 문제에 대한 짧고 명확한 설명 <br>*예: 미국 지역의 오류율 증가* |
| **상태** | 문제의 현재 상태: <br>- 조사 중 <br>- 식별됨 <br>- 모니터링 <br>- 해결됨 |
| **메시지** | 사용자를 위한 추가적인 세부 정보 <br>*예: 당사에서 문제를 인지하고 있으며 해결을 위해 노력 중입니다.* |
| **영향을 받은 구성 요소** | 성능 저하로 인해 영향을 받은 하나 이상의 구성 요소 |
| **영향** | 구성 요소당 영향 수준: <br>- 정상 작동 <br>- 성능 저하 <br>- 부분 중단 <br>- 주요 중단 |
| **구독자에게 알림** | 토글하여 구독한 사용자에게 업데이트 전송 |

{{< img src="incident_response/status_pages/publish_status_page_degradation_1.png" alt="성능 저하에 대한 알림 모달 게시의 예" style="width:60%;" >}}

성능 저하 알림을 검토하고 게시하면 다음과 같이 처리됩니다.
- **상태 페이지 목록**에서 활성 알림 아래에 표시됩니다.
- 영향을 받은 구성 요소의 업타임 표시줄을 업데이트합니다. **부분 중단** 또는 **주요 중단**으로 설정된 구성 요소도 영향이 지속되는 동안 가동 시간 백분율이 감소합니다.
- 알림 기록 타임라인에 표시됩니다.

시간의 흐름에 따른 업데이트를 게시할 수 있고, 문제가 완전히 완화되면 알림을 **해결됨**으로 표시할 수 있습니다.

**참고**: 각 상태 페이지는 한 번에 최대 100개의 활성(미해결) 성능 저하를 지원합니다.

### 성능 저하 백필 {#backfill-a-degradation}

백필된 성능 저하를 사용하면 이전에 공지되지 않은 서비스 중단을 소급해서 문서화할 수 있습니다. 각 업데이트에 자체 원본 타임스탬프를 할당할 수 있으므로, 인시던트 타임라인이 업타임 기록에 정확하게 표시됩니다.

상태 페이지에서 **알림 게시** 옆에 있는 드롭다운을 선택하고, **백필된 알림 게시** > **성능 저하**를 선택한 뒤, 다음 내용 제공:

| 필드 | 설명 |
| ---- | ---- |
| **알림 제목** | 인시던트의 짧고 명확한 설명 <br>*예: 미국 지역의 오류율 증가* |
| **업데이트** | 성능 저하의 시작 및 종료를 나타내는 정확히 두 개의 타임스탬프가 적용된 업데이트입니다. 각각의 업데이트에 시작된 시간 타임스탬프, 상태(조사 중 또는 해결됨), 설명 및 영향을 받은 구성 요소가 있어야 합니다. |

{{< img src="incident_response/status_pages/publish_status_page_backfill_degradation.png" alt="성능 저하에 대한 백필된 알림 모달 게시의 예" style="width:60%;" >}}

### 성능 저하 업데이트 편집 {#edit-a-degradation-update}

성능 저하 업데이트를 게시한 후 상태와 메시지를 편집하여 오타를 수정하거나, 부정확한 상태 선택을 바로잡거나, 설명을 명확하게 할 수 있습니다. 업데이트를 편집하려면 상태 페이지에서 성능 저하 알림을 열고 수정하려는 업데이트 위로 마우스를 가져간 다음 나타나는 편집 아이콘을 클릭하세요. **Edit Update** 모달에서 변경하세요.

{{< img src="incident_response/status_pages/edit_degradation_update.png" alt="Notice Status 옵션과 Message 필드가 표시된 Edit Update 모달" style="width:60%;" >}}

**Notice Status** 및 **Message** 필드만 편집할 수 있습니다. 알림을 해결하거나 영향을 받는 구성 요소를 업데이트하려면 대신 새 업데이트를 추가하세요. **Save Changes**를 클릭하여 편집 내용을 적용하세요.

### 성능 저하 업데이트 삭제 {#delete-a-degradation-update}

실수로 게시된 업데이트를 삭제하려면 상태 페이지에서 성능 저하 알림을 열고 삭제하려는 업데이트 위로 마우스를 가져간 다음 나타나는 삭제 아이콘을 클릭하세요. **Delete Update** 모달에서 확인하세요.

{{< img src="incident_response/status_pages/delete_degradation_update.png" alt="Delete Update 확인 모달" style="width:60%;" >}}

업데이트를 삭제하면 타임라인에서 해당 업데이트가 페이지 관리자에 의해 삭제되었음을 나타내는 메모로 대체됩니다. 이 액션은 되돌릴 수 없습니다.

### 유지 관리 기간 예약 {#schedule-a-maintenance-window}

{{< img src="incident_response/status_pages/shopist_maintenance_example.png" alt="유지 관리를 진행 중인 서비스 구성 요소가 표시된 상태 페이지 예시" style="width:100%;" >}}

유지 관리 기간을 사용하면 계획된 가동 중지 또는 서비스 영향이 발생하기 전에 선제적으로 이를 전달할 수 있습니다. 성능 저하는 계획하지 않은 인시던트에 사용되지만, 유지 관리 기간은 이와 달리 인프라 업그레이드, 시스템 유지 관리, 데이터베이스 마이그레이션 및 기타 계획된 작업에 대하여 미리 예약합니다. 이렇게 하면 고객에게 계속 정보를 제공할 수 있고 지원 볼륨을 줄일 수 있습니다.

상태 페이지에서 **유지 관리 예약**을 클릭하거나 **알림 게시**를 클릭하고 **예약된 유지 관리**를 선택합니다. 이후, 다음과 같은 세부 정보를 제공합니다.

| 필드 | 설명 |
| ---- | ---- |
| **알림 제목** | 유지 관리 활동의 명확한 설명 <br>*예: 데이터베이스 인프라 업그레이드* |
| **유지 관리 기간** | 유지 관리의 예약된 시작 및 종료 시간 |
| **메시지** | 유지 관리가 진행되면서 자동으로 게시되는 메시지 |
| **영향을 받은 구성 요소** | 유지 관리 기간 동안 영향을 받은 구성 요소 |
| **구독자에게 알림** | 토글하여 구독자에게 미리 알림 전송 |

{{< img src="incident_response/status_pages/publish_status_page_maintenance.png" alt="유지 관리 기간의 알림 모달 게시의 예" style="width:60%;" >}}

검토 및 예약을 완료하면 유지 관리 기간은 다음과 같이 처리됩니다.
- 상태 페이지의 **예정된 유지 관리** 아래에 표시됨
- 기간이 시작되면 구성 요소 상태를 자동으로 **유지 관리**로 업데이트함
- 기간이 종료되면 구성 요소를 **정상 작동**으로 되돌림(단, 수동으로 재정의한 경우는 예외)

계획이 변경되는 경우, 또는 필요에 따라 유지 관리 기간의 일정을 변경해야 하는 경우 업데이트를 게시할 수 있습니다.

**참고**: 각 상태 페이지는 한 번에 최대 100개의 예약된 유지 관리 기간 또는 진행 중인 유지 관리 기간을 지원합니다.

### 유지 관리 기간 취소 {#cancel-a-maintenance-window}

예약된 유지 관리 기간이 시작되기 전에 취소하려면 유지 관리 공지를 열고 점 3개 아이콘을 클릭한 다음 **Cancel Maintenance**를 선택하세요. 나타나는 대화 상자에서 취소를 확인하세요.

{{< img src="incident_response/status_pages/cancel-maintenance-window.png" alt="예약된 유지 관리 기간의 Cancel Maintenance 확인 대화 상자" style="width:60%;" >}}

유지 관리 기간을 취소하면 상태 페이지의 **Upcoming Maintenance**에서 해당 기간이 제거됩니다. 이 액션은 되돌릴 수 없습니다.

**참고**: 진행 중인 유지 관리 기간은 취소할 수 없습니다.

### 유지 관리 기간 백필 {#backfill-a-maintenance-window}

백필된 유지 관리 기간을 사용하면 이전에 공지되지 않은 계획된 가동 중지를 소급해서 문서화할 수 있습니다. 각 업데이트에 자체 원본 타임스탬프를 할당할 수 있으므로, 유지 관리 타임라인이 업타임 기록에 정확하게 표시됩니다.

상태 페이지에서 **알림 게시** 옆에 있는 드롭다운을 선택하고, **백필된 알림 게시** > **예약된 유지 관리**를 선택한 뒤, 다음 내용 제공:

| 필드 | 설명 |
| ---- | ---- |
| **알림 제목** | 유지 관리 활동의 명확한 설명 <br>*예: 데이터베이스 인프라 업그레이드* |
| **업데이트** | 유지 관리 기간의 시작 및 종료를 나타내는 정확히 두 개의 타임스탬프가 적용된 업데이트입니다. 각각의 업데이트에 시작된 시간 타임스탬프, 상태(진행 중 또는 완료됨), 설명 및 영향을 받은 구성 요소가 있어야 합니다. |

{{< img src="incident_response/status_pages/publish_status_page_backfill_maintenance.png" alt="유지 관리 기간에 대한 백필된 알림 모달 게시의 예" style="width:60%;" >}}

### 유지 관리 업데이트 편집 {#edit-a-maintenance-update}

유지 관리 업데이트를 게시한 후 메시지를 편집하여 오타를 수정하거나 설명을 명확하게 할 수 있습니다. 과거 업데이트를 편집하려면 상태 페이지에서 유지 관리 공지를 열고 타임라인에서 수정하려는 업데이트 위로 마우스를 가져간 다음 나타나는 편집 아이콘을 클릭하세요. **Edit Update** 모달에서 변경하세요.

{{< img src="incident_response/status_pages/edit_maintenance_update.png" alt="과거 유지 관리 업데이트에 대한 Message 필드가 표시된 Edit Update 모달" style="width:60%;" >}}

**Message** 필드만 편집할 수 있습니다. **Save Changes**를 클릭하여 편집 내용을 적용하세요.

## 공지 템플릿 사용{#use-notice-templates}

템플릿을 사용하면 반복되는 유지 관리 활동이나 알려진 유형의 서비스 중단과 같이 반복적으로 게시하는 성능 저하 공지 및 유지 관리 기간에 대해 미리 구성된 문구를 저장할 수 있습니다. 공지를 게시할 때 템플릿을 선택하면 매번 입력할 필요 없이 공지 제목, 상태별 메시지 및 영향을 받는 구성 요소가 미리 채워집니다.

### 템플릿 생성{#create-a-template}

1. 상태 페이지에서 **Settings**을 클릭하고 **Templates** 탭을 선택합니다.
1. **Degradation Templates** 또는 **Maintenance Templates** 섹션에서 **Add Template**을 클릭합니다.
1. 다음 세부 정보를 입력하세요.

   | 필드 | 설명 |
   | ---- | ---- |
   | **Template name** | 템플릿을 선택할 때 템플릿을 식별하는 데 사용되는 내부 이름입니다. 게시된 상태 페이지에는 표시되지 않습니다. |
   | **Notice Title** | 템플릿을 사용할 때 미리 채워지는 기본 제목입니다. |
   | **Messages** | 각 공지 상태에 대한 메시지입니다. 성능 저하 템플릿은 **Investigating**, **Identified**, **Monitoring** 및 **Resolved**를 지원합니다. 유지 관리 템플릿은 **Scheduled**, **In Progress** 및 **Completed**를 지원합니다. |
   | **Components** | 템플릿을 사용할 때 미리 선택할 구성 요소입니다. 성능 저하 템플릿의 경우 각 구성 요소에 대한 초기 상태를 설정할 수도 있습니다. |

1. **Save**를 클릭합니다.

{{< img src="incident_response/status_pages/create_degradation_template.png" alt="제목, 템플릿 변수를 사용하는 상태별 메시지 및 영향을 받는 구성 요소로 성능 저하 템플릿 생성" style="width:100%;" >}}

### 템플릿 변수 삽입 {#insert-template-variables}

템플릿 메시지에 변수를 삽입하면 템플릿이 공지에 적용될 때 Datadog이 해당 변수를 변환합니다. 변수에 따라 Datadog이 값을 자동으로 채우거나 게시자에게 값을 제공하도록 요청합니다. 메시지 필드 옆의 **Message Variables** 패널에 사용 가능한 변수의 목록이 표시됩니다.

| 변수 | 설명 |
| ---- | ---- |
| `{{date}}` | Prompts the publisher to select a date and time when the template is applied. |
| `{{components_impacted}}` | 공지에서 선택한 구성 요소 목록을 자동으로 채웁니다. |

변수를 삽입하려면 `{{`를 메시지 필드에 입력하고 목록에서 변수를 선택하거나, **Message Variables** 패널에서 변수를 클릭하여 커서 위치에 삽입합니다.

### 공지에 템플릿 적용 {#apply-a-template-to-a-notice}

**Publish Notice** 모달의 **Template** 드롭다운에서 템플릿을 선택하여 제목, 메시지 및 구성 요소로 공지를 미리 채웁니다.

템플릿을 적용하면 공지 필드가 미리 채워지며, 이후에도 편집할 수 있습니다. 편집 내용을 취소하고 원래 템플릿 콘텐츠로 복원하려면 **Reset Values**를 클릭하세요. 

{{< img src="incident_response/status_pages/apply_template_to_notice.png" alt="템플릿이 적용되어 공지 제목, 메시지 및 영향을 받는 구성 요소가 미리 채워진 Publish Notice 모달" style="width:60%;" >}}

## 이메일 구독 {#email-subscriptions}

상태 페이지의 이메일 구독은 **이중 옵트인**입니다. 구독할 이메일을 입력하면 사용자에게 확인 이메일이 발송되고, 사용자는 확인 링크를 클릭하여 구독을 활성화해야 합니다. 이 프로세스를 거치는 동안 사용자는 상태 페이지 전체에 대한 알림을 받을지 모니터링하려고 하는 특정 구성 요소를 선택할지 고를 수 있습니다. 알림 내 타임스탬프 형식 지정을 위한 기본 시간대를 구성할 수 있습니다. 사용자는 언제든 알림 이메일에 포함된 구독 관리 링크를 통해 기본 설정을 관리하고 구독을 업데이트할 수 있습니다.

**내부** 상태 페이지의 경우, 구독 프로세스는 동일하지만 사용자가 구독을 확인하고 알림을 받으려면 동일한 Datadog 조직에 로그인해야 합니다.

{{< img src="/incident_response/status_pages/status_pages_subscription_1.png" alt="필드가 채워진 상태 페이지 구독 모달의 스크린샷" style="width:70%;" >}}


## 사용자 지정 이메일 발신자 도메인 구성 {#configure-a-custom-email-sender-domain}

기본적으로 상태 페이지 구독 이메일은 Datadog 이메일 주소에서 발송됩니다. 자체 도메인에서 알림을 보내려면 Organization Settings에서 사용자 지정 SMTP 서버를 구성하세요.

<div class="alert alert-danger">Organization Settings에서 SMTP 서버를 추가하려면 <code>org_management</code> 권한이 필요합니다. 상태 페이지에서 이메일 발신자 도메인을 선택하려면 <code>status_pages_settings_write</code> 권한이 필요합니다.</div>

1. 상태 페이지에서 **Settings** > **Subscriptions**로 이동합니다.
2. **Email Sender Domain** 아래에서 **Organization Settings**를 클릭합니다.
3. Organization Settings에서 [SMTP 서버를 추가하고 검증합니다][3].
4. **Settings** > **Subscriptions**로 돌아가서 SMTP 서버를 이메일 발신자 도메인으로 선택합니다.

## Slack 구독 {#slack-subscriptions}

방문자는 **Datadog Status Pages** Slack 앱을 통해 Slack에서 상태 페이지 업데이트를 구독할 수 있습니다. **Notify subscribers**가 활성화된 상태로 공지 또는 예정된 유지 관리가 게시되면 앱은 페이지 이름과 Slack 앱 아이콘을 발신자로 사용하여 팔로우 중인 구성 요소에 대한 업데이트를 구독한 각 채널에 게시합니다. Slack 구독은 [이메일 구독](#email-subscriptions)과 독립적으로 구성됩니다.

### Slack 구독 활성화 {#enable-slack-subscriptions}

1. 상태 페이지에서 **Settings**를 클릭합니다.
2. **Slack subscriptions**를 활성화합니다.
3. (필요시) **Slack App Icon** 아래에서 Slack 알림의 발신자 아바타로 사용할 이미지를 업로드합니다.

{{< img src="incident_response/status_pages/status_pages_enable_slack.png" alt="상태 페이지 설정에 Enable Slack subscriptions 토글과 Slack App Icon 업로드가 표시됨" style="width:80%;" >}}

게시된 페이지에서 **Subscribe**를 클릭하여 활성화된 각 구독 유형에 대한 탭이 있는 모달을 엽니다.

### Slack에서 구독 {#subscribe-in-slack}

Slack 구독이 활성화된 게시된 페이지에서 다음 단계를 따르세요.

1. **Subscribe**를 클릭하고 **Slack** 탭을 엽니다.
1. (필요시) 개별 구성 요소를 선택하려면 **Subscribe to specific services**를 선택하거나, 전체 페이지를 팔로우하려면 선택하지 않은 상태로 둡니다.
1. **Subscribe via Slack**을 클릭합니다.
   {{< img src="incident_response/status_pages/status_pages_slack_subscription_modal.png" alt="Slack 탭이 선택되고 Subscribe via Slack 버튼이 표시된 Subscribe to Updates 모달" style="width:70%;" >}}
1. 작업 공간에서 **Datadog Status Pages** 앱을 승인하고 업데이트를 받을 채널을 선택합니다.
   {{< img src="incident_response/status_pages/status_pages_slack_oauth.png" alt="Datadog Status Pages 앱에 작업 공간 및 채널 액세스 권한을 부여하는 Slack 승인 화면" style="width:70%;" >}}

구독 후, 선택한 채널에 구독을 확인하는 환영 메시지가 전송됩니다.

**프라이빗 채널**: 구독 후 사용자는 Slack 앱의 **Messages** 탭에서 **Datadog Status Pages** 봇을 채널에 초대하라는 메시지를 받습니다. 업데이트를 게시하려면 먼저 봇을 초대해야 합니다. 다이렉트 메시지(DM) 채널은 지원되지 않습니다. **내부** 상태 페이지의 경우, 사용자가 구독하려면 동일한 Datadog 조직에 로그인되어 있어야 합니다.

### 구독 관리 {#manage-subscriptions}

구독자는 언제든지 Slack 알림의 **Manage Preferences** 링크를 통해 팔로우하는 구성 요소를 변경하거나 구독을 취소할 수 있습니다.

상태 페이지 소유자는 상태 페이지 설정에서 구독자를 검토할 수 있으며, 여기에는 구독된 Slack 작업 공간 및 채널이 나열됩니다. 작업 공간을 제거하면 해당 페이지에서 모든 채널의 구독이 취소됩니다.

<div class="alert alert-info">
선택한 SMTP 서버가 실패하면 <strong>Datadog 기본값</strong>을 통해 구독자에게 알림이 전송됩니다(<code>no-reply@dtdg.co</code>).
</div>

## 사용자 지정 도메인 설정 {#set-a-custom-domain}

브랜딩에 맞게 상태 페이지 URL을 `status.acme.com`과 같은 사용자 지정 도메인으로 매핑할 수 있습니다. 이는 구독 이메일의 발신자 주소를 제어하는 [사용자 지정 이메일 발신자 도메인 구성](#configure-a-custom-email-sender-domain)과는 별개입니다.

1. 상태 페이지에서 **Settings**를 클릭합니다.
1. **사용자 지정 도메인**을 선택합니다.
1. 지침을 따라 도메인을 입력하고 DNS 레코드를 추가합니다.
1. Datadog은 자동으로 DNS 구성을 탐지하여 SSL 인증서를 프로비저닝합니다.

<div class="alert alert-warning">사용자 지정 도메인에 CNAME 또는 A 레코드를 추가하려면 DNS 공급자에 대한 액세스 권한이 필요합니다.</div>

**참고**:

- DNS 전파는 몇 분 걸릴 수 있습니다.
- 언제든 기본 Datadog 도메인으로 되돌릴 수 있습니다.
- DNS 변경은 도메인 등록 기관에 대한 액세스 권한이 있는 사람이 해야 합니다.

## Terraform으로 상태 페이지 관리 {#manage-status-pages-with-terraform}
Terraform을 사용하여 상태 페이지를 생성하거나 관리할 수 있습니다. 사용 가능한 리소스에 대한 자세한 내용은 Datadog의 [Terraform 레지스트리][4]를 참조하세요.  


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/
[2]: https://app.datadoghq.com/status-pages
[3]: /ko/account_management/org_settings/smtp_configuration
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/status_page