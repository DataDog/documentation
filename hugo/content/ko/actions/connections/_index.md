---
aliases:
- /ko/workflows/connections
- /ko/workflows/setup
- /ko/service_management/workflows/connections
- /ko/service_management/app_builder/connections
description: 작업용 연결
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: 설명서
  text: Workflow Automation 시작
- link: /actions/app_builder/
  tag: 설명서
  text: App Builder 문서
- link: https://learn.datadoghq.com/courses/automating-meaningful-actions
  tag: 학습 센터
  text: Datadog Workflow Automation으로 의미 있는 작업을 자동화하기
- link: https://learn.datadoghq.com/courses/app-builder-integration
  tag: 학습 센터
  text: App Builder를 사용하여 타사 통합을 위한 셀프 서비스 앱 빌드
title: 연결
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">작업, 워크플로 및 앱은 Datadog for Government 리전 외부의 타사 서비스로 고객 데이터를 전송하는 연결을 사용할 수 있습니다. 고객 책임 매트릭스를 확보하는 방법과 Datadog for Government 리전에 대한 추가 정보는 <a href="https://trust.datadoghq.com">Trust Center</a>를 참조하세요.</div>
{{< /site-region >}}

작업은 외부 소프트웨어 시스템과 연결되므로, 해당 통합에 Datadog 계정을 인증해야 할 수 있습니다. 앱이나 워크플로는 인증이 필요한 모든 작업이 Datadog 계정의 신원을 확인할 수 있는 경우에만 성공적으로 실행될 수 있습니다. Datadog에 권한을 부여할 때는 보안 모범 사례를 따르고 앱이나 워크플로 실행에 필요한 권한만 부여하세요.

작업은 다음 두 가지 방법으로 인증할 수 있습니다.
- 통합 타일에서 설정한 자격 증명 및 권한
- 연결 자격 증명

## 통합 타일 자격 증명 {#integration-tile-credentials}

다음 Datadog 통합 타일에서 설정한 자격 증명 및 계정 인증은 워크플로 또는 앱의 다음 해당 작업으로 자동 전파됩니다.

- GitHub
- Jira
- Microsoft Teams
- Opsgenie
- PagerDuty
- Slack
- Statuspage

[Datadog 통합][6] 지침에 따라 통합 타일을 설정합니다.

설정해야 하는 통합 주소가 위에 명시되어 있지 않으면 연결 자격 증명을 설정하세요.

## 연결 자격 증명 {#connection-credentials}

연결은 설치된 통합을 확장하여 워크플로 단계의 인증을 제어할 수 있도록 합니다. 연결 자격 증명을 사용하여 [일반 작업][8] 또는 통합 타일에서 인증을 제공하지 않는 모든 작업을 인증하세요. 통합 타일로 인증을 수행하는 통합 목록은 [통합 타일 자격 증명](#integration-tile-credentials) 섹션을 참조하세요. 연결 자격 증명은 Workflow Automation 및 App Builder 제품 내에서만 사용할 수 있습니다.

연결은 다음 사용 예시를 지원합니다.
- 필요한 통합은 기본 제공되는 연결로 사용할 수 없습니다.
- 사용자 지정 작업을 인증하려고 합니다. 예를 들어, 자체 서비스와 함께 HTTP 작업을 사용해야 합니다.
- 필요한 권한(예: AWS 쓰기 권한)이 통합에서 지원되지 않습니다.
- 예를 들어 특정 워크플로에 대한 사용자 액세스를 제한하는 등 세분화된 액세스 제어가 필요합니다.

### 연결 보안 고려 사항 {#connection-security-considerations}

연결을 생성하기 전에 필요한 작업을 수행하는 데 필요한 권한에 대해 고려하고 해당 작업을 수행하는 데 필요한 권한만 연결에 부여합니다. 또한 연결을 사용해야 하는 사용자만 연결할 수 있도록 제한합니다.

가능한 경우, 서로 다른 워크플로 또는 앱에 대해 세부적인 연결을 사용하세요. 예를 들어, Amazon S3 버킷에 쓰기를 수행하는 워크플로와 Amazon EC2 인스턴스를 종료하는 앱이 있는 경우, 두 작업에 동일한 연결을 사용하지 마세요. 대신, 각각 제한된 범위의 IAM 역할에 해당하는 두 개의 개별 연결을 생성하세요.

## 연결 사용 {#work-with-connections}

### 연결 보기 {#view-connections}

1. [Workflow Automation 페이지][2] 또는 [App Builder 페이지][14]에서 {{< ui >}}Connections{{< /ui >}} 탭을 클릭합니다. 연결 목록이 열립니다.
1. 연결 세부 정보를 보려면 한 줄을 클릭합니다.

### 연결 생성 {#create-a-connection}

연결을 생성하려면 다음 정보가 필요합니다.
- 연결할 대상(예: 제품 이름, URL)
- 인증 방법(예: API 키, 사용자 이름/비밀번호, OAuth)

다음에 따라 연결을 생성합니다.
1. [Workflow Automation 페이지][2] 또는 [App Builder 페이지][14]에서 {{< ui >}}Connections{{< /ui >}} 탭을 클릭합니다. 연결 목록이 열립니다.
1. 오른쪽 상단에 있는 {{< ui >}}New Connection{{< /ui >}} 버튼을 클릭합니다. {{< ui >}}New Connection{{< /ui >}} 대화 상자가 나타납니다.
1. 아이콘을 클릭하여 통합 스키마를 선택합니다.
1. 적절한 필드를 입력합니다. <div class="alert alert-info">나중에 연결 그룹에 연결을 추가하려면 하나 이상의 [식별자 태그](#connection-identifier-tags)를 추가합니다.</div>
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

또는 워크플로나 앱 페이지에서 다음과 같이 연결을 추가합니다.


{{< tabs >}}
{{% tab "Workflow Automation" %}}
1. [Workflow Automation 목록][1]으로 이동합니다.
1. 자격 증명을 추가하려는 작업이 포함된 워크플로를 선택합니다. 워크플로 빌더가 나타납니다.
1. 워크플로 시각화에서 자격 증명을 추가하려는 작업을 클릭합니다. 오른쪽 사이드 패널에 작업 세부 정보가 표시됩니다.
1. {{< ui >}}Configure{{< /ui >}} 탭 아래에서 {{< ui >}}Connection{{< /ui >}} 드롭다운을 찾아 {{< ui >}}\+{{< /ui >}} 아이콘을 클릭합니다.
1. {{< ui >}}New Connection{{< /ui >}} 대화 상자에서 연결 이름을 지정하고 필요한 인증 세부 정보를 입력합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

[1]: https://app.datadoghq.com/workflow
{{% /tab %}}

{{% tab "App Builder" %}}
1. [App Builder 앱 목록][1]으로 이동합니다.
1. 자격 증명을 추가하려는 작업이 포함된 앱을 선택합니다. 앱 캔버스가 나타납니다.
1. 오른쪽 상단의 {{< ui >}}Edit{{< /ui >}}를 클릭합니다.
1. 왼쪽의 {{< ui >}}Data{{< /ui >}} 아래에서 자격 증명을 추가하려는 작업을 클릭합니다. 왼쪽 사이드 패널에 작업 세부 정보가 표시됩니다.
1. {{< ui >}}Connection{{< /ui >}} 드롭다운을 찾아 {{< ui >}}\+{{< /ui >}} 아이콘을 클릭합니다.
1. {{< ui >}}New Connection{{< /ui >}} 대화 상자에서 연결 이름을 지정하고 필요한 인증 세부 정보를 입력합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

[1]: https://app.datadoghq.com/app-builder
{{% /tab %}}
{{< /tabs >}}

아래 예시는 OpenAI 연결을 위한 {{< ui >}}New Connection{{< /ui >}} 대화 상자를 보여줍니다. 각 연결에는 서로 다른 인증 정보가 필요합니다. OpenAI 연결에는 유효한 연결 이름과 API 토큰이 필요합니다.

{{< img src="actions/connections/new-connection-2.png" alt="OpenAI 연결을 위한 새 연결 대화 상자" >}}

### 연결 편집 {#edit-a-connection}

1. [Workflow Automation 페이지][2] 또는 [App Builder 페이지][14]에서 {{< ui >}}Connections{{< /ui >}} 탭을 클릭합니다. 연결 목록이 열립니다.
1. 편집하려는 연결 위에 마우스를 올려놓습니다. 그러면 {{< ui >}}Edit{{< /ui >}}, {{< ui >}}Permissions{{< /ui >}}, {{< ui >}}Delete{{< /ui >}} 아이콘이 오른쪽에 나타납니다.
1. 연필({{< ui >}}Edit{{< /ui >}}) 아이콘을 클릭합니다. 대화 상자가 나타납니다.
1. 변경하려는 필드를 업데이트합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

### 연결 삭제 {#delete-a-connection}

1. [연결 목록][3]으로 이동합니다.
1. 삭제하려는 연결 위에 마우스를 올려놓습니다. 그러면 {{< ui >}}Edit{{< /ui >}}, {{< ui >}}Permissions{{< /ui >}}, {{< ui >}}Delete{{< /ui >}} 아이콘이 오른쪽에 나타납니다.
1. 휴지통({{< ui >}}Delete{{< /ui >}}) 아이콘을 클릭합니다. 'Are you sure?'라는 텍스트가 표시됩니다.
1. {{< ui >}}Delete{{< /ui >}}를 선택합니다.

### 연결 사용 제한 {#restrict-connection-use}

연결 사용을 제한하는 방법을 알아보려면 [Workflow Automation][12] 또는 [App Builder][15]의 액세스 및 인증을 참조하세요.

## HTTP 연결 {#http-connection}

임의의 서비스에 연결하려면 HTTP 연결 유형을 사용하세요. 인증 옵션 및 설정 지침은 [HTTP 작업][10]을 참조하세요.

## 연결 식별자 태그 {#connection-identifier-tags}

연결에 식별자 태그를 추가할 수 있습니다. 연결에 대한 태그 지정 규칙은 [Datadog 태그][13]를 기반으로 하며, 다음과 같은 추가 요구 사항이 있습니다.
- 식별자 태그는 `tag:value` 형식을 따라야 하며, 추가 콜론은 허용되지 않습니다. 예를 들어, 식별자 태그 `env:staging:east`와 `env`는 연결 태그로 사용할 수 없는 형식입니다.
- 식별자 태그는 문자로 시작해야 하며, 그 뒤에는 다음을 포함할 수 있습니다.
    - 영숫자
    - 밑줄
    - 하이픈
    - 슬래시
    - 정확히 하나의 콜론
- `default`는 연결 식별자 태그의 예약된 값입니다. 독립형 태그 키나 태그 값으로 사용할 수 없습니다. 예를 들어, `default:yes`와 `aws:default`는 연결 태그로 사용할 수 없습니다.

## 연결 그룹 {#connection-groups}

워크플로와 앱이 주어진 입력에 따라 올바른 계정으로 인증할 수 있도록 연결 그룹을 만들 수 있습니다. 연결은 동일한 통합을 공유하는 경우에만 그룹화할 수 있습니다(예: 동일한 그룹 내에서 GCP 및 AWS 연결을 그룹화할 수 없음).

연결 그룹의 멤버는 연결의 _식별자 태그_를 사용하여 정의합니다. 예를 들어, `account_id` 태그가 있는 AWS 계정으로 구성된 연결 그룹을 만들 수 있습니다.

워크플로가 런타임에 올바른 연결을 동적으로 선택할 수 있도록 그룹의 각 연결에는 고유한 식별자 태그 세트가 있어야 합니다. 예를 들면 다음과 같습니다.
- `connectionA {account_id:123456789}`와 `connectionB {account_id:987654321}`는 함께 그룹화할 수 있습니다.
- `connectionA {account_id:123456789}` `connectionC {account_id:123456789}`는 그룹에 중복된 태그 값이 포함되므로 그룹화할 수 없습니다.

### 연결 그룹 생성{#create-a-connection-group}

<div class="alert alert-info">연결에 대한 <a href="/actions/workflows/access_and_auth/#restrict-access-on-a-specific-connection">Resolver 권한</a>이 있는 경우에만 그룹에 연결을 추가할 수 있습니다.</div>

연결 그룹을 생성하려면 다음 단계를 따르세요.

1. [연결 목록][3]으로 이동합니다.
1. 왼쪽에서 {{< ui >}}Groups{{< /ui >}}를 클릭합니다.
1. {{< ui >}}+ New Group{{< /ui >}}을 클릭한 다음 통합을 선택합니다.
1. 그룹 이름을 입력한 다음 그룹에 포함하려는 연결이 모두 공통으로 가진 {{< ui >}}Identifier Tags{{< /ui >}}를 최대 3개 입력합니다.
1. {{< ui >}}Confirm Group{{< /ui >}} 아래에서 확인란을 사용하여 그룹의 특정 구성원을 선택합니다.
1. {{< ui >}}Next, Confirm Access{{< /ui >}}를 클릭한 다음 그룹에 대해 원하는 액세스 수준을 선택합니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

### 연결 그룹 사용{#use-a-connection-group}

연결 그룹을 사용하려면 다음 단계를 따르세요.

1. 워크플로 또는 앱에서 연결이 필요한 작업을 선택합니다.
1. {{< ui >}}Connection{{< /ui >}} 필드의 드롭다운에서 {{< ui >}}Groups{{< /ui >}} 아래에 있는 원하는 연결 그룹을 선택합니다.
1. 연결 그룹 {{< ui >}}Identifiers{{< /ui >}}에 대해 원하는 값을 입력합니다. 예를 들어, 연결 그룹이 `env` 식별자 태그를 사용하여 정의되고 `prod`와 `staging`라는 두 가지 환경이 있는 경우, 해당 값 중 하나(또는 해당 값 중 하나로 평가되는 표현식)를 사용할 수 있습니다.
1. 기타 필요한 단계 값을 입력한 다음 {{< ui >}}Save{{< /ui >}}를 클릭합니다.

**참고**: 해당 연결에 대한 [Resolver 권한][12]이 있는 경우에만 그룹 내의 연결을 사용할 수 있습니다. 워크플로 또는 앱이 Resolver 권한이 없는 연결을 사용하려고 하면 `403 Forbidden` 오류와 함께 실패합니다. 이 문제를 해결하려면 다음을 수행할 수 있습니다.
- 워크플로 또는 앱이 Resolver 권한이 없는 연결을 가리킬 수 없도록 구성하세요.
- 연결 그룹에서 Resolver 권한이 없는 연결을 제거하세요. <div class="alert alert-warning">여러 워크플로 또는 여러 앱에 연결 그룹을 사용하는 경우, 다른 워크플로가 의존하는 연결을 제거하면 해당 워크플로가 실패하게 됩니다.</div>

### 연결 그룹 업데이트 {#update-a-connection-group}

연결 그룹에 대한 편집 권한이 있는 경우 다음 속성을 업데이트할 수 있습니다.
- 그룹 이름
- 식별자 태그(비워둘 수 없지만 완전히 교체할 수는 있음)
- 연결(그룹은 비어 있을 수 있음)

### 연결 그룹 삭제 {#delete-a-connection-group}

연결 그룹을 삭제하려면 다음 단계를 따르세요.

1. 삭제하려는 그룹 위에 마우스를 올리고 {{< ui >}}delete (trash can){{< /ui >}} 아이콘을 클릭합니다.
1. {{< ui >}}Delete{{< /ui >}}를 클릭합니다.

<div class="alert alert-danger">연결 그룹을 삭제하면 해당 그룹을 사용하는 모든 워크플로 및 앱에 영향을 미칩니다.</div>

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog 커뮤니티 Slack][11]의 **#workflows** 또는 **#app-builder** 채널에 참여하세요.

[2]: https://app.datadoghq.com/workflow
[3]: https://app.datadoghq.com/workflow/connections
[6]: /ko/integrations/
[8]: /ko/actions/workflows/actions/
[9]: https://app.datadoghq.com/workflow
[10]: /ko/actions/connections/http/
[11]: https://chat.datadoghq.com/
[12]: /ko/actions/workflows/access_and_auth/#restrict-access-on-a-specific-connection
[13]: /ko/getting_started/tagging/
[14]: https://app.datadoghq.com/app-builder/
[15]: /ko/actions/app_builder/access_and_auth/#restrict-access-to-a-specific-connection