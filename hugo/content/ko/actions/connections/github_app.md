---
description: Datadog GitHub 통합 대신 자체 GitHub 앱을 사용하여 Datadog Actions를 연결합니다.
disable_toc: false
further_reading:
- link: /actions/connections/
  tag: 설명서
  text: 연결
title: GitHub 앱 연결
---
## 개요 {#overview}

Datadog GitHub 통합 타일을 통해 액션을 인증하는 대신 자체 GitHub 앱을 온보딩하려는 경우 GitHub 앱 연결을 사용합니다.

이 연결을 사용하면 Datadog은 GitHub 앱의 설치 인스턴스로 인증합니다. GitHub 앱 ID, 설치 ID 및 개인 키를 제공하면 Datadog은 이러한 자격 증명을 사용하여 유효 기간이 짧은 액세스 토큰을 자동으로 요청합니다. 이 방식을 사용하면 워크플로우와 앱에서 사용할 수 있는 리포지토리와 권한을 제어할 수 있습니다.

## GitHub 앱 생성 및 설치 {#create-and-install-a-github-app}

액션에 필요한 권한이 있는 GitHub 앱이 이미 설치되어 있다면 [연결 자격 증명 수집](#gather-the-connection-credentials) 단계로 건너뜁니다. GitHub 앱 생성 옵션에 대한 자세한 내용은 GitHub의 [GitHub 앱 등록][5] 가이드를 참조하세요.

1. GitHub에서 조직의 **Settings** > **Developer settings** > **GitHub Apps**로 이동합니다.
1. **New GitHub App**을 클릭합니다.
1. 앱 이름과 홈페이지 URL을 입력합니다.
1. **Webhook**에서 다른 목적으로 앱의 웹훅을 사용하지 않는 한 **Active** 확인란의 선택을 해제합니다. GitHub 앱 연결에는 웹훅이 필요하지 않습니다.
1. **Permissions**에서 리포지토리 콘텐츠, 풀 리퀘스트 또는 이슈와 같이 액션에 필요한 리소스에 대해서만 액세스 권한을 부여합니다.
1. **Create GitHub App**을 클릭합니다.
1. 앱 설정 페이지에서 **Install App**을 클릭합니다.
1. 앱을 설치할 조직을 선택한 다음, 앱이 모든 리포지토리에 액세스할 수 있는지 아니면 선택한 리포지토리에만 액세스할 수 있는지 선택합니다.
1. **Install**을 클릭합니다.

조직의 GitHub 앱 정책에 따라 앱을 설치하려면 조직 소유자의 승인이 필요할 수 있습니다.

## 연결 자격 증명 수집 {#gather-the-connection-credentials}

GitHub에서 다음 값을 수집합니다.

- **App ID**: GitHub App 설정 페이지에서 페이지 상단 근처에 표시된 숫자 App ID를 복사합니다.
- **Installation ID**: 앱의 설치 설정을 엽니다. 설치 ID는 `github.com/organizations/<org>/settings/installations/12345678`와 같이 URL 끝에 있는 숫자 값입니다.
- **Private key**: GitHub App 설정 페이지의 **Private keys** 아래에서 **Generate a private key**를 클릭합니다. GitHub에서 `.pem` 파일을 다운로드합니다. 파일을 안전하게 보관합니다. 동일한 개인 키는 GitHub에서 다시 다운로드할 수 없습니다.

## Datadog에서 연결 생성 {#create-the-connection-in-datadog}

GitHub App을 설정한 후 Datadog에서 다음 단계에 따라 연결을 생성합니다.

1. [Action Catalog 페이지][1]에서 {{< ui >}}Connections{{< /ui >}} 탭을 클릭합니다.
1. {{< ui >}}New Connection{{< /ui >}}을 클릭합니다.
1. {{< ui >}}GitHub{{< /ui >}} 연결 유형을 선택합니다.
1. {{< ui >}}GitHub App{{< /ui >}} 자격 증명 유형을 선택합니다.
1. 연결 이름을 입력합니다.
1. GitHub에서 복사한 App ID와 설치 ID를 입력합니다.
1. {{< ui >}}Private Key{{< /ui >}} 필드에 `.pem` 파일의 전체 내용을 붙여넣습니다.
1. GitHub Enterprise Server를 사용하는 경우 {{< ui >}}GitHub Hostname{{< /ui >}} 필드에 해당 호스트 이름을 입력합니다. `github.com`의 경우 이 필드를 비워 둡니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

연결은 기본적으로 비공개입니다. 다른 사용자가 워크플로우나 앱에서 이 연결을 사용할 수 있도록 하려면 연결의 권한 설정에서 액세스 권한을 구성합니다. 자세한 내용은 [Workflow Automation][2] 또는 [App Builder][3]의 액세스 및 인증 관련 문서를 참조하세요.

## GitHub 앱 권한 업데이트 {#update-github-app-permissions}

GitHub 앱을 설치한 후 권한을 추가하면 기존 설치에는 권한이 자동으로 부여되지 않습니다. 각 조직 또는 계정의 앱 설치 설정을 열고, 액션에서 새 권한을 사용하기 전에 해당 권한을 승인합니다.

## 문제 해결 {#troubleshooting}

### 액션이 잘못된 조직 또는 리포지토리를 사용함 {#actions-use-the-wrong-organization-or-repositories}

연결의 설치 ID가 대상 조직 및 리포지토리의 설치 ID와 일치하는지 확인합니다. 앱의 설치 설정 URL에서 설치 ID를 찾을 수 있습니다.

### 액션이 권한 오류를 반환함 {#an-action-returns-a-permission-error}

GitHub 앱에 구성된 권한과 해당 앱 설치에서 액세스할 수 있는 리포지토리를 확인합니다. 앱을 설치한 후 권한을 추가한 경우, 설치 설정을 열고 새로운 권한 요청을 승인합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog 커뮤니티 Slack][4]의 **#workflows** 또는 **#app-builder** 채널에 참여하세요.

[1]: https://app.datadoghq.com/actions/action-catalog
[2]: /ko/actions/workflows/access_and_auth/#restrict-access-on-a-specific-connection
[3]: /ko/actions/app_builder/access_and_auth/#restrict-access-to-a-specific-connection
[4]: https://chat.datadoghq.com/
[5]: https://docs.github.com/apps/creating-github-apps/registering-a-github-app/registering-a-github-app