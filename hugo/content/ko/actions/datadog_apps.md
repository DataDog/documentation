---
aliases:
- /ko/internal_developer_portal/plugins/
description: React, 백엔드 함수, CLI를 사용하는 코드 기반 개발 워크플로를 통해 사용자 지정 앱을 로컬에서 빌드하고 배포할 수
  있습니다.
further_reading:
- link: https://www.datadoghq.com/blog/internal-applications-datadog-apps/
  tag: 블로그
  text: Datadog Apps를 사용하여 AI Agent에서 내부 애플리케이션 배포
- link: https://www.youtube.com/watch?v=HEDjpMyqkSE
  tag: 비디오
  text: Datadog Apps 데모
- link: /actions/app_builder/
  tag: 설명서
  text: App Builder
- link: /actions/app_builder/embedded_apps/
  tag: 설명서
  text: 임베디드 앱
- link: /actions/app_builder/access_and_auth/
  tag: 설명서
  text: 액세스 및 인증
title: 앱
---
{{< callout url="https://www.datadoghq.com/product-preview/apps/" btn_hidden="false" header="미리 보기에 참여하세요!">}}
Datadog Apps는 미리 보기 상태입니다. 액세스를 요청하려면 이 양식을 사용하세요.
{{< /callout >}}

## 개요 {#overview}

Apps를 사용하면 표준 개발 워크플로에 따라 React 및 TypeScript(또는 JavaScript)로 애플리케이션을 로컬에서 코드로 빌드할 수 있습니다.

Datadog Apps는 [App Builder 앱][2]과 동일한 [권한 모델][1]을 사용합니다. 또한 [대시보드 및 Internal Developer Portal][3]과 같은 다른 Datadog 제품에 포함할 수도 있습니다.

다음이 필요할 때 Datadog Apps를 선택합니다.

- **팀 협업**: 여러 엔지니어가 동일한 앱에 기여하며 기존 소스 제어를 통해 코드 검토 및 버전 기록을 관리합니다.
- **소스 제어 및 CI/CD**: GitHub에 앱을 저장하고 병합 시 자동으로 배포합니다.
- **AI 지원 개발**: 선호하는 로컬 도구(Cursor, GitHub Copilot, Claude 등)를 사용하여 코드를 생성하고 개선합니다.
- **사용자 지정 클라우드 공급자 및 API**: 자체 백엔드 코드를 사용하여 [Action Catalog][4]를 벗어난 서비스와 통합합니다.
- **복잡한 UI 및 로직**: 컴포넌트, 상태, 렌더링에 대해 React 및 TypeScript를 완전하게 제어합니다.

## 전제 조건 {#prerequisites}

- **Node.js 버전 20.12.0 이상**. 버전 검사:
  ```shell
  node --version
  ```
- 선택 사항: Datadog **API 키** 및 [액션 API 액세스][5]가 활성화된 **애플리케이션 키**. API 키 기반 빌드 텔레메트리(빌드 메트릭 및 Error Tracking 소스맵 업로드)과 CI/CD 업로드에 필요합니다. 지침은 [API 및 애플리케이션 키][6]를 참조하세요.

  애플리케이션 키에서 액션 API 액세스를 활성화하려면 다음 작업을 수행합니다.

  1. **Organization Settings > Application Keys**][7]로 이동합니다.
  1. 애플리케이션 키를 선택합니다.
  1. Actions API Access****를 활성화합니다.

## 앱 스캐폴딩 {#scaffold-an-app}

1. 스캐폴딩 명령을 실행하여 앱을 생성합니다.
   ```shell
   npm create @datadog/apps@latest
   ```
2. 대화형 프롬프트를 따라 앱 이름과 템플릿을 구성합니다.

### 생성된 앱 구조 {#generated-app-structure}

스캐폴딩된 프로젝트에는 다음 항목이 포함됩니다.

| 파일 또는 디렉터리 | 설명 |
|---|---|
| `src/App.tsx` | 루트 UI 구성 요소(React) |
| `src/**/*.backend.ts` | 서버 측에서 실행되며 [Datadog 연결][8]에 액세스할 수 있는 백엔드 함수 |
| `vite.config.ts` | [`@datadog/vite-plugin`][9]이 사전 구성된 빌드 구성 |
| `package.json` | 종속성 및 스크립트(`dev`, `build`, `upload`) |

## `datadog-app` 스킬 사용{#use-the-datadog-app-skill}

[`datadog-app` 에이전트 스킬][20]은 AI 코딩 에이전트에게 스캐폴딩, 로컬 개발, 업로드, 게시, CI/CD, 문제 해결, DDSQL 및 Action Catalog 사용을 포함한 Datadog Apps 워크플로에 대한 지침을 제공합니다. 이 스킬은 [agent-skills GitHub 리포지토리][21]에서 사용할 수 있습니다.

### 설치 {#install}

```shell
npx skills add datadog-labs/agent-skills \
  --skill datadog-app \
  --full-depth -y
```

`skills` CLI는 Claude Code, Codex, Cursor, Gemini CLI, OpenCode 및 기타 코딩 에이전트를 지원합니다. 특정 에이전트를 대상으로 지정하려면 [스킬 CLI 문서][22]를 참조하세요. 설치 후에도 스킬이 나타나지 않으면 코딩 에이전트를 다시 시작하세요.

### 프롬프트 예시 {#example-prompts}

- `Scaffold a Datadog App called my-app.`
- `Run this Datadog App locally.`
- `Upload and publish this Datadog App.`
- `Set up CI/CD for this Datadog App.`
- `Troubleshoot this Datadog App authentication error.`
- `Add a table component to this Datadog App using Druids.`

## 로컬에서 앱 개발 {#develop-your-app-locally}

1. 개발 서버를 시작합니다.
   ```shell
   npm run dev
   ```
2. 터미널에 표시된 URL(예: `http://localhost:5173/`)을 열면 앱을 미리 확인할 수 있습니다.

백엔드 함수를 로컬에서 실행할 때와 같이 개발 서버가 Datadog을 호출해야 하는 경우 기본적으로 OAuth를 사용합니다. 권한 부여가 필요한 경우 이 명령이 브라우저 프롬프트를 엽니다. 권한 부여가 완료되면 토큰이 운영 체제 자격 증명 저장소에 캐시됩니다.

`DD_API_KEY` 및 `DD_APP_KEY`를 둘 다 설정하면 생성된 앱은 OAuth 대신 해당 키를 사용합니다.

### 백엔드 함수 {#backend-functions}

`*.backend.ts` 또는 `*.backend.js`와 일치하는 파일에는 백엔드 함수가 포함되어 있습니다. 백엔드 함수는 서버 측에서 실행되며 [연결][8]에 액세스할 수 있습니다. 프런트엔드는 표준 ES 모듈처럼 백엔드 함수를 가져와 호출합니다.

백엔드 함수는 [`@datadog/action-catalog`][10] 라이브러리를 통해 Datadog의 [Action Catalog][4]에 있는 모든 작업을 호출할 수 있습니다. Action Catalog는 클라우드 제공업체, SaaS 도구 및 Datadog API와 상호 작용하기 위해 재사용 가능한 사전 구축 작업을 제공합니다. 처음부터 API 클라이언트를 작성하는 대신 기존 통합을 기반으로 빌드할 수 있습니다.

이 라이브러리는 AWS, Azure, GCP, Datadog API, GitHub, GitLab, Slack, Jira, PagerDuty, ServiceNow, OpenAI, Anthropic 및 범용 HTTP를 포함한 통합을 래핑하는 완전한 유형의 TypeScript 클라이언트입니다. `@datadog/action-catalog`에서 작업을 가져오면 각 작업에 대해 유형이 지정된 입력 및 응답을 얻을 수 있습니다.

[@datadog/apps-backend][24] 패키지를 통해 백엔드 유틸리티를 조회할 수 있습니다. 유틸리티를 사용하여 호출하는 사용자의 정보 검색과 같은 일반적인 작업을 수행할 수 있습니다.

   ```
import { getInitiatingUser, type User } from '@datadog/apps-backend/user';

export async function getCurrentUser(): Promise<User> {
    return getInitiatingUser();
}
   ```

{{% collapse-content title="백엔드 함수 예시" level="h4" expanded=false %}}

Action Catalog를 통해 호스트를 나열하는 백엔드 함수를 생성합니다.

**src/listHosts.backend.ts**

```typescript
import { listHosts, type ListHostsResponse } from '@datadog/action-catalog/dd/hosts';

export async function getHosts(filter?: string): Promise<ListHostsResponse> {
    const response = await listHosts({
        inputs: {
            filter: filter ?? '*',
            count: 10,
            include_hosts_metadata: true,
        },
    });
    return response;
}
```

그런 다음 앱의 `App.tsx`에서 함수를 호출합니다.

**src/App.tsx**

```tsx
import { useState, useEffect } from 'react';
import { getHosts } from './listHosts.backend';

function App() {
    const [hostCount, setHostCount] = useState<number>(0);

    useEffect(() => {
        getHosts().then((response) => {
            setHostCount(response.host_list?.length ?? 0);
        });
    }, []);

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Welcome to my-app</h1>
            <p>Monitoring {hostCount} hosts</p>
        </div>
    );
}

export default App;
```
{{% /collapse-content %}}

### UI 구성 요소 {#ui-components}

[`@datadog/druids`][23]을 사용하여 테이블, 버튼, 차트, 양식 등 Datadog 제품 전반에서 사용되는 것과 동일한 React 구성 요소로 앱의 UI를 빌드합니다. Druids를 사용하여 빌드하면 앱이 나머지 Datadog 와 동일한 모양 및 느낌을 유지할 수 있습니다.

라이브러리 설치:

```shell
npm install @datadog/druids
```

일반 React 구성 요소를 가져오는 것과 동일한 방식으로 구성 요소를 가져옵니다.

```tsx
import { Button } from '@datadog/druids';
```

Druids는 피어 종속성으로 React 18 또는 19가 필요합니다. 사용 가능한 구성 요소 세트는 [npm의 패키지][23]를 참조하세요.

<div class="alert alert-info">
Druids 구성 요소는 Datadog Apps 및 App Builder에서만 사용할 수 있습니다. 자세한 내용은 패키지 라이선스를 참조하세요.
</div>

## 앱 빌드 및 업로드 {#build-and-upload-your-app}

`npm run build`를 사용하여 업로드하지 않고 로컬에서 앱을 빌드할 수 있습니다. 이는 일반적으로 모든 빌드를 업로드할 필요가 없는 로컬 개발에 권장되는 기본 설정입니다.

`npm run upload`를 사용하여 앱을 빌드하고 Datadog에 업로드합니다. 이 명령은 `DD_APPS_UPLOAD_ASSETS=1`인 상태로 `vite build`를 실행합니다.

```shell
npm run upload
```

업로드는 기본적으로 OAuth를 사용하며 처음 실행 시 브라우저 인증 흐름이 열릴 수 있습니다. `DD_API_KEY` 및 `DD_APP_KEY`를 모두 설정하면 업로드 시 API 및 애플리케이션 키 인증이 대신 사용됩니다.

사용 가능한 환경 변수는 다음과 같습니다:

| 변수 | 설명 |
|---|---|
| `DD_API_KEY` | 선택 사항입니다. 로컬 개발 및 업로드를 위해 `DD_APP_KEY`와 함께 사용되는 Datadog API 키입니다. 또한 빌드 메트릭 및 Error Tracking 소스맵 업로드와 같은 API 키 기반 빌드 텔레메트리를 활성화합니다. |
| `DD_APP_KEY` | 선택 사항입니다. 로컬 개발 및 업로드 시 `DD_API_KEY`와 함께 사용되는 애플리케이션 키입니다. |
| `DD_APPS_AUTH_METHOD` | 선택 사항입니다. 생성된 앱의 인증 방법을 재정의하려면 `oauth` 또는 `apiKey`로 설정합니다. |
| `DD_APPS_VERSION_NAME` | 선택 사항입니다. 업로드된 앱 버전에 대한 버전 이름입니다. 앱마다 고유한 문자열이어야 합니다. 설정하지 않으면 Datadog에서 버전 이름을 할당합니다. |
| `DD_APPS_UPLOAD_ASSETS` | 설정하면 빌드된 에셋을 Datadog에 업로드합니다. `npm run upload`로 자동으로 설정됩니다. |

프로덕션 배포의 경우 [GitHub Actions로 CI/CD 설정](#set-up-cicd-with-github-actions)[`DataDog/apps-github-action`][11]이 업로드 단계를 자동으로 처리합니다.

업로드에 성공하면 빌드 출력에 Datadog에서 앱에 액세스할 수 있는 URL이 표시됩니다.

## 앱 게시 및 관리 {#publish-and-manage-your-apps}

앱을 업로드하면 [App Builder][12] 앱 목록에 나타납니다. App Builder에서 다음 작업을 수행할 수 있습니다.

- [앱 게시][13]
- [앱 이름 및 설명 편집][13]
- [권한][14] 관리
- 대시보드, 노트북 및 Internal Developer Portal에서 [앱 임베드][3]

<div class="alert alert-danger">
다음 App Builder 기능은 로컬에서 빌드된 앱에서는 사용할 수 없습니다.
<ul>
<li>드래그 앤 드롭 구성 요소를 사용하여 UI 편집</li>
<li>App Builder UI에서 관리되는 변수, 이벤트 및 표현식</li>
</ul>
앱의 UI나 로직을 변경하려면 로컬 프로젝트의 코드를 업데이트하고 다시 업로드합니다.
</div>

## GitHub Actions로 CI/CD 설정 {#set-up-cicd-with-github-actions}

`main` 브랜치에 푸시할 때마다 앱을 자동으로 업로드하려면 [`DataDog/apps-github-action`][11] GitHub Action을 사용합니다. 이 작업은 앱을 빌드하고 Datadog에 업로드합니다.

CI/CD 업로드에는 API 및 애플리케이션 키 인증이 필요합니다. [액션 API 액세스][5]가 활성화된 Datadog API 키와 애플리케이션 키를 만들고 GitHub 비밀로 저장합니다.

조직이 US1(`datadoghq.com`)에 없으면 `vite.config.ts`의 `auth.site`를 [Datadog 사이트][15]로 설정합니다. 빌드는 앱을 업로드할 때 이 구성을 읽으므로 동일한 설정이 로컬 개발에도 적용됩니다. Datadog 사이트는 `{{< region-param key="dd_site" >}}`입니다.

{{< site-region region="us3,us5,eu,ap1,ap2,uk1" >}}

```ts
datadogVitePlugin({
  auth: {
    site: '<YOUR_DATADOG_SITE>',
  },
});
```
{{< /site-region >}}

앱의 리포지토리에 `.github/workflows/cd.yml`을 생성합니다.

```yaml
name: Continuous Deployment
on:
  push:
    branches:
      - main

permissions:
  contents: read

jobs:
  deploy-app:
    name: Deploy Datadog App
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write

    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Setup Node.js
        uses: actions/setup-node@v6

      - name: Deploy
        uses: DataDog/apps-github-action@v0.0.2
        with:
          datadog-api-key: ${{ secrets.DATADOG_API_KEY }}
          datadog-app-key: ${{ secrets.DATADOG_APP_KEY }}
          app-directory: .
```

## 문제 해결 {#troubleshooting}

### 인증 오류 {#authentication-errors}

로컬 개발 및 업로드 시 OAuth 인증 오류는 다음 원인 중 하나로 인해 발생할 수 있습니다.

- OAuth 브라우저 흐름이 완료되지 않았습니다.
- 캐시된 OAuth 토큰이 유효하지 않습니다.
- `auth.site` 가 Datadog 사이트와 일치하지 않습니다.

명령을 다시 실행하고 브라우저 승인 흐름을 완료합니다.

API 및 애플리케이션 키 인증을 사용하는 경우 인증 오류는 일반적으로 자격 증명이 누락되었거나 유효하지 않음을 나타냅니다. 백엔드 함수 호출 실패도 원인이 같을 수 있습니다. `DD_API_KEY` 및 `DD_APP_KEY`가 설정되어 있는지, 그리고 애플리케이션 키에 [액션 API 액세스][5]가 활성화되어 있는지 확인합니다.

### 빌드는 성공하지만 아무것도 업로드되지 않습니다. {#build-succeeds-but-nothing-uploads}

`npm run upload`를 실행했는지(`npm run build`가) 아님) 확인하고 `vite.config.ts`의 `dryRun`이 `true`로 설정되어 있지 않은지 확인합니다.

### 스캐폴딩 중 Node.js 버전 오류 {#nodejs-version-errors-during-scaffolding}

스캐폴딩 도구에는 Node.js 20.12.0 이상이 필요합니다. 지원되는 버전에서도 오류가 발생하면 v22로 업그레이드하세요. [nvm][16], [Volta][17] 또는 [fnm][18]과 같은 버전 관리자를 사용하거나 [Node.js 웹사이트][19]에서 다운로드하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/actions/app_builder/access_and_auth/
[2]: /ko/actions/app_builder/
[3]: /ko/actions/app_builder/embedded_apps/
[4]: /ko/actions/actions_catalog/
[5]: /ko/account_management/api-app-keys/#actions-api-access
[6]: /ko/account_management/api-app-keys/
[7]: https://app.datadoghq.com/organization-settings/application-keys
[8]: /ko/actions/connections/
[9]: https://github.com/DataDog/build-plugin
[10]: https://www.npmjs.com/package/@datadog/action-catalog
[11]: https://github.com/DataDog/apps-github-action
[12]: https://app.datadoghq.com/app-builder/apps/list
[13]: /ko/actions/app_builder/build/#customize-your-app
[14]: /ko/actions/app_builder/access_and_auth/#app-permissions
[15]: /ko/getting_started/site/
[16]: https://github.com/nvm-sh/nvm
[17]: https://volta.sh
[18]: https://github.com/Schniz/fnm
[19]: https://nodejs.org
[20]: https://github.com/datadog-labs/agent-skills/tree/main/dd-apps/datadog-app
[21]: https://github.com/datadog-labs/agent-skills/blob/main/README.md
[22]: https://github.com/vercel-labs/skills
[23]: https://www.npmjs.com/package/@datadog/druids
[24]: https://www.npmjs.com/package/@datadog/apps-backend