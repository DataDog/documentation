---
aliases:
- /ko/service_management/app_builder/auth
description: 앱 빌더용 액세스 및 인증
title: 액세스 및 인증
---

몇 가지 도구로 앱과 구성 요소에 대한 액세스 및 인증을 제어합니다.

## App execution identity

A published app runs using the Datadog user identity of its author. In edit mode, it runs as the current editor.

## 작업 자격 증명

앱 [작업][1]은 외부 소프트웨어 시스템과 연결되므로 해당 통합에 Datadog 계정을 인증해야 할 수 있습니다. 인증이 필요한 앱 작업이 Datadog 계정의 ID를 확인할 수 있는 경우에만 해당 앱을 실행할 수 있습니다.

다음과 같은 방법으로 작업을 인증할 수 있습니다.
- 통합 타일에서 설정한 자격 증명 및 권한
- 연결 자격 증명

By default, viewers of a published app do not need access to the app's connections. Instead, actions use the identity of the app's author. This simplifies sharing and improves security by preventing apps from performing sensitive operations using the identity of arbitrary viewers.
For more information on configuring credentials, see [Connections][2]. App Builder shares the Action Catalog and the connection credentials for each integration with [Datadog Workflow Automation][3].

## 앱 권한

기본적으로:
- 앱이 초안 상태인 동안에는 앱 작성자만 앱에 액세스할 수 있습니다.
- 앱이 퍼블리싱된 후 작성자는 **편집자** 액세스 권한을 유지하며, 작성자를 제외한 나머지 Datadog 조직은 앱에 대한 **뷰어** 액세스 권한을 얻습니다.

액세스 컨트롤을 사용하여 퍼블리싱된 앱 초안에 대한 액세스 권한을 확장할 수 있습니다.

### 권한 및 액세스 컨트롤

[역할 기반 액세스 컨트롤(RBAC)][4]로 앱 및 연결에 대한 액세스를 제어합니다.

앱에 적용되는 대략적인 권한은 다음과 같습니다.

앱 보기
: 앱을 보고 실행합니다. Datadog 표준 및 관리자 역할에는 기본값으로 앱 빌더에 대한 보기 액세스 권한이 있습니다.

앱 쓰기
: 기존 앱을 쓰고 수정합니다. Datadog 표준 및 관리자 역할에는 기본값으로 앱 빌더에 대한 쓰기 액세스 권한이 있습니다.

연결 읽기
: 사용 가능한 연결을 목록화하고 확인합니다. Datadog 읽기 전용, 표준, 관리자 역할에는 기본값으로 연결에 대한 읽기 액세스 권한이 있습니다.

### 특정 연결에 대한 접근 제한

개별 연결에 대한 권한을 설정하여 사용이나 수정을 제한할 수 있습니다. 앱 빌더는 각 연결에 대해 다음과 같은 권한을 부여합니다.

뷰어
: 연결 보기

Resolver
: 연결 확인 및 보기

편집자
: 연결 편집, 확인, 보기

기본적으로 연결의 작성자만 **편집자** 액세스 권한이 있습니다. 해당 작성자는 추가 사용자, 역할 또는 팀에게 액세스 권한을 부여하도록 결정할 수 있습니다.

**참고**: 연결 확인 권한에는 단계에 할당된 연결 오브젝트를 불러오고 관련 기밀 정보를 검색하는 작업이 포함됩니다.

특정 연결에 대한 권한을 수정하려면 다음 단계를 따르세요.

1. [앱 빌더 페이지][5]로 이동합니다.
1. **연결** 탭을 클릭합니다. 연결 목록이 표시됩니다.
1. 세부 권한을 설정하려는 연결 위로 마우스를 올립니다. 오른쪽에 **수정**, **권한**, **삭제** 아이콘이 표시됩니다.
1. 자물쇠(**권한**) 아이콘을 클릭합니다.
1. **액세스 제한**을 선택합니다.
1. 드롭다운 메뉴에서 역할을 선택하고 **추가**를 클릭합니다. 선택한 역할이 대화 상자 하단에 추가됩니다.
1. 역할 이름 옆의 드롭다운 메뉴에서 원하는 권한을 선택합니다.
1. 역할에서 접근 권한을 삭제하려면 역할 이름 오른쪽의 휴지통 아이콘을 클릭합니다.
1. **Save**를 클릭합니다.

### 특정 앱에 대한 접근 제한

각 앱에 대한 권한을 설정하여 앱 수정을 제한합니다. 기본값:
- 앱 작성자만 앱에 액세스할 수 있습니다.
- 앱이 퍼블리싱된 후 작성자는 **편집자** 액세스 권한을 유지하며, 작성자를 제외한 나머지 Datadog 조직은 앱에 대한 **뷰어** 액세스 권한을 얻습니다.

앱 빌더는 각 앱에 다음과 같은 권한을 부여합니다.

뷰어
: 앱 실행 및 보기

편집자
: 앱 편집, 실행, 보기

앱에 대한 액세스를 제한하려면 앱 캔버스에서 다음 단계를 수행합니다.
1. 액세스를 제한하려는 앱의 세부 편집 보기로 이동합니다.
1. 앱 편집기에서 톱니바퀴(**설정**) 아이콘을 클릭합니다.
1. 드롭다운 메뉴에서 **권한**을 선택합니다.
1. **액세스 제한**을 선택합니다.
1. 드롭다운 메뉴에서 역할을 선택합니다. **추가**를 클릭합니다. 선택한 역할이 대화 상자 하단에 추가됩니다.
1. 역할 이름 옆의 드롭다운 메뉴에서 원하는 권한을 선택합니다.
1. 역할에서 접근 권한을 삭제하려면 역할 이름 오른쪽의 휴지통 아이콘을 클릭합니다.
1. **Save**를 클릭합니다.

<br>질문이나 피드백이 있으신가요? [Datadog 커뮤니티 슬랙][6]의 **#app-builder** 채널에 참여하세요.

[1]: https://app.datadoghq.com/app-builder/action-catalog
[2]: /ko/service_management/app_builder/connections/
[3]: /ko/service_management/workflows/
[4]: /ko/account_management/rbac/
[5]: https://app.datadoghq.com/app-builder/
[6]: https://datadoghq.slack.com/