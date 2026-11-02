---
aliases:
- /ko/service_management/app_builder/auth
- /ko/actions/app_builder/auth
description: App Builder용 액세스 및 인증
title: 액세스 및 인증
---
몇 가지 도구로 앱과 구성 요소에 대한 액세스 및 인증을 제어합니다.

## 앱 실행 ID {#app-execution-identity}

게시된 앱은 작성자의 Datadog 사용자 ID 또는 앱과 연결된 서비스 계정을 사용하여 실행됩니다. 작성자는 {{< ui >}}All Apps{{< /ui >}} 보기와 {{< ui >}}App Properties{{< /ui >}} 보기에 모두 표시됩니다.

편집 모드에서 앱은 현재 편집 중인 사용자의 자격으로 실행됩니다.

### 서비스 계정 사용하기 {#use-a-service-account}

서비스 계정을 앱과 연결하여 앱 실행 시 앱의 ID 역할을 하도록 할 수 있습니다. 서비스 계정은 다음을 수행할 수 있습니다.
- 런타임 시 앱 쿼리에 정의된 연결을 확인합니다.
- 앱 실행을 위한 ID를 제공합니다.
- 앱 [감사 추적][7]용 ID를 제공합니다.

앱용 서비스 계정을 생성하려면 Datadog Admin 역할이 있거나 {{< ui >}}Service Account Write{{< /ui >}} 권한이 있는 사용자 지정 역할이 있어야 합니다. 생성하는 서비스 계정은 사용자의 역할 및 권한을 채택합니다. 서비스 계정 및 권한에 대한 자세한 내용은 [서비스 계정][2] 또는 [역할 기반 액세스 제어][3]를 참조하세요.

#### 서비스 계정으로 실행되도록 앱 구성하기 {#configure-your-app-to-run-as-a-service-account}

1. 톱니바퀴({{< ui >}}Settings{{< /ui >}}) 아이콘을 클릭합니다.
1. {{< ui >}}Manage app identity{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Run as Service Account{{< /ui >}}를 선택합니다.
1. 서비스 계정 사용자에 대한 역할을 선택하거나 기존 서비스 계정을 선택합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭하여 서비스 계정을 저장하고 변경 사항을 적용합니다.

앱을 실행하면 서비스 계정 사용자가 앱 쿼리에 정의된 연결을 확인합니다. 따라서 서비스 계정 사용자는 `connections_resolve` 권한이 필요합니다. Datadog Admin 역할과 Datadog Standard 역할에는 `connections_resolve` 권한이 포함되어 있습니다.

#### 서비스 계정 세부 사항 보기 {#view-service-account-details}

1. 톱니바퀴({{< ui >}}Settings{{< /ui >}}) 아이콘을 클릭합니다.
1. {{< ui >}}Manage app identity{{< /ui >}}를 선택합니다.
1. *Run As* 옆에 있는 서비스 계정을 클릭합니다.

#### 앱과 연결된 서비스 계정 삭제하기 {#remove-a-service-account-associated-with-an-app}

1. 톱니바퀴({{< ui >}}Settings{{< /ui >}}) 아이콘을 클릭합니다.
1. {{< ui >}}Manage app identity{{< /ui >}}를 선택합니다.
1. {{< ui >}}Remove service account{{< /ui >}}를 클릭합니다.

## 액션 자격 증명 {#action-credentials}

앱 [액션][1]은 외부 소프트웨어 시스템과 연결되므로, 해당 통합에 Datadog 계정을 인증해야 할 수 있습니다. 앱은 인증이 필요한 모든 액션이 Datadog 계정의 신원을 확인할 수 있는 경우에만 성공적으로 실행될 수 있습니다.

다음과 같은 방법으로 액션을 인증할 수 있습니다.
- 통합 타일에서 설정한 자격 증명 및 권한
- 연결 자격 증명

기본적으로 게시된 앱의 조회자는 앱의 연결에 액세스할 필요가 없습니다. 대신 액션은 앱 작성자의 신원을 사용합니다. 이는 앱이 임의의 조회자 신원을 사용하여 민감한 작업을 수행하는 것을 방지함으로써 공유를 간소화하고 보안을 향상시킵니다.
자격 증명 설정에 대한 자세한 내용을 확인하려면 [연결][8]을 참조하세요. App Builder는 Action Catalog와 각 통합에 대한 연결 자격 증명을 [Datadog Workflow Automation][9]과 공유합니다.

## 앱 권한 {#app-permissions}

기본적으로:
- 앱이 초안 상태인 동안에는 앱 작성자만 앱에 액세스할 수 있습니다.
- 앱이 게시된 후 작성자는 {{< ui >}}Editor{{< /ui >}} 액세스 권한을 유지하며, 작성자를 제외한 나머지 Datadog 조직은 앱에 대한 {{< ui >}}Viewer{{< /ui >}} 액세스 권한을 받습니다.

액세스 컨트롤을 사용하여 초안 또는 게시된 앱에 대한 액세스 권한을 확장할 수 있습니다.

### 권한 및 액세스 컨트롤 {#permissions-and-access-control}

[역할 기반 액세스 제어(RBAC)][3]을 사용하여 앱 및 연결에 대한 액세스를 제어하세요.

앱에 적용되는 포괄적 권한은 다음과 같습니다.

{{< ui >}}Apps View{{< /ui >}}
: 앱을 보고 실행합니다. Datadog Standard 및 Datadog Admin 역할에는 기본적으로 App Builder에 대한 보기 액세스 권한이 있습니다.

{{< ui >}}Apps Write{{< /ui >}}
: 새 앱 및 기존 앱을 생성하고 편집합니다. Datadog Standard 및 Datadog Admin 역할에는 기본적으로 App Builder에 대한 쓰기 액세스 권한이 있습니다.

{{< ui >}}Connections Read{{< /ui >}}
: 사용 가능한 연결을 나열하고 확인합니다. Datadog Read Only, Datadog Standard 및 Datadog Admin 역할에는 기본적으로 연결에 대한 읽기 액세스 권한이 있습니다.

### 특정 앱에 대한 접근 제한 {#restrict-access-to-a-specific-app}

각 앱에 대한 권한을 설정하여 앱 수정을 제한합니다.

App Builder는 각 앱에 다음과 같은 권한을 부여합니다.

{{< ui >}}Viewer{{< /ui >}}
: 앱 실행 및 보기

{{< ui >}}Contributor{{< /ui >}}
: 앱 편집, 실행 및 보기

{{< ui >}}Editor{{< /ui >}}
: 앱 편집, 실행, 보기, 게시 및 삭제

앱에 대한 액세스를 제한하려면 앱 캔버스에서 다음 단계를 수행합니다.
1. 액세스를 제한하려는 앱의 세부 편집 보기로 이동합니다.
1. 앱 편집기에서 톱니바퀴({{< ui >}}Settings{{< /ui >}}) 아이콘을 클릭합니다.
1. 드롭다운에서 {{< ui >}}Permissions{{< /ui >}}를 선택합니다.
1. {{< ui >}}Restrict Access{{< /ui >}}를 선택합니다.
1. 드롭다운 메뉴에서 역할을 선택합니다. {{< ui >}}Add{{< /ui >}}를 클릭합니다. 선택한 역할이 대화 상자 하단에 채워집니다.
1. 역할 이름 옆의 드롭다운 메뉴에서 원하는 권한을 선택합니다.
1. 역할에서 액세스 권한을 제거하려면 역할 이름 오른쪽의 휴지통 아이콘을 클릭합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

### API 또는 Terraform을 사용하여 앱 액세스 제한 {#restrict-app-access-using-the-api-or-terraform}

[제한 정책 API][10] 또는 Terraform을 사용할 때 사용자나 서비스 계정은 자신의 액세스 수준을 낮출 수 없습니다. 이는 [세분화된 액세스][4]에 의해 강제되는 의도된 동작으로, 스스로 액세스 권한을 제한하는 것을 방지하기 위함입니다.

호출하는 사용자나 서비스 계정으로부터 `editor` 액세스 권한을 이전하려면 다음 단계를 따르세요.

1. 현재 사용자나 서비스 계정을 `editor`로 유지하면서 새 주체를 `editor`로 추가합니다.

   ```terraform
   bindings {
       principals = ["user:<SERVICE_ACCOUNT_UUID>"]
       relation   = "editor"
   }
   bindings {
       principals = ["team:<TEAM_UUID>"]
       relation   = "editor"
   }
   bindings {
       principals = ["org:<ORG_UUID>"]
       relation   = "viewer"
   }
   ```

1. **다른** API 키나 관리자 계정(권한이 낮아지는 계정이 아님)을 사용하여 원래 사용자나 서비스 계정의 바인딩을 제거합니다.

   ```terraform
   bindings {
       principals = ["team:<TEAM_UUID>"]
       relation   = "editor"
   }
   bindings {
       principals = ["org:<ORG_UUID>"]
       relation   = "viewer"
   }
   ```

### 특정 연결에 대한 액세스 제한 {#restrict-access-to-a-specific-connection}

개별 연결에 권한을 설정하여 사용을 제한하거나 수정을 제한합니다. App Builder는 각 연결에 대해 다음과 같은 권한을 제공합니다.

{{< ui >}}Viewer{{< /ui >}}
: 연결 보기

{{< ui >}}Resolver{{< /ui >}}
: 연결 확인 및 보기

{{< ui >}}Editor{{< /ui >}}
: 연결 편집, 확인, 보기

기본적으로 연결 작성자만 {{< ui >}}Editor{{< /ui >}} 액세스 권한을 받습니다. 작성자는 추가 사용자, 역할 또는 팀에 액세스 권한을 부여할 수 있습니다.

**참고**: 연결 확인 권한에는 단계에 할당된 연결 객체를 불러오고 관련 시크릿을 검색할 수 있는 권한이 포함됩니다.

특정 연결에 대한 권한을 수정하려면 다음 단계를 따르세요.

1. [App Builder 페이지][5]로 이동합니다.
1. {{< ui >}}Connections{{< /ui >}} 탭을 클릭합니다. 연결 목록이 표시됩니다.
1. 세부 권한을 설정하려는 연결 위로 마우스를 올립니다. 그러면 오른쪽에 {{< ui >}}Edit{{< /ui >}}, {{< ui >}}Permissions{{< /ui >}}, {{< ui >}}Delete{{< /ui >}} 아이콘이 나타납니다.
1. 자물쇠({{< ui >}}Permissions{{< /ui >}}) 아이콘을 클릭합니다.
1. {{< ui >}}Restrict Access{{< /ui >}}를 선택합니다.
1. 드롭다운 메뉴에서 역할을 선택한 후 {{< ui >}}Add{{< /ui >}}를 클릭합니다. 선택한 역할이 대화 상자 하단에 채워집니다.
1. 역할 이름 옆에 있는 드롭다운 메뉴에서 원하는 권한을 선택합니다.
1. 역할에서 액세스 권한을 제거하려면 역할 이름 오른쪽의 휴지통 아이콘을 클릭합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

<br>질문이나 피드백이 있으신가요? [Datadog Community Slack][6]의 **#app-builder** 채널에 참여하세요.

[1]: https://app.datadoghq.com/actions/action-catalog/
[2]: /ko/account_management/org_settings/service_accounts#permissions
[3]: /ko/account_management/rbac/?tab=datadogapplication#role-based-access-control
[4]: /ko/account_management/rbac/granular_access
[5]: https://app.datadoghq.com/app-builder/
[6]: https://chat.datadoghq.com/
[7]: /ko/account_management/audit_trail/#overview
[8]: /ko/actions/connections/
[9]: /ko/actions/workflows/
[10]: /ko/api/latest/restriction-policies/