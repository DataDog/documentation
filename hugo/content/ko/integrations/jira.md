---
categories:
- collaboration
- developer tools
- issue tracking
- notifications
custom_kind: 통합
dependencies: []
description: 본 통합에서는 Datadog에서 트리거된 알림에서 티켓을 생성하고, 새로운 정보가 생성되면 기존 티켓을 업데이트할 수 있습니다.
  또한 Datadog 내에서 Jira 티켓을 이벤트로 생성하여 모든 메트릭과 오버레이하여 확인할 수 있습니다.
doc_link: https://docs.datadoghq.com/integrations/jira/
draft: false
git_integration_title: jira
has_logo: true
integration_id: ''
integration_title: Jira
integration_version: ''
is_public: true
manifest_version: '1.0'
name: jira
public_title: Datadog-Jira 통합
short_description: ' Datadog 알림을 자동 생성하고 나중에 Jira 티켓을 업데이트하도록 설정합니다.'
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Jira는 소프트웨어 팀을 위한 이슈 및 프로젝트 추적 시스템입니다. Datadog Jira 통합을 사용하면 Datadog에서 트리거된 알림, 인시던트 및 케이스에서 이슈를 생성하고 Jira에서 Datadog 이벤트로 생성한 이슈를 확인할 수 있습니다.

## 설정

### Jira에서 애플리케이션 링크 생성하기

#### Jira Cloud 지침
1. Jira로 이동합니다.
1. 오른쪽 코너의 톱니바퀴 아이콘을 클릭하고 **제품**을 선택합니다.
1. **통합**의 왼쪽 메뉴에서 **애플리케이션 링크**를 클릭한 후 **링크 생성하기**를 클릭합니다.
1. **애플리케이션 다이렉트 링크** 확인란을 선택하고 `https://{{< region-param key="dd_full_site" code="true" >}}` URL을 입력한 후 **계속하기**를 클릭합니다.
1. "입력한 URL에서 응답이 수신되지 않았습니다" 경고를 무시하고 **계속하기**를 클릭합니다.
1. 다음 양식을 작성하고 **계속하기**를 클릭합니다.

    | 필드                 | 입력값                          |
    |-----------------------|--------------------------------|
    | 애플리케이션 이름      | `{Enter a name (e.g. Datadog)}`|
    | 애플리케이션 유형      | 일반 애플리케이션            |
    | 서비스 공급자 이름 | `{leave blank}`                |
    | 컨슈머 키          | `{leave blank}`                |
    | 공유 기밀정보         | `{leave blank}`                |
    | 토큰 URL 요청     | `{leave blank}`                |
    | 액세스 토큰 URL      | `{leave blank}`                |
    | URL 인증        | `{leave blank}`                |
    | 수신 링크 생성  | 박스 체크 표시                 |

1. 다음 양식을 작성하고 **계속**을 클릭합니다. [Datadog Jira 통합 타일][1]에서 공개 키를 찾으려면 **계정 추가**를 클릭합니다.

    | 필드         | 입력값                                                      |
    |---------------|------------------------------------------------------------|
    | 컨슈머 키  | `{Enter a key name (e.g. datadog)}`                        |
    | 컨슈머 이름 | Datadog                                                    |
    | 공개 키    | `{Enter the public key from Datadog Jira integration tile}`|

#### Jira Data Center 지침
1. Jira로 이동합니다.
1. 오른쪽 코너의 톱니바퀴 아이콘을 클릭하고 **어플리케이션**을 선택합니다.
1. **통합**의 왼쪽 메뉴에서 **애플리케이션 링크**를 클릭한 후 **링크 생성하기**를 클릭합니다.
1. **링크 생성하기** 대화상자에서 **Atlassian 제품**을 선택하고 애플리케이션 URL `https://{{< region-param key="dd_full_site" code="true" >}}`을 입력합니다. **계속**을 클릭합니다.
1. "입력한 URL에서 응답이 수신되지 않았습니다" 경고를 무시하고 **계속하기**를 클릭합니다.
1. 위의 Jira Cloud 지침에 표시된 것과 동일한 파라미터 을 사용하여 양식을 작성합니다.

### Jira 인스턴스에 Datadog 연결

<div class="alert alert-info">
Datadog은 좀 더 일관된 최적의 결과를 위해 통합 전용(비개인용) Jira 서비스 계정을 사용할 것을 적극 권장합니다.
</div>

1. [Datadog Jira 통합 타일][1]로 이동하여 **계정 추가**를 클릭합니다.
2. Jira 인스턴스의 URL과 기존에 생성한 애플리케이션 링크의 컨슈머 키를 입력합니다.
3. **연결**을 클릭하고 Jira 인증 페이지의 지침을 따릅니다. **연결**을 누르기 전에 이 계정에 로그인하세요.
**참고**: Datadog Jira 통합은 온-프레미스/Jira Data Center 인스턴스에 연결할 수 있습니다. 그러나 해당 인스턴스 중의 상당수는 IP 범위를 블랙리스트에 올립니다. 본 통합이 작동하려면 다음 IP 필터링 지침을 따르세요.

### IP 필터링

Jira 인스턴스가 IP 주소로 트래픽을 필터링하는 경우 **웹훅(Webhooks)**의 연결을 허용해야 합니다. 
통합이 제대로 작동하려면 Datadog에 속한 IP 접두어가 필요합니다. 고객님의 지역의 **웹훅(Webhooks)** IP 접두어 목록에 관해서는 [Datadog IP 범위][2]를 참조하세요.

### 추가 설정

케이스 관리에서 양방향 동기화로 Jira 이슈 자동 생성을 설정하려면 [Jira 웹훅(webhook) 설정](#configure-a-jira-webhook) 및 [사례 관리][3] 설명서 지침을 참조하세요. 

Datadog 모니터링 알림에서 Jira 이슈를 생성하려면 [이슈 템플릿 설정](#configure-an-issue-template)을 참조하세요.

## Jira 웹훅(webhook) 설정하기

웹훅(webhook)을 설정하면 케이스 관리에서 생성한 케이스가 Jira에서 자동으로 이슈를 생성하고 두 리소스를 동기화하도록 할 수 있습니다.

Jira 웹훅(webhook)을 생성하려면 다음을 따릅니다.
1. Jira에서 오른쪽 상단의 **톱니바퀴** 아이콘을 클릭하고 **시스템**을 선택합니다.
1. 왼쪽 메뉴의 *고급*에서 **웹훅(webhook)**을 클릭합니다.
1. 오른쪽 모서리의 **웹훅(webhook) 생성하기**를 클릭합니다.
1. 웹훅(webhook) 이름으로 `Datadog Webhook`을 입력합니다.
1. 상태를 **활성화**로 둡니다.
1. [Datadog Jira 통합 타일][4]로 이동합니다.
1. 웹훅(Webhooks) 섹션에서 웹훅 URL을 복사합니다.
1. Jira로 다시 돌아가 *URL*에 웹훅(Webhook) URL을 붙여넣습니다.
1. 다음 이슈 관련 이벤트를 활성화합니다. 이슈 이벤트의 하위 집합만 전송하려는 경우 JQL을 사용하여 다음을 필터링합니다. 본 예시에서는 프로젝트 AB 및 CD에 대해서만 필터링합니다.
    {{< img src="integrations/jira/jira_issue_events.png" alt="Jira 이슈 이벤트" style="width:80%;">}}
1. `deleted` 프로젝트 관련 이벤트를 활성화합니다.
1. 나머지 항목은 선택하지 않습니다.
1. 페이지 하단의 **생성하기기** 버튼을 클릭합니다.

## 이슈 템플릿 설정하기

이슈 템플릿은 Jira에서 Datadog 알림 이벤트로부터 이슈를 생성하는 방법을 정의합니다.

이슈 템플릿을 생성하려면 다음에 따릅니다.

1. Datadog에서 **Jira에 연결하여 알림 모니터링** 섹션의 **새 이슈 템플릿**을 클릭합니다.
2. 이슈 템플릿의 이름을 입력합니다. 이름 앞에 `jira-`가 붙으면 모니터링에서 알림을 보낼 때 사용할 수 있는 핸들(예: `jira-my-issue-template-name`)이 됩니다.
3. Jira 계정을 선택합니다.
4. 프로젝트와 이슈 유형(예: **스토리**, **에픽**, **작업** 또는 **버그**)을 선택합니다.
5. 설정 가능한 필드의 목록이 표시됩니다. 원하는 필드에 값을 입력하고 **저장**을 클릭합니다.

### 이슈 필드 설정하기

이슈 템플릿 필드는 Jira에서 이슈를 생성할 때 포함되는 데이터를 정의합니다. 예를 들어, 템플릿을 설정하여 특정 우선 순위 또는 기본 할당자가 있는 이슈를 생성합니다.

알림 이벤트의 데이터를 사용하여 `${EVENT_TITLE}` 등의 템플릿 변수를 사용하여 이슈 필드의 값을 채울 수 있습니다. 사용 가능한 변수의 목록을 확인하려면 [Datadog 웹훅(Webhook) 통합][5]을 참조하세요. 

## 사용법

#### Datadog 알림에서 이슈 자동 생성하기

Datadog 알림 이벤트에서 Jira 이슈를 생성하려면, **팀에 알리기** 또는 **상황 설명** 섹션에서 모니터링을 만들 때 `@jira-my-issue-template`과 같은 하나 이상의 이슈 템플릿의 알림 핸들을 입력합니다.

이슈는 모니터링이 트리거되면 생성됩니다. 해당 모니터링이 해결될 때까지 모니터링은 신규 이슈를 생성하지 않습니다.

## 수집한 데이터

### 메트릭

Jira 통합은 메트릭을 포함하지 않습니다.

### 이벤트

생성된 모든 Jira 이슈는 Datadog 내에서 이벤트로 표시됩니다.

### 서비스 점검

Jira 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][6]에 문의하세요.

[1]: https://app.datadoghq.com/integrations/jira
[2]: https://docs.datadoghq.com/ko/api/latest/ip-ranges/
[3]: https://docs.datadoghq.com/ko/service_management/case_management/settings/#jira
[4]: https://app.datadoghq.com/account/settings#integrations/jira
[5]: https://docs.datadoghq.com/ko/integrations/webhooks/
[6]: https://docs.datadoghq.com/ko/help/