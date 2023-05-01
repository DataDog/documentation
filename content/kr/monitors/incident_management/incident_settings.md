---
aliases:
- /kr/monitors/incident_management/notification_rules
description: 인시던트 관리 경험을 구성 및 맞춤 설정합니다
kind: 설명서
title: 인시던트 설정
---

## 개요

[인시던트 설정(Incident Settings)][1]으로 조직 전체의 인시던트 관리 경험을 맞춤 설정하십시오. 개별 설정은 범주화되어 여러 하위 섹션으로 구분됩니다. 주 범주로는 일반, 공지, 복구 등이 있습니다.

## 코어

### 일반

인시던트 설정에서 일반 하위 섹션은 조직의 중요도 수준과 상태 수준을 정의하고 인시던트 도움말 텍스트를 선언하기 위해 사용합니다.

{{< img src="monitors/incidents/severity_settings.jpeg" alt="인시던트 중요도 수준 설정" style="width:80%;">}}

다음을 위해 중요도 수준 설정을 사용:

1. `SEV-0` 또는 `SEV-1` (기본값을 `SEV-1`로)으(로) 최상위 중요도를 정의합니다.
2. 중요도의 하위 라벨을 맞춤 설정합니다(**기본값:** 최상위, 상위, 중간, 하위, 최하위)
3. 중요도의 설명을 맞춤 설정합니다.
4. 목록 하단에서 최소 3개 최대 10개까지 중요도를 추가 또는 삭제합니다.

**참고**: 알림 규칙에서 참초되는 중요도를 삭제하려면, 결정을 확인하라는 메시지가 표시됩니다. 진행을 선택하면 영향을 받는 알림 규칙이 비활성화되며 더이상 유효하지 않게 변경됩니다. 중요도를 삭제하고 초기 중요도를 변경하면 [인시던트 관리 분석(Incident Management Analytics)][2] 쿼리가 자동 업데이트되지 않습니다.

{{< img src="monitors/incidents/status_settings.jpeg" alt="인시던트 상태 수준 설정" style="width:80%;">}}

다음을 위해 상태 수준을 사용:

1. 상태의 설명을 맞춤 설정합니다.
2. 선택 사항인 `Completed` 상태의 활성화 여부를 선택합니다.

**참고**: `Completed` 상태를 삭제하면 `Completed` 상태에 이미 포함된 인시던트 또는 이 상태를 명시적으로 참조하는 [인시던트 관리 분석(Incident Management Analytics)][2] 쿼리가 자동 업데이트되지 않습니다. `Completed` 상태를 참조하는 알림 규칙이 비활성화되며, 더 이상 유효하지 않게 됩니다.

{{< img src="monitors/incidents/helper_text_settings.jpeg" alt="인시던트 도움말 텍스트 선언 설정" style="width:80%;">}}

인시던트 도움말 텍스트 선언 설정에서는 [인시던트 생성 모형(Incident Creation Modal)][3]의 중요도 및 상태 수준 설명과 함께 표시되는 도움말 텍스트를 맞춤 설정할 수 있습니다. 도움말 텍스트에는 마크다운 지원 기능이 있어 인시던트 응답기에 들여쓰기된 목록, 텍스트 포매팅 및 다른 안내 자원으로 연결되는 하이퍼링크 기능을 적용할 수 있습니다.

### 속성 필드

{{< img src="monitors/incidents/property_field_settings.jpeg" alt="속성 필드 설정" style="width:80%;">}}

속성 필드는 인시던트를 태그할 수 있는 메타데이터의 주요 요소입니다. 이 필드를 이용하면 [홈페이지][4]에서 특정 인시던트 하위 세트를 더 쉽게 검색하고 [인시던트 관리 분석(Incident Management Analytics)][2]에서 더 강력한 쿼리를 만들 수 있습니다. 속성 필드의 기본값은 5개 입니다.

1. `Root Cause`
2. `Services`
3. `Teams`
4. `Detection Method`
5. `Summary`

[Datadog APM][5]를 구성했다면 `Services` 속성 필드에서 APM Service 이름을 자동 활용합니다. `Services` 또는 `Teams`의 값을 수정하려면 각 필드에 연관지으려는 해당 값의 CSV를 업로드합니다. 해당 CSV 파일은 상위 행의 필드 이름으로 시작합니다. 그러면 즉시 원하는 값이 그 아래에로 목록화됩니다.

기존 `key:value` 쌍 [메트릭 태그][6] 중 하나를 선택하여 현재 설정에 속성 필드를 더 추가할 수 있습니다. 이렇게 할 경우, 속성 필드의 키는 메트릭스 태그 키의 시작 대/소문자(각 단어는 대문자화되며 빈 칸으로 구분됨)이며 속성 필드의 값은 메트릭스 태그에서 보고한 값과 동일합니다.

속성 필드는 필드가 인시던트 세부 정보 페이지의 [개요(Overview) 섹션][12]에 표시되는 곳과 일치하는 3개의 표로 구성됩니다.

1. `What Happened`
2. `Why It Happened`
3. `Attributes`

드래그 손잡이 아이콘을 사용하여 필드를 끌어 놓기하여 속성 필드를 다른 표로 이동시키거나 이 필드를 동일한 표에서 다시 정렬할 수 있습니다.

#### 속성 필드 및 필수 필드를 맞춤 설정합니다

<div class="alert alert-warning">
이 기능은 오픈 베타 단계입니다.
</div>

5개의 기본 필드와 메트릭스 태그에 기반한 필드 이외에 사용자 지정 속성 필드를 생성하고 인시던트 생성 시 이 필드를 필수 필드로 표시할 수 있습니다. 생성 가능한 사용자 지정 필드는 4개입니다.

1. *싱글-셀렉트*: 인시던트당 배정되는 값이 한 번에 하나만 가능한 드롭다운 필드. 값은 UI에서 즉시 또는 CSV 파일을 통해서 값을 업로드하여 사전 정의할 수 있습니다.
2. *멀티-셀렉트*: 인시던트당 배정되는 값이 여러 개인 드롭다운 필드. 값은 UI에서 즉시 또는 CSV 파일을 통해서 값을 업로드하여 사전 정의할 수 있습니다.
3. *텍스트 영역*: 자유 형식의 텍스트 상자. 반응자가 인시던트 기반으로 값을 입력할 수 있습니다.
4. *수*: 숫자와 하나의 마침표를만 입력 가능한 것으로 허용하는 텍스트 영역. 반응자가 인시던트 기반으로 값을 입력할 수 있습니다.

*싱글-셀렉트*, *멀티-셀렉트* 및 *수* 사용자 지정 필드는 [인시던트 홈페이지][4] 및 [인시던트 관리 분석][2]에서 검색 가능한 패싯으로 인시던트를 쉽게 필터링할 수 있습니다. *수* 필드는 인시던트 관리 분석의 측정값으로, [대시보드][13] 및 [노트북][11]에서 그래픽화되어 볼 수 있습니다.

### 응답자 유형

<div class="alert alert-warning">
이 기능은 오픈 베타 단계입니다.
</div>

{{< img src="monitors/incidents/responder_types_settings.png" alt="사용자 지정 응답자 유형 생성만 가능한 설정 섹션" style="width:80%;">}}

응답자 유형 설정에서는 사용자 지정 역할을 생성하여 [해당 인시던트 응답자에게 지정][16]하고 이런 역할이 인시던트당 한 사람 또는 여러 사람에 의해서 보유될 수 있는지 여부를 지정할 수 있습니다. 이런 역할은 [역할 기반 액세스 제어 (RBAC)][15] 시스템과 무관합니다. 응답자 유형에 따라 해당 응답자는 고유의 인시던트 응답 프로세스의 정의에 기반한 인시던트에서 맡은 의무가 무엇인지 이해할 수 있습니다. 기본적으로 다음과 같은 2개의 역할이 있습니다.

1. `Incident Commander` - 응답팀을 주도할 책임이 있는 개인 
2. `Responder` - 인시던트 조사 및 그 기본 문제 해결을 적극적으로 담당하는 개인.

**참고:** The `Incident Commander` 응답자 유형은 인시던터 설정에서 표시되므로 그 설명란을 사용자 지정할 수 있습니다. `Incident Commander`은(는) `One person role`을 변경할 경우 응답자 유형으로서 삭제하거나 이름 또는 상태를 지정할 수 없습니다. `Responder`  역할은 일반적인 대체 역할입니다. 단, 응답자가 달리 다른 역할로 지정되지 않고 인시던트 설정에서 표시되지 않아야 합니다.

사용자 지정 응답자 유형을 생성하려면:

1. 아래 표에서 **+ 응답자 유형 추가** 버튼을 클릭합니다.
2. 새 응답자 유형에 이름을 제공합니다.
3. 응답자 유형이 `One person role` 또는 `Multi person role`인지 선택합니다. `One person role`은(는) 인시던트당 한 명만 보유할 수 있으며 반면  `Multi person role`은(는) 인시던트당 무제한 사람들이 보유할 수 있습니다.
4. 응답자 유형에 설명을 제공합니다. 이 설명은 팀원에게 배정되는 역할을 선택한 경우 UI에 표시됩니다.
5. **Save**를 클릭합니다.

### 통합

{{< img src="monitors/incidents/integration_settings.jpeg" alt="통합 설정" style="width:80%;">}}

통합 설정에서는 Datadog [Slack App][7]의 인시던트 관리 기능 설정에 대해 추가 구성을 제공합니다. 구성할 수 있는 설정은 두 가지입니다.

1. 새 인시던트마다 Slack 채널 자동 생성 및 해당 채널에 이름 지정 템플릿을 활성화하기
2. 인시던트 업데이트 채널을 활성화하기

조직의 [Slack 통합 제목][8]에서 구성한 Slack 워크스페이스를 사용하기 위해 이 설정 중 하나를 구성할 수 있습니다.

기본적으로 전용 인시던트 채널은 해당 이름 템플릿으로 `incident-{public_id}`을(를) 사용합니다.

`incident` 접두사는 *소*문자, 숫자 및 대시로 구성된 스트링으로 변경할 수 있습니다. Datadog에서는 채널 이름을 지을 때 접두사를 Slack이 정해 놓은 80자 한도에 맞춰 유지하도록 권고합니다. `{public_id}`이외에 채널  이름 템플릿에 변수로 `{date_created}` 및 `{title}` 등을 추가할 수 있습니다.

**참조**:

- 채널 이름 템플릿을 변경한다고 해도 기존의 인시던트 채널의 이름이 다시 지정되지는 않습니다. 이 새 이름 템플릿은 새 채널에만 적용됩니다.
- `{public_id}`을(를) 선택 취소 선택하는 경우 두 개의 인시던트에 중복된 채널 이름이 있을 수 있습니다. 이럴 경우 Datadog Slack App은 채널 이름의 끝에 임의적으로 소문자 또는 숫자를 자동 추가하여 채널 생성 과정이 실패하는 것을 방지합니다.
- `{title}`을(를) 체크하는 것을 선택할 경우, Datadog Slack App에서 인시던트의 제목이 변경될 경우 해당 채널의 이름을 자동 지정합니다.

인시던트 업데이트 채널은 인시던트가 선언되거나 상태, 중요도, 또는 인시던트 명령자를 변경할 때마다 메시지를 전송합니다.

## 알림

### 메시지 템플릿

{{< img src="monitors/incidents/message_templates_settings.jpeg" alt="메시지 템플릿 설정" style="width:80%;">}}

메시지 템플릿은 [수동 인시던트 알림][9] 또는 자동화된 알림 규칙에서 사용 가능한 역동적이며 재사용가능한 메시지입니다. 메시지 템플릿은 `{{incident.severity}}`와 같은 템플릿 변수를 활용하여 알림이 전송되는 대상 인시던트의 해당 값을 역동적으로 주입할 수 있습니다. 메시지 템플릿에는 마크다운 지원 기능이 있어 인시던트 알림에 텍스트 포매팅, 표, 들여쓴 목록, 하이퍼링크 등이 포함될 수 있습니다. 다량의 메시지 템플릿을 더 잘 구성하려면 생성하는 동안 각 템플릿에 범주가 필요합니다.  

메시지 템플릿을 생성하려면:

1. **+ 새 메시지 템플릿** 버튼을 클릭합니다
2. 템플릿에 이름을 부여합니다
3. 템플릿에 새 범주 또 기존 범주를 지정합니다
4. 템플릿에 주제 라인(이메일용)을 부여합니다
5. 템플릿의 메시지를 작성합니다
6. **Save**를 클릭합니다

**Note:** 템플릿 변수는 메시지의 제목 및 본문에서 지원됩니다.

### 규칙

{{< img src="monitors/incidents/notification_rules_example.jpeg" alt="알림 규칙의 예" style="width:80%;">}}

알림 규칙을 사용하면 특정 이해 관계자에게 하나의 인시던트가 자동 고지되는 시나리오를 구성할 수 있습니다. 알림 규칙을 사용하여 주요 이해 관계자에게 우선순위가 높은 인시던트를 항상 알려줄 수 있도록 보장하거나, 새 인시던트를 선언 또는 업데이트할 때 이를 외부 시스템에 알리거나, 또는 특정 서비스 또는 팀이 인시던트를 경험할 때 특정 응답자에게 알릴 수 있습니다. 

**예:** `service:web-store` 및 `application:purchasing` 인시던트에 대한 SEV-1 또는 SEV-2가 선언될 때마다 그리고 이 인시던트가 서로 다른 진행 상태로 이동할 때 팀 이해관계자들에게 이를 자동으로 알리려면 알림 규칙을 설정합니다.

새 알림 규칙을 구성하려면:

1. **New Rule**을 클릭합니다.
2. **For incidents matching...** 항목에서는 알림을 전송하려는 인시던트 속성 필드 `key:value` 쌍을 선택합니다. 기본적으로 이 필터는 비어 있으며 알림 규칙은 인시던트가 있을 때마다 트리거됩니다.
3. **Notify**: 알림 수신자를 선택합니다. 알림은 Datadog의 기존 [알림 통합][10] 대상이라면 어디든지 전송될 수 있습니다. 수신자의 모바일 기기에 알리고 싶다면 **(Mobile Push Notification)**를 포함하는 수신자의 이름에 옵션을 선택합니다. 수신자는 표시되는 이 옵션을 위해 [Datadog 모바일 앱][14]에서 알림을 미리 활성화해야 합니다.
4. **With Template**: 사용할 알림 규칙에 원하는 메시지 템플릿을 선택합니다.
5. **Renotify on updates to**: 어떤 인시던트 속성에서 재알림을 트리커시킬 것인지 선택합니다. 선택한 속성 가운데 하나 이상이 변경될 때마다 새 알림이 전송됩니다.  단, 필터에 이미 있는 속성은 재알림할 수 없습니다. (상기 2단계 참조).
6. **Save**를 클릭합니다

알림 규칙을 관리하려면 다음 작동을 수행할 수 있습니다.

- *Search* - 알림 규칙 목록을 수신자별로 필터링합니다.
- *Toggle* - 목록에서 해당 규칙 열의 토글을 전환하여 개별 알림 규칙을 사용 또는 비활성화합니다.
- *Copy* - 개별 알림 규칙을 마우스로 가리켜 규칙의 토글 옆에 있는 **Copy** 아이콘 버튼을 클릭합니다.
- *Delete* - 개별 알림 규칙을 마우스로 가리켜 규칙의 토글 옆에 있는 **Delete** 아이콘 버튼을 클릭합니다.

{{< img src="monitors/incidents/notification_rules_list.jpeg" alt="알림 규칙 목록" style="width:80%;">}}

## 복구

### 포스트모템 템플릿

{{< img src="monitors/incidents/postmortem_template_settings.jpeg" alt="포스트모템 템플릿 설정" style="width:80%;">}}

포스트모템 템플릿은 인시던트가 해결된 이후 인시던트 정보가 자동 표시되는 [Datadog Notebook][11]을 생성하고자 사용되는 역동적이며 재사용 가능한 템플릿입니다. 포스트모템 템플릿은 `{{incident.severity}}`와 같은 템플릿 변수를 활용하여 포스트모템이 생성되는 대상 인시던트에서 상응하는 값을 역동적으로 주입합니다. 포스트모템 템플릿에는 마크다운(Markdown) 지원 기능이 있어 결과적으로 생성되는 노트북에 텍스트 포매팅, 표, 들여쓴 목록, 하이퍼링크 등이 포함됩니다.

포스트모템 템플릿을 생성하려면:

1. **+ 새 포스트모템 템플릿** 버튼을 클릭합니다
2. 템플릿에 이름을 부여합니다
3. 템플릿의 콘텐츠를 작성합니다(제공되는 템플릿 변수는 텍스트상자의 오른쪽에 나열되어 있음)
4. (선택) 템플릿을 기본으로 설정합니다 
5. **Save**를 클릭합니다

[1]: https://app.datadoghq.com/incidents/settings
[2]: /kr/monitors/incident_management/analytics
[3]: /kr/monitors/incident_management/#from-the-incidents-page
[4]: https://app.datadoghq.com/incidents
[5]: /kr/tracing/
[6]: /kr/getting_started/tagging/using_tags/?tab=assignment#metrics
[7]: /kr/integrations/slack/?tab=slackapplicationus#using-datadog-incidents
[8]: https://app.datadoghq.com/account/settings#integrations/slack
[9]: /kr/monitors/incident_management/incident_details/#notifications-section
[10]: /kr/monitors/notifications/?tab=is_alert#notify-your-team
[11]: /kr/notebooks/
[12]: /kr/monitors/incident_management/incident_details/#overview-section
[13]: /kr/dashboards/
[14]: /kr/mobile/
[15]: /kr/account_management/rbac/?tab=datadogapplication#pagetitle
[16]: /kr/monitors/incident_management/incident_details/#response-team-section